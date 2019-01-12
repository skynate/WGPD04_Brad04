/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var test2Layer = cc.Layer.extend({
    sprite:null,
    ball:null,
    brick:null,
    ctor:function () {

        this._super();

        this.ball = new ball(res.Ball_png);
        this.ball.x = cc.winSize.width/2;
        this.ball.y = cc.winSize.height/2;
        this.ball.setXY(dx:4,dy:4);
        this.addChild(this.ball);

        this.bricks = [];
        for (var i= 0; i<120; i++){
            this.bricks[i] = new cc.Sprite(res.Brick_png);
            this.bricks[i].attr({
                x : this.bricks[i].width*(i%30) + this.bricks[i].width/2,
                y: cc.winSize.height * (18-parseInt(i/30)) /20
            });
            this.addChild(this.bricks[i]);
        }

        this.ball.schedule(this.ballUpdate,0.01,cc.RepeatForever,1,1);


        return true;
    },

    ballUpdate:function(){
        var layer =this.getParent();
        for (var i = 0; i<layer.brick.length;i++){
            if (this.x <=layer.brick[i].x+layer.brick[i].width/2 &&
                this.x >=layer.brick[i].x-layer.brick[i].width/2 &&
                (
                    (this.y>layer.bricks[i].y &&
                    this.y=this.height/2 <= layer.brick[i].y + layer.bricks[i].height/2 ||
                    (this.y<layer.bricks[i],y) &&
                     this.y+this.height/2 >= layer.brick[i].y - layer.bricks[i].height/2)
                )){

                layer.removeChild(layer.brick{i});
                layer.brick.splice(i,1);

                this.dy *=-1;
                break;
            }

            if (this.y <=layer.brick[i].y+layer.brick[i].height/2 &&
                this.y >=layer.brick[i].y-layer.brick[i].height/2 &&
                (
                    (this.x>layer.bricks[i].x &&
                    this.x=this.width/2 <= layer.brick[i].x + layer.bricks[i].width/2 ||
                        (this.x<layer.bricks[i],x) &&
                        this.x+this.width/2 >= layer.brick[i].x - layer.bricks[i].width/2)
                )){

                layer.removeChild(layer.brick{i});
                layer.brick.splice(i,1);

                this.dx *=-1;
                break;
            }


        }
    }

        if(this.x - this.width/2 <= 0 || this.x + this.width/2 >=  cc.winSize.width ){
            this.dx*=-1;
            if(this.dy<0){
                this.ang += this.dx>0?90:-90;
            }else{
                this.ang -= this.dx>0?90:-90;
            }

            this.runAction(cc.rotateTo(0.5,this.ang));
        }
        if(this.y - this.height/2 <= 0 || this.y + this.height/2 >=  cc.winSize.height ){
            this.dy*=-1;
            if(this.dy<0){
                this.ang += this.dx>0?90:-90;
            }else{
                this.ang -= this.dx>0?90:-90;
            }

            this.runAction(cc.rotateTo(0.5,this.ang));
        }

        this.x += this.dx;
        this.y += this.dy;

});

var ball = cc.Sprite.extend({
    dx: 0, dy: 0, ang:0,
    ctor:function (imag) {
        this._super(img);
    },
    setXY: function (dx,dy) {
        this.d = dx; this.dy=dy;
    }
})

var test2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new test2Layer();
        this.addChild(layer);
    }
});


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


var test1Layer = cc.Layer.extend({
    sprite:null,
    ball:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // // 球的初始化
        // this.ball=new cc.Sprite(res.Ball_png);
        // this.ball.x = cc.winSize.width /2;
        // this.ball.y = cc.winSize.height/2;
        //
        // this.ball.dx=4;
        // this.ball.dy=4;
        //
        // this.addChild(this.ball);
        //
        // //讓球本身的生命週期來做
        // // 只要是node都有schedule,schedule用在單一物件上(控制球)
        // // 球會有schedule 延遲一秒後去做 ballUpdate 永遠會重複0.01秒
        // this.ball.schedule(this.ballUpdate,0.01,cc.RepeatForever,1);
        //
        // // // 維持原本的FPS
        // // this.scheduleUpdate();
        this.myMouseListener();

        return true;
    },

    // 球的生命
    ballUpdate:function(){
        // //這裡的this 指的是球,他的父元素是Layer
        // cc.log('w =' + this.width)

        // 球的行為
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






    },

    // update:function(){
    //     cc.log('layer')
    // }


    // 觸發事件 產生球的參數在addNewBall 做,讓code 乾淨好維護
    myMouseListener:function(){
        if( 'mouse' in cc.sys.capabilities){
            var listener={
                event:cc.EventListener.MOUSE,
                onMouseUp:function (e) {
                    var x = e.getLocationX();
                    var y = e.getLocationY();
                    var layer = e.getCurrentTarget();
                    layer.addNewBall(x,y);
                },
            };

            cc.eventManager.addListener(listener,this);
        }
    },

    // 產生球
    addNewBall:function (x,y) {
        var ball=new cc.Sprite(res.Ball_png);
        ball.x = x;
        ball.y = y;
        ball.dx= parseInt(Math.random()*2)==0?4:-4;
        ball.dy= parseInt(Math.random()*2)==0?4:-4;
        ball.ang = 0;

        this.addChild(ball);
        ball.schedule(this.ballUpdate,0.01,cc.RepeatForever,1,1);
    },


});




var test1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new test1Layer();
        this.addChild(layer);
    }
});


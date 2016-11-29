/**
 * Created by wangGuangHang on 2016/9/13 0013.
 */
//轻击事件封装
window.WGH={};

//封装一个tap事件
WGH.tap= function (dom,callback) {
    //* 1.需要给谁绑
    //* 2.触发后需要处理什么业务逻辑
    //*

/*
 * tap
 * 1.响应速度在150ms以内
 * 2.不能触发move事件
 * /

 */
    if(dom && typeof dom =="object"){
        /*什么时候触发的touchstart  在触发touchend的时候计算时间差 */
        /*判断有没有触发touchmove */

        //设置记录事件的参数
        var startTime=0;
        //设置一个判断是否移动的标示
        var isMove=false;
        //点击开始时记录时间
        dom.addEventListener("touchstart", function (e) {
            startTime=Date.now();
        });
        //判断是否移动
        dom.addEventListener("touchmove", function (e) {
            isMove=true;
        });
        //如果点击结束的时候，判断如果事件小于150ms，并且没有移动
        dom.addEventListener("touchend", function (e) {
            if(!isMove  &&(Date.now()-startTime) < 150){
                //判断是否有回调函数，并执行回调函数
                callback && callback(e);
            }

            //点击结束，重置数据
            startTime=0;
            isMove=false;
        });

    }
};
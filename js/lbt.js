/**
 * Created by wangGuangHang on 2016/9/13 0013.
 */




window.onload= function () {

    
  //轮播图特效
    banner_lbt();

};






//轮播图特效
function banner_lbt(){
    /*
     * 1.轮播图的无缝连接，
     * 2.下面的小点对应高亮
     * 3.手指滑动效果
     * 4.如果滑动的距离不够1/3，则回到原来位置
     * 5.如果超过1/3，则进入下一张图片
     * */


    /*
    * 代码的提取，减少冗余
    * */
    //1.设置过渡属性
    function setTransition(){
        ul.style.transition="all 0.4s";
        ul.style.webkitTransition="all 0.4s";
    }
    //2.设置取消过渡属性
    function clearTransition(){
        ul.style.transition="none";
        ul.style.webkitTransition="none";
    }
    //3.设置移动距离
    function moveTarget(tranlateX){
        ul.style.transform="translateX("+tranlateX+"px)";
        ul.style.webkittransform="translateX("+tranlateX+"px)";
    }





    //1.轮播图的无缝连接，因为li是自适应的所以无法与pc端相同设置定位，所以用translateX的来实现
    //获取轮播的大盒子
    var lunbo=document.querySelector(".lunbo");
    //获取大盒子的宽度
    var lunboWidth=lunbo.offsetWidth;
    //获取ul
    var ul=document.querySelector(".lunbo ul");
    //设置一个记录图片的索引
    var index=1;

    //设置定时器，实现自动滚动
    var timer=setInterval(function () {
        index++;

        //事先执行动画
        //给ul设置过渡属性
        setTransition();

        //计算移动距离，并进行设置
        moveTarget(-index*lunboWidth);

    },4000);

    //设置判断，如果index大于8，则让index=1，但是必须动过渡行完毕以后，执行事件transitionEnd


    //封装一个transitionEnd的兼容方法
    window.myTransitionEnd={};
    myTransitionEnd.transitionEnd= function (dom,callback) {
        //判断是否含有dom，并判断dom是否是一个对象
        if(dom && typeof (dom)=="object"){
            dom.addEventListener("webkitTransitionEnd", function () {
                callback&&callback();
            });
            dom.addEventListener("transitionEnd", function () {
                callback&&callback();
            });
        }
    }
    //调用这个兼容的方法，并做一个处理
    myTransitionEnd.transitionEnd(ul, function () {
        //判断index的值是否大于8，如果大于8，则index等于1
        if(index>=9){

            index=1;
            //大于8.则清除过渡属性，进行调转
            clearTransition();

            //计算移动距离，并进行设置
            moveTarget(-index*lunboWidth);
        }else if(index<=0){           //判断如果小于1时候，等于8
            index=8;
            //小于1的时候.则清除过渡属性，进行调转
            clearTransition();

            //计算移动距离，并进行设置
            moveTarget(-index*lunboWidth);
        }

        //上面代码执行完毕以后，确保了index的值始终是1-8内
        //2.设置下面对应的亮点
        pointer();

    });


    //2.下面的小点对应高亮
    //获取所有的小圆点 queryselectorAll
    var point=document.querySelectorAll(".ruandian ul li");

    function pointer(){
        //遍历所有的圆点，清除所有的
        for(var i=0;i<point.length; i++){
            point[i].className="";
        }
        point[index-1].className="now";
    }



    //3.手指滑动效果
    //设置一个起始的位置
    var startX=null;
    //设置一个滑动的位置
    var moveX=null;
    //设置一个滑动距离
    var distanceX=null;
    ul.addEventListener("touchstart", function (e) {
        //获取的第一个触摸点touches
        startX=e.touches[0].clientX;
        //console.log(startX);
        //当触摸时候清除定时器
        clearInterval(timer);
    });
    ul.addEventListener("touchmove", function (e) {
        //获取的第一个触摸点touches
        moveX=e.touches[0].clientX;
        //此时的moveX是滑动到屏幕的文字
        //计算滑动距离
        distanceX=moveX-startX;    //此时得到的是滑动位置相对于起初点的位置的距离
        console.log(distanceX);

        //清除一下缓动
        clearTransition();
        var moveDistance=distanceX-lunboWidth*index;
        moveTarget(moveDistance);
    });
    ul.addEventListener("touchend", function (e) {

        //当手指离开的时候进行判断，实现第4,5功能

        //* 5.如果滑动的距离de绝对值超过1/3，则进入下一张图片
        if(moveX && Math.abs(distanceX) > lunboWidth/3){

            //判断左滑动，还是右滑动，设置index  加  还是 减
            if(distanceX>0){
                index--;
            }else{
                index++;
            }
            //添加过渡
            setTransition();
            //设置定位
            moveTarget(-index*lunboWidth);
        }else{
            //   * 4.如果滑动的距离de绝对值不够1/3，则回到原来位置

            //添加过渡
            setTransition();
            //设置定位
            moveTarget(-index*lunboWidth);

        }





        //离开的时候重新设置

        //设置一个起始的位置
        startX=null;
        //设置一个滑动的位置
        moveX=null;
        //设置一个滑动距离
        distanceX=null;


        //离开的时候,先清除定时器，再重新设置定时器，目的为了防止设置多个定时器
        clearInterval(timer);
        timer=setInterval(function () {
            index++;

            //事先执行动画
            //给ul设置过渡属性
            setTransition();

            //计算移动距离，并进行设置
            moveTarget(-index*lunboWidth);

        },4000);

    })




}








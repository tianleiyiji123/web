/**
 * Created by Lwang on 2015/11/4.
 */

$(function () {
    var page = 0,                                   //第几页
        bannerPage = 0,                               //第一页的index
        rightPage = 0,                                  //第二页右边图片切换index
        modOlIndex = 0,                             //第一页底部圆点
        containInner = $(".container-inner"),           //盒子内部
        picLi = $(".right-pic li"),                 //第二页右边图片li
        picLiW = picLi.width();                     //第二页右边图片长度
    //初始化第二页右边图片ul长度
    $(".right-pic").css({
        width: picLi.length * picLiW,
        left: -picLiW
    });

    //ie兼容 添加ieBg class
    var bowType = window.navigator.userAgent.toLocaleLowerCase();
    if (/msie/gi.test(bowType)) {
        $(".ieBg").css("background", "none");
    }

    //设置整个页面的高度
    var browserH = $(window).height(),              //浏览器高度
        browserW = $(window).width();               //浏览器长度
    $(".mod-pic-3").css("right", -(browserW - 25));
    $(".resize").height(browserH).width(browserW);
    $(window).resize(function () {
        browserH = $(window).height();
        browserW = $(window).width();
        if (browserW < 1280) {
            picLiW = 510;
        } else if (browserW < 1680 && browserW > 1280) {
            picLiW = 560;
        } else if (browserW > 1680) {
            picLiW = 760;
        }
        //获取mod-2右边模块的长度；
        $(".right-pic").css({
            width: picLi.length * picLiW,
            left: -picLiW
        });

        ////根据屏幕高度，屏幕上东西相应调整
        //if (browserH < 768) {
        //    //第二页东西高度位置调整
        //    $(".mod-2-inside").css("top", 0.2 * browserH);
        //}


        //第三页随屏幕改变
        if($(".mod-pic-3").css("right") == "0px"){
            $(".mod-pic-3").css("right", 0);
        }else{
            $(".mod-pic-3").css("right", -(browserW - 25));
        }


        setTimeout(function () {
            $(".resize").css({
                "width": browserW,
                "height": browserH
            });
            //当屏幕尺寸改变重置定位位置
            $(".container-inner").css("top", -browserH * page);
        }, 10);
    });

    //获取mod-1模块ul的长度
    var oli = $(".mod-1 ul li"),
        _length = oli.length,
        liW = $(window).width();
    $(".mod-1 ul").css(
        {
            "width": _length * liW
        }
    );
    $(".mod-ban-rel").css("width", $(window).width());


    //滚轮事件
    var bool = true;
    var s1;
    exports.addEvent(document, "mousewheel", function (e) {
        var conInner = $(".container-inner"),
            ofTab = $(".of-tab ul li");
        var _top = Number(conInner.css("top").substring(0, conInner.css("top").length - 2));


        if (bool) {
            bool = false;
            s1 = setTimeout(function () {
                bool = true;
            }, 800);
            if (e.delta < 0 && _top <= 0 && _top > -browserH * 3) {
                conInner.animate({
                    top: _top - browserH
                }, 500, "linear", function () {
                    page++;
                    switch (page) {
                        case 0 :
                            ofTab.eq(page).css("borderBottom", "4px solid #b4a85a").siblings().attr("style", "none");
                            break;
                        case 1 :
                            ofTab.eq(page).css("borderBottom", "4px solid #ae4242").siblings().attr("style", "none");
                            break;
                        case 2 :
                            ofTab.eq(page).css("borderBottom", "4px solid #3a6e90").siblings().attr("style", "none");
                            break;
                        case 3 :
                            ofTab.eq(page).css("borderBottom", "4px solid #3a9b7a").siblings().attr("style", "none");
                            break;
                    }
                });
            } else if (e.delta > 0 && _top >= -browserH * 3 && _top < 0) {
                conInner.animate({
                    top: _top + browserH
                }, 500, "linear", function () {
                    page--;
                    switch (page) {
                        case 0 :
                            ofTab.eq(page).css("borderBottom", "4px solid #b4a85a").siblings().attr("style", "none");
                            break;
                        case 1 :
                            ofTab.eq(page).css("borderBottom", "4px solid #ae4242").siblings().attr("style", "none");
                            break;
                        case 2 :
                            ofTab.eq(page).css("borderBottom", "4px solid #3a6e90").siblings().attr("style", "none");
                            break;
                        case 3 :
                            ofTab.eq(page).css("borderBottom", "4px solid #3a9b7a").siblings().attr("style", "none");
                            break;
                    }
                });
            }

        }

    });


    //第一页banner切换
    $(".swiper-index-left").click(function () {
        var modLi = $(".mod-1 ul li");
        bannerPage = modOlIndex;
        bannerPage = bannerPage == modLi.length - 1 ? 0 : bannerPage + 1;
        modOlIndex = bannerPage;
        $(".mod-1 ol li").eq(bannerPage).addClass("modLiActive").siblings().removeClass("modLiActive");
        modLi.eq(bannerPage).fadeIn(800).css("z-index", 2).siblings().fadeOut(800).css("z-index", 0);
    });
    $(".swiper-index-right").click(function () {
        bannerPage = modOlIndex;
        var modLi = $(".mod-1 ul li");
        bannerPage = bannerPage == 0 ? modLi.length - 1 : bannerPage - 1;
        modOlIndex = bannerPage;
        $(".mod-1 ol li").eq(bannerPage).addClass("modLiActive").siblings().removeClass("modLiActive");
        modLi.eq(bannerPage).fadeIn(800).css("z-index", 2).siblings().fadeOut(800).css("z-index", 0);
    });

    $(".mod-1 ol li").mouseenter(function () {
        modOlIndex = $(this).index();
        var modLi = $(".mod-1 ul li");
        modLi.eq(modOlIndex).fadeIn(800).css("z-index", 2).siblings().fadeOut(800).css("z-index", 0);
        $(this).addClass("modLiActive").siblings().removeClass("modLiActive");
    });


    //第二页右部切换功能

    $(".mod-sm-lf").click(function () {

        var picLi = $(".right-pic li");
        $(".right-pic").stop().animate({
            "left": -2 * picLiW
        }, 400, "easeInQuad", function () {
            $(".right-pic").append(picLi.eq(0).clone()[0]).css("left", -picLiW);
            picLi.eq(0).remove();
            rightPage++;
            if (rightPage == 4) {
                rightPage = 0;
            }
            $(".leftWord li").eq(rightPage).css("display","block").fadeIn().siblings().fadeOut();
            $(".mod-2-right ol li").eq(rightPage).addClass("dotActive").siblings().removeClass("dotActive");

        });
    });
    $(".mod-sm-rt").click(function () {

        var riPic = $(".right-pic");
        riPic.stop().animate({
            "left": 0
        }, 400, "easeInQuad", function () {
            riPic.prepend(riPic.find("li:last-child").clone()[0]);
            riPic.find("li:last-child").remove();
            riPic.css("left", -picLiW);
            if (rightPage == 0) {
                rightPage = 4;
            }
            rightPage--;
            $(".leftWord li").eq(rightPage).css("display","block").fadeIn().siblings().fadeOut();
            $(".mod-2-right ol li").eq(rightPage).addClass("dotActive").siblings().removeClass("dotActive");
        });
    });


    //导航栏切换
    $(".of-tab ul li").click(function () {
        var s = $(this),
            _index = s.index();
        s.css({
            "background": "url(img/tab-bg.png) center no-repeat",
            "backgroundSize": "100% 70px"
        });
        switch (_index) {
            case 0 :
                s.css("borderBottom", "4px solid #b4a85a");
                containInner.animate({"top": 0}, 400, "linear");
                page = 0;
                break;
            case 1:
                s.css("borderBottom", "4px solid #ae4242");
                containInner.animate({"top": -browserH}, 400, "linear");
                page = 1;
                break;
            case 2:
                s.css("borderBottom", "4px solid #3a6e90");
                containInner.animate({"top": -2 * browserH}, 400, "linear");
                page = 2;
                break;
            case 3:
                s.css("borderBottom", "4px solid #3a9b7a");
                containInner.animate({"top": -3 * browserH}, 400, "linear");
                page = 3;
                break;
        }
        s.siblings().attr("style", "none");
    });


    //第三模块左右移动

    $(".mod-3-arr-rt").click(function () {
        $(this).hide();
        $(".mod-pic-3").animate({
            "right": 0
        }, 1500, "easeOutCubic", function () {
        });
        setTimeout(function () {
            $(".mod-pic-1").find("img").animate({"opacity":0.3});
            $(".mod-3-mid").css({"background": "rgba(0,0,0,0.3)"});
            $(".mod-3-arr-lf").show();
        }, 1000);
    });

    $(".mod-3-arr-lf").click(function () {
        $(this).hide();
        $(".mod-3-mid").css({"background": "none"});
        $(".mod-pic-3").animate({
            "right": -browserW + 25
        }, 1500, "easeOutCubic", function () {
        });
        setTimeout(function () {
            $(".mod-pic-1").find("img").animate({"opacity":1});
            $(".mod-3-arr-rt").show();
        }, 400);
    })

});
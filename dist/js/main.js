/**
 * Created by Lwang on 2015/11/21.
 */


;
(function (win, $, e) {
    //定义事件;
    var events = {
        "Click": "click",
        "mouseenter": "mouseenter"
    };

    function Main(options) {
        if (!(this instanceof Main)) {
            return new Main(options)
        }
        var s = this;
        var defaultOpt = {
            "page": 0,                                         //页数
            "bannerPage": 0,                                   //第一页banner页数
            "rightPage": 0,                                     //第二页右边页数
            "win": $(window),                                    //获取window对象
            "browserW": $(window).width(),                      //初始化浏览器长度
            "browserH": $(window).height(),                     //初始化浏览器高度
            "picLiW": $(".right-pic li").width()               //第二页右边长度
        };

        this.opt = $.extend({}, defaultOpt, options);

        s.init();
    }

    Main.prototype.init = function () {
        var s = this;
        //初始化mod-ban-rel的长度
        $(".mod-ban-rel").css("width", s.opt.browserW);

        //初始化第二页右边图片ul长度
        $(".right-pic").css({
            width: $(".right-pic li").length * s.opt.picLiW,
            left: -s.opt.picLiW
        });

        //初始化需要resize的标签(初始化长和高)
        $(".resize").height(s.opt.browserH).width(s.opt.browserW);

        //初始化第三页右边显出
        $(".mod-pic-3").css("right", -(s.opt.browserW - 25));

        //初始化识别浏览器，在ie下为ieBg样式添加样式
        ieCompatible();

        //改变浏览器尺寸每一页的改变
        s.opt.win.resize(function () {
            bwoResize(s);
        });

        scrollWheel(s);

        tabClick(s);

        pageThree(s);

        pageBanner(s);

        pageTwoExc(s);

    };

    //识别ie浏览器
    function ieCompatible() {
        if (/msie/g.test(e.browser)) {
            $(".ieBg").css("background", "none");
        }
    }

    function bwoResize(s) {
        s.opt.browserW = s.opt.win.width();
        s.opt.browserH = s.opt.win.height();
        $(".resize").css({
            "width": s.opt.browserW,
            "height": s.opt.browserH
        });

        //当屏幕尺寸改变重置定位位置
        $(".container-inner").css("top", -s.opt.browserH * s.opt.page);
        p1(s);
        p2(s);
        p3(s);
        p4(s);
    }


    //每一页需要随屏幕resize调整的样式执行
    function p1(s) {
    }

    function p2(s) {
        if (s.opt.browserW < 1280) {
            s.opt.picLiW = 510;
        } else if (s.opt.browserW < 1680 && s.opt.browserW > 1280) {
            s.opt.picLiW = 560;
        } else if (s.opt.browserW > 1680) {
            s.opt.picLiW = 760;
        }
        //获取mod-2右边模块的长度；
        $(".right-pic").css({
            width: $(".right-pic li").length * s.opt.picLiW,
            left: -s.opt.picLiW
        });
    }

    function p3(s) {
        var mp3 = $(".mod-pic-3");
        if (mp3.css("right") == "0px") {
            mp3.css("right", 0);
        } else {
            mp3.css("right", -(s.opt.browserW - 25));
        }
    }

    function p4(s) {
    }

    /**
     * 滚轮事件
     * @param   s 原型this
     */
    function scrollWheel(s) {
        //滚轮事件
        var bool = true;
        exports.wheel(document, "mousewheel", function (e) {
            var conInner = $(".container-inner"),
                ofTab = $(".of-tab ul li");
            var _top = Number(conInner.css("top").substring(0, conInner.css("top").length - 2));
            if (bool) {
                bool = false;
                setTimeout(function () {
                    bool = true;
                }, 800);
                if (e.delta < 0 && _top <= 0 && _top > -s.opt.browserH * 3) {
                    conInner.animate({
                        top: _top - s.opt.browserH
                    }, 500, "linear", function () {
                        s.opt.page++;
                        switch (s.opt.page) {
                            case 0 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #b4a85a").siblings().attr("style", "none");
                                break;
                            case 1 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #ae4242").siblings().attr("style", "none");
                                break;
                            case 2 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #3a6e90").siblings().attr("style", "none");
                                break;
                            case 3 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #3a9b7a").siblings().attr("style", "none");
                                break;
                        }
                    });
                } else if (e.delta > 0 && _top >= -s.opt.browserH * 3 && _top < 0) {
                    conInner.animate({
                        top: _top + s.opt.browserH
                    }, 500, "linear", function () {
                        s.opt.page--;
                        switch (s.opt.page) {
                            case 0 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #b4a85a").siblings().attr("style", "none");
                                break;
                            case 1 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #ae4242").siblings().attr("style", "none");
                                break;
                            case 2 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #3a6e90").siblings().attr("style", "none");
                                break;
                            case 3 :
                                ofTab.eq(s.opt.page).css("borderBottom", "4px solid #3a9b7a").siblings().attr("style", "none");
                                break;
                        }
                    });
                }

            }

        });
    }

    /**
     * 导航点击事件
     * @param s 原型this
     */
    function tabClick(s) {
        var conInner = $(".container-inner");
        $(".of-tab ul li").click(function () {
            var ss = $(this),
                _index = ss.index();
            ss.css({
                "background": "url(img/tab-bg.png) center no-repeat",
                "backgroundSize": "100% 70px"
            });
            switch (_index) {
                case 0 :
                    ss.css("borderBottom", "4px solid #b4a85a");
                    conInner.animate({"top": 0}, 400, "linear");
                    s.opt.page = 0;

                    break;
                case 1:
                    ss.css("borderBottom", "4px solid #ae4242");
                    conInner.animate({"top": -s.opt.browserH}, 400, "linear");
                    s.opt.page = 1;
                    break;
                case 2:
                    ss.css("borderBottom", "4px solid #3a6e90");
                    conInner.animate({"top": -2 * s.opt.browserH}, 400, "linear");
                    s.opt.page = 2;
                    break;
                case 3:
                    ss.css("borderBottom", "4px solid #3a9b7a");
                    conInner.animate({"top": -3 * s.opt.browserH}, 400, "linear");
                    s.opt.page = 3;
                    break;
            }
            ss.siblings().attr("style", "none");
        });
    }

    /**
     * 第三页左右拉
     * @param s 原型this
     */

    function pageThree(s) {
        $(".mod-3-arr-rt").click(function () {
            $(this).hide();
            $(".mod-pic-3").animate({
                "right": 0
            }, 1500, "easeOutCubic", function () {
            });
            setTimeout(function () {
                $(".mod-pic-1").find("img").animate({"opacity": 0.3});
                $(".mod-3-mid").css({"background": "rgba(0,0,0,0.3)"});
                $(".mod-3-arr-lf").show();
            }, 1000);
        });

        $(".mod-3-arr-lf").click(function () {
            $(this).hide();
            $(".mod-3-mid").css({"background": "none"});
            $(".mod-pic-3").animate({
                "right": -s.opt.browserW + 25
            }, 1500, "easeOutCubic", function () {
            });
            setTimeout(function () {
                $(".mod-pic-1").find("img").animate({"opacity": 1});
                $(".mod-3-arr-rt").show();
            }, 400);
        });
    }

    /**
     * banner 切换
     * @param s     原型切换
     */
    function pageBanner(s) {
        var bp = s.opt.bannerPage;
        $(".swiper-index-left").click(function () {
            var modLi = $(".mod-1 ul li");
            bp = bp == modLi.length - 1 ? 0 : bp + 1;
            $(".mod-1 ol li").eq(bp).addClass("modLiActive").siblings().removeClass("modLiActive");
            modLi.eq(bp).fadeIn(800).css("z-index", 2).siblings().fadeOut(800).css("z-index", 0);
        });
        $(".swiper-index-right").click(function () {
            var modLi = $(".mod-1 ul li");
            bp = bp == 0 ? modLi.length - 1 : bp - 1;
            $(".mod-1 ol li").eq(bp).addClass("modLiActive").siblings().removeClass("modLiActive");
            modLi.eq(bp).fadeIn(800).css("z-index", 2).siblings().fadeOut(800).css("z-index", 0);
        });

        $(".mod-1 ol li").mouseenter(function () {
            bp = $(this).index();
            var modLi = $(".mod-1 ul li");
            modLi.eq(bp).fadeIn(800).css("z-index", 2).siblings().fadeOut(800).css("z-index", 0);
            $(this).addClass("modLiActive").siblings().removeClass("modLiActive");
        });
    }

    /**
     * 第二页右边切换
     * @param s 原型this
     */

    function pageTwoExc(s) {


        $(".mod-sm-lf").click(function () {
            var picLi = $(".right-pic li");
            $(".right-pic").stop().animate({
                "left": -2 * s.opt.picLiW
            }, 400, "easeInQuad", function () {
                $(".right-pic").append(picLi.eq(0).clone()[0]).css("left", -s.opt.picLiW);
                picLi.eq(0).remove();
                s.opt.rightPage++;
                if (s.opt.rightPage == 4) {
                    s.opt.rightPage = 0;
                }
                $(".leftWord li").eq(s.opt.rightPage).css("display", "block").fadeIn().siblings().fadeOut();
                $(".mod-2-right ol li").eq(s.opt.rightPage).addClass("dotActive").siblings().removeClass("dotActive");

            });
        });
        $(".mod-sm-rt").click(function () {
            var riPic = $(".right-pic");
            riPic.stop().animate({
                "left": 0
            }, 400, "easeInQuad", function () {
                riPic.prepend(riPic.find("li:last-child").clone()[0]);
                riPic.find("li:last-child").remove();
                riPic.css("left", -s.opt.picLiW);
                if (s.opt.rightPage == 0) {
                    s.opt.rightPage = 4;
                }
                s.opt.rightPage--;
                $(".leftWord li").eq(s.opt.rightPage).css("display", "block").fadeIn().siblings().fadeOut();
                $(".mod-2-right ol li").eq(s.opt.rightPage).addClass("dotActive").siblings().removeClass("dotActive");
            });
        });

    }

    win.Main = Main;

}(window, jQuery, exports));

var m = new Main();



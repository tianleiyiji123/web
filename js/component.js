/**
 * Created by wanglei on 2015/11/8.
 */

$(".swiper-index-left").click(function(){
    //if(bannerPage ==3){
    //    bannerPage = 0;
    //}
    //bannerPage++;

    var modLi = $(".mod-1 ul li");
    $(".mod-1 ul").animate({
        "left":-2*liW
    },400,"linear",function(){
        $(".mod-1 ul").append(modLi.eq(0).clone()[0]).css("left",-liW);
        $(".mod-1 ul li").eq(0).remove();
        //$(".active").removeClass("animated fadeInLeftBig");
    });
});
$(".swiper-index-right").click(function(){
    //if(bannerPage == 0){
    //    bannerPage = 3;
    //}



    //$(".active").addClass("animated fadeInLeftBig");
    var modUl = $(".mod-1 ul");
    modUl.animate({
        "left":0
    },400,"linear",function(){
        modUl.prepend(modUl.find("li:last-child").clone()[0]);
        modUl.find("li:last-child").remove();
        modUl.css("left",-liW);

    });
    //bannerPage--;
});



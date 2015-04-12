/* 控制瀑布流的加载  */
$(window).scroll(function(){
    var documentTop = $(document).scrollTop();
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    //var txt = "windowHeight:"+windowHeight + " |*$*| documentTop:"+documentTop + " |*$*| documentHeight:"+documentHeight;
    //当 documentTop >= (documentHeight-windowHeight) 说明滚动条已经滚动到底部了
    if(documentTop >= (documentHeight-windowHeight)){
        var tableTxt = $("#table").html();
        $("#txt").append("<hr>" + tableTxt);
    }
    
})
$("#menu-btn").click(function() {
    if ($(this).attr("class") === "menu")
    {
        $(this).attr("class","close");

        $("#menu-page").css("top","5vh");
        $("#menu-page").css("left","-5vw");
        setTimeout(function(){
            $("#menu-page > text").css("color","black");
            $("#menu-page").css("top","0vh");
            $("#menu-page").css("left","0vw");
            $("#menu-page").css("border-radius","0px");
        },400);
    }
    else if ($(this).attr("class") === "close")
    {
        $(this).attr("class","menu");

        $("#menu-page").css("top","-100vh");
        $("#menu-page").css("left","100vw");
            $("#menu-page > text").css("color","transparent");
            $("#menu-page").css("border-radius","50px");
    }
});

function navigate(value){
    $('html,body').animate({scrollTop: $("#"+value).offset().top},'slow');
}
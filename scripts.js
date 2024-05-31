function menu_toggle(){
    if ($("#menu-btn").attr("class") === "menu")
    {
        // $("body").css("overflow-y", "hidden");
        $("#menu-btn").attr("class","close");

        $("#menu-page").css("top","5vh");
        $("#menu-page").css("left","-5vw");
        setTimeout(function(){
            $("#menu-page > text").css("color","black");
            $("#menu-page").css("top","0vh");
            $("#menu-page").css("left","0vw");
            $("#menu-page").css("border-radius","0px");
        },400);
    }
    else if ($("#menu-btn").attr("class") === "close")
    {
        // $("body").css("overflow-y", "auto");
        $("#menu-btn").attr("class","menu");

        $("#menu-page").css("top","-100vh");
        $("#menu-page").css("left","100vw");
            $("#menu-page > text").css("color","transparent");
            $("#menu-page").css("border-radius","50px");
    }
}
$("#menu-btn").click(function() {
    menu_toggle()
});

function navigate(value){
    $('html,body').animate({scrollTop: $("#"+value).offset().top},'slow');
    menu_toggle()
}

$("#copy").html("firmtech &copy; 2017-" + new Date().getFullYear().toString());
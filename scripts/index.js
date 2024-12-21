$(document).ready(function() {
    
    $("#menu-btn").click(function() {
        menu_toggle()
    });    

    $("#copy").html("firmtech &copy; 2017-" + new Date().getFullYear().toString());
});

r = 0;
setTimeout(()=>{
    $("#boot-logo").css("transform", "rotateX(-45deg) rotateY(-45deg)");
    $("#boot-logo").css("width", "50vh");
    $("#boot-logo").css("height", "50vh");
    setInterval(()=>{
        $("#boot-logo").css("transform", "rotateX("+r+"deg) rotateY("+r+"deg) rotate("+r+"deg)");
        r = r+1;
    },50);
},200);
function boot_end() {
    setTimeout(()=>{
        $("#boot-logo").css("width", "0vh");
        $("#boot-logo").css("height", "0vh");
        setTimeout(()=>{
            $("#boot").css("opacity", "0");
            setTimeout(()=>{
                $("#boot").css("display", "none");
            },500);
        },500);
    },3000);
}

function menu_toggle(){
    if ($('.menu').attr('data') === 'opened') {
        // $("body").css("overflow-y", "hidden");
        $('.s1').attr('class', 'stick s1');
        $('.s2').attr('class', 'stick s2');
        $('.s3').attr('class', 'stick s3');
        $('.menu').attr('data', 'clossed');
        $('.menu-page').attr('class', 'menu-page menu-page-clossed');

        $("#menu-page>text").css("width", "0px");
        $("#menu-page>text").css("transform", "rotateY(50deg)");

        setTimeout(function(){
            $("#menu-page").css("top","-100vh");
            $("#menu-page").css("left","100vw");
            $("#menu-page").css("border-radius","50px");

        },400);
    }
    else if ($('.menu').attr('data') === 'clossed') {
        // $("body").css("overflow-y", "auto");
        $('.s1').attr('class', 'stick s1 s1-open');
        $('.s2').attr('class', 'stick s2 s2-open');
        $('.s3').attr('class', 'stick s3 s3-open');
        $('.menu').attr('data', 'opened');
        $('.menu-page').attr('class', 'menu-page menu-page-opened');

        $("#menu-page").css("top","5vh");
        $("#menu-page").css("left","-5vw");
        setTimeout(function(){
            $("#menu-page").css("top","0vh");
            $("#menu-page").css("left","0vw");
            $("#menu-page").css("border-radius","0px");
            $("#menu-page>text").css("width", "300px");
            $("#menu-page>text").css("transform", "rotateY(15deg)");
        },400);
    }
}

function navigate_menu(value){
    $('html,body').animate({scrollTop: $("#"+value).offset().top},'slow');
    menu_toggle()
}

function navigate(value){
    $('html,body').animate({scrollTop: $("#"+value).offset().top},'slow');
}

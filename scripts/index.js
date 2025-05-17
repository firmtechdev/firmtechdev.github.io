$(document).ready(function() {

    gsap.registerPlugin(ScrollTrigger);

    // Fade + Scale for .fade-text
    gsap.timeline({
      scrollTrigger: {
        trigger: ".pinned-fade",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true
      }
    })
    .to(".fade-text", { opacity: 1, scale: 1, duration: 1, ease: "none" })
    .to(".fade-text", { opacity: 0, scale: 0.8, duration: 1, ease: "none" });

    // Fade + Scale for .scale-text
    gsap.timeline({
      scrollTrigger: {
        trigger: ".pinned-scale",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true
      }
    })
    .to(".scale-text", { opacity: 1, scale: 1, duration: 1, ease: "none" })
    .to(".scale-text", { opacity: 0, scale: 0.8, duration: 1, ease: "none" });

    $("#menu-btn").click(function() {
        menu_toggle()
    });    

    $("#copy").html("firmtech &copy; 2017-" + new Date().getFullYear().toString());
});

setTimeout(()=>{
    $("#boot-logo").css("transform", "rotateX(-45deg) rotateY(-45deg)");
    $("#boot-logo").css("width", "50vh");
    $("#boot-logo").css("height", "50vh");
},200);
function boot_end() {
    setTimeout(()=>{
        $("#boot").css("backdrop-filter", "blur(10px)");
    },1500);
    setTimeout(()=>{
        $("#boot").css("background", "#ffffff80");
    },2000);
    setTimeout(()=>{
        $("#boot-logo").css("width", "0vh");
        $("#boot-logo").css("height", "0vh");
        setTimeout(()=>{
            $("#boot").css("opacity", "0");
            setTimeout(()=>{
                $("#boot").css("display", "none");
                displayLetter();
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

var text = "Blends innovation and artistry to create elegant softwares";
var index = 0;
var count = 1;
function displayLetter() {
    $("#description").html(text.substr(0, index + 1) + " |");
    index++;

    if (index <= text.length) {
        setTimeout(displayLetter, 50);
    }
    else {
        const animate = (count) => {
        if (count === 5) 
        if (count > 4) return;
        $('#description').html(text + ' |');
        setTimeout(() => {
            $('#description').html(text);
            setTimeout(() => animate(count + 1), 500);
        }, 500);
        };
        animate(1);
    }
}
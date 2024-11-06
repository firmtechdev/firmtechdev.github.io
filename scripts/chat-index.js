if (sessionStorage.getItem("user_id") == null) {
    window.location.href = "login.htm";
}

window.load = ()=> {
	$("body").css("margin-left", "0vw");
	mdc_and_rippls();
	pogress_end();
}

window.move = (page)=>{
	$('html,body').animate({scrollLeft: $('#' + page).offset().left},'50');
}

window.view_chat = (id)=>{
	progress_start();
	$("body").css("margin-left", "-300vw");
	sessionStorage.setItem("receiver_id", id);
	setTimeout(()=>{
		window.location.href = "chat-window.html";
	},350);
}

window.logout = ()=> {
    sessionStorage.removeItem("user_id");
    window.location.href = "login.htm";
}

function mdc_and_rippls(){
	const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

	var tabs = document.querySelectorAll('.mdc-tab');
	tabs.forEach(button => {
		mdc.ripple.MDCRipple.attachTo(button);
	});

	var buttons = document.querySelectorAll('.mdc-button');
	buttons.forEach(button => {
		mdc.ripple.MDCRipple.attachTo(button);
	});

	var listItems = document.querySelectorAll('.mdc-deprecated-list-item');
	listItems.forEach(item => {
		mdc.ripple.MDCRipple.attachTo(item);
	});

    const recents_list = new mdc.list.MDCList(document.querySelector('#recents_list'));
    recents_list.singleSelection = true;

    const others_list = new mdc.list.MDCList(document.querySelector('#others_list'));
    others_list.singleSelection = true;
}

window.progress_start = ()=> {
	$("#progress-bar").css("left", "0px");
	$("#progress-bar").css("right", "auto");
	$("#progress-bar").css("width", "100%");
}

window.pogress_end = ()=> {
	$("#progress-bar").css("left", "auto");
	$("#progress-bar").css("right", "0px");
	$("#progress-bar").css("width", "0%");
}

if (sessionStorage.getItem("user_id") !== null) {
	try {
	    const user = await fetch_collection_by_filter("users", { 'id': sessionStorage.getItem("user_id") });
	    $("#text").html("Hi " + user.username);
	    $("body").show();
	} catch {
		$("#text").html("Hi Username");
	}
} else {
    window.location.href = "login.htm";
}
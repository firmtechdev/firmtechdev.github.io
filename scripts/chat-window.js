if (sessionStorage.getItem("user_id") == null) {
    window.location.href = "login.htm";
}

var receiver_id = sessionStorage.getItem("receiver_id");
// var receiver_id = 'vW4FLo7CssZiypk9ehsp'; //faris
// var receiver_id = 'ozOjcnfHklpy1ajHkdik'; //rishad

window.load = ()=> {
	$("body").css("margin-left", "0vw");
	// pogress_end();
}

window.set_chat = async ()=> {
	const sender = await fetch_collection_by_filter("users", { 'id': receiver_id });
	var user = await fetch_collection_by_filter("users", { 'id': sessionStorage.getItem("user_id") });
	$("#user").html("logined by " + user.username);
	$("#title").html(sender.username + " • firmchat");
	$("#sender_name").html(sender.username);
}

var prev_response = false;

window.set_messages = async ()=> {
	var out_messages = await fetch_collections_by_multi_filter("messages", "receiver_id", receiver_id, "sender_id", sessionStorage.getItem("user_id") );
	var in_messages = await fetch_collections_by_multi_filter("messages", "receiver_id", sessionStorage.getItem("user_id"), "sender_id", receiver_id );
	var messages = [...out_messages, ...in_messages];
	messages.sort((a, b) => {
    	return a.data.timestamp - b.data.timestamp; 
	});
	var lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : null;
	if (prev_response !== lastMessageId) {
		progress_start();
		$("#messages").empty();
		messages.forEach((message) => {
			if (message.data.sender_id === sessionStorage.getItem("user_id")){
				var css_class = 'out-msg';
			} else {
				var css_class = 'in-msg';
			};
			$("#messages").append(
				"<div class='msg " + css_class + " mdc-ripple-surface' id='" + message.id + "'>" + 
					message.data.message + 
				"</div>"
			);
		});
		$(".msg").css("transform", "scale(1)");
		prev_response = lastMessageId;
		$('html,body').animate({scrollTop: $('.textarea--fixed-adjust').offset().top},'slow');
		mdc_and_rippls();
		pogress_end();
	}
}

window.back = ()=> {
	progress_start();
	$("body").css("margin-left", "110vw");
	setTimeout(()=>{
		window.location.href = "index.html";
	},350);
}

window.validate_msg = ()=> {
	var msg = document.getElementById("send-msg-text");
	var rows_count = msg.value.split("\n").length;
	if (rows_count > 1) {
		$("#send-msg-text").attr("rows", "3");
		$("#send-msg-label").css("height", "104px");
	}
	else {
		$("#send-msg-text").attr("rows", "2");
		$("#send-msg-label").css("height", "80px");
	}
	if ($("#send-msg-text").val() === "") {
		$("#send-msg-btn").attr("class", "mdc-fab mdc-fab--extended mdc-ripple-upgraded");
		$("#send-msg-btn").attr("onclick", "");
		$("#send-msg-btn").css("background", "white");
		$("#send-msg-btn").css("transform", "rotate(0deg)");
		$("#send-msg-btn > span").css("color", "#6200ee");
		$(".mdc-fab__label").html("Send");
	}
	else {
		$("#send-msg-btn").attr("class", "mdc-fab mdc-ripple-upgraded");
		$("#send-msg-btn").attr("onclick", "send_msg();");
		$("#send-msg-btn").css("background", "#6200ee");
		$("#send-msg-btn").css("transform", "rotate(-45deg)");
		$("#send-msg-btn > span").css("color", "white");
		$(".mdc-fab__label").html("");
	}
}

window.send_msg = ()=> {
	var message = $('#send-msg-text').val().replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
	var timestamp = new Date().getTime();
	$("#messages").append(
		"<div class='msg out-msg mdc-ripple-surface' id='" + timestamp + "'>" + 
			message + 
		"</div>"
	);
    $('html,body').animate({scrollTop: $('.textarea--fixed-adjust').offset().top},'slow');
    $("#"+timestamp).css("transform", "scale(1)");
	var data = {
		message:     message,
		receiver_id: receiver_id,
		sender_id:   sessionStorage.getItem("user_id"),
		status:      "sent",
		timestamp:   timestamp
	};
	add_collection("messages", data);
	$('#send-msg-text').val(null);
    validate_msg();
	mdc_and_rippls();
}

window.logout = function () {
    sessionStorage.removeItem("user_id");
    window.location.href = "login.htm";
}

window.test_msg = ()=>{
	var timestamp = new Date().getTime();
	$("#messages").append(
		"<div class='msg in-msg mdc-ripple-surface' id='" + timestamp + "'>"+
			"test&nbsp;message<br>&#128512;<br>message&nbsp;test"+
		"</div>"
	);
    $('html,body').animate({scrollTop: $('.textarea--fixed-adjust').offset().top},'slow');
    $("#"+timestamp).css("transform", "scale(1)");
	mdc_and_rippls();
}

function mdc_and_rippls(){
	var fabs = document.querySelectorAll('.mdc-fab');
	fabs.forEach(button => {
		mdc.ripple.MDCRipple.attachTo(button);
	});

	var mdctextFields = document.querySelectorAll('.mdc-text-field');
	mdctextFields.forEach(field => {
		mdc.textField.MDCTextField.attachTo(field);
	});

	var iconButtons = document.querySelectorAll('.mdc-icon-button');
	iconButtons.forEach(button => {
		mdc.ripple.MDCRipple.attachTo(button);
	});

	var msgs = document.querySelectorAll('.msg');
	msgs.forEach(button => {
		mdc.ripple.MDCRipple.attachTo(button);
	});
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
setInterval(()=>{set_messages()},500);
set_chat();
set_messages();
mdc_and_rippls();
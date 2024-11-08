if (sessionStorage.getItem("user_id") == null) {
	window.location.href = "login.htm";
}

var load_stat = "unload";

window.load = () => {
	$("body").css("margin-left", "0vw");
	mdc_and_rippls();
	setTimeout(() => {
		move('recents');
	}, 500);
}

window.move = async (page) => {
	$('html,body').animate({ scrollLeft: $('#' + page).offset().left }, '50');
	if (page === "others" && load_stat === "unload") {
		progress_start();
		var users = await fetch_collection("users");
		var other_users = [];
		$("#others_list").empty();
		for (const user of users) {
			var msg_send_check = await get_others_chatlist(user.id, 'sender_id');
			var msg_receved_check = await get_others_chatlist(user.id, 'receiver_id');
			if (msg_send_check == null && msg_receved_check == null) {
				$("#others_list").append(
					"<li class='mdc-deprecated-list-item' onclick='view_chat(`" + user.id + "`)'>" +
					"<span class='mdc-deprecated-list-item__ripple'></span>" +
					"<span class='mdc-deprecated-list-item__graphic material-icons'>&#xe853;</span>" +
					"<span class='mdc-deprecated-list-item__text'>" +
					"<span class='mdc-deprecated-list-item__primary-text'>" + user.data.username + "</span>" +
					"<span class='mdc-deprecated-list-item__secondary-text'>click here to say first Hii</span>" +
					"</span>" +
					"<span class='mdc-deprecated-list-item__meta'>offline</span>" +
					"<li class='mdc-list-divider'></li>" +
					"</li>"
				);
				mdc_and_rippls();
			}
			load_stat = "loaded";
		}
		pogress_end();
	}
}

window.view_chat = (id) => {
	progress_start();
	$("body").css("margin-left", "-300vw");
	sessionStorage.setItem("receiver_id", id);
	setTimeout(() => {
		window.location.href = "chat-window.html";
	}, 350);
}

window.search = async (key) => {
	progress_start();
	var searched_users = await search_users(key);
	$("#search_list").empty();
	for (const user of searched_users) {
		$("#search_list").append(
			"<li class='mdc-deprecated-list-item' onclick='view_chat(`" + user.id + "`)'>" +
			"<span class='mdc-deprecated-list-item__ripple'></span>" +
			"<span class='mdc-deprecated-list-item__graphic material-icons'>&#xe853;</span>" +
			"<span class='mdc-deprecated-list-item__text'>" +
			"<span class='mdc-deprecated-list-item__primary-text'>" + user.data.username + "</span>" +
			"<span class='mdc-deprecated-list-item__secondary-text'>click here to say first Hii</span>" +
			"</span>" +
			"<span class='mdc-deprecated-list-item__meta'>offline</span>" +
			"<li class='mdc-list-divider'></li>" +
			"</li>"
		);
	}
	if (searched_users.length > 0) {
		$("#search_list").prepend("<text class='mdc-typography--caption all-peoples'>searchs :" + key + "</text>");
	} else {
		$("#search_list").empty();
		$("#search_list").append("<text class='mdc-typography--caption all-peoples'>no results:" + key + "</text>");
	}
	if (key === "") {
		$("#search_list").empty();
	}
	mdc_and_rippls()
	pogress_end();
}

window.logout = () => {
	sessionStorage.removeItem("user_id");
	window.location.href = "login.htm";
}

function mdc_and_rippls() {
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

	var mdctextFields = document.querySelectorAll('.mdc-text-field');
	mdctextFields.forEach(field => {
		mdc.textField.MDCTextField.attachTo(field);
	});
}

window.progress_start = () => {
	$("#progress-bar").css("left", "0px");
	$("#progress-bar").css("right", "auto");
	$("#progress-bar").css("width", "100%");
}

window.pogress_end = () => {
	$("#progress-bar").css("left", "auto");
	$("#progress-bar").css("right", "0px");
	$("#progress-bar").css("width", "0%");
}

if (sessionStorage.getItem("user_id") !== null) {
	try {
		// Fetch user details and greet the user
		var user = await fetch_collection_by_filter("users", { 'id': sessionStorage.getItem("user_id") });
		$("#text").html("Hi " + user.username);

		// Fetch sent and received messages, then combine and sort them by timestamp
		var out_messages = await fetch_collections_by_filter("messages", "sender_id", sessionStorage.getItem("user_id"));
		var in_messages = await fetch_collections_by_filter("messages", "receiver_id", sessionStorage.getItem("user_id"));
		var messages = [...out_messages, ...in_messages].sort((a, b) => a.data.timestamp - b.data.timestamp);

		// Get unique user IDs from recent conversations
		var recent_users_id = new Set(messages.flatMap(message => [message.data.sender_id, message.data.receiver_id]));

		// Fetch recent messages from users
		var recent_messages = [];

		for (const id of recent_users_id) {
			var user = await fetch_collection_by_filter("users", { 'id': id });
			// Get the last sent and received messages for the user
			var [last_send_msg, last_received_msg] = await Promise.all([
				get_last_message(user.id, 'sender_id'),
				get_last_message(user.id, 'receiver_id')
			]);
			// Determine the most recent message and its type
			let last_msg, type;
			if (last_send_msg && (!last_received_msg || last_send_msg.timestamp >= last_received_msg.timestamp)) {
				last_msg = last_send_msg;
				type = "in";
			} else if (last_received_msg) {
				last_msg = last_received_msg;
				type = "you";
			}
			// Handle the case where there is no last message
			if (last_msg) {
				recent_messages.push({
					uid: user.id,
					username: user.username,
					type: type,
					last_msg: last_msg.message || " ", // Default to an empty space if message is null
					time: new Date(last_msg.timestamp).toLocaleString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					})
				});
			}
		}
		$("#recents_list").empty();
		recent_messages.forEach((data) => {
			if (data.uid == sessionStorage.getItem("user_id")) {
				var secondary_text = "message to yourself";
				var time = "you";
			}
			else {
				var secondary_text = data.type + " : " + data.last_msg;
				var time = data.time;
			}
			$("#recents_list").append(
				"<li class='mdc-deprecated-list-item' onclick='view_chat(`" + data.uid + "`)'>" +
				"<span class='mdc-deprecated-list-item__ripple'></span>" +
				"<span class='mdc-deprecated-list-item__graphic material-icons'>&#xe853;</span>" +
				"<span class='mdc-deprecated-list-item__text'>" +
				"<span class='mdc-deprecated-list-item__primary-text'>" + data.username + "</span>" +
				"<span class='mdc-deprecated-list-item__secondary-text'>" + secondary_text + "</span>" +
				"</span>" +
				"<span class='mdc-deprecated-list-item__meta'>" + time + "</span>" +
				"<li class='mdc-list-divider'></li>" +
				"</li>"
			);
			mdc_and_rippls();
		});

		// console.log("End");

		mdc_and_rippls();
		pogress_end();
	} catch {
		$("#text").html("Hi Username");
	}
} else {
	window.location.href = "login.htm";
}
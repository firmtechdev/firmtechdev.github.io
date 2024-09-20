if (sessionStorage.getItem("user_id") !== null) {
	window.location.href = "index.html";
}

window.load = function () {
	$("#progress-bar").css("width", "0%");
	$(".login-left-div").css("opacity", "1");
	$(".login-left-div").css("transform", "scale(100%)");
}

window.view_signup = function () {
	$(".login-display-visible").css("opacity", "0");
	$(".signup-display-visible").css("opacity", "0");
	$(".login-card").css("transform", "rotateY(180deg) scale(125%)");
	$(".login-card").css("height", "377px");
	$(".signup-card").css("transform", "rotateY(0deg) scale(125%)");
	$(".signup-card").css("height", "377px");
	setTimeout(() => {
		$(".login-body").css("background", "linear-gradient(45deg, transparent, #6200ee40)");
		$(".login-card").css("transform", "rotateY(180deg) scale(100%)");
		$(".signup-card").css("transform", "rotateY(0deg) scale(100%)");
	}, 250);
	setTimeout(() => {
		$(".signup-display-visible").css("opacity", "1");
	}, 500);
	clear_feilds();
	validate_signup();
}

window.goto_login = function () {
	$(".login-display-visible").css("opacity", "0");
	$(".signup-display-visible").css("opacity", "0");
	$(".login-card").css("transform", "rotateY(0deg) scale(125%)");
	$(".login-card").css("height", "282px");
	$(".signup-card").css("transform", "rotateY(180deg) scale(125%)");
	$(".signup-card").css("height", "282px");
	setTimeout(() => {
		$(".login-body").css("background", "linear-gradient(315deg, transparent, #6200ee40)");
		$(".login-card").css("transform", "rotateY(0deg) scale(100%)");
		$(".signup-card").css("transform", "rotateY(180deg) scale(100%)");
	}, 250);
	setTimeout(() => {
		$(".login-display-visible").css("opacity", "1");
	}, 500);
	clear_feilds();
	validate_login();
}

window.clear_feilds = function () {
	$(".mdc-text-field-helper-text").css("opacity", "0");
	$(".mdc-text-field").css("box-shadow", "none");
	// $("#username").reset();
	$("#username").val(null);
	// $("#password").reset();
	$("#password").val(null);
	// $("#create-username").reset();
	$("#create-username").val(null);
	// $("#create-password").reset();
	$("#create-password").val(null);
	// $("#confirm-password").reset();
	$("#confirm-password").val(null);
}

window.validate_login = function () {
	var username = $("#username").val().trim();
	var password = $("#password").val().trim();
	if (username === "" || password === "") {
		$("#login-btn").attr("disabled", "disabled");
	}
	else {
		$("#login-btn").removeAttr("disabled");
	}
}

window.validate_signup = async function () {
	var username = $("#create-username").val().trim();
	var password = $("#create-password").val().trim();
	var confirm_password = $("#confirm-password").val().trim();
	if (username === "") {
		$("#create-user-btn").attr("disabled", "disabled");
		$("#create-username-label").css("box-shadow", "none");
		$("#create-username-helper").css("color", "transparent !important");
		$("#create-username-helper").css("opacity", "0 !important");
	}
	else {
		$("#progress-bar").css("width", "100%");
		var user = await fetch_collection_by_filter("users", { 'username': username });
		if (!user) {
			$("#create-username-label").css("box-shadow", "green 0px 0px 0px 2px");
			$("#create-username-helper").css("color", "transparent !important");
			$("#create-username-helper").css("opacity", "0 !important");
			$("#create-username-helper").html("");
			if (password === "" && confirm_password === "") {
				$("#create-user-btn").attr("disabled", "disabled");
			}
			else if (password === "" || confirm_password === "") {
				$("#create-user-btn").attr("disabled", "disabled");
			}
			else if (password != confirm_password) {
				$("#create-user-btn").attr("disabled", "disabled");
				$("#create-password-label").css("box-shadow", "red 0px 0px 0px 2px");
				$("#confirm-password-label").css("box-shadow", "red 0px 0px 0px 2px");
				$("#create-password-helper, #confirm-password-helper").css("opacity", "1");
				$("#create-password-helper, #confirm-password-helper").html("password not mach");
			} else {
				$("#create-user-btn").removeAttr("disabled");
				$("#create-password-label").css("box-shadow", "none");
				$("#confirm-password-label").css("box-shadow", "none");
				$("#create-password-helper, #confirm-password-helper").css("opacity", "0");
			}
		}
		else {
			$("#create-user-btn").attr("disabled", "disabled");
			$("#create-username-label").css("box-shadow", "red 0px 0px 0px 2px");
			$("#create-username-helper").html("'" + username + "' is not available");
			$("#create-username-helper").css("color", "red");
			$("#create-username-helper").css("opacity", "1");
		}
		$("#progress-bar").css("width", "0%");
	};
	if (password === "" && confirm_password === "") {
		$("#create-user-btn").attr("disabled", "disabled");
	}
	else if (password === "" || confirm_password === "") {
		$("#create-user-btn").attr("disabled", "disabled");
	}
	else if (password != confirm_password) {
		$("#create-user-btn").attr("disabled", "disabled");
		$("#create-password-label").css("box-shadow", "red 0px 0px 0px 2px");
		$("#confirm-password-label").css("box-shadow", "red 0px 0px 0px 2px");
		$("#create-password-helper, #confirm-password-helper").css("opacity", "1");
		$("#create-password-helper, #confirm-password-helper").html("password not mach");
	} else {
		$("#create-password-label").css("box-shadow", "none");
		$("#confirm-password-label").css("box-shadow", "none");
		$("#create-password-helper, #confirm-password-helper").css("opacity", "0");
	}
}

window.create_user = async function () {
	$("#progress-bar").css("width", "100%");
	var username = $("#create-username").val().trim();
	var password = CryptoJS.MD5($("#create-password").val().trim()).toString(CryptoJS.enc.Hex);

	var user = await fetch_collection_by_filter("users", { 'username': username });
	if (user) {
		console.log("User already exists:", username);
	} else {
		const userData = {
			username: username,
			password: password
		};
		add_collection("users", userData);		
		$("#progress-bar").css("width", "0%");
		alert("User created successfully");
		goto_login();
	}
}

window.login = async function () {
	$("#progress-bar").css("width", "100%");
	$("#username-label").css("box-shadow", "none");
	$("#password-label").css("box-shadow", "none");
	$(".mdc-text-field-helper-text").css("opacity", "0");
	var username = $("#username").val().trim();
	var password = CryptoJS.MD5($("#password").val().trim()).toString(CryptoJS.enc.Hex);
	var user = await fetch_collection_by_filter("users", { 'username': username });
	if (user.username == username && user.password == password) {
		sessionStorage.setItem("user_id", user.id);
		window.location.href = "index.html";
	} else {
		const foundUsername = user.username == username;
		if (foundUsername) {
			$("#username-label").css("box-shadow", "green 0px 0px 0px 2px");
		} else {
			$("#username-label").css("box-shadow", "red 0px 0px 0px 2px");
			$("#username-helper").html("'" + username + "' is not a valid");
			$("#username-helper").css("opacity", "1");
		}
		const userFoundWithWrongPassword = foundUsername && user.password != password;
		if (userFoundWithWrongPassword) {
			$("#password-label").css("box-shadow", "red 0px 0px 0px 2px");
			$("#password-helper").html("incurrect password");
			$("#password-helper").css("opacity", "1");
		}
		$("#progress-bar").css("width", "0%");
	}
}

var mdctextFields = document.querySelectorAll('.mdc-text-field');
mdctextFields.forEach(field => {
	mdc.textField.MDCTextField.attachTo(field);
});

const buttons = document.querySelectorAll('.mdc-button');
buttons.forEach(button => {
	mdc.ripple.MDCRipple.attachTo(button);
});
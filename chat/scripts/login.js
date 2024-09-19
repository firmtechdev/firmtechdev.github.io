if (sessionStorage.getItem("user_id") !== null) {
	window.location.href = "index.html";
}

function view_signup(){
	$(".login-display-visible").css("opacity", "0");
	$(".signup-display-visible").css("opacity", "0");
	$(".login-card").css("transform", "rotateY(180deg) scale(125%)");
	$(".signup-card").css("transform", "rotateY(0deg) scale(125%)");
	setTimeout(()=>{
		$(".login-body").css("background", "linear-gradient(45deg, transparent, #6200ee40)");
		$(".login-card").css("transform", "rotateY(180deg) scale(100%)");
		$(".signup-card").css("transform", "rotateY(0deg) scale(100%)");
	},250);
	setTimeout(()=>{
		$(".signup-display-visible").css("opacity", "1");
	},500);
}

function goto_login(){
	$(".login-display-visible").css("opacity", "0");
	$(".signup-display-visible").css("opacity", "0");
	$(".login-card").css("transform", "rotateY(0deg) scale(125%)");
	$(".signup-card").css("transform", "rotateY(180deg) scale(125%)");
	setTimeout(()=>{
		$(".login-body").css("background", "linear-gradient(315deg, transparent, #6200ee40)");
		$(".login-card").css("transform", "rotateY(0deg) scale(100%)");
		$(".signup-card").css("transform", "rotateY(180deg) scale(100%)");
	},250);
	setTimeout(()=>{
		$(".login-display-visible").css("opacity", "1");
	},500);
}

function validate_login(){
	username = $("#username").val().trim();
	password = $("#password").val().trim();
	if(username === "" || password === ""){
		$("#login-btn").attr("disabled", "disabled");
	}
	else{
		$("#login-btn").removeAttr("disabled");
	}
}

function validate_signup(){
	username = $("#create-username").val().trim();
	password = $("#create-password").val().trim();
	if(username === "" || password === ""){
		$("#create-user-btn").attr("disabled", "disabled");
	}
	else{
		$("#create-user-btn").removeAttr("disabled");
	}
}

function create_user(){
	const usersRef = db.collection('users');
	username = $("#create-username").val().trim();
	password = CryptoJS.MD5($("#create-password").val().trim()).toString(CryptoJS.enc.Hex);

	fetch_collection("users").then((users) => {
	    const foundUser = users.find(user => user.username === username);
	    if (foundUser) {
	     	console.log("User already exists:", foundUser);
	    } else {
			const userData = {
				username: username,
				password: password
			};
			usersRef.add(userData)
			.then(docRef => {
				console.log('User created ID: ', docRef.id);
			})
			.catch(error => {
				console.error('Error creating user: ', error);
			});
	    }
 	});
}

function login(){
	username = $("#username").val().trim();
	password = CryptoJS.MD5($("#password").val().trim()).toString(CryptoJS.enc.Hex);
	fetch_collection("users").then((users) => {
	    const foundUser = users.find(user => user.username === username && user.password === password);
	    if (foundUser) {
	     	console.log("User exists:", foundUser);
	     	sessionStorage.setItem("user_id", foundUser.id);
	     	window.location.href = "index.html";
	    } else {
	     	console.log("User not found");
	    }
 	});
}

var mdctextFields = document.querySelectorAll('.mdc-text-field');
mdctextFields.forEach(field => {
    mdc.textField.MDCTextField.attachTo(field);
});

const buttons = document.querySelectorAll('.mdc-button');
buttons.forEach(button => {
    mdc.ripple.MDCRipple.attachTo(button);
});
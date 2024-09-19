
const db = firebase.firestore();

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

function create_user(){
	const usersRef = db.collection('users');
	username = $("#ctrate-username").val().trim();
	password = CryptoJS.MD5($("#ctrate-password").val().trim()).toString(CryptoJS.enc.Hex);

	fetch_collection("users").then((users) => {
	    const foundUser = users.find(user => user.username === username && user.password === password);
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
	    } else {
	     	console.log("User not found");
	    }
 	});
}

function fetch_collection(collection) {
  return db.collection(collection).get().then((querySnapshot) => {
    const results = []; 
    querySnapshot.forEach((doc) => {
     	results.push({ id: doc.id, ...doc.data() });  
    });
    return results; 
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
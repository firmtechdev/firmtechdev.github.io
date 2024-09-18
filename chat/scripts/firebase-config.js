import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkaaydRiv1IvychMmJ8KRVkRdIee3Qgbg",
    authDomain: "chat-35a83.firebaseapp.com",
    projectId: "chat-35a83",
    storageBucket: "chat-35a83.appspot.com",
    messagingSenderId: "844400376293",
    appId: "1:844400376293:web:a2372dbdcbf497f7aed70c",
    measurementId: "G-2VMB93QW6Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

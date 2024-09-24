if (sessionStorage.getItem("user_id") == null) {
    window.location.href = "login.htm";
}

if (sessionStorage.getItem("user_id") !== null) {
    const user = await fetch_collection_by_filter("users", { 'id': sessionStorage.getItem("user_id") });
    $("#text").html("Hello " + user.username);
    $("body").show();
} else {
    window.location.href = "login.htm";
}

window.logout = function () {
    sessionStorage.removeItem("user_id");
    window.location.href = "login.htm";
}
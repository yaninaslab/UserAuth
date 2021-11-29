
function login_success(response) {

    Cookies.set("login_token", response['data']['token']);
    var status = document.getElementById("login_status");
    status.innerText = "You have successfully logged in!";

}

function login_failure(error) {

    var status = document.getElementById("login_status");
    status.innerText = "Your login has failed!";

}

function attempt_login(e) {

    var email_input = document.getElementById("email_input");
    var password_input = document.getElementById("password_input");

    axios.request({
        url: "https://reqres.in/api/login",
        method: "POST",
        data: {
            email: email_input.value,
            password: password_input.value,
        }
    }).then(login_success).catch(login_failure);

}

var login_button = document.getElementById("login_submit");
login_button.addEventListener('click', attempt_login);
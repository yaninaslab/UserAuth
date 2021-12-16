// This function redirects the user to home page on the successful login. 
// Also, it sets the cookies with a token from API for tracking the user.
function login_success(response) {

    Cookies.set("login_token", response['data']['token']);
    location.replace('/home.html');

}
// The user will get error message if the login is unsuccessful.
function login_failure(error) {

    var status = document.getElementById("login_status");
    status.innerText = "Your login has failed!";

}
// This is axios request to the API endpoint with POST method which transfers input values to the server.
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
// Here we set the event that fires when the Login button is clicked.
document.getElementById("login_submit").addEventListener('click', attempt_login);
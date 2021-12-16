
// If the user tries to access the home.html page without being logged in, 
// they will be alerted to lo in. We use cookies here that we set in app.js file.
if (!Cookies.get("login_token")) {
    alert("You haven't logged in!")
    location.replace('/index.html');


}
// This function removes cookies and redirect to index page once Log out button is clicked. 
function log_out() {
    Cookies.remove("login_token");
    location.replace('/index.html');
}
// This function calls axios request considering that we have 2 pages of colors.
function get_color(page = 1) {
    axios.request({
        url: "https://reqres.in/api/unknown?page=" + page

    }).then(color_success).catch(color_failure);
}

// This function allows to get the values from all pages in the API.
function color_success(response) {
   // Here we add the items to the array
    colors.push(...response.data.data)
    //Here we compare if pages = total_pages
    if (response.data.total_pages === response.data.page) {
        create_colors();
    }else {
        // If not, this function will call the second page
        get_color(response.data.page+1);
    }

}
// This is the main function here that creates a list of colors from the API. 
function create_colors() {
    var container = document.getElementById("card_container");
// Here is the loop over the elements
    for (var i = 0; i < colors.length; i++) {
// Getting name
        var user_div = document.createElement("div");
        var color_name = document.createElement("h2");
        color_name.innerText = colors[i]['name'];
        user_div.append(color_name);
        container.append(user_div);
// Getting year
        var year = document.createElement("h3");
        year.innerText = colors[i]['year'];
        card_container.append(year);
// Getting color number
        var color_number = document.createElement("div");
        color_number.classList.add('color_box');
        color_number.style.backgroundColor = colors[i]['color'];
        color_number.innerText = colors[i]['color'];
        container.append(color_number);


    }
}
// Function if something goes wrong
function color_failure(error) {

    var container = document.getElementById("card_container");
    var error_tag = document.createElement("h1");
    error_tag.innerText = "Sorry, something went wrong. Please refresh the page."
    container.append(error_tag);
}
// The following two lines triggers events on the buttons
document.getElementById("color_btn").addEventListener('click', get_color);

document.getElementById("log_out").addEventListener('click', log_out);
// We use this empty array to replace the response.data.data from the API.
var colors = [];
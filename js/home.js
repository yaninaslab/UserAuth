if (!Cookies.get("login_token")) {
    alert("You haven't logged in!")
    location.replace('/index.html');


}

function log_out() {
    Cookies.remove("login_token");
    location.replace('/index.html');
}

function get_color(page = 1) {
    axios.request({
        url: "https://reqres.in/api/unknown?page=" + page

    }).then(color_success).catch(color_failure);
}


function color_success(response) {
   
    colors.push(...response.data.data)
    if (response.data.total_pages === response.data.page) {
        create_colors();
    }else {
        get_color(response.data.page+1);
    }

}

function create_colors() {
    var container = document.getElementById("card_container");

    for (var i = 0; i < colors.length; i++) {

        var user_div = document.createElement("div");
        var color_name = document.createElement("h2");
        color_name.innerText = colors[i]['name'];
        user_div.append(color_name);
        container.append(user_div);

        var year = document.createElement("h3");
        year.innerText = colors[i]['year'];
        card_container.append(year);

        var color_number = document.createElement("div");
        color_number.classList.add('color_box');
        color_number.style.backgroundColor = colors[i]['color'];
        color_number.innerText = colors[i]['color'];
        card_container.append(color_number);


    }
}

function color_failure(error) {

    var container = document.getElementById("card_container");
    var error_tag = document.createElement("h1");
    error_tag.innerText = "Sorry, something went wrong. Please refresh the page."
    container.append(error_tag);
}

document.getElementById("color_btn").addEventListener('click', get_color);

document.getElementById("log_out").addEventListener('click', log_out);

var colors = [];
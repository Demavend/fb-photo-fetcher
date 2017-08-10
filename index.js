const FB_SCOPE = 'user_about_me,user_name,email,user_location,user_photos,user_birthday,user_likes';
const APP_ID = '111256712864654';
const VERSION = 'v2.10';
var oauth_url = `https://www.facebook.com/dialog/oauth/`+
                `?response_type=token&display=popup`+
                `&client_id=${APP_ID}`+
                `&redirect_uri=http://fb-photo-app.zzz.com.ua/`+
                `&scope=${FB_SCOPE}`;
//document.querySelector('#fb-btn').setAttribute('scope', FB_SCOPE);

window.fbAsyncInit = () => {
    FB.init({
        appId: APP_ID,
        oauth: true,
        cookie: true,
        xfbml: true,
        version: VERSION
    });
    FB.getLoginStatus(function(response) {
        console.log(response.status);
        statusChangeCallback(response);
    });
};

function setElements(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('logout').style.display = 'block';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('feed').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('heading').style.display = 'none';
    } else {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('feed').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('heading').style.display = 'block';
    }
};

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('Logged in and authenticated');
        setElements(true);
        testAPI();
    } else {
        console.log('Not authenticated');
        setElements(false);
    }
};

function testAPI() {
    FB.api('/me?fields=${user.name}', function(response) {
        if (response && !response.error) {
            console.log(response);
            buildProfile(response);
        }
        FB.api('/me/feed', function(response) {
            if (response && !response.error) {
                buildFeed(response);
            }
        });
    })
};

function buildProfile(user) {
    let profile = `<h3>${FB_SCOPE}</h3>
          <ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
            <li class="list-group-item">Birthday: ${user.birthday}</li>
            <li class="list-group-item">User ID: ${user.location.name}</li>
          </ul>
        `;
    document.getElementById('profile').innerHTML = profile;
};

function buildFeed(feed) {
    let output = '<h3>Latest Posts</h3>';
    for (let i in feed.data) {
        if (feed.data[i].message) {
            output += `<div class="well">
                ${feed.data[i].message} <span>${feed.data[i].created_time}</span>
              </div>
            `;
        }
    }
    document.getElementById('feed').innerHTML = output;
};

function logout() {
    FB.logout(function(response) {
        setElements(false);
    });
};

function login() {
    FB.login(function(response) {
        setElements(true);
        window.top.location = oauth_url;
    });
};

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/ru_RU/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

const FB_SCOPE = 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes';
const APP_ID = '161335491091695';
const VERSION = 'v2.10';
var oauth_url = `https://www.facebook.com/dialog/oauth/` +
    `?client_id=${APP_ID}` +
    `&redirect_uri="http://fb-photo-app.zzz.com.ua/"` +
    `&scope=${FB_SCOPE}`;

window.fbAsyncInit = () => {
    FB.init({
        appId: APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: VERSION
    });
    FB.getLoginStatus(function(response) {
        // TODO: use switch case loop
        // TODO: move css change classes to method and call it with params
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessToken = response.authResponse.accessToken;
            $(".loggedin").css('display', 'block');
            $(".loggedoff").css('display', 'none');
            console.log(uid);
            console.log(accessToken);
        } else if (response.status === 'not_authorized') {
            //User is logged into Facebook, but not your App
            // $(".loggedin").css('display', 'none');
            // $(".loggedoff").css('display', 'block');
            window.top.location = oauth_url;
        } else {
            // User is not logged into Facebook at all
            // $(".loggedin").css('display', 'none');
            // $(".loggedoff").css('display', 'block');
        }

        document.querySelector('.loggedin').addEventListener('click', function() {
            FB.logout(changeClass); //FB.logoff
        }, false);

        document.querySelector('.loggedoff').addEventListener('click', function() {
            FB.login(function(response) {
                // handle the response
                // $(".loggedin").css('display', 'block');
                // $(".loggedoff").css('display', 'none');

                window.top.location = oauth_url;
            }, {
                scope: FB_SCOPE
            }); //FB.login
        }, false);
    });
};

// (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {
//         return;
//     }
//     js = d.createElement(s);
//     // js.id = id;
//     // js.src = 'https://connect.facebook.net/en_US/sdk.js';
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

var oauth_url = 'https://www.facebook.com/dialog/oauth/';
oauth_url += '?client_id=161335491091695';
oauth_url += '&redirect_uri=' + 'http://fb-photo-app.zzz.com.ua/';
oauth_url += '&scope=user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes';
window.fbAsyncInit = function() {
  console.log('before init')
    FB.init({
        appId: '161335491091695',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.getLoginStatus(function(response) {
      console.log('resp', response)

        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessToken = response.authResponse.accessToken;
            $(".loggedin").css('display', 'block');
            $(".loggedoff").css('display', 'none');
            console.log(uid);
            console.log(accessToken);
            document.querySelector('.loggedin').addEventListener('click', function goLogIn() {
                FB.logout(function(response) {
                    // handle the response
                    $(".loggedin").css('display', 'none');
                    $(".loggedoff").css('display', 'block');
                }); //FB.logoff
            }, false);
        } else if (response.status === 'not_authorized') {
            //User is logged into Facebook, but not your App
            $(".loggedin").css('display', 'none');
            $(".loggedoff").css('display', 'block');
            window.top.location = oauth_url;
        } else {
            // User is not logged into Facebook at all
            $(".loggedin").css('display', 'none');
            $(".loggedoff").css('display', 'block');
            document.querySelector('.loggedoff').addEventListener('click', function goLogIn() {
                FB.login(function(response) {
                    // handle the response
                    $(".loggedin").css('display', 'block');
                    $(".loggedoff").css('display', 'none');
                    window.top.location = oauth_url;
                }, {
                    scope: 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes'
                }); //FB.login
            }, false);
        }
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

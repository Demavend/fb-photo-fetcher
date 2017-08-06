window.fbAsyncInit = function() {
    FB.init({
        appId: '161335491091695',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.getLoginStatus(function(response) {
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
        } else {
            // User is not logged into Facebook at all
            $(".loggedin").css('display', 'none');
            $(".loggedoff").css('display', 'block');
            document.querySelector('.loggedoff').addEventListener('click', function goLogIn() {
                FB.login(function(response) {
                    // handle the response
                    $(".loggedin").css('display', 'block');
                    $(".loggedoff").css('display', 'none');
                }, {
                    scope: 'email,user_likes'
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
    js.src = "//connect.facebook.net/ru_RU/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

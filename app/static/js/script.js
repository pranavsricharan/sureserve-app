var BASE_API_URL = '/api/';
var AUTH_TOKEN_KEY = 'authToken';

function checkAuth() {
    if(!$.jStorage.get(AUTH_TOKEN_KEY, null)) {
        window.location.replace('/login');
    }
}

function showStatus(id, text) {
    $('#' + id).text(text);
    $('#' + id).removeClass('error-hidden');
}

function hideStatus(id) {
    $('#' + id).addClass('error-hidden');
}

function login() {
    $("#login-form").on("submit", function(e) {
        e.preventDefault();
        username = $("input[name='login_username']")[0].value.trim();
        password = $("input[name='login_password']")[0].value.trim();

        if(username && password) {
            $.ajax({
                method: 'POST',
                url: BASE_API_URL + 'account/login',
                data: {
                    username: username,
                    password: password
                },
                success: function(data) {
                    if(data.auth) {
                        $('#login-error').addClass('error-hidden');
                        $.jStorage.set(AUTH_TOKEN_KEY, data.auth);
                        window.location.href = '/dashboard';
                    } else {
                        showStatus('login-error','Invalid username or password');
                        
                    }
                }, 
                failure: function(error) {
                    console.log(error);
                },
            });
        } else {
            showStatus('login-error','All fields are required');
        }
    });
}

function register() {
    $("#register-form").on("submit", function(e) {
        e.preventDefault();
        username = $("input[name='reg_username']")[0].value.trim();
        email = $("input[name='reg_email']")[0].value.trim();
        password = $("input[name='reg_password']")[0].value.trim();
        confirmPassword = $("input[name='reg_confirm_password']")[0].value.trim();
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        if(username && password && email && confirmPassword) {
            if(confirmPassword != password) {
                showStatus('register-error', "Passwords do not match!");
            }

            $.ajax({
                method: 'POST',
                url: BASE_API_URL + 'account/register',
                data: {
                    username: username,
                    email: email,
                    password: password
                },
                success: function(data) {
                    if(!data.success) {
                        showStatus('register-error', 'Username or email already exists');
                    } else {
                        hideStatus('register-error');
                        showStatus('register-success', 'Registration successful');
                    }
                }, 
                failure: function(error) {
                    console.log(error);
                },
            });
        } else {
            showStatus('register-error','All fields are required');
        }
    });
}


function dashboard() {
    $.ajax({
        method: 'GET',
        url: BASE_API_URL + 'dashboard',
        headers: { 'Authorization': $.jStorage.get(AUTH_TOKEN_KEY) },
        success: function(data) {
            if(data) {
                $('#username').text(data.username);
                $('#email').text(data.email);
                $('#member-since').text('Joined ' + moment(data.joinDate    ).fromNow());
            }
        }, 
        failure: function(error) {
            console.log(error);
        },
    });
    
}

$(function() {
    pageName = $('body').attr('page-name');
    console.log(pageName);
    allowedPages = ['login', 'register', 'home', '404'];
    
    if(pageName == "logout")
        $.jStorage.set(AUTH_TOKEN_KEY, null);

    if(allowedPages.indexOf(pageName) == -1) {
        checkAuth();
    }

    if(pageName == "login" || pageName == "home")
        login();

    if(pageName == "register" || pageName == "home")
        register();

    if(pageName == "dashboard")
        dashboard();
    

        
    
});
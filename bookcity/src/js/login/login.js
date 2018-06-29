define([
    'jquery'
], function ($) {
    var mes = '';
    $('.eye').on('click', function () {
        $(this).toggleClass('eye-open'); 
        if ($(this).hasClass('eye-open')) {
            $('#pass').attr('type', 'text');
        } else {
            $('#pass').attr('type', 'password');
        }
    });
    $('input:button').on('click', function () {
        var user = $('#user').val();
        var pass = $('#pass').val();

        var phoneReg = /^1[34578]\d{9}&/;
        var emailReg = /^\w+@\w+\.[com|cn|net]&/;
        var pwdReg = /[^a-z0-9]/i
        if (user === ''|| pass === '') {
            mes = '请输入用户名或密码';
            mesS(mes)
        } else {
            if ($(this).hasClass('log-btn')) {
                $.ajax({
                    url: '/log/login',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        user: user,
                        pass:pass
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.c) {
                            localStorage.setItem('log', 1);
                            history.back(-1);
                        } else {
                            mesS(res.mes);
                       }
                    },
                    error: function (err) {
                        console.warn(err);
                   } 
                });
            } else {
                $.ajax({
                    url: '/log/register',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        user: user,
                        pass:pass
                    },
                    success: function (res) {
                        if (res.c) {
                            localStorage.setItem('log', 1);
                            location.href = '/index.html';
                       }
                    },
                    error: function (err) {
                        console.warn(err);
                   } 
                });
           }
        }
    });
    $('#user').on('input', function () {
        mesH()
    });
    $('#pass').on('input', function () {
        mesH()
    });
    function mesS(mes) {
        $('.mes').text(mes).show();
    }
    function mesH() {
        $('.mes').text('').hide();
    }
});
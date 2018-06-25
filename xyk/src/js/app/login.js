require(['jquery', "storage"], function($, storage) {
    $('.login-btn').on('click', function() {
        var user = $('.user').val();
        var pwd = $('.pwd').val();
        var tip;
        if (!$.trim(user)) {
            tip = '用户名为空';
        } else if (!$.trim(pwd)) {
            tip = '密码为空';
        }
        if (tip) {
            alert(tip)
        } else {
            $.ajax({
                url: '/login',
                dataType: 'json',
                type: 'post',
                data: {
                    user: user,
                    pwd: pwd
                },
                success: function(res) {
                    console.log(res)
                    if (res.code === 0) {
                        storage.set("user", user);
                        history.go(-1);
                    } else {
                        alert(res.msg);
                    }
                },
                error: function(error) {
                    console.warn(error)
                }
            });
        }
    });
});
$(function () {
    getUserInfo();
    $('#out').on('click', function () {
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('登陆失败')
            }
            renderAvatar(res.data)
        }
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#werc').html('欢迎' + name);
    if (user.user_pic) {
        $('.layui-nav-img').prop('src', user.user_pic).show().siblings('.touxiang').hide();
    } else (
        $('.touxiang').html(name[0].toUpperCase()).show().siblings('.layui-nav-img').hide()
    )
} 
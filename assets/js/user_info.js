$(function () {
    var layer = layui.layer;
    var form = layui.form;
    inituserinfo();
    function inituserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                form.val('formUserInfo', res.data)
            }
        });
    }
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户名不能大于六位数'
            }
        }
    })
    $('#btnreser').on('click', function (e) {
        e.preventDefault();
        inituserinfo();
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg(res.message)
                window.parent.getUserInfo();
            }
        })
    })
})
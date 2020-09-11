$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        repwd: function (value) {
            var pwd = $('#iptt').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        },
        sampwd: function (value) {
            var pwd = $('#ipt').val();
            if (pwd == value) {
                return '新旧密码不能一致'
            }
        },
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更密码失败')
                }
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })
})
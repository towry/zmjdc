/* jshint asi: true, expr: true */
(function () {
    z.Login = function () {
        function b() {
            this.$email = $('#email'), this.$pass = $("#passwd"), this.$form = $("form.form"),
            this.$forgot_pass = $('a#forgot_pass'), this.$email.focus();
        }

        return b.prototype.addHandlers = function () {
            var c = this;

            return this.$forgot_pass.on('click', function (e) {
                e.preventDefault();

                if (c.$email.val() === '') {
                    alert('Please enter your email address and then click this click');
                    return false;
                } else {
                    alert('Currently this action can not be done');
                    return false;
                }
            }), this.$form.on('submit', function (e) {
                var email = c.$email.val()
                    , pass = c.$pass.val()
                    , email_valid = /^[\w\d\.]+@[\w\d\.]+\.\w{1,6}$/;

                pass === "" && c.$pass.focus().addClass('invalid').on('keydown', function () {
                    var val = c.$pass.val();
                    
                    if (val.length >= 5) {
                        /** in fact, the length should be 6,
                         * but the keydown is not same as keypress
                         * and keypress is not allways works
                         */
                         c.$pass.removeClass('invalid');
                    }
                }), !email.match(email_valid) && (function () {
                    z.message('error', z.i18n.text('email_format')), this.$email.focus().addClass('invalid').on('keydown', function (e) {
                        var val = c.$email.val();

                        if (val.match(email_valid)) {
                            c.$email.removeClass('invalid');
                        }
                    }).on('blur', function (e) {
                        var val = c.$email.val();

                        if (val.match(email_valid)) {
                            c.$email.removeClass('invalid');
                        }
                    });

                    return false;
                }).call(c);

                function valid() {
                    return email !== "" && email.match(email_valid) && pass !== "";
                }

                if (valid()) {
                    return !0;
                } else {
                    return !1;
                }
            })
        }, b;
    }(),  $(function () {   
      return z.login = new z.Login(), z.login.addHandlers();
    })
}).call(this);

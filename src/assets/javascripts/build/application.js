/* jshint asi: true, expr: true */
(function () {
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  }
}

if (! String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

Array.prototype.every = function(fn, scope) {
    var a = [];

    for(var i = 0, len =this.length; i < len; ++i) {
        if (fn.call(scope, this[i], i, this)) {
            a.push(this[i])
        }
    }

    return a;
}

}).call(this), function() {
    var e, t;
    window.z = (e = window.z) !== null ? e : {g:this}, e.g = (e.g === void(0) ? this : e.g), $(function () {
        var e, t, n;
        return $.ajaxPrefilter(function (e, t, n) {
            return n.setRequestHeader('X-CSRF-Token', $('meta[name="csrf_"]').attr('content'))
        }), n = navigator.userAgent.toLowerCase(), /webkit/.test(n) ? $('html').addClass('webkit') : /mozilla/.test(n) && !/(compatible|webkit)/.test(n) ? $('html').addClass('mozilla') : /msie/.test(n) && !/opera/.test(n) && $('html').addClass('ie'), navigator.platform.indexOf('Mac') !== -1 && $('html').addClass('mac'), 
        e = function () {
            return $(window).width() < 600 ? $('html').removeClass('is-desktop').addClass('is-mobile') : $('html').removeClass('is-mobile').addClass('is-desktop'),
            navigator.userAgent.match(/Android|BlackBerry|iPhone|iPod|iPad|IEMObile/i) ? ($('html').addClass('is-touch').removeClass('is-mouse'), z.isMobile = !0, $.fx.off = !0) : ($('html').removeClass('is-touch').addClass('is-mouse'), z.isMobile = !1, $.fx.off = !1)
        }, t = z.util.throttle(e, 200), e(), $(window).resize(t), $('html').removeClass('no-js').addClass('js');
    })
}.call(this), function () {
    var f = function () {
    };

    f.prototype.singleton = function (klass) {
        return klass.prototype._single ? klass.prototype._single : klass.prototype._single = new klass();
    }

    f.prototype.isArray = function (obj) {
        return obj.prototype.toString.call(obj) === '[object Array]';
    }

    f.prototype.isString = function (obj) {
        return typeof obj === 'string';
    }

    f.prototype.objectQuery = function (a) {
        var b = a ? a.substr(a.indexOf('?')) : window.location.search;

        return b.indexOf('?') !== -1 ? JSON.parse('{"' + decodeURI(b.substr(1).replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}') : '';
    }

    f.prototype.toUnicode = function (s) {
        return escape(s).toLowerCase().replace(/%u/gi, '\\u');
    }

    f.prototype.verseUnicode = function (s) {
        return unescape(s).replace(/\\u/gi, '%u');
    }

    f.prototype.throttle = function (f, d) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                f.apply(context, args);
            }, d ? d : 100);
        }
    }

    z.util = new f();
}.call(this), function () {
    z.i18n = {
        texts: {
            zh: {
                vote_later: "\u8bf7\u7a0d\u5019\u518d\u8bc4\u4ef7",
                need_auth: "\u4f60\u9700\u8981\u767b\u9646\u624d\u80fd\u8fdb\u884c\u64cd\u4f5c",
                email_format: "\u90ae\u4ef6\u5730\u5740\u683c\u5f0f\u4e0d\u6b63\u786e"
            }
        },
        text: function (l, s) {
            !s && (s = l, l = 'zh');

            return this.texts[l][s] ? this.texts[l][s] : '';
        }
    }
}.call(this), function () {
    var e = function (t, m, l) {
        var c;

        $message = $("#flash_notice").first(), cookies = z.g.Cookies, c = cookies.get('nfm_');

        if(t && m && !l) {
            return send(t, m);
        } else if (arguments.length > 2) {
            return later(t, m);
        }

        if (!c || c.trim() === "") return false;

        c = JSON.parse(c), c.ok && function () {
            c = z.util.verseUnicode(c.ok), c = c.split('+').join(' '), send('ok', c);
        }.call(this), c.error && function () {
            c = z.util.verseUnicode(c.error), c = c.split('+').join(' '), send('error', c);
        }.call(this);
    }, $message, cookies;

    function later(t, m) {
        var c = {};
        m = z.util.toUnicode(m.replace(/\s/ig, "+")), c[t] = m, c = JSON.stringify(c);

        z.g.Cookies && z.g.Cookies.set('nfm_', c);
    }

    function send(t, m) {
        t === 'error' && $message.removeClass('hide').fadeIn('normal').addClass('alert-danger').html(m) && setTimeout(function () {
            $message.removeClass().addClass('alert').hide();
        }, 4000), t === 'ok' && $message.removeClass('hide').fadeIn('normal').addClass('alert-success').html(m) && setTimeout(function () {
            $message.removeClass().addClass('alert').hide();
        }, 4000);

        cookies.expire('nfm_');
    }

    z.message = e;
}.call(this), function () {
    function e () {
        this.uid = null;
    }

    function _isAuth() {
        if (this.uid) return true;

        var that = this;

        $.ajax('/api/user', {
            async: false,
            cache: false,
            data: {
                type: 'userid',
                nuid: Cookies.get('nuid_'),
                suid: Cookies.get('suid_')
            },
            complete: function (d, s) {
                if (s === "success") {
                    var res;

                    res = typeof d.responseText === 'object' ? res : JSON.parse(d.responseText);

                    if (res.error_code) {
                        that.uid = null;
                        return false;
                    }

                    that.uid = parseInt(res.response_body);
                }
            }
        });

        return this.uid;
    }

    e.prototype.isauth = function () {
        return _isAuth.call(this);
    }

    z.user = z.util.singleton(e);
}.call(this),  $(function () {
    return z.message(), $("#menu").on('click', function (e) {
        e.preventDefault();

        $("#menu-items").toggleClass('visible');
    })
});

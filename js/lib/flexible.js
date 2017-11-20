(function (c, g) {
    var u = c.document;
    var b = u.documentElement;
    var n = u.querySelector('meta[name="viewport"]');
    var p = u.querySelector('meta[name="flexible"]');
    var a = 0;
    var t = 0;
    var m;
    var e = g.flexible || (g.flexible = {});
    if (n) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var f = n.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        if (f) {
            t = parseFloat(f[1]);
            a = parseInt(1 / t)
        }
    } else {
        if (p) {
            var k = p.getAttribute("content");
            if (k) {
                var s = k.match(/initial\-dpr=([\d\.]+)/);
                var i = k.match(/maximum\-dpr=([\d\.]+)/);
                if (s) {
                    a = parseFloat(s[1]);
                    t = parseFloat((1 / a).toFixed(2))
                }
                if (i) {
                    a = parseFloat(i[1]);
                    t = parseFloat((1 / a).toFixed(2))
                }
            }
        }
    } if (!a && !t) {
        var r = c.navigator.appVersion.match(/android/gi);
        var q = c.navigator.appVersion.match(/iphone/gi);
        var o = c.navigator.appVersion.match(/ipad/gi);
        var l = c.devicePixelRatio;
        if (q) {
            if (l >= 3 && (!a || a >= 3)) {
                a = 3
            } else {
                if (l >= 2 && (!a || a >= 2)) {
                    a = 2
                } else {
                    a = 1
                }
            }
        } else {
            a = 1
        }
        t = 1 / a
    }
    b.setAttribute("data-dpr", a);
    if (!n) {
        n = u.createElement("meta");
        n.setAttribute("name", "viewport");
        n.setAttribute("content", "initial-scale=" + t + ", maximum-scale=" + t + ", minimum-scale=" + t + ", user-scalable=no");
        if (b.firstElementChild) {
            b.firstElementChild.appendChild(n)
        } else {
            var h = u.createElement("div");
            h.appendChild(n);
            u.write(h.innerHTML)
        }
    }

    function d() {
        var w = navigator.userAgent;
        var z = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var x = true;
        for (var y = 0; y < z.length; y++) {
            if (w.indexOf(z[y]) > 0) {
                x = false;
                break
            }
        }
        return x
    }

    function j() {
        var v = b.getBoundingClientRect().width;
        if (d() && v < 2047) {
            v = v > 540 ? 540 : v
        }
        var w = v / 7.5;
        b.style.fontSize = w + "px";
        e.rem = c.rem = w
    }
    c.addEventListener("resize", function () {
        clearTimeout(m);
        m = setTimeout(j, 300)
    }, false);
    c.addEventListener("pageshow", function (v) {
        if (v.persisted) {
            clearTimeout(m);
            m = setTimeout(j, 300)
        }
    }, false);
    if (u.readyState === "complete") {
        u.body.style.fontSize = 14 * a + "px"
    } else {
        u.addEventListener("DOMContentLoaded", function (v) {
            u.body.style.fontSize = 14 * a + "px"
        }, false)
    }
    j();
    e.dpr = c.dpr = a;
    e.refreshRem = j;
    e.rem2px = function (w) {
        var v = parseFloat(w) * this.rem;
        if (typeof w === "string" && w.match(/rem$/)) {
            v += "px"
        }
        return v
    };
    e.px2rem = function (w) {
        var v = parseFloat(w) / this.rem;
        if (typeof w === "string" && w.match(/px$/)) {
            v += "rem"
        }
        return v
    }
})(window, window["lib"] || (window["lib"] = {}));
webpackJsonp([1], {
    "4gYD": function (t, a, i) {
        "use strict";
        Object.defineProperty(a, "__esModule", {value: !0});
        var e = i("dHdo"), n = i("yBia"), s = {
            components: {contactMusic: e.a, language: n.a}, data: function () {
                return {begainRot: 0, gameBegin: !1, validTime: ""}
            }, mounted: function () {
                var t = new Date, a = new Date("2018-08-04 12:08:00"), i = t.getTime(), e = (a.getTime() - i) / 1e3;
                this.setIntervalFn(e)
            }, methods: {
                goIndex: function () {
                    this.begainRot = 1;
                    window.location.href = "index"
                }, setIntervalFn: function (t) {
                    var a = this, i = this;
                    "string" == typeof t && (t = Number(t));
                    var e = t;
                    if (e) var n = setInterval(function () {
                        if (e > 0) {
                            e--;
                            var t = parseInt(e / 3600) < 10 ? "0" + parseInt(e / 3600) : parseInt(e / 3600),
                                s = parseInt((e - 60 * t * 60) / 60) < 10 ? "0" + parseInt((e - 60 * t * 60) / 60) : parseInt((e - 60 * t * 60) / 60),
                                o = parseInt(e % 60) < 10 ? "0" + parseInt(e % 60) : parseInt(e % 60);
                            i.validTime = t + ":" + s + ":" + o
                        } else a.gameBegin = !0, clearInterval(n)
                    }, 1e3)
                }
            }
        }, o = {
            render: function () {
                var t = this, a = t.$createElement, i = t._self._c || a;
                return i("div", [i("div", {staticClass: "join-bg"}, [i("div", {staticClass: "header"}, [t._m(0), t._v(" "), t.gameBegin ? i("div", {staticClass: "all-eos"}, [i("span", [t._v(t._s(t.$t("join.num")))]), t._v(" "), i("span", [t._v(t._s(t.$t("join.EOS")))]), t._v(" "), i("div", {
                    staticClass: "YaHei",
                    staticStyle: {"font-size": ".24rem", "margin-top": ".18rem"}
                }, [t._v(t._s(t.$t("join.gameSartTime")) + " 2018-08-11 15:00:00")])]) : i("div", {staticClass: "all-eos"}, [i("span", [t._v(t._s(t.validTime))]), t._v(" "), i("div", {staticClass: "end-time"}, [t._v(t._s(t.$t("join.begin")))])])]), t._v(" "), i("div", {staticClass: "container"}, [i("div", {staticClass: "bounced flex-colunm-center"}, [i("div", {staticClass: "title"}, [t._v(t._s(t.$t("join.title")))]), t._v(" "), i("div", {staticClass: "text"}, [i("p", [t._v(t._s(t.$t("join.infoFirst")))]), t._v(" "), i("p", [t._v(t._s(t.$t("join.infoThird")))]), t._v(" "), i("p", [t._v(t._s(t.$t("join.infoFour")))]), t._v(" "), i("p", [t._v(t._s(t.$t("join.infoFive")))]), t._v(" "), i("p", [t._v(t._s(t.$t("join.infoSix")))])]), t._v(" "), t.gameBegin ? i("div", {
                    staticClass: "iknow",
                    on: {click: t.goIndex}
                }, [t._v(t._s(t.$t("notice.beginGame2")))]) : t._e()])])]), t._v(" "), i("language", {
                    staticStyle: {
                        "margin-right": "2rem",
                        "margin-top": "0.2rem"
                    }
                }), t._v(" "), i("a", {
                    staticClass: "download-txt",
                    attrs: {href: "../../static/file/introduction.pdf", download: this.$t("join.gameInfo")}
                }, [t._v(t._s(t.$t("join.downInfo")))]), t._v(" "), i("contactMusic", {ref: "contactMusic"}), t._v(" "), i("div", {staticClass: "iknow"}, [i("a", {
                    staticStyle: {
                        color: "#fff",
                        position: "fixed",
                        bottom: ".15rem"
                    }, attrs: {href: "http://pre.ite.zone/index"}
                }, [t._v(t._s(t.$t("notice.beginGame1")))])])], 1)
            }, staticRenderFns: [function () {
                var t = this.$createElement, a = this._self._c || t;
                return a("div", {staticClass: "icon"}, [a("div", {staticClass: "header-icon"})])
            }]
        };
        var c = i("VU/8")(s, o, !1, function (t) {
            i("jdjj")
        }, "data-v-c5a5e642", null);
        a.default = c.exports
    }, dHdo: function (t, a, i) {
        "use strict";
        var e = {
            data: function () {
                return {audioStart: !0, audioObj: "", gitshow: !1}
            }, created: function () {
                document.addEventListener("click", function () {
                })
            }, methods: {
                audioStartFn: function () {
                    var t = this.$refs.audio;
                    this.audioStart ? t.pause() : t.play(), this.audioStart = !this.audioStart
                }, showGit: function () {
                    this.gitshow = !this.gitshow, this.$emit("hideAirdrop")
                }, hideGit: function () {
                    this.gitshow = !1
                }
            }
        }, n = {
            render: function () {
                var t = this, a = t.$createElement, i = t._self._c || a;
                return i("div", [i("div", {staticClass: "container",style:{display:"none"}}, [i("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.gitshow,
                        expression: "gitshow"
                    }], staticClass: "bounced flex-colunm-center"
                }, [i("div", {staticClass: "text"}, [t._v(t._s(t.$t("footer.CodeHasPassedSafelyAudit")))]), t._v(" "), i("div", {staticClass: "time"}, [t._v("2018.08.03")]), t._v(" "), i("a", {
                    staticClass: "gotogit",
                    attrs: {target: "_blank", href: "https://github.com/itecreator/eos-ite"}
                }, [t._v(t._s(t.$t("footer.ClickToCheckGitHub")))])]), t._v(" "), i("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.gitshow,
                        expression: "gitshow"
                    }], staticClass: "down"
                }), t._v(" "), i("div", {staticClass: "icons1"}, [i("a", {
                    staticClass: "icon1",
                    attrs: {href: "mailto:itesourcecode@163.com"}
                }), t._v(" "), i("a", {
                    staticClass: "icon2",
                    attrs: {href: "https://discord.gg/er4JYRP", target: "_blank"}
                }), t._v(" "), i("div", {
                    staticClass: "icon3", on: {
                        click: function (a) {
                            t.showGit()
                        }
                    }
                }), t._v(" "), i("div", {
                    class: [t.audioStart ? "icon4" : "icon5"],
                    on: {click: t.audioStartFn}
                })]), t._v(" "), i("audio", {
                    ref: "audio",
                    attrs: {src: "../../static/audio/music.mp3", id: "audio", loop: "", autoplay: "", preload: "auto"}
                })])])
            }, staticRenderFns: []
        };
        var s = i("VU/8")(e, n, !1, function (t) {
            i("r2Er")
        }, "data-v-2699f75e", null);
        a.a = s.exports
    }, jdjj: function (t, a) {
    }, r2Er: function (t, a) {
    }, vq0W: function (t, a) {
    }, yBia: function (t, a, i) {
        "use strict";
        var e = i("Dd8w"), n = i.n(e), s = i("NYxO"), o = {
            data: function () {
                return {
                    selectedLanguage: "../../static/image/mobile/en-US.png",
                    languageValue: "",
                    languageList: [{value: "zh-CN", imgPath: "../../static/image/mobile/zh-CN.png"}, {
                        value: "en-US",
                        imgPath: "../../static/image/mobile/en-US.png"
                    }, {value: "k-KOR", imgPath: "../../static/image/mobile/k-KOR.png"}, {
                        value: "j-JPN",
                        imgPath: "../../static/image/mobile/j-JPN.png"
                    }],
                    languageListShow: !1
                }
            }, created: function () {
            }, mounted: function () {
                this.languageListShow = !1, this.changeLanguage(this.$store.getters.localeLang)
            }, methods: n()({}, Object(s.b)({changeLocaleLang: "changeLocaleLang"}), {
                changeLanguage: function (t) {
                    this.languageListShow = !1, this.selectedLanguage = "../../static/image/mobile/" + t + ".png", this.changeLocaleLang(t), this.$i18n.locale = t
                }, languageListEvent: function () {
                    this.languageListShow = !this.languageListShow
                }
            }), computed: n()({}, Object(s.c)({localeLang: "localeLang"}), {
                localeLangShow: function () {
                    return this.$store.getters.localeLang
                }
            })
        }, c = {
            render: function () {
                var t = this, a = t.$createElement, i = t._self._c || a;
                return i("div", {staticClass: "language-box"}, [i("img", {
                    staticClass: "current-img",
                    attrs: {src: t.selectedLanguage, alt: "Chinese"},
                    on: {click: t.languageListEvent}
                }), t._v(" "), i("ul", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.languageListShow,
                        expression: "languageListShow"
                    }], staticClass: "language-list"
                }, t._l(t.languageList, function (a) {
                    return i("li", {
                        key: a.index, on: {
                            click: function (i) {
                                t.changeLanguage(a.value)
                            }
                        }
                    }, [i("img", {attrs: {src: a.imgPath, alt: a.value}})])
                }))])
            }, staticRenderFns: []
        };
        var r = i("VU/8")(o, c, !1, function (t) {
            i("vq0W")
        }, "data-v-1f3b68f0", null);
        a.a = r.exports
    }
});
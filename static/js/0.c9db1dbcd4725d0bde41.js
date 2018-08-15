webpackJsonp([0, 2, 3, 4], {
    "2iul": function (e, i, t) {
        e.exports = t.p + "static/img/login-ex.788333f.gif"
    }, "8WYC": function (e, i) {
    }, "8hXn": function (e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        var s = t("woOf"), o = t.n(s), r = t("mvHQ"), c = t.n(r), a = t("d2gY");
        var n = {
            filterArrayToObj: function (e, i, t) {
                if (e && (t = t || "id", e instanceof Array && e.length > 0)) return e.filter(function (e) {
                    return e[t] == i
                })[0]
            }
        }, l = (t("SAC9"), {
            props: ["pieData", "eosClient", "scatterEosClient", "scatter", "globalgameid"],
            data: function () {
                return {
                    titleList: ["login.energize", "login.restore", "login.recycle"],
                    recordDataList: [],
                    recordAllDataList: [],
                    recordShow: !1,
                    itemIndex: 0,
                    isLogin: !1,
                    numList: [5, 10, 100],
                    inputNum: "",
                    username: "",
                    account: "",
                    config: a.a,
                    myhodl: "0",
                    ite: "0",
                    totalSize: 0,
                    currentPage: 1,
                    pageSize: 6,
                    disabledShow: !1,
                    rightShow: !0,
                    loadingPopShow: !1,
                    successPopShow: !1,
                    failurePopShow: !1,
                    gameoverPopShow: !1,
                    loginPopShow: !1,
                    hero: "",
                    heroReward: "",
                    myReward: "",
                    claim_price: "",
                    eosActionClient: null,
                    claim_txt: "login.click",
                    limitOptionTime: 15,
                    failInfoResponse: "",
                    globalLimitTime: ""
                }
            },
            created: function () {
                var e = this;
                setTimeout(function () {
                    e.scatter && e.scatter.identity && e.loginConfirm()
                }, 1e3)
            },
            computed: {
                tokenName: function () {
                    return a.a.tokenName
                }
            },
            mounted: function () {
                if (this.scatter && this.scatter.identity) {
                    this.isLogin = !0;
                    var e = window.scatter.identity.accounts.find(function (e) {
                        return "eos" === e.blockchain
                    });
                    this.username = e.name, this.getCurrencyBalance(this.username)
                } else this.isLogin = !1;
                this.getActions(), this.getRate(), this.getBuyRate(), this.getSellRate(), this.getBurnRate(), this.get_gameinfo(), this.get_userinfo()
            },
            methods: {
                getCurrentPrice: function () {
                    return ((this.pieData.quote_balance - this.pieData.destroy_balance) / (this.pieData.init_max - this.pieData.total_reserved)).toFixed(4)
                }, playMusic: function () {
                    this.$refs.audioOption.play()
                }, handleChange: function (e) {
                    this.recordDataList = this.recordAllDataList.slice(6 * (e - 1), 6 * e)
                }, get_gameinfo: function () {
                    var e = this;
                    this.eosClient && this.eosClient.getTableRows({
                        json: "true",
                        code: a.a.gameContract,
                        scope: a.a.gameContract,
                        table: "game",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        i.rows[i.rows.length - 2] ? (e.hero = i.rows[i.rows.length - 2].hero, e.heroReward = i.rows[i.rows.length - 2].hero_reward, e.claim_price = i.rows[i.rows.length - 2].claim_price, e.get_userinfo()) : (e.hero = "", e.heroReward = "", e.claim_price = "")
                    }).catch(function (e) {
                        console.error(e)
                    })
                }, titlesSwitch: function (e) {
                    this.itemIndex = e, this.inputNum = ""
                }, plusNum: function (e) {
                    this.inputNum = this.inputNum - 0 + e
                }, getRate: function () {
                    return this.pieData.quote_balance / (this.pieData.init_max - this.pieData.total_reserved)
                }, getBuyRate: function () {
                    return (this.inputNum - (this.inputNum + 199) / 200) / this.getRate()
                }, getSellRate: function () {
                    var e = Number(this.pieData.quote_balance - this.pieData.init_quote_balance),
                        i = this.getCurrentPrice() * this.inputNum * .995;
                    return e <= i ? e : i
                }, getBurnRate: function () {
                    var e = Number(this.pieData.quote_balance - this.pieData.init_quote_balance);
                    return e <= this.getCurrentPrice() * this.inputNum / 100 * this.pieData.burn_price_ratio ? e : this.getCurrentPrice() * this.inputNum / 100 * this.pieData.burn_price_ratio
                }, noMoreTotalAlive: function (e) {
                    if (e > .01 * this.pieData.total_alive) return this.$emit("tipsShow", this.$t("login.noMoreTotalAlive1")), !0
                }, myrecordShow: function () {
                    this.recordShow = !this.recordShow, this.getActions(), 1 == this.recordShow ? this.$ms.$emit("result", 0) : this.$ms.$emit("result", 1)
                }, loginConfirm: function () {
                    var e = this;
                    setTimeout(function () {
                        e.scatter ? e.scatter.getIdentity({accounts: [a.a.eosNetwork]}).then(function (i) {
                            console.log(i), i && i.accounts.length > 0 && (e.account = i.accounts.find(function (e) {
                                return "eos" === e.blockchain
                            }), e.isLogin = !0, e.loginPopShow = !1, e.rightShow = !0, e.username = e.account.name, e.$emit("username", e.account.name), e.getCurrencyBalance(e.account.name), e.get_userinfo(), console.log("current login user is ", e.account.name))
                        }).catch(function (e) {
                        }) : window.open("https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle")
                    }, 0)
                }, getCurrencyBalance: function (e) {
                    if (this.eosClient && e) {
                        var i = this;
                        this.eosClient.getCurrencyBalance({
                            code: a.a.tokenContract,
                            account: e,
                            symbol: a.a.mainToken
                        }).then(function (e) {
                            i.$ms.$emit("myeos", e[0])
                        }, function (e) {
                            console.log(e)
                        })
                    }
                }, get_userinfo: function () {
                    if (this.eosClient) {
                        var e = this;
                        this.eosClient.getTableRows({
                            json: "true",
                            code: a.a.gameContract,
                            scope: this.username,
                            table: "userinfo",
                            limit: 100,
                            lower_bound: 0
                        }).then(function (i) {
                            var t = i.rows, s = n.filterArrayToObj(t, e.globalgameid, "gameid"), o = e.globalgameid,
                                r = n.filterArrayToObj(t, o, "gameid");
                            e.myReward = r ? Number(r.hodl * e.claim_price.slice(0, e.claim_price.length - 4)).toFixed(4) : 0, e.myhodl = s ? s.hodl : 0, e.$emit("getUserinfo")
                        }).catch(function (i) {
                            e.$emit("loginMethod")
                        })
                    }
                }, handleClick: function () {
                    var e = this;
                    1 != this.itemIndex && this.noMoreTotalAlive(this.inputNum) || (this.limitOptionTime < 15 ? this.disabledShow = !0 : (this.globalLimitTime = setInterval(function () {
                        e.limitOptionTime > 0 ? (e.disabledShow = !0, e.limitOptionTime--) : (e.disabledShow = !1, clearInterval(e.globalLimitTime), e.limitOptionTime = 15)
                    }, 1e3), 0 == this.itemIndex ? this.buy() : 1 == this.itemIndex ? this.sell() : this.destroy()))
                }, buy: function () {
                    if (this.playMusic(), !this.username) return this.rightShow = !1, void(this.loginPopShow = !0);
                    if (this.inputNum) {
                        var e = String(this.inputNum).split(".");
                        if (e[1] && e[1].length > 4) this.$emit("tipsShow", this.$t("login.numFixed")); else {
                            this.loadingPopShow = !0, this.rightShow = !1;
                            var i = this, t = {accounts: [a.a.eosNetwork]}, s = this.username, o = a.a.gameContract;
                            if (this.inputNum) {
                                var r = [s, o, String((this.inputNum - 0).toFixed(4)) + " " + a.a.tokenName, "buy"];
                                console.dir(this.scatterEosClient), this.scatterEosClient.contract(a.a.tokenContract, {requiredFields: t}).then(function (e) {
                                    e.transfer.apply(e, r).then(function (e) {
                                        console.log(e);
                                        var t = e.returnedFields.accounts[0].name;
                                        i.get_userinfo(t), i.getActions(), i.$emit("updateData"), i.loadingPopShow = !1, i.rightShow = !1, i.successPopShow = !0, i.disabledShow = !1
                                    }).catch(function (e) {
                                        i.loadingPopShow = !1, i.failurePopShow = !0, i.rightShow = !1, i.disabledShow = !1, clearInterval(i.globalLimitTime), i.limitOptionTime = 15, i.reponseFailInfo(e)
                                    })
                                }).catch(function (e) {
                                    i.loadingPopShow = !1, i.failurePopShow = !0, i.rightShow = !1, i.disabledShow = !1, clearInterval(i.globalLimitTime), i.limitOptionTime = 15, i.reponseFailInfo(e)
                                })
                            }
                        }
                    } else this.$emit("tipsShow", this.$t("login.noNull"))
                }, sell: function () {
                    var e = this;
                    if (this.playMusic(), !this.username) return this.rightShow = !1, void(this.loginPopShow = !0);
                    if (this.inputNum) {
                        this.loadingPopShow = !0, this.rightShow = !1;
                        var i = this.scatter.identity.accounts.find(function (e) {
                                return "eos" === e.blockchain
                            }), t = {authorization: [i.name + "@" + i.authority]}, s = {accounts: [a.a.eosNetwork]},
                            o = this, r = this.username;
                        if (null != this.inputNum && void 0 != this.inputNum && "" != this.inputNum) {
                            var c = this.inputNum - 0;
                            this.scatterEosClient.contract(a.a.gameContract, {requiredFields: s}).then(function (i) {
                                i.sell(r, c, t).then(function (i) {
                                    console.log(i);
                                    var t = i.returnedFields.accounts[0].name;
                                    o.get_userinfo(t), e.getActions(), o.$emit("updateData"), o.loadingPopShow = !1, o.rightShow = !1, o.successPopShow = !0, o.disabledShow = !1
                                }).catch(function (e) {
                                    o.disabledShow = !1, o.limitOptionTime = 15, clearInterval(o.globalLimitTime), o.loadingPopShow = !1, o.failurePopShow = !0, o.rightShow = !1, o.reponseFailInfo(e)
                                })
                            }).catch(function (e) {
                                o.disabledShow = !1, o.limitOptionTime = 15, clearInterval(o.globalLimitTime), o.loadingPopShow = !1, o.failurePopShow = !0, o.rightShow = !1, o.reponseFailInfo(e)
                            })
                        }
                    } else this.$emit("tipsShow", this.$t("login.noNull"))
                }, destroy: function () {
                    var e = this;
                    if (this.playMusic(), !this.username) return this.rightShow = !1, void(this.loginPopShow = !0);
                    if (this.inputNum) {
                        this.loadingPopShow = !0, this.rightShow = !1;
                        var i = this.scatter.identity.accounts.find(function (e) {
                                return "eos" === e.blockchain
                            }), t = {authorization: [i.name + "@" + i.authority]}, s = {accounts: [a.a.eosNetwork]},
                            o = this;
                        if (null != this.inputNum && void 0 != this.inputNum && "" != this.inputNum) {
                            var r = this.username, c = this.inputNum - 0;
                            this.scatterEosClient.contract(a.a.gameContract, {requiredFields: s}).then(function (i) {
                                console.log(i), i.destroy(r, c, t).then(function (i) {
                                    console.log(i);
                                    var t = i.returnedFields.accounts[0].name;
                                    o.get_userinfo(t), e.getActions(), o.$emit("updateData"), o.loadingPopShow = !1, o.rightShow = !1, o.successPopShow = !0, o.disabledShow = !1
                                }).catch(function (e) {
                                    o.disabledShow = !1, o.limitOptionTime = 15, clearInterval(o.globalLimitTime), o.loadingPopShow = !1, o.failurePopShow = !0, o.rightShow = !1, o.reponseFailInfo(e)
                                })
                            }).catch(function (e) {
                                o.disabledShow = !1, o.limitOptionTime = 15, clearInterval(o.globalLimitTime), o.loadingPopShow = !1, o.failurePopShow = !0, o.rightShow = !1, o.reponseFailInfo(e)
                            })
                        }
                    } else this.$emit("tipsShow", this.$t("login.noNull"))
                }, getActions: function () {
                    var e = this;

                    this.eosActionClient || (this.eosActionClient = this.$EOS(a.a.actionNetwork)), this.recordAllDataList = [];
                    var eos = this.eosActionClient;
                    var i = this.username;
                    i && this.eosActionClient.getActions({account_name: i, pos: -1, offset: -100}).then(function (i) {
                        e.actions = i.actions.map(function (e) {
                            return e
                        }).filter(function (e) {


                            var act = e.action_trace.act;
                            var i = e.action_trace;

                            if (act.account == a.a.gameContract && "sell" == act.name || act.account == a.a.gameContract && "destroy" == act.name) {

                                var abiSche = eos.fc.abiCache.abi('chaingame123', abiJson.abi)
                                var res2 = abiSche.fromBuffer(act.name,act.data);
                                act.data = res2;
                                return true

                            }

                            if(i.receipt.receiver == a.a.tokenContract && act.account == a.a.tokenContract && "transfer" == act.name && act.data.to == a.a.gameContract && act.data.to != a.a.toContract ){
                                // e.data.to != s.a.toContract
                                return true;

                            }else{
                                return false;
                            }


                        }), e.recordAllDataList = e.actions.reverse(), e.totalSize = e.recordAllDataList.length, e.recordDataList = e.recordAllDataList.slice(0, 6)
                    }, function (e) {
                        console.log(e)
                    })
                }, claim: function () {
                    var e = this, i = this, t = this.scatter.identity.accounts.find(function (e) {
                            return "eos" === e.blockchain
                        }), s = {authorization: [t.name + "@" + t.authority]}, o = {accounts: [a.a.eosNetwork]},
                        r = this.username, c = this.globalgameid;
                    this.scatterEosClient.contract(a.a.gameContract, {requiredFields: o}).then(function (t) {
                        t.claim(r, c, s).then(function (t) {
                            console.log(t), i.$emit("updateEos"), i.claim_txt = e.$t("login.alreadyGet")
                        }).catch(function (e) {
                            console.log(e)
                        })
                    }).catch(function (e) {
                        console.log(e)
                    })
                }, reponseFailInfo: function (e) {
                    var i = c()(e);
                    -1 != i.indexOf("please wait a moment") && (this.failInfoResponse = "login.pleaseWait15sMoment"), -1 != i.indexOf("The game will start at 2018-01-11 15:00:00") && (this.failInfoResponse = "login.gameNoStart"), -1 != i.indexOf("less than max operate amount") && (this.failInfoResponse = "login.lessThanMaxOperateAmount")
                }, closePop: function () {
                    this.rightShow = !0, this.loadingPopShow = !1, this.successPopShow = !1, this.failurePopShow = !1, this.loginPopShow = !1
                }, showGameover: function () {
                    this.successPopShow = !1, this.gameoverPopShow = !0, this.rightShow = !1
                }, tryagain: function () {
                    this.gameoverPopShow = !1, this.rightShow = !0, location.reload()
                }, getHelp: function () {
                    this.$emit("showHelp", 1)
                }, gotoHlep: function () {
                    this.$emit("showHelp", 4)
                }
            }
        }), p = {
            render: function () {
                var e = this, i = e.$createElement, s = e._self._c || i;
                return s("div", {staticClass: "zz-record"}, [s("div", {staticClass: "my-zz"}, [s("div", {staticClass: "left"}, [s("div", {staticClass: "zz-left-top"}, [s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: !e.isLogin,
                        expression: "!isLogin"
                    }], staticClass: "zz-login"
                }, [s("button", {
                    staticClass: "login-btn",
                    on: {click: e.loginConfirm}
                }, [e._v(e._s(e.$t("login.loginConfirm")))]), e._v(" "), s("div", {
                    staticClass: "zz-help",
                    on: {
                        click: function (i) {
                            e.gotoHlep()
                        }
                    }
                })]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.isLogin,
                        expression: "isLogin"
                    }], staticClass: "my-total"
                }, [s("p", [e._v(e._s(e.myhodl))]), e._v(" "), s("p", {staticClass: "YaHei"}, [e._v(e._s(e.$t("login.own")))])])]), e._v(" "), s("div", {staticClass: "zz-left-bottom"}, [s("p", [e._v(e._s(e.getCurrentPrice()))]), e._v(" "), s("p", [e._v(e._s(e.tokenName) + "/" + e._s(e.$t("login.zz")))])])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.rightShow,
                        expression: "rightShow"
                    }], staticClass: "right"
                }, [s("div", {staticClass: "title-switch"}, e._l(e.titleList, function (i, t) {
                    return s("p", {
                        key: t,
                        staticClass: "title",
                        class: [0 == e.itemIndex && t == e.itemIndex ? "excharge ex-active" : 1 == e.itemIndex && t == e.itemIndex ? "excharge ra-active" : 2 == e.itemIndex && t == e.itemIndex ? "excharge de-active" : ""],
                        on: {
                            click: function (i) {
                                e.titlesSwitch(t)
                            }
                        }
                    }, [s("span", {staticClass: "excharge-title"}, [e._v(e._s(e.$t(i)))])])
                })), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 0 == e.itemIndex,
                        expression: "itemIndex==0"
                    }], staticClass: "exchange-img"
                }, [s("img", {attrs: {src: t("2iul"), alt: ""}})]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 1 == e.itemIndex,
                        expression: "itemIndex==1"
                    }], staticClass: "exchange-img"
                }, [s("img", {attrs: {src: t("qE3X"), alt: ""}})]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 2 == e.itemIndex,
                        expression: "itemIndex==2"
                    }], staticClass: "exchange-img"
                }, [s("img", {
                    attrs: {
                        src: t("P9lB"),
                        alt: ""
                    }
                })]), e._v(" "), s("div", {staticClass: "input-zz"}, [s("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.inputNum,
                        expression: "inputNum"
                    }],
                    staticClass: "input-num",
                    attrs: {type: "number", placeholder: e.$t("login.inputNum")},
                    domProps: {value: e.inputNum},
                    on: {
                        input: function (i) {
                            i.target.composing || (e.inputNum = i.target.value)
                        }
                    }
                }), e._v(" "), 0 == e.itemIndex ? s("span", [e._v(e._s(e.tokenName))]) : s("span", [e._v(e._s(e.$t("login.zz")))])]), e._v(" "), s("div", {staticClass: "plus-num"}, [0 == e.itemIndex ? s("p", {staticStyle: {float: "right"}}, [e._v("≈" + e._s((.995 * e.inputNum / e.getCurrentPrice()).toFixed(0)) + "\n          "), s("span", [e._v(e._s(e.$t("login.zz")))])]) : 1 == e.itemIndex ? s("p", {staticStyle: {float: "right"}}, [e._v("≈" + e._s(e.getSellRate().toFixed(4)) + "\n          "), s("span", [e._v(e._s(e.$t("login.EOS")))])]) : s("p", {staticStyle: {float: "right"}}, [e._v("≈" + e._s(e.getBurnRate().toFixed(4)) + "\n          "), s("span", [e._v(e._s(e.$t("login.EOS")))])]), e._v(" "), s("p", {staticClass: "plus"}, e._l(e.numList, function (i, t) {
                    return s("span", {
                        key: t, on: {
                            click: function (t) {
                                e.plusNum(i)
                            }
                        }
                    }, [s("span", {staticClass: "plusIcon"}, [e._v("+")]), e._v(e._s(i))])
                }))]), e._v(" "), 0 == e.itemIndex ? s("div", {
                    staticClass: "btn-confirm",
                    class: [e.disabledShow ? "disabledShow" : "ex-confirm"],
                    on: {click: e.handleClick}
                }, [e._v(e._s(e.$t("login.energize"))), s("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.limitOptionTime < 15,
                        expression: "limitOptionTime<15"
                    }]
                }, [e._v("(" + e._s(e.limitOptionTime) + "s)")])]) : 1 == e.itemIndex ? s("div", {
                    staticClass: "btn-confirm",
                    class: [e.disabledShow ? "disabledShow" : "ra-confirm"],
                    on: {click: e.handleClick}
                }, [e._v(e._s(e.$t("login.restore"))), s("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.limitOptionTime < 15,
                        expression: "limitOptionTime<15"
                    }]
                }, [e._v("(" + e._s(e.limitOptionTime) + "s)")])]) : s("div", {
                    staticClass: "btn-confirm",
                    class: [e.disabledShow ? "disabledShow" : "de-confirm"],
                    on: {click: e.handleClick}
                }, [e._v(e._s(e.$t("login.recycle"))), s("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.limitOptionTime < 15,
                        expression: "limitOptionTime<15"
                    }]
                }, [e._v("(" + e._s(e.limitOptionTime) + "s)")])]), e._v(" "), s("div", {staticClass: "record-help"}, [s("div", {
                    staticClass: "login-record",
                    on: {click: e.myrecordShow}
                }), e._v(" "), s("div", {
                    staticClass: "login-help", on: {
                        click: function (i) {
                            e.getHelp()
                        }
                    }
                })])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.loadingPopShow,
                        expression: "loadingPopShow"
                    }], staticClass: "container"
                }, [s("div", {staticClass: "bounced flex-colunm-center"}, [s("div", {staticClass: "loading-icon"}), e._v(" "), s("div", {staticClass: "loading-text"}, [s("span", [e._v(e._s(e.$t("login.confirm")))])]), e._v(" "), s("div", {staticClass: "prompt"}, [s("span", [e._v(e._s(e.$t("login.sendInfo")))])]), e._v(" "), s("div", {
                    staticClass: "button",
                    on: {
                        click: function (i) {
                            e.closePop()
                        }
                    }
                }, [s("span", [e._v(e._s(e.$t("login.wait")))])])])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.successPopShow,
                        expression: "successPopShow"
                    }], staticClass: "container"
                }, [s("div", {staticClass: "bounced flex-colunm-center"}, [s("div", {staticClass: "succeed-icon"}), e._v(" "), s("div", {staticClass: "succeed-text"}, [s("span", [e._v(e._s(e.$t("login.success")))])]), e._v(" "), s("div", {staticClass: "prompt"}, [s("span", [e._v(e._s(e.$t("login.successInfo")))])]), e._v(" "), s("div", {
                    staticClass: "button",
                    on: {
                        click: function (i) {
                            e.closePop()
                        }
                    }
                }, [s("span", [e._v(e._s(e.$t("login.returnF")))])])])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.failurePopShow,
                        expression: "failurePopShow"
                    }], staticClass: "container"
                }, [s("div", {staticClass: "bounced flex-colunm-center"}, [s("div", {staticClass: "failure-icon"}), e._v(" "), s("div", {staticClass: "failure-text"}, [s("span", [e._v(e._s(e.$t("login.fail")))])]), e._v(" "), s("div", {staticClass: "prompt"}, [s("span", [e._v(e._s(e.$t(e.failInfoResponse)))])]), e._v(" "), s("div", {
                    staticClass: "button",
                    on: {
                        click: function (i) {
                            e.closePop()
                        }
                    }
                }, [s("span", [e._v(e._s(e.$t("login.closeF")))])])])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.loginPopShow,
                        expression: "loginPopShow"
                    }], staticClass: "container"
                }, [s("div", {staticClass: "bounced flex-colunm-center"}, [s("div", {staticClass: "failure-icon"}), e._v(" "), s("div", {staticClass: "failure-text"}, [s("span", [e._v(e._s(e.$t("login.fail")))])]), e._v(" "), s("div", {staticClass: "prompt"}, [s("span", [e._v(e._s(e.$t("login.pleaseLogin")))])]), e._v(" "), s("div", {
                    staticClass: "button",
                    on: {
                        click: function (i) {
                            e.closePop()
                        }
                    }
                }, [s("span", [e._v(e._s(e.$t("login.closeF")))])])])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.gameoverPopShow,
                        expression: "gameoverPopShow"
                    }], staticClass: "container gameoverContainer"
                }, [s("div", {staticClass: "bounced flex-colunm-center"}, [s("div", {staticClass: "gameover-icon"}), e._v(" "), s("div", {staticClass: "gameover-text"}, [s("span", [e._v(e._s(e.$t("login.finish")) + " ")])]), e._v(" "), s("div", {staticClass: "prompt"}, [s("span", [e._v(e._s(e.$t("login.conx")) + " " + e._s(e.hero) + " " + e._s(e.$t("login.getEarned")) + e._s(e.heroReward))])]), e._v(" "), s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 0 != e.myReward,
                        expression: "myReward!=0"
                    }], staticClass: "slipper"
                }, [s("span", [e._v(e._s(e.$t("login.myEarned")) + " " + e._s(e.myReward) + " " + e._s(e.tokenName))]), s("button", {
                    attrs: {type: "text"},
                    on: {
                        click: function (i) {
                            e.claim()
                        }
                    }
                }, [e._v(e._s(e.$t(e.claim_txt)))])]), e._v(" "), s("div", {
                    staticClass: "button", on: {
                        click: function (i) {
                            e.tryagain()
                        }
                    }
                }, [s("span", [e._v(e._s(e.$t("login.joinNew")))])])])]), e._v(" "), s("div", {staticClass: "clear"})]), e._v(" "), s("div", {
                    staticClass: "records animated",
                    class: [1 == e.recordShow ? "fadeInRight" : "fadeOutRight"]
                }, [s("div", {staticClass: "record-line"}), e._v(" "), s("div", {staticClass: "my-record"}, [s("p", {staticClass: "my-record-title"}, [e._v(e._s(e.$t("login.myRecord")))]), e._v(" "), s("div", {staticClass: "records-header"}), e._v(" "), s("ul", {staticClass: "recordData"}, e._l(e.recordDataList, function (i) {
                    return s("li", {
                        key: i.index,
                        staticClass: "item"
                    }, [s("span", [e._v(e._s(e._f("moment")(Date.parse(new Date(i.block_time)))))]), e._v(" "), s("span", [e._v(e._s("transfer" == i.action_trace.act.name ? i.action_trace.act.data.quantity : i.action_trace.act.data.bytes + " " + e.$t("login.zz")))]), e._v(" "), s("span", {
                        staticClass: "circle",
                        class: ["transfer" == i.action_trace.act.name ? "green" : "sell" == i.action_trace.act.name ? "orange" : "red"]
                    })])
                })), e._v(" "), s("el-pagination", {
                    staticClass: "game-pagination",
                    staticStyle: {"text-align": "right"},
                    attrs: {
                        id: "login-page",
                        layout: "prev, pager, next",
                        total: e.totalSize,
                        "current-page": e.currentPage,
                        "page-size": e.pageSize
                    },
                    on: {
                        "update:currentPage": function (i) {
                            e.currentPage = i
                        }, "current-change": e.handleChange
                    }
                })], 1)]), e._v(" "), s("audio", {
                    ref: "audioOption",
                    attrs: {src: "../../static/audio/music2.mp3", preload: "auto"}
                })])
            }, staticRenderFns: []
        };
        var z = t("VU/8")(l, p, !1, function (e) {
                t("8WYC"), t("loAP")
            }, "data-v-b4c9866a", null).exports, h = t("oCBF"), u = t("niaT"), d = t("wYUi"), v = (t("rViV"), t("mfWC")),
            _ = {
                props: ["historyRecordStatic", "eosClient", "scatterEosClient"], data: function () {
                    return {
                        account: "",
                        config: a.a,
                        gameinfo: [],
                        userinfo: [],
                        historyRecord: [],
                        historyAllRecord: [],
                        totalSize: 0,
                        currentPage: 1,
                        pageSize: 2,
                        bad_ending_ratio: 10,
                        good_ending_ratio: 10
                    }
                }, created: function () {
                    this.get_gameinfo()
                }, mounted: function () {
                }, computed: {
                    tokenName: function () {
                        return a.a.tokenName
                    }
                }, methods: {
                    close: function () {
                        this.$emit("history", !0)
                    }, get_gameinfo: function () {
                        var e = this;
                        if (this.eosClient) {
                            this.currentPage = 1;
                            var i = this;
                            i.historyAllRecord = [], this.eosClient.getTableRows({
                                json: "true",
                                code: a.a.contractName,
                                scope: a.a.contractName,
                                table: "game",
                                limit: 100,
                                lower_bound: 0
                            }).then(function (t) {
                                var s = t.rows;
                                s instanceof Array && s.length > 0 && (s.forEach(function (e, t) {
                                    1 == e.status && i.historyAllRecord.push(e)
                                }), i.get_userinfo(), e.totalSize = i.historyAllRecord.length)
                            }).catch(function (e) {
                                console.error(e)
                            })
                        }
                    }, get_userinfo: function () {
                        if (this.eosClient) {
                            var e = this, i = window.scatter.identity.accounts.find(function (e) {
                                return "eos" === e.blockchain
                            });
                            this.eosClient.getTableRows({
                                json: "true",
                                code: a.a.gameContract,
                                scope: i.name,
                                table: "userinfo",
                                limit: 100,
                                lower_bound: 0
                            }).then(function (i) {
                                e.userinfo = i.rows, e.historyAllRecord.forEach(function (i, t) {
                                    e.userinfo.forEach(function (s, o) {
                                        s.gameid == i.gameid && (e.historyAllRecord[t].owner = s.owner, e.historyAllRecord[t].claim_status = s.claim_status, e.historyAllRecord[t].hodl = s.hodl)
                                    })
                                }), e.historyAllRecord = e.historyAllRecord.reverse(), e.historyRecord = e.historyAllRecord.slice(0, 2)
                            }).catch(function (e) {
                                console.error(e)
                            })
                        }
                    }, getHeroTitle: function (e) {
                        var i = this;
                        if (this.eosClient) {
                            var t = e.total_reserved, s = e.total_alive, o = e.total_burn, r = e.init_max;
                            this.eosClient.getTableRows({
                                json: "true",
                                code: a.a.gameContract,
                                scope: a.a.gameContract,
                                table: "global",
                                limit: 100,
                                lower_bound: 0
                            }).then(function (e) {
                                e.rows && e.rows.length > 0 && (i.bad_ending_ratio = e.rows[0].bad_ending_ratio, i.good_ending_ratio = e.rows[0].good_ending_ratio)
                            }).catch(function (e) {
                                console.error(e)
                            });
                            var c = t / (s / 100 * this.bad_ending_ratio), n = o / (r / 100 * this.good_ending_ratio);
                            return c >= this.bad_ending_ratio / 100 ? "建造人" : n >= this.good_ending_ratio / 100 ? "毁灭者" : void 0
                        }
                    }, claim: function (e) {
                        var i = this, t = window.scatter.identity.accounts.find(function (e) {
                                return "eos" === e.blockchain
                            }), s = {authorization: [t.name + "@" + t.authority]}, o = {accounts: [a.a.eosNetwork]},
                            r = t.name, c = e;
                        this.scatterEosClient.contract(a.a.gameContract, {requiredFields: o}).then(function (e) {
                            e.claim(r, c, s).then(function (e) {
                                console.log(e), i.$emit("updateEos")
                            }).catch(function (e) {
                                i.$emit("tipsShow", "领取失败")
                            })
                        }).catch(function (e) {
                            i.$emit("tipsShow", "网络错误")
                        })
                    }, handleChange: function (e) {
                        this.historyRecord = [], this.historyRecord = this.historyAllRecord.slice(2 * (e - 1), 2 * e)
                    }
                }
            }, m = {
                render: function () {
                    var e = this, i = e.$createElement, t = e._self._c || i;
                    return t("div", {
                        staticClass: "historyRecord-box fadeInLeft animated",
                        class: 1 == e.historyRecordStatic ? "fadeInLeft" : "fadeOutLeft"
                    }, [t("div", {staticClass: "line"}), e._v(" "), t("div", {staticClass: "title"}, [t("p", [e._v(e._s(e.$t("historyRecord.title")))])]), e._v(" "), e.historyRecord.length > 0 ? t("ul", {staticClass: "historyRecordData"}, e._l(e.historyRecord, function (i) {
                        return t("li", {
                            key: i.index,
                            staticClass: "item"
                        }, [t("div", [t("span", [e._v(e._s(i.gameid))]), e._v(" "), t("span", {staticClass: "fontspan"}, [e._v(e._s(i.quote_balance))]), e._v(" "), t("span", {staticClass: "fontspan"}, [e._v(e._s(e._f("moment")(i.start_time / 1e3)))])]), e._v(" "), t("div", [t("span", [e._v(e._s(e.getHeroTitle(i)))]), e._v(" "), t("span", [e._v(e._s(i.hero))]), e._v(" "), t("span", {staticClass: "fontspan"}, [e._v(e._s(i.hero_reward))])]), e._v(" "), t("div", [t("span", [e._v(e._s(e.$t("historyRecord.award")))]), e._v(" "), t("span", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: void 0 != i.owner,
                                expression: "item.owner != undefined"
                            }], staticClass: "fontspan"
                        }, [e._v(e._s((i.hodl * i.claim_price.slice(0, i.claim_price.length - 4)).toFixed(4)) + " " + e._s(e.tokenName))]), e._v(" "), void 0 == i.owner ? t("p", [e._v("-")]) : t("div", [0 == i.claim_status ? t("button", {
                            staticClass: "btn",
                            on: {
                                click: function (t) {
                                    e.claim(i.gameid)
                                }
                            }
                        }, [e._v(e._s(e.$t("historyRecord.getBtn")))]) : t("p", [e._v(e._s(e.$t("historyRecord.doneBtn")))])])]), e._v(" "), i ? t("div", {staticClass: "tipsline"}) : e._e()])
                    })) : t("div", {staticClass: "historyRecordData"}, [e._v(e._s(e.$t("historyRecord.tips")))]), e._v(" "), t("el-pagination", {
                        staticClass: "game-pagination",
                        attrs: {
                            layout: "prev, pager, next",
                            total: e.totalSize,
                            "current-page": e.currentPage,
                            "page-size": e.pageSize
                        },
                        on: {
                            "update:currentPage": function (i) {
                                e.currentPage = i
                            }, "current-change": e.handleChange
                        }
                    }), e._v(" "), t("div", {
                        staticClass: "close", on: {
                            click: function (i) {
                                e.close()
                            }
                        }
                    })], 1)
                }, staticRenderFns: []
            };
        var g = t("VU/8")(_, m, !1, function (e) {
            t("dmVq")
        }, "data-v-611dac00", null).exports, f = {
            barActiveArray: [{id: 1, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 2,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 3, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 4,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 5, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 6,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 7, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 8,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 9, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 10,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 11, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 12,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 13, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 14,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 15, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 16,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 17, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 18,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 19, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 20,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 21, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 22,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 23, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 24,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 25, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 26,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 27, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 28,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }, {id: 29, type: "quotActived", isActive: !0, isLastActive: !1}, {
                id: 30,
                type: "quotActived",
                isActive: !0,
                isLastActive: !1
            }],
            barDestoryArray: [{id: 1, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 2,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 3, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 4,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 5, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 6,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 7, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 8,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 9, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 10,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 11, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 12,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 13, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 14,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 15, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 16,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 17, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 18,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 19, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 20,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 21, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 22,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 23, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 24,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 25, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 26,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 27, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 28,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }, {id: 29, type: "quotDestory", isActive: !0, isLastActive: !1}, {
                id: 30,
                type: "quotDestory",
                isActive: !0,
                isLastActive: !1
            }]
        }, w = {
            name: "pieEcharts", props: ["pieData"], data: function () {
                return {
                    barLiActive: f.barActiveArray,
                    barLiDestroy: f.barDestoryArray,
                    isActive: "",
                    lastActive: "",
                    isBurn: "",
                    lastBurn: ""
                }
            }, computed: {
                totalBurn: function () {
                    return this.pieData.total_burn
                }, maxBurn: function () {
                    return this.pieData.init_max / 100 * this.pieData.good_ending_ratio
                }, maxReserved: function () {
                    return this.pieData.total_alive / 100 * this.pieData.bad_ending_ratio
                }
            }, mounted: function () {
            }, methods: {
                exchange: function () {
                }, barProgess: function (e, i, t) {
                    var s = i / (e / this.barLiActive.length);
                    this.isActive = parseInt(s), this.isActive = this.isActive > 1 ? this.isActive : 1
                }, barProgessBurn: function (e, i, t) {
                    var s = i / (e / this.barLiActive.length);
                    this.isBurn = parseInt(s), this.isBurn = this.isBurn > 1 ? this.isBurn : 1
                }
            }, watch: {
                maxReserved: function () {
                    var e = this.pieData.total_reserved;
                    if (this.pieData.bad_ending_ratio * this.maxReserved <= this.pieData.total_reserved) return this.isActive = this.barLiActive.length + 1;
                    this.barProgess(this.maxReserved, e, "isActive")
                }, totalBurn: function () {
                    var e = this.pieData.total_burn, i = this.pieData.init_max / 100 * this.pieData.good_ending_ratio;
                    if (this.pieData.good_ending_ratio * this.maxBurn <= this.pieData.total_burn) return this.isBurn = this.barLiDestroy.length + 1;
                    this.barProgessBurn(i, e, "isBurn")
                }
            }
        }, C = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {staticClass: "eos-game-content"}, [t("div", {staticClass: "pie-wrap"}, [t("div", {staticClass: "actived"}, [t("span", {staticClass: "quto-text"}, [e._v(e._s(e.$t("header.ProjectProcess")))]), e._v(" "), t("div", {staticClass: "bar-wrap"}, [t("ul", {staticClass: "active-bar-ul"}, e._l(e.barLiActive, function (i) {
                    return t("li", {
                        key: i.index,
                        class: {actived: i.id <= e.isActive, lastActived: i.id == e.isActive}
                    })
                }))]), e._v(" "), t("div", {staticClass: "bar-total-num"}, [t("span", {staticClass: "active-num num"}, [e._v(e._s(e.pieData.total_reserved))]), e._v(" "), t("span", {staticClass: "total-span"}, [e._v(" / ")]), e._v(" "), t("span", {staticClass: "total-num"}, [e._v(e._s(e.maxReserved.toFixed(0)))])])]), e._v(" "), t("div", {staticClass: "destoryed"}, [t("span", {staticClass: "quto-text"}, [e._v(e._s(e.$t("header.DestroyProcess")))]), e._v(" "), t("div", {staticClass: "bar-wrap"}, [t("ul", {staticClass: "destory-bar-ul"}, e._l(e.barLiDestroy, function (i) {
                    return t("li", {key: i.index, class: {actived: i.id <= e.isBurn, lastActived: i.id == e.isBurn}})
                }))]), e._v(" "), t("div", {staticClass: "bar-total-num"}, [t("span", {staticClass: "destory-num num"}, [e._v(e._s(e.pieData.total_burn))]), e._v(" "), t("span", {staticClass: "total-span"}, [e._v(" / ")]), e._v(" "), t("span", {staticClass: "total-num"}, [e._v(e._s(e.maxBurn))])])])])])
            }, staticRenderFns: []
        };
        var b = t("VU/8")(w, C, !1, function (e) {
            t("c0mF")
        }, "data-v-7c106545", null).exports, y = t("dHdo"), S = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {staticClass: "notice-wrap"}, [t("h2", [e._v(e._s(e.$t("notice.PublicCalculationTips")))]), e._v(" "), t("p", [e._v(e._s(e.$t("notice.TheRechange"))), t("br"), e._v(" ( eos_amount - ( ( eos_amount + 199) / 200 ) )  / ( quote_balance / ( init_max - total_reserved) ) ")]), e._v(" "), t("p", [e._v(e._s(e.$t("notice.TheRestore"))), t("br"), e._v("( quote_balance / ( init_max - total_reserved) ) *  sell_amount * 0.995")]), e._v(" "), t("p", [e._v(e._s(e.$t("notice.CurrentSophonPrice")) + " "), t("br"), e._v(" ( quote_balance ) / ( init_max - total_reserved ) / 100 * 70")])])
            }, staticRenderFns: []
        };
        var A = t("VU/8")({
            data: function () {
                return {}
            }
        }, S, !1, function (e) {
            t("z2Uw")
        }, "data-v-939a975a", null).exports, x = t("yBia"), L = {
            props: ["eosClient"], data: function () {
                return {
                    accountName: "",
                    searchDataShow: !1,
                    userinfoList: [],
                    myBalanceEOS: "",
                    waitShow: !1,
                    tipsText: "search.loadingTips"
                }
            }, mounted: function () {
                var e = this;
                this.$ms.$on("setAccount", function (i) {
                    e.accountName = i
                })
            }, methods: {
                empty: function () {
                    this.accountName = ""
                }, goToSearch: function () {
                    this.accountName && (this.$emit("hideData", !1), this.searchDataShow = !0, this.userinfoList = [], this.waitShow = !0, this.tipsText = "search.loadingTips", this.get_userinfo(), this.getCurrencyBalance())
                }, hideData: function () {
                    this.$emit("hideData", !0), this.searchDataShow = !1
                }, get_userinfo: function () {
                    var e = this;
                    this.eosClient.getTableRows({
                        json: "true",
                        code: a.a.gameContract,
                        scope: this.accountName,
                        table: "userinfo",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        var t = v.a.subStringEOS(i.rows[0].in, a.a.tokenName);
                        i.rows[0].in = t;
                        var s = v.a.subStringEOS(i.rows[0].out, a.a.tokenName);
                        i.rows[0].out = s, e.userinfoList = i.rows[0], e.userinfoList ? e.waitShow = !1 : e.tipsText = "search.noinTips"
                    }).catch(function (i) {
                        e.tipsText = "search.noinTips", e.userinfoList = []
                    })
                }, getCurrencyBalance: function () {
                    var e = this;
                    e.eosClient.getCurrencyBalance({
                        code: a.a.tokenContract,
                        account: this.accountName,
                        symbol: a.a.mainToken
                    }).then(function (i) {
                        e.myBalanceEOS = i[0]
                    }, function (e) {
                        console.log(e)
                    })
                }, getAveragePrice: function (e, i, t) {
                    return 0 === t ? "-" : Number((e - i) / t).toFixed(4)
                }
            }
        }, $ = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {staticClass: "search-box"}, [t("div", {staticClass: "search-header"}, [t("div", {staticClass: "search"}, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.accountName,
                        expression: "accountName"
                    }],
                    staticClass: "search-txt",
                    attrs: {type: "text", placeholder: e.$t("search.inputplaceholder")},
                    domProps: {value: e.accountName},
                    on: {
                        input: function (i) {
                            i.target.composing || (e.accountName = i.target.value)
                        }
                    }
                }), e._v(" "), t("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.accountName,
                        expression: "accountName"
                    }], staticClass: "close", on: {
                        click: function (i) {
                            e.empty()
                        }
                    }
                }), e._v(" "), t("span", {
                    staticClass: "search-btn", on: {
                        click: function (i) {
                            e.goToSearch()
                        }
                    }
                })]), e._v(" "), t("div", {staticClass: "line"})]), e._v(" "), t("transition", {attrs: {name: "fold"}}, [t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.searchDataShow,
                        expression: "searchDataShow"
                    }], staticClass: "search-data"
                }, ["" != e.userinfoList ? t("ul", {staticClass: "data-box"}, [t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item01")) + "：" + e._s(e.userinfoList.hodl))]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item05")) + "：" + e._s(e.myBalanceEOS))]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item03")) + "：" + e._s(e.userinfoList.action_count))]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item04")) + "：" + e._s(e.userinfoList.fee_amount))]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item08")) + "：" + e._s(e.userinfoList.out) + " EOS")]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item09")) + "：" + e._s(e.userinfoList.in) + " EOS")]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item06")) + "：" + e._s((e.userinfoList.in - e.userinfoList.out).toFixed(4)) + " EOS")]), e._v(" "), t("li", {staticClass: "item"}, [e._v(e._s(e.$t("search.item07")) + "：" + e._s(e._f("moment")(e.userinfoList.last_action_time / 1e3)))])]) : e._e(), e._v(" "), t("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.waitShow,
                        expression: "waitShow"
                    }], staticClass: "data-box"
                }, [e._v(e._s(e.$t(e.tipsText)))]), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.searchDataShow,
                        expression: "searchDataShow"
                    }], staticClass: "hide-data", on: {
                        click: function (i) {
                            e.hideData()
                        }
                    }
                })])])], 1)
            }, staticRenderFns: []
        };
        var D = t("VU/8")(L, $, !1, function (e) {
            t("yVjq")
        }, "data-v-6a4e63a6", null).exports, N = {
            components: {
                login: z,
                worldRecord: h.default,
                airdrop: u.default,
                introduce: d.default,
                pieEcharts: b,
                historyRecord: g,
                contactMusic: y.a,
                notice: A,
                language: x.a,
                search: D
            }, data: function () {
                return {
                    worldRecordShow: !0,
                    introduceShow: !1,
                    historyRecordShow: !1,
                    config: a.a,
                    eosClient: null,
                    scatter: null,
                    scatterEosClient: null,
                    init_quote_balance: "",
                    quote_balance: "",
                    pieData: {
                        init_max: "",
                        good_ending_ratio: "",
                        bad_ending_ratio: "",
                        total_burn: "",
                        total_alive: "",
                        total_reserved: "",
                        quote_balance: "",
                        destroy_balance: "",
                        init_quote_balance: "",
                        total_lose: "",
                        end_prize_ratio: "",
                        burn_price_ratio: ""
                    },
                    pieDataCopy: {},
                    eosContent: "",
                    isLogin: !1,
                    username: "",
                    air_drop_step: "",
                    end_prize_times: "",
                    gameid: "",
                    end_prize_ratio: "",
                    errorTips: !1,
                    gameidGlobal: "",
                    gamesGlobal: "",
                    currentGameGlobal: "",
                    myBalanceEOS: "",
                    errorTxt: "network error",
                    globalgameid: -1
                }
            }, created: function () {
            }, computed: {
                tokenName: function () {
                    return a.a.tokenName
                }, ultimatePrize: function () {
                    var e = this.quote_balance - this.init_quote_balance,
                        i = [e > 0 ? (e / 100 * this.end_prize_ratio).toFixed(4) : 0, "5000"];
                    return Math.min.apply(null, i)
                }
            }, mounted: function () {
                var e = this;
                this.eosClient = this.$EOS(a.a.eosOptions), document.addEventListener("scatterLoaded", function (i) {
                    e.scatter = window.scatter, e.scatterEosClient = e.scatter.eos(a.a.eosNetwork, e.$EOS, a.a.eosOptions, "http")
                });
                var i = this;
                this.$ms.$on("myeos", function (e) {
                    i.myBalanceEOS = e, i.isLogin = !0
                }), this.globa(), this.get_global(), this.gameinfo(), this.getCurrencyBalance(), setInterval(function () {
                    e.gameinfo(), e.getCurrencyBalance()
                }, 3e3)
            }, methods: {
                get_global: function () {
                    var e = this;
                    this.eosClient && this.eosClient.getTableRows({
                        json: "true",
                        code: a.a.gameContract,
                        scope: a.a.gameContract,
                        table: "global",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        i.rows && i.rows.length > 0 && (e.globalgameid = i.rows[0].gameid)
                    }).catch(function (e) {
                        console.error(e)
                    })
                }, getUpdateData: function () {
                    var e = this;
                    this.$refs.worldRecord.getActions(), this.$refs.airdrop.get_gameinfo(this.gameidGlobal), this.$refs.airdrop.bonus(), this.$nextTick(function () {
                        e.$refs.historyRecord.get_gameinfo()
                    }), this.getCurrencyBalance()
                }, hideAirdrop: function () {
                    this.$refs.airdrop.showUp()
                }, tipsShow: function (e) {
                    this.errorShow(e)
                }, handleGetUserinfo: function () {
                    this.gameinfo()
                }, getUserName: function (e) {
                    this.username = e
                }, updateEos: function () {
                    var e = this;
                    this.getCurrencyBalance(), this.get_global(), this.$refs.userlogin.get_userinfo(this.username), this.$refs.airdrop.get_global(), this.$refs.airdrop.get_gameinfo(), this.$refs.airdrop.bonus(), this.$nextTick(function () {
                        e.$refs.historyRecord.get_gameinfo()
                    })
                }, indexLogin: function () {
                    this.$refs.userlogin.loginConfirm()
                }, logout: function () {
                    var e = this;
                    this.scatter.forgetIdentity().then(function () {
                        localStorage.removeItem("username"), e.$router.push({name: "join"})
                    })
                }, errorShow: function (e) {
                    var i = this;
                    this.errorTips = !0, this.errorTxt = e, setTimeout(function () {
                        i.errorTips = !1
                    }, 3e3)
                }, history: function (e) {
                    this.worldRecordShow = e, this.historyRecordShow = !1
                }, hideData: function (e) {
                    this.$refs.airdrop.controlAirdrop(e)
                }, setAccount: function () {
                    this.$refs.search.goToSearch()
                }, myeos: function (e) {
                    this.myBalanceEOS = e
                }, introduce: function (e) {
                    this.worldRecordShow = e, this.introduceShow = !1
                }, getCurrencyBalance: function () {
                    var e = this;
                    if (this.scatter && this.scatter.identity) {
                        var i = this.scatter.identity.accounts.find(function (e) {
                            return "eos" === e.blockchain
                        });
                        this.eosClient.getCurrencyBalance({
                            code: a.a.tokenContract,
                            account: i.name,
                            symbol: a.a.mainToken
                        }).then(function (i) {
                            e.myBalanceEOS = i[0]
                        }, function (e) {
                            console.log(e)
                        })
                    }
                }, globa: function () {
                    var e = this;
                    this.eosClient.getTableRows({
                        json: "true",
                        code: a.a.contractName,
                        scope: a.a.contractName,
                        table: "global",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        var t = i.rows;
                        t instanceof Array && t.length > 0 && (e.end_prize_ratio = t[0].end_prize_ratio, e.air_drop_step = t[0].air_drop_step, e.end_prize_times = t[0].end_prize_times, e.pieData.bad_ending_ratio = t[0].bad_ending_ratio, e.pieData.good_ending_ratio = t[0].good_ending_ratio, e.pieData.burn_price_ratio = t[0].burn_price_ratio, e.pieData.end_prize_ratio = t[0].end_prize_ratio, e.pieDataCopy = o()({}, e.pieData), e.gameidGlobal = t[0].gameid)
                    }).catch(function (i) {
                        e.errorShow("network error")
                    })
                }, gameinfo: function () {
                    var e = this;
                    this.eosClient.getTableRows({
                        json: "true",
                        code: a.a.contractName,
                        scope: a.a.contractName,
                        table: "game",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        var t = i.rows, s = "";
                        t instanceof Array && t.length > 0 && (s = t.filter(function (i) {
                            return i.gameid === e.gameidGlobal
                        })[0], e.currentGameGlobal = s, 1 == s.status && (e.$refs.userlogin.get_gameinfo(), window.location.href = "index", e.globa())), e.init_quote_balance = s.init_quote_balance, e.init_quote_balance = v.a.subStringEOS(s.init_quote_balance, a.a.tokenName), e.quote_balance = v.a.subStringEOS(s.quote_balance, a.a.tokenName), e.destroy_balance = v.a.subStringEOS(s.destroy_balance, a.a.tokenName), e.pieData.init_max = s.init_max, e.pieData.total_burn = s.total_burn, e.pieData.total_alive = s.total_alive, e.pieData.total_reserved = s.total_reserved, e.pieData.total_alive = s.total_alive, e.pieData.destroy_balance = e.destroy_balance, e.pieData.quote_balance = e.quote_balance, e.pieData.init_quote_balance = e.init_quote_balance, e.pieData.total_lose = s.total_lose, e.pieDataCopy = o()({}, e.pieData)
                    }).catch(function (e) {
                    })
                }, showIntroduce: function () {
                    this.introduceShow = !0, this.worldRecordShow = !1, this.historyRecordShow = !1
                }, showHistoryRecord: function () {
                    var e = this;
                    this.$nextTick(function () {
                        e.$refs.historyRecord.get_gameinfo()
                    }), this.historyRecordShow = !0, this.worldRecordShow = !1, this.introduceShow = !1
                }, showHelp: function (e) {
                    this.$refs.introduce.mainTab(e), this.worldRecordShow = !1, this.introduceShow = !0, this.historyRecordShow = !1
                }, hideGit: function (e) {
                    this.$refs.contactMusic.hideGit()
                }
            }
        }, k = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {staticClass: "index-eos"}, [t("div", {staticClass: "eos-nav"}, [t("div", {staticClass: "logo"}), e._v(" "), t("ul", {staticClass: "title"}, [t("li", {
                    staticClass: "current",
                    on: {
                        click: function (i) {
                            e.showIntroduce()
                        }
                    }
                }, [e._v(e._s(e.$t("header.GameIntroduction")))]), e._v(" "), t("li", {
                    staticClass: "current",
                    on: {
                        click: function (i) {
                            e.showHistoryRecord()
                        }
                    }
                }, [e._v(e._s(e.$t("header.PreviousCivilization")))])]), e._v(" "), t("ul", {staticClass: "title user-box"}, [t("li", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.isLogin,
                        expression: "isLogin"
                    }]
                }, [t("span", {staticClass: "person-img"}, [e._v(e._s(e.username) + " "), t("span", {
                    staticStyle: {
                        "font-size": "0.24rem",
                        "font-weight": "bold"
                    }
                }, [e._v("(" + e._s(e.myBalanceEOS) + ")")])])]), e._v(" "), t("li", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: !e.isLogin,
                        expression: "!isLogin"
                    }], staticClass: "login-btn", on: {click: e.indexLogin}
                }, [e._v(e._s(e.$t("header.Login")))]), e._v(" "), t("li", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.isLogin,
                        expression: "isLogin"
                    }], on: {click: e.logout}
                }, [e._v(e._s(e.$t("header.Logout")))])]), e._v(" "), t("language")], 1), e._v(" "), t("div", {staticClass: "eos-content"}, [t("div", {staticClass: "eos-game-content"}, [t("div", {staticClass: "header"}, [e._m(0), e._v(" "), t("div", {staticClass: "all-eos"}, [e._v("\n          " + e._s(e.quote_balance) + "\n          "), t("span", [e._v(e._s(e.tokenName))])]), e._v(" "), t("div", {staticClass: "header-reward"}, [t("span", {staticClass: "content-text"}, [e._v(e._s(e.$t("header.TheUltimatePrize")))]), e._v(" "), t("span", {staticClass: "content-number"}, [e._v(e._s(e.ultimatePrize) + "\n            "), t("span", {staticStyle: {"font-size": ".18rem"}}, [e._v(e._s(e.tokenName))])]), e._v(" "), t("span", {staticClass: "content-pre"}, [e._v(e._s(e.$t("header.EstimatedMax")))])])]), e._v(" "), t("pieEcharts", {attrs: {pieData: e.pieDataCopy}})], 1), e._v(" "), t("introduce", {
                    ref: "introduce",
                    attrs: {introduceStatic: e.introduceShow},
                    on: {introduce: e.introduce}
                }), e._v(" "), t("historyRecord", {
                    ref: "historyRecord",
                    attrs: {
                        eosClient: e.eosClient,
                        scatterEosClient: e.scatterEosClient,
                        historyRecordStatic: e.historyRecordShow
                    },
                    on: {history: e.history, updateEos: e.updateEos}
                })], 1), e._v(" "), t("worldRecord", {
                    ref: "worldRecord",
                    attrs: {"world-record-static": e.worldRecordShow},
                    on: {setAccount: e.setAccount}
                }), e._v(" "), t("contactMusic", {
                    ref: "contactMusic",
                    on: {hideAirdrop: e.hideAirdrop}
                }), e._v(" "), t("airdrop", {
                    ref: "airdrop",
                    attrs: {pieData: e.pieData},
                    on: {hideGit: e.hideGit}
                }), e._v(" "), t("div", {staticClass: "footer-login"}, [t("login", {
                    ref: "userlogin",
                    attrs: {
                        eosClient: e.eosClient,
                        globalgameid: e.globalgameid,
                        scatterEosClient: e.scatterEosClient,
                        scatter: e.scatter,
                        gameidGlobal: e.gameidGlobal,
                        pieData: e.pieData
                    },
                    on: {
                        showHelp: e.showHelp,
                        updateEos: e.updateEos,
                        tipsShow: e.tipsShow,
                        updateData: e.getUpdateData,
                        getUserinfo: e.handleGetUserinfo,
                        loginMethod: e.errorShow,
                        username: e.getUserName
                    }
                })], 1), e._v(" "), t("search", {
                    ref: "search",
                    attrs: {eosClient: e.eosClient},
                    on: {hideData: e.hideData}
                }), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.errorTips,
                        expression: "errorTips"
                    }], staticClass: "error-modal", class: [e.errorTips ? "Hide" : ""]
                }, [e._v(e._s(e.errorTxt))])], 1)
            }, staticRenderFns: [function () {
                var e = this.$createElement, i = this._self._c || e;
                return i("div", {staticClass: "icon"}, [i("div", {staticClass: "header-icon"})])
            }]
        };
        var T = t("VU/8")(N, k, !1, function (e) {
            t("WDzs")
        }, "data-v-63434e5b", null);
        i.default = T.exports
    }, D4Sz: function (e, i) {
    }, D50i: function (e, i) {
    }, P9lB: function (e, i, t) {
        e.exports = t.p + "static/img/login-de.94c950f.gif"
    }, SAC9: function (e, i) {
        e.exports = {
            0: {price: "0.0149", eos: "0", percent: "0.0000", zhizi: "0.0000", alleos: "10001"},
            100: {price: "0.0151", eos: "100", percent: "0.9960", zhizi: "6710.9389", alleos: "10101"},
            200: {price: "0.0154", eos: "200", percent: "1.9821", zhizi: "13355.4395", alleos: "10201"},
            300: {price: "0.0157", eos: "300", percent: "2.9488", zhizi: "19869.0171", alleos: "10301"},
            400: {price: "0.0160", eos: "400", percent: "3.8966", zhizi: "26254.8589", alleos: "10401"},
            500: {price: "0.0163", eos: "500", percent: "4.8259", zhizi: "32516.6797", alleos: "10501"},
            600: {price: "0.0166", eos: "600", percent: "5.7374", zhizi: "38658.0581", alleos: "10601"},
            700: {price: "0.0169", eos: "700", percent: "6.6315", zhizi: "44682.4362", alleos: "10701"},
            800: {price: "0.0172", eos: "800", percent: "7.5087", zhizi: "50593.1262", alleos: "10801"},
            900: {price: "0.0176", eos: "900", percent: "8.3695", zhizi: "56393.3166", alleos: "10901"},
            1000: {price: "0.0179", eos: "1000", percent: "9.2144", zhizi: "62086.0776", alleos: "11001"},
            1100: {price: "0.0182", eos: "1100", percent: "10.0438", zhizi: "67674.3667", alleos: "11101"},
            1200: {price: "0.0186", eos: "1200", percent: "10.8581", zhizi: "73161.0338", alleos: "11201"},
            1300: {price: "0.0189", eos: "1300", percent: "11.6577", zhizi: "78548.8263", alleos: "11301"},
            1400: {price: "0.0192", eos: "1400", percent: "12.4430", zhizi: "83840.3931", alleos: "11401"},
            1500: {price: "0.0196", eos: "1500", percent: "13.2145", zhizi: "89038.2896", alleos: "11501"},
            1600: {price: "0.0199", eos: "1600", percent: "13.9724", zhizi: "94144.9812", alleos: "11601"},
            1700: {price: "0.0203", eos: "1700", percent: "14.7171", zhizi: "99162.8479", alleos: "11701"},
            1800: {price: "0.0206", eos: "1800", percent: "15.4490", zhizi: "104094.1872", alleos: "11801"},
            1900: {price: "0.0210", eos: "1900", percent: "16.1684", zhizi: "108941.2184", alleos: "11901"},
            2000: {price: "0.0213", eos: "2000", percent: "16.8755", zhizi: "113706.0854", alleos: "12001"},
            2100: {price: "0.0217", eos: "2100", percent: "17.5708", zhizi: "118390.8598", alleos: "12101"},
            2200: {price: "0.0221", eos: "2200", percent: "18.2545", zhizi: "122997.5445", alleos: "12201"},
            2300: {price: "0.0224", eos: "2300", percent: "18.9269", zhizi: "127528.0759", alleos: "12301"},
            2400: {price: "0.0228", eos: "2400", percent: "19.5883", zhizi: "131984.3271", alleos: "12401"},
            2500: {price: "0.0232", eos: "2500", percent: "20.2389", zhizi: "136368.1100", alleos: "12501"},
            2600: {price: "0.0236", eos: "2600", percent: "20.8790", zhizi: "140681.1784", alleos: "12601"},
            2700: {price: "0.0239", eos: "2700", percent: "21.5089", zhizi: "144925.2296", alleos: "12701"},
            2800: {price: "0.0243", eos: "2800", percent: "22.1287", zhizi: "149101.9072", alleos: "12801"},
            2900: {price: "0.0247", eos: "2900", percent: "22.7389", zhizi: "153212.8030", alleos: "12901"},
            3000: {price: "0.0251", eos: "3000", percent: "23.3394", zhizi: "157259.4590", alleos: "13001"},
            3100: {price: "0.0255", eos: "3100", percent: "23.9307", zhizi: "161243.3694", alleos: "13101"},
            3200: {price: "0.0259", eos: "3200", percent: "24.5129", zhizi: "165165.9825", alleos: "13201"},
            3300: {price: "0.0263", eos: "3300", percent: "25.0861", zhizi: "169028.7022", alleos: "13301"},
            3400: {price: "0.0267", eos: "3400", percent: "25.6507", zhizi: "172832.8900", alleos: "13401"},
            3500: {price: "0.0271", eos: "3500", percent: "26.2068", zhizi: "176579.8664", alleos: "13501"},
            3600: {price: "0.0275", eos: "3600", percent: "26.7546", zhizi: "180270.9123", alleos: "13601"},
            3700: {price: "0.0279", eos: "3700", percent: "27.2943", zhizi: "183907.2709", alleos: "13701"},
            3800: {price: "0.0283", eos: "3800", percent: "27.8261", zhizi: "187490.1487", alleos: "13801"},
            3900: {price: "0.0287", eos: "3900", percent: "28.3501", zhizi: "191020.7170", alleos: "13901"},
            4000: {price: "0.0292", eos: "4000", percent: "28.8664", zhizi: "194500.1131", alleos: "14001"},
            4100: {price: "0.0296", eos: "4100", percent: "29.3754", zhizi: "197929.4416", alleos: "14101"},
            4200: {price: "0.0300", eos: "4200", percent: "29.8771", zhizi: "201309.7755", alleos: "14201"},
            4300: {price: "0.0304", eos: "4300", percent: "30.3717", zhizi: "204642.1574", alleos: "14301"},
            4400: {price: "0.0309", eos: "4400", percent: "30.8593", zhizi: "207927.6006", alleos: "14401"},
            4500: {price: "0.0313", eos: "4500", percent: "31.3401", zhizi: "211167.0898", alleos: "14501"},
            4600: {price: "0.0317", eos: "4600", percent: "31.8142", zhizi: "214361.5826", alleos: "14601"},
            4700: {price: "0.0322", eos: "4700", percent: "32.2817", zhizi: "217512.0100", alleos: "14701"},
            4800: {price: "0.0326", eos: "4800", percent: "32.7429", zhizi: "220619.2777", alleos: "14801"},
            4900: {price: "0.0331", eos: "4900", percent: "33.1978", zhizi: "223684.2665", alleos: "14901"},
            5000: {price: "0.0335", eos: "5000", percent: "33.6465", zhizi: "226707.8335", alleos: "15001"},
            5100: {price: "0.0340", eos: "5100", percent: "34.0892", zhizi: "229690.8128", alleos: "15101"},
            5200: {price: "0.0344", eos: "5200", percent: "34.5260", zhizi: "232634.0164", alleos: "15201"},
            5300: {price: "0.0349", eos: "5300", percent: "34.9571", zhizi: "235538.2344", alleos: "15301"},
            5400: {price: "0.0354", eos: "5400", percent: "35.3824", zhizi: "238404.2365", alleos: "15401"},
            5500: {price: "0.0358", eos: "5500", percent: "35.8022", zhizi: "241232.7721", alleos: "15501"},
            5600: {price: "0.0363", eos: "5600", percent: "36.2165", zhizi: "244024.5711", alleos: "15601"},
            5700: {price: "0.0368", eos: "5700", percent: "36.6255", zhizi: "246780.3447", alleos: "15701"},
            5800: {price: "0.0372", eos: "5800", percent: "37.0293", zhizi: "249500.7856", alleos: "15801"},
            5900: {price: "0.0377", eos: "5900", percent: "37.4279", zhizi: "252186.5691", alleos: "15901"},
            6000: {price: "0.0382", eos: "6000", percent: "37.8215", zhizi: "254838.3534", alleos: "16001"},
            6100: {price: "0.0387", eos: "6100", percent: "38.2101", zhizi: "257456.7799", alleos: "16101"},
            6200: {price: "0.0392", eos: "6200", percent: "38.5938", zhizi: "260042.4743", alleos: "16201"},
            6300: {price: "0.0397", eos: "6300", percent: "38.9728", zhizi: "262596.0464", alleos: "16301"},
            6400: {price: "0.0401", eos: "6400", percent: "39.3471", zhizi: "265118.0912", alleos: "16401"},
            6500: {price: "0.0406", eos: "6500", percent: "39.7168", zhizi: "267609.1890", alleos: "16501"},
            6600: {price: "0.0411", eos: "6600", percent: "40.0820", zhizi: "270069.9060", alleos: "16601"},
            6700: {price: "0.0416", eos: "6700", percent: "40.4428", zhizi: "272500.7946", alleos: "16701"},
            6800: {price: "0.0421", eos: "6800", percent: "40.7992", zhizi: "274902.3938", alleos: "16801"},
            6900: {price: "0.0427", eos: "6900", percent: "41.1514", zhizi: "277275.2300", alleos: "16901"},
            7000: {price: "0.0432", eos: "7000", percent: "41.4994", zhizi: "279619.8168", alleos: "17001"},
            7100: {price: "0.0437", eos: "7100", percent: "41.8432", zhizi: "281936.6556", alleos: "17101"},
            7200: {price: "0.0442", eos: "7200", percent: "42.1830", zhizi: "284226.2362", alleos: "17201"},
            7300: {price: "0.0447", eos: "7300", percent: "42.5189", zhizi: "286489.0369", alleos: "17301"},
            7400: {price: "0.0452", eos: "7400", percent: "42.8508", zhizi: "288725.5247", alleos: "17401"},
            7500: {price: "0.0458", eos: "7500", percent: "43.1789", zhizi: "290936.1561", alleos: "17501"},
            7600: {price: "0.0463", eos: "7600", percent: "43.5032", zhizi: "293121.3768", alleos: "17601"},
            7700: {price: "0.0468", eos: "7700", percent: "43.8238", zhizi: "295281.6225", alleos: "17701"},
            7800: {price: "0.0474", eos: "7800", percent: "44.1408", zhizi: "297417.3189", alleos: "17801"},
            7900: {price: "0.0479", eos: "7900", percent: "44.4541", zhizi: "299528.8822", alleos: "17901"},
            8000: {price: "0.0484", eos: "8000", percent: "44.7640", zhizi: "301616.7191", alleos: "18001"},
            8100: {price: "0.0490", eos: "8100", percent: "45.0704", zhizi: "303681.2273", alleos: "18101"},
            8200: {price: "0.0495", eos: "8200", percent: "45.3734", zhizi: "305722.7956", alleos: "18201"},
            8300: {price: "0.0501", eos: "8300", percent: "45.6730", zhizi: "307741.8043", alleos: "18301"},
            8400: {price: "0.0506", eos: "8400", percent: "45.9694", zhizi: "309738.6252", alleos: "18401"},
            8500: {price: "0.0512", eos: "8500", percent: "46.2625", zhizi: "311713.6222", alleos: "18501"},
            8600: {price: "0.0517", eos: "8600", percent: "46.5525", zhizi: "313667.1511", alleos: "18601"},
            8700: {price: "0.0523", eos: "8700", percent: "46.8392", zhizi: "315599.5600", alleos: "18701"},
            8800: {price: "0.0529", eos: "8800", percent: "47.1230", zhizi: "317511.1896", alleos: "18801"},
            8900: {price: "0.0534", eos: "8900", percent: "47.4036", zhizi: "319402.3732", alleos: "18901"},
            9000: {price: "0.0540", eos: "9000", percent: "47.6813", zhizi: "321273.4372", alleos: "19001"},
            9100: {price: "0.0546", eos: "9100", percent: "47.9561", zhizi: "323124.7010", alleos: "19101"},
            9200: {price: "0.0552", eos: "9200", percent: "48.2279", zhizi: "324956.4772", alleos: "19201"},
            9300: {price: "0.0558", eos: "9300", percent: "48.4970", zhizi: "326769.0718", alleos: "19301"},
            9400: {price: "0.0563", eos: "9400", percent: "48.7632", zhizi: "328562.7847", alleos: "19401"},
            9500: {price: "0.0569", eos: "9500", percent: "49.0266", zhizi: "330337.9093", alleos: "19501"},
            9600: {price: "0.0575", eos: "9600", percent: "49.2874", zhizi: "332094.7331", alleos: "19601"},
            9700: {price: "0.0581", eos: "9700", percent: "49.5454", zhizi: "333833.5377", alleos: "19701"},
            9800: {price: "0.0587", eos: "9800", percent: "49.8008", zhizi: "335554.5989", alleos: "19801"},
            9900: {price: "0.0593", eos: "9900", percent: "50.0537", zhizi: "337258.1870", alleos: "19901"},
            10000: {price: "0.0599", eos: "10000", percent: "50.3040", zhizi: "338944.5665", alleos: "20001"},
            10100: {price: "0.0605", eos: "10100", percent: "50.5517", zhizi: "340613.9971", alleos: "20101"},
            10200: {price: "0.0611", eos: "10200", percent: "50.7970", zhizi: "342266.7330", alleos: "20201"},
            10300: {price: "0.0617", eos: "10300", percent: "51.0399", zhizi: "343903.0233", alleos: "20301"},
            10400: {price: "0.0623", eos: "10400", percent: "51.2803", zhizi: "345523.1123", alleos: "20401"},
            10500: {price: "0.0630", eos: "10500", percent: "51.5184", zhizi: "347127.2394", alleos: "20501"},
            10600: {price: "0.0636", eos: "10600", percent: "51.7541", zhizi: "348715.6394", alleos: "20601"},
            10700: {price: "0.0642", eos: "10700", percent: "51.9876", zhizi: "350288.5425", alleos: "20701"},
            10800: {price: "0.0648", eos: "10800", percent: "52.2187", zhizi: "351846.1743", alleos: "20801"},
            10900: {price: "0.0655", eos: "10900", percent: "52.4477", zhizi: "353388.7562", alleos: "20901"},
            11000: {price: "0.0661", eos: "11000", percent: "52.6744", zhizi: "354916.5052", alleos: "21001"},
            11100: {price: "0.0667", eos: "11100", percent: "52.8990", zhizi: "356429.6343", alleos: "21101"},
            11200: {price: "0.0674", eos: "11200", percent: "53.1214", zhizi: "357928.3524", alleos: "21201"},
            11300: {price: "0.0680", eos: "11300", percent: "53.3417", zhizi: "359412.8643", alleos: "21301"},
            11400: {price: "0.0686", eos: "11400", percent: "53.5600", zhizi: "360883.3710", alleos: "21401"},
            11500: {price: "0.0693", eos: "11500", percent: "53.7762", zhizi: "362340.0700", alleos: "21501"},
            11600: {price: "0.0699", eos: "11600", percent: "53.9903", zhizi: "363783.1546", alleos: "21601"},
            11700: {price: "0.0706", eos: "11700", percent: "54.2025", zhizi: "365212.8149", alleos: "21701"},
            11800: {price: "0.0713", eos: "11800", percent: "54.4127", zhizi: "366629.2374", alleos: "21801"},
            11900: {price: "0.0719", eos: "11900", percent: "54.6210", zhizi: "368032.6051", alleos: "21901"},
            12000: {price: "0.0726", eos: "12000", percent: "54.8274", zhizi: "369423.0976", alleos: "22001"},
            12100: {price: "0.0732", eos: "12100", percent: "55.0319", zhizi: "370800.8913", alleos: "22101"},
            12200: {price: "0.0739", eos: "12200", percent: "55.2345", zhizi: "372166.1594", alleos: "22201"},
            12300: {price: "0.0746", eos: "12300", percent: "55.4353", zhizi: "373519.0719", alleos: "22301"},
            12400: {price: "0.0753", eos: "12400", percent: "55.6343", zhizi: "374859.7958", alleos: "22401"},
            12500: {price: "0.0759", eos: "12500", percent: "55.8315", zhizi: "376188.4951", alleos: "22501"},
            12600: {price: "0.0766", eos: "12600", percent: "56.0269", zhizi: "377505.3309", alleos: "22601"},
            12700: {price: "0.0773", eos: "12700", percent: "56.2206", zhizi: "378810.4612", alleos: "22701"},
            12800: {price: "0.0780", eos: "12800", percent: "56.4126", zhizi: "380104.0415", alleos: "22801"},
            12900: {price: "0.0787", eos: "12900", percent: "56.6029", zhizi: "381386.2245", alleos: "22901"},
            13000: {price: "0.0794", eos: "13000", percent: "56.7915", zhizi: "382657.1601", alleos: "23001"},
            13100: {price: "0.0801", eos: "13100", percent: "56.9785", zhizi: "383916.9956", alleos: "23101"},
            13200: {price: "0.0808", eos: "13200", percent: "57.1638", zhizi: "385165.8759", alleos: "23201"},
            13300: {price: "0.0815", eos: "13300", percent: "57.3476", zhizi: "386403.9433", alleos: "23301"},
            13400: {price: "0.0822", eos: "13400", percent: "57.5297", zhizi: "387631.3375", alleos: "23401"},
            13500: {price: "0.0829", eos: "13500", percent: "57.7103", zhizi: "388848.1960", alleos: "23501"},
            13600: {price: "0.0836", eos: "13600", percent: "57.8894", zhizi: "390054.6538", alleos: "23601"},
            13700: {price: "0.0843", eos: "13700", percent: "58.0669", zhizi: "391250.8438", alleos: "23701"},
            13800: {price: "0.0850", eos: "13800", percent: "58.2429", zhizi: "392436.8965", alleos: "23801"},
            13900: {price: "0.0858", eos: "13900", percent: "58.4175", zhizi: "393612.9402", alleos: "23901"},
            14000: {price: "0.0865", eos: "14000", percent: "58.5906", zhizi: "394779.1010", alleos: "24001"},
            14100: {price: "0.0872", eos: "14100", percent: "58.7622", zhizi: "395935.5031", alleos: "24101"},
            14200: {price: "0.0879", eos: "14200", percent: "58.9324", zhizi: "397082.2684", alleos: "24201"},
            14300: {price: "0.0887", eos: "14300", percent: "59.1012", zhizi: "398219.5168", alleos: "24301"},
            14400: {price: "0.0894", eos: "14400", percent: "59.2686", zhizi: "399347.3664", alleos: "24401"},
            14500: {price: "0.0901", eos: "14500", percent: "59.4346", zhizi: "400465.9332", alleos: "24501"},
            14600: {price: "0.0909", eos: "14600", percent: "59.5992", zhizi: "401575.3313", alleos: "24601"},
            14700: {price: "0.0916", eos: "14700", percent: "59.7625", zhizi: "402675.6731", alleos: "24701"},
            14800: {price: "0.0924", eos: "14800", percent: "59.9245", zhizi: "403767.0688", alleos: "24801"},
            14900: {price: "0.0931", eos: "14900", percent: "60.0852", zhizi: "404849.6273", alleos: "24901"},
            15000: {price: "0.0939", eos: "15000", percent: "60.2445", zhizi: "405923.4554", alleos: "25001"},
            15100: {price: "0.0946", eos: "15100", percent: "60.4026", zhizi: "406988.6583", alleos: "25101"},
            15200: {price: "0.0954", eos: "15200", percent: "60.5595", zhizi: "408045.3395", alleos: "25201"},
            15300: {price: "0.0962", eos: "15300", percent: "60.7150", zhizi: "409093.6008", alleos: "25301"},
            15400: {price: "0.0969", eos: "15400", percent: "60.8694", zhizi: "410133.5426", alleos: "25401"},
            15500: {price: "0.0977", eos: "15500", percent: "61.0225", zhizi: "411165.2633", alleos: "25501"},
            15600: {price: "0.0985", eos: "15600", percent: "61.1744", zhizi: "412188.8603", alleos: "25601"},
            15700: {price: "0.0992", eos: "15700", percent: "61.3251", zhizi: "413204.4290", alleos: "25701"},
            15800: {price: "0.1000", eos: "15800", percent: "61.4747", zhizi: "414212.0635", alleos: "25801"},
            15900: {price: "0.1008", eos: "15900", percent: "61.6231", zhizi: "415211.8564", alleos: "25901"},
            16000: {price: "0.1016", eos: "16000", percent: "61.7703", zhizi: "416203.8989", alleos: "26001"},
            16100: {price: "0.1024", eos: "16100", percent: "61.9164", zhizi: "417188.2808", alleos: "26101"},
            16200: {price: "0.1032", eos: "16200", percent: "62.0614", zhizi: "418165.0905", alleos: "26201"},
            16300: {price: "0.1040", eos: "16300", percent: "62.2052", zhizi: "419134.4151", alleos: "26301"},
            16400: {price: "0.1048", eos: "16400", percent: "62.3480", zhizi: "420096.3401", alleos: "26401"},
            16500: {price: "0.1056", eos: "16500", percent: "62.4897", zhizi: "421050.9501", alleos: "26501"},
            16600: {price: "0.1064", eos: "16600", percent: "62.6303", zhizi: "421998.3282", alleos: "26601"},
            16700: {price: "0.1072", eos: "16700", percent: "62.7698", zhizi: "422938.5562", alleos: "26701"},
            16800: {price: "0.1080", eos: "16800", percent: "62.9083", zhizi: "423871.7148", alleos: "26801"},
            16900: {price: "0.1088", eos: "16900", percent: "63.0458", zhizi: "424797.8833", alleos: "26901"},
            17000: {price: "0.1096", eos: "17000", percent: "63.1822", zhizi: "425717.1402", alleos: "27001"},
            17100: {price: "0.1104", eos: "17100", percent: "63.3176", zhizi: "426629.5624", alleos: "27101"},
            17200: {price: "0.1112", eos: "17200", percent: "63.4520", zhizi: "427535.2259", alleos: "27201"},
            17300: {price: "0.1121", eos: "17300", percent: "63.5854", zhizi: "428434.2055", alleos: "27301"},
            17400: {price: "0.1129", eos: "17400", percent: "63.7179", zhizi: "429326.5749", alleos: "27401"},
            17500: {price: "0.1137", eos: "17500", percent: "63.8493", zhizi: "430212.4068", alleos: "27501"},
            17600: {price: "0.1146", eos: "17600", percent: "63.9799", zhizi: "431091.7727", alleos: "27601"},
            17700: {price: "0.1154", eos: "17700", percent: "64.1094", zhizi: "431964.7432", alleos: "27701"},
            17800: {price: "0.1162", eos: "17800", percent: "64.2380", zhizi: "432831.3878", alleos: "27801"},
            17900: {price: "0.1171", eos: "17900", percent: "64.3657", zhizi: "433691.7751", alleos: "27901"},
            18000: {price: "0.1179", eos: "18000", percent: "64.4925", zhizi: "434545.9725", alleos: "28001"},
            18100: {price: "0.1188", eos: "18100", percent: "64.6184", zhizi: "435394.0465", alleos: "28101"},
            18200: {price: "0.1196", eos: "18200", percent: "64.7433", zhizi: "436236.0629", alleos: "28201"},
            18300: {price: "0.1205", eos: "18300", percent: "64.8674", zhizi: "437072.0863", alleos: "28301"},
            18400: {price: "0.1213", eos: "18400", percent: "64.9906", zhizi: "437902.1804", alleos: "28401"},
            18500: {price: "0.1222", eos: "18500", percent: "65.1129", zhizi: "438726.4082", alleos: "28501"},
            18600: {price: "0.1230", eos: "18600", percent: "65.2344", zhizi: "439544.8314", alleos: "28601"},
            18700: {price: "0.1239", eos: "18700", percent: "65.3550", zhizi: "440357.5114", alleos: "28701"},
            18800: {price: "0.1248", eos: "18800", percent: "65.4748", zhizi: "441164.5082", alleos: "28801"},
            18900: {price: "0.1257", eos: "18900", percent: "65.5937", zhizi: "441965.8814", alleos: "28901"},
            19000: {price: "0.1265", eos: "19000", percent: "65.7118", zhizi: "442761.6895", alleos: "29001"},
            19100: {price: "0.1274", eos: "19100", percent: "65.8291", zhizi: "443551.9902", alleos: "29101"},
            19200: {price: "0.1283", eos: "19200", percent: "65.9456", zhizi: "444336.8406", alleos: "29201"},
            19300: {price: "0.1292", eos: "19300", percent: "66.0613", zhizi: "445116.2968", alleos: "29301"},
            19400: {price: "0.1301", eos: "19400", percent: "66.1762", zhizi: "445890.4143", alleos: "29401"},
            19500: {price: "0.1310", eos: "19500", percent: "66.2903", zhizi: "446659.2477", alleos: "29501"},
            19600: {price: "0.1319", eos: "19600", percent: "66.4036", zhizi: "447422.8509", alleos: "29601"},
            19700: {price: "0.1327", eos: "19700", percent: "66.5162", zhizi: "448181.2772", alleos: "29701"},
            19800: {price: "0.1336", eos: "19800", percent: "66.6280", zhizi: "448934.5789", alleos: "29801"},
            19900: {price: "0.1346", eos: "19900", percent: "66.7390", zhizi: "449682.8079", alleos: "29901"},
            20000: {price: "0.1355", eos: "20000", percent: "66.8493", zhizi: "450426.0152", alleos: "30001"},
            20100: {price: "0.1364", eos: "20100", percent: "66.9589", zhizi: "451164.2512", alleos: "30101"},
            20200: {price: "0.1373", eos: "20200", percent: "67.0677", zhizi: "451897.5657", alleos: "30201"},
            20300: {price: "0.1382", eos: "20300", percent: "67.1758", zhizi: "452626.0076", alleos: "30301"},
            20400: {price: "0.1391", eos: "20400", percent: "67.2832", zhizi: "453349.6255", alleos: "30401"},
            20500: {price: "0.1400", eos: "20500", percent: "67.3899", zhizi: "454068.4669", alleos: "30501"},
            20600: {price: "0.1410", eos: "20600", percent: "67.4959", zhizi: "454782.5792", alleos: "30601"},
            20700: {price: "0.1419", eos: "20700", percent: "67.6012", zhizi: "455492.0087", alleos: "30701"},
            20800: {price: "0.1428", eos: "20800", percent: "67.7058", zhizi: "456196.8014", alleos: "30801"},
            20900: {price: "0.1437", eos: "20900", percent: "67.8097", zhizi: "456897.0027", alleos: "30901"},
            21000: {price: "0.1447", eos: "21000", percent: "67.9129", zhizi: "457592.6572", alleos: "31001"},
            21100: {price: "0.1456", eos: "21100", percent: "68.0155", zhizi: "458283.8091", alleos: "31101"},
            21200: {price: "0.1466", eos: "21200", percent: "68.1174", zhizi: "458970.5019", alleos: "31201"},
            21300: {price: "0.1475", eos: "21300", percent: "68.2187", zhizi: "459652.7788", alleos: "31301"},
            21400: {price: "0.1485", eos: "21400", percent: "68.3193", zhizi: "460330.6820", alleos: "31401"},
            21500: {price: "0.1494", eos: "21500", percent: "68.4193", zhizi: "461004.2536", alleos: "31501"},
            21600: {price: "0.1504", eos: "21600", percent: "68.5186", zhizi: "461673.5350", alleos: "31601"},
            21700: {price: "0.1513", eos: "21700", percent: "68.6173", zhizi: "462338.5669", alleos: "31701"},
            21800: {price: "0.1523", eos: "21800", percent: "68.7154", zhizi: "462999.3898", alleos: "31801"},
            21900: {price: "0.1533", eos: "21900", percent: "68.8128", zhizi: "463656.0435", alleos: "31901"},
            22000: {price: "0.1542", eos: "22000", percent: "68.9097", zhizi: "464308.5673", alleos: "32001"},
            22100: {price: "0.1552", eos: "22100", percent: "69.0059", zhizi: "464957.0000", alleos: "32101"},
            22200: {price: "0.1562", eos: "22200", percent: "69.1015", zhizi: "465601.3800", alleos: "32201"},
            22300: {price: "0.1571", eos: "22300", percent: "69.1966", zhizi: "466241.7452", alleos: "32301"},
            22400: {price: "0.1581", eos: "22400", percent: "69.2910", zhizi: "466878.1330", alleos: "32401"},
            22500: {price: "0.1591", eos: "22500", percent: "69.3849", zhizi: "467510.5803", alleos: "32501"},
            22600: {price: "0.1601", eos: "22600", percent: "69.4782", zhizi: "468139.1237", alleos: "32601"},
            22700: {price: "0.1611", eos: "22700", percent: "69.5709", zhizi: "468763.7990", alleos: "32701"},
            22800: {price: "0.1621", eos: "22800", percent: "69.6630", zhizi: "469384.6421", alleos: "32801"},
            22900: {price: "0.1631", eos: "22900", percent: "69.7546", zhizi: "470001.6879", alleos: "32901"},
            23000: {price: "0.1641", eos: "23000", percent: "69.8456", zhizi: "470614.9712", alleos: "33001"},
            23100: {price: "0.1651", eos: "23100", percent: "69.9361", zhizi: "471224.5264", alleos: "33101"},
            23200: {price: "0.1661", eos: "23200", percent: "70.0260", zhizi: "471830.3874", alleos: "33201"},
            23300: {price: "0.1671", eos: "23300", percent: "70.1154", zhizi: "472432.5875", alleos: "33301"},
            23400: {price: "0.1681", eos: "23400", percent: "70.2042", zhizi: "473031.1600", alleos: "33401"},
            23500: {price: "0.1691", eos: "23500", percent: "70.2925", zhizi: "473626.1374", alleos: "33501"},
            23600: {price: "0.1701", eos: "23600", percent: "70.3803", zhizi: "474217.5521", alleos: "33601"},
            23700: {price: "0.1711", eos: "23700", percent: "70.4676", zhizi: "474805.4360", alleos: "33701"},
            23800: {price: "0.1721", eos: "23800", percent: "70.5543", zhizi: "475389.8206", alleos: "33801"},
            23900: {price: "0.1732", eos: "23900", percent: "70.6405", zhizi: "475970.7370", alleos: "33901"},
            24000: {price: "0.1742", eos: "24000", percent: "70.7262", zhizi: "476548.2161", alleos: "34001"},
            24100: {price: "0.1752", eos: "24100", percent: "70.8114", zhizi: "477122.2882", alleos: "34101"},
            24200: {price: "0.1763", eos: "24200", percent: "70.8961", zhizi: "477692.9835", alleos: "34201"},
            24300: {price: "0.1773", eos: "24300", percent: "70.9803", zhizi: "478260.3315", alleos: "34301"},
            24400: {price: "0.1783", eos: "24400", percent: "71.0640", zhizi: "478824.3618", alleos: "34401"},
            24500: {price: "0.1794", eos: "24500", percent: "71.1472", zhizi: "479385.1032", alleos: "34501"},
            24600: {price: "0.1804", eos: "24600", percent: "71.2300", zhizi: "479942.5846", alleos: "34601"},
            24700: {price: "0.1815", eos: "24700", percent: "71.3122", zhizi: "480496.8342", alleos: "34701"},
            24800: {price: "0.1825", eos: "24800", percent: "71.3940", zhizi: "481047.8800", alleos: "34801"},
            24900: {price: "0.1836", eos: "24900", percent: "71.4753", zhizi: "481595.7498", alleos: "34901"},
            25000: {price: "0.1846", eos: "25000", percent: "71.5562", zhizi: "482140.4709", alleos: "35001"},
            25100: {price: "0.1857", eos: "25100", percent: "71.6366", zhizi: "482682.0704", alleos: "35101"},
            25200: {price: "0.1868", eos: "25200", percent: "71.7165", zhizi: "483220.5751", alleos: "35201"},
            25300: {price: "0.1878", eos: "25300", percent: "71.7959", zhizi: "483756.0114", alleos: "35301"},
            25400: {price: "0.1889", eos: "25400", percent: "71.8750", zhizi: "484288.4055", alleos: "35401"},
            25500: {price: "0.1900", eos: "25500", percent: "71.9535", zhizi: "484817.7831", alleos: "35501"},
            25600: {price: "0.1911", eos: "25600", percent: "72.0316", zhizi: "485344.1700", alleos: "35601"},
            25700: {price: "0.1921", eos: "25700", percent: "72.1093", zhizi: "485867.5913", alleos: "35701"},
            25800: {price: "0.1932", eos: "25800", percent: "72.1866", zhizi: "486388.0720", alleos: "35801"},
            25900: {price: "0.1943", eos: "25900", percent: "72.2634", zhizi: "486905.6369", alleos: "35901"},
            26000: {price: "0.1954", eos: "26000", percent: "72.3398", zhizi: "487420.3104", alleos: "36001"},
            26100: {price: "0.1965", eos: "26100", percent: "72.4157", zhizi: "487932.1166", alleos: "36101"},
            26200: {price: "0.1976", eos: "26200", percent: "72.4913", zhizi: "488441.0795", alleos: "36201"},
            26300: {price: "0.1987", eos: "26300", percent: "72.5664", zhizi: "488947.2227", alleos: "36301"},
            26400: {price: "0.1998", eos: "26400", percent: "72.6411", zhizi: "489450.5695", alleos: "36401"},
            26500: {price: "0.2009", eos: "26500", percent: "72.7154", zhizi: "489951.1430", alleos: "36501"},
            26600: {price: "0.2020", eos: "26600", percent: "72.7893", zhizi: "490448.9662", alleos: "36601"},
            26700: {price: "0.2031", eos: "26700", percent: "72.8627", zhizi: "490944.0615", alleos: "36701"},
            26800: {price: "0.2042", eos: "26800", percent: "72.9358", zhizi: "491436.4515", alleos: "36801"},
            26900: {price: "0.2053", eos: "26900", percent: "73.0085", zhizi: "491926.1581", alleos: "36901"},
            27000: {price: "0.2064", eos: "27000", percent: "73.0808", zhizi: "492413.2033", alleos: "37001"},
            27100: {price: "0.2076", eos: "27100", percent: "73.1527", zhizi: "492897.6087", alleos: "37101"},
            27200: {price: "0.2087", eos: "27200", percent: "73.2242", zhizi: "493379.3957", alleos: "37201"},
            27300: {price: "0.2098", eos: "27300", percent: "73.2953", zhizi: "493858.5855", alleos: "37301"},
            27400: {price: "0.2109", eos: "27400", percent: "73.3660", zhizi: "494335.1990", alleos: "37401"},
            27500: {price: "0.2121", eos: "27500", percent: "73.4364", zhizi: "494809.2570", alleos: "37501"},
            27600: {price: "0.2132", eos: "27600", percent: "73.5064", zhizi: "495280.7799", alleos: "37601"},
            27700: {price: "0.2144", eos: "27700", percent: "73.5760", zhizi: "495749.7880", alleos: "37701"},
            27800: {price: "0.2155", eos: "27800", percent: "73.6452", zhizi: "496216.3014", alleos: "37801"},
            27900: {price: "0.2166", eos: "27900", percent: "73.7141", zhizi: "496680.3399", alleos: "37901"},
            28000: {price: "0.2178", eos: "28000", percent: "73.7826", zhizi: "497141.9233", alleos: "38001"},
            28100: {price: "0.2189", eos: "28100", percent: "73.8507", zhizi: "497601.0708", alleos: "38101"},
            28200: {price: "0.2201", eos: "28200", percent: "73.9185", zhizi: "498057.8018", alleos: "38201"},
            28300: {price: "0.2213", eos: "28300", percent: "73.9859", zhizi: "498512.1353", alleos: "38301"},
            28400: {price: "0.2224", eos: "28400", percent: "74.0530", zhizi: "498964.0901", alleos: "38401"},
            28500: {price: "0.2236", eos: "28500", percent: "74.1197", zhizi: "499413.6848", alleos: "38501"},
            28600: {price: "0.2248", eos: "28600", percent: "74.1861", zhizi: "499860.9379", alleos: "38601"},
            28700: {price: "0.2259", eos: "28700", percent: "74.2522", zhizi: "500305.8676", alleos: "38701"},
            28800: {price: "0.2271", eos: "28800", percent: "74.3179", zhizi: "500748.4919", alleos: "38801"},
            28900: {price: "0.2283", eos: "28900", percent: "74.3832", zhizi: "501188.8289", alleos: "38901"},
            29000: {price: "0.2295", eos: "29000", percent: "74.4482", zhizi: "501626.8960", alleos: "39001"},
            29100: {price: "0.2306", eos: "29100", percent: "74.5129", zhizi: "502062.7109", alleos: "39101"},
            29200: {price: "0.2318", eos: "29200", percent: "74.5773", zhizi: "502496.2909", alleos: "39201"},
            29300: {price: "0.2330", eos: "29300", percent: "74.6413", zhizi: "502927.6531", alleos: "39301"},
            29400: {price: "0.2342", eos: "29400", percent: "74.7050", zhizi: "503356.8145", alleos: "39401"},
            29500: {price: "0.2354", eos: "29500", percent: "74.7683", zhizi: "503783.7918", alleos: "39501"},
            29600: {price: "0.2366", eos: "29600", percent: "74.8314", zhizi: "504208.6018", alleos: "39601"},
            29700: {price: "0.2378", eos: "29700", percent: "74.8941", zhizi: "504631.2608", alleos: "39701"},
            29800: {price: "0.2390", eos: "29800", percent: "74.9565", zhizi: "505051.7852", alleos: "39801"},
            29900: {price: "0.2402", eos: "29900", percent: "75.0186", zhizi: "505470.1912", alleos: "39901"},
            30000: {price: "0.2414", eos: "30000", percent: "75.0804", zhizi: "505886.4946", alleos: "40001"},
            30100: {price: "0.2426", eos: "30100", percent: "75.1419", zhizi: "506300.7112", alleos: "40101"},
            30200: {price: "0.2438", eos: "30200", percent: "75.2030", zhizi: "506712.8568", alleos: "40201"},
            30300: {price: "0.2451", eos: "30300", percent: "75.2639", zhizi: "507122.9468", alleos: "40301"},
            30400: {price: "0.2463", eos: "30400", percent: "75.3245", zhizi: "507530.9966", alleos: "40401"},
            30500: {price: "0.2475", eos: "30500", percent: "75.3847", zhizi: "507937.0214", alleos: "40501"},
            30600: {price: "0.2487", eos: "30600", percent: "75.4447", zhizi: "508341.0361", alleos: "40601"},
            30700: {price: "0.2500", eos: "30700", percent: "75.5044", zhizi: "508743.0557", alleos: "40701"},
            30800: {price: "0.2512", eos: "30800", percent: "75.5637", zhizi: "509143.0949", alleos: "40801"},
            30900: {price: "0.2524", eos: "30900", percent: "75.6228", zhizi: "509541.1683", alleos: "40901"},
            31000: {price: "0.2537", eos: "31000", percent: "75.6816", zhizi: "509937.2905", alleos: "41001"},
            31100: {price: "0.2549", eos: "31100", percent: "75.7401", zhizi: "510331.4756", alleos: "41101"},
            31200: {price: "0.2562", eos: "31200", percent: "75.7983", zhizi: "510723.7378", alleos: "41201"},
            31300: {price: "0.2574", eos: "31300", percent: "75.8562", zhizi: "511114.0913", alleos: "41301"},
            31400: {price: "0.2587", eos: "31400", percent: "75.9139", zhizi: "511502.5498", alleos: "41401"},
            31500: {price: "0.2599", eos: "31500", percent: "75.9713", zhizi: "511889.1272", alleos: "41501"},
            31600: {price: "0.2612", eos: "31600", percent: "76.0284", zhizi: "512273.8371", alleos: "41601"},
            31700: {price: "0.2625", eos: "31700", percent: "76.0852", zhizi: "512656.6930", alleos: "41701"},
            31800: {price: "0.2637", eos: "31800", percent: "76.1417", zhizi: "513037.7082", alleos: "41801"},
            31900: {price: "0.2650", eos: "31900", percent: "76.1980", zhizi: "513416.8960", alleos: "41901"},
            32000: {price: "0.2663", eos: "32000", percent: "76.2540", zhizi: "513794.2696", alleos: "42001"},
            32100: {price: "0.2675", eos: "32100", percent: "76.3098", zhizi: "514169.8418", alleos: "42101"},
            32200: {price: "0.2688", eos: "32200", percent: "76.3652", zhizi: "514543.6257", alleos: "42201"},
            32300: {price: "0.2701", eos: "32300", percent: "76.4204", zhizi: "514915.6338", alleos: "42301"},
            32400: {price: "0.2714", eos: "32400", percent: "76.4754", zhizi: "515285.8789", alleos: "42401"},
            32500: {price: "0.2727", eos: "32500", percent: "76.5301", zhizi: "515654.3734", alleos: "42501"},
            32600: {price: "0.2739", eos: "32600", percent: "76.5845", zhizi: "516021.1298", alleos: "42601"},
            32700: {price: "0.2752", eos: "32700", percent: "76.6387", zhizi: "516386.1603", alleos: "42701"},
            32800: {price: "0.2765", eos: "32800", percent: "76.6926", zhizi: "516749.4770", alleos: "42801"},
            32900: {price: "0.2778", eos: "32900", percent: "76.7463", zhizi: "517111.0920", alleos: "42901"},
            33000: {price: "0.2791", eos: "33000", percent: "76.7997", zhizi: "517471.0172", alleos: "43001"},
            33100: {price: "0.2804", eos: "33100", percent: "76.8529", zhizi: "517829.2645", alleos: "43101"},
            33200: {price: "0.2817", eos: "33200", percent: "76.9058", zhizi: "518185.8455", alleos: "43201"},
            33300: {price: "0.2831", eos: "33300", percent: "76.9585", zhizi: "518540.7718", alleos: "43301"},
            33400: {price: "0.2844", eos: "33400", percent: "77.0109", zhizi: "518894.0550", alleos: "43401"},
            33500: {price: "0.2857", eos: "33500", percent: "77.0631", zhizi: "519245.7064", alleos: "43501"},
            33600: {price: "0.2870", eos: "33600", percent: "77.1150", zhizi: "519595.7374", alleos: "43601"},
            33700: {price: "0.2883", eos: "33700", percent: "77.1667", zhizi: "519944.1589", alleos: "43701"},
            33800: {price: "0.2897", eos: "33800", percent: "77.2182", zhizi: "520290.9823", alleos: "43801"},
            33900: {price: "0.2910", eos: "33900", percent: "77.2695", zhizi: "520636.2183", alleos: "43901"},
            34000: {price: "0.2923", eos: "34000", percent: "77.3205", zhizi: "520979.8779", alleos: "44001"},
            34100: {price: "0.2937", eos: "34100", percent: "77.3712", zhizi: "521321.9720", alleos: "44101"},
            34200: {price: "0.2950", eos: "34200", percent: "77.4218", zhizi: "521662.5110", alleos: "44201"},
            34300: {price: "0.2963", eos: "34300", percent: "77.4721", zhizi: "522001.5056", alleos: "44301"},
            34400: {price: "0.2977", eos: "34400", percent: "77.5222", zhizi: "522338.9664", alleos: "44401"},
            34500: {price: "0.2990", eos: "34500", percent: "77.5720", zhizi: "522674.9036", alleos: "44501"},
            34600: {price: "0.3004", eos: "34600", percent: "77.6217", zhizi: "523009.3277", alleos: "44601"},
            34700: {price: "0.3017", eos: "34700", percent: "77.6711", zhizi: "523342.2487", alleos: "44701"},
            34800: {price: "0.3031", eos: "34800", percent: "77.7203", zhizi: "523673.6768", alleos: "44801"},
            34900: {price: "0.3044", eos: "34900", percent: "77.7692", zhizi: "524003.6220", alleos: "44901"},
            35000: {price: "0.3058", eos: "35000", percent: "77.8180", zhizi: "524332.0942", alleos: "45001"},
            35100: {price: "0.3072", eos: "35100", percent: "77.8665", zhizi: "524659.1033", alleos: "45101"},
            35200: {price: "0.3085", eos: "35200", percent: "77.9148", zhizi: "524984.6591", alleos: "45201"},
            35300: {price: "0.3099", eos: "35300", percent: "77.9629", zhizi: "525308.7712", alleos: "45301"},
            35400: {price: "0.3113", eos: "35400", percent: "78.0108", zhizi: "525631.4491", alleos: "45401"},
            35500: {price: "0.3127", eos: "35500", percent: "78.0585", zhizi: "525952.7025", alleos: "45501"},
            35600: {price: "0.3140", eos: "35600", percent: "78.1060", zhizi: "526272.5406", alleos: "45601"},
            35700: {price: "0.3154", eos: "35700", percent: "78.1532", zhizi: "526590.9729", alleos: "45701"},
            35800: {price: "0.3168", eos: "35800", percent: "78.2003", zhizi: "526908.0085", alleos: "45801"},
            35900: {price: "0.3182", eos: "35900", percent: "78.2471", zhizi: "527223.6567", alleos: "45901"},
            36000: {price: "0.3196", eos: "36000", percent: "78.2938", zhizi: "527537.9265", alleos: "46001"},
            36100: {price: "0.3210", eos: "36100", percent: "78.3402", zhizi: "527850.8270", alleos: "46101"},
            36200: {price: "0.3224", eos: "36200", percent: "78.3864", zhizi: "528162.3670", alleos: "46201"},
            36300: {price: "0.3238", eos: "36300", percent: "78.4325", zhizi: "528472.5555", alleos: "46301"},
            36400: {price: "0.3252", eos: "36400", percent: "78.4783", zhizi: "528781.4012", alleos: "46401"},
            36500: {price: "0.3266", eos: "36500", percent: "78.5240", zhizi: "529088.9127", alleos: "46501"},
            36600: {price: "0.3280", eos: "36600", percent: "78.5694", zhizi: "529395.0988", alleos: "46601"},
            36700: {price: "0.3294", eos: "36700", percent: "78.6146", zhizi: "529699.9680", alleos: "46701"},
            36800: {price: "0.3308", eos: "36800", percent: "78.6597", zhizi: "530003.5288", alleos: "46801"},
            36900: {price: "0.3323", eos: "36900", percent: "78.7046", zhizi: "530305.7895", alleos: "46901"},
            37000: {price: "0.3337", eos: "37000", percent: "78.7492", zhizi: "530606.7585", alleos: "47001"},
            37100: {price: "0.3351", eos: "37100", percent: "78.7937", zhizi: "530906.4440", alleos: "47101"},
            37200: {price: "0.3365", eos: "37200", percent: "78.8380", zhizi: "531204.8543", alleos: "47201"},
            37300: {price: "0.3380", eos: "37300", percent: "78.8821", zhizi: "531501.9975", alleos: "47301"},
            37400: {price: "0.3394", eos: "37400", percent: "78.9260", zhizi: "531797.8816", alleos: "47401"},
            37500: {price: "0.3408", eos: "37500", percent: "78.9697", zhizi: "532092.5147", alleos: "47501"},
            37600: {price: "0.3423", eos: "37600", percent: "79.0133", zhizi: "532385.9045", alleos: "47601"},
            37700: {price: "0.3437", eos: "37700", percent: "79.0566", zhizi: "532678.0591", alleos: "47701"},
            37800: {price: "0.3452", eos: "37800", percent: "79.0998", zhizi: "532968.9861", alleos: "47801"},
            37900: {price: "0.3466", eos: "37900", percent: "79.1428", zhizi: "533258.6933", alleos: "47901"},
            38000: {price: "0.3481", eos: "38000", percent: "79.1856", zhizi: "533547.1884", alleos: "48001"},
            38100: {price: "0.3495", eos: "38100", percent: "79.2283", zhizi: "533834.4788", alleos: "48101"},
            38200: {price: "0.3510", eos: "38200", percent: "79.2707", zhizi: "534120.5723", alleos: "48201"},
            38300: {price: "0.3525", eos: "38300", percent: "79.3130", zhizi: "534405.4762", alleos: "48301"},
            38400: {price: "0.3539", eos: "38400", percent: "79.3551", zhizi: "534689.1979", alleos: "48401"},
            38500: {price: "0.3554", eos: "38500", percent: "79.3970", zhizi: "534971.7448", alleos: "48501"},
            38600: {price: "0.3569", eos: "38600", percent: "79.4388", zhizi: "535253.1242", alleos: "48601"},
            38700: {price: "0.3583", eos: "38700", percent: "79.4804", zhizi: "535533.3432", alleos: "48701"},
            38800: {price: "0.3598", eos: "38800", percent: "79.5218", zhizi: "535812.4091", alleos: "48801"},
            38900: {price: "0.3613", eos: "38900", percent: "79.5631", zhizi: "536090.3289", alleos: "48901"},
            39000: {price: "0.3628", eos: "39000", percent: "79.6041", zhizi: "536367.1097", alleos: "49001"},
            39100: {price: "0.3643", eos: "39100", percent: "79.6450", zhizi: "536642.7585", alleos: "49101"},
            39200: {price: "0.3658", eos: "39200", percent: "79.6858", zhizi: "536917.2823", alleos: "49201"},
            39300: {price: "0.3672", eos: "39300", percent: "79.7264", zhizi: "537190.6878", alleos: "49301"},
            39400: {price: "0.3687", eos: "39400", percent: "79.7668", zhizi: "537462.9819", alleos: "49401"},
            39500: {price: "0.3702", eos: "39500", percent: "79.8070", zhizi: "537734.1713", alleos: "49501"},
            39600: {price: "0.3717", eos: "39600", percent: "79.8471", zhizi: "538004.2629", alleos: "49601"},
            39700: {price: "0.3733", eos: "39700", percent: "79.8870", zhizi: "538273.2632", alleos: "49701"},
            39800: {price: "0.3748", eos: "39800", percent: "79.9268", zhizi: "538541.1788", alleos: "49801"},
            39900: {price: "0.3763", eos: "39900", percent: "79.9664", zhizi: "538808.0163", alleos: "49901"},
            40000: {price: "0.3778", eos: "40000", percent: "80.0058", zhizi: "539073.7821", alleos: "50001"},
            40100: {price: "0.3793", eos: "40100", percent: "80.0451", zhizi: "539338.4828", alleos: "50101"},
            40200: {price: "0.3808", eos: "40200", percent: "80.0843", zhizi: "539602.1247", alleos: "50201"},
            40300: {price: "0.3823", eos: "40300", percent: "80.1232", zhizi: "539864.7141", alleos: "50301"},
            40400: {price: "0.3839", eos: "40400", percent: "80.1620", zhizi: "540126.2574", alleos: "50401"},
            40500: {price: "0.3854", eos: "40500", percent: "80.2007", zhizi: "540386.7607", alleos: "50501"},
            40600: {price: "0.3869", eos: "40600", percent: "80.2392", zhizi: "540646.2303", alleos: "50601"},
            40700: {price: "0.3885", eos: "40700", percent: "80.2776", zhizi: "540904.6723", alleos: "50701"},
            40800: {price: "0.3900", eos: "40800", percent: "80.3158", zhizi: "541162.0928", alleos: "50801"},
            40900: {price: "0.3915", eos: "40900", percent: "80.3538", zhizi: "541418.4979", alleos: "50901"},
            41000: {price: "0.3931", eos: "41000", percent: "80.3917", zhizi: "541673.8934", alleos: "51001"},
            41100: {price: "0.3946", eos: "41100", percent: "80.4295", zhizi: "541928.2855", alleos: "51101"},
            41200: {price: "0.3962", eos: "41200", percent: "80.4671", zhizi: "542181.6800", alleos: "51201"},
            41300: {price: "0.3977", eos: "41300", percent: "80.5046", zhizi: "542434.0827", alleos: "51301"},
            41400: {price: "0.3993", eos: "41400", percent: "80.5419", zhizi: "542685.4995", alleos: "51401"},
            41500: {price: "0.4009", eos: "41500", percent: "80.5790", zhizi: "542935.9361", alleos: "51501"},
            41600: {price: "0.4024", eos: "41600", percent: "80.6161", zhizi: "543185.3982", alleos: "51601"},
            41700: {price: "0.4040", eos: "41700", percent: "80.6529", zhizi: "543433.8916", alleos: "51701"},
            41800: {price: "0.4056", eos: "41800", percent: "80.6897", zhizi: "543681.4218", alleos: "51801"},
            41900: {price: "0.4071", eos: "41900", percent: "80.7263", zhizi: "543927.9945", alleos: "51901"},
            42000: {price: "0.4087", eos: "42000", percent: "80.7627", zhizi: "544173.6151", alleos: "52001"},
            42100: {price: "0.4103", eos: "42100", percent: "80.7990", zhizi: "544418.2893", alleos: "52101"},
            42200: {price: "0.4119", eos: "42200", percent: "80.8352", zhizi: "544662.0224", alleos: "52201"},
            42300: {price: "0.4134", eos: "42300", percent: "80.8712", zhizi: "544904.8199", alleos: "52301"},
            42400: {price: "0.4150", eos: "42400", percent: "80.9071", zhizi: "545146.6871", alleos: "52401"},
            42500: {price: "0.4166", eos: "42500", percent: "80.9429", zhizi: "545387.6294", alleos: "52501"},
            42600: {price: "0.4182", eos: "42600", percent: "80.9785", zhizi: "545627.6521", alleos: "52601"},
            42700: {price: "0.4198", eos: "42700", percent: "81.0140", zhizi: "545866.7604", alleos: "52701"},
            42800: {price: "0.4214", eos: "42800", percent: "81.0494", zhizi: "546104.9596", alleos: "52801"},
            42900: {price: "0.4230", eos: "42900", percent: "81.0846", zhizi: "546342.2548", alleos: "52901"},
            43000: {price: "0.4246", eos: "43000", percent: "81.1197", zhizi: "546578.6512", alleos: "53001"},
            43100: {price: "0.4262", eos: "43100", percent: "81.1546", zhizi: "546814.1538", alleos: "53101"},
            43200: {price: "0.4278", eos: "43200", percent: "81.1894", zhizi: "547048.7677", alleos: "53201"},
            43300: {price: "0.4295", eos: "43300", percent: "81.2241", zhizi: "547282.4980", alleos: "53301"},
            43400: {price: "0.4311", eos: "43400", percent: "81.2587", zhizi: "547515.3496", alleos: "53401"},
            43500: {price: "0.4327", eos: "43500", percent: "81.2931", zhizi: "547747.3275", alleos: "53501"},
            43600: {price: "0.4343", eos: "43600", percent: "81.3274", zhizi: "547978.4365", alleos: "53601"},
            43700: {price: "0.4359", eos: "43700", percent: "81.3616", zhizi: "548208.6816", alleos: "53701"},
            43800: {price: "0.4376", eos: "43800", percent: "81.3956", zhizi: "548438.0676", alleos: "53801"},
            43900: {price: "0.4392", eos: "43900", percent: "81.4295", zhizi: "548666.5993", alleos: "53901"},
            44000: {price: "0.4408", eos: "44000", percent: "81.4633", zhizi: "548894.2814", alleos: "54001"},
            44100: {price: "0.4425", eos: "44100", percent: "81.4970", zhizi: "549121.1186", alleos: "54101"},
            44200: {price: "0.4441", eos: "44200", percent: "81.5305", zhizi: "549347.1158", alleos: "54201"},
            44300: {price: "0.4458", eos: "44300", percent: "81.5640", zhizi: "549572.2775", alleos: "54301"},
            44400: {price: "0.4474", eos: "44400", percent: "81.5973", zhizi: "549796.6083", alleos: "54401"},
            44500: {price: "0.4491", eos: "44500", percent: "81.6304", zhizi: "550020.1129", alleos: "54501"},
            44600: {price: "0.4507", eos: "44600", percent: "81.6635", zhizi: "550242.7958", alleos: "54601"},
            44700: {price: "0.4524", eos: "44700", percent: "81.6964", zhizi: "550464.6614", alleos: "54701"},
            44800: {price: "0.4540", eos: "44800", percent: "81.7292", zhizi: "550685.7145", alleos: "54801"},
            44900: {price: "0.4557", eos: "44900", percent: "81.7619", zhizi: "550905.9592", alleos: "54901"},
            45000: {price: "0.4574", eos: "45000", percent: "81.7945", zhizi: "551125.4002", alleos: "55001"},
            45100: {price: "0.4590", eos: "45100", percent: "81.8269", zhizi: "551344.0417", alleos: "55101"},
            45200: {price: "0.4607", eos: "45200", percent: "81.8592", zhizi: "551561.8882", alleos: "55201"},
            45300: {price: "0.4624", eos: "45300", percent: "81.8915", zhizi: "551778.9440", alleos: "55301"},
            45400: {price: "0.4641", eos: "45400", percent: "81.9236", zhizi: "551995.2134", alleos: "55401"},
            45500: {price: "0.4657", eos: "45500", percent: "81.9555", zhizi: "552210.7006", alleos: "55501"},
            45600: {price: "0.4674", eos: "45600", percent: "81.9874", zhizi: "552425.4098", alleos: "55601"},
            45700: {price: "0.4691", eos: "45700", percent: "82.0192", zhizi: "552639.3454", alleos: "55701"},
            45800: {price: "0.4708", eos: "45800", percent: "82.0508", zhizi: "552852.5113", alleos: "55801"},
            45900: {price: "0.4725", eos: "45900", percent: "82.0823", zhizi: "553064.9119", alleos: "55901"},
            46000: {price: "0.4742", eos: "46000", percent: "82.1137", zhizi: "553276.5512", alleos: "56001"},
            46100: {price: "0.4759", eos: "46100", percent: "82.1450", zhizi: "553487.4334", alleos: "56101"},
            46200: {price: "0.4776", eos: "46200", percent: "82.1762", zhizi: "553697.5623", alleos: "56201"},
            46300: {price: "0.4793", eos: "46300", percent: "82.2073", zhizi: "553906.9422", alleos: "56301"},
            46400: {price: "0.4810", eos: "46400", percent: "82.2383", zhizi: "554115.5769", alleos: "56401"},
            46500: {price: "0.4827", eos: "46500", percent: "82.2691", zhizi: "554323.4705", alleos: "56501"},
            46600: {price: "0.4844", eos: "46600", percent: "82.2998", zhizi: "554530.6268", alleos: "56601"},
            46700: {price: "0.4862", eos: "46700", percent: "82.3305", zhizi: "554737.0499", alleos: "56701"},
            46800: {price: "0.4879", eos: "46800", percent: "82.3610", zhizi: "554942.7436", alleos: "56801"},
            46900: {price: "0.4896", eos: "46900", percent: "82.3914", zhizi: "555147.7117", alleos: "56901"},
            47000: {price: "0.4913", eos: "47000", percent: "82.4217", zhizi: "555351.9582", alleos: "57001"},
            47100: {price: "0.4931", eos: "47100", percent: "82.4520", zhizi: "555555.4867", alleos: "57101"},
            47200: {price: "0.4948", eos: "47200", percent: "82.4821", zhizi: "555758.3011", alleos: "57201"},
            47300: {price: "0.4965", eos: "47300", percent: "82.5120", zhizi: "555960.4051", alleos: "57301"},
            47400: {price: "0.4983", eos: "47400", percent: "82.5419", zhizi: "556161.8024", alleos: "57401"},
            47500: {price: "0.5000", eos: "47500", percent: "82.5717", zhizi: "556362.4968", alleos: "57501"},
            47600: {price: "0.5018", eos: "47600", percent: "82.6014", zhizi: "556562.4920", alleos: "57601"},
            47700: {price: "0.5035", eos: "47700", percent: "82.6310", zhizi: "556761.7914", alleos: "57701"},
            47800: {price: "0.5053", eos: "47800", percent: "82.6605", zhizi: "556960.3989", alleos: "57801"},
            47900: {price: "0.5070", eos: "47900", percent: "82.6898", zhizi: "557158.3180", alleos: "57901"},
            48000: {price: "0.5088", eos: "48000", percent: "82.7191", zhizi: "557355.5523", alleos: "58001"},
            48100: {price: "0.5105", eos: "48100", percent: "82.7483", zhizi: "557552.1052", alleos: "58101"},
            48200: {price: "0.5123", eos: "48200", percent: "82.7773", zhizi: "557747.9804", alleos: "58201"},
            48300: {price: "0.5141", eos: "48300", percent: "82.8063", zhizi: "557943.1814", alleos: "58301"},
            48400: {price: "0.5158", eos: "48400", percent: "82.8352", zhizi: "558137.7115", alleos: "58401"},
            48500: {price: "0.5176", eos: "48500", percent: "82.8640", zhizi: "558331.5743", alleos: "58501"},
            48600: {price: "0.5194", eos: "48600", percent: "82.8926", zhizi: "558524.7732", alleos: "58601"},
            48700: {price: "0.5212", eos: "48700", percent: "82.9212", zhizi: "558717.3116", alleos: "58701"},
            48800: {price: "0.5229", eos: "48800", percent: "82.9497", zhizi: "558909.1929", alleos: "58801"},
            48900: {price: "0.5247", eos: "48900", percent: "82.9781", zhizi: "559100.4204", alleos: "58901"},
            49000: {price: "0.5265", eos: "49000", percent: "83.0064", zhizi: "559290.9975", alleos: "59001"},
            49100: {price: "0.5283", eos: "49100", percent: "83.0345", zhizi: "559480.9274", alleos: "59101"},
            49200: {price: "0.5301", eos: "49200", percent: "83.0626", zhizi: "559670.2136", alleos: "59201"},
            49300: {price: "0.5319", eos: "49300", percent: "83.0906", zhizi: "559858.8592", alleos: "59301"},
            49400: {price: "0.5337", eos: "49400", percent: "83.1185", zhizi: "560046.8674", alleos: "59401"},
            49500: {price: "0.5355", eos: "49500", percent: "83.1463", zhizi: "560234.2416", alleos: "59501"},
            49600: {price: "0.5373", eos: "49600", percent: "83.1741", zhizi: "560420.9849", alleos: "59601"},
            49700: {price: "0.5391", eos: "49700", percent: "83.2017", zhizi: "560607.1005", alleos: "59701"},
            49800: {price: "0.5409", eos: "49800", percent: "83.2292", zhizi: "560792.5916", alleos: "59801"},
            49900: {price: "0.5427", eos: "49900", percent: "83.2566", zhizi: "560977.4612", alleos: "59901"},
            50000: {price: "0.5446", eos: "50000", percent: "83.2840", zhizi: "561161.7126", alleos: "60001"},
            50100: {price: "0.5464", eos: "50100", percent: "83.3112", zhizi: "561345.3488", alleos: "60101"},
            50200: {price: "0.5482", eos: "50200", percent: "83.3384", zhizi: "561528.3728", alleos: "60201"},
            50300: {price: "0.5500", eos: "50300", percent: "83.3655", zhizi: "561710.7878", alleos: "60301"},
            50400: {price: "0.5519", eos: "50400", percent: "83.3925", zhizi: "561892.5968", alleos: "60401"},
            50500: {price: "0.5537", eos: "50500", percent: "83.4194", zhizi: "562073.8027", alleos: "60501"},
            50600: {price: "0.5555", eos: "50600", percent: "83.4462", zhizi: "562254.4087", alleos: "60601"},
            50700: {price: "0.5574", eos: "50700", percent: "83.4729", zhizi: "562434.4176", alleos: "60701"},
            50800: {price: "0.5592", eos: "50800", percent: "83.4995", zhizi: "562613.8324", alleos: "60801"},
            50900: {price: "0.5611", eos: "50900", percent: "83.5260", zhizi: "562792.6561", alleos: "60901"},
            51000: {price: "0.5629", eos: "51000", percent: "83.5525", zhizi: "562970.8915", alleos: "61001"},
            51100: {price: "0.5648", eos: "51100", percent: "83.5789", zhizi: "563148.5416", alleos: "61101"},
            51200: {price: "0.5666", eos: "51200", percent: "83.6051", zhizi: "563325.6093", alleos: "61201"},
            51300: {price: "0.5685", eos: "51300", percent: "83.6313", zhizi: "563502.0974", alleos: "61301"},
            51400: {price: "0.5703", eos: "51400", percent: "83.6574", zhizi: "563678.0087", alleos: "61401"},
            51500: {price: "0.5722", eos: "51500", percent: "83.6835", zhizi: "563853.3461", alleos: "61501"},
            51600: {price: "0.5741", eos: "51600", percent: "83.7094", zhizi: "564028.1123", alleos: "61601"},
            51700: {price: "0.5759", eos: "51700", percent: "83.7353", zhizi: "564202.3102", alleos: "61701"},
            51800: {price: "0.5778", eos: "51800", percent: "83.7610", zhizi: "564375.9425", alleos: "61801"},
            51900: {price: "0.5797", eos: "51900", percent: "83.7867", zhizi: "564549.0121", alleos: "61901"},
            52000: {price: "0.5816", eos: "52000", percent: "83.8123", zhizi: "564721.5215", alleos: "62001"},
            52100: {price: "0.5834", eos: "52100", percent: "83.8378", zhizi: "564893.4735", alleos: "62101"},
            52200: {price: "0.5853", eos: "52200", percent: "83.8633", zhizi: "565064.8709", alleos: "62201"},
            52300: {price: "0.5872", eos: "52300", percent: "83.8886", zhizi: "565235.7163", alleos: "62301"},
            52400: {price: "0.5891", eos: "52400", percent: "83.9139", zhizi: "565406.0123", alleos: "62401"},
            52500: {price: "0.5910", eos: "52500", percent: "83.9391", zhizi: "565575.7616", alleos: "62501"},
            52600: {price: "0.5929", eos: "52600", percent: "83.9642", zhizi: "565744.9669", alleos: "62601"},
            52700: {price: "0.5948", eos: "52700", percent: "83.9892", zhizi: "565913.6307", alleos: "62701"},
            52800: {price: "0.5967", eos: "52800", percent: "84.0142", zhizi: "566081.7557", alleos: "62801"},
            52900: {price: "0.5986", eos: "52900", percent: "84.0391", zhizi: "566249.3444", alleos: "62901"},
            53000: {price: "0.6005", eos: "53000", percent: "84.0639", zhizi: "566416.3993", alleos: "63001"},
            53100: {price: "0.6024", eos: "53100", percent: "84.0886", zhizi: "566582.9231", alleos: "63101"},
            53200: {price: "0.6043", eos: "53200", percent: "84.1132", zhizi: "566748.9183", alleos: "63201"},
            53300: {price: "0.6063", eos: "53300", percent: "84.1378", zhizi: "566914.3873", alleos: "63301"},
            53400: {price: "0.6082", eos: "53400", percent: "84.1622", zhizi: "567079.3327", alleos: "63401"},
            53500: {price: "0.6101", eos: "53500", percent: "84.1867", zhizi: "567243.7569", alleos: "63501"},
            53600: {price: "0.6120", eos: "53600", percent: "84.2110", zhizi: "567407.6625", alleos: "63601"},
            53700: {price: "0.6140", eos: "53700", percent: "84.2352", zhizi: "567571.0518", alleos: "63701"},
            53800: {price: "0.6159", eos: "53800", percent: "84.2594", zhizi: "567733.9273", alleos: "63801"},
            53900: {price: "0.6178", eos: "53900", percent: "84.2835", zhizi: "567896.2915", alleos: "63901"},
            54000: {price: "0.6198", eos: "54000", percent: "84.3075", zhizi: "568058.1467", alleos: "64001"},
            54100: {price: "0.6217", eos: "54100", percent: "84.3315", zhizi: "568219.4952", alleos: "64101"},
            54200: {price: "0.6237", eos: "54200", percent: "84.3553", zhizi: "568380.3396", alleos: "64201"},
            54300: {price: "0.6256", eos: "54300", percent: "84.3791", zhizi: "568540.6821", alleos: "64301"},
            54400: {price: "0.6276", eos: "54400", percent: "84.4029", zhizi: "568700.5252", alleos: "64401"},
            54500: {price: "0.6295", eos: "54500", percent: "84.4265", zhizi: "568859.8710", alleos: "64501"},
            54600: {price: "0.6315", eos: "54600", percent: "84.4501", zhizi: "569018.7220", alleos: "64601"},
            54700: {price: "0.6334", eos: "54700", percent: "84.4736", zhizi: "569177.0804", alleos: "64701"},
            54800: {price: "0.6354", eos: "54800", percent: "84.4970", zhizi: "569334.9486", alleos: "64801"},
            54900: {price: "0.6374", eos: "54900", percent: "84.5204", zhizi: "569492.3287", alleos: "64901"},
            55000: {price: "0.6393", eos: "55000", percent: "84.5437", zhizi: "569649.2232", alleos: "65001"},
            55100: {price: "0.6413", eos: "55100", percent: "84.5669", zhizi: "569805.6341", alleos: "65101"},
            55200: {price: "0.6433", eos: "55200", percent: "84.5900", zhizi: "569961.5638", alleos: "65201"},
            55300: {price: "0.6453", eos: "55300", percent: "84.6131", zhizi: "570117.0144", alleos: "65301"},
            55400: {price: "0.6473", eos: "55400", percent: "84.6361", zhizi: "570271.9882", alleos: "65401"},
            55500: {price: "0.6492", eos: "55500", percent: "84.6590", zhizi: "570426.4873", alleos: "65501"},
            55600: {price: "0.6512", eos: "55600", percent: "84.6819", zhizi: "570580.5140", alleos: "65601"},
            55700: {price: "0.6532", eos: "55700", percent: "84.7047", zhizi: "570734.0704", alleos: "65701"},
            55800: {price: "0.6552", eos: "55800", percent: "84.7274", zhizi: "570887.1586", alleos: "65801"},
            55900: {price: "0.6572", eos: "55900", percent: "84.7500", zhizi: "571039.7808", alleos: "65901"},
            56000: {price: "0.6592", eos: "56000", percent: "84.7726", zhizi: "571191.9391", alleos: "66001"},
            56100: {price: "0.6612", eos: "56100", percent: "84.7951", zhizi: "571343.6356", alleos: "66101"},
            56200: {price: "0.6632", eos: "56200", percent: "84.8176", zhizi: "571494.8724", alleos: "66201"},
            56300: {price: "0.6652", eos: "56300", percent: "84.8400", zhizi: "571645.6517", alleos: "66301"},
            56400: {price: "0.6672", eos: "56400", percent: "84.8623", zhizi: "571795.9754", alleos: "66401"},
            56500: {price: "0.6693", eos: "56500", percent: "84.8845", zhizi: "571945.8457", alleos: "66501"},
            56600: {price: "0.6713", eos: "56600", percent: "84.9067", zhizi: "572095.2645", alleos: "66601"},
            56700: {price: "0.6733", eos: "56700", percent: "84.9288", zhizi: "572244.2340", alleos: "66701"},
            56800: {price: "0.6753", eos: "56800", percent: "84.9508", zhizi: "572392.7561", alleos: "66801"},
            56900: {price: "0.6774", eos: "56900", percent: "84.9728", zhizi: "572540.8329", alleos: "66901"},
            57000: {price: "0.6794", eos: "57000", percent: "84.9947", zhizi: "572688.4663", alleos: "67001"},
            57100: {price: "0.6814", eos: "57100", percent: "85.0166", zhizi: "572835.6584", alleos: "67101"},
            57200: {price: "0.6835", eos: "57200", percent: "85.0383", zhizi: "572982.4111", alleos: "67201"},
            57300: {price: "0.6855", eos: "57300", percent: "85.0601", zhizi: "573128.7264", alleos: "67301"},
            57400: {price: "0.6875", eos: "57400", percent: "85.0817", zhizi: "573274.6062", alleos: "67401"},
            57500: {price: "0.6896", eos: "57500", percent: "85.1033", zhizi: "573420.0525", alleos: "67501"},
            57600: {price: "0.6916", eos: "57600", percent: "85.1248", zhizi: "573565.0673", alleos: "67601"},
            57700: {price: "0.6937", eos: "57700", percent: "85.1463", zhizi: "573709.6523", alleos: "67701"},
            57800: {price: "0.6957", eos: "57800", percent: "85.1677", zhizi: "573853.8096", alleos: "67801"},
            57900: {price: "0.6978", eos: "57900", percent: "85.1890", zhizi: "573997.5411", alleos: "67901"},
            58000: {price: "0.6999", eos: "58000", percent: "85.2103", zhizi: "574140.8485", alleos: "68001"},
            58100: {price: "0.7019", eos: "58100", percent: "85.2315", zhizi: "574283.7338", alleos: "68101"},
            58200: {price: "0.7040", eos: "58200", percent: "85.2526", zhizi: "574426.1989", alleos: "68201"},
            58300: {price: "0.7061", eos: "58300", percent: "85.2737", zhizi: "574568.2456", alleos: "68301"},
            58400: {price: "0.7081", eos: "58400", percent: "85.2947", zhizi: "574709.8758", alleos: "68401"},
            58500: {price: "0.7102", eos: "58500", percent: "85.3157", zhizi: "574851.0912", alleos: "68501"},
            58600: {price: "0.7123", eos: "58600", percent: "85.3366", zhizi: "574991.8937", alleos: "68601"},
            58700: {price: "0.7144", eos: "58700", percent: "85.3574", zhizi: "575132.2851", alleos: "68701"},
            58800: {price: "0.7165", eos: "58800", percent: "85.3782", zhizi: "575272.2672", alleos: "68801"},
            58900: {price: "0.7186", eos: "58900", percent: "85.3989", zhizi: "575411.8418", alleos: "68901"},
            59000: {price: "0.7206", eos: "59000", percent: "85.4196", zhizi: "575551.0106", alleos: "69001"},
            59100: {price: "0.7227", eos: "59100", percent: "85.4402", zhizi: "575689.7755", alleos: "69101"},
            59200: {price: "0.7248", eos: "59200", percent: "85.4607", zhizi: "575828.1382", alleos: "69201"},
            59300: {price: "0.7269", eos: "59300", percent: "85.4812", zhizi: "575966.1004", alleos: "69301"},
            59400: {price: "0.7290", eos: "59400", percent: "85.5016", zhizi: "576103.6639", alleos: "69401"},
            59500: {price: "0.7311", eos: "59500", percent: "85.5219", zhizi: "576240.8303", alleos: "69501"},
            59600: {price: "0.7333", eos: "59600", percent: "85.5422", zhizi: "576377.6015", alleos: "69601"},
            59700: {price: "0.7354", eos: "59700", percent: "85.5625", zhizi: "576513.9791", alleos: "69701"},
            59800: {price: "0.7375", eos: "59800", percent: "85.5827", zhizi: "576649.9648", alleos: "69801"},
            59900: {price: "0.7396", eos: "59900", percent: "85.6028", zhizi: "576785.5603", alleos: "69901"},
            60000: {price: "0.7417", eos: "60000", percent: "85.6228", zhizi: "576920.7673", alleos: "70001"},
            60100: {price: "0.7439", eos: "60100", percent: "85.6429", zhizi: "577055.5874", alleos: "70101"},
            60200: {price: "0.7460", eos: "60200", percent: "85.6628", zhizi: "577190.0224", alleos: "70201"},
            60300: {price: "0.7481", eos: "60300", percent: "85.6827", zhizi: "577324.0738", alleos: "70301"},
            60400: {price: "0.7502", eos: "60400", percent: "85.7025", zhizi: "577457.7432", alleos: "70401"},
            60500: {price: "0.7524", eos: "60500", percent: "85.7223", zhizi: "577591.0324", alleos: "70501"},
            60600: {price: "0.7545", eos: "60600", percent: "85.7421", zhizi: "577723.9430", alleos: "70601"},
            60700: {price: "0.7567", eos: "60700", percent: "85.7617", zhizi: "577856.4765", alleos: "70701"},
            60800: {price: "0.7588", eos: "60800", percent: "85.7813", zhizi: "577988.6345", alleos: "70801"},
            60900: {price: "0.7610", eos: "60900", percent: "85.8009", zhizi: "578120.4187", alleos: "70901"},
            61000: {price: "0.7631", eos: "61000", percent: "85.8204", zhizi: "578251.8306", alleos: "71001"},
            61100: {price: "0.7653", eos: "61100", percent: "85.8398", zhizi: "578382.8718", alleos: "71101"},
            61200: {price: "0.7674", eos: "61200", percent: "85.8592", zhizi: "578513.5439", alleos: "71201"},
            61300: {price: "0.7696", eos: "61300", percent: "85.8786", zhizi: "578643.8485", alleos: "71301"},
            61400: {price: "0.7718", eos: "61400", percent: "85.8979", zhizi: "578773.7870", alleos: "71401"},
            61500: {price: "0.7739", eos: "61500", percent: "85.9171", zhizi: "578903.3610", alleos: "71501"},
            61600: {price: "0.7761", eos: "61600", percent: "85.9363", zhizi: "579032.5721", alleos: "71601"},
            61700: {price: "0.7783", eos: "61700", percent: "85.9554", zhizi: "579161.4217", alleos: "71701"},
            61800: {price: "0.7804", eos: "61800", percent: "85.9745", zhizi: "579289.9115", alleos: "71801"},
            61900: {price: "0.7826", eos: "61900", percent: "85.9935", zhizi: "579418.0428", alleos: "71901"},
            62000: {price: "0.7848", eos: "62000", percent: "86.0124", zhizi: "579545.8172", alleos: "72001"},
            62100: {price: "0.7870", eos: "62100", percent: "86.0314", zhizi: "579673.2362", alleos: "72101"},
            62200: {price: "0.7892", eos: "62200", percent: "86.0502", zhizi: "579800.3013", alleos: "72201"},
            62300: {price: "0.7914", eos: "62300", percent: "86.0690", zhizi: "579927.0139", alleos: "72301"},
            62400: {price: "0.7936", eos: "62400", percent: "86.0878", zhizi: "580053.3755", alleos: "72401"},
            62500: {price: "0.7958", eos: "62500", percent: "86.1065", zhizi: "580179.3875", alleos: "72501"},
            62600: {price: "0.7980", eos: "62600", percent: "86.1251", zhizi: "580305.0515", alleos: "72601"},
            62700: {price: "0.8002", eos: "62700", percent: "86.1437", zhizi: "580430.3688", alleos: "72701"},
            62800: {price: "0.8024", eos: "62800", percent: "86.1623", zhizi: "580555.3409", alleos: "72801"},
            62900: {price: "0.8046", eos: "62900", percent: "86.1808", zhizi: "580679.9691", alleos: "72901"},
            63000: {price: "0.8068", eos: "63000", percent: "86.1992", zhizi: "580804.2550", alleos: "73001"},
            63100: {price: "0.8090", eos: "63100", percent: "86.2176", zhizi: "580928.2000", alleos: "73101"},
            63200: {price: "0.8112", eos: "63200", percent: "86.2360", zhizi: "581051.8053", alleos: "73201"},
            63300: {price: "0.8135", eos: "63300", percent: "86.2542", zhizi: "581175.0725", alleos: "73301"},
            63400: {price: "0.8157", eos: "63400", percent: "86.2725", zhizi: "581298.0029", alleos: "73401"},
            63500: {price: "0.8179", eos: "63500", percent: "86.2907", zhizi: "581420.5978", alleos: "73501"},
            63600: {price: "0.8202", eos: "63600", percent: "86.3088", zhizi: "581542.8587", alleos: "73601"},
            63700: {price: "0.8224", eos: "63700", percent: "86.3269", zhizi: "581664.7870", alleos: "73701"},
            63800: {price: "0.8246", eos: "63800", percent: "86.3450", zhizi: "581786.3839", alleos: "73801"},
            63900: {price: "0.8269", eos: "63900", percent: "86.3630", zhizi: "581907.6508", alleos: "73901"},
            64000: {price: "0.8291", eos: "64000", percent: "86.3809", zhizi: "582028.5891", alleos: "74001"},
            64100: {price: "0.8314", eos: "64100", percent: "86.3988", zhizi: "582149.2001", alleos: "74101"},
            64200: {price: "0.8336", eos: "64200", percent: "86.4167", zhizi: "582269.4852", alleos: "74201"},
            64300: {price: "0.8359", eos: "64300", percent: "86.4345", zhizi: "582389.4455", alleos: "74301"},
            64400: {price: "0.8381", eos: "64400", percent: "86.4522", zhizi: "582509.0826", alleos: "74401"},
            64500: {price: "0.8404", eos: "64500", percent: "86.4699", zhizi: "582628.3976", alleos: "74501"},
            64600: {price: "0.8426", eos: "64600", percent: "86.4876", zhizi: "582747.3918", alleos: "74601"},
            64700: {price: "0.8449", eos: "64700", percent: "86.5052", zhizi: "582866.0667", alleos: "74701"},
            64800: {price: "0.8472", eos: "64800", percent: "86.5228", zhizi: "582984.4233", alleos: "74801"},
            64900: {price: "0.8494", eos: "64900", percent: "86.5403", zhizi: "583102.4631", alleos: "74901"},
            65000: {price: "0.8517", eos: "65000", percent: "86.5578", zhizi: "583220.1873", alleos: "75001"},
            65100: {price: "0.8540", eos: "65100", percent: "86.5752", zhizi: "583337.5971", alleos: "75101"},
            65200: {price: "0.8563", eos: "65200", percent: "86.5926", zhizi: "583454.6938", alleos: "75201"},
            65300: {price: "0.8586", eos: "65300", percent: "86.6099", zhizi: "583571.4787", alleos: "75301"},
            65400: {price: "0.8608", eos: "65400", percent: "86.6272", zhizi: "583687.9530", alleos: "75401"},
            65500: {price: "0.8631", eos: "65500", percent: "86.6444", zhizi: "583804.1179", alleos: "75501"},
            65600: {price: "0.8654", eos: "65600", percent: "86.6616", zhizi: "583919.9747", alleos: "75601"},
            65700: {price: "0.8677", eos: "65700", percent: "86.6788", zhizi: "584035.5246", alleos: "75701"},
            65800: {price: "0.8700", eos: "65800", percent: "86.6959", zhizi: "584150.7688", alleos: "75801"},
            65900: {price: "0.8723", eos: "65900", percent: "86.7129", zhizi: "584265.7086", alleos: "75901"},
            66000: {price: "0.8746", eos: "66000", percent: "86.7300", zhizi: "584380.3451", alleos: "76001"},
            66100: {price: "0.8769", eos: "66100", percent: "86.7469", zhizi: "584494.6795", alleos: "76101"},
            66200: {price: "0.8792", eos: "66200", percent: "86.7638", zhizi: "584608.7130", alleos: "76201"},
            66300: {price: "0.8816", eos: "66300", percent: "86.7807", zhizi: "584722.4468", alleos: "76301"},
            66400: {price: "0.8839", eos: "66400", percent: "86.7976", zhizi: "584835.8822", alleos: "76401"},
            66500: {price: "0.8862", eos: "66500", percent: "86.8144", zhizi: "584949.0201", alleos: "76501"},
            66600: {price: "0.8885", eos: "66600", percent: "86.8311", zhizi: "585061.8620", alleos: "76601"},
            66700: {price: "0.8908", eos: "66700", percent: "86.8478", zhizi: "585174.4088", alleos: "76701"},
            66800: {price: "0.8932", eos: "66800", percent: "86.8645", zhizi: "585286.6617", alleos: "76801"},
            66900: {price: "0.8955", eos: "66900", percent: "86.8811", zhizi: "585398.6220", alleos: "76901"},
            67000: {price: "0.8978", eos: "67000", percent: "86.8977", zhizi: "585510.2907", alleos: "77001"},
            67100: {price: "0.9002", eos: "67100", percent: "86.9142", zhizi: "585621.6689", alleos: "77101"},
            67200: {price: "0.9025", eos: "67200", percent: "86.9307", zhizi: "585732.7579", alleos: "77201"},
            67300: {price: "0.9049", eos: "67300", percent: "86.9471", zhizi: "585843.5587", alleos: "77301"},
            67400: {price: "0.9072", eos: "67400", percent: "86.9635", zhizi: "585954.0725", alleos: "77401"},
            67500: {price: "0.9096", eos: "67500", percent: "86.9799", zhizi: "586064.3003", alleos: "77501"},
            67600: {price: "0.9119", eos: "67600", percent: "86.9962", zhizi: "586174.2433", alleos: "77601"},
            67700: {price: "0.9143", eos: "67700", percent: "87.0125", zhizi: "586283.9026", alleos: "77701"},
            67800: {price: "0.9166", eos: "67800", percent: "87.0287", zhizi: "586393.2792", alleos: "77801"},
            67900: {price: "0.9190", eos: "67900", percent: "87.0449", zhizi: "586502.3744", alleos: "77901"},
            68000: {price: "0.9214", eos: "68000", percent: "87.0610", zhizi: "586611.1890", alleos: "78001"},
            68100: {price: "0.9237", eos: "68100", percent: "87.0771", zhizi: "586719.7243", alleos: "78101"},
            68200: {price: "0.9261", eos: "68200", percent: "87.0932", zhizi: "586827.9814", alleos: "78201"},
            68300: {price: "0.9285", eos: "68300", percent: "87.1092", zhizi: "586935.9612", alleos: "78301"},
            68400: {price: "0.9309", eos: "68400", percent: "87.1252", zhizi: "587043.6648", alleos: "78401"},
            68500: {price: "0.9332", eos: "68500", percent: "87.1412", zhizi: "587151.0933", alleos: "78501"},
            68600: {price: "0.9356", eos: "68600", percent: "87.1571", zhizi: "587258.2478", alleos: "78601"},
            68700: {price: "0.9380", eos: "68700", percent: "87.1729", zhizi: "587365.1293", alleos: "78701"},
            68800: {price: "0.9404", eos: "68800", percent: "87.1888", zhizi: "587471.7388", alleos: "78801"},
            68900: {price: "0.9428", eos: "68900", percent: "87.2045", zhizi: "587578.0774", alleos: "78901"},
            69000: {price: "0.9452", eos: "69000", percent: "87.2203", zhizi: "587684.1461", alleos: "79001"},
            69100: {price: "0.9476", eos: "69100", percent: "87.2360", zhizi: "587789.9459", alleos: "79101"},
            69200: {price: "0.9500", eos: "69200", percent: "87.2516", zhizi: "587895.4779", alleos: "79201"},
            69300: {price: "0.9524", eos: "69300", percent: "87.2673", zhizi: "588000.7430", alleos: "79301"},
            69400: {price: "0.9548", eos: "69400", percent: "87.2829", zhizi: "588105.7424", alleos: "79401"},
            69500: {price: "0.9572", eos: "69500", percent: "87.2984", zhizi: "588210.4769", alleos: "79501"},
            69600: {price: "0.9596", eos: "69600", percent: "87.3139", zhizi: "588314.9476", alleos: "79601"},
            69700: {price: "0.9620", eos: "69700", percent: "87.3294", zhizi: "588419.1555", alleos: "79701"},
            69800: {price: "0.9645", eos: "69800", percent: "87.3448", zhizi: "588523.1015", alleos: "79801"},
            69900: {price: "0.9669", eos: "69900", percent: "87.3602", zhizi: "588626.7868", alleos: "79901"},
            70000: {price: "0.9693", eos: "70000", percent: "87.3755", zhizi: "588730.2121", alleos: "80001"},
            70100: {price: "0.9717", eos: "70100", percent: "87.3908", zhizi: "588833.3786", alleos: "80101"},
            70200: {price: "0.9742", eos: "70200", percent: "87.4061", zhizi: "588936.2872", alleos: "80201"},
            70300: {price: "0.9766", eos: "70300", percent: "87.4214", zhizi: "589038.9388", alleos: "80301"},
            70400: {price: "0.9790", eos: "70400", percent: "87.4365", zhizi: "589141.3344", alleos: "80401"},
            70500: {price: "0.9815", eos: "70500", percent: "87.4517", zhizi: "589243.4750", alleos: "80501"},
            70600: {price: "0.9839", eos: "70600", percent: "87.4668", zhizi: "589345.3615", alleos: "80601"},
            70700: {price: "0.9864", eos: "70700", percent: "87.4819", zhizi: "589446.9949", alleos: "80701"},
            70800: {price: "0.9888", eos: "70800", percent: "87.4970", zhizi: "589548.3761", alleos: "80801"},
            70900: {price: "0.9913", eos: "70900", percent: "87.5120", zhizi: "589649.5060", alleos: "80901"},
            71000: {price: "0.9937", eos: "71000", percent: "87.5269", zhizi: "589750.3857", alleos: "81001"},
            71100: {price: "0.9962", eos: "71100", percent: "87.5419", zhizi: "589851.0159", alleos: "81101"},
            71200: {price: "0.9987", eos: "71200", percent: "87.5568", zhizi: "589951.3977", alleos: "81201"},
            71300: {price: "1.0011", eos: "71300", percent: "87.5716", zhizi: "590051.5319", alleos: "81301"},
            71400: {price: "1.0036", eos: "71400", percent: "87.5865", zhizi: "590151.4195", alleos: "81401"},
            71500: {price: "1.0061", eos: "71500", percent: "87.6012", zhizi: "590251.0613", alleos: "81501"},
            71600: {price: "1.0085", eos: "71600", percent: "87.6160", zhizi: "590350.4584", alleos: "81601"},
            71700: {price: "1.0110", eos: "71700", percent: "87.6307", zhizi: "590449.6115", alleos: "81701"},
            71800: {price: "1.0135", eos: "71800", percent: "87.6454", zhizi: "590548.5216", alleos: "81801"},
            71900: {price: "1.0160", eos: "71900", percent: "87.6600", zhizi: "590647.1895", alleos: "81901"},
            72000: {price: "1.0185", eos: "72000", percent: "87.6746", zhizi: "590745.6163", alleos: "82001"},
            72100: {price: "1.0210", eos: "72100", percent: "87.6892", zhizi: "590843.8027", alleos: "82101"},
            72200: {price: "1.0235", eos: "72200", percent: "87.7038", zhizi: "590941.7496", alleos: "82201"},
            72300: {price: "1.0260", eos: "72300", percent: "87.7183", zhizi: "591039.4579", alleos: "82301"},
            72400: {price: "1.0284", eos: "72400", percent: "87.7327", zhizi: "591136.9284", alleos: "82401"},
            72500: {price: "1.0310", eos: "72500", percent: "87.7472", zhizi: "591234.1621", alleos: "82501"},
            72600: {price: "1.0335", eos: "72600", percent: "87.7615", zhizi: "591331.1598", alleos: "82601"},
            72700: {price: "1.0360", eos: "72700", percent: "87.7759", zhizi: "591427.9224", alleos: "82701"},
            72800: {price: "1.0385", eos: "72800", percent: "87.7902", zhizi: "591524.4506", alleos: "82801"},
            72900: {price: "1.0410", eos: "72900", percent: "87.8045", zhizi: "591620.7455", alleos: "82901"},
            73000: {price: "1.0435", eos: "73000", percent: "87.8188", zhizi: "591716.8077", alleos: "83001"},
            73100: {price: "1.0460", eos: "73100", percent: "87.8330", zhizi: "591812.6382", alleos: "83101"},
            73200: {price: "1.0486", eos: "73200", percent: "87.8472", zhizi: "591908.2377", alleos: "83201"},
            73300: {price: "1.0511", eos: "73300", percent: "87.8613", zhizi: "592003.6072", alleos: "83301"},
            73400: {price: "1.0536", eos: "73400", percent: "87.8755", zhizi: "592098.7474", alleos: "83401"},
            73500: {price: "1.0561", eos: "73500", percent: "87.8896", zhizi: "592193.6592", alleos: "83501"},
            73600: {price: "1.0587", eos: "73600", percent: "87.9036", zhizi: "592288.3434", alleos: "83601"},
            73700: {price: "1.0612", eos: "73700", percent: "87.9176", zhizi: "592382.8009", alleos: "83701"},
            73800: {price: "1.0638", eos: "73800", percent: "87.9316", zhizi: "592477.0323", alleos: "83801"},
            73900: {price: "1.0663", eos: "73900", percent: "87.9456", zhizi: "592571.0386", alleos: "83901"},
            74000: {price: "1.0689", eos: "74000", percent: "87.9595", zhizi: "592664.8205", alleos: "84001"},
            74100: {price: "1.0714", eos: "74100", percent: "87.9734", zhizi: "592758.3789", alleos: "84101"},
            74200: {price: "1.0740", eos: "74200", percent: "87.9872", zhizi: "592851.7145", alleos: "84201"},
            74300: {price: "1.0765", eos: "74300", percent: "88.0010", zhizi: "592944.8281", alleos: "84301"},
            74400: {price: "1.0791", eos: "74400", percent: "88.0148", zhizi: "593037.7206", alleos: "84401"},
            74500: {price: "1.0816", eos: "74500", percent: "88.0286", zhizi: "593130.3927", alleos: "84501"},
            74600: {price: "1.0842", eos: "74600", percent: "88.0423", zhizi: "593222.8452", alleos: "84601"},
            74700: {price: "1.0868", eos: "74700", percent: "88.0560", zhizi: "593315.0788", alleos: "84701"},
            74800: {price: "1.0893", eos: "74800", percent: "88.0696", zhizi: "593407.0945", alleos: "84801"},
            74900: {price: "1.0919", eos: "74900", percent: "88.0833", zhizi: "593498.8928", alleos: "84901"},
            75000: {price: "1.0945", eos: "75000", percent: "88.0969", zhizi: "593590.4747", alleos: "85001"},
            75100: {price: "1.0971", eos: "75100", percent: "88.1104", zhizi: "593681.8408", alleos: "85101"},
            75200: {price: "1.0997", eos: "75200", percent: "88.1239", zhizi: "593772.9919", alleos: "85201"},
            75300: {price: "1.1023", eos: "75300", percent: "88.1374", zhizi: "593863.9288", alleos: "85301"},
            75400: {price: "1.1048", eos: "75400", percent: "88.1509", zhizi: "593954.6523", alleos: "85401"},
            75500: {price: "1.1074", eos: "75500", percent: "88.1643", zhizi: "594045.1630", alleos: "85501"},
            75600: {price: "1.1100", eos: "75600", percent: "88.1777", zhizi: "594135.4618", alleos: "85601"},
            75700: {price: "1.1126", eos: "75700", percent: "88.1911", zhizi: "594225.5493", alleos: "85701"},
            75800: {price: "1.1152", eos: "75800", percent: "88.2045", zhizi: "594315.4264", alleos: "85801"},
            75900: {price: "1.1178", eos: "75900", percent: "88.2178", zhizi: "594405.0937", alleos: "85901"},
            76000: {price: "1.1204", eos: "76000", percent: "88.2310", zhizi: "594494.5520", alleos: "86001"},
            76100: {price: "1.1231", eos: "76100", percent: "88.2443", zhizi: "594583.8020", alleos: "86101"},
            76200: {price: "1.1257", eos: "76200", percent: "88.2575", zhizi: "594672.8445", alleos: "86201"},
            76300: {price: "1.1283", eos: "76300", percent: "88.2707", zhizi: "594761.6801", alleos: "86301"},
            76400: {price: "1.1309", eos: "76400", percent: "88.2838", zhizi: "594850.3096", alleos: "86401"},
            76500: {price: "1.1335", eos: "76500", percent: "88.2970", zhizi: "594938.7337", alleos: "86501"},
            76600: {price: "1.1362", eos: "76600", percent: "88.3101", zhizi: "595026.9531", alleos: "86601"},
            76700: {price: "1.1388", eos: "76700", percent: "88.3231", zhizi: "595114.9686", alleos: "86701"},
            76800: {price: "1.1414", eos: "76800", percent: "88.3361", zhizi: "595202.7808", alleos: "86801"},
            76900: {price: "1.1441", eos: "76900", percent: "88.3492", zhizi: "595290.3904", alleos: "86901"},
            77000: {price: "1.1467", eos: "77000", percent: "88.3621", zhizi: "595377.7982", alleos: "87001"},
            77100: {price: "1.1493", eos: "77100", percent: "88.3751", zhizi: "595465.0048", alleos: "87101"},
            77200: {price: "1.1520", eos: "77200", percent: "88.3880", zhizi: "595552.0109", alleos: "87201"},
            77300: {price: "1.1546", eos: "77300", percent: "88.4009", zhizi: "595638.8172", alleos: "87301"},
            77400: {price: "1.1573", eos: "77400", percent: "88.4137", zhizi: "595725.4245", alleos: "87401"},
            77500: {price: "1.1599", eos: "77500", percent: "88.4265", zhizi: "595811.8333", alleos: "87501"},
            77600: {price: "1.1626", eos: "77600", percent: "88.4393", zhizi: "595898.0444", alleos: "87601"},
            77700: {price: "1.1653", eos: "77700", percent: "88.4521", zhizi: "595984.0585", alleos: "87701"},
            77800: {price: "1.1679", eos: "77800", percent: "88.4648", zhizi: "596069.8761", alleos: "87801"},
            77900: {price: "1.1706", eos: "77900", percent: "88.4775", zhizi: "596155.4981", alleos: "87901"},
            78000: {price: "1.1733", eos: "78000", percent: "88.4902", zhizi: "596240.9250", alleos: "88001"},
            78100: {price: "1.1759", eos: "78100", percent: "88.5029", zhizi: "596326.1576", alleos: "88101"},
            78200: {price: "1.1786", eos: "78200", percent: "88.5155", zhizi: "596411.1964", alleos: "88201"},
            78300: {price: "1.1813", eos: "78300", percent: "88.5281", zhizi: "596496.0422", alleos: "88301"},
            78400: {price: "1.1840", eos: "78400", percent: "88.5406", zhizi: "596580.6956", alleos: "88401"},
            78500: {price: "1.1867", eos: "78500", percent: "88.5532", zhizi: "596665.1573", alleos: "88501"},
            78600: {price: "1.1893", eos: "78600", percent: "88.5657", zhizi: "596749.4279", alleos: "88601"},
            78700: {price: "1.1920", eos: "78700", percent: "88.5782", zhizi: "596833.5080", alleos: "88701"},
            78800: {price: "1.1947", eos: "78800", percent: "88.5906", zhizi: "596917.3983", alleos: "88801"},
            78900: {price: "1.1974", eos: "78900", percent: "88.6030", zhizi: "597001.0995", alleos: "88901"},
            79000: {price: "1.2001", eos: "79000", percent: "88.6154", zhizi: "597084.6122", alleos: "89001"},
            79100: {price: "1.2028", eos: "79100", percent: "88.6278", zhizi: "597167.9370", alleos: "89101"},
            79200: {price: "1.2055", eos: "79200", percent: "88.6401", zhizi: "597251.0746", alleos: "89201"},
            79300: {price: "1.2082", eos: "79300", percent: "88.6525", zhizi: "597334.0255", alleos: "89301"},
            79400: {price: "1.2110", eos: "79400", percent: "88.6647", zhizi: "597416.7904", alleos: "89401"},
            79500: {price: "1.2137", eos: "79500", percent: "88.6770", zhizi: "597499.3700", alleos: "89501"},
            79600: {price: "1.2164", eos: "79600", percent: "88.6892", zhizi: "597581.7649", alleos: "89601"},
            79700: {price: "1.2191", eos: "79700", percent: "88.7014", zhizi: "597663.9756", alleos: "89701"},
            79800: {price: "1.2218", eos: "79800", percent: "88.7136", zhizi: "597746.0028", alleos: "89801"},
            79900: {price: "1.2246", eos: "79900", percent: "88.7257", zhizi: "597827.8471", alleos: "89901"},
            80000: {price: "1.2273", eos: "80000", percent: "88.7379", zhizi: "597909.5092", alleos: "90001"},
            80100: {price: "1.2300", eos: "80100", percent: "88.7500", zhizi: "597990.9896", alleos: "90101"},
            80200: {price: "1.2328", eos: "80200", percent: "88.7620", zhizi: "598072.2889", alleos: "90201"},
            80300: {price: "1.2355", eos: "80300", percent: "88.7741", zhizi: "598153.4077", alleos: "90301"},
            80400: {price: "1.2382", eos: "80400", percent: "88.7861", zhizi: "598234.3467", alleos: "90401"},
            80500: {price: "1.2410", eos: "80500", percent: "88.7981", zhizi: "598315.1064", alleos: "90501"},
            80600: {price: "1.2437", eos: "80600", percent: "88.8100", zhizi: "598395.6875", alleos: "90601"},
            80700: {price: "1.2465", eos: "80700", percent: "88.8220", zhizi: "598476.0904", alleos: "90701"},
            80800: {price: "1.2492", eos: "80800", percent: "88.8339", zhizi: "598556.3159", alleos: "90801"},
            80900: {price: "1.2520", eos: "80900", percent: "88.8457", zhizi: "598636.3645", alleos: "90901"},
            81000: {price: "1.2548", eos: "81000", percent: "88.8576", zhizi: "598716.2367", alleos: "91001"},
            81100: {price: "1.2575", eos: "81100", percent: "88.8694", zhizi: "598795.9333", alleos: "91101"},
            81200: {price: "1.2603", eos: "81200", percent: "88.8812", zhizi: "598875.4546", alleos: "91201"},
            81300: {price: "1.2631", eos: "81300", percent: "88.8930", zhizi: "598954.8014", alleos: "91301"},
            81400: {price: "1.2658", eos: "81400", percent: "88.9047", zhizi: "599033.9742", alleos: "91401"},
            81500: {price: "1.2686", eos: "81500", percent: "88.9165", zhizi: "599112.9736", alleos: "91501"},
            81600: {price: "1.2714", eos: "81600", percent: "88.9282", zhizi: "599191.8001", alleos: "91601"},
            81700: {price: "1.2742", eos: "81700", percent: "88.9398", zhizi: "599270.4543", alleos: "91701"},
            81800: {price: "1.2770", eos: "81800", percent: "88.9515", zhizi: "599348.9367", alleos: "91801"},
            81900: {price: "1.2797", eos: "81900", percent: "88.9631", zhizi: "599427.2480", alleos: "91901"},
            82000: {price: "1.2825", eos: "82000", percent: "88.9747", zhizi: "599505.3887", alleos: "92001"},
            82100: {price: "1.2853", eos: "82100", percent: "88.9863", zhizi: "599583.3593", alleos: "92101"},
            82200: {price: "1.2881", eos: "82200", percent: "88.9978", zhizi: "599661.1604", alleos: "92201"},
            82300: {price: "1.2909", eos: "82300", percent: "89.0094", zhizi: "599738.7926", alleos: "92301"},
            82400: {price: "1.2937", eos: "82400", percent: "89.0209", zhizi: "599816.2564", alleos: "92401"},
            82500: {price: "1.2965", eos: "82500", percent: "89.0323", zhizi: "599893.5523", alleos: "92501"},
            82600: {price: "1.2993", eos: "82600", percent: "89.0438", zhizi: "599970.6809", alleos: "92601"},
            82700: {price: "1.3022", eos: "82700", percent: "89.0552", zhizi: "600047.6428", alleos: "92701"},
            82800: {price: "1.3050", eos: "82800", percent: "89.0666", zhizi: "600124.4384", alleos: "92801"},
            82900: {price: "1.3078", eos: "82900", percent: "89.0780", zhizi: "600201.0683", alleos: "92901"},
            83000: {price: "1.3106", eos: "83000", percent: "89.0893", zhizi: "600277.5331", alleos: "93001"},
            83100: {price: "1.3134", eos: "83100", percent: "89.1006", zhizi: "600353.8333", alleos: "93101"},
            83200: {price: "1.3163", eos: "83200", percent: "89.1119", zhizi: "600429.9694", alleos: "93201"},
            83300: {price: "1.3191", eos: "83300", percent: "89.1232", zhizi: "600505.9420", alleos: "93301"},
            83400: {price: "1.3219", eos: "83400", percent: "89.1345", zhizi: "600581.7515", alleos: "93401"},
            83500: {price: "1.3248", eos: "83500", percent: "89.1457", zhizi: "600657.3985", alleos: "93501"},
            83600: {price: "1.3276", eos: "83600", percent: "89.1569", zhizi: "600732.8835", alleos: "93601"},
            83700: {price: "1.3304", eos: "83700", percent: "89.1681", zhizi: "600808.2071", alleos: "93701"},
            83800: {price: "1.3333", eos: "83800", percent: "89.1792", zhizi: "600883.3697", alleos: "93801"},
            83900: {price: "1.3361", eos: "83900", percent: "89.1904", zhizi: "600958.3718", alleos: "93901"},
            84000: {price: "1.3390", eos: "84000", percent: "89.2015", zhizi: "601033.2141", alleos: "94001"},
            84100: {price: "1.3419", eos: "84100", percent: "89.2125", zhizi: "601107.8970", alleos: "94101"},
            84200: {price: "1.3447", eos: "84200", percent: "89.2236", zhizi: "601182.4209", alleos: "94201"},
            84300: {price: "1.3476", eos: "84300", percent: "89.2346", zhizi: "601256.7865", alleos: "94301"},
            84400: {price: "1.3504", eos: "84400", percent: "89.2457", zhizi: "601330.9941", alleos: "94401"},
            84500: {price: "1.3533", eos: "84500", percent: "89.2566", zhizi: "601405.0444", alleos: "94501"},
            84600: {price: "1.3562", eos: "84600", percent: "89.2676", zhizi: "601478.9378", alleos: "94601"},
            84700: {price: "1.3590", eos: "84700", percent: "89.2786", zhizi: "601552.6749", alleos: "94701"},
            84800: {price: "1.3619", eos: "84800", percent: "89.2895", zhizi: "601626.2560", alleos: "94801"},
            84900: {price: "1.3648", eos: "84900", percent: "89.3004", zhizi: "601699.6817", alleos: "94901"},
            85000: {price: "1.3677", eos: "85000", percent: "89.3113", zhizi: "601772.9525", alleos: "95001"},
            85100: {price: "1.3706", eos: "85100", percent: "89.3221", zhizi: "601846.0689", alleos: "95101"},
            85200: {price: "1.3735", eos: "85200", percent: "89.3329", zhizi: "601919.0314", alleos: "95201"},
            85300: {price: "1.3763", eos: "85300", percent: "89.3437", zhizi: "601991.8405", alleos: "95301"},
            85400: {price: "1.3792", eos: "85400", percent: "89.3545", zhizi: "602064.4965", alleos: "95401"},
            85500: {price: "1.3821", eos: "85500", percent: "89.3653", zhizi: "602137.0001", alleos: "95501"},
            85600: {price: "1.3850", eos: "85600", percent: "89.3760", zhizi: "602209.3517", alleos: "95601"},
            85700: {price: "1.3879", eos: "85700", percent: "89.3867", zhizi: "602281.5518", alleos: "95701"},
            85800: {price: "1.3909", eos: "85800", percent: "89.3974", zhizi: "602353.6009", alleos: "95801"},
            85900: {price: "1.3938", eos: "85900", percent: "89.4081", zhizi: "602425.4993", alleos: "95901"},
            86000: {price: "1.3967", eos: "86000", percent: "89.4187", zhizi: "602497.2477", alleos: "96001"},
            86100: {price: "1.3996", eos: "86100", percent: "89.4294", zhizi: "602568.8464", alleos: "96101"},
            86200: {price: "1.4025", eos: "86200", percent: "89.4400", zhizi: "602640.2960", alleos: "96201"},
            86300: {price: "1.4054", eos: "86300", percent: "89.4506", zhizi: "602711.5969", alleos: "96301"},
            86400: {price: "1.4084", eos: "86400", percent: "89.4611", zhizi: "602782.7495", alleos: "96401"},
            86500: {price: "1.4113", eos: "86500", percent: "89.4717", zhizi: "602853.7544", alleos: "96501"},
            86600: {price: "1.4142", eos: "86600", percent: "89.4822", zhizi: "602924.6119", alleos: "96601"},
            86700: {price: "1.4171", eos: "86700", percent: "89.4927", zhizi: "602995.3226", alleos: "96701"},
            86800: {price: "1.4201", eos: "86800", percent: "89.5031", zhizi: "603065.8869", alleos: "96801"},
            86900: {price: "1.4230", eos: "86900", percent: "89.5136", zhizi: "603136.3053", alleos: "96901"},
            87000: {price: "1.4260", eos: "87000", percent: "89.5240", zhizi: "603206.5782", alleos: "97001"},
            87100: {price: "1.4289", eos: "87100", percent: "89.5344", zhizi: "603276.7060", alleos: "97101"},
            87200: {price: "1.4319", eos: "87200", percent: "89.5448", zhizi: "603346.6892", alleos: "97201"},
            87300: {price: "1.4348", eos: "87300", percent: "89.5552", zhizi: "603416.5283", alleos: "97301"},
            87400: {price: "1.4378", eos: "87400", percent: "89.5655", zhizi: "603486.2237", alleos: "97401"},
            87500: {price: "1.4407", eos: "87500", percent: "89.5758", zhizi: "603555.7758", alleos: "97501"},
            87600: {price: "1.4437", eos: "87600", percent: "89.5861", zhizi: "603625.1852", alleos: "97601"},
            87700: {price: "1.4467", eos: "87700", percent: "89.5964", zhizi: "603694.4521", alleos: "97701"},
            87800: {price: "1.4496", eos: "87800", percent: "89.6067", zhizi: "603763.5771", alleos: "97801"},
            87900: {price: "1.4526", eos: "87900", percent: "89.6169", zhizi: "603832.5606", alleos: "97901"},
            88000: {price: "1.4556", eos: "88000", percent: "89.6271", zhizi: "603901.4030", alleos: "98001"},
            88100: {price: "1.4585", eos: "88100", percent: "89.6373", zhizi: "603970.1048", alleos: "98101"},
            88200: {price: "1.4615", eos: "88200", percent: "89.6475", zhizi: "604038.6664", alleos: "98201"},
            88300: {price: "1.4645", eos: "88300", percent: "89.6577", zhizi: "604107.0882", alleos: "98301"},
            88400: {price: "1.4675", eos: "88400", percent: "89.6678", zhizi: "604175.3706", alleos: "98401"},
            88500: {price: "1.4705", eos: "88500", percent: "89.6779", zhizi: "604243.5142", alleos: "98501"},
            88600: {price: "1.4735", eos: "88600", percent: "89.6880", zhizi: "604311.5192", alleos: "98601"},
            88700: {price: "1.4765", eos: "88700", percent: "89.6981", zhizi: "604379.3861", alleos: "98701"},
            88800: {price: "1.4795", eos: "88800", percent: "89.7081", zhizi: "604447.1154", alleos: "98801"},
            88900: {price: "1.4825", eos: "88900", percent: "89.7182", zhizi: "604514.7075", alleos: "98901"},
            89000: {price: "1.4855", eos: "89000", percent: "89.7282", zhizi: "604582.1627", alleos: "99001"},
            89100: {price: "1.4885", eos: "89100", percent: "89.7382", zhizi: "604649.4815", alleos: "99101"},
            89200: {price: "1.4915", eos: "89200", percent: "89.7481", zhizi: "604716.6643", alleos: "99201"},
            89300: {price: "1.4945", eos: "89300", percent: "89.7581", zhizi: "604783.7115", alleos: "99301"},
            89400: {price: "1.4975", eos: "89400", percent: "89.7680", zhizi: "604850.6236", alleos: "99401"},
            89500: {price: "1.5005", eos: "89500", percent: "89.7779", zhizi: "604917.4009", alleos: "99501"},
            89600: {price: "1.5036", eos: "89600", percent: "89.7878", zhizi: "604984.0438", alleos: "99601"},
            89700: {price: "1.5066", eos: "89700", percent: "89.7977", zhizi: "605050.5527", alleos: "99701"},
            89800: {price: "1.5096", eos: "89800", percent: "89.8075", zhizi: "605116.9282", alleos: "99801"},
            89900: {price: "1.5126", eos: "89900", percent: "89.8174", zhizi: "605183.1704", alleos: "99901"},
            90000: {price: "1.5157", eos: "90000", percent: "89.8272", zhizi: "605249.2800", alleos: "100001"},
            90100: {price: "1.5187", eos: "90100", percent: "89.8370", zhizi: "605315.2571", alleos: "100101"},
            90200: {price: "1.5218", eos: "90200", percent: "89.8467", zhizi: "605381.1023", alleos: "100201"},
            90300: {price: "1.5248", eos: "90300", percent: "89.8565", zhizi: "605446.8160", alleos: "100301"},
            90400: {price: "1.5278", eos: "90400", percent: "89.8662", zhizi: "605512.3985", alleos: "100401"},
            90500: {price: "1.5309", eos: "90500", percent: "89.8759", zhizi: "605577.8502", alleos: "100501"},
            90600: {price: "1.5339", eos: "90600", percent: "89.8856", zhizi: "605643.1716", alleos: "100601"},
            90700: {price: "1.5370", eos: "90700", percent: "89.8953", zhizi: "605708.3629", alleos: "100701"},
            90800: {price: "1.5401", eos: "90800", percent: "89.9050", zhizi: "605773.4247", alleos: "100801"},
            90900: {price: "1.5431", eos: "90900", percent: "89.9146", zhizi: "605838.3572", alleos: "100901"},
            91000: {price: "1.5462", eos: "91000", percent: "89.9242", zhizi: "605903.1609", alleos: "101001"},
            91100: {price: "1.5493", eos: "91100", percent: "89.9338", zhizi: "605967.8361", alleos: "101101"},
            91200: {price: "1.5523", eos: "91200", percent: "89.9434", zhizi: "606032.3833", alleos: "101201"},
            91300: {price: "1.5554", eos: "91300", percent: "89.9530", zhizi: "606096.8028", alleos: "101301"},
            91400: {price: "1.5585", eos: "91400", percent: "89.9625", zhizi: "606161.0950", alleos: "101401"},
            91500: {price: "1.5616", eos: "91500", percent: "89.9720", zhizi: "606225.2602", alleos: "101501"},
            91600: {price: "1.5646", eos: "91600", percent: "89.9815", zhizi: "606289.2989", alleos: "101601"},
            91700: {price: "1.5677", eos: "91700", percent: "89.9910", zhizi: "606353.2114", alleos: "101701"},
            91800: {price: "1.5708", eos: "91800", percent: "90.0005", zhizi: "606416.9981", alleos: "101801"},
            91900: {price: "1.5739", eos: "91900", percent: "90.0099", zhizi: "606480.6593", alleos: "101901"},
            92000: {price: "1.5770", eos: "92000", percent: "90.0194", zhizi: "606544.1955", alleos: "102001"},
            92100: {price: "1.5801", eos: "92100", percent: "90.0288", zhizi: "606607.6070", alleos: "102101"},
            92200: {price: "1.5832", eos: "92200", percent: "90.0382", zhizi: "606670.8941", alleos: "102201"},
            92300: {price: "1.5863", eos: "92300", percent: "90.0475", zhizi: "606734.0573", alleos: "102301"},
            92400: {price: "1.5894", eos: "92400", percent: "90.0569", zhizi: "606797.0969", alleos: "102401"},
            92500: {price: "1.5925", eos: "92500", percent: "90.0662", zhizi: "606860.0132", alleos: "102501"},
            92600: {price: "1.5956", eos: "92600", percent: "90.0756", zhizi: "606922.8066", alleos: "102601"},
            92700: {price: "1.5988", eos: "92700", percent: "90.0849", zhizi: "606985.4775", alleos: "102701"},
            92800: {price: "1.6019", eos: "92800", percent: "90.0941", zhizi: "607048.0263", alleos: "102801"},
            92900: {price: "1.6050", eos: "92900", percent: "90.1034", zhizi: "607110.4532", alleos: "102901"},
            93000: {price: "1.6081", eos: "93000", percent: "90.1127", zhizi: "607172.7587", alleos: "103001"},
            93100: {price: "1.6112", eos: "93100", percent: "90.1219", zhizi: "607234.9431", alleos: "103101"},
            93200: {price: "1.6144", eos: "93200", percent: "90.1311", zhizi: "607297.0068", alleos: "103201"},
            93300: {price: "1.6175", eos: "93300", percent: "90.1403", zhizi: "607358.9500", alleos: "103301"},
            93400: {price: "1.6207", eos: "93400", percent: "90.1495", zhizi: "607420.7732", alleos: "103401"},
            93500: {price: "1.6238", eos: "93500", percent: "90.1586", zhizi: "607482.4767", alleos: "103501"},
            93600: {price: "1.6269", eos: "93600", percent: "90.1678", zhizi: "607544.0609", alleos: "103601"},
            93700: {price: "1.6301", eos: "93700", percent: "90.1769", zhizi: "607605.5261", alleos: "103701"},
            93800: {price: "1.6332", eos: "93800", percent: "90.1860", zhizi: "607666.8726", alleos: "103801"},
            93900: {price: "1.6364", eos: "93900", percent: "90.1951", zhizi: "607728.1008", alleos: "103901"},
            94000: {price: "1.6395", eos: "94000", percent: "90.2041", zhizi: "607789.2110", alleos: "104001"},
            94100: {price: "1.6427", eos: "94100", percent: "90.2132", zhizi: "607850.2036", alleos: "104101"},
            94200: {price: "1.6459", eos: "94200", percent: "90.2222", zhizi: "607911.0789", alleos: "104201"},
            94300: {price: "1.6490", eos: "94300", percent: "90.2312", zhizi: "607971.8372", alleos: "104301"},
            94400: {price: "1.6522", eos: "94400", percent: "90.2402", zhizi: "608032.4789", alleos: "104401"},
            94500: {price: "1.6554", eos: "94500", percent: "90.2492", zhizi: "608093.0044", alleos: "104501"},
            94600: {price: "1.6585", eos: "94600", percent: "90.2582", zhizi: "608153.4138", alleos: "104601"},
            94700: {price: "1.6617", eos: "94700", percent: "90.2671", zhizi: "608213.7077", alleos: "104701"},
            94800: {price: "1.6649", eos: "94800", percent: "90.2761", zhizi: "608273.8863", alleos: "104801"},
            94900: {price: "1.6681", eos: "94900", percent: "90.2850", zhizi: "608333.9499", alleos: "104901"},
            95000: {price: "1.6713", eos: "95000", percent: "90.2939", zhizi: "608393.8990", alleos: "105001"},
            95100: {price: "1.6745", eos: "95100", percent: "90.3028", zhizi: "608453.7337", alleos: "105101"},
            95200: {price: "1.6777", eos: "95200", percent: "90.3116", zhizi: "608513.4544", alleos: "105201"},
            95300: {price: "1.6808", eos: "95300", percent: "90.3205", zhizi: "608573.0615", alleos: "105301"},
            95400: {price: "1.6840", eos: "95400", percent: "90.3293", zhizi: "608632.5553", alleos: "105401"},
            95500: {price: "1.6872", eos: "95500", percent: "90.3381", zhizi: "608691.9361", alleos: "105501"},
            95600: {price: "1.6905", eos: "95600", percent: "90.3469", zhizi: "608751.2042", alleos: "105601"},
            95700: {price: "1.6937", eos: "95700", percent: "90.3557", zhizi: "608810.3599", alleos: "105701"},
            95800: {price: "1.6969", eos: "95800", percent: "90.3645", zhizi: "608869.4037", alleos: "105801"},
            95900: {price: "1.7001", eos: "95900", percent: "90.3732", zhizi: "608928.3357", alleos: "105901"},
            96000: {price: "1.7033", eos: "96000", percent: "90.3819", zhizi: "608987.1562", alleos: "106001"},
            96100: {price: "1.7065", eos: "96100", percent: "90.3906", zhizi: "609045.8658", alleos: "106101"},
            96200: {price: "1.7097", eos: "96200", percent: "90.3993", zhizi: "609104.4645", alleos: "106201"},
            96300: {price: "1.7130", eos: "96300", percent: "90.4080", zhizi: "609162.9528", alleos: "106301"},
            96400: {price: "1.7162", eos: "96400", percent: "90.4167", zhizi: "609221.3309", alleos: "106401"},
            96500: {price: "1.7194", eos: "96500", percent: "90.4253", zhizi: "609279.5992", alleos: "106501"},
            96600: {price: "1.7227", eos: "96600", percent: "90.4340", zhizi: "609337.7580", alleos: "106601"},
            96700: {price: "1.7259", eos: "96700", percent: "90.4426", zhizi: "609395.8075", alleos: "106701"},
            96800: {price: "1.7291", eos: "96800", percent: "90.4512", zhizi: "609453.7481", alleos: "106801"},
            96900: {price: "1.7324", eos: "96900", percent: "90.4598", zhizi: "609511.5802", alleos: "106901"},
            97000: {price: "1.7356", eos: "97000", percent: "90.4683", zhizi: "609569.3039", alleos: "107001"},
            97100: {price: "1.7389", eos: "97100", percent: "90.4769", zhizi: "609626.9197", alleos: "107101"},
            97200: {price: "1.7421", eos: "97200", percent: "90.4854", zhizi: "609684.4277", alleos: "107201"},
            97300: {price: "1.7454", eos: "97300", percent: "90.4939", zhizi: "609741.8284", alleos: "107301"},
            97400: {price: "1.7487", eos: "97400", percent: "90.5024", zhizi: "609799.1219", alleos: "107401"},
            97500: {price: "1.7519", eos: "97500", percent: "90.5109", zhizi: "609856.3087", alleos: "107501"},
            97600: {price: "1.7552", eos: "97600", percent: "90.5194", zhizi: "609913.3890", alleos: "107601"},
            97700: {price: "1.7585", eos: "97700", percent: "90.5279", zhizi: "609970.3631", alleos: "107701"},
            97800: {price: "1.7617", eos: "97800", percent: "90.5363", zhizi: "610027.2313", alleos: "107801"},
            97900: {price: "1.7650", eos: "97900", percent: "90.5447", zhizi: "610083.9939", alleos: "107901"},
            98000: {price: "1.7683", eos: "98000", percent: "90.5531", zhizi: "610140.6511", alleos: "108001"},
            98100: {price: "1.7716", eos: "98100", percent: "90.5615", zhizi: "610197.2034", alleos: "108101"},
            98200: {price: "1.7748", eos: "98200", percent: "90.5699", zhizi: "610253.6509", alleos: "108201"},
            98300: {price: "1.7781", eos: "98300", percent: "90.5783", zhizi: "610309.9940", alleos: "108301"},
            98400: {price: "1.7814", eos: "98400", percent: "90.5866", zhizi: "610366.2330", alleos: "108401"},
            98500: {price: "1.7847", eos: "98500", percent: "90.5949", zhizi: "610422.3681", alleos: "108501"},
            98600: {price: "1.7880", eos: "98600", percent: "90.6033", zhizi: "610478.3996", alleos: "108601"},
            98700: {price: "1.7913", eos: "98700", percent: "90.6116", zhizi: "610534.3279", alleos: "108701"},
            98800: {price: "1.7946", eos: "98800", percent: "90.6198", zhizi: "610590.1531", alleos: "108801"},
            98900: {price: "1.7979", eos: "98900", percent: "90.6281", zhizi: "610645.8756", alleos: "108901"},
            99000: {price: "1.8012", eos: "99000", percent: "90.6364", zhizi: "610701.4957", alleos: "109001"}
        }
    }, WDzs: function (e, i) {
    }, af3s: function (e, i) {
    }, c0mF: function (e, i) {
    }, dHdo: function (e, i, t) {
        "use strict";
        var s = {
            data: function () {
                return {audioStart: !0, audioObj: "", gitshow: !1}
            }, created: function () {
                document.addEventListener("click", function () {
                })
            }, methods: {
                audioStartFn: function () {
                    var e = this.$refs.audio;
                    this.audioStart ? e.pause() : e.play(), this.audioStart = !this.audioStart
                }, showGit: function () {
                    this.gitshow = !this.gitshow, this.$emit("hideAirdrop")
                }, hideGit: function () {
                    this.gitshow = !1
                }
            }
        }, o = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", [t("div", {staticClass: "container"}, [t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.gitshow,
                        expression: "gitshow"
                    }], staticClass: "bounced flex-colunm-center"
                }, [t("div", {staticClass: "text"}, [e._v(e._s(e.$t("footer.CodeHasPassedSafelyAudit")))]), e._v(" "), t("div", {staticClass: "time"}, [e._v("2018.08.03")]), e._v(" "), t("a", {
                    staticClass: "gotogit",
                    attrs: {target: "_blank", href: "https://eospark.com/MainNet/account/chaingame123"}
                }, [e._v(e._s(e.$t("footer.ClickToCheckGitHub")))])]), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.gitshow,
                        expression: "gitshow"
                    }], staticClass: "down"
                }), e._v(" "), t("div", {staticClass: "icons1"}, [t("a", {
                    staticClass: "icon1",
                    attrs: {href: "https://eosflare.io/account/chaingame123"}
                }), e._v(" "), t("a", {
                    staticClass: "icon2",
                    attrs: {href: "https://eosflare.io/account/chaingame123", target: "_blank"}
                }), e._v(" "), t("div", {
                    staticClass: "icon3", on: {
                        click: function (i) {
                            e.showGit()
                        }
                    }
                }), e._v(" "), t("div", {
                    class: [e.audioStart ? "icon4" : "icon5"],
                    on: {click: e.audioStartFn}
                })]), e._v(" "), t("audio", {
                    ref: "audio",
                    attrs: {src: "../../static/audio/music.mp3", id: "audio", loop: "", autoplay: "", preload: "auto"}
                })])])
            }, staticRenderFns: []
        };
        var r = t("VU/8")(s, o, !1, function (e) {
            t("r2Er")
        }, "data-v-2699f75e", null);
        i.a = r.exports
    }, dmVq: function (e, i) {
    }, loAP: function (e, i) {
    }, mfWC: function (e, i, t) {
        "use strict";
        i.a = {
            subStringEOS: function (e, i) {
                if (i = i || "EOS", e) {
                    if ("string" == typeof e) {
                        var t = e.indexOf(i);
                        return t = t || e.length, e.substring(0, t)
                    }
                    return e
                }
            }
        }
    }, niaT: function (e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        t("rViV");
        var s = t("d2gY"), o = t("mfWC"), r = {
            props: ["pieData"], data: function () {
                return {
                    airdropDataList: [],
                    allAirdropDataList: [],
                    airdropDataListShow: !0,
                    airShow: !0,
                    gameinfo: [{
                        gameid: 0,
                        status: 0,
                        counter: 0,
                        init_max: "68718748890",
                        total_burn: 0,
                        total_alive: "68718748890",
                        total_reserved: 0,
                        quote_balance: "1010689.1369 EOS",
                        init_quote_balance: "1000000.0000 EOS",
                        hero: "",
                        claim_price: ""
                    }],
                    currentNumber: 0,
                    current_air_drop: 0,
                    air_drop_step: "",
                    arrowShow: !1,
                    arrowUpShow: !1,
                    gameidGlobal: "",
                    air_drop_reward: "",
                    init_quote_balance: "",
                    is_show: !0
                }
            }, created: function () {
                this.eosClient = this.$EOS(s.a.eosOptions), this.get_global(), this.get_gameinfo()
            }, mounted: function () {
                var e = this, i = this;
                this.$ms.$on("result", function (e) {
                    0 == e ? i.airShow = !1 : 1 == e && (i.airShow = !0)
                }), setInterval(function () {
                    e.get_gameinfo()
                }, 500)
            }, computed: {
                tokenName: function () {
                    return s.a.tokenName
                }, claimPrice: function () {
                    var e = this.ultimatePrize();
                    return ((this.pieData.quote_balance - this.pieData.init_quote_balance - e) / (this.pieData.total_reserved + this.pieData.total_lose)).toFixed(4)
                }
            }, methods: {
                ultimatePrize: function () {
                    var e = this.pieData.quote_balance - this.pieData.init_quote_balance,
                        i = [e > 0 ? (e / 100 * this.pieData.end_prize_ratio).toFixed(4) : 0, "5000"];
                    return Math.min.apply(null, i)
                }, get_global: function () {
                    var e = this;
                    this.eosClient.getTableRows({
                        json: "true",
                        code: s.a.gameContract,
                        scope: s.a.gameContract,
                        table: "global",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        i.rows && i.rows.length > 0 && (e.gameidGlobal = i.rows[0].gameid, e.get_gameinfo(), e.bonus(), e.air_drop_step = i.rows[0].air_drop_step)
                    }).catch(function (e) {
                        console.error(e)
                    })
                }, get_gameinfo: function () {
                    var e = this;
                    this.eosClient.getTableRows({
                        json: "true",
                        code: s.a.gameContract,
                        scope: s.a.gameContract,
                        table: "game",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        e.gameinfo = i.rows, e.gameinfo[e.gameidGlobal] && (e.currentNumber = e.gameinfo[e.gameidGlobal].counter, e.air_drop_reward = o.a.subStringEOS(e.gameinfo[e.gameidGlobal].quote_balance, s.a.tokenName), e.init_quote_balance = o.a.subStringEOS(e.gameinfo[e.gameidGlobal].init_quote_balance, s.a.tokenName))
                    }).catch(function (e) {
                        console.error(e)
                    })
                }, bonus: function () {
                    var e = this;
                    this.airdropDataList = [], this.allAirdropDataList = [], this.eosClient.getTableRows({
                        json: "true",
                        code: s.a.contractName,
                        scope: this.gameidGlobal,
                        table: "bonus",
                        limit: 100,
                        lower_bound: 0
                    }).then(function (i) {
                        e.allAirdropDataList = i.rows.reverse(), e.allAirdropDataList.length > 0 && (e.current_air_drop = e.allAirdropDataList[0].count, e.airdropDataList = e.allAirdropDataList.slice(0, 1)), e.allAirdropDataList.length > 1 && (e.arrowShow = !0, e.arrowUpShow = !1)
                    }).catch(function (e) {
                        console.error(e)
                    })
                }, showMore: function () {
                    this.arrowShow = !1, this.arrowUpShow = !0, this.airdropDataList = this.allAirdropDataList, this.$emit("hideGit", !1), this.is_show, this.airdropDataListShow
                }, showUp: function () {
                    this.arrowShow = !0, this.arrowUpShow = !1, this.airdropDataList = this.allAirdropDataList.slice(0, 1)
                }, controlAirdrop: function (e) {
                    this.airShow = e
                }
            }
        }, c = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {
                    staticClass: "airdrop-box animated",
                    class: [1 == e.airShow ? "fadeInRight" : "fadeOutRight"]
                }, [t("div", [t("span", [e._v(e._s(e.$t("airdrop.title")))]), t("span", {staticClass: "title"})]), e._v(" "), t("p", {staticClass: "currentNumber"}, [e._v(e._s(e.currentNumber))]), e._v(" "), t("ul", {staticClass: "airdropData"}, [t("li", {staticClass: "item future"}, [t("span", [e._v(e._s(e.current_air_drop + 2 * e.air_drop_step))]), e._v(" "), t("div", [t("p", [e._v(e._s(e.$t("airdrop.award")) + "：" + e._s(e.claimPrice) + e._s(e.tokenName))]), e._v(" "), t("p", [e._v(e._s(e.$t("airdrop.estimated")))])])]), e._v(" "), t("li", {staticClass: "item current"}, [t("span", [e._v(e._s(e.current_air_drop + e.air_drop_step))]), e._v(" "), t("div", [t("p", [e._v(e._s(e.$t("airdrop.award")) + "：" + e._s(e.claimPrice) + e._s(e.tokenName))]), e._v(" "), t("p", [e._v(e._s(e.$t("airdrop.estimated")))])])]), e._v(" "), e._l(e.airdropDataList, function (i) {
                    return t("li", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.airdropDataListShow,
                            expression: "airdropDataListShow"
                        }], key: i.index, staticClass: "item"
                    }, [t("span", [e._v(e._s(i.count))]), e._v(" "), t("div", [t("p", [e._v(e._s(i.owner))]), e._v(" "), t("p", [e._v(e._s(e.$t("airdrop.award")) + "：" + e._s(i.reward))])])])
                }), e._v(" "), e._l(e.allAirdropDataList, function (i) {
                    return t("li", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.airdropDataListShow,
                            expression: "!airdropDataListShow"
                        }], key: i.index, staticClass: "item"
                    }, [t("span", [e._v(e._s(i.count))]), e._v(" "), t("div", [t("p", [e._v(e._s(i.owner))]), e._v(" "), t("p", [e._v(e._s(e.$t("airdrop.award")) + "：" + e._s(i.reward))])])])
                })], 2), e._v(" "), t("p", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.arrowShow,
                        expression: "arrowShow"
                    }], staticClass: "arrow", on: {
                        click: function (i) {
                            e.showMore()
                        }
                    }
                }), e._v(" "), t("p", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.arrowUpShow,
                        expression: "arrowUpShow"
                    }], staticClass: "arrow arrowup", on: {
                        click: function (i) {
                            e.showUp()
                        }
                    }
                })])
            }, staticRenderFns: []
        };
        var a = t("VU/8")(r, c, !1, function (e) {
            t("D50i")
        }, "data-v-bd1add22", null);
        i.default = a.exports
    }, oCBF: function (e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        t("rViV");
        var s = t("d2gY"), o = (t("PJh5"), {
            props: ["worldRecordStatic"], data: function () {
                return {
                    eosClient: null,
                    recordDataList: [],
                    recordAllDataList: [],
                    searchAccount: "",
                    totalSize: 0,
                    currentPage: 1,
                    pageSize: 10
                }
            }, created: function () {
                this.eosClient = this.$EOS(s.a.actionNetwork), this.getActions()
            }, mounted: function () {
                var e = this;
                setInterval(function () {
                    e.getActions()
                }, 3e3)
            }, methods: {
                getActions: function (e) {
                    var i = this;
                    this.currentPage = 1;
                    var t = e || s.a.gameContract;
                    this.eosClient.getActions({account_name: t, pos: -1, offset: -100}).then(function (e) {
                        i.actions = e.actions.map(function (e) {
                            return e
                        }).filter(function (e) {
                            var act = e.action_trace.act;
                            if (act.account == s.a.gameContract && "sell" == act.name || act.account == s.a.gameContract && "destroy" == act.name) {

                                var abiSche = i.eosClient.fc.abiCache.abi('chaingame123', abiJson.abi)
                                var res2 = abiSche.fromBuffer(act.name,act.data);
                                act.data = res2;
                                return true

                            }

                            if(act.account == s.a.tokenContract && "transfer" == act.name && act.data.to == s.a.gameContract){
                               // e.data.to != s.a.toContract
                                return true;

                            }else{
                                return false;
                            }

                        }), i.recordAllDataList = i.actions, i.recordAllDataList = i.recordAllDataList.reverse(), i.totalSize = i.recordAllDataList.length, i.recordDataList = i.recordAllDataList.slice(0, 10)
                    }, function (e) {
                        console.log(e)
                    })
                }, handleChange: function (e) {
                    this.recordDataList = this.recordAllDataList.slice(10 * (e - 1), 10 * e)
                }, getAccount: function (e) {
                    this.searchAccount = e, this.$ms.$emit("setAccount", e), this.$emit("setAccount", e)
                }, clearTxt: function () {
                    this.searchAccount = ""
                }, search: function (e) {
                    this.getActions(e)
                }
            }
        }), r = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {
                    staticClass: "worldRecord-box animated",
                    class: 1 == e.worldRecordStatic ? "fadeInLeft" : "fadeOutLeft"
                }, [t("div", {staticClass: "title"}, [t("p", [e._v(e._s(e.$t("worldRecord.title")))])]), e._v(" "), t("div", {
                    staticClass: "search-box",
                    staticStyle: {display: "none"}
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.searchAccount,
                        expression: "searchAccount"
                    }],
                    staticClass: "search-txt",
                    attrs: {type: "text", placeholder: "请输入用户账号"},
                    domProps: {value: e.searchAccount},
                    on: {
                        input: function (i) {
                            i.target.composing || (e.searchAccount = i.target.value)
                        }
                    }
                }), e._v(" "), t("span", {
                    staticClass: "close", on: {
                        click: function (i) {
                            e.clearTxt()
                        }
                    }
                }, [e._v("x")]), e._v(" "), t("span", {
                    staticClass: "search-icon", on: {
                        click: function (i) {
                            e.search(e.searchAccount)
                        }
                    }
                })]), e._v(" "), e.recordDataList.length > 0 ? t("ul", {staticClass: "recordData"}, e._l(e.recordDataList, function (i) {
                    return t("li", {
                        key: i.index,
                        staticClass: "item"
                    }, [t("span", [e._v(e._s(e._f("moment")(i.block_time)))]), e._v(" "), t("span", {
                        staticStyle: {cursor: "pointer"},
                        on: {
                            click: function (t) {
                                e.getAccount("transfer" == i.action_trace.act.name ? i.action_trace.act.data.from : i.action_trace.act.data.account)
                            }
                        }
                    }, [e._v(e._s("transfer" == i.action_trace.act.name ? i.action_trace.act.data.from : i.action_trace.act.data.account))]), e._v(" "), t("span", [e._v(e._s("transfer" == i.action_trace.act.name ? i.action_trace.act.data.quantity : i.action_trace.act.data.bytes + " " + e.$t("worldRecord.sophon")))]), e._v(" "), t("span", {
                        staticClass: "circle",
                        class: ["transfer" == i.action_trace.act.name ? "green" : "sell" == i.action_trace.act.name ? "orange" : "red"]
                    })])
                })) : t("div", {
                    staticClass: "recordData",
                    staticStyle: {"font-family": "MicrosoftYaHei"}
                }, [e._v(e._s(e.$t("worldRecord.loading")))]), e._v(" "), t("el-pagination", {
                    staticClass: "game-pagination",
                    attrs: {
                        layout: "prev, pager, next",
                        total: e.totalSize,
                        "current-page": e.currentPage,
                        "page-size": e.pageSize
                    },
                    on: {
                        "update:currentPage": function (i) {
                            e.currentPage = i
                        }, "current-change": e.handleChange
                    }
                })], 1)
            }, staticRenderFns: []
        };
        var c = t("VU/8")(o, r, !1, function (e) {
            t("D4Sz"), t("tkab")
        }, "data-v-b9707378", null);
        i.default = c.exports
    }, qE3X: function (e, i, t) {
        e.exports = t.p + "static/img/login-ra.1925270.gif"
    }, r2Er: function (e, i) {
    }, tkab: function (e, i) {
    }, vq0W: function (e, i) {
    }, wYUi: function (e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        var s = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {
                    staticClass: "introduce-box animated",
                    class: 1 == e.introduceStatic ? "fadeInLeft" : "fadeOutLeft"
                }, [t("div", {staticClass: "line"}), e._v(" "), t("div", {staticClass: "title"}, [t("p", [e._v(e._s(e.$t("introduce.title")))])]), e._v(" "), t("ul", {staticClass: "subtitle"}, e._l(e.subtitleTxt, function (i, s) {
                    return t("li", {
                        key: i.index,
                        staticClass: "item",
                        class: [e.currentIndex == s ? "current" : ""],
                        on: {
                            click: function (i) {
                                e.mainTab(s)
                            }
                        }
                    }, [e._v(e._s(e.$t(i)))])
                })), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 0 == e.currentIndex,
                        expression: "currentIndex == 0"
                    }], staticClass: "content backbround-content"
                }, [t("p", [e._v(e._s(e.$t("introduce.backgroundTxt01")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.backgroundTxt02")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.backgroundTxt03")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.backgroundTxt04")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.backgroundTxt05")))]), e._v(" "), t("ul", [t("li", [e._v(e._s(e.$t("introduce.backgroundTxt06")))]), e._v(" "), t("li", [e._v(e._s(e.$t("introduce.backgroundTxt07")))])]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.backgroundTxt08")))])]), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 1 == e.currentIndex,
                        expression: "currentIndex == 1"
                    }], staticClass: "content"
                }, [t("p", [e._v(e._s(e.$t("introduce.operationTxt01")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.operationTxt02")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.operationTxt03")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.operationTxt05")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.operationTxt06")))]), e._v(" "), t("br"), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.operationTxt04")))])]), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 2 == e.currentIndex,
                        expression: "currentIndex == 2"
                    }], staticClass: "content"
                }, [t("p", [e._v(e._s(e.$t("introduce.rolesTxt01")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.rolesTxt02")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.rolesTxt03")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.rolesTxt04")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.rolesTxt05")))])]), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 3 == e.currentIndex,
                        expression: "currentIndex == 3"
                    }], staticClass: "content"
                }, [t("p", [e._v(e._s(e.$t("introduce.explanationTxt01")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt02")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt03")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt04")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt05")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt06")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt07")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.explanationTxt08")))])]), e._v(" "), t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: 4 == e.currentIndex,
                        expression: "currentIndex == 4"
                    }], staticClass: "content"
                }, [t("p", [e._v(e._s(e.$t("introduce.guideTxt01")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.guideTxt02")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.guideTxt03")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.guideTxt04")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.guideTxt05")))]), e._v(" "), t("p", [e._v(e._s(e.$t("introduce.guideTxt06")))])]), e._v(" "), t("div", {
                    staticClass: "close",
                    on: {
                        click: function (i) {
                            e.close()
                        }
                    }
                })])
            }, staticRenderFns: []
        };
        var o = t("VU/8")({
            props: ["introduceStatic"], data: function () {
                return {
                    subtitleTxt: ["introduce.subtitle01", "introduce.subtitle02", "introduce.subtitle03", "introduce.subtitle04", "introduce.subtitle05"],
                    currentIndex: 0
                }
            }, methods: {
                mainTab: function (e) {
                    this.currentIndex = e
                }, close: function () {
                    this.$emit("introduce", !0)
                }
            }
        }, s, !1, function (e) {
            t("af3s")
        }, "data-v-00c9f1fb", null);
        i.default = o.exports
    }, yBia: function (e, i, t) {
        "use strict";
        var s = t("Dd8w"), o = t.n(s), r = t("NYxO"), c = {
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
            }, methods: o()({}, Object(r.b)({changeLocaleLang: "changeLocaleLang"}), {
                changeLanguage: function (e) {
                    this.languageListShow = !1, this.selectedLanguage = "../../static/image/mobile/" + e + ".png", this.changeLocaleLang(e), this.$i18n.locale = e
                }, languageListEvent: function () {
                    this.languageListShow = !this.languageListShow
                }
            }), computed: o()({}, Object(r.c)({localeLang: "localeLang"}), {
                localeLangShow: function () {
                    return this.$store.getters.localeLang
                }
            })
        }, a = {
            render: function () {
                var e = this, i = e.$createElement, t = e._self._c || i;
                return t("div", {staticClass: "language-box"}, [t("img", {
                    staticClass: "current-img",
                    attrs: {src: e.selectedLanguage, alt: "Chinese"},
                    on: {click: e.languageListEvent}
                }), e._v(" "), t("ul", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.languageListShow,
                        expression: "languageListShow"
                    }], staticClass: "language-list"
                }, e._l(e.languageList, function (i) {
                    return t("li", {
                        key: i.index, on: {
                            click: function (t) {
                                e.changeLanguage(i.value)
                            }
                        }
                    }, [t("img", {attrs: {src: i.imgPath, alt: i.value}})])
                }))])
            }, staticRenderFns: []
        };
        var n = t("VU/8")(c, a, !1, function (e) {
            t("vq0W")
        }, "data-v-1f3b68f0", null);
        i.a = n.exports
    }, yVjq: function (e, i) {
    }, z2Uw: function (e, i) {
    }
});
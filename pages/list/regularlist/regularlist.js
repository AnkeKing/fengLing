// pages/list/regularlist/regularlist.js
const app = getApp()
const api=require("../../../http/config.js")
const http=require("../../../http/index.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height:"",
        statusBarHeight: "",
        inputValue: "",
        result: [],
        btnText:"编辑",
        allChoice: false,
        num:null,
        color: "#333333"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var he = app.globalData.jiaonan.top - app.globalData.statusBarHeight;
        var height = he + app.globalData.jiaonan.height + he;
        var height1 = app.globalData.statusBarHeight + height
        this.setData({
            height: height,
            height1: height1
        })
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.windowWidth)
                var height2 = (that.data.height1 * (750 / res.windowWidth));
                console.log(height2) //最后获得转化后得rpx单位的窗口高度
                that.setData({
                    height2: height2
                })
            }
        })
        this.num()
    },
    // 获取购物⻋商品数量
    num() {
        http(
            api.baseUrl + "/orderShoppingCart/getShoppingCartQuantity",
            "data", {
                "customerId": 589,
                "shopId": 18,
                "storeId": 56200,
                "goodsName": "",
                "currentPage": 1,
                "pageSize": 10
            },
            "post"
        ).then(res => {
            if (res.data.status.statusCode === 0) {
                console.log(res)
                this.setData({
                    num: res.data.result
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight
        });
        this.http1()
    },
    // 返回上一级
    backtrack() {
        wx.navigateBack({ changed: true });
    },
    // 点击编辑按钮
    btn: function () {
        if (this.data.btnText == "编辑") {
            this.setData({
                btnText: "完成",
                checked: true
            })
        } else if (this.data.btnText == "完成") {
            this.setData({
                btnText: "编辑",
                checked: false
            })
        }

    },
    http1() {
        let li = {
            "customerId": 589,
            "shopId": 18,
            "storeId": 56200,
            "goodsName": this.data.inputValue,
            "currentPage": 1,
            "pageSize": 10
        };
        http(
            api.regularlist,
            "data",
            li,
            "POST"
        ).then(res => {
            console.log("清单", res);
            if (res.data.status.statusCode == 0) {
                if (res.data.result != undefined) {
                    this.setData({
                        result: res.data.result
                    })
                } else {
                    this.setData({
                        result: []
                    })
                }
            }
        })
    },
    bindKeyInput: function (e) {
        // console.log(e.detail.value)
        this.setData({
            inputValue: e.detail.value
        });
        this.http1()
    },
    // 加车
    addCart(e) {
        console.log("加车", e)
        http(
            api.baseUrl + "/orderShoppingCart/goodsToShoppingCart",
            "data",
            {
                customerId: 589,
                shopId: e.currentTarget.dataset.item.shopId,
                goodsId: e.currentTarget.dataset.item.goodsId,
                quantity: 1,
                teminal: 2,
                storeId: e.currentTarget.dataset.item.storeId
            },
            "POST"
        ).then(res => {
            if (res.data.status.statusCode === 0) {
                console.log("成功加车", res)
                wx.showToast({
                    title: '添加成功',
                    icon: 'none',
                    duration: 2000
                })
                this.num();
            }

        })
    },
    // 跳到购物车
    toshopping() {
        wx.switchTab({
            url: '/pages/shopping/shopping',
        })
    },
    // 单选择
    choice(e) {

        console.log("xuanze", e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var result = this.data.result;
        result[index].asc = !result[index].asc;

        this.setData({

            result: result
        })
        for (let a = 0; a < result.length; a++) {
            if (result[a].asc) {
                this.setData({
                    color: "#f73936",
                })
                return;
            }
            this.setData({
                color: "#333333",
            })
        }
        for (var i = 0; i < result.length; i++) {
            if (!result[i].asc == true) {
                this.setData({
                    allChoice: false,
                })
                return;
            }
            this.setData({
                allChoice: true
            })

        }
    },

    // 全选
    allChoice() {
        console.log(12345678)
        var result = this.data.result;
        var allChoice = this.data.allChoice;
        allChoice = !allChoice

        for (var i = 0; i < result.length; i++) {
            result[i].asc = allChoice

        }
        this.setData({
            result: result,
            allChoice: allChoice,
            color: "#f73936"
        })
        if (!allChoice) {
            this.setData({
                color: "#333333"
            })
            return;
        }
    },
    // 移除
    remove() {
        var arr = [];
        let result = this.data.result;
        for (let i = 0; i < result.length; i++) {
            if (result[i].asc) {
                arr.push( result[i].goodsId )
            }
        }
        console.log(arr)
        if (this.data.color == "#f73936") {
            // http(
            //     api.baseUrl + "/order/romveAlwaysBuyList",
            //     "params", {
            //         "customerId": 589,
            //         "shopId": 18,
            //         "storeId": 56200,
            //         "goodsName": "",
            //         "currentPage": 1,
            //         "pageSize": 10,
            //         "goodsIds": arr
            //     },
            //     "POST"
            // ).then(res => {
            //     if (res.data.status.statusCode === 0) {
            //         console.log(res);
            //         this.onLoad();
            //     }
            // })
        }
    },
    // 跳到详情页
    toXiangQing(e){
        wx.navigateTo({
            url: '/pages/commodity/commodity?goodsId='+e.currentTarget.dataset.goodsid,
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

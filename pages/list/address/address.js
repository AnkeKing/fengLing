// pages/list/address/address.js
const app = getApp()
const api = require("../../../http/config.js")
const http = require("../../../http/index.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        addressList: [],
        startX: 0, //开始坐标
        startY: 0
    },
    //手指触摸动作开始 记录起点X坐标
    touchstart: function(e) {
        //开始触摸时 重置所有删除
        this.data.addressList.forEach(function(v, i) {
            if (v.isTouchMove) //只操作为true的
                v.isTouchMove = false;
        })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            addressList: this.data.addressList
        })
    },
    //滑动事件处理
    touchmove: function(e) {
        var that = this,
            index = e.currentTarget.dataset.index, //当前索引
            startX = that.data.startX, //开始X坐标
            startY = that.data.startY, //开始Y坐标
            touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
            //获取滑动角度
            angle = that.angle({
                X: startX,
                Y: startY
            }, {
                X: touchMoveX,
                Y: touchMoveY
            });
        that.data.addressList.forEach(function(v, i) {
            v.isTouchMove = false
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                else //左滑
                    v.isTouchMove = true
            }
        })
        //更新数据
        that.setData({
            addressList: that.data.addressList
        })
    },
    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function(start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
    //删除事件
    del: function(e) {
        console.log(e.currentTarget.dataset.index);
        var that=this;
        wx.showModal({
            title: '确定删除改收货地址吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    http(
                        api.baseUrl + "/newMemberAddress/delAddress",
                        "params", {
                            addressId: e.currentTarget.dataset.index
                        },
                        "get"
                    ).then(res => {
                        if (res.data.status.statusCode === 0) {
                            console.log("删除成功==>", res)
                            that.onShow()
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.data.addressList.push({

            isTouchMove: false //默认全隐藏删除
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        http(
            api.baseUrl + "/newMemberAddress/getListByMemberId",
            "params", {
                memberId: 589,
                pageNum: 1,
                pageSiz: 100,
                memberSource: 601
            },
            "get"
        ).then(res => {
            console.log("获取收货地址==>", res)
            if (res.data.status.statusCode === 0) {
                this.setData({
                    addressList: res.data.result.addressList
                })
            }
        })
    },
    // 返回上一级
    backtrack() {
        wx.navigateBack({
            changed: true
        });
    },
    // 跳到新添加地址页面
    newAddress() {
        wx.navigateTo({
            url: './newAddress/newAddress',
        })
    },
    // 跳到编辑地址页面
    editAddress(e) {
        console.log(e.target.dataset)
        let str = JSON.stringify(e.target.dataset.id)
        wx.navigateTo({
            url: './editAddress/editAddress?mm=' + str,
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
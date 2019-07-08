// pages/list/address/editAddress/editAddress.js
const app = getApp()
const api = require("../../../../http/config.js")
const http = require("../../../../http/index.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        addressName: '点击选择地址',
        color: "black",
        sex: -1, //1 男  2  女
        list: null,
        // mapAddress: null,
        userName: "",
        phone: "",
        detailAddress: "",
        memberAddressId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.mm)
        let object = JSON.parse(options.mm);
        this.setData({
                list: object,
                userName: object.contacts,
                sex: object.sex,
                addressName: object.mapAddress,
                userName: object.contacts,
                phone: object.contactsMobile,
                detailAddress: object.detailAddress,
                memberAddressId: object.memberAddressId
            }

        )

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    select() {
        var that = this;
        wx.chooseLocation({
            success(res) {
                console.log(res.name)
                that.setData({
                    addressName: res.name,
                    color: "black",
                    latitude: res.latitude, //纬度
                    longitude: res.longitude, //经度
                    mapAddress: res.address //详细地址
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
    // 性别
    clickSexButton: function(options) {
        let sexId = options.currentTarget.dataset.sexid;
        this.setData({
            sex: sexId
        })
    },
    // 联系人
    userName: function(e) {
        this.setData({
            userName: e.detail.value
        })
    },
    // 电话
    phone: function(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    // 楼号门牌号
    detailAddress: function(e) {
        this.setData({
            detailAddress: e.detail.value
        })
    },
    // 点击保存
    save() {
        if (this.data.userName != "") {
            console.log(this.data.userName)
            if (this.data.sex != -1) {
                console.log(this.data.sex)
                if (this.data.phone.length == 11) {
                    console.log(this.data.phone)
                    if (this.data.addressName != "点击选择地址" && this.data.addressName != "") {
                        console.log(this.data.addressName)
                        if (this.data.detailAddress != "") {
                            console.log(this.data.detailAddress)
                            this.preservationInterface()
                        } else {
                            wx.showToast({
                                title: '请填写楼号门牌号',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    } else {
                        wx.showToast({
                            title: '请填写详细地址',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                } else {
                    wx.showToast({
                        title: '请输入正确的手机号',
                        icon: 'none',
                        duration: 2000
                    })
                }
            } else {
                wx.showToast({
                    title: '请选择',
                    icon: 'none',
                    duration: 2000
                })
            }
        } else {
            wx.showToast({
                title: '联系人不能为空',
                icon: 'none',
                duration: 2000
            })
        }

    },
    // 保存HTTP
    preservationInterface() {
        http(
            api.baseUrl + "/newMemberAddress/updateAddress",
            "data", {
                "memberId": 589,
                "createUser": "2190380",
                "memberSource": "601",
                "contacts": this.data.userName,
                "sex": this.data.sex,
                "contactsMobile": this.data.phone,
                "detailAddress": this.data.detailAddress,
                "lng": this.data.longitude,
                "lat": this.data.latitude,
                "mapAddress": this.data.mapAddress,
                "isDefault": 0,
                "memberAddressId": this.data.memberAddressId
            },
            "post"
        ).then(res => {
            console.log(res)
            if (res.data.status.statusCode === 0) {
                wx.navigateBack({
                    url: "../../address/address"
                })
            }
        })
    },
    // 删除
    del(e) {
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
                            wx.navigateBack({
                                url: "../../address/address"
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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
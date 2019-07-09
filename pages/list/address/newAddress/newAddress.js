// pages/list/address/newAddress/newAddress.js
const app = getApp()
const api=require("../../../../http/config.js")
const http=require("../../../../http/index.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        addressName: '点击选择地址',
        color: "#cdcdcd",
        sex: -1,//1 男  2  女
        userName:"",
        phone:"",
        detailAddress:"",
        lng:"",
        lat:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },
    select() {
        var that = this;
        wx.chooseLocation({
            success(res) {
                console.log(res.name)
                that.setData({
                    addressName: res.name,
                    color: "#333333",
                    lng: res.longitude,
                    lat: res.latitude
                })
            }
        })
    },
    // 返回上一级
    backtrack() {
        wx.navigateBack({ changed: true });
    },
    // 性别
    clickSexButton: function (options) {
        let sexId = options.currentTarget.dataset.sexid;
        this.setData({
            sex: sexId
        })
    },
    // 联系人
    userName(e){
        this.setData({
            userName: e.detail.value
        })
    },
    // 电话
    phone(e){
        this.setData({
            phone: e.detail.value
        })
    },
    
    // 楼号门牌号
    detailAddress(e) {
        this.setData({
            detailAddress: e.detail.value
        })
    },
    // 保存
    preservation(){
        if(this.data.userName!=""){
            console.log(this.data.userName)
            if(this.data.sex!=-1){
                console.log(this.data.sex)
                if(this.data.phone.length==11){
                    console.log(this.data.phone)
                    if (this.data.addressName != "点击选择地址" && this.data.addressName !=""){
                        console.log(this.data.addressName)
                        if (this.data.detailAddress!=""){
                            console.log(this.data.detailAddress)
                            this.preservationInterface()
                        }else{
                            wx.showToast({
                                title: '请填写楼号门牌号',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    }else{
                        wx.showToast({
                            title: '请填写详细地址',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }else{
                    wx.showToast({
                        title: '请输入正确的手机号',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }else{
                wx.showToast({
                    title: '请选择',
                    icon: 'none',
                    duration: 2000
                })
            }
        }else{
            wx.showToast({
                title: '联系人不能为空',
                icon: 'none',
                duration: 2000
            })
        }
       
    },
    // 保存接口
    preservationInterface(){
         http(
            api.baseUrl +"/newMemberAddress/insertAddress",
            "data",
            {
                "memberId": 589,
                "createUser": "2190380",
                "memberSource": "601",
                "contacts": this.data.userName,
                "sex": this.data.sex,
                "contactsMobile": this.data.phone,
                "detailAddress": this.data.detailAddress,
                "lng":this.data.lng,
                "lat":this.data.lat,
                "mapAddress": this.data.addressName,
                "isDefault": 0
            },
            "post"
        ).then(res=>{
            console.log("保存新增地址==>",res)
            if (res.data.status.statusCode === 0){
                wx.navigateBack({
                    url:"../address/address"
                })
            }
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
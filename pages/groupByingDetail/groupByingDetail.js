// pages/groupByingDetail/groupByingDetail.js
var http = require("../../http/index.js");
var api = require("../../http/groupBying_config");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateObj: {},
    shopCount: 0,
    martop: 0,
    result: null,
    goodsList: null,
    warnTitle:"",
    warnBool:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      martop: getApp().globalData.statusBarHeight + getApp().globalData.jiaonan.height + 18
    })
    http(//订单详情
      api.storeGroupBuyDetail,
      "data",
      {
        groupBuyId: 30,
        groupBuyLeaderId: 15,
        memberId: 589,
        shopId: 18,
        storeId: 56200,
      },
      "POST"
    ).then(res => {
      console.log("详情", res);
      for (var s in res.data.result.goodsList) {
        res.data.result.goodsList[s].shopNum = 0;
      }
      this.setData({
        martop: getApp().globalData.statusBarHeight + getApp().globalData.jiaonan.height + 18,
        result: res.data.result,
        goodsList: res.data.result.goodsList
      })
      console.log("商品", this.data.goodsList);
    })
    http(//团购订单记录
      api.groupBuyRecordOrder,
      "data",
      {
        currentPage: 1,
        groupBuyLeaderId: 15,
        pageSize: 10,
        shopId: 18,
        storeId: 56200
      },
      "POST"
    ).then(res => {
      console.log("团购订单记录", res)
      // this.setData({
      //   martop: getApp().globalData.statusBarHeight + getApp().globalData.jiaonan.height + 18,
      //   result: res.data.result
      // })
    })
  },
  add(event) {
    let index = event.currentTarget.dataset.currentindex;
    let goodsList = this.data.goodsList;
    goodsList[index].shopNum++;
    this.setData({
      goodsList: goodsList
    })
  },
  sub(event) {
    let index = event.currentTarget.dataset.currentindex;
    let goodsList = this.data.goodsList;
    if (goodsList[index].shopNum <= 0) {
      goodsList[index].shopNum = 0;
    } else {
      goodsList[index].shopNum--;
    }
    this.setData({
      goodsList: goodsList
    })
  },
  toBying() {
    var that=this;
    let count = 0;
    for (var s in this.data.goodsList) {
      count += this.data.goodsList[s].shopNum * this.data.goodsList[s].teamPrice;
    }
    console.log("count",count)
    if (count <= 0) {
      that.setData({
        warnTitle:"请选择商品",
        warnBool:true
      })
    } else if (count < 25) {
      that.setData({
        warnTitle:"团购商品金额不满25元",
        warnBool:true
      })
    } else {
      let goodsArr={}
      for (var s in this.data.goodsList) {
        if(this.data.goodsList[s].shopNum>0){
          goodsArr[this.data.goodsList[s].skuId]=this.data.goodsList[s].shopNum;
        }
      }
      console.log("goodsArr",goodsArr);
      wx.navigateTo({ url: '../confirmOrder/confirmOrder?goodsArr='+JSON.stringify(goodsArr) })
    }

    setTimeout(function(){
      that.setData({
        warnBool:false
      })
    },1000)

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
// pages/home/home.js
const app = getApp();
const api = require("../../http/config.js");
const http = require('../../http/index.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mm:"请定位位置",
    currentTab: 0,
    Tab: 0,
    fenlei: null,
    jiushui: null,
    meishi: null,
    dian:[],
    shu:"",
    id:"",
    goodsId:"",
    result:null,
    dis:true,
    goodsList: null,
    
    //  困在全局直接在全局取
    statusBarHeight: app.globalData.statusBarHeight,
  },

  // map

  // tab点击事件
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  // 地图
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 29.6463000000,//要去的纬度-地址
          longitude: 91.1469500000,//要去的经度-地址
          name: "西藏拉萨市城关区吉日街道办事处江苏路36号",
          address: '西藏拉萨市城关区吉日街道办事处江苏路36号'
        })
      }
    })
  },
  // 打电话
  callme: function () {
    wx.makePhoneCall({
      phoneNumber: "17600181028",
    })
  },
  toGroupBying() {
    wx.navigateTo({url: '../groupBying/groupBying',})
  },
  // http
  // 竖向点击事件
  ckb: function (e) {
    var that = this;
    if (this.data.Tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        Tab: e.target.dataset.current,
      })
    }
  },
    aa(){
       wx.navigateTo({
           url: '../address/address',
       })
    },
    search(){
        wx.navigateTo({
            url: '../search/search',
        })
    },

  jia(e){
    var that=this;
    console.log(e);
    this.setData({
      // goodsId:e.currentTarget.dataset.foodId
    }),
     http(
       api.baseUrl +"/orderShoppingCart/addShoppingCart",
      " data",
       {
        customerId: 589,
         shopId: 18,
         goodsId: 2052637,
         quantity: 1 ,
         teminal: 2,
         storeId: 56200,  
       },
       "post",
     ).then(res=>{
       console.log("加一", res);
      that.setData({
        result:res.data.result
      })
     })
   
  },

  add(e){
    
     console.log("哈哈哈哈",e);
    var that=this
    //   // 所点商品id
      var foodId = e.currentTarget.dataset.foodId;
    // var index = e.currentTarget.dataset.index;
    // console.log(index);
    // let goodsList = this.data.goodsList;
    // goodsList[index].quantity++;
    this.setData({
      // goodsList: goodsList,
      dis: false
    })
    http(
      api.baseUrl + "/orderShoppingCart/addShoppingCart",
      " data",
      {
        customerId: 589,
        shopId: 18,
        goodsId: foodId,
        quantity: 1,
        teminal: 2,
        storeId: 56200,
      },
      "post",
    ).then(res => {
      that.setData({
        result: res.data.result
      })
      console.log("加一", res);
      
    })
  },

  subtract: function (e) {
    var that=this
    // // 所点商品id
    var foodId = e.currentTarget.dataset.foodId;
    // let index = e.currentTarget.dataset.quantity;
    // let goodsList = this.data.goodsList;
    // if (goodsList[index].quantity <= 0) {
    //   goodsList[index].quantity = 0;
    // } else {
    //   goodsList[index].quantity--;
    // }
    // this.setData({
    //   goodsList: goodsList
    // })
    http(
      api.baseUrl + "/orderShoppingCart/subtractShoppingCart",
      " data",
      {
        customerId: 589,
        shopId: 18,
        goodsId: foodId,
        quantity: 1,
        teminal: 2,
        storeId: 56200,
      },
      "post",
    ).then(res => {
      console.log("减一", res);
      that.setData({
        result: res.data.result
      })
      // console.log("小程序",that.data.result);
      // if (that.data.result.goodsCarQueryList[0].goodsList[0].quantity==1){
      //     dispaly:none;
      //  }
    })
    
  },














  weizhi(){
    var that=this;
    http(
      api.baseUrl +"/shopInfoController/shopCoverageRange",
      "params",
      {
        shopId: 18 
      },
      "get"
  ).then(res=>{
      console.log("城市",res)
      that.setData({
        dian:res.data.result
         
      })
    console.log(that.data.dian);
    })
   
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    http(//首页
       api.home,
      //  "https://web-gateway.newbeescm.com/ms-web/shopGoodsCategory/homeCategoryList",
      "params",
      {
        shopId: 18,
        storeId: 56200
      },
      "POST"
    ).then(res => {
      console.log("分类：", res);
      that.setData({
        fenlei: res.data.result,
      })
    })

    http(
      api.baseUrl + "/shopGoods/getGoodsPageList",
      "data",
      {
        "status": "1",
        "shopId": 18,
        "storeId": 56200,
        "salesCategoryId": 830064,
        "sortType": 5,
        "isAsc": false,
        "teminal": 2,
        "customerId": 589,
        "currentPage": 0,
        "pageSize": 15
      },
      "post",
    ).then(res => {
      that.setData({
        jiushui: res.data.result.items,
      })
      console.log("右边的商品列表下标0",res);
      // console.log(that.data.jiushui)
    }),
      http(
        api.baseUrl + "/shopGoods/getGoodsPageList",
        "data",
        {
          "status": "1",
          "shopId": 18,
          "storeId": 56200,
          "salesCategoryId": 830064,
          "sortType": 5,
          "isAsc": false,
          "teminal": 2,
          "customerId": 589,
          "currentPage": 0,
          "pageSize": 15
        },
        "post",
      ).then(res => {
        that.setData({
          meishi: res.data.result.items,
        })
        console.log("没事", res);
        console.log(that.data.meishi);
      })
        that.jia();
      that.weizhi();
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
     var that=this
       wx.getStorage({
       key: 'district',
       success: function(res) {
         console.log(res);
         that.setData({
           mm:res.data
         })
       },
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
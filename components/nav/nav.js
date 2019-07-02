// components/nav/nav.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { // 属性名 
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
      value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个 
    }, 
    color: { // 属性名 
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
      value: 'color' // 属性初始值（可选），如果未指定则会根据类型选择一个 
    }, 
  },


  /**
   * 组件的初始数据
   */
  data: {
    Topha: null,
    jiaonan: null,
    height:0
  },
  lifetimes: {
    attached: function () {
      //选择id
      var that = this;
      this.setData({
        Topha: app.globalData.statusBarHeight
      })
      // 胶南高度
      this.setData({
        jiaonan: app.globalData.jiaonan
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})

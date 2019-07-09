// components/warning/warning.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    warnTitle:{
      type:String,
      value:""
    },
    warnBool:{
      type:Boolean,
      value:false
    },
    
  },
  lifetimes: {
    attached: function () {
      console.log("this.data.warnTitle",this.data.warnTitle);
      console.log("this.data.warnTitle",this.data.warnBool);
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

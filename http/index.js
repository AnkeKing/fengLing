function http(url, data, method) {
  wx.showToast({
    title: "加载中...",
    icon: "loading"
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: JSON.stringify(data),
      method: method || 'get',
      params:data,
      success: function (res) {//成功
        // if (res.data.result === 'error' || res['statusCode'] !== 200) {
        //   wx.showToast({
        //     title: res.data.msg || '请求出错',
        //     icon: 'none',
        //     duration: 2000,
        //     mask: true
        //   })
        // }
        resolve(res);
      },
      fail: function (err) {//失败
        reject(err);
      },
      complete: function (res) {//完成
        wx.hideToast();
      }
    })
  })
}
module.exports = http;
function http(url, type, data, method) {
  wx.showToast({
    title: "加载中...",
    icon: "loading"
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      // data: JSON.stringify(data),
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
    if (type == "params") {
      wx.request({
        url: url + "?" + jointParams(data),
        method: method || 'get',
        success: function (res) {//成功
          resolve(res);
        },
        fail: function (err) {//失败
          reject(err);
        },
        complete: function (res) {//完成
          wx.hideToast();
        }
      })
    } else {
      wx.request({
        url,
        data: data,
        method: method || 'get',
        success: function (res) {//成功
          resolve(res);
        },
        fail: function (err) {//失败
          reject(err);
        },
        complete: function (res) {//完成
          wx.hideToast();
        }
      })
    }
  })
}
function jointParams(data){//拼接params参数
  let strForm = JSON.stringify(data);
  let lastAttr = strForm.substring(strForm.lastIndexOf(",") + 1, strForm.lastIndexOf(":"));
  let urlStr = "";
  for (f in data) {
    if (lastAttr == f) {
      urlStr += f + "=" + data[f];
    } else {
      urlStr += f + "=" + data[f] + "&";
    }
  }
  return urlStr;
}
module.exports = http;
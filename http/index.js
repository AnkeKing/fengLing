function http(url, type, data, method) {
  wx.showToast({
    title: "加载中...",
    icon: "loading"
  })
  return new Promise((resolve, reject) => {
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
function jointParams(data) {//拼接params参数
  let strForm = JSON.stringify(data);
  let lastAttr = strForm.substring(strForm.lastIndexOf(",") + 2, strForm.lastIndexOf(":") - 1);
  let urlStr = "";
  for (f in data) {
    if (lastAttr == f) {
      urlStr += f + "=" + data[f];
    } else {
      urlStr += f + "=" + data[f] + "&";
    }
  }
  console.log(urlStr)
  return urlStr;
}
module.exports = http;
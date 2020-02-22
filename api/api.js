const app = getApp()
const request = (url, options) => {
  return new Promise((resolve, reject) => {
    let baseUrl = app && app.globalData && app.globalData.baseUrl ? app.globalData.baseUrl : 'http://120.77.153.225:8080'
    uni.request({
      url: `${baseUrl}${url}`,
      method: options.method,
      data: options.data,
      header: {
        Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
      },
      success(req) {
        console.log(req)
        if (req.statusCode >= 200 && req.statusCode < 300) {
          resolve(req.data)
        } else if (req.statusCode === 403) {
          //token过期需重新登录
          uni.removeStorageSync('userInfo')
          uni.redirectTo({
            url: '/pages/login/login'
          })
          reject(req)
        } else {
          reject(req)
        }
      },
      fail(error) {
        console.error(error)
        if (error.statusCode === 403) {
          //token过期需重新登录
          uni.removeStorageSync('userInfo')
          uni.redirectTo({
            url: '/pages/login/login'
          })
        }
        reject(error)
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}

const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}
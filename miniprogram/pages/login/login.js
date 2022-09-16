//index.js
//获取应用实例
const app = getApp()
 
Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.hideTabBar({})
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    const db = wx.cloud.database()//打开数据库连接

    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      // wx.request({
      //   url: app.globalData.globalReqUrl +'/login/login', // 仅为示例，并非真实的接口地址
      //   method: 'post',
      //   data: {
      //     username: that.data.username,
      //     password: that.data.password
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
      //   },
      //   success(res) {
      //     if (res.data.code == "OK") {
      //       var unitName = res.data.data.User.unitName;
      //       var unitId = res.data.data.User.unitId;
      //       wx.setStorageSync('unitId', unitId);
      //       wx.setStorageSync('unitName', unitName);
      //       wx.switchTab({
      //         url: '../overviewData/realTimeData'
      //       })
      //     } else {
      //       wx.showToast({
      //         title: res.data.message,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   }
      // })
      
    // console.log(bookcar),

    //查询
    console.log(this.data.username)
    db.collection("Users").where({
      username:this.data.username
    }).get().then(res=>{
    console.log(res)
    if(res.data.length==1 && res.data[0].pwd==this.data.password){
      app.globalData.IsLogin=true
      wx.showToast({
                title: "登录成功",
                icon: 'none',
                duration: 2000
              })
              
              // console.log("是否登录"+app.IsLogin)
              //成功之后，再跳转回
              wx.setStorage({
                key:"islogin",
                data:"true"
              })
              console.log("写入成功")
                wx.navigateBack({
                  delta: 1,
                })
    }else{
      wx.showToast({
                title: "用户名或密码不正确",
                icon: 'none',
                duration: 2000
              })
    }
      
      //之后编写 需要利用返回数据的代码 看个人情况吧
  }).catch(err=>{
    console.log(err)//打印错误信息
  })
    // db.collection("user").add({
     
    //   data: {
    //     user:"5720181040",
    //     psw:"xfn123"
    //   }, success: res => {
    //     wx.showToast({
    //       title: '加入成功',
    //     })
    //   }, fail: err => {
    //     wx.showToast({
    //       title: '新增失败',
    //     })
    //   }
    // })

    }
  }
})
 
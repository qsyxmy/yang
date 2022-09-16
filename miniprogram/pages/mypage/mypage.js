const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},    
    islogin:'',
    hasUserInfo: false,        
    canIUse: wx.canIUse('button.open-type.getUserInfo'),  
    menuList:[
      
      {
        image:'/icon/icon_feedback.png',
        text:'意见反馈',
        icon:'/icon/icon_jiantou.png',
        url:'feedback/feedback'  
      },
      {
        image:'/icon/icon_aboutus.png',
        text:'关于我们',
        icon:'/icon/icon_jiantou.png',  
        url:'about-us/about-us'  
      }
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  todingdan(){
   
    if (!this.data.islogin) {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      return
    }else{
      wx.navigateTo({
        url: 'order/order',
      })
    }
   
  },
  exit(){
wx.setStorage({
  key:'islogin',
  data:'false'
})
this.onShow()
  },
  onLoad: function (options){
  this.setData({
    islogin:wx.getStorageSync('islogin')
  })
    if(app.globalData.userInfo){
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userInfo: app.globalData.userInfo,        
        hasUserInfo: true
      })
    }
  },
  // 登陆授权绑定事件
  getUserInfo: function (e) {
    var that=this
    const db = wx.cloud.database()
    if (!e.detail.userInfo) //用户拒绝
      return
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      avatarUrl: e.detail.userInfo.avatarUrl,
      userInfo: e.detail.userInfo, 
      hasUserInfo: true
    })
    //添加或更新用户
    db.collection('users').where({//先判断是否是第一次登录
      _openid: app.globalData.openid
    }).get().then(
      res => {
        console.log(res)
        if (res.data.length==0){//不存在则添加
          db.collection('users').add({
            data: {
              userInfo: e.detail.userInfo
            }
          })
        } else {//存在则更新
          db.collection('users').doc(res.data[0]._id).update({
            data: {
              userInfo: e.detail.userInfo
            },
          })
        }
      }
    )
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
    this.setData({
      islogin:wx.getStorageSync('islogin')
    })
    console.log(this.data.islogin)
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
    // wx.showNavigationBarLoading()
    // this.onLoad()
    // setTimeout(() => {
    //   wx.hideNavigationBarLoading()
    //   wx.stopPullDownRefresh()
    // }, 1000);
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
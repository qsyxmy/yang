// miniprogram/pages/mypage/about-us/about-us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[
      {
        label:'团队',
        value:'四个臭皮匠'
      },
      {
        label: '职业',
        value: '学生'
      },
      {
        label: 'QQ',
        value: '1063847577'
      },
      {
        label: '微信',
        value: 'HXQ13413862633'
      },
      {
        label: '电话',
        value: '13413862633'
      },
    ]
  },
  //电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '13413862633', 
    })
  },
  //经纬度定位
  getLocation: function (){
    wx.openLocation({
      latitude: 23.632,
      longitude: 113.679,
      name:"中山大学南方学院",
      address:"广州市从化区温泉大道882号",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
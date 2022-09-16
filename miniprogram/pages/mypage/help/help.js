// miniprogram/pages/mypage/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpList:[],

  },
  //切换页面
  help:function(e){
    const index = e.currentTarget.dataset.index;
    const params = encodeURIComponent(JSON.stringify(this.data.helpList[index]));//传参到detail
    wx.navigateTo({ 
      url: `help-detail/help-detail?params=${params}` 
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database(); 
    db.collection('help-detail').get({
      //如果查询成功的话    
      success: res => {
        //这一步很重要，给helpList赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          helpList: res.data
        })
      },
      fail:console.error
    })
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
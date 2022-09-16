const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    kind: ['剧情','喜剧','动作','爱情','科幻','动画','悬疑','惊悚','恐怖','犯罪'],
    list: [],
    sort: ""

  },
  //跳转详情页
  tap:(e) =>{
    wx.navigateTo({
      url: '../moviepage/movie-detail/movie-detail?id=' + e.currentTarget.dataset.id
    })
  },
  navtap: function(e){
    this.setData({
      current: e.currentTarget.dataset.current,
    });
    this.loadData(e.currentTarget.dataset.text);
  },
  //加载类型数据
  loadData: function(tag){
    wx.request({
      url: 'https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=&start=0&genres='+ tag,
      header: {'content-type':'json'},
      success: (res)=>{
        this.setData({
            list: res.data.data,
        });
      }
   });
  },
  onLoad: function (options) {
    // //定位
    // if (app.globalData.userLocation) {
    //   this.setData({
    //     city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
    //   })
    // } else {
    //   app.userLocationReadyCallback = () => {
    //     this.setData({
    //       city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
    //     })
    //   }
    // }
    this.loadData('剧情');
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    //console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
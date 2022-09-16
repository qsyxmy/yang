import{network} from "../../../utils/network.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onSearchInputEvent:function(event){
    var that =this
    var value = event.detail.value
    if(value!=''){
      network.getSearch({
        q:value,
        success: function(subjects){
          that.setData({
            subjects:subjects,
            msg:true
          })
        }
      })
    }else{
      that.setData({
        msg:false
      })
    }
    
  },
  //切换页面
  bindItem:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id='+id
    });

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
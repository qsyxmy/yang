var QRCode = require('../../../../utils/weapp-qrcode.js')
import rpx2px from '../../../../utils/rpx2px.js'
var qrcode;
// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    selectList:[],

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    //订单
    const orders = db.collection('orders').doc(options.id);
    orders.get({
      success: res => {
        this.setData({
          orders:res.data,
          selectList:res.data.selectList//座位
        })
        // console.log(res)
        this.qrcode()
      },
      fail:err =>{
        console.log(err)
      }
    })    
  },
 //二维码
 qrcode() {
    //console.log(this.data.text)
    const that = this
    qrcode = new QRCode('canvas', {
      //usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
      text: this.data.orders.text,
      //image: '/images/bg.jpg',
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: "#66CDAA",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    
    // 生成图片，绘制完成后调用回调
    qrcode.makeCode(that.data.text, () => {
      // 回调
      setTimeout(() => {
        qrcode.exportImage(function(path) {
          that.setData({
            imgsrc: path
          })
        })
      }, 200)
    })
  },
  confirmHandler: function(e) {
    let {
      value
    } = e.detail
    this.renderCode(value)
  },
  renderCode(value) {
    const that = this
    //console.log('make handler')
    qrcode.makeCode(value, () => {
      //console.log('make')
      qrcode.exportImage(function(path) {
        //console.log(path)
        that.setData({
          imgsrc: path
        })
      })
    })
  },
  inputHandler: function(e) {
    var value = e.detail.value
    this.setData({
      text: value
    })
  },
  tapHandler: function() {
    this.renderCode(this.data.text)
  },
  // 长按保存
  save: function() {
    //console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function(res) {
        //console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function(path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
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
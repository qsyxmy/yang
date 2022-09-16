const app = getApp()
var QRCode = require('../../../../../utils/weapp-qrcode.js')
import rpx2px from '../../../../../utils/rpx2px.js'
var qrcode;
// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)
const db =wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // image: '',
    // 用于设置wxml里canvas的width和height样式
    qrcodeWidth: qrcodeWidth,
    imgsrc: '',
    selectList:[],

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //刚进入页面随机先获取一个数
    this.createCode()
    this.qrcode()
    var selectList=JSON.parse(options.selectList)
    //console.log('888',selectList)
    this.setData({
      cinematitle:options.cinematitle,//电影院
      cinemaaddress:options.cinemaaddress,//电影院地址
      img:options.img,//电影海报 
      movietitle:options.movietitle,//电影名
      year:options.year,//年
      month:options.month,//月
      day:options.day,//日
      begin:options.begin,//开始时间
      end:options.end,//结束时间
      hall:options.hall,//影厅
      price:options.price,//单价
      totalprice:options.totalprice,//总票价
      selectList:selectList,//座位
      
    })
    //console.log(options)
  },
  
  //二维码
  qrcode() {
    //console.log(this.data.text)
    const that = this
    qrcode = new QRCode('canvas', {
      //usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
      //text: z.data.code,
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
    console.log('make handler')
    qrcode.makeCode(value, () => {
      console.log('make')
      qrcode.exportImage(function(path) {
        console.log(path)
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
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function(res) {
        console.log(res.tapIndex)
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
  //取票码
  createCode() {
    var code;
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 6;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    //将拼接好的字符串赋值给展示的code
    this.setData({
      text: code
    })
  },

  // 支付
  bindFooterTap: function() {//如果登录了则可以订票
    const banner = db.collection('orders')
    banner.add({
      data:{
        cinematitle:this.data.cinematitle,//电影院
        cinemaaddress:this.data.cinemaaddress,//电影院地址
        img:this.data.img,//电影海报 
        movietitle:this.data.movietitle,//电影名
        year:this.data.year,//年
        month:this.data.month,//月
        day:this.data.day,//日
        begin:this.data.begin,//开始时间
        end:this.data.end,//结束时间
        hall:this.data.hall,//影厅
        price:this.data.price,//单价
        totalprice:this.data.totalprice,//总票价
        selectList:this.data.selectList,//座位
        //imgsrc:this.data.imgsrc,//二维码
        text:this.data.text,//取票码
      }
    })
    .then(res=>{
      wx.showLoading({
        title: '正在付款',
      })
      setTimeout(function() {
        wx.hideLoading()
        wx.showToast({
          title: '订票成功',
          success:function(){
            setTimeout(function(){
              // 跳转到tabBar页面（在app.json中注册过的tabBar页面），同时关闭其他非tabBar页面。
              wx.switchTab({
                url: '../../../../cinemapage/cinemapage'
              })
            },1000)
          }
        })
      }, 500)
      //console.log(res)
      
    })
    .catch(err => {
      wx.showLoading({
        title: '正在付款',
      })
      setTimeout(function() {
        wx.hideLoading()
        wx.showToast({
          title: '订票失败',
        })
      }, 1000)
      //console.log(err)
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
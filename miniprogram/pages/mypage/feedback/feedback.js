const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    article:"",
    images_fileID:[],
    TopTips: '',
    dialogShow: false,
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
    imgbox: [],//选择图片
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 删除照片 
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    //console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数，这里设置了5张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          // src: tempFilePaths,
          imgbox: imgbox
        });
      }
    })
  },
  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },

  tapDialogButton(e) {
      this.setData({
          dialogShow: false,
          showOneButtonDialog: false
      })
  },
  tapOneDialogButton(e) {
      this.setData({
          showOneButtonDialog: false
      })
  },
  publishArticle:function(e){
    //时间，文章内容，图片
    var that=this;
    // var imageFiles=that.data.files;
    var imageFiles=that.data.imgbox;
    var date=new Date();
    var month = date.getMonth()+1
    var now=date.getFullYear()+"/"+month+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();    //得到此时的时间
    var title = e.detail.value.title;
    var article = e.detail.value.article;
    wx.cloud.init();
    const db = wx.cloud.database();    //初始化数据库
    //查询是否已经登录
    db.collection('users').where({
      _openid: app.globalData.openid
    }).get().then(
      res => {
        if (res.data.length==0){//如果还没有登录
          wx.showModal({
            title: '提示',
            content: '请先到“我的”页面进行登录',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../mypage',
                })  
                console.log('点击确认回调')
              } else {   
                console.log('点击取消回调')
              }
            }
          })
        }else{//如果登录了则可以提交反馈
          //先进行表单非空验证
          if (title == "") {//没有标题
            wx.showModal({
              title: '提示',
              content: '请输入反馈的标题',
              success: function (res) {
                if (res.confirm) {  
                  console.log('点击确认回调')
                } else {   
                  console.log('点击取消回调')
                }
              }
            })
          }else if (article == "") {//没有内容
            wx.showModal({
              title: '提示',
              content: '请输入反馈的内容',
              success: function (res) {
                if (res.confirm) {  
                  console.log('点击确认回调')
                } else {   
                  console.log('点击取消回调')
                }
              }
            })
          }else if(!this.data.imgbox.length){ //没有图片
            db.collection("feedback").add({
              data: {
                time: now,
                title:title,
                article:article
              },
              success(res) {
                wx.showLoading({
                  title: '正在提交',
                })
                setTimeout(function() {
                  wx.hideLoading()
                  wx.showToast({
                    title: '提交成功',
                    success:function(){
                      setTimeout(function(){
                        // 跳转到tabBar页面（在app.json中注册过的tabBar页面），同时关闭其他非tabBar页面。
                        wx.switchTab({
                          url: '../../mypage/mypage'
                        })
                      },1000)
                    }
                  })
                }, 500)
              },
              fail(res) {
                console.log(res)
              }
            })
          }else{//有图片时
            //for循环进行图片上传
            for (var i = 0; i < imageFiles.length; i++) {
              var imageUrl = imageFiles[i].split("/");
              var name = imageUrl[imageUrl.length - 1];        //得到图片的名称
              var images_fileID = that.data.images_fileID;    //得到data中的fileID
              let item = this.data.imgbox[i];
              // let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
              wx.cloud.uploadFile({
                cloudPath: "feedback/" + name,    //云存储路径
                // filePath: imageFiles[i],                          //文件临时路径
                filePath: item,  
                success: res => {
                  images_fileID.push(res.fileID);
                  that.setData({
                    images_fileID: images_fileID         //更新data中的 fileID
                  })
                  if (images_fileID.length === imageFiles.length) {
                      //对数据库进行操作
                    db.collection("feedback").add({
                      data: {
                        time: now,
                        title:e.detail.value.title,
                        article: e.detail.value.article,
                        images: imageFiles,
                        images_fileID: that.data.images_fileID
                      },
                      success(res) {
                        wx.showLoading({
                        title: '正在提交',
                      })
                      setTimeout(function() {
                        wx.hideLoading()
                        wx.showToast({
                          title: '提交成功',
                          success:function(){
                            setTimeout(function(){
                              // 跳转到tabBar页面（在app.json中注册过的tabBar页面），同时关闭其他非tabBar页面。
                              wx.switchTab({
                                url: '../../mypage/mypage'
                              })
                            },1000)
                          }
                        })
                      }, 500)
                      },
                      fail(res) {
                        console.log(res)
                      }
                    })
                  }
                },
              })
            }
          }
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
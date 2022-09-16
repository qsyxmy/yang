const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '正在定位...',
    lunboList:[],
    onshowList:[],
    comingsoonList:[],
    homeSelected:true,
    comingSelected:false,
    videoList:[],
    playIndex: null,
    

  },
  //选定的
  handleHomeSelected(e){
    this.setData({
      homeSelected: true,
      comingSelected: false
    })
  },
  //已选择的
  handleComingSelected(e) {
    this.setData({
      homeSelected: false,
      comingSelected: true
    })
  },
  //切换页面
  bindItem:function(event){
    wx.navigateTo({
      url: '../moviepage/movie-detail/movie-detail?id=' + event.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定位
    if (app.globalData.userLocation) {
      this.setData({
        city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
      })
      //console.log(app.globalData.selectCity.cityName)
      //正在上映
      wx.request({
        //api不稳定，随时会挂，所以在这里如果这个不行就换另一个，这里还有两个apikey，不行就换一下，也可以不用apikey，就是请求次数会减少
        //apikey=0b2bdeda43b5688921839c8ecb20399b，apikey=0df993c66c0c636e29ecbb5344252a4a
        //url: `https://douban.uieee.com/v2/movie/in_theaters?city=${app.globalData.selectapikey=0b2bdeda43b5688921839c8ecb20399bCity.cityName}&start=0&count=5`,此api已挂
        url:`https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
        header: {'content-type':'json'},
        success: (res)=>{
          //console.log(res)
          this.setData({
            onshowList: res.data.subjects,
          });
        },      
      });
      //即将上映
      wx.request({
        //url: `https://douban.uieee.com/v2/movie/coming_soon?city=${app.globalData.selectCity.cityName}&start=0&count=5`,此api已挂
        url:`https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
        header: {'content-type':'json'},
        success: (res)=>{
          //console.log(res)
          this.setData({
            comingsoonList: res.data.subjects,
          });
        }
      });
    } else {
      app.userLocationReadyCallback = () => {
        this.setData({
          city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
        })
        //正在上映
        wx.request({
          url:`https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
          header: {'content-type':'json'},
          success: (res)=>{
            //console.log(res)
            this.setData({
              onshowList: res.data.subjects,
            });
          },      
        });
        //即将上映
        wx.request({
          url:`https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
          header: {'content-type':'json'},
          success: (res)=>{
            //console.log(res)
            this.setData({
              comingsoonList: res.data.subjects,
            });
          }
        });
      }
      
    }
    const db = wx.cloud.database()
    //轮播图
    const lunbo = db.collection('lunbo')
    lunbo.get({
      success: res => {
        this.setData({
          lunboList:res.data
        })
      }
    })
    
    //视频
    const video = db.collection('video')
    video.get({
      success: res => {
        this.setData({
          videoList:res.data
        })
      }
    })
  },
  
  // 点击cover播放，其它视频结束
  videoPlay: function (e) {    
    var length = this.data.videoList.length
    var id = e.currentTarget.id
    var that = this
    that.setData({
      playIndex: id
    })
    console.log(length)
    setTimeout(fnPlay, 500)//渲染需要一定时间，给个延时
    function fnPlay() {        
      var videoContext = wx.createVideoContext('index' + that.data.playIndex)
      videoContext.play()
    }
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
  onShow() {
    //用于刷新页面
    if (app.globalData.selectCity) {
      this.setData({
        city: app.globalData.selectCity.cityName
      })
      this.onLoad()
    }
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
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000);
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
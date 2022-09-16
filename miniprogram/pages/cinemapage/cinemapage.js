const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '广州',
    cinemaList:[],
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定位
    // if (app.globalData.userLocation) {
    //   this.setData({
    //     city: '广州'
    //   })
    // } else {
    //   app.userLocationReadyCallback = () => {
    //     this.setData({
    //       city: '广州'
    //     })
    //   }
    // }
    console.log("onload进入")
    const db = wx.cloud.database()
    //影院信息获取
    const cinema = db.collection('cinema')
    cinema.get({
      success: res => {
        console.log('进入数据库成功')
        this.setData({
          cinemaList:res.data
        })
      }
    })
  },

  //切换页面
  bindItem:function(event){
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
                    url: 'cinema-detail/cinema-detail?id='+id
                  });
    // if (app.globalData.userLocation) {
    //   this.setData({
    //     city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
    //   })
    //   //网络请求豆瓣api——正在上映电影
    //   wx.request({
    //     //api不稳定，随时会挂，所以在这里如果这个不行就换另一个，这里还有两个apikey，不行就换一下，也可以不用apikey，就是请求数理会减少
    //     //apikey=0b2bdeda43b5688921839c8ecb20399b，apikey=0df993c66c0c636e29ecbb5344252a4a
    //     //url: `https://douban.uieee.com/v2/movie/in_theaters?city=${app.globalData.selectCity.cityName}&start=0&count=5`,此api已挂
    //     url:`https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
    //     header: {'content-type':'json'},
    //     success: (res)=>{
    //       //成功则把云数据库里的电影更新一遍。
    //       //因为豆瓣的电影会更新，所以这里每次跳转到影院详情页都先更新一遍电影信息
    //       //console.log(res)
    //       const db = wx.cloud.database()
    //       const cinema = db.collection('cinema').doc(id)
    //       cinema.update({
    //         data:{
    //           //电影名
    //           'movies.0.title':res.data.subjects[0].title,
    //           'movies.1.title':res.data.subjects[1].title,
    //           'movies.2.title':res.data.subjects[2].title,
    //           'movies.3.title':res.data.subjects[3].title,
    //           'movies.4.title':res.data.subjects[4].title,
    //           //电影海报
    //           'movies.0.img':res.data.subjects[0].images.small,
    //           'movies.1.img':res.data.subjects[1].images.small,
    //           'movies.2.img':res.data.subjects[2].images.small,
    //           'movies.3.img':res.data.subjects[3].images.small,
    //           'movies.4.img':res.data.subjects[4].images.small,
    //           //电影评分
    //           'movies.0.score':res.data.subjects[0].rating.average,
    //           'movies.1.score':res.data.subjects[1].rating.average,
    //           'movies.2.score':res.data.subjects[2].rating.average,
    //           'movies.3.score':res.data.subjects[3].rating.average,
    //           'movies.4.score':res.data.subjects[4].rating.average,
    //           //电影时长
    //           'movies.0.durations':res.data.subjects[0].durations[0],
    //           'movies.1.durations':res.data.subjects[1].durations[0],
    //           'movies.2.durations':res.data.subjects[2].durations[0],
    //           'movies.3.durations':res.data.subjects[3].durations[0],
    //           'movies.4.durations':res.data.subjects[4].durations[0],
    //         },
    //         success: res => {
    //           wx.navigateTo({
    //             url: 'cinema-detail/cinema-detail?id='+id
    //           });
    //         }
    //       })
    //     }
    //   });
    // }else {
    //   app.userLocationReadyCallback = () => {
    //     this.setData({
    //       city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
    //     })
    //     wx.request({
    //       url:`https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
    //       header: {'content-type':'json'},
    //       success: (res)=>{
    //         //console.log(res)
    //         const db = wx.cloud.database()
    //         const cinema = db.collection('cinema').doc(id)
    //         cinema.update({
    //           data:{
    //             //电影名
    //             'movies.0.title':res.data.subjects[0].title,
    //             'movies.1.title':res.data.subjects[1].title,
    //             'movies.2.title':res.data.subjects[2].title,
    //             'movies.3.title':res.data.subjects[3].title,
    //             'movies.4.title':res.data.subjects[4].title,
    //             //电影海报
    //             'movies.0.img':res.data.subjects[0].images.small,
    //             'movies.1.img':res.data.subjects[1].images.small,
    //             'movies.2.img':res.data.subjects[2].images.small,
    //             'movies.3.img':res.data.subjects[3].images.small,
    //             'movies.4.img':res.data.subjects[4].images.small,
    //             //电影评分
    //             'movies.0.score':res.data.subjects[0].rating.average,
    //             'movies.1.score':res.data.subjects[1].rating.average,
    //             'movies.2.score':res.data.subjects[2].rating.average,
    //             'movies.3.score':res.data.subjects[3].rating.average,
    //             'movies.4.score':res.data.subjects[4].rating.average,
    //             //电影时长
    //             'movies.0.durations':res.data.subjects[0].durations[0],
    //             'movies.1.durations':res.data.subjects[1].durations[0],
    //             'movies.2.durations':res.data.subjects[2].durations[0],
    //             'movies.3.durations':res.data.subjects[3].durations[0],
    //             'movies.4.durations':res.data.subjects[4].durations[0],
    //           },
    //           success: res => {
    //             wx.navigateTo({
    //               url: 'cinema-detail/cinema-detail?id='+id
    //             });
    //           }
    //         })
    //       }
    //     });
    //   }
    // }
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
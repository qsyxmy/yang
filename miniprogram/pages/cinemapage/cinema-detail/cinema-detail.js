// miniprogram/pages/cinemapage/cinema-detail/cinema-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    cinema:[],
    movies:[],
    time0:[],
    time1:[],
    time2:[],
    time3:[],
    time4:[],
    todaySelected:true,
    tomorrowSelected:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前设备的宽高
    wx.getSystemInfo({
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    //获取今天
    that.getDateStr(null,0)//-1是昨天，0是今天，1是明天，以此类推
    //获取明天
    that.getDateStr1(null,1)
    const db = wx.cloud.database();
    //影院信息获取
    const cinema = db.collection('cinema').doc(options.id);
    cinema.get({
      success: res => {
        this.setData({
          cinema:res.data,
          movies:res.data.movies,
          time0:res.data.movies[0].time,
          time1:res.data.movies[1].time,
          time2:res.data.movies[2].time,
          time3:res.data.movies[3].time,
          time4:res.data.movies[4].time,
          // id:options.id,
        })
      },
    })    
  },

  //切换页面
  bindItem:function(event){
    var con=wx.getStorageSync('islogin')
    console.log(con)
    if (con=='false') {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      return
    }
    var cinematitle = event.currentTarget.dataset.cinematitle;//电影院
    var cinemaaddress = event.currentTarget.dataset.cinemaaddress;//电影院地址
    var img = event.currentTarget.dataset.img;//电影海报 
    var movietitle = event.currentTarget.dataset.movietitle;//电影名
    var year = event.currentTarget.dataset.year;//年
    var month = event.currentTarget.dataset.month;//月
    var day = event.currentTarget.dataset.day;//日
    var begin = event.currentTarget.dataset.begin;//开始时间
    var end = event.currentTarget.dataset.end;//结束时间
    var hall = event.currentTarget.dataset.hall;//影厅
    var price = event.currentTarget.dataset.price;//单价
    // console.log(event.currentTarget.dataset)
    //带参跳转
    wx.navigateTo({
      url: '../cinema-detail/cinema-seat/cinema-seat?cinematitle='+cinematitle+"&cinemaaddress="+cinemaaddress+
            "&img="+img+"&movietitle="+movietitle+"&year="+year+"&month="+month+"&day="+day+
            "&begin="+begin+"&end="+end+"&hall="+hall+"&price="+price
    });
  },
  //选定的
  handleTodaySelected(e){
    this.setData({
      todaySelected: true,
      tomorrowSelected: false
    })
  },
  //已选择的
  handleTomorrowSelected(e) {
    this.setData({
      todaySelected: false,
      tomorrowSelected: true
    })
  },
  // 选项卡点击切换
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.currentTarget.dataset.current
      })
    }
  },
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    // this.orderShow()
  },
  //获取今天
  getDateStr: function(today, addDayCount) {
    var date;
    if(today) {
      date = new Date(today);
    }else{
      date = new Date();
    }
    date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
      var y = date.getFullYear();
      var m = date.getMonth() + 1;//获取当前月份的日期 
      var d = date.getDate();
      if(m < 10){
        m = '0' + m;
      };
      if(d < 10) {
        d = '0' + d;
      };
      this.setData({
        y:y,
        m:m,
        d:d,
      })
      // console.log( y + "-" + m + "-" + d)
      return y + "-" + m + "-" + d;
    },
    //获取明天
    getDateStr1: function(today, addDayCount) {
      var date;
      if(today) {
        date = new Date(today);
      }else{
        date = new Date();
      }
      date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
        var y1 = date.getFullYear();
        var m1 = date.getMonth() + 1;//获取当前月份的日期 
        var d1 = date.getDate();
        if(m1 < 10){
          m1 = '0' + m1;
        };
        if(d1 < 10) {
          d1 = '0' + d1;
        };
        this.setData({
          y1:y1,
          m1:m1,
          d1:d1,
        })
        // console.log( y1 + "-" + m1 + "-" + d1)
        return y1 + "-" + m1 + "-" + d1;
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
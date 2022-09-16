const app = getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordersList:[],
    list:[],
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false //“没有数据”的变量，默认false，隐藏 
  },
  skip: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData(this.skip)
  },
  //切换页面
  bindItem:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'order-detail/order-detail?id='+id
    });
    //console.log(id)
  },
  //加载数据
  getData:function(skip) {
    //云数据的请求
    // 调用云函数获取openid
    //显示订单列表
    const orders = db.collection('orders')
    orders.orderBy('year', 'desc')//先按年排序，年数越大越前，desc为降序，asc为升序
    .orderBy('month', 'desc')//再按月排序，月数越大越前
    .orderBy('day', 'desc')//最后按日排序，日数越大越前
    .skip(skip)
    .get({
      success:res => {
        if (res.data && res.data.length > 0) {
          this.skip+=20
          let list = this.data.ordersList.concat(res.data)
          // console.log('2',list)
          this.setData({
            ordersList: list, //获取数据数组 
            loadMore: false //把"上拉加载"的变量设为false，显示
          })
          // console.log('1',this.data.ordersList)
        }else{
          this.setData({
            loadAll: true, //把“没有数据”设为true，显示  
            loadMore: false //把"上拉加载"的变量设为false，隐藏  
          });
        }
      },
      fail(res) {
        console.log("请求失败", res)
        that.setData({
          loadAll: false,
          loadMore: false
        });
      }
    })
  
  },
  //退订
  delete:function(event){
    var that = this
    var id = event.currentTarget.dataset.id;
    //console.log(id)
    wx.showModal({
      title: '提示',
      content: '你确定要退订吗？',
      success: function (res) {
        if (res.confirm) {  
          console.log('点击确认回调')
          const db = wx.cloud.database();
          const orders = db.collection('orders').doc(id);
          orders.remove({
            success: res=>{
              wx.showLoading({
                title: '正在退订',
              })
              setTimeout(function(){
                wx.showToast({
                  title: '退订成功',
                  success:function(){
                    that.setData({
                      ordersList:[],//再次设空
                    })
                    that.getData(that.skip = 0)//skip重置为0
                  }
                })
              },1000)
            }
          })
        } else {   
          console.log('点击取消回调')
        }
      }
    })
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
    wx.showNavigationBarLoading()
    this.setData({
      ordersList:[],//再次设空
    })
    this.getData(this.skip = 0)//skip重置为0
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    console.log("上拉触底事件")
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      })
      //加载更多，这里做下延时加载
      setTimeout(function() {
        that.getData(that.skip)
      }, 1000)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
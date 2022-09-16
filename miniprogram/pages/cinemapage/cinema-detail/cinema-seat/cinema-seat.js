
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [],
    chooseFlag: false,
    price: null,
    totalprice: null,
    total: [],
    greenPrice: [
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}],
        [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11}, {num: 12}, {num: 13}, {num: 14}, {num: 15}]
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let total = this.data.total
    // console.log('1',total)
    // console.log('2',this.data.greenPrice)
    this.data.greenPrice.forEach((items, index) => {
      items.forEach((item, i) => {
        item.chooseFlag = false
        total.push(item)
        for (var i = 0; i < total.length; i++) {
            item.id = i
        }
      })
    })

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
    })
    // console.log(options.year)
  },
  tap(e) {
    //console.log(e)
    let row = e.currentTarget.dataset.row //行索引
    let x = e.currentTarget.dataset.row + 1 //行
    let col = e.currentTarget.dataset.col //列索引
    let y = this.data.greenPrice[row][col].num
    
    this.setData({
        greenPrice: this.data.greenPrice,
    })
    let selectList = this.data.selectList

    // console.log('123',this.data.selectList)//排座id数组
    // console.log('456',this.data.greenPrice)//全部座位
    // console.log('abc',e.currentTarget.dataset.row)//0-7行
    // console.log('efg',e.currentTarget.dataset.col)//0-14列
    if (selectList.length >= 3 && !this.data.greenPrice[row][col].chooseFlag) {
        wx.showModal({
            title: '提示',
            content: '抱歉，您只能选购3张影票！',
            showCancel: false
        })
        return
    }
    this.data.greenPrice[row][col].chooseFlag = !this.data.greenPrice[row][col].chooseFlag//选中就true，未选中就false
    let seat = {
        x: x,
        y: y,
        id: this.data.greenPrice[row][col].id,
        price: Number(e.currentTarget.dataset.price)
    }
    
    if (this.data.greenPrice[row][col].chooseFlag) {
        selectList.push(seat)
    } else {
        for (const key in selectList) {
            if (selectList[key].id == this.data.greenPrice[row][col].id) {
                selectList.splice(key, 1) // 删除未选中的
            }
        }
    }
    //console.log(this.data.greenPrice[row][col], "44")
    //console.log(selectList, "55")
    //算价钱
    let totalprice = 0;
    selectList.forEach((item, index) => {
        totalprice += item.price
    })
    this.setData({
        selectList: selectList,
        greenPrice: this.data.greenPrice,
        totalprice: totalprice,
    })
    //console.log(this.data.height, 3)
    //console.log(x + '排', y + '座')
    //console.log(this.data.selectList)
  },

  //删除
  delete(e) {
    //console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let selectList = this.data.selectList
    let greenPrice = this.data.greenPrice
    let id = selectList[index].id
    //console.log(id, 6)
    selectList.splice(index, 1)
    this.data.greenPrice.forEach((items, i) => {
        items.forEach((item, j) => {
            if (item.id == id) {
                item.chooseFlag = false
            }
        })
    })
    let totalprice = 0;
    selectList.forEach((item, index) => {
        totalprice += item.price
    })
    this.setData({
        totalprice,
        selectList,
        greenPrice
    })
  },

  //确认选座
  bindFooterTap: function(e) {
    var cinematitle = e.currentTarget.dataset.cinematitle;//电影院
    var cinemaaddress = e.currentTarget.dataset.cinemaaddress;//电影院地址
    var img = e.currentTarget.dataset.img;//电影海报 
    var movietitle = e.currentTarget.dataset.movietitle;//电影名
    var year = e.currentTarget.dataset.year;//年
    var month = e.currentTarget.dataset.month;//月
    var day = e.currentTarget.dataset.day;//日
    var begin = e.currentTarget.dataset.begin;//开始时间
    var end = e.currentTarget.dataset.end;//结束时间
    var hall = e.currentTarget.dataset.hall;//影厅
    var price = e.currentTarget.dataset.price;//单价
    var totalprice = e.currentTarget.dataset.totalprice;//总票价
    // json.stringify()方法是将一个JavaScript值(对象或者数组)转换为一个JSON字符串
    // json.parse() 方法将数据转换为 JavaScript 对象( 将字符串转成json对象)
    var selectList = JSON.stringify(this.data.selectList)//座位
    //console.log('57575',this.data.selectList)
    wx.navigateTo({
      url: '/pages/cinemapage/cinema-detail/cinema-seat/pay-order/pay-order?cinematitle='+cinematitle+"&cinemaaddress="+cinemaaddress+
          "&img="+img+"&movietitle="+movietitle+"&year="+year+"&month="+month+"&day="+day+"&begin="+begin+"&end="+end+"&hall="+hall+
          "&price="+price+"&totalprice="+totalprice+"&selectList="+selectList
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
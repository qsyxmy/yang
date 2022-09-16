//app.js
const QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'MH2BZ-4WTK3-2D63K-YZRHP-HM537-HHBD3'
});
App({
  
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env:'cloud1-4gddcmz1a0f79b3b',
        traceUser: true,
      })
    }
    this.initPage()
    this.globalData = {}
  },
  initPage(){
    // 获取用户授权信息信息,防止重复出现授权弹框
    wx.getSetting({
      success: res => {
        //已有权限直接获得信息，否则出现授权弹框
        if (res.authSetting['scope.userLocation']) {
          this.getUserLocation()
        } else {
          this.getUserLocation()
        }
      }
    })
  },
  //获取用户的位置信息
  getUserLocation() {
    wx.getLocation({
      //成功授权
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 使用腾讯地图接口将位置坐标转出成名称（为什么弹框出出现两次？）
        qqmapsdk.reverseGeocoder({
          location: {   //文档说location默认为当前位置可以省略，但是还是要手动加上，否则弹框会出现两次，手机端则出现问题
            latitude,
            longitude
          },
          success: (res) => {
            const cityFullname = res.result.address_component.city;
            const cityInfo = {
              latitude,
              longitude,
              cityName: cityFullname.substring(0, cityFullname.length - 1),
              status:1
            }
            this.globalData.userLocation = { ...cityInfo}   //浅拷贝对象
            this.globalData.selectCity = { ...cityInfo } //浅拷贝对象
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
            if (this.userLocationReadyCallback) {
              this.userLocationReadyCallback()
            }
          }
        })
      },
      fail:()=>{
        this.globalData.userLocation = {status:0}
        //防止当弹框出现后，用户长时间不选择，
        if (this.userLocationReadyCallback) {
          this.userLocationReadyCallback()
        }
      }
    })
  },
  globalData: {
    userLocation: null, //用户的位置信息
    selectCity: null, //用户切换的城市
    //url: 'https://douban.uieee.com'//此api已挂
  }
})

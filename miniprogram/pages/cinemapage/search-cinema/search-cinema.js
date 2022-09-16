const app = getApp();
Page({
  data: {
    value: '请输入影院名或地址',
    cinemaList:[],
    
  },

  onLoad() {
   
  },
  search(e){
    const value = e.detail.value
    if(value!=''){//判断输入框是否空
      const db = wx.cloud.database();
      const cinema = db.command
      db.collection('cinema').where(cinema.or([{//查询云数据库
          title: db.RegExp({//影院名字
            regexp: '.*' + value,
            options: 'i',
          })
        },
        {
          address: db.RegExp({//影院地址
            regexp: '.*' + value,
            options: 'i',
          })
        }
      ])).get({
        success: res => {
          this.setData({
            cinemaList:res.data,
            msg:true//显示内容
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }else{
      this.setData({
        msg:false//输入框为空，隐藏
      })
    }
  },
  //切换页面（与cinemapage.js的一样）
  bindItem:function(event){
    var id = event.currentTarget.dataset.id;
    //console.log(id)
    if (app.globalData.userLocation) {
      this.setData({
        city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
      })
      wx.navigateTo({
        url: '../cinema-detail/cinema-detail?id='+id
      });
      // wx.request({
      //   //api不稳定，随时会挂，所以在这里如果这个不行就换另一个，这里还有两个apikey，不行就换一下，也可以不用apikey，就是请求数理会减少
      //   //apikey=0b2bdeda43b5688921839c8ecb20399b，apikey=0df993c66c0c636e29ecbb5344252a4a
      //   //url: `https://douban.uieee.com/v2/movie/in_theaters?city=${app.globalData.selectCity.cityName}&start=0&count=5`,此api已挂
      //   url:`https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
      //   header: {'content-type':'json'},
      //   success: (res)=>{
      //     //console.log(res)
      //     const db = wx.cloud.database()
      //     const cinema = db.collection('cinema').doc(id)
      //     cinema.update({
      //       data:{
      //         //电影名
      //         'movies.0.title':res.data.subjects[0].title,
      //         'movies.1.title':res.data.subjects[1].title,
      //         'movies.2.title':res.data.subjects[2].title,
      //         'movies.3.title':res.data.subjects[3].title,
      //         'movies.4.title':res.data.subjects[4].title,
      //         //电影海报
      //         'movies.0.img':res.data.subjects[0].images.small,
      //         'movies.1.img':res.data.subjects[1].images.small,
      //         'movies.2.img':res.data.subjects[2].images.small,
      //         'movies.3.img':res.data.subjects[3].images.small,
      //         'movies.4.img':res.data.subjects[4].images.small,
      //         //电影评分
      //         'movies.0.score':res.data.subjects[0].rating.average,
      //         'movies.1.score':res.data.subjects[1].rating.average,
      //         'movies.2.score':res.data.subjects[2].rating.average,
      //         'movies.3.score':res.data.subjects[3].rating.average,
      //         'movies.4.score':res.data.subjects[4].rating.average,
      //         //电影时长
      //         'movies.0.durations':res.data.subjects[0].durations[0],
      //         'movies.1.durations':res.data.subjects[1].durations[0],
      //         'movies.2.durations':res.data.subjects[2].durations[0],
      //         'movies.3.durations':res.data.subjects[3].durations[0],
      //         'movies.4.durations':res.data.subjects[4].durations[0],
      //       },
      //       success: res => {
      //         wx.navigateTo({
      //           url: '../cinema-detail/cinema-detail?id='+id
      //         });
      //       }
      //     })
      //   }
      // });
    }else {
      app.userLocationReadyCallback = () => {
        this.setData({
          city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
        })
        wx.request({
          url:`https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${app.globalData.selectCity.cityName}&start=0&count=5`,
          header: {'content-type':'json'},
          success: (res)=>{
            //console.log(res)
            const db = wx.cloud.database()
            const cinema = db.collection('cinema').doc(id)
            cinema.update({
              data:{
                //电影名
                'movies.0.title':res.data.subjects[0].title,
                'movies.1.title':res.data.subjects[1].title,
                'movies.2.title':res.data.subjects[2].title,
                'movies.3.title':res.data.subjects[3].title,
                'movies.4.title':res.data.subjects[4].title,
                //电影海报
                'movies.0.img':res.data.subjects[0].images.small,
                'movies.1.img':res.data.subjects[1].images.small,
                'movies.2.img':res.data.subjects[2].images.small,
                'movies.3.img':res.data.subjects[3].images.small,
                'movies.4.img':res.data.subjects[4].images.small,
                //电影评分
                'movies.0.score':res.data.subjects[0].rating.average,
                'movies.1.score':res.data.subjects[1].rating.average,
                'movies.2.score':res.data.subjects[2].rating.average,
                'movies.3.score':res.data.subjects[3].rating.average,
                'movies.4.score':res.data.subjects[4].rating.average,
                //电影时长
                'movies.0.durations':res.data.subjects[0].durations[0],
                'movies.1.durations':res.data.subjects[1].durations[0],
                'movies.2.durations':res.data.subjects[2].durations[0],
                'movies.3.durations':res.data.subjects[3].durations[0],
                'movies.4.durations':res.data.subjects[4].durations[0],
              },
              success: res => {
                wx.navigateTo({
                  url: '../cinema-detail/cinema-detail?id='+id
                });
              }
            })
          }
        });
      }
    }
  },
  //取消
  close(){
    wx.switchTab({
      url: '../cinemapage',
    })
  },
})
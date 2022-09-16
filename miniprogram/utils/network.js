import{globalUrls} from "urls.js";
const network = {
  //电影详情
  getItemDetail:function(params){
    var id = params.id
    var url  =  globalUrls.movieDetail + id
    wx.request({
      url: url,
      success:function(res){
        var item = res.data
        if(params.success){
          params.success(item)
        }
      }
    })
  },
  //搜索电影
  getSearch:function(params){
    var q = params.q
    var url = globalUrls.searchUrl(q)
    wx.request({
      url: url,
      header: {'content-type':'json'},
      // header:{'Content-Type': 'application/xml'},
      // header: {'content-type': 'application/text'},
      // header: {'content-type':'application/json'},
      success :function(res){
        // console.log(res)
        var subjects = res.data.subjects
        if(params.success){
          params.success(subjects)
        }
      }
    })
  }
}
export{network}
const globalUrls = {
  //电影详情
  movieDetail:"https://m.douban.com/rexxar/api/v2/movie/",
  //电影搜索
  searchUrl:function(q){
    // return "https://api.douban.com/v2/movie/search?q="+q
    //此条api经常报400
    return "https://m.douban.com/rexxar/api/v2/search?type=movie&q="+q
    //此条api报404 apikey=0df993c66c0c636e29ecbb5344252a4a
    // return `https://douban.uieee.com/v2/movie/search?q=${q}&start=0&count=10`//此api已挂
  }
}
export{globalUrls}
//index.js
//获取应用实例

var app = getApp();

Page({
  data: {

  },

 

  //事件处理函数
  bindViewTap: function() {

    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      
      success:function(res){
        
       app.globalData.tommyImage=res;

        //注意这个tommyImage是可以直接使用即为定义的对象属性
        // 而且这个API不是异步处理的呀
        // 而且这个东西可以放到success里面，有意思

        wx.navigateTo({ url: '../second/second'});

      }

    })
  },

  onLoad: function () {

    
/*     wx.playBackgroundAudio({
     dataUrl: 'https://aihui1983.ml:45212/api/v3/file/get/2/%E5%88%80%E9%83%8E%20_%20%E4%BA%91%E6%9C%B5%20_%20%E7%8E%8B%E7%BF%B0%E4%BB%AA%20-%20%E7%88%B1%E6%98%AF%E4%BD%A0%E6%88%91.mp3?sign=TgeosiVv2PPI6ZD66jaw87cHNdl6QB3Wsk67h8Gl2YQ%3D%3A0',
    title: ' The music is playing',
     coverImgUrl: ''}); */


  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target);
    }
    return {
      title: '贴图小工具',
      path: '/pages/index/index'
    }
  },
  
})

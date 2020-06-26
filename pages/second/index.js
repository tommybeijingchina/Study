// pages/second/index.js


var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[ 
    "../imageset/animal1.png",
    "../imageset/animal2.png",
    "../imageset/animal3.png",
    "../imageset/animal4.png",
    "../imageset/animal5.png",
    "../imageset/animal6.png",
    "../imageset/animal7.png",
    "../imageset/animal8.png",
    "../imageset/animal9.png",
    "../imageset/animal10.png"

    ],


  },

  drawNewImage:function(tempindex){
    //定义drawNewImage函数

    var temp = app.globalData.tommyImage; //定义在app.js中的全局变量，那个图片的路径
    var tempArray = this.data.imageList;//模板图片路径数组，注意得是非网络图片


    var tommy = wx.createCanvasContext('tommyCanvas');//拿画纸。铺画布在wxml中定义
   
      tommy.drawImage(temp.tempFilePaths[0],0,0);//重划那个选择得图片
      tommy.drawImage(tempArray[tempindex],0,0);//划模板图片
      tommy.draw();//必须步骤！

  },


  imageTap:function(event){

      this.drawNewImage(event.currentTarget.dataset.index);
      //调用drawNewImage函数
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var temp = app.globalData.tommyImage;

      var tommy = wx.createCanvasContext('tommyCanvas');
      tommy.drawImage(temp.tempFilePaths[0],0,0);
      tommy.draw();

  },

  saveIt:function(){
    //定义那个保存图片得按钮，注意是调用两个API

    wx.canvasToTempFilePath({
    // 这是调用第一个，先将图片写入一个临时文件
      width: 300,
      height: 300,
      destWidth: 600,
      destHeight: 600,
      canvasId: 'tommyCanvas',
      success(res) {
        // canvasToTempFilePath函数得回调函数

          wx.saveImageToPhotosAlbum({
            //回调函数调用了第二个函数，正式写入文件
            filePath: res.tempFilePath,
            success:function(){
              //第二个函数得回调函数，显示成功
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
      }
    })

  },


})
// pages/second/index.js


var app = getApp();//获取全局变量
var getviewLH={};//容器的高和宽
var getpicLH={}; //图片的高和宽

//定义当前那个物件（在swiper里的）
var nowAnimal ={
  nowx:0,        //当前所在位置x，或者叫绘画点坐标x
  nowy:0,        //当前所在位置y，或者叫绘画点坐标y
  nowIndex:0,     //当前物件的序号
  delta_x:0,      //touchstart 时触点和绘画点间的x增量
  delta_y:0,      //touchstart 时触点和绘画点间的y增量

  scale:1,        //当前缩放比例

  startDist:1,    //使用catchtouchstart时两个手指开始的距离设置值
  endDist:1,      //使用catchtouchmove时两个手指结束移动时的距离设置值
};





// 核心思想是根据图片的尺寸（不变）和容器的尺寸（也不变），调整画布的尺寸
// 让图片能够成比例压缩至画布，画布有一个尺寸（宽或高）等于容器的尺寸


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[ 
    "../imageset/1.png",
    "../imageset/2.png",
    "../imageset/3.png",
    "../imageset/4.png",
    "../imageset/5.png",
    "../imageset/6.png",
    "../imageset/7.png",
    "../imageset/8.png",
    "../imageset/9.png",
    "../imageset/10.png",
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

    clickNumber:0,//点击的物件的序号
    canvasHeight:0,//在这里定义的，都是要回馈到wxml里面的
    canvasWidth:0,
  },


  //在指定的坐标点，按scale缩放比例往画布上画当前（now）图片
 
 
  drawAnimal:function(x,y){


    var temp = app.globalData.tommyImage; //定义在app.js中的全局变量，那个图片的路径
    var tempArray = this.data.imageList;//模板图片路径数组，注意得是非网络图片
    var tommy = wx.createCanvasContext('tommyCanvas');//拿画纸。铺画布在wxml中定义
   
    var scale = nowAnimal.scale;


        // console.log("stardist:",nowAnimal.startDist);
        // console.log("end:dist",nowAnimal.endDist);
        
        scale=scale+0.1*(nowAnimal.endDist-nowAnimal.startDist)/nowAnimal.startDist;

        // console.log("scale = ",scale);
        if (scale>3) scale = 3;
        if (scale<0.5 ) scale = 0.5;
        if (x>this.data.canvasWidth-100*scale)  x = this.data.canvasWidth-100*scale;
        if (y>this.data.canvasHeight-100*scale)  y = this.data.canvasHeight-100*scale;
        if (x<0) x=0;
        if (y<0) y=0;
        //上文中的100是小物件的默认设置值




      tommy.drawImage(temp.tempFilePaths[0],0,0,this.data.canvasWidth,this.data.canvasHeight);//重划那个选择得图片
      tommy.drawImage(tempArray[nowAnimal.nowIndex],x,y,100*scale,100*scale);//划模板图片
      tommy.draw();//必须步骤！

      nowAnimal.nowx=x;//新的x点
      nowAnimal.nowy=y;//新的y点
      nowAnimal.scale=scale;//放大比例重新设置为1；





  },

//点击图片模板的处理函数

  animalTap:function(event){

    var tempzzt = event.currentTarget.dataset.zzt;//这个zzt是个知识点

      //console.log(event); 

      this.setData({clickNumber:tempzzt});
      
      //console.log(this.data.clickNumber);

      
      nowAnimal.nowIndex = tempzzt;


      this.drawAnimal(0,0);


  },

  //获取容器和图片的尺寸，为调整画布尺寸做准备，获取的尺寸放入全局变量getpicLH中
  //和getviewLH
  
  getCanvasSize:function(){

        //获取容器的宽度和高度
   
        wx.createSelectorQuery().select('#editorId').
        boundingClientRect(function(tempLH){

            //getviewLH.width= tempLH.width;
            //getviewLH.height= tempLH.height;
            getviewLH = tempLH;

     
        }).exec();

        //获取由全局变量app.globalData.tommyImage.tempFilePaths[0]指定的图片得高度和宽度
        
        wx.getImageInfo({
          src: app.globalData.tommyImage.tempFilePaths[0],
          success:function(res){
            // console.log(res);
            //getpicLH.width=res.width;
            //getpicLH.height=res.height;
            //getpicLH.path=res.path;
            getpicLH=res;
           }
        });
  },


//根据全局变量getviewLH和getpicLH设置画布的尺寸，是画布和图片具有相同的纵横比

  setCanvasSize:function(){

      var tempH=0;//用于存放欲设置画布的高和宽
      var tempL=0;
  
 
      if(getpicLH.height/getpicLH.width>getviewLH.height/getviewLH.width){

          tempH=getviewLH.height;
          tempL=tempH*getpicLH.width/getpicLH.height;
      }else{

        tempL=getviewLH.width;
        tempH=tempL*getpicLH.height/getpicLH.width
      };

      //下面是关键的一步！

      this.setData({canvasHeight:tempH,
        canvasWidth:tempL});

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //根据全局变量app.globalData.tommyImage.tempFilePaths[0]确定的图片，获取改图片和容器大小，结果已放入当前页面全局变量

    this.getCanvasSize();//含有异步API，所以介个也是异步的，所以后续有个settimeout


      setTimeout(() => {//因为wx.createSelectorQuery()为异步处理函数，后续步骤延迟指定时间后启动
       
        

        this.setCanvasSize();//设置画布大小

        var temp = app.globalData.tommyImage;

        var tommy = wx.createCanvasContext('tommyCanvas');// 拿一张画纸

        //按照计算后的画布尺寸，画那个全局变量指定的图片，也就是主图片，或称为背景图片，
        tommy.drawImage(temp.tempFilePaths[0],0,0,this.data.canvasWidth,this.data.canvasHeight);
  
        tommy.draw();//确定！
  
      }, 300);
        
  },



  //当是单指点击时，onTouchStart的主要功能是获取touchstart事件时，animal当前位置与接触点之间的delta_x and delta_y;

  // 当是双指拉伸时，onTouchStart的主要功能计算两指之间开始时的距离
  //event.touches.length<=1 是单指，>1是双指

  onTouchStart:function(event){

  var tempx=0;
  var tempy=0;
  var x1=0,y1=0,x2=0,y2=0;

 



  //console.log("onTouchStart:",event);
    
  if(event.touches.length<=1){
 
      tempx=event.touches[0].pageX;
      tempy=event.touches[0].pageY;
      nowAnimal.delta_x = tempx-nowAnimal.nowx;
      nowAnimal.delta_y = tempy-nowAnimal.nowy;
  }else{

    // console.log(event);
    x1=event.touches[0].pageX;
    y1=event.touches[0].pageY;
    x2=event.touches[1].pageX;
    y2=event.touches[1].pageY;
   
    nowAnimal.startDist = this.dist(x1,y1,x2,y2);
    //console.log("nowAnimal.startDist",nowAnimal.startDist);
  }



},

//  catchtouchmove="onTouchMove"
onTouchMove:function(event){

  var tempx=0;
  var tempy=0;
  var x1=0,y1=0,x2=0,y2=0;


    
  if(event.touches.length<=1){
        tempx=event.touches[0].pageX-nowAnimal.delta_x;
        tempy=event.touches[0].pageY-nowAnimal.delta_y;

        this.drawAnimal(tempx,tempy);}
  else{

    // console.log(event);
    x1=event.touches[0].pageX;
    y1=event.touches[0].pageY;
    x2=event.touches[1].pageX;
    y2=event.touches[1].pageY;
    nowAnimal.endDist = this.dist(x1,y1,x2,y2);
    this.drawAnimal(nowAnimal.nowx,nowAnimal.nowy);
    //console.log("nowAnimal.endDist",nowAnimal.endDist);

  }
   


},
dist:function(x1,y1,x2,y2){



  var s=0;

  // s= sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

  s=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

    return(s);


},












  saveIt:function(){
    
    //定义那个保存图片得按钮，注意是调用两个API

    wx.canvasToTempFilePath({
    // 这是调用第一个，先将图片写入一个临时文件
      width:  getpicLH.width,
      height: getpicLH.height,
      destWidth:getpicLH.width ,
      destHeight: getpicLH.height,
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
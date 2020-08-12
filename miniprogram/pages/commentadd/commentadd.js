// miniprogram/pages/commentadd/commentadd.js



var filename ="tommy_";

Page({

  /**
   * 页面的初始数据
   */
  data: {

    showImageFlag:true,//显示窗口隐藏显示标志

    form:{    //当前表单
        tempFilePath:"",//图片文件临时路径
        comment:'',//评论内容

    },
  },


// 这个函数的重点是保存所选择图片的临时路径，并设置那个showImageFlag为false
  bindtapOnAdd:function(){

   var that = this;//this is very importance

    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      
      success:function(res){

        that.setData({
          showImageFlag:false,
          "form.tempFilePath":res.tempFilePaths[0]//保存图片临时路径
        });

      }

    });
  },


//保存输入内容到form.comment中
  onInputText:function(event){

       this.setData({"form.comment":event.detail.value});

  },

  getTimeString:function(){
    //返回yyyymmddhhmmss的字符串
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var sec = today.getSeconds();
    var msec = today.getMilliseconds();

    if(day<10) day= "0"+day;
    if(month<10) month = "0"+month;

    var tempfilename= ""+year+month+day+hour+minute+sec;

   // console.log(tempfilename);
     return tempfilename;

  },

  //点击保存按钮后的处理函数
  saveFileToCloudStorage:function(){

    var form = this.data.form;
    var that = this;
   

    //console.log("today = ",today);

    

    if(!this.data.form.tempFilePath ) {
        // tempFilePath 为空，取反后不为空
        //console.log(this.data.form.tempFilePath);
      wx.showToast({
        title: '请添加图片',
        icon:"none"
      });
      return;
    };

    if(!this.data.form.comment) {

        //console.log(this.data.form.comment);
        //如果评论为空，则返回

      wx.showToast({
        title: '请写点评论',
        icon:"none"
      });
      return;
    };
 
        filename =filename+this.getTimeString();
       
    
        // Date.now();


    // save file to cloud storage

    wx.cloud.uploadFile({
      cloudPath: filename,//file name
      filePath: form.tempFilePath, // 文件临时路径

      success: res => {
        
        that.saveToCloud(res.fileID);// save to clouddatabase 

        filename="tommy_";

        wx.navigateTo({
          url: '../list/list',
        });

      },
      fail: err => {
        // handle error
      }
    })

    
  },
    // 在saveFileToCloudStorage中被调用的文件
    // 把fileID 和comment 存往数据库


  saveToCloud:function(fileID){

    var form=this.data.form;

    wx.cloud.callFunction({

      // 需调用的云函数名
      name: 'cloudToDatabase',

      // 传给云函数的参数
      data: {
        fileIDforCloud: fileID,
        commentforCloud:form.comment
      },
      // 成功回调
      success:function(res){
        
         console.log("调用云函数成功返回");
      },
      fail:function(err){

        console.log("error")
      }
      

    });
















    //以下是学习云函数之前写的程序

    // var db = wx.cloud.database();//创建数据库实例


    // db.collection('testtable').add({
   
    //   data:{
    //     fileid:fileID,
    //     comment:form.comment
    //   }
    // })
    // .then(res => {
    //   // console.log("上传云端成功！")
    //     wx.showToast({
    //       title: '保存成功',
    //     })
    // })
    // .catch(console.error)


  },


  /**
   * 生命周期函数--监听页面加载
   */

  
  onLoad: function (options) {
    

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
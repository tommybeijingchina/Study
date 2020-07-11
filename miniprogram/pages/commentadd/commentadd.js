// miniprogram/pages/commentadd/commentadd.js


var number=0;
var filename ="tommyfile_";

Page({

  /**
   * 页面的初始数据
   */
  data: {

    showImageFlag:true,//显示窗口隐藏显示标志

    form:{
        tempFilePath:"",//图像文件临时路径
        comment:'',//评论内容

    },
  },



  bindtapOnAdd:function(){

   var that = this;//this is very 重要

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



  onInputText:function(event){

 this.setData({"form.comment":event.detail.value});

  },

  saveFileToCloud:function(){

    var form = this.data.form;
    var that = this;

    if(!this.data.form.tempFilePath ) {

      console.log(this.data.form.tempFilePath);

      wx.showToast({
        title: '请添加图片',
        icon:"none"
      });
      return;
      
    };

    if(!this.data.form.comment) {

        console.log(this.data.form.comment);

      wx.showToast({
        title: '请写点评论',
        icon:"none"
      });
      return;
    
    };




    
    filename =filename+Date.now()+"_"+number;
    number++;
    
   // Date.now();

    wx.cloud.uploadFile({
      cloudPath: filename,//filename
      filePath: form.tempFilePath, // 文件临时路径

      success: res => {
        
        that.saveToCloud(res.fileID);

        filename="tommyfile_";

      },
      fail: err => {
        // handle error
      }
    })

    
  },

  saveToCloud:function(fileID){

    var form=this.data.form;

    var db = wx.cloud.database();

     


    db.collection('testtable').add({
   
      data:{
        fileid:fileID,
        comment:form.comment
      }
    })
    .then(res => {
      // console.log("上传云端成功！")
        wx.showToast({
          title: '保存成功',
        })
    })
    .catch(console.error)


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
// miniprogram/pages/commentadd/commentadd.js



var filename ="tommy_";

// page方法的实参，是一个对象，这个对象的若干属性需要定义，这个定义的过程就是小程序的编程过程；


Page({

  /**
   * 页面的初始数据
   */
  data: {

    showAddFlagBox:true,//显示窗口隐藏显示标志

    form:{    //当前表单
        tempFilePath:"",//图片文件临时路径
        comment:'',//评论内容

    },
  },


// 这个函数的重点是保存所选择图片的临时路径，并设置那个showAddFlagBox为false
 
  bindtapOnAdd:function(){

   var that = this;//this is very importance


// 注意这个wx.chooseImage的实参也是对象，其中的sucess属性是特殊指定，sucess是关键字
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      
      success:function(res){

        console.log(res);

        // 执行数据绑定，这是在js和wxml中传递数据改变显示方式的方法
        // 注意下文中绑定数据的属性是用双引号括起来的
        
        that.setData({
          "showAddFlagBox":false,
          "form.tempFilePath": res.tempFilePaths[0]
        });

      }

    });
  },


//保存输入内容到form.comment中

  onInputTextArea:function(event){

       this.setData({
         "form.comment":event.detail.value
        });

  },


  getTimeString:function(){
    //返回yyyymmddhhmmss的字符串
    var today = new Date();//today是一个日期对象，而不是时间戳！

    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var sec = today.getSeconds();
    var msec = today.getMilliseconds();

    if(day<10) day= "0"+day;
    if(month<10) month = "0"+month;

    //后面这个""代表后续按字符串相加
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

    // save file to cloud storage

    wx.cloud.uploadFile({
      cloudPath: filename,          //file name
      filePath: form.tempFilePath,  // 文件临时路径

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



  
 


  },

  


})
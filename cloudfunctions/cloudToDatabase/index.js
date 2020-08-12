// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

var db = cloud.database();//

// 云函数入口函数
exports.main = async (event, context) => {

  // var timestamp = Date.parse(new Date());  

  // timestamp = timestamp / 1000;  

  // console.log("timestamp",timestamp);


  return new Promise ( function(resolve,reject){

    db.collection('testtable').add({

      data:{
        fileid:event.fileIDforCloud,
        comment:event.commentforCloud,
        mytime:new Date(),

      },
      // Date.now() 时间戳赋值
    success:function(res){
      resolve(res);
    },
    fail:function(err){

      reject(err);
    }
  });

  });
}

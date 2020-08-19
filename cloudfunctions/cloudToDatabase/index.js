
// 云函数入口文件

const cloud = require('wx-server-sdk');//固定格式

cloud.init();                          //固定格式

var db = cloud.database();             //这个应该是打开数据库的意思了

// 云函数入口函数
exports.main = async (event, context) => {

  

  return new Promise ( function(resolve,reject){

    db.collection('testtable').add({

      data:{
        fileid:     event.fileIDforCloud,
        comment:    event.commentforCloud,
        mytime:     new Date(),

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

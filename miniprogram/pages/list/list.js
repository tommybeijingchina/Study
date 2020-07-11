// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getFromDatabase();
  },

  getFromDatabase:function(){

    var that = this;



    console.log("enter......")

      var db = wx.cloud.database();

      db.collection('testtable').get({

          success:function(res){

            // console.log(res.data);
              that.setData({
                list:res.data,
              })

          }


      });

// setTimeout(() => {
//   console.log(that.data.list);

//   },300);

},




 

})
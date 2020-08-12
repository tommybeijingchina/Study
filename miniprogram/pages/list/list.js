// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [],
    tempmonth: [],
    tempdate: [],
    temphours: [],
    tempminutes: [],
    tempseconds: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getFromDatabase();
  },



  getFromDatabase: function () {

    var that = this;

    var db = wx.cloud.database(); //创建一个数据库实例

    db.collection('testtable').get({

      success: function (res) {

        var i = 0;

        var montharry = [];
        var datearry = [];
        var hoursarry = [];
        var minutesarry = [];
        var secondsarry = [];


        for (i = 0; i < res.data.length; i++) {

          montharry[i] = res.data[i].mytime.getMonth() + 1;

          datearry[i] = res.data[i].mytime.getDate();

          hoursarry[i] = res.data[i].mytime.getHours();

          minutesarry[i] = res.data[i].mytime.getMinutes();

          secondsarry[i] = res.data[i].mytime.getSeconds();

          console.log("for in month=", montharry[i]);
          console.log("for in date =", datearry[i]);
          console.log("for in hour=", hoursarry[i]);
          console.log("for in minute=", minutesarry[i]);
          console.log("for in second =", secondsarry[i]);

        }


        that.setData({
          list: res.data,
          tempmonth: montharry,
          tempdate: datearry,
          temphours: hoursarry,
          tempminutes: minutesarry,
          tempseconds: secondsarry,

        });


      },

      fail: function (err) {
        console.log(err);
      }

    });

  },






})
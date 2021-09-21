import { request } from "../../request/index.js";

Page({
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0,
        statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
        pb: 150,

    },
    Cates: [],
    onLoad: function(option) {

        // 获取本地存储的数据
        const Cates = wx.getStorageSync("cates")
        if (!Cates) {
            this.getCates();
        } else {
            if (Date.now() - Cates.time > 1000) {
                this.getCates();
            } else {
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
  
    },
    async getCates() {
        const res = await request({ url: "/categories" });
        this.Cates = res;
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })

    },
   
    handleItemTap(e) {
        
        // 获取索引
        // 给data中的currentIndex
        const { index } = e.currentTarget.dataset;
        console.log('e',e)
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop: 0,
        })
    }
})
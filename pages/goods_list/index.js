import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            },
        ],
        goodsList: []
    },
    QueryParams: {
        query: "",
        cid: "",
        pagenum: "",
        pagesize: "10"

    },
    totalPage: 1,


    onLoad: function(options) {
        this.QueryParams.cid = options.cid || "";
        this.QueryParams.query = options.query || "";
        this.getGoodslist();
        // handleTabsItemChange()
    },
    // 获取商品列表
    async getGoodslist() {
        const res = await request({ url: "/goods/search", data: this.QueryParams });
        const total = res.total
        this.totalPage = Math.ceil(total / this.QueryParams.pagesize)

        this.setData({
            // goodsList: res.goods
            // 拼接数组
            goodsList: [...this.data.goodsList, ...res.goods]
        })
    },
    handleTabsItemChange(e) {
        console.log(e);
        // 接受传递过来的参数
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({ tabs })
        console.log(getCurrentPages())
    },
    onReachBottom() {
        if (this.QueryParams.pagenum >= this.totalPage) {
            wx.showToast({
                title: '没有下一页数据'
            });
        } else {
            this.QueryParams.pagenum++;
            this.getGoodslist();
        }
    }
})
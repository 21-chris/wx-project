import { request } from "../../request/index.js";
Page({
    data: {
        orders: [],
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            },
            {
                id: 2,
                value: "待发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ]
    },
    onload(options) {
        console.log(options)
    },
    onShow(options) {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        console.log(currentPage.options);
        // 获取url上的type参数
        const { type } = currentPage.options;
        this.changetitleByIndex(type - 1);
        this.getOrders(type);

    },
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } });
        // this.setData({
        //     orders: res.orders
        // })
    },
    // 根据标题索引来激活选中标题数组
    changetitleByIndex(index) {
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({ tabs })

    },
    handleTabsItemChange(e) {
        console.log(e);
        // 获取被点击的标题索引
        const { index } = e.detail;
        this.changetitleByIndex(index)
            // 

    },
})
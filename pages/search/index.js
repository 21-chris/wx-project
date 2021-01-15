import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// 防抖，定义一个定时器
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        inputValue: ""
    },
    TimeId: -1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    handleInput(e) {

        const { value } = e.detail;

        // 检测合法性
        if (!value) {
            this.setData({
                goods: [],
                isFocus: false

            })
            return;
        }
        this.setData({
            isFocus: true
        })
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {

        }, 1000)
        this.qsearch(value)
    },
    async qsearch(query) {
        const res = await request({ url: "/goods/search", data: { query } })
        this.setData({
            goods: res.goods
        })

    },
    handleCancel() {
        this.setData({
            inputValue: "",
            isFocus: false,
            goods: []

        })
    }
})
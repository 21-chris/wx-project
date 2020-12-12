import { request } from "../../request/index.js";
Page({
    data: {
        swiperList: [],
        catesList: [],
        floorList: [],
    },

    onLoad: function(options) {
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();

    },
    getSwiperList() {
        request({ url: "/home/swiperdata" })
            .then(result => {
                this.setData({
                    swiperList: result.data.message
                })
            })
    },
    getCateList() {
        request({ url: "/home/catitems" })
            .then(result => {
                this.setData({
                    catesList: result.data.message
                })
            })
    },
    getFloorList() {
        request({ url: "/home/floordata" })
            .then(result => {
                this.setData({
                    floorList: result.data.message
                })
            })
    }
})
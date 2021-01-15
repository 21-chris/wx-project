import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        isCollect: false


    },
    goods_info: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        //拿到当前的页面栈
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        const { goods_id } = options;
        this.getGoodsDetail(goods_id)

    },
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
        this.goods_info = goodsObj;
        // 获取缓存中商品收藏的数组
        let collect = wx.getStorageSync("collect") || [];
        // 判断商品是否被收藏
        let isCollect = collect.some(v => v.goods_id === this.goods_info.goods_id);


        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                goods_introduce: goodsObj.goods_introduce,
                pics: goodsObj.pics,
            },
            isCollect
        })

    },
    handlePreviewImage(e) {
        // const pics = goodsObj.pics;
        const urls = this.goods_info.pics.map(v => v.pics_mid);
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls,
        });

    },
    handleCartAdd() {
        let cart = wx.getStorageSync("cart") || [];
        console.log(cart)

        let index = cart.findIndex(v => v.goods_id === this.goods_info.goods_id);
        if (index === -1) {
            this.goods_info.num = 1;
            this.goods_info.checked = true;
            cart.push(this.goods_info);

        } else {

            cart[index].num++;

        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1500,
            mask: true,

        });

    },
    handleCollect() {
        let isCollect = false;
        let collect = wx.getStorageSync('collect') || [];
        let index = collect.findIndex(v => v.goods_id === this.goods_info.goods_id);
        if (index !== -1) {
            collect.splice(index, 1);
            isCollect = false
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true,

            });
        } else {
            collect.push(this.goods_info);
            isCollect = true
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true,

            });
        }
        wx.setStorageSync("collect", collect);
        this.setData({
            isCollect
        })

    }


})
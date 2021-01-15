import regeneratorRuntime from '../../lib/runtime/runtime';

import { getSetting, chooseAddress, openSetting, showModel, showToast } from '../../utils/async.js';
import {} from '../../request/index.js';

Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0

    },
    onShow() {
        // 获取缓存中的收货信息
        const address = wx.getStorageSync("address");
        let cart = wx.getStorageSync("cart") || [];
        // 过滤后的购物车数组
        cart = cart.filter(v => v.checked)
        this.setData({ address });
        // this.setCart(checkCart);
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {

            totalPrice += v.num * v.goods_price;
            totalNum += v.num;

        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address

        })

    },
    async handleOrderpay() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/login/index',
            });
            return;
        }
        const header = { Authorization: token };
        const order_price = this.data.order_price;
        const consignee_addr = this.data.consignee_addr;
        let goods = [];
        cart.forEach(v => goods.push({
            goods_id: v.goods_id,
            goods_number: v.number,
            goods_price: v.goods_price,

        }))
        const orderParams = { order_price, consignee_addr, goods }
        const res = await request({ url: "/my/orders/create", method: "post", data: orderParams, header: header })
        console.log(res)
    }
})
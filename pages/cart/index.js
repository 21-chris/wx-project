import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModel, showToast } from '../../utils/async.js';

Page({
    data: {
        address: {},
        cart: [],
        // checked: true,
        allChecked: true,
        totalPrice: 0,
        totalNum: 0

    },
    onShow() {
        // 获取缓存中的收货信息
        const address = wx.getStorageSync("address");
        const cart = wx.getStorageSync("cart") || [];
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        this.setData({
            address
        });
        this.setCart(cart);
    },

    async handleChooseAddress() {
        try {
            const res1 = await getSetting();
            const scopeAddress = res1.authSetting["scope.address"];
            // 判断权限
            if (scopeAddress === false) {
                await openSetting();
            }

            let address = await chooseAddress();
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
            wx.setStorageSync("address", address);
        } catch (error) {
            console.log(error)
        }
    },
    async handleItemChange(e) {

        const goods_id = e.currentTarget.dataset.id;
        let { cart } = this.data;
        let index = cart.findIndex(v => v.goods_id === goods_id);
        cart[index].checked = !cart[index].checked;
        this.setCart(cart);

    },
    // 设置购物车状态同时重新计算 底部工具栏的数据 全选 全价格 购买的数据
    setCart(cart) {
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;

            } else {
                allChecked = false;
            }
        })
        allChecked = cart.length != 0 ? allChecked : false;
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked,

        })

        wx.setStorageSync("cart", cart);
    },
    handleitemAllcheck() {
        let { cart, allChecked } = this.data;
        allChecked = !allChecked;
        // console.log(this.data)
        cart.forEach(v => v.checked = allChecked);
        console.log(this.data)
        this.setCart(cart);
    },
    async handleitemNumEdit(e) {
        const { operation, id } = e.currentTarget.dataset;
        let { cart } = this.data;
        const index = cart.findIndex(v => v.goods_id === id);
        if (cart[index].num === 1 && operation === -1) {
            const res = await showModel({ content: "您是否要删除商品" });
            if (res.confirm) {
                cart.splice(index, 1);
                this.setCart(cart);
            }
        } else {
            cart[index].num += operation;
            this.setCart(cart);
            // console.log(cart)
        }
    },
    async handPay() {
        const { address, totalNum } = this.data;
        if (!address) {
            await showToast({ title: "您还没有选择收货地址" })
            return;

        }
        if (totalNum === 0) {
            await showToast({ title: "您还没有选择任何商品" })
            return;

        }
        wx.navigateTo({
            url: '/pages/pay/index',

        });
    }
})
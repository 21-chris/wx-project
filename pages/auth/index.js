import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/async.js';


Page({
    async handleGetUserInfo(e) {
        try {
            const { encryptedData, rawData, iv, signature } = e.detail;
            const { code } = await login();
            const loginparams = { encryptedData, rawData, iv, signature }
            const token = await request({ url: "/users/wxlogin", data: loginparams, method: "post" })
            wx.setStorageSync("token", token);
            wx.navigateBack({
                delta: 1
            });
        } catch (error) {
            console.log(error)
        }
    }
})
// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "体验问题",
                isActive: true
            },
            {
                id: 1,
                value: "商品,商家投诉",
                isActive: false
            },
        ],
        chooseImgs: [],
        textValue: ""
    },
    UpLoadImgs: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                console.log(result)
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
                })

            },
        });
    },
    handleRemoveImg(e) {
        const { index } = e.currentTarget.dataset;
        let { chooseImgs } = this.data;
        chooseImgs.splice(index, 1)
        this.setData({ chooseImgs })
    },
    handleTextInput(e) {
        this.setData({
            textValue: e.detail.value
        })

    },
    handleFormSumit() {
        const { textValue } = this.data;
        if (!textValue.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: 'none',

                mask: true,

            });
            return;
        }
        // 上传文件的api不支持多个文件同时上传，遍历数组，挨个上传
        // chooseImgs.forEach((v, i) => {
        //     wx.uploadFile({
        //         // 图片要上传到哪里
        //         url: '',
        //         // 被上传的文件的路径
        //         filePath: ,
        //         // 上传的文件的名称 后台来获取文件
        //         name: ,
        //         // 上传的文本信息
        //         formData: {},
        //         success: (result) => {

        //         },
        //         fail: () => {},
        //         complete: () => {}
        //     });
        // })

    }

})
// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件数据
    // 要接收的数据的名称
    tabs:{
      type:Array,
      value:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){

      const {index}=e.currentTarget.dataset;
      // 触发父组件中自定义事件，同时传递数据给 父组件

      this.triggerEvent("tabsItemChange",{index})
    },
    
  }
})

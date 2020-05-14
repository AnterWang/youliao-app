### uniapp搭建的小程序基础模版

#### 开始
```
yarn install
yarn run dev:<mp-weixin | mp-alipay>
```

##### 打包
```
yarn run build:<mp-weixin | mp-alipay>
是
```

#### 项目结构
```text
src
  |--api【统一存放小程序接口请求文件】
  |--components【基础组件】
  |--config【配置文件】
  |--lib【公共库】（or三方基础库）
  |--utils 业务公共代码
  |--pages【业务代码页面】
  |--plugin【插件】
  |--static【静态资源】
  |--store【vuex】
  |--App.vue
  |--main.js
  |--manifest.json
  |--uni.scss

```

### 安装方式

## npm install auto-scroll-vue

### 引入方式

## 1. main.js文件引入
```javascript
// main.js 
  import Vue from "vue";
  import autoScroll from "auto-scroll-vue";
  Vue.use(autoScroll);
 // index.vue 
  <template>
  <div class="container" v-autoscroll="{ speed: 1, direction:'vertical'}">
    <div>滚动内容</div>
    <div>滚动内容</div>
    <div>滚动内容</div>
    <div>滚动内容</div>
  </div> 
  </template> 
```

## 2. 直接页面组件引用
<!-- index.vue -->
```javascript
  <template>
  <div ref="container">
    <div>滚动内容</div>
    <div>滚动内容</div>
    <div>滚动内容</div>
    <div>滚动内容</div>
  </div> 
  </template> 
<script>
  import autoScroll from "auto-scroll-vue";
  export default {
    mounted() {
      // new autoScroll(el，direction,speed)
      new autoScroll(this.$refs.container,'vertical',1) // 参数 el，direction,speed
    }
  }
</script>
```
### 参数说明

 | 参数名称 | 参数说明 | 是否必传 | 默认值 | 可传值 |
 | --- | --- | --- | --- | --- |
 | el| 滚动的dom节点| 否 | 无 | |
 | direction| 滚动的方向| 是 | vertical | vertical,horizontal |
 | speed| 滚动速度（1:100px）| 否 | 1 | |

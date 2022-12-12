class autoScroll {
  constructor(node, direction = "vertical", speed = 1) {
    // node：dom节点，direction：滚动方向，speed:滚动速度 1:100px
    this.element = node;
    this.direction = direction;
    this.flags = false;
    this.speed = speed;
    this.lastTime = null;
    this.index = 0;
    this.lastRuntimeOffsetValue = 0;
    this.init();
    node.autoScroll = this;
  }
  init() {
    this.element.addEventListener("mouseover", this.handleMouseover);
    this.element.addEventListener("mouseout", this.handleMouseout);
    this.element.addEventListener("touchstart", this.handleMouseover);
    this.element.addEventListener("touchend", this.handleMouseout);
    this.judgeBoxCanScroll();
  }
  play() {
    this.handleMouseout()
  }
  stop() {
    this.handleMouseover()
  }
  judgeBoxCanScroll = () => {
    // 判断是否具有滚动条件

    this.lastTime = new Date().getTime(); // 保持鼠标进出时滚动距离一致

    if (this.direction === "vertical") {
      // 垂直方向
      let clientHeight = this.element.clientHeight;
      let scrollHeight = this.element.scrollHeight;
      this.tempScrollTop = this.element.scrollTop
      if (scrollHeight < clientHeight) {
        return;
      }
    } else {
      // 水平方向
      let clientWidth = this.element.clientWidth;
      let scrollWidth = this.element.scrollWidth;
      this.tempScrollLeft = this.element.scrollLeft

      if (scrollWidth < clientWidth) {
        return;
      }
    }

    if (this.timer) {
      cancelAnimationFrame(this.timer);
    }
    this.timer = requestAnimationFrame(this.boxMove);
  };
  boxMove = () => {

    let elapsed = 0; // 计算每次函数调用的时间间隔
    let offset = 0.1; // 1ms偏移量
    this.index++;
    let nowTime = new Date().getTime();

    if (this.lastTime === null) {
      this.lastTime = nowTime;
      elapsed = 0;
    } else {
      elapsed = nowTime - this.lastTime;
    }
    this.lastTime = nowTime;
    if (this.direction === "vertical") {
      let clientHeight = this.element.clientHeight;
      let scrollHeight = this.element.scrollHeight;
      let scrollTop = this.element.scrollTop;
      if (scrollTop !== this.tempScrollTop) {
        // 用来解决(疑似屏幕缩放不滚动)
        scrollTop = this.tempScrollTop
      }
      if (
        scrollHeight >
        clientHeight +
        scrollTop +
        this.speed * elapsed * offset +
        this.lastRuntimeOffsetValue
      ) {
        // scrollTop 不能赋值小数点
        let value =
          scrollTop +
          this.speed * elapsed * offset +
          this.lastRuntimeOffsetValue;
        this.element.scrollTop = Math.floor(value);
        this.tempScrollTop = Math.floor(value)
        this.lastRuntimeOffsetValue = value % 1;
      } else if (scrollHeight > clientHeight + scrollTop) {
        this.element.scrollTop = scrollHeight;
        this.tempScrollTop = scrollHeight
        this.lastRuntimeOffsetValue = 0;
      } else {
        this.element.scrollTop = 0;
        this.tempScrollTop = 0

      }
    } else {
      let clientWidth = this.element.clientWidth;
      let scrollWidth = this.element.scrollWidth;
      let scrollLeft = this.element.scrollLeft;
      if (scrollLeft !== this.tempScrollLeft) {
        // 用来解决(疑似屏幕缩放不滚动)
        scrollLeft = this.tempScrollLeft
      }
      if (
        scrollWidth >
        clientWidth +
        scrollLeft +
        this.speed * elapsed * offset +
        this.lastRuntimeOffsetValue
      ) {
        let value =
          scrollLeft +
          this.speed * elapsed * offset +
          this.lastRuntimeOffsetValue;
        this.element.scrollLeft = Math.floor(value);
        this.element.tempScrollLeft = Math.floor(value);
        this.lastRuntimeOffsetValue = value % 1;
      } else if (scrollWidth > clientWidth + scrollLeft) {
        this.element.scrollLeft = scrollWidth;
        this.element.tempScrollLeft = scrollWidth;
        this.lastRuntimeOffsetValue = 0;
      } else {
        this.element.scrollLeft = 0;
        this.element.tempScrollLeft = 0;
      }
    }

    this.timer = requestAnimationFrame(this.boxMove);
  };
  handleMouseover = () => {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    cancelAnimationFrame(this.timer);
  };
  handleMouseout = () => {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    this.timer1 = setTimeout(() => {
      this.judgeBoxCanScroll();
    }, 500);
  };
}
autoScroll.install = function (Vue) {
  if (this.installed) {
    return;
  }
  this.installed = true;
  Vue.directive("autoScroll", {
    inserted(el, binding) {
      let { speed = 1, direction = "vertical" } = binding.value || {};
      new autoScroll(el, direction, speed);
    },
  });
};
export default autoScroll;

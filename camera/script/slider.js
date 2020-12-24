class Slider {
    constructor(opts = {}) {
        this.el = opts.el;
        this.value = opts.value || 0;
        this.slider = null;
        this.render();
        this.bindEvt();
        return {
            val: (value) => {
                this.val(value);
            }
        }
    }
    //渲染DOM
    render() {
        const container = document.querySelector(this.el);
        const slider = document.createElement('div');
        this.slider = slider;
        // 有缺省值则赋值
        if (this.value) {
            this.val(this.value);
        }
        slider.className = "slider";
        // 轨道无需获取焦点
        slider.innerHTML = (
            `<button class="slider-track" tabindex="-1"></button>
	  <button class="slider-thumb"></button>`
        );
        if (container) {
            container.appendChild(slider);
        } else {
            // 若未指定容器，则在 body 标签最后插入 DOM 结构
            document.body.appendChild(slider);
        }
    }
    // 监听事件
    bindEvt() {
        const {
            slider
        } = this;
        const slider_track = slider.querySelector('.slider-track');
        const slider_thumb = slider.querySelector('.slider-thumb');
        let readymMove = false;
        const startHandle = e => {
            if (e.target === slider_thumb) {
                e.stopPropagation();
                readymMove = true;
            }
        }
        const moveHandle = e => {
            if (readymMove) {
                this.computeVal(e);
            }
        }
        const endHandle = () => {
            readymMove = false
        };

        slider.addEventListener('click', e => {
            if (e.target == slider_track) {
                this.computeVal(e);
            }
        }, false)
        slider.addEventListener('keydown', evt => {
            if (document.activeElement === slider_thumb) {
                let value = this.val();
                evt = (evt) ? evt : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象  
                var keyCode = evt.keyCode ? evt.keyCode : evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值  

                switch (keyCode) {
                    //左箭头
                    case 37:
                        value--;
                        break;
                        //右箭头
                    case 39:
                        value++;
                        break;
                }
            }
            this.val(value);
        }, false)
        // 开始拖动
        slider.addEventListener('touchstart', startHandle);
        slider.addEventListener('mousedown', startHandle);

        // 拖动中
        window.addEventListener('touchmove', moveHandle);
        window.addEventListener('mousemove', moveHandle);

        // 拖动结束
        window.addEventListener('touchend', endHandle);
        window.addEventListener('mouseup', endHandle);
    }
    // 计算当前值
    computeVal(e) {
        const {
            width,
            left
        } = this.slider.getBoundingClientRect();
        let posX = e.pageX;
        if (e.touches) { // 兼容移动端
            posx = e.touches[0].pageX;
        }
        this.val((posX - left) / width * 100);
    }
    // 赋值 & 取值
    val(value) {
        if (typeof value === 'undefined') {
            // 返回当前 slider 的 percent 值
            return this.slider.style.getPropertyValue('--percent').trim() || 0;
        }
        if (isNaN(value)) { // 过滤非法字符
            return;
        }
        if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 1000;
        }
        this.slider.style.setProperty('--percent', value);
    }
}
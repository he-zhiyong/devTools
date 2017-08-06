/**
 * Created by LeezhI on 2017/3/12.
 */

/*
 *   延迟执行函数
 * */
var _timer = {};

function delay_exec(fn, wait) {
    if (_timer['id']) {
        window.clearTimeout(_timer['id']);
        delete _timer['id'];
    }

    return _timer['id'] = window.setTimeout(function() {
        fn();
        delete _timer['id'];
    }, wait);
}

/*封装拖曳事件*/
(function() {
    var triggerArea;
    var targetDiv;

    //triggerD 触发区域 ； targetD 移动主体
    function Drag(triggerD, targetD) {
        triggerArea =  typeof triggerArea == 'Object' ? triggerArea : document.getElementById(triggerD);
        targetDiv = typeof targetDiv == 'Object' ? targetDiv : document.getElementById(targetD);
        this.init();
    }

    Drag.prototype = {
        constructor: Drag,

        init: function() {
            // 初始时需要做些什么事情
            this.setDrag();
        },
        setDrag: function(){
            /*浏览器可见区域最大高、宽*/
            var maxHeight = document.body.clientHeight;
            var maxWidth = document.body.clientWidth;

            //获取底部栏的高度
            var bottomPanel = Ext.getCmp("taskPanelSouthIconsGroup");
            var bottomHeight = bottomPanel != undefined ? bottomPanel.getHeight() : 50;
            bottomHeight += 20; //拖到底部时 高出底部栏一部分 以便于再次移动

            /*鼠标按下事件*/
            triggerArea.onmousedown = function(e) {
                var e = e || window.event;
                var that = targetDiv;
                var diffX = e.clientX - that.offsetLeft;
                var diffY = e.clientY - that.offsetTop;

                /*鼠标移动事件*/
                document.onmousemove = function(e) {
                    var e = e || window.event;
                    var left = e.clientX - diffX;
                    var top = e.clientY - diffY;

                    /*全屏状态下禁止移动*/
                    var targetWindow = Ext.getCmp(targetDiv.id);
                    if (targetWindow.getWidth() == maxWidth &&
                        targetWindow.getHeight() == (maxHeight - bottomHeight + 20)) {
                        /*如果当前是最大化 移动直接缩小窗口*/
                        targetWindow.restore();
                        targetWindow.center();
                    }

                    // if (left < -that.offsetWidth/2) {
                    //     left =  -that.offsetWidth/2;
                    // } else if (left > maxWidth - that.offsetWidth/2) {
                    //     left = maxWidth - that.offsetWidth/2;
                    // }
                    //窗体距上的偏移量加上窗体自身的高度不超过浏览器的高度
                    if (top < 0) {
                        top = 0;
                    } else if (top > maxHeight - bottomHeight) {
                        top = maxHeight - bottomHeight;
                    }
                    //设置窗体移动后的偏移量
                    // that.style.transform = 'translate('+ left +'px, '+ top +'px)';
                    // that.style.webkitTransform = 'translate('+ left +'px, '+ top +'px)';
                    that.style.left = left + 'px';
                    that.style.top = top + 'px';
                }

                //鼠标放开事件
                document.onmouseup = function() {
                    //清空事件
                    this.onmousemove = null;
                    this.onmouseup = null;
                }
                return false;
            }
        }
    }

    window.Drag = Drag;
})();

Ext.jquery = {};
var retryTimes = 5;
Ext.ux.defaultUploadUrl = "/libdirect";
Ext.ux.defaultDataUrl = "/libinterview";
Ext.ux.defaultUploadUrl = "http://localhost/editor/lcs/php/proxy.php";
Ext.ux.defaultDataUrl = "http://localhost/editor/lcs/php/proxy.php";

Ext.ux.getBookCover = function(src) {
    if (src && src.trim()) {
        src = "http://192.168.1.115/jthq?fid=" + encodeURIComponent(src);
        //		$.ajaxSettings.async = false;
        $.ajax({
            url: src,
            complete: function(response) {
                if (response.status == "200") {
                    src = src;
                } else {
                    src = "";
                }
            }
        });
        //$.ajaxSettings.async = true;
    } else {
        src = "";
    }
    return src;
}
//修改label，给label添加handler
Ext.ux.Label = Ext.extend(Ext.form.Label, {
    afterRender: function() {
        Ext.BoxComponent.superclass.afterRender.call(this);
        if (this.resizeEl) {
            this.resizeEl = Ext.get(this.resizeEl)
        }
        if (this.positionEl) {
            this.positionEl = Ext.get(this.positionEl)
        }
        this.boxReady = true;
        Ext.isDefined(this.autoScroll) && this.setAutoScroll(this.autoScroll);
        this.setSize(this.width, this.height);
        if (this.x || this.y) {
            this.setPosition(this.x, this.y)
        } else {
            if (this.pageX || this.pageY) {
                this.setPagePosition(this.pageX, this.pageY)
            }
        }
        if (this.handler) {
            this.mon(this.el, "click", this.handler, this);
        }
    },
    setText: function(a, b) {
        var c = b === false;
        this[!c ? "text" : "html"] = a;
        delete this[c ? "text" : "html"];
        if (this.rendered) {
            this.el.dom.innerHTML = b !== false ? Ext.util.Format.htmlEncode(a) : a;
            this.setWidth("auto");
            this.ownerCt.doLayout();
        }
        return this
    }
});
Ext.reg("label", Ext.ux.Label);
Ext.ux.formatDate = function(dateString) {
    if (!dateString) {
        var newDate = new Date();
        return newDate;
    }
    var newDate = new Date();
    var yearNum = Number(dateString.substr(0, 4));
    var monthNum = Number(dateString.substr(4, 2)) - 1;
    var dayNum = Number(dateString.substr(6, 2));
    var hourNum = Number(dateString.substr(8, 2));
    var minuteNum = Number(dateString.substr(10, 2));
    var secondNum = Number(dateString.substr(12, 2));
    newDate.setFullYear(yearNum);
    newDate.setMonth(monthNum);
    newDate.setDate(dayNum);
    newDate.setHours(hourNum);
    newDate.setMinutes(minuteNum);
    newDate.setSeconds(secondNum);
    return newDate;
}
Ext.jquery.importJson = function(params) {
    var name = params.name;
    if (!params.data) {
        params.data = {};
    }
    if (!totalJson[name]) {
        var url = "/enum/" + params.name + ".json";
        $.ajaxSettings.async = false;
        var tmpObj = $.getJSON(url);
        $.ajaxSettings.async = true;
        totalJson[name] = JSON.parse(tmpObj.responseText);
    }
}

/*生成时间+随机数*/
function curDateTime() {
    var d = new Date();
    var year = d.getFullYear() + "";
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();
    var Hours = d.getHours(); //获取当前小时数(0-23)
    var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
    var Seconds = d.getSeconds(); //获取当前秒数(0-59)
    var curDateTime = year;
    if (month > 9) {
        curDateTime = curDateTime + month;

    } else {
        curDateTime = curDateTime + "0" + month;
    }
    if (date > 9)
        curDateTime = curDateTime + date;
    else
        curDateTime = curDateTime + "0" + date;
    if (Hours > 9)
        curDateTime = curDateTime + Hours;
    else
        curDateTime = curDateTime + "0" + Hours;
    if (Minutes > 9)
        curDateTime = curDateTime + Minutes;
    else
        curDateTime = curDateTime + "0" + Minutes;
    if (Seconds > 9)
        curDateTime = curDateTime + Seconds;
    else
        curDateTime = curDateTime + "0" + Seconds;
    return curDateTime;
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
        return rnd;
    }
}　
function getTimeAndRandom() {
    return curDateTime() + RndNum(4);
}

//对象深复制
function deepCopy(sub, sup) {
    for (var key in sup) {
        if (typeof sup[key] === 'object') {
            sub[key] = {};
            deepCopy(sub[key], sup[key]);
        } else {
            sub[key] = sup[key];
        }
    }
}

Ext.jquery.getData = function(params, url, type, fn) {
    var maxTimes = retryTimes;
    var currentTimes = 0;

    if (!type) {
        contentType = "application/json";
    }
    if (!url) {
        url = Ext.ux.defaultDataUrl;
        url = "./php/proxy.php";
    }

    /*
    	tid 放到 params，然后将params加密md5
    	md5 再放到checksum里面
    	checksum 最后再放回params里面
    */
    var random = getTimeAndRandom();
    // var paramsTemp = {};
    // deepCopy(paramsTemp, params);
    // paramsTemp.tid = random;
    params.tid = random;
    // var checksum = md5(paramsTemp);
    // params.checksum = checksum;

    var data = JSON.stringify(params);
    (function sendRequest() {
        $.ajax({
            type: "post",
            url: url,
            data: data,
            contentType: "application/json",
            success: function(data) {
                var tmpResult = JSON.parse(data);
                if (!tmpResult.success && typeof(tmpResult.data) == "string") {
                    console.log(tmpResult.data);
                    switch (tmpResult.data) {
                        case "service need login":
                        case "invalid session id":
                            location.reload();
                            break;
                        default:
                            var connectionParams = {
                                SERVICE_ID: [99, 0, 0],
                                offset: 0,
                                rows: 20,
                                target: params.SERVICE_ID
                            }
                            var connectionUrl = url;
                            var connectionType = "";
                            var connectionFn = function(connectionData) {
                                var connectionResult = JSON.parse(connectionData);
                                if (!connectionResult.success || !connectionResult.data) {
                                    window.location.href = "./notice1.html";
                                }
                            }
                            Ext.jquery.getData(connectionParams, connectionUrl, connectionType, connectionFn);
                            break;
                    }
                }
                fn(data);
            },
            complete: function(XMLHttpRequest, status) {},
            error: function(r, e) {
                console.log(r);
                var reg = new RegExp("^50");
                if (reg.test(r.status) && currentTimes < maxTimes) {
                    currentTimes++;
                    sendRequest();
                }
            }
        });
    })();
}

Ext.jquery.getDataSync = function(params, url, type, fn) {
    var maxTimes = retryTimes;
    var currentTimes = 0;
    if (!type) {
        contentType = "application/json";
    }
    if (!url) {
        url = Ext.ux.defaultDataUrl;
    }

    /*
    	tid 放到 params，然后将params加密md5
    	md5 再放到checksum里面
    	checksum 最后再放回params里面
    */
    var random = getTimeAndRandom();
    // var paramsTemp = {};
    // deepCopy(paramsTemp, params);
    // paramsTemp.tid = random;
    params.tid = random;
    // var checksum = md5(paramsTemp);
    // params.checksum = checksum;

    var data = JSON.stringify(params);

    (function sendRequest() {
        $.ajax({
            type: "post",
            url: url,
            data: data,
            async: false,
            contentType: "application/json",
            success: function(data) {
                var tmpResult = JSON.parse(data);
                if (!tmpResult.success && typeof(tmpResult.data) == "string") {
                    console.log(tmpResult.data);
                    switch (tmpResult.data) {
                        case "service need login":
                        case "invalid session id":
                            location.reload();
                            break;
                        default:
                            var connectionParams = {
                                SERVICE_ID: [99, 0, 0],
                                offset: 0,
                                rows: 20,
                                target: params.SERVICE_ID
                            }
                            var connectionUrl = url;
                            var connectionType = "";
                            var connectionFn = function(connectionData) {
                                var connectionResult = JSON.parse(connectionData);
                                if (!connectionResult.success || !connectionResult.data) {
                                    window.location.href = "./notice1.html";
                                }
                            }
                            Ext.jquery.getData(connectionParams, connectionUrl, connectionType, connectionFn);
                            break;
                    }
                }
                fn(data);
            },
            complete: function(XMLHttpRequest, status) {},
            error: function(r, e) {
                console.log(r);
                var reg = new RegExp("^50");
                if (reg.test(r.status) && currentTimes < maxTimes) {
                    currentTimes++;
                    sendRequest();
                }
            }
        });
    })();
}

Ext.jquery.uploadData = function(params, url, type, fn) {
    if (!type) {
        contentType = "application/json";
    }
    if (!url) {
        url = Ext.ux.defaultDataUrl;
    }
    var data = JSON.stringify(params);
    $.ajax({
        type: "post",
        url: url,
        timeout: 1000,
        async: false,
        data: data,
        contentType: "application/json",
        success: function(data) {
            var tmpResult = JSON.parse(data);
            if (!tmpResult.success && typeof(tmpResult.data) == "string") {
                var errorCode = tmpResult.data;
                switch (errorCode) {
                    case "service need login":
                    case "invalid session id":
                        location.reload();
                        break;
                    default:
                        console.log(errorCode);
                        break
                }
            }
            fn(data);
        },
        complete: function(XMLHttpRequest, status) {
            console.log(XMLHttpRequest);
            console.log(status);
            if (status == "timeout") {
                alert("请求超时");
            }
        },
        error: function(r, e) {
            if (e == "timeout") {
                alert("请求超时");
            }
        }
    });
}

// 用于与php交互，获取所需要执行的js代码
Ext.ux.getPageData = function(params, url, fn) {
    var fnName = params.pageName;
    if (totalArgs[fnName] && typeof(eval(fnName)) == "function" && fnName == "123") {
        if (fn) {
            fn();
        }
    } else {
        if (!url) {
            url = "php/getPageString.php";
        }
        $.ajax({
            type: 'get',
            url: url,
            data: params,
            success: function(response) {
                var getData = JSON.parse(response);
                var resultData = getData.jsString;
                window.eval(resultData);
                if (fn) {
                    fn();
                }
            }
        })
    }
};
// 用于直接通过java获取必要的业务数据 目前先使用php发起http请求的方式。
Ext.ux.getData = function(params, url, method, fn) {
    if (!url) {
        url = "./php/getData.php";
    }
    if (!method) {
        method = "POST";
    }
    Ext.Ajax.request({
        method: method,
        url: url,
        params: params,
        success: function(response) {
            var getData = Ext.decode(response.responseText);
            fn(getData);
        }
    });
};
Ext.ux.addContextMenu = function(obj) {
    var tmpMenu = Ext.getCmp(obj.contextMenu);
    var tempId = obj.id;
    if (tmpMenu) {
        obj.el.on("contextmenu", function(e) {
            e.stopEvent();
            if (tmpMenu.items) {
                tmpMenu.showAt(e.getXY());
                tmpMenu.targetId = tempId;
            }
        }, this);
    } else {
        obj.el.on("contextmenu", function(e) {
            e.stopEvent();
        }, this);
    }
};

//居中显示菜单（相对父容器）
Ext.ux.showMenuCenter = function(menuId) {
    var menu = Ext.getCmp(menuId);
    var menuWidth = Ext.getCmp(menuId).getWidth();
    var menuHight = Ext.getCmp(menuId).getHeight();
    var fatherWidth = Ext.getCmp(menuId).ownerCt.getWidth();
    var fatherHeight = Ext.getCmp(menuId).ownerCt.getHeight();
    var fatherPosition = Ext.getCmp(menuId).ownerCt.getPosition();
    var menuPositionX = fatherPosition[0] + (fatherWidth - menuWidth) / 2;
    var menuPositionY = fatherPosition[1] + (fatherHeight - menuHight) / 2;
    menu.showAt([menuPositionX, menuPositionY]);
};


// 点击菜单（一级菜单）
Ext.ux.addClickMenu = function(obj, position) {
    var tmpMenu = Ext.getCmp(obj.clickMenu);
    if (tmpMenu) {
        obj.el.on("click", function(e) {
            e.stopEvent();
            if (tmpMenu.items) {
                switch (position) {
                    case "":
                        tmpMenu.showAt(e.getXY());
                        break;
                    case "down":
                        var tmpPosition = obj.getPosition();
                        tmpPosition[1] = tmpPosition[1] + obj.getHeight();
                        tmpMenu.showAt(tmpPosition);
                        break;
                }
            }
        }, this);
    }
};
//Ext.ux.addClickMenu = function(obj,position) {
//	var tmpMenu = Ext.getCmp(obj.clickMenu);
//	if(tmpMenu) {
//		obj.on({
//			"afterrender":function(){
//				this.el.on("click", function(e) {
//					e.stopEvent();
//					if(tmpMenu.items) {
//						switch(position){
//							case "":
//								tmpMenu.showAt(e.getXY());
//								break;
//							case "down":
//								var tmpPosition = obj.getPosition();
//								tmpPosition[1] = tmpPosition[1]+obj.getHeight();
//								tmpMenu.showAt(tmpPosition);
//								break;
//						}
//					}
//				}, this);
//			}
//		})
//
//	}
//};
// 一级菜单所属的菜单。
Ext.ux.addMenu = function(obj) {
        var tmpMenu = Ext.getCmp(obj.clickMenu);
        if (tmpMenu) {
            obj.menu = tmpMenu;
        }
    }
    // 给指定的组件obj添加左键点击事件
Ext.ux.addClickFn = function(obj) {
    var tmpFn = obj.clickFn;
    if (obj.clickFn) {
        if (obj.el) {
            obj.el.on("click", function(e) {
                e.stopEvent();
            }, this);
            if (!obj.clickNum) {
                obj.clickNum = 1;
                obj.mon(obj.el, "click", obj.clickFn, obj);
            }
        }
    }
}
Ext.ux.addDblClickFn = function(obj) {
    var tmpFn = obj.clickFn;
    if (obj.dblClickFn) {
        if (obj.el) {
            obj.el.on("dblclick", function(e) {
                e.stopEvent();
            }, this);
            if (!obj.clickNum) {
                obj.clickNum = 1;
                obj.mon(obj.el, "dblclick", obj.dblClickFn, obj);
            }
        }
    }
}
Ext.ux.fitBodyArgs = function(args) {
    var bodyHeight = document.body.clientHeight;
    var bodyWidth = document.body.clientWidth;
    var standard = window.screen.width;
    var proportion = bodyWidth / standard;
    if (args.width) {
        args.width = args.width * proportion;
    }
    if (args.height) {
        args.height = args.height * proportion;
    }
    return args;
}
Ext.ux.fitArgs = function(args) {
        var screenHeight = window.screen.height;
        var screenWidth = window.screen.width;
        var standard = 1920;
        var proportion = screenWidth / standard;
        if (args.width) {
            args.width = args.width * proportion;
        }
        if (args.height) {
            args.height = args.height * proportion;
        }
        return args;
    }
    // 针对不同的布局，进行的修改，用于渲染容器组件
Ext.ux.layoutScript = function(obj, args) {
    switch (args.parent.args.layout) {
        case "border":
            Ext.getCmp(args.parent.id + obj.region + "Panel").add(obj);
            switch (obj.region) {
                case "center":
                    break;
                case "north":
                case "south":
                    Ext.getCmp(args.parent.id + obj.region + "Panel").setHeight(obj.height);
                    break;
                case "west":
                case "east":
                    Ext.getCmp(args.parent.id + obj.region + "Panel").setWidth(obj.width);
                    Ext.getCmp(obj.id).setHeight(Ext.getCmp(args.parent.id + obj.region + "Panel").getHeight());
                    break;
            }
            break;
        default:
            Ext.getCmp(args.parent.id).add(obj);
            break;
    }
    Ext.getCmp(args.parent.id).doLayout();
};
// 针对不同的布局，进行的修改，用于添加子组件使用
Ext.ux.layoutArgs = function(args) {
    switch (args.layout) {
        // 边界式
        case "border":
            args.items = [{
                id: args.name + "northPanel",
                baseCls: "",
                region: "north",
                layout: "absolute",
                height: 0,
            }, {
                id: args.name + "southPanel",
                baseCls: "",
                region: "south",
                layout: "absolute",
                height: 0,
            }, {
                id: args.name + "westPanel",
                baseCls: "",
                region: "west",
                layout: "absolute",
                width: 0,
            }, {
                id: args.name + "eastPanel",
                baseCls: "",
                region: "east",
                layout: "absolute",
                width: 0,
            }, {
                id: args.name + "centerPanel",
                baseCls: "",
                region: "center",
                layout: "fit",
            }]
            break;
        default:
            break;
    }
    //	args = Ext.ux.fitArgs(args);
    return args;
};

Ext.ux.CellSelectionModel = Ext.extend(Ext.grid.CellSelectionModel, {
    handleMouseDown: function(b, d, a, c) {
        if (c.button !== 0 || this.isLocked()) {
            return
        }
        var e = b.view.scroller.dom;
        var f = $(c.target).parents();
        if ($.inArray(e, f) > 0) {
            this.select(d, a);
        }
    },
});
Ext.ux.RowSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {
    handleMouseDown: function(b, d, a, c) {
        if (c.button !== 0 || this.isLocked()) {
            return
        }
        var e = b.view.scroller.dom;
        var f = $(c.target).parents();
        if ($.inArray(e, f) > 0) {
            return
        }
        this.select(d, a);
    },
    handleMouseDown: function(d, i, h) {
        if (h.button !== 0 || this.isLocked()) {
            return
        }
        var e = d.view.scroller.dom;
        var f = $(h.target).parents();
        if ($.inArray(e, f) <= 0) {
            return
        }
        var a = this.grid.getView();
        if (h.shiftKey && !this.singleSelect && this.last !== false) {
            var c = this.last;
            this.selectRange(c, i, h.ctrlKey);
            this.last = c;
            a.focusRow(i)
        } else {
            var b = this.isSelected(i);
            if (h.ctrlKey && b) {
                this.deselectRow(i)
            } else {
                if (!b || this.getCount() > 1) {
                    this.selectRow(i, h.ctrlKey || h.shiftKey);
                    a.focusRow(i)
                }
            }
        }
    },
})

function importWaiting() {
    var params = {
        SERVICE_ID: [25, 10, 1098],
        importId: totalData["importId"]
    }
    var url = "";
    var type = "";
    var tmpFn = function(data) {
        var result = JSON.parse(data);
        console.log(result);
        if (result.data == null || result.data.importResult == null) {
            alert("上传失败,返回数据为空");
            return false;
        } else if (result.data.importResult == "all_success") {
            var importTmpCount = Number(result.data.importFailCount) + Number(result.data.importSuccessCount);
            Ext.MessageBox.updateProgress(1);
            Ext.MessageBox.hide();
            alert("上传成功,导入数据共" + importTmpCount + "条");
            Ext.getCmp("interviewSubscriptionContentImportCancel").el.dom.click();
            Ext.getCmp("interviewMenuSubscriptionSearchPanelSureBtn").el.dom.click();
            Ext.getCmp("interviewSubscriptionGrid").store.load();
        } else if (result.data.importResult != "importing") {
            var importCount = result.data.importCount;
            var importSuccessCount = result.data.importSuccessCount;
            var importFailCount = result.data.importFailCount;
            alert("上传失败,导入数据共" + importCount + "条。成功" + importSuccessCount + "条,失败" + importFailCount + "条");
        } else {
            var importTmpCount = Number(result.data.importFailCount) + Number(result.data.importSuccessCount);
            var percent = Number(importTmpCount) / Number(result.data.importCount)
            Ext.MessageBox.updateProgress(percent, parseInt(percent * 100) + "%");
            setTimeout("importWaiting()", 3000);
        }
    }
    Ext.jquery.getData(params, url, type, tmpFn);
}

Ext.onReady(function() {
    Ext.getDoc().on("contextmenu", function(e) {
        e.stopEvent();
    });

    if (document.addEventListener) {
        document.addEventListener("keydown", maskBackspace, true);
    } else {
        document.attachEvent("onkeydown", maskBackspace);
    }

    function maskBackspace(event) {
        var event = event || window.event; //标准化事件对象
        var obj = event.target || event.srcElement;
        var keyCode = event.keyCode ? event.keyCode : event.which ?
            event.which : event.charCode;
        if (keyCode == 8) {
            if (obj != null && obj.tagName != null && (obj.tagName.toLowerCase() == "input" ||
                    obj.tagName.toLowerCase() == "textarea")) {
                event.returnValue = true;
                if (Ext.getCmp(obj.id)) {
                    if (Ext.getCmp(obj.id).readOnly) {
                        if (window.event)
                            event.returnValue = false; //or event.keyCode=0
                        else
                            event.preventDefault(); //for ff
                    }
                }
            } else {
                if (window.event)
                    event.returnValue = false; // or event.keyCode=0
                else
                    event.preventDefault(); //for ff
            }
        }
    }


    var map = new Ext.KeyMap(document, [{
        key: [116], // F5
        fn: function() {},
        stopEvent: true,
        scope: this
    }, {
        key: [122], // F11
        fn: function() {},
        stopEvent: true,
        scope: this
    }, {
        key: [123], // F12
        fn: function() {},
        stopEvent: true,
        scope: this
    }, {
        key: [37, 39, 115], //方向键左,右,F4
        alt: true,
        fn: function() {},
        stopEvent: true,
        scope: this
    }, {
        key: [82], // ctrl + R
        ctrl: true,
        fn: function() {},
        stopEvent: true,
        scope: this
    }]);
    map.enable();
});

Ext.override(Ext.Window, {
    afterShow: function(b) {
        if (this.isDestroyed) {
            return false
        }
        this.proxy.hide();
        this.el.setStyle("display", "block");
        if (this.showFn) {
            this.showFn();
        } else {
            this.el.show();
        }
        if (this.maximized) {
            this.fitContainer()
        }
        if (Ext.isMac && Ext.isGecko2) {
            this.cascade(this.setAutoScroll)
        }
        if (this.monitorResize || this.modal || this.constrain || this.constrainHeader) {
            Ext.EventManager.onWindowResize(this.onWindowResize, this)
        }
        this.doConstrain();
        this.doLayout();
        if (this.keyMap) {
            this.keyMap.enable()
        }
        this.toFront();
        this.updateHandles();
        if (b && (Ext.isIE || Ext.isWebKit)) {
            var a = this.getSize();
            this.onResize(a.width, a.height)
        }
        this.onShow();
        this.fireEvent("show", this)
    },
    fitContainer: function() {
        var a = this.container.getViewSize(false);
        if (Ext.getCmp("taskPanelSouthMain")) {
            a.height = a.height - Ext.getCmp("taskPanelSouthMain").getHeight();
        }
        this.setSize(a.width, a.height);
    }
});
/* msgAlarm(args) 警告弹窗函数
 * 警告参数args 中 提供的参数有
 * 1、type			警告的类型，默认为normal:
 * 							normal	正常 2s
 * 							warn	警告 5s
 * 							error	错误 5s
 * 2、delayTime		警告的持续时间，默认为  毫秒为单位
 * 3、text			警告的显示文本，默认" "
 * 4、align			警告的文本居中类型，默认为center:
 * 							center	居中
 * 							left	左对齐
 * 							right	右对齐
 * 5、labelCls		label的基本cls，默认值为 alarmMsgNormal
 * 6、labelStyle		label的基本样式，默认值为""
 * 7、layout			window的layout，默认值为fit
 * 8、windowCls
 * 9、windowStyle
 * 10、showCompId	window展示的位置
 * 11、showRegion 展示的相对位置
 * 							top		顶部
 * 							bottom	底部
 * ?备用的buttons
 *
 * 结构为   window(layout:"fit") + label(cls 控制 label的样式)
 */
function msgAlarm(args) {
    var defaultArgs = {
        height: 44,
        type: "normal",
        delayTime: 3000,
        text: " ",
        align: "center",
        labelStyle: "",
        labelCls: "alarmMsgFontNormal",
        layout: {
            type: "hbox",
            align: "stretch"
        },
        windowCls: "",
        windowStyle: "",
        showCompId: "",
        showRegion: "bottom"
    };
    if (!args.showCompId) {
        return "";
    }
    args = Ext.applyIf(args, defaultArgs);
    if (!Number(args.delayTime)) {
        args.delayTime = defaultArgs.delayTime;
    }
    if (args.windowCls) {
        args.windowCls = "";
    }
    switch (args.type) {
        case "normal":
            args.windowCls = args.windowCls + " " + "alarmMsgBgNormal";
            break;
        case "warn":
            args.windowCls = args.windowCls + " " + "alarmMsgBgWarn";
            break;
        case "error":
        default:
            args.windowCls = args.windowCls + " " + "alarmMsgBgError";
            break;
    }
    var msgAlarmWindow = new Ext.Window({
        baseCls: "",
        shadow: false,
        closable: false,
        maximizable: false,
        minimizable: false,
        resizable: true,
        autoScroll: false,
        layout: args.layout,
        delayTime: args.delayTime,
        cls: args.windowCls,
        style: args.windowStyle,
        width: args.width,
        height: args.height,
        showCompId: args.showCompId,
        showRegion: args.showRegion,
        items: [{
            xtype: "label",
            flex: 1,
            margins: "12 0 12 0",
            text: args.text,
            cls: args.labelCls,
            style: args.labelStyle,
        }],
        showFn: function() {
            var params = {
                easing: "easeOut",
                duration: 0.5,
                block: false,
                concurrent: true,
                remove: false,
                useDisplay: true,
                scope: this.el,
            }
            this.el.slideIn("t", params);
            this.el.fadeIn(params);
        },
        slideOut: function() {
            var thisEl = this.el;
            var params = {
                easing: "easeOut",
                duration: 0.5,
                block: false,
                concurrent: true,
                remove: false,
                useDisplay: true,
                scope: thisEl,
                callback: function() {
                    if (Ext.getCmp(this.id)) {
                        Ext.getCmp(this.id).hide();
                    }
                }
            }
            this.el.slideOut("t", params);
            this.el.fadeOut(params);
        },
        listeners: {
            beforeshow: function(thisWindow) {
                if (this.showCompId && Ext.getCmp(this.showCompId)) {
                    var targetComp = Ext.getCmp(this.showCompId);
                    var position = targetComp.getPosition();
                    switch (this.showRegion) {
                        case "top":
                            position[1] = position[1];
                            break;
                        case "bottom":
                        default:
                            position[1] = position[1] + targetComp.getHeight();
                            break;
                    }
                    this.setPosition(position);
                    this.setWidth(targetComp.getWidth());
                } else {
                    return false;
                }
            },
            show: function(thisWindow) {
                this.slideOut.defer(this.delayTime, this);
            },
            hide: function() {
                this.destroy();
            }
        }
    });

    msgAlarmWindow.show(this);
}
function appendDomData(id,data,templeate,fn) {
    $.ajax({
        url: "./php/getTemplate.php",
        data: {templateName:templeate},
        type: "GET",
        dataType:"json",
        success: function (result){
            if(result.success){
                appendDom(result.data.templateString)
            }else{
                console.log(result.error.msg)
            }
        },
        error:function() {
            console.log("模板数据请求错误！")
        }
    })
    function appendDom(domStr) {
        var newDiv = new Ext.XTemplate(domStr)
        newDiv.append(id,data)
        if (fn) {
            fn();
        }
    }
}
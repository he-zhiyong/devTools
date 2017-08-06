function RepeatWindow(args) {
    var defaultArgs = {
        iconClass:"bookDetailIconImage",
        taskPanelId:"taskPanelSouthIconsGroup"
    };
    Ext.applyIf(args,defaultArgs);

    var self;
    if($("div[id^='bookDetailWindow_']").length == 0){
        args.id = "bookDetailWindow_1";
    }
    else{
        args.id = "bookDetailWindow_" + (parseInt($("div[id^='bookDetailWindow_']").last()[0].id.split("_")[1].split("-")[0])+1);
    }
    // args.id = args.name;
    args = Ext.ux.layoutArgs(args);
    if(args.autoSize){
        args = Ext.ux.fitArgs(args);
    }

    var defaultListener={
        "activate":function(){
            if(this.taskPanelIconId&&Ext.getCmp(this.taskPanelIconId)){
                Ext.getCmp(this.taskPanelIconId).selected(true);
            }
        },
        "deactivate":function(){
            if(this.taskPanelIconId&&Ext.getCmp(this.taskPanelIconId)){
                Ext.getCmp(this.taskPanelIconId).selected(false);
            }
        },
        "destroy":function(){
            if(this.taskPanelIconId&&Ext.getCmp(this.taskPanelIconId)){
                Ext.getCmp(this.taskPanelIconId).destroy();
            }
        },
        "afterrender":function(){
            var thisComp= this;
            thisComp.DD = new Ext.Window.DD(this);
            thisComp.DD.setHandleElId("");
            var url = "";
            var params = {
                pageName:"taskPanelIcon"
            };
            var tableId = thisComp.id;
            var tmpFn = function(){
                var tmpArgs = {};
                Ext.apply(tmpArgs,totalArgs["taskPanelIcon"]);
                tmpArgs.rowNum = 0;
                tmpArgs.tableId = tableId;
                tmpArgs.iconClass = args.iconClass;
                tmpArgs.windowId = thisComp.id;
                taskPanelIcon(tmpArgs,{},args.taskPanelId);
            }
            Ext.ux.getPageData(params,url,tmpFn);

            /*resize when 1028*768*/

            if(window.screen.width == 1024 &&
                window.screen.height == 768){
                this.setWidth(750);
                this.setHeight(550);
            }
        }
    }
    Ext.applyIf(args.listeners, defaultListener);

    self = new Ext.Window(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    return self;
};
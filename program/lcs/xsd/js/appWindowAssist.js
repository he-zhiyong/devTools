function AppWindowAssist(args) {
    var defaultArgs = {
        baseCls:"",
        shadow:false,
        closable:false,
        maximizable:false,
        minimizable:false,
        resizable:true,
        autoScroll:true,
        autoSize:true,
        draggable:true,
        layout:{
            type:"vbox",
            align:"stretch",
        }
    };
    Ext.applyIf(args,defaultArgs);
    var self;
    args.id = args.name;
    args = Ext.ux.layoutArgs(args);
    if(args.autoSize){
        args = Ext.ux.fitArgs(args);
    }

    var listeners = args.listeners;
    args.listeners={
        "beforerender":function(){
            var url = "";
            var params = {
                pageName:"taskPanelIcon"
            };
            var tableId = this.id;
            var tmpFn = function(){
                var tmpArgs = {};
                Ext.apply(tmpArgs,totalArgs["taskPanelIcon"]);
                tmpArgs.rowNum = 0;
                tmpArgs.tableId = tableId;
                tmpArgs.iconClass = args.iconClass;
                tmpArgs.windowId = args.id;
                taskPanelIcon(tmpArgs,{},args.taskPanelId);
            }
            Ext.ux.getPageData(params,url,tmpFn);
        },
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

            // if(Ext.getCmp("floatingWindow")){
            //     Ext.getCmp("floatingWindow").destroy();
            // }
        }
    }
    Ext.applyIf(args.listeners, listeners);

    self = new Ext.Window(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };



    return self;
};

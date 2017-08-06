function AppWindow(args) {
	var defaultArgs = {
		baseCls:"",
		shadow:false,
		closable:false,
		maximizable:false,
		minimizable:false,
		resizable:true,
		autoScroll:true,
		autoSize:true,
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
        },
    	"afterrender":function(){
            this.DD = new Ext.Window.DD(this);
            this.DD.setHandleElId("");
        }
    }
    self = new Ext.Window(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    
    
    
    return self;
};
function NormalWindow(args) {
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
    if(!args.listeners){
    	args.listeners = {};
    }
    args.listeners["afterrender"] = function(){
            this.DD = new Ext.Window.DD(this);
            this.DD.setHandleElId("");
        }
    self = new Ext.Window(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    
    
    
    return self;
};
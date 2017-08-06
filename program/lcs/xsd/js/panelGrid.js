function PanelGrid(args){
	var defaultArgs = {
		baseCls:"",
		autoScroll:true,
	}
	if(args.layout=="hbox"){
		args.layout = {
			type:"hbox",
			align:"stretch"
		};
	}
	if(args.layout=="vbox"){
		args.layout = {
			type:"vbox",
			align:"stretch"
		};
	}
	Ext.applyIf(args,defaultArgs);
	
	var self ;
    if(!args.repeatFlag){
        args.id = args.name;
    }
	args = Ext.ux.layoutArgs(args);
	if(args.store&&args.proxy){
		args.store.proxy = new Ext.data.HttpProxy(args.proxy);
//		args.store.proxy = new Ext.data.ScriptTagProxy(args.proxy);
		args.store.panelId = args.id;
		args.store = new Ext.data.JsonStore(args.store);
		if(args.bbar){
			args.bbar.store = args.store;
			args.bbar = new Ext.PagingToolbar(args.bbar);
		}
	}
	
	
	self = new Ext.Panel(args);
	self["addObject"] = function(obj,args){
		Ext.ux.layoutScript(obj,args);
	}
	
	
	return self;
}

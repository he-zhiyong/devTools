function JsonComboBox(args){
	var defaultArgs = {
		editable:false,
		hideTrigger:true,
		triggerAction:"all",
	};
	Ext.applyIf(args,defaultArgs);
	
    var self;
    if(!args.repeatFlag){
    	args.id = args.name;
    }
    
    if(!args.listeners){
    	args.listeners = {};
    }
    if(args.dataIndex){
    	if(thisComp&&thisComp.records){
	    	args.selectedValue = thisComp.records.get(args.dataIndex);
    	}
    }
    if(args.store){
	    if(args.proxy){
	    	var requestConfig = new Ext.data.HttpProxy(args.proxy);
	    	args.store.proxy = requestConfig;
	    }
    	var store = new Ext.data.JsonStore(args.store);
	    args.store = store;
    }
    
    self = new Ext.form.ComboBox(args);
    return self;
}

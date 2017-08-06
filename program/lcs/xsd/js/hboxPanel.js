function HboxPanel(args) {
	var defaultArgs = {
		baseCls:"",
		layout:{
			type:"hbox",
			align:"stretch"
		}
	}
	Ext.applyIf(args,defaultArgs);
    var self;
    if(!args.repeatFlag){
	    args.id = args.name;
    }


    args = Ext.ux.layoutArgs(args);
    self = new Ext.Panel(args);

    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };

    
    return self;
};
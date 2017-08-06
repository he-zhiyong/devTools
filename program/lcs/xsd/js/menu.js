function Menu(args){
	var self;
	if(!args.repeatFlag){
		args.id = args.name;
	}
	args = Ext.ux.layoutArgs(args);
	self = new Ext.menu.Menu(args);
	self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
	return self;
}

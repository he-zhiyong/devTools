function LocalComboBox(args){
	var defaultArgs = {
		editable:false,
		hideTrigger:true,
		triggerAction:"all",
	};
	Ext.applyIf(args,defaultArgs);
    var self;
    args.id = args.name;
    args.store = new Ext.data.ArrayStore(args.store);
    self = new Ext.form.ComboBox(args);
    return self;
}

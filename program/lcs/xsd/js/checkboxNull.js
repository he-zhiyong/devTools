function CheckboxNull(args){
	var self;
    if(!args.repeatFlag) {
        args.id = args.name
    }
	self = new Ext.form.Checkbox(args);
	return self;
}

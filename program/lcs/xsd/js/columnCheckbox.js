function ColumnCheckbox(args){
	var self;
	args.tableId = tableId;
	args.rowNum = rowNum;
	if(args.tableId){
    	args.name = args.name+args.tableId+"Row"+args.rowNum;
    }else{
	    args.name = args.name+"Row"+args.rowNum;
    }
	args.id = args.name;
	self = new Ext.form.Checkbox(args);
	return self;
}

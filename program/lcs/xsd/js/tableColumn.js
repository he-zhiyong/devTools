function TableColumn(args){
    var self ;

    args.rowNum = rowNum;
    args.tableId = tableId;
    if(args.tableId){
    	args.name = args.name+args.tableId+"Row"+args.rowNum;
    }else{
	    args.name = args.name+"Row"+args.rowNum;
    }
    args.id = args.name;
    args = Ext.ux.layoutArgs(args);
    self = new Ext.Panel(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    return self;
}
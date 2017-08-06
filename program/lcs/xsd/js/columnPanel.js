function ColumnPanel(args){
    var self;
    args.tableId = tableId;
    args.rowNum = rowNum;
    if(args.tableId){
    	args.name = args.name+args.tableId+"Row"+args.rowNum;
    }else{
	    args.name = args.name+"Row"+args.rowNum;
    }
    args.id = args.name;
    if(mysql&&mysql.data&&mysql.data[args.rowNum][args.tableField]){
        args.fieldValue = mysql.data[args.rowNum][args.tableField];
    }else{
        args.fieldValue = "";
    }
    self = new Ext.Panel(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    return self;
}
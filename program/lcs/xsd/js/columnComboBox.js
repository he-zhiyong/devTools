function ColumnComboBox(args){
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
        args.value = mysql.data[args.rowNum][args.tableField];
    }else if(args.value){

    }else{
        args.value="";
    }
    args = Ext.ux.layoutArgs(args);
    self = new Ext.form.ComboBox(args);
    return self;
}

function TextRow(args){
    var self;
    if(mysql){
        args.mysql = mysql;
    }
    args.layout = {
        type:"vbox",
        align:"stretch"
    };
    args.id = args.tableId+"Column"+args.rowNum;
    args.items = [];
    if(args.rowLength){
        var repeatTimes = args.rowLength;
    }else{
        var repeatTimes = args.mysql.data.length;
    }
    args.height =args.rowHeight * repeatTimes;
    for(var i=0;i<repeatTimes;i++){
        var tableRows = {};
        Ext.apply(tableRows,args.rowExample);
        tableRows.id = args.id+"Row"+i;
        tableRows.columnNum = i;
        tableRows.rowNum = args.rowNum;
        if(args.rowField&&args.mysql.data[i]){
            tableRows.text = args.mysql.data[i][args.rowField];
        }
        else{
            tableRows.text = "";
        }
        args.items[i] = tableRows;
    }
    self = new Ext.Panel(args);
    return self;
}



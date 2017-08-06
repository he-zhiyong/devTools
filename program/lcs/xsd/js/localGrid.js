function LocalGrid(args){
    var self;

    args.colModel = new Ext.grid.ColumnModel(args.columnModel);

    var thisWindow = Ext.getCmp("payFineWindow");
    var myData = [];
    if(thisWindow.groupObj &&
        thisWindow.groupObj["resultList"] &&
        thisWindow.groupObj["resultList"]["seqs"]){
        for(var i=0; i<thisWindow.groupObj["resultList"]["seqs"].length; i++){
            var data = [];
            data.push(thisWindow.groupObj["resultList"]["seqs"][i].infoTitle);
            data.push(thisWindow.groupObj["resultList"]["seqs"][i].assetId);
            data.push(thisWindow.groupObj["resultList"]["seqs"][i].fineType);
            data.push(thisWindow.groupObj["resultList"]["seqs"][i].dueTime);
            data.push(thisWindow.groupObj["resultList"]["seqs"][i].fineAmt);
            data.push(thisWindow.groupObj["resultList"]["seqs"][i].fineReason);
            myData.push(data);
        }
    }
    var store = new Ext.data.ArrayStore({
        fields: ['infoTitle', 'assetId','fineType','sDueTime','fineAmt','fineReason']
    });
    store.loadData(myData);
    args.store = store;

    self = new Ext.grid.GridPanel(args);
    // self.store = store;

    return self;
}
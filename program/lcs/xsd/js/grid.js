function Grid(args){
    var self;
    if(!args.repeatFlag){
	    args.id = args.name;
    }

    args = Ext.ux.layoutArgs(args);
    if(!args.url){
        args.url = Ext.ux.defaultDataUrl;
    }
    var requestConfig = new Ext.data.HttpProxy({
        url:args.url,
        api:{
            read:{
                method:"POST",
                url:args.url
            }
        }
    });
    var tmpParams = {};
    args.store.proxy = requestConfig;
    var store = new Ext.data.JsonStore(args.store);
    args.store = store;
    if(args.bbar){
    	args.bbar.store = store;
        var bbar = new Ext.PagingToolbar(args.bbar);
        args.bbar = bbar;
    }
    if(args.columnModel){
    	args.colModel = new Ext.grid.ColumnModel(args.columnModel);
    }
    self = new Ext.grid.GridPanel(args);
    self.store.panelId = self.id;
    return self;
}
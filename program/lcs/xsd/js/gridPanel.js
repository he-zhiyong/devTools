function GridPanel(args){
    var self;
    args.id = args.name;

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
	if(args.store.baseParams){
		tmpParams = args.store.baseParams;
	}else{
		var tmpParams = {};
		tmpParams.jsonData = Ext.apply({},args.store.params);
	}
    var store = new Ext.data.JsonStore({
        paramNames:args.store.paramNames,
        autoLoad:args.store.autoLoad,
        proxy:requestConfig,
        baseParams:tmpParams,
        root:args.store.root,
        totalProperty:args.store.totalProperty,
        idProperty:args.store.idProperty,
        fields:args.store.fields,
        listeners:args.store.listeners
    });
    args.store = store;
    if(args.bbar){
        var bbar = new Ext.PagingToolbar({
            pageSize:args.bbar.pageSize,
            store:store,
            prependButtons:args.bbar.prependButtons,
            displayInfo:args.bbar.displayInfo,
            displayMsg:args.bbar.displayMsg,
            emptyMsg:args.bbar.emptyMsg,
            items:args.bbar.items,
        });
        args.bbar = bbar;
    }

    self = new Ext.grid.GridPanel(args);
    return self;
}
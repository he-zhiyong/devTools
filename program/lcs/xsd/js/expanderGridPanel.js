function ExpanderGridPanel(args) {
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
    if(args.store){
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
    }
    else{
        var store = {};
        args.store = store;
    }

    if(args.bbar){
        var bbar = new Ext.PagingToolbar({
            pageSize:args.bbar.pageSize,
            store:store,
            prependButtons:args.bbar.prependButtons,
            displayInfo:args.bbar.displayInfo,
            displayMsg:args.bbar.displayMsg,
            emptyMsg:args.bbar.emptyMsg,
            items:args.bbar.items
        });
        args.bbar = bbar;
    }






    if(args.rowExpander){
        var html =[]  ;
        for (var i = 0; i<args.rowExpander.length; i++){
        	if(i==(args.rowExpander.length-1)){
	            html[i] = '<p><b>'+args.rowExpander[i][0]+'</b>'+args.rowExpander[i][1]+'</p>';
        	}else{
        		html[i] = '<p><b>'+args.rowExpander[i][0]+'</b>'+args.rowExpander[i][1]+'</p><br>';
        	}

        }
        var expander = new Ext.ux.grid.RowExpander({
            tpl : new Ext.Template(html)
        });
        if(args.expanderAutoFlag){

        }else{
            args.columns.splice(0,0,expander);
        }
        args.plugins = [expander];

    }
    self = new Ext.grid.EditorGridPanel(args);

    return self;

}
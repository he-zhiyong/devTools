function DoubleGridPanel(args){
    var self;
    args.id = args.name;

    args = Ext.ux.layoutArgs(args);

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
    if(args.sonGrid){
    	args.sonGridArray = [];
        var expander = new Ext.grid.RowExpander({
            tpl:new Ext.XTemplate(
                '<div class="detailData">',
                '',
                '</div>'
            )
        });
        expander.on("expand",function(expander,r,body,rowIndex){
        	window.testEle = body;
        	if(Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
        		var tmpRequestConfig = new Ext.data.HttpProxy({
        			url:args.sonGrid.url,
        			api:{
        				read:{
        					method:"POST",
        					url:args.sonGrid.url
        				}
        			}
        		});
        		var tmpSonParams = {};
        		tmpSonParams.jsonData = Ext.apply({},args.sonStore.params);
        		if(typeof (args.sonStore.extraParams)=="object"){
        			var tmpObj = {};
        			for(var tmp in args.sonStore.extraParams){
        				tmpObj[tmp] = r.json[args.sonStore.extraParams[tmp]];
        			}
        			Ext.applyIf(tmpSonParams.jsonData,tmpObj);
        		}
        		var tmpStore = new Ext.data.JsonStore({
        			proxy:tmpRequestConfig,
        			autoLoad:args.sonStore.autoLoad,
        			paramsNames:args.sonStore.paramNames,
        			baseParams:tmpSonParams,
        			root:args.sonStore.root,
        			totalProperty:args.sonStore.totalProperty,
        			idProperty:args.sonStore.idParperty,
        			fields:args.sonStore.fields,
        			listeners:args.sonStore.listeners
        		});
        		args.sonGrid.store = tmpStore;
        		Ext.DomQuery.select("div.detailData")[0];
        		args.sonGrid.renderTo = Ext.DomQuery.select("div.detailData",body)[0];
        		args.sonGrid.id = args.name+rowIndex;
        		args.sonGrid.rowNum = rowIndex;
        		tmpStore.gridId = args.sonGrid.id;
        		args.sonGridArray[rowIndex] = args.sonGrid.id;
        		var tmpGrid = new Ext.grid.GridPanel(args.sonGrid);
        		tmpStore.load();
        	}
        });
        args.columns.splice(0,0,expander);
        args.plugins = [expander];
    }
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
    self = new Ext.grid.EditorGridPanel(args)
    return self;
}
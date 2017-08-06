function RepeatGridPanel(args){
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
    }
    else{
    	var store = {};
    }
	args.store = store;
	if(args.expanderArray&&args.expanderArray.length>0){
		var expanderArray = [];
		var arrayLength = expanderArray.length;
		for(var i=0;i<args.expanderArray.length;i++){
			var tmpExpanderArgs = args.expanderArray[i];
			switch(tmpExpanderArgs.type){
				case "msg":
				if(tmpExpanderArgs.html){
					var expander = new Ext.ux.grid.RowExpander({
						tpl:new Ext.Template(tmpExpanderArgs.html)
					});
					expanderArray[arrayLength] = expander;
					arrayLength++;
				}
				break;
				case "grid":
				if(tmpExpanderArgs.sonGrid){
					var classString = tmpExpanderArgs.className+tmpExpanderArgs.number;
					var divString = '<div class="'+classString+'">';
					var expander = new Ext.grid.RowExpander({
						tpl:new Ext.XTemplate(divString,"","</div>")
					});
					tmpExpanderArgs.classString = classString;
					tmpExpanderArgs.divString = divString;
					expander.expanderArgs = Ext.apply({},tmpExpanderArgs);
					expander.on("expand",function(expander,r,body,rowIndex){
						var tmpExpanderArgs = expander.expanderArgs;
						var classString = tmpExpanderArgs.classString;
						window.testEle = body;
						if(Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
			        		var tmpRequestConfig = new Ext.data.HttpProxy({
			        			url:tmpExpanderArgs.sonGrid.url,
			        			api:{
			        				read:{
			        					method:"POST",
			        					url:tmpExpanderArgs.sonGrid.url
			        				}
			        			}
			        		});
			        		var tmpSonParams = {};
			        		tmpSonParams.jsonData = Ext.apply({},tmpExpanderArgs.sonStore.params);
			        		if(typeof (tmpExpanderArgs.sonStore.extraParams)=="object"){
			        			var tmpObj = {};
			        			for(var tmp in tmpExpanderArgs.sonStore.extraParams){
			        				tmpObj[tmp] = r.json[tmpExpanderArgs.sonStore.extraParams[tmp]];
			        			}
			        			Ext.applyIf(tmpSonParams.jsonData,tmpObj);
			        		}
			        		totalData.tmpSonParams = tmpSonParams;
			        		var tmpStore = new Ext.data.JsonStore({
			        			proxy:tmpRequestConfig,
			        			autoLoad:tmpExpanderArgs.sonStore.autoLoad,
			        			paramsNames:tmpExpanderArgs.sonStore.paramNames,
			        			baseParams:tmpSonParams,
			        			root:tmpExpanderArgs.sonStore.root,
			        			totalProperty:tmpExpanderArgs.sonStore.totalProperty,
			        			idProperty:tmpExpanderArgs.sonStore.idParperty,
			        			fields:tmpExpanderArgs.sonStore.fields,
			        			listeners:tmpExpanderArgs.sonStore.listeners
			        		});
			        		tmpExpanderArgs.sonGrid.store = tmpStore;
			        		Ext.DomQuery.select("div."+classString)[0];
			        		tmpExpanderArgs.sonGrid.renderTo = Ext.DomQuery.select("div."+classString,body)[0];
			        		tmpExpanderArgs.sonGrid.id = tmpExpanderArgs.name+rowIndex;
			        		tmpExpanderArgs.sonGrid.rowNum = rowIndex;
			        		tmpStore.gridId = tmpExpanderArgs.sonGrid.id;
			        		var tmpGrid = new Ext.grid.GridPanel(tmpExpanderArgs.sonGrid);
			        		tmpStore.load();
			        	}
					});
	        		expanderArray[arrayLength] = expander;
					arrayLength++;
				}
				break;
			}
		}
		args.plugins = expanderArray;
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

    self = new Ext.grid.EditorGridPanel(args);
    return self;
}
function ExpandEditorGridPanel(args){
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
		};
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
    
    if(args.expandDivId){
		if(!args.viewConfig){
			args.viewConfig = {};
		}
		if(!args.viewConfig.templates){
			args.viewConfig.templates = {};
		}
		if(!args.viewConfig.templates.master){
			var expandDivClass = "";
			if(args.expandDivClass){
				expandDivClass = args.expandDivClass;
			}
			var expandDivString = '<div class="'+expandDivClass+'" id="'+args.expandDivId+'"></div>';
			var gridHeaderString = '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div>'+expandDivString+'</div>' ;
			args.viewConfig.templates.master = new Ext.Template(
				'<div class="x-grid3" hidefocus="true">', '<div class="x-grid3-viewport">',
				gridHeaderString,
				'<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>', 
				"</div>", 
				'<div class="x-grid3-resize-marker">&#160;</div>', 
				'<div class="x-grid3-resize-proxy">&#160;</div>', 
				"</div>"
			)
		}
    }
    self = new Ext.grid.EditorGridPanel(args);
    self["addObject"] = function(obj,args){
    	var divId = args.expandDivId;
    	obj.applyToMarkup(args.parent.args.expandDivId);
    }
    return self;
}
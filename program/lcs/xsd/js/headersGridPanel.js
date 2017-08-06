function HeadersGridPanel(args){
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
	})
}

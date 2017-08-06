function LocalJsonGrid(args){
    var self;
	if(!args.repeatFlag) {
		args.id = args.name;
	}
	args = Ext.ux.layoutArgs(args);
	var tmpParams = {};
	var store = new Ext.data.JsonStore(args.store);
	args.store = store;
	if(args.bbar) {
		args.bbar.store = store;
		var bbar = new Ext.PagingToolbar(args.bbar);
		args.bbar = bbar;
	}
	if(args.columnModel) {
		args.colModel = new Ext.grid.ColumnModel(args.columnModel);
	}
	self = new Ext.grid.GridPanel(args);
	self.store.panelId = self.id;
	return self;
}
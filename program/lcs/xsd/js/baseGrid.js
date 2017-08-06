function BaseGrid(args) {
    var self;
    if (!args.repeatFlag) {
        args.id = args.name;
    }

    args = Ext.ux.layoutArgs(args);

    if (args.store && args.proxy) {
        args.store.proxy = new Ext.data.HttpProxy(args.proxy);
        args.store.panelId = args.id;
        args.store = new Ext.data.JsonStore(args.store);
        if (args.bbar) {
            args.bbar.store = args.store;
            args.bbar = new Ext.PagingToolbar(args.bbar);
        }
    }
    if (args.columnModel) {
        args.colModel = new Ext.grid.ColumnModel(args.columnModel);
    }
    self = new Ext.grid.EditorGridPanel(args);
    return self;
}
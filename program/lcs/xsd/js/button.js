function Button(args) {
    var self;
    args.id = args.name;
    
    args = Ext.ux.layoutArgs(args);
    self = new Ext.Button(args);
    
    return self;
};

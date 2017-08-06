function TabPanel(args) {
    var defaultArgs = {
        baseCls: ""
    }
    Ext.applyIf(args, defaultArgs);
    var self;
    if (!args.repeatFlag) {
        args.id = args.name;
    }

    args = Ext.ux.layoutArgs(args);
    self = new Ext.TabPanel(args);

    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };


    return self;
};
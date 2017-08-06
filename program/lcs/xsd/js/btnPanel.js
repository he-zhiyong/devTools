function BtnPanel(args){
    var self;
    args.id = args.name;


    args = Ext.ux.layoutArgs(args);
    self = new Ext.Panel(args);


    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };


    return self;
}
function Viewport(args) {
    var self;
    args.id = args.name;
    args = Ext.ux.layoutArgs(args);
    self = new Ext.Viewport(args);
    self["addObject"] = function (obj,args){
        Ext.ux.layoutScript(obj,args);
    };
    return self;
}
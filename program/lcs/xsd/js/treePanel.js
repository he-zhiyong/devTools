function TreePanel(args){
    var defaultArgs = {
        lines: false,
        useArrows:true,
        autoScroll:true,
        animate:true,
        containerScroll:true ,
        border:false,
        collapseFirst: false,
        root:{
            nodeType: 'async',
        }
    };
    Ext.applyIf(args,defaultArgs);

    var self;
    args.id = args.name;

    args = Ext.ux.layoutArgs(args);
    self = new Ext.tree.TreePanel(args);

    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    
    return self;
}
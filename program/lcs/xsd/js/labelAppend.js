function LabelAppend(args) {
    var self;
    if(!args.repeatFlag){
        args.id = args.name;
    }

    args = Ext.ux.layoutArgs(args);
    if(!args.listeners){
        args.listeners = {};
    }
    if(args.renderFn){
        args.listeners.afterrender = args.renderFn;
    }
    if(args.dataIndex){
        if(thisComp&&thisComp.records){
            if(args.textAppend){
                args.text += thisComp.records.get(args.dataIndex) || "";
            }
            else{
                args.text = thisComp.records.get(args.dataIndex) || "";
            }
        }
    }

    self = new Ext.ux.Label(args);

    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };


    return self;
};
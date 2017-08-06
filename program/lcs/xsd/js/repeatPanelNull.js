function RepeatPanelNull(args){
    var self;
    if(!args.rowNum){
        args.rowNum = 0;
    }
    args.name = args.name+args.rowNum;
    if(!args.repeatFlag) {
        args.id = args.name
    }
    if(args.layout=="vbox"){
        args.layout={
            type:"vbox",
            align:"stretch"
        }
    }else{
        args.layout = {
            type:"hbox",
            align:"stretch"
        }
    }
    self = new Ext.Panel(args);
    self["addObject"] = function(obj, args) {
        Ext.ux.layoutScript(obj, args);
    };
    return self;
}
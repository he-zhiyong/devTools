function TimeLabel(args){
    var self;
    args.id = args.name;
    args = Ext.ux.layoutArgs(args);

    args.start = function(id){
        var newDate = new Date();
        if(!args.dateFormat){
            args.dateFormat = "Y-m-d H:i:s";
        }
        var newTime = newDate.format(args.dateFormat);
        Ext.getCmp(id).setText(newTime);
        var d = new Ext.util.DelayedTask(function(){
            Ext.getCmp(id).start(id);
        });
        if(!args.freshTime){
            args.freshTime = 500;
        }
        d.delay(args.freshTime);
    }
    if(!args.listeners){
        args.listeners  = {};
    }
    args.listeners["afterrender"] = function(){
        this.start(this.id);
    }
    self = new Ext.form.Label(args);

    return self;
}
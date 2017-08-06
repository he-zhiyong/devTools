function DateField(args){
    var self;
    args.id = args.name;
    self = new Ext.form.DateField(args);
    return self;
}
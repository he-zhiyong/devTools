function ComboBox(args){
    var self;
    if(!args.repeatFlag){
        args.id = args.name;
    }
    self = new Ext.form.ComboBox(args);
    return self;
}

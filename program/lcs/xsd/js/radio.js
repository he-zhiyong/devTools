function Radio(args){
    var self;
    args.id = args.name;
    args.name = args.formName;
    self = new Ext.form.Radio(args);
    return self;
}

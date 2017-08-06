function SearchComboBox(args) {
    var defaultArgs = {
        minChars:1,
        autoSelect: false,
        loadingText:"",
        hideTrigger:true,
        enableKeyEvents:true,
    }
    Ext.applyIf(args, defaultArgs);
    var self;
    args.id = args.name;
    if(args.store){
        args.store = new Ext.data.Store(args.store);
    }
    self = new Ext.form.ComboBox(args);
    return self;
}
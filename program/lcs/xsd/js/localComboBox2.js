function LocalComboBox2(args){
    var defaultArgs = {
        editable:false,
        hideTrigger:true,
        triggerAction:"all",
        getListParent: function() {
            return this.el.up('.x-menu');
        },

    };
    Ext.applyIf(args,defaultArgs);
    var self;
    args.id = args.name;
    args.store = new Ext.data.Store(args.store);
    self = new Ext.form.ComboBox(args);
    return self;
}

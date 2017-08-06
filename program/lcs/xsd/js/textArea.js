function TextArea(args) {
    var self;
    args.id = args.name;
    if (args.autoCreate) {
        args.autoCreate.id = "";
    }
    if (args.dataIndex) {
        args.selectedValue = thisComp.records.get(args.dataIndex);
        args.value = args.selectedValue;
    }
    args = Ext.ux.layoutArgs(args);
    self = new Ext.form.TextArea(args);

    return self;
};
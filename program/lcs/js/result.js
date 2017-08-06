function testWindow(args,mysql,fatherId){var self, tempArgs;
tempArgs = { "height":args.height,"width":args.width,"baseCls":args.baseCls,};tempArgs["name"] = "testWindow";var testWindow = Window(tempArgs);testWindow["args"]=tempArgs;tempArgs={};
    
            Ext.getCmp("testWindow").show(this);
            tablePanel(args,mysql,"testWindow");
         
}; totalArgs["testWindow"] = {
	height:300,
	width:400,
	baseCls:"",
	testPanel:{
		height:200,
		width:200,
	}
}
{test : {cls : "windowBackgound windowShadow windowBorder",width : 1440,height : 810,minHeight : 810,minWidth : 1440,baseCls : "",closeable : false,},testHeader : {baseCls : "",height : 40,cls : "borderBottom_e6e6e6",},testHeaderTitle : {text : "test",margins : "0 0 0 16",width : 90,style : "line-height:40px;text-align:center;font-size:18px;",},testHeaderBlank : {flex : 1,baseCls : "",},testHeaderLine : {width : 1,height : 36,cls : "lineLabel labelInlineBlock",hidden : true,margins : "10 0 10 0",},testHeaderButtons : {baseCls : "",width : 110,height : 40,},testHeaderButtonsMinButton : {cls : "windowMinBtn display_inlineBlock cursor_pointer",width : 24,height : 22,handler : function(item,event){
	var targetWindow = this.findParentByType("window");
	targetWindow.hide();
}
,margins : "8 0 9 10",},testHeaderButtonsMaxButton : {cls : "windowMaxBtn display_inlineBlock cursor_pointer",width : 24,height : 22,handler : function(item,event){
	var targetWindow = this.findParentByType("window");
	targetWindow.toggleMaximize();
}
,margins : "8 6 9 6",},testHeaderButtonsCloseButton : {cls : "windowCloseBtn display_inlineBlock cursor_pointer",width : 24,height : 22,handler : function(item,event){
	var targetWindow = this.findParentByType("window");
	targetWindow.destroy();
}
,margins : "8 10 9 0",},}
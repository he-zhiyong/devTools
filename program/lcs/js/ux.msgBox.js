//test
//Ext.Msg.show({fn:fn,
// title:'是否预约',
// msg: '《马克思主义》',
// buttons: Ext.Msg.YESNO,
// icon: Ext.MessageBox.QUESTION});


Ext.ux.MessageBox = function(){
    var dlg, opt, mask, waitTimer,
        bodyEl, msgEl, textboxEl, textareaEl, progressBar, pp, iconEl, spacerEl,
        buttons, activeTextEl, bwidth, bufferIcon = '', iconCls = '',
        buttonNames = ['ok', 'yes', 'no', 'cancel'];

    var handleButton = function(button){
        buttons[button].blur();
        if(dlg.isVisible()){
            dlg.hide();
            handleHide();
            Ext.callback(opt.fn, opt.scope||window, [button, activeTextEl.dom.value, opt], 1);
        }
    };

    var handleHide = function(){
        if(opt && opt.cls){
            dlg.el.removeClass(opt.cls);
        }
        progressBar.reset();        
    };

    var handleEsc = function(d, k, e){
        if(opt && opt.closable !== false){
            dlg.hide();
            handleHide();
        }
        if(e){
            e.stopEvent();
        }
    };

    var updateButtons = function(b){
        var width = 0,
            cfg;
        if(!b){
            Ext.each(buttonNames, function(name){
                buttons[name].hide();
            });
            return width;
        }
        dlg.footer.dom.style.display = '';
        Ext.iterate(buttons, function(name, btn){
            cfg = b[name];
            if(cfg){
                btn.show();
//              btn.setText(Ext.isString(cfg) ? cfg : Ext.MessageBox.buttonText[name]);
//              width += btn.getEl().getWidth() + 15;
            }else{
                btn.hide();
            }
        });
        return width;
    };

    return {
        getDialog : function(titleText){
	    	if(dlg){
	    		dlg = null;
	    	}
           if(!dlg){
                var btns = [];
                
                buttons = {};
                Ext.each(buttonNames, function(name){
                    btns.push(buttons[name] = new Ext.ux.Label({
                        cls: this.buttonCls[name],
                        width:100,
                        height:26,
                        handler: handleButton.createCallback(name),
                        hideMode: 'offsets'
                    }));
                }, this);
                dlg = new Ext.Window({
                    baseCls:"",
                    shadow:false,
                    cls:"bodyMain windowBorder",
                    autoCreate : true,
                    resizable:true,
                    constrain:true,
                    constrainHeader:true,
                    minimizable : false,
                    maximizable : false,
                    stateful: false,
                    modal: true,
                    shim:true,
                    buttonAlign:"center",
                    width:300,
                    height:150,
                    minHeight: 150,
                    plain:true,
                    footer:true,
                    closable:false,
                    close : function(){
                        if(opt && opt.buttons && opt.buttons.no && !opt.buttons.cancel){
                            handleButton("no");
                        }else{
                            handleButton("cancel");
                        }
                    },
                    listeners:{
                    	afterrender:function(){
                    		var handleComp = this.items.items[0].items.items[0];
                    		this.dd.setHandleElId(handleComp.id);
                    	}
                    },
                    items:[{
                    	xtype:'panel',
                    	height:30,
                    	baseCls:"",
                    	layout:{
                    		type:"hbox",
                    		align:"stretch"
                    	},
                    	items:[{
                    		xtype:"label",
                    		text:titleText,
                    		flex:1,
                    		cls:"labelCursorMove",
                    		margins:"0 0 0 44",
                    		style:"font-size:20px;line-height:30px;text-align:center;",
                    	},{
                    		xtype:"label",
                    		width:44,
                    		cls:"windowCloseBtn labelCursor",
                    		handler:function(){
                    			this.findParentByType("window").close();
                    		}
                    	}]
                    },{
                    	xtype:"panel",
                    	height:90,
                    	baseCls:"",
                    	layout:{
                    		type:"hbox",
                    		align:"stretch",
                    	},
                    	items:[{
                    		xtype:"label",
                    		flex:1,
                    		text:"",
                    	},{
                    		xtype:"label",
                    		text:"",
                    		cls:"labelInlineBlock",
                    		style:"font-size:20px;line-height:90px;text-align:center;",
                    	},{
                    		xtype:"label",
                    		flex:1,
                    		text:"",
                    	}]
                    }],
                    fbar: new Ext.Toolbar({
                    	height:50,
                        items: btns,
                        enableOverflow: false
                    })
                });
                dlg.render(document.body);
                dlg.getEl().addClass('x-window-dlg');
                mask = dlg.mask;
                bodyEl = dlg.body.createChild({
                    html:'<div class="ext-mb-icon" style="height:0px;"></div><div class="ext-mb-content" style="height:0px;"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'
                });
//              iconEl = Ext.get(bodyEl.dom.firstChild);
                var contentEl = bodyEl.dom.childNodes[1];
                msgEl = Ext.get(contentEl.firstChild);
                textboxEl = Ext.get(contentEl.childNodes[2].firstChild);
                textboxEl.enableDisplayMode();
                textboxEl.addKeyListener([10,13], function(){
                    if(dlg.isVisible() && opt && opt.buttons){
                        if(opt.buttons.ok){
                            handleButton("ok");
                        }else if(opt.buttons.yes){
                            handleButton("yes");
                        }
                    }
                });
                textareaEl = Ext.get(contentEl.childNodes[2].childNodes[1]);
                textareaEl.enableDisplayMode();
                progressBar = new Ext.ProgressBar({
                    renderTo:bodyEl
                });
               bodyEl.createChild({cls:'x-clear'});
            }
            return dlg;
        },
        updateText : function(text){
            if(!dlg.isVisible() && !opt.width){
                dlg.setSize(this.maxWidth, 100); // resize first so content is never clipped from previous shows
            }
            dlg.items.items[1].items.items[1].setText(text);
            dlg.items.items[1].items.items[1].setWidth("auto");
            dlg.items.items[1].doLayout();
//          msgEl.update(text || '&#160;');

//          var iw = iconCls != '' ? 0 : 0,
//              mw = msgEl.getWidth() + msgEl.getMargins('lr'),
//              fw = dlg.getFrameWidth('lr'),
//              bw = dlg.body.getFrameWidth('lr'),
//              w;
//              
//          if (Ext.isIE && iw > 0){
//              iw += 3;
//          }
//          w = Math.max(Math.min(opt.width || iw+mw+fw+bw, opt.maxWidth || this.maxWidth),
//                  Math.max(opt.minWidth || this.minWidth, bwidth || 0));
//          if(opt.prompt === true){
//              activeTextEl.setWidth(w-iw-fw-bw);
//          }
//          if(opt.progress === true || opt.wait === true){
//              progressBar.setSize(w-iw-fw-bw);
//          }
//          if(Ext.isIE && w == bwidth){
//              w += 4;  
//          }
            w = opt.width;
            dlg.setSize(w, "auto").center();
            return this;
        },
        updateProgress : function(value, progressText, msg){
            progressBar.updateProgress(value, progressText);
            if(msg){
                this.updateText(msg);
            }
            return this;
        },
        isVisible : function(){
            return dlg && dlg.isVisible();
        },
        hide : function(){
            var proxy = dlg ? dlg.activeGhost : null;
            if(this.isVisible() || proxy){
                dlg.hide();
                handleHide();
                if (proxy){
                    dlg.unghost(false, false);
                } 
            }
            return this;
        },
        show : function(options){
            if(this.isVisible()){
                this.hide();
            }
            opt = options;
            var d = this.getDialog(opt.title || "&#160;");

//          d.setTitle(opt.title || "&#160;");
            var allowClose = (opt.closable !== false && opt.progress !== true && opt.wait !== true);
//          d.tools.close.setDisplayed(allowClose);
            activeTextEl = textboxEl;
            opt.prompt = opt.prompt || (opt.multiline ? true : false);
            if(opt.prompt){
                if(opt.multiline){
                    textboxEl.hide();
                    textareaEl.show();
                    textareaEl.setHeight(Ext.isNumber(opt.multiline) ? opt.multiline : this.defaultTextHeight);
                    activeTextEl = textareaEl;
                }else{
                    textboxEl.show();
                    textareaEl.hide();
                }
            }else{
                textboxEl.hide();
                textareaEl.hide();
            }
            activeTextEl.dom.value = opt.value || "";
            if(opt.prompt){
                d.focusEl = activeTextEl;
            }else{
                var bs = opt.buttons;
                var db = null;
                if(bs && bs.ok){
                    db = buttons["ok"];
                }else if(bs && bs.yes){
                    db = buttons["yes"];
                }
                if (db){
                    d.focusEl = db;
                }
            }
            if(opt.iconCls){
              d.setIconClass(opt.iconCls);
            }
            this.setIcon(Ext.isDefined(opt.icon) ? opt.icon : bufferIcon);
            bwidth = updateButtons(opt.buttons);
            progressBar.setVisible(opt.progress === true || opt.wait === true);
            this.updateProgress(0, opt.progressText);
            this.updateText(opt.msg);
            if(opt.cls){
                d.el.addClass(opt.cls);
            }
            d.proxyDrag = opt.proxyDrag === true;
            d.modal = opt.modal !== false;
            d.mask = opt.modal !== false ? mask : false;
            if(!d.isVisible()){
                // force it to the end of the z-index stack so it gets a cursor in FF
                document.body.appendChild(dlg.el.dom);
                d.setAnimateTarget(opt.animEl);
                //workaround for window internally enabling keymap in afterShow
                d.on('show', function(){
//                  if(allowClose === true){
//                      d.keyMap.enable();
//                  }else{
//                      d.keyMap.disable();
//                  }
                }, this, {single:true});
                d.show(opt.animEl);
            }
            if(opt.wait === true){
                progressBar.wait(opt.waitConfig);
            }
            return this;
        },
        setIcon : function(icon){
            if(!dlg){
                bufferIcon = icon;
                return;
            }
            bufferIcon = undefined;
            if(icon && icon != ''){
//              iconEl.removeClass('x-hidden');
//              iconEl.replaceClass(iconCls, icon);
//              bodyEl.addClass('x-dlg-icon');
                iconCls = icon;
            }else{
//              iconEl.replaceClass(iconCls, 'x-hidden');
//              bodyEl.removeClass('x-dlg-icon');
                iconCls = '';
            }
            return this;
        },
        progress : function(title, msg, progressText){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                progress:true,
                closable:false,
                minWidth: this.minProgressWidth,
                progressText: progressText
            });
            return this;
        },
        wait : function(msg, title, config){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                closable:false,
                wait:true,
                modal:true,
                minWidth: this.minProgressWidth,
                waitConfig: config
            });
            return this;
        },
        alert : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OK,
                fn: fn,
                scope : scope,
                minWidth: this.minWidth
            });
            return this;
        },
        confirm : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.YESNO,
                fn: fn,
                scope : scope,
                icon: this.QUESTION,
                minWidth: this.minWidth
            });
            return this;
        },
        prompt : function(title, msg, fn, scope, multiline, value){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OKCANCEL,
                fn: fn,
                minWidth: this.minPromptWidth,
                scope : scope,
                prompt:true,
                multiline: multiline,
                value: value
            });
            return this;
        },
        OK : {ok:true},
        CANCEL : {cancel:true},
        OKCANCEL : {ok:true, cancel:true},
        YESNO : {yes:true, no:true},
        YESNOCANCEL : {yes:true, no:true, cancel:true},
        INFO : 'ext-mb-info',
        WARNING : 'ext-mb-warning',
        QUESTION : 'ext-mb-question',
        ERROR : 'ext-mb-error',
        defaultTextHeight : 75,
        minProgressWidth : 250,
        minPromptWidth: 250,
        buttonText : {
            ok : "OK",
            cancel : "Cancel",
            yes : "Yes",
            no : "No"
        },
        buttonCls : {
        	ok : "formConfirm labelBlock labelCursor",
        	cancel : "formCancel labelBlock labelCursor",
        	yes : "formConfirm labelBlock labelCursor",
        	no : "formCancel labelBlock labelCursor",
        }
    };
}();

Ext.ux.Msg = Ext.ux.MessageBox;

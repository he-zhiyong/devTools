function readCard(args){
	if(!args){
		args = {};
	}
	var ds = new Ext.data.Store({
		proxy: new Ext.data.ScriptTagProxy({
			url: 'http://127.0.0.1/cardno=read'
		}),

		reader: new Ext.data.JsonReader({
			id: 'status'
		}, [{
			name: 'status'
		}, {
			name: 'cardno'
		}, {
			name: 'name'
		}, {
			name: 'balance'
		},{
			name: 'accountno'
		}])

	});
	var fn = args.fn;
	ds.load({
		scope: this,
		add: false,
		callback: function(records, operation, success) {
			for(var i = 0; i < ds.getCount(); i++) {
				var record = ds.getAt(i);
				var bstatus = record.get('status')
				if(bstatus == 'success') {
					var cardno = record.get('cardno');
					var sname = record.get('name');
					var balance = record.get('balance');
					var result = {};
					result = Ext.apply({},record.data);
					if(fn&&typeof(fn)=="function"){
						fn(result);
					}
				} else {
					var msgTip = Ext.MessageBox.show({
						title: '读卡提示',
						msg: '读卡失败!'
					});
				}
			}
		}
	});

	return;
}
function readCardMsg(amount,fn) {
	var ds = new Ext.data.Store({
		proxy: new Ext.data.ScriptTagProxy({
			url: 'http://127.0.0.1/cardno=read'
		}),

		reader: new Ext.data.JsonReader({
			id: 'status'
		}, [{
			name: 'status'
		}, {
			name: 'cardno'
		}, {
			name: 'name'
		}, {
			name: 'balance'
		}])

	});

	ds.load({
		scope: this,
		add: false,
		callback: function(records, operation, success) {
			for(var i = 0; i < ds.getCount(); i++) {
				var record = ds.getAt(i);
				var bstatus = record.get('status')
				if(bstatus == 'success') {
					var cardno = record.get('cardno');
					var sname = record.get('name');
					var balance = record.get('balance');
					if(!fn){
						fn = function(){};
					}
					deduceCost(cardno,amount,fn);
				} else {
					var msgTip = Ext.MessageBox.show({
						title: '读卡提示',
						msg: '读卡失败!'
					});
				}
			}
		}
	});

	return;
}

function deduceCost(account,amount,fn) {
	var szcardno = account;
	var szamount = amount;
	if(Ext.util.Format.trim(szcardno) == '' || Ext.util.Format.trim(szamount) == '') {
		Ext.Msg.alert("警告", "请正确输入数据，卡号和金额不能为空!");
		return;
	}
	szurl = 'http://127.0.0.1/cardno=consume';
	szurl = szurl + '&account=' + szcardno;
	szurl = szurl + '&amount=' + szamount;
	var ds = new Ext.data.Store({
		proxy: new Ext.data.ScriptTagProxy({
			url: szurl
		}),

		reader: new Ext.data.JsonReader({
			id: 'status'
		}, [{
			name: 'status'
		}])

	});

	ds.load({
		scope: this,
		add: false,
		callback: function(records, operation, success) {
			for(var i = 0; i < ds.getCount(); i++) {
				var record = ds.getAt(i);
				var bstatus = record.get('status')
				if(bstatus == 'success') {
					var msgTip = Ext.MessageBox.show({
						title: '扣款提示',
						msg: '扣款成功!'
					});
					if(fn){
						fn();
					}
				} else {
					var msgTip = Ext.MessageBox.show({
						title: '扣款提示',
						msg: '扣款失败!'
					});
				}
			}
		}
	});

	return;
}
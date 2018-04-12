/**
 * @type 活动告警
 */
var activeAlarm = {
	params : {
		tbl : "activeAlarm",
		columns : ["alarmId", "areaId","devId","devName","type","severity","state","alarmTime","confirmUserName",
		"confirmTime","restoreUserName","restoreTime","time"],
		columnNames : ["告警编号", "区域名称", "设备编号","设备名称","告警类型","告警级别","告警状态","发生时间","确认人",
		"确认时间","恢复人","恢复时间","录入时间"]
	},
	alarmTypeStore : new Ext.data.Store({
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : "alarm/type.do"
		}),
		reader : new Ext.data.JsonReader({
				root : 'objects'
			}, [{
				name : 'value',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			}])
	}),
	alarmSeverityStore : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : "alarm/severity.do"
		}),
		reader : new Ext.data.JsonReader({
			root : 'objects'
		}, [{
			name : 'value',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}])
	}),
	store : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : "alarm/activeAlarm/query.do?shield=1"
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'total',
			root : 'objects'
		}, [{
					name : 'id',
					type : 'string'
				}, {
					name : 'alarmId',
					type : 'string'
				}, {
					name : 'zoneId',
					type : 'string'
				},{
					name : 'devId',
					type : 'string'
				},  {
					name : 'devName',
					type : 'string'
				},{
					name : 'type',
					type : 'string'
				},{
					name : 'typeName',
					type : 'string'
				},{
					name : 'severity',
					type : 'string'
				}, {
					name : 'state',
					type : 'string'
				},{
					name : 'alarmTime',
					type : 'string'
				},{
					name : 'confirmUserName',
					type : 'string'
				},{
					name : 'confirmTime',
					type : 'string'
				},{
					name : 'restoreUserName',
					type : 'string'
				},{
					name : 'restoreTime',
					type : 'string'
				},{
					name : "time",
					type : "string"
				},{
					name : "shield",
					type : "string"
				},{
					name : "channel",
					type : "string"
				},{
					name : "range",
					type : "string"
				}]),
		listeners:{
			beforeload:function(){
				globalComponent.progress.startProgress(spmscontent.operating);
			},
			load:function(){
				globalComponent.progress.stopProgress();
			}
		}
	}),
	// 生成主panel
	createGridPanel : function() {
		var sm = new Ext.grid.CheckboxSelectionModel({
			listeners : {
				selectionchange : function(model) {
					var selected = model.getSelections();
					if (selected.length > 0) {
						Ext.getCmp("confirmButton").enable();
						if(selected.length == 1) {
							var record = selected[0];
							if(record.get("channel")){
								Ext.getCmp("replayButton").enable();
							}else{
								Ext.getCmp("replayButton").disable();
							}
						} else {
							Ext.getCmp("replayButton").disable();
						}
						if(role!=2){
							Ext.getCmp("restoreButton").enable();
						}
					} else {
						Ext.getCmp("confirmButton").disable();
						if(role!=2){
							Ext.getCmp("restoreButton").disable();
						}
					}
				}
			}
		});
		// row expander
		var tplHtml = "<br/><table>";
		tplHtml += "<tr><td width=600 height=20><b>防区范围:</b>&nbsp;&nbsp;&nbsp;&nbsp;{range}</td></tr>";
		for(var i=0;i<activeAlarm.params.columnNames.length-spmscontent.rowExpanderNum;i++){
			if(i%3==0){
				tplHtml += "<tr>";
			}
			tplHtml += "<td width=200 height=20><b>"+activeAlarm.params.columnNames[i+spmscontent.rowExpanderNum]+":</b>&nbsp;&nbsp;&nbsp;&nbsp;{"+
			activeAlarm.params.columns[i+spmscontent.rowExpanderNum]+"}</td>";
			if(i%3==2){
				tplHtml += "</tr>";
			}
		}
		tplHtml += "</table>";
		var expander = new Ext.grid.RowExpander({
			tpl : new Ext.Template(tplHtml)
		});
		var cm = new Ext.grid.ColumnModel([expander,sm,
				globalComponent.rowNumberer(activeAlarm.store), {
					header : activeAlarm.params.columnNames[0],
					width : 230,
					dataIndex : activeAlarm.params.columns[0],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				}, {
					header : activeAlarm.params.columnNames[1],
					width : 100,
					dataIndex : activeAlarm.params.columns[1],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						if(value==""){
							value = "无";
						}
						return value;
					}
				}, {
					header : "防区范围",
					width : 120,
					dataIndex : "range",
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						if(value==""){
							value = "无";
						}
						return value;
					}
				}, {
					header : activeAlarm.params.columnNames[2],
					width : 150,
					dataIndex : activeAlarm.params.columns[2],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						if(value=="1111.1111111111.1"){
							value="无";
						}
						return value;
					}
				}, {
					header :activeAlarm.params.columnNames[3],
					width : 100,
					dataIndex : activeAlarm.params.columns[3],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						if(value==""){
							value = "无";
						}
						return value;
					}
				}, {
					header : activeAlarm.params.columnNames[4],
					width : 150,
					dataIndex : "typeName",
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						//告警类型
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[5],
					width : 100,
					dataIndex : activeAlarm.params.columns[5],
					sortable:true,
					align : 'center',
					renderer:function(value, cellmeta, record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						//告警级别
						var count = activeAlarm.alarmSeverityStore.getCount();
						for(var i=0;i<count;i++){
							var record = activeAlarm.alarmSeverityStore.getAt(i);
							if(record.get("value")==value){
								return record.get("name");
							}
						}
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[6],
					width : 100,
					dataIndex : activeAlarm.params.columns[6],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						//告警状态 00:未确认未恢复 01:未确认已恢复 10:已确认未恢复
						if(value==0){
							return "未确认未恢复";
						}else if(value==1){
							return "未确认已恢复";
						}else if(value==10){
							return "已确认未恢复";
						}
						return value;
					}
				},{
					header : "屏蔽状态",
					width : 120,
					dataIndex : "shield",
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						if(value=="1"){
							return "屏蔽";
						}else{
							return "解屏";
						}
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[7],
					width : 120,
					dataIndex : activeAlarm.params.columns[7],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[8],
					width : 100,
					dataIndex : activeAlarm.params.columns[8],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[9],
					width : 120,
					dataIndex : activeAlarm.params.columns[9],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[10],
					width : 100,
					dataIndex : activeAlarm.params.columns[10],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[11],
					width : 120,
					dataIndex : activeAlarm.params.columns[11],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : activeAlarm.params.columnNames[12],
					width : 120,
					dataIndex : activeAlarm.params.columns[12],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						activeAlarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				}]);
				
		var gridPanel = new Ext.grid.GridPanel({
			id:"gridPanel",
			stripeRows : true,
			store : activeAlarm.store,
			sm : sm,
			cm : cm,
			plugins: expander,
			border : false,
			tbar:[' ',' ',' ',' ',
				{xtype:"label",text : spmscontent.searchItem+":"},
				' ',
				" ",
				new Ext.form.ComboBox({
					id : "key",
					store : new Ext.data.SimpleStore({
								data : [
										["all","全部"],
										[activeAlarm.params.columns[4],activeAlarm.params.columnNames[4]],
										[activeAlarm.params.columns[5],activeAlarm.params.columnNames[5]],
										[activeAlarm.params.columns[7],activeAlarm.params.columnNames[7]]],
								fields : ["type", "typename"]
							}),
					displayField : "typename",
					typeAhead : true,
					value : "all",
					valueField : 'type',
					editable : false,
					triggerAction : "all",
					mode : "local",
					forceSelection : true,
					width : 120,
					listeners:{
						"select": function(combo,record, index){
							if (index == 0){
								Ext.getCmp("alarmSeverityComboBox").hide();
								Ext.getCmp("alarmTypeComboBox").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==1){
								var alarmTypeComboBox = Ext.getCmp("alarmTypeComboBox");
								alarmTypeComboBox.show();
								alarmTypeComboBox.reset();
								Ext.getCmp("alarmSeverityComboBox").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==2){
								var alarmSeverityComboBox = Ext.getCmp("alarmSeverityComboBox");
								alarmSeverityComboBox.show();
								alarmSeverityComboBox.reset();
								Ext.getCmp("alarmTypeComboBox").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==3){
								Ext.getCmp("alarmSeverityComboBox").hide();
								Ext.getCmp("alarmTypeComboBox").hide();
								Ext.getCmp("from").show();
								var fromDateCmp = Ext.getCmp("fromDate");
								fromDateCmp.show();
								fromDateCmp.reset();
								Ext.getCmp("to").show();
								var toDateCmp = Ext.getCmp("toDate");
								toDateCmp.show();
								toDateCmp.reset();
							}
						}
					}
				})," "," ",
				new Ext.form.ComboBox({
					id:"alarmTypeComboBox",
					store : activeAlarm.alarmTypeStore,
					displayField : "name",
					emptyText : spmscontent.select,
					typeAhead : true,
					valueField : "value",
					editable : false,
					allowBlank : false,
					triggerAction : "all",
					mode : "local",
					hidden:true,
					width : 150
				}),
				new Ext.form.ComboBox({
					id:"alarmSeverityComboBox",
					store : activeAlarm.alarmSeverityStore,
					displayField : "name",
					emptyText : spmscontent.select,
					typeAhead : true,
					valueField : "value",
					editable : false,
					allowBlank : false,
					triggerAction : "all",
					mode : "local",
					hidden:true,
					width : 150
				})," "," ",{xtype:"label",text :"从:",id:"from",hidden:true},
				{
					xtype : 'datefield',
					id:"fromDate",
					format : 'Y-m-d',
					readOnly:true,
					hidden:true,
					width : 120
				}," "," ",{xtype:"label",text :"到:",id:"to",hidden:true},{
					xtype : 'datefield',
					id:"toDate",
					format : 'Y-m-d',
					readOnly:true,
					hidden:true,
					width : 120
				}, 
				 " "," ",{
					text : spmscontent.query,
					id : "search",
					iconCls : "icon-search",
					listeners : {
						click : function(){
							var key = Ext.getCmp("key").getValue();
							var value="";
							var type=1;//1代表按一个参数查
							if(key=="all"){
								key=null;
							}else if(key==activeAlarm.params.columns[4]){
								value = Ext.getCmp("alarmTypeComboBox").getValue();
								if(value == spmscontent.select){
									value="";
								}
							}else if(key==activeAlarm.params.columns[5]){
								value = Ext.getCmp("alarmSeverityComboBox").getValue();
								if(value == spmscontent.select){
									value="";
								}
							}else{
								var fromDate = Ext.getCmp("fromDate").getRawValue();
								var toDate= Ext.getCmp("toDate").getRawValue();
								if(fromDate==""){
									fromDate="1970-01-01";
								}
								if(toDate==""){
									toDate="2099-01-01";
								}
								
								if(toDate>=fromDate){
									fromDate+=" 00:00:00";
									toDate+=" 23:59:59";
									value = fromDate+spmscontent.columnvaluesplit+toDate;
									type=2;
								}else{
									Ext.Msg.alert(spmscontent.prompt,spmscontent.fromDateToDate);
									return;
								}
							}
							activeAlarm.store.baseParams = {
								key:key,
								value:value,
								type:type
							};
							activeAlarm.store.load({
								params : {
									start : 0,
									limit : globalComponent.pagingPageSize
								}
							});
						}
					}
				}," "," "," ",new Ext.menu.Separator(),
				{
						xtype : "button",
						id : "confirmButton",
						iconCls : "icon-confirm",
						text : "确认告警",
						disabled : true,
						handler : function() {
							var selected = gridPanel.getSelectionModel().getSelections();
							if (selected.length == 0) {
								Ext.Msg.alert(spmscontent.prompt,spmscontent.selectRecord);
								return;
							}
							//告警状态 00:未确认未恢复 01:未确认已恢复 10:已确认未恢复,
							activeAlarm.alarmState(10,selected);
						}
					}," "," "," ",new Ext.menu.Separator({
						hidden :(role==2)
					}),
					{
						xtype : "button",
						id : "restoreButton",
						iconCls : "icon-clear",
						hidden : (role==2),
						text : "恢复告警",
						disabled : true,
						handler : function() {
							var selected = gridPanel.getSelectionModel().getSelections();
							if (selected.length == 0) {
								Ext.Msg.alert(spmscontent.prompt,spmscontent.selectRecord);
								return;
							}
							//告警状态 00:未确认未恢复 01:未确认已恢复 10:已确认未恢复,
							activeAlarm.alarmState(1,selected);
						}
					},
					"-",
					{
						text : "回放",
						id : "replayButton",
						disabled : true,
						iconCls : "icon-replay",
						handler : function() {
							activeAlarm.replay(gridPanel);
						}
					}
			],
			bbar : globalComponent.pagingToolbar(activeAlarm.store),
			listeners : {
				render : function() {
					if(parent.parent.header.alarmChooseSeverity != null){
						Ext.getCmp("key").setValue(activeAlarm.params.columns[5]);
						Ext.getCmp("alarmSeverityComboBox").show();
						Ext.getCmp("alarmSeverityComboBox").setValue(parent.parent.header.alarmChooseSeverity);
						parent.parent.header.alarmChooseSeverity = null;
						Ext.getCmp("search").fireEvent("click");
					}else{
						activeAlarm.store.baseParams = {
							type:0
						};
						activeAlarm.store.load({
							params : {
								start : 0,
								limit : globalComponent.pagingPageSize
							}
						});
					}
				}
			}
		});
		return gridPanel;
	},
	//告警状态 00:未确认未恢复 01:未确认已恢复 10:已确认未恢复 11:已确认已恢复(历史告警)
	//bit:告警位  确认和恢复各占一位 第一位是确认位 第二位是恢复位
	alarmState:function(bit,selected){
		var ids = "";
		for (var i = 0; i < selected.length; i++) {
			var record = selected[i];
			//屏蔽状态
			var shield = record.get("shield");
			if(shield=="1"){
				//为屏蔽状态时不能确认或恢复告警
				continue;
			}
			//告警状态 00:未确认未恢复 01:未确认已恢复 10:已确认未恢复
			var state = record.get(activeAlarm.params.columns[6]);
			if(bit==10){
				//确认告警
				if(state==0||state==1){
					ids += record.get("id")+"-"+state+",";
				}
			}else if(state==0||state==10){
				//恢复告警
				ids += record.get("id")+"-"+state+",";
			}
		}
		var txt = (bit==10?"确认":"恢复");
		if (ids.length > 0) {
			ids = ids.substr(0, ids.length - 1);
		} else {
			Ext.Msg.alert(spmscontent.prompt,"请选择未"+txt+"的告警");
			return;
		}
		Ext.MessageBox.confirm(
			spmscontent.prompt,"确定要"+txt+"选中的告警?",
			function(btn) {
				if (btn == 'yes') {
					globalComponent.progress.startProgress(spmscontent.operating);
					Ext.Ajax.request({
						method : 'POST',
						url : "alarm/activeAlarm/alarmState.do",
						params : {
							ids : ids,
							bit:bit
						},
						success : function(response) {
							globalComponent.progress.stopProgress();
							var respText = Ext.util.JSON.decode(response.responseText);
							if (respText.success) {
								activeAlarm.store.reload();
							} else {
								Ext.Msg.alert(spmscontent.prompt,respText.error);
							}
						},
						failure : function() {
							globalComponent.progress.stopProgress();
							Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
						}
					});
				}
			});
	},
	changeRowBgColor:function(cellmeta, record){
		//告警级别
		var severity=record.get(activeAlarm.params.columns[5]);
		//改行背景色
		if(severity=="1"){
			cellmeta.css="x-grid-record-red";
		}else if(severity=="2"){
			cellmeta.css="x-grid-record-yellow";
		}else if(severity=="3"){
			cellmeta.css="x-grid-record-green";
		}
	},
	refresh:function(){
		activeAlarm.store.baseParams["interceptor"]="1";
		activeAlarm.store.reload();
	},
	replay : function(grid) {
		var selected = grid.getSelectionModel().getSelections();
		if(selected.length == 0) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.selectRecord);
			return;
		}
		if(selected.length != 1) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.selectOnlyOne);
			return;
		}
		var record = selected[0];
		var channel = record.get("channel");
		var alarmTime = record.get(activeAlarm.params.columns[7]);
		var restoreTime = record.get(activeAlarm.params.columns[11]);
		var win = new top.Ext.Window({
			autoScorll : true,
			layout : 'fit',
			closeAction : 'close',
			shadow : true,
			resizable : false,
			modal : true,
			closable : true,
			animCollapse : true,
			constrain : true,
			maximizable : true,
			plain : true,
			items : [{
				html : "<iframe scrolling='auto' frameborder='0' width='100%' height='95%' src='replay.html?channel="
					+ channel
					+ "&starttime="
					+ alarmTime
					+ "&endtime=" + restoreTime + "'></iframe>" 
			}]
		});
		var vs = Ext.getBody().getViewSize();
		win.setSize(1180, vs.height);
		win.setTitle("活动告警回放");
		win.show();
	}	
};
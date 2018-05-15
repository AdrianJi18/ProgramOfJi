/**
 * @type 活动告警
 */
var alarm = {
	params : {
		tbl : "alarm",
		columns : ["alarmId", "zoneId","devId","devName","type","severity","state","alarmTime","confirmUserName",
		"confirmTime","restoreUserName","restoreTime","time"],
		columnNames : ["告警编号", "防区名称", "设备编号","设备标识","告警类型","告警级别","告警状态","发生时间","确认人",
		"确认时间","恢复人","恢复时间","录入时间"]
	},
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
			url : "alarm/query.do"
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
				}, {
					name : 'severity',
					type : 'string'
				}, {
					name : 'state',
					type : 'string'
				},{
					name : 'alarmTime',
					type : 'date',
					dateFormat : 'time'
				},{
					name : 'confirmUserName',
					type : 'string'
				},{
					name : 'confirmTime',
					type : 'date',
					dateFormat : 'time'
				},{
					name : 'restoreUserName',
					type : 'string'
				},{
					name : 'restoreTime',
					type : 'date',
					dateFormat : 'time'
				},{
					name : "time",
					type : 'date',
					dateFormat : 'time'
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
						if(role!=4){
							Ext.getCmp("restoreButton").enable();
						}
					} else {
						Ext.getCmp("confirmButton").disable();
						if(role!=4){
							Ext.getCmp("restoreButton").disable();
						}
					}
				}
			}
		});
		// row expander
		var tplHtml = "<br/><table>";
		tplHtml += "<tr><td width=600 height=20><b>防区范围:</b>&nbsp;&nbsp;&nbsp;&nbsp;{range}</td></tr>";
		for(var i=0;i<alarm.params.columnNames.length-spmscontent.rowExpanderNum;i++){
			if(i%3==0){
				tplHtml += "<tr>";
			}
			tplHtml += "<td width=200 height=20><b>"+alarm.params.columnNames[i+spmscontent.rowExpanderNum]+":</b>&nbsp;&nbsp;&nbsp;&nbsp;{"+
			alarm.params.columns[i+spmscontent.rowExpanderNum]+"}</td>";
			if(i%3==2){
				tplHtml += "</tr>";
			}
		}
		tplHtml += "</table>";
		var expander = new Ext.grid.RowExpander({
			tpl : new Ext.Template(tplHtml)
		});
		var cm = new Ext.grid.ColumnModel([expander,sm,
				globalComponent.rowNumberer(alarm.store), {
					header : alarm.params.columnNames[0],
					width : 230,
					dataIndex : alarm.params.columns[0],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				}, {
					header : alarm.params.columnNames[1],
					width : 100,
					dataIndex : alarm.params.columns[1],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
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
						alarm.changeRowBgColor(cellmeta, record);
						if(value==""){
							value = "无";
						}
						return value;
					}
				}, {
					header : alarm.params.columnNames[2],
					width : 150,
					dataIndex : alarm.params.columns[2],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						if(value=="1111.1111111111.1"){
							value="无";
						}
						return value;
					}
				}, {
					header :alarm.params.columnNames[3],
					width : 100,
					dataIndex : alarm.params.columns[3],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						if(value==""){
							value = "无";
						}
						return value;
					}
				}, {
					header : alarm.params.columnNames[4],
					width : 150,
					dataIndex : alarm.params.columnNames[4],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						//告警类型
						return value;
					}
				},{
					header : alarm.params.columnNames[5],
					width : 100,
					dataIndex : alarm.params.columns[5],
					sortable:true,
					align : 'center',
					renderer:function(value, cellmeta, record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						//告警级别
						if(value==1){
							return "紧急";
						}else if(value==2){
							return "重要";
						}else if(value==3){
							return "一般";
						}
						return value;
					}
				},{
					header : alarm.params.columnNames[6],
					width : 100,
					dataIndex : alarm.params.columns[6],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
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
					header : alarm.params.columnNames[7],
					width : 120,
					dataIndex : alarm.params.columns[7],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						if(value == ""){
							return value;
						}
						return new Date(value).format('Y-m-d h:i:s');
					}
				},{
					header : alarm.params.columnNames[8],
					width : 100,
					dataIndex : alarm.params.columns[8],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : alarm.params.columnNames[9],
					width : 120,
					dataIndex : alarm.params.columns[9],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						if(value == ""){
							return value;
						}
						return new Date(value).format('Y-m-d h:i:s');
					}
				},{
					header : alarm.params.columnNames[10],
					width : 100,
					dataIndex : alarm.params.columns[10],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						return value;
					}
				},{
					header : alarm.params.columnNames[11],
					width : 120,
					dataIndex : alarm.params.columns[11],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						if(value == ""){
							return value;
						}
						return new Date(value).format('Y-m-d h:i:s');
					}
				},{
					header : alarm.params.columnNames[12],
					width : 120,
					dataIndex : alarm.params.columns[12],
					sortable:true,
					align : 'center',
					renderer:function(value,cellmeta,record){
						//改行背景色
						alarm.changeRowBgColor(cellmeta, record);
						if(value == ""){
							return value;
						}
						return new Date(value).format('Y-m-d h:i:s');
					}
				}]);
				
		var gridPanel = new Ext.grid.GridPanel({
			id:"gridPanel",
			stripeRows : true,
			store : alarm.store,
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
										[alarm.params.columns[4],alarm.params.columnNames[4]],
										[alarm.params.columns[5],alarm.params.columnNames[5]],
										[alarm.params.columns[7],alarm.params.columnNames[7]]],
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
								Ext.getCmp("severity").hide();
								Ext.getCmp("type").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==1){
								var alarmTypeComboBox = Ext.getCmp("type");
								alarmTypeComboBox.show();
								alarmTypeComboBox.reset();
								Ext.getCmp("severity").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==2){
								var alarmSeverityComboBox = Ext.getCmp("severity");
								alarmSeverityComboBox.show();
								alarmSeverityComboBox.reset();
								Ext.getCmp("type").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==3){
								Ext.getCmp("severity").hide();
								Ext.getCmp("type").hide();
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
					id:"type",
					store: new Ext.data.SimpleStore({  
                        fields: ['id', 'name'],  
                        data: [[1, '天气告警'], [2, '环境指标告警']]  
					}),
					displayField : "name",
					emptyText : spmscontent.select,
					typeAhead : true,
					valueField : "id",
					editable : false,
					allowBlank : false,
					triggerAction : "all",
					mode : "local",
					hidden:true,
					width : 150
				}),
				new Ext.form.ComboBox({
					id:"severity",
					store: new Ext.data.SimpleStore({  
                        fields: ['id', 'name'],  
                        data: [[1, '紧急'], [2, '重要'], [3, '一般']]  
					}),
					displayField : "name",
					emptyText : spmscontent.select,
					typeAhead : true,
					valueField : "id",
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
							}else if(key==alarm.params.columns[4]){
								value = Ext.getCmp("type").getValue();
								if(value == spmscontent.select){
									value="";
								}
							}else if(key==alarm.params.columns[5]){
								value = Ext.getCmp("severity").getValue();
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
							alarm.store.baseParams = {
								key:key,
								value:value,
								type:type
							};
							alarm.store.load({
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
							alarm.alarmState(10,selected);
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
							alarm.alarmState(1,selected);
						}
					}
			],
			bbar : globalComponent.pagingToolbar(alarm.store),
			listeners : {
				render : function() {
					if(parent.parent.header.alarmChooseSeverity != null){
						Ext.getCmp("key").setValue(alarm.params.columns[5]);
						Ext.getCmp("alarmSeverityComboBox").show();
						Ext.getCmp("alarmSeverityComboBox").setValue(parent.parent.header.alarmChooseSeverity);
						parent.parent.header.alarmChooseSeverity = null;
						Ext.getCmp("search").fireEvent("click");
					}else{
						alarm.store.baseParams = {
							type:0
						};
						alarm.store.load({
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
			var state = record.get(alarm.params.columns[6]);
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
			Ext.Msg.alert(spmscontent.prompt,"请选择未"+txt+"的解屏告警");
			return;
		}
		Ext.MessageBox.confirm(
			spmscontent.prompt,"确定要"+txt+"选中的告警?",
			function(btn) {
				if (btn == 'yes') {
					globalComponent.progress.startProgress(spmscontent.operating);
					Ext.Ajax.request({
						method : 'POST',
						url : "alarm/alarmState.do",
						params : {
							ids : ids,
							bit:bit
						},
						success : function(response) {
							globalComponent.progress.stopProgress();
							var respText = Ext.util.JSON.decode(response.responseText);
							if (respText.success) {
								alarm.store.reload();
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
		var severity=record.get(alarm.params.columns[5]);
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
		alarm.store.baseParams["interceptor"]="1";
		alarm.store.reload();
	}
};
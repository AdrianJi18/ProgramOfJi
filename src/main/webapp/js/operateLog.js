/**
 * @type 操作日志
 */
var operateLog = {
	params : {
		tbl : "operateLog",
		columns : ["userName", "time","type","description","result"]
	},
	type:["增加","删除","修改","查询","导出","备份","恢复","查看"],
	store : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : "operateLog/query.do"
				}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'total',
					root : 'objects'
				}, [{
							name : 'userName',
							type : 'string'
						}, {
							name : 'time',
							type : 'date',
							dateFormat : 'time'
						}, {
							name : 'type',
							type : 'string'
						}, {
							name : 'description',
							type : 'string'
						}, {
							name : 'result',
							type : 'string'
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
		var cm = new Ext.grid.ColumnModel([
				globalComponent.rowNumberer(operateLog.store), {
					header : "操作用户",
					width : 100,
					dataIndex : operateLog.params.columns[0],
					sortable:true,
					align : 'center'
				}, {
					header : "操作时间",
					width : 150,
					dataIndex : operateLog.params.columns[1],
					sortable:true,
					renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
					align : 'center'
				}, {
					header : "操作类型",
					width : 100,
					dataIndex : operateLog.params.columns[2],
					sortable:true,
					align : 'center',
					renderer:function(value){
						return operateLog.type[value-1];
					}
				}, {
					header : "操作对象",
					width : 150,
					dataIndex : operateLog.params.columns[3],
					sortable:true,
					align : 'center'
				}, {
					header : "操作结果",
					width : 300,
					dataIndex : operateLog.params.columns[4],
					sortable:true,
					align : 'center'
				}]);
		var gridPanel = new Ext.grid.GridPanel({
			stripeRows : true,
			store : operateLog.store,
			cm : cm,
			border : false,
			tbar:[' ',' ',' ',' ',
				{xtype:"label",text : spmscontent.searchItem+":"},
				' ',
				{
					xtype:"textfield",
					emptyText:"操作用户",
					id:operateLog.params.columns[0],
					width : 120,
					maxLength : 10
				}," "," ",new Ext.form.ComboBox({
				 	id:operateLog.params.columns[2],
					store : new Ext.data.SimpleStore({
								data : [
										["1",operateLog.type[0]],
										["2",operateLog.type[1]],
										["3", operateLog.type[2]],
										["4", operateLog.type[3]],
										["5", operateLog.type[4]],
										["6", operateLog.type[5]],
										["7", operateLog.type[6]],
										["8", operateLog.type[7]]
										],
								fields : ["type", "typename"]
							}),
					displayField : "typename",
					typeAhead : true,
					valueField : 'type',
					editable : false,
					emptyText:"操作类型",
					triggerAction : "all",
					mode : "local",
					forceSelection : true,
					width : 120
				})," "," ",{xtype:"label",text :"从:",id:"from"},
				{
					xtype : 'datefield',
					id:"fromDate",
					format : 'Y-m-d',
					readOnly:true,
					emptyText:"操作时间",
					width : 120
				}," "," ",{xtype:"label",text :"到:",id:"to"},{
					xtype : 'datefield',
					id:"toDate",
					format : 'Y-m-d',
					readOnly:true,
					emptyText:"操作时间",
					width : 120
				}," "," ", {
					text : spmscontent.query,
					iconCls : "icon-search",
					handler : function() {				
						var userName = Ext.getCmp(operateLog.params.columns[0]).getValue();
						var type = Ext.getCmp(operateLog.params.columns[2]).getValue();
						// 操作用户
						if(userName=="操作用户"){
							userName="";
						}
						//操作类型 1:增加 2:删除 3:修改 4:查询 5:导出 6:备份 7:恢复
						if(type=="操作类型" || type==""){
							type=-1;
						}
						// 发生时间
						var fromDate = Ext.getCmp("fromDate").getRawValue();
						// 结束时间
						var toDate = Ext.getCmp("toDate").getRawValue();
						if (toDate != "" && toDate < fromDate) {
							Ext.Msg.alert(spmscontent.prompt,spmscontent.fromDateToDate);
							return;
						}
						if (fromDate != "") {
							fromDate += " 00:00:00";
						}
						if (toDate != "") {
							toDate += " 23:59:59";
						}
						
						operateLog.store.baseParams = {
							userName:userName,
							type:type,
							fromDate:fromDate,
							toDate:toDate
						};
						operateLog.store.load({
							params : {
								start : 0,
								limit : globalComponent.pagingPageSize
							}
						});
					}
				},"-",{
					text : "重置",
					iconCls : "icon-reset",
					handler : function() {				
						Ext.getCmp(operateLog.params.columns[0]).reset();
						Ext.getCmp(operateLog.params.columns[2]).reset();
						Ext.getCmp("fromDate").reset();
						Ext.getCmp("toDate").reset();
					}
				}," ", " ", " ", " ", " ", "-", {
					xtype : "button",
					iconCls : "icon-export",
					text : "导出",
					handler : function() {
						Ext.MessageBox.confirm(spmscontent.prompt,
							"导出数据需要较长时间,是否导出?", function(btn) {
								if (btn == 'yes') {
									operateLog.exportOperateLog();
								}
							});
					}
				}
			],
			bbar : globalComponent.pagingToolbar(operateLog.store),
			listeners : {
				render : function() {
					operateLog.store.baseParams = {
						type:-1
					};
					operateLog.store.load({
						params : {
							start : 0,
							limit : globalComponent.pagingPageSize
						}
					});
				}
			}
		});
		return gridPanel;
	},
	exportOperateLog:function(){
		globalComponent.progress.startProgress(spmscontent.operating);
		var userName = Ext.getCmp(operateLog.params.columns[0]).getValue();
		var type = Ext.getCmp(operateLog.params.columns[2]).getValue();
		// 操作用户
		if(userName=="操作用户"){
			userName="";
		}
		//操作类型 1:增加 2:删除 3:修改 4:查询 5:导出 6:备份 7:恢复
		if(type=="操作类型" || type==""){
			type=-1;
		}
		// 发生时间
		var fromDate = Ext.getCmp("fromDate").getRawValue();
		// 结束时间
		var toDate = Ext.getCmp("toDate").getRawValue();
		if (toDate != "" && toDate < fromDate) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.fromDateToDate);
			return;
		}
		if (fromDate != "") {
			fromDate += " 00:00:00";
		}
		if (toDate != "") {
			toDate += " 23:59:59";
		}
		Ext.Ajax.request({
			method : "post",
			url : "operateLog/export.do",
			params : {
				userName:userName,
				type:type,
				fromDate:fromDate,
				toDate:toDate
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					window.location = "backup/log/"+ respText.fileName;
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	}
};
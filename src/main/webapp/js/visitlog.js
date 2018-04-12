/**
 * @type 访问日志
 */
var visitlog = {
	params : {
		tbl : "visitlog",
		columns : ["userName", "visitime","exitime"]
	},
	store : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : "visitlog/query.do"
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'total',
			root : 'objects'
		}, [{
					name : 'userName',
					type : 'string'
				}, {
					name : 'visitime',
					type : 'date',
					dateFormat : "time"
				}, {
					name : 'exitime',
					type : 'date',
					dateFormat : "time"
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
				globalComponent.rowNumberer(visitlog.store), {
					header : "用户名",
					width : 200,
					dataIndex : visitlog.params.columns[0],
					sortable:true,
					align : 'center'
				}, {
					header : "访问时间",
					width : 250,
					dataIndex : visitlog.params.columns[1],
					sortable:true,
					renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
					align : 'center'
				}, {
					header : "退出时间",
					width : 250,
					dataIndex : visitlog.params.columns[2],
					sortable:true,
					renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
					align : 'center'
				}]);
		var gridPanel = new Ext.grid.GridPanel({
			stripeRows : true,
			store : visitlog.store,
			cm : cm,
			border : false,
			tbar:[' ',' ',' ',' ',
				{xtype:"label",text : spmscontent.searchItem+":"},
				' ',
				new Ext.form.ComboBox({
					id : "key",
					fieldLabel : "查询项",
					store : new Ext.data.SimpleStore({
								data : [
										["all","全部"],
										["userName","用户名"],
										["visitime", "访问时间"]],
								fields : ["type", "typename"]
							}),
					displayField : "typename",
					typeAhead : true,
					value : "all",
					valueField : 'type',
					editable : false,
					allowBlank : false,
					triggerAction : "all",
					mode : "local",
					forceSelection : true,
					width : 120,
					listeners:{
						"select": function(combo,record, index){
							if (index == 0){
								Ext.getCmp("userName").hide();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==1){
								var userNameCmp = Ext.getCmp("userName");
								userNameCmp.show();
								userNameCmp.reset();
								Ext.getCmp("from").hide();
								Ext.getCmp("fromDate").hide();
								Ext.getCmp("to").hide();
								Ext.getCmp("toDate").hide();
							}else if(index==2){
								Ext.getCmp("userName").hide();
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
				})," ",{
					xtype:"textfield",
					emptyText:"关键字",
					id:"userName",
					hidden:true,
					width : 120,
					maxLength : 10
				},
				" "," ",{xtype:"label",text :"从:",id:"from",hidden:true},
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
				}, " "," ",{
					text : spmscontent.query,
					iconCls : "icon-search",
					handler : function() {				
						var value="";	
						var key = Ext.getCmp("key").getValue();
						var type=1;//1代表按一个参数查
						if(key=="all"){
							key=null;
						}
						else if(key=="userName"){
							value = Ext.getCmp("userName").getValue();
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
						visitlog.store.baseParams = {
							key:key,
							value:value,
							type:type
						};
						visitlog.store.load({
							params : {
								start : 0,
								limit : globalComponent.pagingPageSize
							}
						});
					}
				}, " ", " ", " ", " ", " ", "-", {
					xtype : "button",
					iconCls : "icon-export",
					text : "导出",
					handler : function() {
						Ext.MessageBox.confirm(spmscontent.prompt,
							"导出数据需要较长时间,是否导出?", function(btn) {
								if (btn == 'yes') {
									visitlog.exportVisitlog();
								}
							});
					}
				}
			],
			bbar : globalComponent.pagingToolbar(visitlog.store),
			listeners : {
				render : function() {
					visitlog.store.baseParams = {
						type:0
					};
					visitlog.store.load({
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
	exportVisitlog:function(){
		globalComponent.progress.startProgress(spmscontent.operating);
		var value="";	
		var key = Ext.getCmp("key").getValue();
		var type=1;//1代表按一个参数查
		if(key=="all"){
			key=null;
		}
		else if(key=="userName"){
			value = Ext.getCmp("userName").getValue();
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
		Ext.Ajax.request({
			method : "post",
			url : "visitlog/export.do",
			params : {
				key:key,
				value:value,
				type:type
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
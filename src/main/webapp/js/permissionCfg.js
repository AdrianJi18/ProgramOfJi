/**
 * @type 权限配置
 */
var permissionCfg = {
	initMenuHtmlFlag:false,
	//所有等级3的菜单Id
	level3Ids:null,
	params : {
		record : null,
		tbl : "permission",
		columns : ["name", "role",
				"level1","level2","level3"]
	},
	store : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'user/permission/get.do'
		}),
		reader : new Ext.data.JsonReader({
				totalProperty : 'total',
				root : 'objects'
			}, [{
				name : 'id',
				type : 'string'
			}, {
				name : "name",
				type : 'string'
			}, {
				name : "role",
				type : 'string'
			}, {
				name : "level1",
				type : 'string'
			}, {
				name : "level2",
				type : 'string'
			},{
				name : "level3",
				type : 'string'
			},{
				name:"level3MenuIds",
				type:"string"
			}])
	}),
	// 生成主panel
	createGridPanel : function() {
		var sm = new Ext.grid.CheckboxSelectionModel({
			listeners : {
				selectionchange : function(model) {
					var selected = model.getSelections();
					if (selected.length == 1) {
						Ext.getCmp("updatePermissionCfgButton").enable();
					} else {
						Ext.getCmp("updatePermissionCfgButton").disable();
					}
					//超级管理员权限
					if (selected.length > 0) {
						Ext.getCmp("deletePermissionCfgButton").enable();
					} else {
						Ext.getCmp("deletePermissionCfgButton").disable();
					}
				}
			}
		});
		var cm = new Ext.grid.ColumnModel([sm,
				globalComponent.rowNumberer(permissionCfg.store), {
					header : "名称",
					width : 100,
					dataIndex : permissionCfg.params.columns[0],
					align : 'center'
				}, {
					header : "角色",
					width : 100,
					dataIndex : permissionCfg.params.columns[1],
					align : 'center',
					renderer : function(value) {
						if (value == "0") {
							return "超级管理员";
						} else if (value == "1") {
							return "饲养管理员";
						} else if (value == "2") {
							return "生产管理员";
						} else if (value == "3") {
							return "销售管理员";
						} else if (value == "4") {
							return "普通用户";
						}else {
							return value;
						}
					}
				}, {
					header : "主菜单权限",
					width : 200,
					dataIndex : permissionCfg.params.columns[2],
					align : 'center'
					
				}, {
					header : "次菜单权限",
					width : 300,
					dataIndex : permissionCfg.params.columns[3],
					align : 'center'
					
				}, {
					header : "三级菜单权限",
					width : 350,
					dataIndex : permissionCfg.params.columns[4],
					align : 'center'
					
				}]);
		var gridPanel = new Ext.grid.GridPanel({
			stripeRows : true,
			store : permissionCfg.store,
			sm : sm,
			cm : cm,
			border : false,
			tbar : [{
						xtype : "button",
						iconCls : "icon-add",
						text : spmscontent.add,
						handler : function() {
							permissionCfg.addPermissionCfg();
						}
					},"-", {
						xtype : "button",
						iconCls : "icon-update",
						id:"updatePermissionCfgButton",
						text : spmscontent.modify,
						disabled : true,
						handler : function() {
							permissionCfg.updatePermissionCfg(gridPanel);
						}
					}, "-", {
						xtype : "button",
						iconCls : "icon-remove",
						id:"deletePermissionCfgButton",
						text : spmscontent.del,
						disabled : true,
						handler : function() {
							var selected = gridPanel.getSelectionModel().getSelections();
							if (selected.length == 0) {
								Ext.Msg.alert(spmscontent.prompt,spmscontent.selectRecord);
								return;
							}
							Ext.MessageBox.confirm(spmscontent.prompt,spmscontent.delConfirm,
								function(btn) {
									if (btn == 'yes') {
										permissionCfg.deletePermissionCfg(selected);
									}
								});
						}
					}],
			listeners : {
				render : function() {
					permissionCfg.store.load();
				}
			}
		});
		return gridPanel;
	},
	addPermissionCfg : function() {
		permissionCfg.params.record = null;
		var win = permissionCfg.createWin();
		win.setTitle(spmscontent.add+"权限配置");
		win.show();
		var fromPanel = Ext.getCmp("permissionCfgFormPanel");
		fromPanel.getForm().reset();
		permissionCfg.initMenuHtml();
		//重置html的菜单checkbox
		permissionCfg.resetAllCheckbox();
	},
	createWin : function() {
		var win = Ext.getCmp("permissionCfgWin");
		if (win == null) {
			win = new Ext.Window({
				autoScorll : true,
				id : "permissionCfgWin",
				layout : 'fit',
				width : 550,
				height : 400,
				closeAction : 'hide',
				shadow : true,
				resizable : false,
				modal : true,
				closable : true,
				animCollapse : true,
				plain : true,
				items : [permissionCfg.createFormPanel()],
				buttons : [{
							text : spmscontent.save,
							handler : function() {
								var menuIds = permissionCfg.checkFormPanel();
								if(!menuIds){
									return;
								}
								if (permissionCfg.params.record) {
									permissionCfg.updateToDB(menuIds);
								} else {
									permissionCfg.saveToDB(menuIds);
								}
							}
						}, {
							text : spmscontent.cancel,
							handler : function() {
								win.hide();
							}
						}]
			});
		}
		return win;
	},
	createFormPanel : function() {
		var fromPanel = new Ext.FormPanel({
			id : "permissionCfgFormPanel",
			labelAlign : 'left',
			labelWidth : 80,
			bodyStyle : 'background-color:#d9ede8;padding:5px;5px;5px;5px;',
			border : false,
			waitMsgTarget : true,
			autoScroll:true,
			items : [{
				layout : 'column',
				bodyStyle : 'background-color:#d9ede8;',
				border : false,
				items : [{
					columnWidth : 1,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "名称",
						id : permissionCfg.params.columns[0],
						width : 350,
						allowBlank : false,
						maxLength : 20
					}]
				},{
					bodyStyle : 'background-color:#d9ede8;',
					columnWidth : 1,
					layout : 'form',
					border : false,
					items : [new Ext.form.ComboBox({
						id :permissionCfg.params.columns[1],
						fieldLabel : "角色",
						store : new Ext.data.SimpleStore({
							data : [['1', "饲养管理员"],
									['2', "生产管理员"],
									['3', "销售管理员"],
									['4', "普通用户"]],
							fields : ["type", "typename"]
						}),
						displayField : "typename",
						emptyText : spmscontent.select,
						typeAhead : true,
						value : "2",
						valueField : 'type',
						editable : false,
						allowBlank : false,
						triggerAction : "all",
						mode : "local",
						forceSelection : true,
						width : 120
					})]
				},{
					bodyStyle : 'background-color:#d9ede8;',
					columnWidth : 1,
					layout : 'form',
					border : false,
					items : [{
						xtype:"checkbox",
						fieldLabel : "选择菜单",
						listeners:{
							check:function(checkbox, checked){
								for(var i=0;i<permissionCfg.level3Ids.length;i++){
									document.getElementById(permissionCfg.level3Ids[i]).checked = checked;
								}
							}
						}
					}]
				},{
					bodyStyle : 'background-color:#d9ede8;',
					columnWidth : .1,
					layout : 'form',
					border : false,
					items : [{
						xtype:"label"
					}]
				},{
					bodyStyle : 'background-color:#d9ede8;',
					columnWidth : .9,
					layout : 'form',
					border : false,
					id:"menuHtml",
					xtype:"panel"
				}]
			}]
		});
		return fromPanel;
	},
	deletePermissionCfg : function(selected) {
		var ids = "";
		for (var i = 0; i < selected.length; i++) {
			var record = selected[i];
			ids += record.get("id") + "-";
		}
		if (ids.length > 0) {
			ids = ids.substr(0, ids.length - 1);
		} else {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.noDeleteItem);
			return;
		}
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : "post",
			url : "permission/delete.do",
			params : {
				tbl : permissionCfg.params.tbl,
				ids : ids
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					permissionCfg.store.reload();
				} else {
					Ext.Msg.alert(spmscontent.prompt,respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	},
	initMenuHtml:function(){
		if(permissionCfg.initMenuHtmlFlag){
			return;
		}
		permissionCfg.initMenuHtmlFlag = true;
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : "user/permission/menusHtml.do",
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					document.getElementById("menuHtml").innerHTML = "<table style='font-size:12px'>"+respText.html+"</table>";
					permissionCfg.level3Ids = respText.level3Ids;
					
					if(permissionCfg.params.record){
						var level3MenuIdArr= permissionCfg.params.record.get("level3MenuIds").split("-");
						for(var i=0;i<level3MenuIdArr.length;i++){
							document.getElementById(level3MenuIdArr[i]).checked = true;
						}
					}
				} else {
					Ext.Msg.alert(spmscontent.prompt,respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	},
	checkFormPanel:function(){
		var fromPanel = Ext.getCmp("permissionCfgFormPanel");
		if (!fromPanel.getForm().isValid()) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.validForm);
			return false;
		}
		var menuIds = "";
		for(var i=0;i<permissionCfg.level3Ids.length;i++){
			var level3Id = permissionCfg.level3Ids[i];
			var item = document.getElementById(level3Id);
			if(item.checked){
				menuIds+=level3Id+"-";
			}
		}
		if(menuIds==""){
			Ext.Msg.alert(spmscontent.prompt,"请选择菜单.");
			return false;
		}else{
			menuIds = menuIds.substr(0, menuIds.length - 1);
			return menuIds;
		}
	},
	/**
	 * 新增保存.
	 * @param {} menuIds
	 */
	saveToDB:function(menuIds){
		var name = Ext.getCmp(permissionCfg.params.columns[0]).getValue();
		var role = Ext.getCmp(permissionCfg.params.columns[1]).getValue();
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : "user/permission/add.do",
			params : {
				name:name,
				role : role,
				menuIds : menuIds
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					permissionCfg.store.reload();
					permissionCfg.createWin().hide();
				} else {
					Ext.Msg.alert(spmscontent.prompt,respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	},
	updatePermissionCfg : function(grid) {
		var selected = grid.getSelectionModel().getSelections();
		if (selected.length == 0) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.selectRecord);
			return;
		}
		if (selected.length != 1) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.selectOnlyOne);
			return;
		}
		permissionCfg.params.record = selected[0];
		var win = permissionCfg.createWin();
		win.setTitle(spmscontent.modify+"权限配置");
		win.show();
		var fromPanel = Ext.getCmp("permissionCfgFormPanel");
		fromPanel.getForm().reset();
		fromPanel.getForm().setValues(permissionCfg.params.record.data);
		permissionCfg.initMenuHtml();
		//重置html的菜单checkbox
		permissionCfg.resetAllCheckbox();
		
		if(permissionCfg.level3Ids){
			var level3MenuIdArr= permissionCfg.params.record.get("level3MenuIds").split("-");
			for(var i=0;i<level3MenuIdArr.length;i++){
				document.getElementById(level3MenuIdArr[i]).checked = true;
			}
		}
	},
	updateToDB : function(menuIds) {
		var name = Ext.getCmp(permissionCfg.params.columns[0]).getValue();
		var role = Ext.getCmp(permissionCfg.params.columns[1]).getValue();
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : "user/permission/update.do",
			params : {
				id:permissionCfg.params.record.get("id"),
				name:name,
				role : role,
				menuIds : menuIds
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					permissionCfg.store.reload();
					permissionCfg.createWin().hide();
				} else {
					Ext.Msg.alert(spmscontent.prompt,respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	},
	/**
	 * 重置html里的checkbox
	 */
	resetAllCheckbox:function(){
		if(permissionCfg.level3Ids){
			for(var i=0;i<permissionCfg.level3Ids.length;i++){
				var checkbox = document.getElementById(permissionCfg.level3Ids[i]);
				if(checkbox){
					checkbox.checked = false;
				}else{
					return;
				}
			}
		}
	}
}
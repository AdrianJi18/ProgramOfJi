/**
 * @type 用户配置
 */
var userCfg = {
	params : {
		record : null,
		tbl : "user",
		columns : ["userName","permissionId", "trueName", "age","phone","addr","area","identity",
			 "audit"]
	},
	resetPasswordSelected : null,
	permissionStore : new Ext.data.Store({
		autoLoad : true,
		baseParams : {
			tbl : "permission",
			start : 0,
			limit : 20
		},
		proxy : new Ext.data.HttpProxy({
					url : "common/query.do"

				}),
		reader : new Ext.data.JsonReader({
					root : 'objects'
				}, [{
					name : 'name',
					type : 'string'
				}, {
					name : 'id',
					type : 'int'
				}])
	}),
	store : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : "user/getUsersByPid.do"
				}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'total',
					root : 'objects'
				}, [{
					name : 'id',
					type : 'int'
				}, {
					name : 'userName',
					type : 'string'
				}, {
					name : 'permissionId',
					type : 'int'
				}, {
					name : 'permissionName',
					type : 'string'
				}, {
					name : 'trueName',
					type : 'string'
				}, {
					name : 'age',
					type : 'int'
				}, {
					name : 'phone',
					type : 'string'
				},{
					name : 'addr',
					type : 'string'
				},{
					name : "area",
					type : 'string'
				},{
					name : "identity",
					type : 'string'
				}, {
					name : 'audit',
					type : 'string'
				}])
			}),
	createFormPanel : function() {
		var fromPanel = new Ext.FormPanel({
			id : "userCfgFormPanel",
			labelAlign : 'right',
			autoScroll : true,
			labelWidth : 80,
			bodyStyle : 'background-color:#d9ede8;padding:5px;5px;5px;5px;',
			border : false,
			waitMsgTarget : true,
			items : [{
				layout : 'column',
				bodyStyle : 'background-color:#d9ede8;',
				border : false,
				items : [{
					columnWidth : 1.0,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					emptyText : spmscontent.select,
					items : [{
								fieldLabel : "用户名",
								id : userCfg.params.columns[0],
								width : 120,
								allowBlank : false,
								maxLength : 20
							}]
				}, {
					columnWidth : .49,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					id : "passwordForm",
					items : [{
								fieldLabel : "密码",
								id : "password",
								width : 120,
								inputType : "password",
								allowBlank : false,
								maxLength : 20
							}]
				}, {
					columnWidth : .49,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					id : "confirmPasswordForm",
					items : [{
								fieldLabel : "确认密码",
								id : "confirmPassword",
								width : 120,
								inputType : "password",
								allowBlank : false,
								maxLength : 20
							}]
				}, {
					columnWidth : .51,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					items : [{
								fieldLabel : "用户真实姓名",
								id : userCfg.params.columns[2],
								allowBlank : false,
								width : 120,
								maxLength : 20
							}]
				}, {
					columnWidth : .49,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					items : [{
								fieldLabel : "年龄",
								id : userCfg.params.columns[3],
								width : 120,
								maxLength : 16
							}]
				}, {
					columnWidth : .49,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'uxnumberField',
					items : [{
								fieldLabel : "联系方式",
								id : userCfg.params.columns[4],
								width : 120,
								minLength : 11,
								maxLength : 11,
								allowBlank : false,
								tooltip : "请输入手机号码"
							}]
				}, {
					columnWidth : .51,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					items : [{
								fieldLabel : "住址",
								id : userCfg.params.columns[5],
								width : 120
							}]
				}, {
					columnWidth : 1,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					items : [new Ext.form.ComboBox({  
			                     id: userCfg.params.columns[6],  
			                     typeAhead: true,  
			                     triggerAction: 'all',  
			                     fieldLabel: '管辖区域',  
			                     width: 160,  
			                     displayField: 'name',  
			                     emptyText: spmscontent.select,  
			                     valueField: 'id',  
			                     readOnly: true,  
			                     mode: 'local',  
			                     store: new Ext.data.SimpleStore({  
			                            fields: ['id', 'name'],  
			                            data: [[1, '饲养中心'], [2, '生产中心'], [3, '销售中心']]  
			                     })  
			              })]
				}, {
					columnWidth : 1,
					layout : 'form',
					bodyStyle : 'background-color:#d9ede8;',
					border : false,
					defaultType : 'textfield',
					items : [new Ext.form.ComboBox({  
			                     id: userCfg.params.columns[7],  
			                     typeAhead: true,  
			                     triggerAction: 'all',  
			                     fieldLabel: '身份',  
			                     width: 160,  
			                     displayField: 'name',  
			                     emptyText: spmscontent.select,  
			                     valueField: 'id',  
			                     readOnly: true,  
			                     mode: 'local',  
			                     store: new Ext.data.SimpleStore({  
			                            fields: ['id', 'name'],  
			                            data: [[1, '饲养管理员'], [2, '生产管理员'], [3, '销售管理员'], [4, '普通用户']]  
			                     })  
			              })]
				}, {
					bodyStyle : 'background-color:#d9ede8;',
					columnWidth : .49,
					layout : 'form',
					border : false,
					items : [new Ext.form.ComboBox({
								id : userCfg.params.columns[1],
								fieldLabel : "权限",
								store : userCfg.permissionStore,
								displayField : "name",
								typeAhead : true,
								valueField : 'id',
								editable : false,
								allowBlank : false,
								triggerAction : "all",
								emptyText : spmscontent.select,
								mode : "local",
								forceSelection : true,
								width : 120
							})]
				}]
			}]
		});
		return fromPanel;
	},
	// 生成主panel
	createGridPanel : function() {
		var sm = new Ext.grid.CheckboxSelectionModel({
			listeners : {
				selectionchange : function(model) {
					var selected = model.getSelections();
					if (selected.length == 1) {
						Ext.getCmp("updateUserCfgButton").enable();
					} else {
						Ext.getCmp("updateUserCfgButton").disable();
					}
					if (role == 0) {
						// 超级管理员权限
						if (selected.length > 0) {
							Ext.getCmp("resetPasswordButton").enable();
						} else {
							Ext.getCmp("resetPasswordButton").disable();
						}
					}

					if (role == 0 || role == 1 || role == 2 || role == 3) {
						// 管理员权限
						if (selected.length > 0) {
							Ext.getCmp("deleteUserCfgButton").enable();
							Ext.getCmp("auditUserCfgButton").enable();
						} else {
							Ext.getCmp("deleteUserCfgButton").disable();
							Ext.getCmp("auditUserCfgButton").disable();
						}
					}
				}
			}
		});
		var cm = new Ext.grid.ColumnModel([sm,
				globalComponent.rowNumberer(userCfg.store), {
					header : "用户名",
					width : 100,
					dataIndex : userCfg.params.columns[0],
					sortable : true,
					align : 'center'
				}, {
					header : "权限名称",
					width : 100,
					dataIndex : "permissionName",
					sortable : true,
					align : 'center'
				}, {
					header : "状态",
					width : 100,
					dataIndex : userCfg.params.columns[8],
					sortable : true,
					align : 'center',
					renderer : function(value) {
						if (value == 0) {
							return "未审核";
						} else {
							return "已审核";
						}
					}
				}, {
					header : "身份",
					width : 150,
					dataIndex : userCfg.params.columns[7],
					sortable : true,
					align : 'center',
					renderer : function(value) {
						if (value == "1") {
							return "饲养管理员";
						} else if (value == "2") {
							return "生产管理员";
						} else if (value == "3") {
							return "销售管理员";
						} else if (value == "4") {
							return "普通用户";
						} else {
							return value;
						}
					}
				}, {
					header : "用户真实姓名",
					width : 130,
					dataIndex : userCfg.params.columns[2],
					sortable : true,
					align : 'center'
				}, {
					header : "年龄",
					width : 180,
					dataIndex : userCfg.params.columns[3],
					sortable : true,
					align : 'center'
				}, {
					header : "住址",
					width : 180,
					dataIndex : userCfg.params.columns[5],
					sortable : true,
					align : 'center'
				}, {
					header : "管辖区域",
					width : 180,
					dataIndex : userCfg.params.columns[6],
					sortable : true,
					align : 'center',
					renderer : function(value) {
						if (value == "1") {
							return "饲养中心";
						} else if (value == "2") {
							return "生产中心";
						} else if (value == "3") {
							return "销售中心";
						} else {
							return value;
						}
					}
				}, {
					header : "联系方式",
					width : 120,
					dataIndex : userCfg.params.columns[4],
					sortable : true,
					align : 'center'
				}]);
		var gridPanel = new Ext.grid.GridPanel({
			stripeRows : true,
			store : userCfg.store,
			sm : sm,
			cm : cm,
			border : false,
			tbar : [{
						xtype : "button",
						iconCls : "icon-add",
						hidden : (role == 4),
						text : spmscontent.add,
						handler : function() {
							userCfg.addUserCfg();
						}
					}, new Ext.menu.Separator({
								hidden : (role == 4)
							}), {
						xtype : "button",
						id : "updateUserCfgButton",
						iconCls : "icon-update",
						text : spmscontent.modify,
						disabled : true,
						handler : function() {
							userCfg.updateUserCfg(gridPanel);
						}
					}, new Ext.menu.Separator({
								hidden : (role == 4)
							}), {
						xtype : "button",
						id : "deleteUserCfgButton",
						iconCls : "icon-remove",
						hidden : (role == 4),
						text : spmscontent.del,
						disabled : true,
						handler : function() {
							var selected = gridPanel.getSelectionModel()
									.getSelections();
							if (selected.length == 0) {
								Ext.Msg.alert(spmscontent.prompt,
										spmscontent.selectRecord);
								return;
							}
							var ids = "";
							for (var i = 0; i < selected.length; i++) {
								var record = selected[i];
								var id = record.get("id");
								if (id != userId) {
									ids += id + "-";
								}
							}
							if (ids.length > 0) {
								ids = ids.substr(0, ids.length - 1);
							} else {
								Ext.Msg.alert(spmscontent.prompt, "不能删除自己");
								return;
							}
							Ext.MessageBox.confirm(spmscontent.prompt,
									"确认删自己外的用户?", function(btn) {
										if (btn == 'yes') {
											userCfg.deleteUserCfg(ids);
										}
									});
						}
					}, new Ext.menu.Separator({
								hidden : (role == 4)
							}), {
						xtype : "button",
						id : "auditUserCfgButton",
						iconCls : "icon-confirm",
						hidden : (role == 4),
						text : "审核",
						disabled : true,
						handler : function() {
							var selected = gridPanel.getSelectionModel()
									.getSelections();
							if (selected.length == 0) {
								Ext.Msg.alert(spmscontent.prompt,
										spmscontent.selectRecord);
								return;
							}
							// 批量审核
							var ids = "";
							for (var i = 0; i < selected.length; i++) {
								var record = selected[i];
								var audit = record.get(userCfg.params.columns[8]);
								if (audit == 0) {
									var id = record.get("id");
									if (id != userId) {
										ids += id + "-";
									}
								}
							}
							if (ids.length > 0) {
								ids = ids.substr(0, ids.length - 1);
							} else {
								Ext.Msg.alert(spmscontent.prompt, "请选择除自己外需要审核的用户");
								return;
							}
							Ext.MessageBox.confirm(spmscontent.prompt, "确认审核?",
								function(btn) {
									if (btn == 'yes') {
										userCfg.auditUser(ids);
									}
							});
						}
					}, new Ext.menu.Separator({
								hidden : (role != 0)
							}), {
						xtype : "button",
						id : "resetPasswordButton",
						iconCls : "icon-reset",
						hidden : (role != 0),
						text : "重置密码",
						disabled : true,
						handler : function() {
							var selected = gridPanel.getSelectionModel()
									.getSelections();
							if (selected.length == 0) {
								Ext.Msg.alert(spmscontent.prompt,
										spmscontent.selectRecord);
								return;
							}
							userCfg.resetPasswordSelected = selected;
							// 重置密码
							userCfg.resetPasswordWin();
						}
					}, new Ext.menu.Separator(), {
						xtype : "button",
						iconCls : "icon-update",
						text : "修改密码",
						handler : function() {
							userCfg.modifyPassword();
						}
					}],
			listeners : {
				render : function() {
					userCfg.store.baseParams = {
						tbl : userCfg.params.tbl
					};
					userCfg.store.load({
								params : {
									start : 0,
									limit : 100
								}
							});
				}
			}
		});
		return gridPanel;
	},
	createWin : function() {
		var win = Ext.getCmp("userCfgWin");
		if (win == null) {
			win = new Ext.Window({
				autoScorll : true,
				id : "userCfgWin",
				layout : 'fit',
				width : 480,
				height : 305,
				closeAction : 'hide',
				shadow : true,
				resizable : false,
				modal : true,
				closable : true,
				animCollapse : true,
				plain : true,
				items : [userCfg.createFormPanel()],
				// buttonAlign : "east",
				buttons : [{
					text : spmscontent.save,
					handler : function() {
						if (userCfg.params.record) {
							userCfg.updateToDB();
						} else {
							userCfg.saveToDB();
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
	updateUserCfg : function(grid) {
		var selected = grid.getSelectionModel().getSelections();
		if (selected.length == 0) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.selectRecord);
			return;
		}
		if (selected.length != 1) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.selectOnlyOne);
			return;
		}
		var record = selected[0];
		userCfg.params.record = record;
		var win = userCfg.createWin();
		win.show();
		win.setTitle(spmscontent.modify + "用户配置");
		var fromPanel = Ext.getCmp("userCfgFormPanel");
		fromPanel.getForm().reset();
		Ext.getCmp(userCfg.params.columns[0]).disable();
		Ext.getCmp("password").setValue("12");
		Ext.getCmp("passwordForm").hide();
		Ext.getCmp("confirmPassword").setValue("12");
		Ext.getCmp("confirmPasswordForm").hide();
		fromPanel.getForm().setValues(record.data);
		fromPanel.doLayout();
	},
	updateToDB : function() {
		var fromPanel = Ext.getCmp("userCfgFormPanel");
		if (!fromPanel.getForm().isValid()) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.validForm);
			return;
		}
		var changed = "";
		for (var i = 0; i < userCfg.params.columns.length; i++) {
			if (i == 8) {
				continue;
			}
			var column = userCfg.params.columns[i];
			var value = Ext.getCmp(column).getValue();
			if (value != userCfg.params.record.get(column)) {
				changed += column + spmscontent.columnvaluesplit + value
						+ spmscontent.columncolumnsplit;
			}
		}
		var id = userCfg.params.record.get("id");
		if (changed.length == 0) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.noModifyItem);
			return;
		} else {
			if (id == userId) {
				changed += userCfg.params.columns[8]
						+ spmscontent.columnvaluesplit + "0"
						+ spmscontent.columncolumnsplit;
			}
			changed = changed.substr(0, changed.length - 3);
		}
		globalComponent.progress.startProgress(spmscontent.operating);
		userCfg.params.record = null;
		Ext.Ajax.request({
			method : "post",
			url : "user/update.do",
			params : {
				id : id,
				changed : changed
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON
						.decode(response.responseText);
				if (respText.success) {
					userCfg.store.reload();
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
				userCfg.createWin().hide();
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
						spmscontent.innerError);
			}
		});
	},
	addUserCfg : function() {
		userCfg.params.record = null;
		var win = userCfg.createWin();
		win.setTitle(spmscontent.add + "用户配置");
		win.show();
		var fromPanel = Ext.getCmp("userCfgFormPanel");
		fromPanel.getForm().reset();

		Ext.getCmp(userCfg.params.columns[0]).enable();
		Ext.getCmp("passwordForm").show();
		Ext.getCmp("confirmPasswordForm").show();
		fromPanel.doLayout();
	},
	saveToDB : function() {
		var fromPanel = Ext.getCmp("userCfgFormPanel");
		if (!fromPanel.getForm().isValid()) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.validForm);
			return;
		}
		var password = Ext.getCmp("password").getValue();
		var confirmPassword = Ext.getCmp("confirmPassword").getValue();
		if (password != confirmPassword) {
			Ext.Msg.alert(spmscontent.prompt, "密码和确认密码不一致.");
			return;
		}

		globalComponent.progress.startProgress(spmscontent.operating);
		var params = {};
		for (var i = 0; i < userCfg.params.columns.length; i++) {
			var column = userCfg.params.columns[i];
			if (i == 8) {
				params[column] = "1";
			} else {
				params[column] = Ext.getCmp(column).getValue();
			}
		}
		params["password"] = password;
		params["pid"] = userId;
		params = JSON.stringify(params);
		params = eval("(" + params + ")");

		Ext.Ajax.request({
			method : 'POST',
			url : "user/login/register.do",
			params : params,
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON
						.decode(response.responseText);
				if (respText.success) {
					userCfg.store.reload();
					userCfg.createWin().hide();
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
						spmscontent.innerError);
			}
		});
	},
	deleteUserCfg : function(ids) {
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : "post",
			url : "user/delete.do",
			params : {
				ids : ids
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON
						.decode(response.responseText);
				if (respText.success) {
					userCfg.store.reload();
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
						spmscontent.innerError);
			}
		});
	},
	/**
	 * 重置密码
	 */
	resetPasswordWin : function() {
		var win = Ext.getCmp("resetPasswordWin");
		if (win == null) {
			win = new Ext.Window({
				autoScorll : true,
				id : "resetPasswordWin",
				layout : 'fit',
				title : "重置密码",
				width : 280,
				height : 140,
				closeAction : 'hide',
				shadow : true,
				resizable : false,
				modal : true,
				closable : true,
				animCollapse : true,
				plain : true,
				items : [new Ext.FormPanel({
					labelAlign : 'right',
					id : "resetPasswordFormPanel",
					autoScroll : true,
					labelWidth : 80,
					bodyStyle : 'background-color:#d9ede8;padding:5px;5px;5px;5px;',
					border : false,
					waitMsgTarget : true,
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
														fieldLabel : "新密码",
														id : "resetnewPassword",
														width : 120,
														inputType : "password",
														allowBlank : false,
														maxLength : 20
													}]
										}, {
											columnWidth : 1,
											layout : 'form',
											bodyStyle : 'background-color:#d9ede8;',
											border : false,
											defaultType : 'textfield',
											items : [{
														fieldLabel : "确认密码",
														id : "resetnewConfirmPassword",
														width : 120,
														inputType : "password",
														allowBlank : false,
														maxLength : 20
													}]
										}]
							}]
				})],
				buttons : [{
							text : spmscontent.save,
							handler : function() {
								userCfg.resetPassword();
							}
						}, {
							text : spmscontent.cancel,
							handler : function() {
								win.hide();
							}
						}]
			});
		}
		win.show();
		var fromPanel = Ext.getCmp("resetPasswordFormPanel");
		fromPanel.getForm().reset();
	},
	resetPassword : function() {
		var fromPanel = Ext.getCmp("resetPasswordFormPanel");
		if (!fromPanel.getForm().isValid()) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.validForm);
			return;
		}
		var password = Ext.getCmp("resetnewPassword").getValue();
		var confirmPassword = Ext.getCmp("resetnewConfirmPassword").getValue();
		if (password != confirmPassword) {
			Ext.Msg.alert(spmscontent.prompt, "密码和确认密码不一致.");
			return;
		}
		var ids = "";
		for (var i = 0; i < userCfg.resetPasswordSelected.length; i++) {
			var record = userCfg.resetPasswordSelected[i];
			ids += record.get("id") + "-";
		}
		if (ids.length > 0) {
			ids = ids.substr(0, ids.length - 1);
		} else {
			Ext.Msg.alert("没有需重置密码的用户.");
			return;
		}
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : "user/resetPassword.do",
			params : {
				ids : ids,
				password : password
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON
						.decode(response.responseText);
				if (respText.success) {
					Ext.getCmp("resetPasswordWin").hide();
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
						spmscontent.innerError);
			}
		});
	},
	auditUser : function(ids) {
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : "user/auditUser.do",
			params : {
				ids : ids
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON
						.decode(response.responseText);
				if (respText.success) {
					userCfg.store.reload();
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
						spmscontent.innerError);
			}
		});
	},
	/**
	 * 修改密码.
	 * 
	 * @param {}
	 *            userName 用户名
	 */
	modifyPassword : function() {
		userCfg.modifyPasswordWin();
		Ext.getCmp("userCfgUserName").setValue(userName);
	},
	modifyPasswordWin : function() {
		var win = Ext.getCmp("modifyPasswordWin");
		if (win == null) {
			win = new Ext.Window({
				autoScorll : true,
				id : "modifyPasswordWin",
				layout : 'fit',
				title : "修改密码",
				width : 300,
				height : 210,
				closeAction : 'hide',
				shadow : true,
				resizable : false,
				modal : true,
				closable : true,
				animCollapse : true,
				plain : true,
				items : [new Ext.FormPanel({
					labelAlign : 'right',
					id : "modifyPasswordFormPanel",
					autoScroll : true,
					labelWidth : 80,
					bodyStyle : 'background-color:#d9ede8;padding:5px;5px;5px;5px;',
					border : false,
					waitMsgTarget : true,
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
														fieldLabel : "用户名",
														id : "userCfgUserName",
														width : 150,
														allowBlank : false,
														disabled : true,
														maxLength : 20
													}]
										}, {
											columnWidth : 1,
											layout : 'form',
											bodyStyle : 'background-color:#d9ede8;',
											border : false,
											defaultType : 'textfield',
											items : [{
														fieldLabel : "原密码",
														id : "modifyoldPassword",
														width : 150,
														inputType : "password",
														allowBlank : false,
														maxLength : 20
													}]
										}, {
											columnWidth : 1,
											layout : 'form',
											bodyStyle : 'background-color:#d9ede8;',
											border : false,
											defaultType : 'textfield',
											items : [{
														fieldLabel : "新密码",
														id : "modifynewPassword",
														width : 150,
														inputType : "password",
														allowBlank : false,
														maxLength : 20
													}]
										}, {
											columnWidth : 1,
											layout : 'form',
											bodyStyle : 'background-color:#d9ede8;',
											border : false,
											defaultType : 'textfield',
											items : [{
														fieldLabel : "确认密码",
														id : "modifynewConfirmPassword",
														width : 150,
														inputType : "password",
														allowBlank : false,
														maxLength : 20
													}]
										}]
							}]
				})],
				buttons : [{
							text : spmscontent.save,
							handler : function() {
								userCfg.modifyPasswordToDB();
							}
						}, {
							text : spmscontent.cancel,
							handler : function() {
								win.hide();
							}
						}]
			});
		}
		win.show();
		var fromPanel = Ext.getCmp("modifyPasswordFormPanel");
		fromPanel.getForm().reset();
	},
	modifyPasswordToDB : function() {
		var fromPanel = Ext.getCmp("modifyPasswordFormPanel");
		if (!fromPanel.getForm().isValid()) {
			Ext.Msg.alert(spmscontent.prompt, spmscontent.validForm);
			return;
		}
		var oldPassword = Ext.getCmp("modifyoldPassword").getValue();
		var newPassword = Ext.getCmp("modifynewPassword").getValue();
		var newConfirmPassword = Ext.getCmp("modifynewConfirmPassword").getValue();
		if (newPassword != newConfirmPassword) {
			Ext.Msg.alert(spmscontent.prompt, "新密码和确认密码不一致.");
			return;
		}
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : "user/modifyPassword.do",
			params : {
				oldPassword : oldPassword,
				newPassword : newPassword
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON
						.decode(response.responseText);
				if (respText.success) {
					Ext.getCmp("modifyPasswordWin").hide();
				} else {
					Ext.Msg.alert(spmscontent.prompt, respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
						spmscontent.innerError);
			}
		});
	}
};
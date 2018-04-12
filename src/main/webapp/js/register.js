/**
 * @type 注册
 */
var register = {
	
	params : {
		tbl : "user",
		columns : ["userName", "password","trueName","age","phone","addr"]
	},
	/**
	 * 创建面板.
	 * 
	 * @return {}
	 */
	createPanel : function() {
		var panel = new Ext.FormPanel({
			id : "registerFormPanel",
			labelAlign : 'right',
			labelWidth : 200,
			border : false,
			bodyStyle : 'padding:10px 10px 10px 10px;',
			autoScroll : true,
			items : [{
				title:"用户注册",
				xtype : 'fieldset',
				autoHeight : true,
				layout : 'column',
				items : [{
					columnWidth : 1.0,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "用户名*  ",
						id : register.params.columns[0],
						width : 300,
						maxLength : 20,
						allowBlank : false
					}]
				}, {
					columnWidth :  1.0,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "密码*  ",
						id : register.params.columns[1],
						inputType:"password",
						width : 300,
						maxLength : 20,
						allowBlank : false
					}]
				},{
					columnWidth :  1.0,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "确认密码*  ",
						id : "confirmPassword",
						inputType:"password",
						width : 300,
						maxLength : 20,
						allowBlank : false
					}]
				},{
					columnWidth :  1.0,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "用户真实姓名*  ",
						id : register.params.columns[2],
						width : 300,
						maxLength : 20,
						allowBlank : false
					}]
				},{
					columnWidth :  1.0,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "年龄  ",
						id : register.params.columns[3],
						width : 300,
						maxLength : 64
					}]
				},{
					columnWidth :  1.0,
					layout : 'form',
					border : false,
					defaultType : 'uxnumberField',
					items : [{
						fieldLabel : "联系方式*  ",
						id : register.params.columns[4],
						width : 300,
						minLength:11,
						maxLength : 11,
						allowBlank : false,
						tooltip : "请输入手机号码"
					}]
				},{
					columnWidth :  1.0,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
						fieldLabel : "住址  ",
						id : register.params.columns[5],
						width : 300,
						maxLength : 64
					}]
				},{
					columnWidth :  0.82,
					layout : 'form',
					border : false,
					items : [
						{
							border : false,
							html:"<input type=button value='注   册' onclick=register.saveToDB(); />&nbsp;&nbsp;<input type=button value='返   回' onclick=register.backToLogin(); />"
						}
					]
				}]
			}]
			
		});
		return panel;
	},
	/**
	 * 检测用户名是否重复.
	 */
	checkUserNameRepeat:function(){
		var userName = Ext.getCmp(register.params.columns[0]).getValue();
		if(util.trim(userName)==""){
			Ext.Msg.alert(spmscontent.prompt,
							"用户名不能为空");
			return;
		}
		globalComponent.progress
				.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : 'POST',
			url : 'register/checkUserName.do',
			params : {
				userName:userName
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,
							spmscontent.innerError);
			}
		});
	},
	saveToDB : function() {
		var fromPanel = Ext.getCmp("registerFormPanel");
		if (!fromPanel.getForm().isValid()) {
			Ext.Msg.alert(spmscontent.prompt,spmscontent.validForm);
			return;
		}
		
		var password = Ext.getCmp(register.params.columns[1]).getValue();
		var confirmPassword = Ext.getCmp("confirmPassword").getValue();
		if(password!=confirmPassword){
			Ext.Msg.alert(spmscontent.prompt,
					"密码和确认密码不一致.");
			return;
		}
		
		globalComponent.progress.startProgress(spmscontent.operating);
		var params = {};
		for (var i = 0; i < register.params.columns.length; i++) {
			var column = register.params.columns[i];
			params[column]=Ext.getCmp(column).getValue();
		}
		params = JSON.stringify(params);
		params = eval("("+params+")");
		Ext.Ajax.request({
			method : 'POST',
			url : 'user/login/register.do',
			params : params,
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if(respText.success){
					Ext.MessageBox.confirm(
						spmscontent.prompt,
						"注册成功,是否返回登录页?",
						function(btn) {
							if (btn == 'yes') {
								window.location = "login.jsp";
							}
						});
				}else{
					Ext.Msg.alert(spmscontent.prompt,
							respText.error);
				}
			},
			failure : function() {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	},
	backToLogin:function(){
		window.location = "login.jsp";
	}
};
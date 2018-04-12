/**
 * @type 首页头部
 */
var header = {
	initMenu : function() {
		Ext.Ajax.request({
			method : "post",
			url : 'header/level1Menu.do',
			success : function(response) {
				var respText = Ext.util.JSON.decode(response.responseText);
				if(respText.success){
					var data = respText.data;
					var html = "";
					for(var i=0;i<data.length;i++){
						var menu = data[i];
						html+="<li><a href='javascript:void(0)' onclick=header.goToLink('"+menu.id+"','"+menu.name+"');><img src='images/top/"+menu.img+".png' title='"+menu.name+"'/><h2>"+menu.name+"</h2></a></li>";
					}
					document.getElementById("navMenu").innerHTML= html;
				}else{
					alert(respText.error);
				}
			},
			failure : function() {
				alert(spmscontent.innerError);
			}
		});
	},
	goToLink:function(id,name){
		document.getElementById("myiframe").src = encodeURI("page/manageTree.jsp?menuId="+id+"&menuName="+name);
	},
	/**
	 * 退出.
	 */
	exitWindow:function(){
		Ext.MessageBox.confirm(
			spmscontent.prompt,
			"是否退出?",
			function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						method : 'POST',
						url : 'user/header/exit.do',
						success : function(response) {
							var respText = Ext.util.JSON.decode(response.responseText);
							if(respText.success){
								if(header.websocket!=null){
									header.websocket.close();
								}
								window.location = "login.jsp";
							}else{
								Ext.Msg.alert(spmscontent.prompt,respText.error);
							}
						},
						failure : function() {
							Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
						}
					});
				}
		});
	},
	about:function(){
		document.getElementById("myiframe").src = "page/about.jsp";
	},
	home:function(){
		document.getElementById("myiframe").src = "page/home.jsp";
	},
	/**
	 * 获取系统时间.
	 */
	setInitInfo:function(time){
		document.getElementById("currentTime").innerText=time;
	}
};
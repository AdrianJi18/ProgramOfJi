var tab = new Ext.TabPanel({
	region : 'center',
	deferredRender : false,
	activeTab : 0,
	resizeTabs : true, // turn on tab resizing
	minTabWidth : 115,
	tabWidth : 135,
	enableTabScroll : true
});

function createNode(data){
	var manageTreePanel = Ext.getCmp("manageTreePanel");
	var flag=0;
	for(var i=0;i<data.length;i++){
		var menu = data[i];
		var treeNode = new Ext.tree.TreeNode({
			id : menu.id+(menu.path==null?"":"-"+menu.path),
			text : menu.name,
			expanded :true
		});
		if (menu.level==3) {
			treeNode.addListener("click", function(node, event) {
				event.stopEvent();
				tab.remove(tab.getComponent(0));
				var n = tab.getComponent(node.id);
				if (!n) {
					// 判断是否已经打开该面板
					var menuPath = node.id.split("-")[1];
					n = tab.add({
						'title' : node.text,
						closable : false,
						html : '<iframe id='+menuPath+'Frame scrolling="auto" frameborder="0" width="100%" height="95%" src="page/'
											+ menuPath
											+ '.jsp" ></iframe>'
					});
				}
				tab.setActiveTab(n);
			});
			
			if(flag==0){
				flag =1;
				// 判断是否已经打开该面板
				var n = tab.add({
					'title' : menu.name,
					closable : false,
					html : '<iframe id='+menu.path+'Frame scrolling="auto" frameborder="0" width="100%" height="95%" src="page/'+menu.path+ '.jsp" ></iframe>'
				});
				tab.setActiveTab(n);
			}
		}
		manageTreePanel.getNodeById(menu.pid).appendChild(treeNode);
	}
}

Ext.onReady(function() {
	// layout
	new Ext.Viewport({
		layout : 'border',
		items : [{
					region : 'west',
					id : 'west-panel',
					split : true,
					width : 200,
					minSize : 175,
					maxSize : 450,
					margins : '0 0 0 0',
					layout : 'accordion',
					title : menuName,
					collapsible : true,
					layoutConfig : {
						animate : true
					},
					html : '<div id="manageTree" style="width:100%;height:100%"></div>'
				}, tab // 初始标签页
		]
	});
	
	var root = new Ext.tree.TreeNode({
		id:menuId,
		text : "树的根",
		expanded : true
	});

	new Ext.tree.TreePanel({
		id : "manageTreePanel",
		renderTo : "manageTree",
		autoScroll : true,
		root : root, // 对应 根节点--配置管理
		animate : true,
		enableDD : false,
		border : false,
		rootVisible : false,
		containerScroll : true,
		listeners : {
			render : function() {
				//var h = Ext.getBody().getHeight();
				//Ext.getCmp("manageTreePanel").setHeight(h - 35);
				Ext.Ajax.request({
					method : 'POST',
					url : 'header/menuItems.do',
					params : {menuId:menuId},
					success : function(response) {
						var respText = Ext.util.JSON
								.decode(response.responseText);
						if(respText.success){
							var data = respText.data;
							createNode(data);
						}else{
							alert(respText.error);
						}
					},
					failure : function() {
						alert(spmscontent.innerError);
					}
				});
			}
		}
	});
});
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
<head>
<title>权限配置</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/permissionCfg.js"></script>
<script type="text/javascript">
	Ext.onReady(function() {
		var gridPanel = permissionCfg.createGridPanel();
		new Ext.Viewport({
			layout : "border",
			border : true,
			items : [ {
				region : 'center',
				border : true,
				layout : 'fit',
				items : [ gridPanel ]
			} ]
		});
	});
</script>
</head>
<body>
</body>
</html>
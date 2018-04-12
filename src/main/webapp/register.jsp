<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page session="false"%>
<%@ include file="/common/taglibs.jsp"%> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户注册</title>
<script type="text/javascript" src="js/register.js"></script>
<script type="text/javascript">
	Ext.onReady(function() {
		var panel = register.createPanel();
		new Ext.Viewport({
			layout : "border",
			border : false,
			items : [ {
				region : 'center',
				border : false,
				layout : 'fit',
				items : [ panel ]
			} ]
		});
	});
</script>
</head>
<body>
</body>
</html>
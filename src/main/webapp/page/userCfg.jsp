<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
<head>
<title>用户配置</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/userCfg.js"></script>
<script type="text/javascript">
	<%
		int role = (Integer)session.getAttribute("role");
		out.println("var role="+role+";");
		int userId = (Integer)session.getAttribute("id");
		out.println("var userId="+userId+";");
		String userName = (String)session.getAttribute("userName");
		out.println("var userName=\""+userName+"\";");
	%>
	Ext.onReady(function() {
		var gridPanel = userCfg.createGridPanel();
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
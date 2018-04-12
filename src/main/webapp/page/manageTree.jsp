<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript">
		<%
			String menuId = request.getParameter("menuId");
			String menuName = request.getParameter("menuName");
			out.println("var menuId="+menuId+";");
			out.println("var menuName='"+menuName+"';");
		%>
		</script>
		<script type="text/javascript" src="js/manageTree.js"></script>
	</head>
	<body></body>
</html>
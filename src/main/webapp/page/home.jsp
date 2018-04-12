<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript">
			Ext.onReady(function() {
				// layout
				new Ext.Viewport({
					layout : 'border',
					items : [
							{
								region : "center",
								layout : "fit",
								title : "告警通知",
								collapsible : true,
								split : true,
								border : false,
								html : "<iframe id='alarmFrame' frameborder='0' scrolling='no' width='100%' height='100%' " +
										"style='padding:0;margin:0' src='page/home_center.jsp'></iframe>"
							}
					]
				});
			});
		</script>
	</head>
	<body>
	</body>
</html>
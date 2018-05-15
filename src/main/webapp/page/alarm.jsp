<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
<head>
<title>告警通知</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	.icon-replay {
		background-image: url(images/icons/replay.gif) !important;
	}
	.icon-clear {
		background-image: url(images/icons/clear.gif) !important;
	}
	.icon-lamp1 {
		background-image: url(images/icons/lamp1.gif) !important;
	}
	.icon-lamp2 {
		background-image: url(images/icons/lamp2.gif) !important;
	}
	.x-grid-record-red{
		background: #FF0000;
	}
	.x-grid-record-yellow{
		background: #FFFF00;
	}
	.x-grid-record-green{
		background: #00FF00;
	}
</style>
<script type="text/javascript" src="common/lib/RowExpander.js"></script>
<script type="text/javascript" src="js/alarm.js"></script>
<script type="text/javascript">
	<%
	int role = (Integer)session.getAttribute("role");
	out.println("var role="+role+";");
	%>
	Ext.onReady(function() {
		alarm.alarmSeverityStore.on("load", function() {
			var gridPanel = alarm.createGridPanel();
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
		alarm.alarmSeverityStore.load();
	});
</script>
</head>
<body>
</body>
</html>
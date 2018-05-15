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
								region : "west",
								title : "天气",
								collapsible : true,
								border : true,
								width : 250,
								height : 300,
								html : "<center><iframe allowtransparency='true' frameborder='0' width='140' height='428' scrolling='no'" +
								"src='//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=1&d=5&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=140&h=428&align=center'></iframe></center>"
							},
							/* {
								region : "east",
								title : "日历",
								collapsible : true,
								border : true,
								width : 350,
								html : "<iframe id='alarmFrame' frameborder='0' scrolling='no' width='100%' height='100%' " +
								"style='padding:0;margin:0' src='page/calendar.jsp'></iframe>"
							}, */
							{
								region : "center",
								title : "活动告警",
								width : 250,
								collapsible : true,
								split : true,
								border : false,
								html : "<iframe id='alarmFrame' frameborder='0' scrolling='no' width='100%' height='100%' " +
										"style='padding:0;margin:0' src='page/alarm.jsp'></iframe>"
							}
					]
				});
			});
		</script>
	</head>
	<body>
	</body>
</html>
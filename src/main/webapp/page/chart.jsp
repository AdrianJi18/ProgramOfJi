<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
<head>
<title>图表统计</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="common/lib/echarts.common.min.js"></script>
<script type="text/javascript" src="common/lib/RowExpander.js"></script>
<script type="text/javascript" src="js/chart/chart1.js"></script>
<script type="text/javascript" src="js/chart/chart2.js"></script>
<script type="text/javascript">
	Ext.onReady(function() {
		chart1.init();
		chart2.init();
	});
</script>
</head>
<body>
	<table width="100%" height="100%" align="center" border=0 bordercolor="#00ff99">
		<tr bordercolor="#00ff99">
			<td width="50%" height="100%"><div style="width:100%;height:100%;" id="chart1"></div></td>
			<td width="50%" height="100%"><div style="width:100%;height:100%;" id="chart2"></div></td>
		</tr>
	</table>
</body>
</html>
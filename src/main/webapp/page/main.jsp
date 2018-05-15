<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Date"%>
<%@page import="org.apache.commons.lang3.time.DateFormatUtils"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="<%=basePath%>"></base>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>智能养殖场管理平台</title>
<style type="text/css">
html { 
	height: 100%; 
	overflow: hidden;
}
body {
	margin: 0;
	overflow: hidden;
	height: 100%;
	padding: 0;
	font-size: 14px;
	font-FAMILY: "宋体", Tahoma, Arial, Verdana, sans-serif;
}
a{text-decoration:none}
li{list-style: none;}
.top {
	height: 100px;
	background:url(images/top/topbg.png) repeat-x;
}
.topleft{float:left; width:300px;}
.topleft img{margin-left:10px;margin-top:15px;}
.topright{float:right;}
.nav{float:left;}
.nav li{float:left;width:87px;height:68px; text-align:center;padding-top:20px;}
.nav li a{display:block;width:87px;height:88px;-moz-transition: none; transition: background-color 0.3s linear; -moz-transition: background-color 0.3s linear; -webkit-transition: background-color 0.3s linear; -o-transition: background-color 0.3s linear; }
.nav li a.selected{background:url(images/top/navbg.png) no-repeat;}
.nav li a:hover{display:block;background:#000;color:#fff;background:url(images/top/navbg.png) no-repeat;}
.nav li a{display:block;}
.nav a h2{font-size:14px;color:#000;}
.nav a:hover h2{color:#fff;}
.topright table{margin-top:13px;margin-right:20px;width:150px;table-layout:fixed;}
.topright table tr td a{font-size:13px; color:#000;}
.topright table tr td a:hover{color:#000;}
.topright table tr td span{float:left;padding-right:3px;}
.user{background:url(images/top/ub1.png) repeat-x;clear:both;margin-top:10px;float:right; margin-right:12px;border-radius:30px;  white-space:nowrap;position:relative;}
.user span{display:inline-block;padding-right:10px; background:url(images/top/user.png) no-repeat 15px 10px; line-height:30px; font-size:14px;color:#000; padding-left:20px; padding-left:35px;}

.container {
	width: 100%;
	height: 85%;
}
</style>
<link rel="stylesheet" type="text/css" href="common/lib/ext2.0/resources/css/ext-all.css" />
<script type="text/javascript" src="common/lib/ext2.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="common/lib/ext2.0/ext-all.js"></script>
<script type="text/javascript" src="common/lib/ext2.0/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="common/lib/reconnecting-websocket.min.js"></script>
<script type="text/javascript" src="common/spms-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/header.js"></script>
<script type="text/javascript">
	<%
		String userName = (String)session.getAttribute("userName");
		out.println("var userName=\""+userName+"\";");
		int visitLogId = (Integer)session.getAttribute("visitlogId");
		out.println("var visitLogId=\""+visitLogId+"\";");
	%>
	Ext.onReady(function(){
		Ext.BLANK_IMAGE_URL = "common/lib/ext2.0/resources/images/default/s.gif";
		Ext.QuickTips.init();
		header.initMenu();
	});
</script>
</head>

<body>
	<div id="top" class="top">
		<div class="topleft">
			<a href="javascript:void(0)" onclick="header.home();"><img src="images/logo.png" title="首页" /></a>
		</div>
	    
		<ul class="nav" id="navMenu">
		</ul>
	    
		<div class="topright">
			<table>
			    <tr>
			        <td><span><img src="images/top/help.png" title="帮助"/></span><a href="#" onclick="www.baidu.com">帮助</a></td>
			        <td style="text-align:center;"><a href="javascript:void(0)" onclick="header.about();">关于</a></td>
			        <td><a href="javascript:void(0)" onclick="header.exitWindow();">退出</a></td>
			    </tr>
			    <tr>
			        <td colspan="3" style="font-size:13px;">欢迎您: <%=userName%><font id="connectState" style="padding-left:10px;"></font></td>
			    </tr>
			    <tr>
			        <td id="currentTime" colspan="3"><%= DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss")%></td>
			    </tr>
			</table>
		</div>
	</div>
	<div class="container">
		<iframe id="myiframe" width="100%" height="100%" margin="0" frameborder="no" src="page/home.jsp"></iframe>
	</div>
</body>
</html>
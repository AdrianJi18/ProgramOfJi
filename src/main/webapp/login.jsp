<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="<%=basePath%>"></base>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>欢迎登录智能养殖场管理平台</title>
<style type="text/css">
.clear{overflow:hidden; clear:both;font-size:1px;}
body{ margin:5,5,5,5; padding:0; font-size:12px;font-FAMILY:"宋体",Tahoma,Arial,Verdana,sans-serif;}
img{ border:0;}
ul,li,dl,dd{ list-style:none; margin:0; padding:0;}
.login_nr{height:100px; text-align:center; line-height:36px; padding-top:1px;}
.username{ width:203px; height:27px; padding-left:25px; line-height:25px; color:#008db9; background:url(images/bg-username.png) no-repeat; border:none; }
.password{ width:203px; height:27px; padding-left:25px; line-height:25px; color:#008db9; background:url(images/bg-password.png) no-repeat; border:none;}
.zt{ font-family:"微软雅黑"; font-size:14px; color:#008db9; font-weight:bold; width:100px;}
.bottom{ line-height:28px; color:#ccc; text-align:right; padding-right:30px;}
.but_logreg{ width:122px; height:35px; background-color: #00AEAE; font-size: 16px; font-weight:bold; color:white; border-radius: 5px; }
a{text-decoration:none}
.glow{
	font-size:60px;
	font-family:微软雅黑;
	color:#000000;
	margin-top:10px;
	transition:color 2s,text-shadow 2s;
		-moz-transition: color 2s,text-shadow 2s;
		-webkit-transition: color 2s,text-shadow 2s;
	animation:tween 2s linear infinite alternate;
		-moz-transition: tween 2s linear infinite alternate;
		-webkit-transition: tween 2s linear infinite alternate;
}  
.glow:hover{
	color: #CDC5BF;
	text-shadow: 0 0 15px #FF0000;
}
@keyframes tween{
	from {color:#CDCD00;}
	to{color:#BCD2EE;}
}
@-moz-keyframes tween{
	from {color:#CDCD00;}
	to{color:#BCD2EE;}
}
@-webkit-keyframes tween{
	from {color:#CDCD00;}
	to{color:#BCD2EE;}
}
</style>
<script type="text/javascript"
	src="common/lib/ext2.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="common/lib/ext2.0/ext-all.js"></script>
<script type="text/javascript">
	function login(action){
		if(action){
			window.location = "register.jsp";
			return false;
		}
		var userName = document.getElementById("userName").value;
		var password = document.getElementById("password").value;
		if(userName == ""){
			alert("请输入用户名!");
			document.getElementById("userName").focus();
			return false;
		}
		else if(password == ""){
			alert("请输入密码!");
			document.getElementById("password").focus();
			return false;
		}
		Ext.Ajax.request({
			method : 'POST',
			url : 'user/login/login.do',
			params : {
				userName : userName,
				password : password
			},
			success : function(response) {
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					window.location = "page/main.jsp";
				}
				else{
					document.getElementById("password").value="";
				}
				return false;
			},
			failure : function() {
				alert("操作失败,失败原因：连接超时或其他错误。");
			}
		});
		return false;
	}
</script>
</head>

<body>
<div style="background:url('images/banner.png') no-repeat;width:100%;height:400px;"><center><p class="glow">智能养殖场欢迎您</p></center></div>

<div class="login_nr">
<br/>
<form>
<table border="0" style="margin:auto;text-align:right;">
  <tr>
    <td><span class="zt">用户名</span></td>
    <td><input id="userName" name="userName" type="text" class="username" /></td>
  </tr>
  <tr>
    <td style="padding-top:8px"><span class="zt">密&nbsp;&nbsp;&nbsp;码</span></td>
    <td style="padding-top:8px"><input id="password" name="password" type="password" class="password" /></td>
  </tr>
</table>
<br/>
<input type="submit" class="but_logreg" value="登   录" onclick="return login();" />
<input type="button" class="but_logreg" value="注   册" onclick="return login(1);" />
</div>
</form>
<br/><br/><br/><br/>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.jh.pojo.User"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<head>
<base href="<%=basePath%>"></base>
</head>
<link rel="stylesheet" type="text/css" href="common/lib/ext2.0/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="common/lib/ext2.0/resources/css/ext-main.css" media="screen" />
<style type="text/css">
<!--
.ext-ie .x-menu-item-icon {
	left: -24px;
	top: 0px
}

.ext-strict .x-menu-item-icon {
	left: 3px;
	top: 3px
}

.ext-ie6 .x-menu-item-icon {
	left: -24px;
	top: 0px
}
.x-form-file-wrap {
    position: relative;
    height: 22px;
}
.x-form-file-wrap .x-form-file {
	position: absolute;
	right: 0;
	-moz-opacity: 0;
	filter:alpha(opacity: 0);
	opacity: 0;
	z-index: 2;
    height: 22px;
}
.x-form-file-wrap .x-form-file-btn {
	position: absolute;
	right: 0;
	z-index: 1;
}
.x-form-file-wrap .x-form-file-text {
    position: absolute;
    left: 0;
    z-index: 3;
    color: #777;
}

.icon-add {
	background-image: url(images/icons/user_add.gif) !important;
}

.icon-activate {
	background-image: url(images/icons/activate.gif) !important;
}

.icon-remove {
	background-image: url(images/icons/user_delete.gif) !important;
}

.icon-update {
	background-image: url(images/icons/user_edit.gif) !important;
}
.icon-search {
	background-image: url(images/icons/user_search.gif) !important;
}
.icon-export {
	background-image: url(images/icons/export.gif) !important;
}
.icon-reset {
	background-image: url(images/icons/reset.gif) !important;
}
.icon-confirm {
	background-image: url(images/icons/confirm.gif) !important;
}
.icon-folderopen {
	background-image: url(images/icons/folder-open.gif) !important;
}
.icon-computer {
	background-image: url(images/icons/computer.gif) !important;
}
.icon-detect {
	background-image: url(images/icons/detect.gif) !important;
}
.icon-protect {
	background-image: url(images/icons/protect.gif) !important;
}
.icon-removal {
	background-image: url(images/icons/removal.gif) !important;
}
.icon-look {
	background-image: url(images/icons/look.gif) !important;
}
.icon-approval{
	background-image: url(images/icons/approval.gif) !important;
}
.icon-opendoor{
	background-image: url(images/icons/opendoor.gif) !important;
}
-->


</style>
<script type="text/javascript" src="common/lib/ext2.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="common/lib/ext2.0/ext-all.js"></script>
<script type="text/javascript" src="common/lib/ext2.0/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="common/spms-lang-zh_CN.js"></script>
<script type="text/javascript" src="common/component.js"></script>
<script type="text/javascript" src="common/util.js"></script>
<script type="text/javascript">
	Ext.BLANK_IMAGE_URL = 'common/lib/ext2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();

	if (Ext.isChrome) {
		var chromeDatePickerCSS = ".x-date-picker {border-color: #1b376c;background-color:#fff;position: relative;width: 185px;}";
		Ext.util.CSS.createStyleSheet(chromeDatePickerCSS, 'chromeDatePickerStyle');
	}

	function sessionTimeOut(conn, response, options) {
		if (response.status == 401) {
			if(window.parent){
				if(window.parent.parent){
					window.parent.parent.location = ctx;
				}else{
					window.parent.location = ctx;
				}
			}else{
				window.location = ctx;
			}
		}
	}
	Ext.Ajax.on("requestcomplete", sessionTimeOut, this);
	Ext.Ajax.on("requestexception", sessionTimeOut, this);
	
	Ext.form.TextField.prototype.size = 20;
	Ext.form.TextField.prototype.initValue = function() {
	    if (this.value !== undefined) {
	        this.setValue(this.value);
	    } else if (this.el.dom.value.length > 0) {
	        this.setValue(this.el.dom.value);
	    }
	    this.el.dom.size = this.size;
	    if (!isNaN(this.maxLength) && (this.maxLength * 1) > 0
	            && (this.maxLength != Number.MAX_VALUE)) {
	        this.el.dom.maxLength = this.maxLength * 1;
	    }
	};
	//ajax请求超时120秒
	Ext.Ajax.timeout=120000;
	/*
	Ext.form.TextField.prototype.initEvents=function() {
		var keyPress = function(e){
			var blockchars = ' ';
			var c = e.getCharCode();
			if(blockchars.indexOf(String.fromCharCode(c)) != -1){
				e.stopEvent();
			}
		};
		this.el.on("keypress", keyPress, this);
	}
	*/
</script>
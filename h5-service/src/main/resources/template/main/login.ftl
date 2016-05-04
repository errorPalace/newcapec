<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>掌上校园服务管理平台</title>
<#include "/template/core/common.ftl">
<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery-1.7.2.min.js"></script>
<script language="javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
<script language="javascript" src="${wctx}/pub/script/security/coder/security.js"></script>
<!--[if IE 6]><script type="text/javascript" src="${wctx}/pub/style/themes/sptsm/js/iepng.js" ></script><![endif]-->
<link href="${wctx}/pub/style/themes/campus/css/login_style.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
//<![CDATA[
$(document).ready(function(){
	if (window != top)top.location.href = "${ctx}/";
	var rightSubmitStatus = true;
	var useJcaptcha = ${useJcaptcha?string('true', 'false')};
	$("#loginerror").html("${message?default("&nbsp;")}");
	
	if($("#j_username").val()){$('#j_username_msg').hide();}
	if($("#t_password").val()){$('#t_password_msg').hide();}
	
	$("#j_username_msg").click(function(){$('#j_username').focus();});
	$("#t_password_msg").click(function(){$('#t_password').focus();});
	
	$("#j_username").focus(function(){$('#j_username_msg').hide();});
	$("#j_username").blur(function(){if(!$("#j_username").val()){$('#j_username_msg').show();}});
	$("#t_password").focus(function(){$('#t_password_msg').hide();});
	$("#t_password").blur(function(){if(!$("#t_password").val()){$('#t_password_msg').show();}});
	
	
	$("#captchaImg").click(function(){
		$("#captchaImg").attr('src','${ctx}/jcaptcha.${urlExt}?'+new Date());
	});
	changeShowJcaptcha(useJcaptcha);
	
	$("#login_button").click(function(){
		if(!rightSubmitStatus)return;
		if(!$("#j_username").val()){$("#loginerror").html("请输入登录名！");$('#j_username_msg').click();return;}
		if(!$("#t_password").val()){$("#loginerror").html("请输入登录密码！");$("#t_password_msg").click();return;}
		
		if(useJcaptcha){
			if(!$("#j_captcha").val()){$("#loginerror").html("请输入验证码！");$("#j_captcha").focus();return;}
		}
		$("#loginerror").html("正在登录中....");
		submitDisabled();
		
		var password = $("#t_password").val();
		var key_module = $("#key_module").val();
		var key_exponent = $("#key_exponent").val();
		if(key_module != null && key_module.length != ''){
			var key = RSAUtils.getKeyPair(key_exponent, '', key_module);
			password = RSAUtils.encryptedString(key, password);
		}
		$("#j_password").val(password);
		
		$("#login_form").ajaxSubmit({
			success:function(msg){
				if(msg.result){
					$("#loginerror").html("登录成功！");
					window.top.location.href = 'index.action';
				}else{
					useJcaptcha = msg.useJcaptcha;
					changeShowJcaptcha(msg.useJcaptcha);
					$("#loginerror").text(msg.message);
					$("#key_module").val(msg._loginSecurityPubKeyModule);
					$("#key_exponent").val(msg._loginSecurityPubKeyExponent);
					submitReady();
				}
			},
			error:function(msg){
				$("#loginerror").text("提交失败,请重试!多次失败请与管理员联系!");
				submitReady();
			}
		});
	});
	$('#j_username').focus();
	
function changeShowJcaptcha(show){
	if(show){
		$("#jcaptchaElement").show();
		$("#captchaImg").click();
	}else{
		$("#jcaptchaElement").hide();
	}
}
function submitDisabled(){
	rightSubmitStatus = false;
	$("#login_button").removeClass("loginBtn");
	$("#login_button").addClass("loginBtn2");
}
function submitReady(){
	rightSubmitStatus = true;
	$("#login_button").removeClass("loginBtn2");
	$("#login_button").addClass("loginBtn");
}

$(function(){
document.onkeydown = function(e){ 
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13)$("#login_button").click();
}});


});
//]]>
</script>
</head>
<body style="height:100%;overflow:hidden;">
<div class="LoginBox_frame">
<div class="mainLogin">
<div class="headerBox"><div class="header clearfix"><h1><a href="" class="logo"></a></h1></div></div>
<div class="mainBox">
<div class="main">
<div class="positionBox clearfix">
<div class="loginBox">
<div class="formbox">
<div id="company"></div>
<form id="login_form" name="login_form" action="j_spring_security_check" method="post">
<input type="hidden" id="key_module" value="${_loginSecurityPubKeyModule?default("")}"/>
<input type="hidden" id="key_exponent" value="${_loginSecurityPubKeyExponent?default("")}"/>
<input type="hidden" id="j_password" name="j_password" value=""/>
<div class="usernameBox">
    <div id="j_username_msg" class="normal-txt">登录名 / 手机号 / 邮箱</div>
    <input tabindex="1" id="j_username"  name="j_username" type="text" class="username" maxlength="30"/>
</div>
<div class="passwordBox">
    <div id="t_password_msg" class="normal-txt">登录密码</div>
    <input tabindex="2" id="t_password" name="t_password" type="password" class="password" maxlength="30"/>
</div>
<div id="jcaptchaElement" class="checkcodeBox">
  <div class="clearfix yzm_bg"><input tabindex="3" id="j_captcha" name="j_captcha" type="text" maxlength="10"/>
  <a href="javascript:;"><img id="captchaImg" width="100" height="32" class="checkcode" border="0" /></a></div>
  <p class="clearfix">按右图填写，不区分大小写</p><img id="rightImage" class="abc"/>
</div>
<div class="login_btn clearfix"><a tabindex="4" href="javascript:;" class="loginBtn" id="login_button"></a></div>
<div id="loginerror" class="loginerror"></div>
</form></div></div></div></div></div>
<div class="footerBox">
<div class="footer clearfix"><p class="copy">新开普电子股份有限公司 版权所有 Copyright ©2013-2015 Newcapec Electronics Co., Ltd. All rights reserved　　建议1024*768以上分辨率</p></div>
</div>
</div></div></body></html>
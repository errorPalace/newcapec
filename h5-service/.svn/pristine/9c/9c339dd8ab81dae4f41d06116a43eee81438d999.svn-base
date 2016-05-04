<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>掌上校园服务管理平台</title>
<#include "/template/core/common.ftl">
<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery-1.7.2.min.js"></script>
<script language="javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
<!--[if IE 6]><script type="text/javascript" src="${wctx}/pub/style/themes/campus/js/iepng.js" ></script><![endif]-->
<link href="${wctx}/pub/style/themes/campus/css/login_style.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
	//<![CDATA[
	$(document).ready(function(){
		if (window != top)top.location.href = "${ctx}/";
		var rightSubmitStatus = true;
		
		var useJcaptcha = ${useJcaptcha?string('true', 'false')};
		changeShowJcaptcha(useJcaptcha);
		
		$("#login_button").click(function(){
			var username = $("#j_username").val();
			if(username == null || username == ''){window.alert("请输入登录名！");$("#j_username").focus();return;}
			
			var password = $("#j_password").val();
			if(password == null || password == ''){window.alert("登录密码！");$("#j_password").focus();return;}
			
			if(useJcaptcha){
				var captcha = $("#j_captcha").val();
				if(captcha == null || captcha == ''){window.alert("请输入验证码！");$("#j_captcha").focus();return;}
			}
			$("#loginerror").html("正在登录中....");
			$("#login_form").ajaxSubmit({
				success:function(msg){
					alert("msg.result:" + msg.result);
					alert("msg.message:" + msg.message);
					alert("msg.useJcaptcha:" + msg.useJcaptcha);
					alert("msg.defaultTargetUrl:" + msg.defaultTargetUrl);
					if(msg.result){
						$("#loginerror").html("登录成功！");
						window.top.location.href = 'index.action';
					}else{
						useJcaptcha = msg.useJcaptcha;
						changeShowJcaptcha(msg.useJcaptcha);
						$("#loginerror").text(msg.message);
					}
				},
				error:function(msg){
					alert("提交失败,请重试!多次失败请与管理员联系!");
				}
			});
		});
	});
	
	function resetCaptcha(){
		var captchaImg = document.getElementById('captchaImg');
		captchaImg.setAttribute('src','${ctx}/jcaptcha.${urlExt}?'+new Date());
	}
	
	function changeShowJcaptcha(show){
		if(show){
			$("#jcaptchaElement").show();
		}else{
			$("#jcaptchaElement").hide();
		}
	}
	//]]>
</script>


<script type="text/javascript">
		if (window != top)top.location.href = "${ctx}/";
		function onLogin(){
			var login_form = document.getElementById('login_form');
			var username = login_form.j_username.value;
			if(username == null || username == ''){ $("#loginerror").html("请输入登录名！");login_form.j_username.focus();return false;}
			var password = login_form.j_password.value;
			if(password == null || password == ''){ $("#loginerror").html("请输入密码！");login_form.j_password.focus();return false;}
			<#if useJcaptcha>
			var captcha = login_form.j_captcha.value;
			if(captcha == null || captcha == ''){$("#loginerror").html("请输入验证码！");login_form.j_captcha.focus();return false;}
			</#if>
			$("#loginerror").html("正在登录中....");
			submitDisabled();
			login_form.submit();
		}
		function resetCaptcha(){
			var captchaImg = document.getElementById('captchaImg');
			captchaImg.setAttribute('src','${ctx}/jcaptcha.${urlExt}?'+new Date());
		}

var isCheckCode = false;
var rightSubmitStatus = true;
var isChecked = false;
function initPage(){
	$(document).keyup(function(event){
		  if(event.keyCode ==13){
			  submitInfo();  
		  }
		});
}

function submitDisabled(){
	rightSubmitStatus = false;
	$("#submitButton").removeClass("loginBtn");
	 $("#submitButton").addClass("loginBtn2");
}
function submitReady(){
	rightSubmitStatus = true;
	$("#submitButton").removeClass("loginBtn2");
	$("#submitButton").addClass("loginBtn");
}

function a(){
if(!document.getElementById('j_username').value){$('#remindMsg').hide();$('#j_username').focus();}
}

</script>
</head>
<body style="height:100%">
<div class="LoginBox_frame">
    <div class="mainLogin">
        <div class="headerBox">
            <div class="header clearfix">
                <h1><a href="" class="logo"></a></h1>
           </div>
        </div>
        <div class="mainBox">
            <div class="main">
                <div class="positionBox clearfix">
                    <div class="loginBox">
                        <div class="formbox">
                        <div id="company">
                        </div>
                         <form id="login_form" name="login_form" action="j_spring_security_check" method="post">
                            <div class="usernameBox">
                                <div id="remindMsg" class="normal-txt" onclick="if(!document.getElementById('j_username').value){$('#remindMsg').hide();$('#j_username').focus();}">编号 / 手机号 / 邮箱</div>
                                <input tabindex="1" id="j_username"  name="j_username" type="text" class="username" maxlength="30"  onBlur="if(!value){$('#remindMsg').show();}" />
                            </div>
                            <div class="passwordBox">
                                <input tabindex="2" id="j_password" name="j_password" maxlength="30" type="password" class="password" value=""/>
                            </div>
                            
      <#if useJcaptcha>
		  <div class="checkcodeBox">
      <div class="clearfix yzm_bg">
      <input tabindex="3" id="j_captcha" name="j_captcha" type="text" maxlength="10"  onchange="checkCode();"/>
         <a href="#"><img id="captchaImg" width="100" height="32" src="${ctx}/jcaptcha.${urlExt}" onclick='resetCaptcha();'  class="checkcode" border="0" /></a>
           </div>
       <p class="clearfix">按右图填写，不区分大小写</p>
       <img src="" id="rightImage" class="abc">
      </div>
      </#if> 
                            
                            <div class="login_btn clearfix">
                                <a tabindex="4" href="#" class="loginBtn" id="submitButton" onclick="onLogin();" ></a>
                            </div>
                            <div id="loginerror" class="loginerror">
                               ${message?default("&nbsp;")}
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerBox">
            <div class="footer clearfix">
                <p class="copy">新开普电子股份有限公司&nbsp;版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;推荐使用IE8，IE9，火狐，&nbsp;&nbsp;同时支持IE6，Chrome &nbsp;&nbsp建议1024*768以上分辨率访问本系统</p>
            </div>
        </div>
    </div>
 </div>
</body>
</html>
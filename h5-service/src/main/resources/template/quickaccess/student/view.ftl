<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
<#include "/template/security/common/head.ftl">
<link rel="stylesheet" type="text/css" media="all" href="${wctx}/pub/script/jquery/formValidator/css/validator.css"/>
<script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidator.js"></script>
<script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidatorRegex.js"></script>
<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
<script type="text/javascript" src="${wctx}/pub/script/jquery/thickbox/thickbox_close.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			//设置每个检验区的宽度
    		$("div[id$='Tip']").each(function(){
   				$(this).css("font-size","12px").css("width","150px");
   				$(this).css("text-align","left")
   			});
			$("#cancel").click(function(){tb_remove();});
		});
		function ajaxRespMsg(msg,defmsg){try{var i=msg.indexOf("ajax:");return i<0?defmsg:msg.substring(i+5,msg.length);}catch(e){return defmsg;}}
	</script>
	</head>
	<body style="overflow-y: auto; margin: 0">
	<div class="box">
	<form action="${ctx}/student/view.${urlExt}" method="post" id="dataForm">
		<table id="addData" border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder">
			<tr>
				<td width="100px" class="PopUpTableTitle">学号：</td>
				<td width="400px">${data.outId?default("")}</td>
			</tr>
			<tr><td class="PopUpTableTitle">应用代码：</td>
				<td colspan="3">${data.appId?default("")}(${data.appName?default("")})</td>
			</tr>
			<tr><td class="PopUpTableTitle">学校代码：</td>
				<td colspan="3">${data.customerCode?default("")}(${data.customerName?default("")})</td>
			</tr>
			<tr><td class="PopUpTableTitle">绑卡状态：</td>
				<td colspan="3">${data.state?default("")}</td>
			</tr>
			<tr><td class="PopUpTableTitle">个人值：</td>
				<td colspan="3"><textarea readonly="readonly" rows="10" style="width: 98%;" class="PopUptextarea">${data.param?default("")}</textarea></td>
			</tr>
		</table>
	  </form>
	</div>
	<div class="box">
		<input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue" />
	</div>
</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
<#include "/template/security/common/head.ftl">
	<link rel="stylesheet" type="text/css" media="all" href="${wctx}/pub/script/jquery/formValidator/css/validator.css"/>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidator.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidatorRegex.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/thickbox/thickbox_close.js"></script>
<!-- JS引用 -->
<script language="javascript" src="${wctx}/pub/upload/script/swfupload/upload.loader.js"></script>

	<script type="text/javascript">
		$(document).ready(function(){
			//设置每个检验区的宽度
    		$("div[id$='Tip']").each(function(){
   				$(this).css("font-size","12px").css("width","220px");
   				$(this).css("text-align","left").css("margin-left","0px").css("margin-right","0px");
   			});
   			checkForm();
			$("#save").click(function(){saveData(false);});
			$("#saveClose").click(function() {saveData(true);});
			$("#cancel").click(function(){tb_remove();});
			
			$(".PopUpInput").click(function() {
				$(".PopUpInputHover").each(function() {
					$(this).removeClass();
					$(this).addClass("PopUpInput");
				});
				$(this).removeClass();
				$(this).addClass("PopUpInputHover");
			});
			
			$(".PopUptextarea").click(function() {
				$(".PopUpInputHover").each(function() {
					$(this).removeClass();
					$(this).addClass("PopUpInput");
				});
			});
			
			$("#upload_photo").initUploader({
				contextPath : "${ctx}",
				name : "upload_photo",               //注① 后文将详细介绍 
				file_size_limit : "80MB",           //每次上传的文件大小，必须小于struts中设置的值
				file_types : "*.jpg;*.gif",                 //限制上传文件的类型，如："*.txt",多种文件类型："*.xls;*.xlsx"
				file_types_description : "所有文件", //在文件选择对话框中显示的允许上传的文件类型
				//existFiles : ${existFiles!}         //注② 已经上传的附件，详细用户见下文
			});
		});
		
		function saveData(close) {
			if(jQuery.formValidator.pageIsValid()){
   				$("#dataForm").ajaxSubmit({
					success:function(msg){
						if(msg=="success"){if (close) {tb_callback();} else {$("#dataForm").resetForm();}
						}else{alert(ajaxRespMsg(msg,"提交失败,请重试!多次失败请与管理员联系!"));}  
					},
					error:function(msg){alert(ajaxRespMsg(msg,"提交失败,请重试!多次失败请与管理员联系!"));}
   				});
   			}
		}
		
		function checkForm(){
			$.formValidator.initConfig();
			$("#data_customerCode").formValidator({
   				onshow:"请输入学校代码",onfocus:"学校代码至少一个字符，最多100个字符",oncorrect:"学校代码可用"
   			}).inputValidator({
   				min:1,max:100,onerror:"学校代码不合法，请重新输入"
    		}).functionValidator({
    			fun:function(value, element) {
    				var patrn = /[%\[\]"*()&'\,;\=\?\$<\\>\/]/g;
    				if (patrn.exec(value)) {
    					return "输入的学校代码包含有非法字符！";
    				} else {
    					return true;
    				}
    			}
    		});
    		$("#data_customerName").formValidator({
   				onshow:"请输入学校名称",onfocus:"学校名称至少1个字符，最多100个字符",oncorrect:"学校名称可用"
   			}).inputValidator({
   				min:1,max:100,onerror:"学校名称不合法，请重新输入"
    		}).functionValidator({
    			fun:function(value, element) {
    				var patrn = /[%\[\]"*()&'\,;\=\?\$<\\>\/]/g;
    				if (patrn.exec(value)) {
    					return "输入的学校名称包含有非法字符！";
    				} else {
    					return true;
    				}
    			}
    		});
    		
    		$("#data_sourceip").formValidator({
   				onshow:"请输入来源ip多个ip用,分割建议最多3个",onfocus:"请输入来源ip多个ip用,分割建议最多3个",onfocun:"来源ip最多1000个字符",oncorrect:"来源ip可用"
   			}).inputValidator({
   				min:1,max:100,onerror:"来源ip描述不正确"
    		});
    		
    		$("#data_dpcode").formValidator({
   			onshow:"请输入dpcode",onfocun:"dpcode最多50个字符",oncorrect:"dpcode可用"
   			}).inputValidator({
   			min:0,max:50,onerror:"dpcode描述不正确"
   			});
    		
   			$("#data_url").formValidator({
   			onshow:"请输入url",onfocun:"url最多50个字符",oncorrect:"url可用"
   			}).inputValidator({
   			min:0,max:50,onerror:"url描述不正确"
   			});
		}
		function ajaxRespMsg(msg,defmsg){try{var i=msg.indexOf("ajax:");return i<0?defmsg:msg.substring(i+5,msg.length);}catch(e){return defmsg;}}
	</script>
	</head>
 	<body style="overflow-y: hidden; margin: 0">
		<div class="box">
		<form action="${ctx}/customer/add.${urlExt}" method="post" id="dataForm">
			<table border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder" width="99%">
				<tr><td class="PopUpTableTitle"><span style="color:red">*</span>学校code：</td>
					<td><input id="data_customerCode" name="customerCode"  style="width:97%;height: 25px;" class="PopUpInput"/></td>
					<td width="220px"><div id="data_customerCodeTip"/></td>
				</tr>
				<tr><td class="PopUpTableTitle"><span style="color:red">*</span>学校名称：</td>
					<td><input id="data_customerName" name="customerName"  style="width:97%;height: 25px;" class="PopUpInput"/></td>
					<td><div id="data_customerNameTip"/></td>
				</tr>
				<tr><td class="PopUpTableTitle"><span style="color:red">*</span>来源ip：</td>
					<td><input id="data_sourceip" name="sourceIp"  style="width:97%;height:25px;" class="PopUpInput"/></td>
					<td><div id="data_sourceipTip"/></td>
				</tr>
				<tr><td class="PopUpTableTitle">dpcode：</td>
					<td><input id="data_dpcode" name="dpcode"  style="width:97%;height:25px;" class="PopUpInput"/></td>
					<td><div id="data_dpcodeTip"/></td>
				</tr>
				<tr><td class="PopUpTableTitle">url：</td>
					<td><input id="data_url" name="url"  style="width:97%;height:25px;" class="PopUpInput"/></td>
					<td><div id="data_urlTip"/></td>
				</tr>
			</table>
		</form>
	</div>
		<div class="box">
			<table width="99%" border="0" cellspacing="0" cellpadding="0"class="PopUpTableBorder">
				<tr><td style="text-align: left; padding-left: 10px;">注：加“<font color="#FF0000">*</font>”为必填项</td></tr>
			</table>
		</div>
		<div class="box">
			<input type="button" value="保存并关闭" id="saveClose" class="ButtonStyle_Blue" />
			<input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue" />
		</div>
  </body>
</html>
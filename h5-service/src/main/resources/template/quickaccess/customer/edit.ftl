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
   				$(this).css("font-size","12px").css("width","220px");
   				$(this).css("text-align","left").css("margin-left","0px").css("margin-right","0px");
   			});
   			checkForm();
			$("#save").click(function(){saveData(false);});
			$("#saveClose").click(function() {saveData(true);});
			$("#cancel").click(function(){tb_remove();});
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
		});
		function checkForm(){
			$.formValidator.initConfig();
			$("#data_customerCode").formValidator({
   				oncorrect:"学校代码可用"
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
    			onshow:"请输入dpcode",onfocun:"dpcode最多100个字符",oncorrect:"dpcode可用"
    			}).inputValidator({
    			min:0,max:100,onerror:"dpcode描述不正确"
    			});
    		
    		$("#data_url").formValidator({
    			onshow:"请输入url",onfocun:"url最多500个字符",oncorrect:"url可用"
    			}).inputValidator({
    			min:0,max:500,onerror:"url描述不正确"
    			});
		}
		function ajaxRespMsg(msg,defmsg){try{var i=msg.indexOf("ajax:");return i<0?defmsg:msg.substring(i+5,msg.length);}catch(e){return defmsg;}}
	</script>
	</head>
	<body style="overflow-y: hidden; margin: 0">
		<div class="box">
		<form action="${ctx}/customer/edit.${urlExt}" method="post" id="dataForm">
			<table class="PopUpTableBorder" width="99%">
				<tr>
					<td class="PopUpTableTitle" width="70px"><span style="color:red">*</span>学校代码：</td>
					<td colspan="2"><input type="text"  name="customerCode" id="data_customerCode" readonly="readonly" value='${data.customerCode}' style="width:97%;" class="PopUpInput"/></td>
					<td style="display: none;"><div id="data_customeridTip"></div><input type="hidden" name="id" value='${data["id"]}'/></td>
					<!-- <td width="220px"><div id="data_customerCodeTip"/></td> -->
				</tr>
				<tr><td class="PopUpTableTitle">学校名称：</td>
					<td><input id="data_customerName" name="customerName" style="width: 97%" class="PopUpInput" value="${data.customerName?default("")}"/></td>
					<td width="220px"><div id="data_customerNameTip"/></td>
				</tr>
				</tr>
					<tr><td class="PopUpTableTitle">来源ip：</td>
					<td><input id="data_sourceip" name="sourceIp"  style="width:97%;" class="PopUpInput" value="${data.sourceIps?default("")}"/></td>
					<td><div id="data_sourceipTip"/></td>
				</tr>
					<tr><td class="PopUpTableTitle">dpcode：</td>
					<td><input id="data_dpcode" name="dpcode"  style="width:97%;" class="PopUpInput" value="${data.dpcode?default("")}"/></td>
					<td><div id="data_dpcodeTip"/></td>
				</tr>
					<tr><td class="PopUpTableTitle">url：</td>
					<td><input id="data_url" name="url"  style="width:97%;" class="PopUpInput" value="${data.url?default("")}"/></td>
					<td><div id="data_urlTip"/></td>
				</tr>
			</table>
		</form>
	</div>
				<div class="box">
					<input type="button" value="保存并关闭" id="saveClose" class="ButtonStyle_Blue" />
					<input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue" />
				</div>
	</body>
</html>
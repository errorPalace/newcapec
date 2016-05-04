<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
<#include "/template/security/common/head.ftl">
	<link rel="stylesheet" type="text/css" media="all" href="${wctx}/pub/script/jquery/formValidator/css/validator.css"/>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidator.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidatorRegex.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/thickbox/thickbox_close.js"></script>
<!-- 样式引用 -->
<link rel="stylesheet" type="text/css" href="${wctx}/pub/code/script/code_selector/css/default.css"></link>
<!-- JS引用 -->
<script language="javascript" src="${wctx}/pub/code/script/code_selector/code_selector.js"></script>
<script language="javascript" src="${wctx}/pub/code/ztree/js/jquery.ztree.all-3.2.js"></script>
<link rel="stylesheet" type="text/css" href="${wctx}/pub/code/ztree/css/zTreeStyle/zTreeStyle.css"></link>

<!-- 样式引用 -->
<link rel="stylesheet" type="text/css" href="${wctx}/pub/upload/script/swfupload/css/default.css"></link>
<!-- JS引用 -->
<script language="javascript" src="${wctx}/pub/upload/script/swfupload/upload.loader.js"></script>

	<script type="text/javascript">
		$(document).ready(function(){
			//设置每个检验区的宽度
    		$("div[id$='Tip']").each(function(){
   				$(this).css("font-size","12px").css("width","320px");
   				$(this).css("text-align","left")
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
			
			
			// 代码选择器初始化
			$.CodeSelector.initConfig({contextPath: "${ctx}"});
			//构造codeSelector
			$("#data_encryptiface").codeSelector({
				rootNode : "STU_CLASS",    //所属数据代码
				currNode : "",//代码树根位置，默认为根代码
				value : "",   //代码选择器初始值
				//flag : ["01"],      //标志定义，指定标志的代码可选
				//llFlag : ["01"],    //代码叶子节点标志
				onnodeselect : function(item){
					// 使用item.[属性名] 获取数据;
				},
				height : "200px",
				width : "200px"
			});
			//设置codeSelector是否禁用，为true时无法弹出选择框，默认为true
			$("#data_className1").setCSDisabled(false);
			//设置codeSelector是否可见，为true时为可见，默认为true
			$("#data_className1").setCSVisible(true);
			//设置codeSelector的配置，用于动态改变代码选择器的内容
			//conf的参数与codeSelector一样
			//$("#data_className1").setCSConfig(conf);
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
			$("#data_title").formValidator({
   				onshow:"请输入标题",onfocus:"请输入标题",oncorrect:"标题不能为空"
   			}).inputValidator({
   				min:1,max:100,onerror:"标题不合法，标题长度为1-50"
    		}).functionValidator({
    			fun:function(value, element) {
    				var patrn = /[%\[\]"*()&'\,;\=\?\$<\\>\/]/g;
    				if (patrn.exec(value)) {
    					return "输入的标题包含有非法字符！";
    				} else {
    					return true;
    				}
    			}
    		});
    		
    		$("#data_alias").formValidator({
   				onshow:"请输入别名",onfocus:"请输入别名",oncorrect:"别名不能为空"
   			}).inputValidator({
   				min:1,max:100,onerror:"别名不合法，别名长度为1-50"
    		}).functionValidator({
    			fun:function(value, element) {
    				var patrn = /[%\[\]"*()&'\,;\=\?\$<\\>\/]/g;
    				if (patrn.exec(value)) {
    					return "输入的别名包含有非法字符！";
    				} else {
    					return true;
    				}
    			}
    		});
		}
		function ajaxRespMsg(msg,defmsg){try{var i=msg.indexOf("ajax:");return i<0?defmsg:msg.substring(i+5,msg.length);}catch(e){return defmsg;}}
	</script>
	</head>
	<body style="overflow-y: hidden; margin: 0">
		<div class="box">
			<form action="${ctx}/encryptiface/encryptAdd.${urlExt}" method="post" id="dataForm">
				<table id="addData" border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder" align="center">
					<tr><td class="PopUpTableTitle" width="300px"><font color="#FF0000">*</font>标题：</td>
						<td width="240px"><input type="text" name="title" id="data_title" style="width:190px;" class="PopUpInput"/></td>
						<td><div id="data_titleTip"/></td>
					</tr>
					<tr><td class="PopUpTableTitle"><font color="#FF0000">*</font> 别名：</td>
						<td>
						<input type="text" id="data_alias" name="alias" style="width:190px;" class="PopUpInput"/>
						</td>
						<td><div id="data_aliasTip"/></td>
					</tr>
				</table>
			</form>
		
		</div>
		<div class="box">
			<table width="618px" border="0" cellspacing="0" cellpadding="0"class="PopUpTableBorder">
				<tr><td style="text-align: left; padding-left: 10px;">注：加“<font color="#FF0000">*</font>”为必填项</td></tr>
			</table>
		</div>
		<div class="box">
			<input type="button" value="保存并关闭" id="saveClose" class="ButtonStyle_Blue" />
			<input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue" />
		</div>
	</body>
</html>
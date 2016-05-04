<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
<#include "/template/security/common/head.ftl">
<#include "/template/security/common/c_simplegrid.ftl">
<#include "/template/security/common/c_thickbox.ftl">
		<link rel="stylesheet" type="text/css" media="all"
			href="${wctx}/pub/script/jquery/formValidator/css/validator.css" />
		<script type="text/javascript"
			src="${wctx}/pub/script/jquery/formValidator/source/formValidator.js"></script>
		<script type="text/javascript"
			src="${wctx}/pub/script/jquery/formValidator/source/formValidatorRegex.js"></script>
		<script type="text/javascript"
			src="${wctx}/pub/script/jquery/jquery.form.js"></script>
		<script type="text/javascript"
			src="${wctx}/pub/script/jquery/thickbox/thickbox_close.js"></script>
		<script type="text/javascript" src="${wctx}/pub/security/orgSelector/org_selector.js"></script>
		<script type="text/javascript" src="${wctx}/pub/script/jquery/bitTreeview/bitTreeview.js"></script>
		<link rel="stylesheet" type="text/css" href="${wctx}/pub/security/orgSelector/css/default.css"></link>
		<style>
			.opacity {opacity:0;FILTER:Alpha(Opacity=0);}
			.text {border: 1px solid #c0c1b3;}
			.text.opacity {position:absolute;height:20px;}
			.text.file {width:129px!important;width:135px;z-index:100;}
			.text.file_btn {height:19px;margin:0 0 -1px 0;width:auto!important;width:60px;background:#f0f0f0;padding:;}
		</style>
		<script type="text/javascript">
		
		$(document).ready(function(){
		
		
			$("#save").click(function() {saveData(false);});
			$("#saveClose").click(function() {saveData(true);});
			//设置每个检验区的宽度
		  			$("div[id$='Tip']").each(function(){
		 				$(this).css("font-size","12px").css("width","250px");
		 				$(this).css("text-align","left");
		 			});
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
			if ($.isFunction(window.extInitPage)){
		  			extInitPage();
		  		}
			checkForm();
			$.OrgSelector.initConfig({contextPath : "${ctx}"});
			$("#orgId").orgSelector({
				//orgRoot : "4", 
				flag : ["2"], 
				//llFlag : ["4","8"],
			});
			
			$("#customerId").click(function(){
				var $option=$("#customerId option:selected");
				var orgid=$option.data("orgid");
				$("div.OrgSelector_popupDiv").children("input.OrgSelector_clearButton").click();
				$("div.OrgSelector_popupDiv").remove();
				$("#orgId").attr("name","orgId").next().remove();
				$("#orgId").orgSelector({
					orgRoot : orgid, 
					flag : ["2"], 
					//llFlag : ["4","8"],
				});
			});
			$("#customerId").click();
					
	});
			
			function checkForm() {
				$.formValidator.initConfig();
			
			}
				
			function ajaxRespMsg(msg, defmsg) {
				try {
					var i = msg.indexOf("ajax:");
					return i < 0 ? defmsg : msg.substring(i + 5, msg.length);
				} catch (e) {
					return defmsg;
				}
			}
			
			function removetr(but){
				$(but).parent().parent().remove();
			};
			
			
			
			function saveData(close) {
				if (jQuery.formValidator.pageIsValid()) {
					if (!window.confirm("你确定要导入吗? "))
						return;
					$("#save").val("导入中~~~");
					$("#saveClose").val("导入中~~~");
					$("#save").attr("disabled","disabled");
					$("#saveClose").attr("disabled","disabled");
					$("#dataForm")
							.ajaxSubmit(
									{
										success : function(
												msg) {
											if (msg== "haveError") {
												$("#download").click();
												alert("导入成功,文件中存在错误请查看！");
												$("#save").removeAttr("disabled");
												$("#saveClose").removeAttr("disabled");
												$("#save").val("导入并继续");
												$("#saveClose").val("导入并关闭");
												if(close){
													tb_callback();
												}
											} else if(msg== "success"){
												alert("导入成功");
												$("#save").removeAttr("disabled");
												$("#saveClose").removeAttr("disabled");
												$("#save").val("导入并继续");
												$("#saveClose").val("导入并关闭");
												if(close){
													tb_callback();
												}
											}else {
												alert(ajaxRespMsg(
														msg,
														"提交失败,请重试!多次失败请与管理员联系!"));
												$("#save").removeAttr("disabled");
												$("#saveClose").removeAttr("disabled");
												$("#save").val("导入并继续");
												$("#saveClose").val("导入并关闭");
											}
										},
										error : function(
												msg) {
											alert(ajaxRespMsg(
													msg.msg,
													"提交失败,请重试!多次失败请与管理员联系!"));
											$("#save").removeAttr("disabled");
											$("#saveClose").removeAttr("disabled");
											$("#save").val("导入并继续");
											$("#saveClose").val("导入并关闭");
										}
									});
				}
			}
		</script>
		<form id="dataForm" action="${ctx}/voteClass/importAll.${urlExt}"
			method="post">
			<textarea id="version_paramArea" name="versions"
				style="display: none"></textarea>
			<table id="formTable" border="0" cellspacing="0" cellpadding="0"
				class="PopUpTableBorder" width="600px">
				<tr class="extArgs">
					<td class="PopUpTableTitle">
						导入文件：
					</td>
					<td align="left">
						<div style="margin:2px;">
							<input type="file" name="file"  id='file' size="20" onchange="document.getElementById('file_0').value=this.value" class="text opacity">
							<input name="file_0" id="file_0" value=""class="text">
							<input type="button" value="浏览..." class="file_btn">
						</div>
					</td>
					<td align="left">
						<div id="fileTip" />
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<input type="button" value="导入并关闭" id="saveClose" class="ButtonStyle_Blue" />
						<input type="button" value="导入并继续" id="save" class="ButtonStyle_Blue" />
					</td>
				</tr>
			</table>
		</form>
			
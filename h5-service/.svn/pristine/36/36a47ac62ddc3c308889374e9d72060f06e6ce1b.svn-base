<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<#include "/template/security/common/head.ftl">
<#include "/template/security/common/c_simplegrid.ftl">
<#include "/template/security/common/c_thickbox.ftl">
<script type="text/javascript" src="${wctx}/pub/campus/autoComplete/jquery.autocomplete.pack.js"></script>
<script type="text/javascript" src="${wctx}/pub/campus/autoComplete/selectCustomer.js"></script>
<script language="javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
<link rel="Stylesheet" href="${wctx}/pub/campus/autoComplete/jquery.autocomplete.css" />
		<script language="javascript">
			$(document).ready(function(){
			campus_customer_Select("#customerName","#customerCode","${ctx}/customer/selectCustomer.${urlExt}");
				grid = new SimpleGrid({
					containerId :"dataTable",
					columns : [
						{name : "id", title : "ID", width : "100px"},
						{name : "customerCode", title : "学校code", width : "100px"},
						{name : "customerName", title : "学校名称", width : "300px"},
						{name : "sourceIp", title : "来源ip", width : "400px"},
						{name : "createDate", title : "创建时间", width : "*"},
					],
					multiple : true,
					isPagination : true,
					data : ${datas},
					gotoPage : function(currPage, pageSize){
						$("#currPage").val(currPage);
						$("#pageSize").val(pageSize);
						searchData();
					},
					onrowclick : function() {
						changeToolbarState();
					},
					onSelectAll : function() {
						k();
					}
				});
				
				
				//查询
				$("#searchButton").click(function(){
					$("#searForm").ajaxSubmit({
						success:function(msg){
							grid.parseJsonData(msg);
							changeToolbarState();
						},
						error:function(msg){
							alert("提交失败,请重试!多次失败请与管理员联系!");
						}
					});
				});
				
				// 清空查询
				$("#searchClearButton").click(function(){
					$(".searchCondition").val("");
					$("#searForm").ajaxSubmit({
						success:function(msg){
							grid.parseJsonData(msg);
							changeToolbarState();
						},
						error:function(msg){
							alert("提交失败,请重试!多次失败请与管理员联系!");
						}
					});
				});
				//删除
				$("#customer_del").click(function(){
					var checkboxkeys=[];
					var selectedUsers = grid.getSelectedItems();
					for(var index in selectedUsers){
						checkboxkeys.push(selectedUsers[index].id);
					}
					if(checkboxkeys.length==0){
						alert("请至少选中一条记录再执行删除!");
					}else{
						var confirmflag=window.confirm("你确定要删除选中的记录么?");
						if(confirmflag){
							$.ajax({
								type:"post",
								url:"${ctx}/customer/delete.${urlExt}",
								data:"id="+checkboxkeys.toString(),
								success:function(msg){
									if(msg=="success"){
										searchData();
									}else{
										alert(ajaxRespMsg(msg,"删除失败！"));
									}
								},
								error:function(msg){
									alert(ajaxRespMsg(msg,"删除错误!"));
								}
							});
						}
					}
				});
				//添加
				var thickbox = $("#thickboxlink").thickbox(searchData);
				$("#customer_add").click(function(){
					thickbox.attr("title", "添加学校");
					thickbox.attr("href","${ctx}/customer/enterAdd.${urlExt}?width=650&height=280");
					thickbox.click();
				});
				//查看
				$("#customer_view").click(function(){
					var checkboxkeys=[];
					var selectedUsers = grid.getSelectedItems();
					var selectIndex = '';
					for(var index in selectedUsers){
						checkboxkeys.push(selectedUsers[index].id);
						selectIndex = index;
					}
					if(checkboxkeys.length==0){
						alert("修改时您需要选择一条记录");
					}else if(checkboxkeys.length>1){
						alert("修改时您只能选择一条记录");
					}else if(checkboxkeys.length==1){
						var title = "查询学校【" + selectedUsers[selectIndex].customerName + "】的信息";
						thickbox.attr("title", title);
						thickbox.attr("href","${ctx}/customer/view.${urlExt}?id="+checkboxkeys.toString()+"&width=600&height=200");
						thickbox.click();
					}
				});
				//修改
				$("#customer_edit").click(function(){
					var checkboxkeys=[];
					var selectedUsers = grid.getSelectedItems();
					var selectIndex = '';
					for(var index in selectedUsers){
						checkboxkeys.push(selectedUsers[index].id);
						selectIndex = index;
					}
					if(checkboxkeys.length==0){
						alert("修改时您需要选择一条记录");
					}else if(checkboxkeys.length>1){
						alert("修改时您只能选择一条记录");
					}else if(checkboxkeys.length==1){
						var title = "修改学校【" + selectedUsers[selectIndex].customerName + "】的信息";
						thickbox.attr("title", title);
						thickbox.attr("href","${ctx}/customer/enterEdit.${urlExt}?dataid="+checkboxkeys.toString()+"&width=600&height=320");
						thickbox.click();
					}
				});
				//拼音初始化按钮点击事件
				$("#customer_init_pinyin").click(function(){
					if(confirm("您确定要初始化所有客户的拼音信息吗？")){
						$.ajax({
							type:"post",
							url:"${ctx}/customer/pinyinInit.action",
							success:function(msg){
								if(msg == "success"){
									alert("初始化拼音成功！");
									reloadTreeAndTable();
								} else {
									alert(msg);
								}
							},
							error:function(msg){
								alert(ajaxRespMsg(msg,"提交失败!"));
							}
						});	
					}
				});
				//简拼初始化按钮点击事件
				$("#customer_init_jianpin").click(function(){
					if(confirm("您确定要初始化所有客户的简拼信息吗？")){
						$.ajax({
							type:"post",
							url:"${ctx}/customer/jianpinInit.action",
							success:function(msg){
								if(msg == "success"){
									alert("初始化简拼成功！");
									reloadTreeAndTable();
								} else {
									alert(msg);
								}
							},
							error:function(msg){
								alert(ajaxRespMsg(msg,"提交失败!"));
							}
						});	
					}
				});
				//控制按钮显示
				<#list Session["_curentMenuFunctions"] as funcID>	
					$("#${funcID}").show();
    			</#list>
    			
    			//重置工具栏按钮的状态
    			function changeToolbarState() {
    				var hasSelected = grid.hasSelected();
					var selectedMany = grid.getSelectedCount() > 1;
					$("#customer_view").attr("disabled", !(hasSelected && (!selectedMany)));
					$("#customer_edit").attr("disabled", !(hasSelected && (!selectedMany)));
					$("#customer_del").attr("disabled", !(hasSelected && (!selectedMany)));
					$("#customer_init_pinyin").attr("disabled", !(hasSelected && (!selectedMany)));
					$("#customer_init_jianpin").attr("disabled", !(hasSelected && (!selectedMany)));
					
		    		}

    			$(window).resize(function(){
    				var width = document.body.offsetWidth;
    				$("#dataTable").css("width", width - 5);
    				if (width <= 815) {
    					$(".query").css("width", 820);
    					$("#dataTable").css("width", 820);
    				}
    				var q = $("#queryD");
    				q.css("height", $(window).height() - $("#main").height());
    				q.css("overflow-x", "auto");
    				q.css("overflow-y", "auto");
    				
    			});
    			
    			$(window).resize();
    			
			});
			
			function searchData() {
				$("#searchButton").click();
			}

			function ajaxRespMsg(msg,defmsg){try{var i=msg.indexOf("ajax:");return i<0?defmsg:msg.substring(i+5,msg.length);}catch(e){return defmsg;}}
				
		</script>
	</head>
	<body class="mainBox">
	<div class="main" id="main">
		<p class="location"><span></span>您的位置：<@currentPosition spaceMark="&gt;&gt;"/></p>
		<div class="toolbar">
			<li><input type="button" id="customer_view" disabled="disabled" class="view" style="display: none" value="查看"/></li>
			<li><input type="button" id="customer_add" class="add" style="display: none" value="增加"/></li>
	      	<li><input type="button" id="customer_edit" disabled="disabled" class="edit" style="display: none" value="编辑"/></li>
	      	<li><input type="button" id="customer_del" disabled="disabled" class="del" style="display: none" value="删除"/></li>
	      	<li><input type="button" id="customer_init_pinyin"  disabled="disabled" class="edit" style="display: none" value="初始化拼音"/></li>
	      	<li><input type="button" id="customer_init_jianpin" disabled="disabled" class="edit" style="display: none" value="初始化简拼"/></li>
  		</div>
	</div>
	
    <div id="queryD" style="width:100%;">
				<div class="query">
					<form id="searForm" method="post" action="${ctx}/customer/list.${urlExt}">
						<input type="hidden" name="currPage" id="currPage" value="1" />
						<input type="hidden" name="pageSize" id="pageSize" value="10" />
						<ul>
			        		<li>学校名称：</li>
			        		<li><input type="text" id="customerName" name="customerName" class="searchCondition" /></li>
			        		<li>学校代码：</li>
			        		<li><input type="text" id="customerCode" name="customerCode" class="searchCondition" /></li>
			        		<li><input type="hidden" id="customerCode" name="customerCode" value="${customerCode!''}" /></li>
			        		<li><input type="button" id="searchButton" value="查询" class="ButtonStyle" /></li>
			        		<li><input type="button" id="searchClearButton" value="清空" class="ButtonStyle" /></li>
			        	</ul>
			    	</form>
			    </div>
			    <div class="clear"></div>
				<div id="dataTable" style="margin: 1px; border: 1px solid #8ABAC6; background:#C4C3C7;"></div>
		    </div>	  
			<div style="display:none">
				<a href="#" id="thickboxlink" class="thickbox"></a>
		</div>	
	</body>
</html>
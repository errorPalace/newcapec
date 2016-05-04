<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head>
<#include "/template/security/common/head.ftl">
<#include "/template/security/common/c_simplegrid.ftl">
<!-- <#include "/template/security/common/c_thickbox.ftl"> -->
		
		<link rel="stylesheet" type="text/css" href="${wctx}/pub/script/jquery/simpleGrid/css/default.css" />
		<script language="javascript" src="${wctx}/pub/script/jquery/jquery.core.js"></script>
		<script type="text/javascript" src="${wctx}/pub/script/jquery/thickbox/thickbox.js"></script>
		<script language="javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
		<script language="javascript" src="${wctx}/pub/script/jquery/simpleGrid/simpleGrid.js"></script>
		<link rel="stylesheet" type="text/css" href="${wctx}/pub/script/jquery/thickbox/thickbox.css" />
		<script language="javascript">
			$(document).ready(function(){
				grid = new SimpleGrid({
					containerId :"dataTable",
					columns : [
						{name : "id", title : "ID",width : "50px"},
						{name : "title", title : "标题", width : "120px"},
						{name : "alias", title : "别名", width : "90px"},
						{name : "createTime", title : "创建时间",width : "120px" },
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
						changeToolbarState();
					}
				});
				
				//查询
				$("#searchButton").click(function(){
				var msg = checkInput();
				if(msg == ""){
					$("#searForm").ajaxSubmit({
						success:function(msg){
							grid.parseJsonData(msg);
							changeToolbarState();
						},
						error:function(msg){alert("提交失败,请重试!多次失败请与管理员联系!");}
					});
				}else{
					alert(msg+"中有非法字符");
				}
				});
				//删除
				$("#encryptiface_del").click(function(){
					var checkboxkeys=[];
					var selectedDatas = grid.getSelectedItems();
					for(var index in selectedDatas){
						checkboxkeys.push(selectedDatas[index].id);
					}
					if(checkboxkeys.length==0){
						alert("请至少选中一条记录再执行删除!");
					}else{
						var confirmflag=window.confirm("你确定要删除选中的记录么?");
						if(confirmflag){
							$.ajax({
								type:"post",
								url:"${ctx}/encryptiface/delete.${urlExt}",
								data:"id="+checkboxkeys.toString(),
								success:function(msg){
									if(msg=="success"){
										searchData();
										alert(ajaxRespMsg(msg,"删除成功！"));
									}else{
										alert(ajaxRespMsg(msg,"删除失败！"));
									}
								},
								error:function(){
									alert(ajaxRespMsg(msg,"删除错误!"));
								}
							});
						}
					}
				});
				 var thickbox = $("#thickboxlink").thickbox(searchData);
				//添加
				$("#encryptiface_add").click(function(){
					thickbox.attr("title", "添加信息");
					thickbox.attr("href","${ctx}/encryptiface/addEncrptIface.${urlExt}?width=600&height=320");
					thickbox.click();
				});
				
				//控制按钮显示
				<#list Session["_curentMenuFunctions"] as funcID>
					$("#${funcID}").show();
    			</#list>
    			
    			//重置工具栏按钮的状态
    			function changeToolbarState() {
    				var hasSelected = grid.hasSelected();
					var selectedMany = grid.getSelectedCount() > 1;
					$("#encryptiface_del").attr("disabled", !hasSelected);
					
    			}
    			
    			function isSameType(){
    				var selectedDatas = grid.getSelectedItems();
					var type=null;
					for(var index in selectedDatas){
						if(type==null){
							type=selectedDatas[index].type;
							if(type=="内存调用方式"){
								return false;
							}
						}else{
							if(type!=selectedDatas[index].type){
								return false;
							}
						}
					}
					return true;
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
			
			function checkInput(){
				var msg = "";
				var patrn=/[%\[\]"*()&'\,;\=\?\$<\\>\/]/g;
				var value = $("#title").val();
   				if (patrn.exec(value)) {
   					msg = "标题 ";
   				}
   				value = $("#alise").val();
   				if (patrn.exec(value)) {
   					msg += "别名 ";
   				}
				return msg;
			}
			
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
					<li><a id="encryptiface_del" class="del" style="display: none">删除</a></li>
			      	<li><a id="encryptiface_add" class="add" disabled="disabled" >添加</a></li>
    			</div>
    		</div>
    		<div id="queryD" style="width:100%;">
				<div class="query">
					<form id="searForm" method="post" action="${ctx}/encryptiface/list.${urlExt}">
						<input type="hidden" name="currPage" id="currPage" value="1" />
						<input type="hidden" name="pageSize" id="pageSize" value="10" />
						<ul>
			        		<li>标题：</li>
			        		<li><input type="text" id="title" name="title" class="InputTextStyle"/></li>
			        		<li>别名：</li>
			        		<li><input type="text" id="alias" name="alias" class="InputTextStyle"/></li>
			        		<li><input type="button" id="searchButton" value="查询" class="ButtonStyle" /></li>
			        	</ul>
			    	</form>
			    </div>
			    <div class="clear"></div>
				<div id="dataTable" style="margin: 1px; border: 1px solid #cdcdcd; background:#C4C3C7;"></div>
		    </div>	  
			<div style="display:none">
				<a href="#" id="thickboxlink" class="thickbox"></a>
			</div>
	</body>
</html>
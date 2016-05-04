<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
<#include "/template/security/common/head.ftl">
<#include "/template/security/common/c_simplegrid.ftl">
<#include "/template/security/common/c_thickbox.ftl">
<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
<script type="text/javascript" src="${wctx}/pub/script/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		grid = new SimpleGrid({
			containerId :"dataTable",
			columns : [
				{name : "outid", title : "outid", width : "90px"},
				{name : "ecode", title : "企业编码", width : "100px"},
				{name : "deal", title : "处理状态", width : "90px"},
				{name : "desc", title : "处理描述", width : "90px"},
				{name : "createTime", title : "创建时间", width : "150px"},
				{name : "content", title : "内容", width : "*",align:"left"}
			],
			data:${datas},
			multiple : true,
			isPagination : true,
			onrowclick : function() {
				changeToolbarState();
			},
			onSelectAll : function() {
				changeToolbarState();
			},
			gotoPage : function(currPage, pageSize){
				$("#currPage").val(currPage);
				$("#pageSize").val(pageSize);
				refreshTable();
			}
		});
		var thickbox = $("#thickboxlink").thickbox(searchData);
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
		
		$("#transport_del").click(function(){
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
						url:"${ctx}/campustransport/delete.${urlExt}",
						data:"ids="+checkboxkeys.toString(),
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
		//控制按钮显示
  			<#list Session["_curentMenuFunctions"] as funcID>
  				$("#${funcID}").show();
  			</#list>
  			
  			$(window).resize(function(){
  				var width = document.body.offsetWidth;
  				$(".ScrollDiv").css("height", $(window).height() - $("#main").height() - 20);
  				//$("#dataTable").css("width", width - 188);
  				if (width <= 815) {
  					$(".query").css("width", 805);
  					$("#dataTable").css("width", 625);
  				}
  				var q = $("#queryD");
  				q.css("height", $(window).height() - $("#main").height());
  				q.css("overflow-x", "auto");
  				q.css("overflow-y", "auto");
  				
  			});
  			
  			$(window).resize();
	});	
	
	//重置工具栏按钮的状态
  		function changeToolbarState() {
  			var hasSelected = grid.hasSelected();
		var selectedMany = grid.getSelectedCount() > 1;
			
		$("#noticecus_edit").attr("disabled", !(hasSelected &&(!selectedMany)));
		$("#noticecus_view").attr("disabled", !(hasSelected &&(!selectedMany)));
		$("#transport_del").attr("disabled", !(hasSelected ));
  		}
	function searchData(){
		refreshTable();
	}
	
	function refreshTable(){
		$("#searForm").ajaxSubmit({
			success:function(msg){
				grid.parseJsonData(msg);
				changeToolbarState();
			},
			error:function(msg){
				alert("提交失败,请重试!多次失败请与管理员联系!");
			}
		});
	}
	
	function ajaxRespMsg(msg,defmsg){try{var i=msg.indexOf("ajax:");return i<0?defmsg:msg.substring(i+5,msg.length);}catch(e){return defmsg;}}
</script>
</head>
<body class="mainBox">
	  <div class="main" id="main">
	    <p class="location"><span></span>您的位置：<@currentPosition spaceMark="&gt;&gt;"/></p>
		<div class="toolbar">
		    <li><input type="button" id="transport_del" disabled="disabled" class="del" style="display: none" value="删除"/></li>
   		</div>
   	  </div>
	<div id="queryD" style="width: 100%;">
		<div class="query">
			<form id="searForm" method="post" action="${ctx}/campustransport/list.${urlExt}">
				<input type="hidden" name="currPage" id="currPage" value="1" />
				<input type="hidden" name="pageSize" id="pageSize" value="10" />
				<ul>
					<li>outid：</li>
					<li><input type="text" name="outid" class="InputTextStyle" style="width:100px;"/></li>
					<li>企业编码：</li>
					<li><input type="text" name="ecode" class="InputTextStyle" style="width:100px;"/></li>
					<li>内容：</li>
					<li><input type="text" name="content" class="InputTextStyle" style="width:100px;"/></li>
					<li>操作时间：</li>
					<li>
					<input type="text" name="startTime" id="startTime" class="Wdate" style="width:160px;"class="Wdate"
							onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'endTime\')||\'%y-%M-%d %HH:%mm:%ss\'}'})"
							readonly="readonly" /> 至
					</li>
					<li>
					<input type="text" name="endTime" id="endTime" class="Wdate" style="width:160px;" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d %HH:%mm:%ss',minDate:'#F{$dp.$D(\'startTime\')}'})"
							readonly="readonly" />
					</li>
					<li><input type="button" id="searchButton" value="查询" class="ButtonStyle" /></li>
				</ul>
			</form>
		</div>
		<div class="clear"></div>
		<div id="dataTable" class="simpleGridTable"></div>
	</div>
	<div id="addTable"></div>
	<div style="display: none">
		<a href="#" id="thickboxlink" class="thickbox"></a>
	</div>
</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<#include "/template/security/common/head.ftl">
<#include "/template/security/common/c_simplegrid.ftl">
<#include "/template/security/common/c_thickbox.ftl">
<script language="javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
		<script language="javascript">
			$(document).ready(function(){
				grid = new SimpleGrid({
					containerId :"dataTable",
					columns : [
                        {name : "className", title : "班级名称", width : "80px"},
                        {name : "customerName", title : "学校名称", width : "80px"},
                        {name : "customerCode", title : "学校Code", width : "80px"},
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
				$("#activity_del").click(function(){
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
								url:"${ctx}/activity/delete.${urlExt}",
								data:"checkboxkeys="+checkboxkeys.toString(),
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
                $("#activity_openuse").click(function(){
                    var checkboxkeys=[];
                    var selectedUsers = grid.getSelectedItems();
                    for(var index in selectedUsers){
                        checkboxkeys.push(selectedUsers[index].id);
                    }
                    if(checkboxkeys.length==0){
                        alert("请至少选中一条记录再执行操作!");
                    }else{
                        var confirmflag=window.confirm("你确定要操作选中的记录么?");
                        if(confirmflag){
                            $.ajax({
                                type:"post",
                                url:"${ctx}/activity/use.${urlExt}",
                                data:"checkboxkeys="+checkboxkeys.toString()+"&use=0",
                                success:function(msg){
                                    if(msg=="success"){
                                        searchData();
                                    }else{
                                        alert(ajaxRespMsg(msg,"操作失败！"));
                                    }
                                },
                                error:function(msg){
                                    alert(ajaxRespMsg(msg,"操作错误!"));
                                }
                            });
                        }
                    }
                });
                $("#activity_closeuse").click(function(){
                    var checkboxkeys=[];
                    var selectedUsers = grid.getSelectedItems();
                    for(var index in selectedUsers){
                        checkboxkeys.push(selectedUsers[index].id);
                    }
                    if(checkboxkeys.length==0){
                        alert("请至少选中一条记录再执行操作!");
                    }else{
                        var confirmflag=window.confirm("你确定要操作选中的记录么?");
                        if(confirmflag){
                            $.ajax({
                                type:"post",
                                url:"${ctx}/activity/use.${urlExt}",
                                data:"checkboxkeys="+checkboxkeys.toString()+"&use=1",
                                success:function(msg){
                                    if(msg=="success"){
                                        searchData();
                                    }else{
                                        alert(ajaxRespMsg(msg,"操作失败！"));
                                    }
                                },
                                error:function(msg){
                                    alert(ajaxRespMsg(msg,"操作错误!"));
                                }
                            });
                        }
                    }
                });

				//添加
				var thickbox = $("#thickboxlink").thickbox(searchData);
					$("#voteInpote").click(function(){
						thickbox.attr("title", "导入班级");
						thickbox.attr("href","${ctx}/voteClass/importAllClass.${urlExt}?&height=400");
						thickbox.click();
					});
				//查看
				$("#voteInpoteQQ").click(function(){
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
						var title = "查询信息";
						thickbox.attr("title", title);
						thickbox.attr("href","${ctx}/activity/view.${urlExt}?dataid="+checkboxkeys.toString()+"&width=600&height=200");
						thickbox.click();
					}
				});
				//修改
				$("#activity_edit").click(function(){
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
						var title = "修改信息";
						thickbox.attr("title", title);
						thickbox.attr("href","${ctx}/activity/enterEdit.${urlExt}?dataid="+checkboxkeys.toString()+"&width=600&height=320");
						thickbox.click();
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
					$("#activity_view").attr("disabled", !(hasSelected && (!selectedMany)));
					$("#activity_edit").attr("disabled", !(hasSelected && (!selectedMany)));
					$("#activity_del").attr("disabled", !(hasSelected && (!selectedMany)));
                    $("#activity_openuse").attr("disabled", !(hasSelected && (!selectedMany)));
                    $("#activity_closeuse").attr("disabled", !(hasSelected && (!selectedMany)));

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
            <li><input type="button" id="voteInpote"  class="edit" value="导入班级"/></li>
  		</div>
	</div>
	
    <div id="queryD" style="width:100%;">
				<div class="query">
					<form id="searForm" method="post" action="${ctx}/voteClass/list.${urlExt}">
						<input type="hidden" name="currPage" id="currPage" value="1" />
						<input type="hidden" name="pageSize" id="pageSize" value="10" />
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<#include "/template/security/common/head.ftl">
<#include "/template/security/common/c_simplegrid.ftl">
<#include "/template/security/common/c_thickbox.ftl">
    <script language="javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
    <script language="javascript">
        $(document).ready(function () {
            grid = new SimpleGrid({
                containerId: "dataTable",
                columns: [
                    {name: "activityId", title: "活动", width: "80px"},
                    {name: "prizeId", title: "奖品", width: "80px"},
                    {name: "count", title: "预备总量", width: "80px"},
                    {name: "winCount", title: "已中奖数量 ", width: "80px"},
                    {name: "allotCount", title: "已分配数量", width: "80px"},
                    {name: "createOperator", title: "创建人", width: "80px"},
                    {name: "createStamp", title: "创建时间", width: "80px"},
                    {name: "modifyOperator", title: "修改人", width: "80px"},
                    {name: "modifyStamp", title: "修改时间", width: "80px"}
                ],
                multiple: true,
                isPagination: true,
                data: ${datas},
                gotoPage: function (currPage, pageSize) {
                    $("#currPage").val(currPage);
                    $("#pageSize").val(pageSize);
                    searchData();
                },
                onrowclick: function () {
                    changeToolbarState();
                },
                onSelectAll: function () {
                    k();
                }
            });


            //查询
            $("#searchButton").click(function () {
                $("#searForm").ajaxSubmit({
                    success: function (msg) {
                        grid.parseJsonData(msg);
                        changeToolbarState();
                    },
                    error: function (msg) {
                        alert("提交失败,请重试!多次失败请与管理员联系!");
                    }
                });
            });

            // 清空查询
            $("#searchClearButton").click(function () {
                $(".searchCondition").val("");
                $("#searForm").ajaxSubmit({
                    success: function (msg) {
                        grid.parseJsonData(msg);
                        changeToolbarState();
                    },
                    error: function (msg) {
                        alert("提交失败,请重试!多次失败请与管理员联系!");
                    }
                });
            });
            //删除
            $("#activityPrizeCfg_del").click(function () {
                var checkboxkeys = [];
                var selectedUsers = grid.getSelectedItems();
                for (var index in selectedUsers) {
                    checkboxkeys.push(selectedUsers[index].id);
                }
                if (checkboxkeys.length == 0) {
                    alert("请至少选中一条记录再执行删除!");
                } else {
                    var confirmflag = window.confirm("你确定要删除选中的记录么?");
                    if (confirmflag) {
                        $.ajax({
                            type: "post",
                            url: "${ctx}/activityPrizeCfg/delete.${urlExt}",
                            data: "checkboxkeys=" + checkboxkeys.toString(),
                            success: function (msg) {
                                if (msg == "success") {
                                    searchData();
                                } else {
                                    alert(ajaxRespMsg(msg, "删除失败！"));
                                }
                            },
                            error: function (msg) {
                                alert(ajaxRespMsg(msg, "删除错误!"));
                            }
                        });
                    }
                }
            });
            //添加
            var thickbox = $("#thickboxlink").thickbox(searchData);
            $("#activityPrizeCfg_add").click(function () {
                thickbox.attr("title", "添加学校");
                thickbox.attr("href", "${ctx}/activityPrizeCfg/enterAdd.${urlExt}?width=650&height=280");
                thickbox.click();
            });
            //查看
            $("#activityPrizeCfg_view").click(function () {
                var checkboxkeys = [];
                var selectedUsers = grid.getSelectedItems();
                var selectIndex = '';
                for (var index in selectedUsers) {
                    checkboxkeys.push(selectedUsers[index].id);
                    selectIndex = index;
                }
                if (checkboxkeys.length == 0) {
                    alert("修改时您需要选择一条记录");
                } else if (checkboxkeys.length > 1) {
                    alert("修改时您只能选择一条记录");
                } else if (checkboxkeys.length == 1) {
                    var title = "查询信息";
                    thickbox.attr("title", title);
                    thickbox.attr("href", "${ctx}/activityPrizeCfg/view.${urlExt}?dataid=" + checkboxkeys.toString() + "&width=600&height=230");
                    thickbox.click();
                }
            });
            //修改
            $("#activityPrizeCfg_edit").click(function () {
                var checkboxkeys = [];
                var selectedUsers = grid.getSelectedItems();
                var selectIndex = '';
                for (var index in selectedUsers) {
                    checkboxkeys.push(selectedUsers[index].id);
                    selectIndex = index;
                }
                if (checkboxkeys.length == 0) {
                    alert("修改时您需要选择一条记录");
                } else if (checkboxkeys.length > 1) {
                    alert("修改时您只能选择一条记录");
                } else if (checkboxkeys.length == 1) {
                    var title = "修改信息";
                    thickbox.attr("title", title);
                    thickbox.attr("href", "${ctx}/activityPrizeCfg/enterEdit.${urlExt}?dataid=" + checkboxkeys.toString() + "&width=600&height=320");
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
                $("#activityPrizeCfg_view").attr("disabled", !(hasSelected && (!selectedMany)));
                $("#activityPrizeCfg_edit").attr("disabled", !(hasSelected && (!selectedMany)));
                $("#activityPrizeCfg_del").attr("disabled", !(hasSelected && (!selectedMany)));
            }

            $(window).resize(function () {
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

        function ajaxRespMsg(msg, defmsg) {
            try {
                var i = msg.indexOf("ajax:");
                return i < 0 ? defmsg : msg.substring(i + 5, msg.length);
            } catch (e) {
                return defmsg;
            }
        }

    </script>
</head>
<body class="mainBox">
<div class="main" id="main">
    <p class="location"><span></span>您的位置：<@currentPosition spaceMark="&gt;&gt;"/></p>

    <div class="toolbar">
        <li><input type="button" id="activityPrizeCfg_view" disabled="disabled" class="view" style="display: none"
                   value="查看"/></li>
        <li><input type="button" id="activityPrizeCfg_add" class="add" style="display: none" value="增加"/></li>
        <li><input type="button" id="activityPrizeCfg_edit" disabled="disabled" class="edit" style="display: none"
                   value="编辑"/></li>
        <li><input type="button" id="activityPrizeCfg_del" disabled="disabled" class="del" style="display: none"
                   value="删除"/></li>
    </div>
</div>

<div id="queryD" style="width:100%;">
    <div class="query">
        <form id="searForm" method="post" action="${ctx}/activityPrizeCfg/list.${urlExt}">
            <input type="hidden" name="currPage" id="currPage" value="1"/>
            <input type="hidden" name="pageSize" id="pageSize" value="10"/>
            <ul>
                <li>活动：</li>
                <li>
                    <select id="activityId" name="activityId" style="width:200px" class="searchCondition">
                        <option value="">不限</option>
                    <#list ACTIVITY?keys as key>
                        <option value="${key}">${ACTIVITY.get(key)}</option>
                    </#list>
                    </select>
                </li>
                <li>奖品：</li>
                <li>
                    <select id="prizeId" name="prizeId" style="width:200px" class="searchCondition">
                        <option value="">不限</option>
                    <#list PRIZE?keys as key>
                        <option value="${key}">${PRIZE.get(key)}</option>
                    </#list>
                    </select></li>
                <li><input type="button" id="searchButton" value="查询" class="ButtonStyle"/></li>
                <li><input type="button" id="searchClearButton" value="清空" class="ButtonStyle"/></li>
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
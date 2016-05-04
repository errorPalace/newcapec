<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<#include "/template/security/common/head.ftl">
    <script type="text/javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/thickbox/thickbox_close.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //设置每个检验区的宽度
            $("div[id$='Tip']").each(function () {
                $(this).css("font-size", "12px").css("width", "150px");
                $(this).css("text-align", "left")
            });
            $("#cancel").click(function () {
                tb_remove();
            });
        });
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
<body style="overflow-y: auto; margin: 0">
<div class="box">
    <table id="addData" border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder">
        <tr>
            <td width="100px" class="PopUpTableTitle">活动：</td>
            <td width="200px">${activityId?default("")}</td>
            <td width="100px" class="PopUpTableTitle">奖品：</td>
            <td width="200px">${prizeId!}</td>
        </tr>
        <tr>
            <td class="PopUpTableTitle">奖品等级 ：</td>
            <td>${prizeType!}</td>
            <td class="PopUpTableTitle">预备数量：</td>
            <td>${data.count!}</td>
        </tr>
        <tr>
            <td class="PopUpTableTitle">已中奖数量 ：</td>
            <td>${data.winCount!}</td>
            <td class="PopUpTableTitle">已分配数量：</td>
            <td>${data.allotCount!}</td>
        </tr>
        <tr>
            <td class="PopUpTableTitle">创建人 ：</td>
            <td>${data.createOperator!}</td>
            <td class="PopUpTableTitle">修改人：</td>
            <td>${data.modifyOperator!}</td>
        </tr>
        <tr>
            <td class="PopUpTableTitle">创建时间：</td>
            <td>${data.createStamp!}</td>
            <td class="PopUpTableTitle">修改时间：</td>
            <td>${data.modifyStamp!}</td>
        </tr>
    </table>
</div>
<div class="box">
    <input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue"/>
</div>
</body>
</html>
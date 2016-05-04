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
            <td width="100px" class="PopUpTableTitle">名称：</td>
            <td width="200px">${data.name?default("")}</td>
            <td width="100px" class="PopUpTableTitle">等级：</td>
            <td width="200px">${type!}</td>
        </tr>
        <tr>
            <td class="PopUpTableTitle">备注：</td>
            <td>${data.note!}</td>
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
        <tr>
            <td class="PopUpTableTitle">图片：</td>
            <td colspan="3"><a href="${photo_path!''}" title="查看原图" target="_blank"><img
                    src="${photo_path!''}" alt=""  height="80" /></a></td>
        </tr>
    </table>
</div>
<div class="box">
    <input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue"/>
</div>
</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<#include "/template/security/common/head.ftl">
    <link rel="stylesheet" type="text/css" media="all"
          href="${wctx}/pub/script/jquery/formValidator/css/validator.css"/>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidator.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/formValidator/source/formValidatorRegex.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/jquery.form.js"></script>
    <script type="text/javascript" src="${wctx}/pub/script/jquery/thickbox/thickbox_close.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //设置每个检验区的宽度
            $("div[id$='Tip']").each(function () {
                $(this).css("font-size", "12px").css("width", "220px");
                $(this).css("text-align", "left").css("margin-left", "0px").css("margin-right", "0px");
            });
            checkForm();
            $("#save").click(function () {
                saveData(false);
            });
            $("#saveClose").click(function () {
                saveData(true);
            });
            $("#cancel").click(function () {
                tb_remove();
            });
            function saveData(close) {
                if (jQuery.formValidator.pageIsValid()) {
                    $("#dataForm").ajaxSubmit({
                        success: function (msg) {
                            if (msg == "success") {
                                if (close) {
                                    tb_callback();
                                } else {
                                    $("#dataForm").resetForm();
                                }
                            } else {
                                alert(ajaxRespMsg(msg, "提交失败,请重试!多次失败请与管理员联系!"));
                            }
                        },
                        error: function (msg) {
                            alert(ajaxRespMsg(msg, "提交失败,请重试!多次失败请与管理员联系!"));
                        }
                    });
                }
            }
        });
        function checkForm() {
            $.formValidator.initConfig();
            $("#data_name").formValidator({
                onshow: "请输入", onfocus: "至少1个字符，最多100个字符", oncorrect: "可用"
            }).inputValidator({
                min: 1, max: 100, onerror: "不合法，请重新输入"
            }).functionValidator({
                fun: function (value, element) {
                    var patrn = /[%\[\]"*()&'\,;\=\?\$<\\>\/]/g;
                    if (patrn.exec(value)) {
                        return "输入包含有非法字符！";
                    } else {
                        return true;
                    }
                }
            });

            $("#data_description").formValidator({
                onshow: "请输入", onfocun: "最多2000个字符", oncorrect: "可用"
            }).inputValidator({
                min: 0, max: 2000, onerror: "描述不正确"
            });
            $("#data_inCount").formValidator({
                onshow: "请输入",
                onfocus: "大于等于0的整数",
                oncorrect: "输入正确"
            }).inputValidator({
                min: 1,
                max: 10,
                onerror: "1-10位"
            }).functionValidator({
                fun: function (value, element) {
                    var patrn = /^[1-9]\d*|0$/g;
                    if (!patrn.test(value)) {
                        return "大于等于0的整数";
                    }
                    return true;
                }
            });
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
<body style="overflow-y: hidden; margin: 0">
<div class="box">
    <form action="${ctx}/activity/edit.${urlExt}" method="post" id="dataForm">
        <input type="hidden" name="data.id" value='${data["id"]}' />
        <table class="PopUpTableBorder" width="99%">
            <tr>
                <td class="PopUpTableTitle">活动名称：</td>
                <td><input id="data_name" name="data.name" style="width: 97%" class="PopUpInput"
                           value="${data.name?default("")}"/></td>
                <td width="220px">
                    <div id="data_nameTip"/>
                </td>
            </tr>
            </tr>
            <tr>
                <td class="PopUpTableTitle">描述：</td>
                <td>
						   <textarea rows="7" cols="50" id="data_description" name="data.description"
                                   >${data.description?default("")}</textarea>
                </td>
                <td>
                    <div id="data_descriptionTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle">每人限中次数：</td>
                <td><input id="data_inCount" name="data.inCount" style="width:97%;" class="PopUpInput"
                           value="${data.inCount?default("")}"/></td>
                <td>
                    <div id="data_inCountTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>开始时间：</td>
                <td>
                ${data.startStamp?default("")}
                </td>
                <td>
                    <div id="data_startStampTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>截止时间：</td>
                <td>${data.endStamp?default("")}
                </td>
                <td>
                    <div id="data_endStampTip"/>
                </td>
            </tr>
        </table>
    </form>
</div>
<div class="box">
    <input type="button" value="保存并关闭" id="saveClose" class="ButtonStyle_Blue"/>
    <input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue"/>
</div>
</body>
</html>
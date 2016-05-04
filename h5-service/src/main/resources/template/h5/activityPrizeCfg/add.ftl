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
    <!-- JS引用 -->
    <script language="javascript" src="${wctx}/pub/upload/script/swfupload/upload.loader.js"></script>

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

            $(".PopUpInput").click(function () {
                $(".PopUpInputHover").each(function () {
                    $(this).removeClass();
                    $(this).addClass("PopUpInput");
                });
                $(this).removeClass();
                $(this).addClass("PopUpInputHover");
            });

            $(".PopUptextarea").click(function () {
                $(".PopUpInputHover").each(function () {
                    $(this).removeClass();
                    $(this).addClass("PopUpInput");
                });
            });

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

        function checkForm() {
            $.formValidator.initConfig();

            $("#data_count").formValidator({
                onshow: "请输入",
                onfocus: "大于0的整数",
                oncorrect: "输入正确"
            }).inputValidator({
                min: 1,
                max: 10,
                onerror: "1-10位"
            }).functionValidator({
                fun: function (value, element) {
                    var patrn = /^[1-9]\d*$/g;
                    if (!patrn.test(value)) {
                        return "大于0的整数";
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
    <form action="${ctx}/activityPrizeCfg/add.${urlExt}" method="post" id="dataForm">
        <table border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder" width="99%">
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>活动：</td>
                <td><select id="data_activityId" name="data.activityId" style="width:95%" class="PopUpInput">
                <#list ACTIVITY?keys as key>
                    <option value="${key}">${ACTIVITY.get(key)}</option>
                </#list>
                </select></td>
                <td width="220px">
                    <div id="data_activityIdTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>奖品：</td>
                <td><select id="data_prizeId" name="data.prizeId" style="width:95%;" class="PopUpInput">
                <#list PRIZE?keys as key>
                    <option value="${key}">${PRIZE.get(key)}</option>
                </#list>
                </select></td>
                <td width="220px">
                    <div id="data_prizeIdTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>准备总量：</td>
                <td>
                    <input id="data_count" name="data.count" style="width:97%;height:25px;" class="PopUpInput"/>
                </td>
                <td>
                    <div id="data_countTip"/>
                </td>
            </tr>
        </table>
    </form>
</div>
<div class="box">
    <table width="99%" border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder">
        <tr>
            <td style="text-align: left; padding-left: 10px;">注：加“<font color="#FF0000">*</font>”为必填项</td>
        </tr>
    </table>
</div>
<div class="box">
    <input type="button" value="保存并关闭" id="saveClose" class="ButtonStyle_Blue"/>
    <input type="button" value="关闭" id="cancel" class="ButtonStyle_Blue"/>
</div>
</body>
</html>
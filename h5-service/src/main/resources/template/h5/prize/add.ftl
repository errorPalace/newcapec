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
    <style>
        .opacity {
            opacity: 0;
            FILTER: Alpha(Opacity=0);
        }

        .text {
            border: 1px solid #c0c1b3;
            width:80%;
        }

        .text.opacity {
            position: absolute;
            height: 20px;
        }

        .text.file {
            width: 129px !important;
            width: 135px;
            z-index: 100;
        }

        .text.file_btn {
            height: 19px;
            margin: 0 0 -1px 0;
            width: auto !important;
            width: 60px;
            background: #f0f0f0;
            padding:;
        }
    </style>
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
            $("#photo").formValidator({
                onshow: "请上传图片",
                onfocus: "图片只能是jpg、jpeg、png格式",
                oncorrect: "输入正确"
            }).functionValidator({
                fun: function (value, element) {
                    var patrn = /\.(jpg|png|jpeg)$/i;
                    if (value == "" || !patrn.test(value)) {
                        return "图片只能是jpg、jpeg、png格式";
                    }
                    return true;
                }
            });

            $("#data_note").formValidator({
                onshow: "请输入", onfocus: "至少1个字符，最多1000个字符", oncorrect: "可用"
            }).inputValidator({
                min: 1, max: 1000, onerror: "不合法，请重新输入"
            });
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
    <form action="${ctx}/prize/add.${urlExt}" method="post" id="dataForm">
        <table border="0" cellspacing="0" cellpadding="0" class="PopUpTableBorder" width="99%">
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>名称：</td>
                <td><input id="data_name" name="data.name" style="width:97%;height: 25px;" class="PopUpInput"/></td>
                <td width="220px">
                    <div id="data_nameTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>备注：</td>
                <td><input id="data_note" name="data.note" style="width:97%;height: 25px;" class="PopUpInput"/></td>
                <td width="220px">
                    <div id="data_noteTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>照片：</td>
                <td>
                    <div style="margin:2px;">
                        <input type="file" name="photo" id='photo'
                               size="20"
                               onchange="document.getElementById('file_0').value=this.value"
                               class="text opacity"> <input name="file_0" id="file_0"
                                                            value="" class="text"> <input type="button" value="浏览..."
                                                                                          class="file_btn">
                    </div>
                </td>
                <td>
                    <div id="photoTip"/>
                </td>
            </tr>
            <tr>
                <td class="PopUpTableTitle"><span style="color:red">*</span>等级：</td>
                <td><select id="data_type" name="data.type" style="width:96%" class="PopUpInput">
                <#list TYPE_MAP?keys as key>
                    <option value="${key}">${TYPE_MAP.get(key)}</option>
                </#list>
                </select></td>
                <td width="220px">
                    <div id="data_typeTip"/>
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
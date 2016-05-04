/*
描述：APP端调用的下单预支付并调起微信页面方法
传入参数：json字符串
json字符串内容：ver, app_id,acccode,merchant_olid,gateway_id,gateway_type,order_no,olid,total_fee,accdescrp,sign,openid,secret
return_url：支付成功后，app端的接收页面
*/
function PrePayOrder(json, return_url) {

        var ver = json.ver;
        var app_id = json.app_id;
        var acccode = json.acccode;
        var merchant_olid = json.merchant_olid;
        var gateway_id = json.gateway_id;
        var gateway_type = json.gateway_type;
        var order_no = json.order_no;
        var olid = json.olid
        var sign = json.sign;
        var openid = json.openid;
        var secret = json.secret;
        var total_fee = json.total_fee;
        var accdescrp = json.accdescrp;  

        if (gateway_type == "publicwxpay") {
            //公众微信号支付
            var url = "http://olpaytest.17wanxiao.com/PayGatewayNew/jspay/wxpay/WXPubGetOpenID.aspx?ver=" + ver
                    + "&app_id=" + app_id + "&acccode=" + acccode + "&accdescrp=" + accdescrp + "&merchant_olid=" + merchant_olid + "&gateway_id=" + gateway_id
                    + "&total_fee=" + total_fee + "&gateway_type=" + gateway_type + "&order_no=" + order_no + "&olid=" + olid + "&sign=" + sign
                    + "&return_url=" + return_url + "&openid=" + openid + "&secret=" + secret + "";

            window.location.href = url;

        }
}

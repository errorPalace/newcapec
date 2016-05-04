(function (Framework7,T7,$$,moment) {
    'use strict';

    function  currency(value){
        var f1 = value;
        var f2 = (Math.round((f1-0) * 100)) / 100;
        f2 = Math.floor(f2) == f2 ? f2 + ".00" : (Math.floor(f2 * 10) == f2 * 10) ? f2 + '0' : f2;
        f2 = String(f2);
        var r = /(\d+)(\d{3})/;
        var fs = String(f2);
        while (r.test(f2)) {
            f2 = f2.replace(r, '$1' + ',' + '$2');
        }
        return f2;
    }
    T7.registerHelper('currency',function(value){
        return currency(value);
    });



    var myApp = new Framework7({

        animateNavBackIcon: true,
        precompileTemplates: true,
        template7Pages: true,
        modalButtonOk:'确定',
        modalButtonCancel:'取消',
        cache:true,
        scroller:"auto",
        modalTitle:"",
        preprocess:function(content,url,next){
            if(url=='tpl/lostCard.html' ||
                //url =='tpl/lostCheckIn.html' ||
                url =='tpl/recharge.html')
            {
                var template = T7.compile(content);
                var resultContent =  template(myApp.template7Data.xykBaseInfo);
                next(resultContent);
            }else{
                return content;
            }
        }
    });


    var Host = ["http://192.168.157.53:8002",''][1],
        urls={
            'xyk':Host+'/quickaccess/v1/route.action'
        },
        req,
        xykApi,
        isIos7 = getIosVersion();

    window.isIos7 = isIos7;

    var client  =getClientInfo();
    if(!client){
        myApp.alert("获取客户信息出错!");
        return;
    }
    myApp.clientInfo = client;

    req = function (url,params, success) {
        var data = {
            customerCode: client['customerCode'],
            outid:client['outid'],
            method: 'XYK_BASE_INFO'
        };

        params['key'] = client['key'];
        params.param = params.param || {};
        params.param['outid']  = client['outid'];
        params.param['sourceType'] ='0';

        params.param = JSON.stringify(params.param);
        for (var p in params) {
            data[p] = params[p];
        }
        return $$.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
            timeout:40*1000,
            beforeSend:function(xhr){
                xhr.setRequestHeader('Campus-H5-Request','ajax');
            },
            complete:function(){
            },
            success: function(result){
                if(result &&  result.code === "000"){
                    var  body = result.body,
                        d ={};
                    if(body){
                        if(typeof(body) == 'string'){
                            try{
                                d = JSON.parse(body);
                            }catch(error){
                                console.log("ERROR:"+body);
                                myApp.hideIndicator();
                            }
                        }else if(typeof(body)=='object'){
                            d = body;
                        }
                        success(d);
                    }else{
                        success(result);
                    }
                }else{
                    myApp.alert(result.msg);
                    myApp.hideIndicator();
                }
            },
            error: function(xhr,status){
                myApp.alert("服务器返回异常");
                myApp.hideIndicator();
            }
        })

    }


    xykApi = {
        //首界面数据
        main: function (param, success) {
            req(urls.xyk,{method: 'XYK_BASE_INFO', param: param}, success);
        },
        //解绑
        unbind:function(param,success){
            req(urls.xyk,{method:'XYK_UNBIND',param:param},success);
        },
        //修改查询密码
        modifyPassword: function (param, success) {
            req(urls.xyk,{method: 'XYK_MODIFY_PASSWORD', param: param}, success);
        },
        //卡挂失
        lostCard: function (param, success) {
            req(urls.xyk,{method: 'XYK_LOST_CARD', param: param}, success);
        },
        //交易明细
        trade: function (param, success) {
            req(urls.xyk,{method: 'XYK_TRADE_DETAIL', param: param}, success);
        },
        //捡卡登记
        checkIn: function (param, success) {
            req(urls.xyk,{method: 'XYK_CHECK_IN', param: param}, success);
        },
        //领取圈存
        claim: function (param, success) {
            req(urls.xyk,{method: 'XYK_CLAIM', param: param}, success);
        },
        // 以下两个接口比较奇葩坑爹 圈存token
        //获取签约银行
        signBank:function(param,success){
            param['method'] ='XYK_SIGN_BANK';
            req(urls.xyk,param, success);
        },
        //圈存充值
        qc:function(param,success){
            param['method'] ='XYK_QC';
            req(urls.xyk,param, success);
        }
    };


    window._xykApi = xykApi;
    window.myApp = window._myApp = myApp;



    //获取通过url后缀传递的参数
    function getClientInfo(){
        var _s =window.location.search,
            attr ={};
        if(_s.indexOf("?")>=0){
            _s = _s.substring(1);
            var arry = _s.split("&");
            for(var i=0;i<arry.length;i++){
                var item = arry[i];
                attr[item.split("=")[0]] = item.split("=")[1];
            }
        }else{
            return;
        }
        return attr;
    }


    function  orderByMonth(data,key){
        var year = {};
        var unclaimed  =0;//未领款总计
        for(var k =0;k<data.length;k++){
            var item = data[k];
            /*if(item.opdt){
                var day =moment(item[key]);
                    day = day.toDate();

                var _y = day.getFullYear(),
                   _m = day.getMonth();


                if(!year[_y]){
                    var _arry = [];
                    for(var i=0;i<12;i++){
                        _arry[i]=[];
                    }
                    year[_y] = _arry;
                }
                year[_y][_m].push(item);
            }*/
            if(item.status == 1){ //未领款
                unclaimed = unclaimed + (item.opfare -0)

                if(item.opdt){
                    var day =moment(item[key]);
                    day = day.toDate();

                    var _y = day.getFullYear(),
                        _m = day.getMonth();


                    if(!year[_y]){
                        var _arry = [];
                        for(var i=0;i<12;i++){
                            _arry[i]=[];
                        }
                        year[_y] = _arry;
                    }
                    year[_y][_m].push(item);
                }
            }

        }

        var keys =  Object.keys(year);
        if(keys.length>1)keys = keys.reverse();

        var d = [];
        for(var j =0;j<keys.length;j++){
             var  _tem = year[keys[j]],
                 leng = _tem.length;
            for(var t= leng-1;t>=0;t--){
                if(_tem[t].length>0){
                    d.push({month:j>0?keys[j]+"-"+(t+1):t+1,
                            total:_tem[t].length,
                            items:_tem[t]})
                }
            }

        }



        return  {unclaimed:unclaimed,items:d};
    }

    var getMonthStartEndDay = function(num){
            if(!/\d+/.test(num)){
                num = 4;
            }
            var format = "YYYY-MM-DD",
                data= [];

            for(var i= 0;i<num;i++){
               var  m = moment().subtract(i,'M'),
                        year = m.year(),
                        month  = m.month()>=9?m.month()+1:"0"+(m.month()+1);
               var beginDate = year + "-"+month+"-01",
                   endDate = m.endOf('month').format("YYYY-MM-DD");

               var obj={
                    beginDate:beginDate,
                    endDate:endDate,
                    text:year+"年"+(m.month()+1)+"月",
                    month:(m.month()+1)
                   }; 

                 data.push(obj);  
            }    
            return data;
            
    }

    window.orderByMonth = orderByMonth;
    window.getMonthStartEndDay = getMonthStartEndDay;
    window.currency  = currency;


    /**
     * 检测 是否是IOS 7 版本 不支持localstorage
     * @returns {boolean}
     */
    function getIosVersion(){
        var ios7 = false;
        if(myApp.device.ios){
            var v = myApp.device.osVersion;
            if(/^7\.\d+/.test(v)){
                ios7 = true;
            }
        }
        return ios7;
    }

})(Framework7,Template7,Dom7,moment);

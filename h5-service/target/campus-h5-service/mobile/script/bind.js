(function($$){
    var  bind = {
        host:'',
        clientInfo:{},
        init:function(){
            this.clientInfo= this.getClientInfo();
            if(!this.clientInfo){
                   tip();
                   return; 
            }
            var  b = new Base64();                    
            this.clientInfo['customerName'] = b.decodeSafeUrl(this.clientInfo['customerName']); 
            $$("input[name='school']").val(this.clientInfo['customerName']);

            $$("#customerCode").val(this.clientInfo['customerCode']);    
            $$("#cardNo").val(this.clientInfo['outid']);    

            //var a = "unionId,openId,userId,type";
            this.bindEvent();
            function tip(){
                myApp.alert("初始化参数错误");
            }
        },
        bindEvent:function(){
            var self = this;
            $$(".button").on('click',function(){
               var customerCode = $$("#customerCode").val(),
                   truename = $$("#truename").val(),
                   cardNo  = $$("#cardNo").val(),
                   cardpwd = $$("#cardpwd").val();
                if(truename =='' || cardNo =='' || cardpwd =='' || customerCode==''){
                    myApp.alert("以上信息均不能为空");
                    return;
                }
                var reg = /^\d{6}$/;
                if(!reg.test(cardpwd)){
                    myApp.alert("请填写正确的密码");
                    return;
                }

                var p ={
                    key:self.clientInfo['key'],
                    customerCode:customerCode,
                    outid:cardNo,
                    param:{}
                };
                p.param = JSON.stringify({
                    sourceType:'0',
                    name:truename,
                    password:cardpwd,
                    outid:cardNo
                });
                self.submit(p);

            });
        },
        submit:function(param){
            var self = this;
            myApp.showIndicator();
            param['method'] ='XYK_REG_BIND';
            this.sendRequest({url:this.host+'/quickaccess/v1/route.action',method:'POST',data:param},
                function(data){
                    myApp.hideIndicator();

                    var args =[];
                    for(var i in self.clientInfo){args.push(i+"="+self.clientInfo[i])};

                    window.location.href ="index.html?"+args.join("&");
                }
            );
        },
        sendRequest:function(option,callback){
            var self = this;
            $$.ajax({
                url:self.host+option.url,
                method:option.method||'GET',
                dataType:'json',
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Campus-H5-Request','ajax');
                },
                data:option.data || '',
                timeout:40*1000,
                success:function(result){
                    if(result &&  result.code === "000"){
                        callback(result);
                    }else{
                        myApp.hideIndicator();
                        myApp.alert(result.msg);
                    }
                },
                error:function(xhr,status){
                    myApp.hideIndicator();
                     myApp.alert("服务器返回异常");
                }
            });
        },
        /**
         * 获取url解密后的参数
         * [getClientInfo description]
         * @return {[type]} [description]
         */
        getClientInfo:function(isDecode){
            var _s =window.location.search,
                attr ={};
            if(_s.indexOf("?")>=0){
                _s = _s.substring(1);
                var arry = _s.split("&");
                for(var i=0;i<arry.length;i++){
                    var item = arry[i];

                    if(isDecode && Base64){        
                        var  b = new Base64();                    
                        attr[item.split("=")[0]] = b.decodeSafeUrl(item.split("=")[1]);                        
                    }else{
                        attr[item.split("=")[0]] = item.split("=")[1];
                    }
                }
            }else{
                return;
            }
            return attr;
        }
    };
    bind.init();

})(Dom7);
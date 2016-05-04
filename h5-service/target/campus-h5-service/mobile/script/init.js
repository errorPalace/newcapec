(function(Framework7,$$,T7,xykApi,myApp){

    //var myApp =  myApp;
    var mainView = myApp.addView('#mainView',{
        dynamicNavbar:true,
        domCache:true
    });

    $$(document).on('pageBeforeInit',function(e){
        var page = e.detail.page;
        pageBeforeInit(page);
    });
    $$(document).on('pageAfterAnimation',function(e){
        var page = e.detail.page;
        pageAfterAnimation(page);
    });

    //mainView.router.reloadPage('index.html');
    $$('div.navbar').removeClass('navbar-hidden');

    //首页
    var home = {
        init:function(){
            myApp.showIndicator();
            this.getYktInfo();
            var that = this;
            //注销
            $$('#menu').on('click',function(){
                that.exit();
            });
        },
        exit:function(){

                var self = this;
                    /*requestParam = {
                        outid:myApp.clientInfo['outid'] || '',
                        customerCode:myApp.clientInfo['customerCode'] || '',
                        method:'XYK_UNBIND'
                    };*/
                myApp.modal({
                    title:  '校园卡解绑',
                    text: '解绑后将无法使用校园卡相关功能!',
                    afterText: '<div class="input-field"><input type="password" class="modal-text-input" placeholder="请输入校园卡密码"></div>',
                    buttons: [{text: '确定'},{text: '取消',bold: true}],
                    onClick: function (modal, index) {
                        if (index === 0){
                            var password = $$(modal).find('.modal-text-input').val();
                            if(password=='')return;

                            myApp.showIndicator();
                            var p ={
                                password:password,
                                sourceType:0
                            };
                            self.unBind(p);
                            //send(requestParam);
                        }
                    }
                  });
               /* function send(params){
                    $$.ajax({
                        url:'/quickaccess/v1/route.action',
                        method: 'POST',
                        data:params,
                        dataType: 'json',
                        timeout:40*1000,
                        success:function(data){
                            myApp.hideIndicator();
                            if(data.code == "000"){
                                window.location.href ="/quickaccess/v1/invoke.action?outid="+params['outid']+"&customerCode="+params['customerCode'];
                            }else{
                                myApp.alert(data.msg);
                            }    
                        },
                        error:function(data){
                            myApp.hideIndicator();
							myApp.alert("服务器异常");
                        }
                    });
                }*/
        },
        //解绑
        unBind:function(params){
            xykApi.unbind(params,function(data){
                   window.location.href ="/quickaccess/v1/invoke.action?outid="+params['outid']+"&customerCode="+(myApp.clientInfo['customerCode'] || ''); 
            });

        },
        getYktInfo:function(){
            var that = this;
            _xykApi.main({},function(result){
                that.render(result);


                that.getUnClaim();//获取未领圈存
            });
        },
        render:function(data){
            myApp.template7Data.xykBaseInfo = data;
            var obj  ={
                sum:(data.mainFare-0) + (data.subsidyFare-0),//余额
                unclaim:0
            };
            //动态加载url 地址
           // for(var i in _PATH_NAME){obj[i] = _PATH_NAME[i]};

            var output = tplManager.renderTplById("baseTemplate",obj);
            $$("#mainView").find(".page-content .cardbox").html(output);
            $$("#mainView").find(".xyk-info").text(currency(obj.sum));
            $$("#menu span").html(data.name);
            myApp.hideIndicator();
        },
        getUnClaim:function(){
            queryUnclaim.getQueryList(function(data){
                myApp.hideIndicator();
                var _d  = window.orderByMonth(data,'opdt');
                if(!isIos7){
                    localStorage.setItem('wx_unclaim',JSON.stringify(_d));
                }
                if(_d.unclaimed!=0){
                    $$("#home_unclaim").find('span').text(currency(_d.unclaimed));
                    $$("#home_unclaim").show();
                }
            });
        }

    };
    //交易明细模块
    var trade ={
        //设置上拉加载 最多条数
        MAX_ITEM:100,
        //当前条数
        items:0,
        //每次请求的条数(第一次获取全部)
        pagesize:10,
        //当月是否全部加载  或者  是否是最后一页(包含 当前条数大于设置的最大条数)
        isLast:false,
        init:function(){
            this.initParams();
            this.bindData();
            this.bingEvent();
        },
        bindData:function(){
            this.getTradeList();
        },
        /**
         * 初始化 请求参数
         * (不在状态 写的乱 fuck)
         */
        initParams :function(params){

            var that  = this,
                m = moment(),
                year = m.year(),
                month  = m.month()>=9?m.month()+1:"0"+(m.month()+1);
            var beginDate = year + "-"+month+"-01",
                endDate = moment().endOf('month').format("YYYY-MM-DD");

            this.items =0;
            this.isLast = false;

            params  = params || {beginDate:beginDate,endDate:endDate,month:(m.month()+1),text:year+"年"+(m.month()+1)+"月"};
            params['beginIndex']  = 0;
            params['count']  = that.pagesize;

            this.params  =  params;
        },
        getTradeList:function(append,callback){
            myApp.showIndicator();

            typeof  append =='function' && (callback = append,append = false );
            var that  = this;

            this.params || this.initParams();
            var p ={};
            for(var i in that.params)p[i] =that.params[i];

            p['beginIndex']  = that.items;


            delete p['month'];
            delete p['text'];

            _xykApi.trade(p,function(result){

                that.items  =  that.items + result.data.length;
                that.render(result.data,append);
                callback && callback(result);
            });
        },
        render:function(data,append){
            var  that = this,
                $all = $$("#trade_box").find(".media-list ul");

            if(that.items == 0){//说明当月没有记录

                var tip ='<div class="content-block">'+
                    ' <div class="content-block-inner">暂时还没有记录</div>'+
                    '</div>';

                $all.html(tip);
            }else{
                var isFirstLoad  =that.items > that.pagesize ?false:true;

                var _d = {
                    isFirstLoad:isFirstLoad,
                    items:data,
                    month:that.params.month
                }
                var AllContent = tplManager.renderTplById('tradeListTemplate',_d);
                if(!!append){
                    $all.append(AllContent);
                }else{
                    $all.html(AllContent);
                }
            }

            if(data && (data.length < that.pagesize)){
                //断开对应的加载绑定
                that.detachScroll();
            }else{
                that.showLoadMore(true);
            }
            $all.show();
            $$('#tradeNavText').find('a').text(that.params.text+"记录");
            myApp.getScroller().refresh();
            myApp.hideIndicator();
        },
        /**
         * 断开  加载更多
         */
        detachScroll:function(){
            var that = this,
                iscroll = $$("#trade_box");

            that.isLast = true;
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            myApp.detachInfiniteScroll(iscroll);

            that.showLoadMore(false);
        },
        /**
         * 打开 加载更多
         */
        attchScroll:function(){
            var that = this,
                iscroll = $$("#trade_box");

            that.isLast = false;
            myApp.attachInfiniteScroll(iscroll);

            //that.showLoadMore(true);
        },
        //显示或隐藏 加载更多图标
        showLoadMore:function(flag){
            var load = $$("#trade_box").find('.infinite-scroll-preloader');
            if(flag){
                load.show();
            }else{
                load.hide();
            }
        },
        bingEvent:function(){
            var that = this;

            var ptrContent = $$("#trade_box");
            ptrContent.on('refresh',function(e){
                setTimeout(function(){
                    var _p = that.params;

                    that.initParams(_p);//刷新 当月

                    that.getTradeList(function(){
                        ptrContent.scrollTop(0);
                        myApp.pullToRefreshDone();
                    })
                    //打开加载更多(之前可能断开)
                    that.attchScroll();
                },500);
            });

            var iscroll = $$("#trade_box"),
                loading = false;
            iscroll.on('infinite',function(e){
                if(loading)return;
                loading = true;
                setTimeout(function(){
                    that.getTradeList(true,function(){
                        if(that.items>that.MAX_ITEM){
                            that.detachScroll();
                        }
                        loading = false;
                    });
                },500);
            });

            var options  =$$('#tradeNavText');
            options.on('click',function(e){
                var navObj = this;
                if($$(".tradeOption").length<=0){
                    var output = tplManager.renderTplById('tradeOptionTemplate',getMonthStartEndDay(4));
                    $$('body').append(output);

                    $$(document).on('click','.tradeOption li',function(e){
                        ptrContent.scrollTop(0);
                        //初始化参数
                        that.initParams({
                            beginDate:$$(this).data('begindate'),
                            endDate:$$(this).data('enddate'),
                            month:$$(this).data('month'),
                            text:$$(this).find("a").text()
                        });
                        //获取数据
                        that.getTradeList();
                        //打开加载更多(之前可能断开)
                        that.attchScroll();
                        //关闭 弹层
                        myApp.closeModal('.tradeOption');
                    })
                }
                setTimeout(function(){
                    myApp.popover('.tradeOption',navObj);
                },100);
            });


        }
    };
    //常见问题
    var faq = {
        init:function(){
            myApp.showIndicator();
            this.getFaq();
        },
        getFaq:function(){
            var that = this;
            $$.ajax({
                url:'api/faq.json',
                dataType:'json',
                success:function(result){
                    that._data = result;
                    that.render(result);
                }
            })
        },
        render:function(data){
            var  that = this;
            var output = tplManager.renderTplById('faqListTemplate',data);
            $$("#faq_list").html(output);
            myApp.hideIndicator();
            this.bindEvent();
        },
        bindEvent:function(){
            var  that = this,
                _data = this._data;
            var link  = $$("#mainView").find('.list-block li a');
            link.on('click',function(e){
                var  content  = $$(this).data("faq");
                var title =  $$(this).data('title');
                if(content && title){
                    mainView.router.loadPage({
                        url:'tpl/faqDetail.html',
                        context:{content:content,title:title,isAndroid:myApp.device.android}
                    });
                }
            });

        }
    };

    var lostCheckIn = {
        init:function(){
          //  myApp.showIndicator();
            this.bindEvent();
        },
        bindEvent:function(){
            var that  = this;
            $$('#checkIn_box').on('click','a.button',function(e){
                var $p  = $$('#checkIn_box'),
                    username  = $p.find("input[name='username']").val().trim(),
                    cardNo = $p.find("input[name='cardNo']").val().trim(),
                    phoneNo = $p.find("input[name='phoneNo']").val().trim();
                if(cardNo==''){
                    myApp.alert("请填写学号/卡号","");
                    return;
                }
                var param = {cardNo:cardNo};
                if(phoneNo){
                    /^1\d{10}$/.test(phoneNo)?param['phoneNo']=phoneNo:'';                    
                }
                if(username){
                    username.length<20?param['username'] =username:'';
                }
                that.submitLostCard(param);
            });
        },
        submitLostCard:function(param){
            myApp.showIndicator();
            xykApi.checkIn(param,function(result){
                myApp.hideIndicator();
                myApp.alert(result.message_,"",function(){
                    if(result.code_ =='0'){
                        mainView.router.back();
                    }
                });
            });
        },
        render:function(result){
            //该接口返回的数据结构比较变态
            if(result.data){
                myApp.template7Data.wxBaseInfo = result.data;
                $$('#checkIn_box').find('input[name="phoneNo"]').val(result.data.userAccount);
            }
            myApp.hideIndicator();
        }
    };

    var lostCard = {
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            var that = this;
            $$("#lostCard_box").on('click', '.submit_lost', function (e) {
                var $el = $$("#lostCard_box"),
                    password = $el.find('input[name="password"]').val().trim(),
                    outid = $el.find('input[name="outid"]').val().trim(),
                    type = $el.find('input[name="type"]').val().trim();

                var flag = /^\d{6}$/.test(password);
                if(!flag){
                    myApp.alert('请填写6位查询密码','',function(){
                        $el.find('input[name="password"]').focus();
                    });
                    return;
                }
                that.submitLostCard({password:password,outid:outid,type:type});

            });
        },
        submitLostCard:function(param){
            myApp.confirm('挂失后将无法进行消费，确定要挂失此校园卡?', '',
                function () {
                    myApp.showIndicator();
                    _xykApi.lostCard(param,function(result){
                        myApp.hideIndicator();
                        myApp.alert(result.message,"",function(){
                            if(result.resultCode =='0'){
                                mainView.router.back();
                            }
                        });
                    });
                }
            );
        }

    };
    //修改密码功能
    var modifyPassword ={
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            var that = this;
            $$("#modPwd_box").on('click','a.button',function(e){
                var $p  = $$("#modPwd_box"),
                    oldPwd  = $p.find("input[name='oldPwd']").val().trim(),
                    newPwd = $p.find("input[name='newPwd']").val().trim(),
                    confirm = $p.find("input[name='confirmPwd']").val().trim();
                var reg = /^\d{6}$/;

                var flag = reg.test(oldPwd);
                if(!reg.test(oldPwd) || !reg.test(newPwd) || !reg.test(confirm)){
                    myApp.alert("请填写正确的密码","");
                    return;
                }
                if(oldPwd == newPwd){
                    myApp.alert("新旧密码不能相同","");
                    return;
                }
                if(newPwd != confirm){
                    myApp.alert("新密码与确认密码不符","");
                    return;
                }

                that.submitModPwd({oldPwd:oldPwd,newPwd:newPwd});
            });
        },
        submitModPwd:function(param){
            myApp.showIndicator();
            _xykApi.modifyPassword(param,function(result){
                myApp.hideIndicator();
                myApp.alert(result.message,"",function(){
                    if(result.resultCode =='0'){
                        mainView.router.back();
                    }
                });

            });
        }
    };

    var queryUnclaim ={
        init:function(){
            myApp.showIndicator();

            var that = this,
                unclaim;
            isIos7 || (unclaim= localStorage.getItem('wx_unclaim'));
            if(!!unclaim){
                this.render(JSON.parse(unclaim));
            }else{
                this.getQueryList(function(data){
                    that.render(that.sortData(data));
                });
            }
            this.bindEvent();
        },
        getQueryList:function(callback){
            //圈存查询 获取最近一年里的前100条数据
            myApp.showIndicator();
            var params ={
                beginIndex:0,
                count:100,
                beginDate:moment().subtract(1,"Y").format("YYYY-MM-DD"),
                endDate:moment().format('YYYY-MM-DD')
            };
            //查询圈存
            _xykApi.claim(params,function(result){
                callback(result.data);
            });
        },
        bindEvent:function(){
             var that = this,
                 ptrContent =$$("#query_box");

                 ptrContent.on('refresh',function(e){
                    setTimeout(function(){
                        that.getQueryList(function(data){

                            that.render(that.sortData(data));
                            ptrContent.scrollTop(0);
                            myApp.pullToRefreshDone();
                        })
                    },1000)
                });
        },
        sortData:function(data){
            var obj  = orderByMonth(data,'opdt');
            isIos7 || localStorage.setItem('wx_unclaim',JSON.stringify(obj));
            return obj;
        },
        render:function(data){
           var output = tplManager.renderTplById('queryListTemplate',data.items);
            $$("#query_box").find('.list-block').html(output);

            myApp.getScroller().refresh();
            myApp.hideIndicator();
        }

    };

    var recharge ={
        amount:'0.01',
        init:function(){
            var info = myApp.template7Data.xykBaseInfo;
            this.param  = this.param || {outid:info.outid,dpcode:info.dpcode,customerid:info.customerid};
            this.bindEvent();
        },
        bindEvent:function(){
            var container = $$("#recharge_box"),
                that = this;

          var $a = $$(container).find('.ul-je a'),
                clzz = 'amount-cur';
            $a.on('click',function(e){
                $a.each(function(i,item){
                    $$(item).removeClass(clzz);
                });
                $$(this).addClass(clzz);
                that.amount = $$(this).data("amount");
            });

            var $btn = $$(container).find('a.button');
            $btn.on('click',function(e){

                  that.getSignBank(function(result){
                      result['_amount'] = that.amount;
                       mainView.router.loadPage({
                          url:'tpl/payWays.html?amount='+that.amount,
                          context:result
                       });
                  });  
                /*that.submit(function(data){
                    myApp.hideIndicator();
                    if(data.result_ == true){
                        PrePayOrder(data.message_,data.redirect_uri);
                    }else{
                        myApp.alert(data.message_);
                    }
                });*/
            });

        },
        getSignBank:function(callback){
          var that  = this;
           var p={};
           for(var i in that.param) p[i] =that.param[i];

           xykApi.signBank(p,function(result){       
                
                callback && callback(result);
             })
        },
        submit:function(callback){
            myApp.showIndicator();
            var p ={};
            for(var i in myApp.clientInfo)p[i]= myApp.clientInfo[i];
            p['opfare']  = this.amount;
            xykApi.pay(p,callback);
        }
    };


      /**
      付款方式
     **/
    var payWays ={
        init:function(){
           var info = myApp.template7Data.xykBaseInfo;
           this.param  = this.param || {outid:info.outid,dpcode:info.dpcode,customerid:info.customerid};
           this.param['money'] =  mainView.activePage.query.amount;


           this.bindEvent();
        },
        bindEvent:function(){
            this.qcBankEvent();
        },
        qcBankEvent:function(){
            var that = this,
                container = $$("#payWays_box");

            var qcB =container.find("#qcBanks a");
                qcB.on('click',function(e){
                      var id = $$(this).data("bankid");
                      if(!!id){
                          that.param['bankId'] = id;
                          modalPwd(that.param.money,qcSubmit);
                      }
                      
                    });


            function qcSubmit(pwd){
                var  p = {};
                  for(var i in  that.param)p[i]= that.param[i];

                     p['password']  = pwd;

                  xykApi.qc(p,function(result){
                      if(result._code &&  result._code =="100") {
                          myApp.alert("充值成功,请持校园卡到领款机或圈存设备完成领款~",function(){
                              mainView.router.back({pageName:'home'});
                          });
                      }else{
                          myApp.alert(result._message,function(){});
                      }
                  }); 
            }


            function modalPwd(money,callback){
                myApp.modal({
                   title:'请输入校园卡支付密码',
                   text: '<div class="moneyMad">'+currency(money) +'元'+'</div>',
                   afterText:'<div class="input-field"><input type="password" name="tradePwd" class="modal-text-input"></div>',
                   buttons:[{
                       text:'取消',
                       onClick:function(dom,e){

                       }
                   },{
                        text: '确定',
                        onClick: function(dom,e) {
                            var v= $$(dom).find("input").val();
                            if(!!v){
                                callback(v);
                            }
                              
                        }
                   }]

                });
            }  

        }
    };




    function pageBeforeInit(page){
        var name = page.name,
            query = page.query,
            from = page.from;
        switch (name) {
            case 'home':
                if(from === 'left') return;
                home.init();
                break;
            case 'lostCard':
                lostCard.init();
                break;
            //捡卡登记
            case 'lostCheckIn':
                lostCheckIn.init();
                break;
            //修改密码
            case 'modifyPassword':
                modifyPassword.init();
                break;
            //圈存查询
            case 'query':
                queryUnclaim.init();
                break;
            //交易明细
            case 'tradeDetail':
                trade.init();
                break;
            //充值
            case 'recharge':
                recharge.init();
                break;
            case 'faq':
                faq.init();
                break;
            case 'payWays':
                payWays.init();
                break;
        }
    }

    function pageAfterAnimation(page){
    }

    home.init();

    window.home = home;





})(Framework7,Dom7,Template7,_xykApi,window._myApp);
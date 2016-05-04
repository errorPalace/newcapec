/**
 * Created by znsw007 on 2015/10/15.
 */
(function($$,xykApi,myApp){
    var recharge ={
        amount:'100',
        init:function(){
            var info = myApp.template7Data.xykBaseInfo;
            this.param  = this.param || {outid:info.outid,dpcode:info.dpcode,customerid:info.customerid};
            this.bindEvent();
        },
        bindEvent:function(){
            var container = $$("#recharge_box"),
                that = this;

            var $a = $$(container).find('a.amount-list'),
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

            });

        },
        getSignBank:function(callback){
            var that  = this;
            var p={};
            for(var i in that.param) p[i] =that.param[i];

            _xykApi.signBank(p,function(result){

                callback && callback(result);
            })
        }
    };
})(Dom7,window._xykApi,window._myApp);




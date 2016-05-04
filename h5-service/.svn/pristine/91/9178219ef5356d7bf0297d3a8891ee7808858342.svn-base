/**
 *
 * 模版管理工具
 * Created by znsw007 on 2015/10/14.
 */


(function(T7,$$){

    var tplManager = {
        init:function(){
            this.getGlobalTpl();
        },
        getGlobalTpl:function(){
            $$.get('tpl/global.tpl.html',function(html){
                $$('body').append(html);
            });
        },
        loadTpl:function(id){
            var tpl = $$("#"+id).html();
            return tpl;
        },
        renderRemoteTpl:function(tplName,renderData,callback){
            var that = this;
            tplName = tplName ||'';
            $$.get('tpl/'+tplName+".html",function(markup){
                var output = that.renderTpl(markup,renderData);
                typeof(callback === 'function') ? callback(output) : null;
            });
        },
        renderTpl: function(markup,renderData){
            var compiledTemplate = T7.compile(markup);
            var output = compiledTemplate(renderData);
            return output;
        },
        renderTplById: function(tplId,renderData){
            var markup = this.loadTpl(tplId);
            return this.renderTpl(markup,renderData);
        }
    };
    tplManager.init();
    window.tplManager = tplManager;


})(Template7,Dom7);
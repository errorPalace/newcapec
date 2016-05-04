		<#assign ctx = request.contextPath />
		<#assign wctx = ctx + application["webSourcePathKey"] />
		<#assign urlExt = application["webUrlExtension"] />
				<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery-1.7.2.min.js"></script>
		<script type="text/javascript">
			$(function(){
				$("img").css("width",function(){return $(this).attr("width");}).removeAttr("width").attr("height","auto")
				.parents("p").css("text-indent",0);
			});
		</script>
		<style type="text/css">
			img{
				max-width: 100%;
			}
		</style>
		
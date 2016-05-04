<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cn" lang="zh-cn">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
<title>玩校快速接入服务管理平台</title>
<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery-1.7.2.min.js"></script>
<link href="${wctx}/pub/style/themes/transport/css/main_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//<!--
	$(document).ready(function() {

		$("#showAdjustMenuItemWindow").click(function(){
			openMenu("/security/menuManager.${urlExt}");
		});
		$("#signout-link").click(function() {
			window.location.href = "${ctx}/j_spring_security_logout";
		});
		$("#editPassword").click(function(){
			openMenu("/security/user/enterEditPassword.${urlExt}");
		});
		$("#firstpane .menu-body:eq(0)").show();
		$("#firstpane p.menu-head").click(function() {
			$(this).addClass("current").next("div.menu-body").slideToggle(300).siblings("div.menu-body").slideUp("slow");
			$(this).siblings().removeClass("current");
		});
	});

	function openMenu(url) {
		document.getElementById('frame_content').contentWindow.document.location.replace('${ctx}' + url);
	}
	function reinitIframe() {

		var iframe = document.getElementById("frame_content");
		try {
			var bHeight = iframe.contentWindow.document.body.scrollHeight;
			var dHeight = iframe.contentWindow.document.documentElement.scrollHeight - 200;
			var height = Math.max(bHeight, dHeight);
			iframe.height = height;
		} catch (ex) {
		}
	}
	window.setInterval("reinitIframe()", 200);
	//-->
</script>
</head>
<body>
	<div id="header">
		<div class="logo"></div>
		<div class="header-menu">
			<ul>
				<li style="margin-top: 30px;"><span>欢迎您，${currUserName}</span>
				</li>
				<li><a href="desktop.action" target="frame_content"><img src="${wctx}/pub/style/themes/transport/css/main_img/home.png" border="0" /><span>返回首页</span>
				</a>
				</li>
				<#if isAdmin>
					<li><a id="showAdjustMenuItemWindow" href="javascript:;"><img src="${wctx}/pub/style/themes/transport/css/main_img/syzn_t.png" border="0" /><span>菜单调整</span></a></li>
				</#if>
													
				<li><a href="javascript:;" id="editPassword"><img src="${wctx}/pub/style/themes/transport/css/main_img/pws.png" border="0" /><span>修改密码</span></a></li>
				<li><a href="javascript:;" id="signout-link"><img src="${wctx}/pub/style/themes/transport/css/main_img/aqtc_t.png" border="0" /><span>安全退出</span></a></li>
			</ul>
		</div>
	</div>
	<div id="main-content">
		<div id="left-side">
			<div id="navbar">
				<div id="firstpane" class="menu-list">

					<#if childrenMenuItems.get('ROOT')??><#assign index=0> <#list childrenMenuItems.get('ROOT') as menuItem> <#if menuItem.isDirectory()> <#assign
					index=index+1> <#if (index==1)>
					<p class="menu-head current">
						<a href="javascript:;"><img src="${wctx}/pub/style/themes/transport/css/main_img/menu_person.png" border="0" />${menuItem.title}</a>
					</p>
					<#else>
					<p class="menu-head">
						<a href="javascript:;"><img src="${wctx}/pub/style/themes/transport/css/main_img/menu_total.png" border="0" />${menuItem.title}</a>
					</p>
					</#if> <#assign childItems = childrenMenuItems.get(menuItem.id)> <#if childItems??>
					<div class="menu-body">
						<#list childItems as childItem> <#if childItem.isDirectory()> <a href="javascript:openMenu('${childItem.url}');"
							title="${childItem.title}">${childItem.title}</a> <#else> <a href="javascript:openMenu('${childItem.url}');"
							title="${childItem.title}">${childItem.title}</a> </#if> </#list>
					</div>
					</#if> <#else>
					<p class="menu-head">
						<a href="javascript:openMenu('${menuItem.url}');"><img src="${wctx}/pub/style/themes/transport/css/main_img/menu_total.png" border="0" />${menuItem.title}</a>
					</p>
					</#if></#list></#if>


				</div>
			</div>
		</div>
		<div id="main">
			<div class="iframe-div">
				<iframe width="100%" style="height:550px;" height="550px" frameborder="0" src="desktop.action" scrolling="auto" id="frame_content" name="frame_content"></iframe>
			</div>
		</div>
	</div>
	<div id="footer">
		<span>版权所有：郑州新开普电子股份有限公司</span>
	</div>
</body>
</html>
<!DOCTYPE html>
<#assign ctx = request.contextPath />
<#assign wctx = ctx + application["webSourcePathKey"] />
<#assign urlExt = application["webUrlExtension"] />
<html>
<head>
<meta charset="UTF-8">
<title></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
.new-node {
	text-align: center;
	width: 100%;
	overflow: hidden;
	padding-top: 50px;
}

.new-node img {
	text-align: center;
	max-width: 100%;
}
</style>

</head>
<body>
	<div class="new-node">
		<img src="${wctx}/pub/style/themes/campus/img/ff.png" />
	</div>
</body>
</html>
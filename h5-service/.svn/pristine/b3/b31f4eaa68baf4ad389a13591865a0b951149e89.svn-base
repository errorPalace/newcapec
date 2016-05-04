<!DOCTYPE HTML>
<html>
	<head>
		<#assign ctx = request.contextPath />
		<#assign wctx = ctx + application["webSourcePathKey"] />
		<#assign urlExt = application["webUrlExtension"] />
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<script type="text/javascript" src="${wctx}/pub/script/jquery/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${wctx}/pub/campus/iscroll/iscroll-probe.js"></script>
		<title>${typeMap.get(type)}</title>
		<style type="text/css">
			/* img{
				max-width: 10px;
				max-height: 10px;
				color:#CACACA;
			} */
			a:link {color:#000000;} 	/* unvisited link */
			a:visited {color:#CACACA;} 	/* visited link */
			
			html, body, header, div, ul, li {
			  margin: 0;
			  padding: 0;
			  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
			  background-color:#F4F4F4;
			}
			
			.view {
			  display: none;
			  position: absolute;
			  top: 0;
			  left: 0;
			  width: 100%;
			  height: 100%;
			  overflow: hidden;
			  background-color: #fff;
			  
			}
			.current {
			  display: block;
			}
			.current.out {
			  -webkit-transition: -webkit-transform 350ms;
			  -webkit-transform: translate3d(-100%,0,0);
			}
			.next {
			  display: block;
			  -webkit-transform: translate3d(100%,0,0);
			}
			.next.in{
			  -webkit-transition: -webkit-transform 350ms;
			  -webkit-transform: translate3d(0,0,0);
			}
			
			.wrapper {
			  position: absolute;
			  top: 45px;
			  left: 0;
			  bottom: 0;
			  z-index: 1;
			  width: 100%;
			  overflow: hidden;
			}
			#view1 .wrapper {
			  top: -50px;
			}
			#view1 .wrapper.pulldownrefresh {
			  top: 0px;
			}
			
			header {
			 	position:absolute; z-index:2;
				top:0; left:0;
				width:100%;
				height:45px;
				line-height:45px;
				background-color:#1E8C1C;
				background-image:-webkit-gradient(linear, 0 0, 0 100%, color-stop(0, #159615), color-stop(0.05, #1E8C1C), color-stop(1, #188517));
				background-image:-moz-linear-gradient(top, #159615, #1E8C1C 5%, #188517);
				background-image:-o-linear-gradient(top, #159615, #1E8C1C 5%, #188517);
				padding:0;
				color:#eee;
				font-size:20px;
				text-align:center;
			}
			header span {
			  position: absolute;
			  top: 0;
			  left: 10px;
			  height: 44px;
			  font-weight: normal;
			  font-size: 17px;
			  color: #2087fc;
			}
			ul {
			  list-style: none;
			}
			li {
			  margin-left: 15px;
			  padding: 5px 10px 10px 8px;
			  min-height: 43px;
			  border: 1px;
			  font-size: 14px;
			  margin: 10px 8px;
  			  background-color: #FFFFFF;
  			  border-radius: 3px;
			}
			li:last-child {
			  border-bottom-width: 0;
			}
			.a_gg{
				display: inline-block;
				  float: right;
				  margin-top: -5px;
			}
			/* p {
			  margin: 15px;
			} */
			
			.pulldown, .pullup {
			  padding: 5px 10px;
			  height: 40px;
			  line-height: 40px;
			  font-weight: bold;
			  font-size: 14px;
			  color: #888;
			}
			.loadingCenter{
			  width: 150px;
			  margin: auto;
			  margin-top: 150px;
			}
			.pulldown .icon, .pullup .icon {
			  display: block;
			  float: left;
			  width: 40px;
			  min-height: 40px;
			  background:  url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACgCAMAAACsXRuGAAAAt1BMVEX////FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcU7SVrkAAAAPHRSTlMAAPONxyCMRvCjM2n59gzeD/xssVo52Akwh6sDpeTbckJLZroqfhUnRernVxifG9XDgb2ZzzxjeLThEmBcLCjmAAACDklEQVR4Xu2Y124yQQyFM9sh9BJafgik956/7fs/V4RCwiITbMdjCSGfKy4On7THnuLZ8yGTyRWUr1W54NgNIC4Dbm+VrQ+tbQxoQAMa0IAGnO4vtR44WBquCcBuJadrSslwQucNaBm2qbyHEQ3YqNN4l3fUKpdpMV7Q26ZF4T3S+5AU49OIA8RjvLpxDCAeY/PIcYB4jKf8tTzcxDt2fGBt/D3v19kPgK5fRQLkAt0MCZANdIdIgGxg7WBjgHygO1kTY/NVMla8QeBvJwHCGP84CRDG+PefBAhjrHTlo9n/InDiY9a7XfLazgewd//Jqze8AN15sAiw7Gu87XwAW/7m5ec5b+j8AXsveT6uSYAwxmrf7xNBZ+aYQJPJZDLh+20aRlkWhen8twdgnCyO0SCJfQDjUv6lUuwBmOQFJXJgGhSBQSoGhvmKQnFNo1VgBD3MmmarwAx6WDWFQOhh1RR+MvSwagqLwqw7/ndW3UkfCD2bhJcAephAvJGYn4y3OrMouIfZNriH19i4h7v0cI9ww4ce4ZEEPTt6/uJ+UdS4H28G1C9qV9yPLyjUL1vyuB/dlLh+dNtE/dpA+SdrF0XeNsqNLV96+puDfPvaaukfUvJjVP+gl19F9C9L8uuc/oVTfiXWv7TLxwr9wUc+msmHR/3xVj6A6z8RSBej/jMLp+76T1X6j2m7eP6aTO9STHV4CXebKAAAAABJRU5ErkJggg==") 0 0 no-repeat;
			  -webkit-background-size: 40px 80px;
			  background-size: 40px 80px;
			  -webkit-transition: -webkit-transform 250ms;
			}
			.pulldown .icon {
			  -webkit-transform: rotate(0deg) translateZ(0);
			}
			.pullup .icon {
			  -webkit-transform: rotate(-180deg) translateZ(0);
			}
			.pulldown.flip .icon {
			  -webkit-transform: rotate(-180deg) translateZ(0);
			}
			.pullup.flip .icon {
			  -webkit-transform: rotate(0deg) translateZ(0);
			}
			.pulldown.loading .icon, .pullup.loading .icon {
			  background-position: 0 100%;
			  -webkit-transform: rotate(0deg) translateZ(0);
			  -webkit-transition-duration: 0ms;
			  -webkit-animation-name: loading;
			  -webkit-animation-duration: 2s;
			  -webkit-animation-iteration-count: infinite;
			  -webkit-animation-timing-function: linear;
			}
			@-webkit-keyframes loading {
			  from { -webkit-transform: rotate(0deg) translateZ(0); }
			  to { -webkit-transform: rotate(360deg) translateZ(0); }
			}
			
			li a{
				text-decoration: none;
				color: black;
			}
			.list_div{
				background-color:#ffffff;
				
			}
			div label{
				background-color:#ffffff;
			}
			.list_label{
				background-color:#ffffff;
			}
			p{
				  margin: 8px 3px;
			}
			.notice_flag{
				background-color:#EB413D;
				width:55px;
				color:#ffffff;
				line-height:25px;
				height:25px;
				text-align:center;
				font-size:14px;
				float:right;
				margin-bottom:19px;
			}
			.list_img{
/* 			url(${wctx}/pub/style/themes/campus/img/u33.jpg) no-repeat 50% 50%;*/
/* 				background:  */
    			height: 150px;
			}
			.error_div{
            background: url(${wctx}/pub/style/themes/transport/img/error.png) 50% 50% no-repeat;
            height: 257px;
            background-size: 258px 257px;
            margin-top: 50px;
            }
			.error_p{
				font-size:20px;
				text-align:center;
			}
			
			
		</style>
		<script type="text/javascript" charset="utf-8">
			var myScroll=null;
			var currPage=1;
			var loadOver=false;
			var count=0;
			$(function() {
				  myScroll = new IScroll('#view1 .wrapper', {
				    scrollX: false,
				    scrollY: true,
				    mouseWheel: true,
				    click: true,
				    probeType:1
				  });
				  myScroll.on('scrollStart',function(){
				  	//console.log('scrollStart');
				  });
				   myScroll.on('scroll',function(){
				  	// console.log('scroll',this.y,this.maxScrollY);
				  	 var $wrapper = $(this.wrapper);
					    var $pullDown = $wrapper.find('.pulldown');
					    var $pullUp = $wrapper.find('.pullup');
					    if (this.y > 60) {
					      $pullDown.addClass('flip').find('.label').html('释放刷新...');
					    } else {
					      $pullDown.removeClass('flip').find('.label').html('下拉刷新...');
					    }
					    if (this.maxScrollY - this.y > 60) {
					      $pullUp.addClass('flip').find('.label').html('释放刷新...');
					    } else {
					      $pullUp.removeClass('flip').find('.label').html('上拉刷新...');
					    }
				  });
				  myScroll.on('scrollEnd',function(){
				  	 //console.log('scrollEnd');
				  	 var $wrapper = $(this.wrapper);
					    var $pullDown = $wrapper.find('.pulldown');
					    var $pullUp = $wrapper.find('.pullup');
					    if ($pullDown.hasClass('flip')) {
					      $wrapper.addClass('pulldownrefresh');
					      //this.refresh();
					      $pullDown.removeClass('flip').addClass('loading').find('.label').html('正在载入...');
					      pullDownAction($wrapper);
					    }
					    if ($pullUp.hasClass('flip')) {
					      $pullUp.removeClass('flip').addClass('loading').find('.label').html('正在载入...');
					      pullUpAction($wrapper);
					    }
				  });
			});
			
			function pullDownAction($wrapper) {
				count=0;
				$(".pullup").show();
			    var $pullDown = $wrapper.find('.pulldown');
			  /*   setTimeout(function() {
			      $wrapper.removeClass('pulldownrefresh');
			      $pullDown.removeClass('flip loading').find('.label').html('Pull down to refresh...');
			      myScroll.refresh();
			    }, 3000); */
			    $.ajax({
			    	url:"${ctx}/campus/schoolinfo/load.${urlExt}",
			    	data:{
			    		customerId:${customerId?c},
			    		type:${type},
			    		pageSize:10,
			    		currPage:1
			    	},
			    	dataType:"json",
			    	type:"post",
			    	async:true,
			    	cache:false,
			    	success:function(data){
			    		var array=new Array();
			    		$.each(data.results,function(i,d){
			    			newstohtml(array,d);
			    		});
			    		
		    			count=count+data.results.length;
						if(data.totalCount<=10){
			    			$(".pullup").hide();
			    		}
			    		$("#dataul").empty().append(array.join(""));
			    		$wrapper.removeClass('pulldownrefresh');
					    $pullDown.removeClass('flip loading').find('.label').html('下拉刷新...');
					    myScroll.refresh();
					    currPage=3;
					    $(document).ready(function(){
							  var deviceW=document.body.clientWidth;
							  var realW=deviceW*0.8+"px";
							  $(".list_img ").css("background-size",realW);
							  //alert(111);
							});
			    	}
			    });
			  }
			  
			  function pullUpAction($wrapper) {
			    var $pullUp = $wrapper.find('.pullup');
			    $.ajax({
			    	url:"${ctx}/campus/schoolinfo/load.${urlExt}",
			    	data:{
			    		customerId:${customerId?c},
			    		type:${type},
			    		pageSize:10,
			    		currPage:currPage
			    	},
			    	dataType:"json",
			    	type:"post",
			    	async:true,
			    	cache:false,
			    	success:function(data){
			    		count=count+data.results.length;
			    		var array=new Array();
			    		$.each(data.results,function(i,d){
			    			newstohtml(array,d);
			    		});
			    		
			    		$("#dataul").append(array.join(""));
			    		$pullUp.removeClass('flip loading').find('.label').html('上拉刷新...');
					    myScroll.refresh();
					   // console.log("count",count);
					    if(count==data.totalCount){
					    	$(".pullup").hide();
					    	//console.log("load end");
					    }
					    currPage++;
					    $(document).ready(function(){
							  var deviceW=document.body.clientWidth;
							  var realW=deviceW*0.8+"px";
							  $(".list_img ").css("background-size",realW);
							  //alert(111);
							});
			    	}
			    });
			  }
			  $(function(){
				  var $pullUp = $('.pullup');
				  $pullUp.removeClass('flip').addClass('loading').find('.label').html('正在载入...');
				  $.ajax({
				    	url:"${ctx}/campus/schoolinfo/load.${urlExt}",
				    	data:{
				    		customerId:${customerId?c},
				    		type:${type},
				    		pageSize:10,
				    		currPage:1
				    	},
				    	dataType:"json",
				    	type:"post",
				    	async:true,
				    	cache:false,
				    	success:function(data){
				    		var array=new Array();
				    		$.each(data.results,function(i,d){
				    			newstohtml(array,d);
				    		});
				    		if(data.results.length==0){
				    			noList(array);
				    			$("#noResult").empty().append(array.join(""));
				    		}else{
				    			$("#noResult").hide();
				    			$("#dataul").show();
				    			$("#dataul").empty().append(array.join(""));
				    		}
						    myScroll.refresh();
						    count=count+data.results.length;
							if(data.totalCount<=10){
				    			$(".pullup").hide();
				    		}
							currPage+=2;
							$pullUp.removeClass('flip loading').find('.label').html('上拉刷新...');
							$(document).ready(function(){
								  var deviceW=document.body.clientWidth;
								  var realW=deviceW*0.8+"px";
								  $(".list_img ").css("background-size",realW);
								  //alert(111);
								});
				    	}
				    });
			  });
			  function newstohtml(array,d){
				  	array.push("<li><a href='${ctx}/campus/schoolinfo/info.${urlExt}?id=");
	    			array.push(d.id);
	    			array.push("'>");
	    			if(d.noticeFlag){//是公告
		    			array.push("<div class='notice_flag a_gg'>公告</div>");
	    			}
	    			array.push("<div class='list_div' style='font-size:14px;'><p style='color:#7B7B7B'>");
	    			var finallyTitle;
	    			finallyTitle = d.title + "</p>";
	    			array.push(finallyTitle);
// 	    			array.push("<p style='color:#D0D0D0;font-size:10px;'>教务处<span style='margin-left:8px;'>"+d.createTime+"</span></p>");
	    			array.push("<p style='color:#D0D0D0;font-size:10px;'><span style='margin-left:8px;'>"+d.createTime+"</span></p>");
	    			//array.push("<div class='list_label' style='float:right;font-size:10px;color:#CACACA; line-height:14px;'><label style='float:left;padding-right:20px;'><img  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEwODkxQUJERDcxNzExRTNCNEYwQUVGRTQyNUMwRkExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEwODkxQUJFRDcxNzExRTNCNEYwQUVGRTQyNUMwRkExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTA4OTFBQkJENzE3MTFFM0I0RjBBRUZFNDI1QzBGQTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTA4OTFBQkNENzE3MTFFM0I0RjBBRUZFNDI1QzBGQTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz762xZfAAABTElEQVR42pyTsUvDQBjFc6FLVeggroVuogidXAsFQXDoUlD/BDfXgiCIoCCIW1c3EULRQSgITk5OUrC4Ca7ikEEKRYm/B1/qESXEHvx66X3vvQuX71ySJIE/tq9nm0w7sAplWx7BA3QvWh93vt6lARglPoQN2JMB8avVqhao+o3q1EaTAAQVno9sp0kxO7xNNHfQxWnAmcwsdIICA702K6PfLfFnxV57OSg+9uEJ73nJDuyUtPEfO+mAnL+GToypncgb8rMGt8H/h75GUwE1eJkiQJ6aAmKoTBEgT6yAISzlCL/g02b/88oz1CFG0Ib7rJPDcjnB8kRu62pGTfEOi2nnFegDdeYzzIfWdQfQozBXwCxNTx55Q3vVY/ssAwSNHLNqA2nN83OZTLBpjfUGfXi0Uh3WYcFu5OWv25jZqW2Gui0pqI8xymq/BRgAgqWFZZw0Zd4AAAAASUVORK5CYII='></label>");
	    			//var simpleCreateTime = d.createTime.substr(2,8);
	    			//array.push(simpleCreateTime);
	    			//array.push("</div><div style='clear:both;'></div></div>");
	    			
	    			
	    			array.push("<div style='background-color:#ffffff;color:#999999;font-size:12px; line-height:30px;'>");
	    			
	    			if(d.firstImgUrl!=""){
    					array.push("	<div class='list_img' style='background: url("+d.firstImgUrl+")no-repeat 50% 50%;'></div>");
	    			}
	    			
    				array.push("	<p>"+d.summary+"</p> ");
	    			array.push("</div>");
	    			array.push("</a></li>");
			  }
			  
			  function noList(array){
	    			array.push("<div class='error_div' style='text-align:center;'>");
	    			
	    			array.push("</div>");
	    			
	    			array.push("<p class='error_p'>暂时没有您关注的内容！</P>");
			  }
		</script>
	</head>
	<body>
		<div id="view1" class="view current">
	   <!--  <header>${typeMap.get(type)}</header> -->
	    <div class="wrapper">
	      <div>
	        <div class="pulldown">
	          <span class="icon"></span><span class="label">下拉刷新...</span>
	        </div>
	        <div id="noResult">
	        </div>
	        <ul id="dataul">
	        </ul>
	        <div class="pullup loadingCenter">
	          <span class="icon"></span><span class="label">上拉刷新...</span>
	        </div>
	      </div>
	    </div>
	  </div>
	</body>
	<script type="text/javascript" >
	$(document).ready(function(){
		  var deviceW=document.body.clientWidth;
		  var realW=deviceW*0.8+"px";
		  $(".list_img ").css("background-size",realW);
		  //alert(111);
		});
	</script>
</html>
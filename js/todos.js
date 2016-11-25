$(function(){
	var input=$("input") 
	var add=$(".change")
	var ul=$(".content")
	var first;
	var todos=[];
	var a;
	var now=new Date()
	
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos)
		for (var i = 0; i < todos.length; i++) {
			var c=(todos[i].state)?'volo':'';
			var fen=todos[i].fen;
			var hou=todos[i].hou;
			var ff=todos[i].state;		
		$('<li class="eve"><img src="img/del.png" alt="" class="delet" /><div class="yi"><img src="img/dd.png" alt="" class="jia" /><div class="date"><div class="gay"></div><p class='+c+'>&#xe601;</p class="+'+'"><span>今天 '+hou+'：'+fen+'</span></div><div class="con"><div class="gay"></div><span>'+todos[i].name+'</span></div></div></li>').appendTo(ul)
		}
	}

	//	删除
$(".content").on("click",".delet",function(){
	var ee=$(this).closest("li").index()
	todos.splice(ee,1);
	localStorage.todos=JSON.stringify(todos)
	$(".content .eve").eq(ee).remove()
})
	
	var id=0
	$(".change").on("touchstart",function(){
		var val=$.trim(input.val())
		if(!val){
			return
		}
		var hou=now.getHours()
		var fen=now.getMinutes()
		if(fen<10){
			fen="0"+fen
		}
		var todoa={
			name:val,
			state:0,
			hou:hou,
			fen:fen,
			id:id
		}	
//		.................
$('<li class="eve"><img src="img/del.png" alt="" class="delet" /><div class="yi"><img src="img/dd.png" alt="" class="jia" /><div class="date"><div class="gay"></div><p class='+c+'>&#xe601;</p><span>今天 '+hou+':'+fen+'</span></div><div class="con"><div class="gay"></div><span>'+val+'</span></div></div></li>').appendTo(ul)
		todos.push(todoa)
		localStorage.todos=JSON.stringify(todos)
	input.val('').focus();
	id+=1
	})

//	未完成/完成切换
	$(".content").on("touchstart",".eve",function(e){
		first=e.originalEvent.changedTouches[0].clientX;
	})
	$(".content").on("touchend",".eve",function(e){
		var last=e.originalEvent.changedTouches[0].clientX;
		if(last-first >30){
			$(this).find(".yi").css("left","2rem")
			$(this).find(".jia").css({"left":"-2.65rem","boxShadow":"1px 3px 5px #ccc"})
		}
		if(last-first<-30){
			$(this).find(".yi").css("left","0rem")
			$(this).find(".jia").css({"left":"-0.4rem","boxShadow":"0px 0px 0px #ccc"})
				
		}
		
	})
	
console.log($(".content .eve"))
$(".content").on("touchstart","p",function(){
	$(this).toggleClass("volo")
	var ff=$(this).closest("li").index()	
		if(todos[ff].state===0){	
			$(this).addClass("volo")
			 todos[ff].state=1;			
		}else if(todos[ff].state===1){
			$(this).removeClass("volo")	
			 todos[ff].state=0;				 
		}
		localStorage.todos=JSON.stringify(todos)

	})
//全部删除
$(".bnt .bnt-lis").eq(1).on("click",function(){
	var todos=[];
	$(".content").find(".eve").css("display","none")
	localStorage.todos=JSON.stringify(todos)
})
//删除已完成
$(".bnt .bnt-lis").eq(2).on("click",function(){
	var newarr=[]
	var idarr=[]
	for(var i=0;i<todos.length;i++){
		if(todos[i].state===0){
			idarr.push(todos[i].id)
			newarr.push(todos[i])
		}
	}
	
	todos=newarr;
	
	localStorage.todos=JSON.stringify(todos)
})
})
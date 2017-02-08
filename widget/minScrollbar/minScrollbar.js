/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-10-10
 *描    述: minScrollbar
 *关联文件: jQuery.js|jquery-ui.js
 * @modify 2012-11-15 添加功能移动时鼠标移开仍然可以移动滚动条 
 */
(function($,undefined){
    /**
	* @class 自定义滚动条插件
    * @name minScrollbar
    * @description 自定义滚动条插件
	* @version 1.3
    */
	$.widget("ui.minScrollbar",
	/** @lends minScrollbar.prototype */
	{
		 options:{
			 hScroll: true,     //x横向horizontal滚动默认为true  ， false 禁用横向滚动
			 vScroll: true,     //y垂直vertical滚动默认为true ， false 禁用垂直滚动
			 height:'10px',   //当hScroll为true时，滚动条的高度 5-20
 			 width:'10px',   //当vScroll为true时，滚动条的宽度 5-20
			 bgColor:'#000' ,  //滚动条的背景色
			 viewHeight:'200px',  //可视区域的高度值，默认为200px
			 viewWidth:'200px'  //可视区域的宽度值，默认为200px
		 },
		 _create:function(){
			 var o = this.options;
			 if(!o.hScroll && !o.vScroll){
				return false;
			 }
			 var $target = this.element,
				$view = $("<div class='ui-minScrollbar-viewable'/>"),
				$vScrollbar = $("<div class='ui-minScrollbar-vertical'><div class='ui-vScroll'></div></div>"),
				$hScrollbar = $("<div class='ui-minScrollbar-horizontal'><div class='ui-hScroll'></div></div>"),
			    hasTouch = ('ontouchstart' in window),
				maxScrollX,maxScrollY;//计算最大滚动条区域
			$target.attr('data-destroy','true');
			$target.wrap($view).addClass('ui-minScrollbar');
			$view.css({'height':o.viewHeight,'width':o.viewWidth});	
			if(o.hScroll){
				$target.parent().append($hScrollbar);
				var $hScroll = $hScrollbar.find('div.ui-hScroll'),
					vW = parseFloat(o.viewWidth),//可是区域的高度
					tW = $target.width(), //内容高度
					scorllW = Math.round(vW*vW/tW);  //*竖直滚动条的长度*/	
				if(hasTouch){
					maxScrollX = tW-vH;
					nX = (vW-scorllW-2)/maxScrollX;
				}else{
					maxScrollX = vW-scorllW-2;
					nX = (tW-vW)/maxScrollX;
				}	
				$hScroll.attr({'maxScrollX':maxScrollX,'nX':nX}).css('cursor','pointer');
			}
			if(o.vScroll){
				$target.parent().append($vScrollbar);
				var $vScroll = $vScrollbar.find('div.ui-vScroll'),
					vH = parseFloat(o.viewHeight),//可是区域的高度
					tH = $target.height(), //内容高度
					scorllH = Math.round(vH*vH/tH); //*垂直滚动条的长度*/
				if(hasTouch){
					maxScrollY = tH-vH;
					nY = (vH-scorllH-2)/maxScrollY;
				}else{
					maxScrollY = vH-scorllH-2;
					nY = (tH-vH)/maxScrollY;
				}
				$vScroll.attr({'maxScrollY':maxScrollY,'nY':nY}).css('cursor','pointer');
			}
			this._eventListener($target,$hScroll,$vScroll,o);
			
			//计时器，当$view的高度发生变化时
			var timer = setInterval(function(){timerFn();},300);	
			
			//计时器执行的方法。
			function timerFn(){
				var $hScrollbar = $target.parent().find('div.ui-minScrollbar-horizontal');
				var $vScrollbar = $target.parent().find('div.ui-minScrollbar-vertical');
				if($hScrollbar.length==0 && $vScrollbar.length==0){//滚动条不存在时，清空计时器
					clearTimeout(timer);
				}else{
					if($hScrollbar.length!=0){modifyHScroll();}
					if($vScrollbar.length!=0){modifyVScroll();}	
				} 
			}
			
			//定时器修改水平方向滚动条
			function modifyHScroll(){
				if(o.hScroll){
					//判断可视区域和滚动内容width是否变化
					var newVW =$target.parent().width(),newTW = $target.width();
					if(newVW==vW &&newTW==tW){return;}
					else{vW = newVW;tW =newTW ;}
					//重新计算滚动条width
					scorllW = (vW*vW/tW);
					//修改n值，即滚动条与滚动区域的比例值，滚动条滚动1一个单位值时div需要滚动条多远
					if(hasTouch){
						maxScrollX = tW-vW;
						nX = (vW-scorllW-2)/maxScrollX; 
					}else{
						maxScrollX = vW-scorllW-2;
						nX = (tW-vW)/maxScrollX;
					}
					$hScroll.attr({'maxScrollX':maxScrollX,'nX':nX});
					//当$view的高度大于target的高度时，隐藏滚动条。
					if(scorllW<vW){$hScroll.css('display','block');}
					else{$hScroll.css('display','none');}	
					//target在最右边时，需要向右移动。
					var tLeft = parseFloat($target.css('left'));
					var _tw = tW + tLeft;
					if(_tw<vW &&scorllW<vW){
						var newLeft = tLeft + (vW-_tw);
						$target.css('left',newLeft+'px');
					}
					//scroll在最右边时，需要向左边移动
					var sLeft = parseFloat($hScroll.css('left'));
					var _sw = scorllW + sLeft;
					if(_sw>vW){
						var newScrollLeft = sLeft - (_sw-vW+2);
						$hScroll.css('left',newScrollLeft+'px');
					}
					//修改滚动条的高度值
					$hScroll.width(scorllW).parent().width(vW);
				}
			}
			//定时器修改垂直方向滚动条
			function modifyVScroll(){
				if(o.vScroll){
					//判断可视区域和滚动内容height是否变化
					var newVH =$target.parent().height(),newTH = $target.height();
					if(newVH==vH &&newTH ==tH){return;}
					else{vH = newVH;tH = newTH;}
					scorllH = (vH*vH/tH);
					//修改n值，即滚动条与滚动区域的比例值，滚动条滚动1一个单位值时div需要滚动条多远
					if(hasTouch){
						maxScrollY = tH-vH;
						nY = (vH-scorllH-2)/maxScrollY;
					}else{
						maxScrollY = vH-scorllH-2;
						nY = (tH-vH)/maxScrollY;
					}
					$vScroll.attr({'maxScrollY':maxScrollY,'nY':nY});
					//当$view的高度大于target的高度时，隐藏滚动条。
					if(scorllH<vH){$vScroll.css('display','block');}
					else{$vScroll.css('display','none');}	
					//target在最下面时，需要向下移动。
					var tTop = parseFloat($target.css('top'));
					var _th = tH + tTop;
					if(_th<vH && scorllH<vH){
						var newTop = tTop + (vH-_th);
						$target.css('top',newTop+'px');
					}
					//scroll在最下面时，需要向上移动
					var sTop = parseFloat($vScroll.css('top'));
					var _sh = scorllH + sTop;
					if(_sh>vH){
						var newScrollTop = sTop - (_sh-vH+2);
						$vScroll.css('top',newScrollTop+'px');
					}
					//修改滚动条的高度值
					$vScroll.height(scorllH);
				}
			}
			//当添加了‘data-xy’属性时，执行该方法
			var xy =($target.attr("data-xy")||'').toLocaleUpperCase();	
			if(o.hScroll){if(xy =='Y'){$hScroll.css('display','none');o.hScroll =false;}}
			if(o.vScroll){if(xy=='X'){$vScroll.css('display','none');o.vScroll =false;}}
			 					
		},
		/**
		 * @description this.options中各参数变化时，调用这个方法，修改滚动条的各参数
		 * 内部方法（在_creat和_setOption中都调用了）
		 **/
		_init:function(){
			var o = this.options,$target = this.element,$view = $target.parent(),
				$hScroll = $view.find('div.ui-minScrollbar-horizontal>div.ui-hScroll'),
				$vScroll = $view.find('div.ui-minScrollbar-vertical>div.ui-vScroll'),
				vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
						(/firefox/i).test(navigator.userAgent) ? 'Moz' :
						'opera' in window ? 'O' : '';
			if(!o.hScroll && !o.vScroll){
				return false;
			}
			//修改可是区域的高度和宽度
			$view.css({'height':o.viewHeight,'width':o.viewWidth});	
			//修改水平滚动条的参数（滚动条是否可用及其颜色和长度）
			if(o.hScroll){
				$hScroll.css('display','block');
				var vW = parseFloat($view.width()),//可是区域的高度
					tW = $target.width(); //内容高度
				var scorllW = Math.round(vW*vW/tW);///水平滚动条的长度
				if(scorllW<vW){
					var h = parseFloat(o.height);
					if(h<=5){o.height ='7px';}else if(h>=30){o.height = '30px';}
					var newhScrollH = parseFloat(o.height);
					if(vendor=='Moz'){newhScrollH -= 2;}
					//修改具体参数
					$hScroll.width(scorllW)
						.css({'height':newhScrollH+'px','background-color':o.bgColor})
						.parent().css({'height':o.height});	
				}else if(scorllW>=vW){
					$hScroll.css('display','none');
				}
			}else{
				$hScroll.css('display','none');
			}
			//修改竖直滚动条的参数
			if(o.vScroll){
				$vScroll.css('display','block');
				var vH = parseFloat($view.height()),//可是区域的高度
					tH = $target.height(); //内容高度
				var scorllH = Math.round(vH*vH/tH);///竖直滚动条的长度
				if(scorllH<vH){
					var w = parseFloat(o.width);
					if(w<=5){o.width ='7px';}else if(w>=30){o.width = '30px';}
					var newvScrollW = parseFloat(o.width);
					if(vendor=='Moz'){newvScrollW -= 2;}
					//修改具体参数
					$vScroll.height(scorllH)
						.css({'width':newvScrollW+'px','background-color':o.bgColor})
						.parent().css({'width':o.width});
				}else if(scorllH>=vH){
					$vScroll.css('display','none');	
				}
			}else{
				$vScroll.css('display','none');	
			}
				
		},
		_eventListener:function($target,$hScroll,$vScroll,o){
			// Events   浏览器事件
			var	hasTouch = ('ontouchstart' in window),
				vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
					(/firefox/i).test(navigator.userAgent) ? 'Moz' :
					'opera' in window ? 'O' : '',
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup',
				CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseout',
				WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel';
			//页面选中状态
	 
			
			if(hasTouch){
				//func($target[0],START_EV,_start(e));	
				/*$target.bind(START_EV,function(e){console.log('000---'+e);_start(e);})
						.bind(MOVE_EV,function(e){console.log('_move');_move(e);})
						.bind(END_EV,function(e){_end(e);})
						.bind(CANCEL_EV,function(e){_end(e);});*/
				//用bind绑定时，得不到e.touches（IOS6），故用原生事件绑定
				$target[0].ontouchstart = function(e){_start(e);return false;};	
				$target[0].ontouchmove = function(e){_move(e);return false;};	
				$target[0].ontouchend = function(e){_end(e);return false;};	
				$target[0].ontouchcancel = function(e){_end(e);return false;};		
			}else{
				$target.bind(WHEEL_EV,function(e){_wheel(e);});
				$hScroll.bind(START_EV,function(e){_start(e);})
						.bind(END_EV,function(e){_end(e);});
				$vScroll.bind(START_EV,function(e){_start(e);})
						.bind(END_EV,function(e){_end(e);});
				$(window.document).bind(MOVE_EV,function(e){_move(e); })
						.bind(END_EV,function(e){_end(e);});						
				/**
				 * 兼容：chrome、safari、360安全、360极速、IE9、IE8、IE7
				 * 不兼容：Opera、FireFox
				 */
				$($target.parent()).bind('selectstart',function(){return false;});
			}
			//用于滚动条滚动条	
			var moveFlag = false,startX=0,startY=0,moveTarget ='';
			//开始移动方法
			function _start(e){
				moveFlag = true;
				moveTarget = $(e.target).attr('class');
				var point = hasTouch ? e.touches[0] : e;
				startX = point.clientX;startY = point.clientY;
			}
			//移动时的方法
			function _move(e){
				if(hasTouch){
					e.preventDefault();	//阻止touchmove的默认行为
				}
				if(!moveFlag){//没有移动的时候，ipad上变透明
					return false;	
				}else{
					var point = hasTouch ? e.touches[0] : e,
						endX = point.clientX ,endY= point.clientY,
						newX = endX-startX ,newY = endY -startY;
					startX = endX;startY = endY;
					if(newX==0 && newY==0){//没有移动距离
						return false;
					}
					_pos(newX,newY);
				}
				
			}
			//结束移动时的方法
			function _end(e){
				moveFlag=false;
				moveTarget = '';
			}
			
			//wheel 滚动鼠标滚轮，滚轮只控制竖直方向的滚动条
			function _wheel(e){
				moveTarget = 'ui-vScroll';
				if(o.vScroll){
					if($vScroll.css('display')=='none'){return;}
				}
				var wheelDeltaX, wheelDeltaY;
				if ('wheelDeltaX' in e) {//chrome
					wheelDeltaX = -e.wheelDeltaX / 12;
					wheelDeltaY = -e.wheelDeltaY / 12;
				} else if ('wheelDelta' in e &&vendor!= 'Moz') {//IE
					wheelDeltaX = wheelDeltaY = -e.wheelDelta/ 12;
				} else if('detail' in e &&vendor== 'Moz'){ //ff
					wheelDeltaX = wheelDeltaY = e.detail * 3;
				}
				_pos(wheelDeltaX,wheelDeltaY);
			}
			/** description:重新定位
			 *  param moveX,moveY 移动了的距离
			 *  return 滚动条和内容区域的top值和left值（注意n值）
			 **/
			function _pos(moveX,moveY){
				var tx=0,ty=0;
				if(hasTouch){
					if(o.hScroll){tx = parseFloat($target.css('left'));}
					if(o.vScroll){ty= parseFloat($target.css('top'));}
				}else{
					if(o.hScroll){tx = parseFloat($hScroll.css('left'));}
					if(o.vScroll){ty= parseFloat($vScroll.css('top'));}	
				}
				var x = tx + moveX,y = ty + moveY;
				if(hasTouch){//pad
					if(o.hScroll){
						var maxScrollX = $hScroll.attr('maxScrollX');
						var nX = $hScroll.attr('nX');
						if (x > 0) x = 0;
						else if (x < -maxScrollX) x = -maxScrollX;
						x = o.hScroll ? x : 0;
						$target.css('left',x+'px');
						$hScroll.css('left',-x*nX+'px');
					}
					if(o.vScroll){
						var maxScrollY = $vScroll.attr('maxScrollY');
						var nY = $vScroll.attr('nY');
						if (y > 0) y = 0;
						else if (y < -maxScrollY) y = -maxScrollY;
						y = o.vScroll ? y : 0;
						$target.css('top',y+'px');
						$vScroll.css('top',-y*nY+'px');
					}
				}else{//pc
					if(moveTarget=='ui-hScroll'){
						var maxScrollX = parseFloat($hScroll.attr('maxScrollX'));
						var nX = $hScroll.attr('nX');
						if (x < 0) x = 0;
						else if (x > maxScrollX) x = maxScrollX;
						x = o.hScroll ? x : 0;
						$target.css('left',-x*nX+'px');
						$hScroll.css('left',x+'px');
					}else if (moveTarget=='ui-vScroll'){
						var maxScrollY = parseFloat($vScroll.attr('maxScrollY'));
						var nY = $vScroll.attr('nY');
						if (y < 0){ y = 0;}
						else if (y > maxScrollY){y = maxScrollY;}
						y = o.vScroll ? y : 0;
						$target.css('top',-y*nY+'px');
						$vScroll.css('top',y+'px');
					}
					
				}
			}
			
			
		},
		/**
		 * @description 当this.options改变时，jquery-ui自动调用该方法，然后调用_init()方法
		 * */
		_setOption:function(key, value) {
			this.options[key] = value;  
		},
		/**
		* @description 销毁滚动条
		* @return {minScrollbar} minScrollbar对象
		* @example 想移除事件，在移除dom元素
		* $("#logo").minScrollbar('destroy');
		*/
		destroy:function(){
			if(this.element.attr('data-destroy')=='true'){
				if('ontouchstart' in window){
					//这里touch事件（IOS6下）不能进行bind绑定，所以这里将其事件置空。
					var $target = this.element;
					$target[0].ontouchstart = null;	
					$target[0].ontouchmove = null;	
					$target[0].ontouchend =null;	
					$target[0].ontouchcancel = null;	
				}else{
					//$(window.document).unbind('mouseup').unbind('mousemove');
					this.element.attr('data-destroy','false')
					.removeClass('ui-minScrollbar').unbind()
					.nextAll().unbind()
					.remove('div.ui-minScrollbar-horizontal,div.ui-minScrollbar-vertical')
					.end().parent().unbind()
					.end().unwrap('div.ui-minScrollbar-viewable');	
				}			
					
			}
			//return this.element; return导致不能一次销毁多个滚动条插件
		}
	});

	$.extend($.ui.minScrollbar, {
		version: "1.3",
		author:'黄卉',
		date:'2012-10-10'
	});

})(jQuery);

$(function(){
	$(".ui-minScrollbar").minScrollbar();
	//$(".ui-minScrollbar").minScrollbar('destroy');
});
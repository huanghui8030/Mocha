/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-12-3
 *描    述: formatImage 图片尺寸格式化
 *关联文件: jQuery.js|jquery-ui.js 
 */
(function($,undefined){
    /**
	* @class  图片尺寸格式化
    * @name formatImage
    * @description  图片尺寸格式化插件
	* @version 1.3
    */
	$.widget("ui.formatImage",
	/** @lends formatImage.prototype */
	{
		options:{
			width: '150px' ,    //实际显示的宽度，默认值为150px
			height:'100px',     //实际显示的高度，默认值为100px			
			position :'center'  // 从什么地方开始剪切图片，'top'左上角，'center'中间，'bottom'右下角，默认值为‘center’
		},
		_create:function(){
			var o = this.options,$img = this.element,
				$view=$('<div class="ui-formatImage-view"></div>'),
				dataW = parseFloat($img.attr("data-formatImage-width")||0),//获取样式中的预定义
				dataH = parseFloat($img.attr("data-formatImage-height")||0),
				viewW = (dataW!=0)?dataW:parseFloat(o.width),
				viewH = (dataH!=0)?dataH:parseFloat(o.height); 
			$view.css({'width':viewW,'height':viewH});
			$img.attr({'initWidth':$img.width()||$img[0].naturalWidth,
					'initHeight':$img.height()}||$img[0].naturalHeight)//初始化的高度宽度，用于插件销毁
				.wrap($view);	
					 					
		},
		/**
		 * @description this.options中各参数变化时，调用这个方法，修改滚动条的各参数
		 * 内部方法（在_creat和_setOption中都调用了）
		 **/
		_init:function(){
			var $img = this.element,
				src = $img[0].getAttribute('src'),
				that = this;
			$img[0].setAttribute('src','');
			$img[0].onload = null;
			$img[0].onload = function(){
				that.imgOnload();
			}
			$img[0].setAttribute('src',src);	
		},
		
		/**
		 * @description 当this.options改变时，jquery-ui自动调用该方法，然后调用_init()方法
		 * */
		_setOption:function(key, value) {
			this.options[key] = value;  
		},
		imgOnload:function(){
			var o = this.options,$img = this.element,
				$view = $img.parent('div.ui-formatImage-view'),
				imgW = parseFloat($img[0].naturalWidth||$img.width()),imgH = parseFloat($img[0].naturalHeight||$img.height()),//取图片自然高度和宽度
				viewW = (o.width=='150px')?parseFloat($view.width()):o.width,
				viewH = (o.height=='100px')?parseFloat($view.height()):o.height;
			$view.css({'width':viewW,'height':viewH});
			if(imgW==0||imgH==0){return;}
			var x = viewW/imgW,
				y = viewH/imgH,
				multiple = x>y?x:y,
				targetW = imgW*multiple,targetH = imgH*multiple,
				left = viewW-targetW,
				top = viewH-targetH;
			$img.css({'width':targetW,'height':targetH});
			var posi = (o.position=='center')?$img.attr('data-formatImage-position'):o.position;
			switch(posi){
				case 'top':
					$img.css({'left':0,'top':0});
					break;
				case 'bottom':
					$img.css({'left':left,'top':top});	
					break;
				default:
					$img.css({'left':left/2,'top':top/2});	
					break;	
			}
			return $img;
		},
		/**
		* @description 销毁滚动条
		* @return {formatImage} formatImage对象
		* @example 想移除事件，在移除dom元素
		* $("#logo").formatImage('destroy');
		*/
		destroy:function(){
			var $img = this.element;
			$img[0].onload = null;
			$img.removeAttr('left').removeAttr('top')
				.removeAttr('data-formatimage-width')
				.removeAttr('data-formatimage-height')
				.removeAttr('data-formatimage-position')
				.removeClass('ui-formatImage')
				.unwrap('div.ui-formatImage-view');
			var width = $img.attr('initWidth'),
				height = $img.attr('initHeight');
			if(width!=$img[0].naturalWidth){
				$img.width(width);
			}
			if(height!=$img[0].naturalHeight){
				$img.height(height);
			}
			$img.removeAttr('initWidth').removeAttr('initHeight');
		}
	});

	$.extend($.ui.formatImage, {
		version : "1.3",
		author : "黄卉",
		date:"2012-12-19"
	});

})(jQuery);

$(function(){
	$(".ui-formatImage").formatImage();//初始化方法
	//$(".ui-formatImage").formatImage('destroy');销毁方法
});
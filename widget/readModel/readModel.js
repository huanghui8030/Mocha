/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-12-25
 *描    述: readModel阅读模式插件
 *关联文件: jQuery.js|jquery-ui.js 
 */
(function($,undefined){
    /**
	* @class 阅读模式插件
    * @name readModel
    * @description 阅读模式，类似视频网站的关灯效果
	* @version 1.3
    */
	$.widget("ui.readModel",
	/** @lends readModel.prototype */
	{
		 options:{
			 height:'',  //目标元素的高度
 			 width:'', //目标元素的宽度
			 model:'default', //阅读模式，在原来的位置default、在显示区域的中间位置center
		 },
		/*
		 * @description 显示插件
		 * @example 显示插件，开灯
		 * $("#targetID").readModel('show');
		 **/
		 show:function(){
			var o = this.options,$target = this.element;
			var $readBg = $('<div class="ui-readModel-bg"/>');
			var maxHeight = Math.max(document.body.offsetHeight,o.height||$target.height());
			var maxWidth = Math.max(document.body.offsetWidth,o.width||$target.width());
			$readBg.css({'height':maxHeight,'width':maxWidth});
			if(o.height!=''){
				var initHeight = $target.height();
				$target.height(o.height).attr('initHeight',initHeight);	
			}
			if(o.width!=''){
				var initWidth = $target.width();
				$target.width(o.width).attr('initWidth',initWidth);
			}
			var top=0,left=0;
			if(o.model=='center'){
				var winHeight = parseFloat($(window).height()),
					winWidth = parseFloat($(window).width()),
					tarHeight = parseFloat($target.height()),
					tarWidth = parseFloat($target.width()),
					scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
					scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
				top = winHeight<tarHeight?scrollTop:winHeight/2 - tarHeight/2+scrollTop;
				left = winWidth<tarWidth?scrollLeft: winWidth/2-tarWidth/2+scrollLeft;
			}else if (o.model=='default'){
				top = $target.offset().top;//+document.body.scrollTop;
				left = $target.offset().left;//+document.body.scrollLeft;
			}
			$target.wrap($readBg);
			$('html').css('overflow','hidden');
			$target.css({'position':'absolute','top':top,'left':left});
		},
		/*
		 * @description 隐藏插件
		 * @example 隐藏插件，关灯
		 * $("#targetID").readModel('hide');
		 **/
		hide:function(){
			var o = this.options,$target = this.element;
			var $readBg = $('div.ui-readModel-bg');
			$('html').css('overflow','');
			if(o.height!=''){
				var initHeight = $target.attr('initHeight');
				$target.height(initHeight).removeAttr('initHeight');	
			}
			if(o.width!=''){
				var initWidth = $target.attr('initWidth');
				$target.width(initWidth).removeAttr('initWidth');
			}
			if(o.iframe){
				$readBg.remove();
			}else{
				$target.unwrap($readBg);				
			}
			$target.css({'position':'','top':'','left':''});
			$readBg.css('display','none');
		}
	});

	$.extend($.ui.readModel, {
		version: "1.3",
		author:'黄卉',
		date:'2012-12-24'
	});

})(jQuery);

$(function(){
	$(".ui-readModel").readModel();		
	//$(".ui-readModel").readModel('destroy');
});
// JavaScript Document
/**
 * @description 贪吃蛇游戏
 * @author huanghui
 * @date 2012-10-30
 ***/
window.onload = onLoaded;
function onLoaded(){
	var snakeArr =new Array,
		mapArr =new Array, 
		rows = 10, 
		cols = 20,
		speed = 500,
		snakeHead=0;
		snakePX =0,snakePY = 0,
		foodPX =0,foodPY =0,
		areaWidth = 25,
		areaHeight = 25,
		Timer =null,
		prevDirection =0,
		direction =0,
		state = 0, //状态0还没有开始，1开始，2暂停，3gameover
		_row =document.getElementById('row'),
		_col = document.getElementById('col'),
		_difficulty = document.getElementById('difficulty'),
		_score =document.getElementById('score'),
		_start = document.getElementById('start'),
		_pause = document.getElementById('pause'),
		_restart = document.getElementById('restart'),
		_playArea =document.getElementsByClassName('play-areas')[0];
	/**
	 * @description 重置方法，游戏区域的div都移除掉，同时将其他项都设置为初始值。
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	_restart.onclick = function(){
		if(state==0){
			alert('请先开始！');
			return;
		}
		if(confirm('是否确定重新开始？')){
			location.reload();
			/*for(var i=0;i<rows;i++){
				for(var j=0;j<cols;j++){
					var elm = document.getElementById(i*rows+j);
					if(elm!=null){
						_playArea.removeChild(elm);
					}				
				}			
			}
			_score.innerHTML=0;
			_row.value=10;
			_col.value =20;
			_difficulty.value=500;
			_pause.value='暂停';
			state=0;
			clearInterval(Timer);*/
		}		
	}
	
	/**
	 * @description 暂停方法，将计数器清空，点击继续后计时器重新开始
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	_pause.onclick = function(){
		if(state==0){
			alert('还没有开始游戏呢！？');
			return;	
		}else if(state==1){
			clearInterval(Timer);
			state =2;
			_pause.value='继续';
		}else if(state==2){
			state =1;
			Timer =setInterval(move,speed);
			_pause.value='暂停';
		}
		
	}
	/**
	 * @description 游戏开始方法
	 				1、通过行数和列数，获取mapArr数组的大小，每个值都为0
					2、产生随机数方法，来确定蛇头和食物的位置（注意：不能在同一个点）
					3、生存游戏区域的dom元素
					4、蛇头进行移动
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	_start.onclick =function(){
		if(state!=0){
			alert('已经开始了！');
			return ;
		}
		state =1;
		rows = parseInt(_row.value);
		cols = parseInt(_col.value);
		speed = parseInt(_difficulty.value);
		for(var i=0;i<rows;i++){
			mapArr[i] =new Array;
			for(var j=0;j<cols;j++){
				mapArr[i][j] =0;
			}
		}
		//产生随机数
		getPoint();
		//生成游戏区域
		getAreas();
		//蛇头进行移动
		Timer = setInterval(move,speed);
	}	
	/**
	 * @description 产生随机数方法，来确定蛇头和食物的坐标位置（注意：不能在同一个点）
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	function getPoint(){
		snakePX = Math.floor(Math.random()*rows);
		snakePY = Math.floor(Math.random()*cols);
		foodPX = Math.floor(Math.random()*rows);
		foodPY = Math.floor(Math.random()*cols);	
		if(snakePX===foodPX &&snakePY===foodPY){
			getPoint();
		}
		return ;
	}
	/**
	 * @description 生存游戏区域的dom元素
	 				1、将蛇头的mapArr值设置为1，食物设置为2
					2、遍历数组，创建每个各自区域的div，并设置相应的属性值。
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	function getAreas(){
		mapArr[snakePX][snakePY]=1; //蛇
		mapArr[foodPX][foodPY]=2;  //食物
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				var _div = document.createElement('div');
				if(mapArr[i][j]==1){
					snakeArr[0]=i*cols+j;
					_div.className ='snake';	
				}else if(mapArr[i][j]==2){
					_div.className ='food';
				}else{
					_div.className ='area';	
				}
				_div.id=i*cols+j;
				_div.style.width= areaWidth+'px';
				_div.style.height = areaHeight+'px';
				_div.style.top = (50+areaHeight*i) +'px';
				_div.style.left = (300+areaWidth*j)+'px';
				_playArea.appendChild(_div);
				
			}	
		}	
	} 
	
	/**
	 * @description target进行移动，snakeArr数组
	 				1、判断gameover的情况：a、出数组大小边界；b、上下跨行；c、自己内部回走（吃到自己）
					2、吃到食物时，a、将遇到的area加入到数组中
								b、修改速度和分数，清空计数器，重新定义计时器
								c、随机数产生下一个食物坐标
					3、吃到食物后，最后一个数组元素需要出栈，前一个元素需要入栈，同时需要设置class			
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	function move(){
		var head = document.getElementById(snakeArr[0]),
			prevSHead = snakeArr[0],
			snakeHead = snakeArr[0];
		switch(direction){
			case 37:snakeHead = prevSHead-1;break;
			case 38:snakeHead = prevSHead-cols;break;
			case 39:snakeHead = prevSHead +1;break;
			case 40:snakeHead = prevSHead+cols;break;
		}
		if(snakeHead == prevSHead){
			return;
		}
		if(snakeHead<0 || snakeHead>rows*cols ||
			(snakeHead-prevSHead==1 && snakeHead%cols ==0) ||
			(prevSHead-snakeHead==1 && prevSHead%cols ==0)){
			clearInterval(Timer);
			alert('GameOver!scroe:'+_score.innerHTML);
			/*location.reload();*/
			return false;
		}
		if(snakeHead==foodPX*cols+foodPY){
			snakeArr[snakeArr.length] = snakeArr[snakeArr.length-1];
			_score.innerHTML = (snakeArr.length-1)*10;
			var pervFoodPX = foodPX,
				pervFoodPY = foodPY;
			while((pervFoodPX==foodPX &&pervFoodPY==foodPY) ||inArr(foodPX*cols+foodPY,snakeArr)){
				foodPX = Math.floor(Math.random()*rows);
				foodPY = Math.floor(Math.random()*cols);
			}
			document.getElementById(foodPX*cols+foodPY).className ='food';	
		}
		var end = snakeArr.pop();
		snakeArr.unshift(snakeHead);
		for(var i=0;i<snakeArr.length;i++){
			document.getElementById(snakeArr[i]).className='snake';
		}
		if(end!=snakeHead){
			document.getElementById(end).className='area';
		}			
		
		
	}
	
	/**
	 * @description	 判断一个元素是否在一个数组里面
	 * @param str 元素
	 * @param arr 数组
	 * @return true存在，false不存在 	
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	function inArr(str,arr){
		for(var i=0;i<arr.length;i++){
			if(str ==arr[i]){
				return true;
			}
		}
		return false
	}
	
	 /**
	 * @description	 绑定键盘上下左右键（←37，↑38，→39，↓40）	
	 					1、小于37或者大于40的，按原来的方向移动
						2、原来向左，再向右无效
						3、原来向右，再向左无效
						4、原来向上，再向下无效
						5、原来向下，再向上无效		
	 * @author huanghui
	 * @date 2012-10-31
	 ***/
	 window.document.onkeydown = function(e){
		e = e ||window.event;
		prevDirection = direction;
		direction = e.keyCode;
		if(direction<37 ||direction>40 ||
			(prevDirection==37 && direction==39)||
			(prevDirection==39 && direction==37)||(prevDirection==38 && direction==40)||
			(prevDirection==40 && direction==38)){
			direction = prevDirection;
		}
		if(e.keyCode==32){
			_pause.click();
		}
	}
	
}
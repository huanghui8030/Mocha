// JavaScript Document
var map = new Array(), //布局
	randoms = new Array(),
	total =0, //一共标记的雷数,
	minesNum = 0,//总雷数
	rows = 10,
	cols = 15,
	timer = 0,
	state =0, //0还没开始，1开始了，2暂停，3游戏结束，4顺利过关
	areaWidth = 25,
	areaHeight = 25,
	spendTime =0;
	Timer =null, //计时器
	_rows = null,
	_cols = null;
	_diffi = null,
	_timer = null,
	_surplus = null,
	_start = null,
	_pause = null,
	_restart =null,
	_playAreas = null;

window.onload= onLoaded;
/**
 * @description dom元素加载完后执行onload方法
 * @author huanghui
 * @date 2012-11-1
 */
function onLoaded(){
	_rows = document.getElementById('rows'),
	_cols = document.getElementById('cols');
	_diffi = document.getElementById('difficulty'),
	_timer = document.getElementsByClassName('timer')[0],
	_surplus = document.getElementsByClassName('surplus')[0],
	_start = document.getElementById('start'),
	_pause = document.getElementById('pause'),
	_restart =document.getElementById('restart'),
	_prompt = document.getElementsByClassName('prompt')[0],
	_playAreas = document.getElementsByClassName('play-areas')[0];

	/**生成初始化游戏区域*/
	initMap();	
	/*按钮的事件绑定方法**/
	eventBind();
};
/**
 * @description 按钮的事件绑定方法
 * @author huanghui
 * @date 2012-11-2
 */
function eventBind(){
	/**在游戏区域禁止选中*/
	window.document.onselectstart = function(e){
		return false;	
	};
	/**
	 * @description 开始游戏
	 * @author huanghui
	 * @date 2012-11-2
	 */
	_start.onclick = function(){
		if(state!=0){
			alert('游戏中！需要重新游戏，请点击重新开始！');
			return;
		}
		state=1;
		var _areas =  _playAreas.children,
			_childArea = _areas[0].childNodes;
		if(_childArea.length!=0){
			_playAreas.removeChild(_areas[0]);
			var newAreas = document.createElement('div');
			newAreas.className = 'areas';
			_playAreas.appendChild(newAreas);
		}
		minesNum = parseInt(_surplus.innerHTML);
		total =minesNum;
		_rows.setAttribute('disabled',true);
		_cols.setAttribute('disabled',true);
		_diffi.setAttribute('disabled',true);
		
		initMap();
		_prompt.innerHTML ='游戏已开始，加油哦！';
		bindEvent();	
	};
	
	/**
	 * @description 游戏暂停
	 * @author huanghui
	 * @date 2012-11-2
	 */
	_pause.onclick = function(){
		if(state ==0){
			alert('请先开始游戏！');
			return ;
		}else if(state==1){
			state=2;
			this.value ='继续';
			unbindEvent();
		}else if(state==2){
			state =1;	
			this.value ='暂停';
			bindEvent();
		}
	};
	
	/**
	 * @description *重新开始
	 * @author huanghui
	 * @date 2012-11-2
	 */
	_restart.onclick = function(){
		location.reload();
	};
	
	/**
	 * @description 难易度修改时的方法
	 * @author huanghui
	 * @date 2012-11-1
	 */
	_diffi.onchange=function(){
		_surplus.innerHTML=this.value;
	};
	
};


/**
 * @description 初始化表格图形，得到个坐标的雷数
 * @author huanghui
 * @date 2012-11-1
 */
function initMap(){
	/**根据初始值，建立初始map布局*/
	rows = parseInt(_rows.value);
	cols = parseInt(_cols.value);
	total = parseInt(_diffi.value);
	
	//地图坐标
	for(var i=0;i<rows;i++){
		map[i] = new Array();
		for(var j=0;j<cols;j++){
			map[i][j]=0;
		}
	}
	//total数的雷的坐标
	for(var k =0;k<minesNum;k++){
		var r = (Math.floor(Math.random()*rows)),
			c = Math.floor(Math.random()*cols),
			ran = r*cols+c;
		while(inArr(ran,randoms)){
			r = (Math.floor(Math.random()*rows)),
			c = Math.floor(Math.random()*cols),
			ran = r*cols+c;
		}
		randoms.push(ran);
		map[r][c]=10;//将雷区设置为10
	}
	//设置其他位置的坐标值
	for(var i=0;i<rows;i++){
		for(var j=0;j<cols;j++){
			if(map[i][j]!=10){
				//计算这个位置八方的雷数：↖，↑，↗，→，↘，↓，↙，←
				var num =0;
				if(i>0){
					if(j>0){
						if(map[i-1][j-1]==10){num +=1;}
					}
					if(map[i-1][j]==10){num +=1;}
					if(j<cols-1){
						if(map[i-1][j+1]==10){num +=1;}	
					}
				}
				if(j<cols-1){
					if(map[i][j+1]==10){num +=1;}
				}
				if(i<rows-1){
					if(j<cols-1){
						if(map[i+1][j+1]==10){num +=1;}
					}
					if(map[i+1][j]==10){num +=1;}
					if(j>0){
						if(map[i+1][j-1]==10){num +=1;}
					}
				}
				if(j>0){
					if(map[i][j-1]==10){num +=1;}
				}
				map[i][j]=num;
			}	
		}
	}
	
	//生成dom元素
	for(var i=0;i<rows;i++){
		for(var j=0;j<cols;j++){
			var _div = document.createElement('div');
			_div.id= i*cols+j;
			//_div.innerHTML = map[i][j];
			_div.className='area';
			if(map[i][j]==10){
				//_div.innerHTML = '雷';
				_div.className='mines';
			}
			_div.style.top= 50+areaWidth*i+'px';
			_div.style.left= 320+areaHeight*j+'px';
			var _areas =_playAreas.children;
			_areas[0].appendChild(_div);
		}
	}
}

/**
 * @description 点击区域方法，显示雷的个数。
 * @author huanghui
 * @date 2012-11-2
 */
function onClickFn(e){
	e.preventDefault();
	var target = (e||window.event).target,
		id = parseInt(target.id);
	if(id>=0 ||id<=rows*cols){
		var x = parseInt(id/cols) ,
			y = id%cols;
		if(map[x][y]=='10'){
			target.innerHTML ='累';	
			//这里是js与jquery的不同，数组每次都自动减1。采用将length存入变量中，然后每次取数组第一个数
			for(var i=0;i<rows;i++){
				for(var j=0;j<cols;j++){
					var _tid = document.getElementById(i*cols+j);
					_tid.style.opacity ='1';
					_tid.innerHTML = map[i][j];
					if(map[i][j]>=0 &&map[i][j]<=8){
						_tid.className = 'area-show';
					}else{
						_tid.innerHTML = '雷';
						_tid.className = 'mines-show';
					}
				}
				
			}
			unbindEvent();
			state=3;
			alert('哎，点到雷了，GameOver！');
			_prompt.innerHTML = '游戏已结束，请点击重新开始！';	
			_start.setAttribute('disabled',true);	
			_pause.setAttribute('disabled',true);		
		}else if(map[x][y]=='0'){//为0 的时候，连着区域的0全部显示(八方向)
			target.innerHTML ='0';	
			showBlankArea(target,id);
		}else{
			target.innerHTML =map[x][y];	
			setSurplusMines(target);//设置剩余雷数
			target.className = 'area-show';
			showOthersArea(x,y);
			
		}
		
	}	
};
/**
 * @description 点击这个区域，如果标记的数目和雷数相同，则显示该区域显示。
 * @param x 坐标元素x
 * @param y 坐标元素y
 * @author huanghui
 * @date 2012-11-7
 */
function showOthersArea(x,y){
	var	aroundArr  =getAroundArr(x,y),
		idArr = getAroundUnmarkIds(x,y),
		unMarkN =idArr.length;
	if(map[x][y] == (aroundArr.length-unMarkN)){
		for(var i=0;i<unMarkN;i++){
			if(idArr[i]!=10){
				var _target = document.getElementById(idArr[i]);
				_target.className='area-show';
				var x = parseInt(idArr[i]/cols),
				y = idArr[i]%cols;
				_target.innerHTML = map[x][y];
			}
		}
	}
}
/**
 * @description 得到一个元素四周的元素
 * @param x 坐标元素x
 * @param y 坐标元素y
 * @author huanghui
 * @date 2012-11-7
 */
function getAroundArr(x,y){
	var aroundArr =new Array();
	if(x-1>0 && y-1>0){
		aroundArr.push((x-1)*cols+(y-1));
	}
	if(x-1>0){
		aroundArr.push((x-1)*cols+y);
	}
	if(x-1>0 && y+1<cols){
		aroundArr.push((x-1)*cols+y+1);
	}
	if(y+1<cols){
		aroundArr.push(x*cols+y+1);
	}
	if(x+1<rows && y+1<cols){
		aroundArr.push((x+1)*cols+(y+1));
	}
	if(x+1<rows){
		aroundArr.push((x+1)*cols+y);
	}
	if(x+1<rows && y-1>0){
		aroundArr.push((x+1)*cols+(y-1));
	}
	if(y-1>0){
		aroundArr.push(x*cols+(y-1));
	}
	return aroundArr;
}
/**
 * @description 得到一个元素四周的标记的雷数
 * @param x 坐标元素x
 * @param y 坐标元素y
 * @return idArr 返回没有标记的雷数id
 * @author huanghui
 * @date 2012-11-7
 */
function getAroundUnmarkIds(x,y){
	var  idArr=getAroundArr(x,y),
		minesN=0,
		unMarkIdArr=new Array;
	for(var i=0;i<idArr.length;i++){
		var cName = document.getElementById(idArr[i]).className;
		if(cName !='mines-mark'){
			unMarkIdArr.push(idArr[i]);
		}
	}
	return unMarkIdArr;
}


/**
 * @description 点击0时，显示周边的空白区域 
 * @param target 目标元素
 * @param id 目标元素id
 * @author huanghui
 * @date 2012-11-2
 */
function showBlankArea(target,id){
	var x = parseInt(id/cols),y = id%cols,
		topLeftX = x,topLeftY = y,
		topX = x ,topY= y,
		topRightX = x,topRightY = y,
		rightX = x,rightY = y,
		bottomRightX = x,bottomRightY = y,
		bottomX = x,bottomY = y,
		bottomLeftX = x,bottomLeftY = y,
		leftX = x,leftY = y;
	while(map[topLeftX][topLeftY]==0){
		showOneBlankArea(topLeftX,topLeftY);
		topLeftX -= 1;
		topLeftY -= 1;	
		if(topLeftX<0 ||topLeftY<0 ||(topLeftY+1)%cols==0){
			break;
		}
	}
	while(map[topX][topY]==0){
		showOneBlankArea(topX,topY);
		topX -= 1;
		if(topX<0){
			break;
		}
	}
	while(map[topRightX][topRightY]==0){
		showOneBlankArea(topRightX,topRightY);
		topRightX -= 1;
		topRightY += 1;
		if(topRightX<0 ||(topRightY+1)%cols==0){
			break;			
		}
	}
	while(map[rightX][rightY]==0){
		showOneBlankArea(rightX,rightY);
		rightY += 1;
		if(rightY%cols==0 || rightY>=cols){
			break;
		}
	}
	while(map[bottomRightX][bottomRightY]==0){
		showOneBlankArea(bottomRightX,bottomRightY);
		bottomRightX += 1;
		bottomRightY += 1;
		if(bottomRightY%cols==0 || bottomRightY>=cols ||bottomRightX>=rows){
			break;
		}
	}
	while(map[bottomX][bottomY]==0){
		showOneBlankArea(bottomX,bottomY);
		bottomX += 1;
		if(bottomX>=rows){
			break;
		}
	}
	while(map[bottomLeftX][bottomLeftY]==0){
		showOneBlankArea(bottomLeftX,bottomLeftY);
		bottomLeftX += 1;
		bottomLeftY -= 1;
		if(bottomLeftX>=rows ||(bottomLeftX+1)%cols==0){
			break;	
		}
	}
	while(map[leftX][leftY]==0){
		showOneBlankArea(leftX,leftY);
		leftY -= 1;
		if(leftY<0 ||(leftY+1)%cols==0){
			break;
		}
	}
			
};

/**
 * @description 显示一个div区域八方向的div
 * @param x 坐标值x
 * @param y 坐标值y
 * @author huanghui
 * @date 2012-11-6
 */
function showOneBlankArea(x,y){
	if(map[x][y]==0){
		modifyOneArea(x,y);
		if(x>0){
			if(y>0){
				modifyOneArea(x-1,y-1);
			}
			modifyOneArea(x-1,y);
			if(y<cols-1){
				modifyOneArea(x-1,y+1);
			}
		}
		if(y<cols-1){
			modifyOneArea(x,y+1);
		}
		if(x<rows-1){
			if(y<cols-1){
				modifyOneArea(x+1,y+1);
			}
			modifyOneArea(x+1,y);
			if(y>0){
				modifyOneArea(x+1,y-1);
			}
			
		}
		if(y>0){
			modifyOneArea(x,y-1);
		}
	}	
}

/**
 * @description 显示一个div区域八方向的div
 * @param x 坐标值x
 * @param y 坐标值y
 * @author huanghui
 * @date 2012-11-6
 */
function modifyOneArea(x,y){
	var target=document.getElementById(x*cols+(y));
	target.className = 'area-show';
	target.innerHTML = map[x][y];
}
/**
 * @description 右键时标记为雷，同时重新计算剩余雷数
 * @author huanghui
 * @date 2012-11-2
 */
function onContextmenuFn(e){
	var e = e||window.event;
	e.preventDefault();
	var target = e.target;
	var id = parseInt(target.id);
	if(id>=0 ||id<=rows*cols){
		var cName = target.className ;
		if(cName=='area-show'){
			return ;
		}else if(cName=='mines-mark'){
			total +=1;
			target.className ='area';
		}else{
			target.className ='mines-mark';
			total -=1;
		}
		_surplus.innerHTML=total;
	}
};

/**
 * @description 计数器Timer
 * @author huanghui
 * @date 2012-11-2
 */
function countFn(){
	spendTime +=1;
	var str = '';
	var minute = Math.floor(spendTime/60);
	var seconds = spendTime%60;
	if(seconds<10){
		seconds = '0'+seconds;
	}
	if(minute<10){
		minute ='0'+minute;
	}
	if(minute==60){
		unbindEvent();
		state=3;
		alert('你都玩了一个小时了，Game Over吧!');
		_prompt.innerHTML = '你都玩了一个小时了，Game Over吧!';	
		return false;
	}
	str = minute+':'+seconds;
	_timer.innerHTML = str;
	//游戏胜利
	var areaShow = document.getElementsByClassName('area-show');
	if((areaShow.length+minesNum)==cols*rows){
		unbindEvent();
		state=4;
		_surplus.innerHTML ='0';
		_prompt.innerHTML = '恭喜过关！';
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				if(map[i][j]=='10'){
					var target = document.getElementById(i*cols+j);
					target.className='mines-show';
					target.innerHTML ='雷';
				}
			}
		}
		alert('游戏胜利，恭喜过关！所有时间为：'+_timer.innerHTML);
		return false;
	}
};
/**
 * @description 绑定事件
 * @author huanghui
 * @date 2012-11-6
 */
function bindEvent(){
	Timer = setInterval(countFn,1000);
	window.onclick = function(e){
		onClickFn(e);	
	};		
	window.oncontextmenu = function(e){
		onContextmenuFn(e);	
	};
}
/**
 * @description 事件移除
 * @author huanghui
 * @date 2012-11-6
 */
function unbindEvent(){
	clearInterval(Timer);
	window.onclick =null;
	window.oncontextmenu = function(e){
		e.preventDefault(e);	
	};
}

/**
 * @description 设置剩余雷数
 * @author huanghui
 * @date 2012-11-2
 */
function setSurplusMines(target){	
	//如果点击的为标记区域
	if(target.className =='mines-mark'){
		total +=1;
		_surplus.innerHTML=total;
	}
	
}
/**
 * @description 判断一个字符串str是否在arr数组里面*
 * @author huanghui
 * @date 2012-11-1
 */
function inArr(str,arr){
	for(var i=0;i<arr.length;i++){
		if(str==arr[i]){
			return true;
		}
	}
	return false;
};

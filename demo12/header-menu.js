var HerfJson = [{'url':'gdjy','name':'高等教育信息',
        'navSecond':[
            {'url':['gdjy/xj/show.action','gdjy/zp'],'name':'学籍信息/图像校对'},
            {'url':['gdjy/xl/show.action','gdjy/xl'],'name':'学历信息'},
            {'url':['gdjy/ky/show.action','gdjy/ky'],'name':'考研信息'},
            {'url':['gdjy/byqx/show.action','gdjy/byqx'],'name':'毕业去向'}]
    },{'url':'bab','name':'在线验证报告',
        'navSecond':[
            {'url':['bab/index.action'],'name':'首页'},
            {'url':['bab/xj/show.action','bab/xj'],'name':'高等学籍'},
            {'url':['bab/xl/show.action','bab/xl'],'name':'高等学历'}]
    },{'url':'rzbg','name':'学历与成绩认证',
        'navSecond':[
            {'url':['rzbg/index.action'],'name':'首页'},
            {'url':['rzbg/showbind.action'],'name':'绑定报告'}]
    },{'url':'gjhz、xw、gdxw','name':'国际合作申请',
        'navSecond':[
        {'url':['gjhz/index.action','xw','gdxw'],'name':'首页'},
        {'url':['gjhz/utf/index.action','gjhz/utf'],'name':'传输费用'}]
    },{'url':'survey、zytj、myd','name':'调查/投票',
    'navSecond':[
        {'url':['survey/index.action'],'name':'首页'},
        {'url':['survey/zyindex.action?from=archive-header','survey/zyindex.action','survey/zycp','survey/zxs'],'name':'职业调查'},
        {'url':['zytj/recommendContinue.action','zytj/userRecommend.action','zytj/recommendAdd!add.action'],'name':'专业推荐'},
        {'url':['myd/specAppraisalWelcome.action'],'name':'专业满意度'},
        {'url':['myd/schAppraisalWelcome.action'],'name':'院校满意度'}]
    }];

/*$(function(){
    selectMenu();
    supNavHover();
    setHref(); 
});*/
/**设置菜单选中状态 
 * modify huangh@chsi.com.cn 20170713
 * @return {null}  返回空
 */
function selectMenu() {
    var requestUrl = window.location.href,
        newRul='',
        whIndex = requestUrl.lastIndexOf('?');
    if(whIndex>-1){
        newRul  = requestUrl.substring(0,whIndex);
    }else{
        newRul = requestUrl;
    } 
    var myIndex = newRul.indexOf('/archive/'),
        rulLength = newRul.length;
    if(myIndex>-1){ //学信档案
        newRul = newRul.substring(myIndex+9,rulLength);
    }else{
        var gkIndex = newRul.indexOf('/zyk/');
        if(gkIndex>-1){
            newRul = newRul.substring(gkIndex+5,rulLength);
        }
    }
    var index = newRul.indexOf("/");
    if ( index == -1 ) {
        $('.sub_nav').hide();
        $('.homePage-nav a').addClass('active');
        return;
    }
    var liInfo = newRul.substring(0, index);
    if ( null == liInfo || "" == liInfo ) {
        $('.sub_nav').hide();
        $('.homePage-nav a').addClass('active');
        return;
    }
    setCurSelect(liInfo,newRul);
}
/**设置选中状态
 * @param {string} id  一级菜单的id值
 * @param {string} url 当前页面的url截取值
 * @author huangh@chsi.com.cn 
 * @date   2016.10.18
 */
function setCurSelect(id , url){
    $('.homePage-nav a').removeClass('active');
    var url = url || '',
        id = id||'',
        $firstNav = $('#nav-first'),
        newUrl = '' ,
        secondIndex = 0 ,
        firstIndex = getFirstIndex(id) ,  ////获取一级菜单序列号
        $first = $firstNav.find('dl:eq('+firstIndex+')'),
        $sbuUl = null;
    $firstNav.find('dt').removeClass('active').find('.sanjiao').hide();
    $first.addClass('active').find('.sanjiao').show();
    $sbuUl = $('#nav-second').find('ul');
    $sbuUl.hide();
    if(url.indexOf('/')==url.lastIndexOf('/')){//只有一个“/”
        newUrl = url;
    }else{
        newUrl = url.substring(0,url.lastIndexOf('/'));
    }
    secondIndex = getSecondIndex(newUrl,firstIndex)||0;
    $sbuUl.eq(firstIndex).show().find('li:eq('+secondIndex+')').addClass('active');     
}
/**获取一级菜单序列号
 * @param  {string} id 当前访问地址的中“archive/”后面的第一个单词
 * @return {Number}    返回一级菜单序列号
 * @author huangh@chsi.com.cn
 * @date   2016.10.27
 */
function getFirstIndex(id){
    for(var i=0,j=HerfJson.length;i<j;i++){
        if(HerfJson[i].url.indexOf(id)!=-1){
            return i;
        }
    }
    return 0;
}

/**获取二级菜单选中的序列号
 * @param  {string} url 当前页面的url截取值
 * @param  {int}   n    一级菜单选中的序列号
 * @return {int}        返回二级菜单选中的顺序号
 * @author huangh@chsi.com.cn 
 * @date   2016.10.18
 */
function getSecondIndex (url,n){
    var n = n ||0 , 
        second = HerfJson[n].navSecond;
    for(var i=0;i<second.length;i++){
        var urlArr = second[i].url;
        for(var j=0,k = urlArr.length ; j<k ;j++){
            if(url.indexOf(urlArr[j])!=-1){
                return i;
            }
        }
        
    }
    return 0;
}

/**设置一级菜单hover菜单数据，添加一级菜单鼠标移上效果
 * @return {null} 返回空
 * @author huangh@chsi.com.cn 
 * @date   2016.10.18
 */
function supNavHover(){
    var $clone = $('#nav-second ul').clone() || '',
        $supNav = $('#nav-first'),
        $supDetial = $supNav.find('dd') || '';
    if($supDetial!=''){
        //克隆二级菜单数据给hover中的显示菜单
        for(i=0,j=$supDetial.length;i<j;i++){
            //高等教育信息，图像校对和学籍信息分开显示
            if(i==0){
                var $gdjy = $clone.eq(i),
                    $li =  $gdjy.find('li:eq(0)');
                $li.html('图像校对');
                var $newli = $li.clone();
                $newli.html('学籍信息');
                $gdjy.prepend($newli);
            }
            $clone.eq(i).appendTo($supDetial.eq(i));
        }
        //设置hover菜单中ul显示，但是dd是隐藏，所以hover菜单默认不显示
        $supDetial.find('ul').show();
    }
    //一级菜单鼠标移上效果
    $("#nav-first").mouseover(function(){
       $(this).find('dd').show();
       $('.header-nav-bg').show();
    }).mouseout(function(){
       $(this).find('dd').hide();
       $('.header-nav-bg').hide();
    });
    //个人中心鼠标移上效果
    $(".nav-userinfo").mouseover(function(){
        $(this).find('.btn-group').addClass('open')
                .find('.caret').addClass('animated flip')

    }).mouseout(function(){
        $(this).find('.btn-group').removeClass('open')
                .find('.caret').removeClass('animated flip');
    });
}    
/**设置菜单click事件，添加href
 * @return {null} 返回空
 * @author huangh@chsi.com.cn 
 * @date   2016.10.18
 */
function setHref(){
    $('.sub_nav_mian li').click(function(){
        var $this = $(this),
            liIndex = $this.index(),
            $parent = $this.parents('dl');
        if($parent.length <= 0){
            $parent = $this.parent('ul');
        }
        var ulIndex = $parent.index();
        liIndex = liIndex<0?0:liIndex;
        ulIndex = ulIndex<0?0:ulIndex;
        //高等教育信息，图像校对和学籍信息分开显示
        if(ulIndex==0&& $this.parent().parent().is('dd')){
            liIndex -= 1;
            liIndex = liIndex<0 ? 0 :liIndex;
        }
        if(ulIndex<5){
            window.location.href = getHref(ulIndex,liIndex);
        }
    });
    $('#nav-first dt').click(function(){
        var dlIndex = $(this).parent('dl').prevAll('dl').length ||0;
         if(dlIndex < 5){   
            window.location.href = getHref(dlIndex,0);
        }
    })
}
/**获取href链接
 * @param  {int} firstIndex  HerfJson中一级菜单的序列号 
 * @param  {int} secondIndex HerfJson中二级菜单的序列号
 * @return {string}          返回完整的href参数
 */
function getHref(firstIndex,secondIndex){
    var  href = HerfJson[firstIndex].navSecond[secondIndex].url[0];
    if(typeof(SpathMy) == "undefined"){
        SpathMy = 'https://my.chsi.com.cn/archive/';
    }
    if(typeof(SpathGaoKao) == "undefined"){
        SpathGaoKao = 'http://gaokao.chsi.com.cn/zyk/';
    }
    if(href.indexOf('http')==0){
        return href;
    }else{
        if(firstIndex==4&&secondIndex>1){
            return SpathGaoKao+href;//高考项目中的链接
        }else{
            return SpathMy+href;
        } 
    } 
}


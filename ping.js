var pingValue = true;
function pingSetting(option) 
{
    var ping, requestTime, responseTime ;
    var getUrl = function(url){    
        var strReg="^((https|http)?://){1}"
        var re=new RegExp(strReg); 
        return re.test(url)?url:"http://"+url;
    }
	$.ajax({
		url: getUrl(option.url)+'/'+ (new Date()).getTime() + '.html',  
		type: 'GET',
		dataType: 'html',
		timeout: 10000,
		beforeSend : function() 
		{
			if(option.beforePing) option.beforePing();
			requestTime = new Date().getTime();
		},
		complete : function() 
		{
			responseTime = new Date().getTime();
			ping = Math.abs(requestTime - responseTime);
			if(option.afterPing) option.afterPing(ping);
		}
	});
	
	if(option.interval && option.interval > 0)
	{
		var interval = option.interval * 1000;
		setTimeout(function(){$.ping(option)}, interval);
	}
};

function ping(Url,hrefLocal){
	pingSetting({url : Url, afterPing : function(p){
	if (pingValue){
		pingValue = false;
		if(hrefLocal)location.href=Url;
		}
	}, interval : 0});
}
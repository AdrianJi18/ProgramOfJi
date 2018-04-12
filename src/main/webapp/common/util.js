/**
 * 工具类.
 * @type 
 */
var util = {
	/**
	 * 删除左右两端的空格
	 * @param {} str
	 * @return {}
	 */
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	
	// 日期增加天数
	dateAddDays:function(dataStr,dayCount){
		// 日期字符串
		var strdate=dataStr;
		// 把日期字符串转换成日期格式
		var isdate = new Date(strdate.replace(/-/g,"/"));
		// 日期加1天
		isdate = new Date((isdate/1000+(86400*dayCount))*1000);
		// 把日期格式转换成字符串
		var month = isdate.getMonth()+1;
		month = month<10?"0"+month:month;
		var date = isdate.getDate();
		date = date<10?"0"+date:date;
		var pdate = isdate.getFullYear()+"-"+month+"-"+date;
		return pdate;
	}
}
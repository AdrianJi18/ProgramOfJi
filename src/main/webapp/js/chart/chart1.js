 /**
  * 柱状图.
  * @type 
  */
 var chart1 = {
 	barChart : null,
	createPanel : function() {
		var panel = new Ext.Panel({
			renderTo :"chart1",
			html:"<div id='animalChart' style='position:relative;z-index:0;width:100%;height:92%;'></div>",
			border:true,
			tbar : [{
						xtype:"label",
						text : "从:",
						id : "from",
						style  : 'padding-left:100px'
					}, {
						xtype : 'datefield',
						id : "fromDate",
						format : 'Y-m-d',
						readOnly : true,
						emptyText : "发生时间",
						width : 120
					}, " ", " ", {
						xtype:"label",
						text : "到:",
						id : "to"
					}, {
						xtype : 'datefield',
						id : "toDate",
						format : 'Y-m-d',
						readOnly : true,
						emptyText : "发生时间",
						width : 120
					}, " ", " ", {
						text : spmscontent.query,
						iconCls : "icon-search",
						handler : function() {
							// 发生时间
							var fromDate = Ext.getCmp("fromDate").getRawValue();
							// 结束时间
							var toDate = Ext.getCmp("toDate").getRawValue();
							if (toDate != "" && toDate < fromDate) {
								Ext.Msg.alert(spmscontent.prompt,spmscontent.fromDateToDate);
								return;
							}
							if (fromDate != "") {
								fromDate += " 00:00:00";
							}
							if (toDate != "") {
								toDate += " 23:59:59";
							}
							chart1.loadData(fromDate,toDate);
						}
					}]
		});
			
		return panel;
	},
	getOption:function(){
 		var option = {
 			title:{
 				text: "牲畜数量统计"
 			},
 			tooltip : {
		        trigger: 'axis',
		        axisPointer : {            
		            type : 'shadow'
		        }
		    },
		    grid: {
		        left: '8%',
		        right: '4%',
		        bottom: '2%',
		        containLabel: true
		    },
		    toolbox: {
 				feature: {
 					saveAsImage: {}
 				}
 			},
		    xAxis : [{
		    	type : 'category',
		        data : ['猪', '牛', '羊'],
	            axisTick: {
	                alignWithLabel: true
	            }
		    }],
		    yAxis : [{
		    	min:0,
 				//max:300,
 				splitNumber:10,
		    	type : 'value'
	        }],
		    series : [{
	            name:'数量',
	            type:'bar',
	            barWidth: '60%',
	            itemStyle:{
	            	normal:{
	            		color:function(params){
	            			var colorList = ['red','yellow','green'];	
	            			return colorList[params.dataIndex]
	            		}
	            	}
	            },
	            label :{
	            	normal: {
	                    show: true,
	                    position: 'top'
                	}
	            },
	            data : [0,0,0]
	            }
	    	]
	    };
 		return option;
 	},
	init:function(){
		chart1.createPanel();
 		chart1.barChart = echarts.init(document.getElementById("animalChart"));
 		chart1.barChart.setOption(chart1.getOption());
 		chart1.loadData();
 	},
 	loadData : function(fromDate,toDate) {
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : "post",
			url : "chart/animal/query.do",
			params : {
				fromDate : fromDate,
				toDate : toDate
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					var num1 = respText["猪"];
					num1 = num1?num1:0;
					var num2 = respText["牛"];
					num2 = num2?num2:0;
					var num3 = respText["羊"];
					num3 = num3?num3:0;
					chart1.barChart.setOption({
						series : [{
							data : [num1,num2,num3]
						}]
					});
				}else{
					Ext.Msg.alert(spmscontent.prompt,respText.error);
				}
			},
			failure : function(response) {
				globalComponent.progress.stopProgress();
				Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
			}
		});
	}
 };
 /**
  * 饼图.
  * @type 
  */
 var chart2 = {
 	pieChart : null,
	createPanel : function() {
		var panel = new Ext.Panel({
			renderTo :"chart2",
			html:"<div id='areaChart' style='position:relative;z-index:0;width:100%;height:92%;'></div>",
			border:true,
			tbar : [{
						xtype:"label",
						text : "从:",
						id : "from",
						style  : 'padding-left:100px'
					}, {
						xtype : 'datefield',
						id : "fromDay",
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
						id : "toDay",
						format : 'Y-m-d',
						readOnly : true,
						emptyText : "发生时间",
						width : 120
					}, " ", " ", {
						text : spmscontent.query,
						iconCls : "icon-search",
						handler : function() {
							// 发生时间
							var fromDay = Ext.getCmp("fromDay").getRawValue();
							// 结束时间
							var toDay = Ext.getCmp("toDay").getRawValue();
							if (toDay != "" && toDay < fromDay) {
								Ext.Msg.alert(spmscontent.prompt,spmscontent.fromDateToDate);
								return;
							}
							if (fromDay != "") {
								fromDay += " 00:00:00";
							}
							if (toDay != "") {
								toDay += " 23:59:59";
							}
							chart2.loadData(fromDay,toDay);
						}
					}]
		});
			
		return panel;
	},
	getOption:function(){
 		var option = {
 			title : {
		        text: '各中心数量统计'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    color:["#CC0099","#0000FF", "#00CC00"],  
		    toolbox: {
 				feature: {
 					saveAsImage: {}
 				}
 			},
		    series : [
		        {
		            name: '各中心牲畜数量统计',
		            type: 'pie',
		            radius : '80%',
		            center: ['50%', '50%'],
		            data:[
		            	{value:0, name:'饲养中心'},
		            	{value:0, name:'生产中心'},
		                {value:0, name:'销售中心'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0
		                },
		                normal:{
		                	label:{
			                    show: true,
			                    formatter: '{b} : {c} ({d}%)'
		                    }
		                }
		            }
		        }
		    ]
 		};
 		return option;
 	},
	init:function(){
		chart2.createPanel();
 		chart2.pieChart = echarts.init(document.getElementById("areaChart"));
 		chart2.pieChart.setOption(chart2.getOption());
 		chart2.loadData();
 	},
 	loadData : function(fromDate,toDate) {
		globalComponent.progress.startProgress(spmscontent.operating);
		Ext.Ajax.request({
			method : "post",
			url : "chart/animal/queryArea.do",
			params : {
				fromDate : fromDate,
				toDate : toDate
			},
			success : function(response) {
				globalComponent.progress.stopProgress();
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					//区域 ： 1 饲养中心  2  生产中心  3 销售中心
					var num0 = respText["1"];
					num0 = num0?num0:0;
					var num1 = respText["2"];
					num1 = num1?num1:0;
					var num2 = respText["3"];
					num2 = num2?num2:0;
					chart2.pieChart.setOption({
						series : [{
							data : [
								{value:num2, name:'销售中心'},
								{value:num1, name:'生存中心'},
		                		{value:num0, name:'饲养中心'}
							]
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
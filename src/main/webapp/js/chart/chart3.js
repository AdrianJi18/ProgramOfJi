 /**
  * 折线图.
  * @type 
  */
 var chart3={
 	myChart:null,
 	cpuData:[0,0,0,0,0,0,0,0,0,0],
 	memoryData:[0,0,0,0,0,0,0,0,0,0],
 	diskData:[0,0,0,0,0,0,0,0,0,0],
 	dateData:[],
 	getOption:function(){
 		var option = {
 			title:{
 				text: "服务器性能"
 			},
 			tooltip:{
 				trigger: "axis"
 			},
 			legend: {
 				data:["CPU","内存","硬盘"]
 			},
 			grid: {
 				left: "3%",
 				right: "4%",
 				bottom: "3%",
 				containLabel: true
 			},
 			toolbox: {
 				feature: {
 					saveAsImage: {}
 				}
 			},
 			xAxis: {
 				type: "category",
 				splitNumber:10,
 				data:chart3.dateData
 			},
 			yAxis: {
 				min:0,
 				max:100,
 				splitNumber:10,
 				type: "value",
 				boundaryGap: false
 			},
 			series: [
 				{
	 				name:"CPU",
	 				type:"line",
	 				smooth: true,
	 				//symbol: 'none',
	 				stack: "CPURate",
//	 				areaStyle: {
//	 					normal: {}
//	 				},
	 				data: chart3.cpuData,
	 				label :{
		            	normal: {
		                    show: true,
		                    position: 'top'
	                	}
		            }
 				},
 				{
	 				name:"内存",
	 				type:"line",
	 				//smooth:true,
	 				//symbol: 'none',
	 				stack: "memoryRate",
//	 				areaStyle: {
//	 					normal: {}
//	 				},
	 				data: chart3.memoryData,
	 				label :{
		            	normal: {
		                    show: true,
		                    position: 'top'
	                	}
		            }
 				},
 				{
	 				name:"硬盘",
	 				type:"line",
	 				//smooth:true,
	 				//symbol: 'none',
	 				stack: "diskRate",
//	 				areaStyle: {
//	 					normal: {}
//	 				},
	 				data: chart3.diskData,
	 				label :{
		            	normal: {
		                    show: true,
		                    position: 'top'
	                	}
		            }
 				}
 			]
 		};
 		return option;
 	},
 	init:function(){
 		var date = new Date();
 		date = new Date(date.getTime()-date.getSeconds()*1000);
 		var time = date.getTime();
 		for(var i=9;i>=0;i--){
 			var tempDate = new Date(time-i*5*1000);
 			var xdate = tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds();
 			chart3.dateData.push(xdate);
 		}
 		chart3.myChart = echarts.init(document.getElementById("chart3"));
 		chart3.myChart.setOption(chart3.getOption());
 		chart3.changeData();
 	},
 	changeData:function(){
 		setInterval(function(){
 			Ext.Ajax.request({
				method : "post",
				url : "chart/performance.do",
				success : function(response) {
					var respText = Ext.util.JSON.decode(response.responseText);
					if (respText.success) {
						var cpu = respText.lastPerformance.cpu;
						chart3.cpuData.shift();
						chart3.cpuData.push(cpu);
						
						var memory = respText.lastPerformance.memory;
						chart3.memoryData.shift();
						chart3.memoryData.push(memory);
						
						var disk = respText.lastPerformance.disk;
						chart3.diskData.shift();
						chart3.diskData.push(disk);
						
						var tempDate = new Date(respText.lastPerformance.time);
			 			var xdate = tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds();
			 			chart3.dateData.shift();
			 			chart3.dateData.push(xdate);
			
						chart3.myChart.setOption({
							xAxis:{
								data:chart3.dateData
							},
							series: [{
								name:"CPU",
			 					type:"line",
			 					data:chart3.cpuData
							},{
								name:"内存",
			 					type:"line",
			 					data:chart3.memoryData
							},{
								name:"硬盘",
			 					type:"line",
			 					data:chart3.diskData
							}]
						});
					} else {
						Ext.Msg.alert(spmscontent.prompt,respText.error);
					}
				},
				failure : function() {
					Ext.Msg.alert(spmscontent.prompt,spmscontent.innerError);
				}
			});
		},5000);
 	}
};
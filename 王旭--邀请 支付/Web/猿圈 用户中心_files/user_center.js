/**
 * 生成雷达图[个人中心]
 */
var options = {
    //Boolean - Whether to show lines for each scale point
    scaleShowLine : true,
    //Boolean - Whether we show the angle lines out of the radar
    angleShowLineOut : true,
    //Boolean - Whether to show labels on the scale
    scaleShowLabels : false,
    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero : true,
    //String - Colour of the angle line
    angleLineColor : "rgba(0,0,0,.1)",
    //Number - Pixel width of the angle line
    angleLineWidth : 1,
    //String - Point label font declaration
    pointLabelFontFamily : "'Arial'",
    //String - Point label font weight
    pointLabelFontStyle : "normal",
    //Number - Point label font size in pixels
    pointLabelFontSize : 16,
    //String - Point label font colour
    pointLabelFontColor : "#666",
    //Boolean - Whether to show a dot for each point
    pointDot : true,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 3,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};
$(document).ready(function() {
	var data = {
		    labels: ["准确性", "代码质量", "编程规范", "编程速度"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,0,0,0.5)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,10,10,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [$("#qualityAll").val(), $("#styleAll").val(), $("#accuracyAll").val(), $("#speedAll").val()]
		        },
		        {
		            label: "My Second dataset",
		            fillColor : "rgba(0,0,220,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(100,100,205,9)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: [$("#avg_code_quality").val(), $("#avg_code_style").val(), $("#avg_code_accuracy").val(), $("#avg_code_speed").val()]
		        }
		    ]
		};
	new Chart(document.getElementById("myChart").getContext("2d")).Radar(data, options);
	
	// 文档加载完成后，绘制雷达图
	var num = jsonMap;
	for ( var p in num ){
		initRadar(p, num[p]);
	}
	//UploadPic(document.getElementById("myChart"));
	
	//var chartSave = document.getElementById("myChart");
	//alert(chartSave);
//	chartSave.SaveImage("D:/3.jpeg",ChartImageFormat.Jpeg); 
//	alert(chartSave);
//	var image = new Image();
//	image.src = chartSave.toDataURL("image/png");
//	return image;
	
	
});

function initRadar(objId, jsonData){
	var labels = new Array(); // 标签
	var datas = new Array();
	var dataAlls = new Array();
	// 解析数据
	for (var i = 0, l = jsonData.length; i < l; i++) {
		labels.push(jsonData[i].name);
		var tt = $Util.accMul((jsonData[i].value).toFixed(2), 10);
		datas.push(tt);
		var ts = $Util.accMul((jsonData[i].avg).toFixed(2), 10);
		dataAlls.push(ts);
	}
	var data = {
	    labels: labels,
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,0,0,0.5)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,10,10,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: dataAlls
	        },
	        {
	            label: "My Second dataset",
	            fillColor : "rgba(0,0,220,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(100,100,205,9)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: datas
	        }
	    ]
	};
	new Chart(document.getElementById("myChart_" + objId).getContext("2d")).Radar(data, options);
	//alert(chart);
	
}

//将画好的图片上传
function UploadPic() {
	var mycanvas = document.getElementById("myChart");
	//var mycanvas1 = document.getElementById("myChart_" + objId);
    // Generate the image data
	var Pic    = mycanvas.toDataURL();
	alert(Pic);
    // Sending the image data to Server
    $.ajax({type : "post",
		async : true,
		url : "cooper/recommended/talent/saveChart.html",
		data : {"imageData" : Pic},
		success : function(message) {
			if(message != "fail") {
				alert("图片保存成功");
			} else {
				alert("图片保存失败");
			}
			
		}
	});
} 

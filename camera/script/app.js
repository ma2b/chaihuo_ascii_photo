/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */
// var img;
// var client;
(
	function () {
		var asciiContainer = document.getElementById("ascii");
		var capturing = false;
		client = new OSS.Wrapper({
			region: 'yourRegion',
			accessKeyId: 'yourAccessKeyId',
			accessKeySecret: 'yourAccessKeySecret',
			bucket: 'yourBucket'
		});
		//#调试点1
		camera.init({
			height: 150,  //高
			width: 200,	  //宽
			fps: 10, 	  //每秒帧数
			mirror: true, //镜像显示


			onFrame: function (canvas) {
				ascii.fromCanvas(canvas, {
					// contrast: 128,
					callback: function (asciiString) {
						asciiContainer.innerHTML = asciiString;
					}
				});
			},

			onSuccess: function () {
				const button = document.getElementById("button");
				const putBtn = document.getElementById("putBtn");
				button.style.display = "inline";
				document.getElementById("info").style.display = "none";
				putBtn.onclick = function () {
					processPut();
				};

				button.onclick = function () {
					if (capturing) {
						camera.pause();
						button.innerText = '继续';
						putBtn.style.display = "inline";
						timerBtn.style.display = "inline";
					} else {
						camera.start();
						button.innerText = '拍照';
						putBtn.style.display = "none";
						timerBtn.style.display = "inline";
					}
					capturing = !capturing;
				};

				timerBtn.onclick = function () {
					method.countdown(3, function (time_value) {
						var time = document.getElementById("Time");
						if (time_value == 0) {
							//等于0时清除计时
							time.innerHTML = "倒计时结束"
							processPut();
						} else {
							time.innerHTML = time_value;
						}
						console.log(time_value);
					});
				};
			},

			onError: function (error) {
				// TODO: log error
			},

		});
	}

)();


var uploadIndex = 1;

function on_click_upload_file() {
	var canvas = document.getElementById("canvas_photo" + uploadIndex);
	console.log("canvas:", canvas);
	var dataURL = canvas.toDataURL();
	var pre_file = dataURLtoFile(dataURL, "test");
	var file = new File([pre_file], "test2");
	var storeAs = "lastphoto" + uploadIndex + ".png"; //命名空间
	console.log(' => ' + storeAs);
	client.multipartUpload(storeAs, file).then(function (result) {
		console.log(result);
		var time = document.getElementById("Time");
		time.innerHTML = "上传成功。关注公众号“柴火创客空间”，输入关键词“照片”, 对应照片编号为" + uploadIndex;
		if (uploadIndex < 9) {
			uploadIndex++;
		} else {
			uploadIndex = 1;
		}
	}).catch(function (err) {
		var time = document.getElementById("Time");
		time.innerHTML = "上传失败"
		console.log(err);
	});
}

/**
 * 生成文件名
 * @returns
 */
function timestamp() {
	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();

	console.log(y);

	return "" + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s);
}

function add0(m) {
	return m < 10 ? '0' + m : m;
}

function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(',');
	var mime = arr[0].match(/:(.*?);/)[1];
	var bstr = atob(arr[1]);
	var n = bstr.length;
	var u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}

function blobToFile(blob, fileName) {
	blob.lastModifiedDate = new Date();
	blob.name = fileName;
	return blob;
}

function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	var blob = dataURLtoBlob(dataurl);
	return blobToFile(blob, filename);
}

function processPut() {
	var time = document.getElementById("Time");
	time.innerHTML = "上传中，请等待..."
	var ascill_selector = document.querySelector("#ascii");
	console.log("ascill_selector:", ascill_selector);
	// var width = ascill_selector.offsetWidth;
	// var height = ascill_selector.offsetHeight;
	var forSize = document.getElementById("ascii");
	var width = forSize.clientWidth;
	var height = forSize.clientHeight;
	
	//下面本来会用一种提升图像分辨率的方法，但会导致兼容很差，所以暂时取消相关代码
	// var scale = 2;	
	console.log("clientWidth:", width);
	console.log("clientHeight:", height);

	var lastcanvas = document.getElementById("canvas_photo" + uploadIndex);
	console.log("lastcanvas", lastcanvas)

	if (lastcanvas) {
		var imgParent = lastcanvas.parentNode;
		imgParent.removeChild(lastcanvas);	
	}
	

	var canvas = document.createElement("canvas");
	// canvas.width = width * scale;
	// canvas.height = height * scale;
	canvas.width = width;
	canvas.height = height;
	// canvas.getContext("2d").scale(scale, scale);
	html2canvas(ascill_selector, {
		canvas: canvas,
		width: width,
		height: height,
		timeout: 1500
	}).then(canvas => {
		// canvas.getContext("2d").scale(scale, scale);	
		canvas.setAttribute('id', "canvas_photo" + uploadIndex);
		canvas.setAttribute('class', "canvas_photo");
		document.body.appendChild(canvas)	
		on_click_upload_file()
	});
}

var method = {
	countdownObj: {
		timer: null,
		changeTime: 0,
	},
	countdown: function (long, back) {
		var that = this;
		if (that.countdownObj.timer) {
			clearInterval(that.countdownObj.timer);
		}
		that.countdownObj.changeTime = long;
		back(that.countdownObj.changeTime);
		that.countdownObj.timer = setInterval(function () {
			that.countdownObj.changeTime--;
			back(that.countdownObj.changeTime);
			if (that.countdownObj.changeTime < 1) {
				clearInterval(that.countdownObj.timer);
			}
		}, 1000);
	}
};

var redSelector = document.querySelector("#red");
redSelector.value = 0.299;
var greenSelector = document.querySelector("#green");
greenSelector.value = 0.587;
var blueSelector = document.querySelector("#blue");
blueSelector.value = 0.114;
var rVal = document.getElementById("rVal");
var gVal = document.getElementById("gVal");
var bVal = document.getElementById("bVal");
rVal.innerHTML = "R: " + redSelector.value + " (R+/T-)";
gVal.innerHTML = "G: " + greenSelector.value + " (G+/H-)";
bVal.innerHTML = "B: " + blueSelector.value + " (B+/N-)";
function rangeValue() {
	var redValue = redSelector.value;
	var greenValue = blueSelector.value;
	var blueValue = greenSelector.value;
	console.log("rgb:", redValue, ',', greenValue, ',', blueValue);
};
redSelector.addEventListener("input", rangeValue);
greenSelector.addEventListener("input", rangeValue);
blueSelector.addEventListener("input", rangeValue);

document.onkeydown = function (event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	console.log(e)
	if(e){
		//这类的变化量要和input的step一致，都是0.01
		//R+ : R
		if(e.keyCode == 82){
			redSelector.value = parseFloat(redSelector.value) + 0.01;
		}else if (e.keyCode == 84) {
			redSelector.value = parseFloat(redSelector.value) - 0.01;
		}
		//G+ : G
		if (e.keyCode == 71) {
			greenSelector.value = parseFloat(greenSelector.value) + 0.01;
		}
		//G- : H
		if (e.keyCode == 72) {
			greenSelector.value = parseFloat(greenSelector.value) - 0.01;
		}
		//B+ : B
		if (e.keyCode == 66) {
			blueSelector.value = parseFloat(blueSelector.value) + 0.01;
		}
		//B- : N
		if (e.keyCode == 78) {
			blueSelector.value = parseFloat(blueSelector.value) - 0.01;
		}
		var rVal = document.getElementById("rVal");
		var gVal = document.getElementById("gVal");
		var bVal = document.getElementById("bVal");
		rVal.innerHTML = "R: " + redSelector.value + " (R+/T-)";
		gVal.innerHTML = "G: " + greenSelector.value + " (G+/H-)";
		bVal.innerHTML = "B: " + blueSelector.value + " (B+/N-)";
		
		console.log("rgb:", redSelector.value, ',', greenSelector.value, ',', blueSelector.value);
	}
};
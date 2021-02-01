// Author: Andrei Gheorghe (http://github.com/idevelop)

var ascii = (function() {
	function asciiFromCanvas(canvas, options) {
		// Original code by Jacob Seidelin (http://www.nihilogic.dk/labs/jsascii/)
		// Heavily modified by Andrei Gheorghe (http://github.com/idevelop)

		/**
		 * 如果是浅色背景，深色字体，从小到大
		 * 如果是深色背景，浅色字体，从大到小
		 */
		// var characters = (".,:;i1tfLCG08@").split("");
		// var characters = ("@80GCLft1;:,.").split("");
		var characters = ("80GCLft1;:,.").split("");
		// var characters = ("@80GCLft1").split("");
		// var characters = ("@80GCLft1;:").split("");
		// var characters = (" .○☼•❄").split("");
		// var characters = (" .;-:!>7?Co$QHNM").split("");
		// var characters = (";irsXA253hMHGS#9B@").split("");
		// var characters = (";irsxSXAMHGS#9B@").split("");
		// var characters = (".,:;i1tfLCG08").split("");
		// var characters = (".,:;i1tfLCG08").split("");
		// var characters = ("一十大木本米菜数簇龍龘").split("");
		// var characters = (".,:;codxkO0KXN").split("");
		// var characters = (".,`'\"^:;-~=+*ixcnaeomlfh1IEUOQWX%#$&@").split("");
		// var characters = (".,`'\"^:;-~=+*ixcnaeomlfh1IEUOQWX%#$&@").split("");
		// var characters = ("@&$#%XWQOUEI1hflmoeancxi*+=~-;:.").split("");
		// var characters = (".,`'\"^:;-~=+*ixcnaeomlfh1IEUOQWX%#$&").split("");
		var context = canvas.getContext("2d");
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;
		
		var asciiCharacters = "";

		// calculate contrast factor
		// http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
		var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));

		var imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
		for (var y = 0; y < canvasHeight; y += 2) { // every other row because letters are not square
			for (var x = 0; x < canvasWidth; x++) {
				// get each pixel's brightness and output corresponding character

				var offset = (y * canvasWidth + x) * 4;

				var color = getColorAtOffset(imageData.data, offset);
	
				// increase the contrast of the image so that the ASCII representation looks better
				// http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
				var contrastedColor = {
					red: bound(Math.floor((color.red - 128) * contrastFactor) + 128, [0, 255]),
					green: bound(Math.floor((color.green - 128) * contrastFactor) + 128, [0, 255]),
					blue: bound(Math.floor((color.blue - 128) * contrastFactor) + 128, [0, 255]),
					alpha: color.alpha
				};

				// calculate pixel brightness
				// http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
				const redSelector = document.querySelector("#red");
				const red = redSelector.value;
				const greenSelector = document.querySelector("#green");
				const green = greenSelector.value;
				const blueSelector = document.querySelector("#blue");
				const blue = blueSelector.value;

				var brightness = (red * contrastedColor.red + green * contrastedColor.green + blue * contrastedColor.blue) / 255;

				//几种参考的数值，现在默认第一种

				// var brightness = (0.299 * contrastedColor.red + 0.587 * contrastedColor.green + 0.114 * contrastedColor.blue) / 255;

				// var brightness = (0.2126 * contrastedColor.red + 0.7152 * contrastedColor.green + 0.0722 * contrastedColor.blue) / 255;

				// var brightness = Math.sqrt((0.299 * contrastedColor.red)^2 + (0.587 * contrastedColor.green)^2 + (0.114 * contrastedColor.blue)^2) / 255;


				var character = characters[(characters.length - 1) - Math.round(brightness * (characters.length - 1))];

				asciiCharacters += character;
			}

			asciiCharacters += "\n";
		}

		options.callback(asciiCharacters);
	}

	function getColorAtOffset(data, offset) {
		return {
			red: data[offset],
			green: data[offset + 1],
			blue: data[offset + 2],
			alpha: data[offset + 3]
		};
	}

	function bound(value, interval) {
		return Math.max(interval[0], Math.min(interval[1], value));
	}

	return {
		fromCanvas: function(canvas, options) {
			options = options || {};
			options.contrast = (typeof options.contrast === "undefined" ? 128 : options.contrast);
			options.callback = options.callback || doNothing;

			return asciiFromCanvas(canvas, options);
		}
	};
})();

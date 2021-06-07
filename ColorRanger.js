/*
 * color-ranger v1.0.0 Copyright (c) 2021 AJ Savino
 * https://github.com/koga73/color-ranger
 * MIT License
 */
class ColorRanger {
	constructor(props) {
		this.init(props);
	}

	init({valueHigh, valueLow, colorHigh, colorMid, colorLow} = {}) {
		this.valueHigh = typeof valueHigh !== typeof undefined ? valueHigh : 1;
		this.valueLow = typeof valueLow !== typeof undefined ? valueLow : -1;
		this.colorHigh = typeof colorHigh !== typeof undefined ? colorHigh : "#FF0000"; //Red
		this.colorMid = typeof colorMid !== typeof undefined ? colorMid : "#FFFFFF"; //White
		this.colorLow = typeof colorLow !== typeof undefined ? colorLow : "#0000FF"; //Blue

		//Break apart colors
		this._hexMid = this.stringToHex(this.colorMid);
		this._rgbLow = this.splitRGB(this.stringToHex(this.colorHigh));
		this._rgbMid = this.splitRGB(this.stringToHex(this.colorMid));
		this._rgbHigh = this.splitRGB(this.stringToHex(this.colorLow));
		this._rgbDiffMidLow = {
			r: this._rgbMid.r - this._rgbLow.r,
			g: this._rgbMid.g - this._rgbLow.g,
			b: this._rgbMid.b - this._rgbLow.b
		};
		this._rgbDiffHighMid = {
			r: this._rgbHigh.r - this._rgbMid.r,
			g: this._rgbHigh.g - this._rgbMid.g,
			b: this._rgbHigh.b - this._rgbMid.b
		};
	}

	//Takes in a value within the range and returns the appropriate hex color for the value
	computeHexFromValue(val) {
		const {valueHigh, valueLow, colorHigh, colorMid, colorLow, _hexMid, _rgbLow, _rgbMid, _rgbHigh, _rgbDiffMidLow, _rgbDiffHighMid} = {...this};

		let color = _hexMid;

		if (colorHigh && colorHigh !== "" && colorLow && colorLow !== "") {
			//Clamp
			const value = Math.max(Math.min(val, valueHigh), valueLow);

			//Move into range
			const range = valueHigh - valueLow;
			const valInRange = value - valueLow;
			const valPercent = (valInRange / range).toFixed(2);

			//Determine color!
			color = valPercent < 0.5 ? this.combineRGB(1 - valPercent / 0.5, _rgbMid, _rgbDiffHighMid) : this.combineRGB(1 - (valPercent - 0.5) / 0.5, _rgbLow, _rgbDiffMidLow);
		}

		return this.hexToString(color);
	}

	//Splits decimal into RGB channels
	splitRGB(dec) {
		return {
			r: (dec & 0xff0000) >>> 16,
			g: (dec & 0x00ff00) >>> 8,
			b: (dec & 0x0000ff) >>> 0
		};
	}

	//Takes in a percent and outputs a color between low and high
	combineRGB(percent, rgbLow, rgbDiff) {
		let color = 0x000000;
		color |= (percent * rgbDiff.r + rgbLow.r) << 16;
		color |= (percent * rgbDiff.g + rgbLow.g) << 8;
		color |= (percent * rgbDiff.b + rgbLow.b) << 0;
		return color;
	}

	//Convert string "#FFFFFF" to hex 0xFFFFFF
	stringToHex(str) {
		return parseInt(str.replace(/^#/, "0x"), 16);
	}

	//Convert hex 0xFFFFFF to string "#FFFFFF"
	//https://stackoverflow.com/a/33622834/3610169
	hexToString(dec) {
		return "#" + (dec + Math.pow(16, 6)).toString(16).substr(-6);
	}
}
module.exports = ColorRanger;

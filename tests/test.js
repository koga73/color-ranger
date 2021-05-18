#!/usr/bin/env node

//This file contains unit tests for NodeJS

const expect = require("chai").expect;

const ColorRanger = require("../ColorRanger.js");

describe("--- HEX ---\n", function () {
	const ranger = new ColorRanger();

	it("COLOR LOW: -1", function () {
		expect(ranger.computeHexFromValue(-1)).equal("#0000ff");
	});
	it("COLOR LOW-MID: -0.5", function () {
		expect(ranger.computeHexFromValue(-0.5)).equal("#7f7fff");
	});
	it("COLOR MID: 0", function () {
		expect(ranger.computeHexFromValue(0)).equal("#ffffff");
	});
	it("COLOR MID-HIGH: 0.5", function () {
		expect(ranger.computeHexFromValue(0.5)).equal("#ff7f7f");
	});
	it("COLOR HIGH: 1", function () {
		expect(ranger.computeHexFromValue(1)).equal("#ff0000");
	});
});

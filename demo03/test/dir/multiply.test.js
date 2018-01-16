var multiply = require('../../src/multiply');
var expect = require('chai').expect;

describe('乘法函数的测试', function() {
    it('1 乘 1 应该等于 1', function() {
        expect(multiply(1, 1)).to.be.equal(1);
    });
    it.skip('0 乘 任何数 应该等于 0', function() {
        expect(multiply(0, 0)).to.be.equal(0);
        expect(multiply(0, 1)).to.be.equal(0);
    });
})
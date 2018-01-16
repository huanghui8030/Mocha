var add = require('../add.js');
var expect = require('chai').expect;    

describe('test/add.test.js-- 加法函数的测试', function() {
    it('1 加 1 等于 2', function() {
        expect(add(1, 1)).to.be.equal(2);
    });
    it('1 加 2 不等于 2', function() {
        expect(add(1, 2)).to.not.equal(2);
    });

    it('3 加 2 等于 5', function() {
      expect(add(3, 2)).to.equal(5);  
    });   

});
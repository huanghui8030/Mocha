/**
 * 下面的测试用例，需要4000毫秒之后，才有运行结果。所以，需要用-t或--timeout参数，改变默认的超时设置
 * $ mocha -t 5000 timeout.test.js  
 */

var expect = require('chai').expect;

describe('timeout.test.js - 超时测试', function() {
    it('测试应该 1000 毫秒后结束', function(done) {
        var x = true;
        expect(x).to.be.ok;
        var f = function() {
            x = false;
            expect(x).to.be.not.ok;
            done();
        };
        setTimeout(f, 1000);
    });

    it('测试应该 2000 毫秒后结束', function(done) {
        var x = true;
        expect(x).to.be.ok;
        var f = function() {
            x = false;
            expect(x).to.be.not.ok;
            done();
        };
        setTimeout(f, 2000);
    });
});
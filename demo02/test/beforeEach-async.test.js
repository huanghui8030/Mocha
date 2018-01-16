var expect = require('chai').expect;

describe("beforeEach-async异步示例-beforeEach-async.test.js", function(){
    var foo = false;

    beforeEach(function(done){
        setTimeout(function(){
            foo = true;
            done();
        }, 500);
    });

    it("全局变量异步修改应该成功", function(){
        expect(foo).to.be.equal(true);
    });
});

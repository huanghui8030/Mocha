//assert断言风格
var add = require('../add.js');
var assert = require('chai').assert;

describe('add.assert --数组和add()', function() {
    var tests = [
        { args: [1, 2], expected: 3 },
        { args: [1, 2, 3], expected: 6 },
        { args: [1, 2, 3, 4], expected: 10 },
        { args: [1, 2, 3, 4, 10], expected: 20 }
    ];

    tests.forEach(function(test) {
        it('集合中添加参数的个数： ' + test.args.length + ' 个', function() {
            var res = add.apply(null, test.args);
            assert.equal(res, test.expected);
        });
    });
});
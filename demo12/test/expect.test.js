var expect = chai.expect;

/*var getFirstIndex = require('header-menu.js');
var expect = require('chai').expect;*/

describe('获取一级菜单序列号getFirstIndex方法', function() {

    it('高等教育信息gdjy', function() {
        expect(getFirstIndex('gdjy')).to.be.equal(0);
    });
    it('在线验证报告bab', function() {
        expect(getFirstIndex('bab')).to.be.equal(1);
    });
    it('学历与成绩认证rzbg', function() {
        expect(getFirstIndex('rzbg')).to.be.equal(2);
    });
    it('国际合作申请gjhz、xw、gdxw', function() {
        expect(getFirstIndex('gjhz')).to.be.equal(3);
        expect(getFirstIndex('xw')).to.be.equal(3);
        expect(getFirstIndex('gdxw')).to.be.equal(3);
    });
    it('调查/投票survey、zytj、myd', function() {
        expect(getFirstIndex('survey')).to.be.equal(4);
        expect(getFirstIndex('zytj')).to.be.equal(4);
        expect(getFirstIndex('myd')).to.be.equal(4);
    });
    it('其他值，则默认返回0，选中高等教育信息菜单', function() {
        expect(getFirstIndex('xz')).to.be.equal(0);
    });
});














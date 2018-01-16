var should = require( 'should' );
var User   = require( '../js/User' );

// 描述 User 行为
describe( 'User-User.test.js', function () {

    // 在执行所有测试前, 执行 before(), 添加数据
    before( function () {
        User.save( 'BTest' );
    } );

    // 在执行每个测试前, 执行 beforeEach(), 添加数据
    beforeEach( function () {
        User.save( 'ATest' );
    } );

    // 描述 User.save 行为
    describe( '#save', function () {

        // 保存 DTest 用户成功.
        it( '保存 "DTest" 成功.', function () {
            User.save( 'DTest' );
            User.contains( 'DTest' ).should.be.exactly( true );
        } );
    } );

    // 描述 User.contains 行为
    describe( '#contains', function () {

        // 应该存在 ATest 用户
        it( '"ATest" 已经存在', function () {
            User.contains( 'ATest' ).should.be.exactly( true );
        } );
        it( '"BTest" 已经存在', function () {
            User.contains( 'BTest' ).should.be.exactly( true );
        } );
        // 应该不存在 CTest 用户
        it( '"CTest" 不存在', function () {
            User.contains( 'CTest' ).should.be.exactly( false );
        } );
    } );

    // 在执行完每个测试后, 清空数据.
    afterEach( function () {
        User.delete( 'ATest' );
    } );


    // 在执行完每个测试后, 清空数据.
    after( function () {
        User.delete( 'ATest' );
    } );
} );
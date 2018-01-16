# 单元测试框架Mocha

## 1、什么是Mocha

### 1.1 什么是单元测试

- 单元测试又称为模块测试，是针对程序模块(软件设计的最小单位)来进行正确性检验的测试工作。
- 单元测试主要是用来检验程式的内部逻辑，也称为个体测试、结构测试或逻辑驱动测试。
- 通常由撰写程式码的程式设计师负责进行

### 1.2、单元测试的必要性

- 由于存在浏览器解析环境、用户操作习惯等差异，前端程序的许多问题是无法捕捉或重现的，现在前端程序的测试多是黑盒测试，即靠点击点击点击来寻找程序bug。这种方式既费时费力，又无法保证测试的覆盖面。
- 同时，前端逻辑和交互越来越复杂，和其他编程语言一样，一个函数，一个模块，在修改bug或添加新功能的过程中，很容易就产生新的bug，或使老的bug复活。这种情况下，反复进行黑盒测试，其工作量和测试质量是可想而知的。
- 为什么我们的前端程序如此脆弱？就是因为没用单元测试

### 1.3 mocha的特点
- 既可以测试简单的JavaScript函数，又可以测试异步代码，因为异步是JavaScript的特性之一；
- 可以自动运行所有测试，也可以只运行特定的测试；
- 可以支持before、after、beforeEach和afterEach来编写初始化代码。

### 1.4 为什么选择Mocha
- start数目多，最热门，API比较全。


## 2、Mocha用法

### 2.1 实例

a、安装

全局：npm install --global mocha

项目依赖：npm install --save-dev mocha

b、创建项目，并新建测试文件 common.js

c、写测试脚本common.test.js

```javascript
var assert = require("assert");
describe('Array', function(){
    describe('#indexOf()', function(){
        it('不包含时，返回的数据是否为-1', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
});
```

- describe (moduleName, testDetails)
  由上述代码可看出，describe是可以嵌套的，比如上述代码嵌套的两个describe就可以理解成测试人员希望测试Array模块下的#indexOf() 子模块。module_name 是可以随便取的，关键是要让人读明白就好。
- it (info, function)
  具体的测试语句会放在it的回调函数里，一般来说info字符串会写期望的正确输出的简要一句话文字说明。当该it block内的test failed的时候控制台就会把详细信息打印出来。一般是从最外层的describe的module_name开始输出（可以理解成沿着路径或者递归链或者回调链），最后输出info，表示该期望的info内容没有被满足。一个it对应一个实际的test case
- assert.equal (exp1, exp2)
  断言判断exp1结果是否等于exp2, 这里采取的等于判断是== 而并非 === 。即 assert.equal(1, ‘1’) 认为是True。这只是nodejs里的assert.js的一种断言形式，下文会提到同样比较常用的chai模块。

d、终端运行

```
mocha common.test.js
```

e、可在package.json中设置一个测试脚本

```
"scripts": {
    "test": "mocha"
  }
```

终端运行：npm test

### 2.2 mocha命令参数

mocha命令的基本格式是：`mocha [debug] [options] [files]`

options包括下面这些：

```javascript
     -h, --help                              输出帮助信息    
     -V, --version                           输出mucha版本    
     -A, --async-only                        强制让所有测试用例必须使用callback或者返回promise的方式来异步判断正确性    
     -c, --colors                            启用报告中颜色    
     -C, --no-colors                         禁用报告中颜色    
     -G, --growl                             enable growl notification support    
     -O, --reporter-options <k=v,k2=v2,...>  reporter-specific options    
     -R, --reporter <name>                   specify the reporter to use    
     -S, --sort                              排序测试文件    
     -b, --bail                              bail after first test failure    
     -d, --debug                             enable node s debugger, synonym for node --debug
     -g, --grep <pattern>                    只执行满足 <pattern>格式的用例    
     -f, --fgrep <string>                    只执行含有 <string> 的用例    
     -gc, --expose-gc                        展示gc回收的log    
     -i, --invert                            让 --grep 和 --fgrep 的匹配取反    
     -r, --require <name>                    require一下<name>指定的模块    
     -s, --slow <ms>                         指定slow时间（单位ms，默认75ms）    
     -t, --timeout <ms>                      指定超时时间（单位ms，默认2000ms）    
     -u, --ui <name>                         指定user-interface (bdd|tdd|exports)    
     -w, --watch                             观察用例文件变化，并重新执行    
     --check-leaks                           检测未回收global变量泄露    
     --compilers <ext>:<module>,...          用指定的模块来编译文件    
     --debug-brk                             启用node的debug模式    
     --delay                                 等待异步的用例集（见前边的）    
     --es_staging                            enable all staged features    
     --full-trace                            display the full stack trace    
     --globals <names>                       allow the given comma-delimited global [names]    
     --harmony                               enable all harmony features (except typeof)    
     --harmony-collections                   enable harmony collections (sets, maps, and weak maps)    
     --harmony-generators                    enable harmony generators    
     --harmony-proxies                       enable harmony proxies    
     --harmony_arrow_functions               enable "harmony arrow functions" (iojs)    
     --harmony_classes                       enable "harmony classes" (iojs)    
     --harmony_proxies                       enable "harmony proxies" (iojs)    
     --harmony_shipping                      enable all shipped harmony features (iojs)    
     --inline-diffs                          显示预期和实际结果的string差异比较    
     --interfaces                            display available interfaces    
     --no-deprecation                        silence deprecation warnings    
     --no-exit                               require a clean shutdown of the event loop: mocha will not call process.exit    
     --no-timeouts                           禁用timeout，可通过--debug隐式指定    
     --opts <path>                           定义option文件路径    
     --prof                                  显示统计信息    
     --recursive                             包含子目录    
     --reporters                             展示可用报告    
     --retries                               设置失败用例重试次数    
     --throw-deprecation                     每次调用deprecated函数的时候都抛出一个异常    
     --trace                                 显示函数调用栈    
     --trace-deprecation                     启用的时候显示调用栈    
     --watch-extensions <ext>,...            --watch监控的扩展  
```



### 3、mocha函数介绍

- 断言指的是对代码行为的预期。一个测试用例内部，包含一个或多个断言（assert）。断言会返回一个布尔值，表示代码行为是否符合预期。测试用例之中，只要有一个断言为false，这个测试用例就会失败，只有所有断言都为true，测试用例才会通过。

- [chai](http://chaijs.com/api/)是一个常常被拿来与 `mocha` 一起使用的断言库，提供了丰富的断言接口，可以对各种结果进行断言。https://segmentfault.com/a/1190000003949229

  - 三种风格的断言：BDD风格的expect和should，TDD风格 [assert](http://chaijs.com/guide/styles/) 。

  - `expect`和`should`是BDD风格的，二者使用相同的链式语言来组织断言，但不同在于他们初始化断言的方式：expect使用构造函数来创建断言对象实例，而should通过为Object.prototype新增方法来实现断言（所以should不支持IE）；`expect`直接指向`chai.expect`，而`should`则是`chai.should()`。

  - assert风格是三种断言风格中唯一不支持链式调用的，Chai提供的`assert`风格的断言和node.js包含的assert模块非常相似。

    - assert：

    这是来自老派测试驱动开发的经典的assert方式。比如：

    ```javascript
    assert.equal(variable, "value");
    expect(variable).to.equal("value");
    variable.should.equal("value");
    ```

    - expect：

    这种链式的断言方式在行为驱动开发中最为常见。比如：

    ```
    expect(variable).to.equal("value");
    ```

    - should：

    这也是在测试驱动开发中比较常用的方式之一。举例：

    ```
    variable.should.equal("value");
    ```

    建议使用`expect`

- expect 库应用是非常广泛的，它拥有很好的链式结构和仿自然语言的方法。通常写同一个断言会有几个方法，比如expect(response).to.be(true) 和 expect(response).equal(true)。以下列举了 expect 常用的主要方法：

  - ok ：检查是否为真
  - true：检查对象是否为真
  - to.be、to：作为连接两个方法的链式方法
  - not：链接一个否定的断言，如 expect(false).not.to.be(true)
  - a/an：检查类型（也适用于数组类型）
  - include/contain：检查数组或字符串是否包含某个元素
  - below/above：检查是否大于或者小于某个限定值

- [assert断言库](http://chaijs.com/api/assert/)，不可链式

  - assert（表达式，消息）：编写自己的测试表达式
  - fail（actual，expected，[message]，[operator]）
  - isOk（object，[message]）
  - isNotOk（object，[message]）
  - equal（实际，预期，[消息]）
  - assert.notEqual（实际，预期，[消息]）
  - strictEqual（实际，预期，[消息]）



## 4 单元测试方式

### hooks函数

Mocha.js 提供了四中钩子函数，分别是 before() ， after() ， beforeEach() ， afterEach() 。

- before()  将会在所有测试用例执行之前运行，用于同一的桩数据导入等功能；
- after()  则会在所有测试执行之后运行，用于清理测试环境，删除或回滚相关数据；
- beforeEach()  将会在每个测试用例执行前执行，可以用于准备测试用例所需的前置条件；
- afterEach()  将会在每个测试用例之后执行，可以用于准备测试用例所需的后置条件。

### 测试方法

#### 4.1、基于node执行

- mocha object.test.js

####  4.2、浏览器测试结果浏览

- 动态生成模板：`mocha init test`，其中test可为任意包名。

- 其中test.js是空的，需要自己写，建议将test.js改成object.test.js。

- 在html中添加断言库、对应需要测试的target.js、单元测试object.test.js。例如：
  - 添加断言：`<script src="http://chaijs.com/chai.js"></script>`
  - 添加需要测试的js：`<script src="target.js"></script>`
  - 添加单元测试js：`<script src="test.js"></script>`

#### 4.3、与gulp相结合来测试

- 安装测试工具mocha `npm install gulp-mocha --save-dev`

- 编写task

  ```javascript
  gulp.task('test-api', function () {
    return gulp.src('test.js')
      .pipe(mocha())
      .once('error', function () {
        process.exit(1);
      })
      .once('end', function () {
        process.exit();
      });
  });
  ```

- 在test.js中编写测试用例

  ```javascript
  var assert = require("assert");
  var rest = require("restler");//用来请求API接口的中间件
  var apiCtrl = require('../controllers/api');//api模块

  var baseUrl = 'http://localhost:9000/api';
  describe('测试', function () {
    it('this is assert', function (done) {
      rest.get(baseUrl + '/testAPI/1').on('success', function (res) {
        assert(res.result === 1);
        done();
      });
    });
  });
  ```

  ​



## 参考

- [mocha官网](https://mochajs.org/)
- https://www.awesomes.cn/repo/mochajs/mocha
- [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- http://www.cnblogs.com/Leo_wl/p/5734889.html
- [chai断言库](http://www.jianshu.com/p/f200a75a15d2)
- [【Mocha.js 101】钩子函数](http://www.cnblogs.com/litecodes/p/mocha-101-hooks.html)
- [SuperAgent](http://visionmedia.github.io/superagent/#test-documentation)​


> huanghui 20170905
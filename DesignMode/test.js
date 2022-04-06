/* 单例模式 */
// 简单单例

function RealSingleton(name) {
  this.name = name
}
RealSingleton.prototype.getName = function () { console.log(this.name) }
RealSingleton.prototype.getInstance = (function () {
  let instance
  return function (name) {
    if (!instance) {
      instance = new RealSingleton(name);
    }
    return instance;
  }
})()

// 不透明性 对于用户来说 我需要知道这是一个单例 所以改用getInstance而不是直接new
// 函数方法应该职责单一，而getInstance即管理着单例，又负责创建单例
function RealSingleton(name) {
  this.name = name
}

const Singleton = (function () {
  var instance
  return function (name) {
    if (!instance) {
      instance = new RealSingleton(name)
    }
    return instance
  }
})()

// 这个构建方法还可以进行抽离复用
const getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
};
const Singleton = getSingle(() => new RealSingleton(name))

// js中的单例 js本身的变量即可作为一个全局唯一的变量，但由于会造成变量污染，所以通常用闭包去实现
const obj = {}

const obj = (function () {
  let _obj
  return {
    getObj: () => _obj,
    setObj: (o) => _obj = o
  }
})()

// 单例通常指的是一个变量或者对象，每次获得，得到的是同一个，但这也可以是一个方法，再多次调用时，只在第一次进行调用。
const bindEvent = getSingle(function () {
  document.getElementById('div1').onclick = function () {
    alert('click');
  }
  return true;
});
const render = function () {
  console.log('开始渲染');
  bindEvent();
};

render();
render();
render();


/* 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。 */
// 策略模式，用一个Context去管理诸多算法，在不同情况时，使用不同方法去进行输出
var performanceS = function () { };
performanceS.prototype.calculate = function (salary) {
  return salary * 4;
};
var performanceA = function () { };
performanceA.prototype.calculate = function (salary) {
  return salary * 3;
};
var performanceB = function () { };
performanceB.prototype.calculate = function (salary) {
  return salary * 2;
};

var Bonus = function () {
  this.salary = null; // 原始工资
  this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function () { // 取得奖金数额
  return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS()); // 设置策略对象
console.log(bonus.getBonus()); // 输出：40000

// 在js中，函数是一等公民，可以直接通过对象去管理所有算法
const strategies = {
  "S": function (salary) {
    return salary * 4;
  },
  "A": function (salary) {
    return salary * 3;
  },
  "B": function (salary) {
    return salary * 2;
  }
};
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
};

/* 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问。 */
// 代理类与被代理类应具有相同接口，下面为简单的一个实现
function Something() { }
var xiaoming = {
  do: function (target) {
    const something = new Something()
    target.action(something);
  }
};
var B = {
  action: function (f) {
    // some other action
    A.action(f);
  }
};
var A = {
  action: function (f) {
    console.log('a action' + f);
  }
};
xiaoming.do(B);

// 代理的目的可能有很多，
//  例如通过代理过滤、拒绝掉一些请求，这样的称为保护代理。
//  另外像new 一个something的代价昂贵，我们可以通过代理类去在合适时机进行new，这样的代理称为虚拟代理
//  缓存代理：去缓存某些开销大的结果 防火墙代理：控制网络资源的访问
// 虚拟家在实现图片加载
var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();
var proxyImage = (function () {
  var img = new Image;
  img.onload = function () {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
      img.src = src;
    }
  }
})();
proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');
// 用高阶函数创建代理
/**************** 计算乘积 *****************/
var mult = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
/**************** 计算加和 *****************/
var plus = function () {
  var a = 0;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }
  return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
};
var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus);
alert(proxyMult(1, 2, 3, 4)); // 输出：24 
alert(proxyMult(1, 2, 3, 4)); // 输出：24 
alert(proxyPlus(1, 2, 3, 4)); // 输出：10 
alert(proxyPlus(1, 2, 3, 4)); // 输出：10

/* 迭代器模式 */
// 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
// 迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
// 在现代高级语言中，例如 Array.prototype.forEach 即是使用了迭代器模式

// 当我们需要对很多条件依次进行处理的时候，可以将这些条件聚合到一个对象中，使用迭代器的模式去出去他们，例如兼容性处理
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (e) {
    return false;
  }
};
var getFlashUploadObj = function () {
  if (supportFlash()) { // supportFlash 函数未提供
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $(str).appendTo($('body'));
  }
  return false;
};
var getFormUpladObj = function () {
  var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
  return $(str).appendTo($('body'));
};
var iteratorUploadObj = function () {
  for (var i = 0, fn; fn = arguments[i++];) {
    var uploadObj = fn();
    if (uploadObj !== false) {
      return uploadObj;
    }
  }
};
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);

/* 发布订阅（观察者模式）*/
// 它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
// 在 JavaScript 开发中，我们通常可以用事件模型来替代传统的发布—订阅模式。
var Observer = {};
Observer.clientList = [];
Observer.listen = function (fn) {
  this.clientList.push(fn);
};
Observer.trigger = function () {
  for (var i = 0, fn; fn = this.clientList[i++];) {
    fn.apply(this, arguments);
  }
};
Observer.listen(() => console.log(1));
Observer.listen(() => console.log(2));
Observer.trigger('tigger');

// 发布订阅的通用实现
var Event = (function () {
  var clientList = {},
    listen,
    trigger,
    remove;
  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function () {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };
  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return { listen, trigger, remove }
})();
Event.listen('squareMeter88', function (price) {
  console.log('价格= ' + price);
});
Event.trigger('squareMeter88', 2000000);
/* 命令模式 */
// 命令模式是最简单和优雅的模式之一，命令模式中的命令指的是一个执行某些特定事情的指令。
// 传统的实现




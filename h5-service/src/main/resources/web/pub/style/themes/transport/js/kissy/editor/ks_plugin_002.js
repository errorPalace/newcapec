/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:17
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 node/base
 node/attach
 node/override
 node/anim
 node
*/

KISSY.add("node/base", ["dom", "event/dom"], function(S, require) {
  var Dom = require("dom");
  var Event = require("event/dom");
  var AP = Array.prototype, slice = AP.slice, NodeType = Dom.NodeType, push = AP.push, makeArray = S.makeArray, isNodeList = Dom.isDomNodeList;
  function NodeList(html, props, ownerDocument) {
    var self = this, domNode;
    if(!(self instanceof NodeList)) {
      return new NodeList(html, props, ownerDocument)
    }
    if(!html) {
      return self
    }else {
      if(typeof html === "string") {
        domNode = Dom.create(html, props, ownerDocument);
        if(domNode.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
          push.apply(this, makeArray(domNode.childNodes));
          return self
        }
      }else {
        if(S.isArray(html) || isNodeList(html)) {
          push.apply(self, makeArray(html));
          return self
        }else {
          domNode = html
        }
      }
    }
    self[0] = domNode;
    self.length = 1;
    return self
  }
  NodeList.prototype = {constructor:NodeList, isNodeList:true, length:0, item:function(index) {
    var self = this;
    if(typeof index === "number") {
      if(index >= self.length) {
        return null
      }else {
        return new NodeList(self[index])
      }
    }else {
      return new NodeList(index)
    }
  }, add:function(selector, context, index) {
    if(typeof context === "number") {
      index = context;
      context = undefined
    }
    var list = NodeList.all(selector, context).getDOMNodes(), ret = new NodeList(this);
    if(index === undefined) {
      push.apply(ret, list)
    }else {
      var args = [index, 0];
      args.push.apply(args, list);
      AP.splice.apply(ret, args)
    }
    return ret
  }, slice:function() {
    return new NodeList(slice.apply(this, arguments))
  }, getDOMNodes:function() {
    return slice.call(this)
  }, each:function(fn, context) {
    var self = this;
    S.each(self, function(n, i) {
      n = new NodeList(n);
      return fn.call(context || n, n, i, self)
    });
    return self
  }, getDOMNode:function() {
    return this[0]
  }, end:function() {
    var self = this;
    return self.__parent || self
  }, filter:function(filter) {
    return new NodeList(Dom.filter(this, filter))
  }, all:function(selector) {
    var ret, self = this;
    if(self.length > 0) {
      ret = NodeList.all(selector, self)
    }else {
      ret = new NodeList
    }
    ret.__parent = self;
    return ret
  }, one:function(selector) {
    var self = this, all = self.all(selector), ret = all.length ? all.slice(0, 1) : null;
    if(ret) {
      ret.__parent = self
    }
    return ret
  }};
  S.mix(NodeList, {all:function(selector, context) {
    if(typeof selector === "string" && (selector = S.trim(selector)) && selector.length >= 3 && S.startsWith(selector, "<") && S.endsWith(selector, ">")) {
      if(context) {
        if(context.getDOMNode) {
          context = context[0]
        }
        context = context.ownerDocument || context
      }
      return new NodeList(selector, undefined, context)
    }
    return new NodeList(Dom.query(selector, context))
  }, one:function(selector, context) {
    var all = NodeList.all(selector, context);
    return all.length ? all.slice(0, 1) : null
  }});
  NodeList.NodeType = NodeType;
  NodeList.KeyCode = Event.KeyCode;
  NodeList.Gesture = Event.Gesture;
  NodeList.REPLACE_HISTORY = Event.REPLACE_HISTORY;
  return NodeList
});
KISSY.add("node/attach", ["dom", "event/dom", "./base"], function(S, require) {
  var Dom = require("dom");
  var Event = require("event/dom");
  var NodeList = require("./base");
  var NLP = NodeList.prototype, makeArray = S.makeArray, DOM_INCLUDES_NORM = ["nodeName", "isCustomDomain", "getEmptyIframeSrc", "equals", "contains", "index", "scrollTop", "scrollLeft", "height", "width", "innerHeight", "innerWidth", "outerHeight", "outerWidth", "addStyleSheet", "appendTo", "prependTo", "insertBefore", "before", "after", "insertAfter", "test", "hasClass", "addClass", "removeClass", "replaceClass", "toggleClass", "removeAttr", "hasAttr", "hasProp", "scrollIntoView", "remove", "empty", 
  "removeData", "hasData", "unselectable", "wrap", "wrapAll", "replaceWith", "wrapInner", "unwrap"], DOM_INCLUDES_NORM_NODE_LIST = ["getWindow", "getDocument", "filter", "first", "last", "parent", "closest", "next", "prev", "clone", "siblings", "contents", "children"], DOM_INCLUDES_NORM_IF = {attr:1, text:0, css:1, style:1, val:0, prop:1, offset:0, html:0, outerHTML:0, outerHtml:0, data:1}, EVENT_INCLUDES_SELF = ["on", "detach", "delegate", "undelegate"], EVENT_INCLUDES_RET = ["fire", "fireHandler"];
  NodeList.KeyCode = Event.KeyCode;
  function accessNorm(fn, self, args) {
    args.unshift(self);
    var ret = Dom[fn].apply(Dom, args);
    if(ret === undefined) {
      return self
    }
    return ret
  }
  function accessNormList(fn, self, args) {
    args.unshift(self);
    var ret = Dom[fn].apply(Dom, args);
    if(ret === undefined) {
      return self
    }else {
      if(ret === null) {
        return null
      }
    }
    return new NodeList(ret)
  }
  function accessNormIf(fn, self, index, args) {
    if(args[index] === undefined && !S.isObject(args[0])) {
      args.unshift(self);
      return Dom[fn].apply(Dom, args)
    }
    return accessNorm(fn, self, args)
  }
  S.each(DOM_INCLUDES_NORM, function(k) {
    NLP[k] = function() {
      var args = makeArray(arguments);
      return accessNorm(k, this, args)
    }
  });
  S.each(DOM_INCLUDES_NORM_NODE_LIST, function(k) {
    NLP[k] = function() {
      var args = makeArray(arguments);
      return accessNormList(k, this, args)
    }
  });
  S.each(DOM_INCLUDES_NORM_IF, function(index, k) {
    NLP[k] = function() {
      var args = makeArray(arguments);
      return accessNormIf(k, this, index, args)
    }
  });
  S.each(EVENT_INCLUDES_SELF, function(k) {
    NLP[k] = function() {
      var self = this, args = makeArray(arguments);
      args.unshift(self);
      Event[k].apply(Event, args);
      return self
    }
  });
  S.each(EVENT_INCLUDES_RET, function(k) {
    NLP[k] = function() {
      var self = this, args = makeArray(arguments);
      args.unshift(self);
      return Event[k].apply(Event, args)
    }
  })
});
KISSY.add("node/override", ["dom", "./base", "./attach"], function(S, require) {
  var Dom = require("dom");
  var NodeList = require("./base");
  require("./attach");
  var NLP = NodeList.prototype;
  S.each(["append", "prepend", "before", "after"], function(insertType) {
    NLP[insertType] = function(html) {
      var newNode = html, self = this;
      if(typeof newNode === "string") {
        newNode = Dom.create(newNode)
      }
      if(newNode) {
        Dom[insertType](newNode, self)
      }
      return self
    }
  });
  S.each(["wrap", "wrapAll", "replaceWith", "wrapInner"], function(fixType) {
    var orig = NLP[fixType];
    NLP[fixType] = function(others) {
      var self = this;
      if(typeof others === "string") {
        others = NodeList.all(others, self[0].ownerDocument)
      }
      return orig.call(self, others)
    }
  })
});
KISSY.add("node/anim", ["./base", "dom", "anim"], function(S, require) {
  var Node = require("./base");
  var Dom = require("dom");
  var Anim = require("anim");
  var FX = [["height", "margin-top", "margin-bottom", "padding-top", "padding-bottom"], ["width", "margin-left", "margin-right", "padding-left", "padding-right"], ["opacity"]];
  function getFxs(type, num, from) {
    var ret = [], obj = {};
    for(var i = from || 0;i < num;i++) {
      ret.push.apply(ret, FX[i])
    }
    for(i = 0;i < ret.length;i++) {
      obj[ret[i]] = type
    }
    return obj
  }
  S.augment(Node, {animate:function() {
    var self = this, originArgs = S.makeArray(arguments);
    S.each(self, function(elem) {
      var args = S.clone(originArgs), arg0 = args[0];
      if(arg0.to) {
        arg0.node = elem;
        (new Anim(arg0)).run()
      }else {
        Anim.apply(undefined, [elem].concat(args)).run()
      }
    });
    return self
  }, stop:function(end, clearQueue, queue) {
    var self = this;
    S.each(self, function(elem) {
      Anim.stop(elem, end, clearQueue, queue)
    });
    return self
  }, pause:function(end, queue) {
    var self = this;
    S.each(self, function(elem) {
      Anim.pause(elem, queue)
    });
    return self
  }, resume:function(end, queue) {
    var self = this;
    S.each(self, function(elem) {
      Anim.resume(elem, queue)
    });
    return self
  }, isRunning:function() {
    var self = this;
    for(var i = 0;i < self.length;i++) {
      if(Anim.isRunning(self[i])) {
        return true
      }
    }
    return false
  }, isPaused:function() {
    var self = this;
    for(var i = 0;i < self.length;i++) {
      if(Anim.isPaused(self[i])) {
        return true
      }
    }
    return false
  }});
  S.each({show:getFxs("show", 3), hide:getFxs("hide", 3), toggle:getFxs("toggle", 3), fadeIn:getFxs("show", 3, 2), fadeOut:getFxs("hide", 3, 2), fadeToggle:getFxs("toggle", 3, 2), slideDown:getFxs("show", 1), slideUp:getFxs("hide", 1), slideToggle:getFxs("toggle", 1)}, function(v, k) {
    Node.prototype[k] = function(duration, complete, easing) {
      var self = this;
      if(Dom[k] && !duration) {
        Dom[k](self)
      }else {
        S.each(self, function(elem) {
          (new Anim(elem, v, duration, easing, complete)).run()
        })
      }
      return self
    }
  })
});
KISSY.add("node", ["node/base", "node/attach", "node/override", "node/anim"], function(S, require) {
  var Node = require("node/base");
  require("node/attach");
  require("node/override");
  require("node/anim");
  S.mix(S, {Node:Node, NodeList:Node, one:Node.one, all:Node.all});
  return Node
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Feb 26 18:57
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 dom/base/api
 dom/base/attr
 dom/base/class
 dom/base/create
 dom/base/data
 dom/base/insertion
 dom/base/offset
 dom/base/style
 dom/base/selector
 dom/base/traversal
 dom/base
*/

KISSY.add("dom/base/api", [], function(S) {
  var WINDOW = S.Env.host || {}, DOCUMENT = WINDOW.document, UA = S.UA, RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, NodeType = {ELEMENT_NODE:1, ATTRIBUTE_NODE:2, TEXT_NODE:3, CDATA_SECTION_NODE:4, ENTITY_REFERENCE_NODE:5, ENTITY_NODE:6, PROCESSING_INSTRUCTION_NODE:7, COMMENT_NODE:8, DOCUMENT_NODE:9, DOCUMENT_TYPE_NODE:10, DOCUMENT_FRAGMENT_NODE:11, NOTATION_NODE:12}, Dom = {isCustomDomain:function(win) {
    win = win || WINDOW;
    win = Dom.get(win);
    var domain = win.document.domain, hostname = win.location.hostname;
    return domain !== hostname && domain !== "[" + hostname + "]"
  }, getEmptyIframeSrc:function(win) {
    win = win || WINDOW;
    win = Dom.get(win);
    if(UA.ie && Dom.isCustomDomain(win)) {
      return"javascript:void(function(){" + encodeURIComponent("document.open();" + 'document.domain="' + win.document.domain + '";' + "document.close();") + "}())"
    }
    return""
  }, NodeType:NodeType, getWindow:function(elem) {
    if(!elem) {
      return WINDOW
    }
    elem = Dom.get(elem);
    if(S.isWindow(elem)) {
      return elem
    }
    var doc = elem;
    if(doc.nodeType !== NodeType.DOCUMENT_NODE) {
      doc = elem.ownerDocument
    }
    return doc.defaultView || doc.parentWindow
  }, getDocument:function(elem) {
    if(!elem) {
      return DOCUMENT
    }
    elem = Dom.get(elem);
    return S.isWindow(elem) ? elem.document : elem.nodeType === NodeType.DOCUMENT_NODE ? elem : elem.ownerDocument
  }, isDomNodeList:function(o) {
    return o && !o.nodeType && o.item && !o.setTimeout
  }, nodeName:function(selector) {
    var el = Dom.get(selector), nodeName = el.nodeName.toLowerCase();
    if(UA.ie) {
      var scopeName = el.scopeName;
      if(scopeName && scopeName !== "HTML") {
        nodeName = scopeName.toLowerCase() + ":" + nodeName
      }
    }
    return nodeName
  }, _RE_NUM_NO_PX:new RegExp("^(" + RE_NUM + ")(?!px)[a-z%]+$", "i")};
  S.mix(Dom, NodeType);
  return Dom
});
KISSY.add("dom/base/attr", ["./api"], function(S, require) {
  var Dom = require("./api");
  var doc = S.Env.host.document, NodeType = Dom.NodeType, docElement = doc && doc.documentElement, EMPTY = "", nodeName = Dom.nodeName, R_BOOLEAN = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, R_FOCUSABLE = /^(?:button|input|object|select|textarea)$/i, R_CLICKABLE = /^a(?:rea)?$/i, R_INVALID_CHAR = /:|^on/, R_RETURN = /\r/g, attrFix = {}, attrFn = {val:1, css:1, html:1, text:1, data:1, width:1, height:1, offset:1, scrollTop:1, 
  scrollLeft:1}, attrHooks = {tabindex:{get:function(el) {
    var attributeNode = el.getAttributeNode("tabindex");
    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : R_FOCUSABLE.test(el.nodeName) || R_CLICKABLE.test(el.nodeName) && el.href ? 0 : undefined
  }}}, propFix = {hidefocus:"hideFocus", tabindex:"tabIndex", readonly:"readOnly", "for":"htmlFor", "class":"className", maxlength:"maxLength", cellspacing:"cellSpacing", cellpadding:"cellPadding", rowspan:"rowSpan", colspan:"colSpan", usemap:"useMap", frameborder:"frameBorder", contenteditable:"contentEditable"}, boolHook = {get:function(elem, name) {
    return Dom.prop(elem, name) ? name.toLowerCase() : undefined
  }, set:function(elem, value, name) {
    var propName;
    if(value === false) {
      Dom.removeAttr(elem, name)
    }else {
      propName = propFix[name] || name;
      if(propName in elem) {
        elem[propName] = true
      }
      elem.setAttribute(name, name.toLowerCase())
    }
    return name
  }}, propHooks = {}, attrNodeHook = {}, valHooks = {select:{get:function(elem) {
    var index = elem.selectedIndex, options = elem.options, ret, i, len, one = String(elem.type) === "select-one";
    if(index < 0) {
      return null
    }else {
      if(one) {
        return Dom.val(options[index])
      }
    }
    ret = [];
    i = 0;
    len = options.length;
    for(;i < len;++i) {
      if(options[i].selected) {
        ret.push(Dom.val(options[i]))
      }
    }
    return ret
  }, set:function(elem, value) {
    var values = S.makeArray(value), opts = elem.options;
    S.each(opts, function(opt) {
      opt.selected = S.inArray(Dom.val(opt), values)
    });
    if(!values.length) {
      elem.selectedIndex = -1
    }
    return values
  }}};
  S.each(["radio", "checkbox"], function(r) {
    valHooks[r] = {get:function(elem) {
      return elem.getAttribute("value") === null ? "on" : elem.value
    }, set:function(elem, value) {
      if(S.isArray(value)) {
        elem.checked = S.inArray(Dom.val(elem), value);
        return 1
      }
      return undefined
    }}
  });
  attrHooks.style = {get:function(el) {
    return el.style.cssText
  }};
  function toStr(value) {
    return value == null ? "" : value + ""
  }
  function getProp(elem, name) {
    name = propFix[name] || name;
    var hook = propHooks[name];
    if(hook && hook.get) {
      return hook.get(elem, name)
    }else {
      return elem[name]
    }
  }
  S.mix(Dom, {_valHooks:valHooks, _propFix:propFix, _attrHooks:attrHooks, _propHooks:propHooks, _attrNodeHook:attrNodeHook, _attrFix:attrFix, prop:function(selector, name, value) {
    var elems = Dom.query(selector), i, elem, hook;
    if(S.isPlainObject(name)) {
      S.each(name, function(v, k) {
        Dom.prop(elems, k, v)
      });
      return undefined
    }
    name = propFix[name] || name;
    hook = propHooks[name];
    if(value !== undefined) {
      for(i = elems.length - 1;i >= 0;i--) {
        elem = elems[i];
        if(hook && hook.set) {
          hook.set(elem, value, name)
        }else {
          elem[name] = value
        }
      }
    }else {
      if(elems.length) {
        return getProp(elems[0], name)
      }
    }
    return undefined
  }, hasProp:function(selector, name) {
    var elems = Dom.query(selector), i, len = elems.length, el;
    for(i = 0;i < len;i++) {
      el = elems[i];
      if(getProp(el, name) !== undefined) {
        return true
      }
    }
    return false
  }, removeProp:function(selector, name) {
    name = propFix[name] || name;
    var elems = Dom.query(selector), i, el;
    for(i = elems.length - 1;i >= 0;i--) {
      el = elems[i];
      try {
        el[name] = undefined;
        delete el[name]
      }catch(e) {
      }
    }
  }, attr:function(selector, name, val, pass) {
    var els = Dom.query(selector), attrNormalizer, i, el = els[0], ret;
    if(S.isPlainObject(name)) {
      pass = val;
      for(var k in name) {
        Dom.attr(els, k, name[k], pass)
      }
      return undefined
    }
    if(pass && attrFn[name]) {
      return Dom[name](selector, val)
    }
    name = name.toLowerCase();
    if(pass && attrFn[name]) {
      return Dom[name](selector, val)
    }
    name = attrFix[name] || name;
    if(R_BOOLEAN.test(name)) {
      attrNormalizer = boolHook
    }else {
      if(R_INVALID_CHAR.test(name)) {
        attrNormalizer = attrNodeHook
      }else {
        attrNormalizer = attrHooks[name]
      }
    }
    if(val === undefined) {
      if(el && el.nodeType === NodeType.ELEMENT_NODE) {
        if(nodeName(el) === "form") {
          attrNormalizer = attrNodeHook
        }
        if(attrNormalizer && attrNormalizer.get) {
          return attrNormalizer.get(el, name)
        }
        ret = el.getAttribute(name);
        if(ret === "") {
          var attrNode = el.getAttributeNode(name);
          if(!attrNode || !attrNode.specified) {
            return undefined
          }
        }
        return ret === null ? undefined : ret
      }
    }else {
      for(i = els.length - 1;i >= 0;i--) {
        el = els[i];
        if(el && el.nodeType === NodeType.ELEMENT_NODE) {
          if(nodeName(el) === "form") {
            attrNormalizer = attrNodeHook
          }
          if(attrNormalizer && attrNormalizer.set) {
            attrNormalizer.set(el, val, name)
          }else {
            el.setAttribute(name, EMPTY + val)
          }
        }
      }
    }
    return undefined
  }, removeAttr:function(selector, name) {
    name = name.toLowerCase();
    name = attrFix[name] || name;
    var els = Dom.query(selector), propName, el, i;
    for(i = els.length - 1;i >= 0;i--) {
      el = els[i];
      if(el.nodeType === NodeType.ELEMENT_NODE) {
        el.removeAttribute(name);
        if(R_BOOLEAN.test(name) && (propName = propFix[name] || name) in el) {
          el[propName] = false
        }
      }
    }
  }, hasAttr:docElement && !docElement.hasAttribute ? function(selector, name) {
    name = name.toLowerCase();
    var elems = Dom.query(selector), i, el, attrNode;
    for(i = 0;i < elems.length;i++) {
      el = elems[i];
      attrNode = el.getAttributeNode(name);
      if(attrNode && attrNode.specified) {
        return true
      }
    }
    return false
  } : function(selector, name) {
    var elems = Dom.query(selector), i, len = elems.length;
    for(i = 0;i < len;i++) {
      if(elems[i].hasAttribute(name)) {
        return true
      }
    }
    return false
  }, val:function(selector, value) {
    var hook, ret, elem, els, i, val;
    if(value === undefined) {
      elem = Dom.get(selector);
      if(elem) {
        hook = valHooks[nodeName(elem)] || valHooks[elem.type];
        if(hook && "get" in hook && (ret = hook.get(elem, "value")) !== undefined) {
          return ret
        }
        ret = elem.value;
        return typeof ret === "string" ? ret.replace(R_RETURN, "") : ret == null ? "" : ret
      }
      return undefined
    }
    els = Dom.query(selector);
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      if(elem.nodeType !== 1) {
        return undefined
      }
      val = value;
      if(val == null) {
        val = ""
      }else {
        if(typeof val === "number") {
          val += ""
        }else {
          if(S.isArray(val)) {
            val = S.map(val, toStr)
          }
        }
      }
      hook = valHooks[nodeName(elem)] || valHooks[elem.type];
      if(!hook || !("set" in hook) || hook.set(elem, val, "value") === undefined) {
        elem.value = val
      }
    }
    return undefined
  }, text:function(selector, val) {
    var el, els, i, nodeType;
    if(val === undefined) {
      el = Dom.get(selector);
      return Dom._getText(el)
    }else {
      els = Dom.query(selector);
      for(i = els.length - 1;i >= 0;i--) {
        el = els[i];
        nodeType = el.nodeType;
        if(nodeType === NodeType.ELEMENT_NODE) {
          Dom.cleanData(el.getElementsByTagName("*"));
          if("textContent" in el) {
            el.textContent = val
          }else {
            el.innerText = val
          }
        }else {
          if(nodeType === NodeType.TEXT_NODE || nodeType === NodeType.CDATA_SECTION_NODE) {
            el.nodeValue = val
          }
        }
      }
    }
    return undefined
  }, _getText:function(el) {
    return el.textContent
  }});
  return Dom
});
KISSY.add("dom/base/class", ["./api"], function(S, require) {
  var Dom = require("./api");
  var slice = [].slice, NodeType = Dom.NodeType, RE_SPLIT = /[\.\s]\s*\.?/;
  function strToArray(str) {
    str = S.trim(str || "");
    var arr = str.split(RE_SPLIT), newArr = [], v, l = arr.length, i = 0;
    for(;i < l;i++) {
      if(v = arr[i]) {
        newArr.push(v)
      }
    }
    return newArr
  }
  function batchClassList(method) {
    return function(elem, classNames) {
      var i, l, className, classList = elem.classList, extraArgs = slice.call(arguments, 2);
      for(i = 0, l = classNames.length;i < l;i++) {
        if(className = classNames[i]) {
          classList[method].apply(classList, [className].concat(extraArgs))
        }
      }
    }
  }
  function batchEls(method) {
    return function(selector, className) {
      var classNames = strToArray(className), extraArgs = slice.call(arguments, 2);
      Dom.query(selector).each(function(elem) {
        if(elem.nodeType === NodeType.ELEMENT_NODE) {
          Dom[method].apply(Dom, [elem, classNames].concat(extraArgs))
        }
      })
    }
  }
  S.mix(Dom, {_hasClass:function(elem, classNames) {
    var i, l, className, classList = elem.classList;
    if(classList.length) {
      for(i = 0, l = classNames.length;i < l;i++) {
        className = classNames[i];
        if(className && !classList.contains(className)) {
          return false
        }
      }
      return true
    }
    return false
  }, _addClass:batchClassList("add"), _removeClass:batchClassList("remove"), _toggleClass:batchClassList("toggle"), hasClass:function(selector, className) {
    var ret = false;
    className = strToArray(className);
    Dom.query(selector).each(function(elem) {
      if(elem.nodeType === NodeType.ELEMENT_NODE && Dom._hasClass(elem, className)) {
        ret = true;
        return false
      }
      return undefined
    });
    return ret
  }, replaceClass:function(selector, oldClassName, newClassName) {
    Dom.removeClass(selector, oldClassName);
    Dom.addClass(selector, newClassName)
  }, addClass:batchEls("_addClass"), removeClass:batchEls("_removeClass"), toggleClass:batchEls("_toggleClass")});
  return Dom
});
KISSY.add("dom/base/create", ["./api"], function(S, require) {
  var Dom = require("./api");
  var logger = S.getLogger("s/dom");
  var doc = S.Env.host.document, NodeType = Dom.NodeType, UA = S.UA, ie = UA.ieMode, DIV = "div", PARENT_NODE = "parentNode", DEFAULT_DIV = doc && doc.createElement(DIV), R_XHTML_TAG = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, RE_TAG = /<([\w:]+)/, R_LEADING_WHITESPACE = /^\s+/, R_TAIL_WHITESPACE = /\s+$/, oldIE = !!(ie && ie < 9), lostLeadingTailWhitespace = oldIE, R_HTML = /<|&#?\w+;/, supportOuterHTML = doc && "outerHTML" in doc.documentElement, RE_SIMPLE_TAG = 
  /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
  function getElementsByTagName(el, tag) {
    return el.getElementsByTagName(tag)
  }
  function getHolderDiv(ownerDoc) {
    var holder = ownerDoc && ownerDoc !== doc ? ownerDoc.createElement(DIV) : DEFAULT_DIV;
    if(holder === DEFAULT_DIV) {
      holder.innerHTML = ""
    }
    return holder
  }
  function defaultCreator(html, ownerDoc) {
    var frag = getHolderDiv(ownerDoc);
    frag.innerHTML = "m<div>" + html + "<" + "/div>";
    return frag.lastChild
  }
  function _empty(node) {
    try {
      node.innerHTML = "";
      return
    }catch(e) {
    }
    for(var c;c = node.lastChild;) {
      _destroy(c, node)
    }
  }
  function _destroy(node, parent) {
    if(parent) {
      if(oldIE && parent.canHaveChildren && "removeNode" in node) {
        if(node.firstChild) {
          _empty(node)
        }
        node.removeNode(false)
      }else {
        parent.removeChild(node)
      }
    }
  }
  S.mix(Dom, {create:function(html, props, ownerDoc, _trim) {
    var ret = null;
    if(!html) {
      return ret
    }
    if(html.nodeType) {
      return Dom.clone(html)
    }
    if(typeof html !== "string") {
      return ret
    }
    if(_trim === undefined) {
      _trim = true
    }
    if(_trim) {
      html = S.trim(html)
    }
    var creators = Dom._creators, holder, whitespaceMatch, context = ownerDoc || doc, m, tag = DIV, k, nodes;
    if(!R_HTML.test(html)) {
      ret = context.createTextNode(html)
    }else {
      if(m = RE_SIMPLE_TAG.exec(html)) {
        ret = context.createElement(m[1])
      }else {
        html = html.replace(R_XHTML_TAG, "<$1><" + "/$2>");
        if((m = RE_TAG.exec(html)) && (k = m[1])) {
          tag = k.toLowerCase()
        }
        holder = (creators[tag] || defaultCreator)(html, context);
        if(lostLeadingTailWhitespace && (whitespaceMatch = html.match(R_LEADING_WHITESPACE))) {
          holder.insertBefore(context.createTextNode(whitespaceMatch[0]), holder.firstChild)
        }
        if(lostLeadingTailWhitespace && /\S/.test(html) && (whitespaceMatch = html.match(R_TAIL_WHITESPACE))) {
          holder.appendChild(context.createTextNode(whitespaceMatch[0]))
        }
        nodes = holder.childNodes;
        if(nodes.length === 1) {
          ret = nodes[0][PARENT_NODE].removeChild(nodes[0])
        }else {
          if(nodes.length) {
            ret = nodeListToFragment(nodes)
          }else {
            S.error(html + " : create node error")
          }
        }
      }
    }
    return attachProps(ret, props)
  }, _fixCloneAttributes:function(src, dest) {
    if(Dom.nodeName(src) === "textarea") {
      dest.defaultValue = src.defaultValue;
      dest.value = src.value
    }
  }, _creators:{div:defaultCreator}, _defaultCreator:defaultCreator, html:function(selector, htmlString, loadScripts) {
    var els = Dom.query(selector), el = els[0], success = false, valNode, i, elem;
    if(!el) {
      return null
    }
    if(htmlString === undefined) {
      if(el.nodeType === NodeType.ELEMENT_NODE) {
        return el.innerHTML
      }else {
        if(el.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
          var holder = getHolderDiv(el.ownerDocument);
          holder.appendChild(el);
          return holder.innerHTML
        }else {
          return null
        }
      }
    }else {
      htmlString += "";
      if(!htmlString.match(/<(?:script|style|link)/i) && (!lostLeadingTailWhitespace || !htmlString.match(R_LEADING_WHITESPACE)) && !creatorsMap[(htmlString.match(RE_TAG) || ["", ""])[1].toLowerCase()]) {
        try {
          for(i = els.length - 1;i >= 0;i--) {
            elem = els[i];
            if(elem.nodeType === NodeType.ELEMENT_NODE) {
              Dom.cleanData(getElementsByTagName(elem, "*"));
              elem.innerHTML = htmlString
            }
          }
          success = true
        }catch(e) {
        }
      }
      if(!success) {
        valNode = Dom.create(htmlString, 0, el.ownerDocument, 0);
        Dom.empty(els);
        Dom.append(valNode, els, loadScripts)
      }
    }
    return undefined
  }, outerHtml:function(selector, htmlString, loadScripts) {
    var els = Dom.query(selector), holder, i, valNode, length = els.length, el = els[0];
    if(!el) {
      return null
    }
    if(htmlString === undefined) {
      if(supportOuterHTML && el.nodeType !== Dom.DOCUMENT_FRAGMENT_NODE) {
        return el.outerHTML
      }else {
        holder = getHolderDiv(el.ownerDocument);
        holder.appendChild(Dom.clone(el, true));
        return holder.innerHTML
      }
    }else {
      htmlString += "";
      if(!htmlString.match(/<(?:script|style|link)/i) && supportOuterHTML) {
        for(i = length - 1;i >= 0;i--) {
          el = els[i];
          if(el.nodeType === NodeType.ELEMENT_NODE) {
            Dom.cleanData(el, 1);
            el.outerHTML = htmlString
          }
        }
      }else {
        valNode = Dom.create(htmlString, 0, el.ownerDocument, 0);
        Dom.insertBefore(valNode, els, loadScripts);
        Dom.remove(els)
      }
    }
    return undefined
  }, remove:function(selector, keepData) {
    var el, els = Dom.query(selector), all, DOMEvent = S.require("event/dom"), i;
    for(i = els.length - 1;i >= 0;i--) {
      el = els[i];
      if(!keepData && el.nodeType === NodeType.ELEMENT_NODE) {
        all = S.makeArray(getElementsByTagName(el, "*"));
        all.push(el);
        Dom.removeData(all);
        if(DOMEvent) {
          DOMEvent.detach(all)
        }
      }
      _destroy(el, el.parentNode)
    }
  }, clone:function(selector, deep, withDataAndEvent, deepWithDataAndEvent) {
    if(typeof deep === "object") {
      deepWithDataAndEvent = deep.deepWithDataAndEvent;
      withDataAndEvent = deep.withDataAndEvent;
      deep = deep.deep
    }
    var elem = Dom.get(selector), clone, _fixCloneAttributes = Dom._fixCloneAttributes, elemNodeType;
    if(!elem) {
      return null
    }
    elemNodeType = elem.nodeType;
    clone = elem.cloneNode(deep);
    if(elemNodeType === NodeType.ELEMENT_NODE || elemNodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
      if(_fixCloneAttributes && elemNodeType === NodeType.ELEMENT_NODE) {
        _fixCloneAttributes(elem, clone)
      }
      if(deep && _fixCloneAttributes) {
        processAll(_fixCloneAttributes, elem, clone)
      }
    }
    if(withDataAndEvent) {
      cloneWithDataAndEvent(elem, clone);
      if(deep && deepWithDataAndEvent) {
        processAll(cloneWithDataAndEvent, elem, clone)
      }
    }
    return clone
  }, empty:function(selector) {
    var els = Dom.query(selector), el, i;
    for(i = els.length - 1;i >= 0;i--) {
      el = els[i];
      Dom.remove(el.childNodes)
    }
  }, _nodeListToFragment:nodeListToFragment});
  Dom.outerHTML = Dom.outerHtml;
  function processAll(fn, elem, clone) {
    var elemNodeType = elem.nodeType;
    if(elemNodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
      var eCs = elem.childNodes, cloneCs = clone.childNodes, fIndex = 0;
      while(eCs[fIndex]) {
        if(cloneCs[fIndex]) {
          processAll(fn, eCs[fIndex], cloneCs[fIndex])
        }
        fIndex++
      }
    }else {
      if(elemNodeType === NodeType.ELEMENT_NODE) {
        var elemChildren = getElementsByTagName(elem, "*"), cloneChildren = getElementsByTagName(clone, "*"), cIndex = 0;
        while(elemChildren[cIndex]) {
          if(cloneChildren[cIndex]) {
            fn(elemChildren[cIndex], cloneChildren[cIndex])
          }
          cIndex++
        }
      }
    }
  }
  function cloneWithDataAndEvent(src, dest) {
    var DOMEvent = S.require("event/dom"), srcData, d;
    if(dest.nodeType === NodeType.ELEMENT_NODE && !Dom.hasData(src)) {
      return
    }
    srcData = Dom.data(src);
    for(d in srcData) {
      Dom.data(dest, d, srcData[d])
    }
    if(DOMEvent) {
      DOMEvent.clone(src, dest)
    }
  }
  function attachProps(elem, props) {
    if(S.isPlainObject(props)) {
      if(elem.nodeType === NodeType.ELEMENT_NODE) {
        Dom.attr(elem, props, true)
      }else {
        if(elem.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
          Dom.attr(elem.childNodes, props, true)
        }
      }
    }
    return elem
  }
  function nodeListToFragment(nodes) {
    var ret = null, i, ownerDoc, len;
    if(nodes && (nodes.push || nodes.item) && nodes[0]) {
      ownerDoc = nodes[0].ownerDocument;
      ret = ownerDoc.createDocumentFragment();
      nodes = S.makeArray(nodes);
      for(i = 0, len = nodes.length;i < len;i++) {
        ret.appendChild(nodes[i])
      }
    }else {
      logger.error("Unable to convert " + nodes + " to fragment.")
    }
    return ret
  }
  var creators = Dom._creators, create = Dom.create, creatorsMap = {area:"map", thead:"table", td:"tr", th:"tr", tr:"tbody", tbody:"table", tfoot:"table", caption:"table", colgroup:"table", col:"colgroup", legend:"fieldset"}, p;
  for(p in creatorsMap) {
    (function(tag) {
      creators[p] = function(html, ownerDoc) {
        return create("<" + tag + ">" + html + "<" + "/" + tag + ">", undefined, ownerDoc)
      }
    })(creatorsMap[p])
  }
  creators.option = creators.optgroup = function(html, ownerDoc) {
    return create('<select multiple="multiple">' + html + "</select>", undefined, ownerDoc)
  };
  return Dom
});
KISSY.add("dom/base/data", ["./api"], function(S, require) {
  var Dom = require("./api");
  var win = S.Env.host, EXPANDO = "_ks_data_" + S.now(), dataCache = {}, winDataCache = {}, noData = {applet:1, object:1, embed:1};
  var commonOps = {hasData:function(cache, name) {
    if(cache) {
      if(name !== undefined) {
        if(name in cache) {
          return true
        }
      }else {
        if(!S.isEmptyObject(cache)) {
          return true
        }
      }
    }
    return false
  }};
  var objectOps = {hasData:function(ob, name) {
    if(ob == win) {
      return objectOps.hasData(winDataCache, name)
    }
    var thisCache = ob[EXPANDO];
    return commonOps.hasData(thisCache, name)
  }, data:function(ob, name, value) {
    if(ob == win) {
      return objectOps.data(winDataCache, name, value)
    }
    var cache = ob[EXPANDO];
    if(value !== undefined) {
      cache = ob[EXPANDO] = ob[EXPANDO] || {};
      cache[name] = value
    }else {
      if(name !== undefined) {
        return cache && cache[name]
      }else {
        cache = ob[EXPANDO] = ob[EXPANDO] || {};
        return cache
      }
    }
  }, removeData:function(ob, name) {
    if(ob == win) {
      return objectOps.removeData(winDataCache, name)
    }
    var cache = ob[EXPANDO];
    if(name !== undefined) {
      delete cache[name];
      if(S.isEmptyObject(cache)) {
        objectOps.removeData(ob)
      }
    }else {
      try {
        delete ob[EXPANDO]
      }catch(e) {
        ob[EXPANDO] = undefined
      }
    }
  }};
  var domOps = {hasData:function(elem, name) {
    var key = elem[EXPANDO];
    if(!key) {
      return false
    }
    var thisCache = dataCache[key];
    return commonOps.hasData(thisCache, name)
  }, data:function(elem, name, value) {
    if(noData[elem.nodeName.toLowerCase()]) {
      return undefined
    }
    var key = elem[EXPANDO], cache;
    if(!key) {
      if(name !== undefined && value === undefined) {
        return undefined
      }
      key = elem[EXPANDO] = S.guid()
    }
    cache = dataCache[key];
    if(value !== undefined) {
      cache = dataCache[key] = dataCache[key] || {};
      cache[name] = value
    }else {
      if(name !== undefined) {
        return cache && cache[name]
      }else {
        cache = dataCache[key] = dataCache[key] || {};
        return cache
      }
    }
  }, removeData:function(elem, name) {
    var key = elem[EXPANDO], cache;
    if(!key) {
      return
    }
    cache = dataCache[key];
    if(name !== undefined) {
      delete cache[name];
      if(S.isEmptyObject(cache)) {
        domOps.removeData(elem)
      }
    }else {
      delete dataCache[key];
      try {
        delete elem[EXPANDO]
      }catch(e) {
        elem[EXPANDO] = undefined
      }
      if(elem.removeAttribute) {
        elem.removeAttribute(EXPANDO)
      }
    }
  }};
  S.mix(Dom, {__EXPANDO:EXPANDO, hasData:function(selector, name) {
    var ret = false, elems = Dom.query(selector);
    for(var i = 0;i < elems.length;i++) {
      var elem = elems[i];
      if(elem.nodeType) {
        ret = domOps.hasData(elem, name)
      }else {
        ret = objectOps.hasData(elem, name)
      }
      if(ret) {
        return ret
      }
    }
    return ret
  }, data:function(selector, name, data) {
    var elems = Dom.query(selector), elem = elems[0];
    if(S.isPlainObject(name)) {
      for(var k in name) {
        Dom.data(elems, k, name[k])
      }
      return undefined
    }
    if(data === undefined) {
      if(elem) {
        if(elem.nodeType) {
          return domOps.data(elem, name)
        }else {
          return objectOps.data(elem, name)
        }
      }
    }else {
      for(var i = elems.length - 1;i >= 0;i--) {
        elem = elems[i];
        if(elem.nodeType) {
          domOps.data(elem, name, data)
        }else {
          objectOps.data(elem, name, data)
        }
      }
    }
    return undefined
  }, removeData:function(selector, name) {
    var els = Dom.query(selector), elem, i;
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      if(elem.nodeType) {
        domOps.removeData(elem, name)
      }else {
        objectOps.removeData(elem, name)
      }
    }
  }, cleanData:function(selector, deep) {
    var els = Dom.query(selector), elem, i;
    var DOMEvent = S.require("event/dom");
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      if(elem.nodeType) {
        var descendants = deep && S.makeArray(elem.getElementsByTagName("*")) || [];
        descendants.push(elem);
        for(var j = 0, len = descendants.length;j < len;j++) {
          domOps.removeData(descendants[j])
        }
        if(DOMEvent) {
          DOMEvent.detach(descendants)
        }
      }else {
        objectOps.removeData(elem)
      }
    }
  }});
  return Dom
});
KISSY.add("dom/base/insertion", ["./api"], function(S, require) {
  var Dom = require("./api");
  var PARENT_NODE = "parentNode", NodeType = Dom.NodeType, RE_FORM_EL = /^(?:button|input|object|select|textarea)$/i, getNodeName = Dom.nodeName, makeArray = S.makeArray, splice = [].splice, NEXT_SIBLING = "nextSibling", R_SCRIPT_TYPE = /\/(java|ecma)script/i;
  function isJs(el) {
    return!el.type || R_SCRIPT_TYPE.test(el.type)
  }
  function filterScripts(nodes, scripts) {
    var ret = [], i, el, nodeName;
    for(i = 0;nodes[i];i++) {
      el = nodes[i];
      nodeName = getNodeName(el);
      if(el.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
        ret.push.apply(ret, filterScripts(makeArray(el.childNodes), scripts))
      }else {
        if(nodeName === "script" && isJs(el)) {
          if(el.parentNode) {
            el.parentNode.removeChild(el)
          }
          if(scripts) {
            scripts.push(el)
          }
        }else {
          if(el.nodeType === NodeType.ELEMENT_NODE && !RE_FORM_EL.test(nodeName)) {
            var tmp = [], s, j, ss = el.getElementsByTagName("script");
            for(j = 0;j < ss.length;j++) {
              s = ss[j];
              if(isJs(s)) {
                tmp.push(s)
              }
            }
            splice.apply(nodes, [i + 1, 0].concat(tmp))
          }
          ret.push(el)
        }
      }
    }
    return ret
  }
  function evalScript(el) {
    if(el.src) {
      S.getScript(el.src)
    }else {
      var code = S.trim(el.text || el.textContent || el.innerHTML || "");
      if(code) {
        S.globalEval(code)
      }
    }
  }
  function insertion(newNodes, refNodes, fn, scripts) {
    newNodes = Dom.query(newNodes);
    if(scripts) {
      scripts = []
    }
    newNodes = filterScripts(newNodes, scripts);
    if(Dom._fixInsertionChecked) {
      Dom._fixInsertionChecked(newNodes)
    }
    refNodes = Dom.query(refNodes);
    var newNodesLength = newNodes.length, newNode, i, refNode, node, clonedNode, refNodesLength = refNodes.length;
    if(!newNodesLength && (!scripts || !scripts.length) || !refNodesLength) {
      return
    }
    newNode = Dom._nodeListToFragment(newNodes);
    if(refNodesLength > 1) {
      clonedNode = Dom.clone(newNode, true);
      refNodes = S.makeArray(refNodes)
    }
    for(i = 0;i < refNodesLength;i++) {
      refNode = refNodes[i];
      if(newNode) {
        node = i > 0 ? Dom.clone(clonedNode, true) : newNode;
        fn(node, refNode)
      }
      if(scripts && scripts.length) {
        S.each(scripts, evalScript)
      }
    }
  }
  S.mix(Dom, {_fixInsertionChecked:null, insertBefore:function(newNodes, refNodes, loadScripts) {
    insertion(newNodes, refNodes, function(newNode, refNode) {
      if(refNode[PARENT_NODE]) {
        refNode[PARENT_NODE].insertBefore(newNode, refNode)
      }
    }, loadScripts)
  }, insertAfter:function(newNodes, refNodes, loadScripts) {
    insertion(newNodes, refNodes, function(newNode, refNode) {
      if(refNode[PARENT_NODE]) {
        refNode[PARENT_NODE].insertBefore(newNode, refNode[NEXT_SIBLING])
      }
    }, loadScripts)
  }, appendTo:function(newNodes, parents, loadScripts) {
    insertion(newNodes, parents, function(newNode, parent) {
      parent.appendChild(newNode)
    }, loadScripts)
  }, prependTo:function(newNodes, parents, loadScripts) {
    insertion(newNodes, parents, function(newNode, parent) {
      parent.insertBefore(newNode, parent.firstChild)
    }, loadScripts)
  }, wrapAll:function(wrappedNodes, wrapperNode) {
    wrapperNode = Dom.clone(Dom.get(wrapperNode), true);
    wrappedNodes = Dom.query(wrappedNodes);
    if(wrappedNodes[0].parentNode) {
      Dom.insertBefore(wrapperNode, wrappedNodes[0])
    }
    var c;
    while((c = wrapperNode.firstChild) && c.nodeType === 1) {
      wrapperNode = c
    }
    Dom.appendTo(wrappedNodes, wrapperNode)
  }, wrap:function(wrappedNodes, wrapperNode) {
    wrappedNodes = Dom.query(wrappedNodes);
    wrapperNode = Dom.get(wrapperNode);
    S.each(wrappedNodes, function(w) {
      Dom.wrapAll(w, wrapperNode)
    })
  }, wrapInner:function(wrappedNodes, wrapperNode) {
    wrappedNodes = Dom.query(wrappedNodes);
    wrapperNode = Dom.get(wrapperNode);
    S.each(wrappedNodes, function(w) {
      var contents = w.childNodes;
      if(contents.length) {
        Dom.wrapAll(contents, wrapperNode)
      }else {
        w.appendChild(wrapperNode)
      }
    })
  }, unwrap:function(wrappedNodes) {
    wrappedNodes = Dom.query(wrappedNodes);
    S.each(wrappedNodes, function(w) {
      var p = w.parentNode;
      Dom.replaceWith(p, p.childNodes)
    })
  }, replaceWith:function(selector, newNodes) {
    var nodes = Dom.query(selector);
    newNodes = Dom.query(newNodes);
    Dom.remove(newNodes, true);
    Dom.insertBefore(newNodes, nodes);
    Dom.remove(nodes)
  }});
  S.each({prepend:"prependTo", append:"appendTo", before:"insertBefore", after:"insertAfter"}, function(value, key) {
    Dom[key] = Dom[value]
  });
  return Dom
});
KISSY.add("dom/base/offset", ["./api"], function(S, require) {
  var Dom = require("./api");
  var win = S.Env.host, UA = S.UA, doc = win.document, NodeType = Dom.NodeType, docElem = doc && doc.documentElement, getWindow = Dom.getWindow, CSS1Compat = "CSS1Compat", compatMode = "compatMode", MAX = Math.max, POSITION = "position", RELATIVE = "relative", DOCUMENT = "document", BODY = "body", DOC_ELEMENT = "documentElement", VIEWPORT = "viewport", SCROLL = "scroll", CLIENT = "client", LEFT = "left", TOP = "top", SCROLL_LEFT = SCROLL + "Left", SCROLL_TOP = SCROLL + "Top";
  S.mix(Dom, {offset:function(selector, coordinates, relativeWin) {
    var elem;
    if(coordinates === undefined) {
      elem = Dom.get(selector);
      var ret;
      if(elem) {
        ret = getOffset(elem, relativeWin)
      }
      return ret
    }
    var els = Dom.query(selector), i;
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      setOffset(elem, coordinates)
    }
    return undefined
  }, scrollIntoView:function(selector, container, alignWithTop, allowHorizontalScroll) {
    var elem, onlyScrollIfNeeded;
    if(!(elem = Dom.get(selector))) {
      return
    }
    if(container) {
      container = Dom.get(container)
    }
    if(!container) {
      container = elem.ownerDocument
    }
    if(container.nodeType === NodeType.DOCUMENT_NODE) {
      container = getWindow(container)
    }
    if(S.isPlainObject(alignWithTop)) {
      allowHorizontalScroll = alignWithTop.allowHorizontalScroll;
      onlyScrollIfNeeded = alignWithTop.onlyScrollIfNeeded;
      alignWithTop = alignWithTop.alignWithTop
    }
    allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;
    var isWin = S.isWindow(container), elemOffset = Dom.offset(elem), eh = Dom.outerHeight(elem), ew = Dom.outerWidth(elem), containerOffset, ch, cw, containerScroll, diffTop, diffBottom, win, winScroll, ww, wh;
    if(isWin) {
      win = container;
      wh = Dom.height(win);
      ww = Dom.width(win);
      winScroll = {left:Dom.scrollLeft(win), top:Dom.scrollTop(win)};
      diffTop = {left:elemOffset[LEFT] - winScroll[LEFT], top:elemOffset[TOP] - winScroll[TOP]};
      diffBottom = {left:elemOffset[LEFT] + ew - (winScroll[LEFT] + ww), top:elemOffset[TOP] + eh - (winScroll[TOP] + wh)};
      containerScroll = winScroll
    }else {
      containerOffset = Dom.offset(container);
      ch = container.clientHeight;
      cw = container.clientWidth;
      containerScroll = {left:Dom.scrollLeft(container), top:Dom.scrollTop(container)};
      diffTop = {left:elemOffset[LEFT] - (containerOffset[LEFT] + (parseFloat(Dom.css(container, "borderLeftWidth")) || 0)), top:elemOffset[TOP] - (containerOffset[TOP] + (parseFloat(Dom.css(container, "borderTopWidth")) || 0))};
      diffBottom = {left:elemOffset[LEFT] + ew - (containerOffset[LEFT] + cw + (parseFloat(Dom.css(container, "borderRightWidth")) || 0)), top:elemOffset[TOP] + eh - (containerOffset[TOP] + ch + (parseFloat(Dom.css(container, "borderBottomWidth")) || 0))}
    }
    if(onlyScrollIfNeeded) {
      if(diffTop.top < 0 || diffBottom.top > 0) {
        if(alignWithTop === true) {
          Dom.scrollTop(container, containerScroll.top + diffTop.top)
        }else {
          if(alignWithTop === false) {
            Dom.scrollTop(container, containerScroll.top + diffBottom.top)
          }else {
            if(diffTop.top < 0) {
              Dom.scrollTop(container, containerScroll.top + diffTop.top)
            }else {
              Dom.scrollTop(container, containerScroll.top + diffBottom.top)
            }
          }
        }
      }
    }else {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
      if(alignWithTop) {
        Dom.scrollTop(container, containerScroll.top + diffTop.top)
      }else {
        Dom.scrollTop(container, containerScroll.top + diffBottom.top)
      }
    }
    if(allowHorizontalScroll) {
      if(onlyScrollIfNeeded) {
        if(diffTop.left < 0 || diffBottom.left > 0) {
          if(alignWithTop === true) {
            Dom.scrollLeft(container, containerScroll.left + diffTop.left)
          }else {
            if(alignWithTop === false) {
              Dom.scrollLeft(container, containerScroll.left + diffBottom.left)
            }else {
              if(diffTop.left < 0) {
                Dom.scrollLeft(container, containerScroll.left + diffTop.left)
              }else {
                Dom.scrollLeft(container, containerScroll.left + diffBottom.left)
              }
            }
          }
        }
      }else {
        alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
        if(alignWithTop) {
          Dom.scrollLeft(container, containerScroll.left + diffTop.left)
        }else {
          Dom.scrollLeft(container, containerScroll.left + diffBottom.left)
        }
      }
    }
  }, docWidth:0, docHeight:0, viewportHeight:0, viewportWidth:0, scrollTop:0, scrollLeft:0});
  S.each(["Left", "Top"], function(name, i) {
    var method = SCROLL + name;
    Dom[method] = function(elem, v) {
      if(typeof elem === "number") {
        return arguments.callee(win, elem)
      }
      elem = Dom.get(elem);
      var ret, left, top, w, d;
      if(elem && elem.nodeType === NodeType.ELEMENT_NODE) {
        if(v !== undefined) {
          elem[method] = parseFloat(v)
        }else {
          ret = elem[method]
        }
      }else {
        w = getWindow(elem);
        if(v !== undefined) {
          v = parseFloat(v);
          left = name === "Left" ? v : Dom.scrollLeft(w);
          top = name === "Top" ? v : Dom.scrollTop(w);
          w.scrollTo(left, top)
        }else {
          ret = w["page" + (i ? "Y" : "X") + "Offset"];
          if(typeof ret !== "number") {
            d = w[DOCUMENT];
            ret = d[DOC_ELEMENT][method];
            if(typeof ret !== "number") {
              ret = d[BODY][method]
            }
          }
        }
      }
      return ret
    }
  });
  S.each(["Width", "Height"], function(name) {
    Dom["doc" + name] = function(refWin) {
      refWin = Dom.get(refWin);
      var d = Dom.getDocument(refWin);
      return MAX(d[DOC_ELEMENT][SCROLL + name], d[BODY][SCROLL + name], Dom[VIEWPORT + name](d))
    };
    Dom[VIEWPORT + name] = function(refWin) {
      refWin = Dom.get(refWin);
      var win = getWindow(refWin);
      var ret = win["inner" + name];
      if(UA.mobile && ret) {
        return ret
      }
      var prop = CLIENT + name, doc = win[DOCUMENT], body = doc[BODY], documentElement = doc[DOC_ELEMENT], documentElementProp = documentElement[prop];
      return doc[compatMode] === CSS1Compat && documentElementProp || body && body[prop] || documentElementProp
    }
  });
  function getClientPosition(elem) {
    var box, x, y, doc = elem.ownerDocument, body = doc.body;
    if(!elem.getBoundingClientRect) {
      return{left:0, top:0}
    }
    box = elem.getBoundingClientRect();
    x = box[LEFT];
    y = box[TOP];
    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;
    return{left:x, top:y}
  }
  function getPageOffset(el) {
    var pos = getClientPosition(el), w = getWindow(el);
    pos.left += Dom[SCROLL_LEFT](w);
    pos.top += Dom[SCROLL_TOP](w);
    return pos
  }
  function getOffset(el, relativeWin) {
    var position = {left:0, top:0}, currentWin = getWindow(el), offset, currentEl = el;
    relativeWin = relativeWin || currentWin;
    do {
      offset = currentWin == relativeWin ? getPageOffset(currentEl) : getClientPosition(currentEl);
      position.left += offset.left;
      position.top += offset.top
    }while(currentWin && currentWin != relativeWin && (currentEl = currentWin.frameElement) && (currentWin = currentWin.parent));
    return position
  }
  function setOffset(elem, offset) {
    if(Dom.css(elem, POSITION) === "static") {
      elem.style[POSITION] = RELATIVE
    }
    var old = getOffset(elem), ret = {}, current, key;
    for(key in offset) {
      current = parseFloat(Dom.css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key]
    }
    Dom.css(elem, ret)
  }
  return Dom
});
KISSY.add("dom/base/style", ["./api"], function(S, require) {
  var Dom = require("./api");
  var logger = S.getLogger("s/dom");
  var globalWindow = S.Env.host, UA = S.UA, Features = S.Features, getNodeName = Dom.nodeName, doc = globalWindow.document, RE_MARGIN = /^margin/, WIDTH = "width", HEIGHT = "height", DISPLAY = "display", OLD_DISPLAY = DISPLAY + S.now(), NONE = "none", cssNumber = {fillOpacity:1, fontWeight:1, lineHeight:1, opacity:1, orphans:1, widows:1, zIndex:1, zoom:1}, rmsPrefix = /^-ms-/, EMPTY = "", DEFAULT_UNIT = "px", NO_PX_REG = /\d(?!px)[a-z%]+$/i, cssHooks = {}, cssProps = {"float":"cssFloat"}, defaultDisplay = 
  {}, RE_DASH = /-([a-z])/ig;
  var VENDORS = ["", "Webkit", "Moz", "O", "ms"];
  var documentElementStyle = doc && doc.documentElement.style || {};
  var userSelectProperty;
  S.each(VENDORS, function(val) {
    var userSelect = val ? val + "UserSelect" : "userSelect";
    if(userSelectProperty === undefined && userSelect in documentElementStyle) {
      userSelectProperty = userSelect
    }
  });
  if(Features.isTransformSupported()) {
    var transform;
    transform = cssProps.transform = Features.getTransformProperty();
    cssProps.transformOrigin = transform + "Origin"
  }
  if(Features.isTransitionSupported()) {
    cssProps.transition = Features.getTransitionProperty()
  }
  function upperCase() {
    return arguments[1].toUpperCase()
  }
  function camelCase(name) {
    return name.replace(rmsPrefix, "ms-").replace(RE_DASH, upperCase)
  }
  function getDefaultDisplay(tagName) {
    var body, oldDisplay = defaultDisplay[tagName], elem;
    if(!defaultDisplay[tagName]) {
      body = doc.body || doc.documentElement;
      elem = doc.createElement(tagName);
      Dom.prepend(elem, body);
      oldDisplay = Dom.css(elem, "display");
      body.removeChild(elem);
      defaultDisplay[tagName] = oldDisplay
    }
    return oldDisplay
  }
  S.mix(Dom, {_camelCase:camelCase, _cssHooks:cssHooks, _cssProps:cssProps, _getComputedStyle:function(elem, name) {
    var val = "", computedStyle, width, minWidth, maxWidth, style, d = elem.ownerDocument;
    name = cssProps[name] || name;
    if(computedStyle = d.defaultView.getComputedStyle(elem, null)) {
      val = computedStyle.getPropertyValue(name) || computedStyle[name]
    }
    if(val === "" && !Dom.contains(d, elem)) {
      val = elem.style[name]
    }
    if(Dom._RE_NUM_NO_PX.test(val) && RE_MARGIN.test(name)) {
      style = elem.style;
      width = style.width;
      minWidth = style.minWidth;
      maxWidth = style.maxWidth;
      style.minWidth = style.maxWidth = style.width = val;
      val = computedStyle.width;
      style.width = width;
      style.minWidth = minWidth;
      style.maxWidth = maxWidth
    }
    return val
  }, style:function(selector, name, val) {
    var els = Dom.query(selector), k, ret, elem = els[0], i;
    if(S.isPlainObject(name)) {
      for(k in name) {
        for(i = els.length - 1;i >= 0;i--) {
          style(els[i], k, name[k])
        }
      }
      return undefined
    }
    if(val === undefined) {
      ret = "";
      if(elem) {
        ret = style(elem, name, val)
      }
      return ret
    }else {
      for(i = els.length - 1;i >= 0;i--) {
        style(els[i], name, val)
      }
    }
    return undefined
  }, css:function(selector, name, val) {
    var els = Dom.query(selector), elem = els[0], k, hook, ret, i;
    if(S.isPlainObject(name)) {
      for(k in name) {
        for(i = els.length - 1;i >= 0;i--) {
          style(els[i], k, name[k])
        }
      }
      return undefined
    }
    name = camelCase(name);
    hook = cssHooks[name];
    if(val === undefined) {
      ret = "";
      if(elem) {
        if(!(hook && "get" in hook && (ret = hook.get(elem, true)) !== undefined)) {
          ret = Dom._getComputedStyle(elem, name)
        }
      }
      return typeof ret === "undefined" ? "" : ret
    }else {
      for(i = els.length - 1;i >= 0;i--) {
        style(els[i], name, val)
      }
    }
    return undefined
  }, show:function(selector) {
    var els = Dom.query(selector), tagName, old, elem, i;
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      elem.style[DISPLAY] = Dom.data(elem, OLD_DISPLAY) || EMPTY;
      if(Dom.css(elem, DISPLAY) === NONE) {
        tagName = elem.tagName.toLowerCase();
        old = getDefaultDisplay(tagName);
        Dom.data(elem, OLD_DISPLAY, old);
        elem.style[DISPLAY] = old
      }
    }
  }, hide:function(selector) {
    var els = Dom.query(selector), elem, i;
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      var style = elem.style, old = style[DISPLAY];
      if(old !== NONE) {
        if(old) {
          Dom.data(elem, OLD_DISPLAY, old)
        }
        style[DISPLAY] = NONE
      }
    }
  }, toggle:function(selector) {
    var els = Dom.query(selector), elem, i;
    for(i = els.length - 1;i >= 0;i--) {
      elem = els[i];
      if(Dom.css(elem, DISPLAY) === NONE) {
        Dom.show(elem)
      }else {
        Dom.hide(elem)
      }
    }
  }, addStyleSheet:function(refWin, cssText, id) {
    if(typeof refWin === "string") {
      id = cssText;
      cssText = refWin;
      refWin = globalWindow
    }
    var doc = Dom.getDocument(refWin), elem;
    if(id && (id = id.replace("#", EMPTY))) {
      elem = Dom.get("#" + id, doc)
    }
    if(elem) {
      return
    }
    elem = Dom.create("<style>", {id:id}, doc);
    Dom.get("head", doc).appendChild(elem);
    if(elem.styleSheet) {
      elem.styleSheet.cssText = cssText
    }else {
      elem.appendChild(doc.createTextNode(cssText))
    }
  }, unselectable:function(selector) {
    var _els = Dom.query(selector), elem, j, e, i = 0, excludes, style, els;
    for(j = _els.length - 1;j >= 0;j--) {
      elem = _els[j];
      style = elem.style;
      if(userSelectProperty !== undefined) {
        style[userSelectProperty] = "none"
      }else {
        if(UA.ie) {
          els = elem.getElementsByTagName("*");
          elem.setAttribute("unselectable", "on");
          excludes = ["iframe", "textarea", "input", "select"];
          while(e = els[i++]) {
            if(!S.inArray(getNodeName(e), excludes)) {
              e.setAttribute("unselectable", "on")
            }
          }
        }
      }
    }
  }, innerWidth:0, innerHeight:0, outerWidth:0, outerHeight:0, width:0, height:0});
  S.each([WIDTH, HEIGHT], function(name) {
    Dom["inner" + S.ucfirst(name)] = function(selector) {
      var el = Dom.get(selector);
      return el && getWHIgnoreDisplay(el, name, "padding")
    };
    Dom["outer" + S.ucfirst(name)] = function(selector, includeMargin) {
      var el = Dom.get(selector);
      return el && getWHIgnoreDisplay(el, name, includeMargin ? "margin" : "border")
    };
    Dom[name] = function(selector, val) {
      var ret = Dom.css(selector, name, val);
      if(ret) {
        ret = parseFloat(ret)
      }
      return ret
    };
    cssHooks[name] = {get:function(elem, computed) {
      var val;
      if(computed) {
        val = getWHIgnoreDisplay(elem, name) + "px"
      }
      return val
    }}
  });
  var cssShow = {position:"absolute", visibility:"hidden", display:"block"};
  S.each(["left", "top"], function(name) {
    cssHooks[name] = {get:function(el, computed) {
      var val, isAutoPosition, position;
      if(computed) {
        position = Dom.css(el, "position");
        if(position === "static") {
          return"auto"
        }
        val = Dom._getComputedStyle(el, name);
        isAutoPosition = val === "auto";
        if(isAutoPosition && position === "relative") {
          return"0px"
        }
        if(isAutoPosition || NO_PX_REG.test(val)) {
          val = getPosition(el)[name] + "px"
        }
      }
      return val
    }}
  });
  function swap(elem, options, callback) {
    var old = {}, style = elem.style, name;
    for(name in options) {
      old[name] = style[name];
      style[name] = options[name]
    }
    callback.call(elem);
    for(name in options) {
      style[name] = old[name]
    }
  }
  function style(elem, name, val) {
    var elStyle, ret, hook;
    if(elem.nodeType === 3 || elem.nodeType === 8 || !(elStyle = elem.style)) {
      return undefined
    }
    name = camelCase(name);
    hook = cssHooks[name];
    name = cssProps[name] || name;
    if(val !== undefined) {
      if(val === null || val === EMPTY) {
        val = EMPTY
      }else {
        if(!isNaN(Number(val)) && !cssNumber[name]) {
          val += DEFAULT_UNIT
        }
      }
      if(hook && hook.set) {
        val = hook.set(elem, val)
      }
      if(val !== undefined) {
        try {
          elStyle[name] = val
        }catch(e) {
          logger.warn("css set error:" + e)
        }
        if(val === EMPTY && elStyle.removeAttribute) {
          elStyle.removeAttribute(name)
        }
      }
      if(!elStyle.cssText) {
        if(UA.webkit) {
          elStyle = elem.outerHTML
        }
        elem.removeAttribute("style")
      }
      return undefined
    }else {
      if(!(hook && "get" in hook && (ret = hook.get(elem, false)) !== undefined)) {
        ret = elStyle[name]
      }
      return ret === undefined ? "" : ret
    }
  }
  function getWHIgnoreDisplay(elem) {
    var val, args = arguments;
    if(elem.offsetWidth !== 0) {
      val = getWH.apply(undefined, args)
    }else {
      swap(elem, cssShow, function() {
        val = getWH.apply(undefined, args)
      })
    }
    return val
  }
  function getWH(elem, name, extra) {
    if(S.isWindow(elem)) {
      return name === WIDTH ? Dom.viewportWidth(elem) : Dom.viewportHeight(elem)
    }else {
      if(elem.nodeType === 9) {
        return name === WIDTH ? Dom.docWidth(elem) : Dom.docHeight(elem)
      }
    }
    var which = name === WIDTH ? ["Left", "Right"] : ["Top", "Bottom"], val = name === WIDTH ? elem.offsetWidth : elem.offsetHeight;
    if(val > 0) {
      if(extra !== "border") {
        S.each(which, function(w) {
          if(!extra) {
            val -= parseFloat(Dom.css(elem, "padding" + w)) || 0
          }
          if(extra === "margin") {
            val += parseFloat(Dom.css(elem, extra + w)) || 0
          }else {
            val -= parseFloat(Dom.css(elem, "border" + w + "Width")) || 0
          }
        })
      }
      return val
    }
    val = Dom._getComputedStyle(elem, name);
    if(val === null || Number(val) < 0) {
      val = elem.style[name] || 0
    }
    val = parseFloat(val) || 0;
    if(extra) {
      S.each(which, function(w) {
        val += parseFloat(Dom.css(elem, "padding" + w)) || 0;
        if(extra !== "padding") {
          val += parseFloat(Dom.css(elem, "border" + w + "Width")) || 0
        }
        if(extra === "margin") {
          val += parseFloat(Dom.css(elem, extra + w)) || 0
        }
      })
    }
    return val
  }
  var ROOT_REG = /^(?:body|html)$/i;
  function getPosition(el) {
    var offsetParent, offset, parentOffset = {top:0, left:0};
    if(Dom.css(el, "position") === "fixed") {
      offset = el.getBoundingClientRect()
    }else {
      offsetParent = getOffsetParent(el);
      offset = Dom.offset(el);
      parentOffset = Dom.offset(offsetParent);
      parentOffset.top += parseFloat(Dom.css(offsetParent, "borderTopWidth")) || 0;
      parentOffset.left += parseFloat(Dom.css(offsetParent, "borderLeftWidth")) || 0
    }
    offset.top -= parseFloat(Dom.css(el, "marginTop")) || 0;
    offset.left -= parseFloat(Dom.css(el, "marginLeft")) || 0;
    return{top:offset.top - parentOffset.top, left:offset.left - parentOffset.left}
  }
  function getOffsetParent(el) {
    var offsetParent = el.offsetParent || (el.ownerDocument || doc).body;
    while(offsetParent && !ROOT_REG.test(offsetParent.nodeName) && Dom.css(offsetParent, "position") === "static") {
      offsetParent = offsetParent.offsetParent
    }
    return offsetParent
  }
  return Dom
});
KISSY.add("dom/base/selector", ["./api"], function(S, require) {
  var Dom = require("./api");
  var doc = S.Env.host.document, docElem = doc.documentElement, matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector, supportGetElementsByClassName = "getElementsByClassName" in doc, isArray = S.isArray, makeArray = S.makeArray, isDomNodeList = Dom.isDomNodeList, SPACE = " ", push = Array.prototype.push, rClassSelector = /^\.([\w-]+)$/, rIdSelector = /^#([\w-]+)$/, rTagSelector = /^([\w-])+$/, rTagIdSelector = 
  /^([\w-]+)#([\w-]+)$/, rSimpleSelector = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/, trim = S.trim;
  function queryEach(f) {
    var self = this, l = self.length, i;
    for(i = 0;i < l;i++) {
      if(f(self[i], i) === false) {
        break
      }
    }
  }
  function checkSelectorAndReturn(selector) {
    var name = selector.substr(1);
    if(!name) {
      throw new Error("An invalid or illegal string was specified for selector.");
    }
    return name
  }
  function makeMatch(selector) {
    var s = selector.charAt(0);
    if(s === "#") {
      return makeIdMatch(checkSelectorAndReturn(selector))
    }else {
      if(s === ".") {
        return makeClassMatch(checkSelectorAndReturn(selector))
      }else {
        return makeTagMatch(selector)
      }
    }
  }
  function makeIdMatch(id) {
    return function(elem) {
      var match = Dom._getElementById(id, doc);
      return match && Dom._contains(elem, match) ? [match] : []
    }
  }
  function makeClassMatch(className) {
    return function(elem) {
      return elem.getElementsByClassName(className)
    }
  }
  function makeTagMatch(tagName) {
    return function(elem) {
      return elem.getElementsByTagName(tagName)
    }
  }
  function isSimpleSelector(selector) {
    var complexReg = /,|\+|=|~|\[|\]|:|>|\||\$|\^|\*|\(|\)|[\w-]+\.[\w-]+|[\w-]+#[\w-]+/;
    return!selector.match(complexReg)
  }
  function query(selector, context) {
    var ret, i, el, simpleContext, isSelectorString = typeof selector === "string", contexts = context !== undefined ? query(context) : (simpleContext = 1) && [doc], contextsLen = contexts.length;
    if(!selector) {
      ret = []
    }else {
      if(isSelectorString) {
        selector = trim(selector);
        if(simpleContext) {
          if(selector === "body") {
            ret = [doc.body]
          }else {
            if(rClassSelector.test(selector) && supportGetElementsByClassName) {
              ret = makeArray(doc.getElementsByClassName(RegExp.$1))
            }else {
              if(rTagIdSelector.test(selector)) {
                el = Dom._getElementById(RegExp.$2, doc);
                ret = el && el.nodeName.toLowerCase() === RegExp.$1 ? [el] : []
              }else {
                if(rIdSelector.test(selector)) {
                  el = Dom._getElementById(selector.substr(1), doc);
                  ret = el ? [el] : []
                }else {
                  if(rTagSelector.test(selector)) {
                    ret = makeArray(doc.getElementsByTagName(selector))
                  }else {
                    if(isSimpleSelector(selector) && supportGetElementsByClassName) {
                      var parts = selector.split(/\s+/), partsLen, parents = contexts, parentIndex, parentsLen;
                      for(i = 0, partsLen = parts.length;i < partsLen;i++) {
                        parts[i] = makeMatch(parts[i])
                      }
                      for(i = 0, partsLen = parts.length;i < partsLen;i++) {
                        var part = parts[i], newParents = [], matches;
                        for(parentIndex = 0, parentsLen = parents.length;parentIndex < parentsLen;parentIndex++) {
                          matches = part(parents[parentIndex]);
                          newParents.push.apply(newParents, makeArray(matches))
                        }
                        parents = newParents;
                        if(!parents.length) {
                          break
                        }
                      }
                      ret = parents && parents.length > 1 ? Dom.unique(parents) : parents
                    }
                  }
                }
              }
            }
          }
        }
        if(!ret) {
          ret = [];
          for(i = 0;i < contextsLen;i++) {
            push.apply(ret, Dom._selectInternal(selector, contexts[i]))
          }
          if(ret.length > 1 && contextsLen > 1) {
            Dom.unique(ret)
          }
        }
      }else {
        if(selector.nodeType || S.isWindow(selector)) {
          ret = [selector]
        }else {
          if(selector.getDOMNodes) {
            ret = selector.getDOMNodes()
          }else {
            if(isArray(selector)) {
              ret = selector
            }else {
              if(isDomNodeList(selector)) {
                ret = makeArray(selector)
              }else {
                ret = [selector]
              }
            }
          }
        }
        if(!simpleContext) {
          var tmp = ret, ci, len = tmp.length;
          ret = [];
          for(i = 0;i < len;i++) {
            for(ci = 0;ci < contextsLen;ci++) {
              if(Dom._contains(contexts[ci], tmp[i])) {
                ret.push(tmp[i]);
                break
              }
            }
          }
        }
      }
    }
    ret.each = queryEach;
    return ret
  }
  function hasSingleClass(el, cls) {
    var className = el && getAttr(el, "class");
    return className && (className = className.replace(/[\r\t\n]/g, SPACE)) && (SPACE + className + SPACE).indexOf(SPACE + cls + SPACE) > -1
  }
  function getAttr(el, name) {
    var ret = el && el.getAttributeNode(name);
    if(ret && ret.specified) {
      return ret.nodeValue
    }
    return undefined
  }
  function isTag(el, value) {
    return value === "*" || el.nodeName.toLowerCase() === value.toLowerCase()
  }
  S.mix(Dom, {_compareNodeOrder:function(a, b) {
    if(!a.compareDocumentPosition || !b.compareDocumentPosition) {
      return a.compareDocumentPosition ? -1 : 1
    }
    var bit = a.compareDocumentPosition(b) & 4;
    return bit ? -1 : 1
  }, _getElementsByTagName:function(name, context) {
    return makeArray(context.querySelectorAll(name))
  }, _getElementById:function(id, doc) {
    return doc.getElementById(id)
  }, _getSimpleAttr:getAttr, _isTag:isTag, _hasSingleClass:hasSingleClass, _matchesInternal:function(str, seeds) {
    var ret = [], i = 0, n, len = seeds.length;
    for(;i < len;i++) {
      n = seeds[i];
      if(matches.call(n, str)) {
        ret.push(n)
      }
    }
    return ret
  }, _selectInternal:function(str, context) {
    return makeArray(context.querySelectorAll(str))
  }, query:query, get:function(selector, context) {
    return query(selector, context)[0] || null
  }, unique:function() {
    var hasDuplicate, baseHasDuplicate = true;
    [0, 0].sort(function() {
      baseHasDuplicate = false;
      return 0
    });
    function sortOrder(a, b) {
      if(a === b) {
        hasDuplicate = true;
        return 0
      }
      return Dom._compareNodeOrder(a, b)
    }
    return function(elements) {
      hasDuplicate = baseHasDuplicate;
      elements.sort(sortOrder);
      if(hasDuplicate) {
        var i = 1, len = elements.length;
        while(i < len) {
          if(elements[i] === elements[i - 1]) {
            elements.splice(i, 1);
            --len
          }else {
            i++
          }
        }
      }
      return elements
    }
  }(), filter:function(selector, filter, context) {
    var elems = query(selector, context), id, tag, match, cls, ret = [];
    if(typeof filter === "string" && (filter = trim(filter)) && (match = rSimpleSelector.exec(filter))) {
      id = match[1];
      tag = match[2];
      cls = match[3];
      if(!id) {
        filter = function(elem) {
          var tagRe = true, clsRe = true;
          if(tag) {
            tagRe = isTag(elem, tag)
          }
          if(cls) {
            clsRe = hasSingleClass(elem, cls)
          }
          return clsRe && tagRe
        }
      }else {
        if(id && !tag && !cls) {
          filter = function(elem) {
            return getAttr(elem, "id") === id
          }
        }
      }
    }
    if(typeof filter === "function") {
      ret = S.filter(elems, filter)
    }else {
      ret = Dom._matchesInternal(filter, elems)
    }
    return ret
  }, test:function(selector, filter, context) {
    var elements = query(selector, context);
    return elements.length && Dom.filter(elements, filter, context).length === elements.length
  }});
  return Dom
});
KISSY.add("dom/base/traversal", ["./api"], function(S, require) {
  var Dom = require("./api");
  var NodeType = Dom.NodeType, CONTAIN_MASK = 16;
  S.mix(Dom, {_contains:function(a, b) {
    return!!(a.compareDocumentPosition(b) & CONTAIN_MASK)
  }, closest:function(selector, filter, context, allowTextNode) {
    return nth(selector, filter, "parentNode", function(elem) {
      return elem.nodeType !== NodeType.DOCUMENT_FRAGMENT_NODE
    }, context, true, allowTextNode)
  }, parent:function(selector, filter, context) {
    return nth(selector, filter, "parentNode", function(elem) {
      return elem.nodeType !== NodeType.DOCUMENT_FRAGMENT_NODE
    }, context, undefined)
  }, first:function(selector, filter, allowTextNode) {
    var elem = Dom.get(selector);
    return nth(elem && elem.firstChild, filter, "nextSibling", undefined, undefined, true, allowTextNode)
  }, last:function(selector, filter, allowTextNode) {
    var elem = Dom.get(selector);
    return nth(elem && elem.lastChild, filter, "previousSibling", undefined, undefined, true, allowTextNode)
  }, next:function(selector, filter, allowTextNode) {
    return nth(selector, filter, "nextSibling", undefined, undefined, undefined, allowTextNode)
  }, prev:function(selector, filter, allowTextNode) {
    return nth(selector, filter, "previousSibling", undefined, undefined, undefined, allowTextNode)
  }, siblings:function(selector, filter, allowTextNode) {
    return getSiblings(selector, filter, true, allowTextNode)
  }, children:function(selector, filter) {
    return getSiblings(selector, filter, undefined)
  }, contents:function(selector, filter) {
    return getSiblings(selector, filter, undefined, 1)
  }, contains:function(container, contained) {
    container = Dom.get(container);
    contained = Dom.get(contained);
    if(container && contained) {
      return Dom._contains(container, contained)
    }
    return false
  }, index:function(selector, s2) {
    var els = Dom.query(selector), c, n = 0, p, els2, el = els[0];
    if(!s2) {
      p = el && el.parentNode;
      if(!p) {
        return-1
      }
      c = el;
      while(c = c.previousSibling) {
        if(c.nodeType === NodeType.ELEMENT_NODE) {
          n++
        }
      }
      return n
    }
    els2 = Dom.query(s2);
    if(typeof s2 === "string") {
      return S.indexOf(el, els2)
    }
    return S.indexOf(els2[0], els)
  }, equals:function(n1, n2) {
    n1 = Dom.query(n1);
    n2 = Dom.query(n2);
    if(n1.length !== n2.length) {
      return false
    }
    for(var i = n1.length;i >= 0;i--) {
      if(n1[i] !== n2[i]) {
        return false
      }
    }
    return true
  }});
  function nth(elem, filter, direction, extraFilter, context, includeSef, allowTextNode) {
    if(!(elem = Dom.get(elem))) {
      return null
    }
    if(filter === 0) {
      return elem
    }
    if(!includeSef) {
      elem = elem[direction]
    }
    if(!elem) {
      return null
    }
    context = context && Dom.get(context) || null;
    if(filter === undefined) {
      filter = 1
    }
    var ret = [], isArray = S.isArray(filter), fi, filterLength;
    if(typeof filter === "number") {
      fi = 0;
      filterLength = filter;
      filter = function() {
        return++fi === filterLength
      }
    }
    while(elem && elem !== context) {
      if((elem.nodeType === NodeType.ELEMENT_NODE || elem.nodeType === NodeType.TEXT_NODE && allowTextNode) && testFilter(elem, filter) && (!extraFilter || extraFilter(elem))) {
        ret.push(elem);
        if(!isArray) {
          break
        }
      }
      elem = elem[direction]
    }
    return isArray ? ret : ret[0] || null
  }
  function testFilter(elem, filter) {
    if(!filter) {
      return true
    }
    if(S.isArray(filter)) {
      var i, l = filter.length;
      if(!l) {
        return true
      }
      for(i = 0;i < l;i++) {
        if(Dom.test(elem, filter[i])) {
          return true
        }
      }
    }else {
      if(Dom.test(elem, filter)) {
        return true
      }
    }
    return false
  }
  function getSiblings(selector, filter, parent, allowText) {
    var ret = [], tmp, i, el, elem = Dom.get(selector), parentNode = elem;
    if(elem && parent) {
      parentNode = elem.parentNode
    }
    if(parentNode) {
      tmp = S.makeArray(parentNode.childNodes);
      for(i = 0;i < tmp.length;i++) {
        el = tmp[i];
        if(!allowText && el.nodeType !== NodeType.ELEMENT_NODE) {
          continue
        }
        if(el === elem) {
          continue
        }
        ret.push(el)
      }
      if(filter) {
        ret = Dom.filter(ret, filter)
      }
    }
    return ret
  }
  return Dom
});
KISSY.add("dom/base", ["./base/api", "./base/attr", "./base/class", "./base/create", "./base/data", "./base/insertion", "./base/offset", "./base/style", "./base/selector", "./base/traversal"], function(S, require) {
  var Dom = require("./base/api");
  require("./base/attr");
  require("./base/class");
  require("./base/create");
  require("./base/data");
  require("./base/insertion");
  require("./base/offset");
  require("./base/style");
  require("./base/selector");
  require("./base/traversal");
  S.mix(S, {DOM:Dom, get:Dom.get, query:Dom.query});
  return Dom
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:15
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event/dom/base/utils
 event/dom/base/special
 event/dom/base/observer
 event/dom/base/object
 event/dom/base/observable
 event/dom/base/dom-event
 event/dom/base/key-codes
 event/dom/base/gesture
 event/dom/base/special-events
 event/dom/base/mouseenter
 event/dom/base/valuechange
 event/dom/base
*/

KISSY.add("event/dom/base/utils", ["dom"], function(S, require) {
  var Dom = require("dom");
  var EVENT_GUID = "ksEventTargetId_" + S.now(), doc = S.Env.host.document, simpleAdd = doc && doc.addEventListener ? function(el, type, fn, capture) {
    if(el.addEventListener) {
      el.addEventListener(type, fn, !!capture)
    }
  } : function(el, type, fn) {
    if(el.attachEvent) {
      el.attachEvent("on" + type, fn)
    }
  }, simpleRemove = doc && doc.removeEventListener ? function(el, type, fn, capture) {
    if(el.removeEventListener) {
      el.removeEventListener(type, fn, !!capture)
    }
  } : function(el, type, fn) {
    if(el.detachEvent) {
      el.detachEvent("on" + type, fn)
    }
  };
  return{simpleAdd:simpleAdd, simpleRemove:simpleRemove, data:function(elem, v) {
    return Dom.data(elem, EVENT_GUID, v)
  }, removeData:function(elem) {
    return Dom.removeData(elem, EVENT_GUID)
  }}
});
KISSY.add("event/dom/base/special", [], function() {
  return{}
});
KISSY.add("event/dom/base/observer", ["event/base", "./special"], function(S, require) {
  var BaseEvent = require("event/base");
  var Special = require("./special");
  function DomEventObserver(cfg) {
    DomEventObserver.superclass.constructor.call(this, cfg)
  }
  S.extend(DomEventObserver, BaseEvent.Observer, {keys:["fn", "filter", "data", "context", "originalType", "groups", "last"], notifyInternal:function(event, ce) {
    var self = this, s, t, ret, type = event.type, originalType;
    if(originalType = self.originalType) {
      event.type = originalType
    }else {
      originalType = type
    }
    if((s = Special[originalType]) && s.handle) {
      t = s.handle(event, self, ce);
      if(t && t.length > 0) {
        ret = t[0]
      }
    }else {
      ret = self.simpleNotify(event, ce)
    }
    if(ret === false) {
      event.halt()
    }
    event.type = type;
    return ret
  }});
  return DomEventObserver
});
KISSY.add("event/dom/base/object", ["event/base"], function(S, require) {
  var BaseEvent = require("event/base");
  var DOCUMENT = S.Env.host.document, TRUE = true, FALSE = false, commonProps = ["altKey", "bubbles", "cancelable", "ctrlKey", "currentTarget", "eventPhase", "metaKey", "shiftKey", "target", "timeStamp", "view", "type"], eventNormalizers = [{reg:/^key/, props:["char", "charCode", "key", "keyCode", "which"], fix:function(event, originalEvent) {
    if(event.which == null) {
      event.which = originalEvent.charCode != null ? originalEvent.charCode : originalEvent.keyCode
    }
    if(event.metaKey === undefined) {
      event.metaKey = event.ctrlKey
    }
  }}, {reg:/^touch/, props:["touches", "changedTouches", "targetTouches"]}, {reg:/^gesturechange$/i, props:["rotation", "scale"]}, {reg:/^(mousewheel|DOMMouseScroll)$/, props:[], fix:function(event, originalEvent) {
    var deltaX, deltaY, delta, wheelDelta = originalEvent.wheelDelta, axis = originalEvent.axis, wheelDeltaY = originalEvent.wheelDeltaY, wheelDeltaX = originalEvent.wheelDeltaX, detail = originalEvent.detail;
    if(wheelDelta) {
      delta = wheelDelta / 120
    }
    if(detail) {
      delta = -(detail % 3 === 0 ? detail / 3 : detail)
    }
    if(axis !== undefined) {
      if(axis === event.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = -1 * delta
      }else {
        if(axis === event.VERTICAL_AXIS) {
          deltaX = 0;
          deltaY = delta
        }
      }
    }
    if(wheelDeltaY !== undefined) {
      deltaY = wheelDeltaY / 120
    }
    if(wheelDeltaX !== undefined) {
      deltaX = -1 * wheelDeltaX / 120
    }
    if(!deltaX && !deltaY) {
      deltaY = delta
    }
    if(deltaX !== undefined) {
      event.deltaX = deltaX
    }
    if(deltaY !== undefined) {
      event.deltaY = deltaY
    }
    if(delta !== undefined) {
      event.delta = delta
    }
  }}, {reg:/^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i, props:["buttons", "clientX", "clientY", "button", "offsetX", "relatedTarget", "which", "fromElement", "toElement", "offsetY", "pageX", "pageY", "screenX", "screenY"], fix:function(event, originalEvent) {
    var eventDoc, doc, body, target = event.target, button = originalEvent.button;
    if(event.pageX == null && originalEvent.clientX != null) {
      eventDoc = target.ownerDocument || DOCUMENT;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = originalEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = originalEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
    }
    if(!event.which && button !== undefined) {
      event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0
    }
    if(!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement
    }
    return event
  }}];
  function retTrue() {
    return TRUE
  }
  function retFalse() {
    return FALSE
  }
  function DomEventObject(originalEvent) {
    var self = this, type = originalEvent.type;
    DomEventObject.superclass.constructor.call(self);
    self.originalEvent = originalEvent;
    var isDefaultPrevented = retFalse;
    if("defaultPrevented" in originalEvent) {
      isDefaultPrevented = originalEvent.defaultPrevented ? retTrue : retFalse
    }else {
      if("getPreventDefault" in originalEvent) {
        isDefaultPrevented = originalEvent.getPreventDefault() ? retTrue : retFalse
      }else {
        if("returnValue" in originalEvent) {
          isDefaultPrevented = originalEvent.returnValue === FALSE ? retTrue : retFalse
        }
      }
    }
    self.isDefaultPrevented = isDefaultPrevented;
    var fixFns = [], fixFn, l, prop, props = commonProps.concat();
    S.each(eventNormalizers, function(normalizer) {
      if(type.match(normalizer.reg)) {
        props = props.concat(normalizer.props);
        if(normalizer.fix) {
          fixFns.push(normalizer.fix)
        }
      }
      return undefined
    });
    l = props.length;
    while(l) {
      prop = props[--l];
      self[prop] = originalEvent[prop]
    }
    if(!self.target) {
      self.target = originalEvent.srcElement || DOCUMENT
    }
    if(self.target.nodeType === 3) {
      self.target = self.target.parentNode
    }
    l = fixFns.length;
    while(l) {
      fixFn = fixFns[--l];
      fixFn(self, originalEvent)
    }
  }
  S.extend(DomEventObject, BaseEvent.Object, {constructor:DomEventObject, preventDefault:function() {
    var self = this, e = self.originalEvent;
    if(e.preventDefault) {
      e.preventDefault()
    }else {
      e.returnValue = FALSE
    }
    DomEventObject.superclass.preventDefault.call(self)
  }, stopPropagation:function() {
    var self = this, e = self.originalEvent;
    if(e.stopPropagation) {
      e.stopPropagation()
    }else {
      e.cancelBubble = TRUE
    }
    DomEventObject.superclass.stopPropagation.call(self)
  }});
  return DomEventObject
});
KISSY.add("event/dom/base/observable", ["event/base", "dom", "./special", "./utils", "./observer", "./object"], function(S, require) {
  var BaseEvent = require("event/base");
  var Dom = require("dom");
  var Special = require("./special");
  var DomEventUtils = require("./utils");
  var DomEventObserver = require("./observer");
  var DomEventObject = require("./object");
  var BaseUtils = BaseEvent.Utils;
  var logger = S.getLogger("s/event");
  function DomEventObservable(cfg) {
    var self = this;
    S.mix(self, cfg);
    self.reset()
  }
  S.extend(DomEventObservable, BaseEvent.Observable, {setup:function() {
    var self = this, type = self.type, s = Special[type] || {}, currentTarget = self.currentTarget, eventDesc = DomEventUtils.data(currentTarget), handle = eventDesc.handle;
    if(!s.setup || s.setup.call(currentTarget, type) === false) {
      DomEventUtils.simpleAdd(currentTarget, type, handle)
    }
  }, constructor:DomEventObservable, reset:function() {
    var self = this;
    DomEventObservable.superclass.reset.call(self);
    self.delegateCount = 0;
    self.lastCount = 0
  }, notify:function(event) {
    var target = event.target, eventType = event.type, self = this, currentTarget = self.currentTarget, observers = self.observers, currentTarget0, allObservers = [], ret, gRet, observerObj, i, j, delegateCount = self.delegateCount || 0, len, currentTargetObservers, currentTargetObserver, observer;
    if(delegateCount && target.nodeType) {
      while(target !== currentTarget) {
        if(target.disabled !== true || eventType !== "click") {
          var cachedMatch = {}, matched, key, filter;
          currentTargetObservers = [];
          for(i = 0;i < delegateCount;i++) {
            observer = observers[i];
            filter = observer.filter;
            key = filter + "";
            matched = cachedMatch[key];
            if(matched === undefined) {
              matched = cachedMatch[key] = Dom.test(target, filter)
            }
            if(matched) {
              currentTargetObservers.push(observer)
            }
          }
          if(currentTargetObservers.length) {
            allObservers.push({currentTarget:target, currentTargetObservers:currentTargetObservers})
          }
        }
        target = target.parentNode || currentTarget
      }
    }
    if(delegateCount < observers.length) {
      allObservers.push({currentTarget:currentTarget, currentTargetObservers:observers.slice(delegateCount)})
    }
    for(i = 0, len = allObservers.length;!event.isPropagationStopped() && i < len;++i) {
      observerObj = allObservers[i];
      currentTargetObservers = observerObj.currentTargetObservers;
      currentTarget0 = observerObj.currentTarget;
      event.currentTarget = currentTarget0;
      for(j = 0;!event.isImmediatePropagationStopped() && j < currentTargetObservers.length;j++) {
        currentTargetObserver = currentTargetObservers[j];
        ret = currentTargetObserver.notify(event, self);
        if(gRet !== false && ret !== undefined) {
          gRet = ret
        }
      }
    }
    return gRet
  }, fire:function(event, onlyHandlers) {
    event = event || {};
    var self = this, eventType = String(self.type), domEventObservable, eventData, specialEvent = Special[eventType] || {}, bubbles = specialEvent.bubbles !== false, currentTarget = self.currentTarget;
    if(specialEvent.fire && specialEvent.fire.call(currentTarget, onlyHandlers) === false) {
      return
    }
    if(!(event instanceof DomEventObject)) {
      eventData = event;
      event = new DomEventObject({currentTarget:currentTarget, type:eventType, target:currentTarget});
      S.mix(event, eventData)
    }
    if(specialEvent.preFire && specialEvent.preFire.call(currentTarget, event, onlyHandlers) === false) {
      return
    }
    var cur = currentTarget, win = Dom.getWindow(cur), curDocument = win.document, eventPath = [], gret, ret, ontype = "on" + eventType, eventPathIndex = 0;
    do {
      eventPath.push(cur);
      cur = cur.parentNode || cur.ownerDocument || cur === curDocument && win
    }while(!onlyHandlers && cur && bubbles);
    cur = eventPath[eventPathIndex];
    do {
      event.currentTarget = cur;
      domEventObservable = DomEventObservable.getDomEventObservable(cur, eventType);
      if(domEventObservable) {
        ret = domEventObservable.notify(event);
        if(ret !== undefined && gret !== false) {
          gret = ret
        }
      }
      if(cur[ontype] && cur[ontype].call(cur) === false) {
        event.preventDefault()
      }
      cur = eventPath[++eventPathIndex]
    }while(!onlyHandlers && cur && !event.isPropagationStopped());
    if(!onlyHandlers && !event.isDefaultPrevented()) {
      try {
        if(currentTarget[eventType] && !S.isWindow(currentTarget)) {
          DomEventObservable.triggeredEvent = eventType;
          currentTarget[eventType]()
        }
      }catch(eError) {
        logger.debug("trigger action error: " + eError)
      }
      DomEventObservable.triggeredEvent = ""
    }
    return gret
  }, on:function(cfg) {
    var self = this, observers = self.observers, s = Special[self.type] || {}, observer = cfg instanceof DomEventObserver ? cfg : new DomEventObserver(cfg);
    if(S.Config.debug) {
      if(!observer.fn) {
        S.error("lack event handler for " + self.type)
      }
    }
    if(self.findObserver(observer) === -1) {
      if(observer.filter) {
        observers.splice(self.delegateCount, 0, observer);
        self.delegateCount++
      }else {
        if(observer.last) {
          observers.push(observer);
          self.lastCount++
        }else {
          observers.splice(observers.length - self.lastCount, 0, observer)
        }
      }
      if(s.add) {
        s.add.call(self.currentTarget, observer)
      }
    }
  }, detach:function(cfg) {
    var groupsRe, self = this, s = Special[self.type] || {}, hasFilter = "filter" in cfg, filter = cfg.filter, context = cfg.context, fn = cfg.fn, currentTarget = self.currentTarget, observers = self.observers, groups = cfg.groups;
    if(!observers.length) {
      return
    }
    if(groups) {
      groupsRe = BaseUtils.getGroupsRe(groups)
    }
    var i, j, t, observer, observerContext, len = observers.length;
    if(fn || hasFilter || groupsRe) {
      context = context || currentTarget;
      for(i = 0, j = 0, t = [];i < len;++i) {
        observer = observers[i];
        observerContext = observer.context || currentTarget;
        if(context !== observerContext || fn && fn !== observer.fn || hasFilter && (filter && filter !== observer.filter || !filter && !observer.filter) || groupsRe && !observer.groups.match(groupsRe)) {
          t[j++] = observer
        }else {
          if(observer.filter && self.delegateCount) {
            self.delegateCount--
          }
          if(observer.last && self.lastCount) {
            self.lastCount--
          }
          if(s.remove) {
            s.remove.call(currentTarget, observer)
          }
        }
      }
      self.observers = t
    }else {
      self.reset()
    }
    self.checkMemory()
  }, checkMemory:function() {
    var self = this, type = self.type, domEventObservables, handle, s = Special[type] || {}, currentTarget = self.currentTarget, eventDesc = DomEventUtils.data(currentTarget);
    if(eventDesc) {
      domEventObservables = eventDesc.observables;
      if(!self.hasObserver()) {
        handle = eventDesc.handle;
        if(!s.tearDown || s.tearDown.call(currentTarget, type) === false) {
          DomEventUtils.simpleRemove(currentTarget, type, handle)
        }
        delete domEventObservables[type]
      }
      if(S.isEmptyObject(domEventObservables)) {
        eventDesc.handle = null;
        DomEventUtils.removeData(currentTarget)
      }
    }
  }});
  DomEventObservable.triggeredEvent = "";
  DomEventObservable.getDomEventObservable = function(node, type) {
    var domEventObservablesHolder = DomEventUtils.data(node), domEventObservables;
    if(domEventObservablesHolder) {
      domEventObservables = domEventObservablesHolder.observables
    }
    if(domEventObservables) {
      return domEventObservables[type]
    }
    return null
  };
  DomEventObservable.getDomEventObservablesHolder = function(node, create) {
    var domEventObservables = DomEventUtils.data(node);
    if(!domEventObservables && create) {
      DomEventUtils.data(node, domEventObservables = {})
    }
    return domEventObservables
  };
  return DomEventObservable
});
KISSY.add("event/dom/base/dom-event", ["event/base", "./utils", "dom", "./special", "./observable", "./object"], function(S, require) {
  var BaseEvent = require("event/base");
  var DomEventUtils = require("./utils");
  var Dom = require("dom");
  var Special = require("./special");
  var DomEventObservable = require("./observable");
  var DomEventObject = require("./object");
  var BaseUtils = BaseEvent.Utils;
  function fixType(cfg, type) {
    var s = Special[type] || {}, typeFix;
    if(!cfg.originalType && (typeFix = s.typeFix)) {
      cfg.originalType = type;
      type = typeFix
    }
    return type
  }
  function addInternal(currentTarget, type, cfg) {
    var domEventObservablesHolder, domEventObservable, domEventObservables, handle;
    cfg = S.merge(cfg);
    type = fixType(cfg, type);
    domEventObservablesHolder = DomEventObservable.getDomEventObservablesHolder(currentTarget, 1);
    if(!(handle = domEventObservablesHolder.handle)) {
      handle = domEventObservablesHolder.handle = function(event) {
        var type = event.type, domEventObservable, currentTarget = handle.currentTarget;
        if(DomEventObservable.triggeredEvent === type || typeof KISSY === "undefined") {
          return undefined
        }
        domEventObservable = DomEventObservable.getDomEventObservable(currentTarget, type);
        if(domEventObservable) {
          event.currentTarget = currentTarget;
          event = new DomEventObject(event);
          return domEventObservable.notify(event)
        }
        return undefined
      };
      handle.currentTarget = currentTarget
    }
    if(!(domEventObservables = domEventObservablesHolder.observables)) {
      domEventObservables = domEventObservablesHolder.observables = {}
    }
    domEventObservable = domEventObservables[type];
    if(!domEventObservable) {
      domEventObservable = domEventObservables[type] = new DomEventObservable({type:type, currentTarget:currentTarget});
      domEventObservable.setup()
    }
    domEventObservable.on(cfg);
    currentTarget = null
  }
  function removeInternal(currentTarget, type, cfg) {
    cfg = S.merge(cfg);
    var customEvent;
    type = fixType(cfg, type);
    var domEventObservablesHolder = DomEventObservable.getDomEventObservablesHolder(currentTarget), domEventObservables = (domEventObservablesHolder || {}).observables;
    if(!domEventObservablesHolder || !domEventObservables) {
      return
    }
    if(!type) {
      for(type in domEventObservables) {
        domEventObservables[type].detach(cfg)
      }
      return
    }
    customEvent = domEventObservables[type];
    if(customEvent) {
      customEvent.detach(cfg)
    }
  }
  var DomEvent = {on:function(targets, type, fn, context) {
    targets = Dom.query(targets);
    BaseUtils.batchForType(function(targets, type, fn, context) {
      var cfg = BaseUtils.normalizeParam(type, fn, context), i, t;
      type = cfg.type;
      for(i = targets.length - 1;i >= 0;i--) {
        t = targets[i];
        addInternal(t, type, cfg)
      }
    }, 1, targets, type, fn, context);
    return targets
  }, detach:function(targets, type, fn, context) {
    targets = Dom.query(targets);
    BaseUtils.batchForType(function(targets, singleType, fn, context) {
      var cfg = BaseUtils.normalizeParam(singleType, fn, context), i, j, elChildren, t;
      singleType = cfg.type;
      for(i = targets.length - 1;i >= 0;i--) {
        t = targets[i];
        removeInternal(t, singleType, cfg);
        if(cfg.deep && t.getElementsByTagName) {
          elChildren = t.getElementsByTagName("*");
          for(j = elChildren.length - 1;j >= 0;j--) {
            removeInternal(elChildren[j], singleType, cfg)
          }
        }
      }
    }, 1, targets, type, fn, context);
    return targets
  }, delegate:function(targets, eventType, filter, fn, context) {
    return DomEvent.on(targets, eventType, {fn:fn, context:context, filter:filter})
  }, undelegate:function(targets, eventType, filter, fn, context) {
    return DomEvent.detach(targets, eventType, {fn:fn, context:context, filter:filter})
  }, fire:function(targets, eventType, eventData, onlyHandlers) {
    var ret;
    eventData = eventData || {};
    eventData.synthetic = 1;
    BaseUtils.splitAndRun(eventType, function(eventType) {
      var r, i, target, domEventObservable;
      BaseUtils.fillGroupsForEvent(eventType, eventData);
      eventType = eventData.type;
      var s = Special[eventType];
      var originalType = eventType;
      if(s && s.typeFix) {
        originalType = s.typeFix
      }
      targets = Dom.query(targets);
      for(i = targets.length - 1;i >= 0;i--) {
        target = targets[i];
        domEventObservable = DomEventObservable.getDomEventObservable(target, originalType);
        if(!onlyHandlers && !domEventObservable) {
          domEventObservable = new DomEventObservable({type:originalType, currentTarget:target})
        }
        if(domEventObservable) {
          r = domEventObservable.fire(eventData, onlyHandlers);
          if(ret !== false && r !== undefined) {
            ret = r
          }
        }
      }
    });
    return ret
  }, fireHandler:function(targets, eventType, eventData) {
    return DomEvent.fire(targets, eventType, eventData, 1)
  }, clone:function(src, dest) {
    var domEventObservablesHolder, domEventObservables;
    if(!(domEventObservablesHolder = DomEventObservable.getDomEventObservablesHolder(src))) {
      return
    }
    var srcData = DomEventUtils.data(src);
    if(srcData && srcData === DomEventUtils.data(dest)) {
      DomEventUtils.removeData(dest)
    }
    domEventObservables = domEventObservablesHolder.observables;
    S.each(domEventObservables, function(customEvent, type) {
      S.each(customEvent.observers, function(observer) {
        addInternal(dest, type, observer)
      })
    })
  }};
  return DomEvent
});
KISSY.add("event/dom/base/key-codes", [], function(S) {
  var UA = S.UA, KeyCode = {MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, 
  V:86, W:87, X:88, Y:89, Z:90, META:91, WIN_KEY_RIGHT:92, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, SINGLE_QUOTE:222, 
  OPEN_SQUARE_BRACKET:219, BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, WIN_IME:229};
  KeyCode.isTextModifyingKeyEvent = function(e) {
    var keyCode = e.keyCode;
    if(e.altKey && !e.ctrlKey || e.metaKey || keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false
    }
    switch(keyCode) {
      case KeyCode.ALT:
      ;
      case KeyCode.CAPS_LOCK:
      ;
      case KeyCode.CONTEXT_MENU:
      ;
      case KeyCode.CTRL:
      ;
      case KeyCode.DOWN:
      ;
      case KeyCode.END:
      ;
      case KeyCode.ESC:
      ;
      case KeyCode.HOME:
      ;
      case KeyCode.INSERT:
      ;
      case KeyCode.LEFT:
      ;
      case KeyCode.MAC_FF_META:
      ;
      case KeyCode.META:
      ;
      case KeyCode.NUMLOCK:
      ;
      case KeyCode.NUM_CENTER:
      ;
      case KeyCode.PAGE_DOWN:
      ;
      case KeyCode.PAGE_UP:
      ;
      case KeyCode.PAUSE:
      ;
      case KeyCode.PRINT_SCREEN:
      ;
      case KeyCode.RIGHT:
      ;
      case KeyCode.SHIFT:
      ;
      case KeyCode.UP:
      ;
      case KeyCode.WIN_KEY:
      ;
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true
    }
  };
  KeyCode.isCharacterKey = function(keyCode) {
    if(keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true
    }
    if(keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true
    }
    if(keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true
    }
    if(UA.webkit && keyCode === 0) {
      return true
    }
    switch(keyCode) {
      case KeyCode.SPACE:
      ;
      case KeyCode.QUESTION_MARK:
      ;
      case KeyCode.NUM_PLUS:
      ;
      case KeyCode.NUM_MINUS:
      ;
      case KeyCode.NUM_PERIOD:
      ;
      case KeyCode.NUM_DIVISION:
      ;
      case KeyCode.SEMICOLON:
      ;
      case KeyCode.DASH:
      ;
      case KeyCode.EQUALS:
      ;
      case KeyCode.COMMA:
      ;
      case KeyCode.PERIOD:
      ;
      case KeyCode.SLASH:
      ;
      case KeyCode.APOSTROPHE:
      ;
      case KeyCode.SINGLE_QUOTE:
      ;
      case KeyCode.OPEN_SQUARE_BRACKET:
      ;
      case KeyCode.BACKSLASH:
      ;
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false
    }
  };
  return KeyCode
});
KISSY.add("event/dom/base/gesture", [], function() {
  return{start:"mousedown", move:"mousemove", end:"mouseup", tap:"click", singleTap:"click", doubleTap:"dblclick"}
});
KISSY.add("event/dom/base/special-events", ["./dom-event", "./special"], function(S, require) {
  var DomEvent = require("./dom-event");
  var Special = require("./special");
  var UA = S.UA, MOUSE_WHEEL = UA.gecko ? "DOMMouseScroll" : "mousewheel";
  return S.mix(Special, {mousewheel:{typeFix:MOUSE_WHEEL}, load:{bubbles:false}, click:{fire:function(onlyHandlers) {
    var target = this;
    if(!onlyHandlers && String(target.type) === "checkbox" && target.click && target.nodeName.toLowerCase() === "input") {
      target.click();
      return false
    }
    return undefined
  }}, focus:{bubbles:false, preFire:function(event, onlyHandlers) {
    if(!onlyHandlers) {
      return DomEvent.fire(this, "focusin")
    }
  }, fire:function(onlyHandlers) {
    var target = this;
    if(!onlyHandlers && target.ownerDocument) {
      if(target !== target.ownerDocument.activeElement && target.focus) {
        target.focus();
        return false
      }
    }
    return undefined
  }}, blur:{bubbles:false, preFire:function(event, onlyHandlers) {
    if(!onlyHandlers) {
      return DomEvent.fire(this, "focusout")
    }
  }, fire:function(onlyHandlers) {
    var target = this;
    if(!onlyHandlers && target.ownerDocument) {
      if(target === target.ownerDocument.activeElement && target.blur) {
        target.blur();
        return false
      }
    }
    return undefined
  }}})
});
KISSY.add("event/dom/base/mouseenter", ["dom", "./special"], function(S, require) {
  var Dom = require("dom");
  var Special = require("./special");
  S.each([{name:"mouseenter", fix:"mouseover"}, {name:"mouseleave", fix:"mouseout"}], function(o) {
    Special[o.name] = {typeFix:o.fix, handle:function(event, observer, ce) {
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      if(!relatedTarget || relatedTarget !== currentTarget && !Dom.contains(currentTarget, relatedTarget)) {
        return[observer.simpleNotify(event, ce)]
      }
    }}
  })
});
KISSY.add("event/dom/base/valuechange", ["dom", "./dom-event", "./special"], function(S, require) {
  var Dom = require("dom");
  var DomEvent = require("./dom-event");
  var Special = require("./special");
  var VALUE_CHANGE = "valuechange", getNodeName = Dom.nodeName, KEY = "event/valuechange", HISTORY_KEY = KEY + "/history", POLL_KEY = KEY + "/poll", interval = 50;
  function clearPollTimer(target) {
    if(Dom.hasData(target, POLL_KEY)) {
      var poll = Dom.data(target, POLL_KEY);
      clearTimeout(poll);
      Dom.removeData(target, POLL_KEY)
    }
  }
  function stopPoll(target) {
    Dom.removeData(target, HISTORY_KEY);
    clearPollTimer(target)
  }
  function stopPollHandler(ev) {
    clearPollTimer(ev.target)
  }
  function checkChange(target) {
    var v = target.value, h = Dom.data(target, HISTORY_KEY);
    if(v !== h) {
      DomEvent.fireHandler(target, VALUE_CHANGE, {prevVal:h, newVal:v});
      Dom.data(target, HISTORY_KEY, v)
    }
  }
  function startPoll(target) {
    if(Dom.hasData(target, POLL_KEY)) {
      return
    }
    Dom.data(target, POLL_KEY, setTimeout(function check() {
      checkChange(target);
      Dom.data(target, POLL_KEY, setTimeout(check, interval))
    }, interval))
  }
  function startPollHandler(ev) {
    var target = ev.target;
    if(ev.type === "focus") {
      Dom.data(target, HISTORY_KEY, target.value)
    }
    startPoll(target)
  }
  function webkitSpeechChangeHandler(e) {
    checkChange(e.target)
  }
  function monitor(target) {
    unmonitored(target);
    DomEvent.on(target, "blur", stopPollHandler);
    DomEvent.on(target, "webkitspeechchange", webkitSpeechChangeHandler);
    DomEvent.on(target, "mousedown keyup keydown focus", startPollHandler)
  }
  function unmonitored(target) {
    stopPoll(target);
    DomEvent.detach(target, "blur", stopPollHandler);
    DomEvent.detach(target, "webkitspeechchange", webkitSpeechChangeHandler);
    DomEvent.detach(target, "mousedown keyup keydown focus", startPollHandler)
  }
  Special[VALUE_CHANGE] = {setup:function() {
    var target = this, nodeName = getNodeName(target);
    if(nodeName === "input" || nodeName === "textarea") {
      monitor(target)
    }
  }, tearDown:function() {
    var target = this;
    unmonitored(target)
  }};
  return DomEvent
});
KISSY.add("event/dom/base", ["./base/dom-event", "./base/object", "./base/key-codes", "./base/gesture", "./base/special-events", "./base/mouseenter", "./base/valuechange"], function(S, require) {
  var DomEvent = require("./base/dom-event");
  var DomEventObject = require("./base/object");
  var KeyCode = require("./base/key-codes");
  var Gesture = require("./base/gesture");
  var Special = require("./base/special-events");
  require("./base/mouseenter");
  require("./base/valuechange");
  return S.merge({add:DomEvent.on, remove:DomEvent.detach, KeyCode:KeyCode, Gesture:Gesture, Special:Special, Object:DomEventObject}, DomEvent)
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:15
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event/base/utils
 event/base/object
 event/base/observer
 event/base/observable
 event/base
*/

KISSY.add("event/base/utils", [], function(S) {
  var splitAndRun, getGroupsRe;
  function getTypedGroups(type) {
    if(type.indexOf(".") < 0) {
      return[type, ""]
    }
    var m = type.match(/([^.]+)?(\..+)?$/), t = m[1], ret = [t], gs = m[2];
    if(gs) {
      gs = gs.split(".").sort();
      ret.push(gs.join("."))
    }else {
      ret.push("")
    }
    return ret
  }
  return{splitAndRun:splitAndRun = function(type, fn) {
    if(S.isArray(type)) {
      S.each(type, fn);
      return
    }
    type = S.trim(type);
    if(type.indexOf(" ") === -1) {
      fn(type)
    }else {
      S.each(type.split(/\s+/), fn)
    }
  }, normalizeParam:function(type, fn, context) {
    var cfg = fn || {};
    if(typeof fn === "function") {
      cfg = {fn:fn, context:context}
    }else {
      cfg = S.merge(cfg)
    }
    var typedGroups = getTypedGroups(type);
    type = typedGroups[0];
    cfg.groups = typedGroups[1];
    cfg.type = type;
    return cfg
  }, batchForType:function(fn, num) {
    var args = S.makeArray(arguments), types = args[2 + num];
    if(types && typeof types === "object") {
      S.each(types, function(value, type) {
        var args2 = [].concat(args);
        args2.splice(0, 2);
        args2[num] = type;
        args2[num + 1] = value;
        fn.apply(null, args2)
      })
    }else {
      splitAndRun(types, function(type) {
        var args2 = [].concat(args);
        args2.splice(0, 2);
        args2[num] = type;
        fn.apply(null, args2)
      })
    }
  }, fillGroupsForEvent:function(type, eventData) {
    var typedGroups = getTypedGroups(type), _ksGroups = typedGroups[1];
    if(_ksGroups) {
      _ksGroups = getGroupsRe(_ksGroups);
      eventData._ksGroups = _ksGroups
    }
    eventData.type = typedGroups[0]
  }, getGroupsRe:getGroupsRe = function(groups) {
    return new RegExp(groups.split(".").join(".*\\.") + "(?:\\.|$)")
  }}
});
KISSY.add("event/base/object", [], function(S, undefined) {
  var returnFalse = function() {
    return false
  }, returnTrue = function() {
    return true
  };
  function EventObject() {
    var self = this;
    self.timeStamp = S.now();
    self.target = undefined;
    self.currentTarget = undefined
  }
  EventObject.prototype = {constructor:EventObject, isDefaultPrevented:returnFalse, isPropagationStopped:returnFalse, isImmediatePropagationStopped:returnFalse, preventDefault:function() {
    this.isDefaultPrevented = returnTrue
  }, stopPropagation:function() {
    this.isPropagationStopped = returnTrue
  }, stopImmediatePropagation:function() {
    var self = this;
    self.isImmediatePropagationStopped = returnTrue;
    self.stopPropagation()
  }, halt:function(immediate) {
    var self = this;
    if(immediate) {
      self.stopImmediatePropagation()
    }else {
      self.stopPropagation()
    }
    self.preventDefault()
  }};
  return EventObject
});
KISSY.add("event/base/observer", [], function(S, undefined) {
  function Observer(cfg) {
    S.mix(this, cfg)
  }
  Observer.prototype = {constructor:Observer, equals:function(s2) {
    var s1 = this;
    return!!S.reduce(s1.keys, function(v, k) {
      return v && s1[k] === s2[k]
    }, 1)
  }, simpleNotify:function(event, ce) {
    var ret, self = this;
    ret = self.fn.call(self.context || ce.currentTarget, event, self.data);
    if(self.once) {
      ce.removeObserver(self)
    }
    return ret
  }, notifyInternal:function(event, ce) {
    var ret = this.simpleNotify(event, ce);
    if(ret === false) {
      event.halt()
    }
    return ret
  }, notify:function(event, ce) {
    var self = this, _ksGroups = event._ksGroups;
    if(_ksGroups && (!self.groups || !self.groups.match(_ksGroups))) {
      return undefined
    }
    return self.notifyInternal(event, ce)
  }};
  return Observer
});
KISSY.add("event/base/observable", [], function(S) {
  function Observable(cfg) {
    var self = this;
    self.currentTarget = null;
    S.mix(self, cfg);
    self.reset()
  }
  Observable.prototype = {constructor:Observable, hasObserver:function() {
    return!!this.observers.length
  }, reset:function() {
    var self = this;
    self.observers = []
  }, removeObserver:function(observer) {
    var self = this, i, observers = self.observers, len = observers.length;
    for(i = 0;i < len;i++) {
      if(observers[i] === observer) {
        observers.splice(i, 1);
        break
      }
    }
    self.checkMemory()
  }, checkMemory:function() {
  }, findObserver:function(observer) {
    var observers = this.observers, i;
    for(i = observers.length - 1;i >= 0;--i) {
      if(observer.equals(observers[i])) {
        return i
      }
    }
    return-1
  }};
  return Observable
});
KISSY.add("event/base", ["./base/utils", "./base/object", "./base/observer", "./base/observable"], function(S, require) {
  var Utils = require("./base/utils");
  var Object = require("./base/object");
  var Observer = require("./base/observer");
  var Observable = require("./base/observable");
  return{Utils:Utils, Object:Object, Observer:Observer, Observable:Observable}
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:16
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event/dom/shake
*/

KISSY.add("event/dom/shake", ["event/dom/base"], function(S, require) {
  var DomEvent = require("event/dom/base");
  var Special = DomEvent.Special, start = 5, enough = 20, shaking = 0, lastX, lastY, lastZ, max = Math.max, abs = Math.abs, win = S.Env.host, devicemotion = "devicemotion", checkShake = S.buffer(function() {
    if(shaking) {
      DomEvent.fireHandler(win, "shake", {accelerationIncludingGravity:{x:lastX, y:lastY, z:lastZ}});
      clear()
    }
  }, 250);
  Special.shake = {setup:function() {
    if(this !== win) {
      return
    }
    win.addEventListener(devicemotion, shake, false)
  }, tearDown:function() {
    if(this !== win) {
      return
    }
    checkShake.stop();
    clear();
    win.removeEventListener(devicemotion, shake, false)
  }};
  function clear() {
    lastX = undefined;
    shaking = 0
  }
  function shake(e) {
    var accelerationIncludingGravity = e.accelerationIncludingGravity, x = accelerationIncludingGravity.x, y = accelerationIncludingGravity.y, z = accelerationIncludingGravity.z, diff;
    if(lastX !== undefined) {
      diff = max(abs(x - lastX), abs(y - lastY), abs(z - lastZ));
      if(diff > start) {
        checkShake()
      }
      if(diff > enough) {
        shaking = 1
      }
    }
    lastX = x;
    lastY = y;
    lastZ = z
  }
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:15
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event/dom/focusin
*/

KISSY.add("event/dom/focusin", ["event/dom/base"], function(S, require) {
  var DomEvent = require("event/dom/base");
  var Special = DomEvent.Special;
  S.each([{name:"focusin", fix:"focus"}, {name:"focusout", fix:"blur"}], function(o) {
    var key = S.guid("attaches_" + S.now() + "_");
    Special[o.name] = {setup:function() {
      var doc = this.ownerDocument || this;
      if(!(key in doc)) {
        doc[key] = 0
      }
      doc[key] += 1;
      if(doc[key] === 1) {
        doc.addEventListener(o.fix, handler, true)
      }
    }, tearDown:function() {
      var doc = this.ownerDocument || this;
      doc[key] -= 1;
      if(doc[key] === 0) {
        doc.removeEventListener(o.fix, handler, true)
      }
    }};
    function handler(event) {
      var target = event.target;
      return DomEvent.fire(target, o.name)
    }
  });
  return DomEvent
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:04
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 anim
*/

KISSY.add("anim", ["anim/base", "anim/timer", "anim/transition?"], function(S, require) {
  var AnimBase = require("anim/base"), TimerAnim = require("anim/timer");
  var TransitionAnim = require("anim/transition?");
  var logger = S.getLogger("s/anim");
  var Utils = AnimBase.Utils, defaultConfig = {duration:1, easing:"linear"};
  function Anim(node, to, duration, easing, complete) {
    var config;
    if(node.node) {
      config = node
    }else {
      if(typeof to === "string") {
        to = S.unparam(String(to), ";", ":");
        S.each(to, function(value, prop) {
          var trimProp = S.trim(prop);
          if(trimProp) {
            to[trimProp] = S.trim(value)
          }
          if(!trimProp || trimProp !== prop) {
            delete to[prop]
          }
        })
      }else {
        to = S.clone(to)
      }
      if(S.isPlainObject(duration)) {
        config = S.clone(duration)
      }else {
        config = {complete:complete};
        if(duration) {
          config.duration = duration
        }
        if(easing) {
          config.easing = easing
        }
      }
      config.node = node;
      config.to = to
    }
    config = S.merge(defaultConfig, config, {useTransition:S.config("anim/useTransition")});
    if(config.useTransition && TransitionAnim) {
      logger.info("use transition anim");
      return new TransitionAnim(config)
    }else {
      logger.info("use js timer anim");
      return new TimerAnim(config)
    }
  }
  S.each(["pause", "resume"], function(action) {
    Anim[action] = function(node, queue) {
      if(queue === null || typeof queue === "string" || queue === false) {
        return Utils.pauseOrResumeQueue(node, queue, action)
      }
      return Utils.pauseOrResumeQueue(node, undefined, action)
    }
  });
  Anim.isRunning = Utils.isElRunning;
  Anim.isPaused = Utils.isElPaused;
  Anim.stop = Utils.stopEl;
  Anim.Easing = TimerAnim.Easing;
  S.Anim = Anim;
  Anim.Q = AnimBase.Q;
  return Anim
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 23 18:52
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 anim/base/queue
 anim/base/utils
 anim/base
*/

KISSY.add("anim/base/queue", ["dom"], function(S, require) {
  var Dom = require("dom");
  var queueCollectionKey = S.guid("ks-queue-" + S.now() + "-"), queueKey = S.guid("ks-queue-" + S.now() + "-"), Q;
  function getQueue(node, name, readOnly) {
    name = name || queueKey;
    var qu, quCollection = Dom.data(node, queueCollectionKey);
    if(!quCollection && !readOnly) {
      Dom.data(node, queueCollectionKey, quCollection = {})
    }
    if(quCollection) {
      qu = quCollection[name];
      if(!qu && !readOnly) {
        qu = quCollection[name] = []
      }
    }
    return qu
  }
  Q = {queueCollectionKey:queueCollectionKey, queue:function(node, queue, item) {
    var qu = getQueue(node, queue);
    qu.push(item);
    return qu
  }, remove:function(node, queue, item) {
    var qu = getQueue(node, queue, 1), index;
    if(qu) {
      index = S.indexOf(item, qu);
      if(index > -1) {
        qu.splice(index, 1)
      }
    }
    if(qu && !qu.length) {
      Q.clearQueue(node, queue)
    }
    return qu
  }, clearQueues:function(node) {
    Dom.removeData(node, queueCollectionKey)
  }, clearQueue:function clearQueue(node, queue) {
    queue = queue || queueKey;
    var quCollection = Dom.data(node, queueCollectionKey);
    if(quCollection) {
      delete quCollection[queue]
    }
    if(S.isEmptyObject(quCollection)) {
      Dom.removeData(node, queueCollectionKey)
    }
  }, dequeue:function(node, queue) {
    var qu = getQueue(node, queue, 1);
    if(qu) {
      qu.shift();
      if(!qu.length) {
        Q.clearQueue(node, queue)
      }
    }
    return qu
  }};
  return Q
});
KISSY.add("anim/base/utils", ["./queue", "dom"], function(S, require) {
  var Q = require("./queue"), Dom = require("dom");
  var runningKey = S.guid("ks-anim-unqueued-" + S.now() + "-");
  function saveRunningAnim(anim) {
    var node = anim.node, allRunning = Dom.data(node, runningKey);
    if(!allRunning) {
      Dom.data(node, runningKey, allRunning = {})
    }
    allRunning[S.stamp(anim)] = anim
  }
  function removeRunningAnim(anim) {
    var node = anim.node, allRunning = Dom.data(node, runningKey);
    if(allRunning) {
      delete allRunning[S.stamp(anim)];
      if(S.isEmptyObject(allRunning)) {
        Dom.removeData(node, runningKey)
      }
    }
  }
  function isAnimRunning(anim) {
    var node = anim.node, allRunning = Dom.data(node, runningKey);
    if(allRunning) {
      return!!allRunning[S.stamp(anim)]
    }
    return 0
  }
  var pausedKey = S.guid("ks-anim-paused-" + S.now() + "-");
  function savePausedAnim(anim) {
    var node = anim.node, paused = Dom.data(node, pausedKey);
    if(!paused) {
      Dom.data(node, pausedKey, paused = {})
    }
    paused[S.stamp(anim)] = anim
  }
  function removePausedAnim(anim) {
    var node = anim.node, paused = Dom.data(node, pausedKey);
    if(paused) {
      delete paused[S.stamp(anim)];
      if(S.isEmptyObject(paused)) {
        Dom.removeData(node, pausedKey)
      }
    }
  }
  function isAnimPaused(anim) {
    var node = anim.node, paused = Dom.data(node, pausedKey);
    if(paused) {
      return!!paused[S.stamp(anim)]
    }
    return 0
  }
  function pauseOrResumeQueue(node, queue, action) {
    var allAnims = Dom.data(node, action === "resume" ? pausedKey : runningKey), anims = S.merge(allAnims);
    S.each(anims, function(anim) {
      if(queue === undefined || anim.config.queue === queue) {
        anim[action]()
      }
    })
  }
  return{saveRunningAnim:saveRunningAnim, removeRunningAnim:removeRunningAnim, isAnimPaused:isAnimPaused, removePausedAnim:removePausedAnim, savePausedAnim:savePausedAnim, isAnimRunning:isAnimRunning, isElPaused:function(node) {
    var paused = Dom.data(node, pausedKey);
    return paused && !S.isEmptyObject(paused)
  }, isElRunning:function(node) {
    var allRunning = Dom.data(node, runningKey);
    return allRunning && !S.isEmptyObject(allRunning)
  }, pauseOrResumeQueue:pauseOrResumeQueue, stopEl:function(node, end, clearQueue, queue) {
    if(clearQueue) {
      if(queue === undefined) {
        Q.clearQueues(node)
      }else {
        if(queue !== false) {
          Q.clearQueue(node, queue)
        }
      }
    }
    var allRunning = Dom.data(node, runningKey), anims = S.merge(allRunning);
    S.each(anims, function(anim) {
      if(queue === undefined || anim.config.queue === queue) {
        anim.stop(end)
      }
    })
  }}
});
KISSY.add("anim/base", ["dom", "./base/utils", "./base/queue", "promise"], function(S, require) {
  var Dom = require("dom"), Utils = require("./base/utils"), Q = require("./base/queue"), Promise = require("promise");
  var logger = S.getLogger("s/anim");
  var NodeType = Dom.NodeType, noop = S.noop, specialVals = {toggle:1, hide:1, show:1};
  function AnimBase(config) {
    var self = this;
    AnimBase.superclass.constructor.call(self);
    Promise.Defer(self);
    self.config = config;
    var node = config.node;
    if(!S.isPlainObject(node)) {
      node = Dom.get(config.node)
    }
    self.node = self.el = node;
    self._backupProps = {};
    self._propsData = {}
  }
  function syncComplete(self) {
    var _backupProps, complete = self.config.complete;
    if(!S.isEmptyObject(_backupProps = self._backupProps)) {
      Dom.css(self.node, _backupProps)
    }
    if(complete) {
      complete.call(self)
    }
  }
  S.extend(AnimBase, Promise, {on:function(name, fn) {
    var self = this;
    logger.warn("please use promise api of anim instead");
    if(name === "complete") {
      self.then(fn)
    }else {
      if(name === "end") {
        self.fin(fn)
      }else {
        if(name === "step") {
          self.progress(fn)
        }else {
          logger.error("not supported event for anim: " + name)
        }
      }
    }
    return self
  }, prepareFx:noop, runInternal:function() {
    var self = this, config = self.config, node = self.node, val, _backupProps = self._backupProps, _propsData = self._propsData, to = config.to, defaultDelay = config.delay || 0, defaultDuration = config.duration;
    Utils.saveRunningAnim(self);
    S.each(to, function(val, prop) {
      if(!S.isPlainObject(val)) {
        val = {value:val}
      }
      _propsData[prop] = S.mix({delay:defaultDelay, easing:config.easing, frame:config.frame, duration:defaultDuration}, val)
    });
    if(node.nodeType === NodeType.ELEMENT_NODE) {
      if(to.width || to.height) {
        var elStyle = node.style;
        S.mix(_backupProps, {overflow:elStyle.overflow, "overflow-x":elStyle.overflowX, "overflow-y":elStyle.overflowY});
        elStyle.overflow = "hidden";
        if(Dom.css(node, "display") === "inline" && Dom.css(node, "float") === "none") {
          if(S.UA.ieMode < 10) {
            elStyle.zoom = 1
          }else {
            elStyle.display = "inline-block"
          }
        }
      }
      var exit, hidden;
      hidden = Dom.css(node, "display") === "none";
      S.each(_propsData, function(_propData, prop) {
        val = _propData.value;
        if(specialVals[val]) {
          if(val === "hide" && hidden || val === "show" && !hidden) {
            self.stop(true);
            exit = false;
            return exit
          }
          _backupProps[prop] = Dom.style(node, prop);
          if(val === "toggle") {
            val = hidden ? "show" : "hide"
          }
          if(val === "hide") {
            _propData.value = 0;
            _backupProps.display = "none"
          }else {
            _propData.value = Dom.css(node, prop);
            Dom.css(node, prop, 0);
            Dom.show(node)
          }
        }
        return undefined
      });
      if(exit === false) {
        return
      }
    }
    self.startTime = S.now();
    if(S.isEmptyObject(_propsData)) {
      self.__totalTime = defaultDuration * 1E3;
      self.__waitTimeout = setTimeout(function() {
        self.stop(true)
      }, self.__totalTime)
    }else {
      self.prepareFx();
      self.doStart()
    }
  }, isRunning:function() {
    return Utils.isAnimRunning(this)
  }, isPaused:function() {
    return Utils.isAnimPaused(this)
  }, pause:function() {
    var self = this;
    if(self.isRunning()) {
      self._runTime = S.now() - self.startTime;
      self.__totalTime -= self._runTime;
      Utils.removeRunningAnim(self);
      Utils.savePausedAnim(self);
      if(self.__waitTimeout) {
        clearTimeout(self.__waitTimeout)
      }else {
        self.doStop()
      }
    }
    return self
  }, doStop:noop, doStart:noop, resume:function() {
    var self = this;
    if(self.isPaused()) {
      self.startTime = S.now() - self._runTime;
      Utils.removePausedAnim(self);
      Utils.saveRunningAnim(self);
      if(self.__waitTimeout) {
        self.__waitTimeout = setTimeout(function() {
          self.stop(true)
        }, self.__totalTime)
      }else {
        self.beforeResume();
        self.doStart()
      }
    }
    return self
  }, beforeResume:noop, run:function() {
    var self = this, q, queue = self.config.queue;
    if(queue === false) {
      self.runInternal()
    }else {
      q = Q.queue(self.node, queue, self);
      if(q.length === 1) {
        self.runInternal()
      }
    }
    return self
  }, stop:function(finish) {
    var self = this, node = self.node, q, queue = self.config.queue;
    if(self.isResolved() || self.isRejected()) {
      return self
    }
    if(self.__waitTimeout) {
      clearTimeout(self.__waitTimeout);
      self.__waitTimeout = 0
    }
    if(!self.isRunning() && !self.isPaused()) {
      if(queue !== false) {
        Q.remove(node, queue, self)
      }
      return self
    }
    self.doStop(finish);
    Utils.removeRunningAnim(self);
    Utils.removePausedAnim(self);
    var defer = self.defer;
    if(finish) {
      syncComplete(self);
      defer.resolve([self])
    }else {
      defer.reject([self])
    }
    if(queue !== false) {
      q = Q.dequeue(node, queue);
      if(q && q[0]) {
        q[0].runInternal()
      }
    }
    return self
  }});
  AnimBase.Utils = Utils;
  AnimBase.Q = Q;
  return AnimBase
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:17
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 promise
*/

KISSY.add("promise", [], function(S) {
  var logger = S.getLogger("s/promise");
  var PROMISE_VALUE = "__promise_value", processImmediate = S.setImmediate, PROMISE_PROGRESS_LISTENERS = "__promise_progress_listeners", PROMISE_PENDINGS = "__promise_pendings";
  function logError(str) {
    if(typeof console !== "undefined" && console.error) {
      console.error(str)
    }
  }
  function promiseWhen(promise, fulfilled, rejected) {
    if(promise instanceof Reject) {
      processImmediate(function() {
        rejected.call(promise, promise[PROMISE_VALUE])
      })
    }else {
      var v = promise[PROMISE_VALUE], pendings = promise[PROMISE_PENDINGS];
      if(pendings) {
        pendings.push([fulfilled, rejected])
      }else {
        if(isPromise(v)) {
          promiseWhen(v, fulfilled, rejected)
        }else {
          if(fulfilled) {
            processImmediate(function() {
              fulfilled.call(promise, v)
            })
          }
        }
      }
    }
  }
  function Defer(promise) {
    var self = this;
    if(!(self instanceof Defer)) {
      return new Defer(promise)
    }
    self.promise = promise || new Promise;
    self.promise.defer = self
  }
  Defer.prototype = {constructor:Defer, resolve:function(value) {
    var promise = this.promise, pendings;
    if(!(pendings = promise[PROMISE_PENDINGS])) {
      return null
    }
    promise[PROMISE_VALUE] = value;
    pendings = [].concat(pendings);
    promise[PROMISE_PENDINGS] = undefined;
    promise[PROMISE_PROGRESS_LISTENERS] = undefined;
    S.each(pendings, function(p) {
      promiseWhen(promise, p[0], p[1])
    });
    return value
  }, reject:function(reason) {
    return this.resolve(new Reject(reason))
  }, notify:function(message) {
    S.each(this.promise[PROMISE_PROGRESS_LISTENERS], function(listener) {
      processImmediate(function() {
        listener(message)
      })
    })
  }};
  function isPromise(obj) {
    return obj && obj instanceof Promise
  }
  function Promise(v) {
    var self = this;
    self[PROMISE_VALUE] = v;
    if(v === undefined) {
      self[PROMISE_PENDINGS] = [];
      self[PROMISE_PROGRESS_LISTENERS] = []
    }
  }
  Promise.prototype = {constructor:Promise, then:function(fulfilled, rejected, progressListener) {
    if(progressListener) {
      this.progress(progressListener)
    }
    return when(this, fulfilled, rejected)
  }, progress:function(progressListener) {
    if(this[PROMISE_PROGRESS_LISTENERS]) {
      this[PROMISE_PROGRESS_LISTENERS].push(progressListener)
    }
    return this
  }, fail:function(rejected) {
    return when(this, 0, rejected)
  }, fin:function(callback) {
    return when(this, function(value) {
      return callback(value, true)
    }, function(reason) {
      return callback(reason, false)
    })
  }, done:function(fulfilled, rejected) {
    var self = this, onUnhandledError = function(e) {
      S.log(e.stack || e, "error");
      setTimeout(function() {
        throw e;
      }, 0)
    }, promiseToHandle = fulfilled || rejected ? self.then(fulfilled, rejected) : self;
    promiseToHandle.fail(onUnhandledError)
  }, isResolved:function() {
    return isResolved(this)
  }, isRejected:function() {
    return isRejected(this)
  }};
  function Reject(reason) {
    if(reason instanceof Reject) {
      return reason
    }
    var self = this;
    Promise.apply(self, arguments);
    if(self[PROMISE_VALUE] instanceof Promise) {
      logger.error("assert.not(this.__promise_value instanceof promise) in Reject constructor")
    }
    return self
  }
  S.extend(Reject, Promise);
  function when(value, fulfilled, rejected) {
    var defer = new Defer, done = 0;
    function _fulfilled(value) {
      try {
        return fulfilled ? fulfilled.call(this, value) : value
      }catch(e) {
        logError(e.stack || e);
        return new Reject(e)
      }
    }
    function _rejected(reason) {
      try {
        return rejected ? rejected.call(this, reason) : new Reject(reason)
      }catch(e) {
        logError(e.stack || e);
        return new Reject(e)
      }
    }
    function finalFulfill(value) {
      if(done) {
        logger.error("already done at fulfilled");
        return
      }
      if(value instanceof Promise) {
        logger.error("assert.not(value instanceof Promise) in when");
        return
      }
      done = 1;
      defer.resolve(_fulfilled.call(this, value))
    }
    if(value instanceof Promise) {
      promiseWhen(value, finalFulfill, function(reason) {
        if(done) {
          logger.error("already done at rejected");
          return
        }
        done = 1;
        defer.resolve(_rejected.call(this, reason))
      })
    }else {
      finalFulfill(value)
    }
    return defer.promise
  }
  function isResolved(obj) {
    return!isRejected(obj) && isPromise(obj) && obj[PROMISE_PENDINGS] === undefined && (!isPromise(obj[PROMISE_VALUE]) || isResolved(obj[PROMISE_VALUE]))
  }
  function isRejected(obj) {
    return isPromise(obj) && obj[PROMISE_PENDINGS] === undefined && obj[PROMISE_VALUE] instanceof Reject
  }
  KISSY.Defer = Defer;
  KISSY.Promise = Promise;
  Promise.Defer = Defer;
  S.mix(Promise, {when:when, isPromise:isPromise, isResolved:isResolved, isRejected:isRejected, all:function(promises) {
    var count = promises.length;
    if(!count) {
      return null
    }
    var defer = new Defer;
    for(var i = 0;i < promises.length;i++) {
      (function(promise, i) {
        when(promise, function(value) {
          promises[i] = value;
          if(--count === 0) {
            defer.resolve(promises)
          }
        }, function(r) {
          defer.reject(r)
        })
      })(promises[i], i)
    }
    return defer.promise
  }, async:function(generatorFunc) {
    return function() {
      var generator = generatorFunc.apply(this, arguments);
      function doAction(action, arg) {
        var result;
        try {
          result = generator[action](arg)
        }catch(e) {
          return new Reject(e)
        }
        if(result.done) {
          return result.value
        }
        return when(result.value, next, throwEx)
      }
      function next(v) {
        return doAction("next", v)
      }
      function throwEx(e) {
        return doAction("throw", e)
      }
      return next()
    }
  }});
  return Promise
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:04
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 anim/timer/easing
 anim/timer/manager
 anim/timer/fx
 anim/timer/short-hand
 anim/timer/color
 anim/timer/transform
 anim/timer
*/

KISSY.add("anim/timer/easing", [], function() {
  var PI = Math.PI, pow = Math.pow, sin = Math.sin, parseNumber = parseFloat, CUBIC_BEZIER_REG = /^cubic-bezier\(([^,]+),([^,]+),([^,]+),([^,]+)\)$/i, BACK_CONST = 1.70158;
  function easeNone(t) {
    return t
  }
  var Easing = {swing:function(t) {
    return-Math.cos(t * PI) / 2 + 0.5
  }, easeNone:easeNone, linear:easeNone, easeIn:function(t) {
    return t * t
  }, ease:cubicBezierFunction(0.25, 0.1, 0.25, 1), "ease-in":cubicBezierFunction(0.42, 0, 1, 1), "ease-out":cubicBezierFunction(0, 0, 0.58, 1), "ease-in-out":cubicBezierFunction(0.42, 0, 0.58, 1), "ease-out-in":cubicBezierFunction(0, 0.42, 1, 0.58), toFn:function(easingStr) {
    var m;
    if(m = easingStr.match(CUBIC_BEZIER_REG)) {
      return cubicBezierFunction(parseNumber(m[1]), parseNumber(m[2]), parseNumber(m[3]), parseNumber(m[4]))
    }
    return Easing[easingStr] || easeNone
  }, easeOut:function(t) {
    return(2 - t) * t
  }, easeBoth:function(t) {
    return(t *= 2) < 1 ? 0.5 * t * t : 0.5 * (1 - --t * (t - 2))
  }, easeInStrong:function(t) {
    return t * t * t * t
  }, easeOutStrong:function(t) {
    return 1 - --t * t * t * t
  }, easeBothStrong:function(t) {
    return(t *= 2) < 1 ? 0.5 * t * t * t * t : 0.5 * (2 - (t -= 2) * t * t * t)
  }, elasticIn:function(t) {
    var p = 0.3, s = p / 4;
    if(t === 0 || t === 1) {
      return t
    }
    return-(pow(2, 10 * (t -= 1)) * sin((t - s) * 2 * PI / p))
  }, elasticOut:function(t) {
    var p = 0.3, s = p / 4;
    if(t === 0 || t === 1) {
      return t
    }
    return pow(2, -10 * t) * sin((t - s) * 2 * PI / p) + 1
  }, elasticBoth:function(t) {
    var p = 0.45, s = p / 4;
    if(t === 0 || (t *= 2) === 2) {
      return t
    }
    if(t < 1) {
      return-0.5 * pow(2, 10 * (t -= 1)) * sin((t - s) * 2 * PI / p)
    }
    return pow(2, -10 * (t -= 1)) * sin((t - s) * 2 * PI / p) * 0.5 + 1
  }, backIn:function(t) {
    if(t === 1) {
      t -= 0.001
    }
    return t * t * ((BACK_CONST + 1) * t - BACK_CONST)
  }, backOut:function(t) {
    return(t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1
  }, backBoth:function(t) {
    var s = BACK_CONST;
    var m = (s *= 1.525) + 1;
    if((t *= 2) < 1) {
      return 0.5 * t * t * (m * t - s)
    }
    return 0.5 * ((t -= 2) * t * (m * t + s) + 2)
  }, bounceIn:function(t) {
    return 1 - Easing.bounceOut(1 - t)
  }, bounceOut:function(t) {
    var s = 7.5625, r;
    if(t < 1 / 2.75) {
      r = s * t * t
    }else {
      if(t < 2 / 2.75) {
        r = s * (t -= 1.5 / 2.75) * t + 0.75
      }else {
        if(t < 2.5 / 2.75) {
          r = s * (t -= 2.25 / 2.75) * t + 0.9375
        }else {
          r = s * (t -= 2.625 / 2.75) * t + 0.984375
        }
      }
    }
    return r
  }, bounceBoth:function(t) {
    if(t < 0.5) {
      return Easing.bounceIn(t * 2) * 0.5
    }
    return Easing.bounceOut(t * 2 - 1) * 0.5 + 0.5
  }};
  var ZERO_LIMIT = 1.0E-6, abs = Math.abs;
  function cubicBezierFunction(p1x, p1y, p2x, p2y) {
    var ax = 3 * p1x - 3 * p2x + 1, bx = 3 * p2x - 6 * p1x, cx = 3 * p1x;
    var ay = 3 * p1y - 3 * p2y + 1, by = 3 * p2y - 6 * p1y, cy = 3 * p1y;
    function sampleCurveDerivativeX(t) {
      return(3 * ax * t + 2 * bx) * t + cx
    }
    function sampleCurveX(t) {
      return((ax * t + bx) * t + cx) * t
    }
    function sampleCurveY(t) {
      return((ay * t + by) * t + cy) * t
    }
    function solveCurveX(x) {
      var t2 = x, derivative, x2;
      for(var i = 0;i < 8;i++) {
        x2 = sampleCurveX(t2) - x;
        if(abs(x2) < ZERO_LIMIT) {
          return t2
        }
        derivative = sampleCurveDerivativeX(t2);
        if(abs(derivative) < ZERO_LIMIT) {
          break
        }
        t2 -= x2 / derivative
      }
      var t1 = 1, t0 = 0;
      t2 = x;
      while(t1 > t0) {
        x2 = sampleCurveX(t2) - x;
        if(abs(x2) < ZERO_LIMIT) {
          return t2
        }
        if(x2 > 0) {
          t1 = t2
        }else {
          t0 = t2
        }
        t2 = (t1 + t0) / 2
      }
      return t2
    }
    function solve(x) {
      return sampleCurveY(solveCurveX(x))
    }
    return solve
  }
  return Easing
});
KISSY.add("anim/timer/manager", [], function(S) {
  var stamp = S.stamp, win = S.Env.host, INTERVAL = 15, requestAnimationFrameFn, cancelAnimationFrameFn;
  if(0) {
    requestAnimationFrameFn = win.requestAnimationFrame;
    cancelAnimationFrameFn = win.cancelAnimationFrame;
    var vendors = ["ms", "moz", "webkit", "o"];
    for(var x = 0;x < vendors.length && !requestAnimationFrameFn;++x) {
      requestAnimationFrameFn = win[vendors[x] + "RequestAnimationFrame"];
      cancelAnimationFrameFn = win[vendors[x] + "CancelAnimationFrame"] || win[vendors[x] + "CancelRequestAnimationFrame"]
    }
  }else {
    requestAnimationFrameFn = function(fn) {
      return setTimeout(fn, INTERVAL)
    };
    cancelAnimationFrameFn = function(timer) {
      clearTimeout(timer)
    }
  }
  return{runnings:{}, timer:null, start:function(anim) {
    var self = this, kv = stamp(anim);
    if(self.runnings[kv]) {
      return
    }
    self.runnings[kv] = anim;
    self.startTimer()
  }, stop:function(anim) {
    this.notRun(anim)
  }, notRun:function(anim) {
    var self = this, kv = stamp(anim);
    delete self.runnings[kv];
    if(S.isEmptyObject(self.runnings)) {
      self.stopTimer()
    }
  }, pause:function(anim) {
    this.notRun(anim)
  }, resume:function(anim) {
    this.start(anim)
  }, startTimer:function() {
    var self = this;
    if(!self.timer) {
      self.timer = requestAnimationFrameFn(function run() {
        if(self.runFrames()) {
          self.stopTimer()
        }else {
          self.timer = requestAnimationFrameFn(run)
        }
      })
    }
  }, stopTimer:function() {
    var self = this, t = self.timer;
    if(t) {
      cancelAnimationFrameFn(t);
      self.timer = 0
    }
  }, runFrames:function() {
    var self = this, r, flag, runnings = self.runnings;
    for(r in runnings) {
      runnings[r].frame()
    }
    for(r in runnings) {
      flag = 0;
      break
    }
    return flag === undefined
  }}
});
KISSY.add("anim/timer/fx", ["dom"], function(S, require) {
  var logger = S.getLogger("s/aim/timer/fx");
  var Dom = require("dom");
  function load(self, cfg) {
    S.mix(self, cfg);
    self.pos = 0;
    self.unit = self.unit || ""
  }
  function Fx(cfg) {
    load(this, cfg)
  }
  Fx.prototype = {isCustomFx:0, constructor:Fx, load:function(cfg) {
    load(this, cfg)
  }, frame:function(pos) {
    if(this.pos === 1) {
      return
    }
    var self = this, anim = self.anim, prop = self.prop, node = anim.node, from = self.from, propData = self.propData, to = self.to;
    if(pos === undefined) {
      pos = getPos(anim, propData)
    }
    self.pos = pos;
    if(from === to || pos === 0) {
      return
    }
    var val = self.interpolate(from, to, self.pos);
    self.val = val;
    if(propData.frame) {
      propData.frame.call(self, anim, self)
    }else {
      if(!self.isCustomFx) {
        if(val === undefined) {
          self.pos = 1;
          val = to;
          logger.warn(prop + " update directly ! : " + val + " : " + from + " : " + to)
        }else {
          val += self.unit
        }
        self.val = val;
        if(self.type === "attr") {
          Dom.attr(node, prop, val, 1)
        }else {
          Dom.css(node, prop, val)
        }
      }
    }
  }, interpolate:function(from, to, pos) {
    if(typeof from === "number" && typeof to === "number") {
      return Math.round((from + (to - from) * pos) * 1E5) / 1E5
    }else {
      return undefined
    }
  }, cur:function() {
    var self = this, prop = self.prop, type, parsed, r, node = self.anim.node;
    if(self.isCustomFx) {
      return node[prop] || 0
    }
    if(!(type = self.type)) {
      type = self.type = isAttr(node, prop) ? "attr" : "css"
    }
    if(type === "attr") {
      r = Dom.attr(node, prop, undefined, 1)
    }else {
      r = Dom.css(node, prop)
    }
    return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed
  }};
  function isAttr(node, prop) {
    if((!node.style || node.style[prop] == null) && Dom.attr(node, prop, undefined, 1) != null) {
      return 1
    }
    return 0
  }
  function getPos(anim, propData) {
    var t = S.now(), runTime, startTime = anim.startTime, delay = propData.delay, duration = propData.duration;
    runTime = t - startTime - delay;
    if(runTime <= 0) {
      return 0
    }else {
      if(runTime >= duration) {
        return 1
      }else {
        return propData.easing(runTime / duration)
      }
    }
  }
  Fx.Factories = {};
  Fx.FxTypes = {};
  Fx.getFx = function(cfg) {
    var Constructor = Fx, fxType, SubClass;
    if(fxType = cfg.fxType) {
      Constructor = Fx.FxTypes[fxType]
    }else {
      if(!cfg.isCustomFx && (SubClass = Fx.Factories[cfg.prop])) {
        Constructor = SubClass
      }
    }
    return new Constructor(cfg)
  };
  return Fx
});
KISSY.add("anim/timer/short-hand", [], function() {
  return{background:[], border:["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"], borderBottom:["borderBottomWidth"], borderLeft:["borderLeftWidth"], borderTop:["borderTopWidth"], borderRight:["borderRightWidth"], font:["fontSize", "fontWeight"], margin:["marginBottom", "marginLeft", "marginRight", "marginTop"], padding:["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"]}
});
KISSY.add("anim/timer/color", ["./fx", "./short-hand"], function(S, require) {
  var Fx = require("./fx");
  var SHORT_HANDS = require("./short-hand");
  var logger = S.getLogger("s/anim/timer/color");
  var HEX_BASE = 16, floor = Math.floor, KEYWORDS = {black:[0, 0, 0], silver:[192, 192, 192], gray:[128, 128, 128], white:[255, 255, 255], maroon:[128, 0, 0], red:[255, 0, 0], purple:[128, 0, 128], fuchsia:[255, 0, 255], green:[0, 128, 0], lime:[0, 255, 0], olive:[128, 128, 0], yellow:[255, 255, 0], navy:[0, 0, 128], blue:[0, 0, 255], teal:[0, 128, 128], aqua:[0, 255, 255]}, RE_RGB = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i, RE_RGBA = /^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+),\s*([0-9]+)\)$/i, 
  RE_HEX = /^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i, COLORS = ["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"];
  SHORT_HANDS.background.push("backgroundColor");
  SHORT_HANDS.borderColor = ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"];
  SHORT_HANDS.border.push("borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor");
  SHORT_HANDS.borderBottom.push("borderBottomColor");
  SHORT_HANDS.borderLeft.push("borderLeftColor");
  SHORT_HANDS.borderRight.push("borderRightColor");
  SHORT_HANDS.borderTop.push("borderTopColor");
  function numericColor(val) {
    val = val + "";
    var match;
    if(match = val.match(RE_RGB)) {
      return[parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
    }else {
      if(match = val.match(RE_RGBA)) {
        return[parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4])]
      }else {
        if(match = val.match(RE_HEX)) {
          for(var i = 1;i < match.length;i++) {
            if(match[i].length < 2) {
              match[i] += match[i]
            }
          }
          return[parseInt(match[1], HEX_BASE), parseInt(match[2], HEX_BASE), parseInt(match[3], HEX_BASE)]
        }
      }
    }
    if(KEYWORDS[val = val.toLowerCase()]) {
      return KEYWORDS[val]
    }
    logger.warn("only allow rgb or hex color string : " + val);
    return[255, 255, 255]
  }
  function ColorFx() {
    ColorFx.superclass.constructor.apply(this, arguments)
  }
  S.extend(ColorFx, Fx, {load:function() {
    var self = this;
    ColorFx.superclass.load.apply(self, arguments);
    if(self.from) {
      self.from = numericColor(self.from)
    }
    if(self.to) {
      self.to = numericColor(self.to)
    }
  }, interpolate:function(from, to, pos) {
    var interpolate = ColorFx.superclass.interpolate;
    if(from.length === 3 && to.length === 3) {
      return"rgb(" + [floor(interpolate(from[0], to[0], pos)), floor(interpolate(from[1], to[1], pos)), floor(interpolate(from[2], to[2], pos))].join(", ") + ")"
    }else {
      if(from.length === 4 || to.length === 4) {
        return"rgba(" + [floor(interpolate(from[0], to[0], pos)), floor(interpolate(from[1], to[1], pos)), floor(interpolate(from[2], to[2], pos)), floor(interpolate(from[3] || 1, to[3] || 1, pos))].join(", ") + ")"
      }else {
        logger.warn("unknown value : " + from);
        return undefined
      }
    }
  }});
  S.each(COLORS, function(color) {
    Fx.Factories[color] = ColorFx
  });
  Fx.FxTypes.color = ColorFx;
  return ColorFx
});
KISSY.add("anim/timer/transform", ["dom", "./fx"], function(S, require) {
  var Dom = require("dom");
  var Fx = require("./fx");
  var translateTpl = S.Features.isTransform3dSupported() ? "translate3d({translateX}px,{translateY}px,0)" : "translate({translateX}px,{translateY}px)";
  function toMatrixArray(matrix) {
    matrix = matrix.split(/,/);
    matrix = S.map(matrix, function(v) {
      return myParse(v)
    });
    return matrix
  }
  function decomposeMatrix(matrix) {
    matrix = toMatrixArray(matrix);
    var scaleX, scaleY, skew, A = matrix[0], B = matrix[1], C = matrix[2], D = matrix[3];
    if(A * D - B * C) {
      scaleX = Math.sqrt(A * A + B * B);
      skew = (A * C + B * D) / (A * D - C * B);
      scaleY = (A * D - B * C) / scaleX;
      if(A * D < B * C) {
        skew = -skew;
        scaleX = -scaleX
      }
    }else {
      scaleX = scaleY = skew = 0
    }
    return{translateX:myParse(matrix[4]), translateY:myParse(matrix[5]), rotate:myParse(Math.atan2(B, A) * 180 / Math.PI), skewX:myParse(Math.atan(skew) * 180 / Math.PI), skewY:0, scaleX:myParse(scaleX), scaleY:myParse(scaleY)}
  }
  function defaultDecompose() {
    return{translateX:0, translateY:0, rotate:0, skewX:0, skewY:0, scaleX:1, scaleY:1}
  }
  function myParse(v) {
    return Math.round(parseFloat(v) * 1E5) / 1E5
  }
  function getTransformInfo(transform) {
    transform = transform.split(")");
    var trim = S.trim, i = -1, l = transform.length - 1, split, prop, val, ret = defaultDecompose();
    while(++i < l) {
      split = transform[i].split("(");
      prop = trim(split[0]);
      val = split[1];
      switch(prop) {
        case "translateX":
        ;
        case "translateY":
        ;
        case "scaleX":
        ;
        case "scaleY":
          ret[prop] = myParse(val);
          break;
        case "rotate":
        ;
        case "skewX":
        ;
        case "skewY":
          var v = myParse(val);
          if(!S.endsWith(val, "deg")) {
            v = v * 180 / Math.PI
          }
          ret[prop] = v;
          break;
        case "translate":
        ;
        case "translate3d":
          val = val.split(",");
          ret.translateX = myParse(val[0]);
          ret.translateY = myParse(val[1] || 0);
          break;
        case "scale":
          val = val.split(",");
          ret.scaleX = myParse(val[0]);
          ret.scaleY = myParse(val[1] || val[0]);
          break;
        case "matrix":
          return decomposeMatrix(val)
      }
    }
    return ret
  }
  function TransformFx() {
    TransformFx.superclass.constructor.apply(this, arguments)
  }
  S.extend(TransformFx, Fx, {load:function() {
    var self = this;
    TransformFx.superclass.load.apply(self, arguments);
    self.from = Dom.style(self.anim.node, "transform") || self.from;
    if(self.from && self.from !== "none") {
      self.from = getTransformInfo(self.from)
    }else {
      self.from = defaultDecompose()
    }
    if(self.to) {
      self.to = getTransformInfo(self.to)
    }else {
      self.to = defaultDecompose()
    }
  }, interpolate:function(from, to, pos) {
    var interpolate = TransformFx.superclass.interpolate;
    var ret = {};
    ret.translateX = interpolate(from.translateX, to.translateX, pos);
    ret.translateY = interpolate(from.translateY, to.translateY, pos);
    ret.rotate = interpolate(from.rotate, to.rotate, pos);
    ret.skewX = interpolate(from.skewX, to.skewX, pos);
    ret.skewY = interpolate(from.skewY, to.skewY, pos);
    ret.scaleX = interpolate(from.scaleX, to.scaleX, pos);
    ret.scaleY = interpolate(from.scaleY, to.scaleY, pos);
    return S.substitute(translateTpl + " " + "rotate({rotate}deg) " + "skewX({skewX}deg) " + "skewY({skewY}deg) " + "scale({scaleX},{scaleY})", ret)
  }});
  Fx.Factories.transform = TransformFx;
  return TransformFx
});
KISSY.add("anim/timer", ["dom", "./base", "./timer/easing", "./timer/manager", "./timer/fx", "./timer/short-hand", "./timer/color", "./timer/transform"], function(S, require) {
  var Dom = require("dom");
  var AnimBase = require("./base");
  var Easing = require("./timer/easing");
  var AM = require("./timer/manager");
  var Fx = require("./timer/fx");
  var SHORT_HANDS = require("./timer/short-hand");
  require("./timer/color");
  require("./timer/transform");
  var camelCase = Dom._camelCase, NUMBER_REG = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
  function Anim() {
    var self = this, to;
    Anim.superclass.constructor.apply(self, arguments);
    S.each(to = self.to, function(v, prop) {
      var camelProp = camelCase(prop);
      if(prop !== camelProp) {
        to[camelProp] = to[prop];
        delete to[prop]
      }
    })
  }
  S.extend(Anim, AnimBase, {prepareFx:function() {
    var self = this, node = self.node, _propsData = self._propsData;
    S.each(_propsData, function(_propData) {
      _propData.duration *= 1E3;
      _propData.delay *= 1E3;
      if(typeof _propData.easing === "string") {
        _propData.easing = Easing.toFn(_propData.easing)
      }
    });
    S.each(SHORT_HANDS, function(shortHands, p) {
      var origin, _propData = _propsData[p], val;
      if(_propData) {
        val = _propData.value;
        origin = {};
        S.each(shortHands, function(sh) {
          origin[sh] = Dom.css(node, sh)
        });
        Dom.css(node, p, val);
        S.each(origin, function(val, sh) {
          if(!(sh in _propsData)) {
            _propsData[sh] = S.merge(_propData, {value:Dom.css(node, sh)})
          }
          Dom.css(node, sh, val)
        });
        delete _propsData[p]
      }
    });
    var prop, _propData, val, to, from, propCfg, fx, isCustomFx = 0, unit, parts;
    if(S.isPlainObject(node)) {
      isCustomFx = 1
    }
    for(prop in _propsData) {
      _propData = _propsData[prop];
      val = _propData.value;
      propCfg = {isCustomFx:isCustomFx, prop:prop, anim:self, fxType:_propData.fxType, type:_propData.type, propData:_propData};
      fx = Fx.getFx(propCfg);
      to = val;
      from = fx.cur();
      val += "";
      unit = "";
      parts = val.match(NUMBER_REG);
      if(parts) {
        to = parseFloat(parts[2]);
        unit = parts[3];
        if(unit && unit !== "px" && from) {
          var tmpCur = 0, to2 = to;
          do {
            ++to2;
            Dom.css(node, prop, to2 + unit);
            tmpCur = fx.cur()
          }while(tmpCur === 0);
          from = to2 / tmpCur * from;
          Dom.css(node, prop, from + unit)
        }
        if(parts[1]) {
          to = (parts[1] === "-=" ? -1 : 1) * to + from
        }
      }
      propCfg.from = from;
      propCfg.to = to;
      propCfg.unit = unit;
      fx.load(propCfg);
      _propData.fx = fx
    }
  }, frame:function() {
    var self = this, prop, end = 1, fx, _propData, _propsData = self._propsData;
    for(prop in _propsData) {
      _propData = _propsData[prop];
      fx = _propData.fx;
      fx.frame();
      if(self.isRejected() || self.isResolved()) {
        return
      }
      end &= fx.pos === 1
    }
    var currentTime = S.now(), duration = self.config.duration * 1E3, remaining = Math.max(0, self.startTime + duration - currentTime), temp = remaining / duration || 0, percent = 1 - temp;
    self.defer.notify([self, percent, remaining]);
    if(end) {
      self.stop(end)
    }
  }, doStop:function(finish) {
    var self = this, prop, fx, _propData, _propsData = self._propsData;
    AM.stop(self);
    if(finish) {
      for(prop in _propsData) {
        _propData = _propsData[prop];
        fx = _propData.fx;
        if(fx) {
          fx.frame(1)
        }
      }
    }
  }, doStart:function() {
    AM.start(this)
  }});
  Anim.Easing = Easing;
  Anim.Fx = Fx;
  return Anim
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Feb 25 18:29
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 anim/transition
*/

KISSY.add("anim/transition", ["dom", "event/dom", "./base"], function(S, require) {
  var Dom = require("dom");
  var Event = require("event/dom");
  var AnimBase = require("./base");
  var Features = S.Features;
  var vendorPrefix = Features.getVendorCssPropPrefix("transition");
  var R_UPPER = /([A-Z]|^ms)/g;
  var TRANSITION_END_EVENT = vendorPrefix ? vendorPrefix.toLowerCase() + "TransitionEnd" : "transitionend webkitTransitionEnd";
  var TRANSITION = Features.getVendorCssPropName("transition");
  function genTransition(propsData) {
    var str = "";
    S.each(propsData, function(propData, prop) {
      if(str) {
        str += ","
      }
      str += prop + " " + propData.duration + "s " + propData.easing + " " + propData.delay + "s"
    });
    return str
  }
  function TransitionAnim() {
    TransitionAnim.superclass.constructor.apply(this, arguments)
  }
  S.extend(TransitionAnim, AnimBase, {doStart:function() {
    var self = this, node = self.node, elStyle = node.style, _propsData = self._propsData, original = elStyle[TRANSITION], transform, propsCss = {};
    if(transform = _propsData.transform) {
      delete _propsData.transform;
      _propsData[Features.getVendorCssPropName("transform").replace(R_UPPER, "-$1").toLowerCase()] = transform
    }
    S.each(_propsData, function(propData, prop) {
      var v = propData.value, currentValue = Dom.css(node, prop);
      if(typeof v === "number") {
        currentValue = parseFloat(currentValue)
      }
      if(currentValue === v) {
        setTimeout(function() {
          self._onTransitionEnd({originalEvent:{propertyName:prop}})
        }, 0)
      }
      propsCss[prop] = v
    });
    if(original.indexOf("none") !== -1) {
      original = ""
    }else {
      if(original) {
        original += ","
      }
    }
    elStyle[TRANSITION] = original + genTransition(_propsData);
    Event.on(node, TRANSITION_END_EVENT, self._onTransitionEnd, self);
    Dom.css(node, propsCss)
  }, beforeResume:function() {
    var self = this, propsData = self._propsData, tmpPropsData = S.merge(propsData), runTime = self._runTime / 1E3;
    S.each(tmpPropsData, function(propData, prop) {
      var tRunTime = runTime;
      if(propData.delay >= tRunTime) {
        propData.delay -= tRunTime
      }else {
        tRunTime -= propData.delay;
        propData.delay = 0;
        if(propData.duration >= tRunTime) {
          propData.duration -= tRunTime
        }else {
          delete propsData[prop]
        }
      }
    })
  }, _onTransitionEnd:function(e) {
    e = e.originalEvent;
    var self = this, allCompleted = 1, propsData = self._propsData;
    if(!propsData[e.propertyName]) {
      return
    }
    if(propsData[e.propertyName].pos === 1) {
      return
    }
    propsData[e.propertyName].pos = 1;
    S.each(propsData, function(propData) {
      if(propData.pos !== 1) {
        allCompleted = 0;
        return false
      }
      return undefined
    });
    if(allCompleted) {
      self.stop(true)
    }
  }, doStop:function(finish) {
    var self = this, node = self.node, elStyle = node.style, _propsData = self._propsData, propList = [], clear, propsCss = {};
    Event.detach(node, TRANSITION_END_EVENT, self._onTransitionEnd, self);
    S.each(_propsData, function(propData, prop) {
      if(!finish) {
        propsCss[prop] = Dom.css(node, prop)
      }
      propList.push(prop)
    });
    clear = S.trim(elStyle[TRANSITION].replace(new RegExp("(^|,)" + "\\s*(?:" + propList.join("|") + ")\\s+[^,]+", "gi"), "$1")).replace(/^,|,,|,$/g, "") || "none";
    elStyle[TRANSITION] = clear;
    Dom.css(node, propsCss)
  }});
  return TransitionAnim
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 6 15:30
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 base
*/

KISSY.add("base", ["attribute"], function(S, require) {
  var Attribute = require("attribute");
  var ucfirst = S.ucfirst, ON_SET = "_onSet", noop = S.noop;
  function __getHook(method, reverse) {
    return function(origFn) {
      return function wrap() {
        var self = this;
        if(reverse) {
          origFn.apply(self, arguments)
        }else {
          self.callSuper.apply(self, arguments)
        }
        var extensions = arguments.callee.__owner__.__extensions__ || [];
        if(reverse) {
          extensions.reverse()
        }
        callExtensionsMethod(self, extensions, method, arguments);
        if(reverse) {
          self.callSuper.apply(self, arguments)
        }else {
          origFn.apply(self, arguments)
        }
      }
    }
  }
  var Base = Attribute.extend({constructor:function() {
    var self = this;
    self.callSuper.apply(self, arguments);
    var listeners = self.get("listeners");
    for(var n in listeners) {
      self.on(n, listeners[n])
    }
    self.initializer();
    constructPlugins(self);
    callPluginsMethod.call(self, "pluginInitializer");
    self.bindInternal();
    self.syncInternal()
  }, initializer:noop, __getHook:__getHook, __callPluginsMethod:callPluginsMethod, bindInternal:function() {
    var self = this, attrs = self.getAttrs(), attr, m;
    for(attr in attrs) {
      m = ON_SET + ucfirst(attr);
      if(self[m]) {
        self.on("after" + ucfirst(attr) + "Change", onSetAttrChange)
      }
    }
  }, syncInternal:function() {
    var self = this, cs = [], i, c = self.constructor, attrs = self.getAttrs();
    while(c) {
      cs.push(c);
      c = c.superclass && c.superclass.constructor
    }
    cs.reverse();
    for(i = 0;i < cs.length;i++) {
      var ATTRS = cs[i].ATTRS || {};
      for(var attributeName in ATTRS) {
        if(attributeName in attrs) {
          var attributeValue, onSetMethod;
          var onSetMethodName = ON_SET + ucfirst(attributeName);
          if((onSetMethod = self[onSetMethodName]) && attrs[attributeName].sync !== 0 && (attributeValue = self.get(attributeName)) !== undefined) {
            onSetMethod.call(self, attributeValue)
          }
        }
      }
    }
  }, plug:function(plugin) {
    var self = this;
    if(typeof plugin === "function") {
      var Plugin = plugin;
      plugin = new Plugin
    }
    if(plugin.pluginInitializer) {
      plugin.pluginInitializer(self)
    }
    self.get("plugins").push(plugin);
    return self
  }, unplug:function(plugin) {
    var plugins = [], self = this, isString = typeof plugin === "string";
    S.each(self.get("plugins"), function(p) {
      var keep = 0, pluginId;
      if(plugin) {
        if(isString) {
          pluginId = p.get && p.get("pluginId") || p.pluginId;
          if(pluginId !== plugin) {
            plugins.push(p);
            keep = 1
          }
        }else {
          if(p !== plugin) {
            plugins.push(p);
            keep = 1
          }
        }
      }
      if(!keep) {
        p.pluginDestructor(self)
      }
    });
    self.setInternal("plugins", plugins);
    return self
  }, getPlugin:function(id) {
    var plugin = null;
    S.each(this.get("plugins"), function(p) {
      var pluginId = p.get && p.get("pluginId") || p.pluginId;
      if(pluginId === id) {
        plugin = p;
        return false
      }
      return undefined
    });
    return plugin
  }, destructor:S.noop, destroy:function() {
    var self = this;
    if(!self.get("destroyed")) {
      callPluginsMethod.call(self, "pluginDestructor");
      self.destructor();
      self.set("destroyed", true);
      self.fire("destroy");
      self.detach()
    }
  }});
  S.mix(Base, {__hooks__:{initializer:__getHook(), destructor:__getHook("__destructor", true)}, ATTRS:{plugins:{value:[]}, destroyed:{value:false}, listeners:{value:[]}}, extend:function extend(extensions, px, sx) {
    if(!S.isArray(extensions)) {
      sx = px;
      px = extensions;
      extensions = []
    }
    sx = sx || {};
    px = px || {};
    var SubClass = Attribute.extend.call(this, px, sx);
    SubClass.__extensions__ = extensions;
    baseAddMembers.call(SubClass, {});
    if(extensions.length) {
      var attrs = {}, prototype = {};
      S.each(extensions.concat(SubClass), function(ext) {
        if(ext) {
          S.each(ext.ATTRS, function(v, name) {
            var av = attrs[name] = attrs[name] || {};
            S.mix(av, v)
          });
          var exp = ext.prototype, p;
          for(p in exp) {
            if(exp.hasOwnProperty(p)) {
              prototype[p] = exp[p]
            }
          }
        }
      });
      SubClass.ATTRS = attrs;
      prototype.constructor = SubClass;
      S.augment(SubClass, prototype)
    }
    SubClass.extend = sx.extend || extend;
    SubClass.addMembers = baseAddMembers;
    return SubClass
  }});
  var addMembers = Base.addMembers;
  function baseAddMembers(px) {
    var SubClass = this;
    var extensions = SubClass.__extensions__, hooks = SubClass.__hooks__, proto = SubClass.prototype;
    if(extensions.length && hooks) {
      for(var h in hooks) {
        if(proto.hasOwnProperty(h) && !px.hasOwnProperty(h)) {
          continue
        }
        px[h] = px[h] || noop
      }
    }
    return addMembers.call(SubClass, px)
  }
  function onSetAttrChange(e) {
    var self = this, method;
    if(e.target === self) {
      method = self[ON_SET + e.type.slice(5).slice(0, -6)];
      method.call(self, e.newVal, e)
    }
  }
  function constructPlugins(self) {
    var plugins = self.get("plugins"), Plugin;
    S.each(plugins, function(plugin, i) {
      if(typeof plugin === "function") {
        Plugin = plugin;
        plugins[i] = new Plugin
      }
    })
  }
  function callPluginsMethod(method) {
    var len, self = this, plugins = self.get("plugins");
    if(len = plugins.length) {
      for(var i = 0;i < len;i++) {
        if(plugins[i][method]) {
          plugins[i][method](self)
        }
      }
    }
  }
  function callExtensionsMethod(self, extensions, method, args) {
    var len;
    if(len = extensions && extensions.length) {
      for(var i = 0;i < len;i++) {
        var fn = extensions[i] && (!method ? extensions[i] : extensions[i].prototype[method]);
        if(fn) {
          fn.apply(self, args || [])
        }
      }
    }
  }
  S.Base = Base;
  return Base
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:04
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 attribute
*/

KISSY.add("attribute", ["event/custom"], function(S, require, exports, module) {
  var RE_DASH = /(?:^|-)([a-z])/ig;
  var CustomEvent = require("event/custom");
  module.exports = Attribute;
  var bind = S.bind;
  function replaceToUpper() {
    return arguments[1].toUpperCase()
  }
  function camelCase(name) {
    return name.replace(RE_DASH, replaceToUpper)
  }
  var INVALID = {};
  var FALSE = false;
  function normalFn(host, method) {
    if(typeof method === "string") {
      return host[method]
    }
    return method
  }
  function getAttrVals(self) {
    return self.__attrVals || (self.__attrVals = {})
  }
  function whenAttrChangeEventName(when, name) {
    return when + S.ucfirst(name) + "Change"
  }
  function __fireAttrChange(self, when, name, prevVal, newVal, subAttrName, attrName, data) {
    attrName = attrName || name;
    return self.fire(whenAttrChangeEventName(when, name), S.mix({attrName:attrName, subAttrName:subAttrName, prevVal:prevVal, newVal:newVal}, data))
  }
  function ensureNonEmpty(obj, name, doNotCreate) {
    var ret = obj[name];
    if(!doNotCreate && !ret) {
      obj[name] = ret = {}
    }
    return ret || {}
  }
  function getValueByPath(o, path) {
    for(var i = 0, len = path.length;o !== undefined && i < len;i++) {
      o = o[path[i]]
    }
    return o
  }
  function setValueByPath(o, path, val) {
    var len = path.length - 1, s = o;
    if(len >= 0) {
      for(var i = 0;i < len;i++) {
        o = o[path[i]]
      }
      if(o !== undefined) {
        o[path[i]] = val
      }else {
        s = undefined
      }
    }
    return s
  }
  function getPathNamePair(name) {
    var path;
    if(name.indexOf(".") !== -1) {
      path = name.split(".");
      name = path.shift()
    }
    return{path:path, name:name}
  }
  function getValueBySubValue(prevVal, path, value) {
    var tmp = value;
    if(path) {
      if(prevVal === undefined) {
        tmp = {}
      }else {
        tmp = S.clone(prevVal)
      }
      setValueByPath(tmp, path, value)
    }
    return tmp
  }
  function prepareDefaultSetFn(self, name) {
    var defaultBeforeFns = ensureNonEmpty(self, "__defaultBeforeFns");
    if(defaultBeforeFns[name]) {
      return
    }
    defaultBeforeFns[name] = 1;
    var beforeChangeEventName = whenAttrChangeEventName("before", name);
    self.publish(beforeChangeEventName, {defaultFn:defaultSetFn})
  }
  function setInternal(self, name, value, opts, attrs) {
    var path, subVal, prevVal, pathNamePair = getPathNamePair(name), fullName = name;
    name = pathNamePair.name;
    path = pathNamePair.path;
    prevVal = self.get(name);
    prepareDefaultSetFn(self, name);
    if(path) {
      subVal = getValueByPath(prevVal, path)
    }
    if(!opts.force) {
      if(!path && prevVal === value) {
        return undefined
      }else {
        if(path && subVal === value) {
          return undefined
        }
      }
    }
    value = getValueBySubValue(prevVal, path, value);
    var beforeEventObject = S.mix({attrName:name, subAttrName:fullName, prevVal:prevVal, newVal:value, _opts:opts, _attrs:attrs, target:self}, opts.data);
    if(opts.silent) {
      if(FALSE === defaultSetFn.call(self, beforeEventObject)) {
        return FALSE
      }
    }else {
      if(FALSE === self.fire(whenAttrChangeEventName("before", name), beforeEventObject)) {
        return FALSE
      }
    }
    return self
  }
  function defaultSetFn(e) {
    if(e.target !== this) {
      return undefined
    }
    var self = this, value = e.newVal, prevVal = e.prevVal, name = e.attrName, fullName = e.subAttrName, attrs = e._attrs, opts = e._opts;
    var ret = self.setInternal(name, value);
    if(ret === FALSE) {
      return ret
    }
    if(!opts.silent) {
      value = getAttrVals(self)[name];
      __fireAttrChange(self, "after", name, prevVal, value, fullName, null, opts.data);
      if(attrs) {
        attrs.push({prevVal:prevVal, newVal:value, attrName:name, subAttrName:fullName})
      }else {
        __fireAttrChange(self, "", "*", [prevVal], [value], [fullName], [name], opts.data)
      }
    }
    return undefined
  }
  function Attribute(config) {
    var self = this, c = self.constructor;
    self.userConfig = config;
    while(c) {
      addAttrs(self, c.ATTRS);
      c = c.superclass ? c.superclass.constructor : null
    }
    initAttrs(self, config)
  }
  function wrapProtoForSuper(px, SubClass) {
    var hooks = SubClass.__hooks__ || {};
    for(var p in hooks) {
      if(p in px) {
        px[p] = hooks[p](px[p])
      }
    }
    S.each(px, function(v, p) {
      if(typeof v === "function") {
        var wrapped = 0;
        if(v.__owner__) {
          var originalOwner = v.__owner__;
          delete v.__owner__;
          delete v.__name__;
          wrapped = v.__wrapped__ = 1;
          var newV = bind(v);
          newV.__owner__ = originalOwner;
          newV.__name__ = p;
          originalOwner.prototype[p] = newV
        }else {
          if(v.__wrapped__) {
            wrapped = 1
          }
        }
        if(wrapped) {
          px[p] = v = bind(v)
        }
        v.__owner__ = SubClass;
        v.__name__ = p
      }
    })
  }
  function addMembers(px) {
    var SubClass = this;
    wrapProtoForSuper(px, SubClass);
    S.mix(SubClass.prototype, px)
  }
  Attribute.extend = function extend(px, sx) {
    var SubClass, SuperClass = this;
    sx = sx || {};
    px = px || {};
    var hooks, sxHooks = sx.__hooks__;
    if(hooks = SuperClass.__hooks__) {
      sxHooks = sx.__hooks__ = sx.__hooks__ || {};
      S.mix(sxHooks, hooks, false)
    }
    var name = sx.name || "AttributeDerived";
    if(px.hasOwnProperty("constructor")) {
      SubClass = px.constructor
    }else {
      if("@DEBUG@") {
        SubClass = (new Function("return function " + camelCase(name) + "(){ " + "this.callSuper.apply(this, arguments);" + "}"))()
      }else {
        SubClass = function() {
          this.callSuper.apply(this, arguments)
        }
      }
    }
    px.constructor = SubClass;
    SubClass.__hooks__ = sxHooks;
    wrapProtoForSuper(px, SubClass);
    var inheritedStatics, sxInheritedStatics = sx.inheritedStatics;
    if(inheritedStatics = SuperClass.inheritedStatics) {
      sxInheritedStatics = sx.inheritedStatics = sx.inheritedStatics || {};
      S.mix(sxInheritedStatics, inheritedStatics, false)
    }
    S.extend(SubClass, SuperClass, px, sx);
    if(sxInheritedStatics) {
      S.mix(SubClass, sxInheritedStatics)
    }
    SubClass.extend = sx.extend || extend;
    SubClass.addMembers = addMembers;
    return SubClass
  };
  function addAttrs(host, attrs) {
    if(attrs) {
      for(var attr in attrs) {
        host.addAttr(attr, attrs[attr], false)
      }
    }
  }
  function initAttrs(host, config) {
    if(config) {
      for(var attr in config) {
        host.setInternal(attr, config[attr])
      }
    }
  }
  S.augment(Attribute, CustomEvent.Target, {INVALID:INVALID, callSuper:function() {
    var method, obj, self = this, args = arguments;
    if(typeof self === "function" && self.__name__) {
      method = self;
      obj = args[0];
      args = Array.prototype.slice.call(args, 1)
    }else {
      method = arguments.callee.caller;
      if(method.__wrapped__) {
        method = method.caller
      }
      obj = self
    }
    var name = method.__name__;
    if(!name) {
      return undefined
    }
    var member = method.__owner__.superclass[name];
    if(!member) {
      return undefined
    }
    return member.apply(obj, args || [])
  }, getAttrs:function() {
    return this.__attrs || (this.__attrs = {})
  }, getAttrVals:function() {
    var self = this, o = {}, a, attrs = self.getAttrs();
    for(a in attrs) {
      o[a] = self.get(a)
    }
    return o
  }, addAttr:function(name, attrConfig, override) {
    var self = this, attrs = self.getAttrs(), attr, cfg = S.clone(attrConfig);
    if(attr = attrs[name]) {
      S.mix(attr, cfg, override)
    }else {
      attrs[name] = cfg
    }
    return self
  }, addAttrs:function(attrConfigs, initialValues) {
    var self = this;
    S.each(attrConfigs, function(attrConfig, name) {
      self.addAttr(name, attrConfig)
    });
    if(initialValues) {
      self.set(initialValues)
    }
    return self
  }, hasAttr:function(name) {
    return this.getAttrs().hasOwnProperty(name)
  }, removeAttr:function(name) {
    var self = this;
    var __attrVals = getAttrVals(self);
    var __attrs = self.getAttrs();
    if(self.hasAttr(name)) {
      delete __attrs[name];
      delete __attrVals[name]
    }
    return self
  }, set:function(name, value, opts) {
    var self = this, e;
    if(S.isPlainObject(name)) {
      opts = value;
      opts = opts || {};
      var all = Object(name), attrs = [], errors = [];
      for(name in all) {
        if((e = validate(self, name, all[name], all)) !== undefined) {
          errors.push(e)
        }
      }
      if(errors.length) {
        if(opts.error) {
          opts.error(errors)
        }
        return FALSE
      }
      for(name in all) {
        setInternal(self, name, all[name], opts, attrs)
      }
      var attrNames = [], prevVals = [], newVals = [], subAttrNames = [];
      S.each(attrs, function(attr) {
        prevVals.push(attr.prevVal);
        newVals.push(attr.newVal);
        attrNames.push(attr.attrName);
        subAttrNames.push(attr.subAttrName)
      });
      if(attrNames.length) {
        __fireAttrChange(self, "", "*", prevVals, newVals, subAttrNames, attrNames, opts.data)
      }
      return self
    }
    opts = opts || {};
    e = validate(self, name, value);
    if(e !== undefined) {
      if(opts.error) {
        opts.error(e)
      }
      return FALSE
    }
    return setInternal(self, name, value, opts)
  }, setInternal:function(name, value) {
    var self = this, setValue, attrConfig = ensureNonEmpty(self.getAttrs(), name), setter = attrConfig.setter;
    if(setter && (setter = normalFn(self, setter))) {
      setValue = setter.call(self, value, name)
    }
    if(setValue === INVALID) {
      return FALSE
    }
    if(setValue !== undefined) {
      value = setValue
    }
    getAttrVals(self)[name] = value;
    return undefined
  }, get:function(name) {
    var self = this, dot = ".", path, attrVals = getAttrVals(self), attrConfig, getter, ret;
    if(name.indexOf(dot) !== -1) {
      path = name.split(dot);
      name = path.shift()
    }
    attrConfig = ensureNonEmpty(self.getAttrs(), name, 1);
    getter = attrConfig.getter;
    ret = name in attrVals ? attrVals[name] : getDefAttrVal(self, name);
    if(getter && (getter = normalFn(self, getter))) {
      ret = getter.call(self, ret, name)
    }
    if(!(name in attrVals) && ret !== undefined) {
      attrVals[name] = ret
    }
    if(path) {
      ret = getValueByPath(ret, path)
    }
    return ret
  }, reset:function(name, opts) {
    var self = this;
    if(typeof name === "string") {
      if(self.hasAttr(name)) {
        return self.set(name, getDefAttrVal(self, name), opts)
      }else {
        return self
      }
    }
    opts = name;
    var attrs = self.getAttrs(), values = {};
    for(name in attrs) {
      values[name] = getDefAttrVal(self, name)
    }
    self.set(values, opts);
    return self
  }});
  function getDefAttrVal(self, name) {
    var attrs = self.getAttrs(), attrConfig = ensureNonEmpty(attrs, name, 1), valFn = attrConfig.valueFn, val;
    if(valFn && (valFn = normalFn(self, valFn))) {
      val = valFn.call(self);
      if(val !== undefined) {
        attrConfig.value = val
      }
      delete attrConfig.valueFn;
      attrs[name] = attrConfig
    }
    return attrConfig.value
  }
  function validate(self, name, value, all) {
    var path, prevVal, pathNamePair;
    pathNamePair = getPathNamePair(name);
    name = pathNamePair.name;
    path = pathNamePair.path;
    if(path) {
      prevVal = self.get(name);
      value = getValueBySubValue(prevVal, path, value)
    }
    var attrConfig = ensureNonEmpty(self.getAttrs(), name), e, validator = attrConfig.validator;
    if(validator && (validator = normalFn(self, validator))) {
      e = validator.call(self, value, name, all);
      if(e !== undefined && e !== true) {
        return e
      }
    }
    return undefined
  }
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:15
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event/custom/observer
 event/custom/object
 event/custom/observable
 event/custom/target
 event/custom
*/

KISSY.add("event/custom/observer", ["event/base"], function(S, require) {
  var BaseEvent = require("event/base");
  function CustomEventObserver() {
    CustomEventObserver.superclass.constructor.apply(this, arguments)
  }
  S.extend(CustomEventObserver, BaseEvent.Observer, {keys:["fn", "context", "groups"]});
  return CustomEventObserver
});
KISSY.add("event/custom/object", ["event/base"], function(S, require) {
  var BaseEvent = require("event/base");
  function CustomEventObject(data) {
    CustomEventObject.superclass.constructor.call(this);
    S.mix(this, data)
  }
  S.extend(CustomEventObject, BaseEvent.Object);
  return CustomEventObject
});
KISSY.add("event/custom/observable", ["event/base", "./observer", "./object"], function(S, require) {
  var BaseEvent = require("event/base");
  var CustomEventObserver = require("./observer");
  var CustomEventObject = require("./object");
  var Utils = BaseEvent.Utils;
  function CustomEventObservable() {
    var self = this;
    CustomEventObservable.superclass.constructor.apply(self, arguments);
    self.defaultFn = null;
    self.defaultTargetOnly = false;
    self.bubbles = true
  }
  S.extend(CustomEventObservable, BaseEvent.Observable, {on:function(cfg) {
    var observer = new CustomEventObserver(cfg);
    if(S.Config.debug) {
      if(!observer.fn) {
        S.error("lack event handler for " + this.type)
      }
    }
    if(this.findObserver(observer) === -1) {
      this.observers.push(observer)
    }
  }, fire:function(eventData) {
    eventData = eventData || {};
    var self = this, bubbles = self.bubbles, currentTarget = self.currentTarget, parents, parentsLen, type = self.type, defaultFn = self.defaultFn, i, customEventObject = eventData, gRet, ret;
    eventData.type = type;
    if(!(customEventObject instanceof CustomEventObject)) {
      customEventObject.target = currentTarget;
      customEventObject = new CustomEventObject(customEventObject)
    }
    customEventObject.currentTarget = currentTarget;
    ret = self.notify(customEventObject);
    if(gRet !== false && ret !== undefined) {
      gRet = ret
    }
    if(bubbles && !customEventObject.isPropagationStopped()) {
      parents = currentTarget.getTargets();
      parentsLen = parents && parents.length || 0;
      for(i = 0;i < parentsLen && !customEventObject.isPropagationStopped();i++) {
        ret = parents[i].fire(type, customEventObject);
        if(gRet !== false && ret !== undefined) {
          gRet = ret
        }
      }
    }
    if(defaultFn && !customEventObject.isDefaultPrevented()) {
      var target = customEventObject.target, lowestCustomEventObservable = target.getCustomEventObservable(customEventObject.type);
      if(!self.defaultTargetOnly && !lowestCustomEventObservable.defaultTargetOnly || currentTarget === target) {
        gRet = defaultFn.call(currentTarget, customEventObject)
      }
    }
    return gRet
  }, notify:function(event) {
    var observers = [].concat(this.observers), ret, gRet, len = observers.length, i;
    for(i = 0;i < len && !event.isImmediatePropagationStopped();i++) {
      ret = observers[i].notify(event, this);
      if(gRet !== false && ret !== undefined) {
        gRet = ret
      }
    }
    return gRet
  }, detach:function(cfg) {
    var groupsRe, self = this, fn = cfg.fn, context = cfg.context, currentTarget = self.currentTarget, observers = self.observers, groups = cfg.groups;
    if(!observers.length) {
      return
    }
    if(groups) {
      groupsRe = Utils.getGroupsRe(groups)
    }
    var i, j, t, observer, observerContext, len = observers.length;
    if(fn || groupsRe) {
      context = context || currentTarget;
      for(i = 0, j = 0, t = [];i < len;++i) {
        observer = observers[i];
        observerContext = observer.context || currentTarget;
        if(context !== observerContext || fn && fn !== observer.fn || groupsRe && !observer.groups.match(groupsRe)) {
          t[j++] = observer
        }
      }
      self.observers = t
    }else {
      self.reset()
    }
  }});
  return CustomEventObservable
});
KISSY.add("event/custom/target", ["event/base", "./observable"], function(S, require) {
  var BaseEvent = require("event/base");
  var CustomEventObservable = require("./observable");
  var Utils = BaseEvent.Utils, splitAndRun = Utils.splitAndRun, KS_BUBBLE_TARGETS = "__~ks_bubble_targets";
  var KS_CUSTOM_EVENTS = "__~ks_custom_events";
  return{isTarget:1, getCustomEventObservable:function(type, create) {
    var target = this, customEvent, customEventObservables = target.getCustomEvents();
    customEvent = customEventObservables && customEventObservables[type];
    if(!customEvent && create) {
      customEvent = customEventObservables[type] = new CustomEventObservable({currentTarget:target, type:type})
    }
    return customEvent
  }, fire:function(type, eventData) {
    var self = this, ret, targets = self.getTargets(), hasTargets = targets && targets.length;
    eventData = eventData || {};
    splitAndRun(type, function(type) {
      var r2, customEventObservable;
      Utils.fillGroupsForEvent(type, eventData);
      type = eventData.type;
      customEventObservable = self.getCustomEventObservable(type);
      if(!customEventObservable && !hasTargets) {
        return
      }
      if(customEventObservable) {
        if(!customEventObservable.hasObserver() && !customEventObservable.defaultFn) {
          if(customEventObservable.bubbles && !hasTargets || !customEventObservable.bubbles) {
            return
          }
        }
      }else {
        customEventObservable = new CustomEventObservable({currentTarget:self, type:type})
      }
      r2 = customEventObservable.fire(eventData);
      if(ret !== false && r2 !== undefined) {
        ret = r2
      }
    });
    return ret
  }, publish:function(type, cfg) {
    var customEventObservable, self = this;
    splitAndRun(type, function(t) {
      customEventObservable = self.getCustomEventObservable(t, true);
      S.mix(customEventObservable, cfg)
    });
    return self
  }, addTarget:function(anotherTarget) {
    var self = this, targets = self.getTargets();
    if(!S.inArray(anotherTarget, targets)) {
      targets.push(anotherTarget)
    }
    return self
  }, removeTarget:function(anotherTarget) {
    var self = this, targets = self.getTargets(), index = S.indexOf(anotherTarget, targets);
    if(index !== -1) {
      targets.splice(index, 1)
    }
    return self
  }, getTargets:function() {
    return this[KS_BUBBLE_TARGETS] || (this[KS_BUBBLE_TARGETS] = [])
  }, getCustomEvents:function() {
    return this[KS_CUSTOM_EVENTS] || (this[KS_CUSTOM_EVENTS] = {})
  }, on:function(type, fn, context) {
    var self = this;
    Utils.batchForType(function(type, fn, context) {
      var cfg = Utils.normalizeParam(type, fn, context), customEvent;
      type = cfg.type;
      customEvent = self.getCustomEventObservable(type, true);
      if(customEvent) {
        customEvent.on(cfg)
      }
    }, 0, type, fn, context);
    return self
  }, detach:function(type, fn, context) {
    var self = this;
    Utils.batchForType(function(type, fn, context) {
      var cfg = Utils.normalizeParam(type, fn, context), customEvents, customEvent;
      type = cfg.type;
      if(type) {
        customEvent = self.getCustomEventObservable(type, true);
        if(customEvent) {
          customEvent.detach(cfg)
        }
      }else {
        customEvents = self.getCustomEvents();
        S.each(customEvents, function(customEvent) {
          customEvent.detach(cfg)
        })
      }
    }, 0, type, fn, context);
    return self
  }}
});
KISSY.add("event/custom", ["./custom/target"], function(S, require) {
  var Target = require("./custom/target");
  return{Target:Target, global:S.mix({}, Target)}
});


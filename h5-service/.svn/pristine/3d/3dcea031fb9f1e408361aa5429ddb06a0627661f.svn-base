/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 13 14:57
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/iframe-content-tpl
 editor/render-xtpl
 editor/render
 editor/base
 editor/utils
 editor/focusManager
 editor/dom
 editor/walker
 editor/elementPath
 editor/range
 editor/selection
 editor/clipboard
 editor/enterKey
 editor/htmlDataProcessor
 editor/selectionFix
 editor/plugin-meta
 editor/styles
 editor/domIterator
 editor/z-index-manager
 editor
*/

KISSY.add("editor/iframe-content-tpl", [], '<!doctype html>\n<html>\n<head>{doctype}\n    <title>{title}</title>\n    {style}\n    {links}\n    </head> \n<body class="ks-editor">\n{data}\n{script}\n</body> \n</html>');
KISSY.add("editor/render-xtpl", [], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += '<div class="';
    var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "prefixCls", 0, 1);
    buffer += renderOutputUtil(id0, true);
    buffer += 'editor-tools"\n     id="ks-editor-tools-';
    var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 2);
    buffer += renderOutputUtil(id1, true);
    buffer += '">\n\n</div>\n\n<!--\nhttp://johanbrook.com/browsers/native-momentum-scrolling-ios-5/\nios \u4e0d\u80fd\u653e\u5728 iframe \u4e0a\uff01\n--\>\n\n<div class="';
    var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "prefixCls", 0, 11);
    buffer += renderOutputUtil(id2, true);
    buffer += 'editor-textarea-wrap"\n\n';
    var config3 = {};
    var params4 = [];
    var id5 = getPropertyUtil(engine, scope, "mobile", 0, 13);
    params4.push(id5);
    config3.params = params4;
    config3.fn = function(scope) {
      var buffer = "";
      buffer += '\nstyle="overflow:scroll;-webkit-overflow-scrolling:touch;"\n';
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config3, "if", 13);
    buffer += '\n\nid="ks-editor-textarea-wrap-';
    var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 17);
    buffer += renderOutputUtil(id6, true);
    buffer += '"\n>\n\n<textarea\n        id="ks-editor-textarea-';
    var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 21);
    buffer += renderOutputUtil(id7, true);
    buffer += '"\n        class="';
    var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "prefixCls", 0, 22);
    buffer += renderOutputUtil(id8, true);
    buffer += 'editor-textarea"\n\n';
    var config9 = {};
    var params10 = [];
    var id11 = getPropertyUtil(engine, scope, "textareaAttrs", 0, 24);
    params10.push(id11);
    config9.params = params10;
    config9.fn = function(scope) {
      var buffer = "";
      buffer += "\n";
      var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "xindex", 0, 25);
      buffer += renderOutputUtil(id12, true);
      buffer += '="';
      var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 25);
      buffer += renderOutputUtil(id13, true);
      buffer += '"\n';
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config9, "each", 24);
    buffer += "\n\n";
    var config14 = {};
    var params15 = [];
    var id16 = getPropertyUtil(engine, scope, "mode", 0, 28);
    params15.push(id16);
    config14.params = params15;
    config14.fn = function(scope) {
      var buffer = "";
      buffer += '\nstyle="display:none"\n';
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config14, "if", 28);
    buffer += "\n\n>";
    var id17 = getPropertyOrRunCommandUtil(engine, scope, {}, "data", 0, 32);
    buffer += renderOutputUtil(id17, true);
    buffer += '</textarea>\n\n</div>\n\n<div class="';
    var id18 = getPropertyOrRunCommandUtil(engine, scope, {}, "prefixCls", 0, 36);
    buffer += renderOutputUtil(id18, true);
    buffer += 'editor-status"\n     id="ks-editor-status-';
    var id19 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 37);
    buffer += renderOutputUtil(id19, true);
    buffer += '">\n\n</div>';
    return buffer
  }
});
KISSY.add("editor/render", ["component/control", "./render-xtpl"], function(S, require) {
  var Control = require("component/control");
  var RenderTpl = require("./render-xtpl");
  return Control.getDefaultRender().extend({beforeCreateDom:function(renderData, childrenElSelectors) {
    S.mix(renderData, {mobile:S.UA.mobile});
    S.mix(childrenElSelectors, {textarea:"#ks-editor-textarea-{id}", toolBarEl:"#ks-editor-tools-{id}", statusBarEl:"#ks-editor-status-{id}"})
  }}, {ATTRS:{contentTpl:{value:RenderTpl}}})
});
KISSY.add("editor/base", ["html-parser", "component/control", "./render"], function(S, require) {
  var HtmlParser = require("html-parser");
  var Control = require("component/control");
  var EditorRender = require("./render");
  return Control.extend({}, {Config:{}, XHTML_DTD:HtmlParser.DTD, ATTRS:{textarea:{}, textareaAttrs:{view:1}, iframe:{}, window:{}, document:{}, toolBarEl:{}, statusBarEl:{}, handleMouseEvents:{value:false}, focusable:{value:false}, mode:{view:1, value:1}, data:{view:1}, customStyle:{value:""}, customLink:{value:[]}, xrender:{value:EditorRender}}, xclass:"editor"})
});
KISSY.add("editor/utils", ["node", "./base"], function(S, require) {
  var Node = require("node");
  var Editor = require("./base");
  var TRUE = true, FALSE = false, NULL = null, Dom = S.DOM, UA = S.UA, Utils = {debugUrl:function(url) {
    var Config = S.Config;
    if(!Config.debug) {
      url = url.replace(/\.(js|css)/i, "-min.$1")
    }
    if(url.indexOf("?t") === -1) {
      if(url.indexOf("?") !== -1) {
        url += "&"
      }else {
        url += "?"
      }
      url += "t=" + encodeURIComponent(Config.tag)
    }
    return S.config("base") + "editor/" + url
  }, lazyRun:function(obj, before, after) {
    var b = obj[before], a = obj[after];
    obj[before] = function() {
      b.apply(this, arguments);
      obj[before] = obj[after];
      return a.apply(this, arguments)
    }
  }, getXY:function(offset, editor) {
    var x = offset.left, y = offset.top, currentWindow = editor.get("window")[0];
    x -= Dom.scrollLeft(currentWindow);
    y -= Dom.scrollTop(currentWindow);
    var iframePosition = editor.get("iframe").offset();
    x += iframePosition.left;
    y += iframePosition.top;
    return{left:x, top:y}
  }, tryThese:function() {
    var returnValue;
    for(var i = 0, length = arguments.length;i < length;i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break
      }catch(e) {
      }
    }
    return returnValue
  }, clearAllMarkers:function(database) {
    for(var i in database) {
      database[i]._4eClearMarkers(database, TRUE, undefined)
    }
  }, ltrim:function(str) {
    return str.replace(/^\s+/, "")
  }, rtrim:function(str) {
    return str.replace(/\s+$/, "")
  }, isNumber:function(n) {
    return/^\d+(.\d+)?$/.test(S.trim(n))
  }, verifyInputs:function(inputs) {
    for(var i = 0;i < inputs.length;i++) {
      var input = new Node(inputs[i]), v = S.trim(Utils.valInput(input)), verify = input.attr("data-verify"), warning = input.attr("data-warning");
      if(verify && !(new RegExp(verify)).test(v)) {
        alert(warning);
        return FALSE
      }
    }
    return TRUE
  }, sourceDisable:function(editor, plugin) {
    editor.on("sourceMode", plugin.disable, plugin);
    editor.on("wysiwygMode", plugin.enable, plugin)
  }, resetInput:function(inp) {
    var placeholder = inp.attr("placeholder");
    if(placeholder && UA.ie) {
      inp.addClass("ks-editor-input-tip");
      inp.val(placeholder)
    }else {
      if(!UA.ie) {
        inp.val("")
      }
    }
  }, valInput:function(inp, val) {
    if(val === undefined) {
      if(inp.hasClass("ks-editor-input-tip")) {
        return""
      }else {
        return inp.val()
      }
    }else {
      inp.removeClass("ks-editor-input-tip");
      inp.val(val)
    }
    return undefined
  }, placeholder:function(inp, tip) {
    inp.attr("placeholder", tip);
    if(!UA.ie) {
      return
    }
    inp.on("blur", function() {
      if(!S.trim(inp.val())) {
        inp.addClass("ks-editor-input-tip");
        inp.val(tip)
      }
    });
    inp.on("focus", function() {
      inp.removeClass("ks-editor-input-tip");
      if(S.trim(inp.val()) === tip) {
        inp.val("")
      }
    })
  }, normParams:function(params) {
    params = S.clone(params);
    for(var p in params) {
      var v = params[p];
      if(typeof v === "function") {
        params[p] = v()
      }
    }
    return params
  }, preventFocus:function(el) {
    if(UA.ie) {
      el.unselectable()
    }else {
      el.attr("onmousedown", "return false;")
    }
  }, injectDom:function(editorDom) {
    S.mix(Dom, editorDom);
    for(var dm in editorDom) {
      (function(dm) {
        Node.prototype[dm] = function() {
          var args = [].slice.call(arguments, 0);
          args.unshift(this[0]);
          var ret = editorDom[dm].apply(NULL, args);
          if(ret && (ret.nodeType || S.isWindow(ret))) {
            return new Node(ret)
          }else {
            if(S.isArray(ret)) {
              if(ret.__IS_NODELIST || ret[0] && ret[0].nodeType) {
                return new Node(ret)
              }
            }
            return ret
          }
        }
      })(dm)
    }
  }, addRes:function() {
    this.__res = this.__res || [];
    var res = this.__res;
    res.push.apply(res, S.makeArray(arguments))
  }, destroyRes:function() {
    var res = this.__res || [];
    for(var i = 0;i < res.length;i++) {
      var r = res[i];
      if(typeof r === "function") {
        r()
      }else {
        if(r.destroy) {
          r.destroy()
        }else {
          if(r.remove) {
            r.remove()
          }
        }
      }
    }
    this.__res = []
  }, getQueryCmd:function(cmd) {
    return"query" + ("-" + cmd).replace(/-(\w)/g, function(m, m1) {
      return m1.toUpperCase()
    }) + "Value"
  }};
  Editor.Utils = Utils;
  return Utils
});
KISSY.add("editor/focusManager", ["./base"], function(S, require) {
  var Editor = require("./base");
  function focus() {
    var editor = this;
    editor.__iframeFocus = TRUE;
    currentInstance = editor;
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      editor.fire("focus")
    }, 30)
  }
  function blur() {
    var editor = this;
    editor.__iframeFocus = FALSE;
    currentInstance = NULL;
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      editor.fire("blur")
    }, 30)
  }
  var INSTANCES = {}, timer, currentInstance, focusManager = {currentInstance:function() {
    return currentInstance
  }, getInstance:function(id) {
    return INSTANCES[id]
  }, register:function(editor) {
    INSTANCES[editor.get("id")] = editor
  }, add:function(editor) {
    this.register(editor);
    editor.get("window").on("focus", focus, editor).on("blur", blur, editor)
  }, remove:function(editor) {
    delete INSTANCES[editor.get("id")];
    editor.get("window").detach("focus", focus, editor).detach("blur", blur, editor)
  }}, TRUE = true, FALSE = false, NULL = null;
  Editor.focusManager = focusManager;
  Editor.getInstances = function() {
    return INSTANCES
  };
  return focusManager
});
KISSY.add("editor/dom", ["node", "./base", "./utils"], function(S, require) {
  var Node = require("node");
  var Editor = require("./base");
  var Utils = require("./utils");
  var TRUE = true, FALSE = false, NULL = null, xhtmlDtd = Editor.XHTML_DTD, Dom = S.DOM, NodeType = Dom.NodeType, UA = S.UA, REMOVE_EMPTY = {a:1, abbr:1, acronym:1, address:1, b:1, bdo:1, big:1, cite:1, code:1, del:1, dfn:1, em:1, font:1, i:1, ins:1, label:1, kbd:1, q:1, s:1, samp:1, small:1, span:1, strike:1, strong:1, sub:1, sup:1, tt:1, u:1, "var":1};
  Editor.PositionType = {POSITION_IDENTICAL:0, POSITION_DISCONNECTED:1, POSITION_FOLLOWING:2, POSITION_PRECEDING:4, POSITION_IS_CONTAINED:8, POSITION_CONTAINS:16};
  var KEP = Editor.PositionType;
  var blockBoundaryDisplayMatch = {block:1, "list-item":1, table:1, "table-row-group":1, "table-header-group":1, "table-footer-group":1, "table-row":1, "table-column-group":1, "table-column":1, "table-cell":1, "table-caption":1}, blockBoundaryNodeNameMatch = {hr:1}, normalElDom = function(el) {
    return el && (el[0] || el)
  }, normalEl = function(el) {
    return new Node(el)
  }, editorDom = {_4eSameLevel:function(el1, el2) {
    el2 = normalElDom(el2);
    var e1p = el1.parentNode;
    return e1p && e1p === el2.parentNode
  }, _4eIsBlockBoundary:function(el, customNodeNames) {
    var nodeNameMatches = S.merge(blockBoundaryNodeNameMatch, customNodeNames);
    return!!(blockBoundaryDisplayMatch[Dom.css(el, "display")] || nodeNameMatches[Dom.nodeName(el)])
  }, _4eIndex:function(el, normalized) {
    var siblings = el.parentNode.childNodes, candidate, currentIndex = -1;
    for(var i = 0;i < siblings.length;i++) {
      candidate = siblings[i];
      if(normalized && candidate.nodeType === 3 && candidate.previousSibling && candidate.previousSibling.nodeType === 3) {
        continue
      }
      currentIndex++;
      if(candidate === el) {
        return currentIndex
      }
    }
    return-1
  }, _4eMove:function(thisElement, target, toStart) {
    target = normalElDom(target);
    if(toStart) {
      target.insertBefore(thisElement, target.firstChild)
    }else {
      target.appendChild(thisElement)
    }
  }, _4eIsIdentical:function(thisElement, otherElement) {
    if(!otherElement) {
      return FALSE
    }
    otherElement = normalElDom(otherElement);
    if(Dom.nodeName(thisElement) !== Dom.nodeName(otherElement)) {
      return FALSE
    }
    var thisAttributes = thisElement.attributes, attribute, name, otherAttributes = otherElement.attributes;
    var thisLength = thisAttributes.length, otherLength = otherAttributes.length;
    if(thisLength !== otherLength) {
      return FALSE
    }
    for(var i = 0;i < thisLength;i++) {
      attribute = thisAttributes[i];
      name = attribute.name;
      if(attribute.specified && Dom.attr(thisElement, name) !== Dom.attr(otherElement, name)) {
        return FALSE
      }
    }
    if(UA.ieMode < 8) {
      for(i = 0;i < otherLength;i++) {
        attribute = otherAttributes[i];
        name = attribute.name;
        if(attribute.specified && Dom.attr(thisElement, name) !== Dom.attr(otherElement, name)) {
          return FALSE
        }
      }
    }
    return TRUE
  }, _4eIsEmptyInlineRemovable:function(thisElement) {
    if(!xhtmlDtd.$removeEmpty[Dom.nodeName(thisElement)]) {
      return false
    }
    var children = thisElement.childNodes;
    for(var i = 0, count = children.length;i < count;i++) {
      var child = children[i], nodeType = child.nodeType;
      if(nodeType === NodeType.ELEMENT_NODE && child.getAttribute("_ke_bookmark")) {
        continue
      }
      if(nodeType === NodeType.ELEMENT_NODE && !Dom._4eIsEmptyInlineRemovable(child) || nodeType === Dom.NodeType.TEXT_NODE && S.trim(child.nodeValue)) {
        return FALSE
      }
    }
    return TRUE
  }, _4eMoveChildren:function(thisElement, target, toStart) {
    target = normalElDom(target);
    if(thisElement === target) {
      return
    }
    var child;
    if(toStart) {
      while(child = thisElement.lastChild) {
        target.insertBefore(thisElement.removeChild(child), target.firstChild)
      }
    }else {
      while(child = thisElement.firstChild) {
        target.appendChild(thisElement.removeChild(child))
      }
    }
  }, _4eMergeSiblings:function(thisElement) {
    thisElement = normalEl(thisElement);
    if(REMOVE_EMPTY[thisElement.nodeName()]) {
      mergeElements(thisElement, TRUE);
      mergeElements(thisElement)
    }
  }, _4eSplitText:function(el, offset) {
    var doc = el.ownerDocument;
    if(el.nodeType !== Dom.NodeType.TEXT_NODE) {
      return undefined
    }
    if(UA.ie && offset === el.nodeValue.length) {
      var next = doc.createTextNode("");
      Dom.insertAfter(next, el);
      return next
    }
    var ret = el.splitText(offset);
    if(!!doc.documentMode) {
      var workaround = doc.createTextNode("");
      Dom.insertAfter(workaround, ret);
      Dom.remove(workaround)
    }
    return ret
  }, _4eParents:function(node, closerFirst) {
    var parents = [];
    parents.__IS_NODELIST = 1;
    do {
      parents[closerFirst ? "push" : "unshift"](node)
    }while(node = node.parentNode);
    return parents
  }, _4eNextSourceNode:function(el, startFromSibling, nodeType, guard) {
    if(guard && !guard.call) {
      var guardNode = normalElDom(guard);
      guard = function(node) {
        return node !== guardNode
      }
    }
    var node = !startFromSibling && el.firstChild, parent = el;
    if(!node) {
      if(el.nodeType === NodeType.ELEMENT_NODE && guard && guard(el, TRUE) === FALSE) {
        return NULL
      }
      node = el.nextSibling
    }
    while(!node && (parent = parent.parentNode)) {
      if(guard && guard(parent, TRUE) === FALSE) {
        return NULL
      }
      node = parent.nextSibling
    }
    if(!node) {
      return NULL
    }
    if(guard && guard(node) === FALSE) {
      return NULL
    }
    if(nodeType && nodeType !== node.nodeType) {
      return Dom._4eNextSourceNode(node, FALSE, nodeType, guard)
    }
    return node
  }, _4ePreviousSourceNode:function(el, startFromSibling, nodeType, guard) {
    if(guard && !guard.call) {
      var guardNode = normalElDom(guard);
      guard = function(node) {
        return node !== guardNode
      }
    }
    var node = !startFromSibling && el.lastChild, parent = el;
    if(!node) {
      if(el.nodeType === NodeType.ELEMENT_NODE && guard && guard(el, TRUE) === FALSE) {
        return NULL
      }
      node = el.previousSibling
    }
    while(!node && (parent = parent.parentNode)) {
      if(guard && guard(parent, TRUE) === FALSE) {
        return NULL
      }
      node = parent.previousSibling
    }
    if(!node) {
      return NULL
    }
    if(guard && guard(node) === FALSE) {
      return NULL
    }
    if(nodeType && node.nodeType !== nodeType) {
      return Dom._4ePreviousSourceNode(node, FALSE, nodeType, guard)
    }
    return node
  }, _4eCommonAncestor:function(el, node) {
    node = normalElDom(node);
    if(el === node) {
      return el
    }
    if(Dom.contains(node, el)) {
      return node
    }
    var start = el;
    do {
      if(Dom.contains(start, node)) {
        return start
      }
    }while(start = start.parentNode);
    return NULL
  }, _4eHasAttributes:UA.ieMode < 9 ? function(el) {
    var attributes = el.attributes;
    for(var i = 0;i < attributes.length;i++) {
      var attribute = attributes[i];
      switch(attribute.name) {
        case "class":
          if(el.getAttribute("class")) {
            return TRUE
          }
          break;
        default:
          if(attribute.specified) {
            return TRUE
          }
      }
    }
    return FALSE
  } : function(el) {
    if(UA.gecko) {
      el.removeAttribute("_moz_dirty")
    }
    return el.hasAttributes()
  }, _4ePosition:function(el, otherNode) {
    var $other = normalElDom(otherNode);
    if(el.compareDocumentPosition) {
      return el.compareDocumentPosition($other)
    }
    if(el === $other) {
      return KEP.POSITION_IDENTICAL
    }
    if(el.nodeType === NodeType.ELEMENT_NODE && $other.nodeType === NodeType.ELEMENT_NODE) {
      if(Dom.contains(el, $other)) {
        return KEP.POSITION_CONTAINS + KEP.POSITION_PRECEDING
      }
      if(Dom.contains($other, el)) {
        return KEP.POSITION_IS_CONTAINED + KEP.POSITION_FOLLOWING
      }
      if("sourceIndex" in el) {
        return el.sourceIndex < 0 || $other.sourceIndex < 0 ? KEP.POSITION_DISCONNECTED : el.sourceIndex < $other.sourceIndex ? KEP.POSITION_PRECEDING : KEP.POSITION_FOLLOWING
      }
    }
    var addressOfThis = Dom._4eAddress(el), addressOfOther = Dom._4eAddress($other), minLevel = Math.min(addressOfThis.length, addressOfOther.length);
    for(var i = 0;i <= minLevel - 1;i++) {
      if(addressOfThis[i] !== addressOfOther[i]) {
        return addressOfThis[i] < addressOfOther[i] ? KEP.POSITION_PRECEDING : KEP.POSITION_FOLLOWING
      }
    }
    return addressOfThis.length < addressOfOther.length ? KEP.POSITION_CONTAINS + KEP.POSITION_PRECEDING : KEP.POSITION_IS_CONTAINED + KEP.POSITION_FOLLOWING
  }, _4eAddress:function(el, normalized) {
    var address = [], $documentElement = el.ownerDocument.documentElement, node = el;
    while(node && node !== $documentElement) {
      address.unshift(Dom._4eIndex(node, normalized));
      node = node.parentNode
    }
    return address
  }, _4eRemove:function(el, preserveChildren) {
    var parent = el.parentNode;
    if(parent) {
      if(preserveChildren) {
        for(var child;child = el.firstChild;) {
          parent.insertBefore(el.removeChild(child), el)
        }
      }
      parent.removeChild(el)
    }
    return el
  }, _4eTrim:function(el) {
    Dom._4eLtrim(el);
    Dom._4eRtrim(el)
  }, _4eLtrim:function(el) {
    var child;
    while(child = el.firstChild) {
      if(child.nodeType === Dom.NodeType.TEXT_NODE) {
        var trimmed = Utils.ltrim(child.nodeValue), originalLength = child.nodeValue.length;
        if(!trimmed) {
          el.removeChild(child);
          continue
        }else {
          if(trimmed.length < originalLength) {
            Dom._4eSplitText(child, originalLength - trimmed.length);
            el.removeChild(el.firstChild)
          }
        }
      }
      break
    }
  }, _4eRtrim:function(el) {
    var child;
    while(child = el.lastChild) {
      if(child.type === Dom.NodeType.TEXT_NODE) {
        var trimmed = Utils.rtrim(child.nodeValue), originalLength = child.nodeValue.length;
        if(!trimmed) {
          el.removeChild(child);
          continue
        }else {
          if(trimmed.length < originalLength) {
            Dom._4eSplitText(child, trimmed.length);
            el.removeChild(el.lastChild)
          }
        }
      }
      break
    }
    if(!UA.ie && !UA.opera) {
      child = el.lastChild;
      if(child && child.nodeType === 1 && Dom.nodeName(child) === "br") {
        el.removeChild(child)
      }
    }
  }, _4eAppendBogus:function(el) {
    var lastChild = el.lastChild, bogus;
    while(lastChild && lastChild.nodeType === Dom.NodeType.TEXT_NODE && !S.trim(lastChild.nodeValue)) {
      lastChild = lastChild.previousSibling
    }
    if(!lastChild || lastChild.nodeType === Dom.NodeType.TEXT_NODE || Dom.nodeName(lastChild) !== "br") {
      bogus = UA.opera ? el.ownerDocument.createTextNode("") : el.ownerDocument.createElement("br");
      el.appendChild(bogus)
    }
  }, _4eSetMarker:function(element, database, name, value) {
    element = normalEl(element);
    var id = element.data("list_marker_id") || element.data("list_marker_id", S.guid()).data("list_marker_id"), markerNames = element.data("list_marker_names") || element.data("list_marker_names", {}).data("list_marker_names");
    database[id] = element;
    markerNames[name] = 1;
    return element.data(name, value)
  }, _4eClearMarkers:function(element, database, removeFromDatabase) {
    element = normalEl(element);
    var names = element.data("list_marker_names"), id = element.data("list_marker_id");
    for(var i in names) {
      element.removeData(i)
    }
    element.removeData("list_marker_names");
    if(removeFromDatabase) {
      element.removeData("list_marker_id");
      delete database[id]
    }
  }, _4eCopyAttributes:function(el, target, skipAttributes) {
    target = normalEl(target);
    var attributes = el.attributes;
    skipAttributes = skipAttributes || {};
    for(var n = 0;n < attributes.length;n++) {
      var attribute = attributes[n], attrName = attribute.name.toLowerCase(), attrValue;
      if(attrName in skipAttributes) {
        continue
      }
      if(attrName === "checked" && (attrValue = Dom.attr(el, attrName))) {
        target.attr(attrName, attrValue)
      }else {
        if(attribute.specified || UA.ie && attribute.value && attrName === "value") {
          attrValue = Dom.attr(el, attrName);
          if(attrValue === NULL) {
            attrValue = attribute.nodeValue
          }
          target.attr(attrName, attrValue)
        }
      }
    }
    if(el.style.cssText !== "") {
      target[0].style.cssText = el.style.cssText
    }
  }, _4eIsEditable:function(el) {
    var name = Dom.nodeName(el), dtd = !xhtmlDtd.$nonEditable[name] && (xhtmlDtd[name] || xhtmlDtd.span);
    return dtd && dtd["#text"]
  }, _4eGetByAddress:function(doc, address, normalized) {
    var $ = doc.documentElement;
    for(var i = 0;$ && i < address.length;i++) {
      var target = address[i];
      if(!normalized) {
        $ = $.childNodes[target];
        continue
      }
      var currentIndex = -1;
      for(var j = 0;j < $.childNodes.length;j++) {
        var candidate = $.childNodes[j];
        if(normalized === TRUE && candidate.nodeType === 3 && candidate.previousSibling && candidate.previousSibling.nodeType === 3) {
          continue
        }
        currentIndex++;
        if(currentIndex === target) {
          $ = candidate;
          break
        }
      }
    }
    return $
  }};
  function mergeElements(element, isNext) {
    var sibling = element[isNext ? "next" : "prev"](undefined, 1);
    if(sibling && sibling[0].nodeType === NodeType.ELEMENT_NODE) {
      var pendingNodes = [];
      while(sibling.attr("_ke_bookmark") || sibling._4eIsEmptyInlineRemovable(undefined)) {
        pendingNodes.push(sibling);
        sibling = isNext ? sibling.next(undefined, 1) : sibling.prev(undefined, 1);
        if(!sibling) {
          return
        }
      }
      if(element._4eIsIdentical(sibling, undefined)) {
        var innerSibling = new Node(isNext ? element[0].lastChild : element[0].firstChild);
        while(pendingNodes.length) {
          pendingNodes.shift()._4eMove(element, !isNext, undefined)
        }
        sibling._4eMoveChildren(element, !isNext, undefined);
        sibling.remove();
        if(innerSibling[0] && innerSibling[0].nodeType === NodeType.ELEMENT_NODE) {
          innerSibling._4eMergeSiblings()
        }
      }
    }
  }
  Utils.injectDom(editorDom)
});
KISSY.add("editor/walker", ["./base", "node"], function(S, require) {
  var Editor = require("./base");
  var TRUE = true, FALSE = false, NULL = null, UA = S.UA, Dom = S.DOM, dtd = Editor.XHTML_DTD, Node = require("node");
  function iterate(rtl, breakOnFalseRetFalse) {
    var self = this;
    if(self._.end) {
      return NULL
    }
    var node, range = self.range, guard, userGuard = self.guard, type = self.type, getSourceNodeFn = rtl ? "_4ePreviousSourceNode" : "_4eNextSourceNode";
    if(!self._.start) {
      self._.start = 1;
      range.trim();
      if(range.collapsed) {
        self.end();
        return NULL
      }
    }
    if(!rtl && !self._.guardLTR) {
      var limitLTR = range.endContainer[0], blockerLTR = limitLTR.childNodes[range.endOffset];
      this._.guardLTR = function(node, movingOut) {
        if(movingOut && (limitLTR === node || Dom.nodeName(node) === "body")) {
          return false
        }
        return node !== blockerLTR
      }
    }
    if(rtl && !self._.guardRTL) {
      var limitRTL = range.startContainer[0], blockerRTL = range.startOffset > 0 && limitRTL.childNodes[range.startOffset - 1] || null;
      self._.guardRTL = function(node, movingOut) {
        if(movingOut && (limitRTL === node || Dom.nodeName(node) === "body")) {
          return false
        }
        return node !== blockerRTL
      }
    }
    var stopGuard = rtl ? self._.guardRTL : self._.guardLTR;
    if(userGuard) {
      guard = function(node, movingOut) {
        if(stopGuard(node, movingOut) === FALSE) {
          return FALSE
        }
        return userGuard(node, movingOut)
      }
    }else {
      guard = stopGuard
    }
    if(self.current) {
      node = this.current[getSourceNodeFn](FALSE, type, guard)
    }else {
      if(rtl) {
        node = range.endContainer;
        if(range.endOffset > 0) {
          node = new Node(node[0].childNodes[range.endOffset - 1]);
          if(guard(node[0]) === FALSE) {
            node = NULL
          }
        }else {
          node = guard(node, TRUE) === FALSE ? NULL : node._4ePreviousSourceNode(TRUE, type, guard, undefined)
        }
      }else {
        node = range.startContainer;
        node = new Node(node[0].childNodes[range.startOffset]);
        if(node.length) {
          if(guard(node[0]) === FALSE) {
            node = NULL
          }
        }else {
          node = guard(range.startContainer, TRUE) === FALSE ? NULL : range.startContainer._4eNextSourceNode(TRUE, type, guard, undefined)
        }
      }
    }
    while(node && !self._.end) {
      self.current = node;
      if(!self.evaluator || self.evaluator(node[0]) !== FALSE) {
        if(!breakOnFalseRetFalse) {
          return node
        }
      }else {
        if(breakOnFalseRetFalse && self.evaluator) {
          return FALSE
        }
      }
      node = node[getSourceNodeFn](FALSE, type, guard)
    }
    self.end();
    self.current = NULL;
    return NULL
  }
  function iterateToLast(rtl) {
    var node, last = NULL;
    while(node = iterate.call(this, rtl)) {
      last = node
    }
    return last
  }
  function Walker(range) {
    this.range = range;
    this.evaluator = NULL;
    this.guard = NULL;
    this._ = {}
  }
  S.augment(Walker, {end:function() {
    this._.end = 1
  }, next:function() {
    return iterate.call(this)
  }, previous:function() {
    return iterate.call(this, TRUE)
  }, checkForward:function() {
    return iterate.call(this, FALSE, TRUE) !== FALSE
  }, checkBackward:function() {
    return iterate.call(this, TRUE, TRUE) !== FALSE
  }, lastForward:function() {
    return iterateToLast.call(this)
  }, lastBackward:function() {
    return iterateToLast.call(this, TRUE)
  }, reset:function() {
    delete this.current;
    this._ = {}
  }, _iterator:iterate});
  S.mix(Walker, {blockBoundary:function(customNodeNames) {
    return function(node) {
      return!(node.nodeType === Dom.NodeType.ELEMENT_NODE && Dom._4eIsBlockBoundary(node, customNodeNames))
    }
  }, bookmark:function(contentOnly, isReject) {
    function isBookmarkNode(node) {
      return Dom.nodeName(node) === "span" && Dom.attr(node, "_ke_bookmark")
    }
    return function(node) {
      var isBookmark, parent;
      isBookmark = node.nodeType === Dom.NodeType.TEXT_NODE && (parent = node.parentNode) && isBookmarkNode(parent);
      isBookmark = contentOnly ? isBookmark : isBookmark || isBookmarkNode(node);
      return!!(isReject ^ isBookmark)
    }
  }, whitespaces:function(isReject) {
    return function(node) {
      var isWhitespace = node.nodeType === Dom.NodeType.TEXT_NODE && !S.trim(node.nodeValue);
      return!!(isReject ^ isWhitespace)
    }
  }, invisible:function(isReject) {
    var whitespace = Walker.whitespaces();
    return function(node) {
      var isInvisible = whitespace(node) || node.nodeType === Dom.NodeType.ELEMENT_NODE && !node.offsetHeight;
      return!!(isReject ^ isInvisible)
    }
  }});
  var tailNbspRegex = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, isWhitespaces = Walker.whitespaces(), isBookmark = Walker.bookmark(), toSkip = function(node) {
    var name = Dom.nodeName(node);
    return isBookmark(node) || isWhitespaces(node) || node.nodeType === 1 && name in dtd.$inline && !(name in dtd.$empty)
  };
  function getBogus(tail) {
    do {
      tail = tail._4ePreviousSourceNode()
    }while(tail && toSkip(tail[0]));
    if(tail && (!UA.ie ? tail.nodeName() === "br" : tail[0].nodeType === 3 && tailNbspRegex.test(tail.text()))) {
      return tail[0]
    }
    return false
  }
  Editor.Utils.injectDom({_4eGetBogus:function(el) {
    return getBogus(new Node(el))
  }});
  Editor.Walker = Walker;
  return Walker
});
KISSY.add("editor/elementPath", ["node", "./base", "./dom"], function(S, require) {
  require("node");
  var Editor = require("./base");
  require("./dom");
  var Dom = S.DOM, dtd = Editor.XHTML_DTD, TRUE = true, FALSE = false, NULL = null, pathBlockElements = {address:1, blockquote:1, dl:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, p:1, pre:1, li:1, dt:1, dd:1}, pathBlockLimitElements = {body:1, div:1, table:1, tbody:1, tr:1, td:1, th:1, caption:1, form:1}, checkHasBlock = function(element) {
    var childNodes = element[0].childNodes;
    for(var i = 0, count = childNodes.length;i < count;i++) {
      var child = childNodes[i];
      if(child.nodeType === Dom.NodeType.ELEMENT_NODE && dtd.$block[child.nodeName.toLowerCase()]) {
        return TRUE
      }
    }
    return FALSE
  };
  function ElementPath(lastNode) {
    var self = this, block = NULL, blockLimit = NULL, elements = [], e = lastNode;
    while(e) {
      if(e[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
        if(!this.lastElement) {
          this.lastElement = e
        }
        var elementName = e.nodeName();
        if(!blockLimit) {
          if(!block && pathBlockElements[elementName]) {
            block = e
          }
          if(pathBlockLimitElements[elementName]) {
            if(!block && elementName === "div" && !checkHasBlock(e)) {
              block = e
            }else {
              blockLimit = e
            }
          }
        }
        elements.push(e);
        if(elementName === "body") {
          break
        }
      }
      e = e.parent()
    }
    self.block = block;
    self.blockLimit = blockLimit;
    self.elements = elements
  }
  ElementPath.prototype = {constructor:ElementPath, compare:function(otherPath) {
    var thisElements = this.elements;
    var otherElements = otherPath && otherPath.elements;
    if(!otherElements || thisElements.length !== otherElements.length) {
      return FALSE
    }
    for(var i = 0;i < thisElements.length;i++) {
      if(!Dom.equals(thisElements[i], otherElements[i])) {
        return FALSE
      }
    }
    return TRUE
  }, contains:function(tagNames) {
    var elements = this.elements;
    for(var i = 0;i < elements.length;i++) {
      if(elements[i].nodeName() in tagNames) {
        return elements[i]
      }
    }
    return NULL
  }, toString:function() {
    var elements = this.elements, i, elNames = [];
    for(i = 0;i < elements.length;i++) {
      elNames.push(elements[i].nodeName())
    }
    return elNames.toString()
  }};
  Editor.ElementPath = ElementPath;
  return ElementPath
});
KISSY.add("editor/range", ["./dom", "node", "./utils", "./walker", "./base", "./elementPath"], function(S, require) {
  require("./dom");
  var Node = require("node");
  var Utils = require("./utils");
  var Walker = require("./walker");
  var Editor = require("./base");
  var ElementPath = require("./elementPath");
  Editor.RangeType = {POSITION_AFTER_START:1, POSITION_BEFORE_END:2, POSITION_BEFORE_START:3, POSITION_AFTER_END:4, ENLARGE_ELEMENT:1, ENLARGE_BLOCK_CONTENTS:2, ENLARGE_LIST_ITEM_CONTENTS:3, START:1, END:2, SHRINK_ELEMENT:1, SHRINK_TEXT:2};
  var TRUE = true, FALSE = false, NULL = null, KER = Editor.RangeType, KEP = Editor.PositionType, Dom = S.DOM, UA = S.UA, dtd = Editor.XHTML_DTD, $ = Node.all, UN_REMOVABLE = {td:1}, EMPTY = {area:1, base:1, br:1, col:1, hr:1, img:1, input:1, link:1, meta:1, param:1};
  var isWhitespace = new Walker.whitespaces, isBookmark = new Walker.bookmark, isNotWhitespaces = Walker.whitespaces(TRUE), isNotBookmarks = Walker.bookmark(false, true);
  var inlineChildReqElements = {abbr:1, acronym:1, b:1, bdo:1, big:1, cite:1, code:1, del:1, dfn:1, em:1, font:1, i:1, ins:1, label:1, kbd:1, q:1, samp:1, small:1, span:1, strike:1, strong:1, sub:1, sup:1, tt:1, u:1, "var":1};
  function elementBoundaryEval(node) {
    var c1 = node.nodeType !== Dom.NodeType.TEXT_NODE && Dom.nodeName(node) in dtd.$removeEmpty, c2 = node.nodeType === Dom.NodeType.TEXT_NODE && !S.trim(node.nodeValue), c3 = !!node.parentNode.getAttribute("_ke_bookmark");
    return c1 || c2 || c3
  }
  function nonWhitespaceOrIsBookmark(node) {
    return!isWhitespace(node) && !isBookmark(node)
  }
  function getCheckStartEndBlockEvalFunction(isStart) {
    var hadBr = FALSE;
    return function(node) {
      if(isBookmark(node)) {
        return TRUE
      }
      if(node.nodeType === Dom.NodeType.TEXT_NODE) {
        if(S.trim(node.nodeValue).length) {
          return FALSE
        }
      }else {
        if(node.nodeType === Dom.NodeType.ELEMENT_NODE) {
          var nodeName = Dom.nodeName(node);
          if(!inlineChildReqElements[nodeName]) {
            if(!isStart && !UA.ie && nodeName === "br" && !hadBr) {
              hadBr = TRUE
            }else {
              return FALSE
            }
          }
        }
      }
      return TRUE
    }
  }
  function execContentsAction(self, action) {
    var startNode = self.startContainer, endNode = self.endContainer, startOffset = self.startOffset, endOffset = self.endOffset, removeStartNode, hasSplitStart = FALSE, hasSplitEnd = FALSE, t, docFrag, doc = self.document, removeEndNode;
    if(action > 0) {
      docFrag = doc.createDocumentFragment()
    }
    if(self.collapsed) {
      return docFrag
    }
    self.optimizeBookmark();
    if(endNode[0].nodeType === Dom.NodeType.TEXT_NODE) {
      hasSplitEnd = TRUE;
      endNode = endNode._4eSplitText(endOffset)
    }else {
      if(endNode[0].childNodes.length > 0) {
        if(endOffset >= endNode[0].childNodes.length) {
          endNode = new Node(endNode[0].appendChild(doc.createTextNode("")));
          removeEndNode = TRUE
        }else {
          endNode = new Node(endNode[0].childNodes[endOffset])
        }
      }
    }
    if(startNode[0].nodeType === Dom.NodeType.TEXT_NODE) {
      hasSplitStart = TRUE;
      startNode._4eSplitText(startOffset)
    }else {
      if(!startOffset) {
        t = new Node(doc.createTextNode(""));
        startNode.prepend(t);
        startNode = t;
        removeStartNode = TRUE
      }else {
        if(startOffset >= startNode[0].childNodes.length) {
          startNode = new Node(startNode[0].appendChild(doc.createTextNode("")));
          removeStartNode = TRUE
        }else {
          startNode = new Node(startNode[0].childNodes[startOffset].previousSibling)
        }
      }
    }
    var startParents = startNode._4eParents(), endParents = endNode._4eParents();
    startParents.each(function(n, i) {
      startParents[i] = n
    });
    endParents.each(function(n, i) {
      endParents[i] = n
    });
    var i, topStart, topEnd;
    for(i = 0;i < startParents.length;i++) {
      topStart = startParents[i];
      topEnd = endParents[i];
      if(!topStart.equals(topEnd)) {
        break
      }
    }
    var clone = docFrag, levelStartNode, levelClone, currentNode, currentSibling;
    for(var j = i;j < startParents.length;j++) {
      levelStartNode = startParents[j];
      if(action > 0 && !levelStartNode.equals(startNode)) {
        levelClone = clone.appendChild(levelStartNode.clone()[0])
      }else {
        levelClone = null
      }
      currentNode = levelStartNode[0].nextSibling;
      var endParentJ = endParents[j], domEndNode = endNode[0], domEndParentJ = endParentJ && endParentJ[0];
      while(currentNode) {
        if(domEndParentJ === currentNode || domEndNode === currentNode) {
          break
        }
        currentSibling = currentNode.nextSibling;
        if(action === 2) {
          clone.appendChild(currentNode.cloneNode(TRUE))
        }else {
          if(UN_REMOVABLE[currentNode.nodeName.toLowerCase()]) {
            var tmp = currentNode.cloneNode(TRUE);
            currentNode.innerHTML = "";
            currentNode = tmp
          }else {
            Dom._4eRemove(currentNode)
          }
          if(action === 1) {
            clone.appendChild(currentNode)
          }
        }
        currentNode = currentSibling
      }
      if(levelClone) {
        clone = levelClone
      }
    }
    clone = docFrag;
    for(var k = i;k < endParents.length;k++) {
      levelStartNode = endParents[k];
      if(action > 0 && !levelStartNode.equals(endNode)) {
        levelClone = clone.appendChild(levelStartNode.clone()[0])
      }else {
        levelClone = null
      }
      if(!startParents[k] || !levelStartNode._4eSameLevel(startParents[k])) {
        currentNode = levelStartNode[0].previousSibling;
        while(currentNode) {
          currentSibling = currentNode.previousSibling;
          if(action === 2) {
            clone.insertBefore(currentNode.cloneNode(TRUE), clone.firstChild)
          }else {
            Dom._4eRemove(currentNode);
            if(action === 1) {
              clone.insertBefore(currentNode, clone.firstChild)
            }
          }
          currentNode = currentSibling
        }
      }
      if(levelClone) {
        clone = levelClone
      }
    }
    if(action === 2) {
      if(hasSplitStart) {
        var startTextNode = startNode[0];
        if(startTextNode.nodeType === Dom.NodeType.TEXT_NODE && startTextNode.nextSibling && startTextNode.nextSibling.nodeType === Dom.NodeType.TEXT_NODE) {
          startTextNode.data += startTextNode.nextSibling.data;
          startTextNode.parentNode.removeChild(startTextNode.nextSibling)
        }
      }
      if(hasSplitEnd) {
        var endTextNode = endNode[0];
        if(endTextNode.nodeType === Dom.NodeType.TEXT_NODE && endTextNode.previousSibling && endTextNode.previousSibling.nodeType === Dom.NodeType.TEXT_NODE) {
          endTextNode.previousSibling.data += endTextNode.data;
          endTextNode.parentNode.removeChild(endTextNode)
        }
      }
    }else {
      if(topStart && topEnd && (!startNode._4eSameLevel(topStart) || !endNode._4eSameLevel(topEnd))) {
        var startIndex = topStart._4eIndex();
        if(removeStartNode && topStart._4eSameLevel(startNode)) {
          startIndex--
        }
        self.setStart(topStart.parent(), startIndex + 1)
      }
      self.collapse(TRUE)
    }
    if(removeStartNode) {
      startNode.remove()
    }
    if(removeEndNode) {
      endNode.remove()
    }
    return docFrag
  }
  function updateCollapsed(self) {
    self.collapsed = self.startContainer && self.endContainer && self.startContainer[0] === self.endContainer[0] && self.startOffset === self.endOffset
  }
  function KERange(document) {
    var self = this;
    self.startContainer = NULL;
    self.startOffset = NULL;
    self.endContainer = NULL;
    self.endOffset = NULL;
    self.collapsed = TRUE;
    self.document = document
  }
  S.augment(KERange, {toString:function() {
    var s = [], self = this, startContainer = self.startContainer[0], endContainer = self.endContainer[0];
    s.push((startContainer.id || startContainer.nodeName) + ":" + self.startOffset);
    s.push((endContainer.id || endContainer.nodeName) + ":" + self.endOffset);
    return s.join("<br/>")
  }, optimize:function() {
    var self = this, container = self.startContainer, offset = self.startOffset;
    if(container[0].nodeType !== Dom.NodeType.ELEMENT_NODE) {
      if(!offset) {
        self.setStartBefore(container)
      }else {
        if(offset >= container[0].nodeValue.length) {
          self.setStartAfter(container)
        }
      }
    }
    container = self.endContainer;
    offset = self.endOffset;
    if(container[0].nodeType !== Dom.NodeType.ELEMENT_NODE) {
      if(!offset) {
        self.setEndBefore(container)
      }else {
        if(offset >= container[0].nodeValue.length) {
          self.setEndAfter(container)
        }
      }
    }
  }, setStartAfter:function(node) {
    this.setStart(node.parent(), node._4eIndex() + 1)
  }, setStartBefore:function(node) {
    this.setStart(node.parent(), node._4eIndex())
  }, setEndAfter:function(node) {
    this.setEnd(node.parent(), node._4eIndex() + 1)
  }, setEndBefore:function(node) {
    this.setEnd(node.parent(), node._4eIndex())
  }, optimizeBookmark:function() {
    var self = this, startNode = self.startContainer, endNode = self.endContainer;
    if(startNode && startNode.nodeName() === "span" && startNode.attr("_ke_bookmark")) {
      self.setStartBefore(startNode)
    }
    if(endNode && endNode.nodeName() === "span" && endNode.attr("_ke_bookmark")) {
      self.setEndAfter(endNode)
    }
  }, setStart:function(startNode, startOffset) {
    var self = this;
    if(startNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && EMPTY[startNode.nodeName()]) {
      startNode = startNode.parent();
      startOffset = startNode._4eIndex()
    }
    self.startContainer = startNode;
    self.startOffset = startOffset;
    if(!self.endContainer) {
      self.endContainer = startNode;
      self.endOffset = startOffset
    }
    updateCollapsed(self)
  }, setEnd:function(endNode, endOffset) {
    var self = this;
    if(endNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && EMPTY[endNode.nodeName()]) {
      endNode = endNode.parent();
      endOffset = endNode._4eIndex() + 1
    }
    self.endContainer = endNode;
    self.endOffset = endOffset;
    if(!self.startContainer) {
      self.startContainer = endNode;
      self.startOffset = endOffset
    }
    updateCollapsed(self)
  }, setStartAt:function(node, position) {
    var self = this;
    switch(position) {
      case KER.POSITION_AFTER_START:
        self.setStart(node, 0);
        break;
      case KER.POSITION_BEFORE_END:
        if(node[0].nodeType === Dom.NodeType.TEXT_NODE) {
          self.setStart(node, node[0].nodeValue.length)
        }else {
          self.setStart(node, node[0].childNodes.length)
        }
        break;
      case KER.POSITION_BEFORE_START:
        self.setStartBefore(node);
        break;
      case KER.POSITION_AFTER_END:
        self.setStartAfter(node)
    }
    updateCollapsed(self)
  }, setEndAt:function(node, position) {
    var self = this;
    switch(position) {
      case KER.POSITION_AFTER_START:
        self.setEnd(node, 0);
        break;
      case KER.POSITION_BEFORE_END:
        if(node[0].nodeType === Dom.NodeType.TEXT_NODE) {
          self.setEnd(node, node[0].nodeValue.length)
        }else {
          self.setEnd(node, node[0].childNodes.length)
        }
        break;
      case KER.POSITION_BEFORE_START:
        self.setEndBefore(node);
        break;
      case KER.POSITION_AFTER_END:
        self.setEndAfter(node)
    }
    updateCollapsed(self)
  }, cloneContents:function() {
    return execContentsAction(this, 2)
  }, deleteContents:function() {
    return execContentsAction(this, 0)
  }, extractContents:function() {
    return execContentsAction(this, 1)
  }, collapse:function(toStart) {
    var self = this;
    if(toStart) {
      self.endContainer = self.startContainer;
      self.endOffset = self.startOffset
    }else {
      self.startContainer = self.endContainer;
      self.startOffset = self.endOffset
    }
    self.collapsed = TRUE
  }, clone:function() {
    var self = this, clone = new KERange(self.document);
    clone.startContainer = self.startContainer;
    clone.startOffset = self.startOffset;
    clone.endContainer = self.endContainer;
    clone.endOffset = self.endOffset;
    clone.collapsed = self.collapsed;
    return clone
  }, getEnclosedNode:function() {
    var walkerRange = this.clone();
    walkerRange.optimize();
    if(walkerRange.startContainer[0].nodeType !== Dom.NodeType.ELEMENT_NODE || walkerRange.endContainer[0].nodeType !== Dom.NodeType.ELEMENT_NODE) {
      return NULL
    }
    var walker = new Walker(walkerRange), node, pre;
    walker.evaluator = function(node) {
      return isNotWhitespaces(node) && isNotBookmarks(node)
    };
    node = walker.next();
    walker.reset();
    pre = walker.previous();
    return node && node.equals(pre) ? node : NULL
  }, shrink:function(mode, selectContents) {
    var self = this;
    if(!self.collapsed) {
      mode = mode || KER.SHRINK_TEXT;
      var walkerRange = self.clone(), startContainer = self.startContainer, endContainer = self.endContainer, startOffset = self.startOffset, endOffset = self.endOffset, moveStart = TRUE, currentElement, walker, moveEnd = TRUE;
      if(startContainer && startContainer[0].nodeType === Dom.NodeType.TEXT_NODE) {
        if(!startOffset) {
          walkerRange.setStartBefore(startContainer)
        }else {
          if(startOffset >= startContainer[0].nodeValue.length) {
            walkerRange.setStartAfter(startContainer)
          }else {
            walkerRange.setStartBefore(startContainer);
            moveStart = FALSE
          }
        }
      }
      if(endContainer && endContainer[0].nodeType === Dom.NodeType.TEXT_NODE) {
        if(!endOffset) {
          walkerRange.setEndBefore(endContainer)
        }else {
          if(endOffset >= endContainer[0].nodeValue.length) {
            walkerRange.setEndAfter(endContainer)
          }else {
            walkerRange.setEndAfter(endContainer);
            moveEnd = FALSE
          }
        }
      }
      if(moveStart || moveEnd) {
        walker = new Walker(walkerRange);
        walker.evaluator = function(node) {
          return node.nodeType === (mode === KER.SHRINK_ELEMENT ? Dom.NodeType.ELEMENT_NODE : Dom.NodeType.TEXT_NODE)
        };
        walker.guard = function(node, movingOut) {
          if(mode === KER.SHRINK_ELEMENT && node.nodeType === Dom.NodeType.TEXT_NODE) {
            return FALSE
          }
          if(movingOut && node === currentElement) {
            return FALSE
          }
          if(!movingOut && node.nodeType === Dom.NodeType.ELEMENT_NODE) {
            currentElement = node
          }
          return TRUE
        }
      }
      if(moveStart) {
        var textStart = walker[mode === KER.SHRINK_ELEMENT ? "lastForward" : "next"]();
        if(textStart) {
          self.setStartAt(textStart, selectContents ? KER.POSITION_AFTER_START : KER.POSITION_BEFORE_START)
        }
      }
      if(moveEnd) {
        walker.reset();
        var textEnd = walker[mode === KER.SHRINK_ELEMENT ? "lastBackward" : "previous"]();
        if(textEnd) {
          self.setEndAt(textEnd, selectContents ? KER.POSITION_BEFORE_END : KER.POSITION_AFTER_END)
        }
      }
      return moveStart || moveEnd
    }
  }, createBookmark2:function(normalized) {
    var self = this, startContainer = self.startContainer, endContainer = self.endContainer, startOffset = self.startOffset, endOffset = self.endOffset, child, previous;
    if(!startContainer || !endContainer) {
      return{start:0, end:0}
    }
    if(normalized) {
      if(startContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
        child = new Node(startContainer[0].childNodes[startOffset]);
        if(child && child[0] && child[0].nodeType === Dom.NodeType.TEXT_NODE && startOffset > 0 && child[0].previousSibling.nodeType === Dom.NodeType.TEXT_NODE) {
          startContainer = child;
          startOffset = 0
        }
      }
      while(startContainer[0].nodeType === Dom.NodeType.TEXT_NODE && (previous = startContainer.prev(undefined, 1)) && previous[0].nodeType === Dom.NodeType.TEXT_NODE) {
        startContainer = previous;
        startOffset += previous[0].nodeValue.length
      }
      if(!self.collapsed) {
        if(endContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
          child = new Node(endContainer[0].childNodes[endOffset]);
          if(child && child[0] && child[0].nodeType === Dom.NodeType.TEXT_NODE && endOffset > 0 && child[0].previousSibling.nodeType === Dom.NodeType.TEXT_NODE) {
            endContainer = child;
            endOffset = 0
          }
        }
        while(endContainer[0].nodeType === Dom.NodeType.TEXT_NODE && (previous = endContainer.prev(undefined, 1)) && previous[0].nodeType === Dom.NodeType.TEXT_NODE) {
          endContainer = previous;
          endOffset += previous[0].nodeValue.length
        }
      }
    }
    return{start:startContainer._4eAddress(normalized), end:self.collapsed ? NULL : endContainer._4eAddress(normalized), startOffset:startOffset, endOffset:endOffset, normalized:normalized, is2:TRUE}
  }, createBookmark:function(serializable) {
    var startNode, endNode, baseId, clone, self = this, collapsed = self.collapsed;
    startNode = new Node("<span>", NULL, self.document);
    startNode.attr("_ke_bookmark", 1);
    startNode.css("display", "none");
    startNode.html("&nbsp;");
    if(serializable) {
      baseId = S.guid("ke_bm_");
      startNode.attr("id", baseId + "S")
    }
    if(!collapsed) {
      endNode = startNode.clone();
      endNode.html("&nbsp;");
      if(serializable) {
        endNode.attr("id", baseId + "E")
      }
      clone = self.clone();
      clone.collapse();
      clone.insertNode(endNode)
    }
    clone = self.clone();
    clone.collapse(TRUE);
    clone.insertNode(startNode);
    if(endNode) {
      self.setStartAfter(startNode);
      self.setEndBefore(endNode)
    }else {
      self.moveToPosition(startNode, KER.POSITION_AFTER_END)
    }
    return{startNode:serializable ? baseId + "S" : startNode, endNode:serializable ? baseId + "E" : endNode, serializable:serializable, collapsed:collapsed}
  }, moveToPosition:function(node, position) {
    var self = this;
    self.setStartAt(node, position);
    self.collapse(TRUE)
  }, trim:function(ignoreStart, ignoreEnd) {
    var self = this, startContainer = self.startContainer, startOffset = self.startOffset, collapsed = self.collapsed;
    if((!ignoreStart || collapsed) && startContainer[0] && startContainer[0].nodeType === Dom.NodeType.TEXT_NODE) {
      if(!startOffset) {
        startOffset = startContainer._4eIndex();
        startContainer = startContainer.parent()
      }else {
        if(startOffset >= startContainer[0].nodeValue.length) {
          startOffset = startContainer._4eIndex() + 1;
          startContainer = startContainer.parent()
        }else {
          var nextText = startContainer._4eSplitText(startOffset);
          startOffset = startContainer._4eIndex() + 1;
          startContainer = startContainer.parent();
          if(Dom.equals(self.startContainer, self.endContainer)) {
            self.setEnd(nextText, self.endOffset - self.startOffset)
          }else {
            if(Dom.equals(startContainer, self.endContainer)) {
              self.endOffset += 1
            }
          }
        }
      }
      self.setStart(startContainer, startOffset);
      if(collapsed) {
        self.collapse(TRUE);
        return
      }
    }
    var endContainer = self.endContainer, endOffset = self.endOffset;
    if(!(ignoreEnd || collapsed) && endContainer[0] && endContainer[0].nodeType === Dom.NodeType.TEXT_NODE) {
      if(!endOffset) {
        endOffset = endContainer._4eIndex();
        endContainer = endContainer.parent()
      }else {
        if(endOffset >= endContainer[0].nodeValue.length) {
          endOffset = endContainer._4eIndex() + 1;
          endContainer = endContainer.parent()
        }else {
          endContainer._4eSplitText(endOffset);
          endOffset = endContainer._4eIndex() + 1;
          endContainer = endContainer.parent()
        }
      }
      self.setEnd(endContainer, endOffset)
    }
  }, insertNode:function(node) {
    var self = this;
    self.optimizeBookmark();
    self.trim(FALSE, TRUE);
    var startContainer = self.startContainer, startOffset = self.startOffset, nextNode = startContainer[0].childNodes[startOffset] || null;
    startContainer[0].insertBefore(node[0], nextNode);
    if(startContainer[0] === self.endContainer[0]) {
      self.endOffset++
    }
    self.setStartBefore(node)
  }, moveToBookmark:function(bookmark) {
    var self = this, doc = $(self.document);
    if(bookmark.is2) {
      var startContainer = doc._4eGetByAddress(bookmark.start, bookmark.normalized), startOffset = bookmark.startOffset, endContainer = bookmark.end && doc._4eGetByAddress(bookmark.end, bookmark.normalized), endOffset = bookmark.endOffset;
      self.setStart(startContainer, startOffset);
      if(endContainer) {
        self.setEnd(endContainer, endOffset)
      }else {
        self.collapse(TRUE)
      }
    }else {
      var serializable = bookmark.serializable, startNode = serializable ? S.one("#" + bookmark.startNode, doc) : bookmark.startNode, endNode = serializable ? S.one("#" + bookmark.endNode, doc) : bookmark.endNode;
      self.setStartBefore(startNode);
      startNode._4eRemove();
      if(endNode && endNode[0]) {
        self.setEndBefore(endNode);
        endNode._4eRemove()
      }else {
        self.collapse(TRUE)
      }
    }
  }, getCommonAncestor:function(includeSelf, ignoreTextNode) {
    var self = this, start = self.startContainer, end = self.endContainer, ancestor;
    if(start[0] === end[0]) {
      if(includeSelf && start[0].nodeType === Dom.NodeType.ELEMENT_NODE && self.startOffset === self.endOffset - 1) {
        ancestor = new Node(start[0].childNodes[self.startOffset])
      }else {
        ancestor = start
      }
    }else {
      ancestor = start._4eCommonAncestor(end)
    }
    return ignoreTextNode && ancestor[0].nodeType === Dom.NodeType.TEXT_NODE ? ancestor.parent() : ancestor
  }, enlarge:function() {
    function enlargeElement(self, left, stop, commonAncestor) {
      var container = self[left ? "startContainer" : "endContainer"], enlarge, sibling, index = left ? 0 : 1, commonReached = 0, direction = left ? "previousSibling" : "nextSibling", offset = self[left ? "startOffset" : "endOffset"];
      if(container[0].nodeType === Dom.NodeType.TEXT_NODE) {
        if(left) {
          if(offset) {
            return
          }
        }else {
          if(offset < container[0].nodeValue.length) {
            return
          }
        }
        sibling = container[0][direction];
        enlarge = container[0].parentNode
      }else {
        sibling = container[0].childNodes[offset + (left ? -1 : 1)] || null;
        enlarge = container[0]
      }
      while(enlarge) {
        while(sibling) {
          if(isWhitespace(sibling) || isBookmark(sibling)) {
            sibling = sibling[direction]
          }else {
            break
          }
        }
        if(sibling) {
          if(!commonReached) {
            self[left ? "setStartAfter" : "setEndBefore"]($(sibling))
          }
          return
        }
        enlarge = $(enlarge);
        if(enlarge.nodeName() === "body") {
          return
        }
        if(commonReached || enlarge.equals(commonAncestor)) {
          stop[index] = enlarge;
          commonReached = 1
        }else {
          self[left ? "setStartBefore" : "setEndAfter"](enlarge)
        }
        sibling = enlarge[0][direction];
        enlarge = enlarge[0].parentNode
      }
    }
    return function(unit) {
      var self = this, enlargeable;
      switch(unit) {
        case KER.ENLARGE_ELEMENT:
          if(self.collapsed) {
            return
          }
          var commonAncestor = self.getCommonAncestor(), stop = [];
          enlargeElement(self, 1, stop, commonAncestor);
          enlargeElement(self, 0, stop, commonAncestor);
          if(stop[0] && stop[1]) {
            var commonStop = stop[0].contains(stop[1]) ? stop[1] : stop[0];
            self.setStartBefore(commonStop);
            self.setEndAfter(commonStop)
          }
          break;
        case KER.ENLARGE_BLOCK_CONTENTS:
        ;
        case KER.ENLARGE_LIST_ITEM_CONTENTS:
          var walkerRange = new KERange(self.document);
          var body = new Node(self.document.body);
          walkerRange.setStartAt(body, KER.POSITION_AFTER_START);
          walkerRange.setEnd(self.startContainer, self.startOffset);
          var walker = new Walker(walkerRange), blockBoundary, tailBr, defaultGuard = Walker.blockBoundary(unit === KER.ENLARGE_LIST_ITEM_CONTENTS ? {br:1} : NULL), boundaryGuard = function(node) {
            var retVal = defaultGuard(node);
            if(!retVal) {
              blockBoundary = $(node)
            }
            return retVal
          }, tailBrGuard = function(node) {
            var retVal = boundaryGuard(node);
            if(!retVal && Dom.nodeName(node) === "br") {
              tailBr = $(node)
            }
            return retVal
          };
          walker.guard = boundaryGuard;
          enlargeable = walker.lastBackward();
          blockBoundary = blockBoundary || body;
          self.setStartAt(blockBoundary, blockBoundary.nodeName() !== "br" && (!enlargeable && self.checkStartOfBlock() || enlargeable && blockBoundary.contains(enlargeable)) ? KER.POSITION_AFTER_START : KER.POSITION_AFTER_END);
          walkerRange = self.clone();
          walkerRange.collapse();
          walkerRange.setEndAt(body, KER.POSITION_BEFORE_END);
          walker = new Walker(walkerRange);
          walker.guard = unit === KER.ENLARGE_LIST_ITEM_CONTENTS ? tailBrGuard : boundaryGuard;
          blockBoundary = NULL;
          enlargeable = walker.lastForward();
          blockBoundary = blockBoundary || body;
          self.setEndAt(blockBoundary, !enlargeable && self.checkEndOfBlock() || enlargeable && blockBoundary.contains(enlargeable) ? KER.POSITION_BEFORE_END : KER.POSITION_BEFORE_START);
          if(tailBr) {
            self.setEndAfter(tailBr)
          }
      }
    }
  }(), checkStartOfBlock:function() {
    var self = this, startContainer = self.startContainer, startOffset = self.startOffset;
    if(startOffset && startContainer[0].nodeType === Dom.NodeType.TEXT_NODE) {
      var textBefore = S.trim(startContainer[0].nodeValue.substring(0, startOffset));
      if(textBefore.length) {
        return FALSE
      }
    }
    self.trim();
    var path = new ElementPath(self.startContainer);
    var walkerRange = self.clone();
    walkerRange.collapse(TRUE);
    walkerRange.setStartAt(path.block || path.blockLimit, KER.POSITION_AFTER_START);
    var walker = new Walker(walkerRange);
    walker.evaluator = getCheckStartEndBlockEvalFunction(TRUE);
    return walker.checkBackward()
  }, checkEndOfBlock:function() {
    var self = this, endContainer = self.endContainer, endOffset = self.endOffset;
    if(endContainer[0].nodeType === Dom.NodeType.TEXT_NODE) {
      var textAfter = S.trim(endContainer[0].nodeValue.substring(endOffset));
      if(textAfter.length) {
        return FALSE
      }
    }
    self.trim();
    var path = new ElementPath(self.endContainer);
    var walkerRange = self.clone();
    walkerRange.collapse(FALSE);
    walkerRange.setEndAt(path.block || path.blockLimit, KER.POSITION_BEFORE_END);
    var walker = new Walker(walkerRange);
    walker.evaluator = getCheckStartEndBlockEvalFunction(FALSE);
    return walker.checkForward()
  }, checkBoundaryOfElement:function(element, checkType) {
    var walkerRange = this.clone();
    walkerRange[checkType === KER.START ? "setStartAt" : "setEndAt"](element, checkType === KER.START ? KER.POSITION_AFTER_START : KER.POSITION_BEFORE_END);
    var walker = new Walker(walkerRange);
    walker.evaluator = elementBoundaryEval;
    return walker[checkType === KER.START ? "checkBackward" : "checkForward"]()
  }, getBoundaryNodes:function() {
    var self = this, startNode = self.startContainer, endNode = self.endContainer, startOffset = self.startOffset, endOffset = self.endOffset, childCount;
    if(startNode[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
      childCount = startNode[0].childNodes.length;
      if(childCount > startOffset) {
        startNode = $(startNode[0].childNodes[startOffset])
      }else {
        if(childCount === 0) {
          startNode = startNode._4ePreviousSourceNode()
        }else {
          startNode = startNode[0];
          while(startNode.lastChild) {
            startNode = startNode.lastChild
          }
          startNode = $(startNode);
          startNode = startNode._4eNextSourceNode() || startNode
        }
      }
    }
    if(endNode[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
      childCount = endNode[0].childNodes.length;
      if(childCount > endOffset) {
        endNode = $(endNode[0].childNodes[endOffset])._4ePreviousSourceNode(TRUE)
      }else {
        if(childCount === 0) {
          endNode = endNode._4ePreviousSourceNode()
        }else {
          endNode = endNode[0];
          while(endNode.lastChild) {
            endNode = endNode.lastChild
          }
          endNode = $(endNode)
        }
      }
    }
    if(startNode._4ePosition(endNode) & KEP.POSITION_FOLLOWING) {
      startNode = endNode
    }
    return{startNode:startNode, endNode:endNode}
  }, fixBlock:function(isStart, blockTag) {
    var self = this, bookmark = self.createBookmark(), fixedBlock = $(self.document.createElement(blockTag));
    self.collapse(isStart);
    self.enlarge(KER.ENLARGE_BLOCK_CONTENTS);
    fixedBlock[0].appendChild(self.extractContents());
    fixedBlock._4eTrim();
    if(!UA.ie) {
      fixedBlock._4eAppendBogus()
    }
    self.insertNode(fixedBlock);
    self.moveToBookmark(bookmark);
    return fixedBlock
  }, splitBlock:function(blockTag) {
    var self = this, startPath = new ElementPath(self.startContainer), endPath = new ElementPath(self.endContainer), startBlockLimit = startPath.blockLimit, endBlockLimit = endPath.blockLimit, startBlock = startPath.block, endBlock = endPath.block, elementPath = NULL;
    if(!startBlockLimit.equals(endBlockLimit)) {
      return NULL
    }
    if(blockTag !== "br") {
      if(!startBlock) {
        startBlock = self.fixBlock(TRUE, blockTag);
        endBlock = (new ElementPath(self.endContainer)).block
      }
      if(!endBlock) {
        endBlock = self.fixBlock(FALSE, blockTag)
      }
    }
    var isStartOfBlock = startBlock && self.checkStartOfBlock(), isEndOfBlock = endBlock && self.checkEndOfBlock();
    self.deleteContents();
    if(startBlock && startBlock[0] === endBlock[0]) {
      if(isEndOfBlock) {
        elementPath = new ElementPath(self.startContainer);
        self.moveToPosition(endBlock, KER.POSITION_AFTER_END);
        endBlock = NULL
      }else {
        if(isStartOfBlock) {
          elementPath = new ElementPath(self.startContainer);
          self.moveToPosition(startBlock, KER.POSITION_BEFORE_START);
          startBlock = NULL
        }else {
          endBlock = self.splitElement(startBlock);
          if(!UA.ie && !S.inArray(startBlock.nodeName(), ["ul", "ol"])) {
            startBlock._4eAppendBogus()
          }
        }
      }
    }
    return{previousBlock:startBlock, nextBlock:endBlock, wasStartOfBlock:isStartOfBlock, wasEndOfBlock:isEndOfBlock, elementPath:elementPath}
  }, splitElement:function(toSplit) {
    var self = this;
    if(!self.collapsed) {
      return NULL
    }
    self.setEndAt(toSplit, KER.POSITION_BEFORE_END);
    var documentFragment = self.extractContents(), clone = toSplit.clone(FALSE);
    clone[0].appendChild(documentFragment);
    clone.insertAfter(toSplit);
    self.moveToPosition(toSplit, KER.POSITION_AFTER_END);
    return clone
  }, moveToElementEditablePosition:function(el, isMoveToEnd) {
    function nextDFS(node, childOnly) {
      var next;
      if(node[0].nodeType === Dom.NodeType.ELEMENT_NODE && node._4eIsEditable()) {
        next = node[isMoveToEnd ? "last" : "first"](nonWhitespaceOrIsBookmark, 1)
      }
      if(!childOnly && !next) {
        next = node[isMoveToEnd ? "prev" : "next"](nonWhitespaceOrIsBookmark, 1)
      }
      return next
    }
    var found = 0, self = this;
    while(el) {
      if(el[0].nodeType === Dom.NodeType.TEXT_NODE) {
        self.moveToPosition(el, isMoveToEnd ? KER.POSITION_AFTER_END : KER.POSITION_BEFORE_START);
        found = 1;
        break
      }
      if(el[0].nodeType === Dom.NodeType.ELEMENT_NODE && el._4eIsEditable()) {
        self.moveToPosition(el, isMoveToEnd ? KER.POSITION_BEFORE_END : KER.POSITION_AFTER_START);
        found = 1
      }
      el = nextDFS(el, found)
    }
    return!!found
  }, selectNodeContents:function(node) {
    var self = this, domNode = node[0];
    self.setStart(node, 0);
    self.setEnd(node, domNode.nodeType === Dom.NodeType.TEXT_NODE ? domNode.nodeValue.length : domNode.childNodes.length)
  }, insertNodeByDtd:function(element) {
    var current, self = this, tmpDtd, last, elementName = element.nodeName(), isBlock = dtd.$block[elementName];
    self.deleteContents();
    if(isBlock) {
      current = self.getCommonAncestor(FALSE, TRUE);
      while((tmpDtd = dtd[current.nodeName()]) && !(tmpDtd && tmpDtd[elementName])) {
        var parent = current.parent();
        if(self.checkStartOfBlock() && self.checkEndOfBlock()) {
          self.setStartBefore(current);
          self.collapse(TRUE);
          current.remove()
        }else {
          last = current
        }
        current = parent
      }
      if(last) {
        self.splitElement(last)
      }
    }
    self.insertNode(element)
  }});
  Utils.injectDom({_4eBreakParent:function(el, parent) {
    parent = $(parent);
    el = $(el);
    var KERange = Editor.Range, docFrag, range = new KERange(el[0].ownerDocument);
    range.setStartAfter(el);
    range.setEndAfter(parent);
    docFrag = range.extractContents();
    range.insertNode(el.remove());
    el.after(docFrag)
  }});
  Editor.Range = KERange;
  return KERange
});
KISSY.add("editor/selection", ["node", "./walker", "./range", "./base"], function(S, require) {
  var Node = require("node");
  var Walker = require("./walker");
  var KERange = require("./range");
  var Editor = require("./base");
  Editor.SelectionType = {SELECTION_NONE:1, SELECTION_TEXT:2, SELECTION_ELEMENT:3};
  var TRUE = true, FALSE = false, NULL = null, UA = S.UA, Dom = S.DOM, KES = Editor.SelectionType, KER = Editor.RangeType, OLD_IE = document.selection;
  function KESelection(document) {
    var self = this;
    self.document = document;
    self._ = {cache:{}};
    if(OLD_IE) {
      try {
        var range = self.getNative().createRange();
        if(!range || range.item && range.item(0).ownerDocument !== document || range.parentElement && range.parentElement().ownerDocument !== document) {
          self.isInvalid = TRUE
        }
      }catch(e) {
        self.isInvalid = TRUE
      }
    }
  }
  var styleObjectElements = {img:1, hr:1, li:1, table:1, tr:1, td:1, th:1, embed:1, object:1, ol:1, ul:1, a:1, input:1, form:1, select:1, textarea:1, button:1, fieldset:1, thead:1, tfoot:1};
  S.augment(KESelection, {getNative:!OLD_IE ? function() {
    var self = this, cache = self._.cache;
    return cache.nativeSel || (cache.nativeSel = Dom.getWindow(self.document).getSelection())
  } : function() {
    var self = this, cache = self._.cache;
    return cache.nativeSel || (cache.nativeSel = self.document.selection)
  }, getType:!OLD_IE ? function() {
    var self = this, cache = self._.cache;
    if(cache.type) {
      return cache.type
    }
    var type = KES.SELECTION_TEXT, sel = self.getNative();
    if(!sel) {
      type = KES.SELECTION_NONE
    }else {
      if(sel.rangeCount === 1) {
        var range = sel.getRangeAt(0), startContainer = range.startContainer;
        if(startContainer === range.endContainer && startContainer.nodeType === Dom.NodeType.ELEMENT_NODE && Number(range.endOffset - range.startOffset) === 1 && styleObjectElements[startContainer.childNodes[range.startOffset].nodeName.toLowerCase()]) {
          type = KES.SELECTION_ELEMENT
        }
      }
    }
    cache.type = type;
    return type
  } : function() {
    var self = this, cache = self._.cache;
    if(cache.type) {
      return cache.type
    }
    var type = KES.SELECTION_NONE;
    try {
      var sel = self.getNative(), ieType = sel.type;
      if(ieType === "Text") {
        type = KES.SELECTION_TEXT
      }
      if(ieType === "Control") {
        type = KES.SELECTION_ELEMENT
      }
      if(sel.createRange().parentElement) {
        type = KES.SELECTION_TEXT
      }
    }catch(e) {
    }
    cache.type = type;
    return type
  }, getRanges:OLD_IE ? function() {
    var getBoundaryInformation = function(range, start) {
      range = range.duplicate();
      range.collapse(start);
      var parent = range.parentElement(), siblings = parent.childNodes, testRange;
      for(var i = 0;i < siblings.length;i++) {
        var child = siblings[i];
        if(child.nodeType === Dom.NodeType.ELEMENT_NODE) {
          testRange = range.duplicate();
          testRange.moveToElementText(child);
          var comparisonStart = testRange.compareEndPoints("StartToStart", range), comparisonEnd = testRange.compareEndPoints("EndToStart", range);
          testRange.collapse();
          if(comparisonStart > 0) {
            break
          }else {
            if(!comparisonStart || comparisonEnd === 1 && comparisonStart === -1) {
              return{container:parent, offset:i}
            }else {
              if(!comparisonEnd) {
                return{container:parent, offset:i + 1}
              }
            }
          }
          testRange = NULL
        }
      }
      if(!testRange) {
        testRange = range.duplicate();
        testRange.moveToElementText(parent);
        testRange.collapse(FALSE)
      }
      testRange.setEndPoint("StartToStart", range);
      var distance = String(testRange.text).replace(/\r\n|\r/g, "\n").length;
      try {
        while(distance > 0) {
          distance -= siblings[--i].nodeValue.length
        }
      }catch(e) {
        distance = 0
      }
      if(distance === 0) {
        return{container:parent, offset:i}
      }else {
        return{container:siblings[i], offset:-distance}
      }
    };
    return function(force) {
      var self = this, cache = self._.cache;
      if(cache.ranges && !force) {
        return cache.ranges
      }
      var sel = self.getNative(), nativeRange = sel && sel.createRange(), type = self.getType(), range;
      if(!sel) {
        return[]
      }
      if(type === KES.SELECTION_TEXT) {
        range = new KERange(self.document);
        var boundaryInfo = getBoundaryInformation(nativeRange, TRUE);
        range.setStart(new Node(boundaryInfo.container), boundaryInfo.offset);
        boundaryInfo = getBoundaryInformation(nativeRange);
        range.setEnd(new Node(boundaryInfo.container), boundaryInfo.offset);
        cache.ranges = [range];
        return[range]
      }else {
        if(type === KES.SELECTION_ELEMENT) {
          var retval = cache.ranges = [];
          for(var i = 0;i < nativeRange.length;i++) {
            var element = nativeRange.item(i), parentElement = element.parentNode, j = 0;
            range = new KERange(self.document);
            for(;j < parentElement.childNodes.length && parentElement.childNodes[j] !== element;j++) {
            }
            range.setStart(new Node(parentElement), j);
            range.setEnd(new Node(parentElement), j + 1);
            retval.push(range)
          }
          return retval
        }
      }
      cache.ranges = [];
      return[]
    }
  }() : function(force) {
    var self = this, cache = self._.cache;
    if(cache.ranges && !force) {
      return cache.ranges
    }
    var ranges = [], sel = self.getNative();
    if(!sel) {
      return[]
    }
    for(var i = 0;i < sel.rangeCount;i++) {
      var nativeRange = sel.getRangeAt(i), range = new KERange(self.document);
      range.setStart(new Node(nativeRange.startContainer), nativeRange.startOffset);
      range.setEnd(new Node(nativeRange.endContainer), nativeRange.endOffset);
      ranges.push(range)
    }
    cache.ranges = ranges;
    return ranges
  }, getStartElement:function() {
    var self = this, cache = self._.cache;
    if(cache.startElement !== undefined) {
      return cache.startElement
    }
    var node, sel = self.getNative();
    switch(self.getType()) {
      case KES.SELECTION_ELEMENT:
        return this.getSelectedElement();
      case KES.SELECTION_TEXT:
        var range = self.getRanges()[0];
        if(range) {
          if(!range.collapsed) {
            range.optimize();
            while(TRUE) {
              var startContainer = range.startContainer, startOffset = range.startOffset;
              if(startOffset === (startContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE ? startContainer[0].childNodes.length : startContainer[0].nodeValue.length) && !startContainer._4eIsBlockBoundary()) {
                range.setStartAfter(startContainer)
              }else {
                break
              }
            }
            node = range.startContainer;
            if(node[0].nodeType !== Dom.NodeType.ELEMENT_NODE) {
              return node.parent()
            }
            node = new Node(node[0].childNodes[range.startOffset]);
            if(!node[0] || node[0].nodeType !== Dom.NodeType.ELEMENT_NODE) {
              return range.startContainer
            }
            var child = node[0].firstChild;
            while(child && child.nodeType === Dom.NodeType.ELEMENT_NODE) {
              node = new Node(child);
              child = child.firstChild
            }
            return node
          }
        }
        if(OLD_IE) {
          range = sel.createRange();
          range.collapse(TRUE);
          node = new Node(range.parentElement())
        }else {
          node = sel.anchorNode;
          if(node && node.nodeType !== Dom.NodeType.ELEMENT_NODE) {
            node = node.parentNode
          }
          if(node) {
            node = new Node(node)
          }
        }
    }
    cache.startElement = node;
    return node
  }, getSelectedElement:function() {
    var self = this, node, cache = self._.cache;
    if(cache.selectedElement !== undefined) {
      return cache.selectedElement
    }
    if(OLD_IE) {
      var range = self.getNative().createRange();
      node = range.item && range.item(0)
    }
    if(!node) {
      node = function() {
        var range = self.getRanges()[0], enclosed, selected;
        for(var i = 2;i && !((enclosed = range.getEnclosedNode()) && enclosed[0].nodeType === Dom.NodeType.ELEMENT_NODE && styleObjectElements[enclosed.nodeName()] && (selected = enclosed));i--) {
          range.shrink(KER.SHRINK_ELEMENT)
        }
        return selected
      }()
    }else {
      node = new Node(node)
    }
    cache.selectedElement = node;
    return node
  }, reset:function() {
    this._.cache = {}
  }, selectElement:function(element) {
    var range, self = this, doc = self.document;
    if(OLD_IE) {
      try {
        range = doc.body.createControlRange();
        range.addElement(element[0]);
        range.select()
      }catch(e) {
        range = doc.body.createTextRange();
        range.moveToElementText(element[0]);
        range.select()
      }finally {
      }
      self.reset()
    }else {
      range = doc.createRange();
      range.selectNode(element[0]);
      var sel = self.getNative();
      sel.removeAllRanges();
      sel.addRange(range);
      self.reset()
    }
  }, selectRanges:function(ranges) {
    var self = this;
    if(OLD_IE) {
      if(ranges.length > 1) {
        var last = ranges[ranges.length - 1];
        ranges[0].setEnd(last.endContainer, last.endOffset);
        ranges.length = 1
      }
      if(ranges[0]) {
        ranges[0].select()
      }
      self.reset()
    }else {
      var sel = self.getNative();
      if(!sel) {
        return
      }
      sel.removeAllRanges();
      for(var i = 0;i < ranges.length;i++) {
        var range = ranges[i], nativeRange = self.document.createRange(), startContainer = range.startContainer;
        if(range.collapsed && (UA.gecko && UA.gecko < 1.09 || UA.opera || UA.webkit) && startContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE && !startContainer[0].childNodes.length) {
          startContainer[0].appendChild(self.document.createTextNode(UA.webkit ? "\u200b" : ""));
          range.startOffset++;
          range.endOffset++
        }
        nativeRange.setStart(startContainer[0], range.startOffset);
        nativeRange.setEnd(range.endContainer[0], range.endOffset);
        sel.addRange(nativeRange)
      }
      self.reset()
    }
  }, createBookmarks2:function(normalized) {
    var bookmarks = [], ranges = this.getRanges();
    for(var i = 0;i < ranges.length;i++) {
      bookmarks.push(ranges[i].createBookmark2(normalized))
    }
    return bookmarks
  }, createBookmarks:function(serializable, ranges) {
    var self = this, retval = [], doc = self.document, bookmark;
    ranges = ranges || self.getRanges();
    var length = ranges.length;
    for(var i = 0;i < length;i++) {
      retval.push(bookmark = ranges[i].createBookmark(serializable, TRUE));
      serializable = bookmark.serializable;
      var bookmarkStart = serializable ? S.one("#" + bookmark.startNode, doc) : bookmark.startNode, bookmarkEnd = serializable ? S.one("#" + bookmark.endNode, doc) : bookmark.endNode;
      for(var j = i + 1;j < length;j++) {
        var dirtyRange = ranges[j], rangeStart = dirtyRange.startContainer, rangeEnd = dirtyRange.endContainer;
        if(Dom.equals(rangeStart, bookmarkStart.parent())) {
          dirtyRange.startOffset++
        }
        if(Dom.equals(rangeStart, bookmarkEnd.parent())) {
          dirtyRange.startOffset++
        }
        if(Dom.equals(rangeEnd, bookmarkStart.parent())) {
          dirtyRange.endOffset++
        }
        if(Dom.equals(rangeEnd, bookmarkEnd.parent())) {
          dirtyRange.endOffset++
        }
      }
    }
    return retval
  }, selectBookmarks:function(bookmarks) {
    var self = this, ranges = [];
    for(var i = 0;i < bookmarks.length;i++) {
      var range = new KERange(self.document);
      range.moveToBookmark(bookmarks[i]);
      ranges.push(range)
    }
    self.selectRanges(ranges);
    return self
  }, getCommonAncestor:function() {
    var ranges = this.getRanges(), startNode = ranges[0].startContainer, endNode = ranges[ranges.length - 1].endContainer;
    return startNode._4eCommonAncestor(endNode)
  }, scrollIntoView:function() {
    var start = this.getStartElement();
    if(start) {
      start.scrollIntoView(undefined, {alignWithTop:false, allowHorizontalScroll:true, onlyScrollIfNeeded:true})
    }
  }, removeAllRanges:function() {
    var sel = this.getNative();
    if(!OLD_IE) {
      if(sel) {
        sel.removeAllRanges()
      }
    }else {
      if(sel) {
        sel.clear()
      }
    }
  }});
  var nonCells = {table:1, tbody:1, tr:1}, notWhitespaces = Walker.whitespaces(TRUE), fillerTextRegex = /\ufeff|\u00a0/;
  KERange.prototype.select = !OLD_IE ? function() {
    var self = this, startContainer = self.startContainer;
    if(self.collapsed && startContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE && !startContainer[0].childNodes.length) {
      startContainer[0].appendChild(self.document.createTextNode(UA.webkit ? "\u200b" : ""));
      self.startOffset++;
      self.endOffset++
    }
    var nativeRange = self.document.createRange();
    nativeRange.setStart(startContainer[0], self.startOffset);
    try {
      nativeRange.setEnd(self.endContainer[0], self.endOffset)
    }catch(e) {
      if(e.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
        self.collapse(TRUE);
        nativeRange.setEnd(self.endContainer[0], self.endOffset)
      }else {
        throw e;
      }
    }
    var selection = getSelection(self.document).getNative();
    selection.removeAllRanges();
    selection.addRange(nativeRange)
  } : function(forceExpand) {
    var self = this, collapsed = self.collapsed, isStartMarkerAlone, dummySpan;
    if(self.startContainer[0] === self.endContainer[0] && self.endOffset - self.startOffset === 1) {
      var selEl = self.startContainer[0].childNodes[self.startOffset];
      if(selEl.nodeType === Dom.NodeType.ELEMENT_NODE) {
        (new KESelection(self.document)).selectElement(new Node(selEl));
        return
      }
    }
    if(self.startContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE && self.startContainer.nodeName() in nonCells || self.endContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE && self.endContainer.nodeName() in nonCells) {
      self.shrink(KER.SHRINK_ELEMENT, TRUE)
    }
    var bookmark = self.createBookmark(), startNode = bookmark.startNode, endNode;
    if(!collapsed) {
      endNode = bookmark.endNode
    }
    var ieRange = self.document.body.createTextRange();
    ieRange.moveToElementText(startNode[0]);
    ieRange.moveStart("character", 1);
    if(endNode) {
      var ieRangeEnd = self.document.body.createTextRange();
      ieRangeEnd.moveToElementText(endNode[0]);
      ieRange.setEndPoint("EndToEnd", ieRangeEnd);
      ieRange.moveEnd("character", -1)
    }else {
      var next = startNode[0].nextSibling;
      while(next && !notWhitespaces(next)) {
        next = next.nextSibling
      }
      isStartMarkerAlone = !(next && next.nodeValue && next.nodeValue.match(fillerTextRegex)) && (forceExpand || !startNode[0].previousSibling || startNode[0].previousSibling && Dom.nodeName(startNode[0].previousSibling) === "br");
      dummySpan = new Node(self.document.createElement("span"));
      dummySpan.html("&#65279;");
      dummySpan.insertBefore(startNode);
      if(isStartMarkerAlone) {
        Dom.insertBefore(self.document.createTextNode("\ufeff"), startNode[0] || startNode)
      }
    }
    self.setStartBefore(startNode);
    startNode._4eRemove();
    if(collapsed) {
      if(isStartMarkerAlone) {
        ieRange.moveStart("character", -1);
        ieRange.select();
        self.document.selection.clear()
      }else {
        ieRange.select()
      }
      if(dummySpan) {
        self.moveToPosition(dummySpan, KER.POSITION_BEFORE_START);
        dummySpan._4eRemove()
      }
    }else {
      self.setEndBefore(endNode);
      endNode._4eRemove();
      ieRange.select()
    }
  };
  function getSelection(doc) {
    var sel = new KESelection(doc);
    return!sel || sel.isInvalid ? NULL : sel
  }
  KESelection.getSelection = getSelection;
  Editor.Selection = KESelection;
  return KESelection
});
KISSY.add("editor/clipboard", ["node", "./base", "./range", "./selection"], function(S, require) {
  var Node = require("node");
  var Editor = require("./base");
  var KERange = require("./range");
  var KES = require("./selection");
  var logger = S.getLogger("s/editor");
  var $ = Node.all, UA = S.UA, OLD_IE = UA.ieMode < 11, pasteEvent = OLD_IE ? "beforepaste" : "paste", KER = Editor.RangeType;
  function Paste(editor) {
    var self = this;
    self.editor = editor;
    self._init()
  }
  S.augment(Paste, {_init:function() {
    var self = this, editor = self.editor, editorDoc = editor.get("document"), editorBody = editorDoc.one("body"), CutCopyPasteCmd = function(type) {
      this.type = type
    };
    CutCopyPasteCmd.prototype = {exec:function(editor) {
      var type = this.type;
      editor.focus();
      setTimeout(function() {
        if(OLD_IE) {
          if(type === "cut") {
            fixCut(editor)
          }else {
            if(type === "paste") {
              self._preventPasteEvent();
              self._getClipboardDataFromPasteBin()
            }
          }
        }
        if(!tryToCutCopyPaste(editor, type)) {
          alert(errorTypes[type])
        }
      }, 0)
    }};
    editorBody.on(pasteEvent, self._getClipboardDataFromPasteBin, self);
    if(OLD_IE) {
      editorBody.on("paste", self._iePaste, self);
      editorDoc.on("keydown", self._onKeyDown, self);
      editorDoc.on("contextmenu", function() {
        self._isPreventBeforePaste = 1;
        setTimeout(function() {
          self._isPreventBeforePaste = 0
        }, 0)
      })
    }
    editor.addCommand("copy", new CutCopyPasteCmd("copy"));
    editor.addCommand("cut", new CutCopyPasteCmd("cut"));
    editor.addCommand("paste", new CutCopyPasteCmd("paste"))
  }, _onKeyDown:function(e) {
    var self = this, editor = self.editor;
    if(editor.get("mode") !== Editor.Mode.WYSIWYG_MODE) {
      return
    }
    if(e.ctrlKey && e.keyCode === 86 || e.shiftKey && e.keyCode === 45) {
      self._preventPasteEvent()
    }
  }, _stateFromNamedCommand:function(command) {
    var ret;
    var self = this;
    var editor = self.editor;
    if(command === "paste") {
      self._isPreventBeforePaste = 1;
      try {
        ret = editor.get("document")[0].queryCommandEnabled(command)
      }catch(e) {
      }
      self._isPreventBeforePaste = 0
    }else {
      var sel = editor.getSelection(), ranges = sel && sel.getRanges();
      ret = ranges && !(ranges.length === 1 && ranges[0].collapsed)
    }
    return ret
  }, _preventPasteEvent:function() {
    var self = this;
    if(self._preventPasteTimer) {
      clearTimeout(self._preventPasteTimer)
    }
    self._isPreventPaste = 1;
    self._preventPasteTimer = setTimeout(function() {
      self._isPreventPaste = 0
    }, 70)
  }, _iePaste:function(e) {
    var self = this, editor = self.editor;
    if(self._isPreventPaste) {
      return
    }
    e.preventDefault();
    editor.execCommand("paste")
  }, _getClipboardDataFromPasteBin:function() {
    if(this._isPreventBeforePaste) {
      return
    }
    logger.debug(pasteEvent + ": " + " paste event happen");
    var self = this, editor = self.editor, doc = editor.get("document")[0];
    if(doc.getElementById("ke-paste-bin")) {
      logger.debug(pasteEvent + ": trigger more than once ...");
      return
    }
    var sel = editor.getSelection(), range = new KERange(doc);
    var pasteBin = $(UA.webkit ? "<body></body>" : "<div></div>", doc);
    pasteBin.attr("id", "ke-paste-bin");
    if(UA.webkit) {
      pasteBin[0].appendChild(doc.createTextNode("\u200b"))
    }
    doc.body.appendChild(pasteBin[0]);
    pasteBin.css({position:"absolute", top:sel.getStartElement().offset().top + "px", width:"1px", height:"1px", overflow:"hidden"});
    pasteBin.css("left", "-1000px");
    var bms = sel.createBookmarks();
    range.setStartAt(pasteBin, KER.POSITION_AFTER_START);
    range.setEndAt(pasteBin, KER.POSITION_BEFORE_END);
    range.select(true);
    setTimeout(function() {
      var bogusSpan;
      var oldPasteBin = pasteBin;
      pasteBin = UA.webkit && (bogusSpan = pasteBin.first()) && bogusSpan.hasClass("Apple-style-span") ? bogusSpan : pasteBin;
      sel.selectBookmarks(bms);
      var html = pasteBin.html();
      oldPasteBin.remove();
      if(!(html = cleanPaste(html))) {
        return
      }
      logger.debug("paste " + html);
      var re = editor.fire("paste", {html:html});
      if(re === false) {
        return
      }
      if(re !== undefined) {
        html = re
      }
      if(/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument)/.test(html)) {
        S.use("editor/plugin/word-filter", function(S, wordFilter) {
          editor.insertHtml(wordFilter.toDataFormat(html, editor))
        })
      }else {
        editor.insertHtml(html)
      }
    }, 0)
  }});
  var execIECommand = function(editor, command) {
    var doc = editor.get("document")[0], body = $(doc.body), enabled = false, onExec = function() {
      enabled = true
    };
    body.on(command, onExec);
    (UA.ieMode > 7 ? doc : doc.selection.createRange()).execCommand(command);
    body.detach(command, onExec);
    return enabled
  };
  var tryToCutCopyPaste = OLD_IE ? function(editor, type) {
    return execIECommand(editor, type)
  } : function(editor, type) {
    try {
      return editor.get("document")[0].execCommand(type)
    }catch(e) {
      return false
    }
  };
  var errorTypes = {cut:"\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u7f16\u8f91\u5668\u81ea\u52a8\u6267\u884c\u526a\u5207\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl/Cmd+X)\u6765\u5b8c\u6210", copy:"\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u7f16\u8f91\u5668\u81ea\u52a8\u6267\u884c\u590d\u5236\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl/Cmd+C)\u6765\u5b8c\u6210", paste:"\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u7f16\u8f91\u5668\u81ea\u52a8\u6267\u884c\u7c98\u8d34\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl/Cmd+V)\u6765\u5b8c\u6210"};
  function fixCut(editor) {
    var editorDoc = editor.get("document")[0];
    var sel = editor.getSelection();
    var control;
    if(sel.getType() === KES.SELECTION_ELEMENT && (control = sel.getSelectedElement())) {
      var range = sel.getRanges()[0];
      var dummy = $(editorDoc.createTextNode(""));
      dummy.insertBefore(control);
      range.setStartBefore(dummy);
      range.setEndAfter(control);
      sel.selectRanges([range]);
      setTimeout(function() {
        if(control.parent()) {
          dummy.remove();
          sel.selectElement(control)
        }
      }, 0)
    }
  }
  function isPlainText(html) {
    if(UA.webkit) {
      if(!html.match(/^[^<]*$/g) && !html.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) {
        return 0
      }
    }else {
      if(UA.ie) {
        if(!html.match(/^([^<]|<br( ?\/)?>)*$/gi) && !html.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) {
          return 0
        }
      }else {
        if(UA.gecko || UA.opera) {
          if(!html.match(/^([^<]|<br( ?\/)?>)*$/gi)) {
            return 0
          }
        }else {
          return 0
        }
      }
    }
    return 1
  }
  function plainTextToHtml(html) {
    html = html.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
    if(html.match(/^[^<]$/)) {
      return html
    }
    if(UA.webkit && html.indexOf("<div>") > -1) {
      if(html.match(/<div>(?:<br>)?<\/div>/)) {
        html = html.replace(/<div>(?:<br>)?<\/div>/g, function() {
          return"<p></p>"
        });
        html = html.replace(/<\/p><div>/g, "</p><p>").replace(/<\/div><p>/g, "</p><p>").replace(/^<div>/, "<p>").replace(/^<\/div>/, "</p>")
      }
      if(html.match(/<\/div><div>/)) {
        html = html.replace(/<\/div><div>/g, "</p><p>").replace(/^<div>/, "<p>").replace(/^<\/div>/, "</p>")
      }
    }else {
      if(UA.gecko || UA.opera) {
        if(UA.gecko) {
          html = html.replace(/^<br><br>$/, "<br>")
        }
        if(html.indexOf("<br><br>") > -1) {
          html = "<p>" + html.replace(/<br><br>/g, function() {
            return"</p><p>"
          }) + "</p>"
        }
      }
    }
    return html
  }
  function cleanPaste(html) {
    var htmlMode = 0;
    html = html.replace(/<span[^>]+_ke_bookmark[^<]*?<\/span>(&nbsp;)*/ig, "");
    if(html.indexOf("Apple-") !== -1) {
      html = html.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " ");
      html = html.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(all, spaces) {
        return spaces.replace(/\t/g, (new Array(5)).join("&nbsp;"))
      });
      if(html.indexOf('<br class="Apple-interchange-newline">') > -1) {
        htmlMode = 1;
        html = html.replace(/<br class="Apple-interchange-newline">/, "")
      }
      html = html.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
    }
    if(!htmlMode && isPlainText(html)) {
      html = plainTextToHtml(html)
    }
    return html
  }
  var lang = {copy:"\u590d\u5236", paste:"\u7c98\u8d34", cut:"\u526a\u5207"};
  return{init:function(editor) {
    var currentPaste;
    editor.docReady(function() {
      currentPaste = new Paste(editor)
    });
    if(0) {
      var defaultContextMenuFn;
      editor.docReady(defaultContextMenuFn = function() {
        editor.detach("docReady", defaultContextMenuFn);
        var firstFn;
        editor.get("document").on("contextmenu", firstFn = function(e) {
          e.preventDefault();
          editor.get("document").detach("contextmenu", firstFn);
          S.use("editor/plugin/contextmenu", function() {
            editor.addContextMenu("default", function() {
              return 1
            }, {event:e})
          })
        })
      })
    }
    var clipboardCommands = {copy:1, cut:1, paste:1};
    var clipboardCommandsList = ["copy", "cut", "paste"];
    editor.on("contextmenu", function(ev) {
      var contextmenu = ev.contextmenu, i;
      if(!contextmenu.__copyFix) {
        contextmenu.__copyFix = 1;
        i = 0;
        for(;i < clipboardCommandsList.length;i++) {
          contextmenu.addChild({content:lang[clipboardCommandsList[i]], value:clipboardCommandsList[i]})
        }
        contextmenu.on("click", function(e) {
          var value = e.target.get("value");
          if(clipboardCommands[value]) {
            contextmenu.hide();
            setTimeout(function() {
              editor.execCommand("save");
              editor.execCommand(value);
              setTimeout(function() {
                editor.execCommand("save")
              }, 10)
            }, 30)
          }
        })
      }
      var menuChildren = contextmenu.get("children");
      for(i = menuChildren.length - 1;i--;i >= 0) {
        var c = menuChildren[i];
        var value;
        if(c.get) {
          value = c.get("value")
        }else {
          value = c.value
        }
        var v;
        if(clipboardCommands[value]) {
          v = !currentPaste._stateFromNamedCommand(value);
          if(c.set) {
            c.set("disabled", v)
          }else {
            c.disabled = v
          }
        }
      }
    })
  }}
});
KISSY.add("editor/enterKey", ["node", "./walker", "./base", "./elementPath"], function(S, require) {
  var Node = require("node");
  var Walker = require("./walker");
  var Editor = require("./base");
  var ElementPath = require("./elementPath");
  var OLD_IE = S.UA.ieMode < 11;
  var headerTagRegex = /^h[1-6]$/, dtd = Editor.XHTML_DTD;
  function getRange(editor) {
    var ranges = editor.getSelection().getRanges();
    for(var i = ranges.length - 1;i > 0;i--) {
      ranges[i].deleteContents()
    }
    return ranges[0]
  }
  function enterBlock(editor) {
    var range = getRange(editor);
    var doc = range.document;
    if(range.checkStartOfBlock() && range.checkEndOfBlock()) {
      var path = new ElementPath(range.startContainer), block = path.block;
      if(block && (block.nodeName() === "li" || block.parent().nodeName() === "li")) {
        if(editor.hasCommand("outdent")) {
          editor.execCommand("save");
          editor.execCommand("outdent");
          editor.execCommand("save");
          return true
        }else {
          return false
        }
      }
    }
    var blockTag = "p";
    var splitInfo = range.splitBlock(blockTag);
    if(!splitInfo) {
      return true
    }
    var previousBlock = splitInfo.previousBlock, nextBlock = splitInfo.nextBlock;
    var isStartOfBlock = splitInfo.wasStartOfBlock, isEndOfBlock = splitInfo.wasEndOfBlock;
    var node;
    if(nextBlock) {
      node = nextBlock.parent();
      if(node.nodeName() === "li") {
        nextBlock._4eBreakParent(node);
        nextBlock._4eMove(nextBlock.next(), true)
      }
    }else {
      if(previousBlock && (node = previousBlock.parent()) && node.nodeName() === "li") {
        previousBlock._4eBreakParent(node);
        range.moveToElementEditablePosition(previousBlock.next());
        previousBlock._4eMove(previousBlock.prev())
      }
    }
    var newBlock;
    if(!isStartOfBlock && !isEndOfBlock) {
      if(nextBlock.nodeName() === "li" && (node = nextBlock.first(Walker.invisible(true))) && S.inArray(node.nodeName(), ["ul", "ol"])) {
        (OLD_IE ? new Node(doc.createTextNode("\u00a0")) : new Node(doc.createElement("br"))).insertBefore(node)
      }
      if(nextBlock) {
        range.moveToElementEditablePosition(nextBlock)
      }
    }else {
      if(previousBlock) {
        if(previousBlock.nodeName() === "li" || !headerTagRegex.test(previousBlock.nodeName())) {
          newBlock = previousBlock.clone()
        }
      }else {
        if(nextBlock) {
          newBlock = nextBlock.clone()
        }
      }
      if(!newBlock) {
        newBlock = new Node("<" + blockTag + ">", null, doc)
      }
      var elementPath = splitInfo.elementPath;
      if(elementPath) {
        for(var i = 0, len = elementPath.elements.length;i < len;i++) {
          var element = elementPath.elements[i];
          if(element.equals(elementPath.block) || element.equals(elementPath.blockLimit)) {
            break
          }
          if(dtd.$removeEmpty[element.nodeName()]) {
            element = element.clone();
            newBlock._4eMoveChildren(element);
            newBlock.append(element)
          }
        }
      }
      if(!OLD_IE) {
        newBlock._4eAppendBogus()
      }
      range.insertNode(newBlock);
      if(OLD_IE && isStartOfBlock && (!isEndOfBlock || !previousBlock[0].childNodes.length)) {
        range.moveToElementEditablePosition(isEndOfBlock ? previousBlock : newBlock);
        range.select()
      }
      range.moveToElementEditablePosition(isStartOfBlock && !isEndOfBlock ? nextBlock : newBlock)
    }
    if(!OLD_IE) {
      if(nextBlock) {
        var tmpNode = new Node(doc.createElement("span"));
        tmpNode.html("&nbsp;");
        range.insertNode(tmpNode);
        tmpNode.scrollIntoView(undefined, {alignWithTop:false, allowHorizontalScroll:true, onlyScrollIfNeeded:true});
        range.deleteContents()
      }else {
        newBlock.scrollIntoView(undefined, {alignWithTop:false, allowHorizontalScroll:true, onlyScrollIfNeeded:true})
      }
    }
    range.select();
    return true
  }
  function enterKey(editor) {
    var doc = editor.get("document");
    doc.on("keydown", function(ev) {
      var keyCode = ev.keyCode;
      if(keyCode === 13) {
        if(!(ev.shiftKey || ev.ctrlKey || ev.metaKey)) {
          editor.execCommand("save");
          var re = editor.execCommand("enterBlock");
          editor.execCommand("save");
          if(re !== false) {
            ev.preventDefault()
          }
        }
      }
    })
  }
  return{init:function(editor) {
    editor.addCommand("enterBlock", {exec:enterBlock});
    editor.docReady(function() {
      enterKey(editor)
    })
  }}
});
KISSY.add("editor/htmlDataProcessor", ["./base", "html-parser"], function(S, require) {
  var Editor = require("./base");
  var HtmlParser = require("html-parser");
  var OLD_IE = S.UA.ieMode < 11;
  return{init:function(editor) {
    var Node = S.Node, UA = S.UA, htmlFilter = new HtmlParser.Filter, dataFilter = new HtmlParser.Filter;
    function filterInline(element) {
      var childNodes = element.childNodes, i, child, allEmpty, l = childNodes.length;
      if(l) {
        allEmpty = 1;
        for(i = 0;i < l;i++) {
          child = childNodes[i];
          if(!(child.nodeType === S.DOM.NodeType.TEXT_NODE && !child.nodeValue)) {
            allEmpty = 0;
            break
          }
        }
        return allEmpty ? false : undefined
      }else {
        return false
      }
    }
    (function() {
      function wrapAsComment(element) {
        var html = HtmlParser.serialize(element);
        return new HtmlParser.Comment(protectedSourceMarker + encodeURIComponent(html).replace(/--/g, "%2D%2D"))
      }
      var defaultDataFilterRules = {tagNames:[[/^\?xml.*$/i, ""], [/^.*namespace.*$/i, ""]], attributeNames:[[/^on/, "ke_on"], [/^lang$/, ""]], tags:{script:wrapAsComment, noscript:wrapAsComment, span:filterInline}};
      var defaultHTMLFilterRules = {tagNames:[[/^ke:/, ""], [/^\?xml:namespace$/, ""]], tags:{$:function(element) {
        var attributes = element.attributes;
        if(attributes.length) {
          var attributeNames = ["name", "href", "src"], savedAttributeName;
          for(var i = 0;i < attributeNames.length;i++) {
            savedAttributeName = "_keSaved_" + attributeNames[i];
            if(element.getAttribute(savedAttributeName)) {
              element.removeAttribute(attributeNames[i])
            }
          }
        }
        return element
      }, embed:function(element) {
        var parent = element.parentNode;
        if(parent && parent.nodeName === "object") {
          var parentWidth = parent.getAttribute("width"), parentHeight = parent.getAttribute("height");
          if(parentWidth) {
            element.setAttribute("width", parentWidth)
          }
          if(parentHeight) {
            element.setAttribute("width", parentHeight)
          }
        }
      }, a:function(element) {
        if(!element.childNodes.length && !element.attributes.length) {
          return false
        }
        return undefined
      }, span:filterInline, strong:filterInline, em:filterInline, del:filterInline, u:filterInline}, attributes:{style:function(v) {
        if(!S.trim(v)) {
          return false
        }
        return undefined
      }}, attributeNames:[[/^_keSaved_/, ""], [/^ke_on/, "on"], [/^_ke.*/, ""], [/^ke:.*$/, ""], [/^_ks.*/, ""]], comment:function(contents) {
        if(contents.substr(0, protectedSourceMarker.length) === protectedSourceMarker) {
          contents = S.trim(S.urlDecode(contents.substr(protectedSourceMarker.length)));
          return HtmlParser.parse(contents).childNodes[0]
        }
        return undefined
      }};
      if(OLD_IE) {
        defaultHTMLFilterRules.attributes.style = function(value) {
          return value.replace(/(^|;)([^:]+)/g, function(match) {
            return match.toLowerCase()
          })
        }
      }
      htmlFilter.addRules(defaultHTMLFilterRules);
      dataFilter.addRules(defaultDataFilterRules)
    })();
    (function() {
      var tailNbspRegex = /^[\t\r\n ]*(?:&nbsp;|\xa0)[\t\r\n ]*$/;
      function lastNoneSpaceChild(block) {
        var childNodes = block.childNodes, lastIndex = childNodes.length, last = childNodes[lastIndex - 1];
        while(last && last.nodeType === 3 && !S.trim(last.nodeValue)) {
          last = childNodes[--lastIndex]
        }
        return last
      }
      function trimFillers(block) {
        var lastChild = lastNoneSpaceChild(block);
        if(lastChild) {
          if(lastChild.nodeType === 1 && lastChild.nodeName === "br") {
            block.removeChild(lastChild)
          }else {
            if(lastChild.nodeType === 3 && tailNbspRegex.test(lastChild.nodeValue)) {
              block.removeChild(lastChild)
            }
          }
        }
      }
      function blockNeedsExtension(block) {
        var lastChild = lastNoneSpaceChild(block);
        return!lastChild || block.nodeName === "form" && lastChild.nodeName === "input"
      }
      function extendBlockForDisplay(block) {
        trimFillers(block);
        if(blockNeedsExtension(block)) {
          if(!OLD_IE) {
            block.appendChild(new HtmlParser.Tag("br"))
          }
        }
      }
      function extendBlockForOutput(block) {
        trimFillers(block);
        if(blockNeedsExtension(block)) {
          block.appendChild(new HtmlParser.Text("\u00a0"))
        }
      }
      var dtd = Editor.XHTML_DTD;
      var blockLikeTags = S.merge(dtd.$block, dtd.$listItem, dtd.$tableContent), i;
      for(i in blockLikeTags) {
        if(!("br" in dtd[i])) {
          delete blockLikeTags[i]
        }
      }
      delete blockLikeTags.pre;
      var defaultDataBlockFilterRules = {tags:{}};
      var defaultHTMLBlockFilterRules = {tags:{}};
      for(i in blockLikeTags) {
        defaultDataBlockFilterRules.tags[i] = extendBlockForDisplay;
        defaultHTMLBlockFilterRules.tags[i] = extendBlockForOutput
      }
      dataFilter.addRules(defaultDataBlockFilterRules);
      htmlFilter.addRules(defaultHTMLBlockFilterRules)
    })();
    htmlFilter.addRules({text:function(text) {
      return text.replace(/\xa0/g, "&nbsp;")
    }});
    var protectElementRegex = /<(a|area|img|input)\b([^>]*)>/gi, protectAttributeRegex = /\b(href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi;
    function protectAttributes(html) {
      return html.replace(protectElementRegex, function(element, tag, attributes) {
        return"<" + tag + attributes.replace(protectAttributeRegex, function(fullAttr, attrName) {
          if(attributes.indexOf("_keSaved_" + attrName) === -1) {
            return" _keSaved_" + fullAttr + " " + fullAttr
          }
          return fullAttr
        }) + ">"
      })
    }
    var protectedSourceMarker = "{ke_protected}";
    var protectElementsRegex = /(?:<textarea[^>]*>[\s\S]*<\/textarea>)|(?:<style[^>]*>[\s\S]*<\/style>)|(?:<script[^>]*>[\s\S]*<\/script>)|(?:<(:?link|meta|base)[^>]*>)/gi, encodedElementsRegex = /<ke:encoded>([^<]*)<\/ke:encoded>/gi;
    var protectElementNamesRegex = /(<\/?)((?:object|embed|param|html|body|head|title|noscript)[^>]*>)/gi, unprotectElementNamesRegex = /(<\/?)ke:((?:object|embed|param|html|body|head|title|noscript)[^>]*>)/gi;
    var protectSelfClosingRegex = /<ke:(param|embed)([^>]*?)\/?>(?!\s*<\/ke:\1)/gi;
    function protectSelfClosingElements(html) {
      return html.replace(protectSelfClosingRegex, "<ke:$1$2></ke:$1>")
    }
    function protectElements(html) {
      return html.replace(protectElementsRegex, function(match) {
        return"<ke:encoded>" + encodeURIComponent(match) + "</ke:encoded>"
      })
    }
    function unprotectElements(html) {
      return html.replace(encodedElementsRegex, function(match, encoded) {
        return S.urlDecode(encoded)
      })
    }
    function protectElementsNames(html) {
      return html.replace(protectElementNamesRegex, "$1ke:$2")
    }
    function unprotectElementNames(html) {
      return html.replace(unprotectElementNamesRegex, "$1$2")
    }
    editor.htmlDataProcessor = {dataFilter:dataFilter, htmlFilter:htmlFilter, toHtml:function(html) {
      if(UA.webkit) {
        html = html.replace(/\u200b/g, "")
      }
      var writer = new HtmlParser.BeautifyWriter, n = (new HtmlParser.Parser(html)).parse();
      n.writeHtml(writer, htmlFilter);
      html = writer.getHtml();
      return html
    }, toDataFormat:function(html, _dataFilter) {
      _dataFilter = _dataFilter || dataFilter;
      html = protectElements(html);
      html = protectAttributes(html);
      html = protectElementsNames(html);
      html = protectSelfClosingElements(html);
      var div = new Node("<div>");
      div.html("a" + html);
      html = div.html().substr(1);
      html = unprotectElementNames(html);
      html = unprotectElements(html);
      var writer = new HtmlParser.BasicWriter, n = (new HtmlParser.Parser(html)).parse();
      n.writeHtml(writer, _dataFilter);
      html = writer.getHtml();
      return html
    }, toServer:function(html) {
      var writer = new HtmlParser.MinifyWriter, n = (new HtmlParser.Parser(html)).parse();
      n.writeHtml(writer, htmlFilter);
      return writer.getHtml()
    }}
  }}
});
KISSY.add("editor/selectionFix", ["./base", "./selection", "node"], function(S, require) {
  var Editor = require("./base");
  require("./selection");
  var Node = require("node");
  var TRUE = true, FALSE = false, NULL = null, UA = S.UA, Dom = S.DOM, KES = Editor.SelectionType;
  function fixCursorForIE(editor) {
    var started, win = editor.get("window")[0], $doc = editor.get("document"), doc = $doc[0], startRng;
    function rngFromPoint(x, y) {
      var rng = doc.body.createTextRange();
      try {
        rng.moveToPoint(x, y)
      }catch(ex) {
        rng = NULL
      }
      return rng
    }
    function endSelection() {
      var rng = doc.selection.createRange();
      if(startRng && !rng.item && rng.compareEndPoints("StartToEnd", rng) === 0) {
        startRng.select()
      }
      $doc.detach("mouseup", endSelection);
      $doc.detach("mousemove", selectionChange);
      startRng = started = 0
    }
    function selectionChange(e) {
      var pointRng;
      if(e.button) {
        pointRng = rngFromPoint(e.pageX, e.pageY);
        if(pointRng) {
          if(pointRng.compareEndPoints("StartToStart", startRng) > 0) {
            pointRng.setEndPoint("StartToStart", startRng)
          }else {
            pointRng.setEndPoint("EndToEnd", startRng)
          }
          pointRng.select()
        }
      }else {
        endSelection()
      }
    }
    $doc.on("mousedown contextmenu", function(e) {
      var html = doc.documentElement;
      if(e.target === html) {
        if(started) {
          endSelection()
        }
        if(html.scrollHeight > html.clientHeight) {
          return
        }
        started = 1;
        startRng = rngFromPoint(e.pageX, e.pageY);
        if(startRng) {
          $doc.on("mouseup", endSelection);
          $doc.on("mousemove", selectionChange);
          win.focus();
          startRng.select()
        }
      }
    })
  }
  function fixSelectionForIEWhenDocReady(editor) {
    var doc = editor.get("document")[0], body = new Node(doc.body), html = new Node(doc.documentElement);
    if(S.UA.ieMode < 8) {
      html.on("click", function(evt) {
        var t = new Node(evt.target);
        if(t.nodeName() === "html") {
          editor.getSelection().getNative().createRange().select()
        }
      })
    }
    var savedRange, saveEnabled, restoreEnabled = TRUE;
    html.on("mousedown", function() {
      restoreEnabled = FALSE
    });
    html.on("mouseup", function() {
      restoreEnabled = TRUE
    });
    body.on("focusin", function(evt) {
      var t = new Node(evt.target);
      if(t.nodeName() !== "body") {
        return
      }
      if(savedRange) {
        try {
          if(restoreEnabled) {
            savedRange.select()
          }
        }catch(e) {
        }
        savedRange = NULL
      }
    });
    body.on("focus", function() {
      saveEnabled = TRUE;
      saveSelection()
    });
    body.on("beforedeactivate", function(evt) {
      if(evt.relatedTarget) {
        return
      }
      saveEnabled = FALSE;
      restoreEnabled = TRUE
    });
    body.on("mousedown", function() {
      saveEnabled = FALSE
    });
    body.on("mouseup", function() {
      saveEnabled = TRUE;
      setTimeout(function() {
        saveSelection(TRUE)
      }, 0)
    });
    function saveSelection(testIt) {
      if(saveEnabled) {
        var sel = editor.getSelection(), type = sel && sel.getType(), nativeSel = sel && doc.selection;
        if(testIt && nativeSel && type === KES.SELECTION_NONE) {
          if(!doc.queryCommandEnabled("InsertImage")) {
            setTimeout(function() {
              saveSelection(TRUE)
            }, 50);
            return
          }
        }
        var parentTag;
        if(nativeSel && nativeSel.type && nativeSel.type !== "Control" && (parentTag = nativeSel.createRange()) && (parentTag = parentTag.parentElement()) && (parentTag = parentTag.nodeName) && parentTag.toLowerCase() in {input:1, textarea:1}) {
          return
        }
        savedRange = nativeSel && sel.getRanges()[0];
        editor.checkSelectionChange()
      }
    }
    body.on("keydown", function() {
      saveEnabled = FALSE
    });
    body.on("keyup", function() {
      saveEnabled = TRUE;
      setTimeout(function() {
        saveSelection()
      }, 0)
    })
  }
  function fireSelectionChangeForStandard(editor) {
    function monitor() {
      editor.checkSelectionChange()
    }
    editor.get("document").on("mouseup keyup " + "selectionchange", monitor)
  }
  function monitorSelectionChange(editor) {
    var emptyParagraphRegexp = /\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;|(<!--[\s\S]*?--\>))?\s*(:?<\/\1>)?(?=\s*$|<\/body>)/gi;
    function isBlankParagraph(block) {
      return block.outerHtml().match(emptyParagraphRegexp)
    }
    var isNotWhitespace = Editor.Walker.whitespaces(TRUE), isNotBookmark = Editor.Walker.bookmark(FALSE, TRUE);
    var nextValidEl = function(node) {
      return isNotWhitespace(node) && node.nodeType !== 8
    };
    function cannotCursorPlaced(element) {
      var dtd = Editor.XHTML_DTD;
      return element._4eIsBlockBoundary() && dtd.$empty[element.nodeName()]
    }
    function isNotEmpty(node) {
      return isNotWhitespace(node) && isNotBookmark(node)
    }
    editor.on("selectionChange", function(ev) {
      var path = ev.path, editorDoc = editor.get("document")[0], body = new Node(editorDoc.body), selection = ev.selection, range = selection && selection.getRanges()[0], blockLimit = path.blockLimit;
      if(!body[0]) {
        editorDoc.documentElement.appendChild(editorDoc.createElement("body"));
        body = new Node(editorDoc.body);
        if(range) {
          range.setStart(body, 0);
          range.collapse(1)
        }
      }
      blockLimit = blockLimit || body;
      if(UA.gecko) {
        var pathBlock = path.block || path.blockLimit, lastNode = pathBlock && pathBlock.last(isNotEmpty);
        if(pathBlock && pathBlock._4eIsBlockBoundary() && !(lastNode && lastNode[0].nodeType === 1 && lastNode._4eIsBlockBoundary()) && pathBlock.nodeName() !== "pre" && !pathBlock._4eGetBogus()) {
          pathBlock._4eAppendBogus()
        }
      }
      if(!range || !range.collapsed || path.block) {
        return
      }
      if(blockLimit.nodeName() === "body") {
        if(range.startContainer.nodeName() === "html") {
          range.setStart(body, 0)
        }
        var fixedBlock = range.fixBlock(TRUE, "p");
        if(fixedBlock && fixedBlock[0] !== body[0].lastChild) {
          if(isBlankParagraph(fixedBlock)) {
            var element = fixedBlock.next(nextValidEl, 1);
            if(element && element[0].nodeType === Dom.NodeType.ELEMENT_NODE && !cannotCursorPlaced[element]) {
              range.moveToElementEditablePosition(element);
              fixedBlock._4eRemove()
            }else {
              element = fixedBlock.prev(nextValidEl, 1);
              if(element && element[0].nodeType === Dom.NodeType.ELEMENT_NODE && !cannotCursorPlaced[element]) {
                range.moveToElementEditablePosition(element, isBlankParagraph(element) ? FALSE : TRUE);
                fixedBlock._4eRemove()
              }
            }
          }
        }
        range.select();
        editor.notifySelectionChange()
      }
      var doc = editor.get("document")[0], lastRange = new Editor.Range(doc), lastPath, editBlock;
      lastRange.moveToElementEditablePosition(body, TRUE);
      lastPath = new Editor.ElementPath(lastRange.startContainer);
      if(lastPath.blockLimit.nodeName() !== "body") {
        editBlock = (new Node(doc.createElement("p"))).appendTo(body);
        if(!UA.ie) {
          editBlock._4eAppendBogus()
        }
      }
    })
  }
  return{init:function(editor) {
    editor.docReady(function() {
      if(document.selection) {
        fixCursorForIE(editor);
        fixSelectionForIEWhenDocReady(editor)
      }else {
        fireSelectionChangeForStandard(editor);
        if(UA.ie) {
          var savedRanges, doc = editor.get("document");
          doc.on("focusout", function() {
            savedRanges = editor.getSelection().getRanges()
          });
          doc.on("focusin", function() {
            if(savedRanges) {
              var selection = editor.getSelection();
              selection.selectRanges(savedRanges);
              savedRanges = null
            }
          })
        }
      }
    });
    monitorSelectionChange(editor)
  }}
});
KISSY.add("editor/plugin-meta", [], function() {
  (function(config, Features, UA) {
    config({"editor/plugin/back-color":{requires:["editor/plugin/color/btn", "editor/plugin/back-color/cmd"]}});
    config({"editor/plugin/back-color/cmd":{requires:["editor/plugin/color/cmd"]}});
    config({"editor/plugin/bold":{requires:["editor/plugin/font/ui", "editor/plugin/bold/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/bold/cmd":{requires:["editor", "editor/plugin/font/cmd"]}});
    config({"editor/plugin/bubble":{requires:["overlay", "editor"]}});
    config({"editor/plugin/button":{requires:["editor", "button"]}});
    config({"editor/plugin/checkbox-source-area":{requires:["editor"]}});
    config({"editor/plugin/code":{requires:["editor", "editor/plugin/button", "editor/plugin/dialog-loader"]}});
    config({"editor/plugin/code/dialog":{requires:["editor", "menubutton", "editor/plugin/dialog"]}});
    config({"editor/plugin/color/btn":{requires:["editor", "editor/plugin/button", "editor/plugin/overlay", "editor/plugin/dialog-loader"]}});
    config({"editor/plugin/color/cmd":{requires:["editor"]}});
    config({"editor/plugin/color/dialog":{requires:["editor", "editor/plugin/dialog"]}});
    config({"editor/plugin/contextmenu":{requires:["editor", "menu", "editor/plugin/focus-fix", "event"]}});
    config({"editor/plugin/dent-cmd":{requires:["editor", "editor/plugin/list-utils"]}});
    config({"editor/plugin/dialog-loader":{requires:["editor", "overlay"]}});
    config({"editor/plugin/dialog":{requires:["editor", "overlay", "editor/plugin/focus-fix", "dd/plugin/constrain", "component/plugin/drag"]}});
    config({"editor/plugin/draft":{requires:["editor", "json", "event", "editor/plugin/local-storage", "overlay", "editor/plugin/menubutton"]}});
    config({"editor/plugin/drag-upload":{requires:["editor", "event"]}});
    config({"editor/plugin/element-path":{requires:["editor"]}});
    config({"editor/plugin/fake-objects":{requires:["editor", "html-parser"]}});
    config({"editor/plugin/focus-fix":{requires:["editor"]}});
    config({"editor/plugin/font-family":{requires:["editor", "editor/plugin/font/ui", "editor/plugin/font-family/cmd", "editor/plugin/menubutton"]}});
    config({"editor/plugin/font-family/cmd":{requires:["editor/plugin/font/cmd"]}});
    config({"editor/plugin/font-size":{requires:["editor", "editor/plugin/font/ui", "editor/plugin/font-size/cmd", "editor/plugin/menubutton"]}});
    config({"editor/plugin/font-size/cmd":{requires:["editor/plugin/font/cmd"]}});
    config({"editor/plugin/font/cmd":{requires:["editor"]}});
    config({"editor/plugin/font/ui":{requires:["editor", "editor/plugin/button", "editor/plugin/menubutton"]}});
    config({"editor/plugin/fore-color":{requires:["editor/plugin/color/btn", "editor/plugin/fore-color/cmd"]}});
    config({"editor/plugin/fore-color/cmd":{requires:["editor/plugin/color/cmd"]}});
    config({"editor/plugin/heading":{requires:["editor/plugin/menubutton", "editor", "editor/plugin/heading/cmd"]}});
    config({"editor/plugin/heading/cmd":{requires:["editor"]}});
    config({"editor/plugin/image":{requires:["editor/plugin/button", "editor", "editor/plugin/bubble", "editor/plugin/dialog-loader", "editor/plugin/contextmenu"]}});
    config({"editor/plugin/image/dialog":{requires:["editor", "io", "editor/plugin/dialog", "tabs", "editor/plugin/menubutton"]}});
    config({"editor/plugin/indent":{requires:["editor", "editor/plugin/indent/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/indent/cmd":{requires:["editor/plugin/dent-cmd"]}});
    config({"editor/plugin/italic":{requires:["editor/plugin/font/ui", "editor/plugin/italic/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/italic/cmd":{requires:["editor", "editor/plugin/font/cmd"]}});
    config({"editor/plugin/justify-center":{requires:["editor", "editor/plugin/justify-center/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/justify-center/cmd":{requires:["editor/plugin/justify-cmd"]}});
    config({"editor/plugin/justify-cmd":{requires:["editor"]}});
    config({"editor/plugin/justify-left":{requires:["editor", "editor/plugin/justify-left/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/justify-left/cmd":{requires:["editor/plugin/justify-cmd"]}});
    config({"editor/plugin/justify-right":{requires:["editor", "editor/plugin/justify-right/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/justify-right/cmd":{requires:["editor/plugin/justify-cmd"]}});
    config({"editor/plugin/link":{requires:["editor/plugin/button", "editor/plugin/bubble", "editor", "editor/plugin/link/utils", "editor/plugin/dialog-loader"]}});
    config({"editor/plugin/link/dialog":{requires:["editor", "editor/plugin/dialog", "editor/plugin/link/utils"]}});
    config({"editor/plugin/link/utils":{requires:["editor"]}});
    config({"editor/plugin/list-utils":{requires:["editor"]}});
    config({"editor/plugin/list-utils/btn":{requires:["editor", "editor/plugin/button", "editor/plugin/menubutton"]}});
    config({"editor/plugin/list-utils/cmd":{requires:["editor", "editor/plugin/list-utils"]}});
    config({"editor/plugin/local-storage":{requires:["editor", "overlay", "editor/plugin/flash-bridge"]}});
    config({"editor/plugin/maximize":{requires:["editor/plugin/maximize/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/maximize/cmd":{requires:["editor", "event"]}});
    config({"editor/plugin/menubutton":{requires:["editor", "menubutton"]}});
    config({"editor/plugin/ordered-list":{requires:["editor/plugin/list-utils/btn", "editor/plugin/ordered-list/cmd"]}});
    config({"editor/plugin/ordered-list/cmd":{requires:["editor", "editor/plugin/list-utils/cmd"]}});
    config({"editor/plugin/outdent":{requires:["editor", "editor/plugin/button", "editor/plugin/outdent/cmd"]}});
    config({"editor/plugin/outdent/cmd":{requires:["editor", "editor/plugin/dent-cmd"]}});
    config({"editor/plugin/overlay":{requires:["editor", "overlay", "editor/plugin/focus-fix"]}});
    config({"editor/plugin/page-break":{requires:["editor", "editor/plugin/fake-objects", "editor/plugin/button"]}});
    config({"editor/plugin/preview":{requires:["editor/plugin/button"]}});
    config({"editor/plugin/progressbar":{requires:["base"]}});
    config({"editor/plugin/remove-format":{requires:["editor", "editor/plugin/button", "editor/plugin/remove-format/cmd"]}});
    config({"editor/plugin/remove-format/cmd":{requires:["editor"]}});
    config({"editor/plugin/resize":{requires:["dd"]}});
    config({"editor/plugin/separator":{requires:["editor"]}});
    config({"editor/plugin/smiley":{requires:["editor", "editor/plugin/overlay", "editor/plugin/button"]}});
    config({"editor/plugin/source-area":{requires:["editor", "editor/plugin/button"]}});
    config({"editor/plugin/strike-through":{requires:["editor/plugin/font/ui", "editor/plugin/strike-through/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/strike-through/cmd":{requires:["editor", "editor/plugin/font/cmd"]}});
    config({"editor/plugin/table":{requires:["editor", "editor/plugin/dialog-loader", "editor/plugin/contextmenu", "editor/plugin/button"]}});
    config({"editor/plugin/table/dialog":{requires:["editor", "editor/plugin/dialog", "editor/plugin/menubutton"]}});
    config({"editor/plugin/underline":{requires:["editor/plugin/font/ui", "editor/plugin/underline/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/underline/cmd":{requires:["editor", "editor/plugin/font/cmd"]}});
    config({"editor/plugin/undo":{requires:["editor", "editor/plugin/undo/btn", "editor/plugin/undo/cmd", "editor/plugin/button"]}});
    config({"editor/plugin/undo/btn":{requires:["editor/plugin/button", "editor"]}});
    config({"editor/plugin/undo/cmd":{requires:["editor"]}});
    config({"editor/plugin/unordered-list":{requires:["editor/plugin/list-utils/btn", "editor/plugin/unordered-list/cmd"]}});
    config({"editor/plugin/unordered-list/cmd":{requires:["editor", "editor/plugin/list-utils/cmd"]}});
    config({"editor/plugin/word-filter":{requires:["html-parser"]}})
  })(function(c) {
    KISSY.config("modules", c)
  }, KISSY.Features, KISSY.UA)
});
KISSY.add("editor/styles", ["node", "./selection", "./range", "./base", "./elementPath"], function(S, require) {
  var Node = require("node");
  var KESelection = require("./selection");
  var KERange = require("./range");
  var Editor = require("./base");
  var ElementPath = require("./elementPath");
  var TRUE = true, FALSE = false, NULL = null, $ = S.all, Dom = S.DOM, KER = Editor.RangeType, KEP = Editor.PositionType, KEST, UA = S.UA, blockElements = {address:1, div:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, p:1, pre:1}, DTD = Editor.XHTML_DTD, objectElements = {embed:1, hr:1, img:1, li:1, object:1, ol:1, table:1, td:1, tr:1, th:1, ul:1, dl:1, dt:1, dd:1, form:1}, semicolonFixRegex = /\s*(?:;\s*|$)/g, varRegex = /#\((.+?)\)/g;
  Editor.StyleType = KEST = {STYLE_BLOCK:1, STYLE_INLINE:2, STYLE_OBJECT:3};
  function notBookmark(node) {
    return!Dom.attr(node, "_ke_bookmark")
  }
  function replaceVariables(list, variablesValues) {
    for(var item in list) {
      if(typeof list[item] === "string") {
        list[item] = list[item].replace(varRegex, function(match, varName) {
          return variablesValues[varName]
        })
      }else {
        replaceVariables(list[item], variablesValues)
      }
    }
  }
  function KEStyle(styleDefinition, variablesValues) {
    if(variablesValues) {
      styleDefinition = S.clone(styleDefinition);
      replaceVariables(styleDefinition, variablesValues)
    }
    var element = this.element = this.element = (styleDefinition.element || "*").toLowerCase();
    this.type = this.type = element === "#text" || blockElements[element] ? KEST.STYLE_BLOCK : objectElements[element] ? KEST.STYLE_OBJECT : KEST.STYLE_INLINE;
    this._ = {definition:styleDefinition}
  }
  function applyStyle(document, remove) {
    var self = this, func = remove ? self.removeFromRange : self.applyToRange;
    document.body.focus();
    var selection = new KESelection(document);
    var ranges = selection.getRanges();
    for(var i = 0;i < ranges.length;i++) {
      func.call(self, ranges[i])
    }
    selection.selectRanges(ranges)
  }
  KEStyle.prototype = {constructor:KEStyle, apply:function(document) {
    applyStyle.call(this, document, FALSE)
  }, remove:function(document) {
    applyStyle.call(this, document, TRUE)
  }, applyToRange:function(range) {
    var self = this;
    return(self.applyToRange = this.type === KEST.STYLE_INLINE ? applyInlineStyle : self.type === KEST.STYLE_BLOCK ? applyBlockStyle : self.type === KEST.STYLE_OBJECT ? NULL : NULL).call(self, range)
  }, removeFromRange:function(range) {
    var self = this;
    return(self.removeFromRange = self.type === KEST.STYLE_INLINE ? removeInlineStyle : NULL).call(self, range)
  }, checkElementRemovable:function(element, fullMatch) {
    if(!element) {
      return FALSE
    }
    var attName;
    var def = this._.definition, attribs, styles;
    if(element.nodeName() === this.element) {
      if(!fullMatch && !element._4eHasAttributes()) {
        return TRUE
      }
      attribs = getAttributesForComparison(def);
      if(attribs._length) {
        for(attName in attribs) {
          if(attName === "_length") {
            continue
          }
          var elementAttr = element.attr(attName) || "";
          if(attName === "style" ? compareCssText(attribs[attName], normalizeCssText(elementAttr, FALSE)) : attribs[attName] === elementAttr) {
            if(!fullMatch) {
              return TRUE
            }
          }else {
            if(fullMatch) {
              return FALSE
            }
          }
        }
        if(fullMatch) {
          return TRUE
        }
      }else {
        return TRUE
      }
    }
    var overrides = getOverrides(this), i, override = overrides[element.nodeName()] || overrides["*"];
    if(override) {
      if(!(attribs = override.attributes) && !(styles = override.styles)) {
        return TRUE
      }
      if(attribs) {
        for(i = 0;i < attribs.length;i++) {
          attName = attribs[i][0];
          var actualAttrValue = element.attr(attName);
          if(actualAttrValue) {
            var attValue = attribs[i][1];
            if(attValue === NULL || typeof attValue === "string" && actualAttrValue === attValue || attValue.test && attValue.test(actualAttrValue)) {
              return TRUE
            }
          }
        }
      }
      if(styles) {
        for(i = 0;i < styles.length;i++) {
          var styleName = styles[i][0];
          var actualStyleValue = element.css(styleName);
          if(actualStyleValue) {
            var styleValue = styles[i][1];
            if(styleValue === NULL || typeof styleValue === "string" && actualStyleValue === styleValue || styleValue.test && styleValue.test(actualStyleValue)) {
              return TRUE
            }
          }
        }
      }
    }
    return FALSE
  }, checkActive:function(elementPath) {
    switch(this.type) {
      case KEST.STYLE_BLOCK:
        return this.checkElementRemovable(elementPath.block || elementPath.blockLimit, TRUE);
      case KEST.STYLE_OBJECT:
      ;
      case KEST.STYLE_INLINE:
        var elements = elementPath.elements;
        for(var i = 0, element;i < elements.length;i++) {
          element = elements[i];
          if(this.type === KEST.STYLE_INLINE && (Dom.equals(element, elementPath.block) || Dom.equals(element, elementPath.blockLimit))) {
            continue
          }
          if(this.type === KEST.STYLE_OBJECT && !(element.nodeName() in objectElements)) {
            continue
          }
          if(this.checkElementRemovable(element, TRUE)) {
            return TRUE
          }
        }
    }
    return FALSE
  }};
  KEStyle.getStyleText = function(styleDefinition) {
    var stylesDef = styleDefinition._ST;
    if(stylesDef) {
      return stylesDef
    }
    stylesDef = styleDefinition.styles;
    var stylesText = styleDefinition.attributes && styleDefinition.attributes.style || "", specialStylesText = "";
    if(stylesText.length) {
      stylesText = stylesText.replace(semicolonFixRegex, ";")
    }
    for(var style in stylesDef) {
      var styleVal = stylesDef[style], text = (style + ":" + styleVal).replace(semicolonFixRegex, ";");
      if(styleVal === "inherit") {
        specialStylesText += text
      }else {
        stylesText += text
      }
    }
    if(stylesText.length) {
      stylesText = normalizeCssText(stylesText)
    }
    stylesText += specialStylesText;
    styleDefinition._ST = stylesText;
    return stylesText
  };
  function getElement(style, targetDocument, element) {
    var el, elementName = style.element;
    if(elementName === "*") {
      elementName = "span"
    }
    el = new Node(targetDocument.createElement(elementName));
    if(element) {
      element._4eCopyAttributes(el)
    }
    return setupElement(el, style)
  }
  function setupElement(el, style) {
    var def = style._.definition, attributes = def.attributes, styles = KEStyle.getStyleText(def);
    if(attributes) {
      for(var att in attributes) {
        el.attr(att, attributes[att])
      }
    }
    if(styles) {
      el[0].style.cssText = styles
    }
    return el
  }
  function applyBlockStyle(range) {
    var bookmark = range.createBookmark(TRUE), iterator = range.createIterator();
    iterator.enforceRealBlocks = TRUE;
    iterator.enlargeBr = TRUE;
    var block, doc = range.document;
    while(block = iterator.getNextParagraph()) {
      var newBlock = getElement(this, doc, block);
      replaceBlock(block, newBlock)
    }
    range.moveToBookmark(bookmark)
  }
  function replace(str, regexp, replacement) {
    var headBookmark = "", tailBookmark = "";
    str = str.replace(/(^<span[^>]+_ke_bookmark.*?\/span>)|(<span[^>]+_ke_bookmark.*?\/span>$)/gi, function(str, m1, m2) {
      if(m1) {
        headBookmark = m1
      }
      if(m2) {
        tailBookmark = m2
      }
      return""
    });
    return headBookmark + str.replace(regexp, replacement) + tailBookmark
  }
  function toPre(block, newBlock) {
    var preHTML = block.html();
    preHTML = replace(preHTML, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
    preHTML = preHTML.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
    preHTML = preHTML.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
    preHTML = preHTML.replace(/<br\b[^>]*>/gi, "\n");
    if(UA.ie) {
      var temp = block[0].ownerDocument.createElement("div");
      temp.appendChild(newBlock[0]);
      newBlock.outerHtml("<pre>" + preHTML + "</pre>");
      newBlock = new Node(temp.firstChild);
      newBlock._4eRemove()
    }else {
      newBlock.html(preHTML)
    }
    return newBlock
  }
  function splitIntoPres(preBlock) {
    var duoBrRegex = /(\S\s*)\n(?:\s|(<span[^>]+_ck_bookmark.*?\/span>))*\n(?!$)/gi, splittedHTML = replace(preBlock.outerHtml(), duoBrRegex, function(match, charBefore, bookmark) {
      return charBefore + "</pre>" + bookmark + "<pre>"
    });
    var pres = [];
    splittedHTML.replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(match, preContent) {
      pres.push(preContent)
    });
    return pres
  }
  function replaceBlock(block, newBlock) {
    var newBlockIsPre = newBlock.nodeName === "pre", blockIsPre = block.nodeName === "pre", isToPre = newBlockIsPre && !blockIsPre, isFromPre = !newBlockIsPre && blockIsPre;
    if(isToPre) {
      newBlock = toPre(block, newBlock)
    }else {
      if(isFromPre) {
        newBlock = fromPres(splitIntoPres(block), newBlock)
      }else {
        block._4eMoveChildren(newBlock)
      }
    }
    block[0].parentNode.replaceChild(newBlock[0], block[0]);
    if(newBlockIsPre) {
      mergePre(newBlock)
    }
  }
  function mergePre(preBlock) {
    var previousBlock;
    if(!((previousBlock = preBlock._4ePreviousSourceNode(TRUE, Dom.NodeType.ELEMENT_NODE)) && previousBlock.nodeName() === "pre")) {
      return
    }
    var mergedHTML = replace(previousBlock.html(), /\n$/, "") + "\n\n" + replace(preBlock.html(), /^\n/, "");
    if(UA.ie) {
      preBlock.outerHtml("<pre>" + mergedHTML + "</pre>")
    }else {
      preBlock.html(mergedHTML)
    }
    previousBlock._4eRemove()
  }
  function fromPres(preHTMLs, newBlock) {
    var docFrag = newBlock[0].ownerDocument.createDocumentFragment();
    for(var i = 0;i < preHTMLs.length;i++) {
      var blockHTML = preHTMLs[i];
      blockHTML = blockHTML.replace(/(\r\n|\r)/g, "\n");
      blockHTML = replace(blockHTML, /^[ \t]*\n/, "");
      blockHTML = replace(blockHTML, /\n$/, "");
      blockHTML = replace(blockHTML, /^[ \t]+|[ \t]+$/g, function(match, offset) {
        if(match.length === 1) {
          return"&nbsp;"
        }else {
          if(!offset) {
            return(new Array(match.length)).join("&nbsp;") + " "
          }else {
            return" " + (new Array(match.length)).join("&nbsp;")
          }
        }
      });
      blockHTML = blockHTML.replace(/\n/g, "<br>");
      blockHTML = blockHTML.replace(/[ \t]{2,}/g, function(match) {
        return(new Array(match.length)).join("&nbsp;") + " "
      });
      var newBlockClone = newBlock.clone();
      newBlockClone.html(blockHTML);
      docFrag.appendChild(newBlockClone[0])
    }
    return docFrag
  }
  function applyInlineStyle(range) {
    var self = this, document = range.document;
    if(range.collapsed) {
      var collapsedElement = getElement(this, document, undefined);
      range.insertNode(collapsedElement);
      range.moveToPosition(collapsedElement, KER.POSITION_BEFORE_END);
      return
    }
    var elementName = this.element, def = this._.definition, isUnknownElement, dtd = DTD[elementName];
    if(!dtd) {
      isUnknownElement = TRUE;
      dtd = DTD.span
    }
    var bookmark = range.createBookmark();
    range.enlarge(KER.ENLARGE_ELEMENT);
    range.trim();
    var boundaryNodes = range.createBookmark(), firstNode = boundaryNodes.startNode, lastNode = boundaryNodes.endNode, currentNode = firstNode, styleRange;
    while(currentNode && currentNode[0]) {
      var applyStyle = FALSE;
      if(Dom.equals(currentNode, lastNode)) {
        currentNode = NULL;
        applyStyle = TRUE
      }else {
        var nodeType = currentNode[0].nodeType, nodeName = nodeType === Dom.NodeType.ELEMENT_NODE ? currentNode.nodeName() : NULL;
        if(nodeName && currentNode.attr("_ke_bookmark")) {
          currentNode = currentNode._4eNextSourceNode(TRUE);
          continue
        }
        if(!nodeName || dtd[nodeName] && (currentNode._4ePosition(lastNode) | KEP.POSITION_PRECEDING | KEP.POSITION_IDENTICAL | KEP.POSITION_IS_CONTAINED) === KEP.POSITION_PRECEDING + KEP.POSITION_IDENTICAL + KEP.POSITION_IS_CONTAINED && (!def.childRule || def.childRule(currentNode))) {
          var currentParent = currentNode.parent();
          if(currentParent && elementName === "a" && currentParent.nodeName() === elementName) {
            var tmpANode = getElement(self, document, undefined);
            currentParent._4eMoveChildren(tmpANode);
            currentParent[0].parentNode.replaceChild(tmpANode[0], currentParent[0]);
            tmpANode._4eMergeSiblings()
          }else {
            if(currentParent && currentParent[0] && ((DTD[currentParent.nodeName()] || DTD.span)[elementName] || isUnknownElement) && (!def.parentRule || def.parentRule(currentParent))) {
              if(!styleRange && (!nodeName || !DTD.$removeEmpty[nodeName] || (currentNode._4ePosition(lastNode) | KEP.POSITION_PRECEDING | KEP.POSITION_IDENTICAL | KEP.POSITION_IS_CONTAINED) === KEP.POSITION_PRECEDING + KEP.POSITION_IDENTICAL + KEP.POSITION_IS_CONTAINED)) {
                styleRange = new KERange(document);
                styleRange.setStartBefore(currentNode)
              }
              if(nodeType === Dom.NodeType.TEXT_NODE || nodeType === Dom.NodeType.ELEMENT_NODE && !currentNode[0].childNodes.length) {
                var includedNode = currentNode, parentNode = null;
                while((applyStyle = !includedNode.next(notBookmark, 1)) && (parentNode = includedNode.parent()) && dtd[parentNode.nodeName()] && (parentNode._4ePosition(firstNode) | KEP.POSITION_FOLLOWING | KEP.POSITION_IDENTICAL | KEP.POSITION_IS_CONTAINED) === KEP.POSITION_FOLLOWING + KEP.POSITION_IDENTICAL + KEP.POSITION_IS_CONTAINED && (!def.childRule || def.childRule(parentNode))) {
                  includedNode = parentNode
                }
                styleRange.setEndAfter(includedNode)
              }
            }else {
              applyStyle = TRUE
            }
          }
        }else {
          applyStyle = TRUE
        }
        currentNode = currentNode._4eNextSourceNode()
      }
      if(applyStyle && styleRange && !styleRange.collapsed) {
        var styleNode = getElement(self, document, undefined), parent = styleRange.getCommonAncestor();
        var removeList = {styles:{}, attrs:{}, blockedStyles:{}, blockedAttrs:{}};
        var attName, styleName = null, value;
        while(styleNode && parent && styleNode[0] && parent[0]) {
          if(parent.nodeName() === elementName) {
            for(attName in def.attributes) {
              if(removeList.blockedAttrs[attName] || !(value = parent.attr(styleName))) {
                continue
              }
              if(styleNode.attr(attName) === value) {
                styleNode.removeAttr(attName)
              }else {
                removeList.blockedAttrs[attName] = 1
              }
            }
            for(styleName in def.styles) {
              if(removeList.blockedStyles[styleName] || !(value = parent.style(styleName))) {
                continue
              }
              if(styleNode.style(styleName) === value) {
                styleNode.style(styleName, "")
              }else {
                removeList.blockedStyles[styleName] = 1
              }
            }
            if(!styleNode._4eHasAttributes()) {
              styleNode = NULL;
              break
            }
          }
          parent = parent.parent()
        }
        if(styleNode) {
          styleNode[0].appendChild(styleRange.extractContents());
          removeFromInsideElement(self, styleNode);
          styleRange.insertNode(styleNode);
          styleNode._4eMergeSiblings();
          if(!UA.ie) {
            styleNode[0].normalize()
          }
        }else {
          styleNode = new Node(document.createElement("span"));
          styleNode[0].appendChild(styleRange.extractContents());
          styleRange.insertNode(styleNode);
          removeFromInsideElement(self, styleNode);
          styleNode._4eRemove(true)
        }
        styleRange = NULL
      }
    }
    firstNode._4eRemove();
    lastNode._4eRemove();
    range.moveToBookmark(bookmark);
    range.shrink(KER.SHRINK_TEXT)
  }
  function removeInlineStyle(range) {
    range.enlarge(KER.ENLARGE_ELEMENT);
    var bookmark = range.createBookmark(), startNode = bookmark.startNode;
    if(range.collapsed) {
      var startPath = new ElementPath(startNode.parent()), boundaryElement;
      for(var i = 0, element;i < startPath.elements.length && (element = startPath.elements[i]);i++) {
        if(element === startPath.block || element === startPath.blockLimit) {
          break
        }
        if(this.checkElementRemovable(element)) {
          var endOfElement = range.checkBoundaryOfElement(element, KER.END), startOfElement = !endOfElement && range.checkBoundaryOfElement(element, KER.START);
          if(startOfElement || endOfElement) {
            boundaryElement = element;
            boundaryElement.match = startOfElement ? "start" : "end"
          }else {
            element._4eMergeSiblings();
            if(element.nodeName() !== this.element) {
              var _overrides = getOverrides(this);
              removeOverrides(element, _overrides[element.nodeName()] || _overrides["*"])
            }else {
              removeFromElement(this, element)
            }
          }
        }
      }
      if(boundaryElement) {
        var clonedElement = startNode;
        for(i = 0;;i++) {
          var newElement = startPath.elements[i];
          if(newElement.equals(boundaryElement)) {
            break
          }else {
            if(newElement.match) {
              continue
            }else {
              newElement = newElement.clone()
            }
          }
          newElement[0].appendChild(clonedElement[0]);
          clonedElement = newElement
        }
        clonedElement[boundaryElement.match === "start" ? "insertBefore" : "insertAfter"](boundaryElement);
        var tmp = boundaryElement.html();
        if(!tmp || tmp === "\u200b") {
          boundaryElement.remove()
        }else {
          if(UA.webkit) {
            $(range.document.createTextNode("\u200b")).insertBefore(clonedElement)
          }
        }
      }
    }else {
      var endNode = bookmark.endNode, me = this;
      var breakNodes = function() {
        var startPath = new ElementPath(startNode.parent()), endPath = new ElementPath(endNode.parent()), breakStart = NULL, element, breakEnd = NULL;
        for(var i = 0;i < startPath.elements.length;i++) {
          element = startPath.elements[i];
          if(element === startPath.block || element === startPath.blockLimit) {
            break
          }
          if(me.checkElementRemovable(element)) {
            breakStart = element
          }
        }
        for(i = 0;i < endPath.elements.length;i++) {
          element = endPath.elements[i];
          if(element === endPath.block || element === endPath.blockLimit) {
            break
          }
          if(me.checkElementRemovable(element)) {
            breakEnd = element
          }
        }
        if(breakEnd) {
          endNode._4eBreakParent(breakEnd)
        }
        if(breakStart) {
          startNode._4eBreakParent(breakStart)
        }
      };
      breakNodes();
      var currentNode = new Node(startNode[0].nextSibling);
      while(currentNode[0] !== endNode[0]) {
        var nextNode = currentNode._4eNextSourceNode();
        if(currentNode[0] && currentNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && this.checkElementRemovable(currentNode)) {
          if(currentNode.nodeName() === this.element) {
            removeFromElement(this, currentNode)
          }else {
            var overrides = getOverrides(this);
            removeOverrides(currentNode, overrides[currentNode.nodeName()] || overrides["*"])
          }
          if(nextNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && nextNode.contains(startNode)) {
            breakNodes();
            nextNode = new Node(startNode[0].nextSibling)
          }
        }
        currentNode = nextNode
      }
    }
    range.moveToBookmark(bookmark)
  }
  function parseStyleText(styleText) {
    styleText = String(styleText);
    var retval = {};
    styleText.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(match, name, value) {
      retval[name] = value
    });
    return retval
  }
  function compareCssText(source, target) {
    if(typeof source === "string") {
      source = parseStyleText(source)
    }
    if(target === "string") {
      target = parseStyleText(target)
    }
    for(var name in source) {
      if(!(name in target && (target[name] === source[name] || source[name] === "inherit" || target[name] === "inherit"))) {
        return FALSE
      }
    }
    return TRUE
  }
  function normalizeCssText(unParsedCssText, nativeNormalize) {
    var styleText = "";
    if(nativeNormalize !== FALSE) {
      var temp = document.createElement("span");
      temp.style.cssText = unParsedCssText;
      styleText = temp.style.cssText || ""
    }else {
      styleText = unParsedCssText
    }
    return styleText.replace(/\s*([;:])\s*/, "$1").replace(/([^\s;])$/, "$1;").replace(/,\s+/g, ",").toLowerCase()
  }
  function getAttributesForComparison(styleDefinition) {
    var attribs = styleDefinition._AC;
    if(attribs) {
      return attribs
    }
    attribs = {};
    var length = 0, styleAttribs = styleDefinition.attributes;
    if(styleAttribs) {
      for(var styleAtt in styleAttribs) {
        length++;
        attribs[styleAtt] = styleAttribs[styleAtt]
      }
    }
    var styleText = KEStyle.getStyleText(styleDefinition);
    if(styleText) {
      if(!attribs.style) {
        length++
      }
      attribs.style = styleText
    }
    attribs._length = length;
    styleDefinition._AC = attribs;
    return attribs
  }
  function getOverrides(style) {
    if(style._.overrides) {
      return style._.overrides
    }
    var overrides = style._.overrides = {}, definition = style._.definition.overrides;
    if(definition) {
      if(!S.isArray(definition)) {
        definition = [definition]
      }
      for(var i = 0;i < definition.length;i++) {
        var override = definition[i];
        var elementName;
        var overrideEl;
        var attrs, styles;
        if(typeof override === "string") {
          elementName = override.toLowerCase()
        }else {
          elementName = override.element ? override.element.toLowerCase() : style.element;
          attrs = override.attributes;
          styles = override.styles
        }
        overrideEl = overrides[elementName] || (overrides[elementName] = {});
        if(attrs) {
          var overrideAttrs = overrideEl.attributes = overrideEl.attributes || [];
          for(var attName in attrs) {
            overrideAttrs.push([attName.toLowerCase(), attrs[attName]])
          }
        }
        if(styles) {
          var overrideStyles = overrideEl.styles = overrideEl.styles || [];
          for(var styleName in styles) {
            overrideStyles.push([styleName.toLowerCase(), styles[styleName]])
          }
        }
      }
    }
    return overrides
  }
  function removeFromElement(style, element) {
    var def = style._.definition, overrides = getOverrides(style), attributes = S.merge(def.attributes, (overrides[element.nodeName()] || overrides["*"] || {}).attributes), styles = S.merge(def.styles, (overrides[element.nodeName()] || overrides["*"] || {}).styles), removeEmpty = S.isEmptyObject(attributes) && S.isEmptyObject(styles);
    for(var attName in attributes) {
      if((attName === "class" || style._.definition.fullMatch) && element.attr(attName) !== normalizeProperty(attName, attributes[attName])) {
        continue
      }
      removeEmpty = removeEmpty || !!element.hasAttr(attName);
      element.removeAttr(attName)
    }
    for(var styleName in styles) {
      if(style._.definition.fullMatch && element.style(styleName) !== normalizeProperty(styleName, styles[styleName], TRUE)) {
        continue
      }
      removeEmpty = removeEmpty || !!element.style(styleName);
      element.style(styleName, "")
    }
    removeNoAttribsElement(element)
  }
  function normalizeProperty(name, value, isStyle) {
    var temp = new Node("<span>");
    temp[isStyle ? "style" : "attr"](name, value);
    return temp[isStyle ? "style" : "attr"](name)
  }
  function removeFromInsideElement(style, element) {
    var overrides = getOverrides(style), innerElements = element.all(style.element);
    for(var i = innerElements.length;--i >= 0;) {
      removeFromElement(style, new Node(innerElements[i]))
    }
    for(var overrideElement in overrides) {
      if(overrideElement !== style.element) {
        innerElements = element.all(overrideElement);
        for(i = innerElements.length - 1;i >= 0;i--) {
          var innerElement = new Node(innerElements[i]);
          removeOverrides(innerElement, overrides[overrideElement])
        }
      }
    }
  }
  function removeOverrides(element, overrides) {
    var i, actualAttrValue, attributes = overrides && overrides.attributes;
    if(attributes) {
      for(i = 0;i < attributes.length;i++) {
        var attName = attributes[i][0];
        if(actualAttrValue = element.attr(attName)) {
          var attValue = attributes[i][1];
          if(attValue === NULL || attValue.test && attValue.test(actualAttrValue) || typeof attValue === "string" && actualAttrValue === attValue) {
            element[0].removeAttribute(attName)
          }
        }
      }
    }
    var styles = overrides && overrides.styles;
    if(styles) {
      for(i = 0;i < styles.length;i++) {
        var styleName = styles[i][0], actualStyleValue;
        if(actualStyleValue = element.css(styleName)) {
          var styleValue = styles[i][1];
          if(styleValue === NULL || styleValue.test && styleValue.test(actualAttrValue) || typeof styleValue === "string" && actualStyleValue === styleValue) {
            element.css(styleName, "")
          }
        }
      }
    }
    removeNoAttribsElement(element)
  }
  function removeNoAttribsElement(element) {
    if(!element._4eHasAttributes()) {
      var firstChild = element[0].firstChild, lastChild = element[0].lastChild;
      element._4eRemove(TRUE);
      if(firstChild) {
        if(firstChild.nodeType === Dom.NodeType.ELEMENT_NODE) {
          Dom._4eMergeSiblings(firstChild)
        }
        if(lastChild && firstChild !== lastChild && lastChild.nodeType === Dom.NodeType.ELEMENT_NODE) {
          Dom._4eMergeSiblings(lastChild)
        }
      }
    }
  }
  Editor.Style = KEStyle;
  return KEStyle
});
KISSY.add("editor/domIterator", ["node", "./walker", "./range", "./base", "./elementPath"], function(S, require) {
  var Node = require("node");
  var Walker = require("./walker");
  var KERange = require("./range");
  var Editor = require("./base");
  var ElementPath = require("./elementPath");
  var TRUE = true, FALSE = false, NULL = null, UA = S.UA, KER = Editor.RangeType, Dom = S.DOM;
  function Iterator(range) {
    if(arguments.length < 1) {
      return
    }
    var self = this;
    self.range = range;
    self.forceBrBreak = FALSE;
    self.enlargeBr = TRUE;
    self.enforceRealBlocks = FALSE;
    self._ = self._ || {}
  }
  var beginWhitespaceRegex = /^[\r\n\t ]*$/;
  S.augment(Iterator, {getNextParagraph:function(blockTag) {
    var block, lastNode, self = this;
    var range;
    var isLast;
    var removePreviousBr, removeLastBr;
    if(!self._.lastNode) {
      range = self.range.clone();
      range.shrink(KER.SHRINK_ELEMENT, TRUE);
      range.enlarge(self.forceBrBreak || !self.enlargeBr ? KER.ENLARGE_LIST_ITEM_CONTENTS : KER.ENLARGE_BLOCK_CONTENTS);
      var walker = new Walker(range), ignoreBookmarkTextEvaluator = Walker.bookmark(TRUE, TRUE);
      walker.evaluator = ignoreBookmarkTextEvaluator;
      self._.nextNode = walker.next();
      walker = new Walker(range);
      walker.evaluator = ignoreBookmarkTextEvaluator;
      lastNode = walker.previous();
      self._.lastNode = lastNode._4eNextSourceNode(TRUE);
      if(self._.lastNode && self._.lastNode[0].nodeType === Dom.NodeType.TEXT_NODE && !S.trim(self._.lastNode[0].nodeValue) && self._.lastNode.parent()._4eIsBlockBoundary()) {
        var testRange = new KERange(range.document);
        testRange.moveToPosition(self._.lastNode, KER.POSITION_AFTER_END);
        if(testRange.checkEndOfBlock()) {
          var path = new ElementPath(testRange.endContainer);
          var lastBlock = path.block || path.blockLimit;
          self._.lastNode = lastBlock._4eNextSourceNode(TRUE)
        }
      }
      if(!self._.lastNode) {
        self._.lastNode = self._.docEndMarker = new Node(range.document.createTextNode(""));
        Dom.insertAfter(self._.lastNode[0], lastNode[0])
      }
      range = NULL
    }
    var currentNode = self._.nextNode;
    lastNode = self._.lastNode;
    self._.nextNode = NULL;
    while(currentNode) {
      var closeRange = FALSE;
      var includeNode = currentNode[0].nodeType !== Dom.NodeType.ELEMENT_NODE, continueFromSibling = FALSE;
      if(!includeNode) {
        var nodeName = currentNode.nodeName();
        if(currentNode._4eIsBlockBoundary(self.forceBrBreak && {br:1})) {
          if(nodeName === "br") {
            includeNode = TRUE
          }else {
            if(!range && !currentNode[0].childNodes.length && nodeName !== "hr") {
              block = currentNode;
              isLast = currentNode.equals(lastNode);
              break
            }
          }
          if(range) {
            range.setEndAt(currentNode, KER.POSITION_BEFORE_START);
            if(nodeName !== "br") {
              self._.nextNode = currentNode
            }
          }
          closeRange = TRUE
        }else {
          if(currentNode[0].firstChild) {
            if(!range) {
              range = new KERange(self.range.document);
              range.setStartAt(currentNode, KER.POSITION_BEFORE_START)
            }
            currentNode = new Node(currentNode[0].firstChild);
            continue
          }
          includeNode = TRUE
        }
      }else {
        if(currentNode[0].nodeType === Dom.NodeType.TEXT_NODE) {
          if(beginWhitespaceRegex.test(currentNode[0].nodeValue)) {
            includeNode = FALSE
          }
        }
      }
      if(includeNode && !range) {
        range = new KERange(self.range.document);
        range.setStartAt(currentNode, KER.POSITION_BEFORE_START)
      }
      isLast = (!closeRange || includeNode) && currentNode.equals(lastNode);
      if(range && !closeRange) {
        while(!currentNode[0].nextSibling && !isLast) {
          var parentNode = currentNode.parent();
          if(parentNode._4eIsBlockBoundary(self.forceBrBreak && {br:1})) {
            closeRange = TRUE;
            isLast = isLast || parentNode.equals(lastNode);
            break
          }
          currentNode = parentNode;
          includeNode = TRUE;
          isLast = currentNode.equals(lastNode);
          continueFromSibling = TRUE
        }
      }
      if(includeNode) {
        range.setEndAt(currentNode, KER.POSITION_AFTER_END)
      }
      currentNode = currentNode._4eNextSourceNode(continueFromSibling, NULL, lastNode);
      isLast = !currentNode;
      if(isLast || closeRange && range) {
        break
      }
    }
    if(!block) {
      if(!range) {
        if(self._.docEndMarker) {
          self._.docEndMarker._4eRemove()
        }
        self._.nextNode = NULL;
        return NULL
      }
      var startPath = new ElementPath(range.startContainer);
      var startBlockLimit = startPath.blockLimit, checkLimits = {div:1, th:1, td:1};
      block = startPath.block;
      if((!block || !block[0]) && !self.enforceRealBlocks && checkLimits[startBlockLimit.nodeName()] && range.checkStartOfBlock() && range.checkEndOfBlock()) {
        block = startBlockLimit
      }else {
        if(!block || self.enforceRealBlocks && block.nodeName() === "li") {
          block = new Node(self.range.document.createElement(blockTag || "p"));
          block[0].appendChild(range.extractContents());
          block._4eTrim();
          range.insertNode(block);
          removePreviousBr = removeLastBr = TRUE
        }else {
          if(block.nodeName() !== "li") {
            if(!range.checkStartOfBlock() || !range.checkEndOfBlock()) {
              block = block.clone(FALSE);
              block[0].appendChild(range.extractContents());
              block._4eTrim();
              var splitInfo = range.splitBlock();
              removePreviousBr = !splitInfo.wasStartOfBlock;
              removeLastBr = !splitInfo.wasEndOfBlock;
              range.insertNode(block)
            }
          }else {
            if(!isLast) {
              self._.nextNode = block.equals(lastNode) ? NULL : range.getBoundaryNodes().endNode._4eNextSourceNode(TRUE, NULL, lastNode)
            }
          }
        }
      }
    }
    if(removePreviousBr) {
      var previousSibling = new Node(block[0].previousSibling);
      if(previousSibling[0] && previousSibling[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
        if(previousSibling.nodeName() === "br") {
          previousSibling._4eRemove()
        }else {
          if(previousSibling[0].lastChild && Dom.nodeName(previousSibling[0].lastChild) === "br") {
            Dom._4eRemove(previousSibling[0].lastChild)
          }
        }
      }
    }
    if(removeLastBr) {
      var bookmarkGuard = Walker.bookmark(FALSE, TRUE);
      var lastChild = new Node(block[0].lastChild);
      if(lastChild[0] && lastChild[0].nodeType === Dom.NodeType.ELEMENT_NODE && lastChild.nodeName() === "br") {
        if(UA.ie || lastChild.prev(bookmarkGuard, 1) || lastChild.next(bookmarkGuard, 1)) {
          lastChild.remove()
        }
      }
    }
    if(!self._.nextNode) {
      self._.nextNode = isLast || block.equals(lastNode) ? NULL : block._4eNextSourceNode(TRUE, NULL, lastNode)
    }
    return block
  }});
  KERange.prototype.createIterator = function() {
    return new Iterator(this)
  };
  return Iterator
});
KISSY.add("editor/z-index-manager", ["./base"], function(S, require) {
  var Editor = require("./base");
  var ZIndexManager = Editor.ZIndexManager = {BUBBLE_VIEW:1100, POPUP_MENU:1200, STORE_FLASH_SHOW:99999, MAXIMIZE:900, OVERLAY:9999, LOADING:11E3, LOADING_CANCEL:12E3, SELECT:1200};
  Editor.baseZIndex = function(z) {
    return(Editor.Config.baseZIndex || 1E4) + z
  };
  return ZIndexManager
});
KISSY.add("editor", ["node", "editor/iframe-content-tpl", "editor/base", "editor/utils", "editor/focusManager", "editor/clipboard", "editor/enterKey", "editor/htmlDataProcessor", "editor/selectionFix", "editor/plugin-meta", "editor/styles", "editor/domIterator", "editor/z-index-manager"], function(S, require, exports, module) {
  var Node = require("node");
  var iframeContentTpl = require("editor/iframe-content-tpl");
  var Editor = require("editor/base");
  var Utils = require("editor/utils");
  var focusManager = require("editor/focusManager");
  var clipboard = require("editor/clipboard");
  var enterKey = require("editor/enterKey");
  var htmlDataProcessor = require("editor/htmlDataProcessor");
  var selectionFix = require("editor/selectionFix");
  require("editor/plugin-meta");
  require("editor/styles");
  require("editor/domIterator");
  require("editor/z-index-manager");
  module.exports = Editor;
  var logger = S.getLogger("s/editor");
  var TRUE = true, FALSE = false, NULL = null, window = S.Env.host, document = window.document, UA = S.UA, IS_IE = UA.ieMode < 11, NodeType = Node.NodeType, $ = Node.all, HEIGHT = "height", tryThese = Utils.tryThese, IFRAME_TPL = "<iframe" + ' class="{prefixCls}editor-iframe"' + ' frameborder="0" ' + ' title="kissy-editor" ' + ' allowTransparency="true" ' + " {iframeSrc} " + ">" + "</iframe>", EMPTY_CONTENT_REG = /^(?:<(p)>)?(?:(?:&nbsp;)|\s|<br[^>]*>)*(?:<\/\1>)?$/i;
  Editor.Mode = {SOURCE_MODE:0, WYSIWYG_MODE:1};
  var WYSIWYG_MODE = 1;
  Editor.addMembers({initializer:function() {
    var self = this;
    self.__commands = {};
    self.__controls = {};
    focusManager.register(self)
  }, renderUI:function() {
    var self = this;
    clipboard.init(self);
    enterKey.init(self);
    htmlDataProcessor.init(self);
    selectionFix.init(self)
  }, bindUI:function() {
    var self = this, form, prefixCls = self.get("prefixCls"), textarea = self.get("textarea");
    if(self.get("attachForm") && (form = textarea[0].form) && (form = $(form))) {
      form.on("submit", self.sync, self)
    }
    function docReady() {
      self.detach("docReady", docReady);
      if(self.get("focused")) {
        self.focus()
      }else {
        var sel = self.getSelection();
        if(sel) {
          sel.removeAllRanges()
        }
      }
    }
    self.on("docReady", docReady);
    self.on("blur", function() {
      self.$el.removeClass(prefixCls + "editor-focused")
    });
    self.on("focus", function() {
      self.$el.addClass(prefixCls + "editor-focused")
    })
  }, _onSetHeight:function(v) {
    var self = this, textareaEl = self.get("textarea"), toolBarEl = self.get("toolBarEl"), statusBarEl = self.get("statusBarEl");
    v = parseInt(v, 10);
    v -= (toolBarEl && toolBarEl.outerHeight() || 0) + (statusBarEl && statusBarEl.outerHeight() || 0);
    textareaEl.parent().css(HEIGHT, v);
    textareaEl.css(HEIGHT, v)
  }, _onSetMode:function(v) {
    var self = this, iframe = self.get("iframe"), textarea = self.get("textarea");
    if(v === WYSIWYG_MODE) {
      self.setData(textarea.val());
      textarea.hide();
      self.fire("wysiwygMode")
    }else {
      if(iframe) {
        textarea.val(self.getFormatData(WYSIWYG_MODE));
        iframe.hide()
      }
      textarea.show();
      self.fire("sourceMode")
    }
  }, _onSetFocused:function(v) {
    var self = this;
    if(v && self.__docReady) {
      self.focus()
    }
  }, destructor:function() {
    var self = this, form, textarea = self.get("textarea"), doc = self.get("document");
    if(self.get("attachForm") && (form = textarea[0].form) && (form = $(form))) {
      form.detach("submit", self.sync, self)
    }
    if(doc) {
      var body = $(doc[0].body), documentElement = $(doc[0].documentElement), win = self.get("window");
      focusManager.remove(self);
      doc.detach();
      documentElement.detach();
      body.detach();
      win.detach()
    }
    S.each(self.__controls, function(control) {
      if(control.destroy) {
        control.destroy()
      }
    });
    self.__commands = {};
    self.__controls = {}
  }, sync:function() {
    var self = this;
    self.get("textarea").val(self.getData())
  }, getControl:function(id) {
    return this.__controls[id]
  }, getControls:function() {
    return this.__controls
  }, addControl:function(id, control) {
    this.__controls[id] = control
  }, showDialog:function(name, args) {
    name += "/dialog";
    var self = this, d = self.__controls[name];
    d.show(args);
    self.fire("dialogShow", {dialog:d.dialog, pluginDialog:d, dialogName:name})
  }, addCommand:function(name, obj) {
    this.__commands[name] = obj
  }, hasCommand:function(name) {
    return this.__commands[name]
  }, execCommand:function(name) {
    var self = this, cmd = self.__commands[name], args = S.makeArray(arguments);
    args.shift();
    args.unshift(self);
    if(cmd) {
      return cmd.exec.apply(cmd, args)
    }else {
      logger.error(name + ": command not found");
      return undefined
    }
  }, queryCommandValue:function(name) {
    return this.execCommand(Utils.getQueryCmd(name))
  }, setData:function(data) {
    var self = this, htmlDataProcessor, afterData = data;
    if(self.get("mode") !== WYSIWYG_MODE) {
      self.get("textarea").val(data);
      return
    }
    if(htmlDataProcessor = self.htmlDataProcessor) {
      afterData = htmlDataProcessor.toDataFormat(data)
    }
    clearIframeDocContent(self);
    createIframe(self, afterData)
  }, getData:function(format, mode) {
    var self = this, htmlDataProcessor = self.htmlDataProcessor, html;
    if(mode === undefined) {
      mode = self.get("mode")
    }
    if(mode === WYSIWYG_MODE && self.isDocReady()) {
      html = self.get("document")[0].body.innerHTML
    }else {
      html = htmlDataProcessor.toDataFormat(self.get("textarea").val())
    }
    if(format) {
      html = htmlDataProcessor.toHtml(html)
    }else {
      html = htmlDataProcessor.toServer(html)
    }
    html = S.trim(html);
    if(EMPTY_CONTENT_REG.test(html)) {
      html = ""
    }
    return html
  }, getFormatData:function(mode) {
    return this.getData(1, mode)
  }, getDocHtml:function() {
    var self = this;
    return prepareIFrameHTML(0, self.get("customStyle"), self.get("customLink"), self.getFormatData())
  }, getSelection:function() {
    return Editor.Selection.getSelection(this.get("document")[0])
  }, getSelectedHtml:function() {
    var self = this, range = self.getSelection().getRanges()[0], contents, html = "";
    if(range) {
      contents = range.cloneContents();
      html = self.get("document")[0].createElement("div");
      html.appendChild(contents);
      html = html.innerHTML
    }
    return html
  }, focus:function() {
    var self = this, win = self.get("window");
    if(!win) {
      return
    }
    var doc = self.get("document")[0];
    win = win[0];
    if(!UA.ie) {
      if(win && win.parent) {
        win.parent.focus()
      }
    }
    if(win) {
      win.focus()
    }
    try {
      doc.body.focus()
    }catch(e) {
    }
    self.notifySelectionChange()
  }, blur:function() {
    var self = this, win = self.get("window")[0];
    win.blur();
    self.get("document")[0].body.blur()
  }, addCustomStyle:function(cssText, id) {
    var self = this, win = self.get("window"), customStyle = self.get("customStyle") || "";
    customStyle += "\n" + cssText;
    self.set("customStyle", customStyle);
    if(win) {
      win.addStyleSheet(cssText, id)
    }
  }, removeCustomStyle:function(id) {
    this.get("document").on("#" + id).remove()
  }, addCustomLink:function(link) {
    var self = this, customLink = self.get("customLink"), doc = self.get("document")[0];
    customLink.push(link);
    self.set("customLink", customLink);
    var elem = doc.createElement("link");
    elem.rel = "stylesheet";
    doc.getElementsByTagName("head")[0].appendChild(elem);
    elem.href = link
  }, removeCustomLink:function(link) {
    var self = this, doc = self.get("document"), links = doc.all("link");
    links.each(function(l) {
      if(l.attr("href") === link) {
        l.remove()
      }
    });
    var cls = self.get("customLink"), ind = S.indexOf(link, cls);
    if(ind !== -1) {
      cls.splice(ind, 1)
    }
  }, docReady:function(func) {
    var self = this;
    self.on("docReady", func);
    if(self.__docReady) {
      func.call(self)
    }
  }, isDocReady:function() {
    return this.__docReady
  }, checkSelectionChange:function() {
    var self = this;
    if(self.__checkSelectionChangeId) {
      clearTimeout(self.__checkSelectionChangeId)
    }
    self.__checkSelectionChangeId = setTimeout(function() {
      var selection = self.getSelection();
      if(selection && !selection.isInvalid) {
        var startElement = selection.getStartElement(), currentPath = new Editor.ElementPath(startElement);
        if(!self.__previousPath || !self.__previousPath.compare(currentPath)) {
          self.__previousPath = currentPath;
          self.fire("selectionChange", {selection:selection, path:currentPath, element:startElement})
        }
      }
    }, 100)
  }, notifySelectionChange:function() {
    var self = this;
    self.__previousPath = NULL;
    self.checkSelectionChange()
  }, insertElement:function(element) {
    var self = this;
    if(self.get("mode") !== WYSIWYG_MODE) {
      return undefined
    }
    self.focus();
    var clone, elementName = element.nodeName(), xhtmlDtd = Editor.XHTML_DTD, isBlock = xhtmlDtd.$block[elementName], KER = Editor.RangeType, selection = self.getSelection(), ranges = selection && selection.getRanges(), range, notWhitespaceEval, i, next, nextName, lastElement;
    if(!ranges || ranges.length === 0) {
      return undefined
    }
    self.execCommand("save");
    for(i = ranges.length - 1;i >= 0;i--) {
      range = ranges[i];
      clone = !i && element || element.clone(TRUE);
      range.insertNodeByDtd(clone);
      if(!lastElement) {
        lastElement = clone
      }
    }
    if(!lastElement) {
      return undefined
    }
    range.moveToPosition(lastElement, KER.POSITION_AFTER_END);
    if(isBlock) {
      notWhitespaceEval = Editor.Walker.whitespaces(true);
      next = lastElement.next(notWhitespaceEval, 1);
      nextName = next && next[0].nodeType === NodeType.ELEMENT_NODE && next.nodeName();
      if(nextName && xhtmlDtd.$block[nextName] && xhtmlDtd[nextName]["#text"]) {
        range.moveToElementEditablePosition(next)
      }
    }
    selection.selectRanges([range]);
    self.focus();
    if(clone && clone[0].nodeType === 1) {
      clone.scrollIntoView(undefined, {alignWithTop:false, allowHorizontalScroll:true, onlyScrollIfNeeded:true})
    }
    saveLater.call(self);
    return clone
  }, insertHtml:function(data, dataFilter) {
    var self = this, htmlDataProcessor, editorDoc = self.get("document")[0];
    if(self.get("mode") !== WYSIWYG_MODE) {
      return
    }
    if(htmlDataProcessor = self.htmlDataProcessor) {
      data = htmlDataProcessor.toDataFormat(data, dataFilter)
    }
    self.focus();
    self.execCommand("save");
    var $sel = editorDoc.selection;
    if($sel) {
      if($sel.type === "Control") {
        $sel.clear()
      }
      try {
        $sel.createRange().pasteHTML(data)
      }catch(e) {
        logger.error("insertHtml error in ie")
      }
    }else {
      var sel = self.get("iframe")[0].contentWindow.getSelection(), range = sel.getRangeAt(0);
      range.deleteContents();
      var el = editorDoc.createElement("div");
      el.innerHTML = data;
      var frag = editorDoc.createDocumentFragment(), node, lastNode;
      while(node = el.firstChild) {
        lastNode = frag.appendChild(node)
      }
      range.insertNode(frag);
      if(lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range)
      }
    }
    setTimeout(function() {
      self.getSelection().scrollIntoView()
    }, 50);
    saveLater.call(self)
  }});
  Editor.decorate = function(textarea, cfg) {
    cfg = cfg || {};
    textarea = $(textarea);
    var textareaAttrs = cfg.textareaAttrs = cfg.textareaAttrs || {};
    var width = textarea.style("width");
    var height = textarea.style("height");
    var name = textarea.attr("name");
    if(width) {
      cfg.width = cfg.width || width
    }
    if(height) {
      cfg.height = cfg.height || height
    }
    if(name) {
      textareaAttrs.name = name
    }
    cfg.data = cfg.data || textarea.val();
    cfg.elBefore = textarea;
    var editor = (new Editor(cfg)).render();
    textarea.remove();
    return editor
  };
  Editor._initIframe = function(id) {
    var self = focusManager.getInstance(id), $doc = self.get("document"), doc = $doc[0], script = $doc.one("#ke_active_script");
    script.remove();
    fixByBindIframeDoc(self);
    var body = doc.body;
    var $body = $(body);
    if(IS_IE) {
      body.hideFocus = TRUE;
      body.disabled = TRUE;
      body.contentEditable = TRUE;
      body.removeAttribute("disabled")
    }else {
      setTimeout(function() {
        if(UA.gecko || UA.opera) {
          body.contentEditable = TRUE
        }else {
          if(UA.webkit) {
            body.parentNode.contentEditable = TRUE
          }else {
            doc.designMode = "on"
          }
        }
      }, 0)
    }
    if(UA.gecko || UA.opera) {
      var htmlElement = doc.documentElement;
      $(htmlElement).on("mousedown", function(evt) {
        var t = evt.target;
        if(t === htmlElement) {
          if(UA.gecko) {
            blinkCursor(doc, FALSE)
          }
          self.activateGecko()
        }
      })
    }
    setTimeout(function() {
      if(IS_IE) {
        setTimeout(function() {
          if(doc) {
            body.runtimeStyle.marginBottom = "0px";
            body.runtimeStyle.marginBottom = ""
          }
        }, 1E3)
      }
    }, 0);
    setTimeout(function() {
      self.__docReady = 1;
      self.fire("docReady");
      var disableObjectResizing = self.get("disableObjectResizing"), disableInlineTableEditing = self.get("disableInlineTableEditing");
      if(disableObjectResizing || disableInlineTableEditing) {
        try {
          doc.execCommand("enableObjectResizing", FALSE, !disableObjectResizing);
          doc.execCommand("enableInlineTableEditing", FALSE, !disableInlineTableEditing)
        }catch(e) {
          $body.on(IS_IE ? "resizestart" : "resize", function(evt) {
            var t = new Node(evt.target);
            if(disableObjectResizing || t.nodeName() === "table" && disableInlineTableEditing) {
              evt.preventDefault()
            }
          })
        }
      }
    }, 10)
  };
  function blinkCursor(doc, retry) {
    var body = doc.body;
    tryThese(function() {
      doc.designMode = "on";
      setTimeout(function go() {
        doc.designMode = "off";
        body.focus();
        if(!go.retry) {
          go.retry = TRUE
        }
      }, 50)
    }, function() {
      doc.designMode = "off";
      body.setAttribute("contentEditable", false);
      body.setAttribute("contentEditable", true);
      if(!retry) {
        blinkCursor(doc, 1)
      }
    })
  }
  function fixByBindIframeDoc(self) {
    var textarea = self.get("textarea")[0], $win = self.get("window"), $doc = self.get("document"), doc = $doc[0];
    if(UA.webkit) {
      $doc.on("click", function(ev) {
        var control = new Node(ev.target);
        if(S.inArray(control.nodeName(), ["input", "select"])) {
          ev.preventDefault()
        }
      });
      $doc.on("mouseup", function(ev) {
        var control = new Node(ev.target);
        if(S.inArray(control.nodeName(), ["input", "textarea"])) {
          ev.preventDefault()
        }
      })
    }
    if(UA.gecko || UA.ie || UA.opera) {
      var focusGrabber;
      focusGrabber = (new Node("<span " + 'tabindex="-1" ' + 'style="position:absolute; left:-10000"' + ' role="presentation"' + "></span>")).insertAfter(textarea);
      focusGrabber.on("focus", function() {
        self.focus()
      });
      self.activateGecko = function() {
        if(UA.gecko && self.__iframeFocus) {
          focusGrabber[0].focus()
        }
      };
      self.on("destroy", function() {
        focusGrabber.detach();
        focusGrabber.remove()
      })
    }
    $win.on("focus", function() {
      if(UA.gecko) {
        blinkCursor(doc, FALSE)
      }else {
        if(UA.opera) {
          doc.body.focus()
        }
      }
      self.notifySelectionChange()
    });
    if(UA.gecko) {
      $doc.on("mousedown", function() {
        if(!self.__iframeFocus) {
          blinkCursor(doc, FALSE)
        }
      })
    }
    if(IS_IE) {
      $doc.on("keydown", function(evt) {
        var keyCode = evt.keyCode;
        if(keyCode in {8:1, 46:1}) {
          var sel = self.getSelection(), control = sel.getSelectedElement();
          if(control) {
            self.execCommand("save");
            var bookmark = sel.getRanges()[0].createBookmark();
            control.remove();
            sel.selectBookmarks([bookmark]);
            self.execCommand("save");
            evt.preventDefault()
          }
        }
      });
      if(doc.compatMode === "CSS1Compat") {
        var pageUpDownKeys = {33:1, 34:1};
        $doc.on("keydown", function(evt) {
          if(evt.keyCode in pageUpDownKeys) {
            setTimeout(function() {
              self.getSelection().scrollIntoView()
            }, 0)
          }
        })
      }
    }
    if(UA.webkit) {
      $doc.on("mousedown", function(ev) {
        var control = new Node(ev.target);
        if(S.inArray(control.nodeName(), ["img", "hr", "input", "textarea", "select"])) {
          self.getSelection().selectElement(control)
        }
      })
    }
    if(UA.gecko) {
      $doc.on("dragstart", function(ev) {
        var control = new Node(ev.target);
        if(control.nodeName() === "img" && /ke_/.test(control[0].className)) {
          ev.preventDefault()
        }
      })
    }
    focusManager.add(self)
  }
  function prepareIFrameHTML(id, customStyle, customLink, data) {
    var links = "", i;
    var innerCssFile = Utils.debugUrl("theme/editor-iframe.css");
    customLink = customLink.concat([]);
    customLink.unshift(innerCssFile);
    for(i = 0;i < customLink.length;i++) {
      links += S.substitute('<link href="' + '{href}" rel="stylesheet" />', {href:customLink[i]})
    }
    return S.substitute(iframeContentTpl, {doctype:S.UA.ieMode === 8 ? '<meta http-equiv="X-UA-Compatible" content="IE=7" />' : "", title:"{title}", links:links, style:"<style>" + customStyle + "</style>", data:data || "", script:id ? '<script id="ke_active_script">' + ($(window).isCustomDomain() ? 'document.domain="' + document.domain + '";' : "") + "parent.KISSY.require('editor')._initIframe(\"" + id + '");' + "<\/script>" : ""})
  }
  var saveLater = S.buffer(function() {
    this.execCommand("save")
  }, 50);
  function setUpIFrame(self, data) {
    var iframe = self.get("iframe"), html = prepareIFrameHTML(self.get("id"), self.get("customStyle"), self.get("customLink"), data), iframeDom = iframe[0], win = iframeDom.contentWindow, doc;
    iframe.__loaded = 1;
    try {
      doc = win.document
    }catch(e) {
      iframeDom.src = iframeDom.src;
      if(IS_IE < 7) {
        setTimeout(run, 10);
        return
      }
    }
    run();
    function run() {
      doc = win.document;
      self.setInternal("document", new Node(doc));
      self.setInternal("window", new Node(win));
      iframe.detach();
      doc.open("text/html", "replace");
      doc.write(html);
      doc.close()
    }
  }
  function createIframe(self, afterData) {
    var iframeSrc = $(window).getEmptyIframeSrc() || "";
    if(iframeSrc) {
      iframeSrc = ' src="' + iframeSrc + '" '
    }
    var iframe = new Node(S.substitute(IFRAME_TPL, {iframeSrc:iframeSrc, prefixCls:self.get("prefixCls")})), textarea = self.get("textarea");
    if(textarea.hasAttr("tabindex")) {
      iframe.attr("tabindex", UA.webkit ? -1 : textarea.attr("tabindex"))
    }
    textarea.parent().prepend(iframe);
    self.set("iframe", iframe);
    self.__docReady = 0;
    if(UA.gecko && !iframe.__loaded) {
      iframe.on("load", function() {
        setUpIFrame(self, afterData)
      }, self)
    }else {
      setUpIFrame(self, afterData)
    }
  }
  function clearIframeDocContent(self) {
    if(!self.get("iframe")) {
      return
    }
    var iframe = self.get("iframe"), win = self.get("window"), doc = self.get("document"), domDoc = doc[0], documentElement = $(domDoc.documentElement), body = $(domDoc.body);
    S.each([doc, documentElement, body, win], function(el) {
      el.detach()
    });
    iframe.remove()
  }
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:16
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 html-parser/dtd
 html-parser/lexer/cursor
 html-parser/lexer/index
 html-parser/lexer/page
 html-parser/nodes/node
 html-parser/nodes/text
 html-parser/nodes/cdata
 html-parser/utils
 html-parser/nodes/attribute
 html-parser/nodes/tag
 html-parser/nodes/comment
 html-parser/lexer/lexer
 html-parser/nodes/fragment
 html-parser/nodes/document
 html-parser/scanners/special-scanners
 html-parser/scanners/tag-scanner
 html-parser/scanners/cdata-scanner
 html-parser/scanners/quote-cdata-scanner
 html-parser/scanners/textarea-scanner
 html-parser/scanner
 html-parser/parser
 html-parser/writer/basic
 html-parser/writer/beautify
 html-parser/writer/minify
 html-parser/writer/filter
 html-parser
*/

KISSY.add("html-parser/dtd", [], function(S) {
  var merge = S.merge, A = {isindex:1, fieldset:1}, B = {input:1, button:1, select:1, textarea:1, label:1}, C = merge({a:1}, B), D = merge({iframe:1}, C), E = {hr:1, ul:1, menu:1, div:1, blockquote:1, noscript:1, table:1, center:1, address:1, dir:1, pre:1, h5:1, dl:1, h4:1, noframes:1, h6:1, ol:1, h1:1, h3:1, h2:1}, F = {ins:1, del:1, script:1, style:1}, G = merge({b:1, acronym:1, bdo:1, "var":1, "#text":1, abbr:1, code:1, br:1, i:1, cite:1, kbd:1, u:1, strike:1, s:1, tt:1, strong:1, q:1, samp:1, 
  em:1, dfn:1, span:1}, F), H = merge({sub:1, img:1, object:1, sup:1, basefont:1, map:1, applet:1, font:1, big:1, small:1}, G), I = merge({p:1}, H), J = merge({iframe:1}, H, B), K = {img:1, noscript:1, br:1, kbd:1, center:1, button:1, basefont:1, h5:1, h4:1, samp:1, h6:1, ol:1, h1:1, h3:1, h2:1, form:1, font:1, "#text":1, select:1, menu:1, ins:1, abbr:1, label:1, code:1, table:1, script:1, cite:1, input:1, iframe:1, strong:1, textarea:1, noframes:1, big:1, small:1, span:1, hr:1, sub:1, bdo:1, "var":1, 
  div:1, object:1, sup:1, strike:1, dir:1, map:1, dl:1, applet:1, del:1, isindex:1, fieldset:1, ul:1, b:1, acronym:1, a:1, blockquote:1, i:1, u:1, s:1, tt:1, address:1, q:1, pre:1, p:1, em:1, dfn:1}, L = merge({a:1}, J), M = {tr:1}, N = {"#text":1}, O = merge({param:1}, K), P = merge({form:1}, A, D, E, I), Q = {li:1}, R = {style:1, script:1}, headTags = {base:1, link:1, meta:1, title:1}, T = merge(headTags, R), U = {head:1, body:1}, V = {html:1};
  var block = {address:1, blockquote:1, center:1, dir:1, div:1, dl:1, fieldset:1, form:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, hr:1, isindex:1, menu:1, noframes:1, ol:1, p:1, pre:1, table:1, ul:1};
  var dtd = {$nonBodyContent:merge(V, U, headTags), $block:block, $blockLimit:{body:1, div:1, td:1, th:1, caption:1, form:1}, $inline:L, $body:merge({script:1, style:1}, block), $cdata:{script:1, style:1}, $empty:{area:1, base:1, br:1, col:1, hr:1, img:1, input:1, link:1, meta:1, param:1}, $listItem:{dd:1, dt:1, li:1}, $list:{ul:1, ol:1, dl:1}, $nonEditable:{applet:1, button:1, embed:1, iframe:1, map:1, object:1, option:1, script:1, textarea:1, param:1}, $removeEmpty:{abbr:1, acronym:1, address:1, 
  b:1, bdo:1, big:1, cite:1, code:1, del:1, dfn:1, em:1, font:1, i:1, ins:1, label:1, kbd:1, q:1, s:1, samp:1, small:1, span:1, strike:1, strong:1, sub:1, sup:1, tt:1, u:1, "var":1}, $tabIndex:{a:1, area:1, button:1, input:1, object:1, select:1, textarea:1}, $tableContent:{caption:1, col:1, colgroup:1, tbody:1, td:1, tfoot:1, th:1, thead:1, tr:1}, html:U, head:T, style:N, body:P, base:{}, link:{}, meta:{}, title:N, col:{}, tr:{td:1, th:1}, img:{}, colgroup:{col:1}, noscript:P, td:P, br:{}, th:P, 
  center:P, kbd:L, button:merge(I, E), basefont:{}, h5:L, h4:L, samp:L, h6:L, ol:Q, h1:L, h3:L, option:N, h2:L, form:merge(A, D, E, I), select:{optgroup:1, option:1}, font:L, ins:L, menu:Q, abbr:L, label:L, table:{thead:1, col:1, tbody:1, tr:1, colgroup:1, caption:1, tfoot:1}, code:L, script:N, tfoot:M, cite:L, li:P, input:{}, iframe:P, strong:L, textarea:N, noframes:P, big:L, small:L, span:L, hr:{}, dt:L, sub:L, optgroup:{option:1}, param:{}, bdo:L, "var":L, div:P, object:O, sup:L, dd:P, strike:L, 
  area:{}, dir:Q, map:merge({area:1, form:1, p:1}, A, F, E), applet:O, dl:{dt:1, dd:1}, del:L, isindex:{}, fieldset:merge({legend:1}, K), thead:M, ul:Q, acronym:L, b:L, a:J, blockquote:P, caption:L, i:L, u:L, tbody:M, s:L, address:merge(D, I), tt:L, legend:L, q:L, pre:merge(G, C), p:L, em:L, dfn:L};
  (function() {
    var i, html5Tags = ["article", "figure", "nav", "aside", "section", "footer"];
    for(var p in dtd) {
      for(var p2 in dtd[p]) {
        if(p2 === "div") {
          for(i = 0;i < html5Tags.length;i++) {
            dtd[p][html5Tags[i]] = dtd[p][p2]
          }
        }
      }
    }
    for(i = 0;i < html5Tags.length;i++) {
      dtd[html5Tags[i]] = dtd.div
    }
    dtd.$empty["!doctype"] = 1
  })();
  return dtd
});
KISSY.add("html-parser/lexer/cursor", [], function() {
  function Cursor(offset) {
    this.position = offset || 0
  }
  Cursor.prototype = {constructor:Cursor, advance:function() {
    this.position++
  }, clone:function() {
    var c = new Cursor;
    c.position = this.position;
    return c
  }, retreat:function() {
    this.position = Math.max(--this.position, 0)
  }};
  return Cursor
});
KISSY.add("html-parser/lexer/index", [], function() {
  function Index() {
    this.lineCursors = []
  }
  Index.prototype = {constructor:Index, add:function(cursor) {
    var index = indexOfCursorForInsert(this.lineCursors, cursor);
    if(index !== -1) {
      this.lineCursors.splice(index, 0, cursor.clone())
    }
  }, remove:function(cursor) {
    var cs = this.lineCursors;
    var index = indexOfCursor(this.lineCursors, cursor);
    if(index !== -1) {
      cs.splice(index, 1)
    }
  }, row:function(cursor) {
    var cs = this.lineCursors;
    for(var i = 0;i < cs.length;i++) {
      if(cs[i].position > cursor.position) {
        return i - 1
      }
    }
    return i
  }, col:function(cursor) {
    var linePosition = 0, lineCursor = this.lineCursors[this.row(cursor) - 1];
    if(lineCursor) {
      linePosition = lineCursor.position
    }
    return cursor.position - linePosition
  }};
  function indexOfCursor(cs, c) {
    var cPosition = c.position;
    for(var i = 0;i < cs.length;i++) {
      var iPosition = cs[i].position;
      if(iPosition === cPosition) {
        return i
      }else {
        if(iPosition < cPosition) {
          return-1
        }
      }
    }
    return-1
  }
  function indexOfCursorForInsert(cs, c) {
    var cPosition = c.position;
    for(var i = 0;i < cs.length;i++) {
      var iPosition = cs[i].position;
      if(iPosition === cPosition) {
        return-1
      }else {
        if(iPosition > cPosition) {
          return i
        }
      }
    }
    return i
  }
  return Index
});
KISSY.add("html-parser/lexer/page", ["./index"], function(S, require) {
  var Index = require("./index");
  function Page(source) {
    this.source = source;
    this.lineIndex = new Index
  }
  Page.prototype = {constructor:Page, getChar:function(cursor) {
    var source = this.source;
    var i = cursor.position;
    if(i >= source.length) {
      return-1
    }
    var ret = source.charAt(i);
    cursor.advance();
    if("\r" === ret) {
      ret = "\n";
      i = cursor.position;
      var next = source.charAt(i);
      if(next === "\n") {
        cursor.advance()
      }
    }
    if("\n" === ret) {
      this.lineIndex.add(cursor)
    }
    return ret
  }, ungetChar:function(cursor) {
    var source = this.source;
    cursor.retreat();
    var i = cursor.position, ch = source.charAt(i);
    if(ch === "\n" && 0 !== i) {
      ch = source.charAt(i - 1);
      if("\r" === ch) {
        cursor.retreat()
      }
    }
  }, getText:function(start, end) {
    return this.source.slice(start, end)
  }, row:function(cursor) {
    return this.lineIndex.row(cursor)
  }, col:function(cursor) {
    return this.lineIndex.col(cursor)
  }};
  return Page
});
KISSY.add("html-parser/nodes/node", [], function() {
  function lineCount(str) {
    var i = 0;
    str.replace(/\n/g, function() {
      i++
    });
    return i
  }
  function Node(page, startPosition, endPosition) {
    this.parentNode = null;
    this.page = page;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.nodeName = null;
    this.previousSibling = null;
    this.nextSibling = null
  }
  Node.prototype = {constructor:Node, getStartLine:function() {
    if(this.page) {
      if("startLine" in this) {
        return this.startLine
      }
      this.startLine = lineCount(this.page.getText(0, this.startPosition))
    }
    return-1
  }, getEndLine:function() {
    if(this.page) {
      if("endLine" in this) {
        return this.endLine
      }
      this.endLine = lineCount(this.page.getText(0, this.endPosition))
    }
    return-1
  }, toHtml:function() {
    if(this.page && this.page.getText) {
      return this.page.getText(this.startPosition, this.endPosition)
    }
    return""
  }, toDebugString:function() {
    var ret = [], self = this;
    ret.push(self.nodeName + "  [ " + self.startPosition + "|" + self.getStartLine() + " : " + self.endPosition + "|" + self.getEndLine() + " ]\n");
    ret.push(self.toHtml());
    return ret.join("")
  }};
  return Node
});
KISSY.add("html-parser/nodes/text", ["./node"], function(S, require) {
  var Node = require("./node");
  function Text(v) {
    if(typeof v === "string") {
      this.nodeValue = v;
      Text.superclass.constructor.apply(this, [null, -1, -1])
    }else {
      Text.superclass.constructor.apply(this, arguments);
      this.nodeValue = this.toHtml()
    }
    this.nodeType = 3;
    this.nodeName = "#text"
  }
  S.extend(Text, Node, {writeHtml:function(writer, filter) {
    var ret;
    if(!filter || (ret = filter.onText(this)) !== false) {
      if(ret) {
        if(this !== ret) {
          ret.writeHtml(writer, filter);
          return
        }
      }
      writer.text(this.toHtml())
    }
  }, toHtml:function() {
    if(this.nodeValue) {
      return this.nodeValue
    }else {
      return Text.superclass.toHtml.apply(this, arguments)
    }
  }});
  return Text
});
KISSY.add("html-parser/nodes/cdata", ["./text"], function(S, require) {
  var Text = require("./text");
  function CData() {
    CData.superclass.constructor.apply(this, arguments);
    this.nodeType = 4;
    this.nodeName = "#cdata"
  }
  S.extend(CData, Text, {writeHtml:function(writer, filter) {
    var ret;
    if(!filter || (ret = filter.onCData(this)) !== false) {
      if(ret) {
        if(this !== ret) {
          ret.writeHtml(writer, filter);
          return
        }
      }
      writer.cdata(this.toHtml())
    }
  }});
  return CData
});
KISSY.add("html-parser/utils", [], function() {
  return{isBooleanAttribute:function(attrName) {
    return/^(?:checked|disabled|selected|readonly|defer|multiple|nohref|noshape|nowrap|noresize|compact|ismap)$/i.test(attrName)
  }, collapseWhitespace:function(str) {
    return str.replace(/[\s\xa0]+/g, " ")
  }, isLetter:function(ch) {
    return"a" <= ch && "z" >= ch || "A" <= ch && "Z" >= ch
  }, isValidAttributeNameStartChar:function(ch) {
    return!this.isWhitespace(ch) && ch !== '"' && ch !== "'" && ch !== ">" && ch !== "" < "" && ch !== "/" && ch !== "="
  }, isWhitespace:function(ch) {
    return/^[\s\xa0]$/.test(ch)
  }}
});
KISSY.add("html-parser/nodes/attribute", [], function(S) {
  function Attribute(name, assignment, value, quote) {
    this.nodeType = 2;
    this.name = name;
    this.assignment = assignment;
    this.value = value;
    this.quote = quote
  }
  S.augment(Attribute, {clone:function() {
    var ret = new Attribute;
    S.mix(ret, this);
    return ret
  }, equals:function(other) {
    return this.name === other.name && this.value === other.value && this.nodeType === other.nodeType
  }});
  Attribute.prototype.clone = function() {
    var ret = new Attribute;
    S.mix(ret, this);
    return ret
  };
  return Attribute
});
KISSY.add("html-parser/nodes/tag", ["./node", "./attribute", "../dtd"], function(S, require) {
  var Node = require("./node");
  var Attribute = require("./attribute");
  var Dtd = require("../dtd");
  function createTag(self, tagName, attrs) {
    self.nodeName = self.tagName = tagName.toLowerCase();
    self._updateSelfClosed();
    S.each(attrs, function(v, n) {
      self.setAttribute(n, v)
    })
  }
  function Tag(page, startPosition, endPosition, attributes) {
    var self = this;
    self.childNodes = [];
    self.firstChild = null;
    self.lastChild = null;
    self.attributes = attributes || [];
    self.nodeType = 1;
    if(typeof page === "string") {
      createTag.apply(null, [self].concat(S.makeArray(arguments)))
    }else {
      Tag.superclass.constructor.apply(self, arguments);
      attributes = self.attributes;
      if(attributes[0]) {
        self.nodeName = attributes[0].name.toLowerCase();
        self.tagName = self.nodeName.replace(/\//, "");
        self._updateSelfClosed();
        attributes.splice(0, 1)
      }
      var lastAttr = attributes[attributes.length - 1], lastSlash = !!(lastAttr && /\/$/.test(lastAttr.name));
      if(lastSlash) {
        attributes.length = attributes.length - 1
      }
      self.isSelfClosed = self.isSelfClosed || lastSlash;
      self.closed = self.isSelfClosed
    }
    self.closedStartPosition = -1;
    self.closedEndPosition = -1
  }
  function refreshChildNodes(self) {
    var c = self.childNodes;
    self.firstChild = c[0];
    self.lastChild = c[c.length - 1];
    if(c.length >= 1) {
      c[0].nextSibling = c[0].nextSibling = null;
      c[0].parentNode = self
    }
    if(c.length > 1) {
      for(var i = 0;i < c.length - 1;i++) {
        c[i].nextSibling = c[i + 1];
        c[i + 1].previousSibling = c[i];
        c[i + 1].parentNode = self
      }
      c[c.length - 1].nextSibling = null
    }
  }
  S.extend(Tag, Node, {_updateSelfClosed:function() {
    var self = this;
    self.isSelfClosed = !!Dtd.$empty[self.nodeName];
    if(!self.isSelfClosed) {
      self.isSelfClosed = /\/$/.test(self.nodeName)
    }
    self.closed = self.isSelfClosed
  }, clone:function() {
    var ret = new Tag, attrs = [];
    S.each(this.attributes, function(a) {
      attrs.push(a.clone())
    });
    S.mix(ret, {childNodes:[], firstChild:null, lastChild:null, attributes:attrs, nodeType:this.nodeType, nodeName:this.nodeName, tagName:this.tagName, isSelfClosed:this.isSelfClosed, closed:this.closed, closedStartPosition:this.closedStartPosition, closedEndPosition:this.closedEndPosition});
    return ret
  }, setTagName:function(v) {
    var self = this;
    self.nodeName = self.tagName = v;
    if(v) {
      self._updateSelfClosed()
    }
  }, equals:function(tag) {
    if(!tag || this.nodeName !== tag.nodeName) {
      return 0
    }
    if(this.nodeType !== tag.nodeType) {
      return 0
    }
    if(this.attributes.length !== tag.attributes.length) {
      return 0
    }
    for(var i = 0;i < this.attributes.length;i++) {
      if(!this.attributes[i].equals(tag.attributes[i])) {
        return 0
      }
    }
    return 1
  }, isEndTag:function() {
    return/^\//.test(this.nodeName)
  }, appendChild:function(node) {
    this.childNodes.push(node);
    refreshChildNodes(this)
  }, replace:function(ref) {
    var silbing = ref.parentNode.childNodes, index = S.indexOf(ref, silbing);
    silbing[index] = this;
    refreshChildNodes(ref.parentNode)
  }, replaceChild:function(newC, refC) {
    var self = this, childNodes = self.childNodes;
    var index = S.indexOf(refC, childNodes);
    childNodes[index] = newC;
    refreshChildNodes(self)
  }, prepend:function(node) {
    this.childNodes.unshift(node);
    refreshChildNodes(this)
  }, insertBefore:function(ref) {
    var silbing = ref.parentNode.childNodes, index = S.indexOf(ref, silbing);
    silbing.splice(index, 0, this);
    refreshChildNodes(ref.parentNode)
  }, insertAfter:function(ref) {
    var silbing = ref.parentNode.childNodes, index = S.indexOf(ref, silbing);
    if(index === silbing.length - 1) {
      ref.parentNode.appendChild(this)
    }else {
      this.insertBefore(ref.parentNode.childNodes[[index + 1]])
    }
  }, empty:function() {
    this.childNodes = [];
    refreshChildNodes(this)
  }, removeChild:function(node) {
    var silbing = node.parentNode.childNodes, index = S.indexOf(node, silbing);
    silbing.splice(index, 1);
    refreshChildNodes(node.parentNode)
  }, getAttribute:function(name) {
    var attr = findAttributeByName(this.attributes, name);
    return attr && attr.value
  }, setAttribute:function(name, value) {
    var attr = findAttributeByName(this.attributes, name);
    if(attr) {
      attr.value = value
    }else {
      this.attributes.push(new Attribute(name, "=", value, '"'))
    }
  }, removeAttribute:function(name) {
    var attr = findAttributeByName(this.attributes, name);
    if(attr) {
      var index = S.indexOf(attr, this.attributes);
      this.attributes.splice(index, 1)
    }
  }, filterChildren:function() {
    var self = this;
    if(!self.isChildrenFiltered) {
      var writer = new (S.require("html-parser/writer/basic"));
      self._writeChildrenHTML(writer);
      var parser = new (S.require("html-parser/parser"))(writer.getHtml()), children = parser.parse().childNodes;
      self.empty();
      S.each(children, function(c) {
        self.appendChild(c)
      });
      self.isChildrenFiltered = 1
    }
  }, writeHtml:function(writer, filter) {
    var el = this, tmp, attrName, tagName = el.tagName;
    if(tagName === "!doctype") {
      writer.append(this.toHtml() + "\n");
      return
    }
    el.__filter = filter;
    el.isChildrenFiltered = 0;
    if(filter) {
      if(!(tagName = filter.onTagName(tagName))) {
        return
      }
      el.tagName = tagName;
      tmp = filter.onTag(el);
      if(tmp === false) {
        return
      }
      if(tmp) {
        el = tmp
      }
      if(el.nodeType !== 1) {
        el.writeHtml(writer, filter);
        return
      }
      if(!el.tagName) {
        el._writeChildrenHTML(writer);
        return
      }
    }
    writer.openTag(el);
    var attributes = el.attributes;
    for(var i = 0;i < attributes.length;i++) {
      var attr = attributes[i];
      attrName = attr.name;
      if(filter) {
        if(!(attrName = filter.onAttributeName(attrName, el))) {
          continue
        }
        attr.name = attrName;
        if(filter.onAttribute(attr, el) === false) {
          continue
        }
      }
      writer.attribute(attr, el)
    }
    writer.openTagClose(el);
    if(!el.isSelfClosed) {
      el._writeChildrenHTML(writer);
      writer.closeTag(el)
    }
  }, _writeChildrenHTML:function(writer) {
    var self = this, filter = self.isChildrenFiltered ? 0 : self.__filter;
    S.each(self.childNodes, function(child) {
      child.writeHtml(writer, filter)
    })
  }});
  function findAttributeByName(attributes, name) {
    if(attributes && attributes.length) {
      for(var i = 0;i < attributes.length;i++) {
        if(attributes[i].name === name) {
          return attributes[i]
        }
      }
    }
    return null
  }
  return Tag
});
KISSY.add("html-parser/nodes/comment", ["./text"], function(S, require) {
  var Text = require("./text");
  function Comment() {
    Comment.superclass.constructor.apply(this, arguments);
    this.nodeType = 8;
    this.nodeName = "#comment"
  }
  S.extend(Comment, Text, {writeHtml:function(writer, filter) {
    var ret;
    if(!filter || (ret = filter.onComment(this)) !== false) {
      if(ret) {
        if(this !== ret) {
          ret.writeHtml(writer, filter);
          return
        }
      }
      writer.comment(this.toHtml())
    }
  }, toHtml:function() {
    if(this.nodeValue) {
      return this.nodeValue
    }else {
      var value = Text.superclass.toHtml.apply(this, arguments);
      return value.substring(4, value.length - 3)
    }
  }});
  return Comment
});
KISSY.add("html-parser/lexer/lexer", ["./cursor", "./page", "../nodes/text", "../nodes/cdata", "../utils", "../nodes/attribute", "../nodes/tag", "../nodes/comment"], function(S, require) {
  var Cursor = require("./cursor");
  var Page = require("./page");
  var TextNode = require("../nodes/text");
  var CData = require("../nodes/cdata");
  var Utils = require("../utils");
  var Attribute = require("../nodes/attribute");
  var TagNode = require("../nodes/tag");
  var CommentNode = require("../nodes/comment");
  function Lexer(text, cfg) {
    var self = this;
    self.page = new Page(text);
    self.cursor = new Cursor;
    self.nodeFactory = this;
    this.cfg = cfg || {}
  }
  Lexer.prototype = {constructor:Lexer, setPosition:function(p) {
    this.cursor.position = p
  }, getPosition:function() {
    return this.cursor.position
  }, nextNode:function(quoteSmart) {
    var start, ch, ret, cursor = this.cursor, page = this.page;
    start = cursor.position;
    ch = page.getChar(cursor);
    switch(ch) {
      case -1:
        ret = null;
        break;
      case "<":
        ch = page.getChar(cursor);
        if(ch === -1) {
          ret = this.makeString(start, cursor.position)
        }else {
          if(ch === "/" || Utils.isLetter(ch)) {
            page.ungetChar(cursor);
            ret = this.parseTag(start)
          }else {
            if("!" === ch || "?" === ch) {
              ch = page.getChar(cursor);
              if(ch === -1) {
                ret = this.makeString(start, cursor.position)
              }else {
                if(">" === ch) {
                  ret = this.makeComment(start, cursor.position)
                }else {
                  page.ungetChar(cursor);
                  if("-" === ch) {
                    ret = this.parseComment(start, quoteSmart)
                  }else {
                    page.ungetChar(cursor);
                    ret = this.parseTag(start)
                  }
                }
              }
            }else {
              page.ungetChar(cursor);
              ret = this.parseString(start, quoteSmart)
            }
          }
        }
        break;
      default:
        page.ungetChar(cursor);
        ret = this.parseString(start, quoteSmart);
        break
    }
    return ret
  }, makeComment:function(start, end) {
    var length, ret;
    length = end - start;
    if(0 !== length) {
      if(2 > length) {
        return this.makeString(start, end)
      }
      ret = this.nodeFactory.createCommentNode(this.page, start, end)
    }else {
      ret = null
    }
    return ret
  }, makeString:function(start, end) {
    var ret = null, l;
    l = end - start;
    if(l > 0) {
      ret = this.nodeFactory.createStringNode(this.page, start, end)
    }
    return ret
  }, makeCData:function(start, end) {
    var ret = null, l;
    l = end - start;
    if(l > 0) {
      ret = this.nodeFactory.createCDataNode(this.page, start, end)
    }
    return ret
  }, makeTag:function(start, end, attributes) {
    var length, ret;
    length = end - start;
    if(0 !== length) {
      if(2 > length) {
        return this.makeString(start, end)
      }
      ret = this.nodeFactory.createTagNode(this.page, start, end, attributes)
    }else {
      ret = null
    }
    return ret
  }, createTagNode:function(page, start, end, attributes) {
    return new TagNode(page, start, end, attributes)
  }, createStringNode:function(page, start, end) {
    return new TextNode(page, start, end)
  }, createCDataNode:function(page, start, end) {
    return new CData(page, start, end)
  }, createCommentNode:function(page, start, end) {
    return new CommentNode(page, start, end)
  }, parseTag:function(start) {
    var done, bookmarks = [], attributes = [], ch, cfg = this.cfg, strict = cfg.strict, checkError = S.noop, page = this.page, state = 0, cursor = this.cursor;
    if(strict) {
      checkError = function() {
        if(strict && ch === -1 && attributes.length) {
          throw new Error(attributes[0].name + " syntax error at row " + (page.row(cursor) + 1) + " , col " + (page.col(cursor) + 1));
        }
      }
    }
    bookmarks[0] = cursor.position;
    while(!done) {
      bookmarks[state + 1] = cursor.position;
      ch = page.getChar(cursor);
      switch(state) {
        case 0:
          if(ch === -1 || ">" === ch || "<" === ch) {
            if("<" === ch) {
              page.ungetChar(cursor);
              bookmarks[state + 1] = cursor.position
            }
            done = true
          }else {
            if(!attributes.length) {
              if(ch === "/" || Utils.isValidAttributeNameStartChar(ch)) {
                state = 1
              }
            }else {
              if(ch === "/" || Utils.isValidAttributeNameStartChar(ch)) {
                state = 1
              }
            }
          }
          break;
        case 1:
          if(-1 === ch || ">" === ch || "<" === ch) {
            if("<" === ch) {
              page.ungetChar(cursor);
              bookmarks[state + 1] = cursor.getPosition
            }
            this.standalone(attributes, bookmarks);
            done = true
          }else {
            if(Utils.isWhitespace(ch)) {
              bookmarks[6] = bookmarks[2];
              state = 6
            }else {
              if("=" === ch) {
                state = 2
              }
            }
          }
          break;
        case 2:
          if(-1 === ch || ">" === ch) {
            this.standalone(attributes, bookmarks);
            done = true
          }else {
            if("'" === ch) {
              state = 4;
              bookmarks[4] = bookmarks[3]
            }else {
              if('"' === ch) {
                state = 5;
                bookmarks[5] = bookmarks[3]
              }else {
                if(!Utils.isWhitespace(ch)) {
                  state = 3
                }
              }
            }
          }
          break;
        case 3:
          if(-1 === ch || ">" === ch) {
            this.naked(attributes, bookmarks);
            done = true
          }else {
            if(Utils.isWhitespace(ch)) {
              this.naked(attributes, bookmarks);
              bookmarks[0] = bookmarks[4];
              state = 0
            }
          }
          break;
        case 4:
          if(-1 === ch) {
            this.singleQuote(attributes, bookmarks);
            done = true
          }else {
            if("'" === ch) {
              this.singleQuote(attributes, bookmarks);
              bookmarks[0] = bookmarks[5] + 1;
              state = 0
            }
          }
          break;
        case 5:
          if(-1 === ch) {
            this.doubleQuote(attributes, bookmarks);
            done = true
          }else {
            if('"' === ch) {
              this.doubleQuote(attributes, bookmarks);
              bookmarks[0] = bookmarks[6] + 1;
              state = 0
            }
          }
          break;
        case 6:
          if(-1 === ch) {
            this.standalone(attributes, bookmarks);
            bookmarks[0] = bookmarks[6];
            page.ungetChar(cursor);
            state = 0
          }else {
            if("=" === ch) {
              bookmarks[2] = bookmarks[6];
              bookmarks[3] = bookmarks[7];
              state = 2
            }else {
              if(!Utils.isWhitespace(ch)) {
                this.standalone(attributes, bookmarks);
                bookmarks[0] = bookmarks[6];
                page.ungetChar(cursor);
                state = 0
              }
            }
          }
          break;
        default:
          throw new Error("how ** did we get in state " + state);
      }
      checkError()
    }
    return this.makeTag(start, cursor.position, attributes)
  }, parseComment:function(start, quoteSmart) {
    var done, ch, page = this.page, cursor = this.cursor, state;
    done = false;
    state = 0;
    while(!done) {
      ch = page.getChar(cursor);
      if(-1 === ch) {
        done = true
      }else {
        switch(state) {
          case 0:
            if(">" === ch) {
              done = true
            }else {
              if("-" === ch) {
                state = 1
              }else {
                return this.parseString(start, quoteSmart)
              }
            }
            break;
          case 1:
            if("-" === ch) {
              ch = page.getChar(cursor);
              if(-1 === ch) {
                done = true
              }else {
                if(">" === ch) {
                  done = true
                }else {
                  page.ungetChar(cursor);
                  state = 2
                }
              }
            }else {
              return this.parseString(start, quoteSmart)
            }
            break;
          case 2:
            if("-" === ch) {
              state = 3
            }else {
              if(-1 === ch) {
                return this.parseString(start, quoteSmart)
              }
            }
            break;
          case 3:
            if("-" === ch) {
              state = 4
            }else {
              state = 2
            }
            break;
          case 4:
            if(">" === ch) {
              done = true
            }else {
              if(!Utils.isWhitespace(ch)) {
                state = 2
              }
            }
            break;
          default:
            throw new Error("how ** did we get in state " + state);
        }
      }
    }
    return this.makeComment(start, cursor.position)
  }, parseString:function(start, quoteSmart) {
    var done = 0, ch, page = this.page, cursor = this.cursor, quote = 0;
    while(!done) {
      ch = page.getChar(cursor);
      if(-1 === ch) {
        done = 1
      }else {
        if(quoteSmart && 0 === quote && ('"' === ch || "'" === ch)) {
          quote = ch
        }else {
          if(quoteSmart && 0 !== quote && "\\" === ch) {
            ch = page.getChar(cursor);
            if(-1 !== ch && "\\" !== ch && ch !== quote) {
              page.ungetChar(cursor)
            }
          }else {
            if(quoteSmart && ch === quote) {
              quote = 0
            }else {
              if(quoteSmart && 0 === quote && ch === "/") {
                ch = page.getChar(cursor);
                if(-1 === ch) {
                  done = 1
                }else {
                  if("/" === ch) {
                    do {
                      ch = page.getChar(cursor)
                    }while(-1 !== ch && "\n" !== ch)
                  }else {
                    if("*" === ch) {
                      do {
                        do {
                          ch = page.getChar(cursor)
                        }while(-1 !== ch && "*" !== ch);
                        ch = page.getChar(cursor);
                        if(ch === "*") {
                          page.ungetChar(cursor)
                        }
                      }while(-1 !== ch && "/" !== ch)
                    }else {
                      page.ungetChar(cursor)
                    }
                  }
                }
              }else {
                if(0 === quote && "<" === ch) {
                  ch = page.getChar(cursor);
                  if(-1 === ch) {
                    done = 1
                  }else {
                    if("/" === ch || Utils.isLetter(ch) || "!" === ch || "?" === ch) {
                      done = 1;
                      page.ungetChar(cursor);
                      page.ungetChar(cursor)
                    }else {
                      page.ungetChar(cursor)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return this.makeString(start, cursor.position)
  }, parseCDATA:function(quoteSmart, tagName) {
    var start, state, done, quote, ch, end, comment, mCursor = this.cursor, mPage = this.page;
    start = mCursor.position;
    state = 0;
    done = false;
    quote = "";
    comment = false;
    while(!done) {
      ch = mPage.getChar(mCursor);
      switch(state) {
        case 0:
          switch(ch) {
            case -1:
              done = true;
              break;
            case "'":
              if(quoteSmart && !comment) {
                if("" === quote) {
                  quote = "'"
                }else {
                  if("'" === quote) {
                    quote = ""
                  }
                }
              }
              break;
            case '"':
              if(quoteSmart && !comment) {
                if("" === quote) {
                  quote = '"'
                }else {
                  if('"' === quote) {
                    quote = ""
                  }
                }
              }
              break;
            case "\\":
              if(quoteSmart) {
                if("" !== quote) {
                  ch = mPage.getChar(mCursor);
                  if(-1 === ch) {
                    done = true
                  }else {
                    if(ch !== "\\" && ch !== quote) {
                      mPage.ungetChar(mCursor)
                    }
                  }
                }
              }
              break;
            case "/":
              if(quoteSmart) {
                if("" === quote) {
                  ch = mPage.getChar(mCursor);
                  if(-1 === ch) {
                    done = true
                  }else {
                    if("/" === ch) {
                      comment = true
                    }else {
                      if("*" === ch) {
                        do {
                          do {
                            ch = mPage.getChar(mCursor)
                          }while(-1 !== ch && "*" !== ch);
                          ch = mPage.getChar(mCursor);
                          if(ch === "*") {
                            mPage.ungetChar(mCursor)
                          }
                        }while(-1 !== ch && "/" !== ch)
                      }else {
                        mPage.ungetChar(mCursor)
                      }
                    }
                  }
                }
              }
              break;
            case "\n":
              comment = false;
              break;
            case "<":
              if(quoteSmart) {
                if("" === quote) {
                  state = 1
                }
              }else {
                state = 1
              }
              break;
            default:
              break
          }
          break;
        case 1:
          switch(ch) {
            case -1:
              done = true;
              break;
            case "/":
              if(!tagName || mPage.getText(mCursor.position, mCursor.position + tagName.length) === tagName && !mPage.getText(mCursor.position + tagName.length, mCursor.position + tagName.length + 1).match(/\w/)) {
                state = 2
              }else {
                state = 0
              }
              break;
            case "!":
              ch = mPage.getChar(mCursor);
              if(-1 === ch) {
                done = true
              }else {
                if("-" === ch) {
                  ch = mPage.getChar(mCursor);
                  if(-1 === ch) {
                    done = true
                  }else {
                    if("-" === ch) {
                      state = 3
                    }else {
                      state = 0
                    }
                  }
                }else {
                  state = 0
                }
              }
              break;
            default:
              state = 0;
              break
          }
          break;
        case 2:
          comment = false;
          if(-1 === ch) {
            done = true
          }else {
            if(Utils.isLetter(ch)) {
              done = true;
              mPage.ungetChar(mCursor);
              mPage.ungetChar(mCursor);
              mPage.ungetChar(mCursor)
            }else {
              state = 0
            }
          }
          break;
        case 3:
          comment = false;
          if(-1 === ch) {
            done = true
          }else {
            if("-" === ch) {
              ch = mPage.getChar(mCursor);
              if(-1 === ch) {
                done = true
              }else {
                if("-" === ch) {
                  ch = mPage.getChar(mCursor);
                  if(-1 === ch) {
                    done = true
                  }else {
                    if(">" === ch) {
                      state = 0
                    }else {
                      mPage.ungetChar(mCursor);
                      mPage.ungetChar(mCursor)
                    }
                  }
                }else {
                  mPage.ungetChar(mCursor)
                }
              }
            }
          }
          break;
        default:
          throw new Error("unexpected " + state);
      }
    }
    end = mCursor.position;
    return this.makeCData(start, end)
  }, singleQuote:function(attributes, bookmarks) {
    var page = this.page;
    attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2]), "=", page.getText(bookmarks[4] + 1, bookmarks[5]), "'"))
  }, doubleQuote:function(attributes, bookmarks) {
    var page = this.page;
    attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2]), "=", page.getText(bookmarks[5] + 1, bookmarks[6]), '"'))
  }, standalone:function(attributes, bookmarks) {
    var page = this.page;
    attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2])))
  }, naked:function(attributes, bookmarks) {
    var page = this.page;
    attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2]), "=", page.getText(bookmarks[3], bookmarks[4])))
  }};
  return Lexer
});
KISSY.add("html-parser/nodes/fragment", ["./tag"], function(S, require) {
  var Tag = require("./tag");
  function Fragment() {
    this.childNodes = [];
    this.nodeType = 9;
    this.nodeName = "#fragment"
  }
  S.extend(Fragment, Tag, {writeHtml:function(writer, filter) {
    this.__filter = filter;
    this.isChildrenFiltered = 0;
    if(filter) {
      filter.onFragment(this)
    }
    this._writeChildrenHTML(writer)
  }});
  return Fragment
});
KISSY.add("html-parser/nodes/document", ["./tag"], function(S, require) {
  var Tag = require("./tag");
  function Document() {
    this.childNodes = [];
    this.nodeType = 9;
    this.nodeName = "#document"
  }
  S.extend(Document, Tag, {writeHtml:function(writer, filter) {
    this.__filter = filter;
    this._writeChildrenHTML(writer)
  }});
  return Document
});
KISSY.add("html-parser/scanners/special-scanners", [], function() {
  return{}
});
KISSY.add("html-parser/scanners/tag-scanner", ["../dtd", "../nodes/tag", "./special-scanners"], function(S, require) {
  var dtd = require("../dtd");
  var Tag = require("../nodes/tag");
  var SpecialScanners = require("./special-scanners");
  var wrapper = {li:"ul", dt:"dl", dd:"dl"};
  var impliedEndTag = {dd:{dl:1}, dt:{dl:1}, li:{ul:1, ol:1}, option:{select:1}, optgroup:{select:1}};
  function fixCloseTagByDtd(tag, opts) {
    tag.closed = 1;
    if(!opts.fixByDtd) {
      return 0
    }
    var valid = 1, childNodes = [].concat(tag.childNodes);
    S.each(childNodes, function(c) {
      if(!canHasNodeAsChild(tag, c)) {
        valid = 0;
        return false
      }
    });
    if(valid) {
      return 0
    }
    var holder = tag.clone(), prev = tag, recursives = [];
    function closeCurrentHolder() {
      if(holder.childNodes.length) {
        holder.insertAfter(prev);
        prev = holder;
        holder = tag.clone()
      }
    }
    for(var i = 0;i < childNodes.length;i++) {
      var c = childNodes[i];
      if(canHasNodeAsChild(holder, c)) {
        holder.appendChild(c)
      }else {
        if(c.nodeType !== 1) {
          continue
        }
        var currentChildName = c.tagName;
        if(dtd.$listItem[currentChildName]) {
          closeCurrentHolder();
          var pTagName = wrapper[c.tagName], pTag = new Tag;
          pTag.nodeName = pTag.tagName = pTagName;
          while(i < childNodes.length) {
            if(childNodes[i].tagName === currentChildName) {
              pTag.appendChild(childNodes[i])
            }else {
              if(childNodes[i].nodeType === 3 && S.trim(childNodes[i].toHtml())) {
                break
              }
            }
            i++
          }
          pTag.insertAfter(prev);
          prev = pTag;
          i--;
          continue
        }
        closeCurrentHolder();
        if(!c.equals(holder)) {
          if(canHasNodeAsChild(c, holder)) {
            holder = tag.clone();
            S.each(c.childNodes, function(cc) {
              holder.appendChild(cc)
            });
            c.empty();
            c.insertAfter(prev);
            prev = c;
            c.appendChild(holder);
            recursives.push(holder);
            holder = tag.clone()
          }else {
            c.insertAfter(prev);
            prev = c
          }
        }else {
          c.insertAfter(prev);
          prev = c
        }
      }
    }
    if(holder.childNodes.length) {
      holder.insertAfter(prev)
    }
    tag.parentNode.removeChild(tag);
    S.each(recursives, function(r) {
      fixCloseTagByDtd(r, opts)
    });
    return 1
  }
  function canHasNodeAsChild(tag, node) {
    if(tag.nodeType === 9) {
      return 1
    }
    if(!dtd[tag.tagName]) {
      S.error("dtd[" + tag.tagName + "] === undefined!")
    }
    if(node.nodeType === 8) {
      return 1
    }
    var nodeName = node.tagName || node.nodeName;
    return!!dtd[tag.tagName][nodeName]
  }
  return{scan:function(tag, lexer, opts) {
    function closeStackOpenTag(end, from) {
      for(i = end;i > from;i--) {
        var currentStackItem = stack[i], preStackItem = stack[i - 1];
        preStackItem.appendChild(currentStackItem);
        fixCloseTagByDtd(currentStackItem, opts)
      }
      tag = stack[from];
      stack.length = from
    }
    function processImpliedEndTag(node) {
      var needFix = 0, endParentTagName;
      if(endParentTagName = impliedEndTag[node.tagName]) {
        var from = stack.length - 1, parent = stack[from];
        while(parent && !(parent.tagName in endParentTagName)) {
          if(parent.tagName === node.tagName) {
            needFix = 1;
            break
          }
          from--;
          parent = stack[from]
        }
        if(needFix) {
          closeStackOpenTag(stack.length - 1, from - 1)
        }
      }
      return needFix
    }
    var node, i, stack;
    stack = opts.stack = opts.stack || [];
    do {
      node = lexer.nextNode();
      if(node) {
        if(node.nodeType === 1) {
          if(node.isEndTag() && node.tagName === tag.tagName) {
            node = null
          }else {
            if(!node.isEndTag()) {
              if(SpecialScanners[node.tagName]) {
                SpecialScanners[node.tagName].scan(node, lexer, opts);
                tag.appendChild(node)
              }else {
                if(node.isSelfClosed) {
                  tag.appendChild(node)
                }else {
                  stack.push(tag);
                  if(processImpliedEndTag(node)) {
                    stack.push(tag)
                  }
                  tag = node
                }
              }
            }else {
              if(node.isEndTag()) {
                var index = -1;
                for(i = stack.length - 1;i >= 0;i--) {
                  var c = stack[i];
                  if(c.tagName === node.tagName) {
                    index = i;
                    break
                  }
                }
                if(index !== -1) {
                  stack[stack.length - 1].appendChild(tag);
                  fixCloseTagByDtd(tag, opts);
                  closeStackOpenTag(stack.length - 1, index);
                  node = null
                }
              }
            }
          }
        }else {
          tag.appendChild(node)
        }
      }
      if(node === null) {
        if(stack.length > 0) {
          node = stack[stack.length - 1];
          if(!SpecialScanners[node.tagName]) {
            stack.length = stack.length - 1;
            node.appendChild(tag);
            fixCloseTagByDtd(tag, opts);
            tag = node
          }else {
            node = null
          }
        }
      }
    }while(node);
    fixCloseTagByDtd(tag, opts)
  }}
});
KISSY.add("html-parser/scanners/cdata-scanner", [], function() {
  return{scan:function(tag, lexer, opts) {
    var content = lexer.parseCDATA(opts.quoteSmart, tag.nodeName), position = lexer.getPosition(), node = lexer.nextNode();
    if(node) {
      if(node.nodeType !== 1 || !(node.isEndTag() && node.tagName === tag.tagName)) {
        lexer.setPosition(position);
        node = null
      }
    }
    tag.closed = true;
    if(content) {
      tag.appendChild(content)
    }
  }}
});
KISSY.add("html-parser/scanners/quote-cdata-scanner", ["./cdata-scanner", "../dtd", "./special-scanners"], function(S, require) {
  var CDataScanner = require("./cdata-scanner");
  var Dtd = require("../dtd");
  var SpecialScanners = require("./special-scanners");
  var ret = {scan:function(tag, lexer, opts) {
    opts = opts || {};
    opts.quoteSmart = 1;
    CDataScanner.scan(tag, lexer, opts);
    opts.quoteSmart = 0
  }};
  for(var t in Dtd.$cdata) {
    SpecialScanners[t] = ret
  }
  return ret
});
KISSY.add("html-parser/scanners/textarea-scanner", ["./cdata-scanner", "./special-scanners"], function(S, require) {
  var CDataScanner = require("./cdata-scanner");
  var SpecialScanners = require("./special-scanners");
  SpecialScanners.textarea = {scan:function(tag, lexer, opts) {
    opts = opts || {};
    CDataScanner.scan(tag, lexer, opts)
  }};
  return SpecialScanners.textarea
});
KISSY.add("html-parser/scanner", ["./scanners/tag-scanner", "./scanners/special-scanners", "./scanners/quote-cdata-scanner", "./scanners/textarea-scanner"], function(S, require) {
  var TagScanner = require("./scanners/tag-scanner");
  var SpecialScanners = require("./scanners/special-scanners");
  require("./scanners/quote-cdata-scanner");
  require("./scanners/textarea-scanner");
  return{getScanner:function(nodeName) {
    return SpecialScanners[nodeName] || TagScanner
  }}
});
KISSY.add("html-parser/parser", ["./dtd", "./nodes/tag", "./nodes/fragment", "./lexer/lexer", "./nodes/document", "./scanner"], function(S, require) {
  var dtd = require("./dtd");
  var Tag = require("./nodes/tag");
  var Fragment = require("./nodes/fragment");
  var Lexer = require("./lexer/lexer");
  var Document = require("./nodes/document");
  var Scanner = require("./scanner");
  function Parser(html, opts) {
    html = S.trim(html);
    this.originalHTML = html;
    if(/^(<!doctype|<html|<body)/i.test(html)) {
      html = "<document>" + html + "</document>"
    }else {
      html = "<body>" + html + "</body>"
    }
    this.lexer = new Lexer(html);
    this.opts = opts || {}
  }
  Parser.prototype = {constructor:Parser, elements:function() {
    var root, doc, lexer = this.lexer, opts = this.opts;
    doc = root = lexer.nextNode();
    if(root.tagName !== "document") {
      doc = new Document;
      doc.appendChild(root)
    }
    doc.nodeType = 9;
    Scanner.getScanner("div").scan(root, lexer, opts);
    var body = fixBody(doc);
    if(body && opts.autoParagraph) {
      autoParagraph(body)
    }
    postProcess(doc);
    var originalHTML = this.originalHTML, fragment = new Fragment, cs;
    if(/^(<!doctype|<html|<body)/i.test(originalHTML)) {
      cs = doc.childNodes
    }else {
      cs = body.childNodes
    }
    S.each(cs, function(c) {
      fragment.appendChild(c)
    });
    return fragment
  }, parse:function() {
    return this.elements()
  }};
  function fixBody(doc) {
    var body = findTagWithName(doc, "body", 3);
    if(body) {
      var parent = body.parentNode, silbing = parent.childNodes, bodyIndex = S.indexOf(body, silbing);
      if(bodyIndex !== silbing.length - 1) {
        var fixes = silbing.slice(bodyIndex + 1, silbing.length);
        for(var i = 0;i < fixes.length;i++) {
          parent.removeChild(fixes[i]);
          if(fixes[i].tagName === "body") {
            S.each(fixes[i].childNodes, function(c) {
              body.appendChild(c)
            })
          }else {
            body.appendChild(fixes[i])
          }
        }
      }
    }
    return body
  }
  function autoParagraph(doc) {
    var childNodes = doc.childNodes, c, i, pDtd = dtd.p, needFix = 0;
    for(i = 0;i < childNodes.length;i++) {
      c = childNodes[i];
      if(c.nodeType === 3 || c.nodeType === 1 && pDtd[c.nodeName]) {
        needFix = 1;
        break
      }
    }
    if(needFix) {
      var newChildren = [], holder = new Tag;
      holder.nodeName = holder.tagName = "p";
      for(i = 0;i < childNodes.length;i++) {
        c = childNodes[i];
        if(c.nodeType === 3 || c.nodeType === 1 && pDtd[c.nodeName]) {
          holder.appendChild(c)
        }else {
          if(holder.childNodes.length) {
            newChildren.push(holder);
            holder = holder.clone()
          }
          newChildren.push(c)
        }
      }
      if(holder.childNodes.length) {
        newChildren.push(holder)
      }
      doc.empty();
      for(i = 0;i < newChildren.length;i++) {
        doc.appendChild(newChildren[i])
      }
    }
  }
  function findTagWithName(root, tagName, level) {
    if(level === 0) {
      return 0
    }
    if(typeof level === "number") {
      level--
    }
    var r, childNodes = root.childNodes;
    if(childNodes) {
      for(var i = 0;i < childNodes.length;i++) {
        if(childNodes[i].tagName === tagName) {
          return childNodes[i]
        }
        if(r = findTagWithName(childNodes[i], tagName, level)) {
          return r
        }
      }
    }
    return 0
  }
  function postProcess(doc) {
    var childNodes = [].concat(doc.childNodes);
    for(var i = 0;i < childNodes.length;i++) {
      if(childNodes[i].nodeName === "html") {
        var html = childNodes[i];
        for(var j = 0;j < i;j++) {
          if(childNodes[j].nodeType === 3 && !S.trim(childNodes[j].toHtml())) {
            doc.removeChild(childNodes[j])
          }
        }
        while(html.firstChild && html.firstChild.nodeType === 3 && !S.trim(html.firstChild.toHtml())) {
          html.removeChild(html.firstChild)
        }
        break
      }
    }
  }
  return Parser
});
KISSY.add("html-parser/writer/basic", ["../utils"], function(S, require) {
  var Utils = require("../utils");
  var isBooleanAttribute = Utils.isBooleanAttribute;
  function escapeAttrValue(str) {
    return String(str).replace(/'/g, "&quote;")
  }
  function BasicWriter() {
    this.output = []
  }
  BasicWriter.prototype = {constructor:BasicWriter, append:function() {
    var o = this.output, args = arguments, arg;
    for(var i = 0;i < args.length;i++) {
      arg = args[i];
      if(arg.length > 1) {
        for(var j = 0;j < arg.length;j++) {
          o.push(arg.charAt(j))
        }
      }else {
        o.push(arg)
      }
    }
    return this
  }, openTag:function(el) {
    this.append("<", el.tagName)
  }, openTagClose:function(el) {
    if(el.isSelfClosed) {
      this.append(" ", "/")
    }
    this.append(">")
  }, closeTag:function(el) {
    this.append("</", el.tagName, ">")
  }, attribute:function(attr) {
    var value = attr.value || "", name = attr.name;
    if(isBooleanAttribute(name) && !value) {
      value = name
    }
    this.append(" ", name, '="', escapeAttrValue(value), '"')
  }, text:function(text) {
    this.append(text)
  }, cdata:function(cdata) {
    this.append(cdata)
  }, comment:function(comment) {
    this.append("<!--" + comment + "--\>")
  }, getHtml:function() {
    return this.output.join("")
  }};
  return BasicWriter
});
KISSY.add("html-parser/writer/beautify", ["./basic", "../dtd", "../utils"], function(S, require) {
  var BasicWriter = require("./basic");
  var dtd = require("../dtd");
  var Utils = require("../utils");
  function BeautifyWriter() {
    var self = this;
    BeautifyWriter.superclass.constructor.apply(self, arguments);
    self.inPre = 0;
    self.indentChar = "\t";
    self.indentLevel = 0;
    self.allowIndent = 0;
    self.rules = {};
    var beauty = S.merge(dtd.$nonBodyContent, dtd.$block, dtd.$listItem, dtd.$tableContent, {select:1, script:1, style:1});
    for(var e in beauty) {
      self.setRules(e, {allowIndent:1, breakBeforeOpen:1, breakAfterOpen:1, breakBeforeClose:1, breakAfterClose:1})
    }
    S.each(["p", "h1", "h2", "h3", "h4", "h5", "h6"], function(e) {
      self.setRules(e, {allowIndent:0, breakAfterOpen:0, breakBeforeClose:0})
    });
    self.setRules("option", {breakBeforeOpen:1});
    self.setRules("optiongroup", {breakBeforeOpen:1});
    self.setRules("br", {breakAfterOpen:1});
    self.setRules("title", {allowIndent:0, breakBeforeClose:0, breakAfterOpen:0});
    self.setRules("pre", {breakAfterOpen:1, allowIndent:0})
  }
  S.extend(BeautifyWriter, BasicWriter, {indentation:function() {
    if(!this.inPre) {
      this.append((new Array(this.indentLevel + 1)).join(this.indentChar))
    }
    this.allowIndent = 0
  }, lineBreak:function() {
    var o = this.output;
    if(!this.inPre && o.length) {
      for(var j = o.length - 1;j >= 0;j--) {
        if(!/[\r\n\t ]/.test(o[j])) {
          break
        }
      }
      o.length = j + 1;
      this.append("\n")
    }
    this.allowIndent = 1
  }, setRules:function(tagName, rule) {
    if(!this.rules[tagName]) {
      this.rules[tagName] = {}
    }
    S.mix(this.rules[tagName], rule)
  }, openTag:function(el) {
    var tagName = el.tagName, rules = this.rules[tagName] || {};
    if(this.allowIndent) {
      this.indentation()
    }else {
      if(rules.breakBeforeOpen) {
        this.lineBreak();
        this.indentation()
      }
    }
    BeautifyWriter.superclass.openTag.apply(this, arguments)
  }, openTagClose:function(el) {
    var tagName = el.tagName;
    var rules = this.rules[tagName] || {};
    if(el.isSelfClosed) {
      this.append(" />")
    }else {
      this.append(">");
      if(rules.allowIndent) {
        this.indentLevel++
      }
    }
    if(rules.breakAfterOpen) {
      this.lineBreak()
    }
    if(tagName === "pre") {
      this.inPre = 1
    }
  }, closeTag:function(el) {
    var self = this, tagName = el.tagName, rules = self.rules[tagName] || {};
    if(rules.allowIndent) {
      self.indentLevel--
    }
    if(self.allowIndent) {
      self.indentation()
    }else {
      if(rules.breakBeforeClose) {
        self.lineBreak();
        self.indentation()
      }
    }
    BeautifyWriter.superclass.closeTag.apply(self, arguments);
    if(tagName === "pre") {
      self.inPre = 0
    }
    if(rules.breakAfterClose) {
      self.lineBreak()
    }
  }, text:function(text) {
    if(this.allowIndent) {
      this.indentation()
    }
    if(!this.inPre) {
      text = Utils.collapseWhitespace(text)
    }
    this.append(text)
  }, comment:function(comment) {
    if(this.allowIndent) {
      this.indentation()
    }
    this.append("<!--" + comment + "--\>")
  }, cdata:function(text) {
    if(this.allowIndent) {
      this.indentation()
    }
    this.append(S.trim(text))
  }});
  return BeautifyWriter
});
KISSY.add("html-parser/writer/minify", ["./basic", "../utils"], function(S, require) {
  var BasicWriter = require("./basic");
  var Utils = require("../utils");
  var trim = S.trim, isBooleanAttribute = Utils.isBooleanAttribute, collapseWhitespace = Utils.collapseWhitespace, reEmptyAttribute = new RegExp("^(?:class|id|style|title|lang|dir|on" + "(?:focus|blur|change|click|dblclick|mouse(" + "?:down|up|over|move|out)|key(?:press|down|up)))$");
  function escapeAttrValue(str) {
    return String(str).replace(/"/g, "&quote;")
  }
  function canDeleteEmptyAttribute(tag, attr) {
    var attrValue = attr.value || "", attrName = attr.name;
    if(!trim(attrValue)) {
      return tag === "input" && attrName === "value" || reEmptyAttribute.test(attrName)
    }
    return 0
  }
  function canRemoveAttributeQuotes(value) {
    return!/[ "'=<>`]/.test(value)
  }
  function isAttributeRedundant(el, attr) {
    var tag = el.nodeName, attrName = attr.name, attrValue = attr.value || "";
    attrValue = trim(attrValue.toLowerCase());
    return tag === "script" && attrName === "language" && attrValue === "javascript" || tag === "form" && attrName === "method" && attrValue === "get" || tag === "input" && attrName === "type" && attrValue === "text" || tag === "script" && attrName === "type" && attrValue === "text/javascript" || tag === "style" && attrName === "type" && attrValue === "text/css" || tag === "area" && attrName === "shape" && attrValue === "rect"
  }
  function isConditionalComment(text) {
    return/\[if[^\]]+\]/.test(text)
  }
  function isEventAttribute(attrName) {
    return/^on[a-z]+/.test(attrName)
  }
  function isUriTypeAttribute(attrName, tag) {
    return/^(?:a|area|link|base)$/.test(tag) && attrName === "href" || tag === "img" && /^(?:src|longdesc|usemap)$/.test(attrName) || tag === "object" && /^(?:classid|codebase|data|usemap)$/.test(attrName) || tag === "q" && attrName === "cite" || tag === "blockquote" && attrName === "cite" || (tag === "ins" || tag === "del") && attrName === "cite" || tag === "form" && attrName === "action" || tag === "input" && (attrName === "src" || attrName === "usemap") || tag === "head" && attrName === "profile" || 
    tag === "script" && (attrName === "src" || attrName === "for")
  }
  function isNumberTypeAttribute(attrName, tag) {
    return/^(?:a|area|object|button)$/.test(tag) && attrName === "tabindex" || tag === "input" && (attrName === "maxlength" || attrName === "tabindex") || tag === "select" && (attrName === "size" || attrName === "tabindex") || tag === "textarea" && /^(?:rows|cols|tabindex)$/.test(attrName) || tag === "colgroup" && attrName === "span" || tag === "col" && attrName === "span" || (tag === "th" || tag === "td") && (attrName === "rowspan" || attrName === "colspan")
  }
  function cleanAttributeValue(el, attr) {
    var tag = el.nodeName, attrName = attr.name, attrValue = attr.value || "";
    if(isEventAttribute(attrName)) {
      attrValue = trim(attrValue).replace(/^javascript:[\s\xa0]*/i, "").replace(/[\s\xa0]*;$/, "")
    }else {
      if(attrName === "class") {
        attrValue = collapseWhitespace(trim(attrValue))
      }else {
        if(isUriTypeAttribute(attrName, tag) || isNumberTypeAttribute(attrName, tag)) {
          attrValue = trim(attrValue)
        }else {
          if(attrName === "style") {
            attrValue = trim(attrValue).replace(/[\s\xa0]*;[\s\xa0]*$/, "")
          }
        }
      }
    }
    return attrValue
  }
  function cleanConditionalComment(comment) {
    return comment.replace(/^(\[[^\]]+\]>)[\s\xa0]*/, "$1").replace(/[\s\xa0]*(<!\[endif\])$/, "$1")
  }
  function removeCDATASections(text) {
    return trim(text).replace(/^(?:[\s\xa0]*\/\*[\s\xa0]*<!\[CDATA\[[\s\xa0]*\*\/|[\s\xa0]*\/\/[\s\xa0]*<!\[CDATA\[.*)/, "").replace(/(?:\/\*[\s\xa0]*\]\]>[\s\xa0]*\*\/|\/\/[\s\xa0]*\]\]>)[\s\xa0]*$/, "")
  }
  function MinifyWriter() {
    var self = this;
    MinifyWriter.superclass.constructor.apply(self, arguments);
    self.inPre = 0
  }
  S.extend(MinifyWriter, BasicWriter, {comment:function(text) {
    if(isConditionalComment(text)) {
      text = cleanConditionalComment(text);
      MinifyWriter.superclass.comment.call(this, text)
    }
  }, openTag:function(el) {
    var self = this;
    if(el.tagName === "pre") {
      self.inPre = 1
    }
    MinifyWriter.superclass.openTag.apply(self, arguments)
  }, closeTag:function(el) {
    var self = this;
    if(el.tagName === "pre") {
      self.inPre = 0
    }
    MinifyWriter.superclass.closeTag.apply(self, arguments)
  }, cdata:function(cdata) {
    cdata = removeCDATASections(cdata);
    MinifyWriter.superclass.cdata.call(this, cdata)
  }, attribute:function(attr, el) {
    var self = this, name = attr.name, normalizedValue, value = attr.value || "";
    if(canDeleteEmptyAttribute(el, attr) || isAttributeRedundant(el, attr)) {
      return
    }
    if(isBooleanAttribute(name)) {
      self.append(" ", name);
      return
    }
    normalizedValue = escapeAttrValue(cleanAttributeValue(el, attr));
    if(!(value && canRemoveAttributeQuotes(value))) {
      normalizedValue = '"' + normalizedValue + '"'
    }
    self.append(" ", name, "=", normalizedValue)
  }, text:function(text) {
    var self = this;
    if(!self.inPre) {
      text = collapseWhitespace(text)
    }
    self.append(text)
  }});
  return MinifyWriter
});
KISSY.add("html-parser/writer/filter", [], function(S) {
  function Filter() {
    this.tagNames = [];
    this.attributeNames = [];
    this.tags = [];
    this.comment = [];
    this.text = [];
    this.cdata = [];
    this.attributes = [];
    this.root = []
  }
  function findIndexToInsert(arr, p) {
    for(var i = 0;arr && i < arr.length;i++) {
      if(arr[i].priority > p) {
        return i
      }
    }
    return arr.length
  }
  function filterName(arr, v) {
    for(var i = 0;arr && i < arr.length;i++) {
      var items = arr[i].value;
      S.each(items, function(item) {
        v = v.replace(item[0], item[1])
      })
    }
    return v
  }
  function filterFn(arr, args, el) {
    var item, i, ret;
    for(i = 0;arr && i < arr.length;i++) {
      item = arr[i].value;
      if((ret = item.apply(null, args)) === false) {
        return false
      }
      if(el && ret && ret !== el) {
        if(typeof ret === "string") {
          if(el.toHtml() === ret) {
            return el
          }
          el.nodeValue = ret;
          ret = el
        }
        return this.onNode(ret)
      }
    }
    return el
  }
  function filterAttr(arr, attrNode, el, _default) {
    for(var i = 0;arr && i < arr.length;i++) {
      var item = arr[i].value, ret, name = attrNode.name;
      if(item[name] && (ret = item[name].call(null, attrNode.value, el)) === false) {
        return ret
      }
      if(typeof ret === "string") {
        attrNode.value = ret
      }
    }
    return _default
  }
  Filter.prototype = {constructor:Filter, addRules:function(rules, priority) {
    priority = priority || 10;
    for(var r in rules) {
      var holder = this[r];
      if(holder) {
        var index = findIndexToInsert(holder, priority);
        holder.splice(index, 0, {value:rules[r], priority:priority})
      }
    }
  }, onTagName:function(v) {
    return filterName(this.tagNames, v)
  }, onAttributeName:function(v) {
    return filterName(this.attributeNames, v)
  }, onText:function(el) {
    return filterFn.call(this, this.text, [el.toHtml(), el], el)
  }, onCData:function(el) {
    return filterFn.call(this, this.cdata, [el.toHtml(), el], el)
  }, onAttribute:function(attrNode, el) {
    return filterAttr(this.attributes, attrNode, el, attrNode)
  }, onComment:function(el) {
    return filterFn.call(this, this.comment, [el.toHtml(), el], el)
  }, onNode:function(el) {
    var t = el.nodeType;
    if(t === 1) {
      return this.onTag(el)
    }else {
      if(t === 3) {
        return this.onText(el)
      }else {
        if(t === 8) {
          return this.onComment(el)
        }
      }
    }
  }, onFragment:function(el) {
    return filterFn.call(this, this.root, [el], el)
  }, onTag:function(el) {
    var filters = ["^", el.tagName, "$"], tags = this.tags, ret;
    for(var i = 0;i < filters.length;i++) {
      var filter = filters[i];
      for(var j = 0;j < tags.length;j++) {
        var element = tags[j].value;
        if(element[filter]) {
          if((ret = element[filter](el)) === false) {
            return false
          }
          if(ret && ret !== el) {
            return this.onNode(ret)
          }
          if(!el.tagName) {
            return el
          }
        }
      }
    }
    return el
  }};
  return Filter
});
KISSY.add("html-parser", ["html-parser/dtd", "html-parser/lexer/lexer", "html-parser/parser", "html-parser/writer/basic", "html-parser/writer/beautify", "html-parser/writer/minify", "html-parser/writer/filter", "html-parser/nodes/cdata", "html-parser/nodes/comment", "html-parser/nodes/node", "html-parser/nodes/tag", "html-parser/nodes/text"], function(S, require) {
  var DTD = require("html-parser/dtd");
  var Lexer = require("html-parser/lexer/lexer");
  var Parser = require("html-parser/parser");
  var BasicWriter = require("html-parser/writer/basic");
  var BeautifyWriter = require("html-parser/writer/beautify");
  var MinifyWriter = require("html-parser/writer/minify");
  var Filter = require("html-parser/writer/filter");
  var CData = require("html-parser/nodes/cdata");
  var Comment = require("html-parser/nodes/comment");
  var Node = require("html-parser/nodes/node");
  var Tag = require("html-parser/nodes/tag");
  var Text = require("html-parser/nodes/text");
  return{CData:CData, Comment:Comment, Node:Node, Tag:Tag, Text:Text, Lexer:Lexer, Parser:Parser, BasicWriter:BasicWriter, BeautifyWriter:BeautifyWriter, MinifyWriter:MinifyWriter, Filter:Filter, DTD:DTD, serialize:function(n, filter) {
    var basicWriter = new BasicWriter;
    n.writeHtml(basicWriter, filter);
    return basicWriter.getHtml()
  }, parse:function(html) {
    return(new Parser(html)).parse()
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Mar 6 13:34
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/control/process
 component/control/render-xtpl
 component/control/render
 component/control
*/

KISSY.add("component/control/process", ["base", "promise"], function(S, require) {
  var Base = require("base");
  var Promise = require("promise");
  var Defer = Promise.Defer, __getHook = Base.prototype.__getHook, noop = S.noop;
  var ComponentProcess = Base.extend({bindInternal:noop, syncInternal:noop, initializer:function() {
    this._renderedDefer = new Defer
  }, renderUI:noop, syncUI:noop, bindUI:noop, onRendered:function(fn) {
    return this._renderedDefer.promise.then(fn)
  }, create:function() {
    var self = this;
    if(!self.get("created")) {
      self.fire("beforeCreateDom");
      self.createInternal();
      self.__callPluginsMethod("pluginCreateDom");
      self.fire("afterCreateDom");
      self.setInternal("created", true)
    }
    return self
  }, createInternal:function() {
    this.createDom()
  }, render:function() {
    var self = this;
    if(!self.get("rendered")) {
      self.create();
      self.fire("beforeRenderUI");
      self.renderUI();
      self.__callPluginsMethod("pluginRenderUI");
      self.fire("afterRenderUI");
      self.fire("beforeBindUI");
      ComponentProcess.superclass.bindInternal.call(self);
      self.bindUI();
      self.__callPluginsMethod("pluginBindUI");
      self.fire("afterBindUI");
      ComponentProcess.superclass.syncInternal.call(self);
      syncUIs(self);
      self.setInternal("rendered", true)
    }
    return self
  }, sync:function() {
    syncUIs(this)
  }, plug:function(plugin) {
    var self = this, p, plugins = self.get("plugins");
    self.callSuper(plugin);
    p = plugins[plugins.length - 1];
    if(self.get("rendered")) {
      if(p.pluginCreateDom) {
        p.pluginCreateDom(self)
      }
      if(p.pluginRenderUI) {
        p.pluginCreateDom(self)
      }
      if(p.pluginBindUI) {
        p.pluginBindUI(self)
      }
      if(p.pluginSyncUI) {
        p.pluginSyncUI(self)
      }
    }else {
      if(self.get("created")) {
        if(p.pluginCreateDom) {
          p.pluginCreateDom(self)
        }
      }
    }
    return self
  }}, {__hooks__:{createDom:__getHook("__createDom"), renderUI:__getHook("__renderUI"), bindUI:__getHook("__bindUI"), syncUI:__getHook("__syncUI")}, name:"ComponentProcess", ATTRS:{rendered:{value:false, setter:function(v) {
    if(v) {
      this._renderedDefer.resolve(this)
    }
  }}, created:{value:false}}});
  function syncUIs(self) {
    self.fire("beforeSyncUI");
    self.syncUI();
    self.__callPluginsMethod("pluginSyncUI");
    self.fire("afterSyncUI")
  }
  return ComponentProcess
});
KISSY.add("component/control/render-xtpl", [], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += '<div id="';
    var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 1);
    buffer += renderOutputUtil(id0, true);
    buffer += '"\n class="';
    var config2 = {};
    var params3 = [];
    params3.push("");
    config2.params = params3;
    var id1 = runInlineCommandUtil(engine, scope, config2, "getBaseCssClasses", 2);
    buffer += renderOutputUtil(id1, true);
    buffer += "\n";
    var config4 = {};
    var params5 = [];
    var id6 = getPropertyUtil(engine, scope, "elCls", 0, 3);
    params5.push(id6);
    config4.params = params5;
    config4.fn = function(scope) {
      var buffer = "";
      buffer += "\n ";
      var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 4);
      buffer += renderOutputUtil(id7, true);
      buffer += "  \n";
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config4, "each", 3);
    buffer += '\n"\n\n';
    var config8 = {};
    var params9 = [];
    var id10 = getPropertyUtil(engine, scope, "elAttrs", 0, 8);
    params9.push(id10);
    config8.params = params9;
    config8.fn = function(scope) {
      var buffer = "";
      buffer += " \n ";
      var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "xindex", 0, 9);
      buffer += renderOutputUtil(id11, true);
      buffer += '="';
      var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 9);
      buffer += renderOutputUtil(id12, true);
      buffer += '"\n';
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config8, "each", 8);
    buffer += '\n\nstyle="\n';
    var config13 = {};
    var params14 = [];
    var id15 = getPropertyUtil(engine, scope, "elStyle", 0, 13);
    params14.push(id15);
    config13.params = params14;
    config13.fn = function(scope) {
      var buffer = "";
      buffer += " \n ";
      var id16 = getPropertyOrRunCommandUtil(engine, scope, {}, "xindex", 0, 14);
      buffer += renderOutputUtil(id16, true);
      buffer += ":";
      var id17 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 14);
      buffer += renderOutputUtil(id17, true);
      buffer += ";\n";
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config13, "each", 13);
    buffer += '\n">';
    return buffer
  }
});
KISSY.add("component/control/render", ["node", "xtemplate/runtime", "./process", "./render-xtpl", "component/manager"], function(S, require) {
  var Node = require("node");
  var XTemplateRuntime = require("xtemplate/runtime");
  var ComponentProcess = require("./process");
  var RenderTpl = require("./render-xtpl");
  var Manager = require("component/manager");
  var ON_SET = "_onSet", trim = S.trim, $ = Node.all, UA = S.UA, startTpl = RenderTpl, endTpl = "</div>", doc = S.Env.host.document, HTML_PARSER = "HTML_PARSER";
  function pxSetter(v) {
    if(typeof v === "number") {
      v += "px"
    }
    return v
  }
  function applyParser(srcNode, parser, control) {
    var view = this, p, v, ret;
    for(p in parser) {
      v = parser[p];
      if(typeof v === "function") {
        ret = v.call(view, srcNode);
        if(ret !== undefined) {
          control.setInternal(p, ret)
        }
      }else {
        if(typeof v === "string") {
          control.setInternal(p, srcNode.one(v))
        }else {
          if(S.isArray(v) && v[0]) {
            control.setInternal(p, srcNode.all(v[0]))
          }
        }
      }
    }
  }
  function normalExtras(extras) {
    if(!extras) {
      extras = [""]
    }
    if(typeof extras === "string") {
      extras = extras.split(/\s+/)
    }
    return extras
  }
  function prefixExtra(prefixCls, componentCls, extras) {
    var cls = "", i = 0, l = extras.length, e, prefix = prefixCls + componentCls;
    for(;i < l;i++) {
      e = extras[i];
      e = e ? "-" + e : e;
      cls += " " + prefix + e
    }
    return cls
  }
  function onSetAttrChange(e) {
    var self = this, method;
    if(e.target === self.control) {
      method = self[ON_SET + e.type.slice(5).slice(0, -6)];
      method.call(self, e.newVal, e)
    }
  }
  function getBaseCssClassesCmd() {
    return this.config.view.getBaseCssClasses(arguments[1].params[0])
  }
  function getBaseCssClassCmd() {
    return this.config.view.getBaseCssClass(arguments[1].params[0])
  }
  return ComponentProcess.extend({isRender:true, createInternal:function() {
    var self = this, srcNode = self.control.get("srcNode");
    if(srcNode) {
      self.decorateDom(srcNode)
    }else {
      self.callSuper()
    }
  }, beforeCreateDom:function(renderData) {
    var self = this, control = self.control, width, height, visible, elAttrs = control.get("elAttrs"), cls = control.get("elCls"), disabled, attrs = control.getAttrs(), a, attr, elStyle = control.get("elStyle"), zIndex, elCls = control.get("elCls");
    for(a in attrs) {
      attr = attrs[a];
      if(attr.view) {
        renderData[a] = control.get(a)
      }
    }
    width = renderData.width;
    height = renderData.height;
    visible = renderData.visible;
    zIndex = renderData.zIndex;
    if(width) {
      elStyle.width = pxSetter(width)
    }
    if(height) {
      elStyle.height = pxSetter(height)
    }
    if(zIndex) {
      elStyle["z-index"] = zIndex
    }
    if(!visible) {
      elCls.push(self.getBaseCssClasses("hidden"))
    }
    if(disabled = control.get("disabled")) {
      cls.push(self.getBaseCssClasses("disabled"));
      elAttrs["aria-disabled"] = "true"
    }
    if(control.get("highlighted")) {
      cls.push(self.getBaseCssClasses("hover"))
    }
    if(control.get("focusable")) {
      if(UA.ieMode < 9) {
        elAttrs.hideFocus = "true"
      }
      elAttrs.tabindex = disabled ? "-1" : "0"
    }
  }, createDom:function() {
    var self = this;
    self.beforeCreateDom(self.renderData = {}, self.childrenElSelectors = {}, self.renderCommands = {getBaseCssClasses:getBaseCssClassesCmd, getBaseCssClass:getBaseCssClassCmd});
    var control = self.control, html;
    html = self.renderTpl(startTpl) + self.renderTpl(self.get("contentTpl")) + endTpl;
    control.setInternal("el", self.$el = $(html));
    self.el = self.$el[0];
    self.fillChildrenElsBySelectors()
  }, decorateDom:function(srcNode) {
    var self = this, control = self.control;
    if(!srcNode.attr("id")) {
      srcNode.attr("id", control.get("id"))
    }
    applyParser.call(self, srcNode, self.constructor.HTML_PARSER, control);
    control.setInternal("el", self.$el = srcNode);
    self.el = srcNode[0]
  }, renderUI:function() {
    var self = this, control = self.control, el = self.$el;
    if(!control.get("srcNode")) {
      var render = control.get("render"), renderBefore = control.get("elBefore");
      if(renderBefore) {
        el.insertBefore(renderBefore, undefined)
      }else {
        if(render) {
          el.appendTo(render, undefined)
        }else {
          el.appendTo(doc.body, undefined)
        }
      }
    }
  }, bindUI:function() {
    var self = this;
    var control = self.control;
    var attrs = control.getAttrs();
    var attrName, attrCfg;
    for(attrName in attrs) {
      attrCfg = attrs[attrName];
      var ucName = S.ucfirst(attrName);
      var attrChangeFn = self[ON_SET + ucName];
      if(attrCfg.view && attrChangeFn) {
        control.on("after" + ucName + "Change", onSetAttrChange, self)
      }
    }
  }, destructor:function() {
    if(this.$el) {
      this.$el.remove()
    }
  }, $:function(selector) {
    return this.$el.all(selector)
  }, fillChildrenElsBySelectors:function(childrenElSelectors) {
    var self = this, el = self.$el, control = self.control, childName, selector;
    childrenElSelectors = childrenElSelectors || self.childrenElSelectors;
    for(childName in childrenElSelectors) {
      selector = childrenElSelectors[childName];
      if(typeof selector === "function") {
        control.setInternal(childName, selector(el))
      }else {
        control.setInternal(childName, self.$(S.substitute(selector, self.renderData)))
      }
      delete childrenElSelectors[childName]
    }
  }, renderTpl:function(tpl, renderData, renderCommands) {
    var self = this;
    renderData = renderData || self.renderData;
    renderCommands = renderCommands || self.renderCommands;
    var XTemplate = self.get("xtemplate");
    return(new XTemplate(tpl, {control:self.control, view:self, commands:renderCommands})).render(renderData)
  }, getComponentConstructorByNode:function(prefixCls, childNode) {
    var cls = childNode[0].className;
    if(cls) {
      cls = cls.replace(new RegExp("\\b" + prefixCls, "ig"), "");
      return Manager.getConstructorByXClass(cls)
    }
    return null
  }, getComponentCssClasses:function() {
    var self = this;
    if(self.componentCssClasses) {
      return self.componentCssClasses
    }
    var control = self.control, constructor = control.constructor, xclass, re = [];
    while(constructor && !constructor.prototype.hasOwnProperty("isControl")) {
      xclass = constructor.xclass;
      if(xclass) {
        re.push(xclass)
      }
      constructor = constructor.superclass && constructor.superclass.constructor
    }
    self.componentCssClasses = re;
    return re
  }, getBaseCssClasses:function(extras) {
    extras = normalExtras(extras);
    var componentCssClasses = this.getComponentCssClasses(), i = 0, control = this.get("control"), cls = "", l = componentCssClasses.length, prefixCls = control.get("prefixCls");
    for(;i < l;i++) {
      cls += prefixExtra(prefixCls, componentCssClasses[i], extras)
    }
    return trim(cls)
  }, getBaseCssClass:function(extras) {
    return trim(prefixExtra(this.control.get("prefixCls"), this.getComponentCssClasses()[0], normalExtras(extras)))
  }, getKeyEventTarget:function() {
    return this.$el
  }, _onSetWidth:function(w) {
    this.$el.width(w)
  }, _onSetHeight:function(h) {
    this.$el.height(h)
  }, _onSetContent:function(c) {
    var el = this.$el;
    el.html(c);
    if(!this.get("allowTextSelection")) {
      el.unselectable()
    }
  }, _onSetVisible:function(visible) {
    var self = this, el = self.$el, hiddenCls = self.getBaseCssClasses("hidden");
    if(visible) {
      el.removeClass(hiddenCls)
    }else {
      el.addClass(hiddenCls)
    }
  }, _onSetHighlighted:function(v) {
    var self = this, componentCls = self.getBaseCssClasses("hover"), el = self.$el;
    el[v ? "addClass" : "removeClass"](componentCls)
  }, _onSetDisabled:function(v) {
    var self = this, control = self.control, componentCls = self.getBaseCssClasses("disabled"), el = self.$el;
    el[v ? "addClass" : "removeClass"](componentCls).attr("aria-disabled", v);
    if(control.get("focusable")) {
      self.getKeyEventTarget().attr("tabindex", v ? -1 : 0)
    }
  }, _onSetActive:function(v) {
    var self = this, componentCls = self.getBaseCssClasses("active");
    self.$el[v ? "addClass" : "removeClass"](componentCls).attr("aria-pressed", !!v)
  }, _onSetFocused:function(v) {
    var self = this, el = self.$el, componentCls = self.getBaseCssClasses("focused");
    el[v ? "addClass" : "removeClass"](componentCls)
  }, _onSetZIndex:function(x) {
    this.$el.css("z-index", x)
  }}, {__hooks__:{decorateDom:ComponentProcess.prototype.__getHook("__decorateDom"), beforeCreateDom:ComponentProcess.prototype.__getHook("__beforeCreateDom")}, extend:function extend(extensions, px, sx) {
    var SuperClass = this, NewClass, parsers = {};
    NewClass = ComponentProcess.extend.apply(SuperClass, arguments);
    NewClass[HTML_PARSER] = NewClass[HTML_PARSER] || {};
    if(S.isArray(extensions)) {
      S.each(extensions.concat(NewClass), function(ext) {
        if(ext) {
          S.each(ext.HTML_PARSER, function(v, name) {
            parsers[name] = v
          })
        }
      });
      NewClass[HTML_PARSER] = parsers
    }
    S.mix(NewClass[HTML_PARSER], SuperClass[HTML_PARSER], false);
    NewClass.extend = extend;
    return NewClass
  }, ATTRS:{control:{setter:function(v) {
    this.control = v
  }}, xtemplate:{value:XTemplateRuntime}, contentTpl:{value:function(scope) {
    return scope.get("content") || ""
  }}}, HTML_PARSER:{id:function(el) {
    var id = el[0].id;
    return id ? id : undefined
  }, content:function(el) {
    return el.html()
  }, disabled:function(el) {
    return el.hasClass(this.getBaseCssClass("disabled"))
  }}, name:"render"})
});
KISSY.add("component/control", ["node", "./control/process", "component/manager", "./control/render"], function(S, require) {
  var Node = require("node");
  var ComponentProcess = require("./control/process");
  var Manager = require("component/manager");
  var Render = require("./control/render");
  var ie = S.UA.ieMode, Features = S.Features, Gesture = Node.Gesture, isTouchGestureSupported = Features.isTouchGestureSupported(), isTouchEventSupported = Features.isTouchEventSupported();
  var Control = ComponentProcess.extend({isControl:true, createDom:function() {
    var self = this, Render = self.get("xrender"), view = self.get("view"), id = self.get("id"), el;
    if(view) {
      view.set("control", self)
    }else {
      self.set("view", this.view = view = new Render({control:self}))
    }
    view.create();
    el = view.getKeyEventTarget();
    if(!self.get("allowTextSelection")) {
      el.unselectable()
    }
    Manager.addComponent(id, self)
  }, renderUI:function() {
    this.view.render()
  }, bindUI:function() {
    var self = this, el = self.view.getKeyEventTarget();
    if(self.get("focusable")) {
      el.on("focus", self.handleFocus, self).on("blur", self.handleBlur, self).on("keydown", self.handleKeydown, self)
    }
    if(self.get("handleMouseEvents")) {
      el = self.$el;
      el.on("mouseenter", self.handleMouseEnter, self).on("mouseleave", self.handleMouseLeave, self).on("contextmenu", self.handleContextMenu, self);
      el.on(Gesture.start, self.handleMouseDown, self).on(Gesture.end, self.handleMouseUp, self).on(Gesture.tap, self.handleClick, self);
      if(Gesture.cancel) {
        el.on(Gesture.cancel, self.handleMouseUp, self)
      }
      if(ie < 9) {
        el.on("dblclick", self.handleDblClick, self)
      }
    }
  }, sync:function() {
    var self = this;
    self.fire("beforeSyncUI");
    self.syncUI();
    self.view.sync();
    self.__callPluginsMethod("pluginSyncUI");
    self.fire("afterSyncUI")
  }, createComponent:function(cfg, parent) {
    return Manager.createComponent(cfg, parent || this)
  }, _onSetFocused:function(v) {
    var target = this.view.getKeyEventTarget()[0];
    if(v) {
      target.focus()
    }else {
      if(target.ownerDocument.activeElement === target) {
        target.ownerDocument.body.focus()
      }
    }
  }, _onSetX:function(x) {
    this.$el.offset({left:x})
  }, _onSetY:function(y) {
    this.$el.offset({top:y})
  }, _onSetVisible:function(v) {
    this.fire(v ? "show" : "hide")
  }, show:function() {
    var self = this;
    self.render();
    self.set("visible", true);
    return self
  }, hide:function() {
    var self = this;
    self.set("visible", false);
    return self
  }, focus:function() {
    if(this.get("focusable")) {
      this.set("focused", true)
    }
  }, blur:function() {
    if(this.get("focusable")) {
      this.set("focused", false)
    }
  }, move:function(x, y) {
    this.set({x:x, y:y})
  }, handleDblClick:function(ev) {
    if(!this.get("disabled")) {
      this.handleDblClickInternal(ev)
    }
  }, handleDblClickInternal:function(ev) {
    this.handleClickInternal(ev)
  }, handleMouseEnter:function(ev) {
    if(!this.get("disabled")) {
      this.handleMouseEnterInternal(ev)
    }
  }, handleMouseEnterInternal:function(ev) {
    this.set("highlighted", !!ev)
  }, handleMouseLeave:function(ev) {
    if(!this.get("disabled")) {
      this.handleMouseLeaveInternal(ev)
    }
  }, handleMouseLeaveInternal:function(ev) {
    var self = this;
    self.set("active", false);
    self.set("highlighted", !ev)
  }, handleMouseDown:function(ev) {
    if(!this.get("disabled")) {
      this.handleMouseDownInternal(ev)
    }
  }, handleMouseDownInternal:function(ev) {
    var self = this, n, isMouseActionButton = ev.which === 1;
    if(isMouseActionButton || isTouchGestureSupported) {
      if(self.get("activeable")) {
        self.set("active", true)
      }
      if(self.get("focusable")) {
        self.focus()
      }
      if(!self.get("allowTextSelection") && ev.type.indexOf("mouse") !== -1) {
        n = ev.target.nodeName;
        n = n && n.toLowerCase();
        if(n !== "input" && n !== "textarea" && n !== "button") {
          ev.preventDefault()
        }
      }
    }
  }, handleMouseUp:function(ev) {
    if(!this.get("disabled")) {
      this.handleMouseUpInternal(ev)
    }
  }, handleMouseUpInternal:function(ev) {
    var self = this;
    if(self.get("active") && (ev.which === 1 || isTouchGestureSupported)) {
      self.set("active", false)
    }
  }, handleContextMenu:function(ev) {
    if(!this.get("disabled")) {
      this.handleContextMenuInternal(ev)
    }
  }, handleContextMenuInternal:function() {
  }, handleFocus:function() {
    if(!this.get("disabled")) {
      this.handleFocusInternal()
    }
  }, handleFocusInternal:function() {
    this.focus();
    this.fire("focus")
  }, handleBlur:function() {
    if(!this.get("disabled")) {
      this.handleBlurInternal()
    }
  }, handleBlurInternal:function() {
    this.blur();
    this.fire("blur")
  }, handleKeydown:function(ev) {
    var self = this;
    if(!this.get("disabled") && self.handleKeyDownInternal(ev)) {
      ev.halt();
      return true
    }
    return undefined
  }, handleKeyDownInternal:function(ev) {
    if(ev.keyCode === Node.KeyCode.ENTER) {
      return this.handleClickInternal(ev)
    }
    return undefined
  }, handleClick:function(ev) {
    if(!this.get("disabled")) {
      this.handleClickInternal(ev)
    }
  }, handleClickInternal:function() {
    var self = this;
    if(self.get("focusable")) {
      self.focus()
    }
  }, destructor:function() {
    var self = this;
    Manager.removeComponent(self.get("id"));
    if(self.view) {
      self.view.destroy()
    }else {
      if(self.get("srcNode")) {
        self.get("srcNode").remove()
      }
    }
  }}, {name:"control", ATTRS:{id:{view:1, valueFn:function() {
    return S.guid("ks-component")
  }}, content:{view:1, value:""}, width:{view:1}, height:{view:1}, elCls:{view:1, value:[], setter:function(v) {
    if(typeof v === "string") {
      v = v.split(/\s+/)
    }
    return v || []
  }}, elStyle:{view:1, value:{}}, elAttrs:{view:1, value:{}}, elBefore:{}, el:{setter:function(el) {
    this.$el = el;
    this.el = el[0]
  }}, x:{}, y:{}, xy:{setter:function(v) {
    var self = this, xy = S.makeArray(v);
    if(xy.length) {
      if(xy[0] !== undefined) {
        self.set("x", xy[0])
      }
      if(xy[1] !== undefined) {
        self.set("y", xy[1])
      }
    }
    return v
  }, getter:function() {
    return[this.get("x"), this.get("y")]
  }}, zIndex:{view:1}, render:{}, visible:{sync:0, value:true, view:1}, srcNode:{setter:function(v) {
    return Node.all(v)
  }}, handleMouseEvents:{value:true}, focusable:{value:true, view:1}, allowTextSelection:{value:false}, activeable:{value:true}, focused:{view:1}, active:{view:1, value:false}, highlighted:{view:1, value:false}, prefixCls:{view:1, value:S.config("component/prefixCls") || "ks-"}, prefixXClass:{}, parent:{setter:function(p, prev) {
    if(prev = this.get("parent")) {
      this.removeTarget(prev)
    }
    if(p) {
      this.addTarget(p)
    }
  }}, disabled:{view:1, value:false}, xrender:{value:Render}, view:{setter:function(v) {
    this.view = v
  }}}});
  function getDefaultRender() {
    var attrs, constructor = this;
    do {
      attrs = constructor.ATTRS;
      constructor = constructor.superclass
    }while(!attrs || !attrs.xrender);
    return attrs.xrender.value
  }
  Control.getDefaultRender = getDefaultRender;
  Control.extend = function extend(extensions, px, sx) {
    var args = S.makeArray(arguments), baseClass = this, xclass, newClass, argsLen = args.length, last = args[argsLen - 1];
    if(xclass = last.xclass) {
      last.name = xclass
    }
    newClass = ComponentProcess.extend.apply(baseClass, args);
    if(xclass) {
      Manager.setConstructorByXClass(xclass, newClass)
    }
    newClass.extend = extend;
    newClass.getDefaultRender = getDefaultRender;
    return newClass
  };
  return Control
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:05
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/manager
*/

KISSY.add("component/manager", [], function(S) {
  var basePriority = 0, Manager, uis = {}, componentInstances = {};
  Manager = {__instances:componentInstances, addComponent:function(id, component) {
    componentInstances[id] = component
  }, removeComponent:function(id) {
    delete componentInstances[id]
  }, getComponent:function(id) {
    return componentInstances[id]
  }, createComponent:function(component, parent) {
    var ChildConstructor, xclass;
    if(component) {
      if(!component.isControl && parent) {
        if(!component.prefixCls) {
          component.prefixCls = parent.get("prefixCls")
        }
        if(!component.xclass && component.prefixXClass) {
          component.xclass = component.prefixXClass;
          if(component.xtype) {
            component.xclass += "-" + component.xtype
          }
        }
      }
      if(!component.isControl && (xclass = component.xclass)) {
        ChildConstructor = Manager.getConstructorByXClass(xclass);
        if(!ChildConstructor) {
          S.error("can not find class by xclass desc : " + xclass)
        }
        component = new ChildConstructor(component)
      }
      if(component.isControl && parent) {
        component.setInternal("parent", parent)
      }
    }
    return component
  }, getConstructorByXClass:function(classNames) {
    var cs = classNames.split(/\s+/), p = -1, t, i, uic, ui = null;
    for(i = 0;i < cs.length;i++) {
      uic = uis[cs[i]];
      if(uic && (t = uic.priority) > p) {
        p = t;
        ui = uic.constructor
      }
    }
    return ui
  }, setConstructorByXClass:function(className, ComponentConstructor) {
    uis[className] = {constructor:ComponentConstructor, priority:basePriority++}
  }};
  return Manager
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Mar 7 12:41
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 xtemplate/runtime/scope
 xtemplate/runtime/commands
 xtemplate/runtime
*/

KISSY.add("xtemplate/runtime/scope", [], function(S) {
  function Scope(data, affix) {
    this.data = data || {};
    this.affix = affix;
    this.root = this
  }
  Scope.prototype = {isScope:1, setParent:function(parentScope) {
    this.parent = parentScope;
    this.root = parentScope.root
  }, getParent:function() {
    return this.parent
  }, getRoot:function() {
    return this.root
  }, set:function(name, value) {
    if(!this.affix) {
      this.affix = {}
    }
    this.affix[name] = value
  }, setData:function(data) {
    this.data = data
  }, getData:function() {
    return this.data
  }, mix:function(v) {
    if(!this.affix) {
      this.affix = {}
    }
    S.mix(this.affix, v)
  }, has:function(name) {
    var data = this.data;
    var affix = this.affix;
    if(affix && name in affix) {
      return true
    }
    return typeof data === "object" && name in data
  }, get:function(name) {
    var data = this.data;
    var affix = this.affix;
    if(affix && name in affix) {
      return affix[name]
    }
    if(typeof data === "object" && name in data) {
      return data[name]
    }
    return undefined
  }, resolve:function(name, depth) {
    if(name === ".") {
      name = "this"
    }
    var parts = name.split(".");
    var scope = this, len, i, v, p, valid;
    if(parts[0] === "root") {
      parts.shift();
      scope = scope.root
    }else {
      if(depth) {
        while(scope && depth--) {
          scope = scope.parent
        }
      }
    }
    var endScopeFind = 0;
    len = parts.length;
    while(scope) {
      valid = 1;
      v = scope;
      for(i = 0;i < len;i++) {
        p = parts[i];
        if(p === "this") {
          endScopeFind = 1;
          continue
        }
        if(v === scope) {
          if(!scope.has(p)) {
            valid = 0;
            break
          }else {
            v = scope.get(p);
            endScopeFind = 1
          }
        }else {
          if(v == null || typeof v !== "object" || !(p in v)) {
            valid = 0;
            break
          }
          v = v[p]
        }
      }
      if(valid) {
        if(v && v.isScope) {
          v = v.data
        }
        if(typeof v === "function") {
          v = v.call(this.data)
        }
        return[v]
      }
      if(endScopeFind) {
        break
      }
      scope = scope.parent
    }
    return false
  }};
  return Scope
});
KISSY.add("xtemplate/runtime/commands", ["path", "./scope"], function(S, require) {
  var commands;
  var Path = require("path");
  var Scope = require("./scope");
  commands = {"debugger":S.noop, each:function(scope, config) {
    var params = config.params;
    var param0 = params[0];
    var xindexName = params[2] || "xindex";
    var valueName = params[1];
    var buffer = "";
    var xcount;
    var opScope;
    var affix;
    if(param0) {
      opScope = new Scope;
      if(S.isArray(param0)) {
        xcount = param0.length;
        for(var xindex = 0;xindex < xcount;xindex++) {
          opScope.data = param0[xindex];
          affix = opScope.affix = {xcount:xcount};
          affix[xindexName] = xindex;
          if(valueName) {
            affix[valueName] = param0[xindex]
          }
          opScope.setParent(scope);
          buffer += config.fn(opScope)
        }
      }else {
        for(var name in param0) {
          opScope.data = param0[name];
          affix = opScope.affix = {};
          affix[xindexName] = name;
          if(valueName) {
            affix[valueName] = param0[name]
          }
          opScope.setParent(scope);
          buffer += config.fn(opScope)
        }
      }
    }else {
      if(config.inverse) {
        buffer = config.inverse(scope)
      }
    }
    return buffer
  }, "with":function(scope, config) {
    var params = config.params;
    var param0 = params[0];
    var buffer = "";
    if(param0) {
      var opScope = new Scope(param0);
      opScope.setParent(scope);
      buffer = config.fn(opScope)
    }else {
      if(config.inverse) {
        buffer = config.inverse(scope)
      }
    }
    return buffer
  }, "if":function(scope, config) {
    var params = config.params;
    var param0 = params[0];
    var buffer = "";
    if(param0) {
      if(config.fn) {
        buffer = config.fn(scope)
      }
    }else {
      if(config.inverse) {
        buffer = config.inverse(scope)
      }
    }
    return buffer
  }, set:function(scope, config) {
    scope.mix(config.hash);
    return""
  }, include:function(scope, config) {
    var params = config.params;
    if(!params || params.length !== 1) {
      S.error("include must has one param");
      return""
    }
    if(config.hash) {
      var newScope = new Scope(config.hash);
      newScope.setParent(scope);
      scope = newScope
    }
    var myName = this.config.name;
    var subTplName = params[0];
    if(subTplName.charAt(0) === ".") {
      if(myName === "unspecified") {
        S.error("parent template does not have name" + " for relative sub tpl name: " + subTplName);
        return""
      }
      subTplName = Path.resolve(myName, "../", subTplName)
    }
    var tpl = this.config.loader.call(this, subTplName);
    config = S.merge(this.config);
    config.name = subTplName;
    config.commands = this.config.commands;
    config.macros = this.config.macros;
    return this.invokeEngine(tpl, scope, config)
  }, macro:function(scope, config) {
    var params = config.params;
    var macroName = params[0];
    var params1 = params.slice(1);
    var macros = this.config.macros;
    if(config.fn) {
      if(!macros[macroName]) {
        macros[macroName] = {paramNames:params1, fn:config.fn}
      }
    }else {
      var paramValues = {};
      var macro = macros[macroName];
      if(!macro) {
        S.error("can not find macro:" + name)
      }
      S.each(macro.paramNames, function(p, i) {
        paramValues[p] = params1[i]
      });
      var newScope = new Scope(paramValues);
      return macro.fn.call(this, newScope)
    }
    return""
  }, parse:function(scope, config) {
    return commands.include.call(this, new Scope, config)
  }};
  if("@DEBUG@") {
    commands["debugger"] = function() {
      S.globalEval("debugger")
    }
  }
  return commands
});
KISSY.add("xtemplate/runtime", ["./runtime/commands", "./runtime/scope"], function(S, require) {
  var commands = require("./runtime/commands");
  var Scope = require("./runtime/scope");
  var escapeHtml = S.escapeHtml;
  var logger = S.getLogger("s/xtemplate");
  function info(s) {
    logger.info(s)
  }
  function findCommand(commands, name) {
    var parts = name.split(".");
    var cmd = commands;
    var len = parts.length;
    for(var i = 0;i < len;i++) {
      cmd = cmd[parts[i]];
      if(!cmd) {
        break
      }
    }
    return cmd
  }
  function runInlineCommand(engine, scope, options, name, line, onlyCommand) {
    var id0;
    var config = engine.config;
    var commands = config.commands;
    var command1 = findCommand(commands, name);
    if(command1) {
      try {
        id0 = command1.call(engine, scope, options)
      }catch(e) {
        S.error(e.message + ': "' + name + '" at line ' + line)
      }
      return{find:true, value:id0}
    }else {
      if(onlyCommand) {
        S.error("can not find command: " + name + '" at line ' + line)
      }
    }
    return{find:false}
  }
  function getProperty(engine, scope, name, depth, line) {
    var id0;
    var config = engine.config;
    var logFn = config.silent ? info : S.error;
    var tmp2 = scope.resolve(name, depth);
    if(tmp2 === false) {
      logFn('can not find property: "' + name + '" at line ' + line, "warn")
    }else {
      id0 = tmp2[0]
    }
    return id0
  }
  var utils = {runBlockCommand:function(engine, scope, options, name, line) {
    var config = engine.config;
    var logFn = config.silent ? info : S.error;
    var commands = config.commands;
    var command = findCommand(commands, name);
    if(!command) {
      if(!options.params && !options.hash) {
        var property = scope.resolve(name);
        if(property === false) {
          logFn('can not find property: "' + name + '" at line ' + line);
          property = ""
        }else {
          property = property[0]
        }
        command = commands["if"];
        if(S.isArray(property)) {
          command = commands.each
        }else {
          if(typeof property === "object") {
            command = commands["with"]
          }
        }
        options.params = [property]
      }else {
        S.error("can not find command: " + name + '" at line ' + line);
        return""
      }
    }
    var ret;
    try {
      ret = command.call(engine, scope, options)
    }catch(e) {
      S.error(e.message + ': "' + name + '" at line ' + line)
    }
    return ret
  }, renderOutput:function(exp, escaped) {
    if(exp === undefined) {
      exp = ""
    }
    return escaped && exp ? escapeHtml(exp) : exp
  }, getProperty:function(engine, scope, name, depth, line) {
    return getProperty(engine, scope, name, depth, line)
  }, runInlineCommand:function(engine, scope, options, name, line) {
    var id0 = "", ret;
    ret = runInlineCommand(engine, scope, options, name, line);
    if(ret.find) {
      id0 = ret.value
    }
    return id0
  }, getPropertyOrRunCommand:function(engine, scope, options, name, depth, line) {
    var id0, ret;
    var onlyCommand = options.hash || options.params;
    ret = runInlineCommand(engine, scope, options, name, line, onlyCommand);
    if(ret.find) {
      id0 = ret.value
    }else {
      if(!onlyCommand) {
        id0 = getProperty(engine, scope, name, depth, line)
      }
    }
    return id0
  }}, defaultConfig = {silent:true, name:"unspecified", loader:function(subTplName) {
    var tpl = S.require(subTplName);
    if(!tpl) {
      S.error('template "' + subTplName + '" does not exist, ' + "need to be required or used first!")
    }
    return tpl
  }};
  function XTemplateRuntime(tpl, config) {
    var self = this;
    self.tpl = tpl;
    config = S.merge(defaultConfig, config);
    config.commands = S.merge(config.commands, commands);
    config.utils = utils;
    config.macros = config.macros || {};
    this.config = config
  }
  S.mix(XTemplateRuntime, {commands:commands, utils:utils, addCommand:function(commandName, fn) {
    commands[commandName] = fn
  }, removeCommand:function(commandName) {
    delete commands[commandName]
  }});
  XTemplateRuntime.prototype = {constructor:XTemplateRuntime, invokeEngine:function(tpl, scope, config) {
    return(new this.constructor(tpl, config)).render(scope, true)
  }, removeCommand:function(commandName) {
    delete this.config.commands[commandName]
  }, addCommand:function(commandName, fn) {
    this.config.commands[commandName] = fn
  }, render:function(data) {
    var root = data;
    if(!(root && root.isScope)) {
      root = new Scope(data)
    }
    return this.tpl(root, S)
  }};
  XTemplateRuntime.Scope = Scope;
  return XTemplateRuntime
});


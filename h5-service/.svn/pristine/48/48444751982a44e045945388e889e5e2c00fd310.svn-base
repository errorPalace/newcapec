/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/overlay
*/

KISSY.add("editor/plugin/overlay", ["editor", "overlay", "./focus-fix"], function(S, require) {
  var Editor = require("editor");
  var Overlay = require("overlay");
  var focusFix = require("./focus-fix");
  return Overlay.extend({bindUI:function() {
    focusFix.init(this)
  }}, {ATTRS:{prefixCls:{value:"ks-editor-"}, zIndex:{value:Editor.baseZIndex(Editor.ZIndexManager.OVERLAY)}}})
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/fore-color/cmd
*/

KISSY.add("editor/plugin/fore-color/cmd", ["../color/cmd"], function(S, require) {
  var cmd = require("../color/cmd");
  var COLOR_STYLES = {element:"span", styles:{color:"#(color)"}, overrides:[{element:"font", attributes:{color:null}}], childRule:function(el) {
    return!(el.nodeName() === "a" || el.all("a").length)
  }};
  return{init:function(editor) {
    if(!editor.hasCommand("foreColor")) {
      editor.addCommand("foreColor", {exec:function(editor, c) {
        editor.execCommand("save");
        cmd.applyColor(editor, c, COLOR_STYLES);
        editor.execCommand("save")
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/color/cmd
*/

KISSY.add("editor/plugin/color/cmd", ["editor"], function(S, require) {
  var Editor = require("editor");
  function applyColor(editor, c, styles) {
    var doc = editor.get("document")[0];
    editor.execCommand("save");
    if(c) {
      (new Editor.Style(styles, {color:c})).apply(doc)
    }else {
      (new Editor.Style(styles, {color:"inherit"})).remove(doc)
    }
    editor.execCommand("save")
  }
  return{applyColor:applyColor}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:44
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/back-color
*/

KISSY.add("editor/plugin/back-color", ["./color/btn", "./back-color/cmd"], function(S, require) {
  var Button = require("./color/btn");
  var cmd = require("./back-color/cmd");
  function backColor(config) {
    this.config = config || {}
  }
  S.augment(backColor, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    Button.init(editor, {defaultColor:"rgb(255, 217, 102)", cmdType:"backColor", tooltip:"\u80cc\u666f\u989c\u8272"})
  }});
  return backColor
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:44
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/back-color/cmd
*/

KISSY.add("editor/plugin/back-color/cmd", ["../color/cmd"], function(S, require) {
  var cmd = require("../color/cmd");
  var BACK_COLOR_STYLE = {element:"span", styles:{"background-color":"#(color)"}, overrides:[{element:"*", styles:{"background-color":null}}], childRule:function(currentNode) {
    return!!currentNode.style("background-color")
  }};
  return{init:function(editor) {
    if(!editor.hasCommand("backColor")) {
      editor.addCommand("backColor", {exec:function(editor, c) {
        editor.execCommand("save");
        cmd.applyColor(editor, c, BACK_COLOR_STYLE);
        editor.execCommand("save")
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/resize
*/

KISSY.add("editor/plugin/resize", ["dd"], function(S, require) {
  var DD = require("dd");
  var Node = S.Node;
  function Resize(config) {
    this.config = config || {}
  }
  S.augment(Resize, {pluginRenderUI:function(editor) {
    var Draggable = DD.Draggable, statusBarEl = editor.get("statusBarEl"), cfg = this.config, direction = cfg.direction || ["x", "y"];
    var cursor = "se-resize";
    if(direction.length === 1) {
      if(direction[0] === "x") {
        cursor = "e-resize"
      }else {
        cursor = "s-resize"
      }
    }
    var resizer = (new Node('<div class="' + editor.get("prefixCls") + 'editor-resizer" style="cursor: ' + cursor + '"></div>')).appendTo(statusBarEl);
    editor.on("maximizeWindow", function() {
      resizer.css("display", "none")
    });
    editor.on("restoreWindow", function() {
      resizer.css("display", "")
    });
    var d = new Draggable({node:resizer, groups:false}), height = 0, width = 0, dragStartMousePos, heightEl = editor.get("el"), widthEl = editor.get("el");
    d.on("dragstart", function() {
      height = heightEl.height();
      width = widthEl.width();
      editor.fire("resizeStart");
      dragStartMousePos = d.get("dragStartMousePos")
    });
    d.on("drag", function(ev) {
      var diffX = ev.pageX - dragStartMousePos.left, diffY = ev.pageY - dragStartMousePos.top;
      if(S.inArray("y", direction)) {
        editor.set("height", height + diffY)
      }
      if(S.inArray("x", direction)) {
        editor.set("width", width + diffX)
      }
      editor.fire("resize")
    });
    editor.on("destroy", function() {
      d.destroy();
      resizer.remove()
    })
  }});
  return Resize
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:06
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 dd/ddm
 dd/draggable
 dd/draggable-delegate
 dd/droppable
 dd/droppable-delegate
 dd
*/

KISSY.add("dd/ddm", ["node", "base"], function(S, require) {
  var Node = require("node"), Base = require("base");
  var logger = S.getLogger("dd/ddm");
  var UA = S.UA, $ = Node.all, win = S.Env.host, doc = win.document, $doc = $(doc), $win = $(win), ie6 = UA.ie === 6, PIXEL_THRESH = 3, BUFFER_TIME = 1, MOVE_DELAY = 30, SHIM_Z_INDEX = 999999;
  var Gesture = Node.Gesture, DRAG_MOVE_EVENT = Gesture.move, DRAG_END_EVENT = Gesture.end;
  var DDM = Base.extend({__activeToDrag:0, _regDrop:function(d) {
    this.get("drops").push(d)
  }, _unRegDrop:function(d) {
    var self = this, drops = self.get("drops"), index = S.indexOf(d, drops);
    if(index !== -1) {
      drops.splice(index, 1)
    }
  }, _regToDrag:function(drag) {
    var self = this;
    self.__activeToDrag = drag;
    registerEvent(self)
  }, _start:function() {
    var self = this, drag = self.__activeToDrag;
    if(!drag) {
      return
    }
    self.setInternal("activeDrag", drag);
    self.__activeToDrag = 0;
    if(drag.get("shim")) {
      activeShim(self)
    }
    self.__needDropCheck = 0;
    if(drag.get("groups")) {
      _activeDrops(self);
      if(self.get("validDrops").length) {
        cacheWH(drag.get("node"));
        self.__needDropCheck = 1
      }
    }
  }, _addValidDrop:function(drop) {
    this.get("validDrops").push(drop)
  }, _end:function(e) {
    var self = this, __activeToDrag = self.__activeToDrag, activeDrag = self.get("activeDrag"), activeDrop = self.get("activeDrop");
    if(e) {
      if(__activeToDrag) {
        __activeToDrag._move(e)
      }
      if(activeDrag) {
        activeDrag._move(e)
      }
    }
    unRegisterEvent(self);
    if(__activeToDrag) {
      __activeToDrag._end(e);
      self.__activeToDrag = 0
    }
    if(self._shim) {
      self._shim.hide()
    }
    if(!activeDrag) {
      return
    }
    activeDrag._end(e);
    _deActiveDrops(self);
    if(activeDrop) {
      activeDrop._end(e)
    }
    self.setInternal("activeDrag", null);
    self.setInternal("activeDrop", null)
  }}, {ATTRS:{dragCursor:{value:"move"}, clickPixelThresh:{value:PIXEL_THRESH}, bufferTime:{value:BUFFER_TIME}, activeDrag:{}, activeDrop:{}, drops:{value:[]}, validDrops:{value:[]}}});
  function move(ev) {
    var self = this, drag, __activeToDrag, activeDrag;
    if(ev.touches && ev.touches.length > 1) {
      ddm._end();
      return
    }
    if(__activeToDrag = self.__activeToDrag) {
      __activeToDrag._move(ev)
    }else {
      if(activeDrag = self.get("activeDrag")) {
        activeDrag._move(ev);
        if(self.__needDropCheck) {
          notifyDropsMove(self, ev, activeDrag)
        }
      }
    }
    drag = __activeToDrag || activeDrag;
    if(drag && drag.get("preventDefaultOnMove")) {
      ev.preventDefault()
    }
  }
  var throttleMove = UA.ie ? S.throttle(move, MOVE_DELAY) : move;
  function notifyDropsMove(self, ev, activeDrag) {
    var drops = self.get("validDrops"), mode = activeDrag.get("mode"), activeDrop = 0, oldDrop, vArea = 0, dragRegion = region(activeDrag.get("node")), dragArea = area(dragRegion);
    S.each(drops, function(drop) {
      if(drop.get("disabled")) {
        return undefined
      }
      var a, node = drop.getNodeFromTarget(ev, activeDrag.get("dragNode")[0], activeDrag.get("node")[0]);
      if(!node) {
        return undefined
      }
      if(mode === "point") {
        if(inNodeByPointer(node, activeDrag.mousePos)) {
          a = area(region(node));
          if(!activeDrop) {
            activeDrop = drop;
            vArea = a
          }else {
            if(a < vArea) {
              activeDrop = drop;
              vArea = a
            }
          }
        }
      }else {
        if(mode === "intersect") {
          a = area(intersect(dragRegion, region(node)));
          if(a > vArea) {
            vArea = a;
            activeDrop = drop
          }
        }else {
          if(mode === "strict") {
            a = area(intersect(dragRegion, region(node)));
            if(a === dragArea) {
              activeDrop = drop;
              return false
            }
          }
        }
      }
      return undefined
    });
    oldDrop = self.get("activeDrop");
    if(oldDrop && oldDrop !== activeDrop) {
      oldDrop._handleOut(ev);
      activeDrag._handleOut(ev)
    }
    self.setInternal("activeDrop", activeDrop);
    if(activeDrop) {
      if(oldDrop !== activeDrop) {
        activeDrop._handleEnter(ev)
      }else {
        activeDrop._handleOver(ev)
      }
    }
  }
  var activeShim = function(self) {
    self._shim = $("<div " + 'style="' + "background-color:red;" + "position:" + (ie6 ? "absolute" : "fixed") + ";" + "left:0;" + "width:100%;" + "height:100%;" + "top:0;" + "cursor:" + ddm.get("dragCursor") + ";" + "z-index:" + SHIM_Z_INDEX + ";" + '"><' + "/div>").prependTo(doc.body || doc.documentElement).css("opacity", 0);
    activeShim = showShim;
    if(ie6) {
      $win.on("resize scroll", adjustShimSize, self)
    }
    showShim(self)
  };
  var adjustShimSize = S.throttle(function() {
    var self = this, activeDrag;
    if((activeDrag = self.get("activeDrag")) && activeDrag.get("shim")) {
      self._shim.css({width:$doc.width(), height:$doc.height()})
    }
  }, MOVE_DELAY);
  function showShim(self) {
    var ah = self.get("activeDrag").get("activeHandler"), cur = "auto";
    if(ah) {
      cur = ah.css("cursor")
    }
    if(cur === "auto") {
      cur = self.get("dragCursor")
    }
    self._shim.css({cursor:cur, display:"block"});
    if(ie6) {
      adjustShimSize.call(self)
    }
  }
  function registerEvent(self) {
    $doc.on(DRAG_END_EVENT, self._end, self);
    $doc.on(DRAG_MOVE_EVENT, throttleMove, self);
    if(doc.body.setCapture) {
      doc.body.setCapture()
    }
  }
  function unRegisterEvent(self) {
    $doc.detach(DRAG_MOVE_EVENT, throttleMove, self);
    $doc.detach(DRAG_END_EVENT, self._end, self);
    if(doc.body.releaseCapture) {
      doc.body.releaseCapture()
    }
  }
  function _activeDrops(self) {
    var drops = self.get("drops");
    self.setInternal("validDrops", []);
    if(drops.length) {
      S.each(drops, function(d) {
        d._active()
      })
    }
  }
  function _deActiveDrops(self) {
    var drops = self.get("drops");
    self.setInternal("validDrops", []);
    if(drops.length) {
      S.each(drops, function(d) {
        d._deActive()
      })
    }
  }
  function region(node) {
    var offset = node.offset();
    if(!node.__ddCachedWidth) {
      logger.debug("no cache in dd!");
      logger.debug(node[0])
    }
    return{left:offset.left, right:offset.left + (node.__ddCachedWidth || node.outerWidth()), top:offset.top, bottom:offset.top + (node.__ddCachedHeight || node.outerHeight())}
  }
  function inRegion(region, pointer) {
    return region.left <= pointer.left && region.right >= pointer.left && region.top <= pointer.top && region.bottom >= pointer.top
  }
  function area(region) {
    if(region.top >= region.bottom || region.left >= region.right) {
      return 0
    }
    return(region.right - region.left) * (region.bottom - region.top)
  }
  function intersect(r1, r2) {
    var t = Math.max(r1.top, r2.top), r = Math.min(r1.right, r2.right), b = Math.min(r1.bottom, r2.bottom), l = Math.max(r1.left, r2.left);
    return{left:l, right:r, top:t, bottom:b}
  }
  function inNodeByPointer(node, point) {
    return inRegion(region(node), point)
  }
  function cacheWH(node) {
    if(node) {
      node.__ddCachedWidth = node.outerWidth();
      node.__ddCachedHeight = node.outerHeight()
    }
  }
  var ddm = new DDM;
  ddm.inRegion = inRegion;
  ddm.region = region;
  ddm.area = area;
  ddm.cacheWH = cacheWH;
  ddm.PREFIX_CLS = "ks-dd-";
  return ddm
});
KISSY.add("dd/draggable", ["node", "./ddm", "base"], function(S, require) {
  var Node = require("node"), DDM = require("./ddm"), Base = require("base");
  var UA = S.UA, $ = Node.all, each = S.each, Features = S.Features, ie = UA.ie, NULL = null, PREFIX_CLS = DDM.PREFIX_CLS, doc = S.Env.host.document;
  var Draggable = Base.extend({initializer:function() {
    var self = this;
    self.addTarget(DDM);
    self._allowMove = self.get("move")
  }, _onSetNode:function(n) {
    var self = this;
    self.setInternal("dragNode", n);
    self.bindDragEvent()
  }, bindDragEvent:function() {
    var self = this, node = self.get("node");
    node.on(Node.Gesture.start, handlePreDragStart, self).on("dragstart", self._fixDragStart)
  }, detachDragEvent:function(self) {
    self = this;
    var node = self.get("node");
    node.detach(Node.Gesture.start, handlePreDragStart, self).detach("dragstart", self._fixDragStart)
  }, _bufferTimer:NULL, _onSetDisabledChange:function(d) {
    this.get("dragNode")[d ? "addClass" : "removeClass"](PREFIX_CLS + "-disabled")
  }, _fixDragStart:fixDragStart, _checkHandler:function(t) {
    var self = this, handlers = self.get("handlers"), ret = 0;
    each(handlers, function(handler) {
      if(handler[0] === t || handler.contains(t)) {
        ret = 1;
        self.setInternal("activeHandler", handler);
        return false
      }
      return undefined
    });
    return ret
  }, _checkDragStartValid:function(ev) {
    var self = this;
    if(self.get("primaryButtonOnly") && ev.which !== 1 || self.get("disabled")) {
      return 0
    }
    return 1
  }, _prepare:function(ev) {
    if(!ev) {
      return
    }
    var self = this;
    if(ie) {
      fixIEMouseDown()
    }
    if(self.get("halt")) {
      ev.stopPropagation()
    }
    if(!Features.isTouchEventSupported()) {
      ev.preventDefault()
    }
    var mx = ev.pageX, my = ev.pageY;
    self.setInternal("startMousePos", self.mousePos = {left:mx, top:my});
    if(self._allowMove) {
      var node = self.get("node"), nxy = node.offset();
      self.setInternal("startNodePos", nxy);
      self.setInternal("deltaPos", {left:mx - nxy.left, top:my - nxy.top})
    }
    DDM._regToDrag(self);
    var bufferTime = self.get("bufferTime");
    if(bufferTime) {
      self._bufferTimer = setTimeout(function() {
        self._start(ev)
      }, bufferTime * 1E3)
    }
  }, _clearBufferTimer:function() {
    var self = this;
    if(self._bufferTimer) {
      clearTimeout(self._bufferTimer);
      self._bufferTimer = 0
    }
  }, _move:function(ev) {
    var self = this, pageX = ev.pageX, pageY = ev.pageY;
    if(!self.get("dragging")) {
      var startMousePos = self.get("startMousePos"), start = 0, clickPixelThresh = self.get("clickPixelThresh");
      if(Math.abs(pageX - startMousePos.left) >= clickPixelThresh || Math.abs(pageY - startMousePos.top) >= clickPixelThresh) {
        self._start(ev);
        start = 1
      }
      if(!start) {
        return
      }
    }
    self.mousePos = {left:pageX, top:pageY};
    var customEvent = {drag:self, left:pageX, top:pageY, pageX:pageX, pageY:pageY, domEvent:ev};
    var move = self._allowMove;
    if(move) {
      var diff = self.get("deltaPos"), left = pageX - diff.left, top = pageY - diff.top;
      customEvent.left = left;
      customEvent.top = top;
      self.setInternal("actualPos", {left:left, top:top});
      self.fire("dragalign", customEvent)
    }
    var def = 1;
    if(self.fire("drag", customEvent) === false) {
      def = 0
    }
    if(def && move) {
      self.get("node").offset(self.get("actualPos"))
    }
  }, stopDrag:function() {
    DDM._end()
  }, _end:function(e) {
    e = e || {};
    var self = this, activeDrop;
    self._clearBufferTimer();
    if(ie) {
      fixIEMouseUp()
    }
    if(self.get("dragging")) {
      self.get("node").removeClass(PREFIX_CLS + "drag-over");
      if(activeDrop = DDM.get("activeDrop")) {
        self.fire("dragdrophit", {drag:self, drop:activeDrop})
      }else {
        self.fire("dragdropmiss", {drag:self})
      }
      self.setInternal("dragging", 0);
      self.fire("dragend", {drag:self, pageX:e.pageX, pageY:e.pageY})
    }
  }, _handleOut:function() {
    var self = this;
    self.get("node").removeClass(PREFIX_CLS + "drag-over");
    self.fire("dragexit", {drag:self, drop:DDM.get("activeDrop")})
  }, _handleEnter:function(e) {
    var self = this;
    self.get("node").addClass(PREFIX_CLS + "drag-over");
    self.fire("dragenter", e)
  }, _handleOver:function(e) {
    this.fire("dragover", e)
  }, _start:function(ev) {
    var self = this;
    self._clearBufferTimer();
    self.setInternal("dragging", 1);
    self.setInternal("dragStartMousePos", {left:ev.pageX, top:ev.pageY});
    DDM._start();
    self.fire("dragstart", {drag:self, pageX:ev.pageX, pageY:ev.pageY})
  }, destructor:function() {
    var self = this;
    self.detachDragEvent();
    self.detach()
  }}, {name:"Draggable", ATTRS:{node:{setter:function(v) {
    if(!(v instanceof Node)) {
      return $(v)
    }
    return undefined
  }}, clickPixelThresh:{valueFn:function() {
    return DDM.get("clickPixelThresh")
  }}, bufferTime:{valueFn:function() {
    return DDM.get("bufferTime")
  }}, dragNode:{}, shim:{value:false}, handlers:{value:[], getter:function(vs) {
    var self = this;
    if(!vs.length) {
      vs[0] = self.get("node")
    }
    each(vs, function(v, i) {
      if(typeof v === "function") {
        v = v.call(self)
      }
      if(typeof v === "string") {
        v = self.get("node").one(v)
      }
      if(v.nodeType) {
        v = $(v)
      }
      vs[i] = v
    });
    self.setInternal("handlers", vs);
    return vs
  }}, activeHandler:{}, dragging:{value:false, setter:function(d) {
    var self = this;
    self.get("dragNode")[d ? "addClass" : "removeClass"](PREFIX_CLS + "dragging")
  }}, mode:{value:"point"}, disabled:{value:false}, move:{value:false}, primaryButtonOnly:{value:true}, halt:{value:true}, groups:{value:true}, startMousePos:{}, dragStartMousePos:{}, startNodePos:{}, deltaPos:{}, actualPos:{}, preventDefaultOnMove:{value:true}}, inheritedStatics:{DropMode:{POINT:"point", INTERSECT:"intersect", STRICT:"strict"}}});
  var _ieSelectBack;
  function fixIEMouseUp() {
    doc.body.onselectstart = _ieSelectBack
  }
  function fixIEMouseDown() {
    _ieSelectBack = doc.body.onselectstart;
    doc.body.onselectstart = fixIESelect
  }
  function fixDragStart(e) {
    e.preventDefault()
  }
  function fixIESelect() {
    return false
  }
  var handlePreDragStart = function(ev) {
    var self = this, t = ev.target;
    if(self._checkDragStartValid(ev)) {
      if(!self._checkHandler(t)) {
        return
      }
      self._prepare(ev)
    }
  };
  return Draggable
});
KISSY.add("dd/draggable-delegate", ["node", "./ddm", "./draggable"], function(S, require) {
  var Node = require("node"), DDM = require("./ddm"), Draggable = require("./draggable");
  var PREFIX_CLS = DDM.PREFIX_CLS, $ = Node.all;
  var handlePreDragStart = function(ev) {
    var self = this, handler, node;
    if(!self._checkDragStartValid(ev)) {
      return
    }
    var handlers = self.get("handlers"), target = $(ev.target);
    if(handlers.length) {
      handler = self._getHandler(target)
    }else {
      handler = target
    }
    if(handler) {
      node = self._getNode(handler)
    }
    if(!node) {
      return
    }
    self.setInternal("activeHandler", handler);
    self.setInternal("node", node);
    self.setInternal("dragNode", node);
    self._prepare(ev)
  };
  return Draggable.extend({_onSetNode:function() {
  }, _onSetContainer:function() {
    this.bindDragEvent()
  }, _onSetDisabledChange:function(d) {
    this.get("container")[d ? "addClass" : "removeClass"](PREFIX_CLS + "-disabled")
  }, bindDragEvent:function() {
    var self = this, node = self.get("container");
    node.on(Node.Gesture.start, handlePreDragStart, self).on("dragstart", self._fixDragStart)
  }, detachDragEvent:function() {
    var self = this;
    self.get("container").detach(Node.Gesture.start, handlePreDragStart, self).detach("dragstart", self._fixDragStart)
  }, _getHandler:function(target) {
    var self = this, node = self.get("container"), handlers = self.get("handlers");
    while(target && target[0] !== node[0]) {
      for(var i = 0;i < handlers.length;i++) {
        var h = handlers[i];
        if(target.test(h)) {
          return target
        }
      }
      target = target.parent()
    }
    return null
  }, _getNode:function(h) {
    return h.closest(this.get("selector"), this.get("container"))
  }}, {ATTRS:{container:{setter:function(v) {
    return $(v)
  }}, selector:{}, handlers:{value:[], getter:0}}})
});
KISSY.add("dd/droppable", ["node", "./ddm", "base"], function(S, require) {
  var Node = require("node"), DDM = require("./ddm"), Base = require("base");
  var PREFIX_CLS = DDM.PREFIX_CLS;
  function validDrop(dropGroups, dragGroups) {
    if(dragGroups === true) {
      return 1
    }
    for(var d in dropGroups) {
      if(dragGroups[d]) {
        return 1
      }
    }
    return 0
  }
  return Base.extend({initializer:function() {
    var self = this;
    self.addTarget(DDM);
    DDM._regDrop(this)
  }, getNodeFromTarget:function(ev, dragNode, proxyNode) {
    var node = this.get("node"), domNode = node[0];
    return domNode === dragNode || domNode === proxyNode ? null : node
  }, _active:function() {
    var self = this, drag = DDM.get("activeDrag"), node = self.get("node"), dropGroups = self.get("groups"), dragGroups = drag.get("groups");
    if(validDrop(dropGroups, dragGroups)) {
      DDM._addValidDrop(self);
      if(node) {
        node.addClass(PREFIX_CLS + "drop-active-valid");
        DDM.cacheWH(node)
      }
    }else {
      if(node) {
        node.addClass(PREFIX_CLS + "drop-active-invalid")
      }
    }
  }, _deActive:function() {
    var node = this.get("node");
    if(node) {
      node.removeClass(PREFIX_CLS + "drop-active-valid").removeClass(PREFIX_CLS + "drop-active-invalid")
    }
  }, __getCustomEvt:function(ev) {
    return S.mix({drag:DDM.get("activeDrag"), drop:this}, ev)
  }, _handleOut:function() {
    var self = this, ret = self.__getCustomEvt();
    self.get("node").removeClass(PREFIX_CLS + "drop-over");
    self.fire("dropexit", ret)
  }, _handleEnter:function(ev) {
    var self = this, e = self.__getCustomEvt(ev);
    e.drag._handleEnter(e);
    self.get("node").addClass(PREFIX_CLS + "drop-over");
    self.fire("dropenter", e)
  }, _handleOver:function(ev) {
    var self = this, e = self.__getCustomEvt(ev);
    e.drag._handleOver(e);
    self.fire("dropover", e)
  }, _end:function() {
    var self = this, ret = self.__getCustomEvt();
    self.get("node").removeClass(PREFIX_CLS + "drop-over");
    self.fire("drophit", ret)
  }, destructor:function() {
    DDM._unRegDrop(this)
  }}, {name:"Droppable", ATTRS:{node:{setter:function(v) {
    if(v) {
      return Node.one(v)
    }
  }}, groups:{value:{}}, disabled:{}}})
});
KISSY.add("dd/droppable-delegate", ["node", "./ddm", "./droppable"], function(S, require) {
  var Node = require("node"), DDM = require("./ddm"), Droppable = require("./droppable");
  function dragStart() {
    var self = this, container = self.get("container"), allNodes = [], selector = self.get("selector");
    container.all(selector).each(function(n) {
      DDM.cacheWH(n);
      allNodes.push(n)
    });
    self.__allNodes = allNodes
  }
  var DroppableDelegate = Droppable.extend({initializer:function() {
    DDM.on("dragstart", dragStart, this)
  }, getNodeFromTarget:function(ev, dragNode, proxyNode) {
    var pointer = {left:ev.pageX, top:ev.pageY}, self = this, allNodes = self.__allNodes, ret = 0, vArea = Number.MAX_VALUE;
    if(allNodes) {
      S.each(allNodes, function(n) {
        var domNode = n[0];
        if(domNode === proxyNode || domNode === dragNode) {
          return
        }
        var r = DDM.region(n);
        if(DDM.inRegion(r, pointer)) {
          var a = DDM.area(r);
          if(a < vArea) {
            vArea = a;
            ret = n
          }
        }
      })
    }
    if(ret) {
      self.setInternal("lastNode", self.get("node"));
      self.setInternal("node", ret)
    }
    return ret
  }, _handleOut:function() {
    var self = this;
    self.callSuper();
    self.setInternal("node", 0);
    self.setInternal("lastNode", 0)
  }, _handleOver:function(ev) {
    var self = this, node = self.get("node"), superOut = DroppableDelegate.superclass._handleOut, superOver = self.callSuper, superEnter = DroppableDelegate.superclass._handleEnter, lastNode = self.get("lastNode");
    if(lastNode[0] !== node[0]) {
      self.setInternal("node", lastNode);
      superOut.apply(self, arguments);
      self.setInternal("node", node);
      superEnter.call(self, ev)
    }else {
      superOver.call(self, ev)
    }
  }, _end:function(e) {
    var self = this;
    self.callSuper(e);
    self.setInternal("node", 0)
  }}, {ATTRS:{lastNode:{}, selector:{}, container:{setter:function(v) {
    return Node.one(v)
  }}}});
  return DroppableDelegate
});
KISSY.add("dd", ["dd/ddm", "dd/draggable", "dd/draggable-delegate", "dd/droppable-delegate", "dd/droppable"], function(S, require) {
  var DDM = require("dd/ddm"), Draggable = require("dd/draggable"), DraggableDelegate = require("dd/draggable-delegate"), DroppableDelegate = require("dd/droppable-delegate"), Droppable = require("dd/droppable");
  var DD = {Draggable:Draggable, DDM:DDM, Droppable:Droppable, DroppableDelegate:DroppableDelegate, DraggableDelegate:DraggableDelegate};
  KISSY.DD = DD;
  return DD
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/draft
*/

KISSY.add("editor/plugin/draft", ["editor", "json", "event", "./local-storage", "overlay", "./menubutton"], function(S, require) {
  var Editor = require("editor");
  var Json = require("json");
  var Event = require("event");
  var localStorage = require("./local-storage");
  var Overlay = require("overlay");
  var MenuButton = require("./menubutton");
  var Node = S.Node, LIMIT = 5, INTERVAL = 5, DRAFT_SAVE = "ks-editor-draft-save20110503";
  function padding(n, l, p) {
    n += "";
    while(n.length < l) {
      n = p + n
    }
    return n
  }
  function date(d) {
    if(typeof d === "number") {
      d = new Date(d)
    }
    if(d instanceof Date) {
      return[d.getFullYear(), "-", padding(d.getMonth() + 1, 2, "0"), "-", padding(d.getDate(), 2, "0"), " ", padding(d.getHours(), 2, "0"), ":", padding(d.getMinutes(), 2, "0"), ":", padding(d.getSeconds(), 2, "0")].join("")
    }else {
      return d
    }
  }
  function Draft(editor, config) {
    this.editor = editor;
    this.config = config;
    this._init()
  }
  var addRes = Editor.Utils.addRes, destroyRes = Editor.Utils.destroyRes;
  S.augment(Draft, {_getSaveKey:function() {
    var self = this, cfg = self.config;
    return cfg.draft && cfg.draft.saveKey || DRAFT_SAVE
  }, _getDrafts:function() {
    var self = this;
    if(!self.drafts) {
      var str = localStorage.getItem(self._getSaveKey()), drafts = [];
      if(str) {
        drafts = localStorage === window.localStorage ? Json.parse(S.urlDecode(str)) : str
      }
      self.drafts = drafts
    }
    return self.drafts
  }, _init:function() {
    var self = this, editor = self.editor, prefixCls = editor.get("prefixCls"), statusbar = editor.get("statusBarEl"), cfg = this.config;
    cfg.draft = cfg.draft || {};
    self.draftInterval = cfg.draft.interval = cfg.draft.interval || INTERVAL;
    self.draftLimit = cfg.draft.limit = cfg.draft.limit || LIMIT;
    var holder = (new Node('<div class="' + prefixCls + 'editor-draft">' + '<span class="' + prefixCls + 'editor-draft-title">' + "\u5185\u5bb9\u6b63\u6587\u6bcf" + cfg.draft.interval + "\u5206\u949f\u81ea\u52a8\u4fdd\u5b58\u4e00\u6b21\u3002" + "</span>" + "</div>")).appendTo(statusbar);
    self.timeTip = (new Node('<span class="' + prefixCls + 'editor-draft-time"/>')).appendTo(holder);
    var save = (new Node(S.substitute('<a href="#" ' + 'onclick="return false;" ' + 'class="{prefixCls}editor-button ' + '{prefixCls}editor-draft-save-btn ks-inline-block" ' + 'style="' + "vertical-align:middle;" + "padding:1px 9px;" + '">' + '<span class="{prefixCls}editor-draft-save">' + "</span>" + "<span>\u7acb\u5373\u4fdd\u5b58</span>" + "</a>", {prefixCls:prefixCls}))).unselectable(undefined).appendTo(holder), versions = (new MenuButton({render:holder, collapseOnClick:true, width:"100px", prefixCls:prefixCls + 
    "editor-", menu:{width:"225px", align:{points:["tr", "br"]}}, matchElWidth:false, content:"\u6062\u590d\u7f16\u8f91\u5386\u53f2"})).render();
    self.versions = versions;
    versions.on("beforeCollapsedChange", function beforeCollapsedChange(e) {
      if(!e.newValue) {
        versions.detach("beforeCollapsedChange", beforeCollapsedChange);
        self.sync()
      }
    });
    save.on("click", function(ev) {
      self.save(false);
      ev.halt()
    });
    addRes.call(self, save);
    if(editor.get("textarea")[0].form) {
      (function() {
        var textarea = editor.get("textarea"), form = textarea[0].form;
        function saveF() {
          self.save(true)
        }
        Event.on(form, "submit", saveF);
        addRes.call(self, function() {
          Event.remove(form, "submit", saveF)
        })
      })()
    }
    var timer = setInterval(function() {
      self.save(true)
    }, self.draftInterval * 60 * 1E3);
    addRes.call(self, function() {
      clearInterval(timer)
    });
    versions.on("click", self.recover, self);
    addRes.call(self, versions);
    self.holder = holder;
    if(cfg.draft.helpHTML) {
      var help = (new Node("<a " + 'tabindex="0" ' + 'hidefocus="hidefocus" ' + 'class="' + prefixCls + 'editor-draft-help" ' + 'title="\u70b9\u51fb\u67e5\u770b\u5e2e\u52a9" ' + "href=\"javascript:void('\u70b9\u51fb\u67e5\u770b\u5e2e\u52a9 ')\">\u70b9\u51fb\u67e5\u770b\u5e2e\u52a9</a>")).unselectable(undefined).appendTo(holder);
      help.on("click", function() {
        help[0].focus();
        if(self.helpPopup && self.helpPopup.get("visible")) {
          self.helpPopup.hide()
        }else {
          self._prepareHelp()
        }
      });
      help.on("blur", function() {
        if(self.helpPopup) {
          self.helpPopup.hide()
        }
      });
      self.helpBtn = help;
      addRes.call(self, help);
      Editor.Utils.lazyRun(self, "_prepareHelp", "_realHelp")
    }
    addRes.call(self, holder)
  }, _prepareHelp:function() {
    var self = this, editor = self.editor, prefixCls = editor.get("prefixCls"), cfg = self.config, draftCfg = cfg.draft, help = new Node(draftCfg.helpHTML || "");
    var arrowCss = "height:0;" + "position:absolute;" + "font-size:0;" + "width:0;" + "border:8px #000 solid;" + "border-color:#000 transparent transparent transparent;" + "border-style:solid dashed dashed dashed;";
    var arrow = new Node('<div style="' + arrowCss + "border-top-color:#CED5E0;" + '">' + '<div style="' + arrowCss + "left:-8px;" + "top:-10px;" + "border-top-color:white;" + '">' + "</div>" + "</div>");
    help.append(arrow);
    help.css({border:"1px solid #ACB4BE", "text-align":"left"});
    self.helpPopup = (new Overlay({content:help, prefixCls:prefixCls + "editor-", width:help.width() + "px", zIndex:Editor.baseZIndex(Editor.ZIndexManager.OVERLAY), mask:false})).render();
    self.helpPopup.get("el").css("border", "none");
    self.helpPopup.arrow = arrow
  }, _realHelp:function() {
    var win = this.helpPopup, helpBtn = this.helpBtn, arrow = win.arrow;
    win.show();
    var off = helpBtn.offset();
    win.get("el").offset({left:off.left - win.get("el").width() + 17, top:off.top - win.get("el").height() - 7});
    arrow.offset({left:off.left - 2, top:off.top - 8})
  }, disable:function() {
    this.holder.css("visibility", "hidden")
  }, enable:function() {
    this.holder.css("visibility", "")
  }, sync:function() {
    var self = this, i, draftLimit = self.draftLimit, timeTip = self.timeTip, versions = self.versions, drafts = self._getDrafts(), draft, tip;
    if(drafts.length > draftLimit) {
      drafts.splice(0, drafts.length - draftLimit)
    }
    versions.removeItems(true);
    for(i = 0;i < drafts.length;i++) {
      draft = drafts[i];
      tip = (draft.auto ? "\u81ea\u52a8" : "\u624b\u52a8") + "\u4fdd\u5b58\u4e8e : " + date(draft.date);
      versions.addItem({content:tip, value:i})
    }
    if(!drafts.length) {
      versions.addItem({disabled:true, content:"\u5c1a\u65e0\u5386\u53f2", value:""})
    }
    timeTip.html(tip);
    localStorage.setItem(self._getSaveKey(), localStorage === window.localStorage ? encodeURIComponent(Json.stringify(drafts)) : drafts)
  }, save:function(auto) {
    var self = this, drafts = self._getDrafts(), editor = self.editor, data = editor.getFormatData();
    if(!data) {
      return
    }
    if(drafts[drafts.length - 1] && data === drafts[drafts.length - 1].content) {
      drafts.length -= 1
    }
    self.drafts = drafts.concat({content:data, date:(new Date).getTime(), auto:auto});
    self.sync()
  }, recover:function(ev) {
    var self = this, editor = self.editor, drafts = self._getDrafts(), v = ev.target.get("value");
    if(window.confirm("\u786e\u8ba4\u6062\u590d " + date(drafts[v].date) + " \u7684\u7f16\u8f91\u5386\u53f2\uff1f")) {
      editor.execCommand("save");
      editor.setData(drafts[v].content);
      editor.execCommand("save")
    }
    ev.halt()
  }, destroy:function() {
    destroyRes.call(this)
  }});
  function init(editor, config) {
    var d = new Draft(editor, config);
    editor.on("destroy", function() {
      d.destroy()
    })
  }
  function DraftPlugin(config) {
    this.config = config || {}
  }
  S.augment(DraftPlugin, {pluginRenderUI:function(editor) {
    var config = this.config;
    if(localStorage.ready) {
      localStorage.ready(function() {
        init(editor, config)
      })
    }else {
      init(editor, config)
    }
  }});
  return DraftPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/local-storage
*/

KISSY.add("editor/plugin/local-storage", ["editor", "overlay", "./flash-bridge"], function(S, require) {
  var Editor = require("editor");
  var Overlay = require("overlay");
  var FlashBridge = require("./flash-bridge");
  var ie = S.UA.ieMode;
  if((!ie || ie > 8) && window.localStorage) {
    return window.localStorage
  }
  var swfSrc = Editor.Utils.debugUrl("plugin/local-storage/assets/swfstore.swf?t=" + +new Date);
  var css = {width:215, border:"1px solid red"}, reverseCss = {width:0, border:"none"};
  var o = new Overlay({prefixCls:"ks-editor-", elStyle:{background:"white"}, width:"0px", content:'<h1 style="' + 'text-align:center;">\u8bf7\u70b9\u51fb\u5141\u8bb8</h1>' + '<div class="storage-container"></div>', zIndex:Editor.baseZIndex(Editor.ZIndexManager.STORE_FLASH_SHOW)});
  o.render();
  o.show();
  var store = new FlashBridge({src:swfSrc, render:o.get("contentEl").one(".storage-container"), params:{flashVars:{useCompression:true}}, attrs:{height:138, width:"100%"}, methods:["setItem", "removeItem", "getItem", "setMinDiskSpace", "getValueOf"]});
  S.ready(function() {
    setTimeout(function() {
      o.center()
    }, 0)
  });
  store.on("pending", function() {
    o.get("el").css(css);
    o.center();
    o.show();
    setTimeout(function() {
      store.retrySave()
    }, 1E3)
  });
  store.on("save", function() {
    o.get("el").css(reverseCss)
  });
  var oldSet = store.setItem;
  S.mix(store, {_ke:1, getItem:function(k) {
    return this.getValueOf(k)
  }, retrySave:function() {
    var self = this;
    self.setItem(self.lastSave.k, self.lastSave.v)
  }, setItem:function(k, v) {
    var self = this;
    self.lastSave = {k:k, v:v};
    oldSet.call(self, k, v)
  }});
  store.on("contentReady", function() {
    store._ready = 1
  });
  return store
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/flash-bridge
*/

KISSY.add("editor/plugin/flash-bridge", ["editor", "swf", "event"], function(S, require) {
  var Editor = require("editor");
  var SWF = require("swf");
  var Event = require("event");
  var instances = {};
  var logger = S.getLogger("s/editor/plugin/flash-bridge");
  function FlashBridge(cfg) {
    this._init(cfg)
  }
  S.augment(FlashBridge, Event.Target, {_init:function(cfg) {
    var self = this, id = S.guid("flash-bridge-"), callback = "KISSY.require('editor').FlashBridge.EventHandler";
    cfg.id = id;
    cfg.attrs = cfg.attrs || {};
    cfg.params = cfg.params || {};
    var attrs = cfg.attrs, params = cfg.params, flashVars = params.flashVars = params.flashVars || {};
    S.mix(attrs, {width:1, height:1}, false);
    S.mix(params, {allowScriptAccess:"always", allowNetworking:"all", scale:"noScale"}, false);
    S.mix(flashVars, {shareData:false, useCompression:false}, false);
    var swfCore = {YUISwfId:id, YUIBridgeCallback:callback};
    if(cfg.ajbridge) {
      swfCore = {swfID:id, jsEntry:callback}
    }
    S.mix(flashVars, swfCore);
    instances[id] = self;
    self.id = id;
    self.swf = new SWF(cfg);
    self._expose(cfg.methods)
  }, _expose:function(methods) {
    var self = this;
    for(var i = 0;i < methods.length;i++) {
      var m = methods[i];
      (function(m) {
        self[m] = function() {
          return self._callSWF(m, S.makeArray(arguments))
        }
      })(m)
    }
  }, _callSWF:function(func, args) {
    return this.swf.callSWF(func, args)
  }, _eventHandler:function(event) {
    var self = this, type = event.type;
    if(type === "log") {
      logger.debug(event.message)
    }else {
      if(type) {
        self.fire(type, event)
      }
    }
  }, ready:function(fn) {
    var self = this;
    if(self._ready) {
      fn.call(this)
    }else {
      self.on("contentReady", fn)
    }
  }, destroy:function() {
    this.swf.destroy();
    delete instances[this.id]
  }});
  FlashBridge.EventHandler = function(id, event) {
    logger.debug("fire event: " + event.type);
    var instance = instances[id];
    if(instance) {
      setTimeout(function() {
        instance._eventHandler.call(instance, event)
      }, 100)
    }
  };
  Editor.FlashBridge = FlashBridge;
  return FlashBridge
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Feb 25 16:37
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 swf/ua
 swf
*/

KISSY.add("swf/ua", [], function(S) {
  var fpvCached, firstRun = true, win = S.Env.host;
  function getFlashVersion() {
    var ver, SF = "ShockwaveFlash";
    if(navigator.plugins && navigator.mimeTypes.length) {
      ver = (navigator.plugins["Shockwave Flash"] || 0).description
    }else {
      if(win.ActiveXObject) {
        try {
          ver = (new win.ActiveXObject(SF + "." + SF)).GetVariable("$version")
        }catch(ex) {
        }
      }
    }
    if(!ver) {
      return undefined
    }
    return getArrayVersion(ver)
  }
  function getArrayVersion(ver) {
    return ver.match(/\d+/g).splice(0, 3)
  }
  function getNumberVersion(ver) {
    var arr = typeof ver === "string" ? getArrayVersion(ver) : ver, ret = ver;
    if(S.isArray(arr)) {
      ret = parseFloat(arr[0] + "." + pad(arr[1], 3) + pad(arr[2], 5))
    }
    return ret || 0
  }
  function pad(num, n) {
    num = num || 0;
    num += "";
    var padding = n + 1 - num.length;
    return(new Array(padding > 0 ? padding : 0)).join("0") + num
  }
  function fpv(force) {
    if(force || firstRun) {
      firstRun = false;
      fpvCached = getFlashVersion()
    }
    return fpvCached
  }
  function fpvGTE(ver, force) {
    return getNumberVersion(fpv(force)) >= getNumberVersion(ver)
  }
  return{fpv:fpv, fpvGTE:fpvGTE}
});
KISSY.add("swf", ["dom", "json", "attribute", "swf/ua"], function(S, require) {
  var Dom = require("dom");
  var Json = require("json");
  var Attribute = require("attribute");
  var FlashUA = require("swf/ua");
  var OLD_IE = !!S.Env.host.ActiveXObject, TYPE = "application/x-shockwave-flash", CID = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", FLASHVARS = "flashvars", EMPTY = "", LT = "<", GT = ">", doc = S.Env.host.document, fpv = FlashUA.fpv, fpvGEQ = FlashUA.fpvGEQ, fpvGTE = FlashUA.fpvGTE, OBJECT_TAG = "object", encode = encodeURIComponent, PARAMS = {wmode:EMPTY, allowscriptaccess:EMPTY, allownetworking:EMPTY, allowfullscreen:EMPTY, play:"false", loop:EMPTY, menu:EMPTY, quality:EMPTY, scale:EMPTY, salign:EMPTY, 
  bgcolor:EMPTY, devicefont:EMPTY, hasPriority:EMPTY, base:EMPTY, swliveconnect:EMPTY, seamlesstabbing:EMPTY};
  var SWF;
  SWF = Attribute.extend({constructor:function(config) {
    var self = this;
    self.callSuper(config);
    var expressInstall = self.get("expressInstall"), swf, html, id, htmlMode = self.get("htmlMode"), flashVars, params = self.get("params"), attrs = self.get("attrs"), doc = self.get("document"), placeHolder = Dom.create("<span>", undefined, doc), elBefore = self.get("elBefore"), installedSrc = self.get("src"), hasNoId = !("id" in attrs), idRegExp, version = self.get("version");
    id = attrs.id = attrs.id || S.guid("ks-swf-");
    if(hasNoId) {
      idRegExp = new RegExp("\\s+id\\s*=\\s*['\"]?" + S.escapeRegExp(id) + "['\"]?", "i")
    }
    if(!fpv()) {
      self.set("status", SWF.Status.NOT_INSTALLED);
      return
    }
    if(version && !fpvGTE(version)) {
      self.set("status", SWF.Status.TOO_LOW);
      if(expressInstall) {
        installedSrc = expressInstall;
        if(!("width" in attrs) || !/%$/.test(attrs.width) && parseInt(attrs.width, 10) < 310) {
          attrs.width = "310"
        }
        if(!("height" in attrs) || !/%$/.test(attrs.height) && parseInt(attrs.height, 10) < 137) {
          attrs.height = "137"
        }
        flashVars = params.flashVars = params.flashVars || {};
        S.mix(flashVars, {MMredirectURL:location.href, MMplayerType:OLD_IE ? "ActiveX" : "PlugIn", MMdoctitle:doc.title.slice(0, 47) + " - Flash Player Installation"})
      }
    }
    if(htmlMode === "full") {
      html = _stringSWFFull(installedSrc, attrs, params)
    }else {
      html = _stringSWFDefault(installedSrc, attrs, params)
    }
    self.set("html", idRegExp ? html.replace(idRegExp, "") : html);
    if(elBefore) {
      Dom.insertBefore(placeHolder, elBefore)
    }else {
      Dom.append(placeHolder, self.get("render"))
    }
    if("outerHTML" in placeHolder) {
      placeHolder.outerHTML = html
    }else {
      placeHolder.parentNode.replaceChild(Dom.create(html), placeHolder)
    }
    swf = Dom.get("#" + id, doc);
    if(htmlMode === "full") {
      if(OLD_IE) {
        self.set("swfObject", swf)
      }else {
        self.set("swfObject", swf.parentNode)
      }
    }else {
      self.set("swfObject", swf)
    }
    if(hasNoId) {
      Dom.removeAttr(swf, "id")
    }
    self.set("el", swf);
    if(!self.get("status")) {
      self.set("status", SWF.Status.SUCCESS)
    }
  }, callSWF:function(func, args) {
    var swf = this.get("el"), ret, params;
    args = args || [];
    try {
      if(swf[func]) {
        ret = swf[func].apply(swf, args)
      }
    }catch(e) {
      params = "";
      if(args.length !== 0) {
        params = '"' + args.join('", "') + '"'
      }
      ret = (new Function("swf", "return swf." + func + "(" + params + ");"))(swf)
    }
    return ret
  }, destroy:function() {
    var self = this;
    var swfObject = self.get("swfObject");
    if(OLD_IE) {
      swfObject.style.display = "none";
      (function remove() {
        if(swfObject.readyState === 4) {
          removeObjectInIE(swfObject)
        }else {
          setTimeout(remove, 10)
        }
      })()
    }else {
      swfObject.parentNode.removeChild(swfObject)
    }
  }}, {ATTRS:{expressInstall:{value:S.config("base") + "swf/assets/expressInstall.swf"}, src:{}, version:{value:"9"}, params:{value:{}}, attrs:{value:{}}, render:{setter:function(v) {
    if(typeof v === "string") {
      v = Dom.get(v, this.get("document"))
    }
    return v
  }, valueFn:function() {
    return document.body
  }}, elBefore:{setter:function(v) {
    if(typeof v === "string") {
      v = Dom.get(v, this.get("document"))
    }
    return v
  }}, document:{value:doc}, status:{}, el:{}, swfObject:{}, html:{}, htmlMode:{value:"default"}}, getSrc:function(swf) {
    swf = Dom.get(swf);
    var srcElement = getSrcElements(swf)[0], nodeName = srcElement && Dom.nodeName(srcElement);
    if(nodeName === "embed") {
      return Dom.attr(srcElement, "src")
    }else {
      if(nodeName === "object") {
        return Dom.attr(srcElement, "data")
      }else {
        if(nodeName === "param") {
          return Dom.attr(srcElement, "value")
        }
      }
    }
    return null
  }, Status:{TOO_LOW:"flash version is too low", NOT_INSTALLED:"flash is not installed", SUCCESS:"success"}, HtmlMode:{DEFAULT:"default", FULL:"full"}, fpv:fpv, fpvGEQ:fpvGEQ, fpvGTE:fpvGTE});
  function removeObjectInIE(obj) {
    for(var i in obj) {
      if(typeof obj[i] === "function") {
        obj[i] = null
      }
    }
    obj.parentNode.removeChild(obj)
  }
  function getSrcElements(swf) {
    var url = "", params, i, param, elements = [], nodeName = Dom.nodeName(swf);
    if(nodeName === "object") {
      url = Dom.attr(swf, "data");
      if(url) {
        elements.push(swf)
      }
      params = swf.childNodes;
      for(i = 0;i < params.length;i++) {
        param = params[i];
        if(param.nodeType === 1) {
          if((Dom.attr(param, "name") || "").toLowerCase() === "movie") {
            elements.push(param)
          }else {
            if(Dom.nodeName(param) === "embed") {
              elements.push(param)
            }else {
              if(Dom.nodeName(params[i]) === "object") {
                elements.push(param)
              }
            }
          }
        }
      }
    }else {
      if(nodeName === "embed") {
        elements.push(swf)
      }
    }
    return elements
  }
  function collectionParams(params) {
    var par = EMPTY;
    S.each(params, function(v, k) {
      k = k.toLowerCase();
      if(k in PARAMS) {
        par += stringParam(k, v)
      }else {
        if(k === FLASHVARS) {
          par += stringParam(k, toFlashVars(v))
        }
      }
    });
    return par
  }
  function _stringSWFDefault(src, attrs, params) {
    return _stringSWF(src, attrs, params, OLD_IE) + LT + "/" + OBJECT_TAG + GT
  }
  function _stringSWF(src, attrs, params, ie) {
    var res, attr = EMPTY, par = EMPTY;
    S.each(attrs, function(v, k) {
      attr += stringAttr(k, v)
    });
    if(ie) {
      attr += stringAttr("classid", CID);
      par += stringParam("movie", src)
    }else {
      attr += stringAttr("data", src);
      attr += stringAttr("type", TYPE)
    }
    par += collectionParams(params);
    res = LT + OBJECT_TAG + attr + GT + par;
    return res
  }
  function _stringSWFFull(src, attrs, params) {
    var outside, inside;
    if(OLD_IE) {
      outside = _stringSWF(src, attrs, params, 1);
      delete attrs.id;
      delete attrs.style;
      inside = _stringSWF(src, attrs, params, 0)
    }else {
      inside = _stringSWF(src, attrs, params, 0);
      delete attrs.id;
      delete attrs.style;
      outside = _stringSWF(src, attrs, params, 1)
    }
    return outside + inside + LT + "/" + OBJECT_TAG + GT + LT + "/" + OBJECT_TAG + GT
  }
  function toFlashVars(obj) {
    var arr = [], ret;
    S.each(obj, function(data, prop) {
      if(typeof data !== "string") {
        data = Json.stringify(data)
      }
      if(data) {
        arr.push(prop + "=" + encode(data))
      }
    });
    ret = arr.join("&");
    return ret
  }
  function stringParam(key, value) {
    return'<param name="' + key + '" value="' + value + '"></param>'
  }
  function stringAttr(key, value) {
    return" " + key + "=" + '"' + value + '"'
  }
  return SWF
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/undo
*/

KISSY.add("editor/plugin/undo", ["editor", "./undo/btn", "./undo/cmd", "./button"], function(S, require) {
  var Editor = require("editor");
  var Btn = require("./undo/btn");
  var cmd = require("./undo/cmd");
  require("./button");
  function undo() {
  }
  S.augment(undo, {pluginRenderUI:function(editor) {
    editor.addButton("undo", {mode:Editor.Mode.WYSIWYG_MODE, tooltip:"\u64a4\u9500", editor:editor}, Btn.UndoBtn);
    editor.addButton("redo", {mode:Editor.Mode.WYSIWYG_MODE, tooltip:"\u91cd\u505a", editor:editor}, Btn.RedoBtn);
    cmd.init(editor)
  }});
  return undo
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/undo/btn
*/

KISSY.add("editor/plugin/undo/btn", ["../button", "editor"], function(S, require) {
  var Button = require("../button");
  var Editor = require("editor");
  var UndoBtn = Button.extend({__lock:true, bindUI:function() {
    var self = this, editor = self.get("editor");
    self.on("click", function() {
      editor.execCommand("undo")
    });
    editor.on("afterUndo afterRedo afterSave", function(ev) {
      var index = ev.index;
      if(index > 0) {
        self.set("disabled", self.__lock = false)
      }else {
        self.set("disabled", self.__lock = true)
      }
    })
  }}, {ATTRS:{mode:{value:Editor.Mode.WYSIWYG_MODE}, disabled:{value:true, setter:function(v) {
    if(this.__lock) {
      v = true
    }
    return v
  }}}});
  var RedoBtn = Button.extend({__lock:true, bindUI:function() {
    var self = this, editor = self.get("editor");
    self.on("click", function() {
      editor.execCommand("redo")
    });
    editor.on("afterUndo afterRedo afterSave", function(ev) {
      var history = ev.history, index = ev.index;
      if(index < history.length - 1) {
        self.set("disabled", self.__lock = false)
      }else {
        self.set("disabled", self.__lock = true)
      }
    })
  }}, {ATTRS:{mode:{value:Editor.Mode.WYSIWYG_MODE}, disabled:{value:true, setter:function(v) {
    if(this.__lock) {
      v = true
    }
    return v
  }}}});
  return{RedoBtn:RedoBtn, UndoBtn:UndoBtn}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/undo/cmd
*/

KISSY.add("editor/plugin/undo/cmd", ["editor"], function(S, require) {
  var Editor = require("editor");
  var UA = S.UA, LIMIT = 30;
  function Snapshot(editor) {
    var contents = editor.get("document")[0].body.innerHTML, self = this, selection;
    if(contents) {
      selection = editor.getSelection()
    }
    self.contents = contents;
    self.bookmarks = selection && selection.createBookmarks2(true)
  }
  S.augment(Snapshot, {equals:function(otherImage) {
    var self = this, thisContents = self.contents, otherContents = otherImage.contents;
    return thisContents === otherContents
  }});
  function UndoManager(editor) {
    var self = this;
    self.history = [];
    self.index = -1;
    self.editor = editor;
    self.bufferRunner = S.buffer(self.save, 500, self);
    self._init()
  }
  var modifierKeyCodes = {16:1, 17:1, 18:1}, navigationKeyCodes = {37:1, 38:1, 39:1, 40:1, 33:1, 34:1}, zKeyCode = 90, yKeyCode = 89;
  S.augment(UndoManager, {_keyMonitor:function() {
    var self = this, editor = self.editor;
    editor.docReady(function() {
      editor.get("document").on("keydown", function(ev) {
        var keyCode = ev.keyCode;
        if(keyCode in navigationKeyCodes || keyCode in modifierKeyCodes) {
          return
        }
        if(keyCode === zKeyCode && (ev.ctrlKey || ev.metaKey)) {
          if(false !== editor.fire("beforeRedo")) {
            self.restore(-1)
          }
          ev.halt();
          return
        }
        if(keyCode === yKeyCode && (ev.ctrlKey || ev.metaKey)) {
          if(false !== editor.fire("beforeUndo")) {
            self.restore(1)
          }
          ev.halt();
          return
        }
        if(editor.fire("beforeSave", {buffer:1}) !== false) {
          self.save(1)
        }
      })
    })
  }, _init:function() {
    var self = this, editor = self.editor;
    self._keyMonitor();
    setTimeout(function() {
      if(editor.get("mode") === Editor.Mode.WYSIWYG_MODE) {
        if(editor.isDocReady()) {
          self.save()
        }else {
          editor.on("docReady", function docReady() {
            self.save();
            editor.detach("docReady", docReady)
          })
        }
      }
    }, 0)
  }, save:function(buffer) {
    var editor = this.editor;
    if(editor.get("mode") !== Editor.Mode.WYSIWYG_MODE) {
      return
    }
    if(!editor.get("document")) {
      return
    }
    if(buffer) {
      this.bufferRunner();
      return
    }
    var self = this, history = self.history, l = history.length, index = self.index;
    l = Math.min(l, index + 1);
    var last = history[l - 1], current = new Snapshot(editor);
    if(!last || !last.equals(current)) {
      history.length = l;
      if(l === LIMIT) {
        history.shift();
        l--
      }
      history.push(current);
      self.index = index = l;
      editor.fire("afterSave", {history:history, index:index})
    }
  }, restore:function(d) {
    if(this.editor.get("mode") !== Editor.Mode.WYSIWYG_MODE) {
      return undefined
    }
    var self = this, history = self.history, editor = self.editor, editorDomBody = editor.get("document")[0].body, snapshot = history[self.index + d];
    if(snapshot) {
      editorDomBody.innerHTML = snapshot.contents;
      if(snapshot.bookmarks) {
        editor.getSelection().selectBookmarks(snapshot.bookmarks)
      }else {
        if(UA.ie) {
          var $range = editorDomBody.createTextRange();
          $range.collapse(true);
          $range.select()
        }
      }
      var selection = editor.getSelection();
      if(selection) {
        selection.scrollIntoView()
      }
      self.index += d;
      editor.fire(d < 0 ? "afterUndo" : "afterRedo", {history:history, index:self.index});
      editor.notifySelectionChange()
    }
    return snapshot
  }});
  return{init:function(editor) {
    if(!editor.hasCommand("save")) {
      var undoRedo = new UndoManager(editor);
      editor.addCommand("save", {exec:function(_, buffer) {
        editor.focus();
        undoRedo.save(buffer)
      }});
      editor.addCommand("undo", {exec:function() {
        editor.focus();
        undoRedo.restore(-1)
      }});
      editor.addCommand("redo", {exec:function() {
        editor.focus();
        undoRedo.restore(1)
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/indent
*/

KISSY.add("editor/plugin/indent", ["editor", "./indent/cmd", "./button"], function(S, require) {
  var Editor = require("editor");
  var indexCmd = require("./indent/cmd");
  require("./button");
  function Indent() {
  }
  S.augment(Indent, {pluginRenderUI:function(editor) {
    indexCmd.init(editor);
    editor.addButton("indent", {tooltip:"\u589e\u52a0\u7f29\u8fdb\u91cf", listeners:{click:function() {
      editor.execCommand("indent");
      editor.focus()
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return Indent
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/indent/cmd
*/

KISSY.add("editor/plugin/indent/cmd", ["../dent-cmd"], function(S, require) {
  var dentUtils = require("../dent-cmd");
  var addCommand = dentUtils.addCommand;
  return{init:function(editor) {
    addCommand(editor, "indent")
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/dent-cmd
*/

KISSY.add("editor/plugin/dent-cmd", ["editor", "./list-utils"], function(S, require) {
  var Editor = require("editor");
  var ListUtils = require("./list-utils");
  var listNodeNames = {ol:1, ul:1}, Walker = Editor.Walker, Dom = S.DOM, Node = S.Node, UA = S.UA, isNotWhitespaces = Walker.whitespaces(true), INDENT_CSS_PROPERTY = "margin-left", INDENT_OFFSET = 40, INDENT_UNIT = "px", isNotBookmark = Walker.bookmark(false, true);
  function isListItem(node) {
    return node.nodeType === Dom.NodeType.ELEMENT_NODE && Dom.nodeName(node) === "li"
  }
  function indentList(range, listNode, type) {
    var startContainer = range.startContainer, endContainer = range.endContainer;
    while(startContainer && !startContainer.parent().equals(listNode)) {
      startContainer = startContainer.parent()
    }
    while(endContainer && !endContainer.parent().equals(listNode)) {
      endContainer = endContainer.parent()
    }
    if(!startContainer || !endContainer) {
      return
    }
    var block = startContainer, itemsToMove = [], stopFlag = false;
    while(!stopFlag) {
      if(block.equals(endContainer)) {
        stopFlag = true
      }
      itemsToMove.push(block);
      block = block.next()
    }
    if(itemsToMove.length < 1) {
      return
    }
    var listParents = listNode._4eParents(true, undefined);
    listParents.each(function(n, i) {
      listParents[i] = n
    });
    for(var i = 0;i < listParents.length;i++) {
      if(listNodeNames[listParents[i].nodeName()]) {
        listNode = listParents[i];
        break
      }
    }
    var indentOffset = type === "indent" ? 1 : -1, startItem = itemsToMove[0], lastItem = itemsToMove[itemsToMove.length - 1], database = {};
    var listArray = ListUtils.listToArray(listNode, database);
    var baseIndent = listArray[lastItem.data("listarray_index")].indent;
    for(i = startItem.data("listarray_index");i <= lastItem.data("listarray_index");i++) {
      listArray[i].indent += indentOffset;
      var listRoot = listArray[i].parent;
      listArray[i].parent = new Node(listRoot[0].ownerDocument.createElement(listRoot.nodeName()))
    }
    for(i = lastItem.data("listarray_index") + 1;i < listArray.length && listArray[i].indent > baseIndent;i++) {
      listArray[i].indent += indentOffset
    }
    var newList = ListUtils.arrayToList(listArray, database, null, "p");
    var pendingList = [];
    var parentLiElement;
    if(type === "outdent") {
      if((parentLiElement = listNode.parent()) && parentLiElement.nodeName() === "li") {
        var children = newList.listNode.childNodes, count = children.length, child;
        for(i = count - 1;i >= 0;i--) {
          if((child = new Node(children[i])) && child.nodeName() === "li") {
            pendingList.push(child)
          }
        }
      }
    }
    if(newList) {
      Dom.insertBefore(newList.listNode[0] || newList.listNode, listNode[0] || listNode);
      listNode.remove()
    }
    if(pendingList && pendingList.length) {
      for(i = 0;i < pendingList.length;i++) {
        var li = pendingList[i], followingList = li;
        while((followingList = followingList.next()) && followingList.nodeName() in listNodeNames) {
          if(UA.ie && !li.first(function(node) {
            return isNotWhitespaces(node) && isNotBookmark(node)
          }, 1)) {
            li[0].appendChild(range.document.createTextNode("\u00a0"))
          }
          li[0].appendChild(followingList[0])
        }
        Dom.insertAfter(li[0], parentLiElement[0])
      }
    }
    Editor.Utils.clearAllMarkers(database)
  }
  function indentBlock(range, type) {
    var iterator = range.createIterator(), block;
    iterator.enforceRealBlocks = true;
    iterator.enlargeBr = true;
    while(block = iterator.getNextParagraph()) {
      indentElement(block, type)
    }
  }
  function indentElement(element, type) {
    var currentOffset = parseInt(element.style(INDENT_CSS_PROPERTY), 10);
    if(isNaN(currentOffset)) {
      currentOffset = 0
    }
    currentOffset += (type === "indent" ? 1 : -1) * INDENT_OFFSET;
    if(currentOffset < 0) {
      return false
    }
    currentOffset = Math.max(currentOffset, 0);
    currentOffset = Math.ceil(currentOffset / INDENT_OFFSET) * INDENT_OFFSET;
    element.css(INDENT_CSS_PROPERTY, currentOffset ? currentOffset + INDENT_UNIT : "");
    if(element[0].style.cssText === "") {
      element.removeAttr("style")
    }
    return true
  }
  function indentEditor(editor, type) {
    var selection = editor.getSelection(), range = selection && selection.getRanges()[0];
    if(!range) {
      return
    }
    var startContainer = range.startContainer, endContainer = range.endContainer, rangeRoot = range.getCommonAncestor(), nearestListBlock = rangeRoot;
    while(nearestListBlock && !(nearestListBlock[0].nodeType === Dom.NodeType.ELEMENT_NODE && listNodeNames[nearestListBlock.nodeName()])) {
      nearestListBlock = nearestListBlock.parent()
    }
    var walker;
    if(nearestListBlock && startContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE && startContainer.nodeName() in listNodeNames) {
      walker = new Walker(range);
      walker.evaluator = isListItem;
      range.startContainer = walker.next()
    }
    if(nearestListBlock && endContainer[0].nodeType === Dom.NodeType.ELEMENT_NODE && endContainer.nodeName() in listNodeNames) {
      walker = new Walker(range);
      walker.evaluator = isListItem;
      range.endContainer = walker.previous()
    }
    var bookmarks = selection.createBookmarks(true);
    if(nearestListBlock) {
      var firstListItem = nearestListBlock.first();
      while(firstListItem && firstListItem.nodeName() !== "li") {
        firstListItem = firstListItem.next()
      }
      var rangeStart = range.startContainer, indentWholeList = firstListItem[0] === rangeStart[0] || firstListItem.contains(rangeStart);
      if(!(indentWholeList && indentElement(nearestListBlock, type))) {
        indentList(range, nearestListBlock, type)
      }
    }else {
      indentBlock(range, type)
    }
    selection.selectBookmarks(bookmarks)
  }
  function addCommand(editor, cmdType) {
    if(!editor.hasCommand(cmdType)) {
      editor.addCommand(cmdType, {exec:function(editor) {
        editor.execCommand("save");
        indentEditor(editor, cmdType);
        editor.execCommand("save");
        editor.notifySelectionChange()
      }})
    }
  }
  return{checkOutdentActive:function(elementPath) {
    var blockLimit = elementPath.blockLimit;
    if(elementPath.contains(listNodeNames)) {
      return true
    }else {
      var block = elementPath.block || blockLimit;
      return block && block.style(INDENT_CSS_PROPERTY)
    }
  }, addCommand:addCommand}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/list-utils
*/

KISSY.add("editor/plugin/list-utils", [], function(S) {
  var listNodeNames = {ol:1, ul:1}, Node = S.Node, Dom = S.DOM, NodeType = Dom.NodeType, UA = S.UA, list = {listToArray:function(listNode, database, baseArray, baseIndentLevel, grandparentNode) {
    if(!listNodeNames[listNode.nodeName()]) {
      return[]
    }
    if(!baseIndentLevel) {
      baseIndentLevel = 0
    }
    if(!baseArray) {
      baseArray = []
    }
    for(var i = 0, count = listNode[0].childNodes.length;i < count;i++) {
      var listItem = new Node(listNode[0].childNodes[i]);
      if(listItem.nodeName() !== "li") {
        continue
      }
      var itemObj = {parent:listNode, indent:baseIndentLevel, element:listItem, contents:[]};
      if(!grandparentNode) {
        itemObj.grandparent = listNode.parent();
        if(itemObj.grandparent && itemObj.grandparent.nodeName() === "li") {
          itemObj.grandparent = itemObj.grandparent.parent()
        }
      }else {
        itemObj.grandparent = grandparentNode
      }
      if(database) {
        listItem._4eSetMarker(database, "listarray_index", baseArray.length, undefined)
      }
      baseArray.push(itemObj);
      for(var j = 0, itemChildCount = listItem[0].childNodes.length, child;j < itemChildCount;j++) {
        child = new Node(listItem[0].childNodes[j]);
        if(child[0].nodeType === Dom.NodeType.ELEMENT_NODE && listNodeNames[child.nodeName()]) {
          list.listToArray(child, database, baseArray, baseIndentLevel + 1, itemObj.grandparent)
        }else {
          itemObj.contents.push(child)
        }
      }
    }
    return baseArray
  }, arrayToList:function(listArray, database, baseIndex, paragraphMode) {
    if(!baseIndex) {
      baseIndex = 0
    }
    if(!listArray || listArray.length < baseIndex + 1) {
      return null
    }
    var doc = listArray[baseIndex].parent[0].ownerDocument, retval = doc.createDocumentFragment(), rootNode = null, i, currentIndex = baseIndex, indentLevel = Math.max(listArray[baseIndex].indent, 0), currentListItem = null;
    while(true) {
      var item = listArray[currentIndex];
      if(item.indent === indentLevel) {
        if(!rootNode || listArray[currentIndex].parent.nodeName() !== rootNode.nodeName()) {
          rootNode = listArray[currentIndex].parent.clone(false);
          retval.appendChild(rootNode[0])
        }
        currentListItem = rootNode[0].appendChild(item.element.clone(false)[0]);
        for(i = 0;i < item.contents.length;i++) {
          currentListItem.appendChild(item.contents[i].clone(true)[0])
        }
        currentIndex++
      }else {
        if(item.indent === Math.max(indentLevel, 0) + 1) {
          var listData = list.arrayToList(listArray, null, currentIndex, paragraphMode);
          currentListItem.appendChild(listData.listNode);
          currentIndex = listData.nextIndex
        }else {
          if(item.indent === -1 && !baseIndex && item.grandparent) {
            if(listNodeNames[item.grandparent.nodeName()]) {
              currentListItem = item.element.clone(false)[0]
            }else {
              if(item.grandparent.nodeName() !== "td") {
                currentListItem = doc.createElement(paragraphMode);
                item.element._4eCopyAttributes(new Node(currentListItem))
              }else {
                currentListItem = doc.createDocumentFragment()
              }
            }
            for(i = 0;i < item.contents.length;i++) {
              var ic = item.contents[i].clone(true);
              if(currentListItem.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
                item.element._4eCopyAttributes(new Node(ic))
              }
              currentListItem.appendChild(ic[0])
            }
            if(currentListItem.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE && currentIndex !== listArray.length - 1) {
              if(currentListItem.lastChild && currentListItem.lastChild.nodeType === Dom.NodeType.ELEMENT_NODE && currentListItem.lastChild.getAttribute("type") === "_moz") {
                Dom._4eRemove(currentListItem.lastChild)
              }
              Dom._4eAppendBogus(currentListItem)
            }
            if(currentListItem.nodeType === Dom.NodeType.ELEMENT_NODE && Dom.nodeName(currentListItem) === paragraphMode && currentListItem.firstChild) {
              Dom._4eTrim(currentListItem);
              var firstChild = currentListItem.firstChild;
              if(firstChild.nodeType === Dom.NodeType.ELEMENT_NODE && Dom._4eIsBlockBoundary(firstChild)) {
                var tmp = doc.createDocumentFragment();
                Dom._4eMoveChildren(currentListItem, tmp);
                currentListItem = tmp
              }
            }
            var currentListItemName = Dom.nodeName(currentListItem);
            if(!UA.ie && (currentListItemName === "div" || currentListItemName === "p")) {
              Dom._4eAppendBogus(currentListItem)
            }
            retval.appendChild(currentListItem);
            rootNode = null;
            currentIndex++
          }else {
            return null
          }
        }
      }
      if(listArray.length <= currentIndex || Math.max(listArray[currentIndex].indent, 0) < indentLevel) {
        break
      }
    }
    if(database) {
      var currentNode = new Node(retval.firstChild);
      while(currentNode && currentNode[0]) {
        if(currentNode[0].nodeType === Dom.NodeType.ELEMENT_NODE) {
          currentNode._4eClearMarkers(database, true)
        }
        currentNode = currentNode._4eNextSourceNode()
      }
    }
    return{listNode:retval, nextIndex:currentIndex}
  }};
  return list
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/outdent
*/

KISSY.add("editor/plugin/outdent", ["editor", "./button", "./outdent/cmd"], function(S, require) {
  var Editor = require("editor");
  require("./button");
  var indexCmd = require("./outdent/cmd");
  function outdent() {
  }
  S.augment(outdent, {pluginRenderUI:function(editor) {
    indexCmd.init(editor);
    editor.addButton("outdent", {tooltip:"\u51cf\u5c11\u7f29\u8fdb\u91cf", listeners:{click:function() {
      editor.execCommand("outdent");
      editor.focus()
    }, afterSyncUI:function() {
      var self = this;
      editor.on("selectionChange", function() {
        if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
          return
        }
        if(editor.queryCommandValue("outdent")) {
          self.set("disabled", false)
        }else {
          self.set("disabled", true)
        }
      })
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return outdent
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/outdent/cmd
*/

KISSY.add("editor/plugin/outdent/cmd", ["editor", "../dent-cmd"], function(S, require) {
  var Editor = require("editor");
  var dentUtils = require("../dent-cmd");
  var addCommand = dentUtils.addCommand;
  var checkOutdentActive = dentUtils.checkOutdentActive;
  return{init:function(editor) {
    addCommand(editor, "outdent");
    var queryCmd = Editor.Utils.getQueryCmd("outdent");
    if(!editor.hasCommand(queryCmd)) {
      editor.addCommand(queryCmd, {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement();
          var elementPath = new Editor.ElementPath(startElement);
          return checkOutdentActive(elementPath)
        }
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/unordered-list
*/

KISSY.add("editor/plugin/unordered-list", ["./list-utils/btn", "./unordered-list/cmd"], function(S, require) {
  var ListButton = require("./list-utils/btn");
  var ListCmd = require("./unordered-list/cmd");
  function unorderedList() {
  }
  S.augment(unorderedList, {pluginRenderUI:function(editor) {
    ListCmd.init(editor);
    ListButton.init(editor, {cmdType:"insertUnorderedList", buttonId:"unorderedList", menu:{width:75, children:[{content:"\u25cf \u5706\u70b9", value:"disc"}, {content:"\u25cb \u5706\u5708", value:"circle"}, {content:"\u25a0 \u65b9\u5757", value:"square"}]}, tooltip:"\u65e0\u5e8f\u5217\u8868"})
  }});
  return unorderedList
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/list-utils/btn
*/

KISSY.add("editor/plugin/list-utils/btn", ["editor", "../button", "../menubutton"], function(S, require) {
  var Editor = require("editor");
  require("../button");
  require("../menubutton");
  return{init:function(editor, cfg) {
    var buttonId = cfg.buttonId, cmdType = cfg.cmdType, tooltip = cfg.tooltip;
    var button = editor.addButton(buttonId, {elCls:buttonId + "Btn", mode:Editor.Mode.WYSIWYG_MODE, tooltip:"\u8bbe\u7f6e" + tooltip});
    editor.on("selectionChange", function() {
      var v;
      if(v = editor.queryCommandValue(cmdType)) {
        button.set("checked", true);
        arrow.set("value", v)
      }else {
        button.set("checked", false)
      }
    });
    var arrow = editor.addSelect(buttonId + "Arrow", {tooltip:"\u9009\u62e9\u5e76\u8bbe\u7f6e" + tooltip, mode:Editor.Mode.WYSIWYG_MODE, menu:cfg.menu, matchElWidth:false, elCls:"toolbar-" + buttonId + "ArrowBtn"});
    arrow.on("click", function(e) {
      var v = e.target.get("value");
      button.listValue = v;
      editor.execCommand(cmdType, v);
      editor.focus()
    });
    button.on("click", function() {
      var v = button.listValue;
      if(button.get("checked")) {
        v = arrow.get("value")
      }
      editor.execCommand(cmdType, v);
      editor.focus()
    })
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/unordered-list/cmd
*/

KISSY.add("editor/plugin/unordered-list/cmd", ["editor", "../list-utils/cmd"], function(S, require) {
  var Editor = require("editor");
  var listCmd = require("../list-utils/cmd");
  var insertUnorderedList = "insertUnorderedList", ListCommand = listCmd.ListCommand, queryActive = listCmd.queryActive, ulCmd = new ListCommand("ul");
  return{init:function(editor) {
    if(!editor.hasCommand(insertUnorderedList)) {
      editor.addCommand(insertUnorderedList, {exec:function(editor, type) {
        editor.focus();
        ulCmd.exec(editor, type)
      }})
    }
    var queryUl = Editor.Utils.getQueryCmd(insertUnorderedList);
    if(!editor.hasCommand(queryUl)) {
      editor.addCommand(queryUl, {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement();
          var elementPath = new Editor.ElementPath(startElement);
          return queryActive("ul", elementPath)
        }
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/list-utils/cmd
*/

KISSY.add("editor/plugin/list-utils/cmd", ["editor", "../list-utils"], function(S, require) {
  var Editor = require("editor");
  var ListUtils = require("../list-utils");
  var insertUnorderedList = "insertUnorderedList", insertOrderedList = "insertOrderedList", listNodeNames = {ol:insertOrderedList, ul:insertUnorderedList}, KER = Editor.RangeType, ElementPath = Editor.ElementPath, Walker = Editor.Walker, UA = S.UA, Node = S.Node, Dom = S.DOM, headerTagRegex = /^h[1-6]$/;
  function ListCommand(type) {
    this.type = type
  }
  ListCommand.prototype = {constructor:ListCommand, changeListType:function(editor, groupObj, database, listsCreated, listStyleType) {
    var listArray = ListUtils.listToArray(groupObj.root, database, undefined, undefined, undefined), selectedListItems = [];
    for(var i = 0;i < groupObj.contents.length;i++) {
      var itemNode = groupObj.contents[i];
      itemNode = itemNode.closest("li", undefined);
      if(!itemNode || !itemNode[0] || itemNode.data("list_item_processed")) {
        continue
      }
      selectedListItems.push(itemNode);
      itemNode._4eSetMarker(database, "list_item_processed", true, undefined)
    }
    var fakeParent = new Node(groupObj.root[0].ownerDocument.createElement(this.type));
    fakeParent.css("list-style-type", listStyleType);
    for(i = 0;i < selectedListItems.length;i++) {
      var listIndex = selectedListItems[i].data("listarray_index");
      listArray[listIndex].parent = fakeParent
    }
    var newList = ListUtils.arrayToList(listArray, database, null, "p");
    var child, length = newList.listNode.childNodes.length;
    for(i = 0;i < length && (child = new Node(newList.listNode.childNodes[i]));i++) {
      if(child.nodeName() === this.type) {
        listsCreated.push(child)
      }
    }
    groupObj.root.before(newList.listNode);
    groupObj.root.remove()
  }, createList:function(editor, groupObj, listsCreated, listStyleType) {
    var contents = groupObj.contents, doc = groupObj.root[0].ownerDocument, listContents = [];
    if(contents.length === 1 && contents[0][0] === groupObj.root[0]) {
      var divBlock = new Node(doc.createElement("div"));
      if(contents[0][0].nodeType !== Dom.NodeType.TEXT_NODE) {
        contents[0]._4eMoveChildren(divBlock, undefined, undefined)
      }
      contents[0][0].appendChild(divBlock[0]);
      contents[0] = divBlock
    }
    var commonParent = groupObj.contents[0].parent();
    for(var i = 0;i < contents.length;i++) {
      commonParent = commonParent._4eCommonAncestor(contents[i].parent(), undefined)
    }
    for(i = 0;i < contents.length;i++) {
      var contentNode = contents[i], parentNode;
      while(parentNode = contentNode.parent()) {
        if(parentNode[0] === commonParent[0]) {
          listContents.push(contentNode);
          break
        }
        contentNode = parentNode
      }
    }
    if(listContents.length < 1) {
      return
    }
    var insertAnchor = new Node(listContents[listContents.length - 1][0].nextSibling), listNode = new Node(doc.createElement(this.type));
    listNode.css("list-style-type", listStyleType);
    listsCreated.push(listNode);
    while(listContents.length) {
      var contentBlock = listContents.shift(), listItem = new Node(doc.createElement("li"));
      if(headerTagRegex.test(contentBlock.nodeName())) {
        listItem[0].appendChild(contentBlock[0])
      }else {
        contentBlock._4eCopyAttributes(listItem, undefined, undefined);
        contentBlock._4eMoveChildren(listItem, undefined, undefined);
        contentBlock.remove()
      }
      listNode[0].appendChild(listItem[0]);
      if(!UA.ie) {
        listItem._4eAppendBogus(undefined)
      }
    }
    if(insertAnchor[0]) {
      listNode.insertBefore(insertAnchor, undefined)
    }else {
      commonParent.append(listNode)
    }
  }, removeList:function(editor, groupObj, database) {
    var listArray = ListUtils.listToArray(groupObj.root, database, undefined, undefined, undefined), selectedListItems = [];
    for(var i = 0;i < groupObj.contents.length;i++) {
      var itemNode = groupObj.contents[i];
      itemNode = itemNode.closest("li", undefined);
      if(!itemNode || itemNode.data("list_item_processed")) {
        continue
      }
      selectedListItems.push(itemNode);
      itemNode._4eSetMarker(database, "list_item_processed", true, undefined)
    }
    var lastListIndex = null;
    for(i = 0;i < selectedListItems.length;i++) {
      var listIndex = selectedListItems[i].data("listarray_index");
      listArray[listIndex].indent = -1;
      lastListIndex = listIndex
    }
    for(i = lastListIndex + 1;i < listArray.length;i++) {
      if(listArray[i].indent > Math.max(listArray[i - 1].indent, 0)) {
        var indentOffset = listArray[i - 1].indent + 1 - listArray[i].indent;
        var oldIndent = listArray[i].indent;
        while(listArray[i] && listArray[i].indent >= oldIndent) {
          listArray[i].indent += indentOffset;
          i++
        }
        i--
      }
    }
    var newList = ListUtils.arrayToList(listArray, database, null, "p");
    var docFragment = newList.listNode, boundaryNode, siblingNode;
    function compensateBrs(isStart) {
      if((boundaryNode = new Node(docFragment[isStart ? "firstChild" : "lastChild"])) && !(boundaryNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && boundaryNode._4eIsBlockBoundary(undefined, undefined)) && (siblingNode = groupObj.root[isStart ? "prev" : "next"](Walker.whitespaces(true), 1)) && !(boundaryNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && siblingNode._4eIsBlockBoundary({br:1}, undefined))) {
        boundaryNode[isStart ? "before" : "after"](editor.get("document")[0].createElement("br"))
      }
    }
    compensateBrs(true);
    compensateBrs(undefined);
    groupObj.root.before(docFragment);
    groupObj.root.remove()
  }, exec:function(editor, listStyleType) {
    var selection = editor.getSelection(), ranges = selection && selection.getRanges();
    if(!ranges || ranges.length < 1) {
      return
    }
    var startElement = selection.getStartElement(), groupObj, i, currentPath = new Editor.ElementPath(startElement);
    var state = queryActive(this.type, currentPath);
    var bookmarks = selection.createBookmarks(true);
    var listGroups = [], database = {};
    while(ranges.length > 0) {
      var range = ranges.shift();
      var boundaryNodes = range.getBoundaryNodes(), startNode = boundaryNodes.startNode, endNode = boundaryNodes.endNode;
      if(startNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && startNode.nodeName() === "td") {
        range.setStartAt(boundaryNodes.startNode, KER.POSITION_AFTER_START)
      }
      if(endNode[0].nodeType === Dom.NodeType.ELEMENT_NODE && endNode.nodeName() === "td") {
        range.setEndAt(boundaryNodes.endNode, KER.POSITION_BEFORE_END)
      }
      var iterator = range.createIterator(), block;
      iterator.forceBrBreak = false;
      while(block = iterator.getNextParagraph()) {
        if(block.data("list_block")) {
          continue
        }else {
          block._4eSetMarker(database, "list_block", 1, undefined)
        }
        var path = new ElementPath(block), pathElements = path.elements, pathElementsCount = pathElements.length, processedFlag = false, blockLimit = path.blockLimit, element;
        for(i = pathElementsCount - 1;i >= 0 && (element = pathElements[i]);i--) {
          if(listNodeNames[element.nodeName()] && blockLimit.contains(element)) {
            blockLimit.removeData("list_group_object");
            groupObj = element.data("list_group_object");
            if(groupObj) {
              groupObj.contents.push(block)
            }else {
              groupObj = {root:element, contents:[block]};
              listGroups.push(groupObj);
              element._4eSetMarker(database, "list_group_object", groupObj, undefined)
            }
            processedFlag = true;
            break
          }
        }
        if(processedFlag) {
          continue
        }
        var root = blockLimit || path.block;
        if(root.data("list_group_object")) {
          root.data("list_group_object").contents.push(block)
        }else {
          groupObj = {root:root, contents:[block]};
          root._4eSetMarker(database, "list_group_object", groupObj, undefined);
          listGroups.push(groupObj)
        }
      }
    }
    var listsCreated = [];
    while(listGroups.length > 0) {
      groupObj = listGroups.shift();
      if(!state) {
        if(listNodeNames[groupObj.root.nodeName()]) {
          this.changeListType(editor, groupObj, database, listsCreated, listStyleType)
        }else {
          Editor.Utils.clearAllMarkers(database);
          this.createList(editor, groupObj, listsCreated, listStyleType)
        }
      }else {
        if(listNodeNames[groupObj.root.nodeName()]) {
          if(groupObj.root.css("list-style-type") === listStyleType) {
            this.removeList(editor, groupObj, database)
          }else {
            groupObj.root.css("list-style-type", listStyleType)
          }
        }
      }
    }
    var self = this;
    for(i = 0;i < listsCreated.length;i++) {
      var listNode = listsCreated[i];
      var mergeSibling = function(rtl, listNode) {
        var sibling = listNode[rtl ? "prev" : "next"](Walker.whitespaces(true), 1);
        if(sibling && sibling[0] && sibling.nodeName() === self.type && sibling.css("list-style-type") === listStyleType) {
          sibling.remove();
          sibling._4eMoveChildren(listNode, rtl ? true : false, undefined)
        }
      };
      mergeSibling(undefined, listNode);
      mergeSibling(true, listNode)
    }
    Editor.Utils.clearAllMarkers(database);
    selection.selectBookmarks(bookmarks)
  }};
  function queryActive(type, elementPath) {
    var element, name, i, blockLimit = elementPath.blockLimit, elements = elementPath.elements;
    if(!blockLimit) {
      return false
    }
    if(elements) {
      for(i = 0;i < elements.length && (element = elements[i]) && element[0] !== blockLimit[0];i++) {
        if(listNodeNames[name = element.nodeName()]) {
          if(name === type) {
            return element.css("list-style-type")
          }
        }
      }
    }
    return false
  }
  return{ListCommand:ListCommand, queryActive:queryActive}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/ordered-list
*/

KISSY.add("editor/plugin/ordered-list", ["./list-utils/btn", "./ordered-list/cmd"], function(S, require) {
  var ListButton = require("./list-utils/btn");
  var ListCmd = require("./ordered-list/cmd");
  function orderedList() {
  }
  S.augment(orderedList, {pluginRenderUI:function(editor) {
    ListCmd.init(editor);
    ListButton.init(editor, {cmdType:"insertOrderedList", buttonId:"orderedList", menu:{width:75, children:[{content:"1,2,3...", value:"decimal"}, {content:"a,b,c...", value:"lower-alpha"}, {content:"A,B,C...", value:"upper-alpha"}, {content:"i,ii,iii...", value:"lower-roman"}, {content:"I,II,III...", value:"upper-roman"}]}, tooltip:"\u6709\u5e8f\u5217\u8868"})
  }});
  return orderedList
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/ordered-list/cmd
*/

KISSY.add("editor/plugin/ordered-list/cmd", ["editor", "../list-utils/cmd"], function(S, require) {
  var Editor = require("editor");
  var listCmd = require("../list-utils/cmd");
  var insertOrderedList = "insertOrderedList", ListCommand = listCmd.ListCommand, queryActive = listCmd.queryActive, olCmd = new ListCommand("ol");
  return{init:function(editor) {
    if(!editor.hasCommand(insertOrderedList)) {
      editor.addCommand(insertOrderedList, {exec:function(editor, listStyleType) {
        editor.focus();
        olCmd.exec(editor, listStyleType)
      }})
    }
    var queryOl = Editor.Utils.getQueryCmd(insertOrderedList);
    if(!editor.hasCommand(queryOl)) {
      editor.addCommand(queryOl, {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement();
          var elementPath = new Editor.ElementPath(startElement);
          return queryActive("ol", elementPath)
        }
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/element-path
*/

KISSY.add("editor/plugin/element-path", ["editor"], function(S, require) {
  var Editor = require("editor");
  var Node = S.Node;
  var CLASS = "editor-element-path";
  function ElementPaths(cfg) {
    var self = this;
    self.cfg = cfg;
    self._cache = [];
    self._init()
  }
  S.augment(ElementPaths, {_init:function() {
    var self = this, cfg = self.cfg, editor = cfg.editor;
    self.holder = new Node("<span>");
    self.holder.appendTo(editor.get("statusBarEl"), undefined);
    editor.on("selectionChange", self._selectionChange, self);
    Editor.Utils.sourceDisable(editor, self)
  }, disable:function() {
    this.holder.css("visibility", "hidden")
  }, enable:function() {
    this.holder.css("visibility", "")
  }, _selectionChange:function(ev) {
    var self = this, cfg = self.cfg, editor = cfg.editor, prefixCls = editor.get("prefixCls"), statusDom = self.holder, elementPath = ev.path, elements = elementPath.elements, element, i, cache = self._cache;
    for(i = 0;i < cache.length;i++) {
      cache[i].remove()
    }
    self._cache = [];
    for(i = 0;i < elements.length;i++) {
      element = elements[i];
      var type = element.attr("_ke_real_element_type") || element.nodeName(), a = new Node("<a " + "href=\"javascript('" + type + "')\" " + 'class="' + prefixCls + CLASS + '">' + type + "</a>");
      self._cache.push(a);
      (function(element) {
        a.on("click", function(ev2) {
          ev2.halt();
          editor.focus();
          setTimeout(function() {
            editor.getSelection().selectElement(element)
          }, 50)
        })
      })(element);
      statusDom.prepend(a)
    }
  }, destroy:function() {
    this.holder.remove()
  }});
  function ElementPathPlugin() {
  }
  S.augment(ElementPathPlugin, {pluginRenderUI:function(editor) {
    var elemPath = new ElementPaths({editor:editor});
    editor.on("destroy", function() {
      elemPath.destroy()
    })
  }});
  return ElementPathPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/page-break
*/

KISSY.add("editor/plugin/page-break", ["editor", "./fake-objects", "./button"], function(S, require) {
  var Editor = require("editor");
  var fakeObjects = require("./fake-objects");
  require("./button");
  var Node = S.Node, CLS = "ke_pagebreak", TYPE = "div", PAGE_BREAK_MARKUP = "<div" + ' style="page-break-after: always; ">' + '<span style="DISPLAY:none">&nbsp;</span>' + "</div>";
  function pageBreak() {
  }
  S.augment(pageBreak, {pluginRenderUI:function(editor) {
    fakeObjects.init(editor);
    var dataProcessor = editor.htmlDataProcessor, dataFilter = dataProcessor && dataProcessor.dataFilter;
    dataFilter.addRules({tags:{div:function(element) {
      var style = element.getAttribute("style"), child;
      if(style) {
        var childNodes = element.childNodes;
        for(var i = 0;i < childNodes.length;i++) {
          if(childNodes[i].nodeType === 1) {
            child = childNodes[i]
          }
        }
      }
      var childStyle = child && child.nodeName === "span" && child.getAttribute("style");
      if(childStyle && /page-break-after\s*:\s*always/i.test(style) && /display\s*:\s*none/i.test(childStyle)) {
        return dataProcessor.createFakeParserElement(element, CLS, TYPE)
      }
      return undefined
    }}});
    editor.addButton("pageBreak", {tooltip:"\u5206\u9875", listeners:{click:function() {
      var real = new Node(PAGE_BREAK_MARKUP, null, editor.get("document")[0]), substitute = editor.createFakeElement(real, CLS, TYPE, false, PAGE_BREAK_MARKUP);
      editor.focus();
      var sel = editor.getSelection(), range = sel && sel.getRanges()[0];
      if(!range) {
        return
      }
      editor.execCommand("save");
      var start = range.startContainer, pre = start;
      while(start.nodeName() !== "body") {
        pre = start;
        start = start.parent()
      }
      range.collapse(true);
      range.splitElement(pre);
      substitute.insertAfter(pre);
      editor.execCommand("save")
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return pageBreak
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 13:38
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/fake-objects
*/

KISSY.add("editor/plugin/fake-objects", ["editor", "html-parser"], function(S, require) {
  var Editor = require("editor");
  var HtmlParser = require("html-parser");
  var Node = S.Node, Dom = S.DOM, Utils = Editor.Utils, SPACER_GIF = Utils.debugUrl("theme/spacer.gif");
  Editor.addMembers({createFakeElement:function(realElement, className, realElementType, isResizable, outerHTML, attrs) {
    var style = realElement.attr("style") || "";
    if(realElement.attr("width")) {
      style = "width:" + realElement.attr("width") + "px;" + style
    }
    if(realElement.attr("height")) {
      style = "height:" + realElement.attr("height") + "px;" + style
    }
    var self = this, existClass = S.trim(realElement.attr("class")), attributes = {"class":className + " " + existClass, src:SPACER_GIF, _ke_real_element:encodeURIComponent(outerHTML || realElement.outerHtml()), _ke_real_node_type:realElement[0].nodeType, style:style};
    if(attrs) {
      delete attrs.width;
      delete attrs.height;
      S.mix(attributes, attrs, false)
    }
    if(realElementType) {
      attributes._ke_real_element_type = realElementType
    }
    if(isResizable) {
      attributes._ke_resizable = isResizable
    }
    return new Node("<img/>", attributes, self.get("document")[0])
  }, restoreRealElement:function(fakeElement) {
    if(parseInt(fakeElement.attr("_ke_real_node_type"), 10) !== Dom.NodeType.ELEMENT_NODE) {
      return null
    }
    var html = S.urlDecode(fakeElement.attr("_ke_real_element"));
    var temp = new Node("<div>", null, this.get("document")[0]);
    temp.html(html);
    return temp.first().remove()
  }});
  var htmlFilterRules = {tags:{$:function(element) {
    var realHTML = element.getAttribute("_ke_real_element");
    var realFragment;
    if(realHTML) {
      realFragment = (new HtmlParser.Parser(S.urlDecode(realHTML))).parse()
    }
    var realElement = realFragment && realFragment.childNodes[0];
    if(realElement) {
      var style = element.getAttribute("style");
      if(style) {
        var match = /(?:^|\s)width\s*:\s*(\d+)/i.exec(style), width = match && match[1];
        match = /(?:^|\s)height\s*:\s*(\d+)/i.exec(style);
        var height = match && match[1];
        if(width) {
          realElement.setAttribute("width", width)
        }
        if(height) {
          realElement.setAttribute("height", height)
        }
      }
      return realElement
    }
  }}};
  return{init:function(editor) {
    var dataProcessor = editor.htmlDataProcessor, htmlFilter = dataProcessor && dataProcessor.htmlFilter;
    if(dataProcessor.createFakeParserElement) {
      return
    }
    if(htmlFilter) {
      htmlFilter.addRules(htmlFilterRules)
    }
    S.mix(dataProcessor, {restoreRealElement:function(fakeElement) {
      if(parseInt(fakeElement.attr("_ke_real_node_type"), 10) !== Dom.NodeType.ELEMENT_NODE) {
        return null
      }
      var html = S.urlDecode(fakeElement.attr("_ke_real_element"));
      var temp = new Node("<div>", null, editor.get("document")[0]);
      temp.html(html);
      return temp.first().remove()
    }, createFakeParserElement:function(realElement, className, realElementType, isResizable, attrs) {
      var html = HtmlParser.serialize(realElement);
      var style = realElement.getAttribute("style") || "";
      if(realElement.getAttribute("width")) {
        style = "width:" + realElement.getAttribute("width") + "px;" + style
      }
      if(realElement.getAttribute("height")) {
        style = "height:" + realElement.getAttribute("height") + "px;" + style
      }
      var existClass = S.trim(realElement.getAttribute("class")), attributes = {"class":className + " " + existClass, src:SPACER_GIF, _ke_real_element:encodeURIComponent(html), _ke_real_node_type:realElement.nodeType + "", style:style, align:realElement.getAttribute("align") || ""};
      if(attrs) {
        delete attrs.width;
        delete attrs.height;
        S.mix(attributes, attrs, false)
      }
      if(realElementType) {
        attributes._ke_real_element_type = realElementType
      }
      if(isResizable) {
        attributes._ke_resizable = "_ke_resizable"
      }
      return new HtmlParser.Tag("img", attributes)
    }})
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/preview
*/

KISSY.add("editor/plugin/preview", ["./button"], function(S, require) {
  var win = window;
  require("./button");
  function Preview() {
  }
  S.augment(Preview, {pluginRenderUI:function(editor) {
    editor.addButton("preview", {tooltip:"\u9884\u89c8", listeners:{click:function() {
      var iWidth, iHeight, iLeft;
      try {
        var screen = win.screen;
        iHeight = Math.round(screen.height * 0.7);
        iLeft = Math.round(screen.width * 0.1);
        iWidth = Math.round(screen.width * 0.8)
      }catch(e) {
        iWidth = 640;
        iHeight = 420;
        iLeft = 80
      }
      var sHTML = S.substitute(editor.getDocHtml(), {title:"\u9884\u89c8"}), sOpenUrl = "", oWindow = win.open(sOpenUrl, "", "toolbar=yes," + "location=no," + "status=yes," + "menubar=yes," + "scrollbars=yes," + "resizable=yes," + "width=" + iWidth + ",height=" + iHeight + ",left=" + iLeft), winDoc = oWindow.document;
      winDoc.open();
      winDoc.write(sHTML);
      winDoc.close();
      oWindow.focus()
    }}})
  }});
  return Preview
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/maximize
*/

KISSY.add("editor/plugin/maximize", ["./maximize/cmd", "./button"], function(S, require) {
  var maximizeCmd = require("./maximize/cmd");
  require("./button");
  var MAXIMIZE_CLASS = "maximize", RESTORE_CLASS = "restore", MAXIMIZE_TIP = "\u5168\u5c4f", RESTORE_TIP = "\u53d6\u6d88\u5168\u5c4f";
  function maximizePlugin() {
  }
  S.augment(maximizePlugin, {pluginRenderUI:function(editor) {
    maximizeCmd.init(editor);
    editor.addButton("maximize", {tooltip:MAXIMIZE_TIP, listeners:{click:function() {
      var self = this;
      var checked = self.get("checked");
      if(checked) {
        editor.execCommand("maximizeWindow");
        self.set("tooltip", RESTORE_TIP);
        self.set("contentCls", RESTORE_CLASS)
      }else {
        editor.execCommand("restoreWindow");
        self.set("tooltip", MAXIMIZE_TIP);
        self.set("contentCls", MAXIMIZE_CLASS)
      }
      editor.focus()
    }}, checkable:true})
  }});
  return maximizePlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/maximize/cmd
*/

KISSY.add("editor/plugin/maximize/cmd", ["editor", "event"], function(S, require) {
  var Editor = require("editor");
  var Event = require("event");
  var UA = S.UA, ie = UA.ie, doc = document, Node = S.Node, Dom = S.DOM, iframe, MAXIMIZE_TOOLBAR_CLASS = "editor-toolbar-padding", init = function() {
    if(!iframe) {
      iframe = (new Node("<" + "iframe " + ' style="' + "position:absolute;" + "top:-9999px;" + "left:-9999px;" + '"' + ' frameborder="0">')).prependTo(doc.body, undefined)
    }
  };
  function MaximizeCmd(editor) {
    this.editor = editor
  }
  S.augment(MaximizeCmd, {restoreWindow:function() {
    var self = this, editor = self.editor;
    if(editor.fire("beforeRestoreWindow") === false) {
      return
    }
    if(self._resize) {
      Event.remove(window, "resize", self._resize);
      self._resize.stop();
      self._resize = 0
    }else {
      return
    }
    self._saveEditorStatus();
    self._restoreState();
    setTimeout(function() {
      self._restoreEditorStatus();
      editor.notifySelectionChange();
      editor.fire("afterRestoreWindow")
    }, 30)
  }, _restoreState:function() {
    var self = this, editor = self.editor, textareaEl = editor.get("textarea"), _savedParents = self._savedParents;
    if(_savedParents) {
      for(var i = 0;i < _savedParents.length;i++) {
        var po = _savedParents[i];
        po.el.css("position", po.position)
      }
      self._savedParents = null
    }
    textareaEl.parent().css({height:self.iframeHeight});
    textareaEl.css({height:self.iframeHeight});
    Dom.css(doc.body, {width:"", height:"", overflow:""});
    doc.documentElement.style.overflow = "";
    var editorElStyle = editor.get("el")[0].style;
    editorElStyle.position = "static";
    editorElStyle.width = self.editorElWidth;
    iframe.css({left:"-99999px", top:"-99999px"});
    window.scrollTo(self.scrollLeft, self.scrollTop);
    if(ie < 8) {
      editor.get("toolBarEl").removeClass(editor.get("prefixCls") + MAXIMIZE_TOOLBAR_CLASS, undefined)
    }
  }, _saveSate:function() {
    var self = this, editor = self.editor, _savedParents = [], editorEl = editor.get("el");
    self.iframeHeight = editor.get("textarea").parent().style("height");
    self.editorElWidth = editorEl.style("width");
    self.scrollLeft = Dom.scrollLeft();
    self.scrollTop = Dom.scrollTop();
    window.scrollTo(0, 0);
    var p = editorEl.parent();
    while(p) {
      var pre = p.css("position");
      if(pre !== "static") {
        _savedParents.push({el:p, position:pre});
        p.css("position", "static")
      }
      p = p.parent()
    }
    self._savedParents = _savedParents;
    if(ie < 8) {
      editor.get("toolBarEl").addClass(editor.get("prefixCls") + MAXIMIZE_TOOLBAR_CLASS, undefined)
    }
  }, _saveEditorStatus:function() {
    var self = this, editor = self.editor;
    self.savedRanges = null;
    if(!UA.gecko || !editor.__iframeFocus) {
      return
    }
    var sel = editor.getSelection();
    self.savedRanges = sel && sel.getRanges()
  }, _restoreEditorStatus:function() {
    var self = this, editor = self.editor, sel = editor.getSelection(), savedRanges = self.savedRanges;
    if(UA.gecko) {
      editor.activateGecko()
    }
    if(savedRanges && sel) {
      sel.selectRanges(savedRanges)
    }
    if(editor.__iframeFocus && sel) {
      var element = sel.getStartElement();
      if(element) {
        element.scrollIntoView(undefined, {alignWithTop:false, allowHorizontalScroll:true, onlyScrollIfNeeded:true})
      }
    }
  }, _maximize:function(stop) {
    var self = this, editor = self.editor, editorEl = editor.get("el"), viewportHeight = Dom.viewportHeight(), viewportWidth = Dom.viewportWidth(), textareaEl = editor.get("textarea"), statusHeight = editor.get("statusBarEl") ? editor.get("statusBarEl")[0].offsetHeight : 0, toolHeight = editor.get("toolBarEl")[0].offsetHeight;
    if(!ie) {
      Dom.css(doc.body, {width:0, height:0, overflow:"hidden"})
    }else {
      doc.body.style.overflow = "hidden"
    }
    doc.documentElement.style.overflow = "hidden";
    editorEl.css({position:"absolute", zIndex:Editor.baseZIndex(Editor.ZIndexManager.MAXIMIZE), width:viewportWidth + "px"});
    iframe.css({zIndex:Editor.baseZIndex(Editor.ZIndexManager.MAXIMIZE - 5), height:viewportHeight + "px", width:viewportWidth + "px"});
    editorEl.offset({left:0, top:0});
    iframe.css({left:0, top:0});
    textareaEl.parent().css({height:viewportHeight - statusHeight - toolHeight + "px"});
    textareaEl.css({height:viewportHeight - statusHeight - toolHeight + "px"});
    if(stop !== true) {
      arguments.callee.call(self, true)
    }
  }, _real:function() {
    var self = this, editor = self.editor;
    if(self._resize) {
      return
    }
    self._saveEditorStatus();
    self._saveSate();
    self._maximize();
    if(!self._resize) {
      self._resize = S.buffer(function() {
        self._maximize();
        editor.fire("afterMaximizeWindow")
      }, 100)
    }
    Event.on(window, "resize", self._resize);
    setTimeout(function() {
      self._restoreEditorStatus();
      editor.notifySelectionChange();
      editor.fire("afterMaximizeWindow")
    }, 30)
  }, maximizeWindow:function() {
    var self = this, editor = self.editor;
    if(editor.fire("beforeMaximizeWindow") === false) {
      return
    }
    init();
    self._real()
  }, destroy:function() {
    var self = this;
    if(self._resize) {
      Event.remove(window, "resize", self._resize);
      self._resize.stop();
      self._resize = 0
    }
  }});
  return{init:function(editor) {
    if(!editor.hasCommand("maximizeWindow")) {
      var maximizeCmd = new MaximizeCmd(editor);
      editor.addCommand("maximizeWindow", {exec:function() {
        maximizeCmd.maximizeWindow()
      }});
      editor.addCommand("restoreWindow", {exec:function() {
        maximizeCmd.restoreWindow()
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/remove-format
*/

KISSY.add("editor/plugin/remove-format", ["editor", "./button", "./remove-format/cmd"], function(S, require) {
  var Editor = require("editor");
  require("./button");
  var formatCmd = require("./remove-format/cmd");
  function removeFormat() {
  }
  S.augment(removeFormat, {pluginRenderUI:function(editor) {
    formatCmd.init(editor);
    editor.addButton("removeFormat", {tooltip:"\u6e05\u9664\u683c\u5f0f", listeners:{click:function() {
      editor.execCommand("removeFormat")
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return removeFormat
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/remove-format/cmd
*/

KISSY.add("editor/plugin/remove-format/cmd", ["editor"], function(S, require) {
  var Editor = require("editor");
  var KER = Editor.RangeType, ElementPath = Editor.ElementPath, Dom = S.DOM, removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd," + "q,samp,small,span,strike,strong,sub,sup,tt,u,var,s", removeFormatAttributes = ("class,style,lang,width,height," + "align,hspace,valign").split(/,/), tagsRegex = new RegExp("^(?:" + removeFormatTags.replace(/,/g, "|") + ")$", "i");
  function removeAttrs(el, attrs) {
    for(var i = 0;i < attrs.length;i++) {
      el.removeAttr(attrs[i])
    }
  }
  return{init:function(editor) {
    if(!editor.hasCommand("removeFormat")) {
      editor.addCommand("removeFormat", {exec:function() {
        editor.focus();
        tagsRegex.lastIndex = 0;
        var ranges = editor.getSelection().getRanges();
        editor.execCommand("save");
        for(var i = 0, range;range = ranges[i];i++) {
          if(range.collapsed) {
            continue
          }
          range.enlarge(KER.ENLARGE_ELEMENT);
          var bookmark = range.createBookmark(), startNode = bookmark.startNode, endNode = bookmark.endNode;
          var breakParent = function(node) {
            var path = new ElementPath(node), pathElements = path.elements;
            for(var i = 1, pathElement;pathElement = pathElements[i];i++) {
              if(pathElement.equals(path.block) || pathElement.equals(path.blockLimit)) {
                break
              }
              if(tagsRegex.test(pathElement.nodeName())) {
                node._4eBreakParent(pathElement)
              }
            }
          };
          breakParent(startNode);
          breakParent(endNode);
          var currentNode = startNode._4eNextSourceNode(true, Dom.NodeType.ELEMENT_NODE, undefined, undefined);
          while(currentNode) {
            if(currentNode.equals(endNode)) {
              break
            }
            var nextNode = currentNode._4eNextSourceNode(false, Dom.NodeType.ELEMENT_NODE, undefined, undefined);
            if(!(currentNode.nodeName() === "img" && (currentNode.attr("_ke_real_element") || /\bke_/.test(currentNode[0].className)))) {
              if(tagsRegex.test(currentNode.nodeName())) {
                currentNode._4eRemove(true)
              }else {
                removeAttrs(currentNode, removeFormatAttributes)
              }
            }
            currentNode = nextNode
          }
          range.moveToBookmark(bookmark)
        }
        editor.getSelection().selectRanges(ranges);
        editor.execCommand("save")
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/heading
*/

KISSY.add("editor/plugin/heading", ["./menubutton", "editor", "./heading/cmd"], function(S, require) {
  require("./menubutton");
  var Editor = require("editor");
  var headingCmd = require("./heading/cmd");
  function HeadingPlugin() {
  }
  S.augment(HeadingPlugin, {pluginRenderUI:function(editor) {
    headingCmd.init(editor);
    var FORMAT_SELECTION_ITEMS = [], FORMATS = {"\u666e\u901a\u6587\u672c":"p", "\u6807\u98981":"h1", "\u6807\u98982":"h2", "\u6807\u98983":"h3", "\u6807\u98984":"h4", "\u6807\u98985":"h5", "\u6807\u98986":"h6"}, FORMAT_SIZES = {p:"1em", h1:"2em", h2:"1.5em", h3:"1.17em", h4:"1em", h5:"0.83em", h6:"0.67em"};
    for(var p in FORMATS) {
      FORMAT_SELECTION_ITEMS.push({content:p, value:FORMATS[p], elAttrs:{style:"font-size:" + FORMAT_SIZES[FORMATS[p]]}})
    }
    editor.addSelect("heading", {defaultCaption:"\u6807\u9898", width:"120px", menu:{children:FORMAT_SELECTION_ITEMS}, mode:Editor.Mode.WYSIWYG_MODE, listeners:{click:function(ev) {
      var v = ev.target.get("value");
      editor.execCommand("heading", v)
    }, afterSyncUI:function() {
      var self = this;
      editor.on("selectionChange", function() {
        if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
          return
        }
        var headingValue = editor.queryCommandValue("heading"), value;
        for(value in FORMAT_SIZES) {
          if(value === headingValue) {
            self.set("value", value);
            return
          }
        }
        self.set("value", null)
      })
    }}})
  }});
  return HeadingPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/heading/cmd
*/

KISSY.add("editor/plugin/heading/cmd", ["editor"], function(S, require) {
  var Editor = require("editor");
  return{init:function(editor) {
    if(!editor.hasCommand("heading")) {
      editor.addCommand("heading", {exec:function(editor, tag) {
        var currentValue;
        editor.execCommand("save");
        if(tag !== "p") {
          currentValue = editor.queryCommandValue("heading")
        }
        if(tag === currentValue) {
          tag = "p"
        }
        (new Editor.Style({element:tag})).apply(editor.get("document")[0]);
        editor.execCommand("save")
      }});
      var queryCmd = Editor.Utils.getQueryCmd("heading");
      editor.addCommand(queryCmd, {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement();
          var currentPath = new Editor.ElementPath(startElement);
          var block = currentPath.block || currentPath.blockLimit;
          var nodeName = block && block.nodeName() || "";
          if(nodeName.match(/^h\d$/) || nodeName === "p") {
            return nodeName
          }
        }
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-left
*/

KISSY.add("editor/plugin/justify-left", ["editor", "./justify-left/cmd", "./button"], function(S, require) {
  var Editor = require("editor");
  var justifyCenterCmd = require("./justify-left/cmd");
  require("./button");
  function exec() {
    var editor = this.get("editor");
    editor.execCommand("justifyLeft");
    editor.focus()
  }
  function justifyLeft() {
  }
  S.augment(justifyLeft, {pluginRenderUI:function(editor) {
    justifyCenterCmd.init(editor);
    editor.addButton("justifyLeft", {tooltip:"\u5de6\u5bf9\u9f50", checkable:true, listeners:{click:exec, afterSyncUI:function() {
      var self = this;
      editor.on("selectionChange", function() {
        if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
          return
        }
        if(editor.queryCommandValue("justifyLeft")) {
          self.set("checked", true)
        }else {
          self.set("checked", false)
        }
      })
    }}, mode:Editor.Mode.WYSIWYG_MODE});
    editor.docReady(function() {
      editor.get("document").on("keydown", function(e) {
        if(e.ctrlKey && e.keyCode === S.Node.KeyCode.L) {
          editor.execCommand("justifyLeft");
          e.preventDefault()
        }
      })
    })
  }});
  return justifyLeft
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-left/cmd
*/

KISSY.add("editor/plugin/justify-left/cmd", ["../justify-cmd"], function(S, require) {
  var justifyUtils = require("../justify-cmd");
  return{init:function(editor) {
    justifyUtils.addCommand(editor, "justifyLeft", "left")
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-cmd
*/

KISSY.add("editor/plugin/justify-cmd", ["editor"], function(S, require) {
  var Editor = require("editor");
  var alignRemoveRegex = /(-moz-|-webkit-|start|auto)/gi, defaultAlign = "left";
  function exec(editor, textAlign) {
    editor.focus();
    editor.execCommand("save");
    var selection = editor.getSelection(), bookmarks = selection.createBookmarks(), ranges = selection.getRanges(), iterator, block;
    for(var i = ranges.length - 1;i >= 0;i--) {
      iterator = ranges[i].createIterator();
      iterator.enlargeBr = true;
      while(block = iterator.getNextParagraph()) {
        block.removeAttr("align");
        if(isAlign(block, textAlign)) {
          block.css("text-align", "")
        }else {
          block.css("text-align", textAlign)
        }
      }
    }
    selection.selectBookmarks(bookmarks);
    editor.execCommand("save");
    editor.notifySelectionChange()
  }
  function isAlign(block, textAlign) {
    var align = block.css("text-align").replace(alignRemoveRegex, "") || defaultAlign;
    return align === textAlign
  }
  return{addCommand:function(editor, command, textAlign) {
    if(!editor.hasCommand(command)) {
      editor.addCommand(command, {exec:function(editor) {
        exec(editor, textAlign)
      }});
      editor.addCommand(Editor.Utils.getQueryCmd(command), {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement();
          var path = new Editor.ElementPath(startElement);
          var block = path.block || path.blockLimit;
          if(!block || block.nodeName() === "body") {
            return false
          }
          return isAlign(block, textAlign)
        }
      }})
    }
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-center
*/

KISSY.add("editor/plugin/justify-center", ["editor", "./justify-center/cmd", "./button"], function(S, require) {
  var Editor = require("editor");
  var justifyCenterCmd = require("./justify-center/cmd");
  require("./button");
  function exec() {
    var editor = this.get("editor");
    editor.execCommand("justifyCenter");
    editor.focus()
  }
  function justifyCenter() {
  }
  S.augment(justifyCenter, {pluginRenderUI:function(editor) {
    justifyCenterCmd.init(editor);
    editor.addButton("justifyCenter", {tooltip:"\u5c45\u4e2d\u5bf9\u9f50", checkable:true, listeners:{click:exec, afterSyncUI:function() {
      var self = this;
      editor.on("selectionChange", function() {
        if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
          return
        }
        if(editor.queryCommandValue("justifyCenter")) {
          self.set("checked", true)
        }else {
          self.set("checked", false)
        }
      })
    }}, mode:Editor.Mode.WYSIWYG_MODE});
    editor.docReady(function() {
      editor.get("document").on("keydown", function(e) {
        if(e.ctrlKey && e.keyCode === S.Node.KeyCode.E) {
          editor.execCommand("justifyCenter");
          e.preventDefault()
        }
      })
    })
  }});
  return justifyCenter
});


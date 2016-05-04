/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/source-area
*/

KISSY.add("editor/plugin/source-area", ["editor", "./button"], function(S, require) {
  var Editor = require("editor");
  require("./button");
  var SOURCE_MODE = Editor.Mode.SOURCE_MODE, WYSIWYG_MODE = Editor.Mode.WYSIWYG_MODE;
  function sourceArea() {
  }
  S.augment(sourceArea, {pluginRenderUI:function(editor) {
    editor.addButton("sourceArea", {tooltip:"\u6e90\u7801", listeners:{afterSyncUI:function() {
      var self = this;
      editor.on("wysiwygMode", function() {
        self.set("checked", false)
      });
      editor.on("sourceMode", function() {
        self.set("checked", true)
      })
    }, click:function() {
      var self = this;
      var checked = self.get("checked");
      if(checked) {
        editor.set("mode", SOURCE_MODE)
      }else {
        editor.set("mode", WYSIWYG_MODE)
      }
    }}, checkable:true})
  }});
  return sourceArea
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/button
*/

KISSY.add("editor/plugin/button", ["editor", "button"], function(S, require) {
  var Editor = require("editor");
  var Button = require("button");
  Editor.prototype.addButton = function(id, cfg, ButtonType) {
    if(ButtonType === undefined) {
      ButtonType = Button
    }
    var self = this, prefixCls = self.get("prefixCls") + "editor-toolbar-";
    if(cfg.elCls) {
      cfg.elCls = prefixCls + cfg.elCls
    }
    cfg.elCls = prefixCls + "button " + (cfg.elCls || "");
    var b = (new ButtonType(S.mix({render:self.get("toolBarEl"), content:"<span " + 'class="' + prefixCls + "item " + prefixCls + id + '"></span' + ">", prefixCls:self.get("prefixCls") + "editor-", editor:self}, cfg))).render();
    if(!cfg.content) {
      var contentEl = b.get("el").one("span");
      b.on("afterContentClsChange", function(e) {
        contentEl[0].className = prefixCls + "item " + prefixCls + e.newVal
      })
    }
    if(b.get("mode") === Editor.Mode.WYSIWYG_MODE) {
      self.on("wysiwygMode", function() {
        b.set("disabled", false)
      });
      self.on("sourceMode", function() {
        b.set("disabled", true)
      })
    }
    self.addControl(id + "/button", b);
    return b
  };
  return Button
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:04
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 button/render
 button
*/

KISSY.add("button/render", ["component/control"], function(S, require) {
  var Control = require("component/control");
  return Control.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    var self = this;
    S.mix(renderData.elAttrs, {role:"button", title:renderData.tooltip, "aria-describedby":renderData.describedby});
    if(renderData.checked) {
      renderData.elCls.push(self.getBaseCssClasses("checked"))
    }
  }, _onSetChecked:function(v) {
    var self = this, cls = self.getBaseCssClasses("checked");
    self.$el[v ? "addClass" : "removeClass"](cls)
  }, _onSetTooltip:function(title) {
    this.el.setAttribute("title", title)
  }, _onSetDescribedby:function(describedby) {
    this.el.setAttribute("aria-describedby", describedby)
  }}, {name:"ButtonRender"})
});
KISSY.add("button", ["node", "component/control", "button/render"], function(S, require) {
  var Node = require("node"), Control = require("component/control"), ButtonRender = require("button/render");
  var KeyCode = Node.KeyCode;
  return Control.extend({isButton:1, bindUI:function() {
    this.$el.on("keyup", this.handleKeyDownInternal, this)
  }, handleKeyDownInternal:function(e) {
    if(e.keyCode === KeyCode.ENTER && e.type === "keydown" || e.keyCode === KeyCode.SPACE && e.type === "keyup") {
      return this.handleClickInternal(e)
    }
    return e.keyCode === KeyCode.SPACE
  }, handleClickInternal:function() {
    var self = this;
    self.callSuper();
    if(self.get("checkable")) {
      self.set("checked", !self.get("checked"))
    }
    self.fire("click")
  }}, {ATTRS:{value:{}, describedby:{value:"", view:1}, tooltip:{value:"", view:1}, checkable:{}, checked:{value:false, view:1}, xrender:{value:ButtonRender}}, xclass:"button"})
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/code
*/

KISSY.add("editor/plugin/code", ["editor", "./button", "./dialog-loader"], function(S, require) {
  var Editor = require("editor");
  require("./button");
  var DialogLoader = require("./dialog-loader");
  function CodePlugin() {
  }
  S.augment(CodePlugin, {pluginRenderUI:function(editor) {
    editor.addButton("code", {tooltip:"\u63d2\u5165\u4ee3\u7801", listeners:{click:function() {
      DialogLoader.useDialog(editor, "code")
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return CodePlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/dialog-loader
*/

KISSY.add("editor/plugin/dialog-loader", ["editor", "overlay"], function(S, require) {
  var Editor = require("editor");
  var Overlay = require("overlay");
  var globalMask, loadMask = {loading:function(prefixCls) {
    if(!globalMask) {
      globalMask = new Overlay({x:0, width:S.UA.ie === 6 ? S.DOM.docWidth() : "100%", y:0, zIndex:Editor.baseZIndex(Editor.ZIndexManager.LOADING), prefixCls:prefixCls + "editor-", elCls:prefixCls + "editor-global-loading"})
    }
    globalMask.set("height", S.DOM.docHeight());
    globalMask.show();
    globalMask.loading()
  }, unloading:function() {
    globalMask.hide()
  }};
  return{useDialog:function(editor, name, config, args) {
    editor.focus();
    var prefixCls = editor.get("prefixCls");
    if(editor.getControl(name + "/dialog")) {
      setTimeout(function() {
        editor.showDialog(name, args)
      }, 0);
      return
    }
    loadMask.loading(prefixCls);
    S.use("editor/plugin/" + name + "/dialog", function(S, Dialog) {
      loadMask.unloading();
      editor.addControl(name + "/dialog", new Dialog(editor, config));
      editor.showDialog(name, args)
    })
  }}
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:17
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 overlay/extension/loading
 overlay/extension/mask
 overlay/close-xtpl
 overlay/overlay-xtpl
 overlay/overlay-render
 overlay/extension/overlay-effect
 overlay/control
 overlay/dialog-xtpl
 overlay/dialog-render
 overlay/dialog
 overlay/popup
 overlay
*/

KISSY.add("overlay/extension/loading", ["node"], function(S, require) {
  var Node = require("node");
  function Loading() {
  }
  Loading.prototype = {loading:function() {
    var self = this;
    if(!self._loadingExtEl) {
      self._loadingExtEl = (new Node("<div " + 'class="' + self.get("prefixCls") + 'ext-loading"' + ' style="position: absolute;' + "border: none;" + "width: 100%;" + "top: 0;" + "left: 0;" + "z-index: 99999;" + "height:100%;" + "*height: expression(this.parentNode.offsetHeight);" + '"/>')).appendTo(self.$el)
    }
    self._loadingExtEl.show()
  }, unloading:function() {
    var lel = this._loadingExtEl;
    if(lel) {
      lel.hide()
    }
  }};
  return Loading
});
KISSY.add("overlay/extension/mask", ["node"], function(S, require) {
  var UA = S.UA, Node = require("node"), ie6 = UA.ie === 6, $ = Node.all;
  function docWidth() {
    return ie6 ? "expression(KISSY.DOM.docWidth())" : "100%"
  }
  function docHeight() {
    return ie6 ? "expression(KISSY.DOM.docHeight())" : "100%"
  }
  function initMask(self, hiddenCls) {
    var maskCls = self.view.getBaseCssClasses("mask"), mask = $("<div " + ' style="width:' + docWidth() + ";" + "left:0;" + "top:0;" + "height:" + docHeight() + ";" + "position:" + (ie6 ? "absolute" : "fixed") + ';"' + ' class="' + maskCls + " " + hiddenCls + '">' + (ie6 ? "<" + "iframe " + 'style="position:absolute;' + "left:" + "0" + ";" + "top:" + "0" + ";" + "background:red;" + "width: expression(this.parentNode.offsetWidth);" + "height: expression(this.parentNode.offsetHeight);" + "filter:alpha(opacity=0);" + 
    'z-index:-1;"></iframe>' : "") + "</div>").prependTo("body");
    mask.unselectable();
    mask.on("mousedown", function(e) {
      e.preventDefault()
    });
    return mask
  }
  function Mask() {
  }
  Mask.ATTRS = {mask:{value:false}, maskNode:{}};
  var NONE = "none", effects = {fade:["Out", "In"], slide:["Up", "Down"]};
  function setMaskVisible(self, shown) {
    var maskNode = self.get("maskNode"), hiddenCls = self.view.getBaseCssClasses("mask-hidden");
    if(shown) {
      maskNode.removeClass(hiddenCls)
    }else {
      maskNode.addClass(hiddenCls)
    }
  }
  function processMask(mask, el, show, self) {
    var effect = mask.effect || NONE;
    setMaskVisible(self, show);
    if(effect === NONE) {
      return
    }
    var duration = mask.duration, easing = mask.easing, m, index = show ? 1 : 0;
    el.stop(1, 1);
    el.css("display", show ? NONE : "block");
    m = effect + effects[effect][index];
    el[m](duration, function() {
      el.css("display", "")
    }, easing)
  }
  function afterVisibleChange(e) {
    var v, self = this, maskNode = self.get("maskNode");
    if(v = e.newVal) {
      var elZIndex = Number(self.$el.css("z-index"));
      if(!isNaN(elZIndex)) {
        maskNode.css("z-index", elZIndex)
      }
    }
    processMask(self.get("mask"), maskNode, v, self)
  }
  Mask.prototype = {__renderUI:function() {
    var self = this;
    if(self.get("mask")) {
      self.set("maskNode", initMask(self, self.get("visible") ? "" : self.view.getBaseCssClasses("mask-hidden")))
    }
  }, __bindUI:function() {
    var self = this, maskNode, mask;
    if(mask = self.get("mask")) {
      maskNode = self.get("maskNode");
      if(mask.closeOnClick) {
        maskNode.on(Node.Gesture.tap, self.close, self)
      }
      self.on("afterVisibleChange", afterVisibleChange)
    }
  }, __destructor:function() {
    var mask;
    if(mask = this.get("maskNode")) {
      mask.remove()
    }
  }};
  return Mask
});
KISSY.add("overlay/close-xtpl", [], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += "";
    var config0 = {};
    var params1 = [];
    var id2 = getPropertyUtil(engine, scope, "closable", 0, 1);
    params1.push(id2);
    config0.params = params1;
    config0.fn = function(scope) {
      var buffer = "";
      buffer += '\n<a href="javascript:void(\'close\')"\n   id="ks-overlay-close-';
      var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 3);
      buffer += renderOutputUtil(id3, true);
      buffer += '"\n   class="';
      var config5 = {};
      var params6 = [];
      params6.push("close");
      config5.params = params6;
      var id4 = runInlineCommandUtil(engine, scope, config5, "getBaseCssClasses", 4);
      buffer += renderOutputUtil(id4, true);
      buffer += "\"\n   role='button'>\n    <span class=\"";
      var config8 = {};
      var params9 = [];
      params9.push("close-x");
      config8.params = params9;
      var id7 = runInlineCommandUtil(engine, scope, config8, "getBaseCssClasses", 6);
      buffer += renderOutputUtil(id7, true);
      buffer += '">close</span>\n</a>\n';
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
    buffer += "\n";
    return buffer
  }
});
KISSY.add("overlay/overlay-xtpl", ["overlay/close-xtpl", "component/extension/content-xtpl"], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += "";
    var config1 = {};
    var params2 = [];
    params2.push("overlay/close-xtpl");
    config1.params = params2;
    if(moduleWrap) {
      require("overlay/close-xtpl");
      config1.params[0] = moduleWrap.resolveByName(config1.params[0])
    }
    var id0 = runInlineCommandUtil(engine, scope, config1, "include", 1);
    buffer += renderOutputUtil(id0, false);
    buffer += "\n";
    var config4 = {};
    var params5 = [];
    params5.push("component/extension/content-xtpl");
    config4.params = params5;
    if(moduleWrap) {
      require("component/extension/content-xtpl");
      config4.params[0] = moduleWrap.resolveByName(config4.params[0])
    }
    var id3 = runInlineCommandUtil(engine, scope, config4, "include", 2);
    buffer += renderOutputUtil(id3, false);
    return buffer
  }
});
KISSY.add("overlay/overlay-render", ["component/container", "./overlay-xtpl", "component/extension/content-render"], function(S, require) {
  var Container = require("component/container");
  var OverlayTpl = require("./overlay-xtpl");
  var ContentRenderExtension = require("component/extension/content-render");
  return Container.getDefaultRender().extend([ContentRenderExtension], {createDom:function() {
    this.fillChildrenElsBySelectors({closeBtn:"#ks-overlay-close-{id}"})
  }}, {ATTRS:{contentTpl:{value:OverlayTpl}}, HTML_PARSER:{closeBtn:function(el) {
    return el.one("." + this.getBaseCssClass("close"))
  }}})
});
KISSY.add("overlay/extension/overlay-effect", [], function(S) {
  var effects = {fade:["Out", "In"], slide:["Up", "Down"]};
  function getGhost(self) {
    var el = self.$el, ghost = el.clone(true);
    ghost.css({visibility:"visible", overflow:"hidden"}).addClass(self.get("prefixCls") + "overlay-ghost");
    return self.__afterCreateEffectGhost(ghost)
  }
  function processTarget(self, show, callback) {
    if(self.__effectGhost) {
      self.__effectGhost.stop(1, 1)
    }
    var el = self.$el, $ = S.all, effectCfg = self.get("effect"), target = $(effectCfg.target), duration = effectCfg.duration, targetBox = S.mix(target.offset(), {width:target.width(), height:target.height()}), elBox = S.mix(el.offset(), {width:el.width(), height:el.height()}), from, to, ghost = getGhost(self), easing = effectCfg.easing;
    ghost.insertAfter(el);
    if(show) {
      from = targetBox;
      to = elBox
    }else {
      from = elBox;
      to = targetBox
    }
    el.css("visibility", "hidden");
    ghost.css(from);
    self.__effectGhost = ghost;
    ghost.animate(to, {duration:duration, easing:easing, complete:function() {
      self.__effectGhost = null;
      ghost.remove();
      el.css("visibility", "");
      callback()
    }})
  }
  function processEffect(self, show, callback) {
    var el = self.$el, effectCfg = self.get("effect"), effect = effectCfg.effect || "none", target = effectCfg.target;
    if(effect === "none" && !target) {
      callback();
      return
    }
    if(target) {
      processTarget(self, show, callback);
      return
    }
    var duration = effectCfg.duration, easing = effectCfg.easing, index = show ? 1 : 0;
    el.stop(1, 1);
    el.css({visibility:"visible", display:show ? "none" : "block"});
    var m = effect + effects[effect][index];
    el[m](duration, function() {
      el.css({display:"block", visibility:""});
      callback()
    }, easing)
  }
  function OverlayEffect() {
  }
  OverlayEffect.ATTRS = {effect:{value:{effect:"", target:null, duration:0.5, easing:"easeOut"}, setter:function(v) {
    var effect = v.effect;
    if(typeof effect === "string" && !effects[effect]) {
      v.effect = ""
    }
  }}};
  OverlayEffect.prototype = {__afterCreateEffectGhost:function(ghost) {
    return ghost
  }, _onSetVisible:function(v) {
    var self = this;
    processEffect(self, v, function() {
      self.fire(v ? "show" : "hide")
    })
  }};
  return OverlayEffect
});
KISSY.add("overlay/control", ["component/container", "component/extension/shim", "component/extension/align", "./extension/loading", "./extension/mask", "./overlay-render", "./extension/overlay-effect"], function(S, require) {
  var Container = require("component/container");
  var Shim = require("component/extension/shim");
  var AlignExtension = require("component/extension/align");
  var Loading = require("./extension/loading");
  var Mask = require("./extension/mask");
  var OverlayRender = require("./overlay-render");
  var OverlayEffect = require("./extension/overlay-effect");
  var HIDE = "hide", actions = {hide:HIDE, destroy:"destroy"};
  return Container.extend([Shim, Loading, AlignExtension, Mask, OverlayEffect], {bindUI:function() {
    var self = this, closeBtn = self.get("closeBtn");
    if(closeBtn) {
      closeBtn.on("click", function(ev) {
        self.close();
        ev.preventDefault()
      })
    }
  }, close:function() {
    var self = this;
    self[actions[self.get("closeAction")] || HIDE]();
    return self
  }}, {ATTRS:{contentEl:{}, closable:{value:false, view:1}, closeBtn:{view:1}, closeAction:{value:HIDE}, focusable:{value:false}, allowTextSelection:{value:true}, handleMouseEvents:{value:false}, visible:{value:false}, xrender:{value:OverlayRender}}, xclass:"overlay"})
});
KISSY.add("overlay/dialog-xtpl", ["overlay/close-xtpl"], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += "";
    var config1 = {};
    var params2 = [];
    params2.push("overlay/close-xtpl");
    config1.params = params2;
    if(moduleWrap) {
      require("overlay/close-xtpl");
      config1.params[0] = moduleWrap.resolveByName(config1.params[0])
    }
    var id0 = runInlineCommandUtil(engine, scope, config1, "include", 1);
    buffer += renderOutputUtil(id0, false);
    buffer += '\n<div id="ks-content-';
    var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 2);
    buffer += renderOutputUtil(id3, true);
    buffer += '"\n     class="';
    var config5 = {};
    var params6 = [];
    params6.push("content");
    config5.params = params6;
    var id4 = runInlineCommandUtil(engine, scope, config5, "getBaseCssClasses", 3);
    buffer += renderOutputUtil(id4, true);
    buffer += '">\n    <div class="';
    var config8 = {};
    var params9 = [];
    params9.push("header");
    config8.params = params9;
    var id7 = runInlineCommandUtil(engine, scope, config8, "getBaseCssClasses", 4);
    buffer += renderOutputUtil(id7, true);
    buffer += '"\n         style="\n';
    var config10 = {};
    var params11 = [];
    var id12 = getPropertyUtil(engine, scope, "headerStyle", 0, 6);
    params11.push(id12);
    config10.params = params11;
    config10.fn = function(scope) {
      var buffer = "";
      buffer += " \n ";
      var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "xindex", 0, 7);
      buffer += renderOutputUtil(id13, true);
      buffer += ":";
      var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 7);
      buffer += renderOutputUtil(id14, true);
      buffer += ";\n";
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config10, "each", 6);
    buffer += '\n"\n         id="ks-stdmod-header-';
    var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 10);
    buffer += renderOutputUtil(id15, true);
    buffer += '">';
    var id16 = getPropertyOrRunCommandUtil(engine, scope, {}, "headerContent", 0, 10);
    buffer += renderOutputUtil(id16, false);
    buffer += '</div>\n\n    <div class="';
    var config18 = {};
    var params19 = [];
    params19.push("body");
    config18.params = params19;
    var id17 = runInlineCommandUtil(engine, scope, config18, "getBaseCssClasses", 12);
    buffer += renderOutputUtil(id17, true);
    buffer += '"\n         style="\n';
    var config20 = {};
    var params21 = [];
    var id22 = getPropertyUtil(engine, scope, "bodyStyle", 0, 14);
    params21.push(id22);
    config20.params = params21;
    config20.fn = function(scope) {
      var buffer = "";
      buffer += " \n ";
      var id23 = getPropertyOrRunCommandUtil(engine, scope, {}, "xindex", 0, 15);
      buffer += renderOutputUtil(id23, true);
      buffer += ":";
      var id24 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 15);
      buffer += renderOutputUtil(id24, true);
      buffer += ";\n";
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config20, "each", 14);
    buffer += '\n"\n         id="ks-stdmod-body-';
    var id25 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 18);
    buffer += renderOutputUtil(id25, true);
    buffer += '">';
    var id26 = getPropertyOrRunCommandUtil(engine, scope, {}, "bodyContent", 0, 18);
    buffer += renderOutputUtil(id26, false);
    buffer += '</div>\n\n    <div class="';
    var config28 = {};
    var params29 = [];
    params29.push("footer");
    config28.params = params29;
    var id27 = runInlineCommandUtil(engine, scope, config28, "getBaseCssClasses", 20);
    buffer += renderOutputUtil(id27, true);
    buffer += '"\n         style="\n';
    var config30 = {};
    var params31 = [];
    var id32 = getPropertyUtil(engine, scope, "footerStyle", 0, 22);
    params31.push(id32);
    config30.params = params31;
    config30.fn = function(scope) {
      var buffer = "";
      buffer += " \n ";
      var id33 = getPropertyOrRunCommandUtil(engine, scope, {}, "xindex", 0, 23);
      buffer += renderOutputUtil(id33, true);
      buffer += ":";
      var id34 = getPropertyOrRunCommandUtil(engine, scope, {}, ".", 0, 23);
      buffer += renderOutputUtil(id34, true);
      buffer += ";\n";
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config30, "each", 22);
    buffer += '\n"\n         id="ks-stdmod-footer-';
    var id35 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 26);
    buffer += renderOutputUtil(id35, true);
    buffer += '">';
    var id36 = getPropertyOrRunCommandUtil(engine, scope, {}, "footerContent", 0, 26);
    buffer += renderOutputUtil(id36, false);
    buffer += '</div>\n</div>\n<div tabindex="0"></div>';
    return buffer
  }
});
KISSY.add("overlay/dialog-render", ["./overlay-render", "./dialog-xtpl"], function(S, require) {
  var OverlayRender = require("./overlay-render");
  var DialogTpl = require("./dialog-xtpl");
  function _setStdModRenderContent(self, part, v) {
    part = self.control.get(part);
    part.html(v)
  }
  return OverlayRender.extend({beforeCreateDom:function(renderData) {
    S.mix(renderData.elAttrs, {role:"dialog", "aria-labelledby":"ks-stdmod-header-" + this.control.get("id")})
  }, createDom:function() {
    this.fillChildrenElsBySelectors({header:"#ks-stdmod-header-{id}", body:"#ks-stdmod-body-{id}", footer:"#ks-stdmod-footer-{id}"})
  }, getChildrenContainerEl:function() {
    return this.control.get("body")
  }, _onSetBodyStyle:function(v) {
    this.control.get("body").css(v)
  }, _onSetHeaderStyle:function(v) {
    this.control.get("header").css(v)
  }, _onSetFooterStyle:function(v) {
    this.control.get("footer").css(v)
  }, _onSetBodyContent:function(v) {
    _setStdModRenderContent(this, "body", v)
  }, _onSetHeaderContent:function(v) {
    _setStdModRenderContent(this, "header", v)
  }, _onSetFooterContent:function(v) {
    _setStdModRenderContent(this, "footer", v)
  }}, {ATTRS:{contentTpl:{value:DialogTpl}}, HTML_PARSER:{header:function(el) {
    return el.one("." + this.getBaseCssClass("header"))
  }, body:function(el) {
    return el.one("." + this.getBaseCssClass("body"))
  }, footer:function(el) {
    return el.one("." + this.getBaseCssClass("footer"))
  }, headerContent:function(el) {
    return el.one("." + this.getBaseCssClass("header")).html()
  }, bodyContent:function(el) {
    return el.one("." + this.getBaseCssClass("body")).html()
  }, footerContent:function(el) {
    var footer = el.one("." + this.getBaseCssClass("footer"));
    return footer && footer.html()
  }}})
});
KISSY.add("overlay/dialog", ["./control", "./dialog-render", "node"], function(S, require) {
  var Overlay = require("./control");
  var DialogRender = require("./dialog-render");
  var Node = require("node");
  var Dialog = Overlay.extend({__afterCreateEffectGhost:function(ghost) {
    var self = this, elBody = self.get("body");
    ghost.all("." + self.get("prefixCls") + "stdmod-body").css({height:elBody.height(), width:elBody.width()}).html("");
    return ghost
  }, handleKeyDownInternal:function(e) {
    if(this.get("escapeToClose") && e.keyCode === Node.KeyCode.ESC) {
      if(!(e.target.nodeName.toLowerCase() === "select" && !e.target.disabled)) {
        this.close();
        e.halt()
      }
      return
    }
    trapFocus.call(this, e)
  }, _onSetVisible:function(v, e) {
    var self = this, el = self.el;
    if(v) {
      self.__lastActive = el.ownerDocument.activeElement;
      self.focus();
      el.setAttribute("aria-hidden", "false")
    }else {
      el.setAttribute("aria-hidden", "true");
      try {
        if(self.__lastActive) {
          self.__lastActive.focus()
        }
      }catch(ee) {
      }
    }
    self.callSuper(v, e)
  }}, {ATTRS:{header:{view:1}, body:{view:1}, footer:{view:1}, bodyStyle:{value:{}, view:1}, footerStyle:{value:{}, view:1}, headerStyle:{value:{}, view:1}, headerContent:{value:"", view:1}, bodyContent:{value:"", view:1}, footerContent:{value:"", view:1}, closable:{value:true}, xrender:{value:DialogRender}, focusable:{value:true}, escapeToClose:{value:true}}, xclass:"dialog"});
  var KEY_TAB = Node.KeyCode.TAB;
  function trapFocus(e) {
    var self = this, keyCode = e.keyCode;
    if(keyCode !== KEY_TAB) {
      return
    }
    var $el = self.$el;
    var node = Node.all(e.target);
    var lastFocusItem = $el.last();
    if(node.equals($el) && e.shiftKey) {
      lastFocusItem[0].focus();
      e.halt()
    }else {
      if(node.equals(lastFocusItem) && !e.shiftKey) {
        self.focus();
        e.halt()
      }else {
        if(node.equals($el) || $el.contains(node)) {
          return
        }
      }
    }
    e.halt()
  }
  return Dialog
});
KISSY.add("overlay/popup", ["./control"], function(S, require) {
  var Overlay = require("./control");
  return Overlay.extend({initializer:function() {
    var self = this, trigger = self.get("trigger");
    if(trigger) {
      if(self.get("triggerType") === "mouse") {
        self._bindTriggerMouse();
        self.on("afterRenderUI", function() {
          self._bindContainerMouse()
        })
      }else {
        self._bindTriggerClick()
      }
    }
  }, _bindTriggerMouse:function() {
    var self = this, trigger = self.get("trigger"), timer;
    self.__mouseEnterPopup = function(ev) {
      self._clearHiddenTimer();
      timer = S.later(function() {
        self._showing(ev);
        timer = undefined
      }, self.get("mouseDelay") * 1E3)
    };
    trigger.on("mouseenter", self.__mouseEnterPopup);
    self._mouseLeavePopup = function() {
      if(timer) {
        timer.cancel();
        timer = undefined
      }
      self._setHiddenTimer()
    };
    trigger.on("mouseleave", self._mouseLeavePopup)
  }, _bindContainerMouse:function() {
    var self = this;
    self.$el.on("mouseleave", self._setHiddenTimer, self).on("mouseenter", self._clearHiddenTimer, self)
  }, _setHiddenTimer:function() {
    var self = this;
    self._hiddenTimer = S.later(function() {
      self._hiding()
    }, self.get("mouseDelay") * 1E3)
  }, _clearHiddenTimer:function() {
    var self = this;
    if(self._hiddenTimer) {
      self._hiddenTimer.cancel();
      self._hiddenTimer = undefined
    }
  }, _bindTriggerClick:function() {
    var self = this;
    self.__clickPopup = function(ev) {
      ev.preventDefault();
      if(self.get("toggle")) {
        self[self.get("visible") ? "_hiding" : "_showing"](ev)
      }else {
        self._showing(ev)
      }
    };
    self.get("trigger").on("click", self.__clickPopup)
  }, _showing:function(ev) {
    var self = this;
    self.set("currentTrigger", S.one(ev.target));
    self.show()
  }, _hiding:function() {
    this.set("currentTrigger", undefined);
    this.hide()
  }, destructor:function() {
    var self = this, $el = self.$el, t = self.get("trigger");
    if(t) {
      if(self.__clickPopup) {
        t.detach("click", self.__clickPopup)
      }
      if(self.__mouseEnterPopup) {
        t.detach("mouseenter", self.__mouseEnterPopup)
      }
      if(self._mouseLeavePopup) {
        t.detach("mouseleave", self._mouseLeavePopup)
      }
    }
    $el.detach("mouseleave", self._setHiddenTimer, self).detach("mouseenter", self._clearHiddenTimer, self)
  }}, {ATTRS:{trigger:{setter:function(v) {
    return S.all(v)
  }}, triggerType:{value:"click"}, currentTrigger:{}, mouseDelay:{value:0.1}, toggle:{value:false}}, xclass:"popup"})
});
KISSY.add("overlay", ["overlay/control", "overlay/dialog", "overlay/popup"], function(S, require) {
  var O = require("overlay/control");
  var D = require("overlay/dialog");
  var P = require("overlay/popup");
  O.Dialog = D;
  S.Dialog = D;
  O.Popup = P;
  S.Overlay = O;
  return O
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:04
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/container/render
 component/container
*/

KISSY.add("component/container/render", ["component/control", "component/manager"], function(S, require) {
  var Control = require("component/control");
  var Manager = require("component/manager");
  return Control.getDefaultRender().extend([], {decorateDom:function() {
    var self = this, childrenContainerEl = self.getChildrenContainerEl(), control = self.control, defaultChildCfg = control.get("defaultChildCfg"), prefixCls = defaultChildCfg.prefixCls, defaultChildXClass = defaultChildCfg.xclass, childrenComponents = [], children = childrenContainerEl.children();
    children.each(function(c) {
      var ChildUI = self.getComponentConstructorByNode(prefixCls, c) || defaultChildXClass && Manager.getConstructorByXClass(defaultChildXClass);
      if(ChildUI) {
        childrenComponents.push(new ChildUI(S.merge(defaultChildCfg, {srcNode:c})))
      }
    });
    control.set("children", childrenComponents)
  }, getChildrenContainerEl:function() {
    return this.$el
  }}, {name:"ContainerRender"})
});
KISSY.add("component/container", ["component/control", "./container/render"], function(S, require) {
  var Control = require("component/control");
  var ContainerRender = require("./container/render");
  function defAddChild(e) {
    var self = this;
    if(e.target !== self) {
      return
    }
    var c = e.component, children = self.get("children"), index = e.index;
    children.splice(index, 0, c);
    children = self.get("children");
    c = children[index];
    c.setInternal("parent", self);
    if(self.get("rendered")) {
      self.renderChild(index)
    }
    self.fire("afterAddChild", {component:c, index:index})
  }
  function defRemoveChild(e) {
    var self = this;
    if(e.target !== self) {
      return
    }
    var c = e.component, cDOMParentEl, cDOMEl, destroy = e.destroy, children = self.get("children"), index = e.index;
    if(index !== -1) {
      children.splice(index, 1)
    }
    c.setInternal("parent", null);
    if(destroy) {
      if(c.destroy) {
        c.destroy()
      }
    }else {
      if(c.get && (cDOMEl = c.el)) {
        if(cDOMParentEl = cDOMEl.parentNode) {
          cDOMParentEl.removeChild(cDOMEl)
        }
      }
    }
    self.fire("afterRemoveChild", {component:c, index:index})
  }
  return Control.extend({isContainer:true, initializer:function() {
    var self = this, prefixCls = self.get("prefixCls"), defaultChildCfg = self.get("defaultChildCfg");
    self.publish("beforeAddChild", {defaultFn:defAddChild});
    self.publish("beforeRemoveChild", {defaultFn:defRemoveChild});
    defaultChildCfg.prefixCls = defaultChildCfg.prefixCls || prefixCls
  }, createDom:function() {
    this.createChildren()
  }, renderUI:function() {
    this.renderChildren()
  }, renderChildren:function() {
    var i, self = this, children = self.get("children");
    for(i = 0;i < children.length;i++) {
      self.renderChild(i)
    }
  }, createChildren:function() {
    var i, self = this, children = self.get("children");
    for(i = 0;i < children.length;i++) {
      self.createChild(i)
    }
  }, addChild:function(c, index) {
    var self = this, children = self.get("children");
    if(index === undefined) {
      index = children.length
    }
    self.fire("beforeAddChild", {component:c, index:index})
  }, renderChild:function(childIndex) {
    var self = this, children = self.get("children");
    self.createChild(childIndex).render();
    self.fire("afterRenderChild", {component:children[childIndex], index:childIndex})
  }, createChild:function(childIndex) {
    var self = this, c, elBefore, domContentEl, children = self.get("children"), cEl, contentEl;
    c = children[childIndex];
    contentEl = self.view.getChildrenContainerEl();
    domContentEl = contentEl[0];
    elBefore = domContentEl.children[childIndex] || null;
    if(c.get("rendered")) {
      cEl = c.el;
      if(cEl.parentNode !== domContentEl) {
        domContentEl.insertBefore(cEl, elBefore)
      }
    }else {
      if(elBefore) {
        c.set("elBefore", elBefore)
      }else {
        c.set("render", contentEl)
      }
      c.create()
    }
    self.fire("afterCreateChild", {component:c, index:childIndex});
    return c
  }, removeChild:function(c, destroy) {
    if(destroy === undefined) {
      destroy = true
    }
    this.fire("beforeRemoveChild", {component:c, index:S.indexOf(c, this.get("children")), destroy:destroy})
  }, removeChildren:function(destroy) {
    var self = this, i, t = [].concat(self.get("children"));
    for(i = 0;i < t.length;i++) {
      self.removeChild(t[i], destroy)
    }
    return self
  }, getChildAt:function(index) {
    var children = this.get("children");
    return children[index] || null
  }, destructor:function() {
    var i, children = this.get("children");
    for(i = 0;i < children.length;i++) {
      if(children[i].destroy) {
        children[i].destroy()
      }
    }
  }}, {ATTRS:{children:{value:[], getter:function(v) {
    var defaultChildCfg = null, i, c, self = this;
    for(i = 0;i < v.length;i++) {
      c = v[i];
      if(!c.isControl) {
        defaultChildCfg = defaultChildCfg || self.get("defaultChildCfg");
        S.mix(c, defaultChildCfg, false);
        v[i] = this.createComponent(c)
      }
    }
    return v
  }, setter:function(v) {
    var i, c;
    for(i = 0;i < v.length;i++) {
      c = v[i];
      if(c.isControl) {
        c.setInternal("parent", this)
      }
    }
  }}, defaultChildCfg:{value:{}}, xrender:{value:ContainerRender}}, name:"container"})
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:05
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/extension/shim
*/

KISSY.add("component/extension/shim", [], function(S) {
  var ie6 = S.UA.ie === 6;
  var shimTpl = "<" + 'iframe style="position: absolute;' + "border: none;" + "width: " + (ie6 ? "expression(this.parentNode.clientWidth)" : "100%") + ";" + "top: 0;" + "opacity: 0;" + "filter: alpha(opacity=0);" + "left: 0;" + "z-index: -1;" + "height: " + (ie6 ? "expression(this.parentNode.clientHeight)" : "100%") + ";" + '"/>';
  function Shim() {
  }
  Shim.ATTRS = {shim:{value:ie6}};
  Shim.prototype.__createDom = function() {
    if(this.get("shim")) {
      this.get("el").prepend(shimTpl)
    }
  };
  return Shim
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 10 01:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/extension/align
*/

KISSY.add("component/extension/align", ["node"], function(S, require) {
  var Node = require("node");
  var win = S.Env.host, $ = Node.all, UA = S.UA;
  function getOffsetParent(element) {
    var doc = element.ownerDocument, body = doc.body, parent, positionStyle = $(element).css("position"), skipStatic = positionStyle === "fixed" || positionStyle === "absolute";
    if(!skipStatic) {
      return element.nodeName.toLowerCase() === "html" ? null : element.parentNode
    }
    for(parent = element.parentNode;parent && parent !== body;parent = parent.parentNode) {
      positionStyle = $(parent).css("position");
      if(positionStyle !== "static") {
        return parent
      }
    }
    return null
  }
  function getVisibleRectForElement(element) {
    var visibleRect = {left:0, right:Infinity, top:0, bottom:Infinity}, el, scrollX, scrollY, winSize, doc = element.ownerDocument, $win = $(doc).getWindow(), body = doc.body, documentElement = doc.documentElement;
    for(el = element;el = getOffsetParent(el);) {
      if((!UA.ie || el.clientWidth !== 0) && el !== body && el !== documentElement && $(el).css("overflow") !== "visible") {
        var pos = $(el).offset();
        pos.left += el.clientLeft;
        pos.top += el.clientTop;
        visibleRect.top = Math.max(visibleRect.top, pos.top);
        visibleRect.right = Math.min(visibleRect.right, pos.left + el.clientWidth);
        visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
        visibleRect.left = Math.max(visibleRect.left, pos.left)
      }
    }
    scrollX = $win.scrollLeft();
    scrollY = $win.scrollTop();
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    winSize = {width:$win.width(), height:$win.height()};
    visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
    return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null
  }
  function getElFuturePos(elRegion, refNodeRegion, points, offset) {
    var xy, diff, p1, p2;
    xy = {left:elRegion.left, top:elRegion.top};
    p1 = getAlignOffset(refNodeRegion, points[0]);
    p2 = getAlignOffset(elRegion, points[1]);
    diff = [p2.left - p1.left, p2.top - p1.top];
    return{left:xy.left - diff[0] + +offset[0], top:xy.top - diff[1] + +offset[1]}
  }
  function isFailX(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right
  }
  function isFailY(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom
  }
  function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
    var pos = S.clone(elFuturePos), size = {width:elRegion.width, height:elRegion.height};
    if(overflow.adjustX && pos.left < visibleRect.left) {
      pos.left = visibleRect.left
    }
    if(overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
      size.width -= pos.left + size.width - visibleRect.right
    }
    if(overflow.adjustX && pos.left + size.width > visibleRect.right) {
      pos.left = Math.max(visibleRect.right - size.width, visibleRect.left)
    }
    if(overflow.adjustY && pos.top < visibleRect.top) {
      pos.top = visibleRect.top
    }
    if(overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
      size.height -= pos.top + size.height - visibleRect.bottom
    }
    if(overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
      pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top)
    }
    return S.mix(pos, size)
  }
  function flip(points, reg, map) {
    var ret = [];
    S.each(points, function(p) {
      ret.push(p.replace(reg, function(m) {
        return map[m]
      }))
    });
    return ret
  }
  function flipOffset(offset, index) {
    offset[index] = -offset[index];
    return offset
  }
  function Align() {
  }
  Align.__getOffsetParent = getOffsetParent;
  Align.__getVisibleRectForElement = getVisibleRectForElement;
  Align.ATTRS = {align:{value:{}}};
  function getRegion(node) {
    var offset, w, h, domNode = node[0];
    if(!S.isWindow(domNode)) {
      offset = node.offset();
      w = node.outerWidth();
      h = node.outerHeight()
    }else {
      var $win = $(domNode).getWindow();
      offset = {left:$win.scrollLeft(), top:$win.scrollTop()};
      w = $win.width();
      h = $win.height()
    }
    offset.width = w;
    offset.height = h;
    return offset
  }
  function getAlignOffset(region, align) {
    var V = align.charAt(0), H = align.charAt(1), w = region.width, h = region.height, x, y;
    x = region.left;
    y = region.top;
    if(V === "c") {
      y += h / 2
    }else {
      if(V === "b") {
        y += h
      }
    }
    if(H === "c") {
      x += w / 2
    }else {
      if(H === "r") {
        x += w
      }
    }
    return{left:x, top:y}
  }
  function beforeVisibleChange(e) {
    if(e.target === this && e.newVal) {
      realign.call(this)
    }
  }
  function onResize() {
    if(this.get("visible")) {
      realign.call(this)
    }
  }
  function realign() {
    this._onSetAlign(this.get("align"))
  }
  Align.prototype = {__bindUI:function() {
    var self = this;
    self.on("beforeVisibleChange", beforeVisibleChange, self);
    self.$el.getWindow().on("resize", onResize, self)
  }, _onSetAlign:function(v) {
    if(v && v.points) {
      this.align(v.node, v.points, v.offset, v.overflow)
    }
  }, align:function(refNode, points, offset, overflow) {
    refNode = Node.one(refNode || win);
    offset = offset && [].concat(offset) || [0, 0];
    overflow = overflow || {};
    var self = this, el = self.$el, fail = 0;
    var visibleRect = getVisibleRectForElement(el[0]);
    var elRegion = getRegion(el);
    var refNodeRegion = getRegion(refNode);
    var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
    var newElRegion = S.merge(elRegion, elFuturePos);
    if(visibleRect && (overflow.adjustX || overflow.adjustY)) {
      if(isFailX(elFuturePos, elRegion, visibleRect)) {
        fail = 1;
        points = flip(points, /[lr]/ig, {l:"r", r:"l"});
        offset = flipOffset(offset, 0)
      }
      if(isFailY(elFuturePos, elRegion, visibleRect)) {
        fail = 1;
        points = flip(points, /[tb]/ig, {t:"b", b:"t"});
        offset = flipOffset(offset, 1)
      }
      if(fail) {
        elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
        S.mix(newElRegion, elFuturePos)
      }
      var newOverflowCfg = {};
      newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);
      newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);
      if(newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
        newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg)
      }
    }
    self.set({x:newElRegion.left, y:newElRegion.top}, {force:1});
    if(newElRegion.width !== elRegion.width) {
      self.set("width", el.width() + newElRegion.width - elRegion.width)
    }
    if(newElRegion.height !== elRegion.height) {
      self.set("height", el.height() + newElRegion.height - elRegion.height)
    }
    return self
  }, center:function(node) {
    var self = this;
    self.set("align", {node:node, points:["cc", "cc"], offset:[0, 0]});
    return self
  }, __destructor:function() {
    var self = this;
    if(self.$el) {
      self.$el.getWindow().detach("resize", onResize, self)
    }
  }};
  return Align
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:05
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/extension/content-xtpl
*/

KISSY.add("component/extension/content-xtpl", [], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += '<div id="ks-content-';
    var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 1);
    buffer += renderOutputUtil(id0, true);
    buffer += '"\n           class="';
    var config2 = {};
    var params3 = [];
    params3.push("content");
    config2.params = params3;
    var id1 = runInlineCommandUtil(engine, scope, config2, "getBaseCssClasses", 2);
    buffer += renderOutputUtil(id1, true);
    buffer += '">';
    var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "content", 0, 2);
    buffer += renderOutputUtil(id4, false);
    buffer += "</div>";
    return buffer
  }
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:05
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/extension/content-render
*/

KISSY.add("component/extension/content-render", ["component/extension/content-xtpl"], function(S, require) {
  var ContentTpl = require("component/extension/content-xtpl");
  function shortcut(self) {
    var control = self.control;
    var contentEl = control.get("contentEl");
    self.$contentEl = control.$contentEl = contentEl;
    self.contentEl = control.contentEl = contentEl[0]
  }
  function ContentRender() {
  }
  ContentRender.prototype = {__beforeCreateDom:function(renderData, childrenElSelectors) {
    S.mix(childrenElSelectors, {contentEl:"#ks-content-{id}"})
  }, __createDom:function() {
    shortcut(this)
  }, __decorateDom:function() {
    shortcut(this)
  }, getChildrenContainerEl:function() {
    return this.control.get("contentEl")
  }, _onSetContent:function(v) {
    var control = this.control, contentEl = control.$contentEl;
    contentEl.html(v);
    if(!control.get("allowTextSelection")) {
      contentEl.unselectable()
    }
  }};
  S.mix(ContentRender, {ATTRS:{contentTpl:{value:ContentTpl}}, HTML_PARSER:{content:function(el) {
    return el.one("." + this.getBaseCssClass("content")).html()
  }, contentEl:function(el) {
    return el.one("." + this.getBaseCssClass("content"))
  }}});
  return ContentRender
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/separator
*/

KISSY.add("editor/plugin/separator", [], function(S) {
  function Separator() {
  }
  S.augment(Separator, {pluginRenderUI:function(editor) {
    S.all("<span " + 'class="' + editor.get("prefixCls") + 'editor-toolbar-separator">&nbsp;' + "</span>").appendTo(editor.get("toolBarEl"))
  }});
  return Separator
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:44
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/bold
*/

KISSY.add("editor/plugin/bold", ["./font/ui", "./bold/cmd", "./button"], function(S, require) {
  var ui = require("./font/ui");
  var cmd = require("./bold/cmd");
  require("./button");
  function bold() {
  }
  S.augment(bold, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    editor.addButton("bold", {cmdType:"bold", tooltip:"\u7c97\u4f53"}, ui.Button);
    editor.docReady(function() {
      editor.get("document").on("keydown", function(e) {
        if(e.ctrlKey && e.keyCode === S.Node.KeyCode.B) {
          editor.execCommand("bold");
          e.preventDefault()
        }
      })
    })
  }});
  return bold
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/font/ui
*/

KISSY.add("editor/plugin/font/ui", ["editor", "../button", "../menubutton"], function(S, require) {
  var Editor = require("editor");
  var Button = require("../button");
  var MenuButton = require("../menubutton");
  var FontSelect = MenuButton.Select.extend({initializer:function() {
    var self = this, editor = self.get("editor");
    self.on("click", function(ev) {
      var v = ev.target.get("value"), cmdType = self.get("cmdType");
      editor.execCommand(cmdType, v)
    });
    editor.on("selectionChange", function() {
      if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
        return
      }
      var cmdType = self.get("cmdType"), menu = self.get("menu"), children = menu.get && menu.get("children");
      if(children) {
        var currentValue = editor.queryCommandValue(cmdType);
        if(currentValue !== false) {
          currentValue = (currentValue + "").toLowerCase();
          for(var j = 0;j < children.length;j++) {
            var item = children[j];
            var value = item.get("value");
            if(currentValue === value.toLowerCase()) {
              self.set("value", value);
              return
            }
          }
        }
        self.set("value", null)
      }
    })
  }});
  var FontButton = Button.extend({initializer:function() {
    var self = this, editor = self.get("editor"), cmdType = self.get("cmdType");
    self.on("click", function() {
      var checked = self.get("checked");
      if(checked) {
        editor.execCommand(cmdType);
        editor.focus()
      }else {
        editor.execCommand(cmdType, false);
        editor.focus()
      }
    });
    editor.on("selectionChange", function() {
      if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
        return
      }
      var cmdType = self.get("cmdType");
      if(editor.queryCommandValue(cmdType)) {
        self.set("checked", true)
      }else {
        self.set("checked", false)
      }
    })
  }}, {ATTRS:{checkable:{value:true}, mode:{value:Editor.Mode.WYSIWYG_MODE}}});
  return{Button:FontButton, Select:FontSelect}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/menubutton
*/

KISSY.add("editor/plugin/menubutton", ["editor", "menubutton"], function(S, require) {
  var Editor = require("editor");
  var MenuButton = require("menubutton");
  Editor.prototype.addSelect = function(id, cfg, SelectType) {
    SelectType = SelectType || MenuButton.Select;
    var self = this, prefixCls = self.get("prefixCls") + "editor-";
    if(cfg) {
      cfg.editor = self;
      if(cfg.menu) {
        cfg.menu.zIndex = Editor.baseZIndex(Editor.ZIndexManager.SELECT)
      }
      if(cfg.elCls) {
        cfg.elCls = prefixCls + cfg.elCls
      }
    }
    var s = (new SelectType(S.mix({render:self.get("toolBarEl"), prefixCls:prefixCls}, cfg))).render();
    if(cfg.mode === Editor.Mode.WYSIWYG_MODE) {
      self.on("wysiwygMode", function() {
        s.set("disabled", false)
      });
      self.on("sourceMode", function() {
        s.set("disabled", true)
      })
    }
    self.addControl(id + "/select", s);
    return s
  };
  return MenuButton
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:17
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 menubutton/menubutton-xtpl
 menubutton/render
 menubutton/control
 menubutton/select
 menubutton/option
 menubutton
*/

KISSY.add("menubutton/menubutton-xtpl", ["component/extension/content-xtpl"], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += "";
    var config1 = {};
    var params2 = [];
    params2.push("component/extension/content-xtpl");
    config1.params = params2;
    if(moduleWrap) {
      require("component/extension/content-xtpl");
      config1.params[0] = moduleWrap.resolveByName(config1.params[0])
    }
    var id0 = runInlineCommandUtil(engine, scope, config1, "include", 1);
    buffer += renderOutputUtil(id0, false);
    buffer += '\n<div class="';
    var config4 = {};
    var params5 = [];
    params5.push("dropdown");
    config4.params = params5;
    var id3 = runInlineCommandUtil(engine, scope, config4, "getBaseCssClasses", 2);
    buffer += renderOutputUtil(id3, true);
    buffer += '">\n    <div class="';
    var config7 = {};
    var params8 = [];
    params8.push("dropdown-inner");
    config7.params = params8;
    var id6 = runInlineCommandUtil(engine, scope, config7, "getBaseCssClasses", 3);
    buffer += renderOutputUtil(id6, true);
    buffer += '">\n    </div>\n</div>';
    return buffer
  }
});
KISSY.add("menubutton/render", ["button", "./menubutton-xtpl", "component/extension/content-render"], function(S, require) {
  var Button = require("button");
  var MenuButtonTpl = require("./menubutton-xtpl");
  var ContentRenderExtension = require("component/extension/content-render");
  return Button.getDefaultRender().extend([ContentRenderExtension], {decorateDom:function(el) {
    var control = this.control, prefixCls = control.get("prefixCls");
    var popupMenuEl = el.one("." + prefixCls + "popupmenu");
    var docBody = popupMenuEl[0].ownerDocument.body;
    docBody.insertBefore(popupMenuEl[0], docBody.firstChild);
    var PopupMenuClass = this.getComponentConstructorByNode(prefixCls, popupMenuEl);
    control.setInternal("menu", new PopupMenuClass({srcNode:popupMenuEl, prefixCls:prefixCls}))
  }, beforeCreateDom:function(renderData) {
    S.mix(renderData.elAttrs, {"aria-expanded":false, "aria-haspopup":true})
  }, _onSetCollapsed:function(v) {
    var self = this, el = self.$el, cls = self.getBaseCssClass("open");
    el[v ? "removeClass" : "addClass"](cls).attr("aria-expanded", !v)
  }}, {ATTRS:{contentTpl:{value:MenuButtonTpl}}})
});
KISSY.add("menubutton/control", ["node", "button", "./render"], function(S, require) {
  var Node = require("node");
  var Button = require("button");
  var MenuButtonRender = require("./render");
  var KeyCode = Node.KeyCode;
  return Button.extend({isMenuButton:1, _onSetCollapsed:function(v) {
    var self = this, menu = self.get("menu");
    if(v) {
      menu.hide()
    }else {
      var el = self.$el;
      if(!menu.get("visible")) {
        var align = {node:el, points:["bl", "tl"], overflow:{adjustX:1, adjustY:1}};
        S.mix(menu.get("align"), align, false);
        if(self.get("matchElWidth")) {
          menu.render();
          var menuEl = menu.get("el");
          var borderWidth = (parseInt(menuEl.css("borderLeftWidth")) || 0) + (parseInt(menuEl.css("borderRightWidth")) || 0);
          menu.set("width", menu.get("align").node[0].offsetWidth - borderWidth)
        }
        menu.show();
        el.attr("aria-haspopup", menu.get("el").attr("id"))
      }
    }
  }, bindUI:function() {
    var self = this;
    self.on("afterHighlightedItemChange", onMenuAfterHighlightedItemChange, self);
    self.on("click", onMenuItemClick, self)
  }, handleKeyDownInternal:function(e) {
    var self = this, keyCode = e.keyCode, type = String(e.type), menu = self.get("menu");
    if(keyCode === KeyCode.SPACE) {
      e.preventDefault();
      if(type !== "keyup") {
        return undefined
      }
    }else {
      if(type !== "keydown") {
        return undefined
      }
    }
    if(menu.get("rendered") && menu.get("visible")) {
      var handledByMenu = menu.handleKeyDownInternal(e);
      if(keyCode === KeyCode.ESC) {
        self.set("collapsed", true);
        return true
      }
      return handledByMenu
    }
    if(keyCode === KeyCode.SPACE || keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
      self.set("collapsed", false);
      return true
    }
    return undefined
  }, handleClickInternal:function() {
    var self = this;
    self.set("collapsed", !self.get("collapsed"))
  }, handleBlurInternal:function(e) {
    var self = this;
    self.callSuper(e);
    self.set("collapsed", true)
  }, addItem:function(item, index) {
    var menu = this.get("menu");
    menu.addChild(item, index)
  }, removeItem:function(c, destroy) {
    var menu = this.get("menu");
    menu.removeChild(c, destroy)
  }, removeItems:function(destroy) {
    var menu = this.get("menu");
    if(menu) {
      if(menu.removeChildren) {
        menu.removeChildren(destroy)
      }else {
        if(menu.children) {
          menu.children = []
        }
      }
    }
  }, getItemAt:function(index) {
    var menu = this.get("menu");
    return menu.get("rendered") && menu.getChildAt(index)
  }, _onSetDisabled:function(v) {
    if(!v) {
      this.set("collapsed", true)
    }
  }, destructor:function() {
    this.get("menu").destroy()
  }}, {ATTRS:{matchElWidth:{value:true}, collapseOnClick:{value:false}, menu:{value:{}, getter:function(v) {
    if(!v.isControl) {
      v.xclass = v.xclass || "popupmenu";
      v = this.createComponent(v);
      this.setInternal("menu", v)
    }
    return v
  }, setter:function(m) {
    if(m.isControl) {
      m.setInternal("parent", this)
    }
  }}, collapsed:{value:false, view:1}, xrender:{value:MenuButtonRender}}, xclass:"menu-button"});
  function onMenuItemClick(e) {
    if(e.target.isMenuItem && this.get("collapseOnClick")) {
      this.set("collapsed", true)
    }
  }
  function onMenuAfterHighlightedItemChange(e) {
    if(e.target.isMenu) {
      var el = this.el, menuItem = e.newVal;
      el.setAttribute("aria-activedescendant", menuItem && menuItem.el.id || "")
    }
  }
});
KISSY.add("menubutton/select", ["node", "./control"], function(S, require) {
  var Node = require("node");
  var MenuButton = require("./control");
  function getSelectedItem(self) {
    var menu = self.get("menu"), cs = menu.children || menu.get && menu.get("children") || [], value = self.get("value"), c, i;
    for(i = 0;i < cs.length;i++) {
      c = cs[i];
      if(getItemValue(c) === value) {
        return c
      }
    }
    return null
  }
  function getItemValue(c) {
    var v;
    if(c) {
      if(c.get) {
        if((v = c.get("value")) === undefined) {
          v = c.get("textContent") || c.get("content")
        }
      }else {
        if((v = c.value) === undefined) {
          v = c.textContent || c.content
        }
      }
    }
    return v
  }
  function deSelectAllExcept(self) {
    var menu = self.get("menu"), value = self.get("value"), cs = menu && menu.get && menu.get("children");
    S.each(cs, function(c) {
      if(c && c.set) {
        c.set("selected", getItemValue(c) === value)
      }
    })
  }
  function _handleMenuShow(e) {
    var self = this, selectedItem = getSelectedItem(self), m = self.get("menu");
    if(e.target === m) {
      var item = selectedItem || m.getChildAt(0);
      if(item) {
        item.set("highlighted", true)
      }
      if(selectedItem) {
        selectedItem.set("selected", true)
      }
    }
  }
  function _updateCaption(self) {
    var item = getSelectedItem(self), textContent = item && (item.textContent || item.get && item.get("textContent")), content = item && (item.content || item.get && item.get("content"));
    self.set("content", textContent || content || self.get("defaultCaption"))
  }
  function handleMenuClick(e) {
    var self = this, target = e.target;
    if(target.isMenuItem) {
      var newValue = getItemValue(target), oldValue = self.get("value");
      self.set("value", newValue);
      if(newValue !== oldValue) {
        self.fire("change", {prevVal:oldValue, newVal:newValue})
      }
    }
  }
  var Select = MenuButton.extend({bindUI:function() {
    this.on("click", handleMenuClick, this);
    this.on("show", _handleMenuShow, this)
  }, removeItems:function() {
    var self = this;
    self.callSuper.apply(self, arguments);
    self.set("value", null)
  }, removeItem:function(c, destroy) {
    var self = this;
    self.callSuper(c, destroy);
    if(c.get("value") === self.get("value")) {
      self.set("value", null)
    }
  }, _onSetValue:function() {
    var self = this;
    deSelectAllExcept(self);
    _updateCaption(self)
  }, _onSetDefaultCaption:function() {
    _updateCaption(this)
  }}, {ATTRS:{value:{}, defaultCaption:{value:""}, collapseOnClick:{value:true}}, decorate:function(element, cfg) {
    element = S.one(element);
    cfg = cfg || {};
    cfg.elBefore = element;
    var name, allItems = [], select, selectedItem = null, curValue = element.val(), options = element.all("option");
    options.each(function(option) {
      var item = {xclass:"option", content:option.text(), elCls:option.attr("class"), value:option.val()};
      if(curValue === option.val()) {
        selectedItem = {content:item.content, value:item.value}
      }
      allItems.push(item)
    });
    S.mix(cfg, {menu:S.mix({children:allItems}, cfg.menuCfg)});
    delete cfg.menuCfg;
    select = (new Select(S.mix(cfg, selectedItem))).render();
    if(name = element.attr("name")) {
      var input = (new Node("<input" + ' type="hidden"' + ' name="' + name + '" value="' + curValue + '">')).insertBefore(element, undefined);
      select.on("afterValueChange", function(e) {
        input.val(e.newVal || "")
      })
    }
    element.remove();
    return select
  }, xclass:"select"});
  return Select
});
KISSY.add("menubutton/option", ["menu"], function(S, require) {
  var Menu = require("menu");
  var MenuItem = Menu.Item;
  return MenuItem.extend({}, {ATTRS:{selectable:{value:true}, textContent:{}}, xclass:"option"})
});
KISSY.add("menubutton", ["menubutton/control", "menubutton/select", "menubutton/option"], function(S, require) {
  var MenuButton = require("menubutton/control");
  var Select = require("menubutton/select");
  var Option = require("menubutton/option");
  MenuButton.Select = Select;
  MenuButton.Option = Option;
  return MenuButton
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:16
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 menu/menu-render
 menu/control
 menu/menuitem-render
 menu/menuitem
 menu/check-menuitem-xtpl
 menu/check-menuitem-render
 menu/check-menuitem
 menu/submenu-xtpl
 menu/submenu-render
 menu/submenu
 menu/popupmenu-render
 menu/popupmenu
 menu
*/

KISSY.add("menu/menu-render", ["component/container"], function(S, require) {
  var Container = require("component/container");
  return Container.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    renderData.elAttrs.role = "menu"
  }, containsElement:function(element) {
    var $el = this.$el;
    return $el && ($el[0] === element || $el.contains(element))
  }})
});
KISSY.add("menu/control", ["node", "component/container", "component/extension/delegate-children", "./menu-render"], function(S, require) {
  var Node = require("node");
  var Container = require("component/container");
  var DelegateChildrenExtension = require("component/extension/delegate-children");
  var MenuRender = require("./menu-render");
  var KeyCode = Node.KeyCode;
  return Container.extend([DelegateChildrenExtension], {isMenu:1, _onSetHighlightedItem:function(v, ev) {
    var highlightedItem;
    if(v && ev && (highlightedItem = ev.prevVal)) {
      highlightedItem.set("highlighted", false, {data:{byPassSetHighlightedItem:1}})
    }
  }, _onSetVisible:function(v, e) {
    this.callSuper(e);
    var highlightedItem;
    if(!v && (highlightedItem = this.get("highlightedItem"))) {
      highlightedItem.set("highlighted", false)
    }
  }, bindUI:function() {
    var self = this;
    self.on("afterHighlightedItemChange", afterHighlightedItemChange, self)
  }, getRootMenu:function() {
    return this
  }, handleMouseEnterInternal:function(e) {
    this.callSuper(e);
    var rootMenu = this.getRootMenu();
    if(rootMenu && rootMenu._popupAutoHideTimer) {
      clearTimeout(rootMenu._popupAutoHideTimer);
      rootMenu._popupAutoHideTimer = null
    }
    this.focus()
  }, handleBlurInternal:function(e) {
    this.callSuper(e);
    var highlightedItem;
    if(highlightedItem = this.get("highlightedItem")) {
      highlightedItem.set("highlighted", false)
    }
  }, _getNextEnabledHighlighted:function(index, dir) {
    var children = this.get("children"), len = children.length, o = index;
    do {
      var c = children[index];
      if(!c.get("disabled") && c.get("visible") !== false) {
        return children[index]
      }
      index = (index + dir + len) % len
    }while(index !== o);
    return undefined
  }, handleKeyDownInternal:function(e) {
    var self = this;
    var highlightedItem = self.get("highlightedItem");
    if(highlightedItem && highlightedItem.handleKeyDownInternal(e)) {
      return true
    }
    var children = self.get("children"), len = children.length;
    if(len === 0) {
      return undefined
    }
    var index, destIndex, nextHighlighted;
    switch(e.keyCode) {
      case KeyCode.ESC:
        if(highlightedItem = self.get("highlightedItem")) {
          highlightedItem.set("highlighted", false)
        }
        break;
      case KeyCode.HOME:
        nextHighlighted = self._getNextEnabledHighlighted(0, 1);
        break;
      case KeyCode.END:
        nextHighlighted = self._getNextEnabledHighlighted(len - 1, -1);
        break;
      case KeyCode.UP:
        if(!highlightedItem) {
          destIndex = len - 1
        }else {
          index = S.indexOf(highlightedItem, children);
          destIndex = (index - 1 + len) % len
        }
        nextHighlighted = self._getNextEnabledHighlighted(destIndex, -1);
        break;
      case KeyCode.DOWN:
        if(!highlightedItem) {
          destIndex = 0
        }else {
          index = S.indexOf(highlightedItem, children);
          destIndex = (index + 1 + len) % len
        }
        nextHighlighted = self._getNextEnabledHighlighted(destIndex, 1);
        break
    }
    if(nextHighlighted) {
      nextHighlighted.set("highlighted", true, {data:{fromKeyboard:1}});
      return true
    }else {
      return undefined
    }
  }, containsElement:function(element) {
    var self = this;
    if(!self.get("visible") || !self.$el) {
      return false
    }
    if(self.view.containsElement(element)) {
      return true
    }
    var children = self.get("children");
    for(var i = 0, count = children.length;i < count;i++) {
      var child = children[i];
      if(child.containsElement && child.containsElement(element)) {
        return true
      }
    }
    return false
  }}, {ATTRS:{highlightedItem:{value:null}, xrender:{value:MenuRender}, defaultChildCfg:{value:{xclass:"menuitem"}}}, xclass:"menu"});
  function afterHighlightedItemChange(e) {
    if(e.target.isMenu) {
      var el = this.el, menuItem = e.newVal;
      el.setAttribute("aria-activedescendant", menuItem && menuItem.el.id || "")
    }
  }
});
KISSY.add("menu/menuitem-render", ["component/control"], function(S, require) {
  var Control = require("component/control");
  return Control.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    renderData.elAttrs.role = renderData.selectable ? "menuitemradio" : "menuitem";
    if(renderData.selected) {
      renderData.elCls.push(this.getBaseCssClasses("selected"))
    }
  }, _onSetSelected:function(v) {
    var self = this, cls = self.getBaseCssClasses("selected");
    self.$el[v ? "addClass" : "removeClass"](cls)
  }, containsElement:function(element) {
    var $el = this.$el;
    return $el && ($el[0] === element || $el.contains(element))
  }}, {HTML_PARSER:{selectable:function(el) {
    return el.hasClass(this.getBaseCssClass("selectable"))
  }}})
});
KISSY.add("menu/menuitem", ["component/control", "./menuitem-render", "node"], function(S, require) {
  var Control = require("component/control");
  var MenuItemRender = require("./menuitem-render");
  var $ = require("node").all;
  return Control.extend({isMenuItem:1, handleClickInternal:function() {
    var self = this;
    self.callSuper();
    if(self.get("selectable")) {
      self.set("selected", true)
    }
    self.fire("click");
    return true
  }, _onSetHighlighted:function(v, e) {
    var self = this, parent = self.get("parent");
    if(!(e && e.byPassSetHighlightedItem)) {
      if(self.get("rendered")) {
        parent.set("highlightedItem", v ? self : null)
      }else {
        if(v) {
          parent.set("highlightedItem", self)
        }
      }
    }
    if(v) {
      var el = self.$el, p = el.parent(function(e) {
        return $(e).css("overflow") !== "visible"
      }, parent.get("el").parent());
      if(!p) {
        return
      }
      el.scrollIntoView(p, {alignWithTop:true, allowHorizontalScroll:true, onlyScrollIfNeeded:true})
    }
  }, containsElement:function(element) {
    return this.view.containsElement(element)
  }}, {ATTRS:{focusable:{value:false}, handleMouseEvents:{value:false}, selectable:{view:1}, value:{}, selected:{view:1}, xrender:{value:MenuItemRender}}, xclass:"menuitem"})
});
KISSY.add("menu/check-menuitem-xtpl", ["component/extension/content-xtpl"], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += '<div class="';
    var config1 = {};
    var params2 = [];
    params2.push("checkbox");
    config1.params = params2;
    var id0 = runInlineCommandUtil(engine, scope, config1, "getBaseCssClasses", 1);
    buffer += renderOutputUtil(id0, true);
    buffer += '">\n</div>\n';
    var config4 = {};
    var params5 = [];
    params5.push("component/extension/content-xtpl");
    config4.params = params5;
    if(moduleWrap) {
      require("component/extension/content-xtpl");
      config4.params[0] = moduleWrap.resolveByName(config4.params[0])
    }
    var id3 = runInlineCommandUtil(engine, scope, config4, "include", 3);
    buffer += renderOutputUtil(id3, false);
    return buffer
  }
});
KISSY.add("menu/check-menuitem-render", ["./menuitem-render", "component/extension/content-render", "./check-menuitem-xtpl"], function(S, require) {
  var MenuItemRender = require("./menuitem-render");
  var ContentRenderExtension = require("component/extension/content-render");
  var CheckMenuItemTpl = require("./check-menuitem-xtpl");
  return MenuItemRender.extend([ContentRenderExtension], {beforeCreateDom:function(renderData) {
    if(renderData.checked) {
      renderData.elCls.push(this.getBaseCssClasses("checked"))
    }
  }, _onSetChecked:function(v) {
    var self = this, cls = self.getBaseCssClasses("checked");
    self.$el[v ? "addClass" : "removeClass"](cls)
  }}, {ATTRS:{contentTpl:{value:CheckMenuItemTpl}}})
});
KISSY.add("menu/check-menuitem", ["./menuitem", "./check-menuitem-render"], function(S, require) {
  var MenuItem = require("./menuitem");
  var CheckMenuItemRender = require("./check-menuitem-render");
  return MenuItem.extend({handleClickInternal:function() {
    var self = this;
    self.callSuper();
    self.set("checked", !self.get("checked"));
    self.fire("click");
    return true
  }}, {ATTRS:{checked:{view:1}, xrender:{value:CheckMenuItemRender}}, xclass:"check-menuitem"})
});
KISSY.add("menu/submenu-xtpl", [], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += '<div id="ks-content-';
    var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 1);
    buffer += renderOutputUtil(id0, true);
    buffer += '"\n     class="';
    var config2 = {};
    var params3 = [];
    params3.push("content");
    config2.params = params3;
    var id1 = runInlineCommandUtil(engine, scope, config2, "getBaseCssClasses", 2);
    buffer += renderOutputUtil(id1, true);
    buffer += '">';
    var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "content", 0, 2);
    buffer += renderOutputUtil(id4, false);
    buffer += '</div>\n<span class="';
    var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "prefixCls", 0, 3);
    buffer += renderOutputUtil(id5, true);
    buffer += 'submenu-arrow">\u25ba</span>';
    return buffer
  }
});
KISSY.add("menu/submenu-render", ["./submenu-xtpl", "./menuitem-render", "component/extension/content-render"], function(S, require) {
  var SubMenuTpl = require("./submenu-xtpl");
  var MenuItemRender = require("./menuitem-render");
  var ContentRenderExtension = require("component/extension/content-render");
  return MenuItemRender.extend([ContentRenderExtension], {decorateDom:function(el) {
    var control = this.control, prefixCls = control.get("prefixCls");
    var popupMenuEl = el.one("." + prefixCls + "popupmenu");
    var docBody = popupMenuEl[0].ownerDocument.body;
    docBody.insertBefore(popupMenuEl[0], docBody.firstChild);
    var PopupMenuClass = this.getComponentConstructorByNode(prefixCls, popupMenuEl);
    control.setInternal("menu", new PopupMenuClass({srcNode:popupMenuEl, prefixCls:prefixCls}))
  }}, {ATTRS:{contentTpl:{value:SubMenuTpl}}})
});
KISSY.add("menu/submenu", ["node", "./menuitem", "./submenu-render"], function(S, require) {
  var Node = require("node");
  var MenuItem = require("./menuitem");
  var SubMenuRender = require("./submenu-render");
  var KeyCode = Node.KeyCode, MENU_DELAY = 0.15;
  function afterHighlightedChange(e) {
    var target = e.target, self = this;
    if(target !== self && target.isMenuItem && e.newVal) {
      self.clearHidePopupMenuTimers();
      if(!self.get("highlighted")) {
        self.set("highlighted", true);
        target.set("highlighted", false);
        target.set("highlighted", true)
      }
    }
  }
  return MenuItem.extend({isSubMenu:1, clearShowPopupMenuTimers:function() {
    var showTimer;
    if(showTimer = this._showTimer) {
      showTimer.cancel();
      this._showTimer = null
    }
  }, clearHidePopupMenuTimers:function() {
    var dismissTimer;
    if(dismissTimer = this._dismissTimer) {
      dismissTimer.cancel();
      this._dismissTimer = null
    }
  }, clearSubMenuTimers:function() {
    this.clearHidePopupMenuTimers();
    this.clearShowPopupMenuTimers()
  }, bindUI:function() {
    var self = this;
    self.on("afterHighlightedChange", afterHighlightedChange, self)
  }, handleMouseLeaveInternal:function() {
    var self = this;
    self.set("highlighted", false, {data:{fromMouse:1}});
    self.clearSubMenuTimers();
    var menu = self.get("menu");
    if(menu.get("visible")) {
      self._dismissTimer = S.later(hideMenu, self.get("menuDelay") * 1E3, false, self)
    }
  }, handleMouseEnterInternal:function() {
    var self = this;
    self.set("highlighted", true, {data:{fromMouse:1}});
    self.clearSubMenuTimers();
    var menu = self.get("menu");
    if(!menu.get("visible")) {
      self._showTimer = S.later(showMenu, self.get("menuDelay") * 1E3, false, self)
    }
  }, _onSetHighlighted:function(v, e) {
    var self = this;
    if(!e) {
      return
    }
    self.callSuper(e);
    if(e.fromMouse) {
      return
    }
    if(v && !e.fromKeyboard) {
      showMenu.call(self)
    }else {
      if(!v) {
        hideMenu.call(self)
      }
    }
  }, handleClickInternal:function() {
    var self = this;
    showMenu.call(self);
    self.callSuper()
  }, handleKeyDownInternal:function(e) {
    var self = this, menu = self.get("menu"), menuChildren, menuChild, hasKeyboardControl_ = menu.get("visible"), keyCode = e.keyCode;
    if(!hasKeyboardControl_) {
      if(keyCode === KeyCode.RIGHT) {
        showMenu.call(self);
        menuChildren = menu.get("children");
        if(menuChild = menuChildren[0]) {
          menuChild.set("highlighted", true, {data:{fromKeyboard:1}})
        }
      }else {
        if(keyCode === KeyCode.ENTER) {
          return self.handleClickInternal(e)
        }else {
          return undefined
        }
      }
    }else {
      if(!menu.handleKeyDownInternal(e)) {
        if(keyCode === KeyCode.LEFT) {
          self.set("highlighted", false);
          self.set("highlighted", true, {data:{fromKeyboard:1}})
        }else {
          return undefined
        }
      }
    }
    return true
  }, containsElement:function(element) {
    return this.get("menu").containsElement(element)
  }, destructor:function() {
    var self = this, menu = self.get("menu");
    self.clearSubMenuTimers();
    menu.destroy()
  }}, {ATTRS:{menuDelay:{value:MENU_DELAY}, menu:{value:{}, getter:function(v) {
    if(!v.isControl) {
      v.xclass = v.xclass || "popupmenu";
      v = this.createComponent(v);
      this.setInternal("menu", v)
    }
    return v
  }, setter:function(m) {
    if(m.isControl) {
      m.setInternal("parent", this)
    }
  }}, xrender:{value:SubMenuRender}}, xclass:"submenu"});
  function showMenu() {
    var self = this, menu = self.get("menu");
    var align = {node:this.$el, points:["tr", "tl"], overflow:{adjustX:1, adjustY:1}};
    S.mix(menu.get("align"), align, false);
    menu.show();
    self.el.setAttribute("aria-haspopup", menu.get("el").attr("id"))
  }
  function hideMenu() {
    this.get("menu").hide()
  }
});
KISSY.add("menu/popupmenu-render", ["component/extension/content-render", "./menu-render"], function(S, require) {
  var ContentRenderExtension = require("component/extension/content-render");
  var MenuRender = require("./menu-render");
  return MenuRender.extend([ContentRenderExtension])
});
KISSY.add("menu/popupmenu", ["component/extension/align", "component/extension/shim", "./control", "./popupmenu-render"], function(S, require) {
  var AlignExtension = require("component/extension/align");
  var Shim = require("component/extension/shim");
  var Menu = require("./control");
  var PopupMenuRender = require("./popupmenu-render");
  return Menu.extend([Shim, AlignExtension], {getRootMenu:function() {
    var cur = this, last;
    do {
      last = cur;
      cur = cur.get("parent")
    }while(cur && (cur.isMenuItem || cur.isMenu));
    return last === this ? null : last
  }, handleMouseLeaveInternal:function(e) {
    this.callSuper(e);
    if(this.get("autoHideOnMouseLeave")) {
      var rootMenu = this.getRootMenu();
      if(rootMenu) {
        clearTimeout(rootMenu._popupAutoHideTimer);
        rootMenu._popupAutoHideTimer = setTimeout(function() {
          var item;
          if(item = rootMenu.get("highlightedItem")) {
            item.set("highlighted", false)
          }
        }, this.get("parent").get("menuDelay") * 1E3)
      }
    }
  }, isPopupMenu:1, handleBlurInternal:function(e) {
    var self = this;
    self.callSuper(e);
    self.hide()
  }}, {ATTRS:{focusable:{value:false}, autoHideOnMouseLeave:{}, contentEl:{}, visible:{value:false}, xrender:{value:PopupMenuRender}}, xclass:"popupmenu"})
});
KISSY.add("menu", ["menu/control", "menu/menuitem", "menu/check-menuitem", "menu/submenu", "menu/popupmenu"], function(S, require) {
  var Menu = require("menu/control");
  var Item = require("menu/menuitem");
  var CheckItem = require("menu/check-menuitem");
  var SubMenu = require("menu/submenu");
  var PopupMenu = require("menu/popupmenu");
  Menu.Item = Item;
  Menu.CheckItem = CheckItem;
  Menu.SubMenu = SubMenu;
  Menu.PopupMenu = PopupMenu;
  return Menu
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Feb 25 15:53
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/extension/delegate-children
*/

KISSY.add("component/extension/delegate-children", ["node", "component/manager"], function(S, require) {
  var Node = require("node"), Manager = require("component/manager");
  var UA = S.UA, ie = UA.ieMode, Features = S.Features, Gesture = Node.Gesture, isTouchEventSupported = Features.isTouchEventSupported();
  function onRenderChild(e) {
    if(e.target === this) {
      var child = e.component, el = child.$el;
      el.addClass(this.__childClsTag)
    }
  }
  function onRemoveChild(e) {
    if(e.target === this) {
      var child = e.component, el = child.$el;
      if(el) {
        el.removeClass(this.__childClsTag)
      }
    }
  }
  function DelegateChildren() {
    var self = this;
    self.__childClsTag = S.guid("ks-component-child");
    self.on("afterRenderChild", onRenderChild, self).on("afterRemoveChild", onRemoveChild, self)
  }
  S.augment(DelegateChildren, {handleChildrenEvents:function(e) {
    if(!this.get("disabled")) {
      var control = this.getOwnerControl(e);
      if(control && !control.get("disabled")) {
        e.stopPropagation();
        switch(e.type) {
          case Gesture.start:
            control.handleMouseDown(e);
            break;
          case Gesture.end:
            control.handleMouseUp(e);
            break;
          case Gesture.tap:
            control.handleClick(e);
            break;
          case "mouseenter":
            control.handleMouseEnter(e);
            break;
          case "mouseleave":
            control.handleMouseLeave(e);
            break;
          case "contextmenu":
            control.handleContextMenu(e);
            break;
          case "dblclick":
            control.handleDblClick(e);
            break;
          default:
            S.error(e.type + " unhandled!")
        }
      }
    }
  }, __bindUI:function() {
    var self = this, events = Gesture.start + " " + Gesture.end + " " + Gesture.tap;
    if(Gesture.cancel) {
      events += " " + Gesture.cancel
    }
    events += " mouseenter mouseleave contextmenu " + (ie && ie < 9 ? "dblclick " : "");
    self.$el.delegate(events, "." + self.__childClsTag, self.handleChildrenEvents, self)
  }, getOwnerControl:function(e) {
    return Manager.getComponent(e.currentTarget.id)
  }});
  return DelegateChildren
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:44
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/bold/cmd
*/

KISSY.add("editor/plugin/bold/cmd", ["editor", "../font/cmd"], function(S, require) {
  var Editor = require("editor");
  var Cmd = require("../font/cmd");
  var BOLD_STYLE = new Editor.Style({element:"strong", overrides:[{element:"b"}, {element:"span", attributes:{style:"font-weight: bold;"}}]});
  return{init:function(editor) {
    Cmd.addButtonCmd(editor, "bold", BOLD_STYLE)
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/font/cmd
*/

KISSY.add("editor/plugin/font/cmd", ["editor"], function(S, require) {
  var Editor = require("editor");
  var getQueryCmd = Editor.Utils.getQueryCmd;
  function getValueFromSingle(element, styleObj) {
    var nodeName = element.nodeName();
    if(styleObj.element !== nodeName) {
      return false
    }
    var styles = styleObj.styles, v;
    for(var s in styles) {
      if(v = element.style(s)) {
        return v
      }
    }
    var overrides = styleObj.overrides;
    for(var i = 0;i < overrides.length;i++) {
      var override = overrides[i];
      if(override.element !== nodeName) {
        continue
      }
      var attributes = override.attributes;
      for(var a in attributes) {
        if(v = element.attr(a)) {
          return v
        }
      }
    }
    return false
  }
  function getValueFromStyleObj(elementPath, styleObj) {
    var elements = elementPath.elements, element, i, v;
    for(i = 0;i < elements.length;i++) {
      element = elements[i];
      if(elementPath.block && element[0] === elementPath.block[0] || elementPath.blockLimit && element[0] === elementPath.blockLimit[0]) {
        continue
      }
      v = getValueFromSingle(element, styleObj);
      if(v !== false) {
        return v
      }
    }
    return v
  }
  return{addButtonCmd:function(editor, cmdType, style) {
    var queryCmd = getQueryCmd(cmdType);
    if(!editor.hasCommand(cmdType)) {
      editor.addCommand(cmdType, {exec:function(editor) {
        var doc = editor.get("document")[0];
        editor.execCommand("save");
        var checked = editor.queryCommandValue(cmdType);
        if(checked) {
          style.remove(doc)
        }else {
          style.apply(doc)
        }
        editor.execCommand("save");
        editor.notifySelectionChange()
      }});
      editor.addCommand(queryCmd, {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement(), currentPath = new Editor.ElementPath(startElement);
          return style.checkActive(currentPath)
        }
      }})
    }
  }, addSelectCmd:function(editor, cmdType, styleObj) {
    var queryCmd = getQueryCmd(cmdType);
    if(!editor.hasCommand(cmdType)) {
      editor.addCommand(cmdType, {exec:function(editor, value) {
        editor.focus();
        var currentValue = editor.queryCommandValue(cmdType) || "";
        var style = new Editor.Style(styleObj, {value:value}), doc = editor.get("document")[0];
        editor.execCommand("save");
        if(value.toLowerCase() === currentValue.toLowerCase()) {
          style.remove(doc)
        }else {
          style.apply(doc)
        }
        editor.execCommand("save")
      }});
      editor.addCommand(queryCmd, {exec:function(editor) {
        var selection = editor.getSelection();
        if(selection && !selection.isInvalid) {
          var startElement = selection.getStartElement();
          var currentPath = new Editor.ElementPath(startElement);
          return getValueFromStyleObj(currentPath, styleObj)
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

 editor/plugin/italic
*/

KISSY.add("editor/plugin/italic", ["./font/ui", "./italic/cmd", "./button"], function(S, require) {
  var ui = require("./font/ui");
  var cmd = require("./italic/cmd");
  require("./button");
  function italic() {
  }
  S.augment(italic, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    editor.addButton("italic", {cmdType:"italic", tooltip:"\u659c\u4f53"}, ui.Button);
    editor.docReady(function() {
      editor.get("document").on("keydown", function(e) {
        if(e.ctrlKey && e.keyCode === S.Node.KeyCode.I) {
          editor.execCommand("italic");
          e.preventDefault()
        }
      })
    })
  }});
  return italic
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/italic/cmd
*/

KISSY.add("editor/plugin/italic/cmd", ["editor", "../font/cmd"], function(S, require) {
  var Editor = require("editor");
  var Cmd = require("../font/cmd");
  var ITALIC_STYLE = new Editor.Style({element:"em", overrides:[{element:"i"}, {element:"span", attributes:{style:"font-style: italic;"}}]});
  return{init:function(editor) {
    Cmd.addButtonCmd(editor, "italic", ITALIC_STYLE)
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/font-family
*/

KISSY.add("editor/plugin/font-family", ["editor", "./font/ui", "./font-family/cmd", "./menubutton"], function(S, require) {
  var Editor = require("editor");
  var ui = require("./font/ui");
  var cmd = require("./font-family/cmd");
  require("./menubutton");
  function FontFamilyPlugin(config) {
    this.config = config || {}
  }
  S.augment(FontFamilyPlugin, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    var fontFamilies = this.config;
    var menu = {};
    S.mix(menu, {children:[{content:"\u5b8b\u4f53", value:"SimSun"}, {content:"\u9ed1\u4f53", value:"SimHei"}, {content:"\u96b6\u4e66", value:"LiSu"}, {content:"\u6977\u4f53", value:"KaiTi_GB2312"}, {content:"\u5fae\u8f6f\u96c5\u9ed1", value:'"Microsoft YaHei"'}, {content:"Georgia", value:"Georgia"}, {content:"Times New Roman", value:'"Times New Roman"'}, {content:"Impact", value:"Impact"}, {content:"Courier New", value:'"Courier New"'}, {content:"Arial", value:"Arial"}, {content:"Verdana", value:"Verdana"}, 
    {content:"Tahoma", value:"Tahoma"}], width:"130px"});
    S.each(menu.children, function(item) {
      var attrs = item.elAttrs || {}, value = item.value;
      attrs.style = attrs.style || "";
      attrs.style += ";font-family:" + value;
      item.elAttrs = attrs
    });
    fontFamilies.menu = S.mix(menu, fontFamilies.menu);
    editor.addSelect("fontFamily", S.mix({cmdType:"fontFamily", defaultCaption:"\u5b57\u4f53", width:130, mode:Editor.Mode.WYSIWYG_MODE}, fontFamilies), ui.Select)
  }});
  return FontFamilyPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/font-family/cmd
*/

KISSY.add("editor/plugin/font-family/cmd", ["../font/cmd"], function(S, require) {
  var Cmd = require("../font/cmd");
  var fontFamilyStyle = {element:"span", styles:{"font-family":"#(value)"}, overrides:[{element:"font", attributes:{face:null}}]};
  return{init:function(editor) {
    Cmd.addSelectCmd(editor, "fontFamily", fontFamilyStyle)
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/font-size
*/

KISSY.add("editor/plugin/font-size", ["editor", "./font/ui", "./font-size/cmd", "./menubutton"], function(S, require) {
  var Editor = require("editor");
  var ui = require("./font/ui");
  var cmd = require("./font-size/cmd");
  require("./menubutton");
  function FontSizePlugin(config) {
    this.config = config || {}
  }
  S.augment(FontSizePlugin, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    function wrapFont(vs) {
      var v = [];
      S.each(vs, function(n) {
        v.push({content:n, value:n})
      });
      return v
    }
    var fontSizeConfig = this.config;
    fontSizeConfig.menu = S.mix({children:wrapFont(["8px", "10px", "12px", "14px", "18px", "24px", "36px", "48px", "60px", "72px", "84px", "96px"])}, fontSizeConfig.menu);
    editor.addSelect("fontSize", S.mix({cmdType:"fontSize", defaultCaption:"\u5927\u5c0f", width:"70px", mode:Editor.Mode.WYSIWYG_MODE}, fontSizeConfig), ui.Select)
  }});
  return FontSizePlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/font-size/cmd
*/

KISSY.add("editor/plugin/font-size/cmd", ["../font/cmd"], function(S, require) {
  var Cmd = require("../font/cmd");
  var fontSizeStyle = {element:"span", styles:{"font-size":"#(value)"}, overrides:[{element:"font", attributes:{size:null}}]};
  return{init:function(editor) {
    Cmd.addSelectCmd(editor, "fontSize", fontSizeStyle)
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/strike-through
*/

KISSY.add("editor/plugin/strike-through", ["./font/ui", "./strike-through/cmd", "./button"], function(S, require) {
  var ui = require("./font/ui");
  var cmd = require("./strike-through/cmd");
  require("./button");
  function StrikeThrough() {
  }
  S.augment(StrikeThrough, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    editor.addButton("strikeThrough", {cmdType:"strikeThrough", tooltip:"\u5220\u9664\u7ebf"}, ui.Button)
  }});
  return StrikeThrough
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/strike-through/cmd
*/

KISSY.add("editor/plugin/strike-through/cmd", ["editor", "../font/cmd"], function(S, require) {
  var Editor = require("editor");
  var Cmd = require("../font/cmd");
  var STRIKE_STYLE = new Editor.Style({element:"del", overrides:[{element:"span", attributes:{style:"text-decoration: line-through;"}}, {element:"s"}, {element:"strike"}]});
  return{init:function(editor) {
    Cmd.addButtonCmd(editor, "strikeThrough", STRIKE_STYLE)
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/underline
*/

KISSY.add("editor/plugin/underline", ["./font/ui", "./underline/cmd", "./button"], function(S, require) {
  var ui = require("./font/ui");
  var cmd = require("./underline/cmd");
  require("./button");
  function Underline() {
  }
  S.augment(Underline, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    editor.addButton("underline", {cmdType:"underline", tooltip:"\u4e0b\u5212\u7ebf"}, ui.Button);
    editor.docReady(function() {
      editor.get("document").on("keydown", function(e) {
        if(e.ctrlKey && e.keyCode === S.Node.KeyCode.U) {
          editor.execCommand("underline");
          e.preventDefault()
        }
      })
    })
  }});
  return Underline
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/underline/cmd
*/

KISSY.add("editor/plugin/underline/cmd", ["editor", "../font/cmd"], function(S, require) {
  var Editor = require("editor");
  var Cmd = require("../font/cmd");
  var UNDERLINE_STYLE = new Editor.Style({element:"u", overrides:[{element:"span", attributes:{style:"text-decoration: underline;"}}]});
  return{init:function(editor) {
    Cmd.addButtonCmd(editor, "underline", UNDERLINE_STYLE)
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/checkbox-source-area
*/

KISSY.add("editor/plugin/checkbox-source-area", ["editor"], function(S, require) {
  var Editor = require("editor");
  var Node = S.Node;
  var SOURCE_MODE = Editor.Mode.SOURCE_MODE, WYSIWYG_MODE = Editor.Mode.WYSIWYG_MODE;
  function CheckboxSourceArea(editor) {
    var self = this;
    self.editor = editor;
    self._init()
  }
  S.augment(CheckboxSourceArea, {_init:function() {
    var self = this, editor = self.editor, statusBarEl = editor.get("statusBarEl");
    self.holder = new Node("<span " + 'style="zoom:1;display:inline-block;height:22px;line-height:22px;">' + '<label style="vertical-align:middle;">' + '<input style="margin:0 5px;" type="checkbox" />' + "\u7f16\u8f91\u6e90\u4ee3\u7801</label>" + "</span>");
    self.holder.appendTo(statusBarEl);
    var el = self.el = self.holder.one("input");
    el.on("click", self._check, self);
    editor.on("wysiwygMode", self._wysiwygmode, self);
    editor.on("sourceMode", self._sourcemode, self)
  }, _sourcemode:function() {
    this.el.attr("checked", true)
  }, _wysiwygmode:function() {
    this.el.attr("checked", false)
  }, _check:function() {
    var self = this, editor = self.editor, el = self.el;
    if(el.attr("checked")) {
      editor.set("mode", SOURCE_MODE)
    }else {
      editor.set("mode", WYSIWYG_MODE)
    }
  }, destroy:function() {
    this.holder.remove()
  }});
  function CheckboxSourceAreaPlugin() {
  }
  S.augment(CheckboxSourceAreaPlugin, {pluginRenderUI:function(editor) {
    var c = new CheckboxSourceArea(editor);
    editor.on("destroy", function() {
      c.destroy()
    })
  }});
  return CheckboxSourceAreaPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 13 14:56
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/image
*/

KISSY.add("editor/plugin/image", ["./button", "editor", "./bubble", "./dialog-loader", "./contextmenu"], function(S, require) {
  require("./button");
  var Editor = require("editor");
  require("./bubble");
  var DialogLoader = require("./dialog-loader");
  require("./contextmenu");
  var UA = S.UA, Node = KISSY.NodeList, $ = S.all, checkImg = function(node) {
    node = $(node);
    if(node.nodeName() === "img" && !/(^|\s+)ke_/.test(node[0].className)) {
      return node
    }
  }, tipHTML = '<a class="{prefixCls}editor-bubble-url" ' + 'target="_blank" href="#">\u5728\u65b0\u7a97\u53e3\u67e5\u770b</a>  |  ' + '<a class="{prefixCls}editor-bubble-link ' + '{prefixCls}editor-bubble-change" href="#">\u7f16\u8f91</a>  |  ' + '<a class="{prefixCls}editor-bubble-link ' + '{prefixCls}editor-bubble-remove" href="#">\u5220\u9664</a>';
  function ImagePlugin(config) {
    this.config = config || {}
  }
  S.augment(ImagePlugin, {pluginRenderUI:function(editor) {
    var self = this;
    var prefixCls = editor.get("prefixCls");
    function showImageEditor(selectedEl) {
      DialogLoader.useDialog(editor, "image", self.config, selectedEl)
    }
    editor.addButton("image", {tooltip:"\u63d2\u5165\u56fe\u7247", listeners:{click:function() {
      showImageEditor(null)
    }}, mode:Editor.Mode.WYSIWYG_MODE});
    var handlers = [{content:"\u56fe\u7247\u5c5e\u6027", fn:function() {
      var img = checkImg(this.get("editorSelectedEl"));
      if(img) {
        this.hide();
        showImageEditor($(img))
      }
    }}, {content:"\u63d2\u5165\u65b0\u884c", fn:function() {
      this.hide();
      var doc = editor.get("document")[0], p = new Node(doc.createElement("p"));
      if(!UA.ie) {
        p._4eAppendBogus(undefined)
      }
      var r = new Editor.Range(doc);
      r.setStartAfter(this.get("editorSelectedEl"));
      r.select();
      editor.insertElement(p);
      r.moveToElementEditablePosition(p, 1);
      r.select()
    }}];
    var children = [];
    S.each(handlers, function(h) {
      children.push({content:h.content})
    });
    editor.addContextMenu("image", checkImg, {width:120, children:children, listeners:{click:function(e) {
      var self = this, content = e.target.get("content");
      S.each(handlers, function(h) {
        if(h.content === content) {
          h.fn.call(self)
        }
      })
    }}});
    editor.docReady(function() {
      editor.get("document").on("dblclick", function(ev) {
        ev.halt();
        var t = $(ev.target);
        if(checkImg(t)) {
          showImageEditor(t)
        }
      })
    });
    editor.addBubble("image", checkImg, {listeners:{afterRenderUI:function() {
      var bubble = this, el = bubble.get("contentEl");
      el.html(S.substitute(tipHTML, {prefixCls:prefixCls}));
      var tipUrlEl = el.one("." + prefixCls + "editor-bubble-url"), tipChangeEl = el.one("." + prefixCls + "editor-bubble-change"), tipRemoveEl = el.one("." + prefixCls + "editor-bubble-remove");
      Editor.Utils.preventFocus(el);
      tipChangeEl.on("click", function(ev) {
        showImageEditor(bubble.get("editorSelectedEl"));
        ev.halt()
      });
      tipRemoveEl.on("click", function(ev) {
        if(UA.webkit) {
          var r = editor.getSelection().getRanges();
          if(r && r[0]) {
            r[0].collapse();
            r[0].select()
          }
        }
        bubble.get("editorSelectedEl").remove();
        bubble.hide();
        editor.notifySelectionChange();
        ev.halt()
      });
      bubble.on("show", function() {
        var a = bubble.get("editorSelectedEl");
        if(a) {
          var src = a.attr("_ke_saved_src") || a.attr("src");
          tipUrlEl.attr("href", src)
        }
      })
    }}})
  }});
  return ImagePlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/bubble
*/

KISSY.add("editor/plugin/bubble", ["overlay", "editor"], function(S, require) {
  var Overlay = require("overlay");
  var Editor = require("editor");
  var logger = S.getLogger("s/editor");
  var BUBBLE_CFG = {zIndex:Editor.baseZIndex(Editor.ZIndexManager.BUBBLE_VIEW), elCls:"{prefixCls}editor-bubble", prefixCls:"{prefixCls}editor-", effect:{effect:"fade", duration:0.3}};
  function inRange(t, b, r) {
    return t <= r && b >= r
  }
  function overlap(b1, b2) {
    var b1Top = b1.get("y"), b1Bottom = b1Top + b1.get("el").outerHeight(), b2Top = b2.get("y"), b2Bottom = b2Top + b2.get("el").outerHeight();
    return inRange(b1Top, b1Bottom, b2Bottom) || inRange(b1Top, b1Bottom, b2Top)
  }
  function getTopPosition(self) {
    var archor = null, editor = self.get("editor"), myBubbles = editor.getControls();
    S.each(myBubbles, function(bubble) {
      if(bubble.isKeBubble && bubble !== self && bubble.get("visible") && overlap(self, bubble)) {
        if(!archor) {
          archor = bubble
        }else {
          if(archor.get("y") < bubble.get("y")) {
            archor = bubble
          }
        }
      }
    });
    return archor
  }
  function getXy(bubble) {
    var el = bubble.get("editorSelectedEl");
    if(!el) {
      return undefined
    }
    var editor = bubble.get("editor"), editorWin = editor.get("window"), iframeXY = editor.get("iframe").offset(), top = iframeXY.top, left = iframeXY.left, right = left + editorWin.width(), bottom = top + editorWin.height();
    var elXY = el.offset();
    elXY = Editor.Utils.getXY(elXY, editor);
    var elTop = elXY.top, elLeft = elXY.left, elRight = elLeft + el.width(), elBottom = elTop + el.height(), x, y;
    if(S.UA.ie && el[0].nodeName.toLowerCase() === "img" && elBottom > bottom) {
      return undefined
    }
    if(elBottom > bottom && elTop < bottom) {
      y = bottom - 30
    }else {
      if(elBottom > top && elBottom < bottom) {
        y = elBottom
      }
    }
    if(elRight > left && elLeft < left) {
      x = left
    }else {
      if(elLeft > left && elLeft < right) {
        x = elLeft
      }
    }
    if(x !== undefined && y !== undefined) {
      return[x, y]
    }
    return undefined
  }
  Editor.prototype.addBubble = function(id, filter, cfg) {
    var editor = this, prefixCls = editor.get("prefixCls"), bubble;
    cfg = cfg || {};
    cfg.editor = editor;
    S.mix(cfg, BUBBLE_CFG);
    cfg.elCls = S.substitute(cfg.elCls, {prefixCls:prefixCls});
    cfg.prefixCls = S.substitute(cfg.prefixCls, {prefixCls:prefixCls});
    bubble = new Overlay(cfg);
    bubble.isKeBubble = 1;
    editor.addControl(id + "/bubble", bubble);
    editor.on("selectionChange", function(ev) {
      var elementPath = ev.path, elements = elementPath.elements, a, lastElement;
      if(elementPath && elements) {
        lastElement = elementPath.lastElement;
        if(!lastElement) {
          return
        }
        a = filter(lastElement);
        if(a) {
          bubble.set("editorSelectedEl", a);
          bubble.hide();
          S.later(onShow, 10)
        }else {
          onHide()
        }
      }
    });
    function onHide() {
      bubble.hide();
      var editorWin = editor.get("window");
      if(editorWin) {
        editorWin.detach("scroll", onScroll);
        bufferScroll.stop()
      }
    }
    editor.on("sourceMode", onHide);
    function showImmediately() {
      var xy = getXy(bubble);
      if(xy) {
        bubble.move(xy[0], xy[1]);
        var archor = getTopPosition(bubble);
        if(archor) {
          xy[1] = archor.get("y") + archor.get("el").outerHeight();
          bubble.move(xy[0], xy[1])
        }
        if(!bubble.get("visible")) {
          bubble.show()
        }else {
          logger.debug("already show by selectionChange")
        }
      }
    }
    var bufferScroll = S.buffer(showImmediately, 350);
    function onScroll() {
      if(!bubble.get("editorSelectedEl")) {
        return
      }
      bubble.hide();
      bufferScroll()
    }
    function onShow() {
      var editorWin = editor.get("window");
      editorWin.on("scroll", onScroll);
      showImmediately()
    }
  }
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/contextmenu
*/

KISSY.add("editor/plugin/contextmenu", ["editor", "menu", "./focus-fix", "event"], function(S, require) {
  var Editor = require("editor");
  var Menu = require("menu");
  var focusFix = require("./focus-fix");
  var Event = require("event");
  Editor.prototype.addContextMenu = function(id, filter, cfg) {
    var self = this;
    cfg = cfg || {};
    var event = cfg.event;
    if(event) {
      delete cfg.event
    }
    cfg.prefixCls = self.get("prefixCls") + "editor-";
    cfg.editor = self;
    cfg.focusable = 1;
    cfg.zIndex = Editor.baseZIndex(Editor.ZIndexManager.POPUP_MENU);
    var menu = new Menu.PopupMenu(cfg);
    focusFix.init(menu);
    menu.on("afterRenderUI", function() {
      menu.get("el").on("keydown", function(e) {
        if(e.keyCode === Event.KeyCode.ESC) {
          menu.hide()
        }
      })
    });
    self.docReady(function() {
      var doc = self.get("document");
      doc.on("mousedown", function(e) {
        if(e.which === 1) {
          menu.hide()
        }
      });
      doc.delegate("contextmenu", filter, function(ev) {
        ev.halt();
        showNow(ev)
      })
    });
    function showNow(ev) {
      var t = S.all(ev.target);
      var x = ev.pageX, y = ev.pageY;
      if(!x) {
        return
      }else {
        var translate = Editor.Utils.getXY({left:x, top:y}, self);
        x = translate.left;
        y = translate.top
      }
      setTimeout(function() {
        menu.set("editorSelectedEl", t, {silent:1});
        menu.move(x, y);
        self.fire("contextmenu", {contextmenu:menu});
        menu.show();
        window.focus();
        document.body.focus();
        menu.focus()
      }, 30)
    }
    if(event) {
      showNow(event)
    }
    self.addControl(id + "/contextmenu", menu);
    return menu
  }
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/focus-fix
*/

KISSY.add("editor/plugin/focus-fix", ["editor"], function(S, require) {
  var Editor = require("editor");
  var UA = S.UA, focusManager = Editor.focusManager;
  function _show4FocusExt() {
    var self = this;
    self._focusEditor = focusManager.currentInstance();
    var editor = self._focusEditor;
    if(UA.ie && editor) {
      window.focus();
      document.body.focus();
      var $selection = editor.get("document")[0].selection, $range;
      try {
        $range = $selection.createRange()
      }catch(e) {
        $range = 0
      }
      if($range) {
        if($range.item && $range.item(0).ownerDocument === editor.get("document")[0]) {
          var $myRange = document.body.createTextRange();
          $myRange.moveToElementText(self.get("el").first()[0]);
          $myRange.collapse(true);
          $myRange.select()
        }
      }
    }
  }
  function _hide4FocusExt() {
    var self = this, editor = self._focusEditor;
    if(editor) {
      editor.focus()
    }
  }
  return{init:function(self) {
    self.on("beforeVisibleChange", function(e) {
      if(e.newVal) {
        _show4FocusExt.call(self)
      }
    });
    self.on("hide", function() {
      _hide4FocusExt.call(self)
    })
  }}
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:16
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event
*/

KISSY.add("event", ["event/dom", "event/custom"], function(S, require) {
  var DomEvent = require("event/dom");
  var CustomEvent = require("event/custom");
  var Event = S.Event = S.merge(DomEvent, {DomEvent:DomEvent, CustomEvent:CustomEvent});
  Event.global = CustomEvent.global;
  S.EventTarget = Event.Target = CustomEvent.Target;
  return Event
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/link
*/

KISSY.add("editor/plugin/link", ["./button", "./bubble", "editor", "./link/utils", "./dialog-loader"], function(S, require) {
  require("./button");
  require("./bubble");
  var Editor = require("editor");
  var Utils = require("./link/utils");
  var DialogLoader = require("./dialog-loader");
  var $ = S.all, tipHTML = "<a " + 'href="" ' + ' target="_blank" ' + 'class="{prefixCls}editor-bubble-url">' + "\u5728\u65b0\u7a97\u53e3\u67e5\u770b" + "</a>  \u2013  " + " <span " + 'class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-change">' + "\u7f16\u8f91" + "</span>   |   " + " <span " + 'class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-remove">' + "\u53bb\u9664" + "</span>";
  function checkLink(lastElement) {
    lastElement = $(lastElement);
    return lastElement.closest("a", undefined)
  }
  function LinkPlugin(config) {
    this.config = config || {}
  }
  S.augment(LinkPlugin, {pluginRenderUI:function(editor) {
    var prefixCls = editor.get("prefixCls");
    editor.addButton("link", {tooltip:"\u63d2\u5165\u94fe\u63a5", listeners:{click:function() {
      showLinkEditDialog()
    }}, mode:Editor.Mode.WYSIWYG_MODE});
    var self = this;
    function showLinkEditDialog(selectedEl) {
      DialogLoader.useDialog(editor, "link", self.config, selectedEl)
    }
    editor.addBubble("link", checkLink, {listeners:{afterRenderUI:function() {
      var bubble = this, el = bubble.get("contentEl");
      el.html(S.substitute(tipHTML, {prefixCls:prefixCls}));
      var tipUrl = el.one("." + prefixCls + "editor-bubble-url"), tipChange = el.one("." + prefixCls + "editor-bubble-change"), tipRemove = el.one("." + prefixCls + "editor-bubble-remove");
      Editor.Utils.preventFocus(el);
      tipChange.on("click", function(ev) {
        showLinkEditDialog(bubble.get("editorSelectedEl"));
        ev.halt()
      });
      tipRemove.on("click", function(ev) {
        Utils.removeLink(editor, bubble.get("editorSelectedEl"));
        ev.halt()
      });
      bubble.on("show", function() {
        var a = bubble.get("editorSelectedEl");
        if(!a) {
          return
        }
        var href = a.attr(Utils.savedHref) || a.attr("href");
        tipUrl.html(href);
        tipUrl.attr("href", href)
      })
    }}})
  }});
  return LinkPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:49
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/link/utils
*/

KISSY.add("editor/plugin/link/utils", ["editor"], function(S, require) {
  var Editor = require("editor");
  var Node = S.Node, KEStyle = Editor.Style, savedHref = "_ke_saved_href", linkStyle = {element:"a", attributes:{href:"#(href)", title:"#(title)", _ke_saved_href:"#(_ke_saved_href)", target:"#(target)"}};
  function getAttributes(el) {
    var attributes = el.attributes, re = {};
    for(var i = 0;i < attributes.length;i++) {
      var a = attributes[i];
      if(a.specified) {
        re[a.name] = a.value
      }
    }
    if(el.style.cssText) {
      re.style = el.style.cssText
    }
    return re
  }
  function removeLink(editor, a) {
    editor.execCommand("save");
    var sel = editor.getSelection(), range = sel.getRanges()[0];
    if(range && range.collapsed) {
      var bs = sel.createBookmarks();
      a._4eRemove(true);
      sel.selectBookmarks(bs)
    }else {
      if(range) {
        var attrs = getAttributes(a[0]);
        (new KEStyle(linkStyle, attrs)).remove(editor.get("document")[0])
      }
    }
    editor.execCommand("save");
    editor.notifySelectionChange()
  }
  function applyLink(editor, attr, _selectedEl) {
    attr[savedHref] = attr.href;
    if(_selectedEl) {
      editor.execCommand("save");
      _selectedEl.attr(attr)
    }else {
      var sel = editor.getSelection(), range = sel && sel.getRanges()[0];
      if(!range || range.collapsed) {
        var a = new Node("<a>" + attr.href + "</a>", attr, editor.get("document")[0]);
        editor.insertElement(a)
      }else {
        editor.execCommand("save");
        var linkStyleObj = new KEStyle(linkStyle, attr);
        linkStyleObj.apply(editor.get("document")[0])
      }
    }
    editor.execCommand("save");
    editor.notifySelectionChange()
  }
  return{removeLink:removeLink, applyLink:applyLink, savedHref:savedHref}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:47
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/fore-color
*/

KISSY.add("editor/plugin/fore-color", ["./color/btn", "./fore-color/cmd"], function(S, require) {
  var Button = require("./color/btn");
  var cmd = require("./fore-color/cmd");
  function ForeColorPlugin(config) {
    this.config = config || {}
  }
  S.augment(ForeColorPlugin, {pluginRenderUI:function(editor) {
    cmd.init(editor);
    Button.init(editor, {cmdType:"foreColor", defaultColor:"rgb(204, 0, 0)", tooltip:"\u6587\u672c\u989c\u8272"})
  }});
  return ForeColorPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:45
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/color/btn
*/

KISSY.add("editor/plugin/color/btn", ["editor", "../button", "../overlay", "../dialog-loader"], function(S, require) {
  var Editor = require("editor");
  var Button = require("../button");
  var Overlay4E = require("../overlay");
  var DialogLoader = require("../dialog-loader");
  var Node = S.Node;
  var COLORS = [["000", "444", "666", "999", "CCC", "EEE", "F3F3F3", "FFF"], ["F00", "F90", "FF0", "0F0", "0FF", "00F", "90F", "F0F"], ["F4CC" + "CC", "FCE5CD", "FFF2CC", "D9EAD3", "D0E0E3", "CFE2F3", "D9D2E9", "EAD1DC", "EA9999", "F9CB9C", "FFE599", "B6D7A8", "A2C4C9", "9FC5E8", "B4A7D6", "D5A6BD", "E06666", "F6B26B", "FFD966", "93C47D", "76A5AF", "6FA8DC", "8E7CC3", "C27BAD", "CC0000", "E69138", "F1C232", "6AA84F", "45818E", "3D85C6", "674EA7", "A64D79", "990000", "B45F06", "BF9000", "38761D", 
  "134F5C", "0B5394", "351C75", "741B47", "660000", "783F04", "7F6000", "274E13", "0C343D", "073763", "20124D", "4C1130"]], html;
  function initHTML() {
    html = '<div class="{prefixCls}editor-color-panel">' + '<a class="{prefixCls}editor-color-remove" ' + "href=\"javascript:void('\u6e05\u9664');\">" + "\u6e05\u9664" + "</a>";
    for(var i = 0;i < 3;i++) {
      html += '<div class="{prefixCls}editor-color-palette"><table>';
      var c = COLORS[i], l = c.length / 8;
      for(var k = 0;k < l;k++) {
        html += "<tr>";
        for(var j = 0;j < 8;j++) {
          var currentColor = "#" + c[8 * k + j];
          html += "<td>";
          html += '<a href="javascript:void(0);" ' + 'class="{prefixCls}editor-color-a" ' + 'style="background-color:' + currentColor + '"' + "></a>";
          html += "</td>"
        }
        html += "</tr>"
      }
      html += "</table></div>"
    }
    html += "" + "<div>" + '<a class="{prefixCls}editor-button {prefixCls}editor-color-others ks-inline-block">\u5176\u4ed6\u989c\u8272</a>' + "</div>" + "</div>"
  }
  initHTML();
  var ColorButton = Button.extend({initializer:function() {
    var self = this;
    self.on("blur", function() {
      setTimeout(function() {
        if(self.colorWin) {
          self.colorWin.hide()
        }
      }, 150)
    });
    self.on("click", function() {
      var checked = self.get("checked");
      if(checked) {
        self._prepare()
      }else {
        if(self.colorWin) {
          self.colorWin.hide()
        }
      }
    })
  }, _prepare:function() {
    var self = this, editor = self.get("editor"), prefixCls = editor.get("prefixCls"), colorPanel;
    self.colorWin = (new Overlay4E({elAttrs:{tabindex:0}, elCls:prefixCls + "editor-popup", content:S.substitute(html, {prefixCls:prefixCls}), width:172, zIndex:Editor.baseZIndex(Editor.ZIndexManager.POPUP_MENU)})).render();
    var colorWin = self.colorWin;
    colorPanel = colorWin.get("contentEl");
    colorPanel.on("click", self._selectColor, self);
    colorWin.on("hide", function() {
      self.set("checked", false)
    });
    var others = colorPanel.one("." + prefixCls + "editor-color-others");
    others.on("click", function(ev) {
      ev.halt();
      colorWin.hide();
      DialogLoader.useDialog(editor, "color", undefined, self)
    });
    self._prepare = self._show;
    self._show()
  }, _show:function() {
    var self = this, el = self.get("el"), colorWin = self.colorWin;
    colorWin.set("align", {node:el, points:["bl", "tl"], offset:[0, 2], overflow:{adjustX:1, adjustY:1}});
    colorWin.show()
  }, _selectColor:function(ev) {
    ev.halt();
    var self = this, editor = self.get("editor"), prefixCls = editor.get("prefixCls"), t = new Node(ev.target);
    if(t.hasClass(prefixCls + "editor-color-a")) {
      self.fire("selectColor", {color:t.style("background-color")})
    }else {
      if(t.hasClass(prefixCls + "editor-color-remove")) {
        self.fire("selectColor", {color:null})
      }
    }
  }, destructor:function() {
    var self = this;
    if(self.colorWin) {
      self.colorWin.destroy()
    }
  }}, {ATTRS:{checkable:{value:true}, mode:{value:Editor.Mode.WYSIWYG_MODE}}});
  var tpl = '<div class="{icon}"></div>' + '<div style="background-color:{defaultColor}"' + ' class="{indicator}"></div>';
  function runCmd(editor, cmdType, color) {
    setTimeout(function() {
      editor.execCommand(cmdType, color)
    }, 0)
  }
  ColorButton.init = function(editor, cfg) {
    var prefix = editor.get("prefixCls") + "editor-toolbar-", cmdType = cfg.cmdType, defaultColor = cfg.defaultColor, tooltip = cfg.tooltip;
    var button = editor.addButton(cmdType, {elCls:cmdType + "Btn", content:S.substitute(tpl, {defaultColor:defaultColor, icon:prefix + "item " + prefix + cmdType, indicator:prefix + "color-indicator"}), mode:Editor.Mode.WYSIWYG_MODE, tooltip:"\u8bbe\u7f6e" + tooltip});
    var arrow = editor.addButton(cmdType + "Arrow", {tooltip:"\u9009\u62e9\u5e76\u8bbe\u7f6e" + tooltip, elCls:cmdType + "ArrowBtn"}, ColorButton);
    var indicator = button.get("el").one("." + prefix + "color-indicator");
    arrow.on("selectColor", function(e) {
      indicator.css("background-color", e.color || defaultColor);
      runCmd(editor, cmdType, e.color)
    });
    button.on("click", function() {
      runCmd(editor, cmdType, indicator.style("background-color"))
    })
  };
  return ColorButton
});


/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 9 22:41
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 io/form-serializer
 io/base
 io/xhr-transport-base
 io/xdr-flash-transport
 io/sub-domain-transport
 io/xhr-transport
 io/script-transport
 io/jsonp
 io/form
 io/iframe-transport
 io/methods
 io
*/

KISSY.add("io/form-serializer", ["dom"], function(S, require) {
  var Dom = require("dom");
  var rselectTextarea = /^(?:select|textarea)/i, rCRLF = /\r?\n/g, FormSerializer, rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
  function normalizeCRLF(v) {
    return v.replace(rCRLF, "\r\n")
  }
  FormSerializer = {serialize:function(forms, serializeArray) {
    return S.param(FormSerializer.getFormData(forms), undefined, undefined, serializeArray || false)
  }, getFormData:function(forms) {
    var elements = [], data = {};
    S.each(Dom.query(forms), function(el) {
      var subs = el.elements ? S.makeArray(el.elements) : [el];
      elements.push.apply(elements, subs)
    });
    elements = S.filter(elements, function(el) {
      return el.name && !el.disabled && (el.checked || rselectTextarea.test(el.nodeName) || rinput.test(el.type))
    });
    S.each(elements, function(el) {
      var val = Dom.val(el), vs;
      if(val === null) {
        return
      }
      if(S.isArray(val)) {
        val = S.map(val, normalizeCRLF)
      }else {
        val = normalizeCRLF(val)
      }
      vs = data[el.name];
      if(!vs) {
        data[el.name] = val;
        return
      }
      if(vs && !S.isArray(vs)) {
        vs = data[el.name] = [vs]
      }
      vs.push.apply(vs, S.makeArray(val))
    });
    return data
  }};
  return FormSerializer
});
KISSY.add("io/base", ["event/custom", "promise"], function(S, require) {
  var CustomEvent = require("event/custom"), Promise = require("promise");
  var rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget)$/, rspace = /\s+/, mirror = function(s) {
    return s
  }, rnoContent = /^(?:GET|HEAD)$/, win = S.Env.host, location = win.location || {}, simulatedLocation = new S.Uri(location.href), isLocal = simulatedLocation && rlocalProtocol.test(simulatedLocation.getScheme()), transports = {}, defaultConfig = {type:"GET", contentType:"application/x-www-form-urlencoded; charset=UTF-8", async:true, serializeArray:true, processData:true, accepts:{xml:"application/xml, text/xml", html:"text/html", text:"text/plain", json:"application/json, text/javascript", "*":"*/*"}, 
  converters:{text:{json:S.parseJson, html:mirror, text:mirror, xml:S.parseXML}}, headers:{"X-Requested-With":"XMLHttpRequest"}, contents:{xml:/xml/, html:/html/, json:/json/}};
  defaultConfig.converters.html = defaultConfig.converters.text;
  function setUpConfig(c) {
    var context = c.context;
    delete c.context;
    c = S.mix(S.clone(defaultConfig), c, {deep:true});
    c.context = context || c;
    var data, uri, type = c.type, dataType = c.dataType;
    uri = c.uri = simulatedLocation.resolve(c.url);
    c.uri.setQuery("");
    if(!("crossDomain" in c)) {
      c.crossDomain = !c.uri.isSameOriginAs(simulatedLocation)
    }
    type = c.type = type.toUpperCase();
    c.hasContent = !rnoContent.test(type);
    if(c.processData && (data = c.data) && typeof data !== "string") {
      c.data = S.param(data, undefined, undefined, c.serializeArray)
    }
    dataType = c.dataType = S.trim(dataType || "*").split(rspace);
    if(!("cache" in c) && S.inArray(dataType[0], ["script", "jsonp"])) {
      c.cache = false
    }
    if(!c.hasContent) {
      if(c.data) {
        uri.query.add(S.unparam(c.data))
      }
      if(c.cache === false) {
        uri.query.set("_ksTS", S.now() + "_" + S.guid())
      }
    }
    return c
  }
  function IO(c) {
    var self = this;
    if(!(self instanceof IO)) {
      return new IO(c)
    }
    Promise.call(self);
    c = setUpConfig(c);
    S.mix(self, {responseData:null, config:c || {}, timeoutTimer:null, responseText:null, responseXML:null, responseHeadersString:"", responseHeaders:null, requestHeaders:{}, readyState:0, state:0, statusText:null, status:0, transport:null});
    Promise.Defer(self);
    var TransportConstructor, transport;
    IO.fire("start", {ajaxConfig:c, io:self});
    TransportConstructor = transports[c.dataType[0]] || transports["*"];
    transport = new TransportConstructor(self);
    self.transport = transport;
    if(c.contentType) {
      self.setRequestHeader("Content-Type", c.contentType)
    }
    var dataType = c.dataType[0], i, timeout = c.timeout, context = c.context, headers = c.headers, accepts = c.accepts;
    self.setRequestHeader("Accept", dataType && accepts[dataType] ? accepts[dataType] + (dataType === "*" ? "" : ", */*; q=0.01") : accepts["*"]);
    for(i in headers) {
      self.setRequestHeader(i, headers[i])
    }
    if(c.beforeSend && c.beforeSend.call(context, self, c) === false) {
      return self
    }
    self.readyState = 1;
    IO.fire("send", {ajaxConfig:c, io:self});
    if(c.async && timeout > 0) {
      self.timeoutTimer = setTimeout(function() {
        self.abort("timeout")
      }, timeout * 1E3)
    }
    try {
      self.state = 1;
      transport.send()
    }catch(e) {
      if(self.state < 2) {
        S.log(e.stack || e, "error");
        setTimeout(function() {
          throw e;
        }, 0);
        self._ioReady(-1, e.message)
      }else {
        S.error(e)
      }
    }
    return self
  }
  S.mix(IO, CustomEvent.Target);
  S.mix(IO, {isLocal:isLocal, setupConfig:function(setting) {
    S.mix(defaultConfig, setting, {deep:true})
  }, setupTransport:function(name, fn) {
    transports[name] = fn
  }, getTransport:function(name) {
    return transports[name]
  }, getConfig:function() {
    return defaultConfig
  }});
  return IO
});
KISSY.add("io/xhr-transport-base", ["./base"], function(S, require) {
  var IO = require("./base");
  var logger = S.getLogger("s/io");
  var OK_CODE = 200, win = S.Env.host, XDomainRequest_ = S.UA.ieMode > 7 && win.XDomainRequest, NO_CONTENT_CODE = 204, NOT_FOUND_CODE = 404, NO_CONTENT_CODE2 = 1223, XhrTransportBase = {proto:{}}, lastModifiedCached = {}, eTagCached = {};
  IO.__lastModifiedCached = lastModifiedCached;
  IO.__eTagCached = eTagCached;
  function createStandardXHR(_, refWin) {
    try {
      return new (refWin || win).XMLHttpRequest
    }catch(e) {
    }
    return undefined
  }
  function createActiveXHR(_, refWin) {
    try {
      return new (refWin || win).ActiveXObject("Microsoft.XMLHTTP")
    }catch(e) {
    }
    return undefined
  }
  XhrTransportBase.nativeXhr = win.ActiveXObject ? function(crossDomain, refWin) {
    if(!supportCORS && crossDomain && XDomainRequest_) {
      return new XDomainRequest_
    }
    return!IO.isLocal && createStandardXHR(crossDomain, refWin) || createActiveXHR(crossDomain, refWin)
  } : createStandardXHR;
  XhrTransportBase.XDomainRequest_ = XDomainRequest_;
  var supportCORS = XhrTransportBase.supportCORS = "withCredentials" in XhrTransportBase.nativeXhr();
  function isInstanceOfXDomainRequest(xhr) {
    return XDomainRequest_ && xhr instanceof XDomainRequest_
  }
  function getIfModifiedKey(c) {
    var ifModified = c.ifModified, ifModifiedKey;
    if(ifModified) {
      ifModifiedKey = c.uri;
      if(c.cache === false) {
        ifModifiedKey = ifModifiedKey.clone();
        ifModifiedKey.query.remove("_ksTS")
      }
      ifModifiedKey = ifModifiedKey.toString()
    }
    return ifModifiedKey
  }
  S.mix(XhrTransportBase.proto, {sendInternal:function() {
    var self = this, io = self.io, c = io.config, nativeXhr = self.nativeXhr, files = c.files, type = files ? "post" : c.type, async = c.async, username, mimeType = io.mimeType, requestHeaders = io.requestHeaders || {}, url = io._getUrlForSend(), xhrFields, ifModifiedKey = getIfModifiedKey(c), cacheValue, i;
    if(ifModifiedKey) {
      if(cacheValue = lastModifiedCached[ifModifiedKey]) {
        requestHeaders["If-Modified-Since"] = cacheValue
      }
      if(cacheValue = eTagCached[ifModifiedKey]) {
        requestHeaders["If-None-Match"] = cacheValue
      }
    }
    if(username = c.username) {
      nativeXhr.open(type, url, async, username, c.password)
    }else {
      nativeXhr.open(type, url, async)
    }
    xhrFields = c.xhrFields || {};
    if("withCredentials" in xhrFields) {
      if(!supportCORS) {
        delete xhrFields.withCredentials
      }
    }
    for(i in xhrFields) {
      try {
        nativeXhr[i] = xhrFields[i]
      }catch(e) {
        logger.error(e)
      }
    }
    if(mimeType && nativeXhr.overrideMimeType) {
      nativeXhr.overrideMimeType(mimeType)
    }
    var xRequestHeader = requestHeaders["X-Requested-With"];
    if(xRequestHeader === false) {
      delete requestHeaders["X-Requested-With"]
    }
    if(typeof nativeXhr.setRequestHeader !== "undefined") {
      for(i in requestHeaders) {
        nativeXhr.setRequestHeader(i, requestHeaders[i])
      }
    }
    var sendContent = c.hasContent && c.data || null;
    if(files) {
      var originalSentContent = sendContent, data = {};
      if(originalSentContent) {
        data = S.unparam(originalSentContent)
      }
      data = S.mix(data, files);
      sendContent = new FormData;
      S.each(data, function(vs, k) {
        if(S.isArray(vs)) {
          S.each(vs, function(v) {
            sendContent.append(k + (c.serializeArray ? "[]" : ""), v)
          })
        }else {
          sendContent.append(k, vs)
        }
      })
    }
    nativeXhr.send(sendContent);
    if(!async || nativeXhr.readyState === 4) {
      self._callback()
    }else {
      if(isInstanceOfXDomainRequest(nativeXhr)) {
        nativeXhr.onload = function() {
          nativeXhr.readyState = 4;
          nativeXhr.status = 200;
          self._callback()
        };
        nativeXhr.onerror = function() {
          nativeXhr.readyState = 4;
          nativeXhr.status = 500;
          self._callback()
        }
      }else {
        nativeXhr.onreadystatechange = function() {
          self._callback()
        }
      }
    }
  }, abort:function() {
    this._callback(0, 1)
  }, _callback:function(event, abort) {
    var self = this, nativeXhr = self.nativeXhr, io = self.io, ifModifiedKey, lastModified, eTag, statusText, xml, c = io.config;
    try {
      if(abort || nativeXhr.readyState === 4) {
        if(isInstanceOfXDomainRequest(nativeXhr)) {
          nativeXhr.onerror = S.noop;
          nativeXhr.onload = S.noop
        }else {
          nativeXhr.onreadystatechange = S.noop
        }
        if(abort) {
          if(nativeXhr.readyState !== 4) {
            nativeXhr.abort()
          }
        }else {
          ifModifiedKey = getIfModifiedKey(c);
          var status = nativeXhr.status;
          if(!isInstanceOfXDomainRequest(nativeXhr)) {
            io.responseHeadersString = nativeXhr.getAllResponseHeaders()
          }
          if(ifModifiedKey) {
            lastModified = nativeXhr.getResponseHeader("Last-Modified");
            eTag = nativeXhr.getResponseHeader("ETag");
            if(lastModified) {
              lastModifiedCached[ifModifiedKey] = lastModified
            }
            if(eTag) {
              eTagCached[eTag] = eTag
            }
          }
          xml = nativeXhr.responseXML;
          if(xml && xml.documentElement) {
            io.responseXML = xml
          }
          var text = io.responseText = nativeXhr.responseText;
          if(c.files && text) {
            var bodyIndex, lastBodyIndex;
            if((bodyIndex = text.indexOf("<body>")) !== -1) {
              lastBodyIndex = text.lastIndexOf("</body>");
              if(lastBodyIndex === -1) {
                lastBodyIndex = text.length
              }
              text = text.slice(bodyIndex + 6, lastBodyIndex)
            }
            io.responseText = S.unEscapeHtml(text)
          }
          try {
            statusText = nativeXhr.statusText
          }catch(e) {
            logger.error("xhr statusText error: ");
            logger.error(e);
            statusText = ""
          }
          if(!status && IO.isLocal && !c.crossDomain) {
            status = io.responseText ? OK_CODE : NOT_FOUND_CODE
          }else {
            if(status === NO_CONTENT_CODE2) {
              status = NO_CONTENT_CODE
            }
          }
          io._ioReady(status, statusText)
        }
      }
    }catch(e) {
      S.log(e.stack || e, "error");
      setTimeout(function() {
        throw e;
      }, 0);
      nativeXhr.onreadystatechange = S.noop;
      if(!abort) {
        io._ioReady(-1, e)
      }
    }
  }});
  return XhrTransportBase
});
KISSY.add("io/xdr-flash-transport", ["./base", "dom"], function(S, require) {
  var IO = require("./base"), Dom = require("dom");
  var logger = S.getLogger("s/io");
  var maps = {}, ID = "io_swf", flash, doc = S.Env.host.document, init = false;
  function _swf(uri, _, uid) {
    if(init) {
      return
    }
    init = true;
    var o = '<object id="' + ID + '" type="application/x-shockwave-flash" data="' + uri + '" width="0" height="0">' + '<param name="movie" value="' + uri + '" />' + '<param name="FlashVars" value="yid=' + _ + "&uid=" + uid + '&host=KISSY.IO" />' + '<param name="allowScriptAccess" value="always" />' + "</object>", c = doc.createElement("div");
    Dom.prepend(c, doc.body || doc.documentElement);
    c.innerHTML = o
  }
  function XdrFlashTransport(io) {
    logger.info("use XdrFlashTransport for: " + io.config.url);
    this.io = io
  }
  S.augment(XdrFlashTransport, {send:function() {
    var self = this, io = self.io, c = io.config, xdr = c.xdr || {};
    _swf(xdr.src || S.Config.base + "io/assets/io.swf", 1, 1);
    if(!flash) {
      setTimeout(function() {
        self.send()
      }, 200);
      return
    }
    self._uid = S.guid();
    maps[self._uid] = self;
    flash.send(io._getUrlForSend(), {id:self._uid, uid:self._uid, method:c.type, data:c.hasContent && c.data || {}})
  }, abort:function() {
    flash.abort(this._uid)
  }, _xdrResponse:function(e, o) {
    var self = this, ret, id = o.id, responseText, c = o.c, io = self.io;
    if(c && (responseText = c.responseText)) {
      io.responseText = decodeURI(responseText)
    }
    switch(e) {
      case "success":
        ret = {status:200, statusText:"success"};
        delete maps[id];
        break;
      case "abort":
        delete maps[id];
        break;
      case "timeout":
      ;
      case "transport error":
      ;
      case "failure":
        delete maps[id];
        ret = {status:"status" in c ? c.status : 500, statusText:c.statusText || e};
        break
    }
    if(ret) {
      io._ioReady(ret.status, ret.statusText)
    }
  }});
  IO.applyTo = function(_, cmd, args) {
    var cmds = cmd.split(".").slice(1), func = IO;
    S.each(cmds, function(c) {
      func = func[c]
    });
    func.apply(null, args)
  };
  IO.xdrReady = function() {
    flash = doc.getElementById(ID)
  };
  IO.xdrResponse = function(e, o) {
    var xhr = maps[o.uid];
    if(xhr) {
      xhr._xdrResponse(e, o)
    }
  };
  return XdrFlashTransport
});
KISSY.add("io/sub-domain-transport", ["event/dom", "dom", "./xhr-transport-base"], function(S, require) {
  var Event = require("event/dom"), Dom = require("dom"), XhrTransportBase = require("./xhr-transport-base");
  var logger = S.getLogger("s/io");
  var PROXY_PAGE = "/sub_domain_proxy.html", doc = S.Env.host.document, iframeMap = {};
  function SubDomainTransport(io) {
    var self = this, c = io.config;
    self.io = io;
    c.crossDomain = false;
    logger.info("use SubDomainTransport for: " + c.url)
  }
  S.augment(SubDomainTransport, XhrTransportBase.proto, {send:function() {
    var self = this, c = self.io.config, uri = c.uri, hostname = uri.getHostname(), iframe, iframeUri, iframeDesc = iframeMap[hostname];
    var proxy = PROXY_PAGE;
    if(c.xdr && c.xdr.subDomain && c.xdr.subDomain.proxy) {
      proxy = c.xdr.subDomain.proxy
    }
    if(iframeDesc && iframeDesc.ready) {
      self.nativeXhr = XhrTransportBase.nativeXhr(0, iframeDesc.iframe.contentWindow);
      if(self.nativeXhr) {
        self.sendInternal()
      }else {
        S.error("document.domain not set correctly!")
      }
      return
    }
    if(!iframeDesc) {
      iframeDesc = iframeMap[hostname] = {};
      iframe = iframeDesc.iframe = doc.createElement("iframe");
      Dom.css(iframe, {position:"absolute", left:"-9999px", top:"-9999px"});
      Dom.prepend(iframe, doc.body || doc.documentElement);
      iframeUri = new S.Uri;
      iframeUri.setScheme(uri.getScheme());
      iframeUri.setPort(uri.getPort());
      iframeUri.setHostname(hostname);
      iframeUri.setPath(proxy);
      iframe.src = iframeUri.toString()
    }else {
      iframe = iframeDesc.iframe
    }
    Event.on(iframe, "load", _onLoad, self)
  }});
  function _onLoad() {
    var self = this, c = self.io.config, uri = c.uri, hostname = uri.getHostname(), iframeDesc = iframeMap[hostname];
    iframeDesc.ready = 1;
    Event.detach(iframeDesc.iframe, "load", _onLoad, self);
    self.send()
  }
  return SubDomainTransport
});
KISSY.add("io/xhr-transport", ["./base", "./xhr-transport-base", "./xdr-flash-transport", "./sub-domain-transport"], function(S, require) {
  var IO = require("./base"), XhrTransportBase = require("./xhr-transport-base"), XdrFlashTransport = require("./xdr-flash-transport"), SubDomainTransport = require("./sub-domain-transport");
  var logger = S.getLogger("s/io");
  var win = S.Env.host, doc = win.document, XDomainRequest_ = XhrTransportBase.XDomainRequest_;
  function isSubDomain(hostname) {
    return doc.domain && S.endsWith(hostname, doc.domain)
  }
  function XhrTransport(io) {
    var c = io.config, crossDomain = c.crossDomain, self = this, xhr, xdrCfg = c.xdr || {}, subDomain = xdrCfg.subDomain = xdrCfg.subDomain || {};
    self.io = io;
    if(crossDomain && !XhrTransportBase.supportCORS) {
      if(isSubDomain(c.uri.getHostname())) {
        if(subDomain.proxy !== false) {
          return new SubDomainTransport(io)
        }
      }
      if(String(xdrCfg.use) === "flash" || !XDomainRequest_) {
        return new XdrFlashTransport(io)
      }
    }
    xhr = self.nativeXhr = XhrTransportBase.nativeXhr(crossDomain);
    var msg = "crossDomain: " + crossDomain + ", use " + (XDomainRequest_ && xhr instanceof XDomainRequest_ ? "XDomainRequest" : "XhrTransport") + " for: " + c.url;
    logger.debug(msg);
    return self
  }
  S.augment(XhrTransport, XhrTransportBase.proto, {send:function() {
    this.sendInternal()
  }});
  IO.setupTransport("*", XhrTransport);
  return IO
});
KISSY.add("io/script-transport", ["./base"], function(S, require) {
  var IO = require("./base");
  var logger = S.getLogger("s/io");
  var OK_CODE = 200, ERROR_CODE = 500;
  IO.setupConfig({accepts:{script:"text/javascript, " + "application/javascript, " + "application/ecmascript, " + "application/x-ecmascript"}, contents:{script:/javascript|ecmascript/}, converters:{text:{script:function(text) {
    S.globalEval(text);
    return text
  }}}});
  function ScriptTransport(io) {
    var config = io.config, self = this;
    if(!config.crossDomain) {
      return new (IO.getTransport("*"))(io)
    }
    self.io = io;
    logger.info("use ScriptTransport for: " + config.url);
    return self
  }
  S.augment(ScriptTransport, {send:function() {
    var self = this, io = self.io, c = io.config;
    self.script = S.getScript(io._getUrlForSend(), {charset:c.scriptCharset, success:function() {
      self._callback("success")
    }, error:function() {
      self._callback("error")
    }})
  }, _callback:function(event, abort) {
    var self = this, script = self.script, io = self.io;
    if(!script) {
      return
    }
    self.script = undefined;
    if(abort) {
      return
    }
    if(event !== "error") {
      io._ioReady(OK_CODE, "success")
    }else {
      if(event === "error") {
        io._ioReady(ERROR_CODE, "script error")
      }
    }
  }, abort:function() {
    this._callback(0, 1)
  }});
  IO.setupTransport("script", ScriptTransport);
  return IO
});
KISSY.add("io/jsonp", ["./base"], function(S, require) {
  var IO = require("./base");
  var win = S.Env.host;
  IO.setupConfig({jsonp:"callback", jsonpCallback:function() {
    return S.guid("jsonp")
  }});
  IO.on("start", function(e) {
    var io = e.io, c = io.config, dataType = c.dataType;
    if(dataType[0] === "jsonp") {
      delete c.contentType;
      var response, cJsonpCallback = c.jsonpCallback, converters, jsonpCallback = typeof cJsonpCallback === "function" ? cJsonpCallback() : cJsonpCallback, previous = win[jsonpCallback];
      c.uri.query.set(c.jsonp, jsonpCallback);
      win[jsonpCallback] = function(r) {
        if(arguments.length > 1) {
          r = S.makeArray(arguments)
        }
        response = [r]
      };
      io.fin(function() {
        win[jsonpCallback] = previous;
        if(previous === undefined) {
          try {
            delete win[jsonpCallback]
          }catch(e) {
          }
        }else {
          if(response) {
            previous(response[0])
          }
        }
      });
      converters = c.converters;
      converters.script = converters.script || {};
      converters.script.json = function() {
        if(!response) {
          S.error(" not call jsonpCallback: " + jsonpCallback)
        }
        return response[0]
      };
      dataType.length = 2;
      dataType[0] = "script";
      dataType[1] = "json"
    }
  });
  return IO
});
KISSY.add("io/form", ["./base", "dom", "./form-serializer"], function(S, require) {
  var IO = require("./base");
  var Dom = require("dom");
  var FormSerializer = require("./form-serializer");
  var win = S.Env.host, slice = Array.prototype.slice, FormData = win.FormData;
  IO.on("start", function(e) {
    var io = e.io, form, d, dataType, formParam, data, c = io.config, tmpForm = c.form;
    if(tmpForm) {
      form = Dom.get(tmpForm);
      data = c.data;
      var isUpload = false;
      var files = {};
      var inputs = Dom.query("input", form);
      for(var i = 0, l = inputs.length;i < l;i++) {
        var input = inputs[i];
        if(input.type.toLowerCase() === "file") {
          isUpload = true;
          if(!FormData) {
            break
          }
          var selected = slice.call(input.files, 0);
          files[Dom.attr(input, "name")] = selected.length > 1 ? selected : selected[0] || null
        }
      }
      if(isUpload && FormData) {
        c.files = c.files || {};
        S.mix(c.files, files);
        delete c.contentType
      }
      if(!isUpload || FormData) {
        formParam = FormSerializer.getFormData(form);
        if(c.hasContent) {
          formParam = S.param(formParam, undefined, undefined, c.serializeArray);
          if(data) {
            c.data += "&" + formParam
          }else {
            c.data = formParam
          }
        }else {
          c.uri.query.add(formParam)
        }
      }else {
        dataType = c.dataType;
        d = dataType[0];
        if(d === "*") {
          d = "text"
        }
        dataType.length = 2;
        dataType[0] = "iframe";
        dataType[1] = d
      }
    }
  });
  return IO
});
KISSY.add("io/iframe-transport", ["dom", "./base", "event/dom"], function(S, require) {
  var Dom = require("dom"), IO = require("./base"), Event = require("event/dom");
  var logger = S.getLogger("s/io");
  var doc = S.Env.host.document, OK_CODE = 200, ERROR_CODE = 500, BREATH_INTERVAL = 30, iframeConverter = S.clone(IO.getConfig().converters.text);
  iframeConverter.json = function(str) {
    return S.parseJson(S.unEscapeHtml(str))
  };
  IO.setupConfig({converters:{iframe:iframeConverter, text:{iframe:function(text) {
    return text
  }}, xml:{iframe:function(xml) {
    return xml
  }}}});
  function createIframe(xhr) {
    var id = S.guid("io-iframe"), iframe, src = Dom.getEmptyIframeSrc();
    iframe = xhr.iframe = Dom.create("<iframe " + (src ? ' src="' + src + '" ' : "") + ' id="' + id + '"' + ' name="' + id + '"' + ' style="position:absolute;left:-9999px;top:-9999px;"/>');
    Dom.prepend(iframe, doc.body || doc.documentElement);
    return iframe
  }
  function addDataToForm(query, form, serializeArray) {
    var ret = [], isArray, vs, i, e;
    S.each(query, function(data, k) {
      isArray = S.isArray(data);
      vs = S.makeArray(data);
      for(i = 0;i < vs.length;i++) {
        e = doc.createElement("input");
        e.type = "hidden";
        e.name = k + (isArray && serializeArray ? "[]" : "");
        e.value = vs[i];
        Dom.append(e, form);
        ret.push(e)
      }
    });
    return ret
  }
  function removeFieldsFromData(fields) {
    Dom.remove(fields)
  }
  function IframeTransport(io) {
    this.io = io;
    logger.info("use IframeTransport for: " + io.config.url)
  }
  S.augment(IframeTransport, {send:function() {
    var self = this, io = self.io, c = io.config, fields, iframe, query, data = c.data, form = Dom.get(c.form);
    self.attrs = {target:Dom.attr(form, "target") || "", action:Dom.attr(form, "action") || "", encoding:Dom.attr(form, "encoding"), enctype:Dom.attr(form, "enctype"), method:Dom.attr(form, "method")};
    self.form = form;
    iframe = createIframe(io);
    Dom.attr(form, {target:iframe.id, action:io._getUrlForSend(), method:"post", enctype:"multipart/form-data", encoding:"multipart/form-data"});
    if(data) {
      query = S.unparam(data)
    }
    if(query) {
      fields = addDataToForm(query, form, c.serializeArray)
    }
    self.fields = fields;
    function go() {
      Event.on(iframe, "load error", self._callback, self);
      form.submit()
    }
    if(S.UA.ie === 6) {
      setTimeout(go, 0)
    }else {
      go()
    }
  }, _callback:function(event) {
    var self = this, form = self.form, io = self.io, eventType = event.type, iframeDoc, iframe = io.iframe;
    if(!iframe) {
      return
    }
    if(eventType === "abort" && S.UA.ie === 6) {
      setTimeout(function() {
        Dom.attr(form, self.attrs)
      }, 0)
    }else {
      Dom.attr(form, self.attrs)
    }
    removeFieldsFromData(this.fields);
    Event.detach(iframe);
    setTimeout(function() {
      Dom.remove(iframe)
    }, BREATH_INTERVAL);
    io.iframe = null;
    if(eventType === "load") {
      try {
        iframeDoc = iframe.contentWindow.document;
        if(iframeDoc && iframeDoc.body) {
          io.responseText = Dom.html(iframeDoc.body);
          if(S.startsWith(io.responseText, "<?xml")) {
            io.responseText = undefined
          }
        }
        if(iframeDoc && iframeDoc.XMLDocument) {
          io.responseXML = iframeDoc.XMLDocument
        }else {
          io.responseXML = iframeDoc
        }
        if(iframeDoc) {
          io._ioReady(OK_CODE, "success")
        }else {
          io._ioReady(ERROR_CODE, "parser error")
        }
      }catch(e) {
        io._ioReady(ERROR_CODE, "parser error")
      }
    }else {
      if(eventType === "error") {
        io._ioReady(ERROR_CODE, "error")
      }
    }
  }, abort:function() {
    this._callback({type:"abort"})
  }});
  IO.setupTransport("iframe", IframeTransport);
  return IO
});
KISSY.add("io/methods", ["promise", "./base"], function(S, require) {
  var Promise = require("promise"), IO = require("./base");
  var OK_CODE = 200, MULTIPLE_CHOICES = 300, NOT_MODIFIED = 304, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;
  function handleResponseData(io) {
    var text = io.responseText, xml = io.responseXML, c = io.config, converts = c.converters, type, contentType, responseData, contents = c.contents, dataType = c.dataType;
    if(text || xml) {
      contentType = io.mimeType || io.getResponseHeader("Content-Type");
      while(dataType[0] === "*") {
        dataType.shift()
      }
      if(!dataType.length) {
        for(type in contents) {
          if(contents[type].test(contentType)) {
            if(dataType[0] !== type) {
              dataType.unshift(type)
            }
            break
          }
        }
      }
      dataType[0] = dataType[0] || "text";
      for(var dataTypeIndex = 0;dataTypeIndex < dataType.length;dataTypeIndex++) {
        if(dataType[dataTypeIndex] === "text" && text !== undefined) {
          responseData = text;
          break
        }else {
          if(dataType[dataTypeIndex] === "xml" && xml !== undefined) {
            responseData = xml;
            break
          }
        }
      }
      if(!responseData) {
        var rawData = {text:text, xml:xml};
        S.each(["text", "xml"], function(prevType) {
          var type = dataType[0], converter = converts[prevType] && converts[prevType][type];
          if(converter && rawData[prevType]) {
            dataType.unshift(prevType);
            responseData = prevType === "text" ? text : xml;
            return false
          }
          return undefined
        })
      }
    }
    var prevType = dataType[0];
    for(var i = 1;i < dataType.length;i++) {
      type = dataType[i];
      var converter = converts[prevType] && converts[prevType][type];
      if(!converter) {
        throw"no covert for " + prevType + " => " + type;
      }
      responseData = converter(responseData);
      prevType = type
    }
    io.responseData = responseData
  }
  S.extend(IO, Promise, {setRequestHeader:function(name, value) {
    var self = this;
    self.requestHeaders[name] = value;
    return self
  }, getAllResponseHeaders:function() {
    var self = this;
    return self.state === 2 ? self.responseHeadersString : null
  }, getResponseHeader:function(name) {
    var match, self = this, responseHeaders;
    name = name.toLowerCase();
    if(self.state === 2) {
      if(!(responseHeaders = self.responseHeaders)) {
        responseHeaders = self.responseHeaders = {};
        while(match = rheaders.exec(self.responseHeadersString)) {
          responseHeaders[match[1].toLowerCase()] = match[2]
        }
      }
      match = responseHeaders[name]
    }
    return match === undefined ? null : match
  }, overrideMimeType:function(type) {
    var self = this;
    if(!self.state) {
      self.mimeType = type
    }
    return self
  }, abort:function(statusText) {
    var self = this;
    statusText = statusText || "abort";
    if(self.transport) {
      self.transport.abort(statusText)
    }
    self._ioReady(0, statusText);
    return self
  }, getNativeXhr:function() {
    var transport = this.transport;
    if(transport) {
      return transport.nativeXhr
    }
    return null
  }, _ioReady:function(status, statusText) {
    var self = this;
    if(self.state === 2) {
      return
    }
    self.state = 2;
    self.readyState = 4;
    var isSuccess;
    if(status >= OK_CODE && status < MULTIPLE_CHOICES || status === NOT_MODIFIED) {
      if(status === NOT_MODIFIED) {
        statusText = "not modified";
        isSuccess = true
      }else {
        try {
          handleResponseData(self);
          statusText = "success";
          isSuccess = true
        }catch(e) {
          S.log(e.stack || e, "error");
          setTimeout(function() {
            throw e;
          }, 0);
          statusText = "parser error"
        }
      }
    }else {
      if(status < 0) {
        status = 0
      }
    }
    self.status = status;
    self.statusText = statusText;
    var defer = self.defer, config = self.config, timeoutTimer;
    if(timeoutTimer = self.timeoutTimer) {
      clearTimeout(timeoutTimer);
      self.timeoutTimer = 0
    }
    var handler = isSuccess ? "success" : "error", h, v = [self.responseData, statusText, self], context = config.context, eventObject = {ajaxConfig:config, io:self};
    if(h = config[handler]) {
      h.apply(context, v)
    }
    if(h = config.complete) {
      h.apply(context, v)
    }
    IO.fire(handler, eventObject);
    IO.fire("complete", eventObject);
    defer[isSuccess ? "resolve" : "reject"](v)
  }, _getUrlForSend:function() {
    var c = this.config, uri = c.uri, originalQuery = S.Uri.getComponents(c.url).query || "", url = uri.toString.call(uri, c.serializeArray);
    return url + (originalQuery ? (uri.query.has() ? "&" : "?") + originalQuery : originalQuery)
  }})
});
KISSY.add("io", ["io/form-serializer", "io/base", "io/xhr-transport", "io/script-transport", "io/jsonp", "io/form", "io/iframe-transport", "io/methods"], function(S, require) {
  var serializer = require("io/form-serializer"), IO = require("io/base");
  require("io/xhr-transport");
  require("io/script-transport");
  require("io/jsonp");
  require("io/form");
  require("io/iframe-transport");
  require("io/methods");
  function get(url, data, callback, dataType, type) {
    if(typeof data === "function") {
      dataType = callback;
      callback = data;
      data = undefined
    }
    return IO({type:type || "get", url:url, data:data, success:callback, dataType:dataType})
  }
  S.mix(IO, {serialize:serializer.serialize, get:get, post:function(url, data, callback, dataType) {
    if(typeof data === "function") {
      dataType = callback;
      callback = data;
      data = undefined
    }
    return get(url, data, callback, dataType, "post")
  }, jsonp:function(url, data, callback) {
    if(typeof data === "function") {
      callback = data;
      data = undefined
    }
    return get(url, data, callback, "jsonp")
  }, getScript:S.getScript, getJSON:function(url, data, callback) {
    if(typeof data === "function") {
      callback = data;
      data = undefined
    }
    return get(url, data, callback, "json")
  }, upload:function(url, form, data, callback, dataType) {
    if(typeof data === "function") {
      dataType = callback;
      callback = data;
      data = undefined
    }
    return IO({url:url, type:"post", dataType:dataType, form:form, data:data, success:callback})
  }});
  S.mix(S, {Ajax:IO, IO:IO, ajax:IO, io:IO, jsonp:IO.jsonp});
  return IO
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/dialog
*/

KISSY.add("editor/plugin/dialog", ["editor", "overlay", "./focus-fix", "dd/plugin/constrain", "component/plugin/drag"], function(S, require) {
  var Editor = require("editor");
  var Overlay = require("overlay");
  var focusFix = require("./focus-fix");
  var ConstrainPlugin = require("dd/plugin/constrain");
  var DragPlugin = require("component/plugin/drag");
  return Overlay.Dialog.extend({initializer:function() {
    this.plug(new DragPlugin({handlers:[".ks-editor-dialog-header"], plugins:[new ConstrainPlugin({constrain:window})]}))
  }, bindUI:function() {
    focusFix.init(this)
  }, show:function() {
    var self = this;
    self.center();
    var y = self.get("y");
    if(y - S.DOM.scrollTop() > 200) {
      y = S.DOM.scrollTop() + 200;
      self.set("y", y)
    }
    self.callSuper()
  }}, {ATTRS:{prefixCls:{value:"ks-editor-"}, zIndex:{value:Editor.baseZIndex(Editor.ZIndexManager.OVERLAY)}}})
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:06
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 dd/plugin/constrain
*/

KISSY.add("dd/plugin/constrain", ["node", "base"], function(S, require, exports, module) {
  var Node = require("node"), Base = require("base");
  var $ = Node.all, CONSTRAIN_EVENT = ".-ks-constrain" + S.now(), WIN = S.Env.host;
  function onDragStart(e) {
    var self = this, drag = e.drag, l, t, lt, dragNode = drag.get("dragNode"), constrain = self.get("constrain");
    if(constrain) {
      if(S.isWindow(constrain[0])) {
        self.__constrainRegion = {left:l = constrain.scrollLeft(), top:t = constrain.scrollTop(), right:l + constrain.width(), bottom:t + constrain.height()}
      }else {
        if(constrain.getDOMNode) {
          lt = constrain.offset();
          self.__constrainRegion = {left:lt.left, top:lt.top, right:lt.left + constrain.outerWidth(), bottom:lt.top + constrain.outerHeight()}
        }else {
          if(S.isPlainObject(constrain)) {
            self.__constrainRegion = constrain
          }
        }
      }
      if(self.__constrainRegion) {
        self.__constrainRegion.right -= dragNode.outerWidth();
        self.__constrainRegion.bottom -= dragNode.outerHeight()
      }
    }
  }
  function onDragAlign(e) {
    var self = this, info = {}, l = e.left, t = e.top, constrain = self.__constrainRegion;
    if(constrain) {
      info.left = Math.min(Math.max(constrain.left, l), constrain.right);
      info.top = Math.min(Math.max(constrain.top, t), constrain.bottom);
      e.drag.setInternal("actualPos", info)
    }
  }
  function onDragEnd() {
    this.__constrainRegion = null
  }
  module.exports = Base.extend({pluginId:"dd/plugin/constrain", __constrainRegion:null, pluginInitializer:function(drag) {
    var self = this;
    drag.on("dragstart" + CONSTRAIN_EVENT, onDragStart, self).on("dragend" + CONSTRAIN_EVENT, onDragEnd, self).on("dragalign" + CONSTRAIN_EVENT, onDragAlign, self)
  }, pluginDestructor:function(drag) {
    drag.detach(CONSTRAIN_EVENT, {context:this})
  }}, {ATTRS:{constrain:{value:$(WIN), setter:function(v) {
    if(v) {
      if(v === true) {
        return $(WIN)
      }else {
        if(v.nodeType || S.isWindow(v) || typeof v === "string") {
          return $(v)
        }
      }
    }
    return v
  }}}})
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:05
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/plugin/drag
*/

KISSY.add("component/plugin/drag", ["dd"], function(S, require) {
  var DD = require("dd");
  return DD.Draggable.extend({pluginId:"component/plugin/drag", pluginBindUI:function(component) {
    var $el = component.$el, self = this;
    self.set("node", $el);
    self.on("dragend", function() {
      var offset = $el.offset();
      component.setInternal("xy", [offset.left, offset.top])
    })
  }, pluginDestructor:function() {
    this.destroy()
  }}, {ATTRS:{move:{value:1}, groups:{value:false}}})
});


/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:18
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 tabs/bar-render
 tabs/bar
 tabs/body
 tabs/tab-render
 tabs/tab
 tabs/panel-render
 tabs/panel
 tabs/render
 tabs
*/

KISSY.add("tabs/bar-render", ["toolbar"], function(S, require) {
  var Toolbar = require("toolbar");
  return Toolbar.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    renderData.elAttrs.role = "tablist"
  }}, {name:"TabsBarRender"})
});
KISSY.add("tabs/bar", ["toolbar", "./bar-render"], function(S, require) {
  var Toolbar = require("toolbar");
  var BarRender = require("./bar-render");
  var TabBar = Toolbar.extend({bindUI:function() {
    var self = this;
    self.on("afterSelectedChange", function(e) {
      if(e.newVal && e.target.isTabsTab) {
        self.set("selectedTab", e.target)
      }
    })
  }, syncUI:function() {
    var bar = this, children = bar.get("children");
    S.each(children, function(c) {
      if(c.get("selected")) {
        bar.setInternal("selectedTab", c);
        return false
      }
      return undefined
    })
  }, handleKeyDownInternal:function(e) {
    var self = this;
    var current = self.get("selectedTab");
    var next = self.getNextItemByKeyDown(e, current);
    if(typeof next === "boolean") {
      return next
    }else {
      next.set("selected", true);
      return true
    }
  }, _onSetSelectedTab:function(v, e) {
    var prev;
    if(v) {
      if(e && (prev = e.prevVal)) {
        prev.set("selected", false)
      }
      v.set("selected", true)
    }
  }, _onSetHighlightedItem:function(v, e) {
    var self = this;
    self.callSuper(v, e);
    if(self.get("changeType") === "mouse") {
      self._onSetSelectedTab.apply(self, arguments)
    }
  }}, {ATTRS:{selectedTab:{}, changeType:{value:"click"}, defaultChildCfg:{value:{xclass:"tabs-tab"}}, xrender:{value:BarRender}}, xclass:"tabs-bar"});
  TabBar.ChangeType = {CLICK:"click", MOUSE:"mouse"};
  return TabBar
});
KISSY.add("tabs/body", ["component/container"], function(S, require) {
  var Container = require("component/container");
  var TabBody = Container.extend({bindUI:function() {
    var self = this;
    self.on("afterSelectedPanelIndexChange", function(e) {
      var children = self.get("children"), newIndex = e.newVal, hidePanel;
      if(children[newIndex]) {
        if(hidePanel = children[e.prevVal]) {
          hidePanel.set("selected", false)
        }
        self.selectPanelByIndex(newIndex)
      }
    })
  }, syncUI:function() {
    var self = this, children = self.get("children");
    S.each(children, function(c, i) {
      if(c.get("selected")) {
        self.set("selectedPanelIndex", i);
        return false
      }
      return undefined
    })
  }, createChild:function(index) {
    return checkLazy(this, "createChild", index)
  }, renderChild:function(index) {
    return checkLazy(this, "renderChild", index)
  }, selectPanelByIndex:function(newIndex) {
    this.get("children")[newIndex].set("selected", true);
    if(this.get("lazyRender")) {
      this.renderChild(newIndex)
    }
  }}, {ATTRS:{selectedPanelIndex:{}, allowTextSelection:{value:true}, focusable:{value:false}, lazyRender:{}, handleMouseEvents:{value:false}, defaultChildCfg:{value:{xclass:"tabs-panel"}}}, xclass:"tabs-body"});
  function checkLazy(self, method, index) {
    if(self.get("lazyRender")) {
      var c = self.get("children")[index];
      if(!c.get("selected")) {
        return c
      }
    }
    return TabBody.superclass[method].call(self, index)
  }
  return TabBody
});
KISSY.add("tabs/tab-render", ["button"], function(S, require) {
  var Button = require("button");
  return Button.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    var attrs = renderData.elAttrs;
    attrs.role = "tab";
    if(renderData.selected) {
      attrs["aria-selected"] = true;
      renderData.elCls.push(this.getBaseCssClasses("selected"))
    }
  }, _onSetSelected:function(v) {
    var el = this.$el;
    var selectedCls = this.getBaseCssClasses("selected");
    el[v ? "addClass" : "removeClass"](selectedCls).attr("aria-selected", !!v)
  }}, {name:"TabsTabRender", HTML_PARSER:{selected:function(el) {
    return el.hasClass(this.getBaseCssClass("selected"))
  }}})
});
KISSY.add("tabs/tab", ["button", "./tab-render"], function(S, require) {
  var Button = require("button");
  var TabRender = require("./tab-render");
  return Button.extend({isTabsTab:true, bindUI:function() {
    this.on("click", function() {
      this.set("selected", true)
    })
  }}, {ATTRS:{handleMouseEvents:{value:false}, focusable:{value:false}, selected:{view:1}, xrender:{value:TabRender}}, xclass:"tabs-tab"})
});
KISSY.add("tabs/panel-render", ["component/container"], function(S, require) {
  var Container = require("component/container");
  return Container.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    var self = this;
    renderData.elAttrs.role = "tabpanel";
    if(renderData.selected) {
      renderData.elCls.push(self.getBaseCssClasses("selected"))
    }else {
      renderData.elAttrs["aria-hidden"] = false
    }
  }, _onSetSelected:function(v) {
    var el = this.$el;
    var selectedCls = this.getBaseCssClasses("selected");
    el[v ? "addClass" : "removeClass"](selectedCls).attr("aria-hidden", !v)
  }}, {name:"TabsPanelRender", HTML_PARSER:{selected:function(el) {
    return el.hasClass(this.getBaseCssClass("selected"))
  }}})
});
KISSY.add("tabs/panel", ["component/container", "./panel-render"], function(S, require) {
  var Container = require("component/container");
  var PanelRender = require("./panel-render");
  return Container.extend({isTabsPanel:1}, {ATTRS:{selected:{view:1}, focusable:{value:false}, allowTextSelection:{value:true}, xrender:{value:PanelRender}}, xclass:"tabs-panel"})
});
KISSY.add("tabs/render", ["component/container"], function(S, require) {
  var Container = require("component/container");
  var CLS = "top bottom left right";
  return Container.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    renderData.elCls.push(this.getBaseCssClass(this.control.get("barOrientation")))
  }, decorateDom:function() {
    var control = this.control;
    control.get("bar").set("changeType", control.get("changeType"))
  }, _onSetBarOrientation:function(v) {
    var self = this, el = self.$el;
    el.removeClass(self.getBaseCssClass(CLS)).addClass(self.getBaseCssClass(v))
  }}, {name:"TabsRender", HTML_PARSER:{barOrientation:function(el) {
    var orientation = el[0].className.match(/(top|bottom|left|right)\b/);
    return orientation && orientation[1] || "top"
  }}})
});
KISSY.add("tabs", ["component/container", "tabs/bar", "tabs/body", "tabs/tab", "tabs/panel", "tabs/render"], function(S, require) {
  var Container = require("component/container");
  var Bar = require("tabs/bar");
  var Body = require("tabs/body");
  require("tabs/tab");
  var Panel = require("tabs/panel");
  var Render = require("tabs/render");
  function setBar(children, barOrientation, bar) {
    children[BarIndexMap[barOrientation]] = bar
  }
  function setBody(children, barOrientation, body) {
    children[1 - BarIndexMap[barOrientation]] = body
  }
  var Tabs = Container.extend({initializer:function() {
    var self = this, items = self.get("items");
    if(items) {
      var children = self.get("children"), barOrientation = self.get("barOrientation"), selected, prefixCls = self.get("prefixCls"), tabItem, panelItem, bar = {prefixCls:prefixCls, xclass:"tabs-bar", changeType:self.get("changeType"), children:[]}, body = {prefixCls:prefixCls, xclass:"tabs-body", lazyRender:self.get("lazyRender"), children:[]}, barChildren = bar.children, panels = body.children;
      S.each(items, function(item) {
        selected = selected || item.selected;
        barChildren.push(tabItem = {content:item.title, selected:item.selected});
        panels.push(panelItem = {content:item.content, selected:item.selected})
      });
      if(!selected && barChildren.length) {
        barChildren[0].selected = true;
        panels[0].selected = true
      }
      setBar(children, barOrientation, bar);
      setBody(children, barOrientation, body)
    }
  }, addItem:function(item, index) {
    var self = this, bar = self.get("bar"), selectedTab, tabItem, panelItem, barChildren = bar.get("children"), body = self.get("body");
    if(typeof index === "undefined") {
      index = barChildren.length
    }
    tabItem = {content:item.title};
    panelItem = {content:item.content};
    bar.addChild(tabItem, index);
    selectedTab = barChildren[index];
    body.addChild(panelItem, index);
    if(item.selected) {
      bar.set("selectedTab", selectedTab);
      body.set("selectedPanelIndex", index)
    }
    return self
  }, removeItemAt:function(index, destroy) {
    var tabs = this, bar = tabs.get("bar"), barCs = bar.get("children"), tab = bar.getChildAt(index), body = tabs.get("body");
    if(tab.get("selected")) {
      if(barCs.length === 1) {
        bar.set("selectedTab", null)
      }else {
        if(index === 0) {
          bar.set("selectedTab", bar.getChildAt(index + 1))
        }else {
          bar.set("selectedTab", bar.getChildAt(index - 1))
        }
      }
    }
    bar.removeChild(bar.getChildAt(index), destroy);
    body.removeChild(body.getChildAt(index), destroy);
    return tabs
  }, removeItemByTab:function(tab, destroy) {
    var index = S.indexOf(tab, this.get("bar").get("children"));
    return this.removeItemAt(index, destroy)
  }, removeItemByPanel:function(panel, destroy) {
    var index = S.indexOf(panel, this.get("body").get("children"));
    return this.removeItemAt(index, destroy)
  }, getSelectedTab:function() {
    var tabs = this, bar = tabs.get("bar"), child = null;
    S.each(bar.get("children"), function(c) {
      if(c.get("selected")) {
        child = c;
        return false
      }
      return undefined
    });
    return child
  }, getSelectedPanel:function() {
    var tabs = this, body = tabs.get("body"), child = null;
    S.each(body.get("children"), function(c) {
      if(c.get("selected")) {
        child = c;
        return false
      }
      return undefined
    });
    return child
  }, getTabs:function() {
    return this.get("bar").get("children")
  }, getPanels:function() {
    return this.get("body").get("children")
  }, getTabAt:function(index) {
    return this.get("bar").get("children")[index]
  }, getPanelAt:function(index) {
    return this.get("body").get("children")[index]
  }, setSelectedTab:function(tab) {
    var tabs = this, bar = tabs.get("bar"), body = tabs.get("body");
    bar.set("selectedTab", tab);
    body.set("selectedPanelIndex", S.indexOf(tab, bar.get("children")));
    return this
  }, setSelectedPanel:function(panel) {
    var tabs = this, bar = tabs.get("bar"), body = tabs.get("body"), selectedPanelIndex = S.indexOf(panel, body.get("children"));
    body.set("selectedPanelIndex", selectedPanelIndex);
    bar.set("selectedTab", tabs.getTabAt(selectedPanelIndex));
    return this
  }, bindUI:function() {
    this.on("afterSelectedTabChange", function(e) {
      this.setSelectedTab(e.newVal)
    })
  }}, {ATTRS:{items:{}, changeType:{}, lazyRender:{value:false}, handleMouseEvents:{value:false}, allowTextSelection:{value:true}, focusable:{value:false}, bar:{getter:function() {
    return this.get("children")[BarIndexMap[this.get("barOrientation")]]
  }}, body:{getter:function() {
    return this.get("children")[1 - BarIndexMap[this.get("barOrientation")]]
  }}, barOrientation:{view:1, value:"top"}, xrender:{value:Render}}, xclass:"tabs"});
  Tabs.Orientation = {TOP:"top", BOTTOM:"bottom", LEFT:"left", RIGHT:"right"};
  var BarIndexMap = {top:0, left:0, bottom:1, right:0};
  Tabs.ChangeType = Bar.ChangeType;
  Tabs.Bar = Bar;
  Tabs.Body = Body;
  Tabs.Panel = Panel;
  return Tabs
});

/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:18
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 toolbar/render
 toolbar
*/

KISSY.add("toolbar/render", ["component/container"], function(S, require) {
  var Container = require("component/container");
  return Container.getDefaultRender().extend({beforeCreateDom:function(renderData) {
    renderData.elAttrs.role = "toolbar"
  }})
});
KISSY.add("toolbar", ["component/container", "component/extension/delegate-children", "toolbar/render", "node"], function(S, require) {
  var Container = require("component/container");
  var DelegateChildrenExtension = require("component/extension/delegate-children");
  var ToolbarRender = require("toolbar/render");
  var Node = require("node");
  var KeyCode = Node.KeyCode;
  function getNextEnabledItem(index, direction, self) {
    var children = self.get("children"), count = 0, childrenLength = children.length;
    if(index === undefined) {
      if(direction === 1) {
        index = 0
      }else {
        index = childrenLength - 1
      }
      if(!children[index].get("disabled")) {
        return children[index]
      }
    }
    do {
      count++;
      index = (index + childrenLength + direction) % childrenLength
    }while(count < childrenLength && children[index].get("disabled"));
    if(count !== childrenLength) {
      return children[index]
    }
    return null
  }
  function afterCollapsedChange(e) {
    var self = this;
    if(e.newVal) {
      self.set("expandedItem", null)
    }else {
      self.set("expandedItem", e.target)
    }
  }
  function afterHighlightedChange(e) {
    var self = this, expandedItem, children, target = e.target;
    if(self !== target && (target.isMenuItem || target.isButton)) {
      if(e.newVal) {
        children = self.get("children");
        if((expandedItem = self.get("expandedItem")) && S.inArray(target, children)) {
          self.set("expandedItem", target.isMenuButton ? target : null)
        }
        self.set("highlightedItem", target)
      }else {
        if(!e.byPassSetToolbarHighlightedItem) {
          self.set("highlightedItem", null)
        }
      }
    }
  }
  function getChildByHighlightedItem(toolbar) {
    var children = toolbar.get("children"), i, child;
    for(i = 0;i < children.length;i++) {
      child = children[i];
      if(child.get("highlighted") || child.isMenuButton && !child.get("collapsed")) {
        return child
      }
    }
    return null
  }
  return Container.extend([DelegateChildrenExtension], {_onSetHighlightedItem:function(item, e) {
    var id, itemEl, self = this, prevVal = e && e.prevVal, children = self.get("children"), el = self.el;
    if(prevVal && S.inArray(prevVal, children)) {
      prevVal.set("highlighted", false, {data:{byPassSetToolbarHighlightedItem:1}})
    }
    if(item) {
      if(el.ownerDocument.activeElement !== el) {
        self.focus()
      }
      itemEl = item.el;
      id = itemEl.id;
      if(!id) {
        itemEl.id = id = S.guid("ks-toolbar-item")
      }
      el.setAttribute("aria-activedescendant", id)
    }else {
      el.setAttribute("aria-activedescendant", "")
    }
  }, _onSetExpandedItem:function(v, e) {
    if(e && e.prevVal) {
      e.prevVal.set("collapsed", true)
    }
    if(v) {
      v.set("collapsed", false)
    }
  }, bindUI:function() {
    var self = this;
    self.on("afterCollapsedChange", afterCollapsedChange, self);
    self.on("afterHighlightedChange", afterHighlightedChange, self)
  }, handleBlurInternal:function(e) {
    var self = this, highlightedItem;
    self.callSuper(e);
    self.set("expandedItem", null);
    if(highlightedItem = self.get("highlightedItem")) {
      highlightedItem.set("highlighted", false)
    }
  }, getNextItemByKeyDown:function(e, current) {
    var self = this, children = self.get("children"), childIndex = current && S.indexOf(current, children);
    if(current) {
      if(current.handleKeyDownInternal(e)) {
        return true
      }
    }
    if(e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
      return false
    }
    switch(e.keyCode) {
      case KeyCode.ESC:
        self.view.getKeyEventTarget().fire("blur");
        return true;
      case KeyCode.HOME:
        current = getNextEnabledItem(undefined, 1, self);
        break;
      case KeyCode.END:
        current = getNextEnabledItem(undefined, -1, self);
        break;
      case KeyCode.UP:
        current = getNextEnabledItem(childIndex, -1, self);
        break;
      case KeyCode.LEFT:
        current = getNextEnabledItem(childIndex, -1, self);
        break;
      case KeyCode.DOWN:
        current = getNextEnabledItem(childIndex, 1, self);
        break;
      case KeyCode.RIGHT:
        current = getNextEnabledItem(childIndex, 1, self);
        break;
      default:
        return false
    }
    return current
  }, handleKeyDownInternal:function(e) {
    var self = this, currentChild = getChildByHighlightedItem(self), nextHighlightedItem = self.getNextItemByKeyDown(e, currentChild);
    if(typeof nextHighlightedItem === "boolean") {
      return nextHighlightedItem
    }
    if(nextHighlightedItem) {
      nextHighlightedItem.set("highlighted", true)
    }
    return true
  }}, {xclass:"toolbar", ATTRS:{highlightedItem:{}, expandedItem:{}, defaultChildCfg:{value:{xclass:"button", handleMouseEvents:false, focusable:false}}, xrender:{value:ToolbarRender}}})
});



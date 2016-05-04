/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-center/cmd
*/

KISSY.add("editor/plugin/justify-center/cmd", ["../justify-cmd"], function(S, require) {
  var justifyUtils = require("../justify-cmd");
  return{init:function(editor) {
    justifyUtils.addCommand(editor, "justifyCenter", "center")
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-right
*/

KISSY.add("editor/plugin/justify-right", ["editor", "./justify-right/cmd", "./button"], function(S, require) {
  var Editor = require("editor");
  var justifyCenterCmd = require("./justify-right/cmd");
  require("./button");
  function exec() {
    var editor = this.get("editor");
    editor.execCommand("justifyRight");
    editor.focus()
  }
  function justifyRight() {
  }
  S.augment(justifyRight, {pluginRenderUI:function(editor) {
    justifyCenterCmd.init(editor);
    editor.addButton("justifyRight", {tooltip:"\u53f3\u5bf9\u9f50", checkable:true, listeners:{click:exec, afterSyncUI:function() {
      var self = this;
      editor.on("selectionChange", function() {
        if(editor.get("mode") === Editor.Mode.SOURCE_MODE) {
          return
        }
        if(editor.queryCommandValue("justifyRight")) {
          self.set("checked", true)
        }else {
          self.set("checked", false)
        }
      })
    }}, mode:Editor.Mode.WYSIWYG_MODE});
    editor.docReady(function() {
      editor.get("document").on("keydown", function(e) {
        if(e.ctrlKey && e.keyCode === S.Node.KeyCode.R) {
          editor.execCommand("justifyRight");
          e.preventDefault()
        }
      })
    })
  }});
  return justifyRight
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:48
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/justify-right/cmd
*/

KISSY.add("editor/plugin/justify-right/cmd", ["../justify-cmd"], function(S, require) {
  var justifyUtils = require("../justify-cmd");
  return{init:function(editor) {
    justifyUtils.addCommand(editor, "justifyRight", "right")
  }}
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/table
*/

KISSY.add("editor/plugin/table", ["editor", "./dialog-loader", "./contextmenu", "./button"], function(S, require) {
  var Editor = require("editor");
  var OLD_IE = S.UA.ieMode < 11;
  var Walker = Editor.Walker;
  var DialogLoader = require("./dialog-loader");
  require("./contextmenu");
  require("./button");
  var UA = S.UA, Dom = S.DOM, Node = S.Node, tableRules = ["tr", "th", "td", "tbody", "table"], cellNodeRegex = /^(?:td|th)$/;
  function getSelectedCells(selection) {
    var bookmarks = selection.createBookmarks(), ranges = selection.getRanges(), retval = [], database = {};
    function moveOutOfCellGuard(node) {
      if(retval.length > 0) {
        return
      }
      if(node[0].nodeType === Dom.NodeType.ELEMENT_NODE && cellNodeRegex.test(node.nodeName()) && !node.data("selected_cell")) {
        node._4eSetMarker(database, "selected_cell", true, undefined);
        retval.push(node)
      }
    }
    for(var i = 0;i < ranges.length;i++) {
      var range = ranges[i];
      if(range.collapsed) {
        var startNode = range.getCommonAncestor(), nearestCell = startNode.closest("td", undefined) || startNode.closest("th", undefined);
        if(nearestCell) {
          retval.push(nearestCell)
        }
      }else {
        var walker = new Walker(range), node;
        walker.guard = moveOutOfCellGuard;
        while(node = walker.next()) {
          var parent = node.parent();
          if(parent && cellNodeRegex.test(parent.nodeName()) && !parent.data("selected_cell")) {
            parent._4eSetMarker(database, "selected_cell", true, undefined);
            retval.push(parent)
          }
        }
      }
    }
    Editor.Utils.clearAllMarkers(database);
    selection.selectBookmarks(bookmarks);
    return retval
  }
  function clearRow($tr) {
    var $cells = $tr.cells;
    for(var i = 0;i < $cells.length;i++) {
      $cells[i].innerHTML = "";
      if(!OLD_IE) {
        (new Node($cells[i]))._4eAppendBogus(undefined)
      }
    }
  }
  function insertRow(selection, insertBefore) {
    var row = selection.getStartElement().parent("tr");
    if(!row) {
      return
    }
    var newRow = row.clone(true);
    newRow.insertBefore(row);
    clearRow(insertBefore ? newRow[0] : row[0])
  }
  function deleteRows(selectionOrRow) {
    var table;
    if(selectionOrRow instanceof Editor.Selection) {
      var cells = getSelectedCells(selectionOrRow), cellsCount = cells.length, rowsToDelete = [], cursorPosition, previousRowIndex, row, nextRowIndex;
      for(var i = 0;i < cellsCount;i++) {
        row = cells[i].parent();
        var rowIndex = row[0].rowIndex;
        if(!i) {
          previousRowIndex = rowIndex - 1
        }
        rowsToDelete[rowIndex] = row;
        if(i === cellsCount - 1) {
          nextRowIndex = rowIndex + 1
        }
      }
      table = row.parent("table");
      var rows = table[0].rows, rowCount = rows.length;
      cursorPosition = new Node(nextRowIndex < rowCount && table[0].rows[nextRowIndex] || previousRowIndex > 0 && table[0].rows[previousRowIndex] || table[0].parentNode);
      for(i = rowsToDelete.length;i >= 0;i--) {
        if(rowsToDelete[i]) {
          deleteRows(rowsToDelete[i])
        }
      }
      return cursorPosition
    }else {
      if(selectionOrRow instanceof Node) {
        table = selectionOrRow.parent("table");
        if(table[0].rows.length === 1) {
          table.remove()
        }else {
          selectionOrRow.remove()
        }
      }
    }
    return 0
  }
  function insertColumn(selection, insertBefore) {
    var startElement = selection.getStartElement(), cell = startElement.closest("td", undefined) || startElement.closest("th", undefined);
    if(!cell) {
      return
    }
    var table = cell.parent("table"), cellIndex = cell[0].cellIndex;
    for(var i = 0;i < table[0].rows.length;i++) {
      var $row = table[0].rows[i];
      if($row.cells.length < cellIndex + 1) {
        continue
      }
      cell = new Node($row.cells[cellIndex].cloneNode(undefined));
      if(!OLD_IE) {
        cell._4eAppendBogus(undefined)
      }
      var baseCell = new Node($row.cells[cellIndex]);
      if(insertBefore) {
        cell.insertBefore(baseCell)
      }else {
        cell.insertAfter(baseCell)
      }
    }
  }
  function getFocusElementAfterDelCols(cells) {
    var cellIndexList = [], table = cells[0] && cells[0].parent("table"), i, length, targetIndex, targetCell;
    for(i = 0, length = cells.length;i < length;i++) {
      cellIndexList.push(cells[i][0].cellIndex)
    }
    cellIndexList.sort();
    for(i = 1, length = cellIndexList.length;i < length;i++) {
      if(cellIndexList[i] - cellIndexList[i - 1] > 1) {
        targetIndex = cellIndexList[i - 1] + 1;
        break
      }
    }
    if(!targetIndex) {
      targetIndex = cellIndexList[0] > 0 ? cellIndexList[0] - 1 : cellIndexList[cellIndexList.length - 1] + 1
    }
    var rows = table[0].rows;
    for(i = 0, length = rows.length;i < length;i++) {
      targetCell = rows[i].cells[targetIndex];
      if(targetCell) {
        break
      }
    }
    return targetCell ? new Node(targetCell) : table.prev()
  }
  function deleteColumns(selectionOrCell) {
    var i;
    if(selectionOrCell instanceof Editor.Selection) {
      var colsToDelete = getSelectedCells(selectionOrCell), elementToFocus = getFocusElementAfterDelCols(colsToDelete);
      for(i = colsToDelete.length - 1;i >= 0;i--) {
        if(colsToDelete[i]) {
          deleteColumns(colsToDelete[i])
        }
      }
      return elementToFocus
    }else {
      if(selectionOrCell instanceof Node) {
        var table = selectionOrCell.parent("table");
        if(!table) {
          return null
        }
        var cellIndex = selectionOrCell[0].cellIndex;
        for(i = table[0].rows.length - 1;i >= 0;i--) {
          var row = new Node(table[0].rows[i]);
          if(!cellIndex && row[0].cells.length === 1) {
            deleteRows(row);
            continue
          }
          if(row[0].cells[cellIndex]) {
            row[0].removeChild(row[0].cells[cellIndex])
          }
        }
      }
    }
    return null
  }
  function placeCursorInCell(cell, placeAtEnd) {
    var range = new Editor.Range(cell[0].ownerDocument);
    if(!range.moveToElementEditablePosition(cell, placeAtEnd ? true : undefined)) {
      range.selectNodeContents(cell);
      range.collapse(placeAtEnd ? false : true)
    }
    range.select(true)
  }
  function getSel(editor) {
    var selection = editor.getSelection(), startElement = selection && selection.getStartElement(), table = startElement && startElement.closest("table", undefined);
    if(!table) {
      return undefined
    }
    var td = startElement.closest(function(n) {
      var name = Dom.nodeName(n);
      return table.contains(n) && (name === "td" || name === "th")
    }, undefined);
    var tr = startElement.closest(function(n) {
      var name = Dom.nodeName(n);
      return table.contains(n) && name === "tr"
    }, undefined);
    return{table:table, td:td, tr:tr}
  }
  function ensureTd(editor) {
    var info = getSel(editor);
    return info && info.td
  }
  function ensureTr(editor) {
    var info = getSel(editor);
    return info && info.tr
  }
  var statusChecker = {"\u8868\u683c\u5c5e\u6027":getSel, "\u5220\u9664\u8868\u683c":ensureTd, "\u5220\u9664\u5217":ensureTd, "\u5220\u9664\u884c":ensureTr, "\u5728\u4e0a\u65b9\u63d2\u5165\u884c":ensureTr, "\u5728\u4e0b\u65b9\u63d2\u5165\u884c":ensureTr, "\u5728\u5de6\u4fa7\u63d2\u5165\u5217":ensureTd, "\u5728\u53f3\u4fa7\u63d2\u5165\u5217":ensureTd};
  var showBorderClassName = "ke_show_border", cssTemplate = (UA.ie === 6 ? ["table.%2,", "table.%2 td, table.%2 th,", "{", "border : #d3d3d3 1px dotted", "}"] : [" table.%2,", " table.%2 > tr > td,  table.%2 > tr > th,", " table.%2 > tbody > tr > td, " + " table.%2 > tbody > tr > th,", " table.%2 > thead > tr > td,  table.%2 > thead > tr > th,", " table.%2 > tfoot > tr > td,  table.%2 > tfoot > tr > th", "{", "border : #d3d3d3 1px dotted", "}"]).join(""), cssStyleText = cssTemplate.replace(/%2/g, 
  showBorderClassName), extraDataFilter = {tags:{table:function(element) {
    var cssClass = element.getAttribute("class"), border = parseInt(element.getAttribute("border"), 10);
    if(!border || border <= 0) {
      element.setAttribute("class", S.trim((cssClass || "") + " " + showBorderClassName))
    }
  }}}, extraHTMLFilter = {tags:{table:function(table) {
    var cssClass = table.getAttribute("class"), v;
    if(cssClass) {
      v = S.trim(cssClass.replace(showBorderClassName, ""));
      if(v) {
        table.setAttribute("class", v)
      }else {
        table.removeAttribute("class")
      }
    }
  }}};
  function TablePlugin(config) {
    this.config = config || {}
  }
  S.augment(TablePlugin, {pluginRenderUI:function(editor) {
    editor.addCustomStyle(cssStyleText);
    var dataProcessor = editor.htmlDataProcessor, dataFilter = dataProcessor && dataProcessor.dataFilter, htmlFilter = dataProcessor && dataProcessor.htmlFilter;
    dataFilter.addRules(extraDataFilter);
    htmlFilter.addRules(extraHTMLFilter);
    var self = this, handlers = {"\u8868\u683c\u5c5e\u6027":function() {
      this.hide();
      var info = getSel(editor);
      if(info) {
        DialogLoader.useDialog(editor, "table", self.config, {selectedTable:info.table, selectedTd:info.td})
      }
    }, "\u5220\u9664\u8868\u683c":function() {
      this.hide();
      var selection = editor.getSelection(), startElement = selection && selection.getStartElement(), table = startElement && startElement.closest("table", undefined);
      if(!table) {
        return
      }
      editor.execCommand("save");
      selection.selectElement(table);
      var range = selection.getRanges()[0];
      range.collapse();
      selection.selectRanges([range]);
      var parent = table.parent();
      if(parent[0].childNodes.length === 1 && parent.nodeName() !== "body" && parent.nodeName() !== "td") {
        parent.remove()
      }else {
        table.remove()
      }
      editor.execCommand("save")
    }, "\u5220\u9664\u884c ":function() {
      this.hide();
      editor.execCommand("save");
      var selection = editor.getSelection();
      placeCursorInCell(deleteRows(selection), undefined);
      editor.execCommand("save")
    }, "\u5220\u9664\u5217 ":function() {
      this.hide();
      editor.execCommand("save");
      var selection = editor.getSelection(), element = deleteColumns(selection);
      if(element) {
        placeCursorInCell(element, true)
      }
      editor.execCommand("save")
    }, "\u5728\u4e0a\u65b9\u63d2\u5165\u884c":function() {
      this.hide();
      editor.execCommand("save");
      var selection = editor.getSelection();
      insertRow(selection, true);
      editor.execCommand("save")
    }, "\u5728\u4e0b\u65b9\u63d2\u5165\u884c":function() {
      this.hide();
      editor.execCommand("save");
      var selection = editor.getSelection();
      insertRow(selection, undefined);
      editor.execCommand("save")
    }, "\u5728\u5de6\u4fa7\u63d2\u5165\u5217":function() {
      this.hide();
      editor.execCommand("save");
      var selection = editor.getSelection();
      insertColumn(selection, true);
      editor.execCommand("save")
    }, "\u5728\u53f3\u4fa7\u63d2\u5165\u5217":function() {
      this.hide();
      editor.execCommand("save");
      var selection = editor.getSelection();
      insertColumn(selection, undefined);
      editor.execCommand("save")
    }};
    var children = [];
    S.each(handlers, function(h, name) {
      children.push({content:name})
    });
    editor.addContextMenu("table", function(node) {
      if(S.inArray(Dom.nodeName(node), tableRules)) {
        return true
      }
    }, {width:"120px", children:children, listeners:{click:function(e) {
      var content = e.target.get("content");
      if(handlers[content]) {
        handlers[content].apply(this)
      }
    }, beforeVisibleChange:function(e) {
      if(e.newVal) {
        var self = this, children = self.get("children");
        var editor = self.get("editor");
        S.each(children, function(c) {
          var content = c.get("content");
          if(!statusChecker[content] || statusChecker[content].call(self, editor)) {
            c.set("disabled", false)
          }else {
            c.set("disabled", true)
          }
        })
      }
    }}});
    editor.addButton("table", {mode:Editor.Mode.WYSIWYG_MODE, listeners:{click:function() {
      DialogLoader.useDialog(editor, "table", self.config, {selectedTable:0, selectedTd:0})
    }}, tooltip:"\u63d2\u5165\u8868\u683c"})
  }});
  return TablePlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:50
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/smiley
*/

KISSY.add("editor/plugin/smiley", ["editor", "./overlay", "./button"], function(S, require) {
  var Editor = require("editor");
  var Overlay4E = require("./overlay");
  require("./button");
  var smileyMarkup = '<div class="{prefixCls}editor-smiley-sprite">';
  for(var i = 0;i <= 98;i++) {
    smileyMarkup += '<a href="javascript:void(0)" ' + 'data-icon="http://a.tbcdn.cn/sys/wangwang/smiley/48x48/' + i + '.gif">' + "</a>"
  }
  smileyMarkup += "</div>";
  function Smiley() {
  }
  S.augment(Smiley, {pluginRenderUI:function(editor) {
    var prefixCls = editor.get("prefixCls");
    editor.addButton("smiley", {tooltip:"\u63d2\u5165\u8868\u60c5", checkable:true, listeners:{afterSyncUI:function() {
      var self = this;
      self.on("blur", function() {
        setTimeout(function() {
          if(self.smiley) {
            self.smiley.hide()
          }
        }, 150)
      })
    }, click:function() {
      var self = this, smiley, checked = self.get("checked");
      if(checked) {
        if(!(smiley = self.smiley)) {
          smiley = self.smiley = (new Overlay4E({content:S.substitute(smileyMarkup, {prefixCls:prefixCls}), focus4e:false, width:300, elCls:prefixCls + "editor-popup", zIndex:Editor.baseZIndex(Editor.ZIndexManager.POPUP_MENU), mask:false})).render();
          smiley.get("el").on("click", function(ev) {
            var t = new S.Node(ev.target), icon;
            if(t.nodeName() === "a" && (icon = t.attr("data-icon"))) {
              var img = new S.Node("<img " + 'alt="" src="' + icon + '"/>', null, editor.get("document")[0]);
              editor.insertElement(img)
            }
          });
          smiley.on("hide", function() {
            self.set("checked", false)
          })
        }
        smiley.set("align", {node:this.get("el"), points:["bl", "tl"], overflow:{adjustX:1, adjustY:1}});
        smiley.show()
      }else {
        if(self.smiley) {
          self.smiley.hide()
        }
      }
    }, destroy:function() {
      if(this.smiley) {
        this.smiley.destroy()
      }
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return Smiley
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/flash
*/

KISSY.add("editor/plugin/flash", ["editor", "./flash-common/base-class", "./flash-common/utils", "./fake-objects", "./button"], function(S, require) {
  var Editor = require("editor");
  var FlashBaseClass = require("./flash-common/base-class");
  var flashUtils = require("./flash-common/utils");
  var fakeObjects = require("./fake-objects");
  require("./button");
  var CLS_FLASH = "ke_flash", TYPE_FLASH = "flash";
  function FlashPlugin(config) {
    this.config = config || {}
  }
  S.augment(FlashPlugin, {pluginRenderUI:function(editor) {
    fakeObjects.init(editor);
    var dataProcessor = editor.htmlDataProcessor, dataFilter = dataProcessor.dataFilter;
    dataFilter.addRules({tags:{object:function(element) {
      var classId = element.getAttribute("classid"), i;
      if(!classId) {
        var childNodes = element.childNodes;
        for(i = 0;i < childNodes.length;i++) {
          if(childNodes[i].nodeName === "embed") {
            if(!flashUtils.isFlashEmbed(childNodes[i][i])) {
              return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true)
            }else {
              return null
            }
          }
        }
        return null
      }
      return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true)
    }, embed:function(element) {
      if(flashUtils.isFlashEmbed(element)) {
        return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true)
      }else {
        return null
      }
    }}}, 5);
    var flashControl = new FlashBaseClass({editor:editor, cls:CLS_FLASH, type:TYPE_FLASH, pluginConfig:this.config, bubbleId:"flash", contextMenuId:"flash", contextMenuHandlers:{"Flash\u5c5e\u6027":function() {
      var selectedEl = this.get("editorSelectedEl");
      if(selectedEl) {
        flashControl.show(selectedEl)
      }
    }}});
    this.flashControl = flashControl;
    editor.addButton("flash", {tooltip:"\u63d2\u5165Flash", listeners:{click:function() {
      flashControl.show()
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return FlashPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 13 14:56
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/flash-common/base-class
*/

KISSY.add("editor/plugin/flash-common/base-class", ["./utils", "base", "editor", "../dialog-loader", "../bubble", "../contextmenu"], function(S, require) {
  var flashUtils = require("./utils");
  var Base = require("base");
  var Editor = require("editor");
  var Node = S.Node;
  var DialogLoader = require("../dialog-loader");
  require("../bubble");
  require("../contextmenu");
  var tipHTML = " <a " + 'class="{prefixCls}editor-bubble-url" ' + 'target="_blank" ' + 'href="#">{label}</a>   |   ' + ' <span class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-change">\u7f16\u8f91</span>   |   ' + ' <span class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-remove">\u5220\u9664</span>';
  return Base.extend({initializer:function() {
    var self = this, cls = self.get("cls"), editor = self.get("editor"), prefixCls = editor.get("prefixCls"), children = [], bubbleId = self.get("bubbleId"), contextMenuId = self.get("contextMenuId"), contextMenuHandlers = self.get("contextMenuHandlers");
    S.each(contextMenuHandlers, function(h, content) {
      children.push({content:content})
    });
    editor.addContextMenu(contextMenuId, "." + cls, {width:"120px", children:children, listeners:{click:function(e) {
      var content = e.target.get("content");
      if(contextMenuHandlers[content]) {
        contextMenuHandlers[content].call(this)
      }
    }}});
    editor.addBubble(bubbleId, function(el) {
      return el.hasClass(cls, undefined) && el
    }, {listeners:{afterRenderUI:function() {
      var bubble = this, el = bubble.get("contentEl");
      el.html(S.substitute(tipHTML, {label:self.get("label"), prefixCls:prefixCls}));
      var tipUrlEl = el.one("." + prefixCls + "editor-bubble-url"), tipChangeEl = el.one("." + prefixCls + "editor-bubble-change"), tipRemoveEl = el.one("." + prefixCls + "editor-bubble-remove");
      Editor.Utils.preventFocus(el);
      tipChangeEl.on("click", function(ev) {
        self.show(bubble.get("editorSelectedEl"));
        ev.halt()
      });
      tipRemoveEl.on("click", function(ev) {
        if(S.UA.webkit) {
          var r = editor.getSelection().getRanges(), r0 = r && r[0];
          if(r0) {
            r0.collapse(true);
            r0.select()
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
          self._updateTip(tipUrlEl, a)
        }
      })
    }}});
    editor.docReady(function() {
      editor.get("document").on("dblclick", self._dbClick, self)
    })
  }, _getFlashUrl:function(r) {
    return flashUtils.getUrl(r)
  }, _updateTip:function(tipUrlElEl, selectedFlash) {
    var self = this, editor = self.get("editor"), r = editor.restoreRealElement(selectedFlash);
    if(!r) {
      return
    }
    var url = self._getFlashUrl(r);
    tipUrlElEl.attr("href", url)
  }, _dbClick:function(ev) {
    var self = this, t = new Node(ev.target);
    if(t.nodeName() === "img" && t.hasClass(self.get("cls"), undefined)) {
      self.show(t);
      ev.halt()
    }
  }, show:function(selectedEl) {
    var self = this, editor = self.get("editor");
    DialogLoader.useDialog(editor, self.get("type"), self.get("pluginConfig"), selectedEl)
  }}, {ATTRS:{cls:{}, type:{}, label:{value:"\u5728\u65b0\u7a97\u53e3\u67e5\u770b"}, bubbleId:{}, contextMenuId:{}, contextMenuHandlers:{}}})
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/flash-common/utils
*/

KISSY.add("editor/plugin/flash-common/utils", ["swf"], function(S, require) {
  var SWF = require("swf");
  var Dom = S.DOM, flashUtils = {insertFlash:function(editor, src, attrs, _cls, _type) {
    var nodeInfo = flashUtils.createSWF({src:src, attrs:attrs, document:editor.get("document")[0]}), real = nodeInfo.el, substitute = editor.createFakeElement(real, _cls || "ke_flash", _type || "flash", true, nodeInfo.html, attrs);
    editor.insertElement(substitute);
    return substitute
  }, isFlashEmbed:function(element) {
    return Dom.attr(element, "type") === "application/x-shockwave-flash" || /\.swf(?:$|\?)/i.test(Dom.attr(element, "src") || "")
  }, getUrl:function(r) {
    return SWF.getSrc(r)
  }, createSWF:function(cfg) {
    var render = Dom.create('<div style="' + "position:absolute;left:-9999px;top:-9999px;" + '"></div>', undefined, cfg.document);
    cfg.htmlMode = "full";
    Dom.append(render, cfg.document.body);
    cfg.render = render;
    var swf = new SWF(cfg);
    Dom.remove(render);
    return{el:S.all(swf.get("el")), html:swf.get("html")}
  }};
  return flashUtils
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:52
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/xiami-music
*/

KISSY.add("editor/plugin/xiami-music", ["editor", "./flash-common/base-class", "./flash-common/utils", "./fake-objects", "./button"], function(S, require) {
  var Editor = require("editor");
  var FlashBaseClass = require("./flash-common/base-class");
  var flashUtils = require("./flash-common/utils");
  var fakeObjects = require("./fake-objects");
  require("./button");
  var CLS_XIAMI = "ke_xiami", TYPE_XIAMI = "xiami-music";
  function XiamiMusic() {
    XiamiMusic.superclass.constructor.apply(this, arguments)
  }
  S.extend(XiamiMusic, FlashBaseClass, {_updateTip:function(tipUrlEl, selectedFlash) {
    var self = this, editor = self.get("editor"), r = editor.restoreRealElement(selectedFlash);
    if(r) {
      tipUrlEl.html(selectedFlash.attr("title"));
      tipUrlEl.attr("href", self._getFlashUrl(r))
    }
  }});
  function XiamiMusicPlugin(config) {
    this.config = config || {}
  }
  S.augment(XiamiMusicPlugin, {pluginRenderUI:function(editor) {
    fakeObjects.init(editor);
    var dataProcessor = editor.htmlDataProcessor, dataFilter = dataProcessor && dataProcessor.dataFilter;
    function checkXiami(url) {
      return/xiami\.com/i.test(url)
    }
    if(dataFilter) {
      dataFilter.addRules({tags:{object:function(element) {
        var title = element.getAttribute("title"), i, c, classId = element.getAttribute("classid");
        var childNodes = element.childNodes;
        if(!classId) {
          for(i = 0;i < childNodes.length;i++) {
            c = childNodes[i];
            if(c.nodeName === "embed") {
              if(!flashUtils.isFlashEmbed(c)) {
                return null
              }
              if(checkXiami(c.attributes.src)) {
                return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {title:title})
              }
            }
          }
          return null
        }
        for(i = 0;i < childNodes.length;i++) {
          c = childNodes[i];
          if(c.nodeName === "param" && c.getAttribute("name").toLowerCase() === "movie") {
            if(checkXiami(c.getAttribute("value") || c.getAttribute("VALUE"))) {
              return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {title:title})
            }
          }
        }
      }, embed:function(element) {
        if(flashUtils.isFlashEmbed(element) && checkXiami(element.getAttribute("src"))) {
          return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {title:element.getAttribute("title")})
        }
      }}}, 4)
    }
    var xiamiMusic = new XiamiMusic({editor:editor, cls:CLS_XIAMI, type:TYPE_XIAMI, bubbleId:"xiami", pluginConfig:this.config, contextMenuId:"xiami", contextMenuHandlers:{"\u867e\u7c73\u5c5e\u6027":function() {
      var selectedEl = this.get("editorSelectedEl");
      if(selectedEl) {
        xiamiMusic.show(selectedEl)
      }
    }}});
    editor.addButton("xiamiMusic", {tooltip:"\u63d2\u5165\u867e\u7c73\u97f3\u4e50", listeners:{click:function() {
      xiamiMusic.show()
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return XiamiMusicPlugin
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:51
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/video
*/

KISSY.add("editor/plugin/video", ["editor", "./flash-common/utils", "./flash-common/base-class", "./fake-objects", "./button"], function(S, require) {
  var Editor = require("editor");
  var flashUtils = require("./flash-common/utils");
  var FlashBaseClass = require("./flash-common/base-class");
  var fakeObjects = require("./fake-objects");
  require("./button");
  var CLS_VIDEO = "ke_video", TYPE_VIDEO = "video";
  function video(config) {
    this.config = config
  }
  S.augment(video, {pluginRenderUI:function(editor) {
    fakeObjects.init(editor);
    var dataProcessor = editor.htmlDataProcessor, dataFilter = dataProcessor && dataProcessor.dataFilter;
    var provider = [];
    function getProvider(url) {
      for(var i = 0;i < provider.length;i++) {
        var p = provider[i];
        if(p.reg.test(url)) {
          return p
        }
      }
      return undefined
    }
    var videoCfg = this.config;
    if(videoCfg.providers) {
      provider.push.apply(provider, videoCfg.providers)
    }
    videoCfg.getProvider = getProvider;
    if(dataFilter) {
      dataFilter.addRules({tags:{object:function(element) {
        var classId = element.getAttribute("classid"), i;
        var childNodes = element.childNodes;
        if(!classId) {
          for(i = 0;i < childNodes.length;i++) {
            if(childNodes[i].nodeName === "embed") {
              if(!flashUtils.isFlashEmbed(childNodes[i])) {
                return null
              }
              if(getProvider(childNodes[i].getAttribute("src"))) {
                return dataProcessor.createFakeParserElement(element, CLS_VIDEO, TYPE_VIDEO, true)
              }
            }
          }
          return null
        }
        for(i = 0;i < childNodes.length;i++) {
          var c = childNodes[i];
          if(c.nodeName === "param" && c.getAttribute("name").toLowerCase() === "movie") {
            if(getProvider(c.getAttribute("value") || c.getAttribute("VALUE"))) {
              return dataProcessor.createFakeParserElement(element, CLS_VIDEO, TYPE_VIDEO, true)
            }
          }
        }
      }, embed:function(element) {
        if(!flashUtils.isFlashEmbed(element)) {
          return null
        }
        if(getProvider(element.getAttribute("src"))) {
          return dataProcessor.createFakeParserElement(element, CLS_VIDEO, TYPE_VIDEO, true)
        }
      }}}, 4)
    }
    var flashControl = new FlashBaseClass({editor:editor, cls:CLS_VIDEO, type:TYPE_VIDEO, pluginConfig:this.config, bubbleId:"video", contextMenuId:"video", contextMenuHandlers:{"\u89c6\u9891\u5c5e\u6027":function() {
      var selectedEl = this.get("editorSelectedEl");
      if(selectedEl) {
        flashControl.show(selectedEl)
      }
    }}});
    editor.addButton("video", {tooltip:"\u63d2\u5165\u89c6\u9891", listeners:{click:function() {
      flashControl.show()
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return video
});

/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:46
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/drag-upload
*/

KISSY.add("editor/plugin/drag-upload", ["editor", "event"], function(S, require) {
  var Editor = require("editor");
  var Event = require("event");
  var Node = S.Node, Utils = Editor.Utils, Dom = S.DOM;
  function dragUpload(config) {
    this.config = config || {}
  }
  S.augment(dragUpload, {pluginRenderUI:function(editor) {
    var cfg = this.config, fileInput = cfg.fileInput || "Filedata", sizeLimit = cfg.sizeLimit || Number.MAX_VALUE, serverParams = cfg.serverParams || {}, serverUrl = cfg.serverUrl || "", suffix = cfg.suffix || "png,jpg,jpeg,gif", suffixReg = new RegExp(suffix.split(/,/).join("|") + "$", "i"), inserted = {}, startMonitor = false;
    function nodeInsert(ev) {
      var oe = ev.originalEvent, t = oe.target;
      if(Dom.nodeName(t) === "img" && t.src.match(/^file:\/\//)) {
        inserted[t.src] = t
      }
    }
    editor.docReady(function() {
      var document = editor.get("document")[0];
      Event.on(document, "dragenter", function() {
        if(!startMonitor) {
          Event.on(document, "DOMNodeInserted", nodeInsert);
          startMonitor = true
        }
      });
      Event.on(document, "drop", function(ev) {
        Event.remove(document, "DOMNodeInserted", nodeInsert);
        startMonitor = false;
        ev.halt();
        ev = ev.originalEvent;
        var archor, ap;
        if(!S.isEmptyObject(inserted)) {
          S.each(inserted, function(el) {
            if(Dom.nodeName(el) === "img") {
              archor = el.nextSibling;
              ap = el.parentNode;
              Dom.remove(el)
            }
          });
          inserted = {}
        }else {
          ap = document.elementFromPoint(ev.clientX, ev.clientY);
          archor = ap.lastChild
        }
        var dt = ev.dataTransfer;
        dt.dropEffect = "copy";
        var files = dt.files;
        if(!files) {
          return
        }
        for(var i = 0;i < files.length;i++) {
          var file = files[i], name = file.name, size = file.size;
          if(!name.match(suffixReg)) {
            continue
          }
          if(size / 1E3 > sizeLimit) {
            continue
          }
          var img = new Node("<img " + 'src="' + Utils.debugUrl("theme/tao-loading.gif") + '"/>');
          var nakeImg = img[0];
          ap.insertBefore(nakeImg, archor);
          var np = nakeImg.parentNode, npName = Dom.nodeName(np);
          if(npName === "head" || npName === "html") {
            Dom.insertBefore(nakeImg, document.body.firstChild)
          }
          fileUpload(file, img)
        }
      })
    });
    if(window.XMLHttpRequest && !XMLHttpRequest.prototype.sendAsBinary) {
      XMLHttpRequest.prototype.sendAsBinary = function(dataStr, contentType) {
        var bb;
        if(window.BlobBuilder) {
          bb = new window.BlobBuilder
        }else {
          bb = window.WebKitBlobBuilder()
        }
        var len = dataStr.length;
        var data = new window.Uint8Array(len);
        for(var i = 0;i < len;i++) {
          data[i] = dataStr.charCodeAt(i)
        }
        bb.append(data.buffer);
        this.send(bb.getBlob(contentType))
      }
    }
    function fileUpload(file, img) {
      var reader = new window.FileReader;
      reader.onload = function(ev) {
        var fileName = file.name, fileData = ev.target.result, boundary = "----kissy-editor-yiminghe", xhr = new XMLHttpRequest;
        xhr.open("POST", serverUrl, true);
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4) {
            if(xhr.status === 200 || xhr.status === 304) {
              if(xhr.responseText !== "") {
                var info = S.parseJson(xhr.responseText);
                img[0].src = info.imgUrl
              }
            }else {
              window.alert("\u670d\u52a1\u5668\u7aef\u51fa\u9519\uff01");
              img.remove()
            }
            xhr.onreadystatechange = null
          }
        };
        var body = "\r\n--" + boundary + "\r\n";
        body += "Content-Disposition: form-data; name='" + fileInput + "'; filename='" + encodeURIComponent(fileName) + "'\r\n";
        body += "Content-Type: " + (file.type || "application/octet-stream") + "\r\n\r\n";
        body += fileData + "\r\n";
        serverParams = Editor.Utils.normParams(serverParams);
        for(var p in serverParams) {
          body += "--" + boundary + "\r\n";
          body += "Content-Disposition: form-data; name='" + p + "'\r\n\r\n";
          body += serverParams[p] + "\r\n"
        }
        body += "--" + boundary + "--";
        xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary=" + boundary);
        xhr.sendAsBinary("Content-Type: multipart/form-data; boundary=" + boundary + "\r\nContent-Length: " + body.length + "\r\n" + body + "\r\n");
        reader.onload = null
      };
      reader.readAsBinaryString(file)
    }
  }});
  return dragUpload
});


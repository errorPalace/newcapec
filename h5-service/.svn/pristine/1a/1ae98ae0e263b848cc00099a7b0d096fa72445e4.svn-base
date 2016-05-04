KISSY.use("editor", function (S, Editor) {
    var cfg ={
        // 是否初始聚焦
        fromTextarea:'#ks-editor-textarea',
        focused: true,
        attachForm: true,
        baseZIndex: 10000

    };

    var plugins = ("source-area" +
        ",code" +
        ",separator" +
        ",bold" +
        ",italic," +
        "font-family," +
        "font-size," +
        "strike-through," +
        "underline," +
        "separator," +
        "checkbox-source-area" +
        ",image" +
        ",link" +
        ",fore-color" +
        ",back-color" +
        ",resize" +
        ",draft" +
        ",undo" +
        ",indent" +
        ",outdent" +
        ",unordered-list" +
        ",ordered-list" +
        ",element-path" +
        ",page-break" +
        ",preview" +
        ",maximize" +
        ",remove-format" +
        ",heading" +
        ",justify-left" +
        ",justify-center" +
        ",justify-right" +
        ",table" +
        ",smiley" +
        ",drag-upload").split(",");

    var fullPlugins = [];

    S.each(plugins, function (p, i) {
        fullPlugins[i] = "editor/plugin/" + p;
    });

    var pluginConfig = {
        link: {
            target: "_blank"
        },
        "image": {
            defaultMargin: 0,
            //remote:false,
            upload: {
                serverUrl: "${pageContext.request.contextPath}/campus/info/upload.action",
                suffix: "png,jpg,jpeg,gif",
                fileInput: "filedata",
                sizeLimit: 1000
            }
        },
        "font-size": {
            matchElWidth: false,
            menu: {
                children: [
                    {
                        value: "14px",
                        textContent: "标准",
                        elAttrs: {
                            style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                        },
                        content: " <span style='font-size:14px'>标准</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>14px</span>"
                    },
                    {
                        value: "16px",
                        textContent: "大",
                        elAttrs: {
                            style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                        },
                        content: "" +
                            " <span style='font-size:16px'>大</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>16px</span>"
                    },
                    {
                        value: "18px",
                        textContent: "特大",
                        elAttrs: {
                            style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                        },
                        content: "" +
                            " <span style='font-size:18px'>特大</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>18px</span>"
                    },
                    {
                        value: "20px",
                        textContent: "极大",
                        elAttrs: {
                            style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                        },
                        content: "" +
                            " <span style='font-size:20px'>极大</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>20px</span>"
                    }
                ],
                width: "125px"
            }
        },
        "draft": {
            // 当前编辑器的历史是否要单独保存到一个键值而不是公用
            // saveKey:"xxx",
            interval: 5,
            limit: 10,
            "helpHTML": "<div " +
                "style='width:200px;'>" +
                "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，" +
                "如果发现内容丢失，" +
                "请选择恢复编辑历史</div></div>"
        },
        "resize": {
            //direction:["y"]
        }
    };

    KISSY.use(fullPlugins, function (S) {
        var args = S.makeArray(arguments);

        args.shift();

        S.each(args, function (arg, i) {
            var argStr = plugins[i], cfg;
            if (cfg = pluginConfig[argStr]) {
                args[i] = new arg(cfg);
            }
        });

        cfg.plugins = args;
        var editor;
        if (cfg.fromTextarea) {
            editor = Editor.decorate(cfg.fromTextarea, cfg);
        } else {
            editor = new Editor(cfg);
            editor.render();
        }

        window.newEditor = editor;

    });

});
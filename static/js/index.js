new Vue({
    el: '#app',
    template: '#myComponent',
    data: {
        logo: {
            logoImgSrc: "./static/image/logo/flyreadlogo.png",
            logoMiniImgSrc: "./static/image/logo/flyreadlogo-min.png"
        },
        filterText: '',
        dirTree: {
            dirTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        },
        tabs: {
            tabName: null,
            tabsData: [],
            tabIndex: 0,
        },
        totalEditors: {},
        editor: {
            editorWidth: "100%",
            editorHeight: $(document).height() - 160,
        },
        attrTableData: [],
        structureTree: {
            structureTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        },
        leftMenuCollapsed: false,
        rightMenuCollapsed: true,
        maxContent: false,
        uploadDialogVisible: false,
        settingDialogVisible: false,
        previewDialogVisible: false,
        previewPageName: "",
        previewPagePath: "",
        basePath: "../../../programManagement",
        optionsFilePath: "../../../programManagement/static/json/options.json",
        options: {
            dirBasePath: "",
            previewPagePath: "",
            editor: {
                language: {
                    value: "",
                    options: [{
                        value: "",
                        label: ""
                    }]
                },
                theme: {
                    value: "",
                    options: [{
                        value: "",
                        label: ""
                    }]
                },
                fontSize: {
                    value: null,
                },
                readOnly: {
                    default: [],
                    options: [{
                        value: "",
                        label: ""
                    }]
                }
            }
        }
    },
    methods: {
        message(message, type) {
            this.$message({
                message: message,
                type: type
            });
        },
        //目录和文件操作
        getDir() {
            $.ajax({
                type: "post",
                url: "./api/php/getAllDir.php",
                data: {
                    path: this.basePath + this.options.dirBasePath,
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded ",
                success: function(result) {
                    if (result.success) {
                        this.dirTree.dirTreeData = this.nodeDataSort(result.data);
                    } else {
                        this.message("请求失败！", "error")
                    }
                }.bind(this),
            });
        },
        getFile(path, fn) {
            $.ajax({
                type: "post",
                url: "./api/php/fileOperate.php",
                data: {
                    operate: "read",
                    filePath: path
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded ",
                success: function(result) {
                    if (result.success) {
                        if (fn) {
                            fn(result)
                        }
                    } else {
                        this.message("请求失败！", "error");
                    }
                }.bind(this),
            });
        },
        saveFile(path, value, fn) {
            $.ajax({
                type: "post",
                url: "./api/php/fileOperate.php",
                data: {
                    operate: "write",
                    filePath: path,
                    fileString: value
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded ",
                success: function(result) {
                    if (result.success) {
                        this.message("保存成功！", "success");
                        if (fn) {
                            fn();
                        }
                    } else {
                        this.message("保存失败！", "error");
                    }
                }.bind(this),
            });
        },
        //menu
        leftMenuCollapse() {
            this.leftMenuCollapsed = !this.leftMenuCollapsed;
        },
        rightMenuCollapse() {
            this.rightMenuCollapsed = !this.rightMenuCollapsed;
        },
        maxContentContainer() {
            if (this.maxContent) {
                this.leftMenuCollapsed = false;
                this.rightMenuCollapsed = false;
                this.maxContent = false;
            } else {
                this.leftMenuCollapsed = true;
                this.rightMenuCollapsed = true;
                this.maxContent = true;
            }
        },
        //dirTree
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        nodeDataSort(nodeData) {
            var fileArray = [];
            var folderArray = [];
            nodeData.forEach(function(value) {
                if (value.children) {
                    folderArray.push(value);
                } else {
                    fileArray.push(value);
                }
            });
            nodeData = folderArray.concat(fileArray);
            return nodeData;
        },
        getNodeData(nodeData, node, a) {
            if (!node.isLeaf) {
                nodeData.children = this.nodeDataSort(nodeData.children);
                node.setData(nodeData);
            }
        },
        dirTreeExpand() {
            this.dirTreeExpand = !this.dirTreeExpand;
        },
        //tab
        clickTab(tab) {
            for (var i = 0; i < this.tabs.tabsData.length; i++) {
                if (this.tabs.tabsData[i].name == this.tabs.tabName) {
                    if (this.tabs.tabsData[i].type == "xml") {
                        this.rightMenuCollapsed = false;
                        this.getStructureTreeData(this.tabs.tabsData[i].path);
                    } else {
                        this.rightMenuCollapsed = true;
                        this.structureTree.structureTreeData = [];
                        this.attrTableData = [];
                    }
                }
            }
        },
        addTab(tabData, node) {
            if (tabData && node.isLeaf) {
                var haveThisTab = false;
                for (var i = 0; i < this.tabs.tabsData.length; i++) {
                    for (var key in this.tabs.tabsData[i]) {
                        if (key == "path") {
                            if (this.tabs.tabsData[i][key] == tabData.path) {
                                haveThisTab = true;
                            }
                        }
                    }
                }
                if (!haveThisTab) {
                    var tabIndex = ++this.tabs.tabIndex;
                    this.tabs.tabsData.push({
                        title: tabData.label,
                        id: "tab" + tabIndex,
                        name: tabData.label,
                        type: tabData.type,
                        readOnly: tabData.readOnly,
                        build: tabData.type == "xml" ? true : false,
                        preview: tabData.type == "xml" || tabData.type == "html" ? true : false,
                        path: tabData.path,
                        content: ""
                    });
                    this.tabs.tabName = tabData.label;
                    this.getFile(tabData.path, function(result) {
                        for (var i = 0; i < this.tabs.tabsData.length; i++) {
                            if (this.tabs.tabsData[i].path == tabData.path) {
                                this.tabs.tabsData[i].content = result.data.fileString;
                                var value = result.data.fileString;
                                var id = this.tabs.tabsData[i].id;
                                var options = {
                                    language: this.tabs.tabsData[i].type,
                                };
                                this.createEditor(id, options, value);
                            }
                        }
                    }.bind(this));
                } else {
                    this.tabs.tabName = tabData.label;
                }
                if (tabData.type == "xml") {
                    this.rightMenuCollapsed = false;
                    this.getStructureTreeData(tabData.path);
                } else {
                    this.rightMenuCollapsed = true;
                    this.structureTree.structureTreeData = [];
                    this.attrTableData = [];
                }
            }
        },
        removeTab(targetName) {
            let tabs = this.tabs.tabsData;
            let activeName = this.tabs.tabName;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.tabs.tabName = activeName;
            this.tabs.tabsData = tabs.filter(tab => tab.name !== targetName);
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].name == targetName) {
                    delete this.totalEditors[tabs[i].id]
                }
            }
        },
        //editor
        createEditor(id, options, value) {
            ace.config.loadModule("ace/ext/textarea", function() {
                var event = ace.require("ace/lib/event");
                var areas = document.getElementsByTagName("textarea");
                for (var i = 0; i < areas.length; i++) {
                    event.addListener(areas[i], "click", function(e) {
                        if (e.detail == 3) {
                            ace.transformTextarea(e.target, options.ace);
                        }
                    });
                }
                var textarea = document.querySelector("#" + id);
                var editor = ace.require("ace/ext/textarea").transformTextarea(textarea);
                ace.require("ace/ext/language_tools");
                this.totalEditors[id] = editor;
                if (!value) {
                    value = null;
                }
                this.initEditor(id, options, value);
            }.bind(this));
        },
        setEditorOptions(id, options) {
            var editor = this.totalEditors[id];
            for (var key in options) {
                switch (key) {
                    case "language":
                        options[key] = "ace/mode/" + options[key];
                        editor.session.setMode(options[key]);
                        break;
                    case "theme":
                        options[key] = "ace/theme/" + options[key];
                    default:
                        editor.$setOption(key, options[key]);
                        break;
                }
            }
        },
        initEditor(id, options, value) {
            var editor = this.totalEditors[id];
            var defaultOpatins = {
                language: this.options.editor.language.value,
                theme: this.options.editor.theme.value,
                showGutter: true,
                fontSize: this.options.editor.fontSize.value + "px",
                wrap: false,
                showPrintMargin: false,
                useSoftTabs: false,
                showInvisibles: false,
                readOnly: true,
                autocompletion: {
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                }
            }
            if (!options) {
                options = defaultOpatins;
            } else {
                options = Object.assign(defaultOpatins, options)
            }
            editor.$blockScrolling = Infinity
            for (var key in options) {
                switch (key) {
                    case "autocompletion":
                        editor.setOptions(options[key]);
                        break;
                    case "language":
                        switch (options[key]) {
                            case "js":
                                options[key] = "ace/mode/javascript";
                                break;
                            case "htm":
                                options[key] = "ace/mode/html";
                                break;
                            case "xsd":
                            case "svg":
                                options[key] = "ace/mode/xml";
                                break
                            default:
                                options[key] = "ace/mode/" + options[key];
                                break
                        }
                        editor.session.setMode(options[key]);
                        break;
                    case "theme":
                        options[key] = "ace/theme/" + options[key];
                    default:
                        editor.$setOption(key, options[key]);
                        break;
                }
            }
            if (value) {
                editor.setValue(value);
                editor.gotoLine(0)
            }
        },
        editorSearch(id) {
            if (this.totalEditors[id]) {
                var editor = this.totalEditors[id];
                editor.execCommand('find');
            }
        },
        //edit code
        showEditor(id, options) {
            if (!this.totalEditors[id]) {
                this.createEditor(id, options);
            } else {

            }
        },
        editCode(id, options) {
            options.theme = "monokai";
            this.setEditorOptions(id, options);
        },
        saveEditCode(id, path) {
            if (this.totalEditors[id]) {
                var value = this.totalEditors[id].getValue();
                var options = { theme: "clouds", readOnly: true }
                this.setEditorOptions(id, options);
                this.saveFile(path, value)
            }
        },
        buildPage(name, path) {
            $.ajax({
                type: "post",
                url: "./api/php/xmlOperate.php",
                data: {
                    operate: "create",
                    filePath: path
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded ",
                success: function(result) {
                    if (result.success) {
                        this.message("生成成功！", "success");
                        console.log(result.data)
                    } else {
                        this.message("生成失败！", "error");
                    }
                }.bind(this),
            });
        },
        previewPage(item) {
            this.previewDialogVisible = true;

            switch (item.type) {
                case "xml":
                    this.previewPageName = item.name;
                    this.previewPagePath = this.options.previewPagePath;
                    if (window.frames["buttonLabel"]) {
                        alert(window.frames["buttonLabel"].name)
                    }
                    break;
                case "html":
                    var oldPageName = this.previewPageName;
                    this.previewPageName = "";
                    this.previewPagePath = item.path;
                    if (window.frames[oldPageName]) {
                        window.frames[oldPageName].location.reload();
                    }
                    break;
                default:
                    break;
            }
            //console.log(oldPageName)

            //previewPage.window.location.reload()
        },
        //structureTree
        getStructureTreeData(path) {
            $.ajax({
                type: "post",
                url: "./api/php/xmlOperate.php",
                data: {
                    operate: "read",
                    filePath: "../../../programManagement/program/lcs/baseXml/componentManager/componentLibrary.xml"
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded ",
                success: function(result) {
                    if (result.success) {
                        console.log(result.data)
                        if (fn) {
                            fn(result)
                        }
                    } else {
                        this.message("请求失败！", "error");
                    }
                }.bind(this),
            });
        },
        //attrTable
        addAttribute() {
            var newAttr = {
                key: "",
                value: ""
            }
            this.attrTableData.push(newAttr)
        },
        saveAttribute() {
            this.message("保存成功！", "success")
        },
        //options
        settingOptions() {
            this.settingDialogVisible = true;
        },
        saveSetting() {
            this.saveFile(this.optionsFilePath, JSON.stringify(this.options));
            this.initApp();
        },
        //初始化
        initApp() {
            this.initSetting(function() {
                this.initData();
                this.initLayout();
                this.initDirTree();
            }.bind(this));
        },
        initSetting(fn) {
            this.getFile(this.optionsFilePath, function(result) {
                this.options = JSON.parse(result.data.fileString);
                if (fn) {
                    fn()
                }
            }.bind(this))
        },
        initData() {
            this.filterText = '';
            this.dirTree = {
                dirTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            };
            this.tabs = {
                tabName: null,
                tabsData: [],
                tabIndex: 0,
            };
            this.totalEditors = {};
            this.attrTableData = [];
            this.structureTree = {
                structureTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        initLayout() {
            this.leftMenuCollapsed = false;
            this.rightMenuCollapsed = true;
            this.maxContent = false;
            this.uploadDialogVisible = false;
            this.settingDialogVisible = false;
            this.previewDialogVisible = false;
        },
        initDirTree() {
            this.getDir();
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    mounted() {
        this.initApp();
        window.onresize = function() {
            this.editor.editorHeight = $(document).height() - 160;
        }.bind(this)
    }
})
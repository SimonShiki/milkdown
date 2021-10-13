export default"# 与编辑器交互\n\n## DOM 节点的注册\n\n默认情况下，Milkdown 会基于 document.body 创建一个编辑器。当然你也可以通过下面方法来指定要挂载编辑器的 DOM 节点：\n\n```typescript\nimport { rootCtx } from '@milkdown/core';\n\nEditor.make().config((ctx) => {\n    ctx.set(rootCtx, document.querySelector('#editor'));\n});\n```\n\n## 编辑器默认值类型的设定\n\n### Markdown\n\n你可以设置符合 Markdown 语法的字符串作为编辑器的默认值类型。\n\n```typescript\nimport { defaultValueCtx } from '@milkdown/core';\n\nconst defaultValue = '# Hello milkdown';\nEditor.make().config((ctx) => {\n    ctx.set(defaultValueCtx, defaultValue);\n});\n```\n\n接着，编辑器将会对默认值进行相应渲染。\n\n### Dom 节点\n\n你也可以通过使用 HTML 作为编辑器的默认值类型。\n\n假设我们编写了下面的一段 HTML 代码：\n\n```html\n<div id=\"pre\">\n    <h1>Hello milkdown!</h1>\n</div>\n```\n\n紧接着，我们需要明确默认值的类型为 HTML，进行编辑器的渲染配置：\n\n```typescript\nimport { defaultValueCtx } from '@milkdown/core';\n\nconst defaultValue = {\n    type: 'html',\n    dom: document.querySelector('#pre'),\n};\nEditor.make().config((ctx) => {\n    ctx.set(defaultValueCtx, defaultValue);\n});\n```\n\n### JSON\n\n你也可以使用 JSON 对象作为默认值。\n\n这个 JSON 对象可以通过监听器 [lister-plugin](https://www.npmjs.com/package/@milkdown/plugin-listener) 进行获取，例如：\n\n```typescript\nimport { listener, listenerCtx } from '@milkdown/plugin-listener';\n\nlet jsonOutput;\nconst myListener = {\n    doc: [\n        (node) => {\n            jsonOutput = node.toJSON();\n        },\n    ],\n};\n\nEditor.make()\n    .config((ctx) => {\n        ctx.set(listenerCtx, myListener);\n    })\n    .use(listener);\n```\n\n接着，我们可以使用获取到的 `jsonOutput` 作为编辑器的默认值配置：\n\n```typescript\nimport { defaultValueCtx } from '@milkdown/core';\n\nconst defaultValue = {\n    type: 'json',\n    value: jsonOutput,\n};\nEditor.make().config((ctx) => {\n    ctx.set(defaultValueCtx, defaultValue);\n});\n```\n\n---\n\n## 添加监听器\n\n正如上半部分所提到的那样，你可以通过在编辑器添加监听器，来获取你所需要的值。\n\n这里监听器分为以下两种：\n\n### Markdown 监听器\n\n你可以添加 Markdown 监听器来获取你需要的 markdown 字符串的输出。\n\n你可以添加任意多个监听器，所有的监听器将会一次改动中被触发。\n\n```typescript\nimport { listener, listenerCtx } from '@milkdown/plugin-listener';\n\nlet output = '';\nconst listener = {\n    markdown: [\n        (getMarkdown) => {\n            if (needGetOutput) {\n                output = getMarkdown();\n            }\n        },\n        (getMarkdown) => {\n            if (needLog) {\n                console.log(getMarkdown());\n            }\n        },\n    ],\n};\n\nEditor.make()\n    .config((ctx) => {\n        ctx.set(listenerCtx, listener);\n    })\n    .use(listener);\n```\n\n### Doc 监听器\n\n你也可以通过监听 [raw prosemirror document node](https://prosemirror.net/docs/ref/#model.Node)，来进行功能的实现。\n\n```typescript\nimport { listener, listenerCtx } from '@milkdown/plugin-listener';\n\nlet jsonOutput;\n\nconst listener = {\n    docs: [\n        (node) => {\n            jsonOutput = node.toJSON();\n        },\n    ],\n};\n\nEditor.make()\n    .config((ctx) => {\n        ctx.set(listenerCtx, listener);\n    })\n    .use(listener);\n```\n\n---\n\n## 只读模式\n\n你可以通过设定 `editable` 属性来设置编辑器是否只读\n\n```typescript\nimport { editorViewOptionsCtx } from '@milkdown/core';\n\nlet readonly = false;\n\nconst editable: () => !readonly;\n\nEditor.make().config((ctx) => {\n    ctx.set(editorViewOptionsCtx, { editable });\n});\n\n// set to readonly after 5 secs.\nsetTimeout(() => {\n    readonly = true;\n}, 5000);\n```\n\n---\n\n## 使用 Action\n\n你可以通过使用 Action 来获取编辑器运行时的上下文。\n\n例如，通过 Action 获取 Markdown 字符串：\n\n```typescript\nimport { Editor, editorViewCtx, serializerCtx } from '@milkdown/core';\n\nasync function playWithEditor() {\n    const editor = await Editor.make().use(commonmark).create();\n\n    const getMarkdown = () =>\n        editor.action((ctx) => {\n            const editorView = ctx.get(editorViewCtx);\n            const serializer = ctx.get(serializerCtx);\n            return serializer(editorView.state.doc);\n        });\n\n    // get markdown string:\n    getMarkdown();\n}\n```\n";

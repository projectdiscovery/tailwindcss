const plugin = require('tailwindcss/plugin')

const selectors = [
    "string",
    "comment",
    "plain",
    "scalar",
    "constant",
    "boolean",
    "property-access",
    "number",
    "keyword",
    "operator",
    "imports",
    "punctuation",
    "key",
    "property",
    "function"
];

const defaults = { className: "code", dataKey: "code-symbol" };
const codePlugin = ({ className, dataKey } = defaults) => plugin(({ addComponents, theme }) => {
    const modifiers = theme('code');

    Object.keys(modifiers).map(modifier => {
        var styleMap = {};

        selectors.forEach(selector =>
            styleMap[`[data-${dataKey}="${selector}"]`] = {
                ...modifiers[modifier]["text"],
                ...modifiers["DEFAULT"][selector],
                ...modifiers[modifier][selector]
            }
        )

        var utils = {}
        utils[modifier === "DEFAULT" ? `.${className}` : `.${className}-${modifier}`] = styleMap;
        addComponents(utils)
    })
})

module.exports = codePlugin;

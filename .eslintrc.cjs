module.exports = {
    root: true,
    env: {
        "browser": true,
        "es2021": true,
        "node": true
    },
    extends: [
        "plugin:vue/vue3-recommended",
        // "eslint:recommended",
        "@vue/typescript/recommended"
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 2020,
        parser: {
            "ts": "@typescript-eslint/parser",
            "<template>": "espree"
        },
        sourceType: "module"
    },
    rules: {
        "indent": "off",
        "@typescript-eslint/indent": [ "error", 4],
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "single",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "no-useless-escape": "off",
        "vue/no-unused-vars": "error",
        "vue/no-v-html": "off",
        "vue/html-indent": [
            "error",
            4
        ],
        "@typescript-eslint/no-explicit-any": "off"
    },
};

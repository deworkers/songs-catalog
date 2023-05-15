module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-tabs': 0,
        semi: 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
    },
};

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "parser": '@typescript-eslint/parser',
    "extends": ["eslint:recommended", 'plugin:@typescript-eslint/recommended', "plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "comma-dangle": ["error", {
            "arrays": "never",
            "objects": "only-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "prettier/prettier": "error"
    }
};
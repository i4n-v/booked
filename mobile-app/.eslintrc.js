module.exports = {
  env: {
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: ["plugin:react/recommended", "airbnb", "airbnb/hooks", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    // General rules
    "no-nested-ternary": "off",
    "no-lonely-if": "off",
    "no-restricted-syntax": "off",
    "no-control-regex": "off",
    "no-continue": "off",
    "no-console": "warn",
    camelcase: "off",
    "no-underscore-dangle": "off",
    radix: "off",
    "arrow-body-style": "off",
    "no-plusplus": "off",
    "default-param-last": "off",
    "func-names": "off",
    "no-param-reassign": "off",
    "no-return-assign": "off",
    "no-extra-boolean-cast": "off",
    "no-constant-condition": "off",
    "no-use-before-define": "off",
    "consistent-return": "off",
    "no-shadow": "off",
    "import/prefer-default-export": "off",
    "no-empty": "warn",

    // Import plugin
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-anonymous-default-export": "warn",
    "import/no-webpack-loader-syntax": "error",

    // Prettier
    "prettier/prettier": 0,

    // React eslint plugin specific rules
    "react-hooks/rules-of-hooks": "off",
    "react/style-prop-object": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-no-constructed-context-values": "off",
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "react/no-unstable-nested-components": "off",
    "no-unused-vars": "warn",
    "react/no-unknown-property": "warn",
    "react/prop-types": 0,
    "react/forbid-foreign-prop-types": [
      "warn",
      {
        allowInPropTypes: true,
      },
    ],
    "react/jsx-pascal-case": [
      "warn",
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    "import/no-extraneous-dependencies": "off",
  },
};

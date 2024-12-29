import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier' // Импортируем плагин Prettier

const compat = new FlatCompat()

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: ['node_modules/**', 'build/**'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser, // Стандартные глобальные переменные для браузера
                __IS_DEV__: true,
            },
        },
    },
    ...compat.config({
        extends: [
            'airbnb',
            'airbnb/hooks',
            'airbnb-typescript',
            'plugin:prettier/recommended', // Подключаем Prettier
        ],
    }),
    {
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json', // Убедитесь, что путь правильный
            },
        },
    },
    {
        plugins: {
            prettier: prettierPlugin, // Подключаем плагин Prettier
        },
        rules: {
            'prettier/prettier': 'error', // Включаем правила Prettier
            'react/react-in-jsx-scope': 'off',
            'import/prefer-default-export': 'off',
            'react/function-component-definition': 'off',
            'react/jsx-props-no-spreading': 'warn',
            'import/no-extraneous-dependencies': 'warn',
            'no-underscore-dangle': 'off',
            '@typescript-eslint/naming-convention': 'off',
        },
    },
]

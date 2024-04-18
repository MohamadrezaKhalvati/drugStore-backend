module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-misused-promises': 0,
		'@typescript-eslint/no-unsafe-argument': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-namespace': 0,
		'@typescript-eslint/parsers': 0,
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ functions: false },
		],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
}

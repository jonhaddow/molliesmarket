import config from "eslint-config-jonhaddow";

export default [
	...config.base,
	...config.react,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
];

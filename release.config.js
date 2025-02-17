module.exports = {
  branches: ['main'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/git',
		[
			'@semantic-release/npm',
			{
				pkgRoot: 'dist/libs/zod-to-reactive-form',
			},
		],
		'@semantic-release/github'
	],
};

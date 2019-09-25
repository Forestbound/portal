const argv = require('yargs').argv,
fs = require('fs'),
info = require('./info');
let param = null;

for(let prop in argv) {
	const reg = /-\w*/;
	if(prop.match(reg)){
		param = prop;
	}
}

let targetPath = 'projects/';
targetPath += !param ? info.help() : param.split('').slice(1).join("");

if(!fs.existsSync(targetPath) && argv.build) {
	info.ifIsNotExist();
	info.help();
}

const vars = {
	task: {
		html: 'html',
		css: 'css',
		js: 'js',
		img: 'img',
		assets: 'assets',
		watch: 'watch',
		server: 'server',
		clean: 'clean',
		start: 'start',
		dev: 'dev',
		default: 'default',
		info: 'info',
		prestart: 'prestart'
	},
	path: {
		src: {
			base: `${targetPath}/src/`,
			html: `${targetPath}/src/*.+(ejs|html)`,
			js: `${targetPath}/src/js/`,
			scss: `${targetPath}/src/scss/**/[^_]*.+(css|scss|sass)`,
			img: [`${targetPath}/src/img/**/*.*`, `!${targetPath}/src/img/**/*.ini`],
			assets: [`${targetPath}/src/assets/**/*.*`,`!${targetPath}/src/assets/**/*.ini`]
		},
		app: {
			html: `${targetPath}/app/`,
			js: `${targetPath}/app/js/`,
			css: `${targetPath}/app/css/`,
			img: `${targetPath}/app/img/`,
			fonts: `${targetPath}/app/assets/fonts/`,
			libs: `${targetPath}/app/assets/libs/`,
			fav: `${targetPath}/app/assets/fav/`,
			assets: `${targetPath}/app/assets/`
		},
		watch: {
			html: [`${targetPath}/src/*.html`, `${targetPath}/src/*.ejs`, `${targetPath}/src/view/**/*.*`],
			js: `${targetPath}/src/js/**/*.+(js|ts)`,
			scss: `${targetPath}/src/scss/**/*.+(css|scss|sass)`,
			img: `${targetPath}/src/img/**/*.*`,
			assets: `${targetPath}/src/assets/**/*.*`
		},
		template: {
			html: ['assembler/template/**/*.*', `!assembler/template/src/index.ejs`, `!assembler/template/src/view/**/*.*`],
			ejs: ['assembler/template/**/*.*', `!assembler/template/src/index.html`],
			js: `${targetPath}/src/js/app.js`,
			ts: `${targetPath}/src/js/app.ts`,
		},
		manifest: `${targetPath}/src/rev-manifest.json)`,
		validation: `${targetPath}/app/index.html`,
		serverRoot: `${targetPath}/app`
	}
}


module.exports = {
	vars,
	targetPath
};
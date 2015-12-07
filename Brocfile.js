const funnel = require('broccoli-funnel');
const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const esTranspiler = require('broccoli-babel-transpiler');
const less = require('broccoli-less');
const coffeescript = require('broccoli-coffee');
// const BroccoliSass = require('broccoli-sass');
const watchify = require('broccoli-watchify');



/* 资源路径 */
const es6 = 'es6';
const cf  = 'coffeescript';
const ls  = 'less';
const ss  = 'scss';

/* es6 */
const es = esTranspiler(es6, {
  stage: 0,
  moduleIds: true,
  modules: 'amd',
});
/* 合并 */
const mainJs = concat(es, {
  inputFiles: [
    '**/*.js'
  ],
  outputFile: '/js/es.js'
});


/* coffeescript */
const coffee = coffeescript(cf, {
	bare: true
});

const mainCoffee = concat(coffee, {
	inputFiles: [
	  '**/*.js'
	],
	outputFile: '/js/coffee.js'
});


/* less */
const css1 = less(ls, {
	unglify: true,
	outputFile: '/css'
});

const mainCss1 =concat(css1, {
	inputFiles: [
	  '**/*.css'
	],
	outputFile: '/css/less.css'
});


/* sass */
// const mainCss2 = new BroccoliSass([ss], '*.scss', 'dist/css/sass.css');


/* watch */
const watch = watchify(['./less/*.less', './sass/*.scss'], {
	browserify: {
	   entries: [],
	   debug: true,
	   "transform": [mainJs, mainCoffee, mainCss1, mainCss2, watch]
	},
	outputFile: 'dist',
	cache: true,
	init: function (b) {
		// b.transform('reactify', {'es6': true});
		// b.external('$');
	}  
})


module.exports = mergeTrees([mainJs, mainCoffee, mainCss1]);
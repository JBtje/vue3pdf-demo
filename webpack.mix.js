const mix         = require( 'laravel-mix' );
const webpack     = require( 'webpack' );
const tailwindcss = require( 'tailwindcss' );

require( 'dotenv' ).config();

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.extend( 'i18n', new class {
    webpackRules() {
        return [
            {
                resourceQuery: /blockType=i18n/,
                type:          'javascript/auto',
                loader:        '@intlify/vue-i18n-loader',
            },
        ];
    }
}() );

mix.webpackConfig( {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
    },
    module:  {
        rules: [
            {
                test:    /\.tsx?$/,
                loader:  'ts-loader',
                options: {appendTsSuffixTo: [/\.vue$/]},
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // Inject the website version from packages.json, into the build.
        new webpack.DefinePlugin( {
            'process.env.WEBSITE_VERSION':   JSON.stringify( process.env.npm_package_version ),
            'process.env.WEBSITE_LANGUAGES': JSON.stringify( process.env.APP_LANG_SUPPORTED.split( ',' ) ),
            'process.env.WEBSITE_NAME':      JSON.stringify( process.env.APP_NAME ),
        } ),
    ],
} );

mix.vue( {
    version:       3,
    extractStyles: true,
} );


console.log( '------------------------------------' );
console.log( 'Building site version ' + process.env.npm_package_version );
console.log( '------------------------------------' );

mix.i18n()
   .js( 'resources/js/app.ts', 'public/js' )
   .sass( 'resources/css/app.scss', 'public/css' )
   .options( {
       processCssUrls: true,
       postCss:        [tailwindcss( 'tailwind.config.js' )],
   } )
   .extract()
   .version();

if( !mix.inProduction() && process.env.WEBPACK_BROWSERSYNC === 'true' ) {
    mix.browserSync(
        {
            base:  './public',
            proxy: process.env.APP_URL,
            port:  3000,
        },
    );
}

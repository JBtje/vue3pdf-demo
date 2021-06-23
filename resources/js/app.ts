/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */
require( './bootstrap' );
require( './prototype' );

import {createApp} from 'vue';
import i18n        from './i18n';
import store       from './store';
import router      from './router';
import mixin       from './mixin';
import MainApp     from './components/MainApp.vue';

// Import DayJS
import Dayjs from './day'

const app = createApp( MainApp )

// Ugly way
app.config.globalProperties.$dayjs = Dayjs;

app.use( i18n )
   .use( store )
   .use( router )
   .mixin( mixin )
   .mount( '#app' );

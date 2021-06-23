import {createStore} from 'vuex';

import Language from './store/Language';

export default createStore( {
    modules: {
        Language,
    },
} );
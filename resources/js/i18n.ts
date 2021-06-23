import {createI18n} from 'vue-i18n'

import de from './lang/de';
import en from './lang/en';
import nl from './lang/nl';

import {restoreLanguage} from './helpers/RestoreLanguage'

export default createI18n( {
    locale:         restoreLanguage(),
    fallbackLocale: 'en',

    silentTranslationWarn:  false,
    formatFallbackMessages: false,
    silentFallbackWarn:     false,

    messages: {
        de,
        en,
        nl,
    },
} );

import store from '../store';

export function restoreLanguage() {
    // Check if a language is stored on the computer. Ifnot, use the default from the .env file.
    let lang = (localStorage.getObject( 'locale' ) == null) ? process.env.MIX_SPA_LANG : localStorage.getObject( 'locale' );

    // Store the current value in the localstorage, which also adds it to each Axios request.
    store.commit( 'setLocale', lang );

    return lang;
}

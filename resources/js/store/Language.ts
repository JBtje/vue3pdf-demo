const state = {
    lang: '',
};

const getters = {
    getLocale: ( state ) => state.lang,
};

const actions = {};

const mutations = {
    setLocale: ( state, locale ) => {
        state.locale = locale;
        localStorage.setObject( 'locale', locale );
        axios.defaults.headers.common['Language'] = locale;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};

import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'

import DefaultRouter from './DefaultRouter';

const router :Router = createRouter( {
    history:         createWebHistory(),
    linkActiveClass: 'open active',
    routes:          DefaultRouter,
    scrollBehavior( to, from, savedPosition ) {
        if( savedPosition ) {
            return savedPosition;
        }
        else {
            return {top: 0};
        }
    },
} );

export default router;

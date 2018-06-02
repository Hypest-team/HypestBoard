function CommentatorCardComponent(Vue) {
    'use strict';    

    return Vue.component('commentator-card',{ 
        template: '#commentator-card',
        props: ['commentator', 'index', 'on-delete']
    });
};

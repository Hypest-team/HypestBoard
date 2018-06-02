function CommentatorsComponent(Vue) {
    'use strict';    

    return Vue.component('commentators',{ 
        template: '#commentators',
        props: ['commentators'],
        methods: {
            addCommentator: addCommentator,
            deleteCommentator: deleteCommentator
        }
    });

    function addCommentator() {
        $this.emit(addCommentator);
        this.commentators.push({
            name: '',
            handle: ''
        });
    }

    function deleteCommentator(index) {
        this.commentators.splice(index, 1);
    }
};

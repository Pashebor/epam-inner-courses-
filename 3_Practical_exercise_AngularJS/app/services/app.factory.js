(function () {
    angular.module('racoonBlog').factory('blogArticleService', blogArticle);

    function blogArticle($resource) {

        function getArticles() {
            return $resource('articles');
        }

        function getTags() {
            return $resource('tags');
        }

        function saveArticle() {
            return $resource('articles');
        }

        return{
            getArticles: getArticles(),
            getTags: getTags(),
            saveArticle: saveArticle()
        }

    }
})();

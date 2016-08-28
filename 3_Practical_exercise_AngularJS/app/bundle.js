/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);

	__webpack_require__(8);

/***/ },
/* 1 */
/***/ function(module, exports) {

	
	'use strict';

	angular.module('racoonBlog', ['ngRoute', 'ngResource', 'ui.bootstrap', 'blogComponents']).controller('AppController', ShareData);

	function ShareData(blogArticleService) {
	    this.articles = {
	        list: function () {
	            return blogArticleService.getArticles.query();
	        }(),
	        tags: function () {
	            return blogArticleService.getTags.query();
	        }()
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	angular.module('racoonBlog').factory('blogArticleService', blogArticle);

	function blogArticle($resource) {

	    function getArticles() {
	        return $resource('articles');
	    }

	    function getTags() {
	        return $resource('tags');
	    }

	    function saveArticle() {
	        return $resource('edit_articles');
	    }

	    function deleteArticle() {
	        return $resource('delete_article');
	    }

	    function createArticleEnd() {
	        return $resource('create_article');
	    }

	    /*Copy-pasted, very useful function with date time*/
	    var dateFormat = function () {
	        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
	            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	            timezoneClip = /[^-+\dA-Z]/g,
	            pad = function pad(val, len) {
	            val = String(val);
	            len = len || 2;
	            while (val.length < len) {
	                val = "0" + val;
	            }return val;
	        };

	        // Regexes and supporting functions are cached through closure
	        return function (date, mask, utc) {
	            var dF = dateFormat;

	            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
	            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
	                mask = date;
	                date = undefined;
	            }

	            // Passing date through Date applies Date.parse, if necessary
	            date = date ? new Date(date) : new Date();
	            if (isNaN(date)) throw SyntaxError("invalid date");

	            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

	            // Allow setting the utc argument via the mask
	            if (mask.slice(0, 4) == "UTC:") {
	                mask = mask.slice(4);
	                utc = true;
	            }

	            var _ = utc ? "getUTC" : "get",
	                d = date[_ + "Date"](),
	                D = date[_ + "Day"](),
	                m = date[_ + "Month"](),
	                y = date[_ + "FullYear"](),
	                H = date[_ + "Hours"](),
	                M = date[_ + "Minutes"](),
	                s = date[_ + "Seconds"](),
	                L = date[_ + "Milliseconds"](),
	                o = utc ? 0 : date.getTimezoneOffset(),
	                flags = {
	                d: d,
	                dd: pad(d),
	                ddd: dF.i18n.dayNames[D],
	                dddd: dF.i18n.dayNames[D + 7],
	                m: m + 1,
	                mm: pad(m + 1),
	                mmm: dF.i18n.monthNames[m],
	                mmmm: dF.i18n.monthNames[m + 12],
	                yy: String(y).slice(2),
	                yyyy: y,
	                h: H % 12 || 12,
	                hh: pad(H % 12 || 12),
	                H: H,
	                HH: pad(H),
	                M: M,
	                MM: pad(M),
	                s: s,
	                ss: pad(s),
	                l: pad(L, 3),
	                L: pad(L > 99 ? Math.round(L / 10) : L),
	                t: H < 12 ? "a" : "p",
	                tt: H < 12 ? "am" : "pm",
	                T: H < 12 ? "A" : "P",
	                TT: H < 12 ? "AM" : "PM",
	                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
	                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
	            };

	            return mask.replace(token, function ($0) {
	                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
	            });
	        };
	    }();

	    // Some common format strings
	    dateFormat.masks = {
	        "default": "ddd mmm dd yyyy HH:MM:ss",
	        shortDate: "m/d/yy",
	        mediumDate: "mmm d, yyyy",
	        longDate: "mmmm d, yyyy",
	        fullDate: "dddd, mmmm d, yyyy",
	        shortTime: "h:MM TT",
	        mediumTime: "h:MM:ss TT",
	        longTime: "h:MM:ss TT Z",
	        isoDate: "yyyy-mm-dd",
	        isoTime: "HH:MM:ss",
	        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	    };

	    // Internationalization strings
	    dateFormat.i18n = {
	        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	    };

	    // For convenience...
	    Date.prototype.format = function (mask, utc) {
	        return dateFormat(this, mask, utc);
	    };

	    return {
	        getArticles: getArticles(),
	        getTags: getTags(),
	        saveArticle: saveArticle(),
	        dateFormat: dateFormat,
	        deleteArticle: deleteArticle(),
	        createArticleEnd: createArticleEnd()
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	'use strict';

	angular.module('racoonBlog').config(config);

	function config($routeProvider) {
	    $routeProvider.when('/', {
	        template: "<start-blog articles='ctrl.articles' class='start-blog'></start-blog>"
	        /*controller: 'BlogController'*/
	    }).when('/edit/:articleId', {
	        template: "<edit-article articles='ctrl.articles' class='create-article'></edit-article>"
	        /*controller: 'EditArticleController as edit'*/
	    }).when('/create', {
	        template: "<create-article articles='ctrl.articles' class='create-article'></create-article>"
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	angular.module('blogComponents', ['ngRoute', 'ui.bootstrap']);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	angular.module('blogComponents').component('startBlog', {
	    templateUrl: '/templates/start_page.html',
	    controller: blogController,
	    bindings: {
	        articles: '='
	    }
	});

	function blogController() {
	    var that = this;
	    this.searchInput = document.getElementById('searchInput').value;

	    this.blog = this.articles.list;
	    this.tags = this.articles.tags;

	    this.changeInput = function () {
	        return that.searchInput;
	    };

	    this.changeInputWithTag = function (tag) {
	        return that.searchInput = '' + tag;
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	angular.module('blogComponents').component('editArticle', {
	    templateUrl: '/templates/edit_article.html',
	    controller: EditController,
	    bindings: {
	        articles: '='
	    }
	});

	function EditController($scope, $routeParams, blogArticleService, $uibModal) {
	    var _this = this;

	    var _id = void 0,
	        that = this;
	    this.articleId = $routeParams.articleId;
	    _id = this.articleId;

	    this.articles.list.forEach(function (items) {
	        if (items.id === _id) {
	            that.article = items;
	        }
	    });

	    this.submit = function () {

	        _this.show = !_this.show;
	        var data = void 0,
	            dateOfEditedArticle = void 0,
	            stringTagBuffer = void 0;

	        dateOfEditedArticle = new Date();
	        stringTagBuffer = _this.editData.tags;
	        _this.editData.id = _id;
	        _this.editData.time = blogArticleService.dateFormat(dateOfEditedArticle.format(), "HH:MM mmm dd, yyyy");
	        _this.editData.tags = stringTagBuffer.split(",");

	        data = _this.editData;

	        _this.articles.list.forEach(function (item) {
	            var itemId = item.id,
	                editedItem = _id;
	            if (itemId == editedItem) {
	                item.author = data.author;
	                item.header = data.header;
	                item.text = data.text;
	                item.tags = data.tags;
	                item.image = data.image;
	                item.time = data.time;
	            }
	        });

	        blogArticleService.saveArticle.save(data, function (savedData) {
	            that.alert = 'Article has been changed.';
	            that.alertClass = '';
	            that.alertClass = 'edit-article__alert-window';
	            console.log('Article edited');
	        }, function () {
	            that.alert = 'Error in posting!';
	            that.alertClass = '';
	            that.alertClass = 'edit-article__alert-window--error';
	            console.error('error in posting');
	        });
	    };

	    this.delete = function (size) {

	        var modalInstance = $uibModal.open({
	            templateUrl: '/templates/modal_delete.html',
	            controller: 'ModalController as ctrl',
	            scope: $scope,
	            size: size,
	            backdrop: 'static',
	            resolve: {
	                id: function id() {
	                    return _id;
	                },
	                articles: function articles() {
	                    return that.articles.list;
	                }
	            }
	        });
	        modalInstance.result.then(function (id) {
	            that.articles.list.forEach(function (item) {
	                if (item.id === id) {
	                    var index = that.articles.list.indexOf(item);
	                    that.articles.list.splice(index, 1);
	                }
	            });
	        });
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	angular.module('blogComponents').component('createArticle', {
	    templateUrl: '/templates/create_article.html',
	    controller: createArticleController,
	    bindings: {
	        articles: '='
	    }
	});

	function createArticleController(blogArticleService) {
	    var that = this;
	    this.show = false;

	    this.createArticleBtn = function () {
	        this.show = !this.show;
	        var dateOfCreatedArticle = new Date(),
	            formData,
	            stringTagsBuffer;
	        var ids = [],
	            largestDigitID,
	            allTags = [];

	        this.articles.list.forEach(function (item) {
	            ids.push(item.id);
	        });
	        largestDigitID = Math.max.apply(Math, ids);

	        this.createData.id = "" + (largestDigitID + 1);
	        stringTagsBuffer = this.createData.tags;
	        this.createData.tags = stringTagsBuffer.split(",");
	        this.createData.time = blogArticleService.dateFormat(dateOfCreatedArticle.format(), "HH:MM mmm dd, yyyy");
	        formData = this.createData;

	        this.articles.list.push(formData);

	        console.log(this.articles.tags);

	        blogArticleService.createArticleEnd.save(formData, function (savedData) {
	            that.alert = 'Article created.';
	            that.alertClass = '';
	            that.alertClass = 'edit-article__alert-window';
	            console.log('Article created');
	        }, function (savedData) {
	            that.alert = 'Error in creating!';
	            that.alertClass = '';
	            that.alertClass = 'edit-article__alert-window--error';
	            console.error('Error in saving');
	        });
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	angular.module('blogComponents').controller('ModalController', ModalController);

	function ModalController($uibModalInstance, id, articles, blogArticleService) {
	    var that = this;
	    this.show = false;
	    this.hide = false;

	    articles.$promise.then(function (data) {
	        data.forEach(function (item) {
	            if (item.id === id) {
	                that.articleName = item.header;
	            }
	        });
	    });

	    this.ok = function () {
	        return $uibModalInstance.close(id);
	    };

	    this.delete = function () {
	        var dataToDelete = { id: id };
	        blogArticleService.deleteArticle.save(dataToDelete, function (data) {
	            that.show = true;
	            that.hide = true;
	            console.log(data);
	        }, function () {
	            return console.log('Error!');
	        });
	    };

	    this.cancel = function () {
	        return $uibModalInstance.dismiss();
	    };
	}

/***/ }
/******/ ]);
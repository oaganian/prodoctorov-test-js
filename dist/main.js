"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**@DESC MODEL*/
var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.baseUrl = "https://json.medrating.org";
  }

  _createClass(Model, [{
    key: "_fetchResourse",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("" + this.baseUrl + url);

              case 2:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 5;
                  break;
                }

                throw new Error("could not fetch");

              case 5:
                return _context.abrupt("return", response.json());

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _fetchResourse(_x) {
        return _ref.apply(this, arguments);
      }

      return _fetchResourse;
    }()
  }, {
    key: "_filterUsers",
    value: function _filterUsers(user) {
      var id = user.id,
          name = user.name;

      if (name) return { id: id, name: name };
    }
  }, {
    key: "_transformUserAlbums",
    value: function _transformUserAlbums(album) {
      var id = album.id,
          title = album.title;

      return { id: id, title: title };
    }
  }, {
    key: "getUsers",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._fetchResourse("/users");

              case 2:
                users = _context2.sent;
                return _context2.abrupt("return", users.filter(function (user) {
                  return _this._filterUsers(user);
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUsers() {
        return _ref2.apply(this, arguments);
      }

      return getUsers;
    }()
  }, {
    key: "getUserAlbums",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
        var albums;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._fetchResourse("/albums?userId=" + userId);

              case 2:
                albums = _context3.sent;
                return _context3.abrupt("return", albums);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserAlbums(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getUserAlbums;
    }()
  }, {
    key: "getUserPhotos",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(albumId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._fetchResourse("/photos?albumId=" + albumId);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getUserPhotos(_x3) {
        return _ref4.apply(this, arguments);
      }

      return getUserPhotos;
    }()
  }]);

  return Model;
}();
/**
 *@DESC View
 */


var View = function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: "clearDOM",
    value: function clearDOM() {
      var main = document.querySelector("main");
      main.innerHTML = "";
    }
  }, {
    key: "setNavLinks",
    value: function setNavLinks() {
      var catalogLink = document.querySelector(".menu__link--catalog");
      var favoriteLink = document.querySelector(".menu__link--favorite");

      var links = document.querySelectorAll(".menu__link");
      links.forEach(function (link) {
        link.classList.remove("menu__link_active");
      });

      switch (location.hash.slice(1)) {
        case "":
          catalogLink.classList.add("menu__link_active");
          break;
        case "catalog":
          catalogLink.classList.add("menu__link_active");
          break;
        case "favorite":
          favoriteLink.classList.add("menu__link_active");
          break;
      }
    }
    /**
     * @param {dom-object} container
     * @param {dom-object} element
     * @returns {undefined}
     */

  }, {
    key: "renderDOM",
    value: function renderDOM(container, element) {
      container.appendChild(element);
    }

    /**
     * @param {dom-object} container
     * @returns {undefined}
     */

  }, {
    key: "unrenderDOM",
    value: function unrenderDOM(container) {
      container.innerHTML = "";
    }

    /**
     * @param {string} selector
     * @returns {dom-object}
     */

  }, {
    key: "findNode",
    value: function findNode(selector) {
      return document.querySelector(selector);
    }

    /**
     * @param {string} selector
     * @returns {Array}
     */

  }, {
    key: "findNodes",
    value: function findNodes(selector) {
      return document.querySelectorAll(selector);
    }

    /**
     * @param {string} tagName
     * @param {string} className
     * @param {string} innerHTML
     * @param {string} id
     * @param {string} src
     * @param {string} title
     * @param {string} dataset
     * @returns {dom-object}
     */

  }, {
    key: "createNode",
    value: function createNode(tagName, className, innerHTML, id, href, src, title, dataset) {
      var node = document.createElement(tagName);
      if (className) node.className = className;

      if (innerHTML) node.innerHTML = innerHTML;
      if (id) node.id = id;

      /*-------- for specific items. 
      You can extend params by adding new vars----------*/
      if (href) node.href = href;
      if (src) node.src = src;
      if (title) node.title = title;
      if (dataset) {
        if (dataset.title === "fancybox") {
          node.dataset.fancybox = dataset.value;
        }
      }
      return node;
    }

    /**
     * @param {array} data
     * @param {string} entity (now we have 3 entities users, albums, photos)
     * @returns {array}
     */

  }, {
    key: "transformApiToDOM",
    value: function transformApiToDOM(data, entity) {
      var _this2 = this;

      if (entity === "users") {
        var users = [].concat(_toConsumableArray(data));

        return users.map(function (user) {
          // li
          var li = _this2.createNode("li", "user-list__item user-" + user.id, user.name);

          // ul
          var ul = _this2.createNode("ul", "user-" + user.id + "__albums album-list");

          //button
          var btn = _this2.createNode("button", "open-albums open-albums--" + user.id, ">", user.id);

          li.appendChild(btn);
          li.appendChild(ul);

          return li;
        });
      }
      if (entity === "albums") {
        var albums = [].concat(_toConsumableArray(data));

        return albums.map(function (album) {
          // li
          var li = _this2.createNode("li", "album-list__item album-" + album.id, album.title);

          //ul
          var ul = _this2.createNode("ul", "album-" + album.id + "__photos photo-list");

          //btn
          var btn = _this2.createNode("button", "open-photos open-photos--" + album.id, ">", album.id);

          li.appendChild(btn);
          li.appendChild(ul);

          return li;
        });
      }
      if (entity === "photos") {
        var photos = [].concat(_toConsumableArray(data));

        return photos.map(function (photo) {
          console.log(photo);
          //li
          var li = _this2.createNode("li", "photo-list__item");

          // img
          var img = _this2.createNode("img", null, null, null, null, photo.thumbnailUrl, photo.title);

          // button
          var btn = _this2.createNode("button", "star star-" + photo.id + " star__icon", null, photo.id);
          // i <i class="fa fa-star" aria-hidden="true"></i>
          var i = _this2.createNode("i", "fa fa-star");

          btn.appendChild(i);
          li.appendChild(btn);
          li.appendChild(img);

          return li;
        });
      }
    }
  }]);

  return View;
}();

/**@DESC CONTROLLER*/


var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, null, [{
    key: "catalogRoute",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this3 = this;

        var model, view, userListContainer, userList, users, usersDOMList, usersDOMListContainer, openAlbumsBtns;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                model = new Model();
                view = new View();


                view.setNavLinks();
                view.clearDOM();

                // load users
                // create user-list
                userListContainer = view.findNode("main");
                userList = view.createNode("ul", "user-list");
                //render user-list

                view.renderDOM(userListContainer, userList);

                // fetch users data
                _context7.next = 9;
                return model.getUsers();

              case 9:
                users = _context7.sent;

                // transfrom users data to dom elements
                usersDOMList = view.transformApiToDOM(users, "users");
                usersDOMListContainer = view.findNode(".user-list");
                //render users

                usersDOMList.forEach(function (item) {
                  view.renderDOM(usersDOMListContainer, item);
                });

                // load albums
                openAlbumsBtns = view.findNodes(".open-albums ");

                openAlbumsBtns.forEach(function (item) {
                  var flag = false;
                  item.addEventListener("click", function () {
                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
                      var currentUserId, albums, albumsDOMList, albumsDOMListContainer, openPhotosBtns;
                      return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              currentUserId = Number(e.target.id);

                              // fetch albums data

                              _context6.next = 3;
                              return model.getUserAlbums(currentUserId);

                            case 3:
                              albums = _context6.sent;

                              // transfrom albums data to dom elements
                              albumsDOMList = view.transformApiToDOM(albums, "albums");
                              albumsDOMListContainer = view.findNode(".user-" + albums[0].userId + "__albums");

                              //render/unrender albums

                              if (!flag) {
                                albumsDOMList.forEach(function (item) {
                                  view.renderDOM(albumsDOMListContainer, item);
                                });
                                flag = true;
                              } else {
                                albumsDOMList.forEach(function (item) {
                                  view.unrenderDOM(albumsDOMListContainer, item);
                                });
                                flag = false;
                              }

                              // load photos
                              openPhotosBtns = view.findNodes(".open-photos");

                              openPhotosBtns.forEach(function (item) {
                                var flag = false;
                                item.addEventListener("click", function () {
                                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
                                    var currentAlbumId, photos, photosDOMList, photosDOMListContainer;
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                      while (1) {
                                        switch (_context5.prev = _context5.next) {
                                          case 0:
                                            currentAlbumId = Number(e.target.id);

                                            //fetch photos data

                                            _context5.next = 3;
                                            return model.getUserPhotos(currentAlbumId);

                                          case 3:
                                            photos = _context5.sent;

                                            //transform photos data to dom elements
                                            photosDOMList = view.transformApiToDOM(photos, "photos");
                                            photosDOMListContainer = view.findNode(".album-" + photos[0].albumId + "__photos");

                                            // render/ unrender photos

                                            if (!flag) {
                                              photosDOMList.forEach(function (item) {
                                                view.renderDOM(photosDOMListContainer, item);
                                              });
                                              flag = true;
                                            } else {
                                              photosDOMList.forEach(function (item) {
                                                view.unrenderDOM(photosDOMListContainer, item);
                                              });
                                              flag = false;
                                            }

                                          case 7:
                                          case "end":
                                            return _context5.stop();
                                        }
                                      }
                                    }, _callee5, _this3);
                                  }));

                                  return function (_x5) {
                                    return _ref7.apply(this, arguments);
                                  };
                                }());
                              });

                            case 9:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this3);
                    }));

                    return function (_x4) {
                      return _ref6.apply(this, arguments);
                    };
                  }());
                });

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function catalogRoute() {
        return _ref5.apply(this, arguments);
      }

      return catalogRoute;
    }()
  }, {
    key: "favoriteRoute",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var model, view;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                model = new Model();
                view = new View();


                view.setNavLinks();
                view.clearDOM();

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function favoriteRoute() {
        return _ref8.apply(this, arguments);
      }

      return favoriteRoute;
    }()
  }]);

  return Controller;
}();

/**@EESC Router class*/


var Router = function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, [{
    key: "_hashChange",
    value: function _hashChange() {
      var hash = null;
      if (!location.hash) {
        hash = "catalog";
      } else {
        hash = location.hash.slice(1);
      }

      var _hash$split = hash.split("/"),
          _hash$split2 = _slicedToArray(_hash$split, 2),
          name = _hash$split2[0],
          id = _hash$split2[1];
      //const hashInfo = { name, params: { id } }

      var routeName = name + "Route";

      if (name) {
        Controller[routeName]();
      }
    }
  }, {
    key: "init",
    value: function init() {
      window.addEventListener("hashchange", this._hashChange);
      this._hashChange();
    }
  }]);

  return Router;
}();

/**@DESC entry point */


document.addEventListener("DOMContentLoaded", function () {
  var router = new Router();
  router.init();
});
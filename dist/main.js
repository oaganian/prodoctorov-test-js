"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: "clearMain",
    value: function clearMain() {
      var main = document.querySelector("main");
      main.innerHTML = "";
    }
    //HELPER FUNCTIONS

    /**
     *get list container for each entity
     * @param {string} containerSelector
     * @returns {object} ul
     */

  }, {
    key: "_getListContainer",
    value: function _getListContainer(containerSelector) {
      var container = document.querySelector(containerSelector);
      return container;
    }

    /**
     *Creates dom item
     * @param {string} className
     * @param {string} id
     * @param {string} innerHTML
     * @returns {object} domItem
     */

  }, {
    key: "_createDomItem",
    value: function _createDomItem(name, className) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var innerHTML = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

      var domItem = document.createElement(name);
      domItem.className = className;
      domItem.id = id;
      domItem.innerHTML = innerHTML;

      return domItem;
    }

    /*------------------Вместо одной "универсальной" функции TRANSFORM_DATA, с большим количеством параметров, 
    функции было принято решение сделать 3, которые легко использовать ------------- */

    /**
     *Creates dom items li for every object
     * @param {array} users
     * @returns {array}
     */

  }, {
    key: "_transformUsersApiToDom",
    value: function _transformUsersApiToDom(users) {
      var _this2 = this;

      return users.map(function (user) {
        // create li element for each item
        var elem = _this2._createDomItem("li", "user-list__item user-" + user.id, "", user.name);

        // create ul inner container for each item
        var innerContainer = _this2._createDomItem("ul", "user-" + user.id + "__albums album-list");

        //create button open/close for each item
        var OCButton = _this2._createDomItem("button", "open-albums open-albums--" + user.id, user.id, ">");

        // add created stuff to li element
        elem.appendChild(OCButton);
        elem.appendChild(innerContainer);

        return elem;
      });
    }

    /**
     *Creates dom items li for every object
     * @param {array} albums
     * @returns {array}
     */

  }, {
    key: "_transformAlbumsApiToDom",
    value: function _transformAlbumsApiToDom(albums) {
      var _this3 = this;

      return albums.map(function (album) {
        // create li element for each item
        var elem = _this3._createDomItem("li", "album-list__item album-" + album.id, "", album.title);

        // create ul inner container for each item
        var innerContainer = _this3._createDomItem("ul", "album-" + album.id + "__photos photo-list");

        //create button open/close for each item
        var OCButton = _this3._createDomItem("button", "open-photos open-photos--" + album.id, album.id, ">");

        // add created stuff to li element
        elem.appendChild(OCButton);
        elem.appendChild(innerContainer);
        console.log("fdsafas");

        return elem;
      });
    }

    /**
     *Creates dom items li for every object
     * @param {array} photos
     * @returns {array}
     */

    /**
      * <a href="image.jpg" data-fancybox data-caption="Caption for single image">
    <img src="thumbnail.jpg" alt="" />
    </a>
      */

  }, {
    key: "_transformPhotosApiToDom",
    value: function _transformPhotosApiToDom(photos) {
      return photos.map(function (photo) {
        // create li element for each item
        var elem = document.createElement("li");
        elem.className = "photo-list__item";
        // create link
        var a = document.createElement("a");
        a.href = photo.thumbnailUrl;
        a.dataset.fancybox = "gallary";
        a.dataset.caption = photo.title;
        a.className = "fancybox";
        // create img
        var img = document.createElement("img");
        img.src = photo.thumbnailUrl;
        img.title = photo.title;

        //
        a.appendChild(img);
        elem.appendChild(a);

        return elem;
      });
    }
  }, {
    key: "createMainList",
    value: function createMainList() {
      var list = document.createElement("ul");
      list.className = "user-list";

      var main = document.querySelector("main");
      main.appendChild(list);
    }

    //RENDER/ UNRENDER
    /**
     * renders list of data on the screen(takes what render/ where it render)
     * @param {array} data
     * @param {string} selector
     * @param {string} entity like users, albums, photos
     * @returns {undefined}
     */

  }, {
    key: "render",
    value: function render(data, selector, entity) {
      var container = this._getListContainer(selector);

      //render list by default
      var renderList = null;
      // choose what we render
      switch (entity) {
        case "users":
          renderList = this._transformUsersApiToDom(data);
          break;
        case "albums":
          //here we should set btn in open state
          var albumsBtn = document.querySelector(".open-albums--" + data[0].userId);
          albumsBtn.classList.add("albums--open");

          renderList = this._transformAlbumsApiToDom(data);
          break;
        case "photos":
          //here we should set btn in open state
          var photosBtn = document.querySelector(".open-photos--" + data[0].albumId);
          photosBtn.classList.add("photos--open");

          renderList = this._transformPhotosApiToDom(data);
          break;
      }

      renderList.forEach(function (item) {
        container.appendChild(item);
      });
    }

    /**
     * remove data when list will be closed
     *
     * @param {number} id
     * @param {string} selector
     * @param {string} entity
     * @returns {undefined}
     */

  }, {
    key: "unrender",
    value: function unrender(id, selector, entity) {
      switch (entity) {
        case "albums":
          var albumsBtn = document.querySelector(".open-albums--" + id);
          albumsBtn.classList.remove("albums--open");
          break;
        case "photos":
          var photosBtn = document.querySelector(".open-photos--" + id);
          photosBtn.classList.remove("photos--open");
          break;
      }

      var list = document.querySelector(selector);
      list.innerHTML = "";
    }
  }]);

  return View;
}();

/**@DESC UI class*/

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, null, [{
    key: "catalogRoute",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this4 = this;

        var model, view, users, openBtn;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                model = new Model();
                view = new View();

                view.clearMain();

                _context7.prev = 3;

                view.createMainList();
                /**load all users and display */
                _context7.next = 7;
                return model.getUsers();

              case 7:
                users = _context7.sent;

                view.render(users, ".user-list", "users");

                /**handle "open curren user albums" button, and load albums*/
                openBtn = document.querySelectorAll(".open-albums");

                openBtn.forEach(function (item) {
                  var flag = false;

                  item.addEventListener("click", function () {
                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
                      var currentUserId, albums, openPhotosBtn;
                      return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              currentUserId = Number(e.target.id);

                              if (flag) {
                                _context6.next = 9;
                                break;
                              }

                              _context6.next = 4;
                              return model.getUserAlbums(currentUserId);

                            case 4:
                              albums = _context6.sent;

                              view.render(albums, ".user-" + albums[0].userId + "__albums", "albums");

                              flag = true;
                              _context6.next = 11;
                              break;

                            case 9:
                              view.unrender(currentUserId, ".user-" + currentUserId + "__albums", "albums");
                              flag = false;

                            case 11:

                              /**handle "open current album photos" button and load photos */
                              openPhotosBtn = document.querySelectorAll(".open-photos");

                              openPhotosBtn.forEach(function (item) {
                                var flag = false;
                                item.addEventListener("click", function () {
                                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
                                    var currentAlbumId, photos;
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                      while (1) {
                                        switch (_context5.prev = _context5.next) {
                                          case 0:
                                            currentAlbumId = Number(e.target.id);

                                            if (flag) {
                                              _context5.next = 9;
                                              break;
                                            }

                                            _context5.next = 4;
                                            return model.getUserPhotos(currentAlbumId);

                                          case 4:
                                            photos = _context5.sent;

                                            view.render(photos, ".album-" + photos[0].albumId + "__photos", "photos");
                                            flag = true;
                                            _context5.next = 11;
                                            break;

                                          case 9:
                                            view.unrender(currentAlbumId, ".album-" + currentAlbumId + "__photos", "photos");
                                            flag = false;

                                          case 11:

                                            $().fancybox({
                                              selector: ".fancybox",
                                              beforeClose: function beforeClose() {
                                                location.reload();
                                              }
                                            });

                                          case 12:
                                          case "end":
                                            return _context5.stop();
                                        }
                                      }
                                    }, _callee5, _this4);
                                  }));

                                  return function (_x7) {
                                    return _ref7.apply(this, arguments);
                                  };
                                }());
                              });

                            case 13:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this4);
                    }));

                    return function (_x6) {
                      return _ref6.apply(this, arguments);
                    };
                  }());
                });
                _context7.next = 16;
                break;

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](3);

                console.log(_context7.t0);

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[3, 13]]);
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


                view.clearMain();

              case 3:
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
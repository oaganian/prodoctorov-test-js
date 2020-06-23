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
    key: "_getListContainer",

    //HELPER FUNCTIONS

    value: function _getListContainer(containerSelector) {
      var container = document.querySelector(containerSelector);
      return container;
    }
  }, {
    key: "_createElements",
    value: function _createElements() {}

    //RENDER FUNCTIONS

  }, {
    key: "renderUsers",
    value: function renderUsers(users) {
      var userList = document.querySelector(".user-list");
      /**create li for all users */
      users.forEach(function (user) {
        var li = document.createElement("li");
        /**button open albums */
        var button = document.createElement("button");
        button.className = "open-albums";
        button.id = user.id;
        button.innerHTML = ">";

        /**ul for albums */
        var ul = document.createElement("ul");
        ul.className = "user-" + user.id + "__albums album-list";

        li.innerHTML = user.name;

        li.className = "user-list__item user-" + user.id;
        li.appendChild(button);
        li.appendChild(ul);
        userList.appendChild(li);
      });
    }
  }, {
    key: "renderUserAlbums",
    value: function renderUserAlbums(albums) {
      var openBtn = document.getElementById("" + albums[0].userId);

      openBtn.classList.add("opened");

      var albumList = document.querySelector(".user-" + albums[0].userId + "__albums");

      //
      albums.forEach(function (album) {
        var li = document.createElement("li");

        // open photos button
        var button = document.createElement("button");
        button.className = "open-photos";
        button.id = album.id;
        button.innerHTML = ">";

        // ul for photos
        var ul = document.createElement("ul");
        ul.className = "album-" + album.id + "__photos photo-list";

        //
        li.innerHTML = album.title;
        li.className = "album-list__item album-" + album.id;
        li.appendChild(button);
        li.appendChild(ul);
        albumList.appendChild(li);
      });
    }
  }, {
    key: "unrenderUserAlbums",
    value: function unrenderUserAlbums(userId) {
      var openBtn = document.getElementById("" + userId);
      openBtn.classList.remove("opened");
      var albumList = document.querySelector(".user-" + userId + "__albums");
      albumList.innerHTML = "";
    }
  }, {
    key: "renderAlbumPhotos",
    value: function renderAlbumPhotos(photos) {
      var openBtn = document.getElementById("" + photos[0].albumId);
      openBtn.classList.add("photos-opened");

      var photoList = document.querySelector(".album-" + photos[0].albumId + "__photos");

      photos.forEach(function (photo) {
        var li = document.createElement("li");
        var img = document.createElement("img");

        img.src = photo.thumbnailUrl;
        li.appendChild(img);
        photoList.appendChild(li);
      });
    }
  }, {
    key: "unrenderAlbumPhotos",
    value: function unrenderAlbumPhotos(albumId) {
      var openBtn = document.getElementById("" + albumId);
      openBtn.classList.remove("photos-opened");
      var photoList = document.querySelector(".album-" + albumId + "__photos");
      photoList.innerHTML = "";
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
        var _this2 = this;

        var model, view, users, openBtn;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                model = new Model();
                view = new View();
                _context7.prev = 2;
                _context7.next = 5;
                return model.getUsers();

              case 5:
                users = _context7.sent;

                view.renderUsers(users);

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

                              view.renderUserAlbums(albums);
                              flag = true;
                              _context6.next = 11;
                              break;

                            case 9:
                              view.unrenderUserAlbums(currentUserId);
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

                                            view.renderAlbumPhotos(photos);
                                            flag = true;
                                            _context5.next = 11;
                                            break;

                                          case 9:
                                            view.unrenderAlbumPhotos(currentAlbumId);
                                            flag = false;

                                          case 11:
                                          case "end":
                                            return _context5.stop();
                                        }
                                      }
                                    }, _callee5, _this2);
                                  }));

                                  return function (_x5) {
                                    return _ref7.apply(this, arguments);
                                  };
                                }());
                              });

                            case 13:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this2);
                    }));

                    return function (_x4) {
                      return _ref6.apply(this, arguments);
                    };
                  }());
                });
                _context7.next = 14;
                break;

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](2);

                console.log(_context7.t0);

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 11]]);
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
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log("this is favorite route");

              case 1:
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
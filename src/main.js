/**@DESC MODEL*/
class Model {
  constructor() {
    this.baseUrl = "https://json.medrating.org";
  }

  async _fetchResourse(url) {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) throw new Error("could not fetch");
    return response.json();
  }

  _filterUsers(user) {
    const { id, name } = user;
    if (name) return { id, name };
  }

  _transformUserAlbums(album) {
    const { id, title } = album;
    return { id, title };
  }

  async getUsers() {
    const users = await this._fetchResourse("/users");
    return users.filter((user) => this._filterUsers(user));
  }

  async getUserAlbums(userId) {
    const albums = await this._fetchResourse(`/albums?userId=${userId}`);
    //return albums.map(album=> this._transformUserAlbums(album))
    return albums;
  }

  async getUserPhotos(albumId) {
    return await this._fetchResourse(`/photos?albumId=${albumId}`);
  }

  async getSpecificPhoto(photoId) {
    return await this._fetchResourse(`/photos?id=${photoId}`);
  }
}
/**
 *@DESC View
 */
class View {
  clearDOM() {
    const main = document.querySelector("main");
    main.innerHTML = "";
  }

  setStarColor(starId, flag) {
    const star = this.findNode(`.star-${starId}`);
    const starIcon = star.firstElementChild;
    if (flag) {
      starIcon.classList.add("star__icon--yellow");
    } else {
      starIcon.classList.remove("star__icon--yellow");
    }
  }
  setNavLinks() {
    const catalogLink = document.querySelector(".menu__link--catalog");
    const favoriteLink = document.querySelector(".menu__link--favorite");

    const links = document.querySelectorAll(".menu__link");
    links.forEach((link) => {
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
  renderDOM(container, element) {
    container.appendChild(element);
  }

  /**
   * @param {dom-object} container
   * @returns {undefined}
   */
  unrenderDOM(container) {
    container.innerHTML = "";
  }

  /**
   * @param {string} selector
   * @returns {dom-object}
   */
  findNode(selector) {
    return document.querySelector(selector);
  }

  /**
   * @param {string} selector
   * @returns {Array}
   */
  findNodes(selector) {
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
  createNode(tagName, className, innerHTML, id, href, src, title, dataset) {
    const node = document.createElement(tagName);
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
  transformApiToDOM(data, entity) {
    if (entity === "users") {
      const users = [...data];

      return users.map((user) => {
        // li
        const li = this.createNode(
          "li",
          `user-list__item user-${user.id}`,
          user.name
        );

        // ul
        const ul = this.createNode("ul", `user-${user.id}__albums album-list`);

        //button
        const btn = this.createNode(
          "button",
          `open-albums open-albums--${user.id}`,
          ">",
          user.id
        );

        li.appendChild(btn);
        li.appendChild(ul);

        return li;
      });
    }
    if (entity === "albums") {
      const albums = [...data];

      return albums.map((album) => {
        // li
        const li = this.createNode(
          "li",
          `album-list__item album-${album.id}`,
          album.title
        );

        //ul
        const ul = this.createNode(
          "ul",
          `album-${album.id}__photos photo-list`
        );

        //btn
        const btn = this.createNode(
          "button",
          `open-photos open-photos--${album.id}`,
          ">",
          album.id
        );

        li.appendChild(btn);
        li.appendChild(ul);

        return li;
      });
    }
    if (entity === "photos") {
      const photos = [...data];

      return photos.map((photo) => {
        //li
        const li = this.createNode("li", "photo-list__item");

        // a
        const a = this.createNode(
          "a",
          "photo-list__link",
          null,
          null,
          photo.url,
          null,
          photo.title
        );

        // img
        const img = this.createNode(
          "img",
          null,
          null,
          null,
          null,
          photo.thumbnailUrl,
          photo.title
        );

        // button
        const btn = this.createNode(
          "button",
          `star star-${photo.id} star__icon`,
          null,
          photo.id
        );

        // i <i class="fa fa-star" aria-hidden="true"></i>
        let iClassName = "fa fa-star";

        if (localStorage.getItem(photo.id) !== null) {
          iClassName = "fa fa-star star__icon--yellow ";
        }

        const i = this.createNode("i", iClassName);

        a.appendChild(img);
        btn.appendChild(i);
        li.appendChild(btn);
        li.appendChild(a);

        return li;
      });
    }
    // if (entity === "favorites") {
    //   console.log("favorites!!!");
    // }
  }
}

/**@DESC CONTROLLER*/
class Controller {
  static _localStorage() {
    const view = new View();
    const model = new Model();
    const stars = view.findNodes(".star");

    stars.forEach((item) => {
      item.addEventListener("click", async (e) => {
        let photo = await model.getSpecificPhoto(item.id);
        photo = photo[0];

        //check key in local storage

        if (localStorage.getItem(photo.id.toString()) == null) {
          // add this key in storage
          localStorage.setItem(photo.id.toString(), JSON.stringify(photo));

          // set yellow
          view.setStarColor(photo.id, true);
        } else {
          localStorage.removeItem(photo.id.toString());
          const removingItem = e.target.parentNode.parentNode;
          // remove yellow
          view.setStarColor(photo.id, false);
          removingItem.remove();
        }
      });
    });
  }
  static async catalogRoute() {
    const model = new Model();
    const view = new View();

    view.setNavLinks();
    view.clearDOM();

    // load users
    // create user-list
    const userListContainer = view.findNode("main");
    const userList = view.createNode("ul", "user-list");
    //render user-list
    view.renderDOM(userListContainer, userList);

    // fetch users data
    const users = await model.getUsers();
    // transfrom users data to dom elements
    const usersDOMList = view.transformApiToDOM(users, "users");
    const usersDOMListContainer = view.findNode(".user-list");
    //render users
    usersDOMList.forEach((item) => {
      view.renderDOM(usersDOMListContainer, item);
    });

    // load albums
    const openAlbumsBtns = view.findNodes(".open-albums ");
    openAlbumsBtns.forEach((item) => {
      let flag = false;
      item.addEventListener("click", async (e) => {
        const currentUserId = Number(e.target.id);

        // fetch albums data
        const albums = await model.getUserAlbums(currentUserId);
        // transfrom albums data to dom elements
        const albumsDOMList = view.transformApiToDOM(albums, "albums");
        const albumsDOMListContainer = view.findNode(
          `.user-${albums[0].userId}__albums`
        );

        //render/unrender albums
        if (!flag) {
          albumsDOMList.forEach((item) => {
            view.renderDOM(albumsDOMListContainer, item);
          });
          flag = true;
        } else {
          albumsDOMList.forEach((item) => {
            view.unrenderDOM(albumsDOMListContainer, item);
          });
          flag = false;
        }

        // load photos
        const openPhotosBtns = view.findNodes(".open-photos");
        openPhotosBtns.forEach((item) => {
          let flag = false;
          item.addEventListener("click", async (e) => {
            const currentAlbumId = Number(e.target.id);

            //fetch photos data
            const photos = await model.getUserPhotos(currentAlbumId);
            //transform photos data to dom elements
            const photosDOMList = view.transformApiToDOM(photos, "photos");
            const photosDOMListContainer = view.findNode(
              `.album-${photos[0].albumId}__photos`
            );

            // render/ unrender photos
            if (!flag) {
              photosDOMList.forEach((item) => {
                view.renderDOM(photosDOMListContainer, item);
              });
              flag = true;
            } else {
              photosDOMList.forEach((item) => {
                view.unrenderDOM(photosDOMListContainer, item);
              });
              flag = false;
            }

            $(".photo-list__link").magnificPopup({ type: "image" });

            /**
             *
             * LOCAl sTORAGE LOGIC
             */
            this._localStorage();
          });
        });
      });
    });
  }
  static async favoriteRoute() {
    const model = new Model();
    const view = new View();

    view.setNavLinks();
    view.clearDOM();

    // create favorite-list

    const favoriteList = view.createNode("ul", "favorite-list");
    const favoriteContainer = view.findNode("main");
    view.renderDOM(favoriteContainer, favoriteList);

    //get all items from local storage
    let favorites = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      favorites.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    const favoritesDOMList = view.transformApiToDOM(favorites, "photos");
    const favoritesDOMListContainer = view.findNode(".favorite-list");

    favoritesDOMList.forEach((item) => {
      view.renderDOM(favoritesDOMListContainer, item);
    });

    $(".photo-list__link").magnificPopup({ type: "image" });

    /**
     *
     * LOCAl sTORAGE LOGIC
     */
    this._localStorage();
  }
}

/**@EESC Router class*/
class Router {
  _hashChange() {
    let hash = null;
    if (!location.hash) {
      hash = "catalog";
    } else {
      hash = location.hash.slice(1);
    }

    const [name, id] = hash.split("/");
    //const hashInfo = { name, params: { id } }

    const routeName = name + "Route";

    if (name) {
      Controller[routeName]();
    }
  }

  init() {
    window.addEventListener("hashchange", this._hashChange);
    this._hashChange();
  }
}

/**@DESC entry point */
document.addEventListener("DOMContentLoaded", () => {
  const router = new Router();
  router.init();
});

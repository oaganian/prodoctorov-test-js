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
}
/**
 *@DESC View
 */
class View {
  clearMain() {
    const main = document.querySelector("main");
    main.innerHTML = "";
  }
  //HELPER FUNCTIONS

  /**
   *get list container for each entity
   * @param {string} containerSelector
   * @returns {object} ul
   */
  _getListContainer(containerSelector) {
    const container = document.querySelector(containerSelector);
    return container;
  }

  /**
   *Creates dom item
   * @param {string} className
   * @param {string} id
   * @param {string} innerHTML
   * @returns {object} domItem
   */
  _createDomItem(name, className, id = "", innerHTML = "") {
    const domItem = document.createElement(name);
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
  _transformUsersApiToDom(users) {
    return users.map((user) => {
      // create li element for each item
      const elem = this._createDomItem(
        "li",
        `user-list__item user-${user.id}`,
        "",
        user.name
      );

      // create ul inner container for each item
      const innerContainer = this._createDomItem(
        "ul",
        `user-${user.id}__albums album-list`
      );

      //create button open/close for each item
      const OCButton = this._createDomItem(
        "button",
        `open-albums open-albums--${user.id}`,
        user.id,
        ">"
      );

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
  _transformAlbumsApiToDom(albums) {
    return albums.map((album) => {
      // create li element for each item
      const elem = this._createDomItem(
        "li",
        `album-list__item album-${album.id}`,
        "",
        album.title
      );

      // create ul inner container for each item
      const innerContainer = this._createDomItem(
        "ul",
        `album-${album.id}__photos photo-list`
      );

      //create button open/close for each item
      const OCButton = this._createDomItem(
        "button",
        `open-photos open-photos--${album.id}`,
        album.id,
        ">"
      );

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
  _transformPhotosApiToDom(photos) {
    return photos.map((photo) => {
      // create li element for each item
      const elem = document.createElement("li");
      elem.className = "photo-list__item";
      // create link
      const a = document.createElement("a");
      a.href = photo.thumbnailUrl;
      a.dataset.fancybox = "gallary";
      a.dataset.caption = photo.title;
      a.className = "fancybox";
      // create img
      const img = document.createElement("img");
      img.src = photo.thumbnailUrl;
      img.title = photo.title;

      //
      a.appendChild(img);
      elem.appendChild(a);

      return elem;
    });
  }
  createMainList() {
    const list = document.createElement("ul");
    list.className = "user-list";

    const main = document.querySelector("main");
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
  render(data, selector, entity) {
    const container = this._getListContainer(selector);

    //render list by default
    let renderList = null;
    // choose what we render
    switch (entity) {
      case "users":
        renderList = this._transformUsersApiToDom(data);
        break;
      case "albums":
        //here we should set btn in open state
        const albumsBtn = document.querySelector(
          `.open-albums--${data[0].userId}`
        );
        albumsBtn.classList.add("albums--open");

        renderList = this._transformAlbumsApiToDom(data);
        break;
      case "photos":
        //here we should set btn in open state
        const photosBtn = document.querySelector(
          `.open-photos--${data[0].albumId}`
        );
        photosBtn.classList.add("photos--open");

        renderList = this._transformPhotosApiToDom(data);
        break;
    }

    renderList.forEach((item) => {
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
  unrender(id, selector, entity) {
    switch (entity) {
      case "albums":
        const albumsBtn = document.querySelector(`.open-albums--${id}`);
        albumsBtn.classList.remove("albums--open");
        break;
      case "photos":
        const photosBtn = document.querySelector(`.open-photos--${id}`);
        photosBtn.classList.remove("photos--open");
        break;
    }

    const list = document.querySelector(selector);
    list.innerHTML = "";
  }
}

/**@DESC UI class*/

class Controller {
  static async catalogRoute() {
    const model = new Model();
    const view = new View();
    view.clearMain();

    try {
      view.createMainList();
      /**load all users and display */
      const users = await model.getUsers();
      view.render(users, ".user-list", "users");

      /**handle "open curren user albums" button, and load albums*/
      let openBtn = document.querySelectorAll(".open-albums");
      openBtn.forEach((item) => {
        let flag = false;

        item.addEventListener("click", async (e) => {
          const currentUserId = Number(e.target.id);
          if (!flag) {
            /**load user albums with this id and render them*/
            const albums = await model.getUserAlbums(currentUserId);
            view.render(albums, `.user-${albums[0].userId}__albums`, "albums");

            flag = true;
          } else {
            view.unrender(
              currentUserId,
              `.user-${currentUserId}__albums`,
              "albums"
            );
            flag = false;
          }

          /**handle "open current album photos" button and load photos */
          let openPhotosBtn = document.querySelectorAll(".open-photos");
          openPhotosBtn.forEach((item) => {
            let flag = false;
            item.addEventListener("click", async (e) => {
              const currentAlbumId = Number(e.target.id);

              if (!flag) {
                const photos = await model.getUserPhotos(currentAlbumId);
                view.render(
                  photos,
                  `.album-${photos[0].albumId}__photos`,
                  "photos"
                );
                flag = true;
              } else {
                view.unrender(
                  currentAlbumId,
                  `.album-${currentAlbumId}__photos`,
                  "photos"
                );
                flag = false;
              }

              $().fancybox({
                selector: ".fancybox",
                beforeClose: function () {
                  location.reload();
                },
              });
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async favoriteRoute() {
    const model = new Model();
    const view = new View();

    view.clearMain();
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

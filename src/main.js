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
  //HELPER FUNCTIONS

  _getListContainer(containerSelector) {
    const container = document.querySelector(containerSelector);
    return container;
  }
  _createElements() {}

  //RENDER FUNCTIONS

  renderUsers(users) {
    const userList = document.querySelector(".user-list");
    /**create li for all users */
    users.forEach((user) => {
      let li = document.createElement("li");
      /**button open albums */
      let button = document.createElement("button");
      button.className = `open-albums`;
      button.id = user.id;
      button.innerHTML = ">";

      /**ul for albums */
      const ul = document.createElement("ul");
      ul.className = `user-${user.id}__albums album-list`;

      li.innerHTML = user.name;

      li.className = `user-list__item user-${user.id}`;
      li.appendChild(button);
      li.appendChild(ul);
      userList.appendChild(li);
    });
  }
  renderUserAlbums(albums) {
    const openBtn = document.getElementById(`${albums[0].userId}`);

    openBtn.classList.add("opened");

    const albumList = document.querySelector(
      `.user-${albums[0].userId}__albums`
    );

    //
    albums.forEach((album) => {
      const li = document.createElement("li");

      // open photos button
      let button = document.createElement("button");
      button.className = `open-photos`;
      button.id = album.id;
      button.innerHTML = ">";

      // ul for photos
      const ul = document.createElement("ul");
      ul.className = `album-${album.id}__photos photo-list`;

      //
      li.innerHTML = album.title;
      li.className = `album-list__item album-${album.id}`;
      li.appendChild(button);
      li.appendChild(ul);
      albumList.appendChild(li);
    });
  }
  unrenderUserAlbums(userId) {
    const openBtn = document.getElementById(`${userId}`);
    openBtn.classList.remove("opened");
    const albumList = document.querySelector(`.user-${userId}__albums`);
    albumList.innerHTML = "";
  }

  renderAlbumPhotos(photos) {
    const openBtn = document.getElementById(`${photos[0].albumId}`);
    openBtn.classList.add("photos-opened");

    const photoList = document.querySelector(
      `.album-${photos[0].albumId}__photos`
    );

    photos.forEach((photo) => {
      const li = document.createElement("li");
      const img = document.createElement("img");

      img.src = photo.thumbnailUrl;
      li.appendChild(img);
      photoList.appendChild(li);
    });
  }
  unrenderAlbumPhotos(albumId) {
    const openBtn = document.getElementById(`${albumId}`);
    openBtn.classList.remove("photos-opened");
    const photoList = document.querySelector(`.album-${albumId}__photos`);
    photoList.innerHTML = "";
  }
}

/**@DESC UI class*/

class Controller {
  static async catalogRoute() {
    const model = new Model();
    const view = new View();
    try {
      /**load all users and display */
      const users = await model.getUsers();
      view.renderUsers(users);

      /**handle "open curren user albums" button, and load albums*/
      let openBtn = document.querySelectorAll(".open-albums");
      openBtn.forEach((item) => {
        let flag = false;

        item.addEventListener("click", async (e) => {
          const currentUserId = Number(e.target.id);
          if (!flag) {
            /**load user albums with this id and render them*/
            const albums = await model.getUserAlbums(currentUserId);
            view.renderUserAlbums(albums);
            flag = true;
          } else {
            view.unrenderUserAlbums(currentUserId);
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
                view.renderAlbumPhotos(photos);
                flag = true;
              } else {
                view.unrenderAlbumPhotos(currentAlbumId);
                flag = false;
              }
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async favoriteRoute() {
    console.log("this is favorite route");
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

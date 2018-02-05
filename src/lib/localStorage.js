// @format

let localStorage = window.localStorage;
const favKey = 'FAVORITES';

Storage.prototype.setFavorite = favorite => {
  let favorites = JSON.parse(localStorage.getItem(favKey)) || [];
  favorites.push(favorite);
  localStorage.setItem(favKey, JSON.stringify(favorites));
};

Storage.prototype.removeFavorite = disfavored => {
  let favorites = JSON.parse(localStorage.getItem(favKey));
  let filteredFavorites = favorites.filter(favorite => favorite !== disfavored);
  localStorage.setItem(favKey, JSON.stringify(filteredFavorites));
};

Storage.prototype.getFavorites = () => {
  return JSON.parse(localStorage.getItem(favKey));
};

export default localStorage;

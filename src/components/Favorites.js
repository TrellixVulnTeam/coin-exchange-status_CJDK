// @format

import Exchanges from './Exchanges';

class Favorites extends Exchanges {
  favoritesDidUpdateHandler = () => {
    this.props.favoritesDidUpdateHandler(
      this.favoritesDidUpdateHandlerCallback,
    );
  };

  favoritesDidUpdateHandlerCallback = favs => {
    this.prepareExchanges(favs);
  };
}

export default Favorites;

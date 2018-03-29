// @format

import {isFirstRun} from '../constants';
import localStorage from './localStorage';

const getPageFrom = pathname => {
  switch (pathname) {
    case '/':
      /*
       * If they've NEVER been to the site, getItem will return null.
       * If they've been to the site and gotten past onboarding's top user 
       * benefits screen, then getItem should return 'false' (a string).
       * The only time it would be 'true' (a string) is if after they've
       * initially gotten past onboarding and started using the app, and then
       * went into settings and toggled the switch to show onboarding's top
       * user benefits.
       */
      return localStorage.getItem(isFirstRun) === 'false'
        ? 'home'
        : '/onboarding/top-user-benefits';
    default:
      return pathname;
  }
};

const value2Percent = value => {
  return Math.round(value * 100);
};

export {getPageFrom, value2Percent};

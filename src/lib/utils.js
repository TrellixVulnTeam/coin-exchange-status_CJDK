// @format

import {isFirstRun} from '../constants';
import localStorage from './localStorage';

const getPageFrom = pathname => {
  switch (pathname) {
    case '/':
      return localStorage.getItem(isFirstRun) === 'true'
        ? '/onboarding/top-user-benefits'
        : '/home';
    default:
      return pathname;
  }
};

export {getPageFrom};

// @format

const getPageFrom = pathname => {
  switch (pathname) {
    case '/':
      return window.localStorage.getItem(isFirstRun)
	? '/onboarding/top-user-benefits'
	: '/home';
    default:
      return pathname;
  }
};

export {getPageFrom};

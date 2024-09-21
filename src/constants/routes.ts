const ROUTES = {
  MAIN: "/",
  DETAIL: "/detail",
  MY: {
    default: "/my",
    activity: () => `${ROUTES.MY.default}/activity`,
    account: () => `${ROUTES.MY.default}/account`,
    bookmark: () => `${ROUTES.MY.default}/bookmark`,
  },
  SEARCH: {
    default: "/search",
    getById: (title: string) => `${ROUTES.SEARCH.default}?query=${title}`,
  },
  REDIRECT: {
    default: "/redirect",
    without_nickname: () => `${ROUTES.REDIRECT.default}/without-nickname`,
  },
  SIGN_UP_COMPLETE: "/sign-up-complete",
};

export default ROUTES;

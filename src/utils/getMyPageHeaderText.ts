import ROUTES from "@/constants/routes";

export default function getMyPageHeaderText(pathname: string) {
  const pathnameMap = {
    [ROUTES.MY.default]: "마이 페이지",
    [ROUTES.MY.activity()]: "내 활동",
    [ROUTES.MY.bookmark()]: "찜한 작품",
    [ROUTES.MY.account()]: "개인 정보",
  };
  const myPageHeaderText = pathnameMap[pathname];

  return { myPageHeaderText };
}

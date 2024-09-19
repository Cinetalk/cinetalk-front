import Header from "@/components/header/Header";
import HeaderAuthButtons from "@/components/header/headerRightSection/HeaderAuthButtons";
import HeaderAuthedUserSection from "@/components/header/headerRightSection/HeaderAuthedUserSection";
import { myAPIs } from "@/services/my/myAPIs";

export default async function HeaderContainer() {
  const user = await myAPIs.getUser();
  return (
    <div>
      <Header>
        {user ? (
          <HeaderAuthedUserSection>{user.nickname}</HeaderAuthedUserSection>
        ) : (
          <HeaderAuthButtons />
        )}
      </Header>
    </div>
  );
}

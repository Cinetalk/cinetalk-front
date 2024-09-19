import { cookies } from "next/headers";

import Header from "@/components/header/Header";
import HeaderAuthButtons from "@/components/header/headerRightSection/HeaderAuthButtons";
import HeaderAuthedUserSection from "@/components/header/headerRightSection/HeaderAuthedUserSection";

const getUser = async (): Promise<MyInfo | null> => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my/userInfo`, {
    headers: {
      access: accessToken,
    },
  });
  const data = await res.json();
  return data;
};

export default async function HeaderContainer() {
  const user = await getUser();
  return (
    <div>
      <Header>
        {user ? (
          <HeaderAuthedUserSection hasScrolledPast={true}>
            {user.nickname}
          </HeaderAuthedUserSection>
        ) : (
          <HeaderAuthButtons hasScrolledPast={true} />
        )}
      </Header>
    </div>
  );
}

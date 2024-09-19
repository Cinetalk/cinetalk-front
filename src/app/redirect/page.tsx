import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { authAPIS } from "@/services/auth/authAPIs";

export default async function Redirect({
  searchParams,
}: {
  searchParams: { authToken: string };
}) {
  const token = searchParams.authToken;
  if (!token) notFound();
  const data = await authAPIS.authBy(token);
  const accessToken = data.res.headers.get("access");
  if (data.data) redirect(`/?${process.env.COOKIE_KEY}=${accessToken}`);

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* <Suspense fallback={<LoadingSpinner size="3xl" color="primary" />}>
        <Test token={searchParams.authToken} />
      </Suspense> */}
    </div>
  );
}

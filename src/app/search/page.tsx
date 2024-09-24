import { Suspense } from "react";

import SearchContainer from "@/app/search/_components/Container";
import { SearchContainerSkeleton } from "@/app/search/_components/skeletons/Skeletons";
import Footer from "@/components/footer/Footer";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  return (
    <div className="mt-3 Tablet:mt-4 Laptop:mt-8 Desktop:mt-16">
      {/* <Suspense key={query} fallback={<SearchContainerSkeleton />}> */}
      <SearchContainer query={searchParams.query} />
      <Footer />
    </div>
  );
}

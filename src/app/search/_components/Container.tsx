import clsx from "clsx";

import SearchListContainer from "@/app/search/_components/list/ListContainer";
import Tab, { TabButton } from "@/app/search/_components/Tab";
import { searchPageAPIs } from "@/services/search/searchPageAPIs";

interface SearchContainerProps {
  query: string;
}

export default async function SearchContainer({ query }: SearchContainerProps) {
  const [results, relatedKeywords] = await Promise.all([
    searchPageAPIs.findResult(query),
    searchPageAPIs.getRelatedKeywords(query),
  ]);
  const isEmpty = !results.movielist.length && !results.reviewlist.length;
  return (
    <div className="mx-auto px-5 Tablet:px-6 Laptop:max-w-[1144px] Laptop:px-0 Desktop:max-w-[1560px]">
      <div className="">
        <h1 className="Text-l-Bold Tablet:Text-xl-Bold">
          <strong className="mr-2 text-Primary">{query}</strong>
          검색결과
        </h1>
        <div
          className={clsx(
            isEmpty && "Laptop:mb-7 Desktop:mb-11",
            "my-3 Tablet:mb-3 Tablet:mt-4 Laptop:mb-6 Laptop:mt-7 Desktop:mb-6 Desktop:mt-11",
          )}
        >
          <Tab>
            <TabButton isDefault>전체</TabButton>
            <TabButton>영화 {results.movielist.length}</TabButton>
            <TabButton>톡 {results.reviewlist.length}</TabButton>
          </Tab>
        </div>
      </div>
      <div className="mb-[100px] Tablet:mb-[160px] Laptop:mb-[180px] Desktop:mb-[200px]">
        <SearchListContainer
          relatedKeywords={relatedKeywords}
          isEmpty={isEmpty}
          movies={results.movielist}
          revires={results.reviewlist}
        />
      </div>
    </div>
  );
}

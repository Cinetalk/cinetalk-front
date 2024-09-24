function KeywordSkeleton() {
  return (
    <div className="flex h-10 w-[89px] animate-pulse rounded-[20px] bg-D2_Gray" />
    // <div className="relative flex h-10 w-[89px] animate-pulse rounded-[20px] bg-D2_Gray px-4 py-1 Tablet:px-6 Tablet:py-2" />
  );
}

export function KeywordsSkeleton() {
  return (
    <div className="flex max-w-[358px] flex-wrap justify-center gap-x-3 gap-y-2 px-5 Tablet:max-w-[541px] Tablet:gap-6 Tablet:px-0">
      <KeywordSkeleton />
      <KeywordSkeleton />
      <KeywordSkeleton />
      <KeywordSkeleton />
      <KeywordSkeleton />
    </div>
  );
}

function MovieItemSkeleton() {
  return (
    <div className="h-[230px] animate-pulse rounded-xl bg-D2_Gray Tablet:h-[341px] Laptop:h-[260px] Desktop:h-[360px]" />
  );
}

function ItemHeaderSkeleton() {
  return <div className="h-6 w-[238px] animate-pulse rounded bg-D2_Gray" />;
}

export function SearchContainerSkeleton() {
  return (
    <div className="mx-auto px-5 Tablet:px-6 Laptop:max-w-[1144px] Laptop:px-0 Desktop:max-w-[1560px]">
      <div className="flex flex-col gap-[104px]">
        <div className="h-10 w-[238px] animate-pulse rounded bg-D2_Gray" />
        <div className="flex flex-col gap-[235px]">
          <div className="mb-[100px] Tablet:mb-[160px] Laptop:mb-[180px] Desktop:mb-[200px]">
            <div className="flex flex-col gap-10">
              <ItemHeaderSkeleton />
              <div className="grid grid-cols-2 gap-2 Tablet:grid-cols-3 Tablet:gap-5 Laptop:grid-cols-6 Desktop:gap-6">
                <MovieItemSkeleton />
                <MovieItemSkeleton />
                <MovieItemSkeleton />
                <MovieItemSkeleton />
                <MovieItemSkeleton />
                <MovieItemSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

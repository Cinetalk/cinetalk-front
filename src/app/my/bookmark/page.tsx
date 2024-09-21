import Placeholder from "@/app/my/_components/Placeholder";
import BookmarkList from "@/app/my/bookmark/List";
import { myAPIs } from "@/services/my/myAPIs";

export default async function Page() {
  const movies = await myAPIs.getBookmark();

  return (
    <div className="flex flex-col gap-3 px-5 Tablet:px-0">
      <BookmarkList movies={movies} />
    </div>
  );
}

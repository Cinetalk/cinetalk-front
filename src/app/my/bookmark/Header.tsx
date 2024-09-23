import Button from "@/components/buttons/Button";

interface BookmarkHeaderProps {
  movies: Bookmark[];
  isEditing: boolean;
  onToggle: () => void;
  selectedMovieIds: number[];
  setSelectedMovieIds: React.Dispatch<React.SetStateAction<number[]>>;
  onBookmarkDelete: () => Promise<void>;
  loading: boolean;
}

export default function BookmarkHeader({
  movies,
  isEditing,
  selectedMovieIds,
  setSelectedMovieIds,
  onToggle,
  loading,
  onBookmarkDelete,
}: BookmarkHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center Text-m-Bold Tablet:Text-l-Bold">
        {isEditing ? (
          <span className="">{selectedMovieIds.length}개 선택됨</span>
        ) : (
          <>
            <span className="hidden Tablet:block">
              찜한 작품 {movies.length}개
            </span>
            <span className="block Tablet:hidden">총 {movies.length}개</span>
          </>
        )}
      </h2>
      <div className="flex gap-2 Text-m-Medium">
        {isEditing && (
          <>
            <Button
              disabled={!selectedMovieIds.length || loading}
              variant={"text"}
              onClick={onBookmarkDelete}
              className="hidden text-Error hover:text-Error Tablet:flex"
            >
              삭제
            </Button>
            <Button
              disabled={!selectedMovieIds.length}
              variant={"text"}
              onClick={() => setSelectedMovieIds([])}
              className="hidden Tablet:flex"
            >
              선택 해제
            </Button>
          </>
        )}
        <Button
          disabled={!isEditing && !movies.length}
          className="Tablet:flex"
          variant={"text"}
          onClick={onToggle}
        >
          {isEditing ? "완료" : "편집"}
        </Button>
      </div>
    </div>
  );
}

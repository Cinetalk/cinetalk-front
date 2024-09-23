"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { BookmarkMobileButtons } from "@/app/my/_components/buttons";
import Placeholder from "@/app/my/_components/Placeholder";
import BookmarkHeader from "@/app/my/bookmark/Header";
import { deleteBookmark } from "@/services/my/actions";

import { Check } from "../../../../public/icons";

interface BookmarkListProps {
  movies: Bookmark[];
}

export default function BookmarkList({ movies }: BookmarkListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovieIds, setSelectedMovieIds] = useState<number[]>([]);
  const handleBookmarkToggle = () => {
    if (!isEditing) return setIsEditing(true);
    setSelectedMovieIds([]);
    setIsEditing(false);
  };
  const handleBookmarkAdd = (id: number) => {
    if (selectedMovieIds.includes(id)) {
      return setSelectedMovieIds((prev) =>
        prev.filter((movieId) => movieId !== id),
      );
    }
    setSelectedMovieIds((prev) => [...prev, id]);
  };

  const handleBookmarkDelete = async () => {
    setLoading(true);
    const result = await deleteBookmark(selectedMovieIds);
    setLoading(false);
    if (result) {
      setIsEditing(false);
      setSelectedMovieIds([]);
    }
  };

  return (
    <>
      <BookmarkHeader
        loading={loading}
        onBookmarkDelete={handleBookmarkDelete}
        onToggle={handleBookmarkToggle}
        isEditing={isEditing}
        movies={movies}
        selectedMovieIds={selectedMovieIds}
        setSelectedMovieIds={setSelectedMovieIds}
      />
      {movies.length ? (
        <div className="grid grid-cols-2 gap-2 Tablet:grid-cols-3 Tablet:gap-x-5 Tablet:gap-y-4 Laptop:grid-cols-4 Laptop:gap-x-6 Laptop:gap-y-5">
          {movies.map((movie) => (
            <button
              disabled={!isEditing}
              onClick={() => handleBookmarkAdd(movie.id)}
              key={movie.id}
              type="button"
              className={clsx(
                isEditing &&
                  selectedMovieIds.includes(movie.id) &&
                  "outline outline-2 outline-Primary Tablet:outline-4",
                `relative h-[230px] w-full overflow-hidden rounded-xl Tablet:h-[288px] Laptop:h-[331px]`,
              )}
            >
              <Image
                fill
                src={movie.poster_path}
                alt={movie.poster_path}
                className={clsx(
                  isEditing &&
                    selectedMovieIds.includes(movie.id) &&
                    "brightness-50",
                  `object-cover`,
                )}
              />
              {selectedMovieIds.includes(movie.id) && isEditing && (
                <div className="absolute right-2 top-2 rounded-lg bg-Primary">
                  <Image src={Check} width={24} height={24} alt="CircleCheck" />
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Placeholder type="bookmark" />
        </div>
      )}
      {isEditing && (
        <BookmarkMobileButtons
          loading={loading}
          onBookmarkDelete={handleBookmarkDelete}
          selectedMovieIds={selectedMovieIds}
          setSelectedMovieIds={setSelectedMovieIds}
        />
      )}
    </>
  );
}

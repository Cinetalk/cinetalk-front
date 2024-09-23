"use client";

import { useState } from "react";

import BadgeItem from "@/app/my/_components/badge/Item";
import BadgeTitle from "@/app/my/_components/badge/Title";

interface BadgeProps {
  badges: EarnedBadge[];
  reviewCounts: (BadgeCount | undefined)[];
}

export default function BadgeWarpper({ badges, reviewCounts }: BadgeProps) {
  const activeBadges = badges.filter((badge) => badge.use);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMovieIds, setSelectedMovieIds] = useState<number[]>(
    activeBadges.map((badge) => badge.genre_id),
  );

  const toggleMovie = (id: number) => {
    if (selectedMovieIds.includes(id))
      return setSelectedMovieIds((prev) =>
        prev.filter((prevId) => prevId !== id),
      );
    setSelectedMovieIds((prev) => [...prev, id]);
  };

  const toggleEditing = async () => setIsEditing((prev) => !prev);
  return (
    <>
      <BadgeTitle
        selectedMovieIds={selectedMovieIds}
        hasBadge={!!badges.length}
        toggleEditing={toggleEditing}
        isEditing={isEditing}
      />
      <div className="grid grid-cols-3 gap-3 Tablet:grid-cols-4 Tablet:gap-5 Laptop:grid-cols-6 Laptop:gap-x-6 Laptop:gap-y-4">
        {reviewCounts.map((review) => (
          <BadgeItem
            isActive={!!selectedMovieIds.find((id) => id === review?.id)}
            isEditing={isEditing}
            toggleMovie={toggleMovie}
            isSelected={!!selectedMovieIds.find((id) => id === review?.id)}
            key={review?.name}
            badge={review}
          />
        ))}
      </div>
    </>
  );
}

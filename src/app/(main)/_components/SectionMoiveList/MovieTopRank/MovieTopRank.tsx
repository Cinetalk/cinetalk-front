"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { ChevronDown } from "@/../public/icons";
import Button from "@/components/buttons/Button";
import Dropdown from "@/components/dropdown/dropdown";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { movieAPIs } from "@/services/movie/movieAPIs";

import DeskTop_BestMovie from "./DeskTop_BestMoive";
import Laptop_BestMovie from "./Laptop_BestMovie";
import Mobile_BestMovie from "./Mobile_BestMovie";
import Tablet_BestMoive from "./Tablet_BestMoive";
export default function MoiveTopRank() {
  const [filter, setFilter] = useState(0);

  const MovieGenreType = [
    {
      name: "전체",
      index: 0,
    },
    { name: "액션", index: 28 },
    { name: "모험", index: 12 },
    { name: "범죄", index: 80 },
    { name: "스틸러", index: 53 },
    { name: " 로맨스", index: 10749 },
    { name: "코미디", index: 35 },
    { name: "판타지", index: 14 },
    { name: "공포", index: 27 },
    { name: "드라마", index: 18 },
    { name: "가족", index: 10751 },
    { name: "SF", index: 878 },
    { name: "애니메이션", index: 16 },
    { name: "다큐멘터리", index: 99 },
    { name: "음악", index: 10402 },
    { name: "역사", index: 36 },
    { name: "전쟁", index: 10752 },
    { name: "서부", index: 37 },
    { name: "TV영화", index: 10770 },
  ];

  const [MovieTopTenData, setMovieTopTenData] = useState<Movie_TopTen | null>(
    null,
  );

  // const MovieMasterPiece: MovieHidingPiece = await movieAPIs.getHidingPiece();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieAPIs.getMovieTopTen(filter);
        setMovieTopTenData(response);
      } catch (error) {
        console.error("영화를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMovie();
  }, [filter]);
  return (
    <div className="flex flex-col gap-4  ">
      <div className="flex justify-between">
        <div className="flex items-center gap-[24px]">
          <h1 className="Text-l-Bold Laptop:Text-xxl-Bold">영화톡TOP10</h1>
          <Dropdown type="genre">
            <Dropdown.Trigger>
              <div className="text-white">전체</div>
            </Dropdown.Trigger>

            <Dropdown.List>
              {MovieGenreType.map((genre, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setFilter(genre.index)}
                  >
                    {genre.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
      {!MovieTopTenData ? (
        <div className="flex items-center justify-center px-5 py-5">
          <LoadingSpinner size="2xl" color="primary" />
        </div>
      ) : (
        <div>
          {/* 모바일 */}
          <Tablet_BestMoive MovieData={MovieTopTenData} />
          <DeskTop_BestMovie MovieData={MovieTopTenData} />
          <Laptop_BestMovie MovieData={MovieTopTenData} />
          <Mobile_BestMovie MovieData={MovieTopTenData} />
        </div>
      )}
    </div>
  );
}

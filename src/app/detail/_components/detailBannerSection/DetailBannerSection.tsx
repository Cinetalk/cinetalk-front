"use client";

import { Palette } from "color-thief-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import useDevice from "@/hooks/useDevice";

import hexToRGBA from "../../../../utils/hexToRGBA";
import { usePaletteStore } from "../../_stores/usePaletteStore";
import DetailBannerBottom from "./DetailBannerBottom";

interface DetailBannerSectionProps {
  movieId: number;
  movieDetailData: MovieDetailData;
}

export default function DetailBannerSection({
  movieId,
  movieDetailData,
}: DetailBannerSectionProps) {
  const { gradientStyle, setGradientStyle } = usePaletteStore();
  // const posterImage =
  //   "https://image.tmdb.org/t/p/w220_and_h330_face" +
  //   movieDetailData.posterImg.split("/original")[1];
  const posterImage = movieDetailData.posterImg;
  const backgroundImage = movieDetailData.backGroundImg;
  const { device } = useDevice();
  const isSm = device === "mobile" || device === "tablet";
  const pathname = usePathname();
  useEffect(() => {
    if (gradientStyle) setGradientStyle("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setGradientStyle]);

  return (
    <section className="relative mt-[-64px] h-[380px] w-full Tablet:h-[420zyx] Laptop:mt-[-80px] Laptop:h-[640px] Desktop:h-[816px]">
      <div
        className="flex h-full w-full bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(38, 38, 38, 0.50) 0%, rgba(38, 38, 38, 0.20) 50%, #262626 100%), url('${isSm ? posterImage : backgroundImage}')`,
        }}
      >
        <DetailBannerBottom
          movieId={movieId}
          movieDetailData={movieDetailData}
        />
      </div>

      <Palette
        src={
          "https://image.tmdb.org/t/p/w220_and_h330_face" +
          movieDetailData.posterImg.split("/original")[1]
        }
        crossOrigin="anonymous"
        format="hex"
        colorCount={2}
      >
        {({ data }) => {
          if (data && data.length >= 2) {
            const newGradientStyle = `linear-gradient(135deg, ${hexToRGBA(data[0], 0.38)}, ${hexToRGBA(data[1], 0.38)})`;

            if (gradientStyle !== newGradientStyle) {
              setTimeout(() => {
                setGradientStyle(newGradientStyle);
              }, 0);
            }

            return null;
          }
          return null;
        }}
      </Palette>
    </section>
  );
}

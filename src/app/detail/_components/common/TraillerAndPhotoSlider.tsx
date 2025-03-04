import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useDetailSwiper from "@/app/detail/_hooks/useDetailSwiper";
import Button from "@/components/buttons/Button";
import hexToRGBA from "@/utils/hexToRGBA";

import {
  ChevronLeftMd,
  ChevronRightMd,
  VideoPlay,
} from "../../../../../public/icons";
import PhotoModal from "./PhotoModal";

interface TrailerAndPhotoSliderProps {
  type: "trailer" | "photo";
  trailer?: string[];
  photo?: DetailImageDTO[];
}

export default function TrailerAndPhotoSlider({
  type,
  trailer,
  photo,
}: TrailerAndPhotoSliderProps) {
  const {
    hovered,
    setHovered,
    swiper,
    setSwiper,
    forceUpdate,
    handleNext,
    handlePrev,
    traillerAndPhotoSpaceBetween,
  } = useDetailSwiper("traillerAndPhoto");
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [photoModalIndex, setPhotoModalIndex] = useState<number | null>(null);

  const handleClickPhoto = (i: number) => {
    setOpenPhotoModal(true);
    setPhotoModalIndex(i);
  };

  const trailerOpacity = hexToRGBA("#000000", 0.4);

  useEffect(() => {
    const handlePressESC = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setOpenPhotoModal(false);
      }
    };

    addEventListener("keydown", handlePressESC);
    return () => removeEventListener("keydown", handlePressESC);
  }, []);

  return (
    <div
      className="relative mt-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={traillerAndPhotoSpaceBetween}
        slidesPerView={"auto"}
        onSlideChange={forceUpdate}
        onSwiper={(e) => {
          setSwiper(e);
        }}
      >
        {type === "trailer" &&
          [...(trailer || [])].reverse()?.map((el, i) => (
            <SwiperSlide
              key={i}
              className="relative max-w-[320px] Tablet:max-w-[352px] Laptop:max-w-[271px] Desktop:max-w-[372px]"
            >
              <Link
                href={`https://www.youtube.com/watch?v=${el}`}
                target="_BLANK"
              >
                <div
                  style={{
                    backgroundColor: trailerOpacity,
                  }}
                  className="absolute h-full w-full"
                />
                <Image
                  unoptimized
                  width={500}
                  height={500}
                  src={`https://img.youtube.com/vi/${el}/maxresdefault.jpg`}
                  alt="썸네일"
                  className="h-[182px] w-full rounded-lg Tablet:h-[200px] Laptop:h-[150px] Laptop:rounded-xl Desktop:h-[210px]"
                />
                <Image
                  unoptimized
                  src={VideoPlay}
                  alt="재생"
                  className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                />
              </Link>
            </SwiperSlide>
          ))}
        {type === "photo" &&
          photo?.map((el, i) => (
            <SwiperSlide
              key={i}
              className="max-w-[320px] cursor-pointer Tablet:max-w-[352px] Laptop:max-w-[271px] Desktop:max-w-[372px]"
            >
              <Image
                unoptimized
                width={500}
                height={500}
                src={el.filePath}
                alt="포토"
                onClick={() => handleClickPhoto(i)}
                className="h-[182px] w-full rounded-lg Tablet:h-[200px] Laptop:h-[150px] Laptop:rounded-xl Desktop:h-[210px]"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {swiper && !swiper.isBeginning && (
        <Button
          onClick={handlePrev}
          variant="arrow1"
          className={`absolute hidden Laptop:flex ${hovered ? "opacity-100" : "opacity-0"} left-0 top-1/2 z-[5] translate-x-[-50%] translate-y-[-50%] transition-opacity duration-300`}
        >
          <Image unoptimized src={ChevronLeftMd} alt="이전" />
        </Button>
      )}

      {swiper && !swiper.isEnd && (
        <Button
          onClick={handleNext}
          variant="arrow1"
          className={`absolute hidden Laptop:flex ${hovered ? "opacity-100" : "opacity-0"} right-0 top-1/2 z-[5] translate-x-[50%] translate-y-[-50%] transition-opacity duration-300`}
        >
          <Image unoptimized src={ChevronRightMd} alt="다음" />
        </Button>
      )}
      {openPhotoModal && (
        <PhotoModal
          {...{ openPhotoModal, setOpenPhotoModal, photo, photoModalIndex }}
        />
      )}
    </div>
  );
}

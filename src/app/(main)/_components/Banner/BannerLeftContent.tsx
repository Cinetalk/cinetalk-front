import Image from "next/image";

import { StarFillMd, StarFillSm } from "@/../public/icons";
import useDevice from "@/hooks/useDevice";

import PostCard from "../PostCard";
interface BannerItemsType {
  BannerItem: BannerDTO;
}

export default function BannerLeftContent({ BannerItem }: BannerItemsType) {
  const { device } = useDevice();
  return (
    <div className="flex  h-full w-full flex-col justify-between gap-9 Tablet:w-[220px] Tablet:justify-end Laptop:w-[400px]">
      <div className="hidden Laptop:block ">
        <PostCard background={BannerItem?.poster_path} />
      </div>
      <div className="flex  h-full  flex-col  justify-between Tablet:gap-3  Laptop:justify-between  Laptop:gap-5  ">
        <div className="flex flex-col gap-1  Laptop:flex-row Laptop:gap-4 ">
          <span className="Text-m-Bold Laptop:hidden ">실시간 핫한 톡</span>
          <div className="flex items-center gap-4">
            <h3 className="line-clamp-1 Text-xl-Bold Laptop:Text-xxxl-Bold ">
              {BannerItem?.movienm}
            </h3>
          </div>
        </div>
        <ul className="flex gap-9   Tablet:gap-9 Laptop:gap-12">
          <li className="flex flex-col gap-2 text-Silver ">
            <h4 className="text-center Text-xs-Regular Laptop:Text-s-Medium">
              평점
            </h4>
            <div className=" h-[21px]text-center flex items-center text-Primary Text-s-Bold Laptop:gap-1 Laptop:Text-l-Bold">
              {device == "laptop" || device == "desktop" ? (
                <Image src={StarFillMd} alt="star" className="h-6 w-6" />
              ) : (
                <Image src={StarFillSm} alt="star" className="h-4 w-4" />
              )}
              <span className="flex items-center ">
                {BannerItem?.rate.toFixed(1)}
              </span>
            </div>
          </li>
          <li className="flex flex-col gap-2  text-Silver">
            <h4 className="text-center Text-xs-Regular Laptop:Text-s-Medium ">
              Best 키워드
            </h4>
            <h4 className="text-center Text-s-Bold Laptop:Text-l-Bold">
              {BannerItem?.keyword == null ? "-" : BannerItem?.keyword}
            </h4>
          </li>
          <li className="flex flex-col gap-2  text-Silver">
            <h4 className="text-center Text-xs-Regular Laptop:Text-s-Medium">
              장르
            </h4>
            <h4 className="text-center Text-s-Bold Laptop:Text-l-Bold">
              {BannerItem?.genres[0].name}
            </h4>
          </li>
        </ul>
      </div>
    </div>
  );
}

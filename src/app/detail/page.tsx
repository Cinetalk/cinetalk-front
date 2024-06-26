import React from "react";

import DetailBannerSection from "./_components/detailBannerSection/DetailBannerSection";
import DetailInfo from "./_components/detailInfo/DetailInfo";
import TrailerAndPhoto from "./_components/keywordAndTalkAndGallery/gallery/trailerAndPhoto/TrailerAndPhoto";
import Keyword from "./_components/keywordAndTalkAndGallery/keyword/Keyword";
import KeywordAndTalkAndGallery from "./_components/keywordAndTalkAndGallery/KeywordAndTalkAndGallery";
import Talk from "./_components/keywordAndTalkAndGallery/talk/Talk";
import KeywordBar from "./_components/keywordBar/KeywordBar";

export default function Detail() {
  return (
    <div className="bg-BG">
      <DetailBannerSection />
      <div className="mx-5 mb-[100px] mt-[137px] Tablet:mx-6 Tablet:mb-40 Tablet:mt-[118px] Laptop:mx-[68px] Laptop:mb-[180px] Laptop:mt-7 Desktop:mx-auto Desktop:mb-[200px] Desktop:w-[1560px]">
        <KeywordBar />
        <section className="flex flex-col Laptop:gap-[100px]">
          <DetailInfo />
          <div className="hidden Laptop:block">
            <TrailerAndPhoto />
          </div>

          <section className="hidden Laptop:flex Laptop:gap-7 Desktop:gap-9">
            <div className="w-[67.74%]">
              <Talk />
            </div>
            <div className="w-[32.26%]">
              <Keyword />
            </div>
          </section>

          <KeywordAndTalkAndGallery />
        </section>
      </div>
    </div>
  );
}

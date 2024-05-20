import Image from "next/image";
import React from "react";

import { Star, TMDB } from "../../../../../public/icons";
import { movieInfo } from "../../fakeData";

export default function DetailBannerBottomLeft() {
  return (
    <section className="mt-auto flex flex-col gap-1">
      <section className="mb-2 flex flex-col-reverse items-center gap-1 Laptop:mb-0 Laptop:flex-row Laptop:gap-4">
        <h2 className="Text-xl-Bold Laptop:Text-xxxl-Bold text-Silver">웡카</h2>
        <div className="Text-xs-Regular Laptop:Text-m-Medium flex items-center justify-center rounded-[35px] border-[1px] border-White px-3 py-1 Laptop:border-[2px] Laptop:px-4 Laptop:py-2">
          상영중
        </div>
      </section>

      <section className="flex flex-col items-center Laptop:mb-0 Laptop:flex-row Laptop:gap-6">
        <section className="mb-2 flex gap-6 Laptop:mb-0">
          <section className="flex items-center gap-1">
            <Image src={Star} alt="별점" />
            <p className="Text-m-Bold Laptop:Text-xxl-Bold text-Primary">0.0</p>
          </section>

          <section className="flex gap-1">
            <Image src={TMDB} alt="TMDB" />
            <p className="Text-m-Bold Laptop:Text-xxl-Bold text-Silver">0.0</p>
          </section>
        </section>

        <section className="absolute bottom-[-2px] mb-5 flex w-[300px] translate-y-[150%] flex-wrap justify-center Tablet:bottom-[-4px] Tablet:w-fit Tablet:translate-y-[200%] Laptop:static Laptop:bottom-0 Laptop:mb-0 Laptop:translate-y-0 Laptop:flex-nowrap">
          {movieInfo.map((info, i) => (
            <p
              key={i}
              className={`Text-xs-Regular Laptop:Text-m-Medium group relative px-3 text-L_Gray Laptop:px-[10px] Laptop:text-Silver ${i === 0 && "pl-0"} last:after:border-none`}
            >
              {info}
              {i !== movieInfo.length - 1 && (
                <span
                  className={`absolute ${i === movieInfo.length - 2 && "hidden Tablet:block"} right-0 top-1/2 h-3 w-[1px] translate-y-[-50%] transform bg-D3_Gray after:content-[''] Laptop:bg-Silver`}
                />
              )}
            </p>
          ))}
        </section>
      </section>
    </section>
  );
}
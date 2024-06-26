import PostCard from "../PostCard";

export default function LeftMovePost() {
  {
    /*
  1. 임시로 모바일 텍스트
  2. 나중에 테블릿 ,렙탑, 데탑 사즈로
*/
  }
  return (
    <div className="flex  flex-col gap-9 Tablet:justify-end   ">
      <div className="hidden Laptop:block Desktop:block">
        <PostCard />
      </div>
      <div className="flex flex-col gap-[181px]  Tablet:gap-3  Laptop:justify-between   Laptop:gap-5  Desktop:gap-5 ">
        <div className="Desktop:flew-row flex flex-col gap-1  Laptop:flex-row Laptop:gap-4 Desktop:gap-4">
          <span className="Text-m-Bold Laptop:hidden Desktop:hidden">
            실시간 핫한 톡
          </span>
          <div className="flex gap-3">
            <h1 className="Text-xl-Bold Laptop:Text-xxxl-Bold">윙카</h1>
            <div className="font-regular   hidden items-center justify-center rounded-[35px] border-[1px] px-[12px]  py-[4px] Tablet:flex Laptop:flex Desktop:flex ">
              상영중
            </div>
          </div>
        </div>
        <div>
          <ul className="flex justify-between Tablet:gap-8 Laptop:gap-[48px] Desktop:gap-[48px]">
            <li className="flex flex-col gap-2  ">
              <h4 className="Labtop:Text-s-Mediuim Desktop:Text-s-Mediuim text-center Text-xs-Regular">
                평점
              </h4>
              <h1 className=" Desktop:Text-I-Bold Labtop:Text-I-Bold text-md text-Primary Text-s-Bold">
                0.0
              </h1>
            </li>
            <li className="flex flex-col gap-[8px] ">
              <h4 className="text-center Text-xs-Regular">Best키워드</h4>
              <h1 className="Text-s-Bold">초코릿향</h1>
            </li>
            <li className="flex flex-col gap-[8px]">
              <h4 className="text-center Text-xs-Regular ">누적 관객수</h4>
              <h1 className="Text-s-Bold">0.0만명</h1>
            </li>
            <li className="flex flex-col gap-[8px]">
              <h4 className="text-center Text-xs-Regular">장르</h4>
              <h1 className="Text-s-Bold">판타지</h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

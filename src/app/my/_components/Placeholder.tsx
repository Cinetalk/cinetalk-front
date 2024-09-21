import Button from "@/components/buttons/Button";
import ROUTES from "@/constants/routes";

interface Props {
  type: "rating" | "review" | "bookmark";
}

const MESSAGES = {
  rating: {
    title: "아직 영화를 평가한 적이 없어요.",
    desc: "영화에 대한 생각을 나눠보세요 :)",
    button: "평가 하러가기",
  },
  review: {
    title: "아직 톡을 작성한 적이 없어요.",
    desc: "영화에 대한 생각을 나눠보세요 :)",
    button: "톡 작성하러 가기",
  },
  bookmark: {
    title: "찜한 영화가 없어요.",
    desc: "보고 싶은 영화를 찾아보세요 :)",
    button: "찜 하러가기",
  },
};

export default function Placeholder({ type }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-[120px] Tablet:gap-9 Tablet:py-20">
      <div className="flex flex-col items-center gap-1 text-Gray Tablet:gap-3">
        <p className="text-m-bold Tablet:Text-xl-Bold">
          {MESSAGES[type].title}
        </p>
        <p className="Text-s-Regular Tablet:Text-m-Medium">
          {MESSAGES[type].desc}
        </p>
      </div>
      <div>
        <Button
          variant={"orange"}
          size={"lg"}
          href={ROUTES.MAIN}
          className="w-[154px] Tablet:w-[180px]"
        >
          {MESSAGES[type].button}
        </Button>
      </div>
    </div>
  );
}

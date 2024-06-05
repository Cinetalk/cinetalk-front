import { ChangeEvent, FormEvent, useState } from "react";

import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

import SpeechBubble from "../../../../../components/speechBubble/SpeechBubble";

export default function KeywordForm() {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    } else {
      setValue(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full Laptop:static">
      <div className="absolute left-1/2 top-[-13px] w-[305px] translate-x-[-50%] translate-y-[-100%] Laptop:hidden">
        <SpeechBubble dir="bottom">
          떠오르는 단어를 작성하거나, 키워드를 눌러보세요!
        </SpeechBubble>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl ">
        <input
          type="text"
          placeholder="‘웡카’를 한단어로 말한다면?"
          maxLength={5}
          onFocus={() => setFocused(true)}
          onChange={(e) => handleChange(e)}
          className="h-[45px] w-full bg-[rgba(0,0,0,0.20)] py-2 pl-4 pr-3 text-Gray_Orange outline-none Text-s-Medium placeholder:text-Gray Tablet:Text-m-Medium"
        />

        <section className="absolute right-3 top-1/2 flex translate-y-[-50%] items-center gap-2">
          {focused && (
            <p className="text-Gray Text-s-Regular">{value?.length}/5</p>
          )}
          <button
            type="submit"
            disabled={!value || loading}
            className={`flex h-[29px] w-[60px] items-center justify-center rounded-lg ${!value ? "bg-D2_Gray text-Gray" : "bg-Primary text-Silver"} Text-s-Medium`}
          >
            {loading ? <LoadingSpinner color="white" size="xs" /> : "올리기"}
          </button>
        </section>
      </div>
    </form>
  );
}

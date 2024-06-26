import { useLayoutEffect, useState } from "react";

import Replies from "./replies/Replies";
import TalkContentsBody from "./TalkContentsBody";
import TalkContentsFooter from "./TalkContentsFooter";
import TalkContentsHeader from "./talkContentsHeader/TalkContentsHeader";

export default function TalkContents() {
  const [spoiler, setSpoiler] = useState(true);
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  useLayoutEffect(() => {
    if (!spoiler) setShowSpoiler(true);
  }, [spoiler]);

  return (
    <div className="border-b-[1px] border-D1_Gray py-5 first:mt-4 last:border-b-0 Tablet:mt-5 Tablet:py-6 Laptop:border-D2_Gray">
      <TalkContentsHeader />
      <TalkContentsBody
        {...{ spoiler, showSpoiler, setShowSpoiler, showReplies }}
      />
      <TalkContentsFooter
        {...{ spoiler, showSpoiler, showReplies, setShowReplies }}
      />
      {showReplies && <Replies />}
    </div>
  );
}

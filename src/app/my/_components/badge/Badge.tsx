import BadgeWarpper from "@/app/my/_components/badge/Warpper";
import { EMOJI_MAP } from "@/constants/emoji";
import { myAPIs } from "@/services/my/myAPIs";

export default async function Badge() {
  const [reviewCounts, badges] = await Promise.all([
    myAPIs.getReviewCounts(),
    myAPIs.getBadges(),
  ]);
  const sortedReviewCounts = EMOJI_MAP.map((emoji) =>
    reviewCounts.find((review) => review.id === emoji.id),
  );
  return (
    <section className="flex flex-col gap-4 p-5 Tablet:p-0">
      <BadgeWarpper badges={badges} reviewCounts={sortedReviewCounts} />
    </section>
  );
}

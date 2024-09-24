import { useSearchParams } from "next/navigation";

export default function useQueryString() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const query = searchParams.get("query");

  return { tab: !tab || tab === "전체" ? "전체" : tab, query };
}

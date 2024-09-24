import { CustomFetch } from "@/services/my/myAPIs";

export const searchPageAPIs = {
  findResult: async (
    key: string,
  ): Promise<{ reviewlist: ReviewResult[]; movielist: MovieResult[] }> => {
    const data = await new CustomFetch().fetch(`/find/findResult?query=${key}`);
    return data;
  },
  getRelatedKeywords: async (key: string): Promise<string[]> => {
    const data = await new CustomFetch().fetch(`/find/findText?query=${key}`);
    return data;
  },
};

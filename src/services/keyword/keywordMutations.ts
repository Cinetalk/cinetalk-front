import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { revalidateMyPage } from "@/services/my/actions";

import { tokenManager } from "../auth/tokenManager";
import { keywordAPIs } from "./keywordAPIs";
import { KEYWORD_QUERY_KEYS } from "./keywordQueryKeys";

interface addKeywordParams {
  movieId: number;
  value: string;
}

export function useAddKeyword(
  setValue: Dispatch<SetStateAction<string>>,
  movieId: number,
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const accessToken = tokenManager.getToken();
  return useMutation({
    mutationFn: async ({ movieId, value }: addKeywordParams) => {
      const { data, res } = await keywordAPIs.addKeyword(movieId, value);
      if (!res.ok) throw new Error(data?.message);
    },
    onSuccess: () => {
      revalidateMyPage("my");
      queryClient.invalidateQueries({
        queryKey: KEYWORD_QUERY_KEYS.myKeyword(accessToken, movieId),
      });
      router.refresh();
      setValue("");
    },
    onError: (error) => {
      alert(error);
    },
  });
}

export function useEditKeyword(
  setIsClickedEdit: Dispatch<SetStateAction<boolean>> | undefined,
  movieId: number,
  keywordId: number | null | undefined,
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const accessToken = tokenManager.getToken();
  return useMutation({
    mutationFn: async ({ value }: addKeywordParams) => {
      const { data, res } = await keywordAPIs.editKeyword(keywordId, value);
      if (!res.ok) throw new Error(data?.message);
    },
    onSuccess: () => {
      revalidateMyPage("my");
      queryClient.invalidateQueries({
        queryKey: KEYWORD_QUERY_KEYS.myKeyword(accessToken, movieId),
      });
      if (setIsClickedEdit) setIsClickedEdit(false);
      router.refresh();
    },
    onError: (error) => {
      alert(error);
    },
  });
}

export function useReportKeyword(
  setOpen: Dispatch<SetStateAction<boolean>>,
  setOpenReportComplete: Dispatch<SetStateAction<boolean>>,
) {
  return useMutation({
    mutationFn: ({ content, movieId }: { content: string; movieId: number }) =>
      keywordAPIs.reportKeyword(movieId, content),
    onSuccess: () => {
      setOpen(false);
      setOpenReportComplete(true);
    },
  });
}

export function useLikeKeyword({ movieId }: { movieId: number }) {
  const router = useRouter();
  const accessToken = tokenManager.getToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keywordId: number) => {
      return keywordAPIs.likeKeyword(keywordId);
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: KEYWORD_QUERY_KEYS.myKeyword(accessToken, movieId),
      });
    },
  });
}

interface MyInfo {
  id: number | null;
  email: string;
  password: null;
  name: string;
  nickname: string;
  gender: "M" | "F" | "E" | string;
  birthday: string;
  profile: string;
  provider: "kakao" | "naver" | string;
  role: string;
}

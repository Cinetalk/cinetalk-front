import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        Mobile: "360px",
        Tablet: "768px",
        Laptop: "1280px",
        Desktop: "1920px",
      },
      fontSize: {
        "3xl": "2.125rem" /* 34px */,
        "2xl": "1.75rem" /* 28px */,
        xl: "1.5rem" /* 24px */,
        md: "1.25rem" /* 20px */,
        regular: "1rem" /* 16px */,
        sm: "0.875rem" /* 14px */,
        xs: "0.75rem" /* 12px */,
        E_lg: "3rem" /* 48px */,
        E_md: "1rem" /* 16px */,
        E_sm: "0.75rem" /* 12px */,
      },
      lineHeight: {
        140: "140%",
        150: "150%",
      },
      fontWeight: {
        Bold: "700",
        Medium: "500",
        Regular: "400",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      height: {
        xxxl: "48px",
        xxl: "39px",
        xl: "34px",
        lg: "28px",
        md: "24px",
        sm: "21px",
        xs: "16.8px",
      },
      colors: {
        BG: "#262626",
        Black: "#1e1e1e",
        D1_Gray: "#2E2C2B",
        D2_Gray: "#403e3c",
        D3_Gray: "#545250",
        Gray: "#736F6C",
        L_Gray: "#999490",
        Gray_Orange: "#ccc5c0",
        Silver: "#e9e9e9",
        White: "#ffffff",
        Primary: "#ff7a00",
        Secondary: "#b4e2c4",
        Info: "#2194f3",
        Shade_1: "#e86318",
        Shade_2: "#bc551a",
        Shade_3: "#91461d",
        Shade_4: "7a3f1d",
        Shade_5: "#7a3f1d",
        Error: "#EF2247",
        D1_Error: "#832D2B",
        D2_Error: "#362524",
        Success: "#2E7D31",
        Tint_1: "#FF7A2F",
        Tint_2: "#FF8846",
        Tint_3: "#FFA674",
        Tint_4: "#FFD3BA",
        Tint_5: "#FFF1E8",
        Naver: "#03C75A",
        Kakako: "#FEE500",
        Opacity_W10: "rgba(255, 255, 255, 0.10)",
        Opacity_W15: "rgba(255, 255, 255, 0.15)",
        Opacity_W20: "rgba(255, 255, 255, 0.20)",
      },
      backgroundImage: {
        "detail-gradient":
          "linear-gradient(180deg, rgba(38, 38, 38, 0.00) 0%, #262626 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {},
    },
  },
  plugins: [
    ({ addUtilities }: any) => {
      addUtilities({
        ".Text-xxxl-Bold": {},
        ".Text-xxl-Bold": {},
        ".Text-xl-Bold": {},
        ".Text-l-Bold": {},
        ".Text-l-Medium": {},
        ".Text-m-Bold": {},
        ".Text-m-Medium": {},
        ".Text-m-Regular": {},
        ".Text-s-Bold": {},
        ".Text-s-Medium": {},
        ".Text-s-Regular": {},
        ".Text-xs-Bold": {},
        ".Text-xs-Regular": {},
        ".badge-gradient": {},
        ".input-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#545250",
            borderRadius: "2px",
          },
        },
        ".inner-gray": {},
        ".inner-silver": {},
        ".inner-gray-orange": {},
        ".inner-none": {},
        ".inner-d3-gray": {},
      });
    },
  ],
};
export default config;

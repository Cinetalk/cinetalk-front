"use client";
import HeaderDropdown from "@/components/header/HeaderDropdown";

interface HeaderAuthedUserSectionProps {
  hasScrolledPast: boolean;
  children: React.ReactNode;
}

function HeaderAuthedUserSection({
  hasScrolledPast,
  children,
}: HeaderAuthedUserSectionProps) {
  return (
    <section className="hidden items-center Laptop:flex">
      <div className="mr-3 h-[30px] w-[30px] rounded-full bg-[#d9d9d9]" />
      <HeaderDropdown hasScrolledPast={hasScrolledPast}>
        {children}
      </HeaderDropdown>
    </section>
  );
}

export default HeaderAuthedUserSection;

import AdminHeaders from "./_components/AdminHeaders";
import SideMenu from "./_components/SideMenu";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <SideMenu />
      <div className="bg-gray-200 px-2 text-black">{children}</div>
    </div>
  );
}

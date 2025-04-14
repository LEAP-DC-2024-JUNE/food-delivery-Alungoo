import SideMenu from "@/components/Admin/Common/SideMenu";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#F4F4F5] w-full ">
      <SideMenu />
      <main className="ml-[165px] w-full h-auto bg-[#F4F4F5] px-5 pb-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

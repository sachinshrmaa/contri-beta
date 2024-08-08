// import SideBar from "@/components/ui/SideBar";
// import NavBar from "@/components/ui/NavBar";
import FooterMenu from "../../components/ui/FooterMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <NavBar /> */}
      {/* <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="content col-span-6 md:col-span-5 pb-[100px] md:pb-0 py-2 md:pl-6">
            {children}
          </div>
        </div>
      </div> */}

      <div>{children}</div>
      <FooterMenu />
    </>
  );
}

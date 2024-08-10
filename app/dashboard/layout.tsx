import FooterMenu from "../../components/ui/FooterMenu";
import NavBar from "../../components/ui/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="pb-[70px]">{children}</div>
      <FooterMenu />
    </>
  );
}

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@radix-ui/themes/styles.css";
import "./globals.css";

import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "Contri",
  description: "Contri lets you split payments easily with among your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer hideProgressBar />
        <Theme accentColor="green">{children}</Theme>
      </body>
    </html>
  );
}

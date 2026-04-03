import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "SRM Insider Community",
  description: "Innovate | Build | Connect | Insider | Built by Students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-white antialiased selection:bg-indigo-500/30">
        <Navbar />
        {children}
        {/* We will conditionally render toaster only if it compiles to avoid crash before shadcn installs if user navigates */}
        <Toaster theme="dark" />
      </body>
    </html>
  );
}

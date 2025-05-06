import { Toaster } from "@/components/ui/sonner";
import { AppBar } from "@/components/utils/AppBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <AppBar />
      <div className={"container mx-auto"}>{children}</div>
      <Toaster />
    </>
  );
}

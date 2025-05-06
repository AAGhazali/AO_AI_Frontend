import MainLayout from "@/components/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/theme/theme-provider";
import { Home } from "@/pages/Home";
import { Report } from "@/pages/Report";
import { BrowserRouter, Route, Routes } from "react-router";
import { AoProvider } from "./contexts/ao/ao-context";
import { UploadProvider } from "./contexts/upload/upload-provider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UploadProvider>
          <AoProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Report />} />
              </Routes>
            </MainLayout>
          </AoProvider>
        </UploadProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

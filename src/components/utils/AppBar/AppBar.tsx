import cofomoLogo from "@/assets/cofomo-logo.png";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/utils/ThemeToggle";
import { Settings } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function AppBar() {
  const hideSettingsButton = true;
  const navigate = useNavigate();

  return (
    <div
      className={
        "flex justify-between items-center p-4 container mx-auto mb-15"
      }
    >
      <div>
        <img src={cofomoLogo} alt="Cofomo" className="h-12" />
      </div>
      <div>
        <Link to="/">
          <h1 className="poppins-bold uppercase text-gray-900 dark:text-white">
            Cofomo
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {!hideSettingsButton && (
          <Button
            onClick={() => {
              navigate("/settings");
            }}
            variant="outline"
            size="icon"
            style={{ borderRadius: "8px" }}
          >
            <Settings className="w-5 h-5 text-gray-900 dark:text-white" />
          </Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Wheat, Globe, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CrawlingTicker from "./CrawlingTicker";

interface HeaderProps {
  isHindi: boolean;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

const Header = ({ isHindi, onToggleLanguage, onLogout }: HeaderProps) => {
  return (
    <>
      <CrawlingTicker isHindi={isHindi} />
      <header className="bg-background border-b border-border shadow-sm">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <div className="w-8 h-8 md:w-10 md:h-10 bg-agricultural rounded-full flex items-center justify-center">
                <Wheat className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-primary">KrishiMitra</h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {isHindi ? "स्मार्ट कृषि सलाहकार" : "Smart Agricultural Advisory"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleLanguage}
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              >
                <Globe className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">
                  {isHindi ? "English" : "हिंदी"}
                </span>
                <span className="sm:hidden">
                  {isHindi ? "EN" : "हि"}
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              >
                <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">
                  {isHindi ? "लॉगआउट" : "Logout"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
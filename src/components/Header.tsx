import { Button } from "@/components/ui/button";
import { Wheat, Globe, LogOut } from "lucide-react";
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
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-agricultural rounded-full flex items-center justify-center">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">KrishiMitra</h1>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? "स्मार्ट कृषि सलाहकार" : "Smart Agricultural Advisory"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleLanguage}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {isHindi ? "English" : "हिंदी"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                {isHindi ? "लॉगआउट" : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
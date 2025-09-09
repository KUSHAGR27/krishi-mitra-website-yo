import { useState } from "react";
import Header from "@/components/Header";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import Dashboard from "@/components/Dashboard";
import ProductShowcase from "@/components/ProductShowcase";
import LoginPage from "@/components/LoginPage";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  const [isHindi, setIsHindi] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleLanguage = () => {
    setIsHindi(!isHindi);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} isHindi={isHindi} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-col w-full">
        <Header 
          isHindi={isHindi} 
          onToggleLanguage={handleToggleLanguage}
          onLogout={handleLogout}
        />
        
        <div className="flex flex-1 overflow-hidden w-full">
          <ResponsiveSidebar isHindi={isHindi} />
          
          <SidebarInset className="flex-1 overflow-hidden">
            <div className="flex flex-col h-full overflow-y-auto">
              <Dashboard isHindi={isHindi} />
              <ProductShowcase isHindi={isHindi} />
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

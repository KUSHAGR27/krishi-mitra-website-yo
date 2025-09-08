import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import ProductShowcase from "@/components/ProductShowcase";
import LoginPage from "@/components/LoginPage";

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
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isHindi={isHindi} 
        onToggleLanguage={handleToggleLanguage}
        onLogout={handleLogout}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isHindi={isHindi} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Dashboard isHindi={isHindi} />
          <ProductShowcase isHindi={isHindi} />
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import ProductShowcase from "@/components/ProductShowcase";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [isHindi, setIsHindi] = useState(false);

  const handleToggleLanguage = () => {
    setIsHindi(!isHindi);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isHindi={isHindi} onToggleLanguage={handleToggleLanguage} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isHindi={isHindi} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainContent isHindi={isHindi} />
          <ProductShowcase isHindi={isHindi} />
        </div>
      </div>

      <ChatBot isHindi={isHindi} />
    </div>
  );
};

export default Index;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, IndianRupee, Percent, Truck } from "lucide-react";
import productsImage from "@/assets/agri-products.jpg";

interface ProductShowcaseProps {
  isHindi: boolean;
}

const ProductShowcase = ({ isHindi }: ProductShowcaseProps) => {
  const products = [
    {
      id: 1,
      name: isHindi ? "यूरिया उर्वरक" : "Urea Fertilizer",
      price: 280,
      originalPrice: 320,
      subsidy: 40,
      unit: isHindi ? "प्रति बोरी (50 कि.ग्रा.)" : "per bag (50 kg)",
      description: isHindi 
        ? "उच्च गुणवत्ता वाला नाइट्रोजन उर्वरक"
        : "High quality nitrogen fertilizer",
      inStock: true,
      subsidyLabel: isHindi ? "सब्सिडी" : "Subsidized"
    },
    {
      id: 2,
      name: isHindi ? "DAP उर्वरक" : "DAP Fertilizer",
      price: 1450,
      originalPrice: 1600,
      subsidy: 150,
      unit: isHindi ? "प्रति बोरी (50 कि.ग्रा.)" : "per bag (50 kg)",
      description: isHindi 
        ? "फास्फोरस और नाइट्रोजन युक्त उर्वरक"
        : "Phosphorus and nitrogen rich fertilizer",
      inStock: true,
      subsidyLabel: isHindi ? "सब्सिडी" : "Subsidized"
    },
    {
      id: 3,
      name: isHindi ? "हाइब्रिड बीज" : "Hybrid Seeds",
      price: 850,
      originalPrice: 950,
      subsidy: 100,
      unit: isHindi ? "प्रति पैकेट (1 कि.ग्रा.)" : "per packet (1 kg)",
      description: isHindi 
        ? "उच्च उत्पादन वाले संकर बीज"
        : "High yield hybrid seeds",
      inStock: true,
      subsidyLabel: isHindi ? "सब्सिडी" : "Subsidized"
    },
    {
      id: 4,
      name: isHindi ? "जैविक खाद" : "Organic Manure",
      price: 180,
      originalPrice: 220,
      subsidy: 40,
      unit: isHindi ? "प्रति बोरी (25 कि.ग्रा.)" : "per bag (25 kg)",
      description: isHindi 
        ? "प्राकृतिक जैविक खाद"
        : "Natural organic fertilizer",
      inStock: false,
      subsidyLabel: isHindi ? "सब्सिडी" : "Subsidized"
    },
    {
      id: 5,
      name: isHindi ? "कीटनाशक" : "Pesticides",
      price: 320,
      originalPrice: 380,
      subsidy: 60,
      unit: isHindi ? "प्रति बोतल (500 मि.ली.)" : "per bottle (500 ml)",
      description: isHindi 
        ? "सुरक्षित और प्रभावी कीटनाशक"
        : "Safe and effective pesticides",
      inStock: true,
      subsidyLabel: isHindi ? "सब्सिडी" : "Subsidized"
    },
    {
      id: 6,
      name: isHindi ? "सूक्ष्म पोषक तत्व" : "Micronutrients",
      price: 240,
      originalPrice: 280,
      subsidy: 40,
      unit: isHindi ? "प्रति पैकेट (1 कि.ग्रा.)" : "per packet (1 kg)",
      description: isHindi 
        ? "आवश्यक सूक्ष्म पोषक तत्वों का मिश्रण"
        : "Essential micronutrient mixture",
      inStock: true,
      subsidyLabel: isHindi ? "सब्सिडी" : "Subsidized"
    }
  ];

  return (
    <section className="bg-muted/30 py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isHindi ? "कृषि उत्पाद स्टोर" : "Agricultural Products Store"}
          </h2>
          <p className="text-muted-foreground">
            {isHindi 
              ? "सब्सिडी के साथ गुणवत्तापूर्ण कृषि उत्पाद"
              : "Quality agricultural products with subsidies"
            }
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-6 md:mb-8 rounded-lg overflow-hidden">
          <img 
            src={productsImage} 
            alt={isHindi ? "कृषि उत्पाद" : "Agricultural Products"}
            className="w-full h-32 md:h-48 object-cover"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <Card key={product.id} className={`relative ${!product.inStock ? 'opacity-75' : ''}`}>
              {product.subsidy > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 right-3 bg-success text-success-foreground"
                >
                  <Percent className="h-3 w-3 mr-1" />
                  {product.subsidyLabel}
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {product.price}
                        </span>
                        {product.subsidy > 0 && (
                          <span className="text-sm text-muted-foreground line-through flex items-center">
                            <IndianRupee className="h-3 w-3" />
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{product.unit}</p>
                    </div>
                    
                    {product.subsidy > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-success">
                          {isHindi ? "बचत:" : "Save:"} ₹{product.subsidy}
                        </div>
                        <div className="text-xs text-success">
                          {Math.round((product.subsidy / product.originalPrice) * 100)}% {isHindi ? "छूट" : "off"}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      product.inStock ? 'text-success' : 'text-destructive'
                    }`}>
                      {product.inStock 
                        ? (isHindi ? "स्टॉक में उपलब्ध" : "In Stock")
                        : (isHindi ? "स्टॉक में नहीं" : "Out of Stock")
                      }
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Truck className="h-3 w-3" />
                      {isHindi ? "निःशुल्क डिलीवरी" : "Free Delivery"}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant={product.inStock ? "agricultural" : "secondary"}
                    className="w-full"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock 
                      ? (isHindi ? "ऑर्डर करें" : "Order Now")
                      : (isHindi ? "स्टॉक में नहीं" : "Out of Stock")
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advertisement Placeholder */}
        <div className="mt-6 md:mt-8">
          <Card className="bg-gradient-to-r from-accent/20 to-warning/20 border-accent/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-accent-foreground mb-2">
                {isHindi ? "विज्ञापन स्थान" : "Advertisement Space"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {isHindi 
                  ? "कृषि उत्पादों के लिए प्रासंगिक विज्ञापन यहां दिखाए जाएंगे"
                  : "Relevant ads for agricultural products will be displayed here"
                }
              </p>
              <div className="bg-background/50 rounded-lg p-8 border-2 border-dashed border-accent/30">
                <div className="text-accent-foreground/50 text-sm">
                  {isHindi ? "विज्ञापन लोड हो रहा है..." : "Loading advertisement..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
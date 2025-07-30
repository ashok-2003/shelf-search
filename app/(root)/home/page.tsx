import { SimpleSearchComponent } from "@/components/simpleSearch";
import { title } from "@/config/primitives";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "@heroui/image";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const result = {
    "trending": [
        "Davidoff",
        "Amul Vanilla",
        "Rice"
    ],
    "eta": [
        {
            "eta": "7 mins",
            "image": "https://d2chhaxkq6tvay.cloudfront.net/platforms/zepto.webp",
            "platform": "Zepto",
            "open": true,
            "url": "https://zeptonow.com",
            "storeId": "5d205066-36a5-4929-982a-7571c60f876b",
            "storeIds": [
                "5d205066-36a5-4929-982a-7571c60f876b",
                "1d31c12c-1669-4ed5-bf1e-251da70753b8"
            ]
        },
        {
            "eta": "9 mins",
            "image": "https://d2chhaxkq6tvay.cloudfront.net/platforms/bigbasket.webp",
            "url": "https://bbnow.bigbasket.com",
            "platform": "BigBasket",
            "storeId": "",
            "storeIds": []
        },
        {
            "eta": "10 mins",
            "image": "https://d2chhaxkq6tvay.cloudfront.net/platforms/swiggy.webp",
            "url": "https://swiggy.com",
            "platform": "Swiggy",
            "open": true,
            "storeId": "1382258"
        },
        {
            "eta": "10 mins",
            "image": "https://d2chhaxkq6tvay.cloudfront.net/platforms/blinkit.webp",
            "url": "https://blinkit.com",
            "platform": "BlinkIt",
            "open": true,
            "storeId": "34126",
            "storeIds": [
                "31004",
                "34126",
                "35940",
                "36048",
                "41645"
            ]
        },
        {
            "eta": "4PM-6PM",
            "image": "https://d2chhaxkq6tvay.cloudfront.net/platforms/dmart.webp",
            "url": "https://dmart.in",
            "platform": "DMart",
            "storeId": "10711",
            "open": true
        }
    ],
    "meta": {
        "trendingTitle": "Trending Searches",
        "etaTitle": "Delivering at your location right now",
        "recentTitle": "Recent Searches"
    },
    "trendingItems": [
        {
            "name": "Atta",
            "image": "https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/9759cfd9-8099-45fd-bba2-53df01b57c33.jpeg"
        },
        {
            "name": "Rice",
            "image": "https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/20ce782b-ffc8-4b53-9716-381773a1eaaa.jpeg"
        },
        {
            "name": "Detergent",
            "image": "https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/72aaad4d-dfc2-4a2f-838a-cb302594e27e.jpeg"
        },
        {
            "name": "Coffee",
            "image": "https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/ac0f1069-cbfc-4085-ae11-54a41eab65b0.jpeg"
        }
    ]
  };

  return (
    <div className="w-full p-4 mx-auto space-y-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-semibold text-foreground">
          📍 Your Location
        </div>
        <div className="text-lg font-semibold text-foreground">
          🛒 Cart
        </div>
      </div>

      {/* Search Section */}
      <div className="flex justify-center">
        <SimpleSearchComponent 
          width="w-full max-w-md" 
          placeholder="Search for products..."
        />
      </div>

      {/* Quick Delivery Section */}
      <div className="space-y-4">
        <h1 className={title({ size: "sm" })}>
          {result.meta.etaTitle}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {result.eta.map((item, index) => (
            <Card 
              key={item.storeId || index} 
              className="relative transition-shadow cursor-pointer hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-semibold">
                    {item.platform}
                  </CardTitle>
                  {item.open && (
                    <Badge variant="secondary" className="text-xs text-green-800 bg-green-100">
                      Open
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.platform}
                    width={60}
                    height={60}
                    className="object-contain rounded-lg"
                    fallbackSrc="/api/placeholder/60/60"
                  />
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs font-medium">
                    🚚 {item.eta}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="space-y-4">
        <h1 className={title({ size: "sm" })}>
          {result.meta.trendingTitle}
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {result.trendingItems.map((item, index) => (
            <Card 
              key={index} 
              className="transition-shadow cursor-pointer hover:shadow-md"
            >
              <CardContent className="p-3 space-y-3">
                <div className="flex items-center justify-center rounded-lg aspect-square bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg"
                    fallbackSrc="/api/placeholder/80/80"
                  />
                </div>
                <div className="text-center">
                  <CardTitle className="text-sm font-medium text-foreground">
                    {item.name}
                  </CardTitle>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

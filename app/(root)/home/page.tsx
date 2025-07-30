import { SimpleSearchComponent } from "@/components/simpleSearch";
import { title } from "@/config/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@heroui/image";

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
    <div className="w-full">
        <div className="flex flex-row justify-between">
          <div>
            location
          </div>
          <div>
            cart
          </div>
        </div>
        <div>
          <SimpleSearchComponent className="w-200" />
        </div>
        <div>
          <h1 className={title({size:"sm"})}>Quick Delivery</h1>
          <div className="flex flex-row gap-4 pb-4 overflow-x-auto">
            {result.eta.map((item) => (
              <Card key={item.storeId} className="flex-shrink-0 w-32 overflow-hidden transition-shadow shadow-sm rounded-xl hover:shadow-md">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Image 
                      src={item.image} 
                      alt={item.platform}
                      width={80}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-sm font-medium text-gray-900">{item.platform}</p>
                    <p className="text-xs text-gray-600">{item.eta}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h1 className={title({size:"sm"})}>Trending Items</h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {result.trendingItems.map((item , index) => (
              <Card key={index} className="overflow-hidden transition-shadow shadow-sm rounded-xl hover:shadow-md">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={150}
                      height={150}
                      className="object-cover w-full h-full rounded-t-xl"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-center text-gray-900">{item.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    </div>
  );
}

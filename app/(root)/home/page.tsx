import { SimpleSearchComponent } from "@/components/simpleSearch";
import { title } from "@/config/primitives";
import { Image } from "@heroui/image";
import { CartButton } from "@/components/cart/cart-button";
import { LocationButton } from "@/components/location/locationButton";

export default function AboutPage() {
  const cartItemsCount = 3; // This will come from your server-side cart state later

  // This will come from your location context later
  const currentLocation = {
    city: "Gurugram",
    area: "Sector 69",
    state: "Haryana",
    country: "India"
  };

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
      <div className="flex flex-row items-center justify-between mb-4">
        <div>
          <LocationButton currentLocation={currentLocation} />
        </div>
        <div>
          <CartButton cartItemsCount={cartItemsCount} />
        </div>
      </div>

      <div className="mb-8">
        <SimpleSearchComponent/>
      </div>

      {/* Quick Delivery Section */}
      <div className="mb-8">
        <h1 className={title({size:"sm"})}>Quick Delivery</h1>
        <div className="flex gap-8 mt-6 overflow-x-auto md:mt-8">
          {result.eta.map((item) => (
            <div key={item.storeId} className="flex-shrink-0 mb-2">
                <div className="flex items-center justify-center w-full rounded-sm">
                  <Image 
                    src={item.image} 
                    alt={item.platform}
                    width={100}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{item.platform}</p>
                  <p className="mt-1 text-xs font-light text-defalut-50">{item.eta}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="mb-8">
        <h1 className={title({size:"sm"})}>Trending Items</h1>
        <div className="grid grid-cols-3 gap-2 p-2 mt-6 rounded-sm md:mt-8 md:grid-cols-5 lg:grid-cols-6 bg-default-50">
          {result.trendingItems.map((item, index) => (
            <div key={index} className="py-1 mb-2 bg-white border rounded-sm cursor-pointer border-default-100 group border-spacing-1">
              <div className="flex items-center justify-center">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  className="object-contain transition-all rounded-sm shadow-md shadow-gray-200/40 hover:shadow-lg hover:shadow-gray-400/50"
                />
              </div>
              <div className="mt-2 ml-1 text-left">
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
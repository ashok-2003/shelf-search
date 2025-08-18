import { SimpleSearchComponent } from "@/components/simpleSearch";
import { title } from "@/config/primitives";
import { Image } from "@heroui/image";
import { CartButton } from "@/components/cart/cart-button";
import { LocationButton } from "@/components/location/locationButton";
import { HomeData } from "@/lib/DemoData/HomeData";

export default function AboutPage() {
  const cartItemsCount = 3; // This will come from your server-side cart state later

  const result = HomeData

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mb-4">
        <div>
          <LocationButton/>
        </div>
        <div>
          <CartButton/>
        </div>
      </div>

      <div className="mb-8">
        <SimpleSearchComponent className="w-full"/>
      </div>

      {/* Quick Delivery Section */}
      <div className="mb-8">
        <h1 className={title({size:"sm"})}>Quick Delivery</h1>
        <div className="flex gap-8 mt-6 overflow-x-auto md:mt-8">
          {result.eta.map((item) => (
            <div key={item.platform} className="flex-shrink-0 mb-2">
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
                  <p className="mt-1 text-xs font-light text-defalut-50">{item.deliveryTime}</p>
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
            <div key={index} className="pb-1 mb-2 transition-all bg-white border rounded-sm shadow-md cursor-pointer border-default-100 group border-spacing-1 shadow-gray-200/40 hover:shadow-lg hover:shadow-gray-400/50">
              <div className="flex items-center justify-center">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="object-contain rounded-sm"
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
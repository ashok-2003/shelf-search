
import { Image } from '@heroui/image';

// Category interface
interface Category {
  name: string;
  image: string;
}

export const CategoryCard = ({
  category,
  isSelected,
  onClick
}: {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="flex-shrink-0 cursor-pointer" onClick={onClick}>
      <div className={`w-20 h-25 relative items-center text-center flex flex-col`}>
        {/* Image Container */}
        <div className="mb-2">
          <Image
            isZoomed={isSelected}
            radius='sm'
            src={category.image}
            alt={category.name}
            width={60}
            height={60}
          />
        </div>

        {/* Text Container */}
        <div className='flex flex-col justify-between flex-1 w-full'>
          <p className={`text-xs leading-tight ${
            isSelected ? 'font-semibold' : 'font-light'
          }`}>
            {category.name}
          </p>
          
          {/* Fixed Bottom Border - always at the bottom */}
          <div className={`w-full h-1 mt-auto ${
            isSelected ? 'bg-gray-700' : 'bg-transparent'
          } rounded-sm`} />
        </div>
      </div>
    </div>
  );
};
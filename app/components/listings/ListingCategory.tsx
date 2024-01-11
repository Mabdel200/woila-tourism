'use client';

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType,
  label: string,
  description: string,
  // events: Event[]; // Pour les evenements
}

const CategoryView: React.FC<CategoryViewProps> = ({ 
  icon: Icon,
  label,
  description,
  // events
 }) => {
  return ( 
    <div className="ml-4 flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={20} className="text-black" />
        <div className="flex flex-col">
            <div 
              className="text-lg font-bold text-black"
            >
              {label}
            </div>
            <div 
              className="text-neutral-500 font-light"
            >
              
            </div>
          </div>
      </div>
    </div>
   );
}
 
export default CategoryView;
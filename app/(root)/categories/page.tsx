"use client"
import { FilterBar } from './filter';

export default function DocsPage() {

  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/5 min-h-screen gap-4 border border-red-500">
         <FilterBar></FilterBar>
      </div>
      <div className="w-4/5 border border-red-500">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div>
              search
            </div>
            <div>
              cart
            </div>
          </div>
          <div>
            categorries
          </div>
          <div>
            products
          </div>
        </div>
      </div>
    </div>
  );
}
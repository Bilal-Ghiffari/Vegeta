"use client";

// components
import { Checkbox } from "@/components/ui/checkbox";

// assets
import ProductCategoryJSON from "@/assets/json/product-category.json";
import { ProductCategory } from "@prisma/client";
import React from "react";

interface ICategoryProps {
  value?: string[];
  onChange: (prevCategory: string[]) => void;
}

const FilterCategory = ({ value = [], onChange }: ICategoryProps) => {
  const [selectedCategories, setSelectedCategories] = React.useState(value);
  const onCheckedChange = (isChecked: boolean, category: any) => {
    setSelectedCategories((selectedCategory: string[]) => {
      const newCategory = !isChecked
        ? selectedCategory?.filter((ct) => ct !== category.id)
        : [...selectedCategory, category.id];
      onChange(newCategory);
      return newCategory;
    });
  };
  return (
    <>
      <div className="text-base">Kategori</div>
      <div className="flex flex-col gap-2 my-4">
        {ProductCategoryJSON.map((category) => (
          <div
            key={`productCategory-${category.id}`}
            className="flex gap-2 items-center"
          >
            <Checkbox
              className="w-6 h-6 border-2 border-leaf data-[state=checked]:bg-leaf data-[state=checked]:text-primary-foreground"
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(isChecked: boolean) =>
                onCheckedChange(isChecked, category)
              }
            />
            <label
              htmlFor={category.id}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {category.title}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterCategory;

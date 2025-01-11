// components
import { Input } from "@/components/ui/input";
import React from "react";

interface IPrice {
  max_price: string | undefined;
  min_price: string | undefined;
}

interface FilterPriceProps {
  value: IPrice;
  onChange: (price: IPrice) => void;
}

const FilterPrice = ({ value, onChange }: FilterPriceProps) => {
  const [price, setPrice] = React.useState<IPrice | undefined>(value);

  React.useEffect(() => {
    if (price) onChange(price);
  }, [price]);

  console.log("price", value);
  return (
    <>
      <div className="text-base">Harga Minimum</div>
      <div className="my-4 relative">
        <Input
          className="w-full"
          // name="min_price"
          value={value.min_price}
          type="text"
          placeholder=""
          prefix="text-Rp"
          onChange={(e) => setPrice({ ...value, min_price: e.target.value })}
        />
      </div>
      <div className="text-base">Harga Maksimum</div>
      <div className="my-4 relative">
        <Input
          className="w-full"
          // name="max_price"
          value={value.max_price}
          type="text"
          placeholder=""
          prefix="text-Rp"
          onChange={(e) => setPrice({ ...value, max_price: e.target.value })}
        />
      </div>
    </>
  );
};

export default FilterPrice;

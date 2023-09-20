import { formatPrice } from "@/lib/utils";
import { Wallet } from "lucide-react";
import { FC } from "react";

interface WalletBalanceProps {}

const WalletBalance: FC<WalletBalanceProps> = ({}) => {
  return (
    <div className="flex gap-2 items-center justify-center rounded-md duration-150 cursor-pointer hover:bg-gray-200 text-slate-700 p-2">
      <Wallet size={19} />
      {formatPrice(17899)}
    </div>
  );
};

export default WalletBalance;


import Image from "next/image"
import { topDealUsers } from "./data/data"
import { AspectRatio } from "../ui/aspect-ratio"

const TopBox = () => {
    return (
        <div className="">
            <h1 className="mb-5 text-2xl font-medium xxl:text-2xl">Top Deals</h1>
            <div className="list">
                {topDealUsers.map(user => (
                    <div className="flex justify-between items-center mb-[30px]" key={user.id}>
                        <div className="flex gap-[10px]">
                            <div className="w-10 h-10 hidden xxl:block">
                                <AspectRatio ratio={1 / 1} className="bg-none">
                                    <Image src={user.img} alt="" fill className="w-full h-full rounded-full object-cover" />
                                </AspectRatio>
                            </div>

                            <div className="flex flex-col gap-[5px]">
                                <span className="text-[14px] font-medium">{user.username}</span>
                                <span className="text-[12px] hidden xxl:block">{user.email}</span>
                            </div>
                        </div>
                        <span className="font-medium">${user.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopBox
import topRightIcons from "@/assets/phone/top_right_icons.webp";
import usePhoneStore from "@/store/phone";
import { useEffect, useState } from "react";

export interface PhoneHeaderProps {
    leftSide?: string;
}

export default function PhoneHeader({ leftSide }: PhoneHeaderProps) {
    const [currentTime, setCurrentTime] = useState<string>(getPhoneTime());
    const divergence = usePhoneStore((state) => state.divergence);
    
    useEffect(() => {
        if (leftSide)
            return;

        let intervalId: NodeJS.Timeout;
        const time = new Date();
        const delay = 60000 - (time.getSeconds() * 1000 + time.getMilliseconds());

        const timeoutId = setTimeout(() => {
            setCurrentTime(getPhoneTime());
            intervalId = setInterval(() => setCurrentTime(getPhoneTime()), 60000);
        }, delay);
        
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [leftSide]);

    return (
        <div className={`flex justify-between min-w-full items-center px-[2%] py-1 h-8 text-white z-20 ${divergence ? "mb-auto bg-gray-800 bg-opacity-40" : ""}`}>
            <div className="flex justify-evenly items-center text-center w-[30%] h-full">
                <span className="text-xs">
                    {
                        leftSide 
                            ? leftSide
                            : currentTime
                    }
                </span>
            </div>
            <div className="flex h-full">
                <img 
                    src={topRightIcons}
                    className="h-[90%] object-contain"
                />
            </div>
        </div>
    );
}

function getPhoneTime(): string {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, "0")}`;
}

import PhoneGrid, { PhoneGridAppList } from "@/components/phone/PhoneGrid";
import usePhoneStore from "@/store/phone";
import { useRef, useState } from "react";

export default function PhoneScreenList() {
    const {
        views,
        viewIndex,
        isDiverged,
        incrementIndex,
        decrementIndex
    } = usePhoneStore((state) => state);
    const [startX, setStartX] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const screenRef = useRef<HTMLDivElement>(null);

    // reference: https://codepen.io/thebabydino/pen/wybaGK/
    const unify = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        return "changedTouches" in event ? event.changedTouches[0] : event as React.MouseEvent<HTMLDivElement>; 
    }

    const handleSwipeHold = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!isDiverged) {
            setStartX(unify(event).clientX);
            setIsDragging(true);
        }
    };

    const handleSwipeDrag = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (isDragging) {
            const dx = unify(event).clientX - startX;
            setDragX(dx);
        }
    };

    const handleSwipeRelease = () => {
        if (isDragging) {
            const threshold = screenRef.current ? screenRef.current.offsetWidth * 0.4 : 0;

            if (Math.abs(dragX) > threshold) {
                // slightly confusing but dragX < 0 -> increment & dragX > 0 -> decrement since we swipe to 
                // the right to move left and swipe to the left to move right
                if (dragX < 0 && viewIndex < views.length - 1) {
                    incrementIndex();
                } else if (dragX > 0 && viewIndex > 0) {
                    decrementIndex();
                }
            }

            setIsDragging(false);
            setDragX(0);
        }
    };

    const grids = views.map((view: PhoneGridAppList, index: number) => {
        return (
            <div 
                key={index} 
                className="relative w-full h-full flex justify-start items-center flex-col"
            >
                <PhoneGrid apps={view} />
            </div>
        );
    });
    
    return (
        <div ref={screenRef} className="h-full overflow-hidden">
            <div 
                className={`flex h-full`}
                style={{ 
                    width: `${views.length * 100}%`,
                    transform: `translateX(${-(viewIndex * (screenRef.current?.offsetWidth || 0)) + dragX}px)`,
                    transition: isDragging ? "none" : "transform 0.3s ease-out" 
                }}
                onMouseDown={handleSwipeHold}
                onTouchStart={handleSwipeHold}
                onMouseMove={handleSwipeDrag}
                onTouchMove={handleSwipeDrag}
                onMouseUp={handleSwipeRelease}
                onTouchEnd={handleSwipeRelease}
                onMouseLeave={handleSwipeRelease}
                onTouchCancel={handleSwipeRelease}
            >
                {grids}
            </div>
        </div>
    );
}

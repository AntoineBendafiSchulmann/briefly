"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Carousel = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex overflow-hidden w-full", className)}
    {...props}
  />
));
Carousel.displayName = "Carousel";

const CarouselItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex-shrink-0 w-full h-[400px]", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselControls = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
    <button
      onClick={onPrev}
      className="pointer-events-auto p-2 border border-transparent rounded-full shadow-md absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-transparent text-gray-600"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
    <button
      onClick={onNext}
      className="pointer-events-auto p-2 border border-transparent rounded-full shadow-md absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-transparent text-gray-600"
    >
      <ArrowRight className="w-6 h-6" />
    </button>
  </div>
);

export { Carousel, CarouselItem, CarouselControls };

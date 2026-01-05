import FeaturedProducst from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <FeaturedProducst />

      <Suspense fallback={<div><Loader2 className="size-4 animate-spin text-black" /></div>}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}

import { ArrowRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";

const FeatureProducts = [
    {
        id: 1,
        name: "PartyKit",
        description: "All-in-one party kit for unforgettable celebrations.",
        tags: ["SaaS", "Events"],
        votes: 615,
        isFeatured: false,
    }, 
    {
        id: 2,
        name: "Github",
        description: "Share your projects here",
        tags: ["Version Control"],
        votes: 400,
        isFeatured: true,
    }, 
]
export default function FeaturedProducst() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center 
                justify-between mb-8">
                    <SectionHeader title="Featured Today"
                        icon={StarIcon}
                        description="Top picks from our community" />
                    <Button variant="outline" className="sm:flex hidden" asChild>
                        <Link href="/explore">View All <ArrowRightIcon/></Link></Button>
                </div>
                <div className="grid-wrapper">
                    {FeatureProducts.map((product) => <ProductCard key={product.id} product={product}>
                    </ProductCard>)}
                </div>
            </div>
        </section>
    );
}
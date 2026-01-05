import { CalendarIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";
import { getRecentProducts } from "@/lib/products/product-select";

export default async function RecentlyLaunchedProducts() {
    const recentlyLaunchedProducts = await getRecentProducts()

    return (
        <section className="py-20">
            <div className="wrapper">
                <SectionHeader title="Recently Launched"
                    description="Discover the latest products from our community"
                    icon={RocketIcon} />
                {recentlyLaunchedProducts.length > 0 ?
                    <div className="grid-wrapper">
                        {recentlyLaunchedProducts.map((product) => <ProductCard key={product.id} product={product}>
                        </ProductCard>)}
                    </div> :
                    <EmptyState message="No products launched in the last week. Check back soon for new launches."
                        icon={CalendarIcon} />}
            </div>
        </section>
    );
}
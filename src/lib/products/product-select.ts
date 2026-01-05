import { desc, eq } from 'drizzle-orm';
import { db } from '../../../db';
import { products } from '../../../db/schema';

export async function getFeaturedProducts() {
    const productsData = await db
        .select()
        .from(products)
        .where(eq(products.status, "approved"))
        .orderBy(desc(products.voteCount))

    return productsData;
}

export async function getRecentProducts() {
    const productsData = await getFeaturedProducts()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return productsData.filter(
        (product) =>
            product.createdAt && new Date(product.createdAt.toDateString()) >=
            oneWeekAgo
    );
}
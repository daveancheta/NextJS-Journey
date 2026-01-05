"use server";
import { auth, currentUser } from '@clerk/nextjs/server'
import { productSchema } from './product-validation';
import { db } from '../../../db';
import { products } from '../../../db/schema';
import z from 'zod';

type FormState = {
    success: boolean;
    errors?: Record<string, string[]>;
    message: string
}


export const addProductAction = async (prevState: FormState,
    formData: FormData) => {
    console.log(formData)

    try {
        const { userId } = await auth();

        if (!userId) {
            return {
                success: false,
                message: "You must sined in to submit a product"
            }
        }

        const rawFormData = Object.fromEntries(formData.entries());

        const validatedData = productSchema.safeParse(rawFormData);

        if (!validatedData.success) {
            console.log(validatedData.error.flatten().
                fieldErrors)
            return {
                success: false,
                errors: validatedData.error.flatten().
                    fieldErrors,
                message: "Invalid Data"
            }
        }

        const user = await currentUser();
        const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

        const { name, slug, tagline, description, websiteUrl, tags } = validatedData.data;

        const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

        await db.insert(products).values({
            name,
            slug,
            tagline,
            description,
            websiteUrl,
            tags: tagsArray,
            submittedBy: userEmail,
            userId,
            organizationId: "",
            status: "pending",
        })

        return {
            success: true,
            message: "Product submitted successfully!! it will be reviewed shortly."
        }

    } catch (error) {
        console.log(error)

        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: {
                    general: error.flatten().fieldErrors,
                },
                message: "Validation failed"
            }
        }

        return {
            success: true,
            errors: error,
            message: "Failed to submit product"
        }
    }
}


"use client"
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { addProductAction } from "@/lib/products/product-action";
import { useActionState } from "react";
import { Loader2, SparklesIcon } from "lucide-react";

const initialState = {
    success: false,
    error: {},
    message: ""
}
export default function ProductSubmitForm() {
    const [state, formAction, isPending] = useActionState(
        addProductAction,
        initialState);

    const { errors, message, success } = state;
    return (
        <form className="space-y-6"
            action={formAction}>
            <FormField
                label="Product Name"
                name="name"
                id="name"
                placeholder="My Awesome Product"
                required
                onChange={() => { }}
                error={errors?.name}
            />
            <FormField
                label="Slug"
                name="slug"
                id="slug"
                placeholder="my-awesome-product"
                required
                onChange={() => { }}
                helperText="URL-friendly version of your product name"
                error={errors?.slug}
            />

            <FormField
                label="Tagline"
                name="tagline"
                id="tagline"
                placeholder="A brief, catchy description"
                required
                onChange={() => { }}
                error={errors?.tagline}
            />

            <FormField
                label="Description"
                name="description"
                id="description"
                placeholder="Tell us more about your product..."
                required
                onChange={() => { }}
                error={errors?.description}
                textarea
            />

            <FormField
                label="Website URL"
                name="websiteUrl"
                id="websiteUrl"
                placeholder="https://yourproduct.com"
                required
                onChange={() => { }}
                error={errors?.websiteUrl}
                helperText="Enter your product's website or landing page"
            />
            <FormField
                label="Tags"
                name="tags"
                id="tags"
                placeholder="AI, Productivity, SaaS"
                required
                onChange={() => { }}
                error={errors?.tags}
                helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
            />

            <Button type="submit"
                className="w-full"
                size="lg" disabled={isPending}>
                {isPending ?
                    <>
                        <Loader2 className="size-4 animate-spin" />
                    </> :
                    <>
                        <SparklesIcon size={"4"} />
                        Submit Product
                    </>}
            </Button>
        </form>
    )
}
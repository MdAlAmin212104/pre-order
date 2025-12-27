/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";

interface FormData {
    productId: string;
    productTitle: string;
    productImage: string;
    productHandle: string;
    start_date: string;
    shipping_date: string;
    limit: string;
    button_text: string;
    message: string;
    payment_type: string;
    status: boolean;
}

interface Errors {
    product?: string;
    button_text?: string;
    start_date?: string;
    shipping_date?: string;
}

export default function ProductDetails() {
    const { id } = useParams();
    console.log(id);
    const shopify = useAppBridge();
    const [formData, setFormData] = useState<FormData>({
        productId: "",
        productTitle: "",
        productImage: "",
        productHandle: "",
        start_date: "",
        shipping_date: "",
        limit: "",
        button_text: "Pre-order Now",
        message: "",
        payment_type: "full",
        status: true,
    });
    const [errors, setErrors] = useState<Errors>({});
    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (errors[field as keyof Errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const selectProduct = async () => {
        try {
            const selected = await shopify.resourcePicker({
                type: 'product',
                multiple: false
            });

            if (selected && selected.selection && selected.selection.length > 0) {
                const product = selected.selection[0];
                console.log('Selected product:', product);

                setFormData(prev => ({
                    ...prev,
                    productId: product.id,
                    productTitle: product.title,
                    productImage: product.images?.[0]?.originalSrc || "",
                    productHandle: product.handle
                }));
            } else {
                console.log('Picker cancelled');
            }
        } catch (error) {
            console.error('Resource picker error:', error);
        }
    };

    const removeProduct = () => {
        setFormData(prev => ({
            ...prev,
            productId: "",
            productTitle: "",
            productImage: "",
            productHandle: ""
        }));
        console.log('Product removed');
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};

        if (!formData.productId) {
            newErrors.product = "Please select a product";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Validation failed:", errors);
            return;
        }

        const preorderData = {
            product_id: formData.productId,
            product_title: formData.productTitle,
            product_handle: formData.productHandle,
            preorder: {
                start_date: formData.start_date,
                shipping_date: formData.shipping_date,
                limit: formData.limit ? parseInt(formData.limit) : null,
                button_text: formData.button_text,
                message: formData.message,
                payment_type: formData.payment_type,
                status: formData.status
            }
        };
        console.log("Complete Data Object:", JSON.stringify(preorderData, null, 2));
    };

    const handleDateChange = (field: 'start_date' | 'shipping_date', value: string) => {
        handleInputChange(field, value);
        console.log(`${field} changed to:`, value);
    };

    const handleLimitChange = (value: string) => {
        handleInputChange('limit', value);
        console.log('Limit changed to:', value);
    };

    return (
        <form data-save-bar onSubmit={handleSave}>
            <s-page heading="Add Product">
                {/* Product Selection Section */}
                <s-section>
                    <s-heading>
                        <strong>Select Product</strong>
                    </s-heading>

                    {formData.productId ? (
                        <s-stack
                            direction="inline"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <s-stack
                                direction="inline"
                                gap="small-100"
                                alignItems="center"
                            >
                                {formData.productImage ? (
                                    <s-thumbnail alt="product image" src={formData.productImage} />
                                ) : (
                                    <s-thumbnail 
                                        alt="Product placeholder"
                                        src="https://cdn.shopify.com/static/images/polaris/thumbnail-wc_src.jpg"
                                    />
                                )}
                                <s-heading>{formData.productTitle}</s-heading>
                            </s-stack>
                            <s-stack direction="inline" gap="small">
                                <s-button
                                    onClick={selectProduct}
                                    accessibilityLabel="Change the product"
                                >
                                    Change
                                </s-button>
                                <s-button
                                    onClick={removeProduct}
                                    accessibilityLabel="Remove the product"
                                    tone="critical"
                                >
                                    Remove
                                </s-button>
                            </s-stack>
                        </s-stack>
                    ) : (
                        <>
                            <s-button
                                onClick={selectProduct}
                                accessibilityLabel="Select the product"
                            >
                                Select product
                            </s-button>
                            {errors.product && (
                                <s-paragraph tone="critical">{errors.product}</s-paragraph>
                            )}
                        </>
                    )}
                </s-section>
                

                {/* Pre-order Settings - Only show when product is selected */}
                {formData.productId && (
                    <>
                        {/* Dates Section */}
                        <s-section>
                            <s-heading>
                                <strong>Pre-order Dates</strong>
                            </s-heading>
                            <s-stack gap="base" direction="inline" justifyContent="space-between" alignContent="center" alignItems="center">
                                <s-box>
                                    <s-heading>Start Date : </s-heading>
                                    <s-date-field 
                                        value={formData.start_date}
                                        onChange={(e: any) => handleDateChange('start_date', e.target.value)}
                                        defaultValue="Current"
                                    />
                                </s-box>
                                <s-box>
                                    <s-heading>Pre-order Limit : </s-heading>
                                    <s-number-field
                                        value={formData.limit}
                                        onChange={(e: any) => handleLimitChange(e.target.value)}
                                        placeholder="0"
                                        step={1}
                                        min={0}
                                    />
                                </s-box>

                                <s-box>
                                    <s-heading>Shipping Date : </s-heading>
                                    <s-date-field 
                                        value={formData.shipping_date}
                                        onChange={(e: any) => handleDateChange('shipping_date', e.target.value)}
                                        required
                                    />
                                </s-box>
                            </s-stack>
                        </s-section>

                        {/* Display Settings Section */}
                        <s-section>
                            <s-heading>
                                <strong>Display Settings</strong>
                            </s-heading>
                            <s-stack gap="base">
                                <s-stack direction="inline" gap="small" justifyContent="space-evenly">
                                    <s-text-field
                                        label="Button Text"
                                        value={formData.button_text}
                                        onChange={(e: any) => handleInputChange("button_text", e.target.value)}
                                        error={errors.button_text}
                                        required
                                        placeholder="Pre-order Now"
                                    />
                                    <s-select
                                        label="Payment Type"
                                        value={formData.payment_type}
                                        onChange={(e: any) => handleInputChange("payment_type", e.target.value)}
                                    >
                                        <s-option value="full">Full Payment</s-option>
                                        <s-option value="partial">Partial Payment</s-option>
                                        <s-option value="deposit">Deposit Only</s-option>
                                    </s-select>
                                </s-stack>

                                <s-text-field
                                    label="Pre-order Message"
                                    value={formData.message}
                                    onChange={(e: any) => handleInputChange("message", e.target.value)}
                                    placeholder="This product is available for pre-order..."
                                />
                            </s-stack>
                        </s-section>
                    </>
                )}

                <s-section slot="aside">
                    <s-heading>
                        <strong>Pre-order Settings</strong>
                    </s-heading>
                        
                </s-section>
            </s-page>
        </form>
    );
}
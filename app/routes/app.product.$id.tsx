/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useParams } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Errors, FormData, VariantSettings } from "./Model/type";


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
        variants: []
    });
    const [errors, setErrors] = useState<Errors>({});
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [variantSettings, setVariantSettings] = useState<Record<string, VariantSettings>>({});
    const [applyToAllMode, setApplyToAllMode] = useState<boolean>(true);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // If in "apply to all" mode, update all variants
        if (applyToAllMode && ['start_date', 'shipping_date', 'limit', 'button_text', 'message', 'payment_type'].includes(field)) {
            const updatedSettings: Record<string, VariantSettings> = {};
            formData.variants.forEach((variant: any) => {
                updatedSettings[variant.id] = {
                    ...variantSettings[variant.id],
                    [field]: value
                };
            });
            setVariantSettings(updatedSettings);
            console.log(`Applied to ALL variants - ${field}:`, value);
            console.log('All variant settings:', updatedSettings);
        } 
        // If a specific variant is selected and NOT in "apply to all" mode
        else if (selectedVariantId && !applyToAllMode && ['start_date', 'shipping_date', 'limit', 'button_text', 'message', 'payment_type'].includes(field)) {
            setVariantSettings(prev => ({
                ...prev,
                [selectedVariantId]: {
                    ...prev[selectedVariantId],
                    [field]: value
                }
            }));

            console.log(`Updated ONLY variant ${selectedVariantId} - ${field}:`, value);
            console.log('Current variant settings:', {
                ...variantSettings,
                [selectedVariantId]: {
                    ...variantSettings[selectedVariantId],
                    [field]: value
                }
            });
        }

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

                const variants = product.variants?.map((variant: any) => ({
                    id: variant.id,
                    title: variant.title,
                    image: variant.image?.originalSrc
                })) || [];

                setFormData(prev => ({
                    ...prev,
                    productId: product.id,
                    productTitle: product.title,
                    productImage: product.images?.[0]?.originalSrc || "",
                    variants: variants,
                }));

                // Initialize all variants with the same default settings
                const initialSettings: Record<string, VariantSettings> = {};
                variants.forEach((variant: any) => {
                    initialSettings[variant.id] = {
                        start_date: formData.start_date,
                        shipping_date: formData.shipping_date,
                        limit: formData.limit,
                        button_text: formData.button_text,
                        message: formData.message,
                        payment_type: formData.payment_type
                    };
                });
                setVariantSettings(initialSettings);

                // Auto-select first variant
                if (variants.length > 0) {
                    setSelectedVariantId(variants[0].id);
                }

                // Start in "apply to all" mode
                setApplyToAllMode(true);
                console.log('Product selected - Apply to All mode enabled');
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
            productHandle: "",
            variants: []
        }));
        setVariantSettings({});
        setSelectedVariantId(null);
        setApplyToAllMode(true);
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
            variants: formData.variants.map((variant: any) => ({
                variant_id: variant.id,
                variant_title: variant.title,
                preorder: {
                    start_date: variantSettings[variant.id]?.start_date || formData.start_date,
                    shipping_date: variantSettings[variant.id]?.shipping_date || formData.shipping_date,
                    limit: variantSettings[variant.id]?.limit ? parseInt(variantSettings[variant.id].limit) : null,
                    button_text: variantSettings[variant.id]?.button_text || formData.button_text,
                    message: variantSettings[variant.id]?.message || formData.message,
                    payment_type: variantSettings[variant.id]?.payment_type || formData.payment_type,
                }
            })),
            status: formData.status
        };
        console.log("Complete Data Object:", JSON.stringify(preorderData, null, 2));
    };

    const handleDateChange = (field: 'start_date' | 'shipping_date', value: string) => {
        handleInputChange(field, value);
    };

    const handleLimitChange = (value: string) => {
        handleInputChange('limit', value);
    };

    const handleVariantClick = (variantId: string) => {
        setSelectedVariantId(variantId);
        
        // Load the settings for this variant
        const settings = variantSettings[variantId];
        if (settings) {
            setFormData(prev => ({
                ...prev,
                start_date: settings.start_date,
                shipping_date: settings.shipping_date,
                limit: settings.limit,
                button_text: settings.button_text,
                message: settings.message,
                payment_type: settings.payment_type
            }));
        }

        console.log('Selected variant:', variantId);
        console.log('Variant settings:', variantSettings[variantId]);
    };

    const toggleApplyToAll = () => {
        setApplyToAllMode(!applyToAllMode);
        console.log('Apply to All mode:', !applyToAllMode ? 'ENABLED' : 'DISABLED');
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

                {formData.productId && selectedVariantId && (
                    <>
                        {/* Apply to All Toggle */}
                        <s-section>
                            <s-stack direction="inline" gap="base" alignItems="center" justifyContent="space-between">
                                <s-stack direction="inline" gap="small" alignItems="center"  paddingBlockEnd="base">
                                    <s-checkbox
                                        checked={applyToAllMode}
                                        onChange={toggleApplyToAll}
                                    />
                                    <s-text>
                                        <strong>Apply changes to all variants</strong>
                                    </s-text>
                                </s-stack>
                                <s-badge tone={applyToAllMode ? "success" : "info"}>
                                    {applyToAllMode ? "All Variants" : "Selected Variant Only"}
                                </s-badge>
                            </s-stack>
                            {applyToAllMode && (
                                <s-banner tone="info" >
                                    <s-text >
                                        Changes will apply to all variants. Uncheck to customize individual variants.
                                    </s-text>
                                </s-banner>
                            )}
                        </s-section>

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
                        <strong>Product Variants</strong>
                    </s-heading>

                    {formData.variants && formData.variants.length > 0 ? (
                        <s-stack gap="small">
                            <s-text>Click a variant to {applyToAllMode ? "view" : "customize"}</s-text>

                            {formData.variants.map((variant: { id: string; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; image: string | undefined }) => (
                                <s-clickable 
                                    key={variant.id} 
                                    borderRadius="base" 
                                    onClick={() => handleVariantClick(variant.id)}
                                >
                                    <s-stack
                                        padding="small"
                                        direction="inline"
                                        justifyContent="start"
                                        gap="large"
                                        alignItems="center"
                                        style={{
                                            backgroundColor: selectedVariantId === variant.id ? '#f0f0f0' : 'transparent',
                                            border: selectedVariantId === variant.id ? '2px solid #0070f3' : '1px solid #e0e0e0'
                                        }}
                                    >
                                        <s-thumbnail size="small" src={variant.image} alt={variant.title as string} />
                                        <s-text>{variant.title}</s-text>
                                        {selectedVariantId === variant.id && (
                                            <s-badge tone="info">Active</s-badge>
                                        )}
                                    </s-stack>
                                </s-clickable>
                            ))}
                        </s-stack>
                    ) : (
                        <s-paragraph>No variants found</s-paragraph>
                    )}
                </s-section>
            </s-page>
        </form>
    );
}
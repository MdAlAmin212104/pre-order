/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormData {
    variants: any;
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

export interface Errors {
    product?: string;
    button_text?: string;
    start_date?: string;
    shipping_date?: string;
}

export interface VariantSettings {
    start_date: string;
    shipping_date: string;
    limit: string;
    button_text: string;
    message: string;
    payment_type: string;
}
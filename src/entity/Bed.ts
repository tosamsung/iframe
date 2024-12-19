import { CropVariety } from "./CropVariety";
import { Plot } from "./Plot";
import { Product } from "./Product";

export interface Bed {
    createdAt: string;
    updatedAt: string;
    harvest_date: string;
    flowering_date: string;
    planting_date: string;
    plot_id: string;
    id: string;
    width: number;
    length: number;
    crop_variety_id: string;
    expected_harvest_yield: number;
    bed_number: number;
    status: string;
    createdById: number;
    updatedById: number;
    plot: Plot;
    crop_variety: CropVariety;
    bed_plant_history_id: BedHistory[];
}
export interface BedHistory {
    createdAt: string; // ISO string format for dates
    updatedAt: string; // ISO string format for dates
    start_time: string ; // ISO string format for dates or null
    product_time: string | null; // ISO string format for dates or null
    id: string; // UUID string format
    createdById: number | null; // ID of the user who created the record, or null
    updatedById: number | null; // ID of the user who updated the record, or null
    product_id: number | null; // ID of the product, or null
    product: Product
    quantity: number ; // Quantity of the product, or null
    type: string; // Type of the record (e.g., "pet")
    bed_id: string; // UUID string format for bed ID
    product_type: string | null; // Type of product (e.g., "meat"), or null
    product_value_expected: number | null; // Expected product value, or null
    product_value_reality: number | null; // Real product value, or null
    product_value_uom_id: number | null; // Unit of measurement ID for the product value, or null
    status: string; // Status of the record (e.g., "prepare")
}

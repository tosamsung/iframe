import { CropVariety } from "./CropVariety";
import { Plot } from "./Plot";

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
}
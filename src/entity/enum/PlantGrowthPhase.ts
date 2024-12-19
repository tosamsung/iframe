export enum PlantGrowthPhase {
    Germination = "germination",
    Seedling = "seedling",
    Vegetative_rrowth = "vegetative_rrowth",
    Flower = "flower",
    Fruit = "fruit",
    Maturity = "maturity",
    Harvest = "harvest"

}

export const PlantGrowthPhaseDescriptions: Record<PlantGrowthPhase, string> = {
    [PlantGrowthPhase.Germination]: "Nảy mầm",
    [PlantGrowthPhase.Seedling]: "Cây con",
    [PlantGrowthPhase.Vegetative_rrowth]: "Tăng trưởng",
    [PlantGrowthPhase.Flower]: "Ra hoa",
    [PlantGrowthPhase.Fruit]: "Phát triển quả",
    [PlantGrowthPhase.Maturity]: "Trường thành",
    [PlantGrowthPhase.Harvest]: "Thu hoạch"
};
function isPlantGrowthPhase(value: string): value is PlantGrowthPhase {
    return Object.values(PlantGrowthPhase).includes(value as PlantGrowthPhase);
}
export const getPlantPhaseDescription = (phase: string): string => {
    if (isPlantGrowthPhase(phase))
        return PlantGrowthPhaseDescriptions[phase];
    throw new Error("Invalid phase")
};


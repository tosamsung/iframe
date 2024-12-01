import CropService from "../service/CropService";
import GrowthService from "../service/GrowthService";

export default class StaticData {
    // Static properties for caching
    private static fruitShape: Map<string, string> = new Map<string, string>();
    private static fruitSize: Map<string, string> = new Map<string, string>();
    private static soilType: Map<string, string> = new Map<string, string>();
    private static phase: Map<string, string> = new Map<string, string>();
    private static waterFrequency: Map<string, string> = new Map<string, string>();

    private static initialized = false;

    public static async initialize(): Promise<void> {
        if (this.initialized) return;

        try {
            const cropService = new CropService();
            const growthService = new GrowthService();

            const [fruitShapeResponse, fruitSizeResponse, soilTypeResponse, phaseResponse, waterFrequencyResponse] = await Promise.all([
                cropService.getCropVarietyFieldByFieldName("fruit_shape"),
                cropService.getCropVarietyFieldByFieldName("fruit_size"),
                cropService.getCropVarietyFieldByFieldName("soil_type"),
                growthService.getGrowthStagesFieldByFieldName("phase"),
                growthService.getGrowthStagesFieldByFieldName("watering_frequency"),
            ]);

            this.populateMap(this.fruitShape, fruitShapeResponse?.data?.uiSchema?.enum || []);
            this.populateMap(this.fruitSize, fruitSizeResponse?.data?.uiSchema?.enum || []);
            this.populateMap(this.soilType, soilTypeResponse?.data?.uiSchema?.enum || []);
            this.populateMap(this.phase, phaseResponse?.data?.uiSchema?.enum || []);
            this.populateMap(this.waterFrequency, waterFrequencyResponse?.data?.uiSchema?.enum || []);

            this.initialized = true;
        } catch (error) {
            console.error("Error during StaticData initialization:", error);
            throw new Error("Failed to initialize StaticData");
        }
    }

    private static populateMap(map: Map<string, string>, data: any[]): void {
        data.forEach((element: any) => {
            if (element.value && element.label) {
                map.set(element.value, element.label);
            }
        });
    }

    public static async ensureInitialized(): Promise<void> {
        if (!this.initialized) {
            await this.initialize();
        }
    }

    public static getFruitShape(): Map<string, string> {
        this.checkInitialized();
        return this.fruitShape;
    }

    public static getFruitSize(): Map<string, string> {
        this.checkInitialized();
        return this.fruitSize;
    }

    public static getSoilType(): Map<string, string> {
        this.checkInitialized();
        return this.soilType;
    }

    public static getPhase(): Map<string, string> {
        this.checkInitialized();
        return this.phase;
    }

    public static getWaterFrequency(): Map<string, string> {
        this.checkInitialized();
        return this.waterFrequency;
    }

    private static checkInitialized(): void {
        if (!this.initialized) {
            throw new Error("StaticData has not been initialized. Call ensureInitialized() first.");
        }
    }
}

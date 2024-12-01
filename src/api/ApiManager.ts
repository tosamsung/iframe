import HttpClient from "./HttpClient"

const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
    ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
    : ''

const DIGIFORCE_URL_API = DIGIFORCE_DOMAIN + '/api'
const DIGOFORCE_API_KEY = import.meta.env.VITE_DIGIFORCE_API_KEY
export default class ApiManager {
    private httpDigiforce!: HttpClient
    constructor() {
        this.httpDigiforce = new HttpClient(DIGIFORCE_URL_API)
    }

    getAllPlots() {
        const URI = "/plot:list?filter=%7B%7D&except=updatedAt%2CcreatedAt%2Cph%2Ctemperature%2Chumidity%2CcreatedById%2CupdatedById";
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getPlotById(id: string) {
        const URI = `/plot:get?filterByTk=${id}&appends[]=owner&appends[]=bed&appends[]=bed.crop_variety`;
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getBedById(id:string){
        const URI=`/bed:get?filterByTk=${id}&appends[]=plot&appends[]=crop_variety`
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getAllCrops() {
        const URI = `/crop:list?pageSize=20&filter=%7B%7D`;
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getAllPlotsByOwnerId(id: number) {
        const URI = `/plot:list?filter=%7B%0A%22owner_id%22%3A${id}%0A%7D`
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getAllCropVarietyByCropId(id: string) {
        const URI = `/crop_variety:list?appends[]=avatar&appends[]=crop&filter=%7B%0A%22crop_id%22%3A%22${id}%22%0A%7D`;
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getVarietyById(varietyId: string) {
        const URI = `/crop_variety:get?filterByTk=${varietyId}&filter=%7B%7D`
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getVarietyAllInfoById(varietyId: string) {
        const URI = `/crop_variety:get?appends[]=crop&appends[]=avatar&appends[]=image_list&appends[]=protest_plant_disease&appends[]=common_plant_disease&appends[]=protest_plant_pest&appends[]=common_plant_pest&appends[]=seeding_method&appends[]=growth_stages&appends[]=growth_stages.fertilizer&appends[]=growth_stages.fertilizer_method&appends[]=growth_stages.pest_control&filterByTk=${varietyId}&filter=%7B%7D`
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getCropVarietyFieldByFieldName(fieldName: string) {
        const URI = `/collections/crop_variety/fields:get?filterByTk=${fieldName}&appends[]=reverseField`
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
    getGrowthStagesFieldByFieldName(fieldName: string) {
        const URI = `/collections/growth_stages/fields:get?filterByTk=${fieldName}&appends[]=reverseField`
        return this.httpDigiforce.get(URI, undefined, DIGOFORCE_API_KEY);
    }
}
import { User } from "../entity/User"
import HttpClient from "./HttpClient"

const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
    ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
    : ''

const DIGIFORCE_URL_API = DIGIFORCE_DOMAIN + '/api'
const DIGIFORCE_API_KEY = WA.player.state.DIGIFORCE_TOKEN as string
export default class ApiManager {
    private httpDigiforce!: HttpClient
    constructor() {
        this.httpDigiforce = new HttpClient(DIGIFORCE_URL_API)
    }

    getAllPlots() {
        const URI = "/plot:list?filter=%7B%7D&except=updatedAt%2CcreatedAt%2Cph%2Ctemperature%2Chumidity%2CcreatedById%2CupdatedById";
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getPlotById(id: string) {
        const URI = `/plot:get?filterByTk=${id}&appends[]=farm&appends[]=owner&appends[]=bed`;
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getBedById(id: string) {
        const URI = `/bed:get?filterByTk=${id}&appends[]=crop_variety`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getAllCrops() {
        const URI = `/crop:list?pageSize=20&filter=%7B%7D`;
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getAllPlotsByOwnerId(id: number) {
        const URI = `/plot:list?filter=%7B%0A%22owner_id%22%3A${id}%0A%7D`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getAllCropVarietyByCropId(id: string) {
        const URI = `/crop_variety:list?appends[]=avatar&appends[]=crop&filter=%7B%0A%22crop_id%22%3A%22${id}%22%0A%7D`;
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getVarietyById(varietyId: string) {
        const URI = `/crop_variety:get?filterByTk=${varietyId}&filter=%7B%7D`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getAllVariety() {
        const URI = `crop_variety:list?pageSize=20&appends[]=avatar&appends[]=crop&filter=%7B%7D`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    getVarietyAllInfoById(varietyId: string) {
        const URI = `/crop_variety:get?appends[]=crop&appends[]=avatar&appends[]=image_list&appends[]=protest_plant_disease&appends[]=common_plant_disease&appends[]=protest_plant_pest&appends[]=common_plant_pest&appends[]=seeding_method&appends[]=growth_stages&appends[]=growth_stages.fertilizer&appends[]=growth_stages.fertilizer_method&appends[]=growth_stages.pest_control&filterByTk=${varietyId}&filter=%7B%7D`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY);
    }
    updateUser(user: User) {
        const URI = `/users:update?filterByTk=${user.id}`
        return this.httpDigiforce.post(URI, user, undefined, 'application/json', DIGIFORCE_API_KEY);
    }
    getWalletByUserId(id: number) {
        const URI = `/user_wallet:get?filter=%7B%0A%22user_id%22%3A${id}%0A%7D`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY)
    }
    //chicken
    getAllChickens() {
        const URI = `/pets:list?pageSize=20&appends[]=avatar&filter=%7B%7D`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY)
    }
    getChickenById(chickenId: string) {
        const URI = `/pets:get?filterByTk=${chickenId}&appends[]=avatar&appends[]=image_list&appends[]=common_diseases&appends[]=pets_growth_stages&appends[]=vaccination_schedule&appends[]=vaccination_schedule.vaccine&appends[]=disease_prevention&appends[]=product.id`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY)
    }
    getFeedingInfoByBedId(bedId: string) {
        const URI = `https://gsg-dev.greenskygarden.com/api/bed:get?appends[]=bed_plant_history_id.start_time&appends[]=bed_plant_history_id.quantity&appends[]=bed_plant_history_id.product.id&appends[]=bed_plant_history_id.product.name&appends[]=bed_plant_history_id.product.pets_id.pets_growth_stages&filter=%7B%7D&appends[]=bed_plant_history_id.product.pets_id.pets_growth_stages.forage.list_price&appends[]=bed_plant_history_id.product.pets_id.pets_growth_stages.uom.uom_type&appends[]=bed_plant_history_id.product.pets_id.pets_growth_stages.uom.ratio&fields=id&filterByTk=${bedId}`
        return this.httpDigiforce.get(URI, undefined, DIGIFORCE_API_KEY)
    }
    // login(userLogin: UserLogin) {
    //     const URI = `/auth:signIn`
    //     return this.httpDigiforce.post(URI, userLogin, undefined, 'application/json');
    // }
    // register(userRegister: UserRegister) {
    //     const URI = `/users:create`
    //     return this.httpDigiforce.post(URI, userRegister, undefined, 'application/json', DIGIFORCE_API_KEY);
    // }
    logout() {
        const URI = `/auth:signOut`
        return this.httpDigiforce.post(URI, undefined, undefined, 'application/json');
    }
    auth(token: string) {
        const URI = `/auth:check`
        return this.httpDigiforce.get(URI, undefined, token);
    }
}
import ApiManager from '../api/ApiManager';


export default class ChickenService {
    private apiManager: ApiManager;

    constructor() {
        this.apiManager = new ApiManager();
    }
    getAllChickens() {
        return this.apiManager.getAllChickens()
    }
    getChickenById(chickenId: string) {
        return this.apiManager.getChickenById(chickenId)
    }
    getFeedingInfoBedId(bedId: string) {
        return this.apiManager.getFeedingInfoByBedId(bedId)
    }

}

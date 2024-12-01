import ApiManager from '../api/ApiManager'; // Import ApiManager class

export default class GrowthService {
    private apiManager: ApiManager;

    constructor() {
        this.apiManager = new ApiManager(); // Initialize ApiManager
    }
    getGrowthStagesFieldByFieldName(fieldName:string){
        return this.apiManager.getGrowthStagesFieldByFieldName(fieldName).then((response: any) => {
            return response;
        });
    }


}

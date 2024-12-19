import ApiManager from '../api/ApiManager'; // Import ApiManager class
import { Bed } from '../entity/Bed';

export default class BedService {
    private apiManager: ApiManager;

    constructor() {
        this.apiManager = new ApiManager(); // Initialize ApiManager
    }
    getBedById(id:string): Promise<Bed> {
        return this.apiManager.getBedById(id).then((response: any) => {
            return response;
        });
    }


}

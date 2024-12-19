export interface Plot {
    createdAt: string; 
    updatedAt: string; 
    plot_number: string; 
    width: number; 
    length: number; 
    area: number; 
    status: 'using' | 'new' ; 
    ph: number;
    humidity: number; 
    temperature: number; 
    row: number;
    column: number; 
    owner_id: number;
    id: string; 
    createdById: number; 
    updatedById: number; 
    farm_id: string ; 
    price:number;
  }
  
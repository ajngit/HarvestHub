export class ProductDetail{
    ProductID    : number =0;
     ProductName :  string='' ;
     Description :  string='' ;
     ProductType : number =0;
     Price       : number =0;
     TotalQuantity : number =0;
     ImageURL    : string='' ;
    // ModifiedDate:  Date = new Date() ;
     ModifiedUser: number =0;
     UserName:string='' ;
     AvailableQuantity: number =0;
     DelStatus   : boolean=false;


     Refresh(){
        this.ProductID      =0  ;
        this.ProductName    ='' ;
        this.Description    ='' ;
        this.ProductType    =0  ;
        this.Price          =0  ;
        this.TotalQuantity  =0  ;
        this.ImageURL       ='' ;
       // this.ModifiedDate   =new Date() ;
        this.ModifiedUser   =0;
        this.DelStatus      =false;
     }
}
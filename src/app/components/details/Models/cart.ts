
export class Cart{
    ImageURL:string=''
    Price: number =0 ;
    ProductName:string=''
    ProductRegID : number =0 ;
    ProductID    : number =0 ;
    Quantity     : number =0 ;
    Discount     : number =0 ;
    GrossTotal   : number =0 ;
    NetTotal     : number =0 ;
    ServiceCharge: number =0 ;
    PaymentCharge: number =0 ;
    DeliveryCharge: number =0 ;
    TaxCharge    : number =0 ;
    ModifiedDate : Date = new Date() ;
    ModifiedUser : number =0 ;
    DelStatus    : boolean=false;

    
}
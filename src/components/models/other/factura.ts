import { BillingPeriod } from "./billingPeriod";
import { Customer } from "./customer";
import { Items } from "./items";

export class Factura{

    numbering_range_id:number=0;
    reference_code:string="";
    observation:string="";
    payment_form:string="";
    payment_due_date:string="";
    payment_method_code:string="10";
    billing_period:BillingPeriod=new BillingPeriod();
    customer:Customer = new Customer();
    items: Items[] = [];
}
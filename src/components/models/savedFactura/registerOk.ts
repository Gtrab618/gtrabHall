import { BillingPeriod } from "../other/billingPeriod";
import { Company } from "../other/company";
import { Bill } from "./bill/bill";
import { CustomerOk } from "./customer";
import { Numbering_Range } from "./numbering_range";

export class RegisterOk{
    
    company:Company = new Company()
    customer:CustomerOk= new CustomerOk()
    numbering:Numbering_Range= new Numbering_Range()
    billing_period:BillingPeriod= new BillingPeriod()
    bill:Bill=new Bill()
    related_documents:any;
    




}
import { withholding } from "../../other/withholding";
import { Tribute } from "../tribute";
import { Standard_Code } from "./standard_code";
import { Unit_Measure } from "./unit_measure";

export class ItemsOk{
    code_reference:string="";
    name: string="";
    quantity: string="";
    discount_rate: string="";
    discount: string="";
    gross_value: string="";
    tax_rate: string="";
    taxable_amount: string="";
    tax_amount:string="";
    price: string="";
    is_excluded: string="";
    unit_measure:Unit_Measure= new Unit_Measure();
    standard_cod:Standard_Code= new Standard_Code();
    tribute:Tribute=new Tribute();
    total:number=0;
    withholding_taxes:withholding= new withholding();
    credit_notes:any
    debit_notes:any


}
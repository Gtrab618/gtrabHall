import { Payment_Form } from "../savedFactura/bill/payment_form";

export class Facture{
    id:number=0;
    document:Document=new Document();
    number:string="";
    api_client_name:string="";
    reference_code:string="";
    identification:string="";
    graphic_representation_name:string="";
    company: string=""
    trade_name: string=""
    names: string=""
    email:string=""
    total:string=""
    status:number=0
    errors: any
    send_email:number=0
    has_claim:number=0
    is_negotiable_instrument:number=0
    payment_form:Payment_Form=new Payment_Form()
    created_at:string=""
    credit_notes:any
    debit_notes:any
}
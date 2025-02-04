import { Document } from "./document";
import { Payment_Form } from "./payment_form";
import { Payment_Method } from "./payment_method";

export class Bill{
    id:number=0;
    document:Document= new Document();
    number:string="";
    reference_code:string="";
    status:number=0;
    send_email:number=0;
    qr:string="";
    cufe:string="";
    validated:string="";
    discount_rate:string="";
    discount:string="";
    gross_value:string="";
    taxable_amount:string="";
    tax_amount:string="";
    total:string="";
    observation:string="";
    errors:string[]=[]
    created_at:string="";
    payment_due_date:string="";
    qr_image:string="";
    has_claim:number=0;
    is_negotiable_instrument:number=0;
    payment_form:Payment_Form=new Payment_Form()
    payment_method:Payment_Method= new Payment_Method()
    public_url:string="";


}
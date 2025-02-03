import { withholding } from "./withholding";

export class Items{
    code_reference:string="";//codigo referencia
    name:string="";//nombre
    quantity:number=1;//cantidad
    discount_rate:number=0;//procentaje descuento
    price:number=1;// precio con impuestos
    tax_rate:string="0";// procentaje impuesto
    unit_measure_id:number=0;// id unidad medida
    standard_code_id:number=0;// codigos estandar precargados
    is_excluded:number=0;//boolean
    tribute_id:string="1";// precargado tributos
    withholding_taxes:withholding[]=[]


}
import { Legal_Organization } from "./legal_organization"
import { Municipality } from "./municipality"
import { Tribute } from "./tribute"

export class CustomerOk{

    identification: string=""
    dv: string=""
    graphic_representation_name: string=""
    trade_name: string=""
    company: string=""
    names: string=""
    address: string=""
    email: string=""
    phone: string=""
    legal_organization:Legal_Organization=new Legal_Organization()
    tribute:Tribute= new Tribute()
    municipality:Municipality= new Municipality()

}
import dayjs from "dayjs";

export interface dateFactu{
  
    getDate:(dateTest:dayjs.Dayjs | null ) => void
    title:string
}

export interface passNumberFacture{

    getNumberFacture:(numberFac:string)=>void;

}

export interface recivedNumberFacture{
    number:string
}
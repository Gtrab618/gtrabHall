import dayjs from "dayjs";

export interface dateFactu{
  
    getDate:(dateTest:dayjs.Dayjs | null ) => void
    title:string
}
import moment from "moment";

export const toDateBR = (date: string) => {
    return moment(date).format("DD/MM/YYYY")
}
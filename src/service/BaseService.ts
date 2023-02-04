
import {axiosPlugin} from "../plugins/axios";

type FilterOptions = {
    searchField: string,
    searchValue: string,
    searchOperation: string
}

export default class BaseService {
    serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName
    }

    async create(data: any): Promise<void> {
        await axiosPlugin.post(`/${this.serviceName}`, data)
    }

    async list<T>(options?: FilterOptions): Promise<T[]> {
        const { data: { data: result }} = await axiosPlugin.get<{ data: T[]}>(`/${this.serviceName}`, {
            data: options
        })
        return result
    }

    async delete(id:number) {
        await axiosPlugin.delete(`/${id}`)
    }

    async update(data: any): Promise<void> {
        await axiosPlugin.patch(`/${this.serviceName}`, data)
    }
}
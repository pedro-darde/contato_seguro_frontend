
import {axiosPlugin} from "../plugins/axios";

export type FilterOptions = {
    searchField?: string,
    searchValue?: string,
    searchOperation?: string,
    extra?: any
}

export default class BaseService {
    serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName
    }

    async create(data: any): Promise<void> {
        await axiosPlugin.post(`/${this.serviceName}`, data)
    }

    async list<T>(options?: FilterOptions): Promise<T> {
        const { data: { data: result }} = await axiosPlugin.get<{ data: T}>(`/${this.serviceName}`, {
            params: options
        })
        return result
    }

    async delete(id:number) {
        await axiosPlugin.delete(`/${this.serviceName}/${id}`)
    }

    async update(id:number, data: any): Promise<void> {
        await axiosPlugin.patch(`/${this.serviceName}/${id}`, data)
    }
}
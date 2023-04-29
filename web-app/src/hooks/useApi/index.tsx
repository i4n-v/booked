import api from "../../configs/api";

export default function useApi(url: string){
    return {
        get: async function <T>(id:string = '') { 
            return await api.get<T>(`${url}/${id}`)
        },
        post: async function <T>(data: any) { 
            return await api.post<T>(`${url}`,data)
        },
        patch: async function <T>(data: any, id: string) { 
            return await api.patch<T>(`${url}/${id}`,data)
        },
        put:async function <T>(data: any,id: string) { 
            return await api.put<T>(`${url}/${id}`,data)
        },
    }
}
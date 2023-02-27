// @ts-ignore
// import {API_URL} from '@env';

import { API_URL } from "@/redux/api/url"

export const getFileUrl = (name: string) : string =>{
    return `${API_URL.BASE_URL}/private/${name}`
}
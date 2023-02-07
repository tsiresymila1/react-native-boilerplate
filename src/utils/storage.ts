// @ts-ignore
import {API_URL} from '@env';

export const getFileUrl = (name: string) : string =>{
    return `${API_URL}/storage/private/${name}`
}
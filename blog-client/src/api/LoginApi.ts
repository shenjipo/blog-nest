import { http } from "./axios"

/* 登录接口参数类型 */
export interface Response<T> {
    code: number,
    msg: string,
    data: T
}

interface LoginData {
    token: string,
    user: any
}
export class LoginApi {
    static login(params: any): Promise<LoginData> {
        return http.post<LoginData>('/login', params).then(res => {
       
            res.user.username = res.user.account
            return res
        }).catch((err: any) => {

            return Promise.reject(err)
        })
    }
}
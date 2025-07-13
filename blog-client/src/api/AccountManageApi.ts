import { AxiosResponse } from "axios"
import { http } from "./axios"
import { Response } from './login'
import { Account } from "@/model/Account"
import { Page } from "@/model/Common"
/* 登录接口参数类型 */

interface AddAccount {
    account: string,
    password: string,
    createTime?: string
}

export class AccountManageApi {
    // 查询所有账号
    static queryAccountList(val: { current: number, size: number, query?: string }) {
        return http.post('/queryAccount', val).then((res: Page<Account>) => {
            return res
        })
    }

    // 根据uuid查询账号
    static getAccountByUuid(uuid: string) {
        return http.get('/getAccountByUuid', { params: { uuid } }).then((res: Account) => {
            return res
        })
    }

    // 新建账号
    static addAccount(params: AddAccount): Promise<{ id: number }> {
        params.createTime = new Date().getTime().toString()

        return http.post('/addAccount', params).then(res => {

            return res
        })
    }

    // 删除账号
    static deleteAccount(params: { uuid: string }): Promise<null> {
        return http.post('/deleteAccount', params).then(res => {
            return res
        })
    }

    // 修改账号
    static editAccount(params: { uuid: string, password: string, updateTime?: string }): Promise<null> {
        params.updateTime = new Date().getTime().toString()

        return http.post('/editAccount', params).then(res => {
            return res
        })
    }
}
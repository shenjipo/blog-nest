export class UserDto {
    uuid!: string
    account: string
    password: string
    token: number | null
    createTime: string
    updateTime: string
}
export class UserDto {
    uuid!: string
    account: string
    password: string
    token: Nullable<string>
    createTime: string
    updateTime: string
}
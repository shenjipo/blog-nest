import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_API = 'IS_PUBLIC_API'
export const PublicApi = () => SetMetadata(IS_PUBLIC_API, true)
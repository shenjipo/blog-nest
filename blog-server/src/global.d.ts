// src/types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        APP_PORT: string
        JWT_SALT: string
        MYSQL_HOST: string
        MYSQL_PORT: string
        MYSQL_USER_NAME: string
        MYSQL_PASSWORD: string
        MYSQL_DATABASE: string
    }
}

type Nullable<T> = T | null | undefined 
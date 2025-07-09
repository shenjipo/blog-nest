import { Column, Entity } from "typeorm";

@Entity("user")
export class UserEntity {
    @Column("varchar", { primary: true, name: "uuid", length: 255 })
    uuid: string;

    @Column("varchar", { name: "account", length: 255 })
    account: string;

    @Column("varchar", { name: "password", length: 255 })
    password: string;

    @Column("varchar", { name: "token", nullable: true, length: 255 })
    token: string | null;

    @Column("varchar", { name: "createTime", length: 255 })
    createTime: string;

    @Column("varchar", { name: "updateTime", nullable: true, length: 255 })
    updateTime: string | null;
}

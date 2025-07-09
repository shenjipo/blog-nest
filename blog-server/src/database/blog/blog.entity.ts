import { Column, Entity } from "typeorm";

// 这里的article对应的是数据库表名
@Entity("article")
export class BlogEntity {
    @Column("varchar", { primary: true, name: "id", length: 255 })
    id: string;

    @Column("varchar", { name: "title", nullable: true, length: 255 })
    title: string | null;

    @Column("varchar", { name: "content", nullable: true, length: 9999 })
    content: string | null;

    @Column("varchar", { name: "author", nullable: true, length: 255 })
    author: string | null;

    @Column("varchar", { name: "createTime", nullable: true, length: 255 })
    createTime: string | null;

    @Column("varchar", { name: "updateTime", nullable: true, length: 255 })
    updateTime: string | null;

    @Column("varchar", { name: "isPreviewShow", nullable: true, length: 255 })
    isPreviewShow: string | null;

    @Column("varchar", { name: "author_uuid", length: 255 })
    authorUuid: string;
}

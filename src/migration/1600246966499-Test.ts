import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1600246966499 implements MigrationInterface {
    name = 'Test1600246966499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_extend` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `mobile` varchar(11) NULL COMMENT '手机号码', `address` varchar(50) NULL COMMENT '地址', `userId` int NULL COMMENT '主键id', UNIQUE INDEX `REL_80fd72a547f9b3b68985d220d5` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `name` varchar(255) NOT NULL COMMENT 'role名称', `created_at` timestamp(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `username` varchar(50) NOT NULL COMMENT '用户名', `password` varchar(100) NOT NULL COMMENT '密码', `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT 0, `created_at` timestamp(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tags` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `name` varchar(255) NOT NULL COMMENT 'tag名称', UNIQUE INDEX `IDX_d90243459a697eadb8ad56e909` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `title` varchar(50) NOT NULL COMMENT '标题', `content` text NULL COMMENT '内容', `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT 0, `created_at` timestamp(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL COMMENT '主键id', UNIQUE INDEX `IDX_2d82eb2bb2ddd7a6bfac8804d8` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_role` (`rolesId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_5d19ca4692b21d67f692bb837d` (`rolesId`), INDEX `IDX_ab40a6f0cd7d3ebfcce082131f` (`userId`), PRIMARY KEY (`rolesId`, `userId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tags_posts` (`tagsId` int NOT NULL, `postsId` int NOT NULL, INDEX `IDX_5d9ec7c3cbff4fdb757624c95d` (`tagsId`), INDEX `IDX_d0050901b67492a8fda19bd797` (`postsId`), PRIMARY KEY (`tagsId`, `postsId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_extend` ADD CONSTRAINT `FK_80fd72a547f9b3b68985d220d5b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `posts` ADD CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_role` ADD CONSTRAINT `FK_5d19ca4692b21d67f692bb837df` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_role` ADD CONSTRAINT `FK_ab40a6f0cd7d3ebfcce082131fd` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tags_posts` ADD CONSTRAINT `FK_5d9ec7c3cbff4fdb757624c95d2` FOREIGN KEY (`tagsId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tags_posts` ADD CONSTRAINT `FK_d0050901b67492a8fda19bd797d` FOREIGN KEY (`postsId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tags_posts` DROP FOREIGN KEY `FK_d0050901b67492a8fda19bd797d`");
        await queryRunner.query("ALTER TABLE `tags_posts` DROP FOREIGN KEY `FK_5d9ec7c3cbff4fdb757624c95d2`");
        await queryRunner.query("ALTER TABLE `user_role` DROP FOREIGN KEY `FK_ab40a6f0cd7d3ebfcce082131fd`");
        await queryRunner.query("ALTER TABLE `user_role` DROP FOREIGN KEY `FK_5d19ca4692b21d67f692bb837df`");
        await queryRunner.query("ALTER TABLE `posts` DROP FOREIGN KEY `FK_ae05faaa55c866130abef6e1fee`");
        await queryRunner.query("ALTER TABLE `user_extend` DROP FOREIGN KEY `FK_80fd72a547f9b3b68985d220d5b`");
        await queryRunner.query("DROP INDEX `IDX_d0050901b67492a8fda19bd797` ON `tags_posts`");
        await queryRunner.query("DROP INDEX `IDX_5d9ec7c3cbff4fdb757624c95d` ON `tags_posts`");
        await queryRunner.query("DROP TABLE `tags_posts`");
        await queryRunner.query("DROP INDEX `IDX_ab40a6f0cd7d3ebfcce082131f` ON `user_role`");
        await queryRunner.query("DROP INDEX `IDX_5d19ca4692b21d67f692bb837d` ON `user_role`");
        await queryRunner.query("DROP TABLE `user_role`");
        await queryRunner.query("DROP INDEX `IDX_2d82eb2bb2ddd7a6bfac8804d8` ON `posts`");
        await queryRunner.query("DROP TABLE `posts`");
        await queryRunner.query("DROP INDEX `IDX_d90243459a697eadb8ad56e909` ON `tags`");
        await queryRunner.query("DROP TABLE `tags`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP INDEX `REL_80fd72a547f9b3b68985d220d5` ON `user_extend`");
        await queryRunner.query("DROP TABLE `user_extend`");
    }

}

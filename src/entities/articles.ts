// CREATE TABLE articles (
//     id int(11) NOT NULL AUTO_INCREMENT,
//     user_id int(11) NOT NULL COMMENT 'userid',
//     article TEXT COMMENT 'article',
//     create_dt datetime NOT NULL DEFAULT now() COMMENT 'create time',
//     update_dt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
//     audit int(1) NOT NULL COMMENT 'audit or not',
//     PRIMARY KEY (id)
//   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Index('article_id', ['id'], { unique: true }) // 创建索引https://typeorm.io/#/indices，https://typeorm.biunav.com/zh/indices.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95
  @Entity('articles', { schema: 'nest_antd_pro_blog' }) // articles是数据表的名称，schema是数据库的名称。通常Entity都不用参数。相关参数，https://typeorm.biunav.com/zh/decorator-reference.html#%E5%AE%9E%E4%BD%93%E8%A3%85%E9%A5%B0%E5%99%A8
  export class Articles {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '文章id' })
    id: number;
  
    @Column('int', {
      name: 'user_id', // 这个名称是数据库里面表字段的名称
      unique: true,
      comment: '用户id',
      width: 11,
    })
    userId: number; // 这个名称是nestjs访问数据库后返回的js对象的属性的名称
  
    @Column('text', { name: 'article', comment: '文章内容' })
    article: string;
  
    @Column('datetime', {
      name: 'create_dt',
      comment: '创建时间',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createDt: Date;
  
    @Column('timestamp', {
      name: 'update_dt',
      nullable: true,
      comment: '修改时间',
    })
    updateDt: Date | null;
  
    @Column('int', {
      name: 'audit',
      comment: '是否通过审核', // 0 未通过， 1 通过
      width: 1,
      default: () => "'0'",
    })
    audit: boolean;
  }
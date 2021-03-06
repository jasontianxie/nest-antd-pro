import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Index('uk_mobile', ['mobile'], { unique: true }) // 创建索引，https://typeorm.io/#/indices，https://typeorm.biunav.com/zh/indices.html#%E5%94%AF%E4%B8%80%E7%B4%A2%E5%BC%95
  @Entity('st_user', { schema: 'nest_antd_pro_blog' }) // st_user是数据表的名称，schema是数据库的名称。通常Entity都不用参数。相关参数，https://typeorm.io/#/decorator-reference/entity
  export class StUser {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '主键id' })
    id: number;
  
    @Column('varchar', {
      name: 'mobile',
      unique: true,
      comment: '手机号',
      length: 20,
    })
    mobile: string;
  
    @Column('varchar', { name: 'name', comment: '昵称', length: 20 })
    name: string;
  
    @Column('tinyint', {
      name: 'role',
      comment: '角色：100 超级管理员，0 普通用户',
      width: 1,
      default: () => "0",
    })
    role: number;
  
    @Column('varchar', { name: 'password', comment: '密码', length: 100 })
    password: string;
  
    @Column('varchar', { name: 'salt', comment: '密码盐', length: 100 })
    salt: string;
  
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
  
    @Column('tinyint', {
      name: 'is_disabled',
      comment: '是否禁用',
      width: 1,
      default: () => "'0'", // 为什么这里的default设置了还是不起作用？
    })
    isDelete: number;
  }
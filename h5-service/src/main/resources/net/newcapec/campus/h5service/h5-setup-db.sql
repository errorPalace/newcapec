-- CREATE DATABASE IF NOT EXISTS CAMPUS_QUICKACCESS DEFAULT CHARSET UTF8 COLLATE UTF8_GENERAL_CI;

-- 创建学校表
drop table if exists QUICKACCESS_CUSTOMER;

    create table QUICKACCESS_CUSTOMER (
        ID_ bigint not null,
        CREATEDATE_ datetime,
        CUSTOMERCODE_ varchar(150),
        CUSTOMERID_ varchar(255),
        CUSTOMERNAME_ varchar(150),
        DPCODE_ varchar(150),
        JIANPIN_ varchar(255),
        PINYIN_ varchar(255),
        SOURCEIPS_ varchar(255),
        URL_ varchar(200),
        primary key (ID_)
    );
    
-- 创建学生表
drop table if exists QUICKACCESS_STUDENT;

    create table QUICKACCESS_STUDENT (
        ID_ bigint not null,
        APPID_ varchar(200),
        APPNAME_ varchar(200),
        BINDCARDSTATE_ bit,
        CUSTOMERCODE_ varchar(255),
        CUSTOMERID_ varchar(255),
        DATE_ datetime,
        NAME_ varchar(255),
        OUTID_ varchar(200),
        PARAM_ varchar(2000),
        USERID_ varchar(200),
        primary key (ID_)
    );
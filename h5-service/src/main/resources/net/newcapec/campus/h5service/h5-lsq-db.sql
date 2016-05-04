-- CREATE DATABASE IF NOT EXISTS CAMPUS_QUICKACCESS DEFAULT CHARSET UTF8 COLLATE UTF8_GENERAL_CI;

-- 创建学校表
drop table if exists IPADDR_LOG_;

    create table IPADDR_LOG_ (
        ID_ bigint not null,
        CREATEDATE_ datetime,
        IPADDR_ varchar(200),
        primary key (ID_)
    );
--创建校园卡日记分享相关表格  
drop table if exists USER_SCHOOLCARD_DATA_;

CREATE TABLE `USER_SCHOOLCARD_DATA_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`CREATEDATE_`  datetime NULL ,

`USER_ID_`  bigint NULL ,
`NAME_`  varchar(255) NULL ,
`NICKNAME_`  varchar(255) NULL ,
`STUNO_`  varchar(255) NULL ,
`CUSTOMER_CODE_`  varchar(255) NULL ,
`CUSTOMER_NAME_`  varchar(255) NULL ,
`ISBING_ECARD_`  char(15) NULL ,
`UUID_`  varchar(255) NULL ,
`SEX_`  varchar(255) NULL ,
PRIMARY KEY (`ID_`)
)
;
--  投票相关表


drop table if exists VOTE_CLASS_;

CREATE TABLE `VOTE_CLASS_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`CLASSNAME_`  varchar(255) NULL ,
`CUSTOMERCODE_`  varchar(255) NULL ,
`CUSTOMERNAME_`  varchar(255) NULL ,
`CREATEDATE_`  datetime,
`POLL_`  bigint NOT NULL DEFAULT 0 ,
PRIMARY KEY (`ID_`)
);

drop table if exists VOTE_SCHOOL_;

CREATE TABLE `VOTE_SCHOOL_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`CUSTOMERCODE_`  varchar(255) NULL ,
`CUSTOMERNAME_`  varchar(255) NULL ,
`CREATEDATE_`  datetime,
`POLL_`  bigint NOT NULL DEFAULT 0 ,
PRIMARY KEY (`ID_`)
);

drop table if exists VOTE_USERINFO_;

CREATE TABLE `VOTE_USERINFO_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`USERID_`  bigint NULL ,

`USERNAME_`  varchar(255) NULL ,
`TYPE_`  char(10) NOT NULL DEFAULT 0 ,
`UUID_`  varchar(255) NULL ,
`CLASSID_` bigint NULL ,
`CREATEDATE_`  datetime,
`VOTEDATE_`  datetime,
`CUSTOMERCODE_`  varchar(255) NULL ,
`CUSTOMERNAME_`  varchar(255) NULL ,
PRIMARY KEY (`ID_`)
);
ALTER TABLE `VOTE_USERINFO_`
ADD COLUMN `SHARE_UUID_`  varchar(255) NULL AFTER `CUSTOMERNAME_`;
ALTER TABLE `VOTE_USERINFO_`
ADD COLUMN `OUTID_`  varchar(255) NULL AFTER `SHARE_UUID_`;
ALTER TABLE `VOTE_CLASS_`
ADD INDEX `customer_code` (`CUSTOMERCODE_`) ;
ALTER TABLE `VOTE_SCHOOL_`
ADD INDEX `customer_code` (`CUSTOMERCODE_`) ;

ALTER TABLE `VOTE_USERINFO_`
ADD INDEX `uuid` USING BTREE (`UUID_`) ,
ADD INDEX `classid` (`CLASSID_`) ,
ADD INDEX `share_uuid` (`SHARE_UUID_`) ;


--   图书馆相关

CREATE TABLE `CP_NEWS` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`USERID_`  bigint NULL ,

`TITLE_`  varchar(400) NULL ,
`CONTENT_`  varchar(400) NULL ,
`SUMMARY_`  varchar(400) NULL ,
`CREATETIME_`  datetime,
`CREATOR_`  varchar(50) NULL ,
`CUSTOMERID_`  varchar(20) NULL ,
`ENABLED_`  varchar(50) NULL ,
`ICON_`  varchar(2000) NULL ,
`CONTENT_IMAGES_`  varchar(2000) NULL ,
`TYPE_` bigint(20) ,
`FLAG_`  varchar(20) NULL ,
PRIMARY KEY (`ID_`)
);


ALTER TABLE `CP_NEWS`
ADD INDEX `createtime` (`CREATETIME_`) ,
ADD INDEX `type` (`TYPE_`) ,
ADD INDEX `customerid` (`CUSTOMERID_`) ;

CREATE TABLE `LIBRARY_USER_LIKE_TYPE_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`ENABLE_`  int NULL  DEFAULT 0  ,
`CREATE_OPERATOR_`  varchar(255) NULL ,
`MODIFY_OPERATOR_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
`MODIFY_STAMP_`  datetime NULL ,
`CUSTOMERCODE_`  varchar(255) NULL ,
`OUTID_`  varchar(255) NULL ,
`LIKETYPE_`  varchar(255) NULL ,
PRIMARY KEY (`ID_`)
)


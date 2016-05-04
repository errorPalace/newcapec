/*2016年1月11日11:16:49*/
CREATE TABLE `ACTIVITY_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`NAME_`  varchar(255) NULL ,
`DESCRIPTION_`  varchar(2000) NULL ,
`INCOUNT_`  int NULL ,
`IS_USE_`  int NULL DEFAULT 0,
`ENABLE_`  int NULL  DEFAULT 0  ,
`START_STAMP_`  datetime NULL ,
`END_STAMP_`  datetime NULL ,
`CREATE_OPERATOR_`  varchar(255) NULL ,
`MODIFY_OPERATOR_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
`MODIFY_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;

CREATE TABLE `ACTIVITY_LOG_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`USERID_`  bigint NULL ,
`USERNAME_`  varchar(255) NULL ,
`MOBILE_`  varchar(255) NULL ,
`DRAWCODE_`  varchar(255) NULL ,
`ACTIVITY_ID_`  bigint NULL ,
`SON_ACTIVITY_ID`  bigint NULL ,
`PRIZEID_`  bigint NULL ,
`CREATE_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;
CREATE TABLE `ACTIVITY_PRIZE_SIZE_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`ACTIVITYID_`  bigint NULL ,
`PRIZEID_`  bigint NULL ,
`PRIZETYPE_`  int NULL ,
`COUNT_`  int NULL ,
`WINCOUNT_`  int NULL ,
`ALLOTCOUNT_`  int NULL ,
`ENABLE_`  int NULL  DEFAULT 0  ,
`CREATE_OPERATOR_`  varchar(255) NULL ,
`MODIFY_OPERATOR_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
`MODIFY_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;
CREATE TABLE `PRIZE_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`NAME_`  varchar(255) NULL ,
`IMAGE_PATH_`  varchar(2000) NULL ,
`NOTE_`  varchar(2000) NULL ,
`TYPE_`  int NULL ,
`ENABLE_`  int NULL  DEFAULT 0  ,
`CREATE_OPERATOR_`  varchar(255) NULL ,
`MODIFY_OPERATOR_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
`MODIFY_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;
CREATE TABLE `SON_ACTIVITY_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`NAME_`  varchar(255) NULL ,
`ACTIVITYID_` bigint NULL ,
`COUNT_`  int NULL ,
`TAKECOUNT_`  int NULL ,
`INCOUNT_`  int NULL ,
`START_STAMP_`  datetime NULL ,
`END_STAMP_`  datetime NULL ,
`ENABLE_`  int NULL  DEFAULT 0  ,
`CREATE_OPERATOR_`  varchar(255) NULL ,
`MODIFY_OPERATOR_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
`MODIFY_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;
CREATE TABLE `SON_ACTIVITY_PRIZE_CFG_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`ACTIVITY_ID`  bigint NULL,
`SON_ACTIVITY_ID` bigint NULL ,
`PRIZEID_`  bigint NULL ,
`ALLOTCOUNT_`  int NULL ,
`SURPLUS_COUNT_`  int NULL ,
`IN_COUNT_`  int NULL ,
`ENABLE_`  int NULL  DEFAULT 0  ,
`CREATE_OPERATOR_`  varchar(255) NULL ,
`MODIFY_OPERATOR_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
`MODIFY_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;
/*2016年1月13日 11:36:35*/
ALTER TABLE `ACTIVITY_LOG_`
ADD INDEX (`USERID_`) ,
ADD INDEX (`USERNAME_`) ,
ADD INDEX (`MOBILE_`) ,
ADD INDEX (`ACTIVITY_ID_`) ,
ADD INDEX (`SON_ACTIVITY_ID`) ,
ADD INDEX (`PRIZEID_`) ;

ALTER TABLE `ACTIVITY_`
ADD INDEX (`ENABLE_`) ;



ALTER TABLE `ACTIVITY_PRIZE_SIZE_`
ADD INDEX (`ACTIVITYID_`) ,
ADD INDEX (`PRIZEID_`) ;
ADD INDEX `IDX_ACTIVITY_PRIZE_SIZE_ENABLE_` (`ENABLE_`);

ALTER TABLE `SON_ACTIVITY_`
ADD INDEX (`ACTIVITYID_`) ,
ADD INDEX `IDX_SON_ACTIVITY_ENABLE_` (`ENABLE_`);

ALTER TABLE `SON_ACTIVITY_PRIZE_CFG_`
ADD INDEX (`ACTIVITY_ID`) ,
ADD INDEX (`SON_ACTIVITY_ID`) ,
ADD INDEX (`PRIZEID_`) ,
ADD INDEX `IDX_SON_SON_ACTIVITY_PRIZE_CFG_ENABLE_` (`ENABLE_`);



/*2016年1月14日 11:36:24*/
CREATE TABLE `PROGRAMVOTE_LOG_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`USERID_`  bigint NULL ,
`USERNAME_`  varchar(255) NULL ,
`MOBILE_`  varchar(255) NULL ,
`PROGRAMIDS_`  varchar(255) NULL ,
`CREATE_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;
ALTER TABLE `PROGRAMVOTE_LOG_`
ADD UNIQUE INDEX `USERID_` (`USERID_`) USING BTREE ,
ADD INDEX (`USERNAME_`) ,
ADD INDEX (`MOBILE_`) ;

CREATE TABLE `PROGRAM_` (
`ID_`  bigint NOT NULL AUTO_INCREMENT ,
`NAME_`  varchar(255) NULL ,
`DIRECTOR_`  varchar(255) NULL ,
`PARTICIPANT_`  varchar(2000) NULL ,
`COUNT_`  int NULL DEFAULT 0 ,
`CREATE_STAMP_`  datetime NULL ,
PRIMARY KEY (`ID_`)
)
;



INSERT INTO `PROGRAM_` VALUES ('1', '《击鼓迎春》', '', '经营层高管', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('2', '沙画《腾飞！新开普》', '', '沙画', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('3', '舞蹈《采莲》', '', '舞蹈演员', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('4', '歌曲串烧《牧马少年》、《九月九的酒》、《南山南》', '', '王赫、苏登辉、姜绪', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('5', '舞蹈《疯狂小人国》', '', '山西新开普', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('6', '情景剧《生产那些事》', '', '生产中心', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('7', '舞蹈《疯狂课间操》', '', '人力资源部', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('8', '歌曲《海阔天空》', '', '邀请乐队+高磊、杨冰', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('9', '民族舞《鸿雁》', '', '马晓亮', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('10', '访谈《新开普一家人》', '', '吉宾/李军艳、优秀员工家属', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('11', '歌曲《常回家看看》', '', '袁胜兵、杨玲', '0', '2016-01-29 15:35:22');
INSERT INTO `PROGRAM_` VALUES ('12', '小品《西游降魔之三句半篇》', '杨文寿', '任岳峰、马振刚、庞君、李自刚', '0', '2016-01-29 15:35:22');
/*2016年1月22日13:08:56*/
ALTER TABLE `ACTIVITY_LOG_`
ADD COLUMN `USERSN_`  varchar(255) NULL ;
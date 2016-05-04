/**
 * =======================================================================================
 * 接口版本：v1.0
 * 新开普玩校开放平台快速访问接口该接口提供快速接入玩校的功能：<br>
 * 	该包实现：
 * 	•	给第三方提供一个URL，对方只需将用户的学号和学校代码通过URL传过来即可： customerCode=?&outid=?
 * 	
 * 	基本需求要求：
 * 	•	如上通过customerCode和outid快速访问用户信息
 * 	•	对访问来源进行IP判断。学校只能访问该学校的学生信息，也就是一个IP只能访问申请这所在学校的用户信息；拒绝不再IP白名单中的IP访问用户信息
 * 	•	从玩校后台获取用户信息，判断该学生是否绑过卡，未绑卡则先帮卡。绑卡后用户无需登录验证和绑卡验证直接显示个人信息
 * 
 * 请求地址：
 * 		http://serverIP/quickaccess/v1/invoke
 * =======================================================================================
 * @Title: package-info.java
 * @Package net.newcapec.campus.quickaccess
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月8日 下午5:08:48
 * @version V1.0
 */
package net.newcapec.campus.quickaccess;
package net.newcapec.campus.h5.manager.impl;

import net.newcapec.campus.h5.dao.UserSchoolCardDataDao;
import net.newcapec.campus.h5.entity.UserSchoolCardData;
import net.newcapec.campus.h5.manager.UserSchoolCardDataManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;

import com.alibaba.fastjson.JSONObject;

public class UserSchoolCardDataManagerImpl extends
		BaseManagerImpl<UserSchoolCardData> implements
		UserSchoolCardDataManager {

	@Override
	public JSONObject findUserBigData(JSONObject pram) {
		UserSchoolCardDataDao userSchoolCardDataDao = (UserSchoolCardDataDao) this.dao;
		
		return userSchoolCardDataDao.findUserBigData(pram);
		
		
	}
}

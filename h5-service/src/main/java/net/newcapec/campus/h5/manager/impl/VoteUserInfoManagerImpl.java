package net.newcapec.campus.h5.manager.impl;

import java.util.Date;
import java.util.List;

import net.newcapec.campus.h5.dao.VoteClassDao;
import net.newcapec.campus.h5.dao.VoteSchoolDao;
import net.newcapec.campus.h5.entity.VoteClass;
import net.newcapec.campus.h5.entity.VoteSchool;
import net.newcapec.campus.h5.entity.VoteUserInfo;
import net.newcapec.campus.h5.manager.VoteUserInfoManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

import com.alibaba.fastjson.JSONObject;

public class VoteUserInfoManagerImpl extends BaseManagerImpl<VoteUserInfo>
		implements VoteUserInfoManager {

	private VoteClassDao voteClassDao;
	private VoteSchoolDao voteSchoolDao;

	public void setVoteClassDao(VoteClassDao voteClassDao) {
		this.voteClassDao = voteClassDao;
	}

	public void setVoteSchoolDao(VoteSchoolDao voteSchoolDao) {
		this.voteSchoolDao = voteSchoolDao;
	}

	@Override
	public JSONObject vote(String uuid, Long classId) {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		List<VoteUserInfo> voteUserInfoList = this.findByCondition(Conditions
				.eq("uuid", uuid));
		if (voteUserInfoList.isEmpty()) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "没有找到该用户的信息！");
			return result;
		}
		if (voteUserInfoList.get(0).isType()) {
			result.put("result_", false);
			result.put("code_", 77);
			result.put("message_", "每人仅可投一票，你已经投过啦");
			return result;
		}

		VoteClass voteClass = voteClassDao.get(classId);
		if (null == voteClass) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "没有找到班级！");
			return result;
		}
		try {
			String customerCode = voteClass.getCustomerCode();
			List<VoteSchool> voteSchoolList = voteSchoolDao
					.findByCondition(Conditions
							.eq("customerCode", customerCode));

			if (voteSchoolList.isEmpty()) {
				result.put("result_", false);
				result.put("code_", 88);
				result.put("message_", "数据问题");
				return result;
			} else {

				VoteUserInfo voteUserInfo = voteUserInfoList.get(0);
				voteUserInfo.setType(true);
				voteUserInfo.setVoteDate(new Date());
				voteUserInfo.setClassId(classId);
				this.update(voteUserInfo);
				voteClass.setPoll(voteClass.getPoll() + 1);
				voteClassDao.update(voteClass);
				VoteSchool voteSchool = voteSchoolList.get(0);
				voteSchool.setPoll(voteSchool.getPoll() + 1);
				voteSchoolDao.update(voteSchool);
				
				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功！");
				return result;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}

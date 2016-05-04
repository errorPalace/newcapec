package net.newcapec.campus.h5.manager;

import com.alibaba.fastjson.JSONObject;

import net.newcapec.campus.h5.entity.VoteUserInfo;
import net.newcapec.v3.extend.manager.BaseManager;

public interface VoteUserInfoManager extends BaseManager<VoteUserInfo> {
	JSONObject vote(String uuid, Long classId);

}

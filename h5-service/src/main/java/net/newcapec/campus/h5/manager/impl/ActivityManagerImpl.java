package net.newcapec.campus.h5.manager.impl;

import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.manager.ActivityManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ActivityManagerImpl extends BaseManagerImpl<Activity> implements
		ActivityManager {
	/**
	 * 获取未删除的所有活动
	 * @return
	 */
	public Map<Long,String> findAllMap(){
		List<Activity>list= this.findByCondition(Conditions.eq("enable", false));
		Map<Long,String> map=new HashMap<Long,String>();
		for (Activity entity:list){
			map.put(entity.getId(),entity.getName());
		}
		return map;
	}
}

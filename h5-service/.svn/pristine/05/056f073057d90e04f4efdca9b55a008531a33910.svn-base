package net.newcapec.campus.h5.manager.impl;

import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.campus.h5.manager.PrizeManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PrizeManagerImpl extends BaseManagerImpl<Prize> implements
		PrizeManager {
	/**
	 * 获取未删除的所有奖品
	 * @return
	 */
	public Map<Long,String> findAllMap(){
		List<Prize> list= this.findByCondition(Conditions.eq("enable", false));
		Map<Long,String> map=new HashMap<Long,String>();
		for (Prize entity:list){
			map.put(entity.getId(),entity.getName());
		}
		return map;
	}
}

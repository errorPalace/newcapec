package net.newcapec.campus.h5.manager.impl;

import net.newcapec.campus.h5.dao.ActivityPrizeCfgDao;
import net.newcapec.campus.h5.entity.ActivityPrizeCfg;
import net.newcapec.campus.h5.manager.ActivityPrizeCfgManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;

public class ActivityPrizeCfgManagerImpl extends BaseManagerImpl<ActivityPrizeCfg> implements
		ActivityPrizeCfgManager {
	/**
	 * 中奖数加1（原来的基础上+1）
	 */
	public void updateWinCount(Long activityId, Long prize){
		ActivityPrizeCfgDao prizeCfgDao= (ActivityPrizeCfgDao) this.dao;
		prizeCfgDao.updateWinCount(activityId,prize);
	}
}

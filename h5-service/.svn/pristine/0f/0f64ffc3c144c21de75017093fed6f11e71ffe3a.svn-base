package net.newcapec.campus.h5.dao.impl;

import net.newcapec.campus.h5.dao.ActivityPrizeCfgDao;
import net.newcapec.campus.h5.entity.ActivityPrizeCfg;
import net.newcapec.v3.extend.orm.hibernate.HibernateSequenceBaseDaoImpl;
import org.hibernate.SQLQuery;

public class ActivityPrizeCfgDaoImpl extends HibernateSequenceBaseDaoImpl<ActivityPrizeCfg>
		implements ActivityPrizeCfgDao {
	/**
	 * 中奖数加1（原来的基础上+1）
	 */
	public void updateWinCount(Long activityId, Long prize) {
		SQLQuery sqlQuery = this
				.getSessionFactory()
				.getCurrentSession()
				.createSQLQuery(
						"update ACTIVITY_PRIZE_SIZE_ t set t.WINCOUNT_=(t.WINCOUNT_+1)  where t.PRIZEID_=? and t.ACTIVITYID_=?");
		sqlQuery.setLong(0, prize);
		sqlQuery.setLong(1, activityId);
		sqlQuery.executeUpdate();
	}
}

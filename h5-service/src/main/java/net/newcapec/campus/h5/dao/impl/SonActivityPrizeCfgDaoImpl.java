package net.newcapec.campus.h5.dao.impl;

import net.newcapec.campus.h5.dao.SonActivityPrizeCfgDao;
import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.v3.extend.orm.hibernate.HibernateSequenceBaseDaoImpl;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.hibernate.SQLQuery;

import java.util.Date;

public class SonActivityPrizeCfgDaoImpl extends HibernateSequenceBaseDaoImpl<SonActivityPrizeCfg>
        implements SonActivityPrizeCfgDao {
    /**
     * 中奖数加1（原来的基础上+1）
     */
    public void updateWinCount(Long sonActivityId, Long prize) {
        SQLQuery sqlQuery = this
                .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(
                        "update SON_ACTIVITY_PRIZE_CFG_ t set t.IN_COUNT_=(t.IN_COUNT_+1)  where t.PRIZEID_=? and t.SON_ACTIVITY_ID=?");
        sqlQuery.setLong(0, prize);
        sqlQuery.setLong(1, sonActivityId);
        sqlQuery.executeUpdate();
    }

    /**
     * 中奖数加1（原来的基础上+1）
     */
    public void updateSurplusCount(Long activityId, Long sonActivityId, Long prize) {
        SQLQuery sqlQuery = this
                .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(
                        "update SON_ACTIVITY_PRIZE_CFG_ t set t.SURPLUS_COUNT_=(t.SURPLUS_COUNT_+1),t.ALLOTCOUNT_=(t.ALLOTCOUNT_+1)  where t.PRIZEID_=? and t.SON_ACTIVITY_ID=?");
        sqlQuery.setLong(0, prize);
        sqlQuery.setLong(1, sonActivityId);
        int count = sqlQuery.executeUpdate();
        if (count == 0) {
            SonActivityPrizeCfg entity = new SonActivityPrizeCfg();
            entity.setActivityId(activityId);
            entity.setAllotCount(1);
            entity.setSonActivityId(sonActivityId);
            entity.setPrizeId(prize);
            entity.setSurplusCount(1);
            entity.setCreateOperator("程序");
            entity.setCreateStamp(new Date());
            this.save(entity);
        }
    }

}

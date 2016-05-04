package net.newcapec.campus.h5.dao;

import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.v3.extend.orm.dao.BaseDao;

public interface SonActivityPrizeCfgDao extends BaseDao<SonActivityPrizeCfg> {
    /**
     * 中奖数加1（原来的基础上+1）
     */
    public void updateWinCount(Long sonActivityId, Long prize);
    /**
     * 上期叠加1（原来的基础上+1）
     */
    public void updateSurplusCount(Long activityId,Long sonActivityId, Long prize);
}

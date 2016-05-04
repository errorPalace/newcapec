package net.newcapec.campus.h5.manager;

import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.v3.extend.manager.BaseManager;

public interface SonActivityPrizeCfgManager extends BaseManager<SonActivityPrizeCfg> {
    /**
     * 保存派奖配置
     * @param sonActivityPrizeCfg
     * @return
     */
    public String saveEntity(SonActivityPrizeCfg sonActivityPrizeCfg);
    /**
     * 编辑派奖配置
     * @return
     */
    public String updateEntity(SonActivityPrizeCfg oldEntity,SonActivityPrizeCfg newEntity);
    /**
     * 删除
     *
     * @return
     */
    public String updateDelete(SonActivityPrizeCfg entity);
    /**
     * 中奖数加1（原来的基础上+1）
     */
    public void updateWinCount(Long sonActivityId, Long prize);
    /**
     * 上期叠加1（原来的基础上+1）
     */
    public void updateSurplusCount(Long activityId,Long sonActivityId, Long prize);
}

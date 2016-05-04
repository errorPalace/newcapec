package net.newcapec.campus.h5.manager.impl;

import net.newcapec.campus.h5.dao.SonActivityPrizeCfgDao;
import net.newcapec.campus.h5.entity.ActivityPrizeCfg;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.campus.h5.manager.ActivityPrizeCfgManager;
import net.newcapec.campus.h5.manager.SonActivityManager;
import net.newcapec.campus.h5.manager.SonActivityPrizeCfgManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

import java.util.List;

public class SonActivityPrizeCfgManagerImpl extends BaseManagerImpl<SonActivityPrizeCfg> implements
        SonActivityPrizeCfgManager {
    private ActivityPrizeCfgManager activityPrizeCfgManager;
    private SonActivityManager sonActivityManager;

    /**
     * 保存派奖配置
     *
     * @param sonActivityPrizeCfg
     * @return
     */
    public String saveEntity(SonActivityPrizeCfg sonActivityPrizeCfg) {
        String result = "success";
        SonActivity sonActivity = sonActivityManager.get(sonActivityPrizeCfg.getSonActivityId());
        if (sonActivity != null) {
            sonActivityPrizeCfg.setActivityId(sonActivity.getActivityId());
        }
        List<ActivityPrizeCfg> activityPrizeCfgList = activityPrizeCfgManager.findByCondition(Conditions.eq("activityId", sonActivityPrizeCfg.getActivityId()), Conditions.eq("prizeId", sonActivityPrizeCfg.getPrizeId()), Conditions.eq("enable", false));
        if (activityPrizeCfgList == null || activityPrizeCfgList.isEmpty()) {
            result = "ajax:失败：该奖品不在预备奖品中！";
            return result;
        }
        ActivityPrizeCfg activityPrizeCfg = activityPrizeCfgList.get(0);
        if (sonActivityPrizeCfg.getAllotCount() > (activityPrizeCfg.getCount() - activityPrizeCfg.getAllotCount())) {
            result = "ajax:失败：预计分配数量大于预备奖品数量！";
            return result;
        }
        SonActivityPrizeCfg entity = super.save(sonActivityPrizeCfg);
        if (entity != null) {
            activityPrizeCfg.setAllotCount(activityPrizeCfg.getAllotCount() + entity.getAllotCount());
            activityPrizeCfgManager.update(activityPrizeCfg);
            return result;
        } else {
            result = "ajax:失败：增加失败！";
            return result;
        }
    }

    /**
     * 编辑派奖配置
     *
     * @return
     */
    public String updateEntity(SonActivityPrizeCfg oldEntity, SonActivityPrizeCfg newEntity) {
        String result = "success";
        if (newEntity.getAllotCount() < oldEntity.getInCount()) {
            result = "ajax:预计发奖数量不能小于中奖数量！";
            return result;
        }
        SonActivity sonActivity = sonActivityManager.get(oldEntity.getSonActivityId());
        if (sonActivity != null) {
            oldEntity.setActivityId(sonActivity.getActivityId());
        }
        List<ActivityPrizeCfg> activityPrizeCfgList = activityPrizeCfgManager.findByCondition(Conditions.eq("activityId", oldEntity.getActivityId()), Conditions.eq("prizeId", oldEntity.getPrizeId()), Conditions.eq("enable", false));
        if (activityPrizeCfgList == null || activityPrizeCfgList.isEmpty()) {
            result = "ajax:失败：该奖品不在预备奖品中！";
            return result;
        }
        ActivityPrizeCfg activityPrizeCfg = activityPrizeCfgList.get(0);
        if (oldEntity.getAllotCount() > newEntity.getAllotCount()) {//减少发奖数量
            activityPrizeCfg.setAllotCount(activityPrizeCfg.getAllotCount() - (oldEntity.getAllotCount() - newEntity.getAllotCount()));
        } else if (oldEntity.getAllotCount() < newEntity.getAllotCount()) {
            int count = newEntity.getAllotCount() - oldEntity.getAllotCount();
            if (count > (activityPrizeCfg.getCount() - activityPrizeCfg.getAllotCount())) {
                result = "ajax:失败：预计分配数量大于预备奖品数量！";
                return result;
            }
            activityPrizeCfg.setAllotCount(activityPrizeCfg.getAllotCount() + count);
        }
        oldEntity.setAllotCount(newEntity.getAllotCount());
        SonActivityPrizeCfg entity = super.update(oldEntity);
        if (entity != null) {
            activityPrizeCfgManager.update(activityPrizeCfg);
            return result;
        } else {
            result = "ajax:失败：增加失败！";
            return result;
        }
    }

    /**
     * 删除
     *
     * @return
     */
    public String updateDelete(SonActivityPrizeCfg entity) {
        String result = null;
        if (entity.getInCount() > 0) {
            result = "ajax:已经存在中奖，不能删除！";
            return result;
        }
        List<ActivityPrizeCfg> activityPrizeCfgList = activityPrizeCfgManager.findByCondition(Conditions.eq("activityId", entity.getActivityId()), Conditions.eq("prizeId", entity.getPrizeId()), Conditions.eq("enable", false));
        if (activityPrizeCfgList == null || activityPrizeCfgList.isEmpty()) {
            result = "ajax:失败：该奖品不在预备奖品中！";
            return result;
        }
        ActivityPrizeCfg activityPrizeCfg = activityPrizeCfgList.get(0);
        entity.setEnable(true);
        entity = super.update(entity);
        if (entity != null) {
            activityPrizeCfg.setAllotCount(activityPrizeCfg.getAllotCount() - entity.getAllotCount());
            activityPrizeCfgManager.update(activityPrizeCfg);
            return result;
        } else {
            result = "ajax:失败：删除失败！";
            return result;
        }
    }
    /**
     * 中奖数加1（原来的基础上+1）
     */
    public void updateWinCount(Long sonActivityId, Long prize){
        SonActivityPrizeCfgDao prizeCfgDao= (SonActivityPrizeCfgDao) this.dao;
        prizeCfgDao.updateWinCount(sonActivityId,prize);
    }
    /**
     * 中奖数加1（原来的基础上+1）
     */
    public void updateSurplusCount(Long activityId,Long sonActivityId, Long prize){
        SonActivityPrizeCfgDao prizeCfgDao= (SonActivityPrizeCfgDao) this.dao;
        prizeCfgDao.updateSurplusCount( activityId,sonActivityId,prize);
    }
    public SonActivityManager getSonActivityManager() {
        return sonActivityManager;
    }

    public void setSonActivityManager(SonActivityManager sonActivityManager) {
        this.sonActivityManager = sonActivityManager;
    }

    public ActivityPrizeCfgManager getActivityPrizeCfgManager() {
        return activityPrizeCfgManager;
    }

    public void setActivityPrizeCfgManager(ActivityPrizeCfgManager activityPrizeCfgManager) {
        this.activityPrizeCfgManager = activityPrizeCfgManager;
    }
}

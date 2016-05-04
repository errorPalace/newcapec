package net.newcapec.campus.h5.manager.impl;

import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.manager.SonActivityManager;
import net.newcapec.campus.h5.manager.redis.RedisDrawManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SonActivityManagerImpl extends BaseManagerImpl<SonActivity> implements
        SonActivityManager {
    private RedisDrawManager redisDrawManager;

    /**
     * 获取未删除的所有举办活动
     *
     * @return
     */
    public Map<Long, String> findAllMap() {
        List<SonActivity> list = this.findByCondition(Conditions.eq("enable", false));
        Map<Long, String> map = new HashMap<Long, String>();
        for (SonActivity entity : list) {
            map.put(entity.getId(), entity.getName());
        }
        return map;
    }

    @Override
    public SonActivity save(SonActivity entity) {

        entity = super.save(entity);
        if (entity != null) {
            redisDrawManager.addSonActivity(entity);
        }
        return entity;
    }

    @Override
    public SonActivity update(SonActivity entity) {
        entity=  super.update(entity);
        if (entity != null) {
            redisDrawManager.addSonActivity(entity);
        }
        return entity;
    }
    public RedisDrawManager getRedisDrawManager() {
        return redisDrawManager;
    }

    public void setRedisDrawManager(RedisDrawManager redisDrawManager) {
        this.redisDrawManager = redisDrawManager;
    }
}

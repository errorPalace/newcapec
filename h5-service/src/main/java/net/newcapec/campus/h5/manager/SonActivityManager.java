package net.newcapec.campus.h5.manager;

import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.v3.extend.manager.BaseManager;

import java.util.Map;

public interface SonActivityManager extends BaseManager<SonActivity> {
    /**
     * 获取未删除的所有举办活动
     * @return
     */
    public Map<Long,String> findAllMap();
}

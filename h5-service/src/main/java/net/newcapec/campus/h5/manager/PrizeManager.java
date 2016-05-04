package net.newcapec.campus.h5.manager;

import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.v3.extend.manager.BaseManager;

import java.util.Map;

public interface PrizeManager extends BaseManager<Prize> {
    /**
     * 获取未删除的所有奖品
     * @return
     */
    public Map<Long,String> findAllMap();
}

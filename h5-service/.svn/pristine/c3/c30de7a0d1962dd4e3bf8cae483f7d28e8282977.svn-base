package net.newcapec.campus.h5.manager.redis;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.SonActivity;

/**
 * 抽奖系统缓存
 *
 * @author wa
 */
public interface RedisDrawManager extends BaseRedis {
    /**
     * 获取抽奖次数
     *
     * @return
     */
    public Long getTakeCount(Long sonActivityId, Long userId);
    /**
     * //添加子活动对象
     *
     * @return
     */
    public void addSonActivity(SonActivity sonActivity);
    /**
     * 初始化
     */
    public void intiPool(Long activityId, Long sonActivityId, JSONArray array,int expire);
    /**
     * 抽奖
     * 返回 0 为中奖 非0中奖
     * @return
     */
    public JSONObject drawPool(Long sonActivityId, Long userId, String userName, String mobile);
}

package net.newcapec.campus.h5.manager.redis.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.entity.ActivityLog;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.manager.ActivityLogManager;
import net.newcapec.campus.h5.manager.ActivityPrizeCfgManager;
import net.newcapec.campus.h5.manager.SonActivityManager;
import net.newcapec.campus.h5.manager.SonActivityPrizeCfgManager;
import net.newcapec.campus.h5.manager.redis.RedisDrawManager;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

import java.util.Date;
import java.util.Random;
import java.util.Set;

public class RedisDrawManagerImpl extends BaseRedisImpl implements
        RedisDrawManager {
    private transient Logger logger = LoggerFactory.getLogger(this.getClass());
    private SonActivityManager sonActivityManager;
    private ActivityLogManager activityLogManager;
    private ActivityPrizeCfgManager activityPrizeCfgManager;
    private SonActivityPrizeCfgManager sonActivityPrizeCfgManager;
    private Random random = new Random();
    /**
     * 举办活动每个人的抽奖次数
     * Darw:Count:+举办活动Id+UserId
     */
    public static final String DARWCOUNT = "Darw:Count:";
    /**
     * 举办活动每个人的中奖次数
     * Darw:SonWinCount:+举办活动Id+UserId
     */
    public static final String DARWWINCOUNT = "Darw:SonWinCount:";
    /**
     * 活动每个人的中奖次数
     * Darw:WinCount:+活动Id+UserId
     */
    public static final String DarwWinCount = "Darw:WinCount:";
    /**
     * 活动对象
     * Darw:Activity:+活动Id
     */
    public static final String DARWACTIVITY = "Darw:Activity:";
    /**
     * 举办活动对象
     * Darw:SonActivity:+举办活动Id
     */
    public static final String DARWSONACTIVITY = "Darw:SonActivity:";

    /**
     * 奖池
     * Darw:Pool:+活动Id
     */
    public static final String DARWPOOL_SORTEDSET = "Darw:Pool:";

    /**
     * 活动对象key
     *
     * @return
     */
    private String activityKey(Long activityId) {
        return DARWACTIVITY + activityId;
    }

    /**
     * 子活动对象key
     *
     * @return
     */
    private String sonActivityKey(Long sonActivityId) {
        return DARWSONACTIVITY + sonActivityId;
    }

    /**
     * 举办活动每个人的抽奖次数
     *
     * @return
     */
    private String darwCountKey(Long soaActivityId, Long userId) {
        return DARWCOUNT + soaActivityId + ":" + userId;
    }


    /**
     * 奖池key
     *
     * @return
     */
    private String getPoolkey(Long activityId) {
        return DARWPOOL_SORTEDSET + activityId;
    }

    public void setActivity(Activity entity) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                String key = activityKey(entity.getId());
                jedis.set(key, JSONObject.toJSONString(entity));
                int expire = (int) ((entity.getEndStamp().getTime() - entity.getStartStamp().getTime()) / 1000);
                jedis.expire(key, expire);
            }
        } catch (Exception e) {
            logger.error(null, e);
        }
    }

    /**
     * 初始化
     */
    public void intiPool(Long activityId, Long sonActivityId, JSONArray array, int expire) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                String key = getPoolkey(activityId);
                if (jedis.exists(key)) {
                    jedis.zremrangeByScore(key, -2, 0);
                    if (jedis.zcard(key) > 0) {
                        Set<String> set = jedis.zrange(key, 0, -1);
                        for (String str : set) {
                            Long prizeId = jedis.zscore(key, str).longValue();
                            if (prizeId > 0) {
                                sonActivityPrizeCfgManager.updateSurplusCount(activityId, sonActivityId, prizeId);
                            }
                        }
                    }
                }
                for (Object obj : array) {
                    JSONObject object = JSONObject.parseObject(obj.toString());
                    jedis.zadd(key, object.getDouble("prizeId"), object.getString("code"));
                }
                jedis.expire(key, expire);
            }
        } catch (Exception e) {
            logger.error(null, e);
        }
    }


    /**
     * //添加子活动对象
     *
     * @return
     */
    public void addSonActivity(SonActivity sonActivity) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                String sonActivityKey = sonActivityKey(sonActivity.getId());
                jedis.set(sonActivityKey, JSONObject.toJSONString(sonActivity));
                Long seconds = (sonActivity.getEndStamp().getTime() - System.currentTimeMillis()) / 1000;
                jedis.expire(sonActivityKey, seconds.intValue() + 300);
            }
        } catch (Exception e) {
            logger.error(null, e);
        }
    }

    /**
     * //获取子活动对象
     *
     * @param sonActivityId
     * @param jedis
     * @return
     */
    private SonActivity getSonActivity(Long sonActivityId, Jedis jedis) {
        SonActivity sonActivity = null;
        String sonActivityKey = sonActivityKey(sonActivityId);
        String sonActivityStr = jedis.get(sonActivityKey);
        if (StringUtils.isNotBlank(sonActivityStr)) {
            sonActivity = JSONObject.parseObject(sonActivityStr, SonActivity.class);
        } else {
            sonActivity = sonActivityManager.get(sonActivityId);
            jedis.set(sonActivityKey, JSONObject.toJSONString(sonActivity));
            Long seconds = (sonActivity.getEndStamp().getTime() - System.currentTimeMillis()) / 1000;
            jedis.expire(sonActivityKey, seconds.intValue() + 300);
        }
        return sonActivity;
    }

    /**
     * 获取抽奖次数
     *
     * @return
     */
    public Long getTakeCount(Long sonActivityId, Long userId) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                //子活动抽奖次数
                String darwCountKey = darwCountKey(sonActivityId, userId);
                String darwCount = jedis.get(darwCountKey);
                return Long.parseLong(darwCount);
            } else {
                return 0L;
            }
        } catch (Exception e) {
            logger.error(null, e);
            return 0L;
        }
    }

    /**
     * 抽奖
     * 返回 0 为中奖 非0中奖
     *
     * @return
     */
    public JSONObject drawPool(Long sonActivityId, Long userId, String userName, String mobile) {
        JSONObject result = new JSONObject();
        result.put("prizeId", 0L);
        result.put("mess", "很遗憾，你未中奖！");
        result.put("messCode", 1);
        result.put("takeCount", 0);
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                //获取子活动对象
                SonActivity sonActivity = getSonActivity(sonActivityId, jedis);
                Long nowTime = System.currentTimeMillis();
                if (sonActivity == null || sonActivity.isEnable()) {
                    result.put("prizeId", 0L);
                    result.put("mess", "活动不存在");
                    result.put("takeCount", 0);
                    result.put("messCode", 2);
                    return result;
                }
                if (sonActivity.getStartStamp().getTime() > nowTime || nowTime > sonActivity.getEndStamp().getTime()) {
                    result.put("prizeId", 0L);
                    result.put("mess", "活动时间为：" + DateFormatUtils.format(
                            sonActivity.getStartStamp(), "yyyy-MM-dd HH:mm:ss") + "到" + DateFormatUtils.format(
                            sonActivity.getEndStamp(), "yyyy-MM-dd HH:mm:ss"));
                    result.put("takeCount", sonActivity.getTakeCount());
                    result.put("messCode", 3);
                    return result;
                }
                if (sonActivity.getTakeCount() > -1) {
                    //子活动抽奖次数
                    String darwCountKey = darwCountKey(sonActivityId, userId);
                    Long darwCount = jedis.incr(darwCountKey);
                    Long seconds = (sonActivity.getEndStamp().getTime() - System.currentTimeMillis()) / 1000;
                    jedis.expire(darwCountKey, seconds.intValue() + 300);
                    Long takeCount = (sonActivity.getTakeCount() - darwCount);
                    takeCount = takeCount < 0 ? 0 : takeCount;
                    if (darwCount > sonActivity.getTakeCount()) {
                        result.put("prizeId", 0L);
                        result.put("mess", "抽奖次数不能超过" + sonActivity.getTakeCount() + "次");
                        result.put("takeCount", takeCount);
                        return result;
                    } else {
                        result.put("takeCount", takeCount);
                    }

                } else {
                    result.put("takeCount", -1);
                }
                ActivityLog log = new ActivityLog();
                log.setActivityId(sonActivity.getActivityId());
                log.setCreateStamp(new Date());
                log.setMobile(mobile);
                log.setSonActivityId(sonActivityId);
                log.setUserId(userId);
                log.setUserName(userName);
                String key = getPoolkey(sonActivity.getActivityId());
                Long count = jedis.zcard(key);
                if (count > 0) {
                    int index = random.nextInt(count.intValue());
                    Set<String> set = jedis.zrange(key, index, index);
                    if (set == null || set.isEmpty()) {//并发时index大于奖池大小重试一次
                        index = random.nextInt(count.intValue());
                        set = jedis.zrange(key, index, index);
                    }
                    String code = null;
                    for (String str : set) {
                        code = str;
                        break;
                    }
                    if (code != null) {
                        Long prizeId = jedis.zscore(key, code).longValue();
                        Long deleteResult = jedis.zrem(key, code);
                        if (deleteResult > 0) {
                            log.setDrawCode(code);
                            if (!prizeId.equals(-1L)) {
                                log.setPrizeId(prizeId);
                                result.put("prizeId", prizeId);
                                result.put("mess", "恭喜你中奖了！");
                                result.put("messCode", 0);
                                activityPrizeCfgManager.updateWinCount(sonActivity.getActivityId(), prizeId);
                                sonActivityPrizeCfgManager.updateWinCount(sonActivityId, prizeId);
                            }
                        }
                    }
                }
                activityLogManager.save(log);
            }
            return result;
        } catch (Exception e) {
            logger.error(null, e);
            return result;
        }

    }

    public void setSonActivityManager(SonActivityManager sonActivityManager) {
        this.sonActivityManager = sonActivityManager;
    }

    public void setActivityLogManager(ActivityLogManager activityLogManager) {
        this.activityLogManager = activityLogManager;
    }

    public void setActivityPrizeCfgManager(ActivityPrizeCfgManager activityPrizeCfgManager) {
        this.activityPrizeCfgManager = activityPrizeCfgManager;
    }

    public void setSonActivityPrizeCfgManager(SonActivityPrizeCfgManager sonActivityPrizeCfgManager) {
        this.sonActivityPrizeCfgManager = sonActivityPrizeCfgManager;
    }
}

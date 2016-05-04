package net.newcapec.campus.h5.manager.redis.impl;

import net.newcapec.campus.h5.manager.redis.BaseRedis;
import net.newcapec.campus.h5.util.JedisPoolUtils;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class BaseRedisImpl implements BaseRedis {
    protected static final transient Logger logger = LoggerFactory
            .getLogger(BaseRedisImpl.class);
    private JedisPoolUtils jedisPoolUtils;
    protected PreferenceUtils preferenceUtils;
    private Jedis jedis = null;

    public Jedis getJedis() {
        try {
            if (isOpen()) {
                JedisPool pool = jedisPoolUtils.getPool();
                StringBuilder sb = new StringBuilder();
                sb.append("++++++++++++开始++++++++++++++++++++\n");
                sb.append("+++++++++++++++getNumActive++++++++++:"
                        + pool.getNumActive() + "\n");
                sb.append("+++++++++++++++getNumIdle++++++++++:"
                        + pool.getNumIdle() + "\n");
                sb.append("+++++++++++++++getNumWaiters++++++++++:"
                        + pool.getNumWaiters());
                logger.debug(sb.toString());
                return pool.getResource();
            } else {
                return null;
            }
        } catch (Exception e) {
            logger.error("获取redis连接出错", e);
            return null;
        }
    }

    public Boolean isOpen() {
        return preferenceUtils.getRedisIsOpen();
    }

    /**
     * 根据key获取实体信息
     *
     * @param key
     * @return
     */
    public String get(String key) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                return jedis.get(key);
            } else {
                return null;
            }
        } catch (Exception e) {
            logger.error(null, e);
            return null;
        }
    }

    @Override
    public void set(String key, String value, int expire) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                jedis.set(key, value);
                jedis.expire(key, expire);
            }
        } catch (Exception e) {
            logger.error(null, e);
        }
    }

    @Override
    public Long incr(String key) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                return jedis.incr(key);
            } else {
                return null;
            }
        } catch (Exception e) {
            logger.error(null, e);
            return null;
        }
    }

    /**
     * 根据key删除实体信息
     *
     * @param key
     * @return
     */
    public Long delete(String key) {
        try (Jedis jedis = getJedis()) {
            if (jedis != null) {
                return jedis.del(key);
            } else {
                return null;
            }
        } catch (Exception e) {
            logger.error(null, e);
            return null;
        }
    }


    public void setJedisPoolUtils(JedisPoolUtils jedisPoolUtils) {
        this.jedisPoolUtils = jedisPoolUtils;
    }

    public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
        this.preferenceUtils = preferenceUtils;
    }
}

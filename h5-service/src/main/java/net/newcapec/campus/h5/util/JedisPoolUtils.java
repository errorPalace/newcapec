package net.newcapec.campus.h5.util;


import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.core.context.V3InitializingBean;
import org.apache.commons.lang.StringUtils;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisPoolUtils implements V3InitializingBean {

    private JedisPool pool;

    public JedisPool getPool() {
        return pool;
    }

    private PreferenceUtils preferenceUtils;


    /**
     * 建立连接池 真实环境，一般把配置参数缺抽取出来。
     */
    private void createJedisPool() {

        // 建立连接池配置参数
        JedisPoolConfig config = new JedisPoolConfig();

        // 设置最大连接数
        config.setMaxTotal(preferenceUtils.getRedisMaxTotal());

        // 设置最大阻塞时间，记住是毫秒数milliseconds
        config.setMaxWaitMillis(preferenceUtils.getRedisMaxWaitMillis());


        // 设置空间连接
        config.setMaxIdle(preferenceUtils.getRedisMaxIdle());

        // 创建连接池
        //如果密码不为空，使用密码创建连接池
        if (StringUtils.isNotBlank(preferenceUtils.getRedisPASSWORD())) {
            pool = new JedisPool(config, preferenceUtils.getRedisIP(), preferenceUtils.getRedisPORT(), preferenceUtils.getRedisMaxWaitMillis(), preferenceUtils.getRedisPASSWORD());
        } else {
            pool = new JedisPool(config, preferenceUtils.getRedisIP(), preferenceUtils.getRedisPORT());
        }

    }

    /**
     * 在多线程环境同步初始化
     */
    private synchronized void poolInit() {
        if (pool == null)
            createJedisPool();
    }

    /**
     * 获取一个jedis 对象
     *
     * @return
     */
    public Jedis getJedis() {

        if (pool == null)
            poolInit();
        return pool.getResource();
    }

    /**
     * 归还一个连接
     *
     * @param jedis
     */
    public void returnRes(Jedis jedis) {
        pool.returnResourceObject(jedis);
    }

    public PreferenceUtils getPreferenceUtils() {
        return preferenceUtils;
    }

    public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
        this.preferenceUtils = preferenceUtils;
    }

    @Override
    public void afterLoaderV3Context() throws Exception {

        this.poolInit();

    }

}
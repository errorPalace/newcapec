package net.newcapec.campus.h5.manager.redis;

import redis.clients.jedis.Jedis;

public interface BaseRedis {
	public Jedis getJedis();

	public Boolean isOpen();

	/**
	 * 根据key获取实体信息
	 * 
	 * @param key
	 * @return
	 */
	public String get(String key);

	/**
	 * 添加key实体信息
	 *
	 * @param key
	 * @return
	 */
	public void set(String key,String value,int expire);
	/**
	 * 计数器 +1
	 *
	 * @param key
	 * @return
	 */
	public Long incr(String key);
	/**
	 * 根据key删除实体信息
	 * 
	 * @param key
	 * @return
	 */
	public Long delete(String key);

}

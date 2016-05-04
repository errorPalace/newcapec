/**
 * 
 */
package net.newcapec.campus.h5.manager;

import net.newcapec.campus.h5.entity.News;
import net.newcapec.v3.extend.manager.BaseManager;
import net.newcapec.v3.extend.orm.Pagination;

/**
 */
public interface NewsManager extends BaseManager<News> {

	void deleteNews(long[] newsIds);

	/**
	 * HQL 查询新闻分页（不查询content这个列）
	 * 
	 * @param beginIndex
	 * @param pageSize
	 * @param customerId
	 * @param type
	 * @return
	 */
	public Pagination<News> findNews(Integer beginIndex, Integer pageSize,
			long customerId, Integer type);

	/**
	 * HQL 查询新闻分页（不查询content这个列）
	 * 
	 * @param beginIndex
	 * @param pageSize
	 * @param customerId
	 * @param type
	 * @return
	 */
	public Pagination<News> findNews(Integer beginIndex, Integer pageSize,
			long customerId, Integer type, String flag);

	/**
	 * 获取content中的图片
	 * 
	 * @param content
	 * @return
	 */
	public String patternContentImages(String content);
}

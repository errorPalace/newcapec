/**
 * 
 */
package net.newcapec.campus.h5.dao;


import net.newcapec.campus.h5.entity.News;
import net.newcapec.v3.extend.orm.Pagination;
import net.newcapec.v3.extend.orm.dao.BaseDao;

/**
 */
public interface NewsDao extends BaseDao<News> {
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

	public Pagination<News> findNews(Integer beginIndex, Integer pageSize,
			long customerId, Integer type, String flag);
}

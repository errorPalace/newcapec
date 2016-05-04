/**
 * 
 */
package net.newcapec.campus.h5.dao.impl;

import java.util.ArrayList;
import java.util.List;

import net.newcapec.campus.h5.dao.NewsDao;
import net.newcapec.campus.h5.entity.News;
import net.newcapec.v3.extend.orm.Pagination;
import net.newcapec.v3.extend.orm.SimplePagination;
import net.newcapec.v3.extend.orm.hibernate.HibernateBaseDaoImpl;

import org.hibernate.Query;
import org.hibernate.Session;

/**
 */
public class NewsDaoImpl extends HibernateBaseDaoImpl<News> implements NewsDao {
	@SuppressWarnings("unchecked")
	public Pagination<News> findNews(Integer beginIndex, Integer pageSize,
			long customerId, Integer type) {
		SimplePagination<News> p = null;
		Session session = this.getSessionFactory().getCurrentSession();
		List<News> list = new ArrayList<News>();
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("  from News t where 1=1 ");
			if (News.NEWS_TYPE_NEWS_NOTICE == type) {
				sb.append(" and (t.type=" + News.NEWS_TYPE_NEWS + " or t.type="
						+ News.NEWS_TYPE_NOTICE + ") ");
			} else {
				sb.append(" and t.type=" + type + " ");
			}
			sb.append(" and t.customerId=" + customerId + " ");
			sb.append(" and t.enabled= 1 ");
			sb.append(" order by t.createTime desc ");
			Query queryCount = session.createQuery("select count(*) "
					+ sb.toString());
			Long totalCount = (Long) queryCount.uniqueResult();
			p = new SimplePagination<News>(0, pageSize, totalCount.intValue());
			Query query = session
					.createQuery("select new News(t.id, t.title,t.summary, t.createTime,t.creator,t.customerId,t.enabled,t.icon,t.contentImages,t.type) "
							+ sb.toString());
			query.setFirstResult(beginIndex);
			query.setMaxResults(pageSize);
			list = (List<News>) query.list();
			p.setResults(list);
		} catch (Exception e) {
			logger.error(null, e);
		}
		return p;
	}

	@Override
	public Pagination<News> findNews(Integer beginIndex, Integer pageSize,
			long customerId, Integer type, String flag) {

		SimplePagination<News> p = null;
		Session session = this.getSessionFactory().getCurrentSession();
		List<News> list = new ArrayList<News>();
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("  from News t where 1=1 ");
			if (News.NEWS_TYPE_NEWS_NOTICE == type) {
				sb.append(" and (t.type=" + News.NEWS_TYPE_NEWS + " or t.type="
						+ News.NEWS_TYPE_NOTICE + ") ");
			} else {
				sb.append(" and t.type=" + type + " ");
			}
			sb.append(" and t.customerId=" + customerId + " ");
			sb.append(" and t.flag=" + flag + " ");
			sb.append(" and t.enabled= 1 ");
			sb.append(" order by t.createTime desc ");
			Query queryCount = session.createQuery("select count(*) "
					+ sb.toString());
			Long totalCount = (Long) queryCount.uniqueResult();
			p = new SimplePagination<News>(0, pageSize, totalCount.intValue());
			Query query = session
					.createQuery("select new News(t.id, t.title,t.summary, t.createTime,t.creator,t.customerId,t.enabled,t.icon,t.contentImages,t.type) "
							+ sb.toString());
			query.setFirstResult(beginIndex);
			query.setMaxResults(pageSize);
			list = (List<News>) query.list();
			p.setResults(list);
		} catch (Exception e) {
			logger.error(null, e);
		}
		return p;

	}
}

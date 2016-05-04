/**
 * 
 */
package net.newcapec.campus.h5.manager.impl;

import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.newcapec.campus.h5.dao.NewsDao;
import net.newcapec.campus.h5.entity.News;
import net.newcapec.campus.h5.manager.NewsManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.Pagination;

import com.alibaba.fastjson.JSONArray;

/**
 */
public class NewsManagerImpl extends BaseManagerImpl<News> implements
		NewsManager {

	@Override
	public void deleteNews(long[] newsIds) {
		for (Serializable id : newsIds) {
			News t = get(id);
			t.setEnabled(false);
			update(t);
		}
	}

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
			long customerId, Integer type) {
		NewsDao newsDao = (NewsDao) this.dao;
		return newsDao.findNews(beginIndex, pageSize, customerId, type);
	}

	@Override
	public Pagination<News> findNews(Integer beginIndex, Integer pageSize,
			long customerId, Integer type, String flag) {
		NewsDao newsDao = (NewsDao) this.dao;
		return newsDao.findNews(beginIndex, pageSize, customerId, type, flag);
	}

	/**
	 * 获取content中的图片
	 * 
	 * @param content
	 * @return
	 */
	public String patternContentImages(String content) {
		Pattern pattern = Pattern.compile("<img [^>]*src=['\"]([^'\"]+)[^>]*>");
		// 内容中的图片
		Matcher matcher = pattern.matcher(content);
		JSONArray array = new JSONArray();
		if (matcher.find()) {
			array.add(matcher.group(1));
		}
		return array.toJSONString();
	}

}

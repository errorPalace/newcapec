/**
 * 
 */
package net.newcapec.campus.h5.action;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import net.newcapec.campus.h5.entity.News;
import net.newcapec.campus.h5.manager.NewsManager;
import net.newcapec.campus.h5.util.EdenTimeHelper;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.core.web.action.BaseAction;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.Pagination;
import net.newcapec.v3.extend.orm.condition.Conditions;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * @author 景明超
 * @version SchoolInfoAction.java 2014-6-12 上午9:51:59
 */
public class SchoolInfoAction extends BaseAction {

	private PreferenceUtils preferenceUtils;

	/**
	 * 
	 */
	private static final long serialVersionUID = -1188858850333547984L;
	private NewsManager newsManager;

	public String info() {
		String id = getParameter("id");
		News news = null;
		if (StringUtils.isNotBlank(id)) {
			news = newsManager.get(Long.parseLong(id));
		} else {
			long customerId = getLongParameter("customerId");
			int type = getIntParameter("type");
			Collection<Condition> conditions = new java.util.ArrayList<Condition>();
			conditions.add(Conditions.eq("type", type));
			conditions.add(Conditions.eq("customerId", customerId));
			conditions.add(Conditions.eq("enabled", true));
			conditions.add(Conditions.desc("createTime"));
			List<News> list = newsManager.findByCondition(conditions
					.toArray(new Condition[conditions.size()]));
			if (list.size() > 0) {
				news = list.get(0);
			}
		}
		if (news == null) {
			return "noinfo";
		}
		setAttribute("data", news);

		// this.getResponse().addDateHeader("expires",
		// System.currentTimeMillis()*2);
		// this.getResponse().addHeader("Cache-Control", "max-age=720000");

		if (news.getType() == News.NEWS_TYPE_SCHOOLINFO) {
			return "schoolinfo";
		} else if (news.getType() == News.NEWS_TYPE_NEWS) {
			return "newsinfo";
		} else if (news.getType() == News.NEWS_TYPE_NOTICE) {
			return "noticeinfo";
		} else if (news.getType() == News.NEWS_TYPE_TOSCHOOL) {
			return "toschoolinfo";
		} else if (news.getType() == News.NEWS_TYPE_PROBLEMS) {
			return "probleminfo";
		} else if (news.getType() == News.NEWS_TYPE_FLOOR) {
			return "floorinfo";
		} else if (news.getType() == News.NEWS_TYPE_MAP) {
			return "mapinfo";
		} else if (news.getType() == News.NEWS_TYPE_WELCOME) {
			return "welcomeinfo";
		} else if (news.getType() == News.NEWS_TYPE_IMBURSE) {
			return "imburseinfo";
		} else if (news.getType() == News.NEWS_TYPE_DIGEST) {
			return "digestinfo";
		} else if (news.getType() == News.NEWS_TYPE_NEWS_NOTICE) {
			return "newsinfo";
		}
		return SUCCESS;
	}

	public void load() throws IOException {
		int pageSize = getIntParameter("pageSize");
		int currPage = getIntParameter("currPage");
		int type = getIntParameter("type");
		long customerId = getLongParameter("customerId");

		int summarySubLength = preferenceUtils.getNewsSummarySub();
		int titleSubLength = preferenceUtils.getNewsTitleSub();

		int beginIndex = (currPage - 1) * pageSize;

		Pagination<News> pagination = newsManager.findNews(beginIndex,
				pageSize, customerId, type);
		JSONObject jsonObject = (JSONObject) JSONObject.toJSON(pagination);
		JSONArray jsonArray = jsonObject.getJSONArray("results");

		JSONArray jsonArrayNew = new JSONArray();

		for (Object object : jsonArray) {
			JSONObject news = (JSONObject) object;

			// 标题
			String title = news.getString("title");
			title = title.length() > titleSubLength ? title.substring(0,
					titleSubLength) + "..." : title;
			news.put("title", title);

			// 概略
			String summary = news.getString("summary");
			if (summary != null) {
				summary = summary.length() > summarySubLength ? summary
						.substring(0, summarySubLength) + "...".toString()
						: summary;
			} else {
				summary = "";
			}
			news.put("summary", summary);

			// 第一个图片
			String contentImages = news.getString("contentImages");
			if (StringUtils.isNotBlank(contentImages)) {
				JSONArray array = JSONArray.parseArray(contentImages);
				if (array.size() > 0) {
					news.put("firstImgUrl", array.get(0));
				} else {
					news.put("firstImgUrl", "");
				}
			} else {
				News entity = newsManager.get(news.getLong("id"));
				String content = entity.getContent();
				contentImages = newsManager.patternContentImages(content);
				JSONArray array = JSONArray.parseArray(contentImages);
				entity.setContentImages(contentImages);
				newsManager.update(entity);
				if (array.size() > 0) {
					news.put("firstImgUrl", array.get(0));
				} else {
					news.put("firstImgUrl", "");
				}
			}

			// 时间
			Date date = news.getDate("createTime");
			if (date == null) {
				date = new Date();
			}

			int newsType = news.getIntValue("type");

			if (News.NEWS_TYPE_NOTICE == newsType) {
				news.put("createTime",
						DateFormatUtils.format(date, "MM月dd日 HH:mm"));
			} else {
				// news.put("createTime", DateFormatUtils.format(date,
				// "yyyy-MM-dd HH:mm:ss"));
				news.put("createTime",
						EdenTimeHelper.toTimeString(date.getTime()));// DateFormatUtils.format(date,
																		// "MM月dd日 HH:mm")
			}

			// 公告标志
			news.put("noticeFlag", News.NEWS_TYPE_NOTICE == newsType);

			jsonArrayNew.add(news);
		}
		jsonObject.put("results", jsonArrayNew);

		ajaxOutPutJson(jsonObject.toJSONString());
	}

	public String list() {
		int type = getIntParameter("type");
		long customerId = getLongParameter("customerId");
		setAttribute("type", type);
		setAttribute("customerId", customerId);
		setAttribute("typeMap", News.NEWS_TYPES);
		return SUCCESS;
	}

	public NewsManager getNewsManager() {
		return newsManager;
	}

	public void setNewsManager(NewsManager newsManager) {
		this.newsManager = newsManager;
	}

	public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}

}

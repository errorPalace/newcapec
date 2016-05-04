/**
 * 
 */
package net.newcapec.campus.h5.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * @version Notice.java 2014-6-6 下午5:30:58
 */
@Table(name = "CP_NEWS")
@Entity
public class News implements Serializable {

	public final static Integer NEWS_TYPE_SCHOOLINFO = 1;
	public final static Integer NEWS_TYPE_NEWS = 2;
	public final static Integer NEWS_TYPE_NOTICE = 3;
	public final static Integer NEWS_TYPE_TOSCHOOL = 4;
	public final static Integer NEWS_TYPE_PROBLEMS = 5;
	public final static Integer NEWS_TYPE_FLOOR = 6;
	public final static Integer NEWS_TYPE_MAP = 7;
	public final static Integer NEWS_TYPE_WELCOME = 8;
	// 9、10 两项是高铁学院专用的
	public final static Integer NEWS_TYPE_IMBURSE = 9;
	public final static Integer NEWS_TYPE_DIGEST = 10;

	/** 新闻公告类型 */
	public final static Integer NEWS_TYPE_NEWS_NOTICE = 11;
	public static Map<Integer, String> NEWS_TYPES = new HashMap<Integer, String>() {
		private static final long serialVersionUID = 1L;
		{
			put(NEWS_TYPE_SCHOOLINFO, "学校介绍");
			put(NEWS_TYPE_NEWS, "校内新闻");
			put(NEWS_TYPE_NOTICE, "通知公告");
			put(NEWS_TYPE_TOSCHOOL, "到校指引");
			put(NEWS_TYPE_PROBLEMS, "新生常见问题");
			put(NEWS_TYPE_FLOOR, "校内楼宇介绍");
			put(NEWS_TYPE_MAP, "校内地图");
			put(NEWS_TYPE_WELCOME, "报到流程");
			put(NEWS_TYPE_IMBURSE, "自定义列表1");
			put(NEWS_TYPE_DIGEST, "自定义列表2");
			put(NEWS_TYPE_NEWS_NOTICE, "新闻公告");
		}
	};
	/**
	 * 
	 */
	private static final long serialVersionUID = -2623343382505256500L;

	@Id
	@Column(name = "ID_")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "TITLE_", length = 400)
	private String title;

	@Lob
	@Column(name = "CONTENT_")
	private String content;

	@Column(name = "SUMMARY_", length = 200)
	private String summary;

	@Column(name = "CREATETIME_")
	private Date createTime;

	@Column(name = "CREATOR_", length = 50)
	private String creator;

	@Column(name = "CUSTOMERID_", length = 20)
	private Long customerId;

	@Column(name = "ENABLED_", length = 50)
	private boolean enabled;

	@Column(name = "ICON_", length = 200)
	private String icon;

	@Column(name = "CONTENT_IMAGES_")
	private String contentImages;
	/**
	 * 参考上面的类型
	 */
	@Column(name = "TYPE_")
	private int type;

	@Column(name = "FLAG_")
	private String flag;

	public News() {
		super();
	}

	public News(long id, String title, String summary, Date createTime,
			String creator, Long customerId, boolean enabled, String icon,
			String contentImages, int type, String flag) {
		super();
		this.id = id;
		this.title = title;
		this.summary = summary;
		this.createTime = createTime;
		this.creator = creator;
		this.customerId = customerId;
		this.enabled = enabled;
		this.icon = icon;
		this.contentImages = contentImages;
		this.type = type;
		this.flag = flag;
	}

	public News(long id, String title, String summary, Date createTime,
			String creator, Long customerId, boolean enabled, String icon,
			String contentImages, int type) {
		super();
		this.id = id;
		this.title = title;
		this.summary = summary;
		this.createTime = createTime;
		this.creator = creator;
		this.customerId = customerId;
		this.enabled = enabled;
		this.icon = icon;
		this.contentImages = contentImages;
		this.type = type;

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getContentImages() {
		return contentImages;
	}

	public void setContentImages(String contentImages) {
		this.contentImages = contentImages;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}
}

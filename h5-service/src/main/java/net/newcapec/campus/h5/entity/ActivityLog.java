package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 抽奖记录
 */
@Table(name = "ACTIVITY_LOG_")
@Entity
public class ActivityLog implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_")
	private long id;
	/**
	 * userid
	 */
	@Column(name = "USERID_")
	private long userId;
	/**
	 * 用户名字
	 */
	@Column(name = "USERNAME_")
	private String userName;
	/**
	 * 手机号
	 */
	@Column(name = "MOBILE_")
	private String mobile;
	/**
	 * 活动id
	 */
	@Column(name = "ACTIVITY_ID_")
	private long activityId;
	/**
	 * 子活动id
	 */
	@Column(name = "SON_ACTIVITY_ID")
	private long sonActivityId;
	/**
	 * 奖券编号
	 */
	@Column(name = "DRAWCODE_")
	private String drawCode;
	/**
	 * 奖品id(等于null没中奖，中奖有奖品等级)
	 */
	@Column(name = "PRIZEID_")
	private Long prizeId;
	@Column(name = "CREATE_STAMP_")
	private Date createStamp;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public long getActivityId() {
		return activityId;
	}

	public void setActivityId(long activityId) {
		this.activityId = activityId;
	}

	public long getSonActivityId() {
		return sonActivityId;
	}

	public void setSonActivityId(long sonActivityId) {
		this.sonActivityId = sonActivityId;
	}

	public String getDrawCode() {
		return drawCode;
	}

	public void setDrawCode(String drawCode) {
		this.drawCode = drawCode;
	}

	public Date getCreateStamp() {
		return createStamp;
	}

	public void setCreateStamp(Date createStamp) {
		this.createStamp = createStamp;
	}

	public Long getPrizeId() {
		return prizeId;
	}

	public void setPrizeId(Long prizeId) {
		this.prizeId = prizeId;
	}
}

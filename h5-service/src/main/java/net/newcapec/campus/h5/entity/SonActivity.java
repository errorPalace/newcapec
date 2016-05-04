package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 抽奖子活动举办方式
 */
@Table(name = "SON_ACTIVITY_")
@Entity
public class SonActivity  extends BaseEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 活动名字
	 */
	@Column(name = "NAME_")
	private String name;
	/**
	 * 所属活动
	 */
	@Column(name = "ACTIVITYID_")
	private long activityId;
	/**
	 * 无奖奖券
	 */
	@Column(name = "COUNT_")
	private int count;
	/**
	 * 每人限抽次数
	 */
	@Column(name = "TAKECOUNT_")
	private int takeCount;
	/**
	 * 每人限中次数
	 */
	@Column(name = "INCOUNT_")
	private int inCount;
	/**
	 * 活动开始时间
	 */
	@Column(name = "START_STAMP_")
	private Date startStamp;
	/**
	 * 活动截止时间
	 */
	@Column(name = "END_STAMP_")
	private Date endStamp;


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getActivityId() {
		return activityId;
	}

	public void setActivityId(long activityId) {
		this.activityId = activityId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getTakeCount() {
		return takeCount;
	}

	public void setTakeCount(int takeCount) {
		this.takeCount = takeCount;
	}

	public int getInCount() {
		return inCount;
	}

	public void setInCount(int inCount) {
		this.inCount = inCount;
	}

	public Date getStartStamp() {
		return startStamp;
	}

	public void setStartStamp(Date startStamp) {
		this.startStamp = startStamp;
	}

	public Date getEndStamp() {
		return endStamp;
	}

	public void setEndStamp(Date endStamp) {
		this.endStamp = endStamp;
	}

}

package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
/**
 * 抽奖活动奖品数量
 */
@Table(name = "ACTIVITY_PRIZE_SIZE_")
@Entity
public class ActivityPrizeCfg  extends BaseEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 *活动id
	 */
	@Column(name = "ACTIVITYID_")
	private long activityId;
	/**
	 *奖品id
	 */
	@Column(name = "PRIZEID_")
	private long prizeId;
	/**
	 *奖品等级
	 */
	@Column(name = "PRIZETYPE_")
	private int prizeType;
	/**
	 * 奖品总数量
	 */
	@Column(name = "COUNT_")
	private int count;
	/**
	 * 奖品已中奖数量
	 */
	@Column(name = "WINCOUNT_")
	private int winCount;
	/**
	 * 奖品预分配数量
	 */
	@Column(name = "ALLOTCOUNT_")
	private int allotCount;


	public long getActivityId() {
		return activityId;
	}

	public void setActivityId(long activityId) {
		this.activityId = activityId;
	}

	public long getPrizeId() {
		return prizeId;
	}

	public void setPrizeId(long prizeId) {
		this.prizeId = prizeId;
	}

	public int getPrizeType() {
		return prizeType;
	}

	public void setPrizeType(int prizeType) {
		this.prizeType = prizeType;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getWinCount() {
		return winCount;
	}

	public void setWinCount(int winCount) {
		this.winCount = winCount;
	}

	public int getAllotCount() {
		return allotCount;
	}

	public void setAllotCount(int allotCount) {
		this.allotCount = allotCount;
	}

}

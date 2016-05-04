package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * 抽奖活动发奖配置
 */
@Table(name = "SON_ACTIVITY_PRIZE_CFG_")
@Entity
public class SonActivityPrizeCfg extends BaseEntity implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    /**
     * 活动id
     */
    @Column(name = "ACTIVITY_ID")
    private long activityId;
    /**
     * 子活动id
     */
    @Column(name = "SON_ACTIVITY_ID")
    private long sonActivityId;
    /**
     * 奖品id
     */
    @Column(name = "PRIZEID_")
    private long prizeId;
    /**
     * 预计发奖品数量
     */
    @Column(name = "ALLOTCOUNT_")
    private int allotCount;
    /**
     * 上期叠加发奖品数量
     */
    @Column(name = "SURPLUS_COUNT_")
    private int surplusCount;
    /**
     * 中奖数量
     */
    @Column(name = "IN_COUNT_")
    private int inCount;


    public long getSonActivityId() {
        return sonActivityId;
    }

    public void setSonActivityId(long sonActivityId) {
        this.sonActivityId = sonActivityId;
    }

    public long getPrizeId() {
        return prizeId;
    }

    public void setPrizeId(long prizeId) {
        this.prizeId = prizeId;
    }

    public int getAllotCount() {
        return allotCount;
    }

    public void setAllotCount(int allotCount) {
        this.allotCount = allotCount;
    }

    public int getSurplusCount() {
        return surplusCount;
    }

    public void setSurplusCount(int surplusCount) {
        this.surplusCount = surplusCount;
    }

    public int getInCount() {
        return inCount;
    }

    public void setInCount(int inCount) {
        this.inCount = inCount;
    }

    public long getActivityId() {
        return activityId;
    }

    public void setActivityId(long activityId) {
        this.activityId = activityId;
    }
}

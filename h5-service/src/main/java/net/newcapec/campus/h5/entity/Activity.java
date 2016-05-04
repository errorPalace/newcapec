package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 抽奖活动
 */
@Table(name = "ACTIVITY_")
@Entity
public class Activity extends BaseEntity implements Serializable {

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
     * 描述
     */
    @Column(name = "DESCRIPTION_")
    private String description;
    /**
     * 每人限中次数
     */
    @Column(name = "INCOUNT_")
    private int inCount;

    /**
     * false 开 true 关
     * 活动开关(控制是否真抽)
     */
    @Column(name = "IS_USE_")
    private boolean use;
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

    public boolean isUse() {
        return use;
    }

    public void setUse(boolean use) {
        this.use = use;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

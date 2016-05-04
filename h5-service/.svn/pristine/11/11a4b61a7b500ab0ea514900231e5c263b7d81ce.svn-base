package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 抽奖活动奖品
 */
@Table(name = "PRIZE_")
@Entity
public class Prize extends BaseEntity implements Serializable {
    /**
     * 特等奖
     */
    public static final Integer SPECIAL = 0;
    /**
     * 一等奖
     */
    public static final Integer FIRST = 1;
    /**
     * 二等奖
     */
    public static final Integer SECOND = 2;
    /**
     * 三等奖
     */
    public static final Integer THIRD = 3;


    /**
     * 账单状态 对应的字符串信息
     */
    public static final Map<Integer, String> TYPE_MAP;

    static {
        Map<Integer, String> statusMap = new LinkedHashMap<Integer, String>();
        statusMap.put(FIRST, "一等奖");
        statusMap.put(SECOND, "二等奖");
        statusMap.put(THIRD, "三等奖");
        statusMap.put(SPECIAL, "特等奖");
        TYPE_MAP = java.util.Collections
                .unmodifiableMap(statusMap);
    }

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    /**
     * 奖品名字
     */
    @Column(name = "NAME_")
    private String name;
    /**
     * 奖品备注
     */
    @Column(name = "NOTE_")
    private String note;
    /**
     * 图片路径
     */
    @Column(name = "IMAGE_PATH_")
    private String imagePath;
    /**
     * 奖品等级
     */
    @Column(name = "TYPE_")
    private int type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

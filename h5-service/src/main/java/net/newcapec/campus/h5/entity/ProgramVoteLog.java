package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 节目表
 */
@Table(name = "PROGRAMVOTE_LOG_")
@Entity
public class ProgramVoteLog implements Serializable {

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
     * 投票的节目id(多个)
     */
    @Column(name = "PROGRAMIDS_")
    private String programIds;

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

    public String getProgramIds() {
        return programIds;
    }

    public void setProgramIds(String programIds) {
        this.programIds = programIds;
    }

    public Date getCreateStamp() {
        return createStamp;
    }

    public void setCreateStamp(Date createStamp) {
        this.createStamp = createStamp;
    }
}


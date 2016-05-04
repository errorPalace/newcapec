package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.Date;

/**
 * Created by wa on 2016/1/11.
 */
@MappedSuperclass
public class BaseEntity {

    @Id
    @Column(name = "ID_")
    private long id;
    /**
     * 删除
     */
    @Column(name = "ENABLE_")
    private boolean enable;
    /** 创建人*/
    @Column(name = "CREATE_OPERATOR_")
    private String createOperator;
    /** 修改人 */
    @Column(name = "MODIFY_OPERATOR_")
    private String modifyOperator;

    @Column(name = "CREATE_STAMP_")
    private Date createStamp;

    @Column(name = "MODIFY_STAMP_")
    private Date modifyStamp;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public String getCreateOperator() {
        return createOperator;
    }

    public void setCreateOperator(String createOperator) {
        this.createOperator = createOperator;
    }

    public String getModifyOperator() {
        return modifyOperator;
    }

    public void setModifyOperator(String modifyOperator) {
        this.modifyOperator = modifyOperator;
    }

    public Date getCreateStamp() {
        return createStamp;
    }

    public void setCreateStamp(Date createStamp) {
        this.createStamp = createStamp;
    }

    public Date getModifyStamp() {
        return modifyStamp;
    }

    public void setModifyStamp(Date modifyStamp) {
        this.modifyStamp = modifyStamp;
    }
}

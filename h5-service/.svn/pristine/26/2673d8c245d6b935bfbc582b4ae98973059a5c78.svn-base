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
@Table(name = "PROGRAM_")
@Entity
public class Program implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "ID_")
    private long id;
    /**
     * 名字
     */
    @Column(name = "NAME_")
    private String name;
    /**
     * 导演
     */
    @Column(name = "DIRECTOR_")
    private String director;
    /**
     * 参与者
     */
    @Column(name = "PARTICIPANT_")
    private String participant;
    /**
     * 票数
     */
    @Column(name = "COUNT_")
    private int count;

    @Column(name = "CREATE_STAMP_")
    private Date createStamp;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParticipant() {
        return participant;
    }

    public void setParticipant(String participant) {
        this.participant = participant;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Date getCreateStamp() {
        return createStamp;
    }

    public void setCreateStamp(Date createStamp) {
        this.createStamp = createStamp;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }
}


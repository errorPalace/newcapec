package net.newcapec.campus.h5.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "USER_SCHOOLCARD_DATA_")
@Entity
public class UserSchoolCardData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_")
	private long id;
	/** 创建时间 */
	@Column(name = "CREATEDATE_")
	private Date createDate;
	/** 用户ID */
	@Column(name = "USER_ID_")
	private Long userId;
	/** 姓名 */
	@Column(name = "NAME_")
	private String name;
	/** 昵称 */
	@Column(name = "NICKNAME_")
	private String nickname;
	/** 学号（同一卡通的outid） */
	@Column(name = "STUNO_")
	private String stuNo;
	/** 学校编号 */
	@Column(name = "CUSTOMER_CODE_")
	private String customerCode;
	/** 学校名称 */
	@Column(name = "CUSTOMER_NAME_")
	private String customerName;
	/** 是否绑卡 */
	@Column(name = "ISBING_ECARD_")
	private Boolean isBindEcard;
	/** 对应的UUID */
	@Column(name = "UUID_")
	private String uuid;
	/** 性别 */
	@Column(name = "SEX_")
	private String sex;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getStuNo() {
		return stuNo;
	}

	public void setStuNo(String stuNo) {
		this.stuNo = stuNo;
	}

	public String getCustomerCode() {
		return customerCode;
	}

	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Boolean getIsBindEcard() {
		return isBindEcard;
	}

	public void setIsBindEcard(Boolean isBindEcard) {
		this.isBindEcard = isBindEcard;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

}

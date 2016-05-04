package net.newcapec.campus.quickaccess.manager;


import net.newcapec.campus.quickaccess.entity.Customer;
import net.newcapec.v3.extend.manager.BaseManager;

public interface CustomerManager extends BaseManager<Customer>{
	/**
	 * 根据customerCode获取学校
	 * @param code
	 * @return
	 */
	Customer getCustomerByCode(String code);
	
	/**
	 * 保存缓存
	 */
	void saveCustomer(Customer c);
	/**
	 * 更新缓存
	 */
	void updateCustomer(Customer c);
	/**
	 * 删除缓存
	 */
	Customer deleteCustomer(Long id);
	/**
	 * 初始化所有学校的拼音
	 */
	public void pinyinInit();
	/**
	 * 初始化所有学校的简拼
	 */
	public void jianpinInit();
	
}

package net.newcapec.campus.quickaccess.manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.newcapec.campus.quickaccess.entity.Customer;
import net.newcapec.campus.quickaccess.utils.PingYinUtil;
import net.newcapec.v3.core.context.V3InitializingBean;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

public class CustomerManagerImpl extends BaseManagerImpl<Customer> implements V3InitializingBean, CustomerManager{
    private Map<String, Customer> customerMap=new HashMap<String, Customer>();
    
	@Override
	public Customer getCustomerByCode(String code) {
		Customer customer=this.customerMap.get(code);
		if (customer==null) {
			customer=this.findUniqueByCondition(Conditions.eq("customerCode", code));
		}
		return customer;
	}

	@Override
	public void saveCustomer(Customer c) {
		this.save(c);
		this.customerMap.put(c.getCustomerCode(), c);
	}

	@Override
	public void updateCustomer(Customer c) {
		this.update(c);
		this.customerMap.put(c.getCustomerCode(), c);
		
	}

	@Override
	public Customer deleteCustomer(Long id) {
		Customer customer=this.deleteById(id);
		this.customerMap.remove(customer.getCustomerCode());
		return customer;
	}

	@Override
	public void afterLoaderV3Context() throws Exception {
		List<Customer> list=this.dao.findAll();
		for (Customer customer : list) {
			customerMap.put(customer.getCustomerCode(), customer);
		}
	}

	@Override
	public void pinyinInit() {
		List<Customer> list=this.findAll();
		for (Customer customer : list) {
			String name=customer.getCustomerName();
			String pinyin=PingYinUtil.getPingYin(name);
			customer.setPinyin(pinyin);
			this.update(customer);
		}
		
	}

	@Override
	public void jianpinInit() {
		List<Customer> list=this.findAll();
		for (Customer customer : list) {
			String name=customer.getCustomerName();
			String jianpin=PingYinUtil.getFirstSpell(name);
			customer.setJianpin(jianpin);
			this.update(customer);
		}
		
	}

}

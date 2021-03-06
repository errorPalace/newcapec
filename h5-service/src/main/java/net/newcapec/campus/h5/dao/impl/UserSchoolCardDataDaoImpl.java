package net.newcapec.campus.h5.dao.impl;

import java.math.BigDecimal;

import net.newcapec.campus.h5.dao.UserSchoolCardDataDao;
import net.newcapec.campus.h5.entity.UserSchoolCardData;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.extend.orm.hibernate.HibernateSequenceBaseDaoImpl;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SQLQuery;

import com.alibaba.fastjson.JSONObject;

public class UserSchoolCardDataDaoImpl extends HibernateSequenceBaseDaoImpl<UserSchoolCardData>
		implements UserSchoolCardDataDao {
	
	private  PreferenceUtils  preferenceUtils;

	
	public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}


	@Override
	public JSONObject findUserBigData(JSONObject pram) {
		JSONObject result = new JSONObject();
		String stuNo = pram.getString("stuNo");
		int customerCode = pram.getInteger("customerCode");
		String name = pram.getString("name");
		String sex = pram.getString("sex");
		String customerName = pram.getString("customerName");
		String sql ="SELECT sbc.customer_id FROM st_base_customers sbc where sbc.out_id = ? and sbc.customer_code = ?";
		 SQLQuery sqlQuery = this
				    .getSessionFactory()
	                .getCurrentSession()
	                .createSQLQuery(sql);
	        sqlQuery.setString(0, stuNo);
	        sqlQuery.setInteger(1, customerCode);
	        String customer_Id = (String)sqlQuery.uniqueResult();
		if(StringUtils.isBlank(customer_Id)){
			result.put("result_", false);
			result.put("message_", "查询customerId错误");
			result.put("code_", 99);
			return result;
		}
     String  sql1 = "SELECT sec.total_days FROM st_ecard_cbreak sec WHERE sec.customer_id = ? AND sec.customer_code = ?;";
     SQLQuery sqlQuery1 = this
			    .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(sql1);
     sqlQuery1.setString(0, customer_Id);
     sqlQuery1.setInteger(1, customerCode);
     Integer noBreakfastCount = (Integer)sqlQuery1.uniqueResult();
	        
     String  sql2 = "SELECT sec.total_fare FROM st_ecard_ctotal sec WHERE sec.customer_id = ? AND sec.customer_code = ?;";
     SQLQuery sqlQuery2 = this
			    .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(sql2);
     sqlQuery2.setString(0, customer_Id);
     sqlQuery2.setInteger(1, customerCode);
     BigDecimal sunMoney = (BigDecimal)sqlQuery2.uniqueResult();
	        
     String  sql3 = "SELECT sec.total_times FROM st_ecard_stimes sec WHERE sec.customer_id = ? AND sec.customer_code = ?;";
     SQLQuery sqlQuery3 = this
			    .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(sql3);
     sqlQuery3.setString(0, customer_Id);
     sqlQuery3.setInteger(1, customerCode);
     Integer payCount = (Integer)sqlQuery3.uniqueResult();
     
     String  sql4 = "SELECT sec.total_times FROM st_ecard_ctimes sec WHERE sec.customer_id = ? AND sec.customer_code = ?;";
     SQLQuery sqlQuery4 = this
			    .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(sql4);
     sqlQuery4.setString(0, customer_Id);
     sqlQuery4.setInteger(1, customerCode);
     Integer consumeCount = (Integer)sqlQuery4.uniqueResult();
     
     String  sql5 = "SELECT sec.total_rank FROM st_ecard_crank sec WHERE sec.customer_id = ? AND sec.customer_code = ?;";
     SQLQuery sqlQuery5 = this
			    .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(sql5);
     sqlQuery5.setString(0, customer_Id);
     sqlQuery5.setInteger(1, customerCode);
     Integer ranking = (Integer)sqlQuery5.uniqueResult();
     
     
        result.put("result_", true);
		result.put("message_", "成功");
		result.put("code_",0);
		JSONObject data = new JSONObject();
		data.put("noBreakfast", noBreakfastCount);//没吃早餐
		data.put("sunMoney", sunMoney+"");//总花费 //少个排名
		//TODO   
		data.put("ranking", ranking);
		
		data.put("payCount", payCount);//充值次数
		data.put("saveTime", 0);//充值节约的时间
		data.put("wasteTime", 0);//充值浪费的时间
		data.put("sex", sex);
		if(null != payCount){
			data.put("saveTime", payCount*preferenceUtils.getSaveTime());//充值节约的时间
			data.put("wasteTime", payCount*preferenceUtils.getWasteTime());//充值浪费的时间
		}
		
		data.put("consumeCount", consumeCount);//刷卡的次数
		data.put("customerName", customerName);
		data.put("name",name);
		result.put("data", data);
		return result;
	}

}

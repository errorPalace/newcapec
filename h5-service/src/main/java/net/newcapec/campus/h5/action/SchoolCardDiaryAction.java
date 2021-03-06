package net.newcapec.campus.h5.action;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import net.newcapec.campus.h5.entity.UserSchoolCardData;
import net.newcapec.campus.h5.http.HttpCampusUtils;
import net.newcapec.campus.h5.manager.UserSchoolCardDataManager;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.core.web.action.BaseAction;
import net.newcapec.v3.extend.orm.condition.Conditions;
import net.newcapec.v3.upload.utils.CommonUtil;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;

public class SchoolCardDiaryAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	 private HttpCampusUtils httpCampusUtils;
	 private UserSchoolCardDataManager userSchoolCardDataManager;
	 private PreferenceUtils preferenceUtils;
	 
	 
	 
	public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}



	public void setHttpCampusUtils(HttpCampusUtils httpCampusUtils) {
		this.httpCampusUtils = httpCampusUtils;
	}



	public void setUserSchoolCardDataManager(
			UserSchoolCardDataManager userSchoolCardDataManager) {
		this.userSchoolCardDataManager = userSchoolCardDataManager;
	}

	public void getMyDataByUuid() throws IOException{
		 JSONObject result = new JSONObject();
		    JSONObject data = new JSONObject();
		String uuid = this.getParameter("uuid");
//		String uuid = "9fd6d1a2459742a2a8972c9167afcdd9";
		  if (StringUtils.isBlank(uuid)) {
              result.put("result_", false);
              result.put("code_", 99);
              result.put("message_", "请求参数不全！");
              ajaxOutPutJson(result);
              return;
          }
		 
		List<UserSchoolCardData> userSchoolCardDataList = userSchoolCardDataManager.findByCondition(Conditions.eq("uuid",uuid));
		if(!userSchoolCardDataList.isEmpty()){
			
		UserSchoolCardData userSchoolCardData = userSchoolCardDataList.get(0);
		String sex = userSchoolCardData.getSex();
		String name = userSchoolCardData.getName();
		String nickname = userSchoolCardData.getNickname();
		String regex = "^[\\p{L} .'-]+$";
		boolean isName = Pattern.matches(regex, name);
		if(!isName){
			name = nickname;
		}
		
		String customerName = userSchoolCardData.getCustomerName();
		String stuNo = userSchoolCardData.getStuNo();
		String customerCode = userSchoolCardData.getCustomerCode();
		 //返回相应的数据 
		JSONObject pram = new JSONObject();
		pram.put("stuNo", stuNo);
		pram.put("customerCode", customerCode);
		pram.put("name",name);
		pram.put("customerName",customerName);
		pram.put("sex", sex);
		JSONObject findUserBigData = userSchoolCardDataManager.findUserBigData(pram);
		ajaxOutPutText(findUserBigData.toJSONString());
		return;
		}else{
			      result.put("result_", false);
	              result.put("code_", 99);
	              result.put("message_", "非法用户！");
	              ajaxOutPutJson(result);
	              return;
		}
		
		
		
	}

	public void getMyDataByToken() throws IOException{
		String token = this.getParameter("token");
	    JSONObject result = new JSONObject();
	    JSONObject data = new JSONObject();
	    
		  if (StringUtils.isBlank(token)) {
              result.put("result_", false);
              result.put("code_", 99);
              result.put("message_", "请求参数不全！");
              ajaxOutPutJson(result);
              return;
          }
		
		  JSONObject jsonObject = httpCampusUtils.getUserByTokenSys(token);
          if (jsonObject == null) {
              result.put("result_", false);
              result.put("code_", 99);
              result.put("message_", "非法用户！");
              ajaxOutPutJson(result);
              return;
          }
          String sex = jsonObject.getString("sex");
          Long userId = jsonObject.getLong("userId");
          String name = jsonObject.getString("name");
          
          String nickname = jsonObject.getString("nickname");
  	   	String regex = "^[\\p{L} .'-]+$";
  		boolean isName = Pattern.matches(regex, name);
  		if(!isName){
  			name = nickname;
  		}
          String stuNo = jsonObject.getString("outid");
          String customerCode  = jsonObject.getString("customerCode");
          String  customerName = jsonObject.getString("customerName");
          Boolean isBindEcard = jsonObject.getBooleanValue("bindEcard");
          String uuid = UUID.randomUUID().toString().trim().replaceAll("-", "");
          if(isBindEcard){
        	    //返回相应的数据 
				JSONObject pram = new JSONObject();
				pram.put("stuNo", stuNo);
				pram.put("customerCode", customerCode);
				pram.put("name",name);
				pram.put("customerName",customerName);
				pram.put("sex", sex);
				JSONObject findUserBigData = userSchoolCardDataManager.findUserBigData(pram);
				ajaxOutPutText(findUserBigData.toJSONString());
	  
          }else{
        	  result.put("result_", false);
              result.put("code_", 99);
              result.put("message_", "该用户没有绑卡！");
              ajaxOutPutJson(result);
              return;
          }

	}
	public void getShareURL() throws IOException{
		String token = this.getParameter("token");
//		String token ="eba40aad-a60d-4cc1-a537-cc07d7e70ede";
	    JSONObject result = new JSONObject();
	    JSONObject data = new JSONObject();
	    
		  if (StringUtils.isBlank(token)) {
              result.put("result_", false);
              result.put("code_", 99);
              result.put("message_", "请求参数不全！");
              ajaxOutPutJson(result);
              return;
          }
		
		  JSONObject jsonObject = httpCampusUtils.getUserByTokenSys(token);
          if (jsonObject == null) {
              result.put("result_", false);
              result.put("code_", 99);
              result.put("message_", "非法用户！");
              ajaxOutPutJson(result);
              return;
          }
          Long userId = jsonObject.getLong("userId");
          String name = jsonObject.getString("name");
          String nickname = jsonObject.getString("nickname");
          String stuNo = jsonObject.getString("outid");
          String sex =jsonObject.getString("sex");
          String customerCode  = jsonObject.getString("customerCode");
          String  customerName = jsonObject.getString("customerName");
          Boolean isBindEcard = jsonObject.getBooleanValue("bindEcard");
         
          
          if(isBindEcard){
        	  
        	  //先查询本地有没有
        	  List<UserSchoolCardData> userSchoolCardDataList = userSchoolCardDataManager.findByCondition(Conditions.eq("userId", userId),Conditions.eq("stuNo", stuNo));
        	  if(userSchoolCardDataList.isEmpty()){
        		  String uuid = UUID.randomUUID().toString().trim().replaceAll("-", "");//如果库里面没有生成一个UUID，并返回；同时保存到库中
        		  
        		  UserSchoolCardData  uscd= new UserSchoolCardData();
        		  uscd.setCreateDate(new Date());
        		  uscd.setCustomerCode(customerCode);
        		  uscd.setCustomerName(customerName);
        		  uscd.setIsBindEcard(isBindEcard);
        		  uscd.setName(name);
        		  uscd.setNickname(nickname);
        		  uscd.setStuNo(stuNo);
        		  uscd.setUserId(userId);
        		  uscd.setUuid(uuid);
        		  uscd.setSex(sex);
        		  userSchoolCardDataManager.save(uscd);
        		  String shareURL1 = preferenceUtils.getSchoolCardDiaryShareURL();
        		  String shareURL = shareURL1+"?key="+uuid;
            	    //返回相应的数据 
            	    result.put("code_", 0);
            	    result.put("message_", "成功");
            	    data.put("shareURL",shareURL);
      			    result.put("data", data);
      			    ajaxOutPutText(result);

        		  
        	  }else{
        		  String uuid2 = userSchoolCardDataList.get(0).getUuid();
        		  String shareURL1 = preferenceUtils.getSchoolCardDiaryShareURL();
        		  String shareURL = shareURL1+"?key="+uuid2;
        		  //返回相应的数据 
  				
        		  result.put("code_", 0);
          	    result.put("message_", "成功");
          	    data.put("shareURL",shareURL);
    			    result.put("data", data);
    			    ajaxOutPutText(result);
  				
        	  }
        	  
        	  
        	  
        	  
        }else{
      	  result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "该用户没有绑卡！");
            ajaxOutPutJson(result);
            return;
        }

	}
	
	
	
	
	
}

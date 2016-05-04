package net.newcapec.campus.h5.action;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import net.newcapec.campus.h5.entity.LibraryUserLikeType;
import net.newcapec.campus.h5.http.HttpCampusUtils;
import net.newcapec.campus.h5.manager.LibraryUserLikeTypeManager;
import net.newcapec.v3.core.web.action.BaseAction;
import net.newcapec.v3.extend.orm.condition.Conditions;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class LibraryAction extends BaseAction {

	/** 
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpCampusUtils httpCampusUtils;
	private LibraryUserLikeTypeManager libraryUserLikeTypeManager;

	public void setLibraryUserLikeTypeManager(
			LibraryUserLikeTypeManager libraryUserLikeTypeManager) {
		this.libraryUserLikeTypeManager = libraryUserLikeTypeManager;
	}

	public void setHttpCampusUtils(HttpCampusUtils httpCampusUtils) {
		this.httpCampusUtils = httpCampusUtils;
	}

	// 设置我喜欢的类别
	public void execUserLike() throws Exception {
		JSONObject result = new JSONObject();
		String outid = this.getParameter("outid");
		String customercode = this.getParameter("customercode");
		String likeType = this.getParameter("likeType");
		List<LibraryUserLikeType> userLikeTypeList = libraryUserLikeTypeManager
				.findByCondition(Conditions.eq("outId", outid),
						Conditions.eq("customercode", customercode));
		if (userLikeTypeList.isEmpty()) {
			LibraryUserLikeType lt = new LibraryUserLikeType();
			lt.setCreateStamp(new Date());
			lt.setEnable(true);
			lt.setOutId(outid);
			lt.setLikeType(likeType);
			lt.setCustomercode(customercode);
			libraryUserLikeTypeManager.save(lt);
		} else {
			LibraryUserLikeType lt = userLikeTypeList.get(0);
			lt.setCustomercode(customercode);
			lt.setLikeType(likeType);
			lt.setModifyStamp(new Date());
			lt.setOutId(outid);
			libraryUserLikeTypeManager.update(lt);
			result.put("result_", true);
			result.put("code_", 0);
			result.put("message_", "成功");
			ajaxOutPutText(result.toJSONString());
			return;
		}

	}

	// 图书馆正在借阅
	public void getNowBorrow() throws IOException {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String customercode = this.getParameter("customercode");
		// String customercode = "738";
		String outid = this.getParameter("outid");

		if (StringUtils.isBlank(customercode) || StringUtils.isBlank(outid)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		Integer page = this.getIntParameter("page");
		if (page == null) {
			page = 1;
		}
		
		String libraryUserInfo = httpCampusUtils.getNowBorrow(outid,
				customercode,page);
		ajaxOutPutText(libraryUserInfo);
		return;

	}
	// 图书馆正在借阅(假分页)
		public void getNowBorrowFromPaging() throws IOException {
			JSONObject result = new JSONObject();
			String customercode = this.getParameter("customercode");
			Integer pageSize = this.getIntParameter("pageSize");
			String outid = this.getParameter("outid");

			if (StringUtils.isBlank(customercode) || StringUtils.isBlank(outid)) {
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", "参数错误~");
				ajaxOutPutText(result.toJSONString());
				return;
			}
			Integer page = this.getIntParameter("page");
			if (page == null) {
				page = 1;
			}
			
			String libraryUserInfo = httpCampusUtils.getNowBorrowFromPaging(outid, customercode, pageSize, page);
			ajaxOutPutText(libraryUserInfo);
			return;

		}

	// 图书馆历史借阅
	public void getHistoryBorrow() throws IOException {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String customercode = this.getParameter("customercode");
		// String customercode = "738";
		String outid = this.getParameter("outid");

		if (StringUtils.isBlank(customercode) || StringUtils.isBlank(outid)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		
		Integer page = this.getIntParameter("page");
		if (page == null) {
			page = 1;
		}
		String libraryUserInfo = httpCampusUtils.getHistoryBorrow(outid,
				customercode,page);
		ajaxOutPutText(libraryUserInfo);
		return;

	}
	
	// 图书馆历史借阅(假分页)
		public void getHistoryBorrowFromPaging() throws IOException {
			JSONObject result = new JSONObject();
			String customercode = this.getParameter("customercode");
			Integer pageSize = this.getIntParameter("pageSize");
			// String customercode = "738";
			String outid = this.getParameter("outid");

			if (StringUtils.isBlank(customercode) || StringUtils.isBlank(outid)) {
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", "参数错误~");
				ajaxOutPutText(result.toJSONString());
				return;
			}
			
			Integer page = this.getIntParameter("page");
			if (page == null) {
				page = 1;
			}
			String libraryUserInfo = httpCampusUtils.getHistoryBorrowFromPaging(outid, customercode, pageSize, page);
			ajaxOutPutText(libraryUserInfo);
			return;

		}

	// 图书馆获取个人信息
	public void getLibraryUserInfo() throws IOException {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String customercode = this.getParameter("customercode");
		// String customercode = "738";
		String outid = this.getParameter("outid");

		if (StringUtils.isBlank(customercode) || StringUtils.isBlank(outid)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		List<LibraryUserLikeType> userLikeType = libraryUserLikeTypeManager
				.findByCondition(Conditions.eq("outId", outid),
						Conditions.eq("customercode", customercode));

		String likeType = "";
		if (!userLikeType.isEmpty()) {
			likeType = userLikeType.get(0).getLikeType();
		}

		String libraryUserInfo = httpCampusUtils.getLibraryUserInfo(outid,
				customercode, likeType);
		ajaxOutPutText(libraryUserInfo);
		return;

	}

	// 获取用户信息
	public void getUserInfo() throws Exception {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String token = this.getParameter("token");
		if (StringUtils.isBlank(token)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "token为空！");
			ajaxOutPutText(result.toJSONString());
			return;
		}

		JSONObject jsonObject = httpCampusUtils.getUserByTokenSys(token);
		this.log.info("###############################" + jsonObject);
		if (jsonObject == null) {
			this.log.info("############################### token没有获取用户信息失败");
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "token调玩校获取用户信息失败~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		String customPic = jsonObject.getString("customPic");
		String sex = jsonObject.getString("sex");
		Long userId = jsonObject.getLong("userId");
		String name = jsonObject.getString("name");
		String outid = jsonObject.getString("outid");
		String stuNo = jsonObject.getString("stuNo");
		String nickname = jsonObject.getString("nickname");
		String customerId = jsonObject.getString("customerId");
		String customerCode = jsonObject.getString("customerCode");
		String customerName = jsonObject.getString("customerName");
		boolean bindEcard = jsonObject.getBooleanValue("bindEcard");
		data.put("customPic", customPic);
		data.put("userId", userId);
		data.put("sex", sex);
		data.put("name", name);
		data.put("outid", outid);
		data.put("stuNo", stuNo);
		data.put("customerId", customerId);
		data.put("nickname", nickname);
		data.put("customercode", customerCode);
		data.put("customerName", customerName);
		data.put("bindEcard", bindEcard);
		result.put("result_", true);
		result.put("code_", 0);
		result.put("data", data);
		result.put("message_", "成功");
		ajaxOutPutText(result.toJSONString());
		return;

	}

	// 根据书名搜索
	public void getLibraryDataByName() throws Exception {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String customercode = this.getParameter("customercode");
		// String customercode = "738";
		String title = this.getParameter("title");
		// String title = "商缘";
		if (StringUtils.isBlank(title)) {
			title = "";
		}
		if (StringUtils.isBlank(customercode)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		if (StringUtils.isNotBlank(title)) {
			title = title + "%";
		}
		Integer page = this.getIntParameter("page");
		String title1 = title;
		if (page == null) {
			page = 1;
		}
		String countData = httpCampusUtils.getTitleSum(title, customercode);
		JSONObject countJson = JSONObject.parseObject(countData);
		String count ="";
		
		if(countJson.getBooleanValue("result_")){
		 count = countJson.getString("data");
		 
		 for(Object o  :JSONArray.parseArray(count)){
			 JSONObject JO = (JSONObject) o;
			 count = JO.getString("total");
		 }
		}
		
		String libraryDataByName = httpCampusUtils.getLibraryDataByName(title,
				page, title1, customercode, count);

		ajaxOutPutText(libraryDataByName);
		return;

	}
	
	// 根据书名搜索(假分页)
		public void getLibraryDataByNameFromPaging() throws Exception {
			JSONObject result = new JSONObject();
			String customercode = this.getParameter("customercode");
			// String customercode = "738";
			Integer pageSize = this.getIntParameter("pageSize"); 
			String title = this.getParameter("title");
			// String title = "商缘";
			if (StringUtils.isBlank(title)) {
				title = "";
			}
			if (StringUtils.isBlank(customercode)) {
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", "参数错误~");
				ajaxOutPutText(result.toJSONString());
				return;
			}
			if (StringUtils.isNotBlank(title)) {
				title = title + "%";
			}
			Integer page = this.getIntParameter("page");
			if (page == null) {
				page = 1;
			}
			
			String countData = httpCampusUtils.getTitleSum(title, customercode);
			JSONObject countJson = JSONObject.parseObject(countData);
			String count ="";
			
			if(countJson.getBooleanValue("result_")){
			 count = countJson.getString("data");
			 
			 for(Object o  :JSONArray.parseArray(count)){
				 JSONObject JO = (JSONObject) o;
				 count = JO.getString("total");
			 }
			}
			
			String libraryDataByName = httpCampusUtils.getLibraryDataByNameFromPaging(title, pageSize,
				page, customercode, count);

			ajaxOutPutText(libraryDataByName);
			return;

		}

	// 根据拼音搜索
	public void getLibraryDataBypinyin() throws Exception {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String customercode = this.getParameter("customercode");
		// String customercode = "738";
		String pinYin = this.getParameter("pinYin");
		// String title = "商缘";
		if (StringUtils.isBlank(pinYin)) {
			pinYin = "";
		}
		if (StringUtils.isBlank(customercode)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		Integer page = this.getIntParameter("page");
		String pinYin1 = pinYin;
		if (page == null) {
			page = 1;
		}
		String libraryDataByName = httpCampusUtils.getLibraryDataBypinyin(
				pinYin, page, pinYin1, customercode);
		ajaxOutPutText(libraryDataByName);
		return;

	}

	// 根据作者搜索
	public void getLibraryDataByAuthor() throws Exception {
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		String customercode = this.getParameter("customercode");
		// String customercode = "738";
		String author = this.getParameter("author");
		// String title = "商缘";
		if (StringUtils.isBlank(author)) {
			author = "";
		}
		if (StringUtils.isBlank(customercode)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		Integer page = this.getIntParameter("page");
		if (StringUtils.isNotBlank(author)) {
			author = author + "%";
		}
		String author1 = author;
		if (page == null) {
			page = 1;
		}
		String countData = httpCampusUtils.getAuthorSum(author, customercode);
		JSONObject countJson = JSONObject.parseObject(countData);
		String count ="";
		if(countJson.getBooleanValue("result_")){
		 count = countJson.getString("data");
		 
		 for(Object o  :JSONArray.parseArray(count)){
			 JSONObject JO = (JSONObject) o;
			 count = JO.getString("total");
		 }
		}
		String libraryDataByName = httpCampusUtils.getLibraryDataByAuthor(
				author, page, author1, customercode, count);
		ajaxOutPutText(libraryDataByName);
		return;

	}
	
	// 根据作者搜索(假分页)
		public void getLibraryDataByAuthorFromPaging() throws Exception {
			JSONObject result = new JSONObject();
			String customercode = this.getParameter("customercode");
			// String customercode = "738";
			Integer pageSize = this.getIntParameter("pageSize");
			String author = this.getParameter("author");
			if (StringUtils.isBlank(author)) {
				author = "";
			}
			if (StringUtils.isBlank(customercode)) {
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", "参数错误~");
				ajaxOutPutText(result.toJSONString());
				return;
			}
			Integer page = this.getIntParameter("page");
			if (StringUtils.isNotBlank(author)) {
				author = author + "%";
			}
			if (page == null) {
				page = 1;
			}
			String countData = httpCampusUtils.getAuthorSum(author, customercode);
			JSONObject countJson = JSONObject.parseObject(countData);
			String count ="";
			if(countJson.getBooleanValue("result_")){
			 count = countJson.getString("data");
			 
			 for(Object o  :JSONArray.parseArray(count)){
				 JSONObject JO = (JSONObject) o;
				 count = JO.getString("total");
			 }
			}
			String libraryDataByName = httpCampusUtils.getLibraryDataByAuthorFromPaging(
					author,pageSize, page, customercode, count);
			ajaxOutPutText(libraryDataByName);
			return;

		}

	// 获取图书详情
	public void getBookInfo() throws Exception {
		JSONObject result = new JSONObject();
		String controlNo = this.getParameter("controlNumber");
		String customercode = this.getParameter("customercode");
		if (StringUtils.isBlank(controlNo) || StringUtils.isBlank(customercode)) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "参数错误~");
			ajaxOutPutText(result.toJSONString());
			return;
		}
		String booksInfo = httpCampusUtils
				.getBooksInfo(controlNo, customercode);
		ajaxOutPutText(booksInfo);
		return;
	}

}

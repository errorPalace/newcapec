package net.newcapec.campus.h5.http;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.newcapec.campus.quickaccess.utils.HttpRequestUtils;
import net.newcapec.campus.quickaccess.utils.Pboc3desmac;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * Created by wa on 2016/1/14.
 */
public class HttpCampusUtils {
	protected final transient Logger log = LoggerFactory.getLogger(this
			.getClass());
	private PreferenceUtils preferenceUtils;
	public String getAuthorSum(String author, String customercode) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "ZZSSZSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("author", author);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
				
					  Integer total = j.getInteger("total");
					JO.put("total", total);
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}
	
	public String getTitleSum(String title, String customercode) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "SMSSZSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("title", title);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
				
					  Integer total = j.getInteger("total");
					JO.put("total", total);
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}
	
	/**
	 * 根据学号获取个人正在借阅图书信息
	 * @param outid
	 * @param customercode
	 * @param pageSize
	 * @param page
	 * @return
	 */
	public String getNowBorrowFromPaging(String outid, String customercode,int pageSize,int page) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "ZZJYJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("outid", outid);
			data.put("page", page);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				int fromIndex = (page - 1) * pageSize;
				int toIndex = page * pageSize;
				if (bodyArray.size()<toIndex) {
					toIndex=bodyArray.size();
				}
				List<Object> subList = bodyArray.subList(fromIndex, toIndex);
				JSONArray dataArray = new JSONArray();
				for (Object O : subList) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					/**
					 * "借出时刻": 1459914791947, "借还标志": "O", "出版地": "北京      ",
					 * "出版日期": "2006      ", "出版者": "石油工业出版社          ", "复本数":
					 * 5, "实还时刻": 1459914791947, "应还时刻": 1461642808000, "拼音编码":
					 * "JXYMJFDQ  ", "控制号": 58176, "文献类型": "中文图书", "条形码":
					 * "0211351       ", "标准编号": "978-7-5021-5502-5   ", "标识列":
					 * 57952, "正题名":
					 * "即兴幽默技法大全                                                                                    "
					 * , "索取号": "H01/22                   ", "读者证号":
					 * "1504030010          ", "责任者":
					 * "谢伦浩主编                              ", "限还时刻":
					 * 1461642808000
					 **/
					Long borrowTime = j.getLong("借出时刻");
					JO.put("borrowTime", this.getStringDate(borrowTime));

					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);

					String placeofPublication = j.getString("出版地");
					JO.put("placeofPublication",
							placeofPublication.replaceAll(" ", ""));

					String publicationDate = j.getString("出版日期");
					JO.put("publicationDate",
							publicationDate.replaceAll(" ", ""));

					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));

					String duplicateNumber = j.getString("复本数");
					JO.put("duplicateNumber",
							duplicateNumber.replaceAll(" ", ""));

					Long realityTime = j.getLong("实还时刻");
					JO.put("realityTime", this.getStringDate(realityTime));
					Long oughtTime = j.getLong("应还时刻");
					JO.put("oughtTime", this.getStringDate(oughtTime));

					String pinyinNumber = j.getString("拼音编码");
					JO.put("pinyinNumber", pinyinNumber.replaceAll(" ", ""));

					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));

					String documentType = j.getString("文献类型");
					JO.put("documentType", documentType.replaceAll(" ", ""));

					String barCode = j.getString("条形码");
					JO.put("barCode", barCode.replaceAll(" ", ""));

					String standardNumber = j.getString("标准编号");
					JO.put("standardNumber", standardNumber.replaceAll(" ", ""));

					String identity = j.getString("标识列");
					JO.put("identity", identity.replaceAll(" ", ""));

					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));

					String callNumber = j.getString("索取号");
					JO.put("callNumber", callNumber.replaceAll(" ", ""));

					String readerID = j.getString("读者证号");
					JO.put("readerID", readerID.replaceAll(" ", ""));
					Long astrictTime = j.getLong("限还时刻");
					JO.put("astrictTime", this.getStringDate(astrictTime));

					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));

					//JO.put("betweenDay", this.daysBetween(new Date(borrowTime),new Date(oughtTime)));
					JO.put("betweenDay", this.daysBetween(new Date(System.currentTimeMillis()),new Date(astrictTime)));
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}
	
	public String getNowBorrow(String outid, String customercode,int page) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "ZZJYJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("outid", outid);
			data.put("page", page);
			data.put("outid1", outid);
			
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					/**
					 * "借出时刻": 1459914791947, "借还标志": "O", "出版地": "北京      ",
					 * "出版日期": "2006      ", "出版者": "石油工业出版社          ", "复本数":
					 * 5, "实还时刻": 1459914791947, "应还时刻": 1461642808000, "拼音编码":
					 * "JXYMJFDQ  ", "控制号": 58176, "文献类型": "中文图书", "条形码":
					 * "0211351       ", "标准编号": "978-7-5021-5502-5   ", "标识列":
					 * 57952, "正题名":
					 * "即兴幽默技法大全                                                                                    "
					 * , "索取号": "H01/22                   ", "读者证号":
					 * "1504030010          ", "责任者":
					 * "谢伦浩主编                              ", "限还时刻":
					 * 1461642808000
					 **/
					Long borrowTime = j.getLong("借出时刻");
					JO.put("borrowTime", this.getStringDate(borrowTime));

					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);

					String placeofPublication = j.getString("出版地");
					JO.put("placeofPublication",
							placeofPublication.replaceAll(" ", ""));

					String publicationDate = j.getString("出版日期");
					JO.put("publicationDate",
							publicationDate.replaceAll(" ", ""));

					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));

					String duplicateNumber = j.getString("复本数");
					JO.put("duplicateNumber",
							duplicateNumber.replaceAll(" ", ""));

					Long realityTime = j.getLong("实还时刻");
					JO.put("realityTime", this.getStringDate(realityTime));
					Long oughtTime = j.getLong("应还时刻");
					JO.put("oughtTime", this.getStringDate(oughtTime));

					String pinyinNumber = j.getString("拼音编码");
					JO.put("pinyinNumber", pinyinNumber.replaceAll(" ", ""));

					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));

					String documentType = j.getString("文献类型");
					JO.put("documentType", documentType.replaceAll(" ", ""));

					String barCode = j.getString("条形码");
					JO.put("barCode", barCode.replaceAll(" ", ""));

					String standardNumber = j.getString("标准编号");
					JO.put("standardNumber", standardNumber.replaceAll(" ", ""));

					String identity = j.getString("标识列");
					JO.put("identity", identity.replaceAll(" ", ""));

					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));

					String callNumber = j.getString("索取号");
					JO.put("callNumber", callNumber.replaceAll(" ", ""));

					String readerID = j.getString("读者证号");
					JO.put("readerID", readerID.replaceAll(" ", ""));
					Long astrictTime = j.getLong("限还时刻");
					JO.put("astrictTime", this.getStringDate(astrictTime));

					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));

					//JO.put("betweenDay", this.daysBetween(new Date(borrowTime),new Date(oughtTime)));
					JO.put("betweenDay", this.daysBetween(new Date(System.currentTimeMillis()),new Date(astrictTime)));
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	public String getHistoryBorrow(String outid, String customercode,int page) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "LSJYJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("outid", outid);
			data.put("page", page);
			data.put("outid1", outid);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					/**
					 * "借出时刻": 1459914791947, "借还标志": "O", "出版地": "北京      ",
					 * "出版日期": "2006      ", "出版者": "石油工业出版社          ", "复本数":
					 * 5, "实还时刻": 1459914791947, "应还时刻": 1461642808000, "拼音编码":
					 * "JXYMJFDQ  ", "控制号": 58176, "文献类型": "中文图书", "条形码":
					 * "0211351       ", "标准编号": "978-7-5021-5502-5   ", "标识列":
					 * 57952, "正题名":
					 * "即兴幽默技法大全                                                                                    "
					 * , "索取号": "H01/22                   ", "读者证号":
					 * "1504030010          ", "责任者":
					 * "谢伦浩主编                              ", "限还时刻":
					 * 1461642808000
					 **/
					Long borrowTime = j.getLong("借出时刻");
					JO.put("borrowTime", this.getStringDate(borrowTime));

					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);

					String placeofPublication = j.getString("出版地");
					JO.put("placeofPublication",
							placeofPublication.replaceAll(" ", ""));

					String publicationDate = j.getString("出版日期");
					JO.put("publicationDate",
							publicationDate.replaceAll(" ", ""));

					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));

					String duplicateNumber = j.getString("复本数");
					JO.put("duplicateNumber",
							duplicateNumber.replaceAll(" ", ""));

					Long realityTime = j.getLong("实还时刻");
					JO.put("realityTime", this.getStringDate(realityTime));
					Long oughtTime = j.getLong("应还时刻");
					JO.put("oughtTime", this.getStringDate(oughtTime));

					String pinyinNumber = j.getString("拼音编码");
					JO.put("pinyinNumber", pinyinNumber.replaceAll(" ", ""));

					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));

					String documentType = j.getString("文献类型");
					JO.put("documentType", documentType.replaceAll(" ", ""));

					String barCode = j.getString("条形码");
					JO.put("barCode", barCode.replaceAll(" ", ""));

					String standardNumber = j.getString("标准编号");
					JO.put("standardNumber", standardNumber.replaceAll(" ", ""));

					String identity = j.getString("标识列");
					JO.put("identity", identity.replaceAll(" ", ""));

					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));

					String callNumber = j.getString("索取号");
					JO.put("callNumber", callNumber.replaceAll(" ", ""));

					String readerID = j.getString("读者证号");
					JO.put("readerID", readerID.replaceAll(" ", ""));
					Long astrictTime = j.getLong("限还时刻");
					JO.put("astrictTime", this.getStringDate(astrictTime));

					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));

					JO.put("betweenDay", this.daysBetween(new Date(borrowTime),new Date(realityTime)));
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}
	
	/**
	 * 根据学号获取个人历史借阅信息
	 * @param outid
	 * @param customercode
	 * @param pageSize
	 * @param page
	 * @return
	 */
	public String getHistoryBorrowFromPaging(String outid, String customercode,int pageSize,int page) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "LSJYJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("outid", outid);
			data.put("page", page);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				int fromIndex = (page - 1) * pageSize;
				int toIndex = page * pageSize;
				if (bodyArray.size()<toIndex) {
					toIndex=bodyArray.size();
				}
				List<Object> subList = bodyArray.subList(fromIndex, toIndex);
				JSONArray dataArray = new JSONArray();
				for (Object O : subList) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					/**
					 * "借出时刻": 1459914791947, "借还标志": "O", "出版地": "北京      ",
					 * "出版日期": "2006      ", "出版者": "石油工业出版社          ", "复本数":
					 * 5, "实还时刻": 1459914791947, "应还时刻": 1461642808000, "拼音编码":
					 * "JXYMJFDQ  ", "控制号": 58176, "文献类型": "中文图书", "条形码":
					 * "0211351       ", "标准编号": "978-7-5021-5502-5   ", "标识列":
					 * 57952, "正题名":
					 * "即兴幽默技法大全                                                                                    "
					 * , "索取号": "H01/22                   ", "读者证号":
					 * "1504030010          ", "责任者":
					 * "谢伦浩主编                              ", "限还时刻":
					 * 1461642808000
					 **/
					Long borrowTime = j.getLong("借出时刻");
					JO.put("borrowTime", this.getStringDate(borrowTime));

					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);

					String placeofPublication = j.getString("出版地");
					JO.put("placeofPublication",
							placeofPublication.replaceAll(" ", ""));

					String publicationDate = j.getString("出版日期");
					JO.put("publicationDate",
							publicationDate.replaceAll(" ", ""));

					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));

					String duplicateNumber = j.getString("复本数");
					JO.put("duplicateNumber",
							duplicateNumber.replaceAll(" ", ""));

					Long realityTime = j.getLong("实还时刻");
					JO.put("realityTime", this.getStringDate(realityTime));
					Long oughtTime = j.getLong("应还时刻");
					JO.put("oughtTime", this.getStringDate(oughtTime));

					String pinyinNumber = j.getString("拼音编码");
					JO.put("pinyinNumber", pinyinNumber.replaceAll(" ", ""));

					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));

					String documentType = j.getString("文献类型");
					JO.put("documentType", documentType.replaceAll(" ", ""));

					String barCode = j.getString("条形码");
					JO.put("barCode", barCode.replaceAll(" ", ""));

					String standardNumber = j.getString("标准编号");
					JO.put("standardNumber", standardNumber.replaceAll(" ", ""));

					String identity = j.getString("标识列");
					JO.put("identity", identity.replaceAll(" ", ""));

					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));

					String callNumber = j.getString("索取号");
					JO.put("callNumber", callNumber.replaceAll(" ", ""));

					String readerID = j.getString("读者证号");
					JO.put("readerID", readerID.replaceAll(" ", ""));
					Long astrictTime = j.getLong("限还时刻");
					JO.put("astrictTime", this.getStringDate(astrictTime));

					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));

					JO.put("betweenDay", this.daysBetween(new Date(borrowTime),new Date(realityTime)));
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	public String getLibraryUserInfo(String outid, String customercode,
			String likeType) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "GRZLJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("outid", outid);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					/**
					 * "借出册数": 0, "允借册数": 2, "办证日期": "2016.03.28", "终止日期":
					 * "2019.07.31", "读者单位":
					 * "15级装潢班                                                                                          "
					 * , "读者口令": "26334X              ", "读者姓名": "尹梦怡    ",
					 * "读者性别": "女", "读者证号": "1504030010          ", "读者身份":
					 * "学生      ", "身份证号": "41048219960926334X  "
					 **/
					Integer loanNumber = j.getInteger("借出册数");
					JO.put("loanNumber", loanNumber);

					Integer allowNumber = j.getInteger("允借册数");
					JO.put("allowNumber", allowNumber);

					String certificateDate = j.getString("办证日期");
					JO.put("certificateDate",
							certificateDate.replaceAll(" ", ""));

					String endDate = j.getString("终止日期");
					JO.put("endDate", endDate.replaceAll(" ", ""));

					String readerAddress = j.getString("读者单位");
					JO.put("readerAddress", readerAddress.replaceAll(" ", ""));

					String readerCommond = j.getString("读者口令");
					JO.put("readerCommond", readerCommond.replaceAll(" ", ""));

					String readerName = j.getString("读者姓名");
					JO.put("readerName", readerName.replaceAll(" ", ""));

					String readerSex = j.getString("读者性别");
					JO.put("readerSex", readerSex.replaceAll(" ", ""));

					String readerNumber = j.getString("读者证号");
					JO.put("readerNumber", readerNumber.replaceAll(" ", ""));

					String readerStatus = j.getString("读者身份");
					JO.put("readerStatus", readerStatus.replaceAll(" ", ""));

					String IDNumber = j.getString("身份证号");
					JO.put("IDNumber", IDNumber.replaceAll(" ", ""));

					JO.put("likeType", likeType);

					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	public String getBooksInfo(String controlNo, String customercode) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "TSXQJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("controlNo", controlNo);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					String placeofPublication = j.getString("出版地");
					JO.put("placeofPublication",
							placeofPublication.replaceAll(" ", ""));

					String publicationDate = j.getString("出版日期");
					JO.put("publicationDate",
							publicationDate.replaceAll(" ", ""));

					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));

					String duplicateNumber = j.getString("复本数");
					JO.put("duplicateNumber",
							duplicateNumber.replaceAll(" ", ""));

					String pinyinNumber = j.getString("拼音编码");
					JO.put("pinyinNumber", pinyinNumber.replaceAll(" ", ""));

					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));

					String documentType = j.getString("文献类型");
					JO.put("documentType", documentType.replaceAll(" ", ""));

					String standardNumber = j.getString("标准编号");
					JO.put("standardNumber", standardNumber.replaceAll(" ", ""));

					String identity = j.getString("标识列");
					JO.put("identity", identity.replaceAll(" ", ""));

					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));

					String callNumber = j.getString("索取号");
					JO.put("callNumber", callNumber.replaceAll(" ", ""));

					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));

					// 下面的是借出过才有的

					String borrowSign = j.getString("借还标志");

					JO.put("borrowSign", "O".equals(borrowSign)?true:false);
					if (StringUtils.isNotBlank(borrowSign)) {
						Long borrowTime = j.getLong("借出时刻");
						JO.put("borrowTime", this.getStringDate(borrowTime));
						Long realityTime = j.getLong("实还时刻");
						JO.put("realityTime", this.getStringDate(realityTime));
						Long oughtTime = j.getLong("应还时刻");
						JO.put("oughtTime", this.getStringDate(oughtTime));
						String barCode = j.getString("条形码");
						JO.put("barCode", barCode.replaceAll(" ", ""));
						String readerID = j.getString("读者证号");
						JO.put("readerID", readerID.replaceAll(" ", ""));
						Long astrictTime = j.getLong("限还时刻");
						JO.put("astrictTime", this.getStringDate(astrictTime));
						
						JO.put("betweenDay", this.daysBetween(new Date(borrowTime),new Date(oughtTime)));
						
					}
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	public String getStringDate(Long dateLong) {
		Date date = new Date(dateLong);
		// 将Date类型格式化
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		return sdf.format(date);
	}

	public static int daysBetween(Date smdate, Date bdate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		smdate = sdf.parse(sdf.format(smdate));
		bdate = sdf.parse(sdf.format(bdate));
		Calendar cal = Calendar.getInstance();
		cal.setTime(smdate);
		long time1 = cal.getTimeInMillis();
		cal.setTime(bdate);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);

		return Integer.parseInt(String.valueOf(between_days));
	}

	/**
	 * 获取图书馆相关信息
	 * 
	 * @param token
	 * @return
	 */
	public String getLibraryDataByAuthor(String author,int page,
			String author1, String customercode,String count) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "ZZSSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("author", author);
			data.put("page", page);
			data.put("author1", author1);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					String Pubdate = j.getString("出版日期");
					JO.put("Pubdate", Pubdate.replaceAll(" ", ""));
					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));
					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));
					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));
					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));
					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);
					dataArray.add(JO);
				}
				JSONObject rdata = new JSONObject();
				rdata.put("dataArray", dataArray);
				rdata.put("count", count);
				
				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", rdata);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}
	
	/**
	 * 根据作者查询图书信息(假分页)
	 * @param author
	 * @param pageSize
	 * @param page
	 * @param customercode
	 * @param count
	 * @return
	 */
	public String getLibraryDataByAuthorFromPaging(String author,int pageSize,int page,
			 String customercode,String count) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "ZZSSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("author", author);
			data.put("page", page);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				int fromIndex = (page - 1) * pageSize;
				int toIndex = page * pageSize;
				if (bodyArray.size()<toIndex) {
					toIndex=bodyArray.size();
				}
				List<Object> subList = bodyArray.subList(fromIndex, toIndex);
				JSONArray dataArray = new JSONArray();
				for (Object O : subList) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					String Pubdate = j.getString("出版日期");
					JO.put("Pubdate", Pubdate.replaceAll(" ", ""));
					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));
					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));
					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));
					String authors = j.getString("责任者");
					JO.put("author", authors.replaceAll(" ", ""));
					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);
					dataArray.add(JO);
				}
				JSONObject rdata = new JSONObject();
				rdata.put("dataArray", dataArray);
				rdata.put("count", count);
				
				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", rdata);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	/**
	 * 获取图书馆相关信息
	 * 
	 * @param token
	 * @return
	 */
	public String getLibraryDataBypinyin(String pinYin, int page,
			String pinYin1, String customercode) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "PYSSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("pinYin", pinYin);
			data.put("page", page);
			data.put("pinYin1", pinYin1);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					String Pubdate = j.getString("出版日期");
					JO.put("Pubdate", Pubdate.replaceAll(" ", ""));
					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));
					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));
					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));
					String author = j.getString("责任者");
					JO.put("author", author.replaceAll(" ", ""));
					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);
					dataArray.add(JO);
				}

				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				result.put("data", dataArray);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	/**
	 * 获取图书馆相关信息根据名字
	 * 
	 * @param token
	 * @return
	 */
	public String getLibraryDataByName(String title, int page, String title1,
			String customercode,String count) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "SMSSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("title", title);
			data.put("page", page);
			data.put("title1", title1);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				JSONArray dataArray = new JSONArray();
				for (Object O : bodyArray) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					String Pubdate = j.getString("出版日期");
					JO.put("Pubdate", Pubdate.replaceAll(" ", ""));
					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));
					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));
					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));
					String author = j.getString("责任者");
					JO.put("author", author.replaceAll(" ", ""));
					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);
					dataArray.add(JO);
				}
				JSONObject rdata = new JSONObject();
				rdata.put("dataArray", dataArray);
				rdata.put("count", count);
				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				
				result.put("data", rdata);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}
	
	/**
	 * 获取图书馆相关信息根据名字(假分页)
	 * @param title
	 * @param page
	 * @param customercode
	 * @param count
	 * @return
	 */
	public String getLibraryDataByNameFromPaging(String title,int pageSize,int page,
			String customercode,String count) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlPreSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("command", "SMSSJK");
			requestData.put("flag", flag);
			requestData.put("customercode", customercode);
			JSONObject data = new JSONObject();
			data.put("title", title);
			requestData.put("param", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			JSONObject repDate = JSONObject.parseObject(bossInfoStr);
			if (repDate.getIntValue("code_") == 0) {
				String body = repDate.getString("body");
				JSONArray bodyArray = JSONArray.parseArray(body);
				int fromIndex = (page - 1) * pageSize;
				int toIndex = page * pageSize; 
				if (bodyArray.size()<toIndex) {
					toIndex=bodyArray.size();
				}
				List<Object> subList = bodyArray.subList(fromIndex, toIndex);
				JSONArray dataArray = new JSONArray();
				for (Object O : subList) {
					JSONObject JO = new JSONObject();
					JSONObject j = (JSONObject) O;
					String Pubdate = j.getString("出版日期");
					JO.put("Pubdate", Pubdate.replaceAll(" ", ""));
					String press = j.getString("出版者");
					JO.put("press", press.replaceAll(" ", ""));
					String controlNumber = j.getString("控制号");
					JO.put("controlNumber", controlNumber.replaceAll(" ", ""));
					String titleProper = j.getString("正题名");
					JO.put("titleProper", titleProper.replaceAll(" ", ""));
					String author = j.getString("责任者");
					JO.put("author", author.replaceAll(" ", ""));
					String borrowSign = j.getString("借还标志");
					JO.put("borrowSign", "O".equals(borrowSign)?true:false);
					dataArray.add(JO);
				}
				JSONObject rdata = new JSONObject();
				rdata.put("dataArray", dataArray);
				rdata.put("count", count);
				result.put("result_", true);
				result.put("code_", 0);
				result.put("message_", "成功");
				
				result.put("data", rdata);
				return result.toJSONString();

			} else {
				String message_ = repDate.getString("message_");
				result.put("result_", false);
				result.put("code_", 99);
				result.put("message_", message_);
				return result.toJSONString();
			}

		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result.toJSONString();
		}

	}

	public JSONObject getUseJsapi(String shareURL) {
		JSONObject result = new JSONObject();

		Map<String, String> requestData = new HashMap<String, String>();
		requestData.put("url", shareURL);
		long startTime = System.currentTimeMillis();
		String url = preferenceUtils.getWXUrl();
		try {
			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);
			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));
			return JSONObject.parseObject(bossInfoStr);

		} catch (IOException e) {
			e.printStackTrace();
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "调取微信接口失败");
			return result;
		}

	}

	/**
	 * 从玩校获取用户信息
	 * 
	 * @param token
	 * @return
	 */
	public JSONObject getUserByToken(String token) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrl();
			String flag = preferenceUtils.getCampusFlag();
			String key = preferenceUtils.getCampusKey();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("token", token);
			requestData.put("flag", flag);
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);

			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));

			JSONObject bossInfoJson = JSONObject.parseObject(bossInfoStr);

			boolean result_ = bossInfoJson.getBooleanValue("result_");

			if (!result_) {
				log.error("获取用户信息失败, token:" + token);
				return null;
			} else {
				// data内部name String 姓名
				// data内部stuNo String 学号（可能没有）
				// data内部userId String 用户唯一标识
				// data内部isBindEcard boolean true : 绑了卡 false : 没绑卡
				// data内部sex String 性别
				// data内部nickname String 昵称
				// data内部customerId String 学校id
				// data内部customerCode String 学校编码
				// data内部customerName String 学校名称
				// data内部customPic String 头像
				// data内部userAccount String 头像

				JSONObject dataJson = bossInfoJson.getJSONObject("data");
				String mobile = dataJson.getString("userAccount");
				String name = dataJson.getString("name");
				String userId = dataJson.getString("userId");
				if (name.equals("游客")) {
					return null;
				}
				result.put("userId", userId);
				result.put("name", name);
				result.put("mobile", mobile);
				return result;
			}
		} catch (Exception e) {
			log.error(null, e);
			return null;
		}
	}

	/**
	 * 从玩校获取用户信息
	 * 
	 * @param token
	 * @return
	 */
	public JSONObject getUserByTokenSys(String token) {
		JSONObject result = new JSONObject();
		try {
			String url = preferenceUtils.getCampusUrlSys();
			String flag = preferenceUtils.getCampusFlagSys();
			String key = preferenceUtils.getCampusKeySys();

			Map<String, String> requestData = new HashMap<String, String>();

			requestData.put("service", "userInfo");
			requestData.put("flag", flag);
			JSONObject data = new JSONObject();
			data.put("accountOrId", token);
			data.put("type", 3);

			requestData.put("data", data.toJSONString());
			String sign = Pboc3desmac.sign(requestData, key, false);
			requestData.put("sign", sign);

			long startTime = System.currentTimeMillis();

			String bossInfoStr = HttpRequestUtils.sendHttpRequestForm(url,
					requestData);

			long endTime = System.currentTimeMillis();
			log.info("耗时:" + (endTime - startTime));

			JSONObject bossInfoJson = JSONObject.parseObject(bossInfoStr);

			boolean result_ = bossInfoJson.getBooleanValue("result_");

			if (!result_) {
				log.error("获取用户信息失败, token:" + token);
				return null;
			} else {
				Long userId = bossInfoJson.getLong("userId");
				String name = bossInfoJson.getString("name");
				String sex = bossInfoJson.getString("sex");
				String stuNo = bossInfoJson.getString("stuNo");
				String nickname = bossInfoJson.getString("nickname");
				String customPic = bossInfoJson.getString("customPic");
				String outid = bossInfoJson.getString("outid");
				String mobile = bossInfoJson.getString("mobile");
				boolean bindEcard = bossInfoJson.getBoolean("bindEcard");
				boolean bindMobile = bossInfoJson.getBoolean("bindMobile");
				String customerId = bossInfoJson.getString("customerId");
				String customerName = bossInfoJson.getString("customerName");
				String customerCode = bossInfoJson.getString("customerCode");
				if (name.equals("游客")) {
					return null;
				}
				result.put("userId", userId);
				result.put("name", name);
				result.put("sex", sex);
				result.put("nickname", nickname);
				result.put("customPic", customPic);
				result.put("outid", outid);
				result.put("bindEcard", bindEcard);
				result.put("customerId", customerId);
				result.put("customerName", customerName);
				result.put("customerCode", customerCode);
				result.put("bindMobile", bindMobile);
				result.put("mobile", mobile);
				result.put("stuNo", stuNo);
				return result;
			}
		} catch (Exception e) {
			result.put("result_", false);
			result.put("code_", 99);
			result.put("message_", "玩校接口调用失败！");
			return result;
		}
	}

	public PreferenceUtils getPreferenceUtils() {
		return preferenceUtils;
	}

	public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}
}

package net.newcapec;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import junit.framework.TestCase;
import net.newcapec.campus.quickaccess.utils.HttpRequestUtils;
import net.newcapec.campus.quickaccess.utils.Pboc3desmac;

import org.junit.Test;

/**
 * 接口测试
 *
 */
public class IfaceServiceTest  {

	public static void main(String[] args) throws IOException {
		//String url = "https://iface.17wanxiao.com/cam_iface/invoke.action";
		String url = "http://192.168.156.118:8001/cam_iface/invoke.action";

		Map<String, String> requestData = new HashMap<String, String>();

		requestData.put("appId", "ecc2be0e7f79420788cc3c6d01219ad1");
		requestData.put("customerCode", "44");
		//requestData.put("appId", "zzdx001");
		//requestData.put("customerCode", "44");

		//requestData.put("command", "S08001");
		requestData.put("command", "QueryUserByOutid");
		//requestData.put("command", "GetQcToken");
		//requestData.put("command", "QuerySignBankList");
		requestData.put("command", "AuthenticationContrast");

		//requestData.put("command", "QuerySchoolListByEcard");
		//requestData.put("command", "IdentityUserByOutid");
		//requestData.put("command", "QueryTrade");
		//requestData.put("command", "QueryDepartmentByCode");
		//requestData.put("command", "QueryConsumDetails");
		String para =   "{'outid':'150340','password':'274038','dpcode':'00000000','name_1':'张鹏','cardsfid_3':'8'}";


		//requestData.put("param", "{'outid':'000803','password':'888888',}");
		//String para =   " {'outid':'1400190006','cardSnr':'2515','type':2,'password':'888888','mobile':'18939512691','beginIndex': 0,'count': 10,'beginDate': '2001-01-01','endDate': '2015-09-01'}";
		//String para =   "{\"stuNo\": \"2015082901\"}";
		//String para =   "{\"outid\": \"000803\",\"password\": \"100001\"}";
		requestData.put("param", para);
		//String key = "112113";
		String key = "34A4867A851A61E55DA4D685890BC176";
		String sign = Pboc3desmac.sort(requestData);
		String signTemp = "key=34A4867A851A61E55DA4D685890BC176&"+sign;
		System.out.println("返回结果1"+signTemp);
		String sig = Pboc3desmac.string2MD5(signTemp);
		System.out.println("返回结果"+sig);
		requestData.put("sign", sig.toUpperCase());
		//String sign = Pboc3desmac.sign(requestData, SIGN_KEY);
		//requestData.put("sign", sign);
		String result = HttpRequestUtils.sendHttpRequestForm(url, requestData);
		System.out.println("返回结果"+result);
//		responseData:{"olid":109,"code":"success","msg":"成功","Parameters":null}
	}
}

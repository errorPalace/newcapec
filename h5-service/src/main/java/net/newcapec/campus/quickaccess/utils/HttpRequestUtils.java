package net.newcapec.campus.quickaccess.utils;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.quickaccess.exception.IfaceServerExecuteErrorException;
import net.newcapec.campus.quickaccess.exception.IfaceServerParamErrorException;
import org.apache.commons.io.IOUtils;
import org.apache.http.*;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.SSLContext;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HttpRequestUtils {

	protected static final transient Logger LOGGER = LoggerFactory.getLogger(HttpRequestUtils.class);

	//	protected final static HttpClient HTTP_CLIENT = HttpClientBuilder.create().build();

	private PreferenceUtils preferenceUtils;

	public void setIfaceserverPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}

	static RegistryBuilder<ConnectionSocketFactory> registryBuilder = RegistryBuilder
			.<ConnectionSocketFactory> create();
	static {
		ConnectionSocketFactory plainSF = new PlainConnectionSocketFactory();
		registryBuilder.register("http", plainSF);
		SSLContext ssl = SSLContexts.createSystemDefault();
		SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(ssl);
		registryBuilder.register("https", sslsf);
		//SSLConnectionSocketFactory sslConnectionSocketFactory =
		/*try {
			SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				//信任所有
				public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
					return true;
				}
			}).build();

			//SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);
			LayeredConnectionSocketFactory sslSF = new SSLConnectionSocketFactory(sslContext, new String[]{"TLSv1"},
					null, SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
			registryBuilder.register("https", sslSF);
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}*/
	}

	public static PoolingHttpClientConnectionManager manager = new PoolingHttpClientConnectionManager(
			registryBuilder.build());
	static {
		manager.setMaxTotal(20);
		manager.setDefaultMaxPerRoute(5);
	}

	public static HttpClient HTTP_CLIENT = HttpClients.custom().setConnectionManager(manager).build();

	/**
	 * 玩校业务处理请求
	 * 
	 * @param command
	 * @param customerCode
	 * @param param
	 * @return
	 * @throws IfaceServerExecuteErrorException
	 */
	public String sendHttpRequestJson(String command, String customerCode, String param)
			throws IfaceServerExecuteErrorException, IfaceServerParamErrorException {
		long beginTime = System.currentTimeMillis();
		Map<String, String> tokenMap = new HashMap<String, String>();
		tokenMap.put("command", command);
		tokenMap.put("customercode", customerCode);
		tokenMap.put("param", param);
		tokenMap.put("flag", preferenceUtils.getOpenCampusFlag());
		String sign = Pboc3desmac.sign(tokenMap, preferenceUtils.getOpenCampusSign());
		//请求玩校获取信息
		tokenMap.put("sign", sign);

		String responseInfo = "";
		try {
			responseInfo = sendHttpRequestForm(preferenceUtils.getOpenCampusUrl(), tokenMap);
			LOGGER.debug("本次处理完成，应答数据：[{}], 耗费时间：{}毫秒", responseInfo, System.currentTimeMillis() - beginTime);
			JSONObject rtJsonObject = null;
			rtJsonObject = JSONObject.parseObject(responseInfo);
			String code = rtJsonObject.getString("code_");
			String result = rtJsonObject.getString("result_");
			if ("0".equals(code) && "true".equals(result)) {
				String body = rtJsonObject.getString("body");
				//JSONObject bodyObject = JSONObject.parseObject(body);
				return body;
				//				String bodyResult = bodyObject.getString("_result");
				//				if("true".equals(bodyResult)){
				//					return bodyObject.toJSONString();
				//				}else{
				//					throw new IfaceServerParamErrorException("处理异常",responseInfo);
				//				}
			} else {
				throw new IfaceServerExecuteErrorException("处理异常", responseInfo);
			}
		} catch (IfaceServerExecuteErrorException e) {
			throw new IfaceServerExecuteErrorException("处理异常", e.getBody());
		} catch (Exception e) {
			throw new IfaceServerExecuteErrorException("处理异常", responseInfo + e.getMessage());
		}
	}

	/**
	 * 玩校第三方业务处理请求
	 * http://server.17wanxiao.com/campus/cam_iface/thirdServiceForSys.action
	 * 
	 * @param tokenMap
	 * @return
	 * @throws IfaceServerExecuteErrorException
	 */
	public String sendThirdServiceForSysJson(Map<String, String> tokenMap) throws IfaceServerExecuteErrorException {
		long beginTime = System.currentTimeMillis();
		tokenMap.put("flag", preferenceUtils.getOpenCampusFlag());
		String sign = Pboc3desmac.sign(tokenMap, preferenceUtils.getOpenCampusSign());
		//请求玩校获取信息
		tokenMap.put("sign", sign);

		String responseInfo = "";
		try {
			responseInfo = sendHttpRequestForm(preferenceUtils.getOpenCampusUrl(), tokenMap);
			LOGGER.debug("本次处理完成，应答数据：[{}], 耗费时间：{}毫秒", responseInfo, System.currentTimeMillis() - beginTime);
		} catch (Exception e) {
			throw new IfaceServerExecuteErrorException("处理异常", responseInfo + e.getMessage());
		}
		return responseInfo;
	}

	/**
	 * @param url
	 * @param requestData
	 * 
	 * 
	 *            key：requestJsonData key:sign
	 * 
	 * @return
	 * @throws IOException
	 */
	public static String sendHttpRequestForm(String url, Map<String, String> requestData) throws IOException {
		LOGGER.debug("requestData:{}", requestData); // 打印结果页面
		//		LOGGER.debug("requestData:" + JSONObject.toJSONString(requestData)); // 打印结果页面

		// 封装请求内容
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		for (Map.Entry<String, String> entity : requestData.entrySet()) {
			params.add(new BasicNameValuePair(entity.getKey(), entity.getValue()));
		}
		HttpEntity formEntity = new UrlEncodedFormEntity(params, Consts.UTF_8);
		return sendHttpRequestForm(url, formEntity);
	}

	private final static String sendHttpRequestForm(String url, HttpEntity formEntity) throws IOException {
		// 使用http post方法请求
		HttpPost httpPost = new HttpPost(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(15000).build();
		httpPost.setConfig(requestConfig);
		httpPost.addHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		// 设置请求内容
		httpPost.setEntity(formEntity);

		// 发送请求
		HttpResponse response = HTTP_CLIENT.execute(httpPost);
		// 请求成功结果处理
		LOGGER.debug("StatusLine:" + response.getStatusLine()); // 打印结果页面
		// 获取应答数据
		HttpEntity entity = response.getEntity();
		InputStream is = entity.getContent();
		Header encodingHeader = entity.getContentEncoding();
		Charset contentEncoding = encodingHeader == null ? Consts.UTF_8 : Charset.forName(encodingHeader.getValue());

		BufferedReader reader = new BufferedReader(new InputStreamReader(is, contentEncoding));
		String responseData = IOUtils.toString(reader);
		LOGGER.debug("responseData:{}", responseData); // 打印结果页面
		EntityUtils.consume(entity);
		return responseData;
	}

	public final static String get(String url) throws IOException {
		LOGGER.debug("requestData:{}", url);
		// 使用http post方法请求
		HttpGet httpGet = new HttpGet(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(15000).build();
		httpGet.setConfig(requestConfig);
		// 发送请求
		HttpResponse response = HTTP_CLIENT.execute(httpGet);

		// 请求成功结果处理
		LOGGER.debug("StatusLine:" + response.getStatusLine()); // 打印结果页面
		// 获取应答数据
		HttpEntity entity = response.getEntity();
		InputStream is = entity.getContent();
		Header encodingHeader = entity.getContentEncoding();
		Charset contentEncoding = encodingHeader == null ? Consts.UTF_8 : Charset.forName(encodingHeader.getValue());

		BufferedReader reader = new BufferedReader(new InputStreamReader(is, contentEncoding));
		String responseData = IOUtils.toString(reader);
		LOGGER.debug("responseData:{}", responseData); // 打印结果页面
		EntityUtils.consume(entity);
		return responseData;
	}

	public final static int httpClientGet(String url) {
		int statusCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
		LOGGER.debug("requestData:{}", url);
		// 使用http post方法请求
		HttpGet httpGet = new HttpGet(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(15000).build();
		httpGet.setConfig(requestConfig);
		// 发送请求
		HttpResponse response;
		try {
			response = HTTP_CLIENT.execute(httpGet);
			// 请求成功结果处理
			LOGGER.debug("StatusLine:" + response.getStatusLine()); // 打印结果页面
			statusCode = response.getStatusLine().getStatusCode();
		} catch (ClientProtocolException e) {
			LOGGER.error("连接url【{}】时，协议异常:{}", url, e);

		} catch (IOException e) {
			LOGGER.error("连接url【{}】时，I/O异常:{}", url, e);
		}
		return statusCode;
	}

	public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}
	
}

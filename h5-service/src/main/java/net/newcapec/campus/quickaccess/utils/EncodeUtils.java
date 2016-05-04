package net.newcapec.campus.quickaccess.utils;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EncodeUtils {
    protected static final transient Logger logger = LoggerFactory.getLogger(EncodeUtils.class);

    /**
     * 对称加密
     *
     * @param respmessage
     * @param workKey
     * @throws GeneralSecurityException
     * @throws UnsupportedEncodingException
     */
    public static String EncryptDES(String resultjson, String workKey)
            throws UnsupportedEncodingException, GeneralSecurityException {
        byte[] resultData = tEncryptDES(workKey.getBytes("UTF-8"), resultjson.getBytes("UTF-8"));
        String jsonStringData = Base64.encodeBase64String(resultData);
        return jsonStringData;

    }

    public static byte[] tEncryptDES(byte[] key, byte[] datasource) throws GeneralSecurityException {
        SecureRandom random = new SecureRandom();
        DESKeySpec desKey = new DESKeySpec(key);
        // 创建一个密匙工厂，然后用它把DESKeySpec转换成
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey securekey = keyFactory.generateSecret(desKey);
        // Cipher对象实际完成加密操作
        Cipher cipher = Cipher.getInstance("DES");
        // 用密匙初始化Cipher对象
        cipher.init(Cipher.ENCRYPT_MODE, securekey, random);
        // 现在，获取数据并加密
        // 正式执行加密操作
        return cipher.doFinal(datasource);
    }

    /**
     * 对称解密
     *
     * @param workKey
     * @param data
     * @return 解密失败返回null
     */
    public static String decrypt(String workKey, String data) {
        try {
            byte[] enbyte = tDecryptDES(workKey.getBytes("UTF-8"), Base64.decodeBase64(data));
            String jsonStringData = new String(enbyte, "UTF-8");
            return jsonStringData;
        } catch (Exception e) {
            logger.error("返回信息解密错误：" + e.getMessage());
            return null;
        }
    }

    public static byte[] tDecryptDES(byte[] key, byte[] datasource) throws GeneralSecurityException {
        //		SecureRandom random = new SecureRandom();
        DESKeySpec desKey = new DESKeySpec(key);
        // 创建一个密匙工厂，然后用它把DESKeySpec转换成
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey securekey = keyFactory.generateSecret(desKey);
        // Cipher对象实际完成解密操作
        Cipher cipher = Cipher.getInstance("DES");
        // 用密匙初始化Cipher对象
        cipher.init(Cipher.DECRYPT_MODE, securekey);
        // 现在，获取数据并解密
        // 正式执行解密操作
        return cipher.doFinal(datasource);
    }

    /**
     * 对称解密
     * 不做Base64解码
     *
     * @param workKey
     * @param data
     * @return
     */
    @Deprecated
    public static String decryptToHex(String workKey, String data) {
        try {
            byte[] enbyte = tDecryptDES(workKey.getBytes("UTF-8"), data.getBytes("UTF-8"));
            String jsonStringData = new String(enbyte, "UTF-8");
            return jsonStringData;
        } catch (Exception e) {
            logger.error("返回信息解密错误：" + e.getMessage());
            return null;
        }
    }

    public static void main(String[] args) throws UnsupportedEncodingException, GeneralSecurityException {

        System.out.println(EncryptDES("HEEoeWlc8QnB5HAMZtMMscYTveCtjPWX", "campus_weixin.1a"));
        System.out.println(decrypt("campus_weixin.1a", "HEEoeWlc8QnB5HAMZtMMscYTveCtjPWX"));

        System.out.println(DeviceType.dected("android"));
    }
}

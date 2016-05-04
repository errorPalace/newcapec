package net.newcapec.campus.quickaccess.utils;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.*;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;

/**
 * 三重加密 3DES也作 Triple DES,
 *
 * @author stone
 * @date 2014-03-10 02:14:37
 */
public class DESedeCoderTest {
    // 算法名称
    public static final String KEY_ALGORITHM = "DESede";
    // 算法名称/加密模式/填充方式
    public static final String CIPHER_ALGORITHM_ECB = "DESede/ECB/PKCS5Padding";
    public static final String CIPHER_ALGORITHM_CBC = "DESede/CBC/PKCS5Padding";
    private static final transient String defaultKey = "wpdk3k56wpdk3k56wpdk3k56";
    private String defaultIv = "12345678";

    private SecretKey secretKey;
    private Cipher cipher;
    private byte[] encryptData;
    private TripleDesMode desMode;

    public enum TripleDesMode{
        ECB,CBC
    }

    public static void main(String[] args) throws Exception {
        DESedeCoderTest tripleDES = new DESedeCoderTest(TripleDesMode.CBC,"123456781234567812345678");
        String encryptHex = tripleDES.encrypt("jdbc:mysql://localhost:3306/CAMPUS_QUICKACCESS").getHexString();
        System.out.println("加密后：" + encryptHex);
        System.out.println("解密后：" + tripleDES.decryptByHexString(encryptHex).getString());

        tripleDES = new DESedeCoderTest(TripleDesMode.CBC,"123456781234567812345678");
        encryptHex = tripleDES.encrypt("jdbc:mysql://localhost:3306/CAMPUS_QUICKACCESS").getHexString();
        System.out.println("加密后：" + encryptHex);
        System.out.println("解密后：" + tripleDES.decryptByHexString(encryptHex).getString());

        System.out.println( tripleDES.decryptByBase64("88LAZrLz9wYa5M9VbtdvJBIv/QpB5Cvn").getString());

		/*DESedeCoder des = new DESedeCoder("CBC","12345678");
        String de =des.decryptByHexString("28dba02eb5f6dd475d82e3681c83bb77").getString();
		System.out.println("解密后：" + de);*/
    }

    public DESedeCoderTest() {
        this(TripleDesMode.ECB, defaultKey);
    }

    /**
     * 创建一个新的实例 3DES. 默认为ECB模式
     *
     * @param key 密钥文本,至少为24位，并且为8的倍数
     * @throws Exception
     */
    public DESedeCoderTest(String key) {
        this(TripleDesMode.ECB, key);
    }

    /**
     * 创建一个新的实例 TripleDES.
     *
     * @param mode 模式： ECB \ CBC
     * @param key  密钥文本
     */
    public DESedeCoderTest(TripleDesMode mode, String key, String... iv) {
        desMode = mode;
        try {
            if (mode == TripleDesMode.ECB) {
                //			cipher = Cipher.getInstance(KEY_ALGORITHM);
                cipher = Cipher.getInstance(CIPHER_ALGORITHM_ECB);

                DESedeKeySpec desKeySpec = new DESedeKeySpec(key.getBytes());
                SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(KEY_ALGORITHM);
                secretKey = keyFactory.generateSecret(desKeySpec);
            } else if (mode == TripleDesMode.CBC) {
                cipher = Cipher.getInstance(CIPHER_ALGORITHM_CBC);

                defaultIv = (iv!=null && iv.length>0)?iv[0]:defaultIv;

                DESedeKeySpec desKeySpec = new DESedeKeySpec(key.getBytes());
                SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(KEY_ALGORITHM);
                secretKey = keyFactory.generateSecret(desKeySpec);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 加密
     *
     * @param str 要加密的字符串
     * @return 自身实例
     * @throws InvalidKeyException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws Exception
     */
    public DESedeCoderTest encrypt(String str) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {
        if(this.desMode == TripleDesMode.CBC){
            cipher.init(Cipher.ENCRYPT_MODE,this.secretKey,new IvParameterSpec(defaultIv.getBytes()));
        }else{
            cipher.init(Cipher.ENCRYPT_MODE, this.secretKey);
        }
        encryptData = cipher.doFinal(str.getBytes());
        return this;
    }

    /**
     * 解密
     *
     * @param encrypt
     * @return
     * @throws Exception
     */
    public DESedeCoderTest decrypt(byte[] encrypt) throws Exception {
        if(this.desMode == TripleDesMode.CBC){
            cipher.init(Cipher.DECRYPT_MODE,this.secretKey,new IvParameterSpec(defaultIv.getBytes()));
        }else{
            cipher.init(Cipher.DECRYPT_MODE, this.secretKey);
        }
        encryptData = cipher.doFinal(encrypt);
        return this;
    }

    /**
     * 解密
     *
     * @param base64Str base64字符串
     * @return
     * @throws Exception
     */
    public DESedeCoderTest decryptByBase64(String base64Str) throws Exception {
        cipher.init(Cipher.DECRYPT_MODE, this.secretKey);
        encryptData = cipher.doFinal(decodeBase64(base64Str));
        return this;
    }

    public DESedeCoderTest decryptByHexString(String base64Str) throws Exception {
        if(this.desMode == TripleDesMode.CBC){
            cipher.init(Cipher.DECRYPT_MODE,this.secretKey,new IvParameterSpec(defaultIv.getBytes()));
        }else{
            cipher.init(Cipher.DECRYPT_MODE, this.secretKey);
        }
        encryptData = cipher.doFinal(hexStringToBytes(base64Str));
        return this;
    }

    public String getString(String... enc) {
        checkEncryptData();
        try {
            if (enc.length > 0)
                return new String(encryptData, enc[0]);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return new String(encryptData);
    }

    public byte[] getBytes(String ss) {
        checkEncryptData();
        byte digest[] = new byte[ss.length() / 2];
        for (int i = 0; i < digest.length; i++) {
            String byteString = ss.substring(2 * i, 2 * i + 2);
            int byteValue = Integer.parseInt(byteString, 16);
            digest[i] = (byte) byteValue;
        }

        return digest;
    }

    /**
     * Convert hex string to byte[]
     *
     * @param hexString the hex string
     * @return byte[]
     */
    public static byte[] hexStringToBytes(String hexString) {
        if (hexString == null || hexString.equals("")) {
            return null;
        }
        hexString = hexString.toUpperCase();
        int length = hexString.length() / 2;
        char[] hexChars = hexString.toCharArray();
        byte[] d = new byte[length];
        for (int i = 0; i < length; i++) {
            int pos = i * 2;
            d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
        }
        return d;
    }

    private static byte charToByte(char c) {
        return (byte) "0123456789ABCDEF".indexOf(c);
    }

    /**
     * @return String
     * @Title: toHexString
     * @Description: byte转成16进制
     */
    public String getHexString() {
        checkEncryptData();
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < encryptData.length; i++) {
            String plainText = Integer.toHexString(0xff & encryptData[i]);
            if (plainText.length() < 2)
                plainText = "0" + plainText;
            hexString.append(plainText);
        }

        return hexString.toString();
    }

    /**
     * @return String
     * @Title: toHexString
     * @Description: byte转成16进制
     */
    public String getBase64String(String enc) {
        checkEncryptData();
        try {
            return new String(Base64.encodeBase64(encryptData), enc);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return getBase64String();
        }
    }

    public String getBase64String() {
        checkEncryptData();
        return new String(Base64.encodeBase64(encryptData));
    }

    public static byte[] decodeBase64(String base64String) throws Exception {
        return Base64.decodeBase64(base64String);
    }

    private void checkEncryptData() {
        if (encryptData == null) {
            try {
                throw new Exception("请先执行encrypt()或者decrypt()方法！");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return;
        }
    }
}

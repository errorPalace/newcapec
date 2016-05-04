package net.newcapec.campus.quickaccess.utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

/**
 * 三重加密 3DES也作 Triple DES,
 *
 * @author stone
 * @date 2014-03-10 02:14:37
 */
public class TripleDES {
    // 算法名称  
    public static final String KEY_ALGORITHM = "DESede";
    // 算法名称/加密模式/填充方式  
    public static final String CIPHER_ALGORITHM_ECB = "DESede/ECB/PKCS5Padding";
    public static final String CIPHER_ALGORITHM_CBC = "DESede/CBC/PKCS5Padding";
    private static byte[] encryptData;
    private KeyGenerator keyGen;
    private SecretKey secretKey;
    private SecretKey secretKey2;
    private Cipher cipher;

    public TripleDES(String mode) throws Exception {
        if ("ECB".equals(mode)) {
//          cipher = Cipher.getInstance(KEY_ALGORITHM);
            cipher = Cipher.getInstance(CIPHER_ALGORITHM_ECB);
            keyGen = KeyGenerator.getInstance(KEY_ALGORITHM);
            secretKey = keyGen.generateKey();
        } else if ("CBC".equals(mode)) {
            cipher = Cipher.getInstance(CIPHER_ALGORITHM_CBC);
            keyGen = KeyGenerator.getInstance(KEY_ALGORITHM);
            DESedeKeySpec spec = new DESedeKeySpec(keyGen.generateKey().getEncoded());
            secretKey2 = SecretKeyFactory.getInstance(KEY_ALGORITHM).generateSecret(spec);
        }
    }

    public static void main(String[] args) throws Exception {
        TripleDES tripleDES = new TripleDES("ECB");
        tripleDES.encrypt("sau8jzxlcvm,'123`98(*^&%^^JCB ZX>>A<S<}}{");
        System.out.println("加密后：" + new String(encryptData));
        System.out.println("解密后：" + new String(tripleDES.decrypt(encryptData)));

        tripleDES = new TripleDES("CBC");
        tripleDES.encrypt2("sau8jzxlc DQV#><«|vm,'123`98(*^&%^^JCB ZX>>A<S<}}{");
        System.out.println("加密后：" + getHexString(encryptData));
        System.out.println("解密后：" + new String(tripleDES.decrypt2(encryptData)));

        tripleDES = new TripleDES("CBC");
        tripleDES.encrypt2("sau8jzxlc DQV#><«|vm,'123`98(*^&%^^JCB ZX>>A<S<}}{");
        System.out.println("加密后：" + getHexString(encryptData));
        System.out.println("解密后：" + new String(tripleDES.decrypt2(encryptData)));


    }

    /**
     * @return String
     * @Title: toHexString
     * @Description: byte转成16进制
     */
    public static String getHexString(byte[] encryptData) {
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
     * 加密
     *
     * @param str
     * @return
     * @throws Exception
     */
    public byte[] encrypt(String str) throws Exception {
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return encryptData = cipher.doFinal(str.getBytes());
    }

    /**
     * 解密
     *
     * @param encrypt
     * @return
     * @throws Exception
     */
    public byte[] decrypt(byte[] encrypt) throws Exception {
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        return encryptData = cipher.doFinal(encrypt);
    }

    byte[] getIV() {
        return "administ".getBytes();
    }

    /**
     * 加密
     *
     * @param str
     * @return
     * @throws Exception
     */
    public byte[] encrypt2(String str) throws Exception {
        cipher.init(Cipher.ENCRYPT_MODE, secretKey2, new IvParameterSpec(getIV()));
        return encryptData = cipher.doFinal(str.getBytes());
    }

    /**
     * 解密
     *
     * @param encrypt
     * @return
     * @throws Exception
     */
    public byte[] decrypt2(byte[] encrypt) throws Exception {
        cipher.init(Cipher.DECRYPT_MODE, secretKey2, new IvParameterSpec(getIV()));
        return encryptData = cipher.doFinal(encrypt);
    }
}  

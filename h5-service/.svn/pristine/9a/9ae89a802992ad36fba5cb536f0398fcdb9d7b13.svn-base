package net.newcapec.campus.quickaccess.utils;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.codec.binary.Base64;

public class DESedeCoder {
    public static final String KEY_ALGORITHM = "DESede";
    public static final String CIPHER_ALGORITHM_ECB = "DESede/ECB/PKCS5Padding";
    public static final String CIPHER_ALGORITHM_CBC = "DESede/CBC/PKCS5Padding";
    private static final transient String defaultKey = "wpdk3k56wpdk3k56wpdk3k56";
    private SecretKey secretKey;
    private Cipher cipher;
    private byte[] encryptData;

    public static void main(String[] args) throws Exception {
        DESedeCoder tripleDES = new DESedeCoder();
        String encryptBase64 = tripleDES.encrypt("jdbc:mysql://localhost:3306/CAMPUS_QUICKACCESS").getHexString();
        System.out.println("加密后：" + encryptBase64);
        System.out.println("解密后：" + tripleDES.decryptByHexString(encryptBase64).getString(new String[0]));
    }

    public DESedeCoder() {
        this("ECB", defaultKey);
    }

    public DESedeCoder(String key) {
        this("ECB", key);
    }

    public DESedeCoder(String mode, String key) {
        try {
            if ("ECB".equals(mode)) {
                this.cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");

                DESedeKeySpec desKeySpec = new DESedeKeySpec(key.getBytes());
                SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
                this.secretKey = keyFactory.generateSecret(desKeySpec);
            } else if ("CBC".equals(mode)) {
                this.cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
                DESKeySpec desKeySpec = new DESKeySpec(key.getBytes());
                SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
                this.secretKey = keyFactory.generateSecret(desKeySpec);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public DESedeCoder encrypt(String str)
            throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        this.cipher.init(Cipher.ENCRYPT_MODE, this.secretKey);
        this.encryptData = this.cipher.doFinal(str.getBytes());
        return this;
    }

    public DESedeCoder decrypt(byte[] encrypt)
            throws Exception {
        this.cipher.init(Cipher.DECRYPT_MODE, this.secretKey);
        this.encryptData = this.cipher.doFinal(encrypt);
        return this;
    }

    public DESedeCoder decryptByBase64(String base64Str)
            throws Exception {
        this.cipher.init(Cipher.DECRYPT_MODE, this.secretKey);
        this.encryptData = this.cipher.doFinal(decodeBase64(base64Str));
        return this;
    }

    public DESedeCoder decryptByHexString(String base64Str)
            throws Exception {
        this.cipher.init(Cipher.DECRYPT_MODE, this.secretKey);
        this.encryptData = this.cipher.doFinal(hexStringToBytes(base64Str));
        return this;
    }

    public String getString(String... enc) {
        checkEncryptData();
        try {
            if (enc.length > 0) {
                return new String(this.encryptData, enc[0]);
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return new String(this.encryptData);
    }

    public byte[] getBytes(String ss) {
        checkEncryptData();
        byte[] digest = new byte[ss.length() / 2];
        for (int i = 0; i < digest.length; i++) {
            String byteString = ss.substring(2 * i, 2 * i + 2);
            int byteValue = Integer.parseInt(byteString, 16);
            digest[i] = ((byte) byteValue);
        }
        return digest;
    }

    public static byte[] hexStringToBytes(String hexString) {
        if ((hexString == null) || (hexString.equals(""))) {
            return null;
        }
        hexString = hexString.toUpperCase();
        int length = hexString.length() / 2;
        char[] hexChars = hexString.toCharArray();
        byte[] d = new byte[length];
        for (int i = 0; i < length; i++) {
            int pos = i * 2;
            d[i] = ((byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[(pos + 1)])));
        }
        return d;
    }

    private static byte charToByte(char c) {
        return (byte) "0123456789ABCDEF".indexOf(c);
    }

    public String getHexString() {
        checkEncryptData();
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < this.encryptData.length; i++) {
            String plainText = Integer.toHexString(0xFF & this.encryptData[i]);
            if (plainText.length() < 2) {
                plainText = "0" + plainText;
            }
            hexString.append(plainText);
        }
        return hexString.toString();
    }

    public String getBase64String(String enc) {
        checkEncryptData();
        try {
            return new String(Base64.encodeBase64(this.encryptData), enc);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return getBase64String();
    }

    public String getBase64String() {
        checkEncryptData();
        return new String(Base64.encodeBase64(this.encryptData));
    }

    public static byte[] decodeBase64(String base64String)
            throws Exception {
        return Base64.decodeBase64(base64String);
    }

    private void checkEncryptData() {
        if (this.encryptData == null) {
            try {
                throw new Exception("请先执行encrypt()或者decrypt()方法！");
            } catch (Exception e) {
                e.printStackTrace();

                return;
            }
        }
    }
}

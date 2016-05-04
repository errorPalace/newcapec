package net.newcapec.campus.quickaccess.utils;

/**
 * Created by skyline on 2015/12/15.
 */
public enum DeviceType {
    android, ios, other;

    public static DeviceType dected(String deviceStr) {
        DeviceType device = null;
        try {
            device = DeviceType.valueOf(deviceStr.toLowerCase());
            if (device == null) {
                return DeviceType.other;
            }
        } catch (Exception e) {
            return DeviceType.other;
        }
        return device;
    }
}

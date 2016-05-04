/**
 *
 */
package net.newcapec.campus.h5;

import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.extend.resource.impl.FileResourceCategory;

/**
 * 手机端获取Banner图片路径
 *
 * @author 喻康
 * @version EwppFileResourceCategory.java 2015-7-29 上午9:50:10
 */
public class PrizeFileResourceCategory extends FileResourceCategory {
    private PreferenceUtils preferenceUtils;
    public final static String NAME = "prizePhoto";

    /*
     * (non-Javadoc)
     *
     * @see net.newcapec.v3.extend.resource.impl.BaseResourceCategory#init()
     */
    @Override
    protected void init() {
        this.setRootPath(preferenceUtils.getPrizeImageURL());
    }

    public PreferenceUtils getPreferenceUtils() {
        return preferenceUtils;
    }

    public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
        this.preferenceUtils = preferenceUtils;
    }
}

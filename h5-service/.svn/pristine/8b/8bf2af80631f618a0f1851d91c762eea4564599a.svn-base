/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.PrizeFileResourceCategory;
import net.newcapec.campus.h5.entity.ActivityPrizeCfg;
import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.campus.h5.manager.ActivityPrizeCfgManager;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.core.common.Operator;
import net.newcapec.v3.core.web.action.AbstractSimpleGridBaseAction;
import net.newcapec.v3.core.web.servlet.WebSourceServlet;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.condition.Conditions;
import net.newcapec.v3.extend.security.V3SecurityContext;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.io.File;
import java.io.Serializable;
import java.util.*;

/**
 * @author 喻康
 * @version BanWordsAction.java 2014-11-14 上午11:06:49
 */
public class PrizeAction extends AbstractSimpleGridBaseAction<Prize> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private PreferenceUtils preferenceUtils;
    private ActivityPrizeCfgManager activityPrizeCfgManager;
    /**
     * 代表上传文件的对象
     */
    private File photo;
    /**
     * 上传文件的名称,上传文件名命名规则为***FileName; ***为jsp中file控件的命名
     */
    private String photoFileName;

    /**
     * 长传文件的MIME类型，为***ContentType；file为file控件的名称
     */
    private String photoContentType;

    @Override
    protected Serializable getObjectId(Prize data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public Prize getData() {
        return data;
    }

    public void setData(Prize data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(Prize data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm"));
        }
        if (data.getModifyStamp() != null) {
            jsonObject.put("modifyStamp", DateFormatUtils.format(
                    data.getModifyStamp(), "yy-MM-dd HH:mm"));
        }
        jsonObject.put("type", Prize.TYPE_MAP.get(data.getType()));
        String photo = data.getImagePath();
        String path = getRequest().getContextPath()
                + WebSourceServlet.FILE_GETTER_SERVLET_URL_PATTERN
                + PrizeFileResourceCategory.NAME + "/" + photo;
        jsonObject.put("photo_path", "<img src=" + path + " width=50 height=50/>");
        return jsonObject;
    }


    @Override
    protected Collection<Condition> createConditions() throws Exception {
        Collection<Condition> conditions = new ArrayList<Condition>();
        String name = this.getParameter("name");
        if (StringUtils.isNotBlank(name)) {
            conditions.add(Conditions.eq("name", name));
        }
        String type = this.getParameter("type");
        if (StringUtils.isNotBlank(type)) {
            conditions.add(Conditions.eq("type", Integer.parseInt(type)));
        }
        String createBeginDate = this.getParameter("createBeginDate");
        if (StringUtils.isNotBlank(createBeginDate)) {
            conditions
                    .add(Conditions
                            .ge("createStamp",
                                    net.newcapec.v3.commons.lang.DateFormatUtils.FULL_SIMPLE_DATE_STALY
                                            .parseObject(createBeginDate)));
        }
        String createEndDate = this.getParameter("createEndDate");
        if (StringUtils.isNotBlank(createEndDate)) {
            conditions
                    .add(Conditions
                            .le("createStamp",
                                    net.newcapec.v3.commons.lang.DateFormatUtils.FULL_SIMPLE_DATE_STALY
                                            .parseObject(createEndDate)));
        }
        conditions.add(Conditions.eq("enable", false));
        conditions.add(Conditions.desc("id"));
        return conditions;
    }

    @Override
    protected void setAttributeOnManager() throws Exception {
        super.setAttributeOnManager();
        setAttribute("TYPE_MAP", Prize.TYPE_MAP);
    }

    @Override
    public String enterAdd() throws Exception {
        super.enterAdd();
        setAttribute("TYPE_MAP", Prize.TYPE_MAP);
        return SUCCESS;
    }

    @Override
    public String enterEdit() throws Exception {
        super.enterEdit();
        String photo = this.data.getImagePath();
        if (StringUtils.isNotBlank(photo)) {
            String path = getRequest().getContextPath()
                    + WebSourceServlet.FILE_GETTER_SERVLET_URL_PATTERN
                    + PrizeFileResourceCategory.NAME + "/" + photo;
            setAttribute("photo_path", path);
        }
        setAttribute("type", Prize.TYPE_MAP.get(this.data.getType()));
        return SUCCESS;
    }

    @Override
    public void add() throws Exception {
        if (photo != null) {
            String photoPath = preferenceUtils.getPrizeImageURL();

            String extName = FilenameUtils.getExtension(photoFileName);
            String fileName = UUID.randomUUID().toString() + "." + extName;
            File destFile = new File(photoPath, fileName);
            if (!destFile.getParentFile().exists()) {
                destFile.getParentFile().mkdirs();
            }
            try {
                FileUtils.copyFile(this.photo, destFile);
            } catch (Exception e) {
                log.error("文件写入失败！", e);
                ajaxOutPutText("ajax:上传失败！");
                return;
            }
            this.data.setImagePath(fileName);
            Operator operator = V3SecurityContext.getCurrentOperator();
            this.data.setCreateOperator(operator.getName());
            this.data.setCreateStamp(new Date());
            try {
                getManager().save(this.data);
                ajaxOutPutText(SUCCESS);
            } catch (Exception e) {
                log.error(null, e);
                ajaxOutPutText("ajax:增加失败！");
            }
        } else {
            ajaxOutPutText("ajax:增加失败:上传图片失败！");
        }
    }

    @Override
    public void edit() throws Exception {
        Prize prize = this.getManager().findById(this.data.getId());
        if (prize == null) {
            this.ajaxOutPutText("ajax:对象已经不存在，可能已经被删除！");
            return;
        }
        if (photo != null) {
            String photoPath = preferenceUtils.getPrizeImageURL();
            String extName = FilenameUtils.getExtension(photoFileName);
            String fileName = UUID.randomUUID().toString() + "." + extName;
            File destFile = new File(photoPath, fileName);
            if (!destFile.getParentFile().exists()) {
                destFile.getParentFile().mkdirs();
            }
            try {
                FileUtils.copyFile(this.photo, destFile);
            } catch (Exception e) {
                log.error("文件写入失败！", e);
                ajaxOutPutText("ajax:上传失败！");
                return;
            }
            prize.setImagePath(fileName);
        }
        Operator operator = V3SecurityContext.getCurrentOperator();
        prize.setModifyOperator(operator.getName());
        prize.setModifyStamp(new Date());
        prize.setName(this.data.getName());
        prize.setNote(this.data.getNote());
        try {
            getManager().update(prize);
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:修改失败！");
        }

    }

    @Override
    public String view() throws Exception {
        super.view();
        String photo = this.data.getImagePath();
        if (StringUtils.isNotBlank(photo)) {
            String path = getRequest().getContextPath()
                    + WebSourceServlet.FILE_GETTER_SERVLET_URL_PATTERN
                    + PrizeFileResourceCategory.NAME + "/" + photo;
            setAttribute("photo_path", path);
        }
        setAttribute("type", Prize.TYPE_MAP.get(this.data.getType()));
        return SUCCESS;
    }

    @Override
    public void delete() throws Exception {
        try {
            String[] checkboxkeys = this.getParameter("checkboxkeys").split("\\,");
            Long[] ids = new Long[checkboxkeys.length];

            for (int count = 0; count < ids.length; ++count) {
                ids[count] = Long.decode(checkboxkeys[count]);
            }
            List<Prize> list = this.getManager().findById(ids);
            for (Prize entity : list) {
                List<ActivityPrizeCfg> activityPrizeCfgList = activityPrizeCfgManager.findByCondition(Conditions.eq("prizeId", entity.getId()), Conditions.eq("enable", false));
                if (activityPrizeCfgList != null && !activityPrizeCfgList.isEmpty()) {
                    ajaxOutPutText("ajax:奖品已被使用不能删除！");
                    return;
                }
                entity.setEnable(true);
                getManager().update(entity);
            }
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:删除失败！");
        }
    }

    public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
        this.preferenceUtils = preferenceUtils;
    }

    public void setPhoto(File photo) {
        this.photo = photo;
    }

    public void setPhotoFileName(String photoFileName) {
        this.photoFileName = photoFileName;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public void setActivityPrizeCfgManager(ActivityPrizeCfgManager activityPrizeCfgManager) {
        this.activityPrizeCfgManager = activityPrizeCfgManager;
    }
}

package net.newcapec.campus.h5.manager.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableCellFeatures;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import net.newcapec.campus.h5.entity.VoteClass;
import net.newcapec.campus.h5.manager.VoteClassManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;

import org.apache.commons.lang.StringUtils;

public class VoteClassManagerImpl extends BaseManagerImpl<VoteClass> implements
		VoteClassManager {

	@Override
	public void inputAllClass(File file, String fileName, File errorFile) {

		int errorTimes = 0; // 记录出现错误的次数
		int errorFlag = 0; // 错误标记
		int rawFlag = 1; // 记录错误文件插入的下一行

		Map<String, String> errorInfoMap = new HashMap<String, String>(); // 记录错误信息
		List<String> rowList = new ArrayList<String>();
		rowList.add("customCode");
		rowList.add("customName");
		rowList.add("className");
		String str = fileName.toLowerCase();
		if (!(str.endsWith(".xls") || str.endsWith(".xlsx"))) {
			throw new RuntimeException("文件格式不对！");
		}

		if (str.endsWith(".xlsx")) {
			throw new RuntimeException("导入表格目前仅支持03版的excel表格，请下载导入模板！");
		}
		Workbook workbook = null;
		// 创建一个用于记录错误信息的excel文件,文件名根据时间生成
		WritableWorkbook errorbook = null;
		// 判断文件是否正在被操作
		if (file.renameTo(file)) {
			try {
				errorbook = Workbook.createWorkbook(errorFile);
			} catch (IOException e) {
				throw new RuntimeException("创建excel文件失败！");
			}
		} else {
			throw new RuntimeException("文件正在被操作，请稍候 ！");
		}

		WritableSheet errorSheet = errorbook.createSheet("第一页", 0);
		try {
			workbook = Workbook.getWorkbook(file); // 得到只读的workbook.
			Sheet sheet = workbook.getSheet(0); // 得到第一个工作区
			int rowCount = sheet.getRows(); // Excel表格的行数
			int colsCount = sheet.getColumns(); // Excel表格的列数
			if (colsCount != 3) {
				throw new RuntimeException("导入表格的数据的列数不对！");
			}

			// 初始化第一行的信息，即初始化excel的表头信息
			for (int i = 0; i < 3; i++) {
				try {
					errorSheet.addCell(new Label(i, 0, sheet.getCell(i, 0)
							.getContents().replaceAll("[　*| *| *|\\s*]*", "")));
				} catch (RowsExceededException e) {
					logger.error(null, e);
					throw new RuntimeException("行超出范围");
				} catch (WriteException e) {
					logger.error(null, e);
					throw new RuntimeException("错误信息写入excel失败！");
				}
			}

			for (int i = 1; i < rowCount; i++) {
				String customCode = sheet.getCell(0, i).getContents()
						.replaceAll("[　*| *| *|\\s*]*", ""); // 院系
				String customName = sheet.getCell(1, i).getContents()
						.replaceAll("[　*| *| *|\\s*]*", ""); // 专业
				String className = sheet.getCell(2, i).getContents()
						.replaceAll("[　*| *| *|\\s*]*", ""); // 班级

				if (StringUtils.isBlank(customCode)) {
					errorFlag = 1;
					errorInfoMap.put("customCode", "学校code不能为空！");
				}
				if (StringUtils.isBlank(customName)) {
					errorFlag = 1;
					errorInfoMap.put("customName", "学校姓名不能为空！");
				}
				if (StringUtils.isBlank(className)) {
					errorFlag = 1;
					errorInfoMap.put("className", "班级不能为空！");
				}

				/**
				 * 当该行的信息存在错误的时候把错误信息导入到excel里面，并在excel里面添加标注
				 * 当该行信息不存在错误的时候把信息保存到数据库实体中
				 */
				if (1 == errorFlag) {
					errorTimes++;
					// 随机生成一个文件excel文件把错误信息加入到文件里面
					for (int j = 0; j < 3; j++) {
						try {
							Label newLabel = new Label(j, rawFlag, sheet
									.getCell(j, i).getContents());
							WritableCellFeatures cellFeatures = new WritableCellFeatures();
							// 判断错误信息是否存在
							if (errorInfoMap.containsKey(rowList.get(j))) {
								cellFeatures.setComment(errorInfoMap
										.get(rowList.get(j)));
								// 从Map中删除错误信息
								errorInfoMap.remove(rowList.get(j));
							}
							newLabel.setCellFeatures(cellFeatures);
							errorSheet.addCell(newLabel);
						} catch (RowsExceededException e) {
							logger.error(null, e);
							throw new RuntimeException("行超出范围");
						} catch (WriteException e) {
							logger.error(null, e);
							throw new RuntimeException("错误信息:写入excel失败！");
						}
					}
					rawFlag++;
					errorFlag = 0;
				} else {
					VoteClass vc = new VoteClass();
					vc.setClassName(className);
					vc.setCreateDate(new Date());
					vc.setCustomerCode(customCode);
					vc.setCustomerName(customName);
					this.save(vc);
				}
			}
		} catch (BiffException e) {
			logger.error(null, e);
			throw new RuntimeException("导入失败！");
		} catch (IOException e) {
			logger.error(null, e);
			throw new RuntimeException("导入失败！");
		} finally {
			if (workbook != null) {
				workbook.close();
			}
			if (errorbook != null) {
				try {
					errorbook.write();
					errorbook.close();
				} catch (WriteException e) {
					logger.error(null, e);
					throw new RuntimeException("文件写入失败！");
				} catch (IOException e) {
					logger.error(null, e);
					throw new RuntimeException("文件关闭失败！");
				}
			}
		}
	}
}
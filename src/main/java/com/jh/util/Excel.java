package com.jh.util;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;

import com.jh.common.Constants;
import com.jh.common.ElementTag;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

/**
 * excel工具
 * 
 */
public class Excel {
	/**
	 * get方法前缀。
	 */
	private static final String GETER = "get";
	/**
	 * 工作簿.
	 */
	private WritableWorkbook wwb;

	/**
	 * 工作空间.
	 */
	private WritableSheet sheet;

	/**
	 * 操作日志类型.
	 */
	private static final Map<String, String> operateLogTypeMap = new HashMap<String, String>();

	/**
	 * 构造函数.
	 */
	public Excel() {
		if (operateLogTypeMap.isEmpty()) {
			// "增加","删除","修改","查询","导出","备份","恢复","查看"
			operateLogTypeMap.put(Constants.OperateLogType.ADD + "", "增加");
			operateLogTypeMap.put(Constants.OperateLogType.DELETE + "", "删除");
			operateLogTypeMap.put(Constants.OperateLogType.UPDATE + "", "修改");
			operateLogTypeMap.put(Constants.OperateLogType.QUERY + "", "查询");
			operateLogTypeMap.put(Constants.OperateLogType.EXPORT + "", "导出");
			operateLogTypeMap.put(Constants.OperateLogType.BACKUP + "", "备份");
			operateLogTypeMap.put(Constants.OperateLogType.RESTORE + "", "恢复");
			operateLogTypeMap.put(Constants.OperateLogType.LOOK + "", "查看");
		}
	}

	/**
	 * 创建sheet页.
	 * 
	 * @param path
	 *            文件路径
	 * @param sheetName
	 *            sheet页名称
	 * @throws Exception
	 *             异常
	 */
	public void open(String path, String sheetName) throws Exception {
		wwb = Workbook.createWorkbook(new File(path));
		sheet = wwb.createSheet(sheetName, 0);
		sheet.getSettings().setDefaultColumnWidth(20);
	}

	/**
	 * 写数据.
	 * 
	 * @param cls
	 *            类信息
	 * @param datas
	 *            数据
	 */
	public void write(Class<?> cls, List<?> datas) throws Exception {
		WritableCellFormat format = new WritableCellFormat();
		// 居中
		format.setAlignment(Alignment.CENTRE);
		// 字体
		format.setFont(new WritableFont(WritableFont.createFont("黑体"), 12));
		Field[] fields = cls.getDeclaredFields();
		// get方法名
		List<Method> getMethods = new ArrayList<Method>(fields.length);
		// 映射的值
		Map<String, String> valueMap = new HashMap<String, String>();
		int i = 0;
		Label label = new Label(i, 0, "序号", format);
		sheet.addCell(label);
		for (Field field : fields) {
			ElementTag tag = field.getAnnotation(ElementTag.class);
			if (tag != null) {
				String[] names = tag.name().split("-");
				label = new Label(++i, 0, names[0], format);
				sheet.addCell(label);
				// 方法名
				String methodName = GETER + firstLetterToUpper(field.getName());
				if (names.length > 1) {
					valueMap.put(methodName, names[1]);
				}
				getMethods.add(cls.getDeclaredMethod(methodName));
			}
		}
		write(getMethods, valueMap, datas);
		// 写入数据
		wwb.write();
	}

	/**
	 * 写入excel.
	 * 
	 * @param getMethods
	 * @param valueMap
	 *            映射的值
	 * @param datas
	 *            数据
	 * @throws Exception
	 *             异常
	 */
	private void write(List<Method> getMethods, Map<String, String> valueMap, List<?> datas) throws Exception {
		WritableCellFormat format = new WritableCellFormat();
		// 居中
		format.setAlignment(Alignment.CENTRE);
		int i = 1;// 行
		for (Object data : datas) {
			int j = 1;// 列
			Label label = new Label(0, i, i + "", format);
			sheet.addCell(label);
			for (Method method : getMethods) {
				Object obj = method.invoke(data);
				System.out.println("obj:"+obj);
				String context = "";
				if (obj != null) {
					if (obj instanceof Date) {
						context = DateFormatUtils.format((Date) obj, "yyyy-MM-dd HH:mm:ss");
					} else if (obj instanceof Integer) {
						String value = obj.toString();
						String objName = valueMap.get(method.getName());
						System.out.println("objName2:"+objName);
						if (objName != null) {
							if (objName.equals("operateLogTypeMap")) {
								// 操作日志类型
								context = operateLogTypeMap.get(value);
							} else {
								context = value;
							}
						} else {
							context = value;
						}
					} else {
						context = obj.toString();
					}
				}
				label = new Label(j++, i, context, format);
				sheet.addCell(label);
			}
			i++;
		}
	}

	/**
	 * 关闭.
	 * 
	 * @throws Exception
	 *             异常
	 */
	public void close() throws Exception {
		if (wwb != null) {
			wwb.close();
		}
	}

	/**
	 * 首字母大写.
	 * 
	 * @param str
	 *            字符串.
	 * @return 首字母大写字符串
	 */
	private static String firstLetterToUpper(String str) {
		char[] arr = str.toCharArray();
		arr[0] = Character.toUpperCase(arr[0]);
		return new String(arr);
	}
}

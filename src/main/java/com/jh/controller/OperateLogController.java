package com.jh.controller;

import java.io.File;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jh.common.Constants;
import com.jh.common.ErrorCode;
import com.jh.pojo.OperateLog;
import com.jh.service.OperateLogService;
import com.jh.util.Excel;
import com.jh.util.PropertyUtil;

@Controller
public class OperateLogController extends AbstractController{

	/**
	 * 操作日志业务处理.
	 */
	@Autowired
	private OperateLogService operateLogService;
	/**
	 * 分页查询操作日志.
	 * 
	 * @param userName
	 *            用户名
	 * @param type
	 *            操作类型
	 * @param fromDate
	 *            开始时间
	 * @param toDate
	 *            结束时间
	 * @param start
	 *            起始下标
	 * @param limit
	 *            查询个数
	 * @return 返回数据
	 */
	@ResponseBody
	@RequestMapping(value = "/operateLog/query.do")
	public Map<String, Object> queryByCondition(String userName, int type, String fromDate, String toDate, int start,
			int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (limit == 0) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			// 查询该表数据条目数
			int num = operateLogService.countOperateLogByCondition(userName, type, fromDate, toDate);
			List<OperateLog> objects = new ArrayList<OperateLog>();
			if (num > 0) {
				// 查询结果
				objects = operateLogService.queryOperateLogByCondition(userName, type, fromDate, toDate, start, limit);
			}
			map.put("success", true);
			map.put("objects", objects);
			map.put("total", num);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return map;
	}
	
	/**
	 * 导出操作日志.
	 * 
	 * @return 给前端
	 */
	@ResponseBody
	@RequestMapping(value = "/operateLog/export.do")
	public Map<String, Object> export(String userName, int type, String fromDate, String toDate, HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			// 操作日志备份目录
			String dir = session.getServletContext().getRealPath(Constants.BackUp.ITF_QUERY_DIR);
			// 备份文件名
			String fileName = "operateLog" + (String) session.getAttribute("userName")
					+ DateFormatUtils.format(new Date(), "yyyyMMddHHmmss") + ".xls";
			// 查询该表数据条目数
			int num = operateLogService.countOperateLogByCondition(userName, type, fromDate, toDate);
			// 导出excel条目数限制
			int maxNum = 50;
			if (num <= maxNum) {
				if (num > 0) {
					// 按条件查询操作日志
					List<OperateLog> visitlogs = operateLogService.queryOperateLogByCondition(userName, type, fromDate,
							toDate, 0, num);
					Excel excel = new Excel();
					excel.open(dir + File.separator + fileName, "操作日志");
					excel.write(OperateLog.class, visitlogs);
					excel.close();
					map.put("success", true);
					map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
					map.put("fileName", fileName);
				} else {
					map.put("success", false);
					map.put("error", ErrorCode.ITF_NODATATOEXPORT_ERROR);
				}
			} else {
				String msg = MessageFormat.format(ErrorCode.ITF_EXPORT_LARGE_NUM_ERROR,
						PropertyUtil.getPropertyValue(Constants.ITF_EXPORT_MAX_NUM));
				map.put("success", false);
				map.put("error", msg);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_EXPORT_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.EXPORT, "操作日志", map.get("error").toString());
		}
		return map;
	}
}

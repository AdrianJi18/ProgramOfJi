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
import com.jh.common.Table;
import com.jh.pojo.VisitLog;
import com.jh.service.VisitLogService;
import com.jh.util.Excel;
import com.jh.util.PropertyUtil;

@Controller
public class VisitLogController extends AbstractController{
	
	/**
	 * 访问日志业务处理.
	 */
	@Autowired
	private VisitLogService visitLogService;
	
	/**
	 * 导出访问日志.
	 * @return 给前端
	 */
	@ResponseBody
	@RequestMapping(value = "/visitlog/export.do")
	public Map<String, Object> exportVisitlog(String key, String value, int type,
			HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			// 访问日志备份目录
			String dir = session.getServletContext().getRealPath(Constants.BackUp.ITF_QUERY_DIR);
			// 备份人
			String userName = (String) session.getAttribute("userName");
			// 备份文件名
			String fileName = "visitlog" + userName + DateFormatUtils.format(new Date(), "yyyyMMddHHmmss") + ".xls";
			// 查询该表数据条目数
			int num = visitLogService.countVisitlogByCondition(key,value,type);
			// 导出excel条目数限制
			int maxNum = 50;
			if (num <= maxNum) {
				if (num > 0) {
					// 按条件查询访问日记
					List<VisitLog> visitlogs = visitLogService.queryVisitlogByCondition(key,value, type);
					Excel excel = new Excel();
					excel.open(dir + File.separator + fileName, "访问日志");
					excel.write(VisitLog.class, visitlogs);
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
			saveLog(Constants.OperateLogType.EXPORT, "访问日志", map.get("error").toString());
		}
		return map;
	}
	
	/**
	 * 分页按查询.
	 */
	@ResponseBody
	@RequestMapping(value = "/visitlog/query.do")
	public Map<String,Object> queryByCondition(String key, String value, int type,int start, int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (start==0 && limit==0) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			// 查询该表数据条目数
			int num = visitLogService.countVisitlogByCondition(key,value,type);
			List<Map<String,Object>> objects = new ArrayList<Map<String,Object>>();
			if(num>0){
				// 查询结果
				objects = visitLogService.queryVisitlogByCondition(key,value, type,start, limit);
			}
			map.put("success", true);
			map.put("objects", objects);
			map.put("total", num);
			map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_QUERYDB_ERROR);
			logger.error(e.getMessage(), e);
		}finally{
			if(value!=null){
				saveLog(Constants.OperateLogType.QUERY, Table.getTableName("visitlog"), map.get("error").toString());
			}
		}
		return map;
	}

}

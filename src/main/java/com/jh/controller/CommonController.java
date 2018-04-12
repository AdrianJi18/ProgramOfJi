package com.jh.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jh.common.ErrorCode;
import com.jh.service.CommonService;

@Controller
public class CommonController extends AbstractController{
	
	@Autowired
	private CommonService commonService;
	/**
	 * 分页查询.
	 */
	@ResponseBody
	@RequestMapping(value = "/common/query.do")
	public Map<String, Object> query(String tbl, int start, int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 表名
		String table = null;
		try {
			if (StringUtils.isBlank(tbl) || (start == 0 && limit == 0)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			// 表名
			table = tbl;
			// 查询该表数据条目数
			int num = commonService.countTotal(table);
			List<Map<String, Object>> objects = new ArrayList<Map<String, Object>>();
			if (num > 0) {
				// 查询结果
				objects = commonService.selectPaging(table, start, limit);
			}
			map.put("success", true);
			map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
			map.put("objects", objects);
			map.put("total", num);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_QUERYDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			// saveLog(Constants.OperateLogType.QUERY,
			// Table.getTableName(table), map.get("error").toString());
		}
		return map;
	}

}

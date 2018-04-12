package com.jh.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jh.common.ErrorCode;
import com.jh.common.Performance;

/**
 * 图表.
 * 
 */
@Controller
public class ChartController extends AbstractController {


	/**
	 * 最近的服务器性能.
	 */
	public static final Performance lastPerformance = new Performance();
	/**
	 * 服务器性能.
	 */
	@ResponseBody
	@RequestMapping(value = "/chart/performance.do")
	public Map<String, Object> queryPerformance() {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map.put("success", true);
			map.put("lastPerformance", lastPerformance);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_QUERYDB_ERROR);
			logger.error(e.getMessage(), e);
		}
		return map;
	}

}
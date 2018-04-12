package com.jh.controller;

import javax.servlet.http.HttpSession;

import com.jh.service.OperateLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public abstract class AbstractController {

	/**
	 * 实例化日志类.
	 */
	protected static Logger logger = LoggerFactory.getLogger(AbstractController.class);

	/**
	 * 操作日志业务处理.
	 */
	@Autowired
	private OperateLogService operateLogService;

	/**
	 * 保存操作日志到数据库.
	 * 
	 * @param userName
	 *            操作用户
	 * @param type
	 *            操作类型
	 * @param object
	 *            操作对象
	 * @param result
	 *            操作结果
	 */
	public void saveLog(int type, String description, String result) {
		ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpSession session = attrs.getRequest().getSession();
		if (session != null) {
			String userName = (String) session.getAttribute("userName");
			if (userName != null) {
				operateLogService.saveToDB(userName, type, description, result);
				logger.info("插入操作日志到数据库");
				return;
			}
		}
		logger.error("session userName为空");
	}
}

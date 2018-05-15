package com.jh.common;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;

import com.jh.pojo.AlarmType;

/**
 * 全局数据.
 * 
 */
public class GlobalData {

	/**
	 * 私有构造函数.
	 */
	private GlobalData() {

	}
	
	/**
	 * 浏览器访问路径
	 */
	public static String ctx = "/";
	
	/**
	 * 存储告警现场设备类型.
	 */
	public static final Map<String, String> devTypeMap = new HashMap<String, String>();

	/**
	 * 存储告警级别.
	 */
	public static final Map<String, String> severityMap = new HashMap<String, String>();

	/**
	 * 存储告警类型.
	 */
	public static final Map<String, AlarmType> alarmTypeMap = new HashMap<String, AlarmType>();
	
	/**
	 * 存储WebSocket连接上的客户端会话.
	 */
	public static final Map<String, WebSocketSession> webSocketSessionMap = Collections.synchronizedMap(new HashMap<String, WebSocketSession>());
	
}

package com.jh.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.jh.common.Constants;
import com.jh.common.ErrorCode;
import com.jh.common.Table;
import com.jh.pojo.User;
import com.jh.service.UserService;
import com.jh.service.VisitLogService;
import com.jh.util.MD5;
import com.jh.util.PropertyUtil;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController extends AbstractController{
	
	/**
	 * 实例化日志类.
	 */
	protected static Logger logger = LoggerFactory.getLogger(UserController.class);
	/**
	 * 登录业务处理.
	 */
	@Autowired
	private UserService userService;
	
	/**
	 * 访问日志业务处理.
	 */
	@Autowired
	private VisitLogService visitLogService;

	/**
	 * 登录.
	 * 
	 * @param userName
	 *            用户名
	 * @param password
	 *            密码
	 * @param session
	 *            会话
	 * @return 返回值
	 */
	@ResponseBody
	@RequestMapping(value = "/login/login.do")
	public Map<String, Object> login(String userName, String password, HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = null;
			// 通过传入的用户名,密码获取数据库中匹配用户
			if (userName.equals("admin")) {
				// 获取超级管理员密码
				PropertyUtil.load(this.getClass().getResourceAsStream("/admin.properties"));
				String pwd = PropertyUtil.getPropertyValue(userName);
				if (pwd.equals(MD5.getMD5(password))) {
					user = new User();
					user.setId(0);
					user.setPassword(pwd);
					user.setPermissionId(0);
					user.setUserName(userName);
					user.setTrueName("admin");
					// 1 已审核    
					user.setAudit(1);
					session.setAttribute("userName", userName);
				} else {
					map.put("success", false);
					map.put("error", ErrorCode.User.ITF_USERORPWD_ERROR);
					logger.error("登录失败:{}:{}", userName, ErrorCode.User.ITF_USERORPWD_ERROR);
					return map;
				}
			} else {
				user = userService.selectUserByUserName(userName);
			}

			if (user == null) {
				map.put("success", false);
				map.put("error", ErrorCode.User.ITF_USERNOTEXISTS_ERROR);
				logger.error("登录失败:{}:{}", userName, ErrorCode.User.ITF_USERNOTEXISTS_ERROR);
				return map;
			} else {
				if (!user.getPassword().equals(MD5.getMD5(password))) {
					map.put("success", false);
					map.put("error", ErrorCode.User.ITF_USERORPWD_ERROR);
					logger.error("登录失败:{}:{}", userName, ErrorCode.User.ITF_USERORPWD_ERROR);
					return map;
				}
				else{
					session.setAttribute("userName", user.getUserName());
				}
			}

			// 判断该用户是否已审核
			if (user.getAudit() == 1) {
				// 判断该用户是否已经登录
				if (session.getAttribute(userName) != null) {
					// 返回错误信息给前台
					map.put("success", false);
					map.put("error", ErrorCode.User.ITF_LOGINED_ERROR);
					logger.error("登录失败:{}:{}", userName, ErrorCode.User.ITF_LOGINED_ERROR);
					return map;
				}

				if (user.getPermissionId() == null) {
					map.put("success", false);
					map.put("error", "登录失败,失败原因:用户没有配置权限");
					logger.error("登录失败:{}:{}", userName, "登录失败,失败原因:用户没有配置权限");
					return map;
				}

				// 已经审核 插入访问日志
				long visitlogId = visitLogService.insertVisitlog(user.getUserName());
				if (visitlogId > 0) {
					session.setAttribute("visitlogId", visitlogId);
					session.setAttribute("id", user.getId());
					session.setAttribute("userName", user.getUserName());
					session.setAttribute("permissionId", user.getPermissionId());

					int role = 0;
					if (user.getPermissionId() != 0) {
						role = userService.selectRoleByPermissionId(user.getPermissionId());
					}
					session.setAttribute("role", role);
					map.put("success", true);
					logger.info("登录成功:{}", userName);
				} else {
					map.put("success", false);
					map.put("error", ErrorCode.User.ITF_INSERTVISITLOG_ERROR);
					logger.error("登录失败:{}:{}", userName, ErrorCode.User.ITF_INSERTVISITLOG_ERROR);
				}
			} else {
				map.put("success", false);
				map.put("error", ErrorCode.User.ITF_USERAUDIT_ERROR);
				logger.error("登录失败:{}:{}", userName, ErrorCode.User.ITF_INSERTVISITLOG_ERROR);
			}

		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return map;
	}

	@ResponseBody
	@RequestMapping(value = "/login/register.do")
	public Map<String, Object> register(User user, HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			String userName = null;
			if ("admin".equals(user.getUserName())) {
				userName = "admin";
			} else {
				userName = userService.queryUserByUnique(user.getUserName(),user.getPhone());
			}
			if (userName == null) {
				// 密码 MD5加密
				user.setPassword(MD5.getMD5(user.getPassword()));
				int result = userService.insertUser(user);
				if (result == 1) {
					map.put("success", true);
					map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
					logger.info("注册成功:{}", user.getUserName());
				} else {
					map.put("success", false);
					map.put("error", ErrorCode.User.ITF_INSERTUSER_ERROR);
					logger.error("注册失败:{}:{}", user.getUserName(), ErrorCode.User.ITF_INSERTUSER_ERROR);
				}

			} else {
				map.put("success", false);
				map.put("error", ErrorCode.User.ITF_USEREXISTS_ERROR);
				logger.error("注册失败:{}:{}", userName, ErrorCode.User.ITF_USEREXISTS_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		} finally {
			if (user.getPermissionId() != null) {
				saveLog(Constants.OperateLogType.ADD, Table.getTableName("user"), map.get("error").toString());
			}
		}
		return map;
	}

	/**
	 * 系统退出
	 * 
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/header/exit.do")
	public Map<String, Object> userExit(HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			int visitLogId = Integer.parseInt(session.getAttribute("visitlogId").toString());
			visitLogService.userExit(visitLogId);
			session.removeAttribute("visitlogId");
			session.removeAttribute("id");
			session.removeAttribute("userName");
			session.removeAttribute("permissionId");
			session.removeAttribute("role");
			map.put("success", true);
			map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
			logger.info("成功退出");
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return map;
	}
	
	/**
	 * 按当前登录用户id查询子用户.
	 * 
	 * @return 用户列表
	 */
	@ResponseBody
	@RequestMapping(value = "/getUsersByPid.do")
	public Map<String, Object> getUsersByPid(HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			int id = (Integer) session.getAttribute("id");
			int role = (Integer) session.getAttribute("role");
			List<Map<String, Object>> datas = userService.getUserByPidRole(id, role);
			map.put("objects", datas);
			map.put("total", datas.size());
			map.put("success", true);
			map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_QUERYDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
		}
		return map;
	}
	
	/**
	 * 按用户id删除用户.
	 * 
	 * @param ids
	 *            用户id
	 */
	@ResponseBody
	@RequestMapping(value = "/delete.do")
	public Map<String, Object> deleteUser(String ids) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (StringUtils.isBlank(ids)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			String[] idArr = ids.split("-");
			for (String id : idArr) {
				int result = userService.deleteById(Integer.parseInt(id));
				if(result > 0){
					map.put("success", true);
					map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
				}
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_DELETEDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.DELETE, Table.getTableName("user"), map.get("error").toString());
		}
		return map;
	}
	
	/**
	 * 重置密码.
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/resetPassword.do")
	public Map<String, Object> resetPassword(String ids, String password) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (StringUtils.isEmpty(ids) || StringUtils.isEmpty(password)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			String[] idArr = ids.split("-");
			int result = userService.resetPassword(idArr, MD5.getMD5(password));
			if (result > 0) {
				map.put("success", true);
				map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
			} else {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.UPDATE, "重置密码", map.get("error").toString());
		}
		return map;
	}
	
	/**
	 * 审核指定用户.
	 * 
	 * @param ids
	 *            用户id
	 * @return 返回前端
	 */
	@ResponseBody
	@RequestMapping(value = "/auditUser.do")
	public Map<String, Object> auditUser(String ids) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (StringUtils.isEmpty(ids)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			String[] idArr = ids.split("-");
			int result = userService.auditUser(idArr);
			if (result > 0) {
				map.put("success", true);
				map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
			} else {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.UPDATE, "审核", map.get("error").toString());
		}
		return map;
	}
	
	/**
	 * 修改密码.
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/modifyPassword.do")
	public Map<String, Object> modifyPassword(String oldPassword, String newPassword, HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (StringUtils.isEmpty(oldPassword) || StringUtils.isEmpty(newPassword)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			oldPassword = oldPassword.trim();
			newPassword = newPassword.trim();

			// 存储的旧密码
			String pwd = null;
			int id = (Integer) session.getAttribute("id");
			if (id == 0) {
				// 超级管理员
				// 获取超级管理员密码
				PropertyUtil.load(this.getClass().getResourceAsStream("/admin.properties"));
				pwd = PropertyUtil.getPropertyValue("userName");
			} else {
				// 根据用户名从数据库中获取当前登录用户信息
				String userName = (String) session.getAttribute("userName");
				User user = userService.selectUserByUserName(userName);
				if (user != null) {
					pwd = user.getPassword();
				}
			}
			if (pwd == null) {
				map.put("success", false);
				map.put("error", ErrorCode.User.ITF_USERNOTEXISTS_ERROR);
				return map;
			}
			if (MD5.getMD5(oldPassword).equals(pwd)) {
				// 修改密码
				int result = 0;
				if (id == 0) {
					// 超级管理员 修改 admin.properties文件
					result = PropertyUtil.write(this.getClass().getResource("/admin.properties").getPath(),
							"userName" + "=" + MD5.getMD5(newPassword));
				} else {
					String[] idArr = { String.valueOf(id) };
					result = userService.resetPassword(idArr, MD5.getMD5(newPassword));
				}

				if (result > 0) {
					map.put("success", true);
					map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
				} else {
					map.put("success", false);
					map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
				}
			} else {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_OLDPASSWORD_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.UPDATE, "修改密码", map.get("error").toString());
		}
		return map;
	}
	
	/**
	 * 更新.
	 */
	@ResponseBody
	@RequestMapping(value = "/update.do")
	public Map<String, Object> updateUser(int id, String changed) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (StringUtils.isBlank(changed)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				logger.error("更新:{}:{}" + changed + "失败,参数为空", id);
				return map;
			}
			String[] arr = changed.split("#2&");
			List<Map<String, Object>> params = new ArrayList<Map<String, Object>>();
			String str = null;
			String phone = null;
			for (int i = 0; i < arr.length; i++) {
				str = arr[i];
				String[] cv = str.split("#1&");
				if (cv.length > 0) {
					Map<String, Object> param = new HashMap<String, Object>();
					param.put("name", cv[0]);
					String value = cv.length > 1 ? cv[1] : "";
					param.put("value", value);
					params.add(param);
					if (cv[0].equals("phoneNo")) {
						phone = value;
					}
				}
			}

			int result = 0;
			String userName = userService.queryUserByUnique(null, phone);
			if (userName == null) {
				result = userService.updateUserById(id, params);
			} else {
				result = -1;
			}

			if (result == 1) {
				map.put("success", true);
				map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
				logger.info("更新:{}:{}:" + changed + "成功", id);
			} else {
				map.put("success", false);
				if (result == -1) {
					map.put("error", ErrorCode.User.ITF_USEREXISTS_ERROR);
				} else {
					map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
				}
				logger.error("更新:{}失败", id);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.UPDATE, Table.getTableName("user"), map.get("error").toString());
		}
		return map;
	}
}

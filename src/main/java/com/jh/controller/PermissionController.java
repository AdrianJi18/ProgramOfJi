package com.jh.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jh.common.Constants;
import com.jh.common.ErrorCode;
import com.jh.common.Table;
import com.jh.service.MenuService;
import com.jh.service.PermissionService;

/**
 * 权限配置.
 * 
 */
@Controller
public class PermissionController extends AbstractController {

	/**
	 * 权限配置业务处理.
	 */
	@Autowired
	private PermissionService permissionService;

	/**
	 * 菜单业务处理.
	 */
	@Autowired
	private MenuService menuService;

	/**
	 * 获取根据用户角色等级1的菜单.
	 * 
	 * @param session
	 *            会话
	 * @return 菜单列表
	 */
	@ResponseBody
	@RequestMapping(value = "/user/permission/get.do")
	public Map<String, Object> getAllPermission(HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<Map<String, Object>> datas = permissionService.getAllPermission();
			map.put("objects", datas);
			map.put("total", datas.size());
			map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_QUERYDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			// saveLog(Constants.OperateLogType.QUERY,
			// Table.getTableName("tbl_permission"),
			// map.get("error").toString());
		}
		return map;
	}

	/**
	 * 获取menu组成的html.
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/user/permission/menusHtml.do")
	public Map<String, Object> getMenusHtml() {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Object[] datas = menuService.getMenusHtml();
			map.put("success", true);
			map.put("html", datas[0]);
			map.put("level3Ids", datas[1]);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return map;
	}

	/**
	 * 新增权限.
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/user/permission/add.do")
	public Map<String, Object> addPermission(String name, int role, String menuIds) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (StringUtils.isEmpty(name) || role <= 0 || StringUtils.isEmpty(menuIds)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			String[] menuIdsArr = menuIds.split("-");
			int result = permissionService.insertPermission(name, role, menuIdsArr);

			if (result > 0) {
				map.put("success", true);
				map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
			} else {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_INSERTDB_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_INSERTDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.ADD, Table.getTableName("permission"), map.get("error").toString());
		}
		return map;
	}

	/**
	 * 删除权限.
	 */
	@ResponseBody
	@RequestMapping(value = "/permission/delete.do")
	public Map<String, Object> deletePermission(String ids) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 表名
		String table = "permission";
		try {
			if (StringUtils.isBlank(ids)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			String[] idArr = ids.split("-");
			List<Integer> idsList = new ArrayList<Integer>(idArr.length);
			for (String id : idArr) {
				idsList.add(Integer.valueOf(id));
			}
			int result = permissionService.deleteByIds(table, idsList);
			if (result > 0) {
				map.put("success", true);
				map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);

				for (int id : idsList) {
					permissionService.updateOneColumnByKey("user", "permissionId", id, "permissionId", null);
				}

			} else {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_DELETEDB_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_DELETEDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.DELETE, Table.getTableName(table), map.get("error").toString());
		}
		return map;
	}

	/**
	 * 更新权限.
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/user/permission/update.do")
	public Map<String, Object> updatePermission(int id, String name, int role, String menuIds) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (id <= 0 || StringUtils.isEmpty(name) || role <= 0 || StringUtils.isEmpty(menuIds)) {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_PARAMNULL_ERROR);
				return map;
			}
			String[] menuIdsArr = menuIds.split("-");
			int result = permissionService.updatePermission(id, name, role, menuIdsArr);
			if (result > 0) {
				map.put("success", true);
				map.put("error", ErrorCode.ITF_OPERATE_SUCCESS);
			} else {
				map.put("success", false);
				map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", ErrorCode.ITF_UPDATEDB_ERROR);
			logger.error(e.getMessage(), e);
		} finally {
			saveLog(Constants.OperateLogType.UPDATE, Table.getTableName("permission"), map.get("error").toString());
		}
		return map;
	}
}
package com.jh.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jh.pojo.Menu1;
import com.jh.service.MenuService;

/**
 * 菜单.
 * 
 */
@Controller
public class MenuController extends AbstractController{

	/**
	 * 菜单业务处理.
	 */
	@Autowired
	private MenuService menuService;
	
	/**
	 * 获取根据用户角色等级1的菜单.
	 * @param session 会话
	 * @return 菜单列表
	 */
	@ResponseBody
	@RequestMapping(value = "/header/level1Menu.do")
	public Map<String, Object> getLevel1Menus(HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			int permissionId = Integer.parseInt(session.getAttribute("permissionId").toString());
			List<Map<String, Object>> datas = menuService.selectLevel1Menus(permissionId);
			map.put("success", true);
			map.put("data", datas);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(),e);
		}
		return map;
	}
	
	@ResponseBody
	@RequestMapping(value = "/header/menuItems.do")
	public Map<String, Object> getMenusByRoleLevel1(int menuId,HttpSession session) {
		// 返回值
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			int permissionId = Integer.parseInt(session.getAttribute("permissionId").toString());
			List<Menu1> datas = menuService.getMenusByPermissionLevel1(permissionId, menuId);
			map.put("success", true);
			map.put("data", datas);
		} catch (Exception e) {
			map.put("success", false);
			map.put("error", e.getMessage());
			logger.error(e.getMessage(),e);
		}
		return map;
	}
}
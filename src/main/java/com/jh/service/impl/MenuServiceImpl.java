package com.jh.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.jh.dao.MenuMapper;
import com.jh.pojo.Menu1;
import com.jh.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService{
	/**
	 * 菜单dao.
	 */
	@Autowired
	private MenuMapper menuMapper;

	/**
	 * 首页菜单显示,根据用户角色查询级别1的菜单.
	 * 
	 * @param permissionId
	 *            权限编号
	 * @return 菜单集合
	 */
	public List<Map<String, Object>> selectLevel1Menus(Integer permissionId) {
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		if (permissionId == null) {
			return datas;
		}
		if (permissionId == 0) {
			// 超级管理员
			List<Menu1> menus = menuMapper.selectMenusByLevel(1);
			for (Menu1 menu : menus) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", menu.getId());
				map.put("name", menu.getName());
				map.put("path", menu.getPath());
				map.put("img", menu.getImg());
				datas.add(map);
			}
		} else {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("permissionId", permissionId);
			params.put("level", 1);
			List<Menu1> menus = menuMapper.selectMenusByPermissionIdLevel(params);
			for (Menu1 menu : menus) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", menu.getId());
				map.put("name", menu.getName());
				map.put("path", menu.getPath());
				map.put("img", menu.getImg());
				datas.add(map);
			}
		}
		return datas;
	}

	/**
	 * 根据权限和等级1编号查询子菜单.
	 * 
	 * @param permissionId
	 *            权限编号
	 * @param menuId
	 *            等级1编号
	 * @return 菜单集合
	 */
	public List<Menu1> getMenusByPermissionLevel1(Integer permissionId, int menuId) {
		if (permissionId == null) {
			return new ArrayList<Menu1>();
		}
		if (permissionId == 0) {
			// 超级管理员
			List<Menu1> menus = menuMapper.selectMenusByLevel1MenuId(menuId);			
			return menus;
		} else {
			List<Menu1> allPermissionMenus = menuMapper.selectMenusByPermissionId(permissionId);
			List<Menu1> menus = new ArrayList<Menu1>();
			for (int i = 0; i < allPermissionMenus.size(); i++) {
				Menu1 menu = allPermissionMenus.get(i);
				if (menu.getLevel() == 1) {
					allPermissionMenus.remove(i);
					i--;
				} else if (menu.getLevel() == 2) {
					if (menu.getPid() == menuId) {
						menus.add(menu);
					}
					allPermissionMenus.remove(i);
					i--;
				}
			}
			int size = menus.size();
			for (Menu1 allPermissionMenu : allPermissionMenus) {
				for (int i = 0; i < size; i++) {
					if (allPermissionMenu.getPid() == menus.get(i).getId()) {
						menus.add(allPermissionMenu);
						break;
					}
				}
			}
			return menus;
		}
	}

	/**
	 * 获取menu组成的html.
	 * 
	 * @return html
	 */
	public Object[] getMenusHtml() {
		List<Menu1> menus = menuMapper.selectAllMenu();
		Map<Integer, Menu1> menuMap = new HashMap<Integer, Menu1>(menus.size());
		List<Integer> level1Ids = new ArrayList<Integer>();
		List<Integer> level3Ids = new ArrayList<Integer>();
		for (Menu1 menu : menus) {
			menuMap.put(menu.getId(), menu);
			// 等级1菜单
			if (menu.getLevel() == 1) {
				level1Ids.add(menu.getId());
			} else if (menu.getLevel() == 3) {
				level3Ids.add(menu.getId());
			}
		}
		for (Menu1 menu : menus) {
			if (menu.getPid() > 0) {
				menuMap.get(menu.getPid()).addChild(menu);
			}
		}
		StringBuffer htmlBuffer = new StringBuffer();
		for (int level1Id : level1Ids) {
			Menu1 level1Menu = menuMap.get(level1Id);
			htmlBuffer.append("<tr><td width='80px'>" + level1Menu.getName() + "</td><td></td><td></td></tr>");
			List<Menu1> level2Menus = level1Menu.getChildren();
			for (Menu1 leve2Menu : level2Menus) {
				htmlBuffer.append("<tr><td></td><td width='80px'>" + leve2Menu.getName()
						+ "</td><td width='420px' style='background-color:#FFFFFF'>");
				List<Menu1> level3Menus = leve2Menu.getChildren();
				for (int i = 0; i < level3Menus.size(); i++) {
					Menu1 level3Menu = level3Menus.get(i);
					if (i > 0 && i % 4 == 0) {
						htmlBuffer.append("<br/>");
					}
					htmlBuffer.append("<input type='checkbox' id='" + level3Menu.getId() + "'/>&nbsp;"
							+ level3Menu.getName() + "&nbsp;&nbsp;&nbsp;&nbsp;");
				}
				htmlBuffer.append("</td></tr>");
			}
		}
		return new Object[] { htmlBuffer.toString(), level3Ids };
	}

}

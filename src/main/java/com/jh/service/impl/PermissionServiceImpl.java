package com.jh.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jh.dao.MenuMapper;
import com.jh.dao.PermissionMapper;
import com.jh.pojo.Menu1;
import com.jh.pojo.Permission;
import com.jh.service.PermissionService;

@Service
public class PermissionServiceImpl implements PermissionService{
	@Autowired
	private PermissionMapper permissionMapper;
	
	@Autowired
	private MenuMapper menuMapper;
	
	/**
	 * 查询所有权限.
	 * 
	 * @return 权限
	 */
	public List<Map<String, Object>> getAllPermission() {
		List<Permission> permissions = permissionMapper.selectAllPermission();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		for (Permission permission : permissions) {
			List<Menu1> menus = menuMapper.selectMenusByPermissionId(permission.getId());
			Map<String, Object> mv = new HashMap<String, Object>();
			datas.add(mv);
			mv.put("id", permission.getId());
			mv.put("name", permission.getName());
			mv.put("role", permission.getRole());
			StringBuffer level1 = new StringBuffer();
			StringBuffer level2 = new StringBuffer();
			StringBuffer level3 = new StringBuffer();
			StringBuffer level3MenuIds = new StringBuffer();
			for (Menu1 menu : menus) {
				if (menu.getLevel() == 1) {
					level1.append(menu.getName() + " ");
				} else if (menu.getLevel() == 2) {
					level2.append(menu.getName() + " ");
				} else if (menu.getLevel() == 3) {
					level3.append(menu.getName() + " ");
					level3MenuIds.append(menu.getId() + "-");
				}
			}
			mv.put("level1", level1.toString());
			mv.put("level2", level2.toString());
			mv.put("level3", level3.toString());
			if (level3MenuIds.length() > 0) {
				level3MenuIds = level3MenuIds.deleteCharAt(level3MenuIds.length() - 1);
			}
			mv.put("level3MenuIds", level3MenuIds.toString());
		}
		return datas;
	}
	
	/**
	 * 插入权限.
	 * 
	 * @return
	 */
	public int insertPermission(String name, int role, String[] menuIds) {
		Permission permission = new Permission();
		permission.setName(name);
		permission.setRole(role);
		permissionMapper.insertPermission(permission);
		int permissionId = permissionMapper.selectId();
		return this.insertPermissionMenus(permissionId, menuIds);
	}
	
	/**
	 * 插入权限菜单表.
	 * 
	 * @param permissionId
	 *            权限编号
	 * @param menuIds
	 *            菜单编号数组
	 * @return 成功个数
	 */
	private int insertPermissionMenus(int permissionId, String[] menuIds) {
		List<Menu1> menus = menuMapper.selectAllMenu();
		Set<Integer> permissionMenuIds = new HashSet<Integer>();
		for (String menuIdStr : menuIds) {
			int menuId = Integer.valueOf(menuIdStr);
			int level2MenuId = 0;
			for (Menu1 menu : menus) {
				if (menu.getId() == menuId) {
					permissionMenuIds.add(menuId);
					permissionMenuIds.add(menu.getPid());
					level2MenuId = menu.getPid();
					menus.remove(menu);
					break;
				}
			}
			for (Menu1 menu : menus) {
				if (menu.getId() == level2MenuId) {
					permissionMenuIds.add(menu.getPid());
					menus.remove(menu);
					break;
				}
			}
		}

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for (int menuId : permissionMenuIds) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("permissionId", permissionId);
			map.put("menuId", menuId);
			list.add(map);
		}
		return permissionMapper.insertPermissionMenus(list);
	}
	
	/**
	 * 按编号批量删除.
	 * 
	 * @param table
	 *            表名
	 * @param ids
	 *            编号集合
	 * @return 删除条目数
	 */
	public int deleteByIds(String table, List<Integer> ids) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("table", table);
		params.put("list", ids);
		return permissionMapper.deleteByIds(params);
	}
	
	/**
	 * 按键更新一列.
	 * 
	 * @param table
	 *            表名
	 * @param key
	 *            键
	 * @param kValue
	 *            键值
	 * @param column
	 *            列名
	 * @param value
	 *            列值
	 * @return 成功条目数
	 */
	public int updateOneColumnByKey(String table, String key, Object kValue, String column, Object value) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("table", table);
		map.put("key", key);
		map.put("kValue", kValue);
		map.put("column", column);
		map.put("value", value);
		return permissionMapper.updateOneColumnByKey(map);
	}
	
	/**
	 * 更新权限.
	 * 
	 * @param id
	 *            编号
	 * @param name
	 *            名称
	 * @param role
	 *            角色
	 * @param menuIds
	 *            菜单编号数组
	 * @return 成功条目数
	 */
	public int updatePermission(int id, String name, int role, String[] menuIds) {
		Permission permission = new Permission();
		permission.setId(id);
		permission.setName(name);
		permission.setRole(role);
		permissionMapper.updatePermission(permission);
		permissionMapper.deletePermissionMenusByPermissionId(id);
		return this.insertPermissionMenus(id, menuIds);
	}

}

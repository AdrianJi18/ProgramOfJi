package com.jh.service;

import java.util.List;
import java.util.Map;

import com.jh.pojo.Menu1;

public interface MenuService {
	
	/**
	 * 首页菜单显示,根据用户角色查询级别1的菜单.
	 * 
	 * @param permissionId
	 *            权限编号
	 * @return 菜单集合
	 */
	public List<Map<String, Object>> selectLevel1Menus(Integer permissionId);
	
	/**
	 * 根据权限和等级1编号查询子菜单.
	 * 
	 * @param permissionId
	 *            权限编号
	 * @param menuId
	 *            等级1编号
	 * @return 菜单集合
	 */
	public List<Menu1> getMenusByPermissionLevel1(Integer permissionId, int menuId);
	
	/**
	 * 获取menu组成的html.
	 * 
	 * @return html
	 */
	public Object[] getMenusHtml();

}

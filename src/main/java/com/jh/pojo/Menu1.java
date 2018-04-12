package com.jh.pojo;

import java.util.ArrayList;
import java.util.List;

import com.jh.pojo.Menu1;

public class Menu1 {
    private Integer id;

    private String name;

    private Integer pid;
    private Integer level;

    private String path;

    private String img;
    
    /**
	 * 子菜单.
	 */
	private List<Menu1> children = new ArrayList<Menu1>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }
    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }
    
    /**
	 * 添加子菜单.
	 * 
	 * @param menu
	 *            子菜单
	 */
	public void addChild(Menu1 menu) {
		children.add(menu);
	}
	
	/**
	 * 获取子菜单集合.
	 * 
	 * @return 子菜单集合
	 */
	public List<Menu1> getChildren() {
		return children;
	}
}
package com.jh.pojo;

import java.util.Date;

import com.jh.common.ElementTag;


public class VisitLog {
    private Integer id;

    @ElementTag(name = "用户名")
    private String userName;

    @ElementTag(name = "访问时间")
    private Date visitime;

    @ElementTag(name = "退出时间")
    private Date exitime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public Date getVisitime() {
        return visitime;
    }

    public void setVisitime(Date visitime) {
        this.visitime = visitime;
    }

    public Date getExitime() {
        return exitime;
    }

    public void setExitime(Date exitime) {
        this.exitime = exitime;
    }
}
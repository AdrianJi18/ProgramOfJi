package com.jh.pojo;

import java.util.Date;

import com.jh.common.ElementTag;


public class OperateLog {
    private Integer id;

    @ElementTag(name = "操作用户")
    private String userName;

    @ElementTag(name = "操作时间")
    private Date time;

    @ElementTag(name = "操作类型" + "-" + "operateLogTypeMap")
    private Integer type;

    @ElementTag(name = "操作对象")
    private String description;

    @ElementTag(name = "操作结果")
    private String result;

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

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result == null ? null : result.trim();
    }
}
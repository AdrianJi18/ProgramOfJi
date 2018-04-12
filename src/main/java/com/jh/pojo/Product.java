package com.jh.pojo;

public class Product {
    private Integer id;

    private Integer aId;

    private String img;

    private String desciption;

    private String use;

    private String productqc;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getaId() {
        return aId;
    }

    public void setaId(Integer aId) {
        this.aId = aId;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }

    public String getDesciption() {
        return desciption;
    }

    public void setDesciption(String desciption) {
        this.desciption = desciption == null ? null : desciption.trim();
    }

    public String getUse() {
        return use;
    }

    public void setUse(String use) {
        this.use = use == null ? null : use.trim();
    }

    public String getProductqc() {
        return productqc;
    }

    public void setProductqc(String productqc) {
        this.productqc = productqc == null ? null : productqc.trim();
    }
}
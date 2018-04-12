/**
 * @type 公共组件
 */
var globalComponent = {
	pagingPageSize : 20,
	progress : {
		task : null,
		msgBox : null,
		startProgress : function(msg) {
			globalComponent.progress.msgBox = Ext.MessageBox.show({
				title : "请等待",// 消息框标题
				msg : msg,// 显示的文本
				width : 240,// 宽度
				progress : true,// 标示为进度条
				closable : false
					// 不可以关闭
				});
			// 进度条被刷新的次数
			var count = 0;
			// 进度
			var percentage = 0;
			globalComponent.progress.task = {
				run : function() {
					if (count == 5) {
						count = 0;
					}
					count++;
					// 计算进度
					percentage = count / 5;
					// 更新进度条
					globalComponent.progress.msgBox.updateProgress(percentage);
				},
				interval : 1000
				// 每秒更新
			};

			Ext.TaskMgr.start(globalComponent.progress.task);
		},
		stopProgress : function() {
			if (globalComponent.progress.msgBox != null) {
				Ext.TaskMgr.stop(globalComponent.progress.task);
				globalComponent.progress.msgBox.hide();
			}
		}
	},
	rowNumberer : function(store) {
		return new Ext.grid.RowNumberer({
					width : 50,
					header : "编号",
					align : 'center',
					renderer : function(value, metadata, record, rowIndex) {
						if (!store.startNum || !store.lastOptions.params
								|| !store.lastOptions.params.start) {
							store.startNum = 1;
						}
						return store.startNum + rowIndex;
					}
				});
	},
	pagingToolbar : function(store) {
		return new Ext.PagingToolbar({
					pageSize : globalComponent.pagingPageSize,
					store : store,
					displayInfo : true,
					displayMsg : "显示 {0} - {1} 共 {2} 条",
					emptyMsg : "没有数据显示.",
					beforePageText : "页码",
					afterPageText :"共 {0} 页",
					firstText : "首页",
					lastText : "末页",
					nextText : "下一页",
					prevText : "上一页",
					refreshText :"刷新",
					doLoad : function(start) {
						store.startNum = start + 1;
						store.load({
									params : {
										start : start,
										limit : globalComponent.pagingPageSize
									}
								});
					}
				});
	}
};
Ext.ns('Ext.ux.form.NumberField');
Ext.ux.form.NumberField = Ext.extend(Ext.form.NumberField, {
			tooltip : null,
			onRender : function(ct, position) {
				Ext.ux.form.NumberField.superclass.onRender.call(this, ct,
						position);
				this.blankText = "";
				this.maxLengthText = "";
				this.minLengthText = "";
				this.regexText = "";
				this.maxText = "";
				this.minText = "";
				this.invalidText = "";
				if (this.tooltip) {
					var id = this.id;
					var cmp = Ext.getCmp(this.id);
					new Ext.ToolTip({
								target : id,
								bodyBorder : true,
								width : 100,
								// title : this.tooltip.title || '信息提示',
								html : this.tooltip,
								listeners : {
									render : function() {
										var p = cmp.getPosition();
										var size = cmp.getSize();
										var pp = [p[0] + size.width / 2,
												p[1] + size.height];
										this.showAt(pp);
									}
								}
							});
				}
			}
		});
Ext.reg('uxnumberField', Ext.ux.form.NumberField);

Ext.ns('Ext.ux.form.TextField');
Ext.ux.form.TextField = Ext.extend(Ext.form.TextField, {
			tooltip : null,
			onRender : function(ct, position) {
				Ext.ux.form.TextField.superclass.onRender.call(this, ct,
						position);
				if (this.tooltip)
					new Ext.ToolTip({
								target : this.id,
								draggable : true,
								bodyBorder : true,
								// title : this.tooltip.title || '信息提示',
								html : this.tooltip
							});
			}
		});
Ext.reg('uxtextField', Ext.ux.form.TextField);


Ext.ux.TabCloseMenu = function() {
	var tabs = null, menu = null, ctxItem = null;
	this.init = function(tp) {
		tabs = tp;
		tabs.on('contextmenu', onContextMenu);
	};
	function onContextMenu(ts, item, e) {
		if (!menu) {
			menu = new Ext.menu.Menu([{
						id : tabs.id + '-close',
						text : "关闭该页",
						handler : function() {
							tabs.remove(ctxItem);
						}
					}, {
						id : tabs.id + '-close-others',
						text : "关闭其它页",
						handler : function() {
							tabs.items.each(function(item) {
										if (item.closable && item != ctxItem) {
											tabs.remove(item);
										}
									});
						}
					}, {
						id : tabs.id + '-close-all',
						text : "关闭所有页",
						handler : function() {
							tabs.items.each(function(item) {
										if (item.closable) {
											tabs.remove(item);
										}
									});
						}
					}]);
		}
		ctxItem = item;
		var items = menu.items;
		items.get(tabs.id + '-close').setDisabled(!item.closable);
		var disableOthers = true;
		tabs.items.each(function() {
					if (this != item && this.closable) {
						disableOthers = false;
						return false;
					}
				});
		items.get(tabs.id + '-close-others').setDisabled(disableOthers);
		menu.showAt(e.getPoint());
	}
};
if('function' !== typeof RegExp.escape){
	RegExp.escape = function(s){
		if('string' !== typeof s){
			return s;
		}
		return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	};
}

// create namespace
Ext.ns('Ext.ux.form');
Ext.ux.form.LovCombo = Ext.extend(Ext.form.ComboBox, {
	checkField:'checked',
	separator:',',
	initComponent:function(){
		// template with checkbox
		if(!this.tpl){
			this.tpl = '<tpl for=".">'
				+'<div class="x-combo-list-item">'
				+'<img src="' + Ext.BLANK_IMAGE_URL + '" '
				+'class="ux-lovcombo-icon ux-lovcombo-icon-'
				+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
				+'<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ '}</div>'
				+'</div>'
				+'</tpl>';
		}
		// call parent
		Ext.ux.form.LovCombo.superclass.initComponent.apply(this, arguments);
		// install internal event handlers
		this.on({
			scope:this,
			beforequery:this.onBeforeQuery,
			blur:this.onRealBlur
		});
		// remove selection from input field
		this.onLoad = this.onLoad.createSequence(function(){
			if(this.el){
				var v = this.el.dom.value;
				this.el.dom.value = '';
				this.el.dom.value = v;
			}
		});
	},
	initEvents:function(){
		Ext.ux.form.LovCombo.superclass.initEvents.apply(this, arguments);
		this.keyNav.tab = false;
	},
	clearValue:function(){
		this.value = '';
		this.setRawValue(this.value);
		this.store.clearFilter();
		this.store.each(function(r){
			r.set(this.checkField, false);
		}, this);
		if(this.hiddenField){
			this.hiddenField.value = '';
		}
		this.applyEmptyText();
	},
	getCheckedDisplay:function(){
		var re = new RegExp(this.separator, "g");
		return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
	},
	getCheckedValue:function(field){
		field = field || this.valueField;
		var c = [];
		var snapshot = this.store.snapshot || this.store.data;
		snapshot.each(function(r){
			if(r.get(this.checkField)){
				c.push(r.get(field));
			}
		},this);
		return c.join(this.separator);
	},
	onBeforeQuery:function(qe){
		qe.query = qe.query.replace(new RegExp(this.getCheckedDisplay() + '[ ' + this.separator + ']*'), '');
	},
	onRealBlur:function(){
		this.list.hide();
		var rv = this.getRawValue();
		var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
		var va = [];
		var snapshot = this.store.snapshot || this.store.data;
		Ext.each(rva, function(v){
			snapshot.each(function(r){
				if(v === r.get(this.displayField)){
					va.push(r.get(this.valueField));
				}
			},this);
		},this);
		this.setValue(va.join(this.separator));
		this.store.clearFilter();
	},
	onSelect:function(record, index){
		if(this.fireEvent('beforeselect', this, record, index) !== false){
			record.set(this.checkField, !record.get(this.checkField));
			if(this.store.isFiltered()){
				this.doQuery(this.allQuery);
			}
			this.setValue(this.getCheckedValue());
			this.fireEvent('select', this, record, index);
		}
	},
	setValue:function(v){
		if(v){
			v = '' + v;
			if(this.valueField){
				this.store.clearFilter();
				this.store.each(function(r){
					var checked = !(!v.match('(^|' + this.separator + ')' 
					+ RegExp.escape(r.get(this.valueField))+'(' + this.separator + '|$)'));
					r.set(this.checkField, checked);
				}, this);
				this.value = this.getCheckedValue();
				this.setRawValue(this.getCheckedDisplay());
				if(this.hiddenField){
					this.hiddenField.value = this.value;
				}
			}
			else{
				this.value = v;
				this.setRawValue(v);
				if(this.hiddenField){
					this.hiddenField.value = v;
				}
			}
			if(this.el){
				this.el.removeClass(this.emptyClass);
			}
		}
		else{
			this.clearValue();
		}
	},
	selectAll:function(){
		this.store.each(function(record){
			record.set(this.checkField, true);
		}, this);
		//display full list
		this.doQuery(this.allQuery);
		this.setValue(this.getCheckedValue());
	},
	deselectAll:function(){
		this.clearValue();
	}
});
// register xtype
Ext.reg('lovcombo', Ext.ux.form.LovCombo);
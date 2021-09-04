(function() {
  this.Brand = React.createClass({
    getInitialState: function() {
      return {
        edit: false
      };
    },
    handleToggle: function(e) {
      e.preventDefault();
      return this.setState({
        edit: !this.state.edit
      });
    },
    handleDelete: function(e) {
      if (confirm("Are you sure?")) {
        e.preventDefault();
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });
        return $.ajax({
          method: 'DELETE',
          url: "/brands/" + this.props.brand.id,
          dataType: 'JSON',
          success: (function(_this) {
            return function() {
              return _this.props.handleDeleteBrand(_this.props.brand);
            };
          })(this)
        });
      }
    },
    handleEdit: function(e) {
      var data;
      e.preventDefault();
      data = {
        code: this.refs.code.value,
        description: this.refs.description.value
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.ajax({
        method: 'PUT',
        url: "/brands/" + this.props.brand.id,
        dataType: 'JSON',
        data: {
          brand: data
        },
        success: (function(_this) {
          return function(data) {
            _this.setState({
              edit: false
            });
            return _this.props.handleEditBrand(_this.props.brand, data);
          };
        })(this)
      });
    },
    brandRow: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.a({
        href: "/brands/" + this.props.brand.id
      }, this.props.brand.code)), React.DOM.td(null, this.props.brand.description), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini',
        onClick: this.handleToggle
      }, 'Edit'), ' ', React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleDelete
      }, 'Destroy')));
    },
    brandForm: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.brand.code,
        ref: 'code'
      })), React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'description',
        defaultValue: this.props.brand.description,
        ref: 'description'
      })), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini btn-default',
        onClick: this.handleEdit
      }, 'Update'), React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleToggle
      }, 'Cancel')));
    },
    render: function() {
      if (this.state.edit) {
        return this.brandForm();
      } else {
        return this.brandRow();
      }
    }
  });

}).call(this);
(function() {
  this.BrandForm = React.createClass({
    getInitialState: function() {
      return {
        code: '',
        description: ''
      };
    },
    handleSubmit: function(e) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.post('/brands', {
        brand: this.state
      }, (function(_this) {
        return function(data) {
          _this.props.handleNewBrand(data);
          return _this.setState(_this.getInitialState());
        };
      })(this), 'JSON');
    },
    render: function() {
      return React.DOM.form({
        className: 'form-inline',
        onSubmit: this.handleSubmit
      }, React.DOM.input({
        type: 'text',
        placeholder: 'Code',
        name: 'code',
        value: this.state.code,
        onChange: this.handleChange
      }), React.DOM.input({
        type: 'text',
        placeholder: 'Description',
        name: 'description',
        value: this.state.description,
        onChange: this.handleChange
      }), React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !this.valid()
      }, 'Create'));
    },
    handleChange: function(e) {
      var name, obj;
      name = e.target.name;
      return this.setState((
        obj = {},
        obj["" + name] = e.target.value,
        obj
      ));
    },
    valid: function() {
      return this.state.code && this.state.description;
    }
  });

}).call(this);
(function() {
  this.Brands = React.createClass({
    getInitialState: function() {
      return {
        items: this.props.data
      };
    },
    getDefaultProps: function() {
      return {
        items: []
      };
    },
    addItem: function(item) {
      var items;
      items = React.addons.update(this.state.items, {
        $push: [item]
      });
      return this.setState({
        items: items
      });
    },
    deleteItem: function(item) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1]]
      });
      return this.replaceState({
        items: items
      });
    },
    updateItem: function(item, data) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1, data]]
      });
      return this.replaceState({
        items: items
      });
    },
    render: function() {
      var item;
      return React.DOM.div({
        className: 'brands'
      }, React.DOM.h1({
        className: 'title'
      }, this.props.page_header), React.createElement(BrandForm, {
        handleNewBrand: this.addItem,
        form_data: this.props.form_data
      }), React.DOM.hr(null), React.DOM.table({
        className: 'table table-striped'
      }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Code'), React.DOM.th(null, 'Description'), React.DOM.th(null, 'Actions'))), React.DOM.tbody(null, (function() {
        var i, len, ref, results;
        ref = this.state.items;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(React.createElement(Brand, {
            key: item.id,
            brand: item,
            handleDeleteBrand: this.deleteItem,
            handleEditBrand: this.updateItem,
            form_data: this.props.form_data
          }));
        }
        return results;
      }).call(this))));
    }
  });

}).call(this);
(function() {
  this.Categories = React.createClass({
    getInitialState: function() {
      return {
        items: this.props.data
      };
    },
    getDefaultProps: function() {
      return {
        items: []
      };
    },
    addItem: function(item) {
      var items;
      items = React.addons.update(this.state.items, {
        $push: [item]
      });
      return this.setState({
        items: items
      });
    },
    deleteItem: function(item) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1]]
      });
      return this.replaceState({
        items: items
      });
    },
    updateItem: function(item, data) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1, data]]
      });
      return this.replaceState({
        items: items
      });
    },
    render: function() {
      var item;
      return React.DOM.div({
        className: 'categories'
      }, React.DOM.h1({
        className: 'title'
      }, this.props.page_header), React.createElement(CategoryForm, {
        handleNewCategory: this.addItem,
        form_data: this.props.form_data
      }), React.DOM.hr(null), React.DOM.table({
        className: 'table table-striped'
      }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Code'), React.DOM.th(null, 'Description'), React.DOM.th(null, 'Actions'))), React.DOM.tbody(null, (function() {
        var i, len, ref, results;
        ref = this.state.items;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(React.createElement(Category, {
            key: item.id,
            category: item,
            handleDeleteCategory: this.deleteItem,
            handleEditCategory: this.updateItem,
            form_data: this.props.form_data
          }));
        }
        return results;
      }).call(this))));
    }
  });

}).call(this);
(function() {
  this.Category = React.createClass({
    getInitialState: function() {
      return {
        edit: false
      };
    },
    handleToggle: function(e) {
      e.preventDefault();
      return this.setState({
        edit: !this.state.edit
      });
    },
    handleDelete: function(e) {
      if (confirm("Are you sure?")) {
        e.preventDefault();
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });
        return $.ajax({
          method: 'DELETE',
          url: "/categories/" + this.props.category.id,
          dataType: 'JSON',
          success: (function(_this) {
            return function() {
              return _this.props.handleDeleteCategory(_this.props.category);
            };
          })(this)
        });
      }
    },
    handleEdit: function(e) {
      var data;
      e.preventDefault();
      data = {
        code: this.refs.code.value,
        description: this.refs.description.value
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.ajax({
        method: 'PUT',
        url: "/categories/" + this.props.category.id,
        dataType: 'JSON',
        data: {
          category: data
        },
        success: (function(_this) {
          return function(data) {
            _this.setState({
              edit: false
            });
            return _this.props.handleEditCategory(_this.props.category, data);
          };
        })(this)
      });
    },
    categoryRow: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.a({
        href: "/categories/" + this.props.category.id
      }, this.props.category.code)), React.DOM.td(null, this.props.category.description), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini',
        onClick: this.handleToggle
      }, 'Edit'), ' ', React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleDelete
      }, 'Destroy')));
    },
    categoryForm: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.category.code,
        ref: 'code'
      })), React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'description',
        defaultValue: this.props.category.description,
        ref: 'description'
      })), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini btn-default',
        onClick: this.handleEdit
      }, 'Update'), React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleToggle
      }, 'Cancel')));
    },
    render: function() {
      if (this.state.edit) {
        return this.categoryForm();
      } else {
        return this.categoryRow();
      }
    }
  });

}).call(this);
(function() {
  this.CategoryForm = React.createClass({
    getInitialState: function() {
      return {
        code: '',
        description: ''
      };
    },
    handleSubmit: function(e) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.post('/categories', {
        category: this.state
      }, (function(_this) {
        return function(data) {
          _this.props.handleNewCategory(data);
          return _this.setState(_this.getInitialState());
        };
      })(this), 'JSON');
    },
    render: function() {
      return React.DOM.form({
        className: 'form-inline',
        onSubmit: this.handleSubmit
      }, React.DOM.input({
        type: 'text',
        placeholder: 'Code',
        name: 'code',
        value: this.state.code,
        onChange: this.handleChange
      }), React.DOM.input({
        type: 'text',
        placeholder: 'Description',
        name: 'description',
        value: this.state.description,
        onChange: this.handleChange
      }), React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !this.valid()
      }, 'Create'));
    },
    handleChange: function(e) {
      var name, obj;
      name = e.target.name;
      return this.setState((
        obj = {},
        obj["" + name] = e.target.value,
        obj
      ));
    },
    valid: function() {
      return this.state.code && this.state.description;
    }
  });

}).call(this);
(function() {
  this.DocumentType = React.createClass({
    getInitialState: function() {
      return {
        edit: false
      };
    },
    handleToggle: function(e) {
      e.preventDefault();
      return this.setState({
        edit: !this.state.edit
      });
    },
    handleDelete: function(e) {
      if (confirm("Are you sure?")) {
        e.preventDefault();
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });
        return $.ajax({
          method: 'DELETE',
          url: "/document_types/" + this.props.document_type.id,
          dataType: 'JSON',
          success: (function(_this) {
            return function() {
              return _this.props.handleDeleteDocumentType(_this.props.document_type);
            };
          })(this)
        });
      }
    },
    handleEdit: function(e) {
      var data;
      e.preventDefault();
      data = {
        description: this.refs.description.value,
        account_type: this.refs.account_type.value,
        stock_type: this.refs.stock_type.value,
        stock: this.refs.stock.checked
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.ajax({
        method: 'PUT',
        url: "/document_types/" + this.props.document_type.id,
        dataType: 'JSON',
        data: {
          document_type: data
        },
        success: (function(_this) {
          return function(data) {
            _this.setState({
              edit: false
            });
            return _this.props.handleEditDocumentType(_this.props.document_type, data);
          };
        })(this)
      });
    },
    documentTypeRow: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.a({
        href: "/document_types/" + this.props.document_type.id
      }, this.props.document_type.description)), React.DOM.td(null, this.props.document_type.account_type), React.DOM.td(null, this.props.document_type.stock_type), React.DOM.td(null, this.props.document_type.stock ? 'Yes' : 'No'), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini',
        onClick: this.handleToggle
      }, 'Edit'), ' ', React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleDelete
      }, 'Destroy')));
    },
    documentTypeForm: function() {
      var option;
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.document_type.description,
        ref: 'description'
      })), React.DOM.td(null, React.DOM.select({
        defaultValue: this.props.document_type.account_type,
        ref: 'account_type'
      }, React.DOM.option({
        value: ''
      }, this.props.form_data.select_prompt), (function() {
        var i, len, ref, results;
        ref = this.props.form_data.account_types;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          option = ref[i];
          results.push(React.DOM.option({
            value: option
          }, option));
        }
        return results;
      }).call(this))), React.DOM.td(null, React.DOM.select({
        ref: 'stock_type',
        defaultValue: this.props.document_type.stock_type
      }, React.DOM.option({
        value: ''
      }, this.props.form_data.select_prompt), (function() {
        var i, len, ref, results;
        ref = this.props.form_data.stock_types;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          option = ref[i];
          results.push(React.DOM.option({
            value: option
          }, option));
        }
        return results;
      }).call(this))), React.DOM.td(null, React.DOM.input({
        type: 'checkbox',
        defaultChecked: this.props.document_type.stock,
        value: 1,
        ref: 'stock'
      })), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini btn-default',
        onClick: this.handleEdit
      }, 'Update'), React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleToggle
      }, 'Cancel')));
    },
    render: function() {
      if (this.state.edit) {
        return this.documentTypeForm();
      } else {
        return this.documentTypeRow();
      }
    }
  });

}).call(this);
(function() {
  this.DocumentTypeForm = React.createClass({
    getInitialState: function() {
      return {
        description: '',
        account_type: '',
        stock_type: '',
        stock: ''
      };
    },
    handleSubmit: function(e) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.post('/document_types', {
        document_type: this.state
      }, (function(_this) {
        return function(data) {
          _this.props.handleNewDocumentType(data);
          return _this.setState(_this.getInitialState());
        };
      })(this), 'JSON');
    },
    render: function() {
      var option;
      return React.DOM.form({
        className: 'form-inline',
        onSubmit: this.handleSubmit
      }, React.DOM.input({
        type: 'text',
        placeholder: 'Description',
        name: 'description',
        value: this.state.description,
        onChange: this.handleChange
      }), React.DOM.select({
        name: 'account_type',
        value: this.state.account_type,
        onChange: this.handleChange
      }, React.DOM.option({
        value: ''
      }, this.props.form_data.select_prompt), (function() {
        var i, len, ref, results;
        ref = this.props.form_data.account_types;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          option = ref[i];
          results.push(React.DOM.option({
            value: option
          }, option));
        }
        return results;
      }).call(this)), React.DOM.select({
        name: 'stock_type',
        value: this.state.stock_type,
        onChange: this.handleChange
      }, React.DOM.option({
        value: ''
      }, this.props.form_data.select_prompt), (function() {
        var i, len, ref, results;
        ref = this.props.form_data.stock_types;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          option = ref[i];
          results.push(React.DOM.option({
            value: option
          }, option));
        }
        return results;
      }).call(this)), ' ', React.DOM.label({
        className: 'checkbox'
      }, React.DOM.input({
        type: 'checkbox',
        name: 'stock',
        value: 1,
        onChange: this.handleChange,
        checked: this.state.stock
      }), 'Stock'), ' ', React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !this.valid()
      }, 'Create'));
    },
    handleChange: function(e) {
      var name, obj, value;
      name = e.target.name;
      if (e.target.name !== 'stock') {
        value = e.target.value;
      } else if (e.target.checked) {
        value = 1;
      } else {
        value = 0;
      }
      return this.setState((
        obj = {},
        obj["" + name] = value,
        obj
      ));
    },
    valid: function() {
      return this.state.description && this.state.account_type && this.state.stock_type;
    }
  });

}).call(this);
(function() {
  this.DocumentTypes = React.createClass({
    getInitialState: function() {
      return {
        document_types: this.props.data
      };
    },
    getDefaultProps: function() {
      return {
        document_types: []
      };
    },
    addDocumentType: function(document_type) {
      var document_types;
      document_types = React.addons.update(this.state.document_types, {
        $push: [document_type]
      });
      return this.setState({
        document_types: document_types
      });
    },
    deleteDocumentType: function(document_type) {
      var document_types, index;
      index = this.state.document_types.indexOf(document_type);
      document_types = React.addons.update(this.state.document_types, {
        $splice: [[index, 1]]
      });
      return this.replaceState({
        document_types: document_types
      });
    },
    updateDocumentType: function(document_type, data) {
      var document_types, index;
      index = this.state.document_types.indexOf(document_type);
      document_types = React.addons.update(this.state.document_types, {
        $splice: [[index, 1, data]]
      });
      return this.replaceState({
        document_types: document_types
      });
    },
    render: function() {
      var document_type;
      return React.DOM.div({
        className: 'document-types'
      }, React.DOM.h1({
        className: 'title'
      }, this.props.page_header), React.createElement(DocumentTypeForm, {
        handleNewDocumentType: this.addDocumentType,
        form_data: this.props.form_data
      }), React.DOM.hr(null), React.DOM.table({
        className: 'table table-striped'
      }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Description'), React.DOM.th(null, 'Account Type'), React.DOM.th(null, 'Stock Type'), React.DOM.th(null, 'Stock'), React.DOM.th(null, 'Actions'))), React.DOM.tbody(null, (function() {
        var i, len, ref, results;
        ref = this.state.document_types;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          document_type = ref[i];
          results.push(React.createElement(DocumentType, {
            key: document_type.id,
            document_type: document_type,
            handleDeleteDocumentType: this.deleteDocumentType,
            handleEditDocumentType: this.updateDocumentType,
            form_data: this.props.form_data
          }));
        }
        return results;
      }).call(this))));
    }
  });

}).call(this);
(function() {
  this.PaymentType = React.createClass({
    getInitialState: function() {
      return {
        edit: false
      };
    },
    handleToggle: function(e) {
      e.preventDefault();
      return this.setState({
        edit: !this.state.edit
      });
    },
    handleDelete: function(e) {
      if (confirm("Are you sure?")) {
        e.preventDefault();
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });
        return $.ajax({
          method: 'DELETE',
          url: "/payment_types/" + this.props.payment_type.id,
          dataType: 'JSON',
          success: (function(_this) {
            return function() {
              return _this.props.handleDeletePaymentType(_this.props.payment_type);
            };
          })(this)
        });
      }
    },
    handleEdit: function(e) {
      var data;
      e.preventDefault();
      data = {
        code: this.refs.code.value,
        description: this.refs.description.value
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.ajax({
        method: 'PUT',
        url: "/payment_types/" + this.props.payment_type.id,
        dataType: 'JSON',
        data: {
          payment_type: data
        },
        success: (function(_this) {
          return function(data) {
            _this.setState({
              edit: false
            });
            return _this.props.handleEditPaymentType(_this.props.payment_type, data);
          };
        })(this)
      });
    },
    paymentTypeRow: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.a({
        href: "/payment_types/" + this.props.payment_type.id
      }, this.props.payment_type.code)), React.DOM.td(null, this.props.payment_type.description), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini',
        onClick: this.handleToggle
      }, 'Edit'), ' ', React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleDelete
      }, 'Destroy')));
    },
    paymentTypeForm: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.payment_type.code,
        ref: 'code'
      })), React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'description',
        defaultValue: this.props.payment_type.description,
        ref: 'description'
      })), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini btn-default',
        onClick: this.handleEdit
      }, 'Update'), React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleToggle
      }, 'Cancel')));
    },
    render: function() {
      if (this.state.edit) {
        return this.paymentTypeForm();
      } else {
        return this.paymentTypeRow();
      }
    }
  });

}).call(this);
(function() {
  this.PaymentTypeForm = React.createClass({
    getInitialState: function() {
      return {
        code: '',
        description: ''
      };
    },
    handleSubmit: function(e) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.post('/payment_types', {
        payment_type: this.state
      }, (function(_this) {
        return function(data) {
          _this.props.handleNewPaymentType(data);
          return _this.setState(_this.getInitialState());
        };
      })(this), 'JSON');
    },
    render: function() {
      return React.DOM.form({
        className: 'form-inline',
        onSubmit: this.handleSubmit
      }, React.DOM.input({
        type: 'text',
        placeholder: 'Code',
        name: 'code',
        value: this.state.code,
        onChange: this.handleChange
      }), React.DOM.input({
        type: 'text',
        placeholder: 'Description',
        name: 'description',
        value: this.state.description,
        onChange: this.handleChange
      }), React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !this.valid()
      }, 'Create'));
    },
    handleChange: function(e) {
      var name, obj;
      name = e.target.name;
      return this.setState((
        obj = {},
        obj["" + name] = e.target.value,
        obj
      ));
    },
    valid: function() {
      return this.state.code && this.state.description;
    }
  });

}).call(this);
(function() {
  this.PaymentTypes = React.createClass({
    getInitialState: function() {
      return {
        items: this.props.data
      };
    },
    getDefaultProps: function() {
      return {
        items: []
      };
    },
    addItem: function(item) {
      var items;
      items = React.addons.update(this.state.items, {
        $push: [item]
      });
      return this.setState({
        items: items
      });
    },
    deleteItem: function(item) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1]]
      });
      return this.replaceState({
        items: items
      });
    },
    updateItem: function(item, data) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1, data]]
      });
      return this.replaceState({
        items: items
      });
    },
    render: function() {
      var item;
      return React.DOM.div({
        className: 'payment_types'
      }, React.DOM.h1({
        className: 'title'
      }, this.props.page_header), React.createElement(PaymentTypeForm, {
        handleNewPaymentType: this.addItem,
        form_data: this.props.form_data
      }), React.DOM.hr(null), React.DOM.table({
        className: 'table table-striped'
      }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Code'), React.DOM.th(null, 'Description'), React.DOM.th(null, 'Actions'))), React.DOM.tbody(null, (function() {
        var i, len, ref, results;
        ref = this.state.items;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(React.createElement(PaymentType, {
            key: item.id,
            payment_type: item,
            handleDeletePaymentType: this.deleteItem,
            handleEditPaymentType: this.updateItem,
            form_data: this.props.form_data
          }));
        }
        return results;
      }).call(this))));
    }
  });

}).call(this);
(function() {
  this.Warehouse = React.createClass({
    getInitialState: function() {
      return {
        edit: false
      };
    },
    handleToggle: function(e) {
      e.preventDefault();
      return this.setState({
        edit: !this.state.edit
      });
    },
    handleDelete: function(e) {
      if (confirm("Are you sure?")) {
        e.preventDefault();
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });
        return $.ajax({
          method: 'DELETE',
          url: "/warehouses/" + this.props.warehouse.id,
          dataType: 'JSON',
          success: (function(_this) {
            return function() {
              return _this.props.handleDeleteWarehouse(_this.props.warehouse);
            };
          })(this)
        });
      }
    },
    handleEdit: function(e) {
      var data;
      e.preventDefault();
      data = {
        code: this.refs.code.value,
        name: this.refs.name.value,
        city: this.refs.city.value
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.ajax({
        method: 'PUT',
        url: "/warehouses/" + this.props.warehouse.id,
        dataType: 'JSON',
        data: {
          warehouse: data
        },
        success: (function(_this) {
          return function(data) {
            _this.setState({
              edit: false
            });
            return _this.props.handleEditWarehouse(_this.props.warehouse, data);
          };
        })(this)
      });
    },
    warehouseRow: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.a({
        href: "/warehouses/" + this.props.warehouse.id
      }, this.props.warehouse.code)), React.DOM.td(null, this.props.warehouse.name), React.DOM.td(null, this.props.warehouse.city), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini',
        onClick: this.handleToggle
      }, 'Edit'), ' ', React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleDelete
      }, 'Destroy')));
    },
    warehouseForm: function() {
      return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.warehouse.code,
        ref: 'code'
      })), React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.warehouse.name,
        ref: 'name'
      })), React.DOM.td(null, React.DOM.input({
        className: 'form-control',
        type: 'text',
        defaultValue: this.props.warehouse.city,
        ref: 'city'
      })), React.DOM.td(null, React.DOM.a({
        className: 'btn btn-mini btn-default',
        onClick: this.handleEdit
      }, 'Update'), React.DOM.a({
        className: 'btn btn-mini btn-danger',
        onClick: this.handleToggle
      }, 'Cancel')));
    },
    render: function() {
      if (this.state.edit) {
        return this.warehouseForm();
      } else {
        return this.warehouseRow();
      }
    }
  });

}).call(this);
(function() {
  this.WarehouseForm = React.createClass({
    getInitialState: function() {
      return {
        code: '',
        name: '',
        city: ''
      };
    },
    handleSubmit: function(e) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      return $.post('/warehouses', {
        warehouse: this.state
      }, (function(_this) {
        return function(data) {
          _this.props.handleNewWarehouse(data);
          return _this.setState(_this.getInitialState());
        };
      })(this), 'JSON');
    },
    render: function() {
      return React.DOM.form({
        className: 'form-inline',
        onSubmit: this.handleSubmit
      }, React.DOM.input({
        type: 'text',
        placeholder: 'Code',
        name: 'code',
        value: this.state.code,
        onChange: this.handleChange
      }), React.DOM.input({
        type: 'text',
        placeholder: 'Name',
        name: 'name',
        value: this.state.name,
        onChange: this.handleChange
      }), React.DOM.input({
        type: 'text',
        placeholder: 'City',
        name: 'city',
        value: this.state.city,
        onChange: this.handleChange
      }), React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !this.valid()
      }, 'Create'));
    },
    handleChange: function(e) {
      var name, obj;
      name = e.target.name;
      return this.setState((
        obj = {},
        obj["" + name] = e.target.value,
        obj
      ));
    },
    valid: function() {
      return this.state.code && this.state.name;
    }
  });

}).call(this);
(function() {
  this.Warehouses = React.createClass({
    getInitialState: function() {
      return {
        items: this.props.data
      };
    },
    getDefaultProps: function() {
      return {
        items: []
      };
    },
    addItem: function(item) {
      var items;
      items = React.addons.update(this.state.items, {
        $push: [item]
      });
      return this.setState({
        items: items
      });
    },
    deleteItem: function(item) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1]]
      });
      return this.replaceState({
        items: items
      });
    },
    updateItem: function(item, data) {
      var index, items;
      index = this.state.items.indexOf(item);
      items = React.addons.update(this.state.items, {
        $splice: [[index, 1, data]]
      });
      return this.replaceState({
        items: items
      });
    },
    render: function() {
      var item;
      return React.DOM.div({
        className: 'warehouses'
      }, React.DOM.h1({
        className: 'title'
      }, this.props.page_header), React.createElement(WarehouseForm, {
        handleNewWarehouse: this.addItem,
        form_data: this.props.form_data
      }), React.DOM.hr(null), React.DOM.table({
        className: 'table table-striped'
      }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Code'), React.DOM.th(null, 'Name'), React.DOM.th(null, 'City'), React.DOM.th(null, 'Actions'))), React.DOM.tbody(null, (function() {
        var i, len, ref, results;
        ref = this.state.items;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(React.createElement(Warehouse, {
            key: item.id,
            warehouse: item,
            handleDeleteWarehouse: this.deleteItem,
            handleEditWarehouse: this.updateItem,
            form_data: this.props.form_data
          }));
        }
        return results;
      }).call(this))));
    }
  });

}).call(this);

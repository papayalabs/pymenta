Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Brand = function (_ref) {
  var brand = _ref.brand;
  var handleDeleteBrand = _ref.handleDeleteBrand;
  var handleEditBrand = _ref.handleEditBrand;

  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var edit = _useState2[0];
  var setEdit = _useState2[1];

  var codeRef = (0, _react.useRef)(null);
  var descriptionRef = (0, _react.useRef)(null);

  var handleToggle = function (e) {
    e.preventDefault();
    setEdit(!edit);
  };

  var handleDelete = function (e) {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        method: 'DELETE',
        url: '/brands/' + brand.id,
        dataType: 'JSON',
        success: function () {
          handleDeleteBrand(brand);
        }
      });
    }
  };

  var handleEdit = function (e) {
    e.preventDefault();
    var data = {
      code: codeRef.current.value,
      description: descriptionRef.current.value
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: '/brands/' + brand.id,
      dataType: 'JSON',
      data: { brand: data },
      success: function (updatedBrand) {
        setEdit(false);
        handleEditBrand(brand, updatedBrand);
      }
    });
  };

  var brandRow = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'a',
          { href: '/brands/' + brand.id },
          brand.code
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        brand.description
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini', onClick: handleToggle },
          'Edit'
        ),
        ' ',
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleDelete },
          'Destroy'
        )
      )
    );
  };

  var brandForm = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: brand.code,
          ref: codeRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: brand.description,
          ref: descriptionRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-default', onClick: handleEdit },
          'Update'
        ),
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleToggle },
          'Cancel'
        )
      )
    );
  };

  return edit ? brandForm() : brandRow();
};

exports['default'] = Brand;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var BrandForm = function (_ref) {
  var handleNewBrand = _ref.handleNewBrand;

  var _useState = (0, _react.useState)({
    code: '',
    description: ''
  });

  var _useState2 = _slicedToArray(_useState, 2);

  var formState = _useState2[0];
  var setFormState = _useState2[1];

  var handleSubmit = function (e) {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/brands', { brand: formState }, function (data) {
      handleNewBrand(data);
      setFormState({ code: '', description: '' });
    }, 'JSON');
  };

  var handleChange = function (e) {
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;

    setFormState(function (prevState) {
      return _extends({}, prevState, _defineProperty({}, name, value));
    });
  };

  var isValid = function () {
    return formState.code && formState.description;
  };

  return _react2['default'].createElement(
    'form',
    { className: 'form-inline', onSubmit: handleSubmit },
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Code',
      name: 'code',
      value: formState.code,
      onChange: handleChange
    }),
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Description',
      name: 'description',
      value: formState.description,
      onChange: handleChange
    }),
    _react2['default'].createElement(
      'button',
      {
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !isValid()
      },
      'Create'
    )
  );
};

exports['default'] = BrandForm;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CategoryForm = require('./CategoryForm');

var _CategoryForm2 = _interopRequireDefault(_CategoryForm);

var _Category = require('./Category');

var _Category2 = _interopRequireDefault(_Category);

var Categories = function (_ref) {
  var data = _ref.data;
  var page_header = _ref.page_header;
  var form_data = _ref.form_data;

  var _useState = (0, _react.useState)(data || []);

  var _useState2 = _slicedToArray(_useState, 2);

  var items = _useState2[0];
  var setItems = _useState2[1];

  var addItem = function (item) {
    setItems(function (prevItems) {
      return [].concat(_toConsumableArray(prevItems), [item]);
    });
  };

  var deleteItem = function (item) {
    setItems(function (prevItems) {
      return prevItems.filter(function (i) {
        return i !== item;
      });
    });
  };

  var updateItem = function (item, updatedData) {
    setItems(function (prevItems) {
      return prevItems.map(function (i) {
        return i === item ? updatedData : i;
      });
    });
  };

  return _react2['default'].createElement(
    'div',
    { className: 'categories' },
    _react2['default'].createElement(
      'h1',
      { className: 'title' },
      page_header
    ),
    _react2['default'].createElement(_CategoryForm2['default'], { handleNewCategory: addItem, form_data: form_data }),
    _react2['default'].createElement('hr', null),
    _react2['default'].createElement(
      'table',
      { className: 'table table-striped' },
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'th',
            null,
            'Code'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Description'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Actions'
          )
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        items.map(function (item) {
          return _react2['default'].createElement(_Category2['default'], {
            key: item.id,
            category: item,
            handleDeleteCategory: deleteItem,
            handleEditCategory: updateItem,
            form_data: form_data
          });
        })
      )
    )
  );
};

exports['default'] = Categories;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Category = function (_ref) {
  var category = _ref.category;
  var handleDeleteCategory = _ref.handleDeleteCategory;
  var handleEditCategory = _ref.handleEditCategory;

  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var edit = _useState2[0];
  var setEdit = _useState2[1];

  var codeRef = (0, _react.useRef)(null);
  var descriptionRef = (0, _react.useRef)(null);

  var handleToggle = function (e) {
    e.preventDefault();
    setEdit(!edit);
  };

  var handleDelete = function (e) {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        method: 'DELETE',
        url: '/categories/' + category.id,
        dataType: 'JSON',
        success: function () {
          handleDeleteCategory(category);
        }
      });
    }
  };

  var handleEdit = function (e) {
    e.preventDefault();
    var data = {
      code: codeRef.current.value,
      description: descriptionRef.current.value
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: '/categories/' + category.id,
      dataType: 'JSON',
      data: { category: data },
      success: function (updatedCategory) {
        setEdit(false);
        handleEditCategory(category, updatedCategory);
      }
    });
  };

  var categoryRow = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'a',
          { href: '/categories/' + category.id },
          category.code
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        category.description
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini', onClick: handleToggle },
          'Edit'
        ),
        ' ',
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleDelete },
          'Destroy'
        )
      )
    );
  };

  var categoryForm = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: category.code,
          ref: codeRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: category.description,
          ref: descriptionRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-default', onClick: handleEdit },
          'Update'
        ),
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleToggle },
          'Cancel'
        )
      )
    );
  };

  return edit ? categoryForm() : categoryRow();
};

exports['default'] = Category;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CategoryForm = function (_ref) {
  var handleNewCategory = _ref.handleNewCategory;

  var _useState = (0, _react.useState)({
    code: '',
    description: ''
  });

  var _useState2 = _slicedToArray(_useState, 2);

  var formState = _useState2[0];
  var setFormState = _useState2[1];

  var handleSubmit = function (e) {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/categories', { category: formState }, function (data) {
      handleNewCategory(data);
      setFormState({ code: '', description: '' });
    }, 'JSON');
  };

  var handleChange = function (e) {
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;

    setFormState(function (prevState) {
      return _extends({}, prevState, _defineProperty({}, name, value));
    });
  };

  var isValid = function () {
    return formState.code && formState.description;
  };

  return _react2['default'].createElement(
    'form',
    { className: 'form-inline', onSubmit: handleSubmit },
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Code',
      name: 'code',
      value: formState.code,
      onChange: handleChange
    }),
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Description',
      name: 'description',
      value: formState.description,
      onChange: handleChange
    }),
    _react2['default'].createElement(
      'button',
      {
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !isValid()
      },
      'Create'
    )
  );
};

exports['default'] = CategoryForm;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DocumentType = function (_ref) {
  var document_type = _ref.document_type;
  var handleDeleteDocumentType = _ref.handleDeleteDocumentType;
  var handleEditDocumentType = _ref.handleEditDocumentType;
  var form_data = _ref.form_data;

  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var edit = _useState2[0];
  var setEdit = _useState2[1];

  var descriptionRef = (0, _react.useRef)(null);
  var accountTypeRef = (0, _react.useRef)(null);
  var stockTypeRef = (0, _react.useRef)(null);
  var stockRef = (0, _react.useRef)(null);

  var handleToggle = function (e) {
    e.preventDefault();
    setEdit(!edit);
  };

  var handleDelete = function (e) {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        method: 'DELETE',
        url: '/document_types/' + document_type.id,
        dataType: 'JSON',
        success: function () {
          handleDeleteDocumentType(document_type);
        }
      });
    }
  };

  var handleEdit = function (e) {
    e.preventDefault();
    var data = {
      description: descriptionRef.current.value,
      account_type: accountTypeRef.current.value,
      stock_type: stockTypeRef.current.value,
      stock: stockRef.current.checked
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: '/document_types/' + document_type.id,
      dataType: 'JSON',
      data: { document_type: data },
      success: function (updatedDocumentType) {
        setEdit(false);
        handleEditDocumentType(document_type, updatedDocumentType);
      }
    });
  };

  var documentTypeRow = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'a',
          { href: '/document_types/' + document_type.id },
          document_type.description
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        document_type.account_type
      ),
      _react2['default'].createElement(
        'td',
        null,
        document_type.stock_type
      ),
      _react2['default'].createElement(
        'td',
        null,
        document_type.stock ? 'Yes' : 'No'
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini', onClick: handleToggle },
          'Edit'
        ),
        ' ',
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleDelete },
          'Destroy'
        )
      )
    );
  };

  var documentTypeForm = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: document_type.description,
          ref: descriptionRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'select',
          {
            defaultValue: document_type.account_type,
            ref: accountTypeRef
          },
          _react2['default'].createElement(
            'option',
            { value: '' },
            form_data.select_prompt
          ),
          form_data.account_types.map(function (option) {
            return _react2['default'].createElement(
              'option',
              { key: option, value: option },
              option
            );
          })
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'select',
          {
            defaultValue: document_type.stock_type,
            ref: stockTypeRef
          },
          _react2['default'].createElement(
            'option',
            { value: '' },
            form_data.select_prompt
          ),
          form_data.stock_types.map(function (option) {
            return _react2['default'].createElement(
              'option',
              { key: option, value: option },
              option
            );
          })
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          type: 'checkbox',
          defaultChecked: document_type.stock,
          ref: stockRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-default', onClick: handleEdit },
          'Update'
        ),
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleToggle },
          'Cancel'
        )
      )
    );
  };

  return edit ? documentTypeForm() : documentTypeRow();
};

exports['default'] = DocumentType;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DocumentTypeForm = function (_ref) {
  var handleNewDocumentType = _ref.handleNewDocumentType;
  var form_data = _ref.form_data;

  var _useState = (0, _react.useState)({
    description: '',
    account_type: '',
    stock_type: '',
    stock: false
  });

  var _useState2 = _slicedToArray(_useState, 2);

  var formState = _useState2[0];
  var setFormState = _useState2[1];

  var handleSubmit = function (e) {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/document_types', { document_type: formState }, function (data) {
      handleNewDocumentType(data);
      setFormState({ description: '', account_type: '', stock_type: '', stock: false });
    }, 'JSON');
  };

  var handleChange = function (e) {
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;
    var checked = _e$target.checked;
    var type = _e$target.type;

    setFormState(function (prevState) {
      return _extends({}, prevState, _defineProperty({}, name, type === 'checkbox' ? checked : value));
    });
  };

  var isValid = function () {
    return formState.description && formState.account_type && formState.stock_type;
  };

  return _react2['default'].createElement(
    'form',
    { className: 'form-inline', onSubmit: handleSubmit },
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Description',
      name: 'description',
      value: formState.description,
      onChange: handleChange
    }),
    _react2['default'].createElement(
      'select',
      {
        name: 'account_type',
        value: formState.account_type,
        onChange: handleChange
      },
      _react2['default'].createElement(
        'option',
        { value: '' },
        form_data.select_prompt
      ),
      form_data.account_types.map(function (option) {
        return _react2['default'].createElement(
          'option',
          { key: option, value: option },
          option
        );
      })
    ),
    _react2['default'].createElement(
      'select',
      {
        name: 'stock_type',
        value: formState.stock_type,
        onChange: handleChange
      },
      _react2['default'].createElement(
        'option',
        { value: '' },
        form_data.select_prompt
      ),
      form_data.stock_types.map(function (option) {
        return _react2['default'].createElement(
          'option',
          { key: option, value: option },
          option
        );
      })
    ),
    ' ',
    _react2['default'].createElement(
      'label',
      { className: 'checkbox' },
      _react2['default'].createElement('input', {
        type: 'checkbox',
        name: 'stock',
        checked: formState.stock,
        onChange: handleChange
      }),
      'Stock'
    ),
    ' ',
    _react2['default'].createElement(
      'button',
      {
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !isValid()
      },
      'Create'
    )
  );
};

exports['default'] = DocumentTypeForm;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentTypeForm = require('./DocumentTypeForm');

var _DocumentTypeForm2 = _interopRequireDefault(_DocumentTypeForm);

var _DocumentType = require('./DocumentType');

var _DocumentType2 = _interopRequireDefault(_DocumentType);

var DocumentTypes = function (_ref) {
  var data = _ref.data;
  var page_header = _ref.page_header;
  var form_data = _ref.form_data;

  var _useState = (0, _react.useState)(data || []);

  var _useState2 = _slicedToArray(_useState, 2);

  var documentTypes = _useState2[0];
  var setDocumentTypes = _useState2[1];

  var addDocumentType = function (documentType) {
    setDocumentTypes(function (prevDocumentTypes) {
      return [].concat(_toConsumableArray(prevDocumentTypes), [documentType]);
    });
  };

  var deleteDocumentType = function (documentType) {
    setDocumentTypes(function (prevDocumentTypes) {
      return prevDocumentTypes.filter(function (dt) {
        return dt !== documentType;
      });
    });
  };

  var updateDocumentType = function (documentType, updatedData) {
    setDocumentTypes(function (prevDocumentTypes) {
      return prevDocumentTypes.map(function (dt) {
        return dt === documentType ? updatedData : dt;
      });
    });
  };

  return _react2['default'].createElement(
    'div',
    { className: 'document-types' },
    _react2['default'].createElement(
      'h1',
      { className: 'title' },
      page_header
    ),
    _react2['default'].createElement(_DocumentTypeForm2['default'], { handleNewDocumentType: addDocumentType, form_data: form_data }),
    _react2['default'].createElement('hr', null),
    _react2['default'].createElement(
      'table',
      { className: 'table table-striped' },
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'th',
            null,
            'Description'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Account Type'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Stock Type'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Stock'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Actions'
          )
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        documentTypes.map(function (documentType) {
          return _react2['default'].createElement(_DocumentType2['default'], {
            key: documentType.id,
            document_type: documentType,
            handleDeleteDocumentType: deleteDocumentType,
            handleEditDocumentType: updateDocumentType,
            form_data: form_data
          });
        })
      )
    )
  );
};

exports['default'] = DocumentTypes;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PaymentType = function (_ref) {
  var payment_type = _ref.payment_type;
  var handleDeletePaymentType = _ref.handleDeletePaymentType;
  var handleEditPaymentType = _ref.handleEditPaymentType;

  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var edit = _useState2[0];
  var setEdit = _useState2[1];

  var codeRef = (0, _react.useRef)(null);
  var descriptionRef = (0, _react.useRef)(null);

  var handleToggle = function (e) {
    e.preventDefault();
    setEdit(!edit);
  };

  var handleDelete = function (e) {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        method: 'DELETE',
        url: '/payment_types/' + payment_type.id,
        dataType: 'JSON',
        success: function () {
          handleDeletePaymentType(payment_type);
        }
      });
    }
  };

  var handleEdit = function (e) {
    e.preventDefault();
    var data = {
      code: codeRef.current.value,
      description: descriptionRef.current.value
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: '/payment_types/' + payment_type.id,
      dataType: 'JSON',
      data: { payment_type: data },
      success: function (updatedPaymentType) {
        setEdit(false);
        handleEditPaymentType(payment_type, updatedPaymentType);
      }
    });
  };

  var paymentTypeRow = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'a',
          { href: '/payment_types/' + payment_type.id },
          payment_type.code
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        payment_type.description
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini', onClick: handleToggle },
          'Edit'
        ),
        ' ',
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleDelete },
          'Destroy'
        )
      )
    );
  };

  var paymentTypeForm = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: payment_type.code,
          ref: codeRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: payment_type.description,
          ref: descriptionRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-default', onClick: handleEdit },
          'Update'
        ),
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleToggle },
          'Cancel'
        )
      )
    );
  };

  return edit ? paymentTypeForm() : paymentTypeRow();
};

exports['default'] = PaymentType;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PaymentTypeForm = function (_ref) {
  var handleNewPaymentType = _ref.handleNewPaymentType;

  var _useState = (0, _react.useState)({
    code: '',
    description: ''
  });

  var _useState2 = _slicedToArray(_useState, 2);

  var formState = _useState2[0];
  var setFormState = _useState2[1];

  var handleSubmit = function (e) {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/payment_types', { payment_type: formState }, function (data) {
      handleNewPaymentType(data);
      setFormState({ code: '', description: '' });
    }, 'JSON');
  };

  var handleChange = function (e) {
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;

    setFormState(function (prevState) {
      return _extends({}, prevState, _defineProperty({}, name, value));
    });
  };

  var isValid = function () {
    return formState.code && formState.description;
  };

  return _react2['default'].createElement(
    'form',
    { className: 'form-inline', onSubmit: handleSubmit },
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Code',
      name: 'code',
      value: formState.code,
      onChange: handleChange
    }),
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Description',
      name: 'description',
      value: formState.description,
      onChange: handleChange
    }),
    _react2['default'].createElement(
      'button',
      {
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !isValid()
      },
      'Create'
    )
  );
};

exports['default'] = PaymentTypeForm;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PaymentTypeForm = require('./PaymentTypeForm');

var _PaymentTypeForm2 = _interopRequireDefault(_PaymentTypeForm);

var _PaymentType = require('./PaymentType');

var _PaymentType2 = _interopRequireDefault(_PaymentType);

var PaymentTypes = function (_ref) {
  var data = _ref.data;
  var page_header = _ref.page_header;
  var form_data = _ref.form_data;

  var _useState = (0, _react.useState)(data || []);

  var _useState2 = _slicedToArray(_useState, 2);

  var items = _useState2[0];
  var setItems = _useState2[1];

  var addItem = function (item) {
    setItems(function (prevItems) {
      return [].concat(_toConsumableArray(prevItems), [item]);
    });
  };

  var deleteItem = function (item) {
    setItems(function (prevItems) {
      return prevItems.filter(function (i) {
        return i !== item;
      });
    });
  };

  var updateItem = function (item, updatedData) {
    setItems(function (prevItems) {
      return prevItems.map(function (i) {
        return i === item ? updatedData : i;
      });
    });
  };

  return _react2['default'].createElement(
    'div',
    { className: 'payment_types' },
    _react2['default'].createElement(
      'h1',
      { className: 'title' },
      page_header
    ),
    _react2['default'].createElement(_PaymentTypeForm2['default'], { handleNewPaymentType: addItem, form_data: form_data }),
    _react2['default'].createElement('hr', null),
    _react2['default'].createElement(
      'table',
      { className: 'table table-striped' },
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'th',
            null,
            'Code'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Description'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Actions'
          )
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        items.map(function (item) {
          return _react2['default'].createElement(_PaymentType2['default'], {
            key: item.id,
            payment_type: item,
            handleDeletePaymentType: deleteItem,
            handleEditPaymentType: updateItem,
            form_data: form_data
          });
        })
      )
    )
  );
};

exports['default'] = PaymentTypes;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Warehouse = function (_ref) {
  var warehouse = _ref.warehouse;
  var handleDeleteWarehouse = _ref.handleDeleteWarehouse;
  var handleEditWarehouse = _ref.handleEditWarehouse;

  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var edit = _useState2[0];
  var setEdit = _useState2[1];

  var codeRef = (0, _react.useRef)(null);
  var nameRef = (0, _react.useRef)(null);
  var cityRef = (0, _react.useRef)(null);

  var handleToggle = function (e) {
    e.preventDefault();
    setEdit(!edit);
  };

  var handleDelete = function (e) {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      $.ajaxSetup({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        method: 'DELETE',
        url: '/warehouses/' + warehouse.id,
        dataType: 'JSON',
        success: function () {
          handleDeleteWarehouse(warehouse);
        }
      });
    }
  };

  var handleEdit = function (e) {
    e.preventDefault();
    var data = {
      code: codeRef.current.value,
      name: nameRef.current.value,
      city: cityRef.current.value
    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      method: 'PUT',
      url: '/warehouses/' + warehouse.id,
      dataType: 'JSON',
      data: { warehouse: data },
      success: function (updatedWarehouse) {
        setEdit(false);
        handleEditWarehouse(warehouse, updatedWarehouse);
      }
    });
  };

  var warehouseRow = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'a',
          { href: '/warehouses/' + warehouse.id },
          warehouse.code
        )
      ),
      _react2['default'].createElement(
        'td',
        null,
        warehouse.name
      ),
      _react2['default'].createElement(
        'td',
        null,
        warehouse.city
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini', onClick: handleToggle },
          'Edit'
        ),
        ' ',
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleDelete },
          'Destroy'
        )
      )
    );
  };

  var warehouseForm = function () {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: warehouse.code,
          ref: codeRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: warehouse.name,
          ref: nameRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement('input', {
          className: 'form-control',
          type: 'text',
          defaultValue: warehouse.city,
          ref: cityRef
        })
      ),
      _react2['default'].createElement(
        'td',
        null,
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-default', onClick: handleEdit },
          'Update'
        ),
        _react2['default'].createElement(
          'button',
          { className: 'btn btn-mini btn-danger', onClick: handleToggle },
          'Cancel'
        )
      )
    );
  };

  return edit ? warehouseForm() : warehouseRow();
};

exports['default'] = Warehouse;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var WarehouseForm = function (_ref) {
  var handleNewWarehouse = _ref.handleNewWarehouse;

  var _useState = (0, _react.useState)({
    code: '',
    name: '',
    city: ''
  });

  var _useState2 = _slicedToArray(_useState, 2);

  var formState = _useState2[0];
  var setFormState = _useState2[1];

  var handleSubmit = function (e) {
    e.preventDefault();
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post('/warehouses', { warehouse: formState }, function (data) {
      handleNewWarehouse(data);
      setFormState({ code: '', name: '', city: '' });
    }, 'JSON');
  };

  var handleChange = function (e) {
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;

    setFormState(function (prevState) {
      return _extends({}, prevState, _defineProperty({}, name, value));
    });
  };

  var isValid = function () {
    return formState.code && formState.name;
  };

  return _react2['default'].createElement(
    'form',
    { className: 'form-inline', onSubmit: handleSubmit },
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Code',
      name: 'code',
      value: formState.code,
      onChange: handleChange
    }),
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'Name',
      name: 'name',
      value: formState.name,
      onChange: handleChange
    }),
    _react2['default'].createElement('input', {
      type: 'text',
      placeholder: 'City',
      name: 'city',
      value: formState.city,
      onChange: handleChange
    }),
    _react2['default'].createElement(
      'button',
      {
        type: 'submit',
        className: 'btn btn-primary',
        disabled: !isValid()
      },
      'Create'
    )
  );
};

exports['default'] = WarehouseForm;
module.exports = exports['default'];
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WarehouseForm = require('./WarehouseForm');

var _WarehouseForm2 = _interopRequireDefault(_WarehouseForm);

var _Warehouse = require('./Warehouse');

var _Warehouse2 = _interopRequireDefault(_Warehouse);

var Warehouses = function (_ref) {
  var data = _ref.data;
  var page_header = _ref.page_header;
  var form_data = _ref.form_data;

  var _useState = (0, _react.useState)(data || []);

  var _useState2 = _slicedToArray(_useState, 2);

  var items = _useState2[0];
  var setItems = _useState2[1];

  var addItem = function (item) {
    setItems(function (prevItems) {
      return [].concat(_toConsumableArray(prevItems), [item]);
    });
  };

  var deleteItem = function (item) {
    setItems(function (prevItems) {
      return prevItems.filter(function (i) {
        return i !== item;
      });
    });
  };

  var updateItem = function (item, updatedData) {
    setItems(function (prevItems) {
      return prevItems.map(function (i) {
        return i === item ? updatedData : i;
      });
    });
  };

  return _react2['default'].createElement(
    'div',
    { className: 'warehouses' },
    _react2['default'].createElement(
      'h1',
      { className: 'title' },
      page_header
    ),
    _react2['default'].createElement(_WarehouseForm2['default'], { handleNewWarehouse: addItem, form_data: form_data }),
    _react2['default'].createElement('hr', null),
    _react2['default'].createElement(
      'table',
      { className: 'table table-striped' },
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'th',
            null,
            'Code'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Name'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'City'
          ),
          _react2['default'].createElement(
            'th',
            null,
            'Actions'
          )
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        items.map(function (item) {
          return _react2['default'].createElement(_Warehouse2['default'], {
            key: item.id,
            warehouse: item,
            handleDeleteWarehouse: deleteItem,
            handleEditWarehouse: updateItem,
            form_data: form_data
          });
        })
      )
    )
  );
};

exports['default'] = Warehouses;
module.exports = exports['default'];

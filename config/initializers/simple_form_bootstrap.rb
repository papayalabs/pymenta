# Use this setup block to configure all options available in SimpleForm.
SimpleForm.setup do |config|
  config.error_notification_class = 'px-4 py-3 rounded relative bg-red-100 border border-red-400 text-red-700'
  config.button_class = 'px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
  config.boolean_label_class = nil

  config.wrappers :vertical_form, tag: 'div', class: 'mb-4', error_class: 'has-error' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2'

    b.use :input, class: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    b.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
    b.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
  end

  config.wrappers :vertical_file_input, tag: 'div', class: 'mb-4', error_class: 'has-error' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :readonly
    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2'

    b.use :input, class: 'border py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
    b.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
    b.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
  end

  config.wrappers :vertical_boolean, tag: 'div', class: 'mb-4', error_class: 'has-error' do |b|
    b.use :html5
    b.optional :readonly

    b.wrapper tag: 'div', class: 'flex items-center' do |ba|
      ba.use :label_input, class: 'mr-2'
    end

    b.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
    b.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
  end

  config.wrappers :vertical_radio_and_checkboxes, tag: 'div', class: 'mb-4', error_class: 'has-error' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2'
    b.use :input, class: 'mr-2'
    b.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
    b.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
  end

  config.wrappers :horizontal_form, tag: 'div', class: 'mb-4 flex flex-wrap', error_class: 'has-error' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2 w-full md:w-1/4 md:pr-4'

    b.wrapper tag: 'div', class: 'w-full md:w-3/4' do |ba|
      ba.use :input, class: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      ba.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
      ba.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
    end
  end

  config.wrappers :horizontal_file_input, tag: 'div', class: 'mb-4 flex flex-wrap', error_class: 'has-error' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :readonly
    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2 w-full md:w-1/4 md:pr-4'

    b.wrapper tag: 'div', class: 'w-full md:w-3/4' do |ba|
      ba.use :input, class: 'py-2'
      ba.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
      ba.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
    end
  end

  config.wrappers :horizontal_boolean, tag: 'div', class: 'mb-4 flex flex-wrap', error_class: 'has-error' do |b|
    b.use :html5
    b.optional :readonly

    b.wrapper tag: 'div', class: 'w-full md:w-3/4 md:ml-1/4' do |wr|
      wr.wrapper tag: 'div', class: 'flex items-center' do |ba|
        ba.use :label_input, class: 'mr-2'
      end

      wr.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
      wr.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
    end
  end

  config.wrappers :horizontal_radio_and_checkboxes, tag: 'div', class: 'mb-4 flex flex-wrap', error_class: 'has-error' do |b|
    b.use :html5
    b.optional :readonly

    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2 w-full md:w-1/4 md:pr-4'

    b.wrapper tag: 'div', class: 'w-full md:w-3/4' do |ba|
      ba.use :input, class: 'mr-2'
      ba.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
      ba.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
    end
  end

  config.wrappers :inline_form, tag: 'div', class: 'inline-block mr-2', error_class: 'has-error' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'sr-only'

    b.use :input, class: 'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    b.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic' }
    b.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic' }
  end

  config.wrappers :multi_select, tag: 'div', class: 'mb-4', error_class: 'has-error' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'block text-gray-700 text-sm font-bold mb-2'
    b.wrapper tag: 'div', class: 'flex flex-wrap' do |ba|
      ba.use :input, class: 'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      ba.use :error, wrap_with: { tag: 'span', class: 'text-red-500 text-xs italic w-full mt-1' }
      ba.use :hint,  wrap_with: { tag: 'p', class: 'text-gray-600 text-xs italic w-full mt-1' }
    end
  end
  # Wrappers for forms and inputs using the Bootstrap toolkit.
  # Check the Bootstrap docs (http://getbootstrap.com)
  # to learn about the different styles for forms and inputs,
  # buttons and other elements.
  config.default_wrapper = :vertical_form
  config.wrapper_mappings = {
    check_boxes: :vertical_radio_and_checkboxes,
    radio_buttons: :vertical_radio_and_checkboxes,
    file: :vertical_file_input,
    boolean: :vertical_boolean,
    datetime: :multi_select,
    date: :multi_select,
    time: :multi_select
  }
end

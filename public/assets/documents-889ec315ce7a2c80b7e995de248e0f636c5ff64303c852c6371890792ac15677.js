(function() {
  $(document).ready(function() {
    return $("#autocomplete").autocomplete({
      minLength: 2,
      source: function(request, response) {
        $.ajax({
          url: $("#autocomplete").data('ajax_path'),
          data: {
            query: request.term
          },
          dataType: "json",
          success: function(data) {
            return response(data);
          }
        });
      },
      select: function(event, ui) {
        $.ajax({
          url: $("#autocomplete").data('ajax_path_2'),
          data: "product_id=" + ui.item.value,
          dataType: "html",
          success: function(data) {
            return $("#product_description").html(data);
          }
        });
      }
    });
  });

}).call(this);

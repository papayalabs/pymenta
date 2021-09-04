(function() {
  $(document).ready(function() {
    return $("#autocomplete_warehouse").autocomplete({
      minLength: 2,
      source: function(request, response) {
        $.ajax({
          url: $("#autocomplete_warehouse").data('ajax_autocomplete_path'),
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
          url: $("#autocomplete_warehouse").data('ajax_info_path'),
          data: "warehouse_id=" + ui.item.value,
          dataType: "html",
          success: function(data) {
            return $("#warehouse_name").html(data);
          }
        });
      }
    });
  });

}).call(this);

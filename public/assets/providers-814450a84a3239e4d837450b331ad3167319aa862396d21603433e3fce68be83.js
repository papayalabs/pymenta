(function() {
  $(document).ready(function() {
    return $("#autocomplete_provider").autocomplete({
      minLength: 2,
      source: function(request, response) {
        $.ajax({
          url: $("#autocomplete_provider").data('ajax_autocomplete_path'),
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
          url: $("#autocomplete_provider").data('ajax_info_path'),
          data: "provider_id=" + ui.item.value,
          dataType: "html",
          success: function(data) {
            return $("#provider_name").html(data);
          }
        });
      }
    });
  });

}).call(this);

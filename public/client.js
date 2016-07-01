$(function(){

  $("#button").click( function(){
    var input = $("#myInput").val();
    $.get('/api?search=' + input, function(search) {
      var quote = search.title + ": " + search.quote;
      var quoted = quote.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var finalQuote = "<h2 id=\"tablerow\" class=\"row\">" + quoted + "</h2>";
      if (search === ""){
        var badInput = "What the hell are you doing?";
        var badQuote = "<h2 id=\"tablerow\" class=\"row\">" + badInput + "</h2>";
        $('.row').remove();
        setTimeout(function() {
          $("#search").append(badQuote);}, 250);
      } else {
        $('h2').remove();
        $('#search').append(finalQuote);
      }
    });
  });
  $('#myInput').on("keydown", function search(e){
    if (e.keyCode == 13){
      e.preventDefault();
      $('#button').click();
    }
  });
});

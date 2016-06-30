$(function(){

  $.get('/api', searchFunction);

  funtion searchFunction(search) {
    var quote = search;
    var finalQuote = "<tr><td>" + quote.title + ": " + quote.quote + "</tr></td>";
    $('table').append(finalQuote);
  }
}); 

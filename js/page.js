(function($, NS, SuperClass,SubClass) {
	window[NS][SubClass] = window[NS][SubClass] || window[NS][SuperClass].extend({
	toString:function(){return NS + '.' + SubClass;},
    /** Constructor. */
    init : function(cfg) {
      $("#btnGetJson").on('click',{url:'data/employees.json'},$.proxy(this.loadEmployees,this));
    },
    
    /**
     * Fetches the employee list from the specified url.
     */
    loadEmployees : function(e) {
      var strTemplate=$("#txaTemplate").val(), 
          markup=[];
      
      $.ajax({
        url: e.data.url,
        contentType: "application/json; charset=utf-8", /*send to server*/
        dataType: "json", /*expect from server*/
        success: function(data,xhr,status){
          $.each(data,function(){
            markup.push(strTemplate.tmpl(this));
          });
          $("#lstNames").html(markup.join(""));
        }
      });      
    }
  });

  /* Attach page specific behavior on page load */
  $(function() {
    return new window[NS][SubClass]();
  });
}(jQuery, "PRJ","Base","Page"));
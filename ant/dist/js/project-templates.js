
$(document).ready(function() {
    var template = window["JST"]["../static/handlebars/test/test.hbs"],
        content = template({title: 'Project Template', body: 'This is the project body'});
    $('#content-from-hbs-template').html(content);
});
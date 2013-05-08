directory.Book = Backbone.Model.extend({
	defaults :{
		title:"title",
		author:"author",
		status:"Not Read"
	},

    urlRoot:"http://172.27.166.66/directory-rest-php/index.php/book"

});

directory.BookCollection = Backbone.Collection.extend({
    model: directory.Book,

    url:"http://172.27.166.66/directory-rest-php/index.php/books"
});

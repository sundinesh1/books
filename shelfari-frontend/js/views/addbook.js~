directory.AddBookView = Backbone.View.extend({

	render:function () {
		this.$el.html(this.template());
		return this;
	},
    
	events:{
		"click #save":"addBook"
	},
	
	addBook: function(event){
		var title = $('#title').val();
		var author = $('#author').val();
		var status = $('#status').val();
		if(title.length < 1 || author.length < 1){
			alert("Please enter all the fields");
			return;
		}
		$('#title').val("");
		$('#author').val("");
		var newBook = new directory.Book({'title':title, 'author':author, 'status':status});	
		newBook.save({
			success:function(model, response){
				alert("Successfully added the book.");
				console.log("Successfully saved");
			},
			error:function(model, error){
				alert("There were issues while adding the book. Please try again later.");
				console.log(model.toJSON());
				console.log('error.responseText');
			}
		});
	}

});

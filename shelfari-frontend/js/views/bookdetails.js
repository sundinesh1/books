directory.BookView = Backbone.View.extend({

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		$('#details', this.el).html(new directory.BookSummary({model:this.model}).render().el);
		return this;
	}
});

directory.BookSummary = Backbone.View.extend({

	initialize:function () {
		this.model.on("change", this.render, this);
		console.log($('#status').val());
	},

	render:function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	events:{
		"click #save":"updateBook",
		"click #delete":"removeBook"
	},
	
	updateBook: function(event){
		var title = $('#title').val();
		var bookid = $('#bookid').val();
		var author = $('#author').val();
		var status = $('#status').val();
		if(title.length < 1 || author.length < 1){
			alert("Please enter all the fields");
			return;
		}
		var upd = new directory.Book({'id':bookid, 'title':title, 'author':author, 'status':status});	
		upd.save({
			success:function(model, response){
				alert("Successfully saved the book details.");
				console.log();
			},
			error:function(model, error){
				alert("There were issues while updating the book. Please try again later.");
				console.log(model.toJSON());
				console.log('error.responseText');
			}
		});
	},

	removeBook: function(event){
		var title = $('#title').val();
		var bookid = $('#bookid').val();
		var author = $('#author').val();
		var status = $('#status').val();
		$('#title').val("");
		$('#bookid').val("");
		$('#author').val("");
		if(!bookid) {
			alert("Please select a book to remove.");
			return;
		}
		var upd = new directory.Book({'id':bookid, 'title':title, 'author':author, 'status':status});	
		upd.destroy({
			success:function(model, response){
				alert("Successfully removed the book");
				console.log("Successfully saved");
			},
			error:function(model, error){
				alert("There were issues while removing the book. Please try again later.");
				console.log(model.toJSON());
				console.log('error.responseText');
			}
		});
	}

});



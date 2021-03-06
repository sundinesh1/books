var directory = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (directory[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    directory[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

directory.Router = Backbone.Router.extend({

    routes: {
        "":         "home",
        "addbook":  "addbook",
        "book/:id": "bookDetails"
    },

    initialize: function () {
        directory.shellView = new directory.ShellView();
        $('body').html(directory.shellView.render().el);
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
        this.$content = $("#content");
    },

    home: function () {
        if (!directory.homelView) {
            directory.homelView = new directory.HomeView();
            directory.homelView.render();
        } else {
            directory.homelView.delegateEvents(); 
        }
        this.$content.html(directory.homelView.el);
        directory.shellView.selectMenuItem('home-menu');
    },

    addbook: function () {
	directory.addBookView = new directory.AddBookView();
	directory.addBookView.render();
        this.$content.html(directory.addBookView.el);
        directory.shellView.selectMenuItem('contact-menu');
    },

    bookDetails: function (id) {
        var book = new directory.Book({id: id});
        var self = this;
        book.fetch({
            success: function (data) {
                self.$content.html(new directory.BookView({model: data}).render().el);
            }
        });
        directory.shellView.selectMenuItem();
    }

});

$(document).on("ready", function () {
    directory.loadTemplates(["HomeView", "AddBookView", "ShellView", "BookView", "BookSummary", "BookListItemView"],
        function () {
            directory.router = new directory.Router();
            Backbone.history.start();
        });
});

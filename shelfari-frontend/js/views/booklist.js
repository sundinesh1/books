directory.BookListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-list',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (book) {
            self.$el.append(new directory.BookListItemView({model:book}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (book) {
            this.$el.append(new directory.BookListItemView({model:book}).render().el);
        }, this);
        return this;
    }
});

directory.BookListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        var data = _.clone(this.model.attributes);
        data.id = this.model.id;
        this.$el.html(this.template(data));
        return this;
    }

});

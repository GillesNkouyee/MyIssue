/**
 * Created by TOSHIBA on 09/07/2016.
 */

Template.cProduit.events({
    'submit form': function (c) {
        c.preventDefault();
        var produit = $(c.target).find('[name=produit]').val();
        var gamme = $(c.target).find('[name=gamme]').val();
        var quantite = $(c.target).find('[name=quantite]').val();
        var prix = $(c.target).find('[name=prix]').val();
        var total = prix*quantite;
        var doc = {
            produit: produit,
            gamme: gamme,
            quantite: quantite,
            prix:prix,
            total:total
        };
        Meteor.call('cProduit', doc);
    }
});
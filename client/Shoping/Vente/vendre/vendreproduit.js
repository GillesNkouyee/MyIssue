/**
 * Created by TOSHIBA on 09/07/2016.
 */
Template.formVente.events({
        'change #produit': function () {
            var produit = $('#produit option:selected').text();
            var Recup = Stock.findOne({'doc.produit' : produit});
            Session.set('prix', Recup.doc.prix);
            Session.set('gamme', Recup.doc.gamme);
            var quantite = $('#quantite').val();
            var prix = Session.get('prix');
            var total = prix*quantite;
            Session.set('total', total);
    },
        'change #quantite': function () {
            var quantite = $('#quantite').val();
            var prix = Session.get('prix');
            var total = prix*quantite;
            Session.set('total', total);
        }
});

Template.formVente.helpers({
    product: function() {
        return Stock.find();
    },
    prix: function () {
        return Session.get('prix');
    },
    total: function () {
        return Session.get('total');
    }
});

Template.vente.events({
    'submit #vendre': function (event) {
        event.preventDefault();
        var date = new Date();
        var produit = $('#produit option:selected').text();
        var Recup = Stock.findOne({'doc.produit' : produit});
        Session.set('prix', Recup.doc.prix);
        Session.set('gamme', Recup.doc.gamme);
        var gamme = Session.get('gamme');
        var quantite = $('#quantite').val();
        var prix = Session.get('prix');
        var total = prix*quantite;
        Ventes.insert({produit, gamme, prix, quantite, total, date});
    }
});

Template.vente.helpers({
    vendu: function () { 
        return Ventes.find();
    }
});

Template.vente.helpers({
    'newTotal': function(){
        var sum = 0;
        var cursor = Ventes.find();
        cursor.forEach(function(transaction){
            sum = sum + transaction.total;
        });
        return sum;
    }
})
/**
 * Created by TOSHIBA on 09/07/2016.
 */

Template.rProduit.helpers({
    product: function(){
        return Stock.find();
    }
});


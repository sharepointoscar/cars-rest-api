/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {

        var person = {
            firstname: req.param('firstname'),
            lastname: req.param('lastname'),
            email: req.param('email')
        };

        Person.create(person)
        .exec(function(err, model) {
            if (err) {
                if (err.invalidAttributes){
                    return res.json(422, {validationErrors: err.Errors});
                  }
            }
            else {

                console.log('PersonController:create() success!');
                res.json(200,model);
            }
        });
    },
    find: function(req,res){

        Person.find()
        .populate('cars')
        .exec(function(err,foundRecords){
            if(err) {res.negotiate(err);}
            console.log('PersonController:find() returning people found....');
            return res.json(foundRecords);
        });
    }

};


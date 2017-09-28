/**
 * CarController
 *
 * @description :: Server-side logic for managing Cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
     
         var car = {
            year: req.param('year'),
            model: req.param('model'),
            make: req.param('make')
        };

        Car.create(car)
            .exec(function(err, model) {
                if (err) {
                    if (err.invalidAttributes){
                        return res.json(422, {validationErrors: err.Errors});
                      }
                }
                else {
    
                    sails.log.silly('res.ok() :: Sending 200 ("OK") response.  Car created successfully.');
                    res.json(model);
                }
            });
    }
};


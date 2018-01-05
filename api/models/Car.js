/**
 * Car.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
 
  connections:['localMongodbServer','myLocalElasticsearch'],
  attributes: {
		year: {
			type: 'datetime'
    },
    model: {
			type: 'string'
    },
    make: {
      type: 'string',
      enum: ['Audi', 'Porsche', 'Ferrari','Maserati','Aston Martin','Lamborghini','Lotus','McLaren']
    },
    color: {
      type: 'string'
    },
    photo:{
      type:'binary'
    },
    // this car has one owner
    owner: {
      model: 'person'
    }
  },  
  afterCreate: function (car, callback){
 
    sails.log("NEW CAR: "+JSON.stringify(car,null,2));

    var DSLQuery ={
			index: 'car-api',
			type: 'car',
      id: car.id,
      parent:3434343434,
			body: JSON.stringify(car)
		};
    sails.hooks.elasticsearch.elasticClient.create(DSLQuery,function(err,response){
      if(err){sails.log("elastic search response err: "+ JSON.stringify(err,null,2));}

      sails.log(response);
      return callback()
    });
   
  },
  afterUpdate: function (value, callback){
    //this.updateIndex(value.id, value, callback)
  },
  afterDestroy: function (value, callback){
    //this.destroyIndex(value.id, callback)
  },


  // Custom validation messages
  // (available for use in this model's attribute definitions above)
  validationMessages: {
    model: {
      in: 'Invalid car model option.  Not within allowed values.'
    },
    make: {
      in: 'Invalid car make option.  Not within allowed values.'
    }
  }

};


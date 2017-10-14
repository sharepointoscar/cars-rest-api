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
			type: 'datetime',
			unique: false
    },
    model: {
			type: 'string',
      enum:['R8','Carrera','F250'],
    },
    make: {
      type: 'string',
      enum: ['Audi', 'Porsche', 'Ferrari']
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
  afterCreate: function (value, callback){
 
    sails.log(JSON.stringify(value,null,2));

    var DSLQuery ={
			index: 'car-api',
			type: 'car',
      id: value.id,
      parent:'3434343434',
			body: JSON.stringify(value)
		};
    sails.hooks.elasticsearch.elasticClient.create(DSLQuery,function(err,response){
      if(err){sails.log("elastic search response err: "+ err);}

      sails.log(response);

    });
    sails.log('hit Car.afterCreate() function, using callback()');
   
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


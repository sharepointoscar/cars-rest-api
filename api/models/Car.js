/**
 * Car.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
		year: {
			type: 'datetime',
			unique: false
    },
    model: {
			type: 'string',
			enum:['R8','Carrera','F250']
    },
    make: {
      type: 'string',
      enum: ['Audi', 'Porsche', 'Ferrari']
    },
    // this car has one owner
    owner: {
      model: 'person'
    }
  }
};


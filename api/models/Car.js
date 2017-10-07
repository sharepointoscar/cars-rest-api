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


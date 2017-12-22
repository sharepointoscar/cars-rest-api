/**
 * index.js
 *
 * @description :: This hook ensures the creation of the Elasticsearch Mappings on our models
 *                 and opens a connection to Elasticsearch for use within the application. 
 */
module.exports = function(sails){
    // private methods and variables

    var privateVar = 'hidden';
    var elasticsearch = require('elasticsearch');
    var client = new elasticsearch.Client(sails.config.connections.myLocalElasticsearch);
    return {  
        elasticClient: client,
        configure: function() {
          
        // create the elasticsearch index mapping for each of our Sails Models
        // manually for now, but we can iterate and build dynamically
        //console.log('************ CHECK SAILS MODELS HOW MANY?  ********************* ');
        // _.each(sails.models,function(model){
        //     sails.log.debug(model);
        // });
        var config = {
                index:'car-api',
                body:{
                    "settings": {
                        "number_of_shards" : 3,
                        "number_of_replicas" : 2 
                    },
                    "mappings": {
                        "person":{
                            "_all": { "enabled": false},
                            "_routing":{"required": false},
                            "properties": {
                                "email": {"type":'text'},
                                "firstname": {"type": 'text'},
                                "lastname": {"type": 'text'}
                            }
                        },
                        "car" : {
                            "_all": { "enabled": false},
                            "properties" : {
                                "year" : { "type" : "date",format:"strict_date_optional_time" },
                                "model": {"type": 'text'},
                                "make": {"type": 'text'},
                                "color": {"type": 'text'}
                            },
                            "_parent": {"type": "person"},
                            "_routing":{"required": false}
                        }
                    }
                }
        };

        if(client.indices.exists({index:'car-api'},function(err,response,status){
            
            if(err){sails.log(JSON.stringify(err));}

            //if the index does not exist create it
            if(!response){
                client.indices.create(config, function(){console.log('************ CREATE CAR INDEX ********************* ')});
                sails.log('************ INDEX CAR-API DOES NOT EXISTS CREATING ********************* ');
            }else{ 
                sails.log('************ INDEX CAR-API ALREADY EXISTS NOT CREATED ********************* ');
            }

        }));

        },
      
      // initialize is not required, but if included
      // it must return cb();
      initialize: function(cb) {    

        this.configure();
        return cb();
        
      }
    }   
}
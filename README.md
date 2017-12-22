# Cars

a [Sails](http://sailsjs.org) application

This is a sample REST API project based on SailsJS, showcases blueprints, actions and other out of the box capabilities.

# Overview
The CARS App demonstrates how to use the Microservice API Gateway Pattern.

# Architecture

  The following components are part of the overall solution
- Cars REST API
- Search Service
- MongoDB

## API Gateway
Use Apollo for GraphQL API Gateway.  All requests are handled by the gateway.

## Search
ElasticSearch is used by a custom SailsJS Hook to be able to index Car and Person objects at creation and update time.  This effectively updates the index accordingly.

## Swagger API Documentation
The sailsjs-swagger and swagger-ui are used to product the REST API documentation accessible via http://localhost:1337/docs which brings up the Swagger UI
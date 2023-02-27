// Class with a constructor method and a query method
class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;  //define endpointUrl
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery ); //define sparqlQuery
		const headers = { 'Accept': 'application/sparql-results+json' }; //execute via wikidata query service 

		return fetch( fullUrl, { headers } ).then( body => body.json() ); //Make promise 
	}
}

//define the variables endpointUrl and sparqlQuery
const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `
SELECT ?cat ?catLabel ?genderLabel
WHERE 
{
  ?cat wdt:P31 wd:Q146;
       wdt:P21 ?gender.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
}
LIMIT 20`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl ); //takes the endpointUrl as the endpoint variable in the constructor

queryDispatcher.query( sparqlQuery ).then( result => {  //take the query and resolve the objects of the result to values 
    const bindings = result.results.bindings;
    for (let i = 0; i < bindings.length; i++)  //loop over so we can see every result in the list of results
    {
        console.log( `Result ${i + 1}` );  //After each result the number of the result gets increased by one 
        console.log( `cat: ${bindings[i].cat.value}` ); //Get every cat item of the result set by increasing the var i
        console.log( `catLabel: ${bindings[i].catLabel.value}` ); //Get every catLabel item of the result set by increasing the var i
        console.log( `genderLabel: ${bindings[i].genderLabel.value}` ); //Get every genderLabel item of the result set by increasing the var i
    }
}).catch( ( result ) => {  //if the promise fails then execute the catch 
    console.log( "The query has failed: " + result ); //logs an error message if the query has failed
})

//------ Brings the values as objects instead of just values---
// queryDispatcher.query( sparqlQuery ).then( result => console.log( result.results.bindings[0].catLabel.value ) );
//------


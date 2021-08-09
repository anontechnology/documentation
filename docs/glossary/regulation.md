# Regulation

A regulation object represents a governmental regulation that impacts how you can use the data in your vault. Each data point can have a number of regulations associated with it, which makes it easier to ensure your use of the data is compliant. You can tag data with regulations when entering it into the system, or specify rules that the system will use to automatically tag regulations for you.

## Definition

There are several forms of metadata associated with regulations, as follows:

|Name |Type |Description|
|-----|-----|-----------|
|key|String|An unambiguous identifier for this regulation. Usually, this is an acronym or abbreviation.|
|name|String|A human-readable identifier for this regulation. If the regulation key is an acronym, this should spell it out.|
|url|String|The URL of a webpage containing more information about this regulation.|
|rule|[RegulationRule](/tutorials/regulation-rules)|A string or JSON object representing a rule describing what data this regulation is applicable to. See [Regulation rules](/tutorials/regulation-rules) for more information.|
|createdDate|String|An ISO 8601 representation of the timestamp when the regulation was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the regulation was most recently modified.|

## Examples

An example regulation definition representing the Children's Online Privacy Protection Act (COPPA):

```json
{
  "key" : "COPPA",
  "name" : "Children's Online Privacy Protection Act",
  "url": "http://www.ftc.gov/ogc/coppa1.htm",
  "rule": {
    "type" : "all",
    "value" : [
      {
        "type" : "subjectValue",
        "value" : {
          "attribute" : "AGE_YEARS",
          "predicate" : "lt",
          "value" : 13
        }
      },
      {
        "type" : "subjectValue",
        "value" : {
          "attribute" : "COUNTRY_OF_RESIDENCE",
          "predicate" : "eq",
          "value" : "US"
        }
      }
    ]
  },
  "createdDate" : "2020-01-01T02:18:54Z",
  "modifiedDate" : "2020-01-01T02:18:54Z"
}
```

# Attribute Schemas

Attribute schemas can be used to structure your data and to specify what form it takes, whether that is textual, numeric, or something more structured. An attribute definition can have a primitive schema, meaning that the associated data consists of a single piece of unstructured information; alternatively, an attribute definition can have a structured schema, breaking up its data into multiple sub-attributes.

The supported primitive schemas are as follows:

- `string`: For textual data, up to 126 characters long.
- `int`: For data that can be expressed as an integer.
- `boolean`: For data that takes one of the two values "true" or "false".
- `file`: For data that takes more than 126 characters to represent, such as long text files, or base64-encoded representations of image files.

Structured schemas take the form of JSON objects, which map sub-attribute keys to further attribute schemas. Thesse nested schemas can be either primitive or structured. In this way, arbitrarily complex structurse can be represented within a single attribute. To mark that a sub-attribute should be able to take on multiple values within a single data point, or that the value of a sub-attribute should be a list, enclose the name of the sub-attribute in square brackets.

## Examples

An example schema that could be used to store a person's name:

```js
{
  "firstName" : "string",
  "[middleName]" : "string", // By enclosing the sub-attribute key in square brackets,
                             // we mark that this sub-attribute's value is a list.
                             // This allows recording that a person has multiple middle names.
  "lastName" : "string"
}
```

A valid value for an attribute with this schema would be:

```js
{
  "firstName" : "John",
  "middleName" : [ // Don't include the square brackets when sending the attribute value!
    "Ronald", "Reuel"
  ],
  "lastName" : "Tolkien"
}
```

An example schema that could be used to store a person's credit card information:
```js
{
  "creditCardNumber" : "string",
  "CVV" : "string",
  "expirationDate" : {
    "month" : "int",
    "year" : "int"
  }
}
```
A valid value for an attribute with this schema would be:

```js
{
  "creditCardNumber" : "0000 1234 5678 9999",
  "CVV" : "321",
  "expirationDate" : {
    "month" : 2,
    "year" : 2025
  }
}
```

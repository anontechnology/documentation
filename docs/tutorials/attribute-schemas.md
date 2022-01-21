# Attribute Schemas

When creating a new attribute definition, it is important to specify what form the attribute's values will take: whether it is textual, numeric, or something more structured. An attribute definition can have a primitive schema, meaning that the associated data consists of a single piece of unstructured information, or alternatively a structured schema, breaking up its data into multiple sub-attributes.

The supported primitive schemas are as follows:

- `string`: For textual data, up to one megabyte in length.
- `int`: For data that can be expressed as an integer.
- `float`: For data that can be expressed as a floating-point number.
- `boolean`: For data that takes one of the two values "true" or "false".
- `file`: For large data such as long text files or base64-encoded representations of image files.

Structured schemas take the form of JSON objects, which map sub-attribute keys to further attribute schemas. Thesse nested schemas can likewise be either primitive or structured. In this way, arbitrarily complex structures can be represented within a single attribute. To mark that a sub-attribute should be able to take on multiple values within a single data point, or that the value of a sub-attribute should be a list, enclose the name of the sub-attribute in square brackets.

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
  "middleName" : [ // Don't include the square brackets in the sub-attribute key when sending the attribute value!
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

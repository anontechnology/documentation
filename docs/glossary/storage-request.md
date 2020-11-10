# Storage Request

A storage request is the format in which data is entered into the vault.

## Definition

|Name |Type |Description|
|-----|-----|-----------|
|origin|String|The IP address of the system that obtained this data. This is used to determine the geographical jurisdiction the data falls under.|
|userId|String|Only used in [bulk storage requests](/api/datapoints#post-data). The id of the user this data belongs to.|
|data|Array<[Datapoint](/glossary/datapoint)>|List of attributes to store.|

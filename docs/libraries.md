# Libraries
Integrate into your Vault APIs using one of our official libraries.

We offer an official SDK for most languages widely used in the industry today and are actively maintained by our engineering team.

- [Java](https://github.com/anontechnology/vault-java-sdk)
- [Node.js](https://github.com/anontechnology/vault-node-sdk)
- [Python](https://github.com/anontechnology/vault-python-sdk)
- [C#](https://github.com/anontechnology/vault-csharp-sdk)
- PHP (beta)

Library not available for your desired language? Feel free to contribute to our [open source community](https://github.com/anontechnology)!

## How does the SDK work?

### Installation

=== "Java"

    ``` xml
    <!-- In your pom.xml -->
    <dependency>
      <groupId>io.anontech.vizivault</groupId>
      <artifactId>vizivault-java-client</artifactId>
      <version>1.0.0</version>
    </dependency>
    ```

=== "C#"

    ``` powershell
    # Installing via NuGet
    Install-Package Anontech-VizivaultClient
    ```

=== "Node.js"

    ```
    npm install anontech-vizivault-client
    ```

=== "Python"

    ```
    pip install -e git://github.com/anontechnology/vault-python-sdk.git/#egg=vizivault
    ```

=== "PHP"

    ``` php
    // Coming soon...
    ```


----------------------------------------------------------------------

## Vault Setup

=== "Java"

    ``` java
    String encryptionKey = System.getenv("VIZIVAULT_ENCRYPTION_KEY");
    String decryptionKey = System.getenv("VIZIVAULT_DECRYPTION_KEY");
    ViziVault vault = new ViziVault(url)
      .withApiKey(apiKey)
      .withEncryptionKey(encryptionKey)
      .withDecryptionKey(decryptionKey);
    ```

=== "C#"

    ``` c#
    string encryptionKey = System.Environment.GetEnvironmentVariable("VIZIVAULT_ENCRYPTION_KEY");
    string decryptionKey = System.Environment.GetEnvironmentVariable("VIZIVAULT_DECRYPTION_KEY");
    ViziVault vault = new ViziVault(url)
      .WithApiKey(apiKey)
      .WithEncryptionKey(encryptionKey)
      .WithDecryptionKey(decryptionKey);
    ```

=== "Node.js"

    ``` javascript
    const encryptionKey = process.env.VIZIVAULT_ENCRYPTION_KEY;
    const decryptionKey = process.env.VIZIVAULT_DECRYPTION_KEY;
    let vault = new ViziVault()
      .withBaseURL(url)
      .withAPIKey(apiKey)
      .withEncryptionKey(encryptionKey)
      .withDecryptionKey(decryptionKey);
    ```

=== "Python"

    ``` python
    vault = vizivault.ViziVault(
        base_url=url,
        api_key=apiKey,
        encryption_key=os.getenv('VIZIVAULT_ENCRYPTION_KEY'),
        decryption_key=os.getenv('VIZIVAULT_DECRYPTION_KEY')
    ```

=== "PHP"

    ``` php
    $encryptionKey = getenv("VIZIVAULT_ENCRYPTION_KEY");
    $decryptionKey = getenv("VIZIVAULT_DECRYPTION_KEY");
    $vault = new ViziVault()
      ->withBaseURL($url)
      ->withAPIKey($apiKey)
      ->withEncryptionKey($encryptionKey)
      ->withDecryptionKey($decryptionKey)
      ->build();
    ```


----------------------------------------------------------------------
## Attributes

The ViziVault ecosystem organizes your data using the concept of [attributes](/glossary/attribute). Every data point consists of three main components: a user id, which represents who the data is about; a value, which is some piece of information about the user; and an attribute, which expresses the relationship between the user and the value. For example, in an online retail application, there would be an attribute for shipping addresses, an attribute for billing addresses, an attribute for credit card information, and so on.

### Adding an Attribute to an Entity or User

Attributes are stored as `key`/`value` pairs of strings. Both users and entities can have attributes added to them. Some attributes are repeatable, such that multiple values can be stored for the same user; others are not repeatable, such that adding a new value to a user will overwrite any previous values. You can control whether an attribute is repeatable by modifying the associated [attribute definition](/glossary/attribute-definition).

=== "Java"

    ``` java
    // Adding an attribute to a newly-created user
    User user = new User("exampleUser");
    user.addAttribute(FIRST_NAME, "Jane");
    vault.save(user);

    // Adding an attribute to an entity retrieved from the vault
    Entity entity = vault.findByEntity("Client6789");
    entity.addAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
    vault.save(entity);

    // Adding an attribute with additional metadata to a user
    Attribute attribute = new Attribute("LAST_NAME");
    attribute.setTags(List.of("ExampleTag"));
    attribute.setValue("Smith");
    user.addAttribute(attribute);
    vault.save(user);
    ```

=== "C#"

    ``` c#
    // Adding an attribute to user
    User user = await vault.FindByUserAsync("User1234");
    user.AddAttribute("FIRST_NAME", "Jane");
    await vault.SaveAsync(user);

    // Adding an attribute to entity
    Entity entity = await vault.FindByEntityAsync("Client6789");
    entity.AddAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
    await vault.SaveAsync(entity);

    // Adding an attribute with additional metadata to a user
    AttributeValue attribute = new Attribute("LAST_NAME") {
        Tags = new List<String>{"ExampleTag"},
        Value = "Smith"
    };
    user.AddAttribute(attribute);
    await vault.SaveAsync(user);
    ```

=== "Node.js"

    ``` javascript
    // Adding an attribute to user
    vault.findByUser("User1234").then((user) => {
        user.setAttribute("FIRST_NAME", "Jane");
        vault.save(user);
    });
 
    // Adding an attribute to entity
    vault.findByEntity("Client6789").then((entity) => {
        entity.setAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
        vault.save(entity);
    });

    ```

=== "Python"

    ``` python
    # Adding an attribute to user
    user = vault.find_by_user("User1234")
    user.add_attribute("FIRST_NAME", "Jane")
    vault.save(user)

    # Adding an attribute to entity
    entity = vault.find_by_entity("Client6789")
    entity.add_attribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210")
    vault.save(entity)
    ```

=== "PHP"

    ``` php
    // Adding an attribute to user
    $user = $vault->findByUser("User1234");
    $user->setAttribute("FIRST_NAME", "Jane");
    $vault->save($user);

    // Adding an attribute to entity
    $entity = $vault->findByUser("Client6789");
    $entity->setAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
    $vault->save($entity);
    ```

### Retrieving all Attributes of an Entity or User

Retrieves all [Attributes](/glossary/attribute) for the specified entity or user. Returns a list of Attribute objects.

=== "Java"

    ``` java
    // Retrieving all attributes for a user
    User user = vault.findByUser("User1234");
    List<Attribute> attributes = user.getAttributes();

    // Retrieving all attributes for an entity
    Entity entity = vault.findByEntity("Client6789");
    List<Attribute> attributes = entity.getAttributes();
    ```

=== "C#"

    ``` c#
    // Retrieving all attributes for a user
    User user = await vault.FindByUserAsync("User1234");
    List<Attribute> attributes = user.Attributes;

    // Retrieving all attributes for an entity
    Entity entity = await vault.FindByEntityAsync("Client6789");
    List<Attribute> attributes = entity.Attributes;
    ```

=== "Node.js"

    ``` javascript
    // Retrieving all attributes for a user
    vault.findByUser("User1234").then((user) => {
        let attributes = user.getAttributes();
    });

    // Retrieving all attributes for an entity
    vault.findByEntity("Client6789").then((entity) => {
        let attributes = entity.getAttributes();
    });

    ```

=== "Python"

    ``` python
    # Retrieving all attributes for a user
    user = vault.find_by_user("User1234")
    attributes = user.get_attributes()

    # Retrieving all attributes for an entity
    entity = vault.find_by_entity("Client6789")
    attributes = entity.get_attributes()
    ```

=== "PHP"

    ``` php
    // Retrieving all attributes for a user
    $user = $vault->findByUser("User1234");
    $attributes = $user->getAttributes();

    // Retrieving all attributes for an entity
    $entity = $vault->findByEntity("Client6789");
    $attributes = $entity->getAttributes();
    ```  

### Retrieving an Attribute of an Entity or User

Retrieves a single specified [attribute](/glossary/attribute) for the specified entity or user. For repeatable attributes, use `getAttributes(attributeName)`; for non-repeatable attributes, use `getAttribute(attributeName)`.

=== "Java"

    ``` java
    // Retrieving specific attribute for a user
    User user = vault.findByUser("User1234");
    Attribute attribute = user.getAttribute("FIRST_NAME");

    // Retrieving specific attribute for an entity
    Entity entity = vault.findByEntity("Client6789");
    Attribute attribute = entity.getAttribute("FULL_ADDRESS");

    // Retrieving multiple values for a repeatable attribute
    List<Attribute> attributes = user.getAttributes("SHIPPING_ADDRESS");
    ```

=== "C#"

    ``` c#
    // Retrieving specific attribute for a user
    User user = await vault.FindByUserAsync("User1234");
    Attribute attribute = user.GetAttribute("FIRST_NAME");

    // Retrieving specific attribute for an entity
    Entity entity = vault.FindByEntity("Client6789");
    Attribute attribute = entity.GetAttribute("FULL_ADDRESS");

    // Retrieving multiple values for a repeatable attribute
    List<Attribute> attributes = user.GetAttributes("SHIPPING_ADDRESS");
    ```

=== "Node.js"

    ``` javascript
    // Retrieving specific attribute for a user
    vault.findByUser("User1234").then((user) => {
        let attribute = user.getAttribute("FIRST_NAME");
    });

    // Retrieving specific attribute for an entity
    let entity = vault.findByEntity("Client6789").then((entity) => {
        let attribute = entity.getAttribute("FULL_ADDRESS");
    });
    
    ```

=== "Python"

    ``` python
    # Retrieving specific attribute for a user
    user = vault.find_by_user("User1234")
    attribute = user.get_attribute("FIRST_NAME")

    # Retrieving specific attribute for an entity
    entity = vault.find_by_entity("Client6789")
    attributes = entity.get_attribute("FULL_ADDRESS")
    ```

=== "PHP"

    ``` php
    // Retrieving specific attribute for a user
    $user = $vault->findByUser("User1234");
    $attribute = $user->getAttribute("FIRST_NAME");

    // Retrieving specific attribute for an entity
    $entity = $vault->findByEntity("Client6789");
    $attributes = $entity->getAttribute("FULL_ADDRESS");
    ```  

### Deleting User Attributes

[Attributes](/glossary/attribute) can be removed from the User object by calling `clearAttribute` with the specified attribute name, or by calling `purge` to remove all Attributes.

=== "Java"

    ``` java
    // Purging all user attributes
    vault.purge("User1234");

    // Removing specific attribute
    User user = vault.findByUser("User1234");
    user.clearAttribute("LAST_NAME");
    vault.save(user);
    ```

=== "C#"

    ``` c#
    // Purging all user attributes
    await vault.PurgeAsync("User1234");

    // Removing specific attribute
    User user = await vault.FindByUserAsync("User1234");
    user.ClearAttribute("LAST_NAME");
    await vault.SaveAsync(user);
    ```

=== "Node.js"

    ``` javascript
    // Purging all user attributes
    vault.findByUser("User1234").then((user) => {
        user.purge();
    });

    // Removing specific attribute
    let user = vault.findByUser("User1234").then((user) => {
        user.remove("LAST_NAME");
    });
    ```

=== "Python"

    ``` python
    # Purging all user attributes
    vault.purge("User1234")

    # Removing specific attribute
    user = vault.findByUser("User1234")
    user.remove("LAST_NAME")
    vault.save(user)
    ```

=== "PHP"

    ``` php
    // Purging all user attributes
    $user = $vault->findByUser("User1234");
    $user->purge();

    // Removing specific attribute
    $user = $vault->findByUser("User1234");
    $user->remove("LAST_NAME");
    ```  


### Searching

To search a vault for [attributes](/glossary/attribute), pass in a SearchRequest. A list of matching Attributes will be returned. For more information, [read about ViziVault search](/tutorials/search). 

=== "Java"

    ``` java
    int pageIndex = 0;
    int maxCount = 25;
    List<Attribute> attributes = vault.search(new SearchRequest("LAST_NAME", "Doe"), pageIndex, maxCount);
    ```

=== "C#"

    ``` c#
    int pageIndex = 0;
    int maxCount = 25;
    List<Attribute> attributes = await vault.SearchAsync(new SearchRequest("LAST_NAME", "Doe"), pageIndex, maxCount);
    ```

=== "Node.js"

    ``` javascript
    const count = 1;
    const page = 1;
    vault.search(new SearchRequest("LAST_NAME", "Doe"), page, count).then((attributes) => {
        // use attributes
    });
    ```

=== "Python"

    ``` python
    attributes = vault.search(SearchRequest("LAST_NAME", "Doe"))
    ```

=== "PHP"

    ``` php
    $attributes = $vault.search(new SearchRequest("LAST_NAME", "Doe"));
    ```  

----------------------------------------------------------------------
## Attribute Definitions

Attributes are defined using an [attribute definition](/glossary/attribute-definition) object that contains all relevant metadata for the `key`. This is where attributes are given [tags](/glossary/tag) and [regulations](/glossary/regulation), along with a [schema](/tutorials/attribute-schemas) to specify the expected structure of the `value` of the attribute. Display names and hints can also be added to the attribute definition for ease of use and readability. 

### Storing an Attribute Definition in the Vault

To store an attribute definition, create an AttributeDefinition object and save it to the vault as shown in the following code.

=== "Java"

    ``` java
    AttributeDefinition attributeDef = new AttributeDefinition();
    attributeDef.setName("Billing Address");
    attributeDef.setTags(List.of("geographic_location", "financial"));
    attributeDef.setHint("{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\"," +
                        "city: \"Menlo Park\", state: \"California\", " +
                        "postal_code: \"94025-1456\", country: \"USA\"" +
                        "}");
    attributeDef.setSchema(PrimitiveSchema.STRING); // For simple, unstsructured data
    attributeDef.schemaFromClass(YourModel.class); // Alternatively, creating a schema to store objects of a class
    attributeDef.setRepeatable(false);
    attributeDef.setIndexed(false);

    vault.storeAttributeDefinition(attributeDef);
    ```

=== "C#"

    ``` c#
    AttributeDefinition attributeDef = new AttributeDefinition();
    attributeDef.name = "Billing Address";
    attributeDef.tags = {"geographic_location", "financial"};
    attributeDef.hint = "{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", city: \"Menlo Park\", state: \"California\", postal_code: \"94025-1456\" country: \"USA\" }";

    attributeDef.SetSchema(PrimitiveSchema.String); // For simple, unstsructured data
    attributeDef.SchemaFromClass(typeof(YourModel)); // Alternatively, creating a schema to store objects of a class
    attributeDef.repeatable = false;
    attributeDef.indexed = false;

    await vault.StoreAttributeDefinitionAsync(attribute);
    ```

=== "Node.js"

    ``` javascript
    let attribute = new AttributeDefinition();
    attribute.setName("Billing Address");
    attribute.setTags(["geographic_location", "financial"]);
    attribute.setHint("{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", city: \"Menlo Park\", state: \"California\", postal_code: \"94025-1456\" country: \"USA\" }");
    attribute.setSchema(JSON.stringify({ 
                        "line_one": "string",
                        "line_two": "string",
                        "city": "string",
                        "state": "string",
                        "postal_code": "string",
                        "country": "string"
                      }));
    attribute.setRepeatable(false);
    attribute.setImmutable(false);
    attribute.setIndexed(false);
    attribute.setRegulations(["GDPR", "CCPA"]);

    vault.storeAttribute(attribute);
    ```

=== "Python"

    ``` python
    attribute = AttributeDefinition(
        name = "Billing Address",
        tags = ["geographic_location", "financial"],
        hint = "{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", city: \"Menlo Park\", state: \"California\", postal_code: \"94025-1456\" country: \"USA\" }",
        schema = json.dumps({ 
                        "line_one": "string",
                        "line_two": "string",
                        "city": "string",
                        "state": "string",
                        "postal_code": "string",
                        "country": "string"
                      }),
        repeatable = false,
        indexed = false,
        regulations = ["GDPR", "CCPA"]
    )

    vault.store_attribute(attribute)
    ```

=== "PHP"

    ``` php
    $attribute = new AttributeDefinition();
    $attribute->setName("Billing Address");
    $attribute->setTags(array("geographic_location", "financial"));
    $attribute->setHint("{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", 
                        city: \"Menlo Park\", state: \"California\", 
                        postal_code: \"94025-1456\", country: \"USA\"
                      }");
    $attribute->setSchema(json.encode({ 
                        "line_one": "string",
                        "line_two": "string",
                        "city": "string",
                        "state": "string",
                        "postal_code": "string",
                        "country": "string"
                      });
    $attribute->setRepeatable(false);
    $attribute->setImmutable(false);
    $attribute->setIndexed(false);
    $attribute->setRegulations(array("GDPR", "CCPA"));

    $vault->storeAttribute($attribute);
    ```  
  

### Retrieving Attribute Definitions from the Vault

To view metadata about attribute definitions, call `getAttributeDefinition` to view one attribute definition by name or `getAttributeDefinitions` to list all attribute definitions in the system.

=== "Java"

    ``` java
    // Retrieving all attribute definitions
    List<AttributeDefinition> attributeDefs = vault.getAttributeDefinitions();

    // Retrieving specific attribute definition
    AttributeDefinition attributeDef = vault.getAttributeDefinition("Billing Address");
    ```

=== "C#"

    ``` c#
      // Retrieving all attributes
    List<AttributeDefinition> attributes = await vault.GetAttributeDefinitionsAsync();

    // Retrieving specific attribute
    AttributeDefinition attribute = await vault.GetAttributeDefinitionAsync("Billing Address");
    ```

=== "Node.js"

    ``` javascript
    // Retrieving all attributes
    let attributes = vault.getAttributeDefinitions();

    // Retrieving specific attribute
    let attribute = vault.getAttributeDefinition("Billing Address");
    ```

=== "Python"

    ``` python
    # Retrieving all attributes
    attributes = vault.get_attribute_definitions()

    # Retrieving specific attribute
    attribute = vault.get_attribute_definition("Billing Address")
    ```

=== "PHP"

    ``` php
    // Retrieving all attributes
    $attributes = $vault->getAttributeDefinitions();

    // Retrieving specific attribute
    $attribute = $vault->getAttributeDefinition("Billing Address");
    ```
  

----------------------------------------------------------------------
## Tags

[Tags](/glossary/tag) are user-defined strings that can be applied to attributes to aid in classification and searching.

### Storing a Tag in the Vault

To store a new tag, create a Tag object and save it to the vault.


=== "Java"

    ``` java
    vault.storeTag(new Tag("Financial Data"));
    ```

=== "C#"

    ``` c#
    await vault.StoreTagAsync(new Tag("Financial Data"));
    ```

=== "Node.js"

    ``` javascript
    vault.save(new Tag("Financial Data"));
    ```

=== "Python"

    ``` python
    tag = vault.store_tag(Tag("Financial Data"))
    ```

=== "PHP"

    ``` php
    $tag = $vault->save(new Tag("Financial Data"));
    ```  
  

### Retrieving Tags from the Vault

Like attribute definition metadata, tag metadata can be retrieved for a single tag or for all tags in the system.

=== "Java"

    ``` java
    // Retrieving all tags
    List<Tag> tags = vault.getTags();

    // Retrieving specific tag
    Tag tag = vault.getTag("Financial Data");
    ```

=== "C#"

    ``` c#
    // Retrieving all tags
    List<Tag> tags = await vault.GetTagsAsync();

    // Retrieving specific tag
    String tag = await vault.GetTagAsync("Financial Data");
    ```

=== "Node.js"

    ``` javascript
    // Retrieving all tags
    vault.getTags().then((tags) => {
        // use tags
    });

    // Retrieving specific tag
    vault.getTag("Financial Data").then((tag) => {
        // use tag
    });
    ```

=== "Python"

    ``` python
    # Retrieving all tags
    tags = vault.get_tags()

    # Retrieving specific tag
    tag = vault.get_tag("Financial Data")
    ```

=== "PHP"

    ``` php
    // Retrieving all tags
    $tags = $vault->getTags();

    // Retrieving specific tag
    $tag = $vault->getTag("Financial Data");
    ```  
  

### Deleting Tags from the Vault

To delete a tag, specify the tag to be removed. A boolean denoting the status of the operation will be returned. This will remove the tag from all attributes, attribute definitions, and users that are currently tagged with it.

=== "Java"

    ``` java
    // Removing a specific tag
    boolean removed = vault.deleteTag("Financial Data");
    ```

=== "C#"

    ``` c#
    // Removing a specific tag
    bool removed = await vault.DeleteTagAsync("Financial Data");
    ```

=== "Node.js"

    ``` javascript
    // Removing a specific tag
    vault.removeTag("Financial Data").then((removed) => {
        // removed is a boolean
    });
    ```

=== "Python"

    ``` python
    # Removing a specific tag
    removed = vault.remove_tag("Financial Data")
    ```

=== "PHP"

    ``` php
    // Removing a specific tag
    $removed = $vault->removeTag("Financial Data");
    ```  
 

----------------------------------------------------------------------
## Regulations

A [regulation](/glossary/regulation) object represents a governmental regulation that impacts how you can use the data in your vault. Each data point can have a number of regulations associated with it, which makes it easier to ensure your use of the data is compliant. You can tag data points with regulations when entering them into the system, or specify rules that the system will use to automatically tag regulations for you.

### Storing a Regulation in the Vault

To store a regulation to the vault, create a Regulation object, set its key and its display name along with a URL pointing to further information about it, and call `storeRegulation`. To automatically apply regulations to incoming data, [rules](/tutorials/regulation-rules) can be specified.

=== "Java"

    ``` java
    // Storing a regulation
    Regulation regulation = new Regulation();
    regulation.setKey("GDPR");
    regulation.setName("General Data Protection Regulation");
    regulation.setUrl("https://gdpr.eu/");
    regulation.setRule(new UserRule("GEOGRAPHIC_REGION", UserRule.UserValuePredicate.EQUALS, "EU"));
    vault.storeRegulation(regulation);
    ```

=== "C#"

    ``` c#
    // Storing a regulation
    Regulation regulation = new Regulation();
    regulation.Key = "GDPR";
    regulation.Name = "General Data Protection Regulation";
    regulation.Url = "https://gdpr.eu/";
    regulation.Rule = new UserRule("GEOGRAPHIC_REGION", UserRule.UserValuePredicate.Eq, "EU");
    await vault.StoreRegulationAsync(regulation);
    ```

=== "Node.js"

    ``` javascript
    // Storing a regulation
    let regulation = new Regulation();
    regulation.setKey("GDPR");
    regulation.setName("General Data Protection Regulation");
    regulation.setUrl("https://gdpr.eu/");
    regulation.setRule(new UserRule("GEOGRAPHIC_REGION", UserRule.UserValuePredicate.EQUALS, "EU"));
    vault.save(regulation);
    ```

=== "Python"

    ``` python
    # Storing a regulation
    regulation = Regulation(key="GDPR", 
                            name="General Data Protection Regulation",
                            url="https://gdpr.eu/" 
                            )
    savedRegulation = vault.store_regulation(regulation)
    ```

=== "PHP"

    ``` php
    // Storing a regulation
    $regulation = new Regulation("GDPR", 
                                    "General Data Protection Regulation",
                                    "https://gdpr.eu/" 
                                    );
    $savedRegulation = $vault->save($regulation);
    ```  
 

### Retrieving Regulations from the Vault

[Regulations](/glossary/regulation) can be retrieved as a list of Regulation objects or by requesting a single regulation by its key.

=== "Java"

    ``` java
    // Retrieving all regulations
    List<Regulation> regulations = vault.getRegulations();

    // Retrieving specific regulation
    Regulation regulation = vault.getRegulation("GDPR");
    ```

=== "C#"

    ``` c#
    /// Retrieving all regulations
    List<Regulation> regulations = await vault.GetRegulationsAsync();

    // Retrieving specific regulation
    Regulation regulation = await vault.GetRegulationAsync("GDPR");
    ```

=== "Node.js"

    ``` javascript
    // Retrieving all regulations
    vault.getRegulations().then((regulations) {
        // use regulations
    });

    // Retrieving specific regulation
    vault.getRegulation("GDPR").then((regulation) => {
        // use regulation
    });
    ```

=== "Python"

    ``` python
    # Retrieving all regulations
    regulations = vault.get_regulations

    # Retrieving specific regulation
    regulation = vault.get_regulation("GDPR")
    ```

=== "PHP"

    ``` php
    // Retrieving all regulations
    $regulations = $vault->getRegulations();

    // Retrieving specific regulation
    $regulation = $vault->getRegulation("GDPR");
    ```  
 

### Deleting Regulations from the Vault

To remove a [regulation](/glossary/regulation), specify the key of the regulation to be removed. A boolean denoting the status of the operation will be returned.

=== "Java"

    ``` java
    // Removing a specific regulation
    boolean removed = vault.deleteRegulation("GDPR");
    ```

=== "C#"

    ``` c#
    // Removing a specific regulation
    bool removed = await vault.DeleteRegulationAsync("GDPR");
    ```

=== "Node.js"

    ``` javascript
    // Removing a specific regulation
    vault.removeRegulation("GDPR").then((removed) => {
        // removed is a boolean
    });
    ```

=== "Python"

    ``` python
    # Removing a specific regulation
    removed = vault.delete_regulation("GDPR")
    ```

=== "PHP"

    ``` php
    // Removing a specific regulation
    $removed = $vault->removeRegulation("GDPR");
    ```  
 

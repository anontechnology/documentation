# Quickstart

In this quickstart we will be overviewing several functions you will typically want to do to help start securing, understanding and using the personal data in your system.

## Setup

In this tutorial you will learn how to load and retrieve personal data about your clients contained in a JSON file. While it's possible to use any personal client data source, we've included a CSV file of ten users with typical user data.

1. If you don't have a vault deployed for your organization already, reach out and request a demo vault.

    <a class="md-button md-button--primary" href="https://anontech.io/contact-us" target="_blank">Request a Vault</a>

2. When you get your demo vault, you will need its web address.
      - For cloud-hosted vaults, this will be of the form `http://vault.anontech.io/VAULT_IDENTIFIER/`, where the vault identifier is a hexadecimal code unique to your organization.
      - For locally-hosted vaults, your administrator can prove you with the root URL to your hosted ViziVault instance.

3. Download the example CSV file

    <a class="md-button md-button--primary" href="https://docs.anontech.io/assets/files/tutorial_test.csv" target="_blank">Download Sample File</a>

## Get your encryption key pair

Put your public encryption key into a file. In a production system, you may wish to secure your private decryption key further. Even though we deliver our data securely to your system, you may wish to take precautions to secure these keys in your environment.

## Initialize your connection to the vault

With your decryption key, encryption key, path, and application key, we can initialize the connection to your vault. Note that for the purposes of this quickstart we provide the connection with the encryption and decryption key. However, in your application, you may only wish to pull down data and decrypt with the decryption key, or only create new data with the encryption key. Using application keys and access to encyption and decryption keys lets you manage exactly how data is accessed and controlled.

In the following eample you will want to make the following replacements:
1. Replace "./resources/test_encryption_key.txt" with the path to your encryption file
2. Replace "./resources/test_decryption_key.txt" with the path to your decryption file
3. Replace "https://my.host:8080' with the secure http address and port of your provided vault.

=== "C#"
    ```c#
        using IO.Anontech.Vizivault;
        using Microsoft.VisualBasic.FileIO; // for CSV parser

        /* your namespace and class definition here */

        string decryptionKey = System.IO.File.ReadAllText("decryptionKey.txt");
        string encryptionKey = System.IO.File.ReadAllText("encryptionKey.txt");
        ViziVault vault = new ViziVault(new Uri("http://example.com:8080")).WithApiKey("your-api-key").WithDecryptionKey(decryptionKey).WithEncryptionKey(encryptionKey);
    ```

=== "Python"

    ``` python
    from  vizivault import ViziVault, AttributeDefinition, SearchRequest
    #You'll need this later to load the CSV sample file
    import csv 


    # 1. Replace 'my_encryption_file.txt'  with the path to your encryption file
    with open('my_encryption_file.txt', 'r') as encryption_file:
        encryption_key = encryption_file.read()

    # 2. Replace 'my_decryption_file.txt' with the path to your decryption file
    with open('my_decryption_file.txt', 'r') as decryption_file:
        decryption_key = decryption_file.read()


    # Connect to the vault
    # 3. Replace 'https://my.host:8080' with the web address and port of your vault server
    # 4. Replace '12345' with the api key (application key) of your application. 
    
    vault = vizivault.ViziVault(base_url='https://my.host:8080', api_key='12345', encryption_key=encryption_key,
                decryption_key=decryption_key)
    ```

=== "Java"

    ``` java
     // 1. Replace 'decryptionKey.txt'  with the path to your encryption file
    FileInputStream decKeyFile = new FileInputStream(new File("src" + File.separator + "test" + File.separator + "resources" + File.separator + "decryptionKey.txt"));
    decryptionKey = new String(decKeyFile.readAllBytes());
    decKeyFile.close();

    // 2. Replace 'encryptionKey.txt'  with the path to your encryption file
    FileInputStream encKeyFile = new FileInputStream(new File("src" + File.separator + "test" + File.separator + "resources" + File.separator + "encryptionKey.txt"));
    encryptionKey = new String(encKeyFile.readAllBytes());
    encKeyFile.close();

    // Connect to the vault
    // 3. Replace 'https://my.host:8080' with the web address and port of your vault server
    // 4. Replace '12345' with the api key (application key) of your application.
    ViziVault vault = new ViziVault(new URL("http://localhost:8080")).withApiKey("12345").withDecryptionKey(decryptionKey).withEncryptionKey(encryptionKey);
    ```

## Creating Attributes

The first thing we will need to do is establish attributes to store all of the data from our client. Attribute definitions specify the structure and rules that will govern how your data is stored. For example, this can tell ViziVault whether a user can have more than one value of an attribute, and whether the data should be indexed for cross-user search functionality. We can also directly associate tags and regulations here, establishing how Vizivault will treat the data for retention, storage, and sharing.

We start with creating some very simple attributes with no structure, such as strings or numeric data. In the next example we will see how to handle data in cases where you only may be interested in retrieving part of a related set of data, or where the data has an internal structure. The hint parameter contains a sample value of the attribute for the purposes of demonstrating the intended format.

=== "C#"
    ```c#
    AttributeDefinition eyeColorAttributeDef = new AttributeDefinition("EyeColor") {
        Hint = "Green"
    };
    AttributeDefinition ageAttributeDef = new AttributeDefinition("Age") {
        Hint = "18"
    };

    await vault.StoreAttributeDefinitionAsync(eyeColorAttributeDef);
    await vault.StoreAttributeDefinitionAsync(ageAttributeDef);
    ```

=== "Python"

    ``` python
    eye_color_attribute_def = vault.AttributeDefinition(key="EYE_COLOR", name="Eye Color", hint="Green")
    age_attribute_def = vault.AttributeDefinition(key="AGE", name="Age", hint="18")
        
    vault.store_attribute_definition(attribute_definition=eye_color_attribute_def)
    vault.store_attribute_definition(attribute_definition=age_attribute_def)
    ```

=== "Java"
    ``` java
    AttributeDefinition eyeColorattributeDef = new AttributeDefinition("EyeColor");
    eyeColorattributeDef.setHint("Green");
    AttributeDefinition ageAttributeDef= new AttributeDefinition("Age");
    ageAttributeDef.setHint("18");

    vault.storeAttributeDefinition(eyeColorAttributeDef);
    vault.storeAttributeDefinition(ageAttributeDef);
    ```

## Creating Attributes with Structure

Let's add some attributes with structure. Here we add a user's full name and their billing address. We may wish to extract, update, or perform business logic on part of this data, so we store related attribute data in schemas. Here we add schemas that allow nested structures with multiple components. Each component has a type which can be:

* string: For textual data, up to 126 characters long.
* int: For data that can be expressed as an integer.
* float: For numeric data that cannot be expressed as an integer.
* boolean: For data that takes one of the two values "true" or "false".
* file: For data that takes more than 126 characters to represent, such as long text files or base64-encoded representations of image files.

=== "C#"
    ```c#
        // Put these classes in your namespace
        public class Name {
            public string FirstName {get; set;}
            public string LastName {get; set;}
            public string MiddleName {get; set;}
            public string Nickname {get; set;}
        }
        public class Address {
            public string LineOne {get; set;}
            public string LineTwo {get; set;}
            public string City {get; set;}
            public string State {get; set;}
            public string PostalCode {get; set;}
            public string Country {get; set;}
        }



        AttributeDefinition nameAttributeDef = new AttributeDefinition("Name") {
            Hint = "{first_name: \"Agnes\", last_name: \"Driscoll\", middle_name: \"May\", nickname: \"Madame X\", company: \"Hebern Electric\"}"
        };
        nameAttributeDef.SchemaFromClass(typeof(Name));


        AttributeDefinition addressAttributeDef = new AttributeDefinition("Address") {
            Hint = "{line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", city: \"Menlo Park\", state: \"California\", postal_code: \"94025-1456\", country: \"USA\"}"
        };
        addressAttributeDef.SchemaFromClass(typeof(Address));


        await vault.StoreAttributeDefinitionAsync(nameAttributeDef);
        await vault.StoreAttributeDefinitionAsync(addressAttributeDef);
    ```

=== "Python"
    ``` python

    name_attribute_def = vault.AttributeDefinition(
        key='CLIENT_NAME',
        name="Client Name",
        hint="{first_name: \"Agnes\","
                "last_name: \"Driscoll\","
                "middle_name: \"May\","
                "nickname: \"Madame X\","
                "company: \"Hebern Electric\"}",
        schema={
                "first_name": "string",
                "last_name": "string",
                "middle_name": "string",
                "nickname": "string",
                "company": "string"
            }
    )

    address_attribute_def = vault.AttributeDefinition(
        key="BILLING_ADDRESS",
        name="Billing Address",
        hint="{line_one: \"1 Hacker Way\","
            "line_two: \"Apt. 53\", "
            "city: \"Menlo Park\", "
            "state: \"California\", "
            "postal_code: \"94025-1456\", "
            "country: \"USA\"}",
        schema={
            "line_one": "string",
            "line_two": "string",
            "city": "string",
            "state": "string",
            "postal_code": "string",
            "country": "string"
        }
    )
                                                        
    vault.store_attribute_definition(attribute_definition=name_attribute_def)
    vault.store_attribute_definition(attribute_definition=address_attribute_def)
        
    ```

=== "Java"
    ``` java

public static class Name {

  public String firstName;
  public String lastName;
  public String middleName;
  public String nickName;
  public String company;


  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setMiddleName(String middleName) {
    this.middleName = middleName;
  }

  public void setNickName(String nickName) {
    this.nickName = nickName;
  }

  public void setCompany(String company) {
    this.company = company;
  }

}

public static class Address {
  public String street;
  public String city;
  public String state;
  public String postalCode;
  public String country;


  public void setStreet(String street) {
    this.street = street;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public void setState(String state) {
    this.state = state;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }

  public void setCountry(String country) {
    this.country = country;
  }

}

    AttributeDefinition nameAttributeDef = new AttributeDefinition("Name");
    nameAttributeDef.schemaFromClass(Name.class);

    AttributeDefinition addressAttributeDef = new AttributeDefinition("Address");
    addressAttributeDef.schemaFromClass(Address.class);

    vault.storeAttributeDefinition(nameAttributeDef);
    vault.storeAttributeDefinition(addressAttributeDef);

```

## Loading Data

Now that we have attributes, let's load some data. We will iterate over every example in our sample CSV. For each row we define a user based on the userid. Then we simply load the vaules for the flat files. For structured object data we create a hash structure and insert the key/value pairs. Finally, we save the completed user to the vault.

=== "Java"
    ```java
    File csvSampleFile = new File("src" + File.separator + "test" + File.separator + "resources" + File.separator + "tutorial_test.csv");
    Reader csvReader = new FileReader(csvSampleFile);

    // Use Jackson
    Iterator<Map<String, String>> iterator = new CsvMapper()
        .readerFor(Map.class)
        .with(CsvSchema.emptySchema().withHeader())
        .readValues(csvReader);

    while(iterator.hasNext()) {
      Map<String, String> csvVals = iterator.next();
      User user=new User(csvVals.get("USERID"));

      user.addAttribute(eyeColorattributeDef.getName(),csvVals.get("USERID"));
      user.addAttribute(ageAttributeDef.getName(),csvVals.get("AGE"));

      Name name=new Name();
      
      name.setFirstName(csvVals.get("FIRST_NAME"));
      name.setLastName(csvVals.get("LAST_NAME"));
      name.setMiddleName(csvVals.get("MIDDLE_NAME"));
      name.setCompany(csvVals.get("COMPANY"));
      user.addAttribute(nameAttributeDef.getName(),myName);

      Address address=new Address();
      
      address.setStreet(csvVals.get("STREET"));
      address.setCity(csvVals.get("CITY"));
      address.setState(csvVals.get("STATE"));
      address.setCountry(csvVals.get("COUNTRY"));

      user.addAttribute(addressAttributeDef.getName(),myAddress);
      vault.save(user);
      
  }
    ```
=== "C#"

    ``` c#
    using (var parser = new TextFieldParser("./resources/tutorial_test.csv")) {
        parser.TextFieldType = FieldType.Delimited;
        parser.setDelimiters(",");
        
        string[] headers = parser.ReadFields();
        
        while (!parser.EndOfData) {
            string[] cells = parser.ReadFields();
            Dictionary<string, string> userData = new Dictionary<string, string>();
            for(int i=0; i<cells.Length; ++i) {
                userData[headers[i]] = cells[i];
            }

            User user = new User(userData["USERID"]);
            
            user.addAttribute(eyeColorAttributeDef.Name, userData["EYE_COLOR"]);
            user.addAttribute(ageAttributeDef.Name, userData["AGE"]);
            user.addAttribute(nameAttributeDef.Name, new Name(){
                FirstName = userData["FIRST_NAME"],
                LastName = userData["LAST_NAME"],
                MiddleName = userData["MIDDLE_NAME"],
                Company = userData["COMPANY"]
            });
            user.addAttribute(addressAttributeDef.Name, new Address(){
                Street = userData["STREET"],
                City = userData["CITY"],
                State = userData["STATE"],
                Country = userData["COUNTRY"]
            });

            await vault.SaveAsync(user);
        }
    }
    ```


=== "Python"

    ``` python
    with open('./resources/tutorial_test.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        header_row = True

        user_data = {}
        for row in csv_reader:
            if header_row:
                headers = row
                header_row = False
            else:
                for index, name in enumerate(headers, start=0):
                    user_data[name] = row[index]

                # Create a User
                new_user = User(user_data['USERID'])

                # Add the attribute values
                new_user.add_attribute(attribute=eye_color_attribute_def.key, value=user_data["EYE_COLOR"])
                new_user.add_attribute(attribute=age_attribute_def.key, value=user_data["AGE"])

                # Create a dictionary for the user's name
                user_name = {
                    "first_name": user_data["FIRST_NAME"],
                    "last_name": user_data["LAST_NAME"],
                    "middle_name": user_data["MIDDLE_NAME"],
                    "company": user_data["COMPANY"]
                }

                # Save the user's name
                new_user.add_attribute(attribute=name_attribute_def.key, value=user_name)

                # Create a dictionary for the address
                address = {
                    "street": user_data["STREET"],
                    "city": user_data["CITY"],
                    "state": user_data["STATE"],
                    "country": user_data["COUNTRY"]
                }

                # Save the Address
                new_user.add_attribute(attribute=address_attribute_def.key, value=address)

                vault.save(new_user)
                
                
        # Cleanup
        csv_reader = csv.reader(csv_file, delimiter=',')
            header_row = True

            user_data = {}
            for row in csv_reader:
                if header_row:
                    headers = row
                    header_row = False
            vault.purge(new_user.id)
    ```
### Retrieving Data for a User

Now that we have data in the system, let's try to get our data back. Here we grab the data for a user with the id 101.

=== "C#"
    ```c#
    User receivedUser = await vault.FindByUserAsync("101");
    foreach(AttributeValue attr in receivedUser.Attributes) {
        Console.WriteLine($"Attribute: {attr.AttributeKey}; Value: {attr.Value}");
    }
    ```

=== "Python"

    ``` python

    received_user = vault.find_by_user(entity_id='101')
        
    for attribute in received_user.get_attributes():
        print('Attribute:' + attribute.attribute + 'Value:' + attribute.value)
    ```

=== "Java"
    ``` java
   
    User receivedUser = vault.findByUser("101");
    for (Attribute attribute : receivedUser.getAttributes()) {
      System.out.printf("attribute_name: %s attribute_value: %s%n", attribute.getAttribute(), attribute.getValue());
    }

    ```


### Next Steps
   This guide covers basic usage. You can look at our [tutorials](/tutorials/attribute-schemas)  for more advanced usage including [searching](/tutorials/search) and applying [regulations](/tutorials/regulation) to data.


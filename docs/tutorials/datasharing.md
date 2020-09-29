# Data Sharing

ViziVault Enterprise allows you to share your data securely and control who has access to shared data. In the Data Sharing section of ViziVault's web interface, you can set up data to be shared periodically on a schedule, or set up on-demand sharing for a recipient to send data to them at any time at the click of a button.

When you start a new data sharing schedule, the system will generate a new keypair specific to that schedule. The public encryption key will be saved and used to re-encrypt the data when it is shared, and the private decryption key will be emailed to the data recipient and stored nowhere else. This ensures that your recipient will be able to read the data that is meant for them, but that they will not be able to read data you send to anyone else, and that nobody else will be able to read the data you send to them.

## Viewing data sharing schedules

The Data Sharing page displays a list of all active data sharing schedules, listing the attributes they sent, their frequency, their delivery method, their data format, and when they were last sent. Clicking the eye icon next to a data sharing schedule will list data packages that were shared by that schedule, provide links to download these packages, and display metadata about the data package. Clicking the pencil icon will allow you to modify the schedule. Data schedules that are marked as on-demand will also have an airplane icon; clicking this will initiate a data transfer.

## Creating data sharing schedules

By clicking the plus icon at the top of the page, a new data sharing schedule can be created.

#### Recipient and Business Justification

These two fields provide a human-readable description of the schedule in two parts, explaining who the data is going to and why they need it. In the interest of documenting what data sharing is occurring, both fields are required.

#### Attributes

This field allows you to specify what data will be shared by entering a list of attributes. Only data belonging to attributes that are specified here will be shared.

#### Frequency

Specifies how often data wlll be sent: once per hour, once per day, once per week, once per month, once per quarter, once per year, or on demand. If "on demand" is selected, the schedule will not send data automatically; instead, an icon of a paper airplane will appear next to this schedule on the list of data sharing schedules, and clicking the airplane icon will share this data.

#### Delivery Method

Specifies how the data will be transmitted. Options include "file download" and "email".

If "file download" is selected, the data will be packaged into files that are stored on the ViziVault Enterprise server. These files can be accessed by selecting the corresponding schedule on the list of data sharing schedules and clicking the eye icon to view more details about it. If the file is intended to be given to an external entity, a user can download the files from this page and send them to the recipient through any channel they want.

If "email" is selected, the user will be prompted to enter an email address and a subject line. Whenever this schedule creates a data sharing package, it will be sent to the specified email address as an attachment in an email with the specified subject line.

#### File Format

Specifies what file type the exported data package will be. By default, this is a CSV file; other options include JSON and XML.

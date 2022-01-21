# Scheduled Alerts

The ViziVault Enterprise web interface can be used to create scheduled alerts that will periodically calculate analytics on your data and notify you if something unusual is detected.

## Viewing scheduled alerts

The Alerts page shows a list of schedulded alerts that are currently active. You can edit or delete a scheduled alert by clicking the pencil or trash can icon next to it.

## Creating scheduled alerts

To create a new alert, click the plus icon at the top of the Alerts page. This will open a prompt allowing you to enter details about the alert you wish to create.

#### Name
A human-readable name to show at a glance what this alert is measuring.

#### Alert type
What type of alert this will be. See [Types of Alerts](#types-of-alerts) for more information; many alert types have specific parameters that you will also need to provide.

#### Frequency
How often to calculate the analytics for this alert. Options are once per day, once per week, once per month, once per quarter, and once per year.

#### Alert Level
What level of alert this should be considered: informational, warning, danger, neutral, or success.

#### Minimum value and maximum value
These parameters allow you to control the threshold at which a notification will be generated for this alert. If the value calculated for the metric falls below a provided minimum, or above a provided maximum, no notification will be sent.

## Types of alerts

### Data subjects percent change
This alert measures the change in total number of data subjects whom the system has data for from one period (day, week, month, quarter, or year) to the next. At the end of each period, if the percent change in data subjects when compared to the end of the previous period falls in the provided range (or if no range is speecified), this alert will send a notification. For example, if you expect the number of data subjects in your vault to grow by at least 1% each month, and having less growth than this is cause for concern, you could create a data-subjects-percent-change alert with a maximum value of 1, an alert level of "warning", and a monthly frequency. This would then send a warning notification each month if the total number of data subjects in the system is less than 1% higher than it was the previous month.

### Total activity volume
This alert measures how much vault activity is happening; that is, how many data points are being read, written, and/or deleted by API calls to the vault server. At the end of each period, if the total amount of activity recorded since the start of the period falls in the provided range, this alert will send a notification.

### Total activity percent change
This alert measures the change in activity from one period to the next. It measures activity volume, as the activity volume alert does; however, rather than comparing the volume to an absolute number, it compares the volume to the previous period's volume, and sends a notification if that percent change is in a specified range.

### Activity volume and activity percent change
These two alerts work the same way as total activity volume and total activity percent change, but allow specifying a subset of activity to alert on by specifying an activity query. Only activity that matches the provided query will be included.

### Query results
This alert measures how much data is stored in the vault that matches a specified query.

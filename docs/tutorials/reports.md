# Scheduled Reports

The ViziVault Enterprise web interface can be used to create scheduled reports that will periodically calculate analytics on your data and notify you if something unusual is detected.

## Viewing scheduled reports

The Reports page shows a list of schedulded reports that are currently active. You can edit or delete a scheduled report by clicking the pencil or trash can icon next to it.

## Creating scheduled reports

To create a new report, click the plus icon at the top of the Reports page. This will open a prompt allowing you to enter details about the report you wish to create.

#### Name 
A human-readable name to show at a glance what this report is measuring.

#### Report type
What type of report this will be: activity volume, users percent change, or activity percent change. See [Types of Reports](reports.md#types-of-reports) for more information; many report types have specific parameters that you will also need to provide.

#### Frequency
How often to calculate the analytics for this report. Options are once per day, once per week, once per month, once per quarter, and once per year.

#### Alert Level
What level of alert this should be considered: informational, warning, danger, neutral, or success.

#### Minimum value and maximum value
These parameters allow you to control the threshold at which a notification will be generated for this report. If the value calculated for the metric falls below a provided minimum, or above a provided maximum, no notification will be sent.

## Types of reports

### Users percent change
This report measures the change in total number of users whom the system has data for from one period (day, week, month, quarter, or year) to the next. At the end of each period, if the percent change in users when compared to the end of the previous period falls in the provided range (or if no range is speecified), this report will send a notification. For example, if you expect the number of users in your vault to grow by at least 1% each month, and having less growth than this is cause for concern, you could create a users-percent-change report with a maximum value of 1, an alert level of "warning", and a monthly frequency. This would then send a warning notification each month if the total number of users in the system is less than 1% higher than it was the previous month.

### Activity volume
This report measures how much vault activity is happening; that is, how many data points are being read, written, and/or deleted by API calls to the vault server. At the end of each period, if the total amount of activity recorded since the start of the period falls in the provided range, this report will send a notification. To specify a subset of activity to report on, additional parameters can be specified to filter activity by application, attribute, and/or event type. If an application is specified, only API calls performed by that application will be measured. If an attribute is specified, only reads, writes, and deletes to datapoints belonging to that attribute will be measured. Specifying an event type allows you to narrow down activity to either only measuring reads, only measuring writes, or only measuring deletes.

### Activity percent change
This report measures the change in activity from one period to the next. It measures activity volume, as the activity volume report does, and allows all the same parameters; however, rather than comparing the volume to an absolute number, it compares the volume to the previous period's volume, and sends a notification if that percent change is in a specified range.
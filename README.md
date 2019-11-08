# TrainScheduler-

Train Scheduler App for administrative use. When someone logs on they should be able to add a new train name, destination, first train time (in military time), and frequency in minutes. When submitted the information given will append to a new table. It will display Name, Destination, Frequency, but it will also show Next Train Arrival and how many minutes away that train is.
I used Bootstrap for most of the layout with a few custom css styles. I generated most of the information dynamically into a table with Javascript and jQuery.
The information will be backed up into a firebase database so it can be stored and kept when the page is refreshed.
I also added checkboxes to delete a train if a user wants to get rid of the text without going to Firebase. This is app is mobile responsive and the header changes and table also becomes responsive.
If I have more time in the future I will come back and add a feature which allows a user to update info. And maybe add some user authentication.

https://cgottshalkjr.github.io/TrainScheduler-/

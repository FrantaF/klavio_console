# klavio_console
Prototype of a Klaviyo Console implemented as a Chrome Extension. The console may be used to observe the tracking of Klaviyo events on a website in real time.

# Adding the extension to your Google Chrome
- Download the repository and unpack it. 
- 1 - Open the Chrome web browser and navigate to: chrome://extensions/
- 2 - Enable developer mode (top right corner). 
- 3 - Select 'Load Unpacked' (top left corner) and upload the repository.

![image](https://user-images.githubusercontent.com/20789437/136280205-b8165af1-ebc2-4e0d-9d0e-17f5a9d0aa1a.png)


Your extension will now appear and should be activated - make sure the blue tick slider is enabled. Additionally, you can pin the extention to your taskbar by navigating to the 'puzzle' icon (highlighted top right corner).

Please see 'Step 2' of the following article for detailed instructions how to load a Chrome extension from a local repository: https://support.google.com/chrome/a/answer/2714278?hl=en

Before proceeding with testing, restart your Chrome web browser.


# Testing
- Ensure that any AdBlocker plugins are disabled on sites where you intend to test the console. 
- Navigate to a site using Klaviyo tracking.
- - Provided testing environment: https://plain-company.myshopify.com/
- - Sample real world website using Klaviyo tracking: https://untuckit.co.uk/

Once you are on the desired page, open your Developer Tools using Ctrl+Shift+I (Windows) or Cmd+Opt+I (Mac) (these instructions are also displayed when you click on the icon of the extension in the taskbar). Navigate to the 'Klaviyo' tab within the Developer Tools. Should the name not be visible, click on the double arrow icon to expand the selection of tabs. 

![image](https://user-images.githubusercontent.com/20789437/136281440-f20bd8db-9ca9-4016-b5be-46386ee5a745.png)

Your Klaviyo Console will initially not show any activity. Unless you are already an identified user, Klaviyo tracking will not be activated for you. Navigate to the Console tab of your Developer Tools and paste the following script. This will identify you as a customer with the specified parameters and will initiate Klaviyo tracking. 


4 - (Optional) If you are not an already identified customer on your chosen website, copy-paste the following command in the Console and confirm this by pressing ENTER. This will initiate Klaviyo tracking (as only identified customers are tracked). Note: should you be an already identified customer, you may need to refresh the page initially or simply start navigating to other parts of the website in order to start seeing events tracked with Klaviyo.
- _learnq.push(['identify', {
    '$email': 'YOUR_EMAIL@EMAIL.COM',
    '$first_name': 'FIRST_NAME',
    '$last_name': 'LAST_NAME' 
  }]);
  
  ![image](https://user-images.githubusercontent.com/20789437/136281903-06d96bd6-ff50-4d28-9e4e-fb9cdce957ca.png)
  
Now you can navigate back into the Klaviyo Console within the Developer Tools. As you browse through the website, events tracked with Klaviyo will appear in the console (latest event on top). You can get more information about each event by clicking on it. The output of the console can be cleared with the 'Clear' button.

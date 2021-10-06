
var devtools_panel;
var storeToken;

// Helper Function - Format event data into HTML string 
function getFormattedRequestProperties(requestData) {

  var htmlString = `<button type="button" class="event-item">${requestData.event}</button><div class="content">`;  
  
  for (const key in requestData.customer_properties) {
    htmlString = htmlString + `<p><b>${key}:</b> ${JSON.stringify(requestData.customer_properties[key])}</p>`;    
  }

  for (const key in requestData.properties) {
    htmlString = htmlString + `<p><b>${key}:</b> ${JSON.stringify(requestData.properties[key])}</p>`;
  }    

  htmlString = htmlString + '</div>'
  return htmlString    
}

// Main functions
function onPanelCreated(panel) {
  
  // Set event listeners for interaction with the UI of the console
  panel.onShown.addListener(function tmp(panel_window){
    
    // Store the new panel created in DevTools as a global var so it can be accessed locally and new HTML elements (events) added to it. Note: this sometimes logs errors but seems to work without issues. 
    panel.onShown.removeListener(tmp);
    devtools_panel = panel_window;    

    // Functionality for the 'clear' button i.e. remove all events from the console. 
    devtools_panel.document.getElementById('clear-btn').addEventListener("click", function() {
      var eventList = devtools_panel.document.getElementById("event-list");
      while (eventList.lastElementChild) {
        eventList.removeChild(eventList.lastElementChild);
      }
    });

    //Expand/collapse indidual event items. Note: event listener added on parent element as children are created dynamically and accessed through event.target
    devtools_panel.document.getElementById('event-list').addEventListener("click", function(event) {
      if(event.target.classList.contains("event-item")){
        console.log(event.target);
        this.classList.toggle("active");
        var content = event.target.parentElement.children[1];
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }       
      }
    });
  
  });  

  // Listen for requests to the tracking Klaviyo API and display events in the DevTools Klaviyo panel
  chrome.devtools.network.onRequestFinished.addListener(   

    function(request) {     
      // Capture and display Klaviyo events
      if(request.request.url.includes('https://a.klaviyo.com/api/track')) {
        var requestData = JSON.parse(request.request.postData.params[0].value);    
        requestData.properties['Time'] = new Date().toLocaleString();   
        console.log(requestData);
        var eventList = devtools_panel.document.getElementById('event-list');  
        var item = devtools_panel.document.createElement("div");          
        item.innerHTML = getFormattedRequestProperties(requestData);
        eventList.insertBefore(item, eventList.childNodes[0]);                
      } 

      // Capture and display Store token - assuming store token 6 chars long; based on observation. 
      if(request.request.url.includes('https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=')) {        
        storeToken = request.request.url.split('https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=')[1].slice(0, 6)
        console.log(storeToken)
        devtools_panel.document.getElementById('store-token').innerHTML = storeToken;  
      }
      
    }   

  ); 

}

// Script Execution
chrome.devtools.panels.create("Klaviyo", null, "/html/panel.html",onPanelCreated)



// Define a global variable to hold the state data
var stateData = {};

// Fetch the states JSON
fetch('states.json')
  .then(response => response.json())
  .then(data => {
    // Store fetched data in stateData for later use
    stateData = data;

    // Iterate over each state path or circle to set its class based on the fetched state data
    $("path, circle").each(function() {
      var stateAbbr = $(this).attr('id'); // Get the state abbreviation from the id
      var info = stateData[stateAbbr]; // Get the state info from stateData

      // Check if the state is active
      if (info && info.status === 'active') {
        $(this).addClass('state-active'); // Add 'state-active' class if the state is active
      }
    });
  })
  .catch(error => console.error('Error fetching state data:', error));

// Assume stateData has already been fetched and stored

// Add click event listeners to each state path or circle
$("path, circle").click(function() {
  var stateAbbr = $(this).attr('id'); // Get the state abbreviation from the id
  var info = stateData[stateAbbr]; // Get the state info from the stateData

  // Check if the state is active and has a URL, then open it in a new tab
  if (info && info.status === 'active' && info.url) {
    window.open(info.url, '_blank'); // Open the URL in a new tab
  }
});


// Hover functionality
$("path, circle").hover(function(e) {
  var stateAbbr = $(this).attr('id'); // Get the state abbreviation from the id of the hovered element
  var info = stateData[stateAbbr]; // Get the state info from the stateData

  // Check if the state is active and then display the hover box
  if (info && info.status === 'active') {
    // Calculate cost by multiplying carriers by 400
    var calculatedCost = info.carriers * 400;
    // Use toLocaleString to format the calculated cost with commas
    var formattedCost = calculatedCost.toLocaleString();
    
    var content = `<div><strong>${info.abbr}</strong> - ${info.state}<br></br></div><div>Carriers: ${info.carriers}</div><div>Pricing: $${formattedCost}</div>`;
    $('#info-box').html(content).css('display', 'block');
  }
}, function(e) {
  $('#info-box').css('display', 'none'); // Hide the hover box when not hovering over a state
});

// Mouse movement for the hover box position
$(document).mousemove(function(e) {
  $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
  $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
}).mouseover();

// Additional existing code for iOS compatibility, etc.
var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link, '_blank');
    return false;
  });
}

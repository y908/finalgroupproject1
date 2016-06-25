
    // Get the modal
    var modal = document.getElementById('myModal');


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }



// global variables

var perPage = 3;

var radius = 5;



// -----------------------
//  flickr stuff
// -----------------------

var apiKey = "87d4ef71bdff0695666b4d895cb3b651";
   
// -----------------------
//  GOOGLE STUFF
// -----------------------

// starting location
var temp1 = 41;
var temp2 = -75;


// initiate map
function initMap() {

    // latitude and logitude
    var myLatLng = {lat: temp1, lng: temp2};


    //==========================================================
    //                          style map our way
    //==========================================================
    var styles = [
        {
          stylers: [
          { "saturation": -40 },
          { "hue": "#0008ff" },
          { "visibility": "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 50 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "labels",
          elementType: "labels",
          stylers: [
            { lightness: 40 }
          ]
        }
      ];

    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});


    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(temp1, temp2),
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };


      var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

    // end of styling map

    //==================================================
    //                  MARKER ON THE MAP
    //==================================================

    var imageFlag = ['pbjelly.gif','rooster.gif','dino.gif','rabbit.gif', 'datboi.gif', 'pokemon.gif', 'heart.gif', 'what.gif'];

    // so when you click it puts a pin there 
    // EVENT LISTENER - click on map
    // here!!!
    google.maps.event.addListener(map, 'click', function(eventFTW) {


      // perPage = 3;
      perPage = document.getElementById("imgAppear").value;

      if (isNaN(perPage)){

        $('#errorMsg').html("That's not a number!");
        modal.style.display = "block";

      }
      else if (perPage > 20 || perPage < 0){

        $('#errorMsg').html("Please enter a # between 0 and 20. :)");
        modal.style.display = "block";
      }
      else{

       marker = new google.maps.Marker({
         position: eventFTW.latLng, 
         map: map,
         animation: google.maps.Animation.DROP,
         icon: "gifs/" + imageFlag[Math.floor(imageFlag.length * Math.random())],
         optimized: false,
       });


      //get photos from location where I clicked

       loadPhotos(eventFTW.latLng.lat(),eventFTW.latLng.lng());

      }

   


    }); // end map click listener


//=============================================================  
}//          END OF GOOGLE MAPS INITIATION FUNCTION
//=============================================================


//===============================================================
//                flickr function for GPS input
//===============================================================





function loadPhotos(aaa,bbb){  

  var apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&has_geo=1&lat="+aaa+"&lon="+bbb+"&radius=" + radius + "&api_key=" + apiKey  + "&extras=geo&per_page=" + perPage + "&format=json&nojsoncallback=1";  

  $.getJSON(apiurl,function(jsonFTW){  

    //console.log(jsonFTW);
    
    for (i=0; i<perPage; i++){ 
      var imageURL = "https://farm"+jsonFTW.photos.photo[i].farm+".staticflickr.com/"+jsonFTW.photos.photo[i].server+"/"+jsonFTW.photos.photo[i].id+"_"+jsonFTW.photos.photo[i].secret+"_b.jpg";
      
      var imageURLsmall = "https://farm"+jsonFTW.photos.photo[i].farm+".staticflickr.com/"+jsonFTW.photos.photo[i].server+"/"+jsonFTW.photos.photo[i].id+"_"+jsonFTW.photos.photo[i].secret+"_s.jpg";


      //console.log("lat = " + jsonFTW.photos.photo[i].latitude);
      //console.log("lon = " + jsonFTW.photos.photo[i].longitude);   

    $("#results").prepend('<a href="'+ imageURL +'" target="_blank"><img title="'+jsonFTW.photos.photo[i].latitude+' and '+jsonFTW.photos.photo[i].longitude+'" src="'+imageURLsmall+'"/></a>');


    }    

  }); // end of .getJSON

} // end loadPhotos



$(document).ready(function() {


// code to have the button do something -- still doesn't work

  $('#btn').on('click', function(){
    perPage = document.getElementById("imgAppear").value;
    radius = document.getElementById("miles").value;

   });


});
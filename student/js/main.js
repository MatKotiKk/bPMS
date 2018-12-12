cardata = ["name", "consumption", "color", "manufacturer", "available", "year", "horsepower"];
manufacturersdata = ["name", "country", "founded"];
getManufacturers = function(){
  $.get("manufacturers", function(manufacturers){
    i = j = 0;
    insert = "<table>";
    while (manufacturer = manufacturers[i++]) {
      j = 0;
      insert += "<tr>";
      while (attr = manufacturersdata[j++]) {
        insert += "<td>" + manufacturer[attr]  + "</td>";
      }
      insert += "</tr>";
    }
    insert += "</table>";
    $("#container").html(insert);
  });
};
getCarList = function(){
  $.get("manufacturer", function(cars){
    i = j = 0;
    insert = "<table>";
    while (car = cars[i++]) {
      j = 0;
      insert += "<tr>";
      while (attr = cardata[j++]) {
        insert += "<td>" + car[attr]  + "</td>";
      }
      insert += "</tr>";
    }
    insert += "</table>";
    $("#container").html(insert);
  });
};

listOwn = function(e){
  name = $(e.target).text();
  document.cookie = "name=" + name;
  $.get("manufacturer", function(cars){
    i = j = 0;
    insert = "<table>";
    while (car = cars[i++]) {
      j = 0;
      insert += "<tr>";
      while (attr = cardata[j++]) {
        insert += "<td>" + car[attr]  + "</td>";
      }
      insert += "</tr>";
    }
    insert += "</table>";
    $("#container").html(insert);
  });
};

addNewManufacturer = function(e){
  newmanufacturer = $(e.target).parent("form").serializeArray(); //ez adja vissza a tömböt ami a formba volt // e target: melyik elementre történt az esemény
  $.post("addManufacturers", newmanufacturer, function(){
    getManufacturers();
  });
};

addNewCarToList = function(e){
  newcaradd = $(e.target).parent("form").serializeArray();
    $.post("addNewCars", newcaradd, function(){
    getCarList();
  });
};


$(document).ready(function(){
  $("#newmanufacturer").click(function(){
    $.get("newmanufacturers.html", function(form){
      $("#container").html(form);
    });
  });
  $("#newcaradd").click(function(){
    $.get("newcars.html", function(form){
      $("#container").html(form);
    });
  });
  $("#manufacturelistlink").click(function(){
    $.get("ManufacturerNames", function(names){
      insert = "<ul>";
      i = 0;
      while (name = names[i++]) {
        insert += "<li><a onclick = 'listOwn(event)'>" + name + "</a></li>";
      };
      insert += "</ul>";
      $("#container").html(insert);
    });
  });
  $("#carslink").click(function(){
    $.get("cars", function(cars){
      i = j = 0;
      insert = "<table>";
      while (car = cars[i++]) {
        j = 0;
        insert += "<tr>";
        while (attr = cardata[j++]) {
          insert += "<td>" + car[attr]  + "</td>";
        }
        insert += "</tr>";
      }
      insert += "</table>";
      $("#container").html(insert);
    });
  });

  $("#manufacturelink").click(function(){
    getManufacturers();
  });
});

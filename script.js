window.onload=function()
    {
        document.getElementById("weatherSubmit").addEventListener("click", async function(event)
        {
            event.preventDefault();
            const value = document.getElementById("weatherInput").value;
            if (value === "")
            return;
            console.log(value);

            const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=fb0f472a75f3eabb4063cf4ce3db7116";/*enter in api key from weather app here*/
   
            //try to do something
            try
            {
                const response = await fetch(url);
                console.log("response: ", response);
                const json = await response.json();
                console.log("json: ",json);
                let results = "";

                results += '<div class="bodyboi">';
                results += '<h2 class="header">Weather in ' + json.name + "</h2>";

                for (let i=0; i < json.weather.length; i++)
                {
                    results += '<img class="innerimg" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
                }

                results += '<h2 class="header">' + json.main.temp + " &deg;F</h2>"
                results += '<p class="header">';

                for (let i=0; i < json.weather.length; i++)
                {
                    results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
                }
                    results += '</p>';
                    results += '</div>';
                    document.getElementById("weatherResults").innerHTML = results;

            }
            catch (err)
            {
                console.log(err);
            }

            const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=fb0f472a75f3eabb4063cf4ce3db7116";

            try
            {

             
              const response = await fetch(url2);
              console.log("response: " , response);
              const json = await response.json();
              console.log("json: ", json);
                let forecast = "";

                forecast += '<div class="forecastContainer">';
                for (let i=0; i < json.list.length; i++)
                {
                    forecast += '<div class="forecastElement">'
                    forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                    forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                    forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
                    forecast += '</div>'
                }
                forecast += '</div>';

                document.getElementById("forecastResults").innerHTML = forecast;
             
            }
            catch(err)
            {
                console.log(err);
            }
       
 
   
        });
       
       
    }

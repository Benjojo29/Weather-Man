$(() => {
    //////////////////////////////
    // DEFINING ELEMENT 
    ////////////////////////////////////
    const $notification = $('.notification');
    ///////////////////////////
    // FUNCTIONS & EVENT LISTENERS
    //////////////////////////////
    $('.btn').on('click', (event) => {
        const userInput = $("input").val();
        if (userInput != '') {
            $.ajax({ //request current temperature in specific cities
                url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=98bc31e16fcdbd2b5db74a9f4d6d5c5d`,
            }).then(
                (data) => { //store reponse in variables
                    $icon = (data.weather[0].icon)
                    $tempVal = (Math.floor(data.main.temp))
                    $tempDesc = (data.weather[0].main)
                    $location = (data.name)
                    $country = (data.sys.country)
                        //changing the inner html of my elements
                    $('.weather-icon').html(` <img src="/icons/${$icon}.png"/>`)
                    $('.temperature-value p').html($tempVal + '° F')
                    $('.temperature-description').html($tempDesc)
                    $('.location').html(`${$location}, ${$country}`)
                })
            $.ajax({ //request the latest news feed from major news outlet in every city
                url: `https://gnews.io/api/v3/search?q=${userInput}&token=5904064766f8c8f0d31d5954ba57298a`
            }).then(
                (data) => {
                    $latestNewsTitle = (data.articles[7].title),
                        $newsUrl = (data.articles[7].source.url),
                        $('.action').html(`Breaking News :<a href="${$newsUrl}" target="_blank"> ${$latestNewsTitle}</a>`).css('font-family', 'serif')
                })

        } else {
            $notification.html('Input field cannot be empty').css('color', 'white'); //display this error message if Input field is empty
            $notification.fadeOut(5000) //set error message to fade out in 5seconds
        }


    })


})
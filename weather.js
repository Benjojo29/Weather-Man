$(() => {
    //////////////////////////////
    // DEFINING ELEMENT 
    ////////////////////////////////////
    const $notification = $('.notification');
    const $refresh = $('#parent-div');
    ///////////////////////////
    // FUNCTIONS & EVENT LISTENERS
    //////////////////////////////
    $('.btn').on('click', (event) => {
        const userInput = $("input").val();
        if (userInput != '') {
            $.ajax({
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
        } else {
            $notification.html('Input field cannot be empty').css('color', 'white');
            $notification.fadeOut(5000) //set error message to fade out in 5seconds
        }
        //refresh #parent-div to allow new searches
        $refresh.on('click')
        setInterval(() => {
            $refresh.load()
        }, 3000)

    })


})
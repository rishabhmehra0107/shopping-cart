$(document).ready(() => {
    if(sessionStorage.getItem("user")==null){
        window.location = "http://localhost:9999/login.html";
    }

    var logout_time = $('#logout_time');

    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    var textbox = $('#textwritten');
    recognition.continous = true;

    recognition.onerror = () => {
        alert("Error occured");
    }

    recognition.onresult = (event) => {
        var current = event.resultIndex;
        var content = event.results[current][0].transcript;
        $('#query').val(content);
        console.log(content);
    }

    $('#btn').click(() => {
        recognition.start();
    })

    $('#search').click(() => {
        if($('#query').val()==''){
            alert("Enter or speak the text to search");
        }
        console.log('Clicked');
    })
    
    $('#logout_time').click(() => {
        //Unset the session
        sessionStorage.removeItem("user");
        $.get('http://localhost:9999/login/logout',(response) => {
            if(response=="Success"){
                window.location = "http://localhost:9999/login.html";
            }
        })
    })

    $.get('http://localhost:9999/products/all_prod',(response) => {
        var str = '';
        for(let i=0;i<response.length;i++){
            str +=`<div class="col-sm-12 col-md-5 box" id="${response[i].product_id}">
                    <div class="insidebox">
                        <div class="row" id="part1">
                            <div class="col-5 text-center" id="part1text">
                                <div class="namespart1">${response[i].product_name}</div>
                                <br>
                                <div class="namespart1">Type -: ${response[i].product_category}</div>
                                <br>
                                <div class="namespart1">InStock -: ${response[i].product_count}</div>
                            </div>
                            <div class="imagePart col-5 text-center">
                                <img src="http://localhost:9999/${response[i].product_image_url}" alt="Image :(" height="200px" width="col-12" id="image">
                            </div>
                        </div>

                        <div class="row" id="part2">
                            <div class="col-12">
                            ${response[i].product_description}
                            </div>
                        </div>

                        <button type="button" class="btn btn-primary col-10 m-1" onClick="clicked(${response[i].product_id})">Add to cart Price -: ${response[i].product_price} per item</button>
                       
                    </div>
                </div>
        `;

        }

        $('#productitems').append(str);

        $('.box').click((e) => {localStorage.setItem("id", e.delegateTarget.id)});
        // console.log(str);
    });

})

async function clicked(e){
    await $.post('http://localhost:9999/cart/check_presence',{'prod_id' : e},(response) => {
        if(response.length!=0){
            var new_sum = response[0].prod_count + 1;
            console.log(new_sum);
            $.post('http://localhost:9999/cart/delete',{'prod_id' : e},(response) => {
                if(response=="Success"){
                    $.post('http://localhost:9999/cart',{'prod_id' : e,prod_count : new_sum},(response) => {
                        alert("response");
                    })
                }
            })
        }
        else{
            $.post('http://localhost:9999/cart',{'prod_id' : e,prod_count : 1},(response) => {
                alert("response");
            })
        }
    })
}
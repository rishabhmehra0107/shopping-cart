$(document).ready(() => {
    if(sessionStorage.getItem("user")==null){
        window.location = "http://localhost:9999/login.html";
    }

    var logout_time = $('#logout_time');
    
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
            str +=`<ul class="cart_list my-5">
                             <li class="cart_item clearfix">
                                 <div class="cart_item_image"><img src="http://localhost:9999/${response[i].product_image_url}" alt="Image :("></div>
                                 <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                     <div class="cart_item_name cart_info_col">
                                         <div class="cart_item_title">Name</div>
                                         <div class="cart_item_text">${response[i].product_name}</div>
                                     </div>
                                     <div class="cart_item_color cart_info_col">
                                         <div class="cart_item_title">Category</div>
                                         <div class="cart_item_text"><span style="background-color:#999999;"></span>${response[i].product_category}</div>
                                     </div>
                                     <div class="cart_item_quantity cart_info_col">
                                         <div class="cart_item_title">Quantity Remaining</div>
                                         <div class="cart_item_text">${response[i].product_count}</div>
                                     </div>
                                     <div class="cart_item_price cart_info_col">
                                         <div class="cart_item_title">Price</div>
                                         <div class="cart_item_text">${response[i].product_price}</div>
                                     </div>
                                     <div class="cart_item_total cart_info_col">
                                         <div class="cart_item_text"><button class="btn btn-primary buy_btn" onClick="clicked(${response[i].product_id})">Buy</button></div>
                                     </div>
                                 </div>
                             </li>
                        </ul>
        `;

        }

        $('#productitems').append(str);
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
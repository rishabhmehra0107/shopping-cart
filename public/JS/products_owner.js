$(document).ready(() => {
    if(sessionStorage.getItem("user")==null){
        window.location = "http://localhost:9999/owner.html";
    }

    var logout_time = $('#logout_time');
    
    $('#logout_time').click(() => {
        //Unset the session
        sessionStorage.removeItem("user");
        $.get('http://localhost:9999/login_owner/logout',(response) => {
            if(response=="Success"){
                window.location = "http://localhost:9999/owner.html";
            }
        })
    })

    $.get('http://localhost:9999/product_owner/all_prod_store_wise',(response) => {
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
                                         <div class="cart_item_text"><button class="btn btn-primary buy_btn" onClick="clicked(${response[i].product_id})">Sell</button></div>
                                     </div>
                                 </div>
                             </li>
                        </ul>
        `;

        }

        $('#productitems').append(str);
    })

})


async function clicked(e){
    
}
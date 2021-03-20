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

    //Get items
    $.get('http://localhost:9999/cart/getItems',(response) => {
        total = 0;
        var str = '';
        for(let i=0;i<response.length;i++){
            total += response[i].product.product_price * response[i].prod_count;
            str +=`<ul class="cart_list my-5">
                             <li class="cart_item clearfix">
                                 <div class="cart_item_image"><img src="http://localhost:9999/${response[i].product.product_image_url}" alt="Image :("></div>
                                 <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                     <div class="cart_item_name cart_info_col">
                                         <div class="cart_item_title">Name</div>
                                         <div class="cart_item_text">${response[i].product.product_name}</div>
                                     </div>
                                     <div class="cart_item_color cart_info_col">
                                         <div class="cart_item_title">Category</div>
                                         <div class="cart_item_text"><span style="background-color:#999999;"></span>${response[i].product.product_category}</div>
                                     </div>
                                     <div class="cart_item_quantity cart_info_col">
                                         <div class="cart_item_title">Quantity</div>
                                         <div class="cart_item_text">${response[i].prod_count}</div>
                                     </div>
                                     <div class="cart_item_price cart_info_col">
                                         <div class="cart_item_title">Price</div>
                                         <div class="cart_item_text">${response[i].product.product_price}</div>
                                     </div>
                                     <div class="cart_item_total cart_info_col">
                                         <div class="cart_item_title">Total</div>
                                         <div class="cart_item_text">${response[i].product.product_price * response[i].prod_count}</div>
                                     </div>
                                 </div>
                             </li>
                        </ul>
        `
        }

        $('#cartitems').append(str);
        $('.order_total_amount').append(`${total}`);
    });


    $('#place').click(() => {
        if (confirm("Do you want to save changes?") == true) {
            $.get('http://localhost:9999/transactions/place_order',(response) => {
                window.location = "http://localhost:9999/transaction_page.html";
            })
        } else {
            console.log("Cancelled");
        }
    })

})
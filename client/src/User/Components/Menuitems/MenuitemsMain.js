import React,{useState,useEffect} from "react";
import "./Menuitems copy.css";
const MenuitemsMain = (props) => {
  const { id, image, price, name, description } = props;
  // if(localStorage.getItem("cartData")!=null){
  //   var cartData = JSON.parse(localStorage.getItem("cartData"));
  // };
  const [blank, setblank] = useState("blank")
  const [number1, setnumber1] = useState(1);
  const [blockBlock2, setblockBlock2] = useState("block2")
  const [cart, setcart] = useState("cart2")
  const [number, setnumber] = useState("number2")
  function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    useEffect(() => {
      function loadData(){
        let cartData = [];
        if (localStorage.getItem("cartData")) {
          cartData = JSON.parse(localStorage.getItem("cartData"));
        }
        const selectItem = cartData.filter((item)=>item.id===id);
        if(selectItem.length>0){
          setnumber1(selectItem.length);
          setblank("");
          setblockBlock2("block")
          setnumber("number")
          setcart("cart")
          document.getElementById("addtoCartLineId").style.display="flex";
          document.getElementById("totalPrice").innerHTML=cartData.reduce((a,b)=>a+b.price*b.quantity,0);
          if(cartData.length===1){
            document.getElementById("itemNo.").innerHTML=cartData.length+" item";
            }
             else{
            document.getElementById("itemNo.").innerHTML=cartData.length+" items";
            }
        }
        
      }
      loadData();
    }, [id])
    
  function addToCart() {
    let cartData = [];
    if (localStorage.getItem("cartData")) {
      cartData = JSON.parse(localStorage.getItem("cartData"));
    }
    cartData.push({ id: id, quantity: 1, price: price });
    localStorage.setItem("cartData", JSON.stringify(cartData));
    console.log(cartData);
    var totalPrice=cartData.reduce((a,b)=>a+b.price*b.quantity,0);
    console.log(totalPrice);
    document.getElementById("totalPrice").innerHTML=totalPrice;
  }

  function subtractItem(){
    let cartData=[]
    let selectItem=[]
      cartData=JSON.parse(localStorage.getItem("cartData"))
      selectItem = cartData.filter((item)=>item.id===id);
      cartData=cartData.filter((item)=>item.id!==id)
      selectItem.pop();
      for(let i=0;i<selectItem.length;i++){
        cartData.push(selectItem[i]);
      }
      localStorage.setItem("cartData",JSON.stringify(cartData))
      console.log(cartData);
      var totalPrice=cartData.reduce((a,b)=>a+b.price*b.quantity,0);
      console.log(totalPrice);
      document.getElementById("totalPrice").innerHTML=totalPrice;

}
  function removeFromCart() {
    console.log(id);
    let cartData = [];
    if (localStorage.getItem("cartData")) {
      cartData = JSON.parse(localStorage.getItem("cartData"));
    }

    cartData = cartData.filter((item) => item.id !== id);
    localStorage.setItem("cartData", JSON.stringify(cartData));
    var totalPrice=cartData.reduce((a,b)=>a+b.price*b.quantity,0);
    console.log(totalPrice);
    document.getElementById("totalPrice").innerHTML=totalPrice;

    
  }

  const addNumber=()=>{
    if(number1<5){
      setnumber1(number1+1)
      addToCart();
    }
      let cartData = [];
        if (localStorage.getItem("cartData")) {
          cartData = JSON.parse(localStorage.getItem("cartData"));
        }
        if(cartData.length===1){
        document.getElementById("itemNo.").innerHTML=cartData.length+" item";
        }
         else{
        document.getElementById("itemNo.").innerHTML=cartData.length+" items";
        }
        document.getElementById("totalPrice").innerHTML=cartData.reduce((a,b)=>a+b.price*b.quantity,0);
  }
  const subNumber=()=>{
    let cartData = [];
    if (localStorage.getItem("cartData")) {
      cartData = JSON.parse(localStorage.getItem("cartData"));
    }
    var totalPrice=cartData.reduce((a,b)=>a+b.price*b.quantity,0);
    console.log(totalPrice);
      if(number1<=1){
          setnumber1(1);
          setblank("blank");
          setblockBlock2("block2")
          setnumber("number2")
          setcart("cart2")
          removeFromCart();
          if(cartData.length-1===0){
            document.getElementById("addtoCartLineId").style.display="none";
            document.getElementById("totalPrice").innerHTML=0;
          }document.getElementById("itemNo.").innerHTML=cartData.length-1+" items";
           
           
        
        }
        else{
          setnumber1(number1-1);
          subtractItem();
          // if(cartData.length==1){
          //   document.getElementById("itemNo.").innerHTML=cartData.length+" item";
          // }else{
          //   document.getElementById("itemNo.").innerHTML=cartData.length+" items";
          // }
          document.getElementById("itemNo.").innerHTML=cartData.length-1+" items";


      }
     
  }
  const unblock=()=>{
      setblank("");
      setblockBlock2("block")
      setnumber("number")
      setcart("cart")
      addToCart();
      let cartData = [];
      if (localStorage.getItem("cartData")) {
        cartData = JSON.parse(localStorage.getItem("cartData"));
      }

      document.getElementById("addtoCartLineId").style.display="flex";
      document.getElementById("totalPrice").innerHTML=cartData.reduce((a,b)=>a+b.price*b.quantity,0);



      if(cartData.length===1){
        document.getElementById("itemNo.").innerHTML=cartData.length+" item";
        }
         else{
        document.getElementById("itemNo.").innerHTML=cartData.length+" items";
        }

  }
  

  return (
    <>
      <div>
        <div className="Pizzabox">
          <div className="foodbox">
            <div className="foodimg">
              <img src={"./uploads/image/item/" + image} alt="not available" />
            </div>
            
            <div className="food-info">
              <h3>{Capitalize(name)}</h3>
             
              <p>{Capitalize(description)}</p>
              <div className="counter"> 
                
                <h5>₹ {price}</h5>
                <button id="negative" onClick={subNumber} className={blank}>
                  <centre>-</centre>
                </button>
                <span className={blockBlock2}>
                 
                  <span className={number}>{number1}</span>
                  <span className={cart} id="addbuttontext" onClick={unblock} >
                    Add to Cart
                  </span>
                </span>
                {
                  number1===5?
                  <button id="positive" disabled onClick={addNumber} className={blank} >
                  <center>+</center>
                </button>
                :
                <button id="positive" onClick={addNumber} className={blank} >
                  <center>+</center>
                </button>

                }
               
              </div>
            </div>
          </div>
        </div>
      </div>
             
    </>
  );
};

export default MenuitemsMain;
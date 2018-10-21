imagearray=["https://images-na.ssl-images-amazon.com/images/I/51XWy95kQjL._SX329_BO1,204,203,200_.jpg",
"https://images-na.ssl-images-amazon.com/images/I/51GcmT5YbgL._SX327_BO1,204,203,200_.jpg"
,"https://i.ebayimg.com/images/g/xi4AAOSw4CFYp-3c/s-l600.jpg","https://images-na.ssl-images-amazon.com/images/I/61zueF3jF3L._SX308_BO1,204,203,200_.jpg"
,"https://images-na.ssl-images-amazon.com/images/I/51XWliJw1uL._SX379_BO1,204,203,200_.jpg"
,"https://images-na.ssl-images-amazon.com/images/I/51DJRLHHONL._SX312_BO1,204,203,200_.jpg"
,"https://images-na.ssl-images-amazon.com/images/I/41hlD8gPegL._SX330_BO1,204,203,200_.jpg"
,"https://images-na.ssl-images-amazon.com/images/I/41zp0BW9o1L._SX312_BO1,204,203,200_.jpg"
,"https://images-na.ssl-images-amazon.com/images/I/51QmfKJ8PdL._SX348_BO1,204,203,200_.jpg"
,"https://images-na.ssl-images-amazon.com/images/I/412YQ%2BAqQwL._SX324_BO1,204,203,200_.jpg"]
pricearray=[29.39,28.80,22.40,23.02,29.96,7.97,20.63,25.87,57.95,32.54]

enproductarray=["Little Fires Everywhere","Ranger Games: A Story of Soldiers, Family and an Inexplicable Crime","The Oddysey",
"Byzantium: The Surprising Life of a Medieval Empire","Practical Statistics for Data Scientists: 50 Essential Concepts","The Brothers Karamazov"
,"The Will to Meaning: Foundations and Applications of Logotherapy","The Gulag Archipelago","Affective Neuroscience: The Foundations of Human and Animal Emotions","History of Religious Ideas, Volume 1: From the Stone Age to the Eleusinian Mysteries"]

frproductarray=["Petits Feux Partout","Jeux de gardes forestiers: une histoire de soldats, de famille et un crime inexplicable","L'Deyssee"
,"Byzance: la vie surprenante d'un empire médiéval","Statistiques pratiques pour les scientifiques: 50 Concepts essentiels"
,"Les frères Karamazov","La volonté de sens: fondements et applications de la logothérapie","L'archipel du goulag","Neuroscience affective: fondements des émotions humaines et animales"
,"Histoire des idées religieuses, volume 1: de l'âge de pierre aux mystères éleusiniens"]

stockarray=[5,5,5,5,5,5,5,5,5,5]
taxarray=[0,0,0,0,0,0,0,0,0,0]
managermode=false

window.onload=function(){
    newtemp=document.getElementsByTagName("template")[0];
    newrow=newtemp.content.querySelector("tr")
    for (i = 0; i < 10; i++){
        newnode=document.importNode(newrow,true)
        for (j = 0; j < 6; j++){
            newnode.getElementsByTagName('td')[j].id=newnode.getElementsByTagName('td')[j].id+i
        }
        mystore.appendChild(newnode)   
    }
    for (i = 0; i < 10; i++){
        if(Math.floor((Math.random()* 10) + 1)<5){taxarray[i]=13 }
        document.getElementById("view"+i).firstElementChild.src=imagearray[i]
        document.getElementById("product"+i).innerHTML=enproductarray[i]
        document.getElementById("price"+i).innerHTML="$"+pricearray[i]
        document.getElementById("tax"+i).innerHTML=taxarray[i]+"%"
        document.getElementById("stock"+i).innerHTML=stockarray[i]+" in stock"
        txt=document.createTextNode("Add")
        add=document.createElement('button')
        add.setAttribute('id',i+'add')
        add.appendChild(txt)
        add.onclick=function(){
            if(stockarray[parseInt(event.target.id.split("inv",1))]==0||stockarray[parseInt(event.target.id.split("inv",1))]<document.getElementById(parseInt(event.target.id.split("inv",1))+'amount').value){
                alert("There are not enough items in stock at the moment.")
                return 
            }
            if(document.getElementById(parseInt(event.target.id.split("inv",1))+'amount').value<0){
                alert("Please input a value greater than zero.")
                return
            }
            addToCart(parseInt(event.target.id.split("inv",1)))
        }
        inamount=document.createElement('input')
        inamount.setAttribute('id',i+'amount')
        inamount.setAttribute('type','number')
        inamount.setAttribute('max',stockarray[i])
        inamount.setAttribute('min','1')
        inamount.setAttribute('value','1')
        inamount.setAttribute('size','5')
        document.getElementById("purchase"+i).appendChild(inamount)
        document.getElementById("purchase"+i).appendChild(add)
    }
}

langswitch.onclick=function(){
    if(langswitch.src=="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png"){
        for (i = 0; i < 10; i++){
            document.getElementById("product"+i).innerHTML=frproductarray[i]
        }
        langswitch.src="https://libertyflagandbanner.com/wp-content/uploads/2015/08/united-kingdom-flag.jpg"
    }
    else{
        for (i = 0; i < 10; i++){
            document.getElementById("product"+i).innerHTML=enproductarray[i]
        }
        langswitch.src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png"
    }
}

newitem.onkeyup=function(){
    for ( var i = 0; row = mystore.rows[i]; i++ ) {
        j=document.getElementById("mystore").rows[i].cells[1].innerHTML.toLowerCase()
        if(!(j.includes(this.value.toLowerCase()))){
            document.getElementById("mystore").rows[i].style.display ='none';
        }
        if(event.keyCode==8||event.charCode==46){
            if((j.includes(this.value.toLowerCase()))){
                document.getElementById("mystore").rows[i].style.display ='';
            }
        }
    }
}

password.onkeyup=function(){
    if(event.keyCode==13 ){
        if(this.value=="Admin"){
            password.disabled=true
            password.value="Logged In"
            password.size='5'
        
            for (i = 0; i < 10; i++){
                new_stock = document.createElement('input');
                new_stock.setAttribute('type','number');
                new_stock.setAttribute('id',i+'mstock')
                new_stock.setAttribute('value',stockarray[i]);
                new_stock.setAttribute('size','3');
                new_stock.setAttribute('min','0');
                new_stock.onchange=function(){
                    document.getElementById(parseInt(event.target.id.split("inv",1))+"amount").max=this.value
                    stockarray[parseInt(event.target.id.split("inv",1))]=parseInt(this.value)
                }
                document.getElementById('stock'+i).innerHTML=null
                document.getElementById('stock'+i).appendChild(new_stock)
                new_tax = document.createElement('input');
                new_tax.setAttribute('type','number');
                new_tax.setAttribute('id',i+'mtax')
                new_tax.setAttribute('value',taxarray[i]);
                new_tax.setAttribute('size','3');
                new_tax.setAttribute('max','13');
                new_tax.setAttribute('min','0');
                new_tax.onchange=function(){
                    taxarray[parseInt(event.target.id.split("inv",1))]=parseInt(this.value)
                }
                document.getElementById('tax'+i).innerHTML=null
                document.getElementById('tax'+i).appendChild(new_tax)
            }
            managermode=true;
        }else{alert('Wrong Password')}
    }
}

buy.onclick=function(){
    new_tbody = document.createElement('tbody');
    old_tbody = document.getElementById("cart")
    mycart.replaceChild(new_tbody, old_tbody)
    new_tbody.id="cart"
    //resetTotals
}

clear.onclick=function(){
    if(confirm("Are you sure you want to clear your cart?")){
        for ( var i = 0; row = mycart.rows[i]; i++ ) {
            checkstring=document.getElementById("mycart").rows[i].cells[0].innerHTML
            for ( var j = 0; row = mystore.rows[j]; j++ ) {
                check=document.getElementById("mystore").rows[j].cells[1].innerHTML
                if(check.includes(checkstring)){
                    checkstring=j
                    alert(j)
                    break
                }
            }
            stockarray[checkstring]=stockarray[checkstring]+parseInt(document.getElementById("mycart").rows[i].cells[1].innerHTML)
            if(managermode){document.getElementById(checkstring+"mstock").value=stockarray[checkstring]}
            else{document.getElementById("stock"+checkstring).innerHTML=stockarray[checkstring]+" in stock"}
            alert(stockarray)
        }
        new_tbody = document.createElement('tbody');
        old_tbody = document.getElementById("cart")
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
        new_tbody.id="cart"
        //resetTotals
    }
}

// Adds items to cart
function addToCart(x){
    stockarray[x]=stockarray[x]-parseInt(document.getElementById(x+"amount").value)
    if(managermode){document.getElementById(x+"mstock").value=stockarray[x]}
    else{document.getElementById("stock"+x).innerHTML=stockarray[x]+" in stock"}
    newtemp=document.getElementsByTagName("template")[0];
    newrow=newtemp.content.querySelector("tr")
    newnode=document.importNode(newrow,true)
    newnode.replaceChild(newnode.cells[1],newnode.cells[0])
    newnode.removeChild(newnode.cells[4])
    newnode.cells[0].innerHTML=enproductarray[x]
    newnode.cells[0].setAttribute('width','20%')
    newnode.cells[1].innerHTML='$'+ pricearray[x]*document.getElementById(x+'amount').value
    newnode.cells[1].setAttribute('width','20%')
    newnode.cells[2].innerHTML=pricearray[x]*document.getElementById( x +'amount').value*taxarray[x]/10
    newnode.cells[2].setAttribute('width','20%')
    newnode.cells[3].innerHTML=document.getElementById(x+'amount').value
    newnode.cells[3].setAttribute('width','20%')
    
    newnode.cells[4].setAttribute('width', '20%')
    td4 = document.createElement('td')
    td4.setAttribute('width','20%')
    txt= document.createTextNode('Delete')
    but = document.createElement('button')
    but.onclick=function(){
        pnode=event.target.parentNode.parentNode
        pnode.parentNode.removeChild(pnode)
        stockarray[x]=stockarray[x]+parseInt(document.getElementById(x+"amount").value)
        if(managermode){document.getElementById(x+"mstock").value=stockarray[x]}
        else{document.getElementById("stock"+x).innerHTML=stockarray[x]+" in stock"}
        setTotals(newnode.cells[2])
    }
    but.appendChild(txt)
    td4.appendChild(but)
    newnode.appendChild(td4)
    cart.appendChild(newnode)
       
    //setTotals(newnode.cells[2])
}


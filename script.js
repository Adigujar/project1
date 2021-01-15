function createElement(element) {
    return document.createElement(element);
}
  
function append(element) {
    return document.body.append(element);
}
  
function appendChild(element, child) {
    return element.appendChild(child);
}
  
function setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}

let main_cont = createElement('div')
setAttribute(main_cont,'class','container-fluid container-lg container-md container-sm container-xl')

let banner = createElement('div')
setAttribute(banner,'class','bg center-align ')
appendChild(main_cont,banner)

let banner_name= createElement('p')
setAttribute(banner_name,'class','float-left name')
banner_name.innerText='Recipe Hunt'
appendChild(banner,banner_name)

let src = createElement('div')
src.innerHTML=`<input type="text" class="row col-8 input center-align" id="recipe-input" placeholder="Recipe Name">`
appendChild(main_cont,src)

let btn = createElement('div')
btn.innerHTML='<button type="button" class=" btn btn-primary col-2" id="recipe-button">Search</button>'
appendChild(main_cont,btn)

let content = createElement('div')
setAttribute(content,'id','content')
content.innerHTML=''
appendChild(main_cont,content)




append(main_cont)


let input = document.getElementById("recipe-input")
let button = document.getElementById("recipe-button")
let contentRow = document.getElementById("content")

button.addEventListener("click",function(){
    let inputData = input.value;
    async function getData(){   
        try{
            let APP_ID = "37409985";
            let APP_KEY = "e4e398a3a81791ee8924e4cc73bce5f2"
            let apiResponse = await fetch(`https://api.edamam.com/search?q=${inputData}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            let apiData = apiResponse.json()
            return apiData;
        }catch(err){
            console.log(err)
        }
        
    };
    getData().then((data)=>{
        console.log(data)
        console.log(data.hits.length)
        contentRow.innerHTML=" "
        if(data.hits.length == 0) {
            let noout = createElement('h2')
            noout.innerText='No Result Found'
            appendChild(main_cont,noout)
        }
        for (let i = 0; i < data.hits.length; i++) {
            let row = createElement('div')
            setAttribute(row,'class','row')
            appendChild(contentRow,row)

            let col1= createElement('div')
            setAttribute(col1,'class','column1')
            appendChild(row,col1)

            let card = createElement('div');
            setAttribute(card, 'class', ' col-md-4 col-lg-3 col-sm-6 col-xs-12');
        
            let img = createElement('img');
            img.src = data.hits[i].recipe.image;
            setAttribute(img, 'class', '');
            appendChild(card, img);
        
            let cardBody = createElement('div');
            setAttribute(cardBody, 'class', '');
            appendChild(card, cardBody);
        
            let btn = createElement('a');
            setAttribute(btn, 'href', data.hits[i].recipe.url);
            setAttribute(btn, 'target', '_blank');
            appendChild(card, btn);
            
            let title = createElement('h5');
            setAttribute(title, 'class', '');
            title.innerText = data.hits[i].recipe.label;
            appendChild(btn, title)

            let caloriesDiv = createElement('div');
            appendChild(cardBody, caloriesDiv); 

            let caloriesLabel = createElement('b');
            caloriesLabel.innerText = 'Calories : ';
            appendChild(caloriesDiv, caloriesLabel);

            let calories = createElement('span');
            calories.innerText = Math.round(data.hits[i].recipe.calories);
            appendChild(caloriesDiv, calories)
            appendChild(card,cardBody)
            appendChild(col1,card)

            let col2 =createElement('div')
            setAttribute(col2,'class','column2')
            appendChild(row,col2)

            let ingredients_tag = createElement("h4")
            ingredients_tag.innerText="Ingredients Required:-"
            appendChild(col2,ingredients_tag)

            let ing = createElement('div')
            ing.innerText=data.hits[i].recipe.ingredientLines
            appendChild(col2,ing)

            input.value = ""
            } 
    })
})



    



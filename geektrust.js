let input_fieldEl = document.getElementById("input_field");
let users_listEl = document.getElementById("users_list");


let searchInputVal = "";
let personsList=[];
// delete function
function onDeleteperson(personId){
  let personIdEl=document.getElementById(personId);
  users_listEl.removeChild(personIdEl);
}

function createAndAppendPerson(person){
    let personId = person.id;
    let newMainDiv = document.createElement("div");
    newMainDiv.classList.add("col-12", "mr-auto", "d-flex", "flex-row", "newDiv");
    newMainDiv.id=personId;
    users_listEl.appendChild(newMainDiv);

    //checkBox div//
    let inputFieldDiv=document.createElement("div");
    inputFieldDiv.classList.add("col-2");
    newMainDiv.appendChild(inputFieldDiv);
                //inputField//
    let inputFieldCheckBox = document.createElement("input");
    inputFieldCheckBox.type = "checkbox";
    // inputFieldCheckBox.id=;
    inputFieldDiv.appendChild(inputFieldCheckBox);
    //checkBox div//

    // name //
    let nameValue=document.createElement("label");
    nameValue.classList.add("col-3", "result_name");
    // nameValue.htmlFor="";
    nameValue.textContent=person.name;
    newMainDiv.appendChild(nameValue);
    // name //

    // emailvlaue //
    let emailValue=document.createElement("label");
    emailValue.classList.add("col-3", "result_email");
    // nameValue.htmlFor="";
    emailValue.textContent=person.email;
    newMainDiv.appendChild(emailValue);
    // emailvalue //

    // rolevalue //
    let roleValue=document.createElement("label");
    roleValue.classList.add("col-2", "result_role");
    // nameValue.htmlFor="";
    roleValue.textContent=person.role;
    newMainDiv.appendChild(roleValue);
    // rolevalue //

    let iconsDiv=document.createElement("div");
    iconsDiv.classList.add("d-flex", "flex-row","icons_div");
    newMainDiv.appendChild(iconsDiv);

    let editIcon = document.createElement("i");
    editIcon.classList.add("far", "fa-edit", "editIcon");
    editIcon.onclick=function(){
      onUpdateperson(personId);
    }
    iconsDiv.appendChild(editIcon);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "deleteIcon");
    deleteIcon.onclick=function(){
      onDeleteperson(personId);
    }
    iconsDiv.appendChild(deleteIcon);

}
// search result
function displaySearchResults(){
  for (let person of personsList){
      //searchByPersonName
      let personName=person.name;
      personName=personName.toLowerCase();
      //searchByPersonEmail
      let personEmail = person.email;
      personEmail=personEmail.toLowerCase();
      //searchByPersonName
      let personRole=person.role;
      personRole=personRole.toLowerCase();
      let searchCondition=((personName.includes(searchInputVal)) || (personEmail.includes(searchInputVal)) || (personRole.includes(searchInputVal)))
      if(searchCondition){
          createAndAppendPerson(person);
      }
  }
}

function getUsersList(){
    let requestUrl="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    let options = {
      method: "GET",
    };
    
    users_listEl.textContent= "";

    fetch(requestUrl,options)
      .then(function(response){
        return response.json();
      })
      .then(function(jsonData){
        personsList=jsonData;
        displaySearchResults();
      });
}

function onChangeSearchInput(event){
    searchInputVal=event.target.value;
    getUsersList();
}
getUsersList();
input_fieldEl.addEventListener("keyup",onChangeSearchInput);
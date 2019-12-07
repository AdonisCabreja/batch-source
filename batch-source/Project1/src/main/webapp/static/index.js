let token = sessionStorage.getItem("token");

console.log("I am in index. file");
console.log("SessionStored token = " + token);
if(!token){
	console.log("I am in index.js if method");
	window.location.href="http://localhost:8080/Project1/login";
} else {
	console.log("I am in index.js else method");
	let tokenArr = token.split(":");
	console.log("tokenArr from index.js= " +tokenArr);
	if(tokenArr.length===2){
		let baseUrl = "http://localhost:8080/Project1/api/empl?id=";
		console.log(baseUrl+tokenArr[0] + " url from indexscript");
		sendAjaxGet(baseUrl+tokenArr[0], displayName);
		
	} else {
		console.log("else else");
		window.location.href="http://localhost:8080/Project1/login";
	}
	
	
//	window.onload = function(){
//		console.log("I am in windows.onload");
//	let reimbUrl = "http://localhost:8080/Project1/api/empl"
//	sendAjaxGet(reimbUrl, displayReimbursements);
//	}
	
//	console.log("colling senAjax 2")
//	let reimbUrl = "http://localhost:8080/Project1/api/empl"
//		sendAjaxGet(reimbUrl, displayReimbursements);
//	console.log("colling senAjax 3")


	
	let reimbUrl = "http://localhost:8080/Project1/api/empls";
	sendAjaxGet(reimbUrl, displayReimbursements);


	function displayReimbursements(xhr){
		console.log("Type of" + typeof xhr.response);
		console.log("xhr.response " + xhr.response);
		let reimbursements = JSON.parse(xhr.response);
		console.log("reimbursements is " + reimbursements);
		console.log(typeof reimbursements);
		let table = document.getElementById("reimb-table");
		table.hidden = false;
		
		for(let reimb of reimbursements){
			let newRow = document.createElement("tr");
			let rDate = new Date(reimb.date);
			newRow.innerHTML= `<td>${reimb.rId}</td><td>${reimb.firstName}</td><td>${reimb.lastName}</td><td>${rDate.toDateString()}</td><td>${reimb.status}</td><td>${reimb.descr}</td><td>${reimb.sum}</td><td>${null}</td><td>${null}</td>`;
			table.appendChild(newRow);
			
		}
	}
	

document.getElementById("logout-btn").addEventListener("click", logOut);

function logOut(){
	sessionStorage.clear()
	window.location.href="http://localhost:8080/Project1/login"
	}
}

function sendAjaxGet(url, callback){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function(){
		if(this.readyState===4 && this.status===200){
			callback(this);
	} else if (this.readyState===4){
			window.location.href="http://localhost:8080/Project1/login";
		}
	}
	xhr.setRequestHeader("Authorization",token);
	xhr.send();
}




function displayName(xhr){
	console.log("I am in displayName  method");
	let empl = JSON.parse(xhr.response);
	console.log("Empl  in display Name " + empl);
	document.getElementById("empl").innerHTML = " " + empl.firstName + " " + empl.lastName;
	document.getElementById("empl-f-name").innerHTML = " " + empl.firstName;
	document.getElementById("empl-l-name").innerHTML = " " + empl.lastName;
	document.getElementById("empl-manager").innerHTML = " " + empl.reportTo;
	document.getElementById("empl-depart").innerHTML = " " + empl.depart;
	document.getElementById("empl-number").innerHTML = " " + empl.strNum;
	document.getElementById("empl-street").innerHTML = " " + empl.street;
	document.getElementById("empl-city").innerHTML = " " + empl.city;
	document.getElementById("empl-state").innerHTML = " " + empl.state;
	document.getElementById("empl-zip").innerHTML = " " + empl.zip;
	document.getElementById("empl-phone").innerHTML = " " + empl.phone;

}




//window.onload = function(){
//	let requestUrl = "http://localhost:8080/Project1/api/empl";
//	sendAjaxGetNoToken(requestUrl, displayReimbursements);
//}
//
//function sendAjaxGetNoToken(url, callback){
//	let xhr = new XMLHttpRequest();
//	
//	xhr.open("GET", url);
//	
//	xhr.onreadystatechange = function(){
//		if(xhr.readyState==4 && xhr.status==200){
//			callback(xhr.response);
//		}
//	}
//	
//	xhr.send();
//}

//let reimbUrl = "http://localhost:8080/Project1/api/empl";
//
//
//
////
// function displayTable(){
//	 sendAjaxGet(reimbUrl+tokenArr[0], displayReimbursements);
// }
//





function addTableRow(reimbId, descr, date, status, sum, id){
	let row = document.createElement("tr");

	row.innerHTML = `<td>${reimbId}</td><td>${null}</td><td>${null}</td><td>${date}</td><td>${status}</td><td>${descr}</td><td>${sum}</td><td>${null}</td><td>${null}</td>`;

	document.getElementById("reim-indv-table").appendChild(row);

}


document.getElementById("new-reimb-btn").addEventListener("click", addNew);


function addNew(){
	let descr = document.getElementById("ureimb-descr").nodeValue;
	let sum = document.getElementById("reimb-summ").nodeValue;
	console.log(`You have submitted: ${description} with a sum of ${sum}`);

	addTableRow(descr, sum);
}
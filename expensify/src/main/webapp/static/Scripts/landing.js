//Variables
let token = sessionStorage.getItem("token");
let invoiceURL = "http://localhost:8080/expensify/api/invoices"
let employeesURL = "http://localhost:8080/expensify/employees"
const currentUser = token.split(":")[0]

//EventListeners

document.getElementById("fetchInvoice").addEventListener("click", fetchInvoices)
document.getElementById("fetchEmployee").addEventListener("click", fetchEmployees)
document.getElementById("fetchResolved").addEventListener("click", fetchResolveInvoices)

document.getElementById("editEmployee").addEventListener("click", forwardToEditPage)

document.getElementById("createInvoices").addEventListener("click", create)
document.getElementById("submit-btn").addEventListener("click", createNewInvoice)

document.getElementById("pendingInvoices").addEventListener("click", fetchMyPendingInvoices)
document.getElementById("myResolvedInvoice").addEventListener("click", fetchMyResolvedInvoices)


document.getElementById("findInvoices").addEventListener("click", invoiceSearchByEmployeeId)
document.getElementById("signOut").addEventListener("click", logOut)


document.getElementById("approve-btn").addEventListener("click", approveInvoice)
document.getElementById("deny-btn").addEventListener("click", denyInvoice)





if(!token){
	window.location.href="http://localhost:8080/expensify/pop";
} else {
	let tokenArr = token.split(":")
	if(tokenArr.length === 2){
		let baseUrl = "http://localhost:8080/expensify/api/employees?id=";
		sendAjaxGet(baseUrl+tokenArr[0], displayInfo);
	} else {
		window.location.href="http://localhost:8080/expensify/hello";
	}
}



function sendAjaxGet(url, callback){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200) {
			callback(this);
		} 
	}
	xhr.setRequestHeader("Authorization", token);
	xhr.send();
}

function displayInfo(xhr) {
	let empl = JSON.parse(xhr.response);
	console.log(empl)
	document.getElementById("full_name").innerHTML = empl.fullname
	let image = document.getElementById('pic')
	image.src = `https://mdbootstrap.com/img/Photos/Avatars/img%20(${currentUser}).jpg`
	if (empl.manager === true) {
		document.getElementById("search").hidden = false
		document.getElementById("manager_status").innerHTML = "Manager"
		document.getElementById("fetchInvoice").hidden = false
		document.getElementById("fetchEmployee").hidden = false
		document.getElementById("approveOrDeny").hidden = false
		console.log("A manager logged in")
	} else {
		document.getElementById("fetchInvoice").hidden = true
		document.getElementById("approveOrDeny").style.display = "none"
		document.getElementById("fetchEmployee").hidden = true
		document.getElementById("search").hidden = true
		document.getElementById("fetchResolved").hidden = true
		console.log("A regular employee logged in")
	}
}


// ADMIN Fetch All Pending Invoices, Fetch Employees,  Fetch All Resolved Invoices

function fetchInvoices(){
	fetch("http://localhost:8080/expensify/api/invoices", {
		headers: {
			Authorization: `${token}`
		}
	})
	.then(res => {
		if (res.status === 200) {
			return res.json()
		} else {
			console.log("error")
		}
		})
			.then(invoices => {
				let pendingListContainer = document.getElementById("pendingListContainer")
				for (let invoice of invoices){
					if (invoice.pending === true) {
						console.log(invoice)
						
						let invoiceList = document.createElement("div")
						invoiceList.setAttribute("class", "media")
						let image = document.createElement("img")
						image.setAttribute("class", "mr-3")
						image.src= `https://mdbootstrap.com/img/Photos/Avatars/img%20(${invoice.userId}).jpg`
						let mediaBody  = document.createElement("div")
						mediaBody.setAttribute("class", "media-body")
						let mediaHeading = document.createElement("h5")
						mediaHeading.innerHTML = ` <bold>Description</bold>: ${invoice.description}`
						invoiceList.appendChild(image)
						mediaBody.appendChild(mediaHeading)
						invoiceList.appendChild(mediaBody)
						pendingListContainer.appendChild(invoiceList)
				
					}
				}
			})
}



function fetchEmployees(){
	console.log("Button press")
	fetch("http://localhost:8080/expensify/api/employees", {
		headers: {
			Authorization: `${token}`
		}
	}).then(res => {
		if (res.status  ===  200){
			return res.json()
		} else {
			console.log("error")
		}
	}).then(data => {
		let pendingListContainer = document.getElementById("pendingListContainer")
		pendingListContainer.hidden = true
		let employeeListContainer = document.getElementById("employeeListContainer")
		for (let employee of data){
				console.log(employee)
				let empList = document.createElement("div")
				empList.setAttribute("class", "media")
				let image = document.createElement("img")
				image.setAttribute("class", "mr-3")
				image.src= `https://mdbootstrap.com/img/Photos/Avatars/img%20(${employee.userId}).jpg`
				let mediaBodyEmployee  = document.createElement("div")
				mediaBodyEmployee.setAttribute("class", "media-body")
				let mediaHeadingEmployee = document.createElement("h5")
				mediaHeadingEmployee.innerHTML = employee.fullname
				empList.appendChild(image)
				mediaBodyEmployee.appendChild(mediaHeadingEmployee)
				empList.appendChild(mediaBodyEmployee)
				employeeListContainer.appendChild(empList)
		}
		})
}




function fetchResolveInvoices(){
	fetch(invoiceURL, {
		headers: {
			Authorization: `${token}`
		}
	})
	.then(res => {
		if (res.status === 200) {
			return res.json()
		} else {
			console.log("error")
		}
		})
		.then(invoices => {
			let pendingListContainer = document.getElementById("pendingListContainer")
			pendingListContainer.style.display = "none"
			let employeeListContainer = document.getElementById("employeeListContainer")
			employeeListContainer.style.display = "none"
			let	listResolvedInvoices = document.getElementById("listResolvedInvoices")
			listResolvedInvoices.hidden = false
		
			for (let invoice of invoices){
				if (invoice.resolved === true && invoice.pending === false) {
				let li = document.createElement("li")
				li.setAttribute("class", "list-group-item list-group-item-success")
				li.innerHTML = `${invoice.description}`
				listResolvedInvoices.appendChild(li)
				console.log(invoice)
			}
			}
		})
	
	
}



function fetchMyResolvedInvoices(){
	fetch(invoiceURL, {
		headers: {
			Authorization: `${token}`
		}
	})
	.then(res => {
		if (res.status === 200) {
			return res.json()
		} else {
			console.log("error")
		}
		})
		.then(invoices => {
			document.getElementById("createInvoice").style.display = "none"
			let invoiceList = document.getElementById("invoiceList")
			invoiceList.hidden = false
			
			for (let invoice of invoices){
				let div = document.createElement("div")
			if (invoice.resolved === true && invoice.pending === false && invoice.userId === Number(currentUser)) {
				div.innerHTML = `${invoice.description}`
				invoiceList.appendChild(div)
				console.log(invoice)
			}
			}
		})
	
}


	

function fetchMyPendingInvoices(){
	fetch("http://localhost:8080/expensify/api/invoices", {
		headers: { Authorization: `${token}`}
	})
	.then(
			res => {
				if (res.status === 200) {
					return res.json()
				} else {
					console.log("error")
				}
			})
				.then(invoices => {
					document.getElementById("createInvoice").style.display = "none"
						document.getElementById("listOfMyPendingInvoices").style.display = "block"
						let container = document.getElementById("listOfMyPendingInvoices")
					
							for (let invoice of invoices){
								if(invoice.userId===Number(currentUser)){
									console.log(invoice)
										let media = document.createElement("div")
										let image = document.createElement("img")
										let mediaBody = document.createElement("div")
										let heading = document.createElement("h5")
										let cardText = document.createElement("p")
										media.setAttribute("class", "media")
										image.setAttribute("class", "mr-3")
										image.src = `https://mdbootstrap.com/img/Photos/Avatars/img%20(${invoice.userId}).jpg`
										mediaBody.setAttribute("class", "media-body")
										heading.innerHTML = invoice.amount
										heading.setAttribute("class", "mt-0")
										cardText.setAttribute("class", "card-text")
										cardText.innerHTML = invoice.description
										mediaBody.appendChild(cardText)
										mediaBody.appendChild(heading)
										media.appendChild(image)
										media.appendChild(mediaBody)
										container.appendChild(media)
										let lineBreak = document.createElement("br")
										container.appendChild(lineBreak)
										container.appendChild(lineBreak)
										container.appendChild(lineBreak)
									}}
					}
				)
	}
			
				
		



function postInvoice(url, callback){
	

	let xhr = new XMLHttpRequest();
	xhr.open("POST", employeesURL );
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200) {
			callback(this);
		} 
	}
	let description = document.getElementById("Description").value;
	let amount = document.getElementById("Amount").value;
	
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	xhr.setRequestHeader("Authorization", token)
	
	let requestBody = `description=${description}&amount=${amount}`;
	xhr.send(requestBody);
	
}




function populate(xhr){
	let invoiceJson = JSON.parse(xhr.response)
	console.log(invoiceJson)
	
	let invoiceList = document.getElementById("invoiceList")
	
	for( let i = 0; i < invoiceJson.length; i++){
		
		let div  = document.createElement("div")
		let h1 = document.createElement("h1")
		let span = document.creatElement("span")
		div.appendChild(h1).appendChild(span)
		invoiceList.appendChild(div)
	
	}
}

function approveInvoice() {
	let invoiceId = document.getElementById("invoiceId").value
	let pending = false
	let approved = true
	let rejected = false
	let resolved = true
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", `http://localhost:8080/expensify/api/invoice/approve`);
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200) {
			callback(this);
		} 
	}
	xhr.setRequestHeader("Authorization", token);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	let requestbody = `pending=${pending}&approved=${approved}&denied=${rejected}&resolved=${resolved}&invoiceId=${invoiceId}`
	xhr.send(requestbody);
}


function denyInvoice(){
	let invoiceId = document.getElementById("invoiceId").value
	
	fetch(`http://localhost:8080/expensify/api/invoice/deny`, {
		method:  "POST",
		body:`invoiceId=${invoiceId}`,
		headers: {
			Authorization: `${token}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	.then(res => {
		if (res.status === 200) {
			return res.json()
		} else {
			console.log("error")
		}
	})
	
}



function invoiceSearchByEmployeeId() {

	let userid = document.getElementById("id").value 
	fetch(`http://localhost:8080/expensify/api/searchinvoice?userid=${userid}`, {
		headers: {
			Authorization: `${token}`
		}
	})
	.then(res => res.json())
	.then(invoiceJson => {
		let div =  document.getElementById("locatedInvoice")
		let image = document.createElement("img")
		div.hidden = false
		for (let invoice of invoiceJson) {
			let h1 = document.createElement('h1')
			h1.innerText = invoice.description
			image.src = `https://mdbootstrap.com/img/Photos/Avatars/img%20(${invoice.userId}).jpg` 
			div.appendChild(h1)
			div.prepend(image)
		}
		
	})
	
}
	
function create(){
	document.getElementById("createInvoice").hidden = false
	
}

function createNewInvoice () {
	let amount = document.getElementById("amount").value
	let description = document.getElementById("description").value
	fetch(`http://localhost:8080/expensify/api/invoice/create?userid=${currentUser}`, {
		method:  "POST",
		body:`amount=${amount}&description=${description}`,
		headers: {
			Authorization: `${token}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	.then(res => res.json())
	.catch(error => console.log(error))
	document.getElementById("createInvoice").style.display = "none"
	
}



function forwardToEditPage(){
	window.location.href="http://localhost:8080/expensify/edit"
}


function logOut() {
	sessionStorage.clear;
	window.location.href="http://localhost:8080/expensify/home"
}
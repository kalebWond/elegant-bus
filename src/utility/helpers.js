var months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
export function getToday() {
	var d = new Date();
	return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

export function formatDate(date, month, year) {
	return date + ' ' + months[month] + ' ' + year 
}
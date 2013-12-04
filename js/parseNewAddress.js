// JavaScript Document
function parseNewAddress() {
	var address = {}
	address.nickName = $("input[name='nickname']").val().toString()
	address.line1 = $("input[name='addressone']").val().toString()
	address.line2 = $("input[name='addresstwo']").val().toString()
	address.city = $("input[name='city']").val().toString()
	address.state = $("input[name='state']").val().toString()
	address.zip = $("input[name='zip']").val()
	address.country = $("select[name='country']").val().toString()

	if (address.line1.length > 0 && address.nickName.length > 0 && address.city.length > 0 &&
		address.state.length > 0 && address.zip.length > 0){
		address.valid = true
	}else{
		address.valid = false
	}
	
	return address
}

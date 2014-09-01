
if (typeof (Storage) !== "undefined") {
$("#spreadsheet").html(localStorage.spTable);

if (localStorage.getItem("userName") !== null) {
	document.getElementById("userName").value = localStorage.userName;
}if(localStorage.getItem("userEmail") !== null){
	document.getElementById("userEmail").value = localStorage.userEmail;
}
if(localStorage.getItem("docName") !== null){
	document.getElementById("docName").value = localStorage.docName;
}

}


$(function(){
		$("#spreadsheet").on("click", "td", function(){
			if(this.cellIndex!=0){
			var top= $(this).offset().top-55,
			 left= $(this).offset().left-120,
			 width = $(this).width();

				var aa= this.parentNode.rowIndex +","+this.cellIndex;
			 	if($(this).text()!=""){

					$("#sp-edit").val($(this).find("label").text());
			 	}
			 	else{
			 		$("#sp-edit").val("");
			 	}
			 
		
			$("#sp-edit").css({
				"top":top,
				"left":left,
				"width":width,
				"padding":0
			})
			$("#sp-edit").attr("data-curnt",aa);
	
		}
		});
		$("#sp-edit").on("focus",function(){
			var tblC_td = $(this).attr("data-curnt").split(",");
			var c_row = parseInt(tblC_td[0]);
			var c_column  = parseInt(tblC_td[1]);
			$('#spreadsheet tr:eq('+c_row+') td:eq('+c_column+') label').hide();
		});
		$("#sp-edit").on("change",function(){
		
			var tblC_td = $(this).attr("data-curnt").split(",");
			var c_row = parseInt(tblC_td[0]);
			var c_column  = parseInt(tblC_td[1]);
			$('#spreadsheet tr:eq('+c_row+') td:eq('+c_column+') label').text($(this).val());
			$('#spreadsheet tr td label').show();
		});
	var obj = lab_test;
	obj.hideMe("error");
	if(localStorage.getItem("spTable") === null){
	lab_test.addRow(10);
	}
	$("#spread-container .form-control").on("change",function(){
		lab_test.saveData();
	});
	$("#longWord").on("change",function(){
		var lRes = lab_test.longestWord($(this).val());
		$(".long-msg").html(lRes +": Length is "+ lRes.length);
	});

	$("#maxThree .form-control").keypress(function (e) {
		if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)){ 
			$(".error").fadeIn();
			 return false;
		}
		else {
			obj.hideMe("error");
		}
	});

	$(".radioCalc").on("change",function(){
		var CurOption = $(this).val();
		var  arr = $("#mathfun").val();
		var cc = arr.split(',');
		var rsMsg = $(".math-msg");
		rsMsg.html("");
		
		if(CurOption!=""){
		var b = CurOption == "sum" ? obj.mathCalc(cc,"+") : obj.mathCalc(cc,"*");
			$(".math-msg").html(b);
		}
		if(arr==""){
			rsMsg.html("Please Enter values");
		}
	});
	$("#calc").on("click",function(e){
		e.preventDefault();
		obj.hideMe("error");
		val1 = $("#val1").val();
		val2 = $("#val2").val();
		val3 = $("#val3").val();
		var res = lab_test.maxOfThree(val3,val2,val1) ;
		res = res !=0 ? "Highest value is : " + res : "Please Enter Valid Numbers"
		$('#total').html(res);
	});

	$("#vowels").on("click",function(e){
		e.preventDefault();
		var str = $("#vow").val();
		if(str!="" && str.length==1){
		lab_test.checkVowels(str);
		}
		else{
			$('.msg').html("Allowed only one character");
		}
		
	});
	
	/*** Reverse String ***/
	 $("#rString").change(function(){
 		var msg = lab_test.stringReverse($(this).val());
		$(".string-msg").html(msg);
    });
	
	// Sort Array
	var letters =["Test-","Best-","Worst","Nest-"];
	var rs = lab_test.albSort(letters);
	$(".sort-msg").html(rs);
		
	
});	

var lab_test = {
init : function(){
},

	
/* maxOfThree */	
maxOfThree:function(num1, num2, num3){
    var max = Math.max(num1, num2, num3);
    return max;
},

/* checkVowels */
checkVowels : function(str){
    var matches = str.match(/[aeiou]/gi);
    var count = matches ? matches.length : 0;
	if(count!=0){
		$('.msg').html("Yub! It's Vowel");
	return true;
	}else{
		$('.msg').html("Oops! It's Not a Vowel ");
    return false;
	}
},


/* Math Caluclation */
mathCalc : function(arr,meth){
	var total=0;
	var total = arr.reduce(function(a, b) {
		switch(meth){
			case  "*":
				return parseInt(a,10) * parseInt(b,10);
				break;
			 case  "+":
				return parseInt(a,10) + parseInt(b,10);
				break;
		}
	});
	return total;
},
  stringReverse :function(str){
	//  String.prototype.reverse = function() {
    var str = str,
        newString = new String();
    for (n = str.length; n >= 0; n--) {
        newString += str.charAt(n);
    }
    return newString;
  
  },
albSort: function(arg){
	arg.sort(function(a, b){
		var x = a.toLowerCase(), y = b.toLowerCase();
		return x < y ? -1 : x > y ? 1 : 0;
	})
	return arg;
},
longestWord:function (string) {
    var str = string.split(" ");
    var longest = 0;
    var word = null;
    str.forEach(function(str) {
        if (longest < str.length) {
            longest = str.length;
            word = str;
        }
    });
    return word;
},
spreadSheet :function(tblFiled){
	var Addcolum ="<td><label> </label> </td>";
	columnLength =	$("#spreadsheet thead th").length+1;
	var AddHeadcolum ="<th>A"+ columnLength+ "</th>";
	if(tblFiled == "row" ){
	lab_test.addRow(1);
	}
	else if(tblFiled=="column"){
		$("#spreadsheet tbody tr").append(Addcolum);
		$("#spreadsheet thead tr").append(AddHeadcolum);
		lab_test.storeTable();
	}
},
addRow:function(no){
		var dynColumn ="" ,
			cellLength= 4;
			if( document.getElementById('spreadsheet').rows[1]){
				cellLength = document.getElementById('spreadsheet').rows[1].cells.length-1;
			}
		for(j=1;j<=cellLength;j++){
			dynColumn +=  "<td><label></label> </td>";
		}
		for (i=0; i<no; i++){
			var rowStart = "<tr><td>"+(document.getElementById('spreadsheet').rows.length)+"</td>"
			var com= rowStart+dynColumn+"</tr>";
			$("#spreadsheet tbody").append(com);
			//document.getElementById("spreadsheet").appendChild (com);
		}
		lab_test.storeTable();
		
},
/** Hide Error ***/
 hideMe: function(a){
	$("."+a).hide();
 },
 
 storeTable: function(){
			
	 	var tbl = document.getElementById("spreadsheet").innerHTML;
		var tblVal = [];
		tblVal = document.getElementById("spreadsheet").getElementsByClassName("form-controll").value;
		localStorage.spTable=tbl;
	
		
 },
userInfo : function(curId){
	var userInf ="",
	curVal = document.getElementById(curId);
	if(curVal.value!=""){
		curVal.setAttribute("disabled",true);
		if(curId!="docName"){
		 userInf = curId =="userEmail" ? "userEmail" :"userName";
		}else{
			userInf = "docName";
		}
		localStorage.setItem(userInf,curVal.value);
	}

},
clearMe:function(){
	window.location.href="";
	localStorage.clear();
},
saveData: function(){
	var btnText = document.getElementById("save");
		btnText.innerHTML = "Saving...";
		lab_test.storeTable();
		setTimeout(function(){
			btnText.innerHTML = "Save";
		},1000);
}
}
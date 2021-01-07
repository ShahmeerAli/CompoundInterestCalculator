const onChange = () => {
  var a1 = document.getElementById("input1").value;
  var a2 = document.getElementById("input2").value;
  var a3 = document.getElementById("input3").value;
  var a4 = document.getElementById("input4").value;
  var a6 = document.getElementById("input6").value;

  var right = document.getElementById("right");
  var chart = document.getElementById("chart");
  var table = document.getElementById("table");
  if(a1 == "" || a2 == "" || a3 == "" || a4 == "" || a6 == ""){
    alert("Fill all text boxes");
    
    right.style = "display: none"
    chart.style = "display: none"
    table.style = "display: none"
  }
  else{
    right.style = "display: block"
    chart.style = "display: block"
    table.style = "display: block"
  }
}

function addYears(dt,n){
  return new Date(dt.setFullYear(dt.getFullYear() + n));      
}

function addMonths(dt,n){
  return new Date(dt.setMonth(dt.getMonth() + n));      
}

function addDays(dt,n){
  return new Date(dt.setDate(dt.getDate() + n));      
}

var balArray=[]
var prnPayArray =[]
var dateArray=[]

var ir = document.getElementById("td1");//Interest rate
var pay = document.getElementById("td2");//Total Payment
var payPrpl = document.getElementById("td3");//Total Payments + Principal
var totalInt = document.getElementById("td4");//Total Interest
var balance = document.getElementById("td5");//Future Value
var intRate = 0;
var PFF = 0;


const calculate = () => {
  var P = document.getElementById("input1").value;//Principal Amount
  var t = document.getElementById("input3").value;//Years of Growth
  var A = document.getElementById("input6").value;//payment per period
  changeHandler1();
  changeHandler2(A,t,P);
  calc(A,P,t,PFF);
  onChange();
};

const totalPayment = (PF,A,t,P)=>{
  var TP = A*t*PF;
  pay.innerHTML = '$ '+TP;
  payPrpl.innerHTML = '$ '+(parseInt(TP)+parseInt(P));
}

function daytrue(r) {
  var rate = parseFloat(r) / 100;
  console.log(rate);
  ir.innerHTML = rate / 365;
  console.log(rate);
}
function dayFalse(CF,r,PF) {
  var rate = parseFloat(r) / 100;
  console.log(CF,"CF",rate,"rate",PF,"PF");
  var pr = ((1 + (rate / CF)) ** (CF / PF)) - 1;//rate per payment period
  ir.innerHTML = pr*100+'%';
  intRate = pr;
}

const changeHandler1 = () => {
  var r =  document.getElementById("input2").value;//Nominal rate
  var CF = document.getElementById("input5").value;//Compound Frequency
  var PF = document.getElementById("input7").value;//Payment Frequency
  PFF = PF;
  console.log(r);
  console.log(CF);
  if (CF == "365") {
    daytrue(r);
  } else {
    dayFalse(CF,r,PF);
  }
};

const changeHandler2 = (A,t,P) => {
  var PF = document.getElementById("input7").value; //payment frequency
  totalPayment(PF,A,t,P);
};




var newDate = 0;
const calc = (A,P,t,PFF) => {

    var yearGap = 0;
    var monthGap = 0;
    var dayGap = 0;

    if(PFF == 1){
      yearGap = 1;
    }
    else if(PFF == 2){
      monthGap = 6;
    }
    else if(PFF == 4){
      monthGap = 3;
    }
    else if(PFF == 6){
      monthGap = 2;
    }
    else if(PFF == 12){
      monthGap = 1;
    }
    else if(PFF == 24){
      dayGap = 15;
    }
    else if(PFF == 26){
      dayGap = 14;
    }
    else if(PFF == 52){
      dayGap = 7;
    }

    var dat = document.getElementById("input4").value;//Starting date
    var arr = dat.split('-');
    dateStr = arr[1]+" "+arr[2]+", "+arr[0];
    var date = new Date(dateStr);
    

    var table = document.querySelector(".table.text-center");
    console.log(table.children.length,"length");

    if(table.children.length>1){
      table.removeChild(table.lastChild);
    }

    var tBody = document.createElement("tbody");
    table.appendChild(tBody);
    var prnPay = P;
    var bal = P;
    var interest = 0;
    var cumInt = 0;
    var loop = PFF*t;
    var newDateString;
    for (i=0;i<loop+1;i++){
      let no = i;
      row = tBody.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      cell1.innerHTML=no;
      if(i==0){
        cell3.innerHTML ='$ 0.00';
        newDateString = convertDateString(date);
        cell2.innerHTML = newDateString;
        interest = 0;
        cumInt = 0;
      }
      else if(i==1){
        cell3.innerHTML = '$ '+A;
        newDate = addYears(date,yearGap);
        newDate = addMonths(date,monthGap);
        newDate = addDays(date,dayGap);
        newDateString = convertDateString(newDate);
        cell2.innerHTML = newDateString;
        prnPay = parseInt(prnPay)+parseInt(A);
        interest = parseInt(bal)*intRate;
        cumInt = interest;
        bal = parseInt(bal)+parseInt(A)+parseFloat(interest);
      }
      else{
        cell3.innerHTML = '$ '+A;
        newDate = addYears(newDate,yearGap);
        newDate = addMonths(newDate,monthGap);
        newDate = addDays(newDate,dayGap);
        newDateString = convertDateString(newDate);
        cell2.innerHTML = newDateString;
        prnPay = parseInt(prnPay)+parseInt(A);
        interest = parseInt(bal)*intRate;
        cumInt = parseFloat(cumInt) + parseFloat(interest);
        bal = parseInt(A)+parseInt(bal)+parseFloat(interest);
      }
      console.log("intRate",intRate);
      
      cell4.innerHTML = '$ '+prnPay;
      cell5.innerHTML = '$ '+parseFloat(interest).toFixed(2);
      cell6.innerHTML = '$ '+parseFloat(cumInt).toFixed(2);
      cell7.innerHTML = '$ '+parseFloat(bal).toFixed(2);
      balArray.push(bal);
      prnPayArray.push(prnPay);
      dateArray.push(newDateString)
    }
    totalInt.innerHTML = '$ '+parseFloat(cumInt).toFixed(2);
    balance.innerHTML = '$ '+parseFloat(bal).toFixed(2);
    console.log(balArray);

}

const convertDateString=(date)=>{
  const dateString = date.getDate();
  const monthString = date.getMonth() +1;
  const yearString = date.getFullYear();

  return `${monthString}/${dateString}/${yearString}`
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
  type: 'line',

    // The data for our dataset
  data: {
    labels: dateArray,
        datasets: [
          {
            label: 'Principal + Payments',
            data: prnPayArray,
            // this dataset is drawn below
            order: 1
        }, {
            label: 'Blance',
            data: balArray,
            type: 'line',
            // this dataset is drawn on top
            order: 2
        }
           ],  
    },

    // Configuration options go here
    options: {}
});

function CallWebService() {

    function groupByDate(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            var date = new Date(obj[property]);
           const key = date.toLocaleDateString();
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
     }
    
     function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
     }
    
                
if (window.XMLHttpRequest) {
          //New browsers.
          request = new XMLHttpRequest();
      }
      else if (window.ActiveXObject) {
          //Old IE Browsers.
          request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (request != null) {

          var url = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";
          request.open("GET", url);
          var params = "{ userId: '1', recipientId: '2'}";
      
          request.onreadystatechange = function () {
              if (request.readyState == 4 && request.status == 200) {
                 
                var trans =  JSON.parse(request.responseText);
                createHistoryPage(trans);

              }
              }
          };
          request.send();

          function createHistoryPage(trans) {
            if(trans != null && trans.transactions.length>0) {
         

                const groupDate = groupByDate(trans.transactions, 'startDate');
               
                var count =11;
                var linecount = 0;
               
                for (var transGroup in groupDate) {
               
                   var elmnt = document.getElementById("dvline");
                   var cln = elmnt.cloneNode(true);
                   cln.id = 'dvline'+linecount;
                   cln.style.display = 'block';
                   document.getElementById('history').appendChild(cln);
                   document.getElementById(cln.id).childNodes[3].innerText = new Date(transGroup).toDateString();
                   linecount++;
               
               
                   var groupDirection =  groupBy(groupDate[transGroup],'direction');
               
                   for (var group in groupDirection) {
                      
                  
               
               if(group ==1)
               {
                  var group1Type = groupBy(groupDirection[1], 'type');
                  for (var type in group1Type) {
               
               if(type ==1)
               {  
                   var elmnt = document.getElementById("div1");
                   var cln = elmnt.cloneNode(true);
                   cln.id = 'dv'+count;
                   cln.style.display = 'block';
                   document.getElementById('history').appendChild(cln);
                   document.getElementById(cln.id).childNodes[5].innerHTML = group1Type[type][0].id;
                   var amtStr = '&#x20B9 '+ group1Type[type][0].amount + '                      &#10004;You paid';
                   document.getElementById(cln.id).childNodes[1].innerHTML = amtStr;
                   var linebreak1 = document.createElement("br");
                   document.getElementById('history').appendChild(linebreak1);
                   count++;
               
               }
               else{
                   var elmnt = document.getElementById("div2");
                   var cln = elmnt.cloneNode(true);
                   cln.id = 'dv'+count;
                   cln.style.display = 'block';
                   document.getElementById('history').appendChild(cln);
                   var amtStr = '&#x20B9 '+ group1Type[type][0].amount + '                  &#x1F4CE;You requested';
                   document.getElementById(cln.id).childNodes[1].innerHTML = amtStr;
                   var linebreak2 = document.createElement("br");
                   document.getElementById('history').appendChild(linebreak2);
                   count++;
               }
               }
               }
               else if(group == 2)
               {
                   var group2Type = groupBy(groupDirection[2], 'type');
                   for (var type in group2Type) {
               
                   if(type == 1)
               {
                   var elmnt = document.getElementById("div3");
                   var cln = elmnt.cloneNode(true);
                   cln.id = 'dv'+count;
                   cln.style.display = 'block';
                   document.getElementById('history').appendChild(cln);
                   document.getElementById(cln.id).childNodes[5].innerHTML = group1Type[type][0].id;
                   var amtStr = '&#x20B9 '+ group1Type[type][0].amount + '                  &#10004;you received';
                   document.getElementById(cln.id).childNodes[1].innerHTML = amtStr;
                   var linebreak3 = document.createElement("br");
                   document.getElementById('history').appendChild(linebreak3);
                   count++;
               }
               else{
                   var elmnt = document.getElementById("div4");
                   var cln = elmnt.cloneNode(true);
                   cln.id = 'dv'+count;
                   cln.style.display = 'block';
                   document.getElementById('history').appendChild(cln);
                   var amtStr = '&#x20B9 '+ group1Type[type][0].amount + '                &#x1F4CE;request received';
                   document.getElementById(cln.id).childNodes[1].innerHTML = amtStr;
                   var linebreak4 = document.createElement("br");
                   document.getElementById('history').appendChild(linebreak4);
                   count++;
               }
               }
               }
                   }
               
               
                }
               }
          }
}

       

//    'use strict';
//
//
//
//
//  var xml = new XMLHttpRequest()
//  var url = '/getListOfEvents'
//  xml.open("GET", url, true);
//  xml.send();
//
//  xml.onreadystatechange = function(){
//      console.log(xml.readyState);
//    if(xml.readyState == 4 && xml.status == 200){
//      //console.log(xml.responseText)
//      //Format so it fits the table
//      var json = JSON.parse(xml.responseText)
//      var table = document.getElementById("scheduleTable");
//
//
//    
//
////        console.log("here");
////            var tableModel = {
////                cols: ["Event Name", "Event Location", "Event Day", "Start Time", "End Time"],
////                rows: json,
////            }
////            
////            console.log(tableModel.rows[0].event_id);
////        
////    const e = React.createElement;
////    
////        function Welcome (props) {
////            return <h1> Hello Ji {props.event_id}</h1>
////        }
////    const element = <Welcome name="Sara" />;    
////    ReactDOM.render(
////    
////        element,document.getElementById("addHere");
//////        e('div', null, tableModel.rows[0].event_id),
//////            document.getElementById('addHere')
////        
////        
////    );
////        
////    }
//  }
//  
//
// 
////    var Table = React.createClass({
////
////        render() {
////
////            var thead = React.DOM.thead({},
////                React.DOM.tr({},
////                    this.props.cols.map(function (col) {
////                        return React.DOM.th({}, col);
////                })));
////
////            var tbody = this.props.rows.map(function (row) {
////                return React.DOM.tr({},
////                this.props.cols.map(function (col) {
////                    return React.DOM.td({}, row[col] || "");
////                }));
////            });
////            
////            return React.DOM.table({}, [thead, tbody]);
////        }
////
////    });
////
////
////
//
//
//
//
//

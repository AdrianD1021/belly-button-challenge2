//const url = "https://api.spacexdata.com/v4/launchpads";

function init(){
    var selector = d3.select("#selDataset");
    
    d3.json("data/samples.json").then((data)=>
    var subjectIDs = data.names;
    subjectIDs.foreach ((id) =>{
        selector
        .append("option")
        .text(id)
        .property("value",id);
    }
    );

    const first
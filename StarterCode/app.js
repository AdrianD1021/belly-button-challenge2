const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise):

d3.json(url).then(function(data){
    console.log(data);
})

//Variables and getting data from JSON for charts

var samples;
var metadata;

d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset"):
    metadata = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value",id);
    });
    Metadata(metadata[0]);
    Hbarchart(samples[0]);
    Bubblechart(samples[0]);

});

function OptionChange (value) {
    const SelectedID = samples.find((item) => item.id == value);
    const Demographics = metadata.find(item) => item.id == value);

    Metadata(Demographics);

    Hbarchart(SelectedID);

    Bubblechart(SelectedID);

}

//Demographic Information

function Metadata (Demographics) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${Demographics.id} <br>
        ethnicity: ${Demographics.ethnicity} <br>
    gender: ${Demographics.gender} <br>
    age: ${Demographics.age} <br>
    location: ${Demographics.location} <br>
    bbtype: ${Demographics.bbtype} <br>
    wfreq: ${Demographics.wfreq}`
        ):
}

function Hbarchart (SelectedID) {
    let xaxis = SelectedID.sample_values.slice(0,10).reverse();
    let yaxis = SelectedID.otu_ids
    .slice(0,10)
    .reverse()
    .map((item) => `OTU ${item}`;
    let text = SelectedID.otu_labels.slice(0,10).reverse();

    Barchart = {
        x: xaxis,
        y: yaxis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [Barchart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height:500,
        width:600,
    };

    Plotly.Newplot("bar",chart,layout);
}

function Bubblechart(SelectedID) {
    let xaxis = SelectedID.otu_ids;
    let yaxis = SelectedID.sample_values;
    let markersize = SelectedID.otu_ids;
    let text = SelectedID.otu_labels;

    bubble = {
        x: xaxis,
        y: yaxis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Pastel",
            size: markersize,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout={
        xaxis:{
            title: {text: "OTU ID"},
        },
    };
    Plotly.Newplot("bubble",chart,layout);
}

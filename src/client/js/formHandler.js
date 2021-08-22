//global variable
const polarity = document.getElementById('polarity');
const agreement = document.getElementById('agreement');
const subjectivity = document.getElementById('subjectivity');
const confidence = document.getElementById('confidence');
const irony = document.getElementById('irony');



function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let link = document.getElementById('link').value
    if(Client.checkForUrl(link)) {
        console.log("::: Form Submitted :::");
        apiData(link)
        .then( (receivedData) => {
            //post api data tp server
            postData('/addData', {
            polarity: receivedData.score_tag,
            agreement: receivedData.agreement,
            subjectivity: receivedData.subjectivity,
            confidence: receivedData.confidence,
            irony: receivedData.irony})
            
            .then((newData)=> {
                //server response the data back and pass to elements innerhtml
                polarity.innerHTML = scoreToString(newData.polarity);
                agreement.innerHTML = newData.agreement;
                subjectivity.innerHTML = newData.subjectivity;
                confidence.innerHTML = newData.confidence;
                irony.innerHTML = newData.irony
            })
        })
    }else{
        alert("Please enter the correct form of link!!")
    }
    }
//api fetch GET
const apiData = async(link) => {

    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=f6190bb3295817260e4ef31c5f37da46&url=${link}&lang=en`)
    try {
        const receivedData = await response.json();
        console.log(receivedData);
        return receivedData;
    }
    catch (err) {
        console.error("Something went wrong")
        console.error(err)
    }
}
//post data to server
const postData = async(url = '', data = {}) => {
    const serverRes = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            polarity: data.polarity,
            agreement: data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony
        })
    });
    try {
        const newData = await serverRes.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}
/* The possible values are the following:
P+: strong positive
P: positive
NEU: neutral
N: negative
N+: strong negative
NONE: without sentiment */
const scoreToString = (score)=>{
    if (score == "P+"){
        return "strong positive";
    }
    else if (score == "P"){
        return "positive";
    }
    else if (score == "NEU"){
        return "neutral";
    }
    else if (score == "N"){
        return "negative";
    }
    else if (score == "N+"){
        return "strong negative";
    }
    else{
        return "without sentiment";
    }
}

export { handleSubmit }





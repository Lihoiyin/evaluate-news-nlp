//global variable
const polarity = document.getElementById('polarity');
const agreement = document.getElementById('agreement');
const subjectivity = document.getElementById('subjectivity');
const confidence = document.getElementById('confidence');
const irony = document.getElementById('irony');



function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let link = document.getElementById('link').value;
    if(Client.checkForUrl(link)) {
        console.log(link);
        console.log("::: Form Submitted :::");
        postData('http://localhost:8000/addData', {url: link})
            .then((newData)=> {
                //server response the data back and pass to elements innerhtml
                polarity.innerHTML = scoreToString(newData.polarity);
                agreement.innerHTML = newData.agreement;
                subjectivity.innerHTML = newData.subjectivity;
                confidence.innerHTML = newData.confidence;
                irony.innerHTML = newData.irony
            })
    }else{
        alert("Please enter the correct form of link!!")
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
            link :data.url
        })
    });
    try {
        const newData = await serverRes.json();
        console.log(newData);
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





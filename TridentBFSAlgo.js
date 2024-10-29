let typeVariable = null;
let html = [];

function tridentBFSAlgo(jsonTestObj) {
    html.length = 0;
    contentDataXML(jsonTestObj);
    //titleDataXML(jsonTestObj);
}

const contentDataXML = (jsonTestObj) => {
    if ("Content" in jsonTestObj && "Paragraph" in jsonTestObj["Content"]) {
        const paraArray = jsonTestObj["Content"]["Paragraph"];
        for (let i = 0; i < paraArray.length; i++) {
            paraObject(paraArray[i], "DualDialogue" in paraArray[i]);
        }
    }
}

const paraObject = (pObject, dualCheck)=>{
    if(!dualCheck && "@Type" in pObject){
        typeVariable = pObject["@Type"];
        const textArray = bfsSearchAlgo(pObject);
        if (textArray && textArray.length > 0) {
            parse(textArray);
        }
        return;
    }
    dualDialParse(pObject["DualDialogue"]);
}

const dualDialParse = (paraObject)=>{
    if("Paragraph" in paraObject){
        //&& typeof(paraObject["Paragraph"]) === typeof([])
        let chars =[];
        let dials = [];
        const paraArray = paraObject["Paragraph"]
        for(let i=0; i<paraArray.length;i++){
            if("@Type" in paraArray[i] && paraArray[i]["@Type"] === "Character"){
                chars.push(paraArray[i]["Text"]["#text"]);
            }else if("@Type" in paraArray[i] && paraArray[i]["@Type"] === "Dialogue"){
                dials.push(paraArray[i]["Text"]["#text"])
            }
        }
        console.log(chars.length);
        console.log(chars);
        console.log(dials);
        if(chars.length>0 && dials.length>0){
            html.push(dualDialogueHTML(chars,dials))
        }
    }else{
        console.log("Failing in dualDialParse");
    }
}

const dualDialogueHTML = (chars,dials)=>{
    let newHTML = `<div class="dualdialogue">    
            <div class="dualdialogueitem">
                <p class="character">${chars[0]}</p>
                <p class="dialogue">${dials[0]}</p>
            </div>
            <div class="dualdialogueitem">
                <p class="character">${chars[1]}</p>
                <p class="dialogue">${dials[1]}</p>
            </div>
            </div>`
    return newHTML
}

const bfsSearchAlgo = (obj) => {
    let result = [];
    const queue = [obj];

    while (queue.length > 0) {
        const current = queue.shift();

        if (typeof current !== 'object' || current === null) {
            continue;
        }

        // Check for #text key at the current level
        //Object.prototype.hasOwnProperty.call(current, '#text')
        if ('#text' in current) {
            result.push(current['#text']);
        }

        // Add all properties of the current object to the queue
        for (let key in current) {
            if ((key in current) && typeof current[key] === 'object' && current[key] !== null) {
                queue.push(current[key]);
            }
        }
    }
    return result;
};

const parse = (textArray) => {
    let tempTypeClassName = null;
    switch (typeVariable){
        case "Scene Heading":
            tempTypeClassName = "scene";
            break;
        case "Transition":
            tempTypeClassName = "transition";
            break;
        case "Action":
            tempTypeClassName = "action";
            break;
        case "Character":
            tempTypeClassName = "character";
            break;
        case "Dialogue":
            tempTypeClassName = "dialogue";
            break;
        //doubt keywords
        case "Parenthetical":
            tempTypeClassName = "parenthetical";
            break;
        case "Note":
            tempTypeClassName = "note";
            break; 
        case "Section":
            tempTypeClassName = "section";
            break;
        case "Synopsis":
            tempTypeClassName = "synopsis";
            break;
        case "Centered":
            tempTypeClassName = "centered";
            break;
        case "boneyard_begin":
            tempTypeClassName = "_bb"
            break;
        case "boneyard_end":
            tempTypeClassName = "_be"
            break;
        case "page_break":
            tempTypeClassName = "_pb"
            break;
        case "line_break":
            tempTypeClassName = "_br"
            break;
        default:
            tempTypeClassName = "scene"; //written just to check if scene heading is parsing correctly not sure should check again
            break;
    }
    for(let i=0;i<textArray.length;i++){
        if(tempTypeClassName.startsWith("_")){
            if (tempTypeClassName == "_bb"){
                html.push("<!-- ");
            }else if(tempTypeClassName == "_be"){
                html.push(" -->");
            }else if(tempTypeClassName == "_pb"){
                html.push("<hr />");
            }else if(tempTypeClassName == "_br"){
                html.push("<br />");
            }
            continue;
        }
        if(textArray[i]!=""){
            html.push(`<p class="${tempTypeClassName}">${textArray[i]} </p>`);
        }
    }
}

// const titleDataXML = (jsonTestObj) =>{

// }

export default {
    tridentBFSAlgo,
    html
};



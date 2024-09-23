const input_pemText = document.getElementById("pemText");
const input_challengeText = document.getElementById("challengeText");
const input_responseText = document.getElementById("responseText");

const text_algoType = document.getElementById("algoType");
const text_random = document.getElementById("random");
const text_version = document.getElementById("version");
const text_chipId = document.getElementById("chipId");
const text_fazit = document.getElementById("fazit");

const button_copyResponse = document.getElementById("copyResponse");

input_pemText.oninput = function () {
    calculateResponse();
}

input_challengeText.oninput = function () {
    calculateResponse();
}

input_responseText.oninput = function () {
    calculateResponse();
}

button_copyResponse.onclick = function () {
    navigator.clipboard.writeText(input_responseText.value);
}

generateResponse(input_challengeText.value, input_pemText.value);

function calculateResponse() {
    const pem = input_pemText.value;
    const challenge = input_challengeText.value;

    generateResponse(challenge, pem);
}

function hex2raw(hex) {
    let decStr = '';
    for (let i = 0; i < hex.length; i += 2) {
        let dec = String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
        decStr += dec;
    }
    return decStr;
}

function splitChallenge(challenge) {
    let raw = hex2raw(challenge);
    //let raw = btoa(challenge);
    return raw.split('\n').filter(entry => entry.length > 0);
}

function hash(msg) {
    return Sha256.hash(msg);
}

function sign(val, pem) {
    let sign = new JSEncrypt();
    sign.setPrivateKey(pem);
    return sign.sign(val, hash, "sha256");
}

function encodeHex(val) {
    let ret = '';
    for (let i = 0; i < val.length; i++) {
        const code = val.charCodeAt(i);
        ret += code.toString(16).padStart(2, "0").toUpperCase();
    }
    return ret;
}

function generateResponse(challenge, pem) {
    let split = splitChallenge(challenge);
    if (split.length !== 5) {
        console.log('invalid challenge');

        text_algoType.textContent = 'Algo type: N/A';
        text_random.textContent = 'random: N/A';
        text_version.textContent = 'version: N/A';
        text_chipId.textContent = 'chip id: N/A';
        text_fazit.textContent = 'FAZIT: N/A';
        input_responseText.value = "";
        button_copyResponse.hidden = true;
        return;
    }
    let [algoType, random, version, chipId, fazit] = split;
    let toSign = random;
    for (let i = 0; i < 19; i++) {
        toSign += String.fromCharCode(0);
    }
    toSign += chipId;
    toSign += String.fromCharCode(10);
    toSign += version;
    let signature = sign(toSign, pem);

    let binSig = atob(signature); // always
    let response = random;
    for (let i = 0; i < 24; i++) {
        response += String.fromCharCode(0);
    }
    response += binSig;
    let responseHex = encodeHex(response);

    // set visuals
    text_algoType.textContent = 'Algo type: ' + algoType;
    text_random.textContent = 'random: ' + random;
    text_version.textContent = 'version: ' + version;
    text_chipId.textContent = 'chip id: ' + chipId;
    text_fazit.textContent = 'FAZIT: ' + fazit;
    input_responseText.value = responseHex;
    button_copyResponse.hidden = false;
    return responseHex;
}
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

// private key that works with the public key in the "special firmware update"
input_pemText.value = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

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
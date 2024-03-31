import { useState } from "react";
import { asciiToBase64 } from "../utils/base64";

function ProductCipher(){ //not done yet
    const [plaintext, setPlainText] = useState("")
    const [ciphertext, setCipherText] = useState("")
    const [mode, setMode] = useState("encrypt") //encrypt mode true
    const [textkey, setTextKey] = useState("")
    const [numberkey, setNumberKey] = useState(0)
    

    const handleMode = (event) => {
        setMode(event.target.value)
    }

    const transpose = (result, numberkey) => {
        let splicedResult = []
        let transposeResult = []
        result = result.split("")

        if(numberkey > 0){
            const row = result.length/numberkey
            for(let i = 0; i < Math.ceil(row); i++){
                splicedResult[i] = result.splice(0, numberkey)
            }
            for(let i = 0; i < numberkey; i++){
                for(let j = 0 ; j < Math.ceil(row); j++){
                    splicedResult[j][i] !== undefined? transposeResult.push(splicedResult[j][i]) : transposeResult.push("x") //plaintext (result) seluruhnya huruf kecil, karakter "x" sbg pembeda
                }
            }
        }
        return transposeResult
    }

    const encrypt = (plaintext, textkey, numberkey) => {
        let result = ""
        plaintext = plaintext.replace(/[^a-zA-Z]/g, "")
        textkey = textkey.replace(/[^a-zA-Z]/g, "")

        for(let i = 0; i < plaintext.length;i++){
            const p = plaintext.charCodeAt(i)
            const k = textkey.charCodeAt(i % textkey.length)

            let x
            if(p > 96 && k != null){ //huruf kecil
                if(k > 96){
                    x = 97 + (p + (k-97)%26 - 97)%26
                    result += String.fromCharCode(x)
                }else if(k > 64){
                    x = 97 + (p + (k-65)%26 - 97)%26
                    result += String.fromCharCode(x)
                }
            }
            console.log(x)
        }
        console.log(result)
        result = transpose(result, numberkey)
        return result
    }

    const decrypt = (ciphertext, textkey, numberkey) => {
        let result = ""
        textkey = textkey.replace(/[^a-zA-Z]/g, "")
        ciphertext = transpose(ciphertext, Math.ceil(ciphertext.length/numberkey))
        ciphertext = ciphertext.join("").replace(/[A-Z]/g, "") //membuang huruf kapital di akhir akibat proses transposisi

        for(let i = 0; i < ciphertext.length;i++){
            const c = ciphertext.charCodeAt(i)
            const k = textkey.charCodeAt(i % textkey.length)

            let x
            if(c > 96){ //huruf kecil
                if(k > 96){
                    x = 97 + (c-k+26)%26
                    result += String.fromCharCode(x)
                }else if(k > 64){
                    x = 97 + (c-(k+32)+26)%26
                    result += String.fromCharCode(x)
                }
            }
        }
        return result
    }

    return (
        <div>
            <div class = "container">
                <div class="mb-5">
                    <div class="flex gap-3">
                        <label class="cursor-pointer">
                            <input value = "encrypt" onChange={handleMode} type="radio" class="peer sr-only" name = "mode"/>
                            <div class="w-100% max-w-xl rounded-md bg-white border border-blue-300 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                <p class="text-sm font-semibold uppercase text-gray-500">ENCRYPT</p>
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input value = "decrypt" onChange={handleMode} type="radio" class="peer sr-only" name = "mode" />
                            <div class="w-100% max-w-xl rounded-md bg-white border border-blue-300 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                <p class="text-sm font-semibold uppercase text-gray-500">DECRYPT</p>
                            </div>
                        </label>
                    </div>
                </div>
                {(mode == "encrypt") && (
                    <div>
                        <div>
                        <h1>
                        <b>Plaintext</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {plaintext} onChange={(e) => setPlainText(e.target.value)} rows = "5" placeholder="Your text here.."/>
                        </div>
                        <div>
                        <h1>
                        <b>Text Key</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {textkey} onChange={(e) => setTextKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                        </div>
                        <div>
                        <h1>
                        <b>Transpose Key</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {numberkey} onChange={(e) => setNumberKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                        </div>
                        <b>Result: {encrypt(plaintext, textkey, numberkey)}</b>
                        <br/><b>Result in Base64: {asciiToBase64(encrypt(plaintext, textkey, numberkey))}</b>
                    </div>
                )}
                {(mode == "decrypt") && (
                    <div>
                        <div>
                        <h1>
                        <b>Ciphertext</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {ciphertext} onChange={(e) => setCipherText(e.target.value)} rows = "5" placeholder="Your text here.."/>
                        </div>
                        <div>
                        <h1>
                        <b>Text Key</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {textkey} onChange={(e) => setTextKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                        </div>
                        <div>
                        <h1>
                        <b>Transpose Key</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {numberkey} onChange={(e) => setNumberKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                        </div>
                        <b>Result: {decrypt(ciphertext, textkey, numberkey)}</b>
                    </div>
                )}

            </div> 
        </div>
    )
}

export default ProductCipher;
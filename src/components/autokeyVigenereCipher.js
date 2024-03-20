import { useState } from "react";

function AutokeyVigenereCipher(){//ok
    const [plaintext, setPlainText] = useState("")
    const [ciphertext, setCipherText] = useState("")
    const [mode, setMode] = useState("encrypt") //encrypt mode true
    const [key, setKey] = useState("")

    const handleMode = (event) => {
        setMode(event.target.value)
    }

    const encrypt = (plaintext, key) => { //bikin buat ignore spacebar
        let result = ""
        plaintext = plaintext.replace(/[^a-zA-Z]/g, "")

        for(let i = 0; i < plaintext.length;i++){
            const p = plaintext.charCodeAt(i)
            const k = key.charCodeAt(i % key.length)

            let x
            if(p > 96){ //huruf kecil
                if(k > 96){
                    x = 97 + (p + (k-97)%26 - 97)%26
                    result += String.fromCharCode(x)
                }else if(k > 64){
                    x = 97 + (p + (k-65)%26 - 97)%26
                    result += String.fromCharCode(x)
                }
            }

            else if(p > 64){ //kapital
                if(k > 96){
                    x = 65 + (p + (k-97)%26 - 65)%26
                    result += String.fromCharCode(x)
                }else if(k > 64){
                    x = 65 + (p + (k-65)%26 - 65)%26
                    result += String.fromCharCode(x)
                }
            }
        }
        return result
    }

    const decrypt = (ciphertext, key) => {
        let result = ""

        for(let i = 0; i < ciphertext.length;i++){
            const c = ciphertext.charCodeAt(i)
            const k = key.charCodeAt(i % key.length)

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
            else if(c > 64){ //kapital
                if(k > 96){
                    x = 65 + (c-(k-32)+26)%26
                    result += String.fromCharCode(x)
                }else if(k > 64){
                    x = 65 + (c-k+26)%26
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
                        <b>Key</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {key} onChange={(e) => setKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                        </div>
                        <b>Result: {encrypt(plaintext, key)}</b>
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
                        <b>Key</b>
                        </h1>
                        <textarea class="w-1/2 border border-gray-300" value = {key} onChange={(e) => setKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                        </div>
                        <b>Result: {decrypt(ciphertext, key)}</b>
                    </div>
                )}

            </div> 
        </div>
    )
}

export default AutokeyVigenereCipher;
import { useState } from "react";
import axios from "axios"
import { asciiToBase64 } from "../utils/base64";

function ExtendedVigenereCipher(){
    const [plaintext, setPlainText] = useState("")
    const [ciphertext, setCipherText] = useState("")
    const [mode, setMode] = useState("encrypt") //encrypt mode true
    const [key, setKey] = useState("")
    const [inputType, setInputType] = useState("text") //default input type is text

    const [file, setFile] = useState()
    const [fileStream, setFileStream] = useState("")
    const [fetchStatus, setFetchStatus] = useState(true)

    const handleMode = (event) => {
        setMode(event.target.value)
    }

    const handleFile = (event) => {
        setFile(event.target.files[0])
    }

    const toFile = (event) => {
        let processedFileStream = mode === "encrypt" ?  encrypt(fileStream, key, inputType) : 
                                                        decrypt(fileStream, key, inputType)
        const formData = new FormData()
        formData.append('data', file.name) //nama file dan extension
        formData.append('data', processedFileStream) //hasil encrypt/decrypt
        formData.append('data', mode) //penamaan file berdasarkan mode yang dipilih
        
        axios.post('http://localhost:5000/tofile', formData)
        .then((res) => {
            console.log(res)
            setFileStream(res.data)
            setFetchStatus(true)
        })
    }
    
    const upload = (event) => {
        const formData = new FormData()
        formData.append('file', file)   

        axios.post('http://localhost:5000/upload', formData)
        .then((res) => {
            console.log(res)
            setFileStream(res.data)
            setFetchStatus(true)
        })
        .catch(function (error){
            if(error.response){
                console.log(error.message)
            }
        })  
    } 

    const submitFile = (event) => {
        upload(event) // upload file yang dipilih ke direktori uploads
        toFile(event) // membuat file berisi hasil encrypt/decrypt dari file
    } 

    const encrypt = (plaintext, key, inputType) => {
        let result = []

        if(inputType === "text"){
            for(let i = 0; i < plaintext.length;i++){
                const p = plaintext.charCodeAt(i)
                const k = key.charCodeAt(i % key.length)
                const x = (p + k) % 256
    
                result[i] = String.fromCharCode(x)
            }
        }
        else if(inputType === "file"){
            for(let i = 0; i < plaintext.length;i++){
                const p = plaintext.charCodeAt(i)
                const k = key.charCodeAt(i % key.length)
                const x = (p + k) % 256
    
                result[i] = x
            }
        }

        return result
    }

    const decrypt = (ciphertext, key, inputType) => {
        let p = []
        let c = []

        if(inputType === "text"){
            for(let i = 0; i < ciphertext.length;i++){
                const c = ciphertext.charCodeAt(i)
                const k = key.charCodeAt(i % key.length)
                const x = (c - k) % 256
    
                p[i] = String.fromCharCode(x)
            }
        }
        else if(inputType === "file"){
            c = ciphertext.split(",")

            for(let i = 0; i < c.length;i++){
                const k = key.charCodeAt(i % key.length)
                p[i] = (c[i] - k) % 256
            }
        }

        return p
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

                <div class="mb-5">
                    <h1 class = "mb-1">
                        <b>Input Type</b>
                    </h1>
                    <div class="flex gap-3">
                        <input type = "radio" name= "inputType" value = "text" onChange={(e) => setInputType(e.target.value)}/> Text
                        <input type = "radio" name= "inputType" value = "file" onChange={(e) => setInputType(e.target.value)}/> File
                    </div>
                </div>

                {(mode == "encrypt") && (
                    <div class = "my-5">
                        {(inputType === "text" && (
                        <>
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
                        <b>Result: {encrypt(plaintext, key, inputType)}</b>
                        <br/><b>Result in Base64: {asciiToBase64(encrypt(plaintext, key, inputType))}</b>
                        </>   
                        ))}
                        {(inputType == "file") && (
                            <>
                            <h1>
                            <b>File</b>
                            </h1>
                                <input type = "file" name = "file" onChange = {(e) => handleFile(e)}/>
                                <div class = "my-2">
                                    <h1>
                                    <b>Key</b>
                                    </h1>
                                    <textarea class="w-1/2 border border-gray-300" value = {key} onChange={(e) => setKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                                </div>
                                <button type = "button" class = "bg-blue-500 text-white font-bold my-2 py-2 px-2" onClick={(e) => submitFile(e)}>
                                        Submit
                                </button>
                            </>
                        )}
                    </div>
                )}
                {(mode == "decrypt") && (
                    <div class="my-5">
                        {(inputType === "text" && (
                        <>
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
                            <b>Result: {decrypt(ciphertext, key, inputType)}</b>
                        </>
                        ))}
                        {(inputType === "file" && (
                        <>
                        <h1>
                        <b>File</b>
                        </h1>
                            <input type = "file" name = "file" onChange = {(e) => handleFile(e)}/>
                            <div class = "my-2">
                                <h1>
                                <b>Key</b>
                                </h1>
                                <textarea class="w-1/2 border border-gray-300" value = {key} onChange={(e) => setKey(e.target.value)} maxLength="256" rows = "2" placeholder="Your key here.."/>
                            </div>
                            <button type = "button" class = "bg-blue-500 text-white font-bold my-2 py-2 px-2" onClick={(e) => submitFile(e)}>
                                    Submit
                            </button>
                        </>
                        ))}
                    </div>
                )}

            </div> 
        </div>
    )
}

export default ExtendedVigenereCipher;
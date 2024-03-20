let text = "temui ibu nanti malam"

const textToBigram = (text) => {
    text = text.toUpperCase()
    text = text.replace(/\s/g, '') //menghapus semua spasi
    text = text.replace(/J/g, 'I') //mengganti j dengan i
    text = text.split("")

    for(let i = 0; i < text.length; i++){
        if((i % 2) !== 0 & (text[i] === text[i-1])){ //mengganti pasangan huruf yang sama dengan X
            text.splice(i, 0, "X")
        }
        if((text[text.length-1].length % 2) !== 0){ //menambahkan huruf X di akhir jika jumlah huruf ganjil
            text[text.length-1] += "X"
        }
    }
    text = text.join("")
    let bigram = text.match(/.{1,2}/g) //bigram

    return bigram
}

console.log("Bigram: ", textToBigram(text))
let bigram = textToBigram(text)

const transformToMatrix = (key) => {
    let characters = ''
    let matrix = []
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'

    key = key.toUpperCase()
    key = key.replace(/\s/g, '') //menghapus semua spasi
    key = key.replace(/J/g, '') //membuang huruf J

    for(let i = 0; i < key.length; i++){//membuang huruf yang berulang
        if(characters.includes(key[i]) === false){
            characters += key[i]
        }
    }

    for(let i = 0; i < alphabet.length; i++){//menambahkan huruf yang belum ada
        if(characters.includes(alphabet[i]) === false){
            characters += alphabet[i]
        }
    }

    matrix = characters.match(/.{1,5}/g)

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < 5; j++){
            matrix[i][j] = (matrix[i].split(""))[j] //matrix[row][column]
        }
    } 
    return matrix
}

let key = transformToMatrix("JALAN GANESHA SEPULUH")

const encrypt = (bigram, key) => {
    let result = []

    for(let i = 0; i < bigram.length; i++){
        const regex = bigram[i].split("")
        let firstLetterCoord = []
        let secondLetterCoord = []

        for(let j = 0; j < key.length; j++){
            if(key[j].search(regex[0]) !== -1){
                firstLetterCoord = [j, key[j].search(regex[0])]
            }
            if(key[j].search(regex[1]) !== -1){
                secondLetterCoord = [j, key[j].search(regex[1])]
            }
        }

        let row1 = firstLetterCoord[0]
        let row2 = secondLetterCoord[0]
        let col1 = firstLetterCoord[1]
        let col2 = secondLetterCoord[1]

        //pemilihan algoritma enkripsi menurut letak bigram
        if (row1 === row2){ //sebaris
            result[i] = key[row1][(col1+1)%5].concat(key[row2][(col2+1)%5])
        } else if (col1 === col2){ //satu kolom
            result[i] = key[(row1+1)%5][col1].concat(key[(row2+1)%5][col2])
        } else{//lainnya
            result[i] = key[row1][col2].concat(key[row2][col1])
        }
    }
    return result
}

let ciphertext = encrypt(bigram, key)
console.log("Terenkripsi: ", ciphertext)

const decrypt = (bigram, key) => {
    let result = []

    for(let i = 0; i < bigram.length; i++){
        const regex = bigram[i].split("")
        let firstLetterCoord = []
        let secondLetterCoord = []

        for(let j = 0; j < key.length; j++){
            if(key[j].search(regex[0]) !== -1){
                firstLetterCoord = [j, key[j].search(regex[0])]
            }
            if(key[j].search(regex[1]) !== -1){
                secondLetterCoord = [j, key[j].search(regex[1])]
            }
        }

        let row1 = firstLetterCoord[0]
        let row2 = secondLetterCoord[0]
        let col1 = firstLetterCoord[1]
        let col2 = secondLetterCoord[1]

        //pemilihan algoritma enkripsi menurut letak bigram
        if (row1 === row2){ //sebaris
            result[i] = key[row1][(col1-1)%5].concat(key[row2][(col2-1)%5])
        } else if (col1 === col2){ //satu kolom
            result[i] = key[(row1-1)%5][col1].concat(key[(row2-1)%5][col2])
        } else{//lainnya
            result[i] = key[row1][col2].concat(key[row2][col1])
        }

        //menghapus X
        if(result[i].includes("X")){
            result[i] = result[i].replace(/X/, '')
        }
    }
    console.log(result)
}

decrypt(ciphertext, key)
console.log(5%4)
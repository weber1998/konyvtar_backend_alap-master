class KonyvModel {
    #konyvekTomb = [];

    constructor(token) {
        this.token = token;
        console.log("KonyvModel");
    }

    adatTorol(adat) {
        console.log("törlöm", adat)
    }
    adatModosit(adat) {
        console.log("modositom", adat)
    }
    adatKosarba(adat) {
        console.log("kosárba", adat)
    }

    adatBe(vegpont, myCallBack) {
        console.log("végpont");
        fetch(vegpont, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN":this.token,
            },
           
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.#konyvekTomb = data;
                myCallBack(this.#konyvekTomb);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    adatUj(vegpont, adat) {
        fetch(vegpont, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                "X-CSRF-TOKEN":this.token,
            },
            body: JSON.stringify(adat),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Új adat: " + adat);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    adatModosit(vegpont, adat) {
        console.log(adat);
        console.log("MÓDOSÍT" + vegpont);
        vegpont += "/" + adat.id;
        fetch(vegpont, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN":this.token,
            },
            body: JSON.stringify(adat),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("MÓDOSÍTOTTAM " + data.updatedAt)
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
    }

    adatTorol(vegpont, adat) {
        console.log(adat);
        console.log("Töröltem" , adat);
        vegpont += "/" + adat.id;
        console.log(vegpont);
        fetch(vegpont, {
            method: "DELETE",
            headers: {
                //"Content-Type": "application/json",
                "X-CSRF-TOKEN":this.token,
            },
        })
            .then()
            .then(() => {
                console.log("Sikeres törlés");
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
    }
}

export default KonyvModel;
import KonyvekView from "../View/admin/KonyvekView.js";
import KonyvModel from "../Model/KonyvModel.js";
import KonyvekPublicView from "../view/public/konyvekPublicView.js";
import KosarModel from "../Model/KosarModel.js";
import KosarView from "../view/public/KosarView.js";

class AdminController {
    constructor() {
        console.log("KonyvController");
        const adminGomb=$("#admin");
        const publikusGomb=$("#public");
        const kosarGomb=$("#kosar");
        const kosarModel = new KosarModel();
        const token =$('meta[name="csrf-token"]').attr("content");
        const konyvmodel = new KonyvModel(token);
        this.vegpont = "konyvek";

        adminGomb.on("click", () => {
            konyvmodel.adatBe(this.vegpont, this.konyvAdatokAdmin);
        })
        publikusGomb.on("click", () => {
            konyvmodel.adatBe(this.vegpont, this.konyvAdatokPublikus);
        })
        kosarGomb.on("click", () => {
            kosarModel.adatBe("", this.kosarView);
        })

        $(window).on("kosar", (event) => {
            console.log("könyvet a kosárba rakja", event.detail)
            //kosarModel
        })
        
        $(window).on("torol", (event) => {
            console.log("kontrollerben meghívódott a törlés", event.detail)
            konyvmodel.adatTorol(this.vegpont, event.detail);
        })
        $(window).on("modosit", (event) => {
            console.log("kontrollerben meghívódott a módosítás", event.detail)
            konyvmodel.adatModosit(this.vegpont, event.detail);
        })
    }

    konyvAdatokAdmin(tomb) {
        console.log("admin", tomb);
        let szuloElem=$("main");
        new KonyvekView(tomb, szuloElem);
    }
    konyvAdatokPublikus(tomb) {
        console.log("publikus", tomb);
        let szuloElem=$("main");
        new KonyvekPublicView(tomb, szuloElem);
    }
    kosarView(tomb) {
        console.log("kosár", tomb);
        let szuloElem=$("main");
        new KosarView(tomb, szuloElem);
    }
}

export default AdminController;
//import client from "@/apiClient";

import axios from "axios";

const apiPath = "http://localhost:5000";
export default {
    getOfferList() {
        return axios.get(apiPath + "/api/offer/list");

        /*
        axios
          .get("http://192.168.2.18:5001/api/offer/list")
          .then(response => {
            if(response.data.SUCCESS == true)
              this.Payload =response.data.Payload;


          });
        */

    },
    getOffer(id){
        return axios.get(apiPath + "/api/offer/infobyid/" + id);
        /*
        axios
            .get("http://192.168.2.18:5001/api/offer/getbyid/" + this.offerId)
            .then(request => {
              if (!request.data.Success) {
                //Hata ver
                this.$router.push({ name: "OfferList" });
                return;
              }
        */



    },
    addOffer(offer) {
        return axios.post(apiPath + "/api/user/create", offer);
    },
    updateOffer(offer) {
        return axios.put(apiPath + "/api/user/update", offer);
    },

    deleteOffer(id){
        return axios.delete(apiPath + "/api/offer/delete/" + id);
    },
    deleteOfferDetail(offerNo) {
        return axios.delete(apiPath + "/api/offer/Items/delete/" + offerNo);
    },

     addOfferDetail(offerDetail) {
         return axios.post(apiPath + "/api/user/create", offerDetail);
     },
     updateOfferDetail(offerDetail) {
         return axios.put(apiPath + "/api/user/update", offerDetail);
     }

};

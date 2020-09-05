import Api from "@/store/Api.ts";

export default (context, inject) => {
    inject('api', new Api());
}

export function isJSON(str:string) {
    try {
       let newJson = JSON.parse(str);
       return typeof newJson === "object" && newJson !== str || false
       
    } catch (e) {
       return false;
    }
 }
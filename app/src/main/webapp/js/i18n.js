
import { BASE_URL } from './config.js';
import { HttpError } from './common.js';

const p = fetch(BASE_URL + 'messages');
let messages = p.then(resp => {
    if(!resp.ok) {
        throw new HttpError(resp)
    }
    return resp.json()
})
.catch(e => {
    console.log("Couldn't get messages");
    console.log(e);
});


export default await messages;

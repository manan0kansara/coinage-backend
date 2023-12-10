import { WebSocketV2 } from 'smartapi-javascript';
import DB from '@/databases/postgres';
import { ANGEL_ONE_API_KEY, ANGEL_ONE_CLIENT_ID } from '@/config'

class Websocket {
    public web_socket: any;
    public angelOne = DB.AngelOne
    public connect = async () => {
        const data = await this.angelOne.findAll({});

        this.web_socket = new WebSocketV2({
            jwttoken: data[0].jwtToken,
            apikey: ANGEL_ONE_API_KEY,
            clientcode: ANGEL_ONE_CLIENT_ID,
            feedtype: data[0].feedToken,
        });

        this.web_socket.connect().then((res) => {
            let json = {
                		correlationID: "abcde12345",
                		action: 1,
                		mode: 1,
                		exchangeType: 1,
                		tokens: ['55372'],
                	};

            this.web_socket.fetchData(json);
            this.web_socket.on('tick', receiveTick);

            function receiveTick(data) {
                console.log('receiveTick:::::', data);
            }
        })
    }
}

export default Websocket;